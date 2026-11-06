import { setTimeout as wait } from 'node:timers/promises';
import { isLocalObjectsDbServer, MHClient, tools } from '@iobroker/js-controller-common';
import { HostDiscovery, type DiscoveredHost, type HostDiscoveryOptions } from '@/lib/hostDiscovery.js';
import { joinMaster, type JoinResult } from '@/lib/controller/host/multihostJoin.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { ControllerState } from '@/lib/controller/state.js';
import type { Statistics } from '@/lib/controller/statistics.js';
import type { ControllerLogger } from '@/lib/controller/types.js';

/** Holds the hosts a user rejected. System-wide, so every Admin of the system sees the same list */
export const DISCOVERY_META_ID = 'system.meta.discovery';

/** At most this many rejected hosts are remembered, the oldest are forgotten first */
export const MAX_DECLINED_HOSTS = 100;

/** How often and how long to wait for `system.meta.uuid`, which `setMeta` creates without waiting for it */
const UUID_ATTEMPTS = 15;
const UUID_RETRY_DELAY = 2_000;

/** The part of {@link HostDiscovery} the pairing uses */
export type PairingDiscovery = Pick<HostDiscovery, 'announce' | 'withdraw' | 'startDiscovery' | 'getHosts' | 'close'>;

/** Everything the host pairing needs to do its work */
export interface HostPairingOptions {
    /** The connected objects database client */
    objects: ObjectsClient;
    /** The connected states database client */
    states: StatesClient;
    /** The configuration of this host (iobroker.json) */
    config: ioBroker.IoBrokerJson;
    /** Counts the writes into the states database */
    statistics: Statistics;
    /** The lifecycle state of the controller, to stop waiting while it shuts down */
    state: ControllerState;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** The id of the host object of this controller */
    hostObjectPrefix: ioBroker.ObjectIDs.Host;
    /** Name of this host */
    hostname: string;
    /** The version of the js-controller, published in the announcement */
    version: string;
    /** A compact group controller is no host of its own and takes no part in the pairing */
    isCompactGroupController: boolean;
    /** Fetches the database configuration of a master, only replaced by tests */
    fetchDatabases?: (ip: string, password: string) => ReturnType<MHClient['connectAsync']>;
    /** Creates the mDNS part, only replaced by tests */
    createDiscovery?: (options: HostDiscoveryOptions) => PairingDiscovery;
}

/**
 * Lets a fresh host be found and attached by a master, and lets a master find such hosts
 *
 * Pairing is opt-in: only a host with `multihostService.pairing: true` in its `iobroker.json` - set by
 * the ready-made images - announces itself via mDNS and can be taken over. Every other host stays
 * silent on the network. A master only starts listening for the announcements when the Admin asks
 * which hosts are out there, see {@link getHosts}.
 *
 * The objects of the pairing are:
 * - the announcement of this host, `uuid`/`unclaimed`/`master` in the TXT record;
 * - the hosts found by a master, written to `<host>.discoveredHosts` for the Admin;
 * - the hosts the user rejected, in {@link DISCOVERY_META_ID};
 * - the join itself, of which only one may run at a time.
 */
export class HostPairing {
    readonly #objects: ObjectsClient;
    readonly #states: StatesClient;
    readonly #config: ioBroker.IoBrokerJson;
    readonly #statistics: Statistics;
    readonly #state: ControllerState;
    readonly #logger: ControllerLogger;
    readonly #hostLogPrefix: string;
    readonly #hostObjectPrefix: ioBroker.ObjectIDs.Host;
    readonly #hostname: string;
    readonly #version: string;
    readonly #isCompactGroupController: boolean;
    readonly #fetchDatabases: NonNullable<HostPairingOptions['fetchDatabases']>;
    readonly #createDiscovery: NonNullable<HostPairingOptions['createDiscovery']>;

    /** mDNS announcement and discovery, only created once one of them is needed */
    #discovery: PairingDiscovery | null = null;
    /** Installation id of this host, published in the announcement and in the `browse` answer */
    #uuid = '';
    /** Whether a join to a master is running - only one may rewrite the configuration */
    #joinInProgress = false;
    /** Set by {@link close}, so a late callback does not start anything again */
    #closed = false;
    /** Whether this host listens for the announcements of others, started by the first {@link getHosts} */
    #listening = false;
    /** Whether this host announces itself */
    #announcing = false;
    /** `multihostService.pairing`, follows {@link setPairingEnabled} */
    #pairingEnabled: boolean;

