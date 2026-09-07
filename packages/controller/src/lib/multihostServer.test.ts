import assert from 'node:assert/strict';
import sinon from 'sinon';
import { MHServer } from './multihostServer.js';

/**
 * These tests drive the command dispatch of `MHServer` directly instead of over a socket.
 *
 * All four commands are unauthenticated and reachable by anything that can send a datagram, so what
 * they answer and what they refuse is the security surface of the pairing feature. Binding the real
 * port 50005 in a test would be flaky (a running ioBroker occupies it) and would add nothing: the
 * dispatch is pure message handling.
 */

const silentLogger = {
    silly: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
} as any;

const VALID_UUID = '0123456789abcdef';
const SENDER = { address: '192.168.1.10', port: 50005, family: 'IPv4', size: 0 } as any;

interface Harness {
    server: MHServer;
    /** Everything the server answered */
    sent: any[];
    /** What the in-memory decline list holds */
    declined: () => string[];
    process: (msg: Record<string, unknown>, rinfo?: any) => Promise<void>;
}

/**
 * Build a server without running its constructor, so that no socket is bound and no file is read.
 *
 * @param options Pairing behaviour under test
 * @param config Parts of the ioBroker configuration the handlers look at
 */
function makeServer(options: Record<string, unknown> = {}, config: Record<string, any> = {}): Harness {
    const server = Object.create(MHServer.prototype) as MHServer;
    const sent: any[] = [];

    Object.assign(server, {
        hostname: 'testhost',
        logger: silentLogger,
        info: { node: 'v20', arch: 'x64', model: 'test', cpus: 4, mem: 1024, ostype: 'Linux' },
        secret: false,
        options,
        config: {
            multihostService: { enabled: false, secure: false, password: '', persist: false },
            objects: { type: 'jsonl', host: '127.0.0.1' },
            states: { type: 'jsonl', host: '127.0.0.1' },
            ...config,
        },
        server: null,
        stopped: false,
        authList: {},
        buffer: {},
        lastFrame: {},
        rateLimit: new Map(),
        unclaimedCache: null,
        // pre-filled, so that readDeclined() never touches the disk
        declined: [],
        lastIdentify: new Map(),
    });

    // capture the answers instead of sending them
    (server as any).send = (msg: any): void => {
        sent.push(msg);
    };
    // keep the list in memory - storeDeclined would otherwise write next to iobroker.json
    (server as any).storeDeclined = function (list: string[]): void {
        this.declined = list;
    };

    return {
        server,
        sent,
        declined: () => (server as any).declined,
        process: (msg, rinfo = SENDER) => (server as any).process(msg, rinfo),
    };
}

describe('lib/multihostServer: browse in pairing mode', () => {
    it('never discloses the database configuration', async () => {
        const harness = makeServer(
            { pairingOnly: true, getUuid: () => VALID_UUID, isUnclaimed: () => Promise.resolve(true) },
            {
                objects: { type: 'redis', host: '10.0.0.5', port: 6379, pass: 'super-secret' },
                states: { type: 'redis', host: '10.0.0.5', port: 6379, pass: 'super-secret' },
            },
        );

        await harness.process({ cmd: 'browse', id: '1' });

        assert.strictEqual(harness.sent.length, 1);
        const answer = harness.sent[0];
        assert.strictEqual(answer.result, 'ok');
        assert.strictEqual(answer.objects, undefined, 'the objects configuration must not be handed out');
        assert.strictEqual(answer.states, undefined, 'the states configuration must not be handed out');
        assert.ok(!JSON.stringify(answer).includes('super-secret'), 'no credential may appear anywhere');
    });

    it('answers with what a master needs to offer this host', async () => {
        const harness = makeServer({
            pairingOnly: true,
            getUuid: () => VALID_UUID,
            isUnclaimed: () => Promise.resolve(true),
        });

        await harness.process({ cmd: 'browse', id: '7' });

        const answer = harness.sent[0];
        assert.strictEqual(answer.id, '7');
        assert.strictEqual(answer.hostname, 'testhost');
        assert.strictEqual(answer.uuid, VALID_UUID);
        assert.strictEqual(answer.unclaimed, true);
    });
});

