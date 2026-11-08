import { setTimeout as wait } from 'node:timers/promises';
import { MHClient } from '@iobroker/js-controller-common';
import { MULTIHOST_PORT } from '@/lib/multihostServer.js';
import { getConfig } from '@/lib/controller/config.js';
import { pointsToLoopback } from '@/lib/controller/host/multihostJoin.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { HostPairing } from '@/lib/controller/host/hostPairing.js';
import type { ControllerLogger } from '@/lib/controller/types.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for attaching other hosts need */
export interface MultihostCommandsDeps {
    /** The connected objects database client */
    objects: ObjectsClient;
    /** Sends the answers back to the requester */
    messages: MessageBus;
    /** Finds, rejects and attaches hosts */
    pairing: HostPairing;
    /** Restarts the controller, after this host joined a master */
    restartSelf: () => Promise<void>;
    /** Creates the client for the multihost UDP protocol, only replaced by tests */
    createClient?: () => Pick<MHClient, 'browse' | 'sendCommand'>;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
}

/** What the Admin gets per host from `multihostBrowse` */
interface BrowsedHost {
    uuid: string;
    hostname?: string;
    ip?: string;
    port: number;
    unclaimed: boolean;
    info?: unknown;
    source: 'mdns' | 'udp';
}

/**
 * Answer a request, if it asked for an answer
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 * @param answer The answer
 */
function reply(deps: MultihostCommandsDeps, msg: ioBroker.SendableMessage, answer: Record<string, unknown>): void {
    if (msg.callback && msg.from) {
        deps.messages.sendTo(msg.from, msg.command, answer, msg.callback);
    }
}

/**
 * Master side: which hosts are out there? Sent by the Admin to fill the list of hosts that can be
 * attached. Hosts that offer themselves for pairing report `unclaimed: true`.
 *
 * Two sources, because neither covers every network on its own: the hosts which announced themselves
 * via mDNS, plus an active UDP browse for the setups where multicast DNS does not get through - a
 * Docker bridge, for example.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const multihostBrowse: HostCommand<MultihostCommandsDeps> = async (deps, msg) => {
    const { pairing } = deps;

    try {
        const declined = await pairing.getDeclinedHosts();
        const hosts: BrowsedHost[] = [];
        const seen = new Set<string>();

        // already without the declined hosts and those without a uuid
        for (const host of await pairing.getHosts()) {
            seen.add(host.ip);
            hosts.push({ ...host, source: 'mdns' });
        }

        const client = deps.createClient ? deps.createClient() : new MHClient();
        // caller-controlled, and this handler awaits the browse - which resolves only when the timeout
        // expires, holding the socket for as long as it says
        const browseTimeout = Math.min(Math.max(Number(msg.message?.timeout) || 2_000, 500), 10_000);
        const list = await client.browse(browseTimeout, false);

        for (const entry of list) {
            if (!entry.uuid || declined.includes(entry.uuid) || (entry.ip && seen.has(entry.ip))) {
                continue;
            }
            // a host with two interfaces in the same network answers the broadcast twice
            if (entry.ip) {
                seen.add(entry.ip);
            }
            // Picked explicitly instead of spread: a master that runs unsecured answers a `browse` with
            // its `objects`/`states` sections, which carry the database host and, for Redis, the
            // credentials. Only what the Admin needs travels on.
            hosts.push({
                uuid: entry.uuid,
                hostname: entry.hostname,
                ip: entry.ip,
                port: MULTIHOST_PORT,
                unclaimed: !!entry.unclaimed,
                info: entry.info,
                source: 'udp',
            });
        }

        reply(deps, msg, { result: true, hosts });
    } catch (e) {
        reply(deps, msg, { result: false, error: e.message });
    }
};

/**
 * Check that this host can be a master for a `join`: the other host fetches the database
 * configuration *from us*, so there has to be one it can use
 *
 * Checked here, where the Admin can still show the user what is missing, instead of the other side
 * failing with an unhelpful "invalid configuration" a few seconds later.
 *
 * @returns the reason why not, or `null`
 */
