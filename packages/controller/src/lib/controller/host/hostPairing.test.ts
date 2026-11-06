import assert from 'node:assert/strict';
import {
    DISCOVERY_META_ID,
    HostPairing,
    MAX_DECLINED_HOSTS,
    type HostPairingOptions,
    type PairingDiscovery,
} from '@/lib/controller/host/hostPairing.js';
import { ControllerState } from '@/lib/controller/state.js';
import { Statistics } from '@/lib/controller/statistics.js';
import type { DiscoveredHost, HostDiscoveryOptions } from '@/lib/hostDiscovery.js';

const silentLogger = {
    silly: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
} as any;

const OWN_UUID = '0123456789abcdef';
const HOST_ID = 'system.host.fresh';

/** A local database, as on a fresh installation */
const LOCAL_CONFIG = {
    multihostService: { enabled: false, secure: false, password: '', persist: false, pairing: true },
    objects: { type: 'jsonl', host: '127.0.0.1', port: 9001 },
    states: { type: 'jsonl', host: '127.0.0.1', port: 9000 },
} as unknown as ioBroker.IoBrokerJson;

interface FakeDatabases {
    /** The objects by their ID */
    objects: Record<string, any>;
    /** The host objects the `system/host` view answers with */
    hostIds: string[];
    /** Make the view fail, as a database that cannot be read */
    viewFails?: boolean;
    /** What was written to the states database */
    states: Record<string, any>;
}

/** A discovery that only records what it was asked */
interface FakeDiscovery extends PairingDiscovery {
    announced: Parameters<PairingDiscovery['announce']>[0][];
    withdrawn: number;
    closed: boolean;
    listening: boolean;
    hosts: DiscoveredHost[];
}

/**
 * Create the pairing under test with in-memory databases and a fake mDNS part
 *
 * @param config the iobroker.json of the host
 * @param over options to replace
 */
function makePairing(
    config: ioBroker.IoBrokerJson = LOCAL_CONFIG,
    over: Partial<HostPairingOptions> = {},
): { pairing: HostPairing; db: FakeDatabases; discoveries: FakeDiscovery[] } {
    const db: FakeDatabases = {
        objects: { 'system.meta.uuid': { native: { uuid: OWN_UUID } } },
        hostIds: [HOST_ID],
        states: {},
    };
    const discoveries: FakeDiscovery[] = [];

    const objects = {
        getObject: (id: string) => Promise.resolve(db.objects[id] ?? null),
        setObject: (id: string, obj: any) => {
            db.objects[id] = obj;
            return Promise.resolve({ id });
        },
        getObjectViewAsync: () =>
            db.viewFails
                ? Promise.reject(new Error('Connection is closed'))
                : Promise.resolve({ rows: db.hostIds.map(id => ({ id, value: {} })) }),
    };
    const states = {
        setState: (id: string, state: any) => {
            db.states[id] = state;
            return Promise.resolve(id);
        },
    };

    const pairing = new HostPairing({
        objects: objects as any,
        states: states as any,
        config,
        statistics: new Statistics(),
        state: new ControllerState(),
        logger: silentLogger,
        hostLogPrefix: 'host.fresh',
        hostObjectPrefix: HOST_ID,
        hostname: 'fresh',
        version: '8.0.0',
        isCompactGroupController: false,
        createDiscovery: (_options: HostDiscoveryOptions) => {
            const discovery: FakeDiscovery = {
                announced: [],
                withdrawn: 0,
                closed: false,
                listening: false,
                hosts: [],
                announce: info => {
                    discovery.announced.push(info);
                    return Promise.resolve();
                },
                startDiscovery: () => {
                    discovery.listening = true;
                    return Promise.resolve();
                },
                withdraw: () => {
                    discovery.withdrawn++;
                },
                getHosts: () => discovery.hosts,
                close: () => {
                    discovery.closed = true;
                    return Promise.resolve();
                },
            };
            discoveries.push(discovery);
            return discovery;
        },
        ...over,
    });

    return { pairing, db, discoveries };
}