    /**
     * @param options Everything the host pairing needs to do its work
     */
    constructor(options: HostPairingOptions) {
        this.#objects = options.objects;
        this.#states = options.states;
        this.#config = options.config;
        this.#statistics = options.statistics;
        this.#state = options.state;
        this.#logger = options.logger;
        this.#hostLogPrefix = options.hostLogPrefix;
        this.#hostObjectPrefix = options.hostObjectPrefix;
        this.#hostname = options.hostname;
        this.#version = options.version;
        this.#isCompactGroupController = options.isCompactGroupController;
        this.#fetchDatabases = options.fetchDatabases ?? ((ip, password) => new MHClient().connectAsync(ip, password));
        this.#createDiscovery = options.createDiscovery ?? (discoveryOptions => new HostDiscovery(discoveryOptions));
        this.#pairingEnabled = this.isPairingEnabled(options.config);
    }

    /** Installation id of this host, empty until `system.meta.uuid` exists */
    get uuid(): string {
        return this.#uuid;
    }

    /**
     * Whether this host offers itself for pairing - `multihostService.pairing: true` in `iobroker.json`
     *
     * Off by default: the check that a host is "unclaimed" can only tell that no second host belongs
     * to its system, which is just as true for an installation that has been running for years. The
     * image builder is the one who knows that a device is fresh, so the image switches it on.
     *
     * @param config the configuration to look at; without it, the current state of this host
     */
    isPairingEnabled(config?: ioBroker.IoBrokerJson): boolean {
        return config ? config.multihostService?.pairing === true : this.#pairingEnabled;
    }

    /**
     * Follow a change of `multihostService.pairing` without a restart, as `updateMultihost` sends it
     *
     * Switched on, the host starts announcing itself. Switched off, it withdraws the announcement, so
     * no master offers to attach it any more - the pairing listener that would accept the `join` is
     * closed at the same moment.
     *
     * @param enabled the new value of the flag
     */
    async setPairingEnabled(enabled: boolean): Promise<void> {
        if (enabled === this.#pairingEnabled) {
            return;
        }
        this.#pairingEnabled = enabled;

        if (this.#closed || this.#isCompactGroupController) {
            return;
        }

        if (enabled) {
            await this.#updateAnnouncement();
            return;
        }

        if (this.#discovery && this.#announcing) {
            this.#announcing = false;
            if (this.#listening) {
                this.#discovery.withdraw();
            } else {
                // nothing else uses the socket
                const discovery = this.#discovery;
                this.#discovery = null;
                await discovery.close();
            }
        }
    }