function checkJoinable(): string | null {
    const diskConfig = getConfig();

    if (!diskConfig.multihostService?.enabled) {
        return 'This host is not a multihost master. Enable the multihost service before attaching other hosts.';
    }

    if (pointsToLoopback(diskConfig.objects.host) || pointsToLoopback(diskConfig.states.host)) {
        return 'The databases of this host only listen locally, so another host cannot reach them. Bind them to 0.0.0.0 first.';
    }

    return null;
}

/**
 * Master side: tell a host that does not belong to this system yet what to do
 *
 * `join` attaches it, `decline` hides it, `identify` makes it log its name.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const multihostPair: HostCommand<MultihostCommandsDeps> = async (deps, msg) => {
    const { objects, pairing, logger, hostLogPrefix } = deps;
    const { ip, cmd, password, revoke, uuid } = msg.message || {};

    if (!ip || !cmd) {
        reply(deps, msg, { result: false, error: 'ip and cmd are required' });
        return;
    }

    // "No" is decided here and stored here. Telling the other host is only the second step: it may be
    // switched off, and the user still expects it to stay out of the list.
    if (cmd === 'decline') {
        if (!uuid) {
            reply(deps, msg, { result: false, error: 'uuid is required to decline a host' });
            return;
        }

        try {
            await pairing.setHostDeclined(uuid, !revoke);
            logger.info(`${hostLogPrefix} Host ${uuid} (${ip}) ${revoke ? 'accepted again' : 'declined'}`);
        } catch (e) {
            reply(deps, msg, { result: false, error: e.message });
            return;
        }
    }

    if (cmd === 'join') {
        const reason = checkJoinable();
        if (reason) {
            reply(deps, msg, { result: false, error: reason });
            return;
        }
    }

    // The target host stores the decline per master, so it has to know who we are.
    // `system.meta.uuid` is the installation id and stays stable across renames.
    let masterUuid = '';
    try {
        const uuidObj = await objects.getObject('system.meta.uuid');
        masterUuid = (uuidObj?.native?.uuid as string) || '';
    } catch {
        // reported below - every command needs it
    }

    // The remote host refuses a command without it: a master it cannot identify is one the user could
    // never decline. Fail here, so the Admin sees why instead of a bare "No masterUuid" coming back
    // from a host it knows nothing about.
    if (!masterUuid) {
        reply(deps, msg, {
            result: false,
            error: 'This host has no installation id ("system.meta.uuid") yet, so the other host cannot tell who is asking. Try again in a moment.',
        });
        return;
    }

    try {
        const client = deps.createClient ? deps.createClient() : new MHClient();
        const answer = await client.sendCommand(ip, cmd, { masterUuid, password: password || '', revoke });
        logger.info(`${hostLogPrefix} Multihost ${cmd} to ${ip}: ${answer.result}`);
        // a decline is done once it is stored here; what the other host says only adds to it
        reply(deps, msg, { result: cmd === 'decline' || answer.result === 'ok', answer: answer.result });
    } catch (e) {
        // For a decline this is not fatal - the host is already hidden locally
        if (cmd === 'decline') {
            logger.info(`${hostLogPrefix} Host ${ip} did not confirm the decline (${e.message}), but it stays hidden`);
            reply(deps, msg, { result: true, answer: 'not reachable' });
            return;
        }

        reply(deps, msg, { result: false, error: e.message });
    }
};

/**
 * Attach this host to a master, triggered by the Admin of this host
 *
 * Performs the multihost handshake (browse => auth => browse) against the master, stores the
 * received objects/states configuration and restarts.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const multihostConnect: HostCommand<MultihostCommandsDeps> = async (deps, msg) => {
    const message = msg.message || {};
    const ip: string = message.ip;
    const password: string = message.password || '';

    if (!ip) {
        reply(deps, msg, { result: false, error: 'No IP address provided' });
        return;
    }

    const result = await deps.pairing.join(ip, password);
    reply(deps, msg, { ...result });

    if (result.result) {
        // give the response time to be delivered before restarting
        await wait(1_000);
        await deps.restartSelf();
    }
};

/**
 * Create the host commands for finding and attaching other hosts
 *
 * @param deps Everything these commands need
 */
export function createMultihostCommands(deps: MultihostCommandsDeps): Record<string, HostCommandHandler> {
    return {
        multihostBrowse: msg => multihostBrowse(deps, msg),
        multihostPair: msg => multihostPair(deps, msg),
        multihostConnect: msg => multihostConnect(deps, msg),
    };
}
