import assert from 'node:assert/strict';
import sinon from 'sinon';
import { createMultihostCommands, type MultihostCommandsDeps } from '@/lib/controller/messages/commands/multihost.js';
import type { DiscoveredHost } from '@/lib/hostDiscovery.js';

const silentLogger = {
    silly: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
} as any;

const MASTER_UUID = 'fedcba9876543210';

/**
 * A host as the mDNS discovery reports it
 *
 * @param uuid its installation id
 * @param ip its address
 */
function mdnsHost(uuid: string, ip: string): DiscoveredHost {
    return {
        uuid,
        hostname: `host-${uuid.slice(0, 4)}`,
        ip,
        port: 50005,
        unclaimed: true,
        master: false,
        version: '8.0.0',
        lastSeen: Date.now(),
    };
}

interface Setup {
    commands: ReturnType<typeof createMultihostCommands>;
    sendTo: sinon.SinonStub;
    client: { browse: sinon.SinonStub; sendCommand: sinon.SinonStub };
    declined: string[];
}

/**
 * The commands with a fake pairing, a fake UDP client and a recording message bus
 *
 * @param mdns what the mDNS discovery knows
 * @param udp what the UDP browse answers
 */
function setup(mdns: DiscoveredHost[] = [], udp: any[] = []): Setup {
    const declined: string[] = [];
    const sendTo = sinon.stub();
    const client = {
        browse: sinon.stub().resolves(udp),
        sendCommand: sinon.stub().resolves({ result: 'ok' }),
    };

    const pairing = {
        getDeclinedHosts: () => Promise.resolve([...declined]),
        // the real one already leaves out the declined hosts
        getHosts: () => Promise.resolve(mdns.filter(host => !declined.includes(host.uuid))),
        setHostDeclined: (uuid: string, decline: boolean) => {
            const index = declined.indexOf(uuid);
            if (decline && index === -1) {
                declined.push(uuid);
            } else if (!decline && index !== -1) {
                declined.splice(index, 1);
            }
            return Promise.resolve();
        },
    };

    const deps: MultihostCommandsDeps = {
        objects: { getObject: () => Promise.resolve({ native: { uuid: MASTER_UUID } }) } as any,
        messages: { sendTo } as any,
        pairing: pairing as any,
        restartSelf: () => Promise.resolve(),
        createClient: () => client,
        logger: silentLogger,
        hostLogPrefix: 'host.master',
    };

    return { commands: createMultihostCommands(deps), sendTo, client, declined };
}

/**
 * A host message as the Admin sends it
 *
 * @param command the host command
 * @param message its payload
 */
function request(command: string, message: Record<string, unknown> = {}): ioBroker.SendableMessage {
    return { command, message, from: 'system.adapter.admin.0', callback: { id: 1 } as any };
}

describe('lib/controller/messages/commands/multihost: multihostBrowse', () => {
    it('merges both sources, once per address, and passes on only what the Admin needs', async () => {
        const unsecuredMaster = {
            uuid: '2222222222222222',
            hostname: 'other-master',
            ip: '192.168.1.3',
            unclaimed: false,
            info: { os: 'linux' },
            // an unsecured master answers a browse with its databases - they must not travel on
            objects: { type: 'redis', host: '192.168.1.3', options: { password: 'secret' } },
            states: { type: 'redis', host: '192.168.1.3', options: { password: 'secret' } },
        };
        const { commands, sendTo } = setup(
            [mdnsHost('1111111111111111', '192.168.1.2')],
            [
                // the same host once more, over UDP
                { uuid: '1111111111111111', ip: '192.168.1.2', hostname: 'host-1111', unclaimed: true },
                unsecuredMaster,
                // the same answer twice, from a host with two interfaces in the network
                { ...unsecuredMaster },
                // nothing to decline it by
                { ip: '192.168.1.9', hostname: 'no-uuid' },
            ],
        );

        await commands.multihostBrowse(request('multihostBrowse'));

        const answer = sendTo.firstCall.args[2];
        assert.strictEqual(answer.result, true);
        assert.deepStrictEqual(
            answer.hosts.map((host: any) => `${host.uuid}/${host.source}`),
            ['1111111111111111/mdns', '2222222222222222/udp'],
        );
        assert.deepStrictEqual(Object.keys(answer.hosts[1]).sort(), [
            'hostname',
            'info',
            'ip',
            'port',
            'source',
            'unclaimed',
            'uuid',
        ]);
        assert.doesNotMatch(JSON.stringify(answer), /secret/);
    });

    it('keeps the declined hosts out of the UDP part as well', async () => {
        const { commands, sendTo, declined } = setup([], [{ uuid: '3333333333333333', ip: '192.168.1.4' }]);
        declined.push('3333333333333333');

        await commands.multihostBrowse(request('multihostBrowse'));

        assert.deepStrictEqual(sendTo.firstCall.args[2].hosts, []);
    });

    it('does not let the caller hold the socket for as long as it likes', async () => {
        const { commands, client } = setup();

        await commands.multihostBrowse(request('multihostBrowse', { timeout: 3_600_000 }));
        await commands.multihostBrowse(request('multihostBrowse', { timeout: 1 }));

        assert.deepStrictEqual(
            client.browse.getCalls().map(call => call.args[0]),
            [10_000, 500],
        );
    });
});

describe('lib/controller/messages/commands/multihost: multihostPair decline', () => {
    it('stores the decision here, also when the other host cannot be reached', async () => {
        const { commands, sendTo, client, declined } = setup();
        client.sendCommand.rejects(new Error('timeout'));

        await commands.multihostPair(request('multihostPair', { ip: '192.168.1.4', cmd: 'decline', uuid: 'abc' }));

        assert.deepStrictEqual(declined, ['abc']);
        assert.deepStrictEqual(sendTo.firstCall.args[2], { result: true, answer: 'not reachable' });
    });

    it('stores the decision here, whatever the other host answers', async () => {
        const { commands, sendTo, client, declined } = setup();
        // e.g. a master, which is no pairing target
        client.sendCommand.resolves({ result: 'not in pairing mode' });

        await commands.multihostPair(request('multihostPair', { ip: '192.168.1.4', cmd: 'decline', uuid: 'abc' }));

        assert.deepStrictEqual(declined, ['abc']);
        assert.deepStrictEqual(sendTo.firstCall.args[2], { result: true, answer: 'not in pairing mode' });
    });

    it('tells the other host who declines it, and takes it back with revoke', async () => {
        const { commands, client, declined } = setup();

        await commands.multihostPair(request('multihostPair', { ip: '192.168.1.4', cmd: 'decline', uuid: 'abc' }));
        await commands.multihostPair(
            request('multihostPair', { ip: '192.168.1.4', cmd: 'decline', uuid: 'abc', revoke: true }),
        );

        assert.deepStrictEqual(declined, []);
        assert.deepStrictEqual(client.sendCommand.firstCall.args, [
            '192.168.1.4',
            'decline',
            { masterUuid: MASTER_UUID, password: '', revoke: undefined },
        ]);
        assert.strictEqual(client.sendCommand.secondCall.args[2].revoke, true);
    });

    it('refuses a request without the parts it needs', async () => {
        const { commands, sendTo, client } = setup();

        await commands.multihostPair(request('multihostPair', { cmd: 'decline', uuid: 'abc' }));
        await commands.multihostPair(request('multihostPair', { ip: '192.168.1.4', cmd: 'decline' }));

        assert.strictEqual(sendTo.firstCall.args[2].result, false);
        assert.strictEqual(sendTo.secondCall.args[2].result, false);
        assert.strictEqual(client.sendCommand.callCount, 0);
    });
});
