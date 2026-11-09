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

/** One connection through the proxy */
interface ProxiedConnection {
    /** The socket to the client */
    client: net.Socket;
    /** If true, nothing is forwarded anymore, while the client still sees an open connection */
    silent: boolean;
}

/** Something to publish, and how to tell that the subscriber got it */
type Delivery = [publish: () => Promise<unknown>, received: () => boolean];

/** A TCP proxy to a database which can make connections go silent, like one whose peer restarted unnoticed */
class SilencingProxy {
    /** All connections in the order they were opened: the main client connects first */
    readonly connections: ProxiedConnection[] = [];
    readonly #server: net.Server;

    /**
     * @param targetPort port of the database
     */
    constructor(targetPort: number) {
        this.#server = net.createServer(client => {
            const connection: ProxiedConnection = { client, silent: false };
            this.connections.push(connection);
            const target = net.connect(targetPort, '127.0.0.1');

            client.on('data', data => !connection.silent && target.write(data));
            target.on('data', data => !connection.silent && client.write(data));
            client.on('close', () => target.destroy());
            target.on('close', () => client.destroy());
            client.on('error', () => target.destroy());
            target.on('error', () => client.destroy());
        });
    }

    /** Start the proxy and return its port */
    listen(): Promise<number> {
        return new Promise(resolve =>
            this.#server.listen(0, '127.0.0.1', () => resolve((this.#server.address() as net.AddressInfo).port)),
        );
    }

    /** Let the pub/sub connections go silent and make the main client notice that its connection is lost */
    silenceSubscribersAndDropMainClient(): void {
        const [main, ...subscribers] = this.connections;
        for (const subscriber of subscribers) {
            subscriber.silent = true;
        }
        main.client.destroy();
    }

    /** Stop the proxy with all its connections */
    close(): void {
        this.#server.close();
        for (const { client } of this.connections) {
            client.destroy();
        }
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
 * Publish until the subscriber got it
 *
 * @param delivery what to publish and how to tell that it arrived
 * @param timeoutMs give up after this time
 */
async function isDelivered(delivery: Delivery, timeoutMs: number): Promise<boolean> {
    const [publish, received] = delivery;
    const end = Date.now() + timeoutMs;
    while (Date.now() < end) {
        await publish();
        await wait(50);
        if (received()) {
            return true;
        }
    }
    return false;
}

describe('Pub/sub sockets after a reconnect of the main client', function () {
    this.timeout(30_000);

    let dataDir: string;
    let proxy: SilencingProxy;
    let proxyPort: number;
    let serverPort: number;
    /** What the client received since the last reconnect */
    let received: Set<string>;
    const toDestroy: { destroy: () => Promise<void> }[] = [];

    beforeEach(async () => {
        dataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pubsub-reconnect-'));
        serverPort = await getFreePort();
        proxy = new SilencingProxy(serverPort);
        proxyPort = await proxy.listen();
        received = new Set();
    });

    afterEach(async () => {
        proxy.close();
        for (const db of toDestroy.splice(0).reverse()) {
            await db.destroy();
        }
        await fs.rm(dataDir, { recursive: true, force: true });
    });

    /**
     * Check that everything arrives before and after the reconnect
     *
     * @param deliveries everything the client subscribed to
     */
    async function assertDeliveredAroundReconnect(deliveries: Delivery[]): Promise<void> {
        // the first connect must not replace the two pub/sub sockets
        assert.equal(proxy.connections.length, 3);
        for (const delivery of deliveries) {
            assert.equal(await isDelivered(delivery, 2_000), true, 'not delivered before the reconnect');
        }

        proxy.silenceSubscribersAndDropMainClient();
        received.clear();

        for (const delivery of deliveries) {
            assert.equal(await isDelivered(delivery, 5_000), true, 'not delivered after the reconnect');
        }
        assert.equal(proxy.connections.length, 6);
    }

    it('states: messages and state changes arrive again', async () => {
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
                    namespace: 'client',
                    logger,
                    connected,
                    change: (id: string) => received.add(id),
                    changeUser: (id: string) => received.add(id),
                } as any),
        );
        toDestroy.push(client);

        await client.subscribeMessage('system.host.test');
        await client.subscribe('system.test');
        await client.subscribeUser('user.test');

        await assertDeliveredAroundReconnect([
            [
                () =>
                    server.pushMessage('system.host.test', {
                        command: 'test',
                        message: null,
                        from: 'system.host.other',
                    }),
                () => received.has('messagebox.system.host.test'),
            ],
            [() => server.setState('system.test', { val: Date.now() }), () => received.has('system.test')],
            [() => server.setState('user.test', { val: Date.now() }), () => received.has('user.test')],
        ]);
    });

    it('objects: object changes arrive again', async () => {
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
        const client = await connect(
            connected =>
                new ObjectsClient({
                    connection: connection('redis', proxyPort),
                    namespace: 'client',
                    logger,
                    connected,
                    change: (id: string) => received.add(id),
                    changeUser: (id: string) => received.add(id),
                } as any),
        );
        toDestroy.push(client);

        await client.subscribeAsync('system.test');
        await client.subscribeUserAsync('user.test', null);

        const setObject = (id: string): Promise<unknown> =>
            server.setObject(id, {
                type: 'state',
                common: { name: `${Date.now()}`, type: 'number', role: 'state', read: true, write: true },
                native: {},
            });

        await assertDeliveredAroundReconnect([
            [() => setObject('system.test'), () => received.has('system.test')],
            [() => setObject('user.test'), () => received.has('user.test')],
        ]);
    });
});
