import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as wait } from 'node:timers/promises';
import { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import { Server as ObjectsServer } from '@iobroker/db-objects-jsonl';
import { Client as StatesClient } from '@iobroker/db-states-redis';
import { Server as StatesServer } from '@iobroker/db-states-jsonl';

const logger = {
    silly: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    level: 'error',
};

/** A TCP proxy to a database which can drop all connections, like a network outage */
class DroppingProxy {
    readonly #sockets = new Set<net.Socket>();
    readonly #server: net.Server;

    /**
     * @param targetPort port of the database
     */
    constructor(targetPort: number) {
        this.#server = net.createServer(client => {
            const target = net.connect(targetPort, '127.0.0.1');
            this.#sockets.add(client);
            client.pipe(target).pipe(client);
            const close = (): void => {
                client.destroy();
                target.destroy();
                this.#sockets.delete(client);
            };
            client.on('close', close).on('error', close);
            target.on('close', close).on('error', close);
        });
    }

    /** Start the proxy and return its port */
    listen(): Promise<number> {
        return new Promise(resolve =>
            this.#server.listen(0, '127.0.0.1', () => resolve((this.#server.address() as net.AddressInfo).port)),
        );
    }

    /** Drop all connections, the clients reconnect */
    dropAll(): void {
        for (const socket of this.#sockets) {
            socket.destroy();
        }
    }

    /** Stop the proxy */
    close(): void {
        this.#server.close();
        this.dropAll();
    }
}

/** A fence whose result the test decides */
class ControlledFence {
    calls = 0;
    #resolve: ((passed: boolean) => void) | null = null;