/**
 * A host as the discovery reports it
 *
 * @param uuid its installation id
 */
function discovered(uuid: string): DiscoveredHost {
    return {
        uuid,
        hostname: `host-${uuid.slice(0, 4)}`,
        ip: '192.168.1.42',
        port: 50005,
        unclaimed: true,
        master: false,
        version: '8.0.0',
        lastSeen: Date.now(),
    };
}

const withoutPairing = {
    ...LOCAL_CONFIG,
    multihostService: { ...LOCAL_CONFIG.multihostService, pairing: undefined },
} as unknown as ioBroker.IoBrokerJson;

describe('lib/controller/host/hostPairing: pairing is opt-in', () => {
    it('is off when iobroker.json does not switch it on', () => {
        assert.strictEqual(makePairing(withoutPairing).pairing.isPairingEnabled(), false);
        assert.strictEqual(makePairing().pairing.isPairingEnabled(), true);
    });

    it('does not call a long running single host unclaimed without it', async () => {
        // one host object, a local database: what every ordinary single-host installation looks like
        assert.strictEqual(await makePairing(withoutPairing).pairing.isUnclaimed(), false);
    });

    it('stays silent on the network without it', async () => {
        const { pairing, discoveries } = makePairing(withoutPairing);

        await pairing.start();

        assert.strictEqual(discoveries.length, 0, 'no mDNS socket, no announcement');
        assert.strictEqual(pairing.uuid, OWN_UUID, 'the uuid is still known for the UDP answer');
    });

    it('announces this host with it', async () => {
        const { pairing, discoveries } = makePairing();

        await pairing.start();

        assert.strictEqual(discoveries.length, 1);
        assert.deepStrictEqual(discoveries[0].announced, [{ uuid: OWN_UUID, unclaimed: true, master: false }]);
        assert.strictEqual(discoveries[0].listening, false, 'a fresh host announces, it does not listen');
        await pairing.close();
    });
});

describe('lib/controller/host/hostPairing: switched at runtime by updateMultihost', () => {
    it('stops announcing when switched off, and starts again when switched on', async () => {
        const { pairing, discoveries } = makePairing();
        await pairing.start();

        await pairing.setPairingEnabled(false);

        assert.strictEqual(discoveries[0].closed, true, 'nothing else used the socket');
        assert.strictEqual(await pairing.isUnclaimed(), false, 'and the UDP browse no longer says so either');

        await pairing.setPairingEnabled(true);

        assert.strictEqual(discoveries.length, 2);
        assert.deepStrictEqual(discoveries[1].announced, [{ uuid: OWN_UUID, unclaimed: true, master: false }]);
        await pairing.close();
    });

    it('only withdraws the announcement while the Admin is looking for hosts', async () => {
        const { pairing, discoveries } = makePairing();
        await pairing.start();
        await pairing.getHosts();

        await pairing.setPairingEnabled(false);

        assert.strictEqual(discoveries.length, 1);
        assert.strictEqual(discoveries[0].withdrawn, 1);
        assert.strictEqual(discoveries[0].closed, false, 'the list of the other hosts is still needed');
        await pairing.close();
    });

    it('does not announce a host that never announced itself when the flag goes off', async () => {
        const { pairing, discoveries } = makePairing(withoutPairing);
        await pairing.start();
        await pairing.getHosts();

        await pairing.setPairingEnabled(false);

        assert.deepStrictEqual(discoveries[0].announced, []);
        assert.strictEqual(discoveries[0].withdrawn, 0);
        await pairing.close();
    });
});

describe('lib/controller/host/hostPairing: isUnclaimed', () => {
    it('is true for a host that is alone in its system', async () => {
        assert.strictEqual(await makePairing().pairing.isUnclaimed(), true);
    });

    it('is false as soon as a second host belongs to the system', async () => {
        const { pairing, db } = makePairing();
        db.hostIds.push('system.host.other');

        assert.strictEqual(await pairing.isUnclaimed(), false);
    });

    it('is false for a host with a remote database', async () => {
        const remote = { ...LOCAL_CONFIG, objects: { type: 'jsonl', host: '192.168.1.2', port: 9001 } } as any;

        assert.strictEqual(await makePairing(remote).pairing.isUnclaimed(), false);
    });

    it('fails closed when the database cannot be read', async () => {
        const { pairing, db } = makePairing();
        db.viewFails = true;

        assert.strictEqual(await pairing.isUnclaimed(), false);
    });
});