describe('lib/multihostServer: join', () => {
    const joinOptions = (over: Record<string, unknown> = {}): Record<string, unknown> => ({
        pairingOnly: true,
        isUnclaimed: () => Promise.resolve(true),
        onJoin: () => Promise.resolve({ result: true }),
        ...over,
    });

    it('attaches the host when everything fits', async () => {
        const onJoin = sinon.stub().resolves({ result: true });
        const harness = makeServer(joinOptions({ onJoin }));

        await harness.process({ cmd: 'join', id: '1', masterUuid: VALID_UUID, password: 'pw' });

        assert.strictEqual(harness.sent[0].result, 'ok');
        assert.deepStrictEqual(onJoin.firstCall.args, ['192.168.1.10', 'pw']);
    });

    it('refuses when this host is not offering itself for pairing', async () => {
        const onJoin = sinon.stub().resolves({ result: true });
        const harness = makeServer(joinOptions({ pairingOnly: false, onJoin }));

        await harness.process({ cmd: 'join', id: '1', masterUuid: VALID_UUID });

        assert.strictEqual(harness.sent[0].result, 'not in pairing mode');
        assert.strictEqual(onJoin.callCount, 0);
    });

    it('refuses when this host already belongs to a system', async () => {
        const onJoin = sinon.stub().resolves({ result: true });
        const harness = makeServer(joinOptions({ isUnclaimed: () => Promise.resolve(false), onJoin }));

        await harness.process({ cmd: 'join', id: '1', masterUuid: VALID_UUID });

        assert.strictEqual(harness.sent[0].result, 'already claimed');
        assert.strictEqual(onJoin.callCount, 0);
    });

    it('refuses a master the user declined', async () => {
        const onJoin = sinon.stub().resolves({ result: true });
        const harness = makeServer(joinOptions({ onJoin }));
        (harness.server as any).declined = [VALID_UUID];

        await harness.process({ cmd: 'join', id: '1', masterUuid: VALID_UUID });

        assert.strictEqual(harness.sent[0].result, 'declined');
        assert.strictEqual(onJoin.callCount, 0);
    });

    it('refuses a master that does not identify itself', async () => {
        const onJoin = sinon.stub().resolves({ result: true });
        const harness = makeServer(joinOptions({ onJoin }));

        // a decline is keyed by the master uuid, so omitting it would side-step the list above
        await harness.process({ cmd: 'join', id: '1' });
        await harness.process({ cmd: 'join', id: '2', masterUuid: 'nonsense' });

        assert.deepStrictEqual(
            harness.sent.map(answer => answer.result),
            ['error', 'error'],
        );
        assert.strictEqual(onJoin.callCount, 0);
    });
});

describe('lib/multihostServer: decline', () => {
    it('stores and revokes a decision', async () => {
        const harness = makeServer({ pairingOnly: true });

        await harness.process({ cmd: 'decline', id: '1', masterUuid: VALID_UUID });
        assert.deepStrictEqual(harness.declined(), [VALID_UUID]);

        await harness.process({ cmd: 'decline', id: '2', masterUuid: VALID_UUID, revoke: true });
        assert.deepStrictEqual(harness.declined(), []);
    });

    it('refuses a masterUuid that is missing or malformed', async () => {
        const harness = makeServer({ pairingOnly: true });

        await harness.process({ cmd: 'decline', id: '1' });
        await harness.process({ cmd: 'decline', id: '2', masterUuid: 'x'.repeat(5_000) });

        assert.deepStrictEqual(
            harness.sent.map(answer => answer.result),
            ['error', 'error'],
        );
        assert.deepStrictEqual(harness.declined(), []);
    });

    it('does not grow the list without end', async () => {
        const harness = makeServer({ pairingOnly: true });

        for (let i = 0; i < 150; i++) {
            await harness.process({
                cmd: 'decline',
                id: `${i}`,
                masterUuid: `${i}`.padStart(16, '0'),
            });
            // stay under the rate limit, this is not what is being tested here
            (harness.server as any).rateLimit.clear();
        }

        assert.strictEqual(harness.declined().length, 100);
    });
});

describe('lib/multihostServer: identify', () => {
    it('always answers but does not log every packet', async () => {
        const logger = { ...silentLogger, info: sinon.stub() };
        const harness = makeServer({ pairingOnly: true });
        (harness.server as any).logger = logger;

        for (let i = 0; i < 5; i++) {
            await harness.process({ cmd: 'identify', id: `${i}` });
        }

        assert.strictEqual(harness.sent.length, 5, 'every packet is answered');
        assert.strictEqual(logger.info.callCount, 1, 'but the log line is written once per window');
    });
});

describe('lib/multihostServer: rate limit', () => {
    it('stops answering a sender that floods and keeps serving another one', async () => {
        const harness = makeServer({
            pairingOnly: true,
            getUuid: () => VALID_UUID,
            isUnclaimed: () => Promise.resolve(true),
        });

        for (let i = 0; i < 40; i++) {
            await harness.process({ cmd: 'browse', id: `${i}` });
        }

        assert.strictEqual(harness.sent.length, 20, 'the sender is cut off after its budget');

        const otherSender = { ...SENDER, address: '192.168.1.11' };
        await harness.process({ cmd: 'browse', id: 'x' }, otherSender);

        assert.strictEqual(harness.sent.length, 21, 'a different address is unaffected');
    });
});

describe('lib/multihostServer: isUnclaimed is cached', () => {
    it('does not query the objects database per datagram', async () => {
        const isUnclaimed = sinon.stub().resolves(true);
        const harness = makeServer({ pairingOnly: true, getUuid: () => VALID_UUID, isUnclaimed });

        for (let i = 0; i < 10; i++) {
            await harness.process({ cmd: 'browse', id: `${i}` });
        }

        assert.strictEqual(harness.sent.length, 10);
        assert.strictEqual(isUnclaimed.callCount, 1);
    });
});