    /** The fence callback for the client */
    readonly fence = (): Promise<boolean> => {
        this.calls++;
        return new Promise(resolve => (this.#resolve = resolve));
    };

    /**
     * Answer the running fence
     *
     * @param passed whether the instance is still the one assigned to this host
     */
    answer(passed: boolean): void {
        this.#resolve?.(passed);
    }
}

/** Get a port which is free at the moment */
function getFreePort(): Promise<number> {
    return new Promise(resolve => {
        const server = net.createServer();
        server.listen(0, '127.0.0.1', () => {
            const { port } = server.address() as net.AddressInfo;
            server.close(() => resolve(port));
        });
    });
}

/**
 * Create a database and wait until it is connected
 *
 * @param create creates the database, which has to call the given function when it is connected
 */
function connect<T>(create: (connected: () => void) => T): Promise<T> {
    return new Promise(resolve => {
        const db = create(() => resolve(db));
    });
}

/**
 * Connection settings of a database
 *
 * @param type type of the database
 * @param port port of the database
 * @param dataDir directory of the database, if it is a server
 */
function connection(type: string, port: number, dataDir = ''): Record<string, any> {
    return { type, host: '127.0.0.1', port, dataDir, options: { retry_max_delay: 100 } };
}

/**
 * Wait until the condition holds
 *
 * @param condition what to wait for
 * @param timeoutMs give up after this time
 */
async function until(condition: () => boolean, timeoutMs = 5_000): Promise<void> {
    const end = Date.now() + timeoutMs;
    while (!condition()) {
        if (Date.now() > end) {
            throw new Error('condition not met in time');
        }
        await wait(20);
    }
}

describe('Fence after a reconnect', function () {
    this.timeout(30_000);

    let dataDir: string;
    let proxy: DroppingProxy;
    let proxyPort: number;
    let serverPort: number;
    const toDestroy: { destroy: () => Promise<void> }[] = [];

    beforeEach(async () => {
        dataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fence-'));
        serverPort = await getFreePort();
        proxy = new DroppingProxy(serverPort);
        proxyPort = await proxy.listen();
    });

    afterEach(async () => {
        proxy.close();
        for (const db of toDestroy.splice(0).reverse()) {
            await db.destroy();
        }
        await fs.rm(dataDir, { recursive: true, force: true });
    });

    /**
     * Start a states server and a client with a fence, connected through the proxy
     *
     * @param fence the fence of the client
     * @param received gets the ids of the state changes the client receives
     */
    async function statesWithFence(
        fence: ControlledFence,
        received: Set<string> = new Set(),
    ): Promise<{ server: StatesServer; client: StatesClient }> {
        const server = await connect(
            connected =>
                new StatesServer({
                    connection: connection('jsonl', serverPort, dataDir),
                    namespace: 'server',
                    logger,
                    connected,
                    change: () => {},
                } as any),
        );
        toDestroy.push(server);
        const client = await connect(
            connected =>
                new StatesClient({
                    connection: connection('redis', proxyPort),
                    namespace: 'adapter',
                    logger,
                    connected,
                    fence: fence.fence,
                    change: (id: string) => received.add(id),
                } as any),
        );
        toDestroy.push(client);
        return { server, client };
    }

    it('states: holds the writes of the gap and of the fence until the fence passes', async () => {
        const fence = new ControlledFence();
        const { server, client } = await statesWithFence(fence);

        proxy.dropAll();
        // after the client noticed the lost connection; a command in flight at that moment is not held
        await wait(50);
        const inGap = client.setState('test.gap', { val: 1 });
        await until(() => fence.calls > 0);
        const duringFence = client.setState('test.during', { val: 2 });
        await wait(300);

        assert.equal(await server.getState('test.gap'), null);
        assert.equal(await server.getState('test.during'), null);

        fence.answer(true);
        await Promise.all([inGap, duringFence]);

        assert.equal((await server.getState('test.gap'))?.val, 1);
        assert.equal((await server.getState('test.during'))?.val, 2);
        // one fence for the reconnect, not one per socket
        await wait(300);
        assert.equal(fence.calls, 1);
    });

    it('states: a write in flight at the loss fails instead of arriving later', async () => {
        const fence = new ControlledFence();
        const { server, client } = await statesWithFence(fence);

        proxy.dropAll();
        const inFlight = client.setState('test.inflight', { val: 1 });

        await assert.rejects(inFlight);
        await until(() => fence.calls > 0);
        fence.answer(true);
        await wait(300);
        assert.equal(await server.getState('test.inflight'), null);
    });

    it('states: sends nothing held if the fence fails', async () => {
        const fence = new ControlledFence();
        const { server, client } = await statesWithFence(fence);

        proxy.dropAll();
        await wait(50);
        void client.setState('test.gap', { val: 1 });
        await until(() => fence.calls > 0);
        fence.answer(false);
        await wait(500);

        assert.equal(await server.getState('test.gap'), null);
    });

    it('states: replays the subscriptions only after the fence passes', async () => {
        const fence = new ControlledFence();
        const received = new Set<string>();
        const { server, client } = await statesWithFence(fence, received);
        await client.subscribe('test.sub');

        proxy.dropAll();
        await until(() => fence.calls > 0);
        for (let i = 0; i < 5; i++) {
            await server.setState('test.sub', { val: i });
            await wait(50);
        }
        assert.equal(received.has('test.sub'), false);

        fence.answer(true);
        await until(() => {
            void server.setState('test.sub', { val: Date.now() });
            return received.has('test.sub');
        });
    });

    it('objects: the fence reads through the gate of its own client', async () => {
        const server = await connect(
            connected =>
                new ObjectsServer({
                    connection: connection('jsonl', serverPort, dataDir),
                    namespace: 'server',
                    logger,
                    connected,
                    change: () => {},
                } as any),
        );
        toDestroy.push(server);
        await server.setObject('system.adapter.test.0', {
            type: 'instance',
            common: { name: 'test', host: 'thisHost' },
            native: {},
        } as any);

        let fenceHost: string | undefined;
        const client: ObjectsClient = await connect(
            connected =>
                new ObjectsClient({
                    connection: connection('redis', proxyPort),
                    namespace: 'adapter',
                    logger,
                    connected,
                    fence: async () => {
                        const obj = await client.getObjectForFence('system.adapter.test.0');
                        fenceHost = (obj as ioBroker.InstanceObject | null)?.common.host;
                        return fenceHost === 'thisHost';
                    },
                    change: () => {},
                } as any),
        );
        toDestroy.push(client);

        proxy.dropAll();
        await wait(50);
        const write = client.setObject('test.object', {
            type: 'state',
            common: { name: 'x', type: 'number', role: 'state', read: true, write: true },
            native: {},
        });
        await until(() => fenceHost !== undefined);
        await write;

        assert.equal(fenceHost, 'thisHost');
        assert.ok(await server.getObject('test.object'));
    });
});