describe('lib/controller/host/hostPairing: declined hosts', () => {
    it('stores and revokes a decision, and the list stays bounded', async () => {
        const { pairing, db } = makePairing();

        for (let i = 0; i < MAX_DECLINED_HOSTS + 5; i++) {
            await pairing.setHostDeclined(`uuid-${i}`, true);
        }
        let declined = await pairing.getDeclinedHosts();
        assert.strictEqual(declined.length, MAX_DECLINED_HOSTS);
        assert.strictEqual(declined.at(-1), `uuid-${MAX_DECLINED_HOSTS + 4}`, 'the newest decision is kept');
        assert.strictEqual(declined.includes('uuid-0'), false, 'the oldest is forgotten');

        await pairing.setHostDeclined(`uuid-${MAX_DECLINED_HOSTS + 4}`, false);
        declined = await pairing.getDeclinedHosts();
        assert.strictEqual(declined.includes(`uuid-${MAX_DECLINED_HOSTS + 4}`), false);
        assert.strictEqual(db.objects[DISCOVERY_META_ID].type, 'meta');
    });

    it('ignores entries that are no uuid', async () => {
        const { pairing, db } = makePairing();
        db.objects[DISCOVERY_META_ID] = { native: { declined: ['ok', 42, null, { evil: true }] } };

        assert.deepStrictEqual(await pairing.getDeclinedHosts(), ['ok']);
    });
});

describe('lib/controller/host/hostPairing: getHosts', () => {
    it('starts listening on the first call and leaves out the declined hosts and those without uuid', async () => {
        const { pairing, db, discoveries } = makePairing(withoutPairing);
        await pairing.setHostDeclined('declined-uuid', true);

        assert.strictEqual(discoveries.length, 0, 'nothing until the Admin asks');
        const first = await pairing.getHosts();
        assert.deepStrictEqual(first, []);
        assert.strictEqual(discoveries[0].listening, true);
        assert.strictEqual(db.states[`${HOST_ID}.discoveredHosts`].val, '[]', 'an old list is replaced');

        discoveries[0].hosts = [discovered('aaaaaaaaaaaaaaaa'), discovered('declined-uuid'), discovered('')];
        const hosts = await pairing.getHosts();

        assert.deepStrictEqual(
            hosts.map(host => host.uuid),
            ['aaaaaaaaaaaaaaaa'],
        );
        await pairing.close();
    });

    it('does not listen on a host with a remote database, which cannot attach others', async () => {
        const remote = { ...LOCAL_CONFIG, objects: { type: 'jsonl', host: '192.168.1.2', port: 9001 } } as any;
        const { pairing, discoveries } = makePairing(remote);

        assert.deepStrictEqual(await pairing.getHosts(), []);
        assert.strictEqual(discoveries.length, 0);
    });
});

describe('lib/controller/host/hostPairing: join', () => {
    it('lets only one join run at a time', async () => {
        let fail: (e: Error) => void = () => {};
        const { pairing } = makePairing(LOCAL_CONFIG, {
            fetchDatabases: () =>
                new Promise((_resolve, reject) => {
                    fail = reject;
                }),
        });

        const first = pairing.join('192.168.1.2', '');
        const second = await pairing.join('192.168.1.3', '');
        assert.deepStrictEqual(second, { result: false, error: 'A join is already in progress on this host' });

        fail(new Error('no answer'));
        assert.deepStrictEqual(await first, { result: false, error: 'no answer' });

        // a failed join may be retried
        const third = pairing.join('192.168.1.2', '');
        fail(new Error('no answer again'));
        assert.deepStrictEqual(await third, { result: false, error: 'no answer again' });
    });
});