    /**
     * Whether this host may still be attached to another one
     *
     * Only with pairing switched on. A remote database means the host already belongs to a system. A
     * local database alone is not enough to call it free: a master runs on a local database too. What
     * disqualifies it is a second host in the same system - then somebody already joined it and taking
     * it over would cut that host off from its data.
     *
     * Adapter instances are deliberately not looked at. A ready-made image usually ships with admin and
     * a backup adapter already installed, and that is still a host nobody has claimed.
     */
    async isUnclaimed(): Promise<boolean> {
        if (!this.isPairingEnabled()) {
            return false;
        }

        try {
            if (!(await isLocalObjectsDbServer(this.#config.objects.type, this.#config.objects.host))) {
                return false;
            }

            const view = await this.#objects.getObjectViewAsync('system', 'host');
            const otherHosts = (view?.rows || []).filter(row => row.id !== this.#hostObjectPrefix);

            return otherHosts.length === 0;
        } catch (e) {
            this.#logger.warn(`${this.#hostLogPrefix} Cannot determine if this host is unclaimed: ${e.message}`);
            // better to look claimed than to let somebody take over a system we could not read
            return false;
        }
    }

    /**
     * Start what this host takes part in: the announcement, if pairing is switched on
     *
     * Called after `setMeta`, which creates the installation id that is announced.
     */
    async start(): Promise<void> {
        if (this.#isCompactGroupController) {
            return;
        }

        await this.#resolveUuid();

        if (this.isPairingEnabled()) {
            await this.#updateAnnouncement();
        }

        // `setMeta` creates the uuid without waiting for it, so on a fresh installation it is usually
        // not there yet. The UDP `browse` answer needs it as well, which works without mDNS.
        if (!this.#uuid) {
            void this.#waitForUuid().catch(e =>
                this.#logger.warn(`${this.#hostLogPrefix} Cannot resolve the host UUID: ${e.message}`),
            );
        }
    }

    /**
     * The hosts found via mDNS, without the rejected ones and without those that announced no uuid
     *
     * The first call starts listening, so a master is silent on the network until the Admin asks. Only
     * a host with its own database can take others over, so only such a host listens at all.
     */
    async getHosts(): Promise<DiscoveredHost[]> {
        if (this.#isCompactGroupController || this.#closed) {
            return [];
        }

        if (!(await isLocalObjectsDbServer(this.#config.objects.type, this.#config.objects.host))) {
            return [];
        }

        const discovery = this.#getDiscovery();
        if (!this.#listening) {
            this.#listening = true;
            await discovery.startDiscovery();
            // replaces what an earlier run of this host left in the state, before the first host shows up
            await this.#publishHosts(discovery.getHosts());
        }

        return this.#filterHosts(discovery.getHosts(), await this.getDeclinedHosts());
    }

    /**
     * Installation ids of the hosts the user rejected in the Admin
     *
     * Stored on the master, keyed by the uuid the remote host announces. Keeping it here rather than on
     * the remote host means the decision also holds while that host is switched off - the moment it
     * comes back it is simply not offered again.
     */
    async getDeclinedHosts(): Promise<string[]> {
        try {
            const obj = await this.#objects.getObject(DISCOVERY_META_ID);
            const declined: unknown = obj?.native?.declined;

            return Array.isArray(declined) ? declined.filter(uuid => typeof uuid === 'string') : [];
        } catch (e) {
            this.#logger.warn(`${this.#hostLogPrefix} Cannot read declined hosts: ${e.message}`);
            return [];
        }
    }

    /**
     * Add a host to the ignore list, or take it off again, and update `<host>.discoveredHosts`
     *
     * The list keeps the {@link MAX_DECLINED_HOSTS} most recent decisions.
     *
     * @param uuid Installation id the remote host announced
     * @param declined `true` hides it from the discovery list, `false` shows it again
     */
    async setHostDeclined(uuid: string, declined: boolean): Promise<void> {
        const list = (await this.getDeclinedHosts()).filter(entry => entry !== uuid);

        if (declined) {
            list.push(uuid);
        }

        await this.#objects.setObject(DISCOVERY_META_ID, {
            type: 'meta',
            common: {
                name: 'Discovered hosts',
                type: 'meta.user',
            },
            native: {
                declined: list.slice(-MAX_DECLINED_HOSTS),
            },
        });

        if (this.#discovery) {
            await this.#publishHosts(this.#discovery.getHosts());
        }
    }

    /**
     * Attach this host to a master, see {@link joinMaster}
     *
     * Used from two directions - the `multihostConnect` message (Admin of *this* host) and the `join`
     * command of the multihost server (Admin of the *master*, over UDP 50005). The caller restarts the
     * controller afterwards.
     *
     * Only one join may run at a time. The `join` command answers before it awaits this, so a second
     * datagram arriving in that window would otherwise start a second join alongside the first.
     *
     * @param ip Address of the master
     * @param password Multihost password, empty when the master runs unsecured
     */
    async join(ip: string, password: string): Promise<JoinResult> {
        if (this.#joinInProgress) {
            this.#logger.warn(`${this.#hostLogPrefix} Multihost connect to "${ip}" refused, a join is already running`);
            return { result: false, error: 'A join is already in progress on this host' };
        }
        this.#joinInProgress = true;

        this.#logger.info(`${this.#hostLogPrefix} Multihost connect requested to "${ip}"`);

        let result: JoinResult;
        try {
            result = await joinMaster({
                ip,
                password,
                configFile: tools.getConfigFileName(),
                fetchDatabases: this.#fetchDatabases,
                logger: this.#logger,
                hostLogPrefix: this.#hostLogPrefix,
            });
        } catch (e) {
            this.#joinInProgress = false;
            throw e;
        }

        if (!result.result) {
            // a failed attempt may be retried; a successful one is followed by a controller restart
            this.#joinInProgress = false;
        }

        return result;
    }

    /**
     * Stop announcing and listening
     */
    async close(): Promise<void> {
        this.#closed = true;

        const discovery = this.#discovery;
        this.#discovery = null;

        await discovery?.close();
    }

    /**
     * The mDNS part, created on first use
     */
    #getDiscovery(): PairingDiscovery {
        this.#discovery ||= this.#createDiscovery({
            hostname: this.#hostname,
            logger: this.#logger,
            logPrefix: this.#hostLogPrefix,
            version: this.#version,
            onChange: hosts =>
                this.#publishHosts(hosts).catch(e =>
                    this.#logger.warn(`${this.#hostLogPrefix} Cannot publish discovered hosts: ${e.message}`),
                ),
            onRefresh: () => {
                if (this.isPairingEnabled()) {
                    this.#updateAnnouncement().catch(e =>
                        this.#logger.warn(`${this.#hostLogPrefix} Cannot update host announcement: ${e.message}`),
                    );
                }
            },
        });

        return this.#discovery;
    }

    /**
     * Publish what this host currently is: its installation id, whether it can still be taken over and
     * whether it runs a multihost master
     */
    async #updateAnnouncement(): Promise<void> {
        if (this.#closed) {
            return;
        }

        await this.#resolveUuid();

        this.#announcing = true;
        await this.#getDiscovery().announce({
            uuid: this.#uuid,
            unclaimed: await this.isUnclaimed(),
            master: !!this.#config.multihostService?.enabled,
        });
    }

    /**
     * Write the currently discovered hosts into `<host>.discoveredHosts`, so the Admin can subscribe to
     * them instead of polling
     *
     * @param hosts What the discovery currently knows
     */
    async #publishHosts(hosts: DiscoveredHost[]): Promise<void> {
        const visible = this.#filterHosts(hosts, await this.getDeclinedHosts());

        this.#statistics.countOutput();
        await this.#states.setState(`${this.#hostObjectPrefix}.discoveredHosts`, {
            val: JSON.stringify(visible),
            ack: true,
            from: this.#hostObjectPrefix,
        });
    }

    /**
     * Drop the rejected hosts and those without a uuid
     *
     * A host without a uuid cannot be offered: the decline list is keyed by it, so "No" would silently
     * do nothing and the host would keep coming back with no way for the user to tell why.
     *
     * @param hosts the discovered hosts
     * @param declined the installation ids the user rejected
     */
    #filterHosts(hosts: DiscoveredHost[], declined: string[]): DiscoveredHost[] {
        return hosts.filter(host => host.uuid && !declined.includes(host.uuid));
    }

    /**
     * Read the installation id (`system.meta.uuid`) once it exists
     */
    async #resolveUuid(): Promise<void> {
        if (this.#uuid) {
            return;
        }

        try {
            const uuidObj = await this.#objects.getObject('system.meta.uuid');
            this.#uuid = (uuidObj?.native?.uuid as string) || '';
        } catch {
            // stays empty and is retried by #waitForUuid()
        }
    }

    /**
     * Pick up the installation id as soon as it exists and correct the announcement
     *
     * Announcing without it would leave a master unable to tell two hosts apart or to remember a
     * rejected one, and waiting for the next refresh tick would keep that state for a minute.
     */
    async #waitForUuid(): Promise<void> {
        for (let attempt = 0; attempt < UUID_ATTEMPTS; attempt++) {
            await wait(UUID_RETRY_DELAY);

            if (this.#uuid || this.#closed || this.#state.isStopping) {
                return;
            }

            await this.#resolveUuid();

            if (this.#uuid && this.isPairingEnabled()) {
                await this.#updateAnnouncement();
            }
        }

        if (!this.#uuid) {
            this.#logger.warn(
                `${this.#hostLogPrefix} Host announced without a UUID, "system.meta.uuid" does not exist`,
            );
        }
    }
}
