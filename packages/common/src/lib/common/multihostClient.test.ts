import assert from 'node:assert/strict';
import sinon from 'sinon';
import { MHClient } from './multihostClient.js';

/**
 * `connect()` hands whatever it receives straight to the caller, which writes it into
 * `iobroker.json` and restarts the controller. These tests pin the two properties that decide
 * whether a stranger can put himself in the middle of that: only the host we asked may answer, and
 * the id an answer is correlated on must not be guessable.
 *
 * `startServer` is stubbed out, so the handler is exercised without a socket.
 */

interface Captured {
    onReady: () => void;
    onMessage: (msg: any, rinfo: any) => boolean;
    onFinished: (err?: Error) => void;
}

/**
 * Build a client whose socket layer is replaced by a stub, and get hold of its message handler.
 *
 * @param client The client to prepare
 */
function captureHandler(client: MHClient): Captured {
    let captured: Captured | undefined;

    (client as any).startServer = (
        _isBroadcast: boolean,
        _timeout: number,
        onReady: () => void,
        onMessage: (msg: any, rinfo: any) => boolean,
        onFinished: (err?: Error) => void,
    ): void => {
        captured = { onReady, onMessage, onFinished };
    };
    (client as any).server = { send: (): void => {} };
    (client as any).stopServer = (): void => {};

    return new Proxy({} as Captured, {
        get: (_target, prop) => (captured as any)[prop],
    });
}

describe('lib/multihostClient: connect only trusts the host it asked', () => {
    const TARGET = '192.168.1.50';

    it('ignores a browse answer from another address', () => {
        const client = new MHClient();
        const handler = captureHandler(client);
        const callback = sinon.stub();

        client.connect(TARGET, '', callback);
        handler.onReady();

        const answer = {
            cmd: 'browse',
            id: (client as any).id,
            result: 'ok',
            objects: { type: 'redis', host: '10.6.6.6' },
            states: { type: 'redis', host: '10.6.6.6' },
        };

        const handled = handler.onMessage(answer, { address: '10.6.6.6', port: 50_005 });

        assert.strictEqual(handled, false, 'the answer must not be treated as ours');
        assert.strictEqual(callback.callCount, 0, 'no configuration may reach the caller');
    });

    it('accepts the answer of the host it asked', () => {
        const client = new MHClient();
        const handler = captureHandler(client);
        const callback = sinon.stub();

        client.connect(TARGET, '', callback);
        handler.onReady();

        handler.onMessage(
            {
                cmd: 'browse',
                id: (client as any).id,
                result: 'ok',
                objects: { type: 'redis', host: '192.168.1.50' },
                states: { type: 'redis', host: '192.168.1.50' },
            },
            { address: TARGET, port: 50_005 },
        );

        assert.strictEqual(callback.callCount, 1);
        const [err, objects, states, address] = callback.firstCall.args;
        assert.strictEqual(err, undefined);
        assert.strictEqual(objects.host, '192.168.1.50');
        assert.strictEqual(states.host, '192.168.1.50');
        assert.strictEqual(address, TARGET);
    });
});

describe('lib/multihostClient: the message id is not predictable', () => {
    it('does not start every client at the same value', () => {
        const ids = new Set<number>();

        for (let i = 0; i < 25; i++) {
            const client = new MHClient();
            const id = (client as any).id as number;
            assert.notStrictEqual(id, 1, 'a fixed start would make the first request of every connect id 2');
            ids.add(id);
        }

        assert.ok(ids.size > 1, 'the seed has to vary between clients');
    });
});

describe('lib/multihostClient: browse reports where an answer came from', () => {
    it('takes the address of the packet when the answer carries none', async () => {
        const client = new MHClient();
        const handler = captureHandler(client);

        const pending = client.browse(1_000, false);
        handler.onReady();
        // TEST-NET-3, never one of the addresses of the machine running the test
        handler.onMessage(
            { cmd: 'browse', id: 1, result: 'ok', hostname: 'fresh', uuid: '0123456789abcdef' },
            { address: '203.0.113.7', port: 50_005 },
        );
        handler.onFinished();

        const list = await pending;
        assert.strictEqual(list.length, 1);
        assert.strictEqual(list[0].ip, '203.0.113.7', 'without it, a master has no address to send the join to');
        assert.strictEqual(list[0].uuid, '0123456789abcdef');
    });
});

describe('lib/multihostClient: sendCommand only trusts the host it asked', () => {
    const TARGET = '192.168.1.50';

    it('ignores an answer with the right id from another address', async () => {
        const client = new MHClient();
        const handler = captureHandler(client);

        const pending = client.sendCommand(TARGET, 'join', { masterUuid: '0123456789abcdef' });
        const id = (client as any).id as number;
        handler.onReady();

        const spoofed = handler.onMessage({ cmd: 'join', id, result: 'ok' }, { address: '10.6.6.6', port: 50_005 });
        assert.strictEqual(spoofed, false, 'a stranger must not be able to confirm a join or a decline');

        const real = handler.onMessage({ cmd: 'join', id, result: 'declined' }, { address: TARGET, port: 50_005 });
        assert.strictEqual(real, true);
        assert.strictEqual((await pending).result, 'declined');
    });
});
