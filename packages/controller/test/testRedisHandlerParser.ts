import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import type { Socket } from 'node:net';
import { RedisHandler } from '@iobroker/db-base';

const log = {
    error: (): void => {},
    warn: (): void => {},
    info: (): void => {},
    debug: (): void => {},
    silly: (): void => {},
};

/** Socket stand-in: the handler only listens to `data`/`error` and writes responses */
class FakeSocket extends EventEmitter {
    remoteAddress = '127.0.0.1';
    remotePort = 12345;
    written: Buffer[] = [];

    /**
     * Collect a response of the handler
     *
     * @param data the response
     */
    write(data: Buffer): boolean {
        this.written.push(data);
        return true;
    }

    /** Close the socket */
    end(): void {}

    /** Destroy the socket */
    destroy(): void {}
}

/**
 * Encode a request like a Redis client does
 *
 * @param args command and arguments
 */
function encodeRequest(args: (string | Buffer)[]): Buffer {
    const parts: Buffer[] = [Buffer.from(`*${args.length}\r\n`)];
    for (const arg of args) {
        const buf = Buffer.isBuffer(arg) ? arg : Buffer.from(arg);
        parts.push(Buffer.from(`$${buf.length}\r\n`), buf, Buffer.from('\r\n'));
    }
    return Buffer.concat(parts);
}

/**
 * Feed a byte stream in chunks of the given size into a new handler and collect the commands it emits
 *
 * @param stream the received bytes
 * @param chunkSize size of each chunk
 * @param handleAsBuffers handler option, keeps binary values of `set` as Buffer
 */
function receive(stream: Buffer, chunkSize: number, handleAsBuffers = false): unknown[][] {
    const socket = new FakeSocket();
    const handler = new RedisHandler(socket as unknown as Socket, { log, handleAsBuffers });
    const received: unknown[][] = [];
    for (const command of ['set', 'get', 'publish', 'mget']) {
        handler.on(command, (data: unknown[]) => received.push([command, ...data]));
    }
    for (let offset = 0; offset < stream.length; offset += chunkSize) {
        socket.emit('data', stream.subarray(offset, offset + chunkSize));
    }
    return received;
}

/**
 * Wait until the handler emitted its commands (it emits them via setImmediate)
 */
function nextTick(): Promise<void> {
    return new Promise(resolve => setImmediate(resolve));
}

describe('RedisHandler: parsing of received requests', () => {
    const commands = [
        encodeRequest(['set', 'io.test.0.a', '{"val":1}']),
        encodeRequest(['get', 'io.test.0.a']),
        encodeRequest(['mget', 'io.a', 'io.b', 'io.c']),
        encodeRequest(['set', 'io.test.0.empty', '']),
        encodeRequest(['publish', 'messagebox.system.adapter.test.0', 'x'.repeat(70_000)]),
        encodeRequest(['set', 'io.test.0.umlaut', 'äöü €']),
    ];
    const stream = Buffer.concat(commands);

    it('emits the same commands for every chunk size as for the whole stream', async () => {
        const whole = receive(stream, stream.length);
        await nextTick();
        assert.equal(whole.length, commands.length);

        for (const chunkSize of [1, 2, 3, 7, 16, 100, 4096, 65_536]) {
            const chunked = receive(stream, chunkSize);
            await nextTick();
            assert.deepEqual(chunked, whole, `chunk size ${chunkSize}`);
        }
    });

    it('keeps binary values of set as Buffer when splitting the stream', async () => {
        const binary = Buffer.from(Array.from({ length: 300_000 }, (_, i) => i % 256));
        const request = encodeRequest(['set', 'io.test.0.file', binary]);
        const received = receive(request, 1000, true);
        await nextTick();
        assert.equal(received.length, 1);
        assert.ok(Buffer.isBuffer(received[0][2]));
        assert.ok(binary.equals(received[0][2]));
    });

    it('copies a large value once instead of for every received chunk', async () => {
        // e.g. the answer of "getRepository" (about 13 MB) that the host sends to admin via the messagebox
        const value = JSON.stringify({ command: 'getRepository', message: 'r'.repeat(4 * 1024 * 1024) });
        const request = encodeRequest(['publish', 'messagebox.system.adapter.admin.0', value]);

        const originalAllocUnsafe = Buffer.allocUnsafe;
        let allocated = 0;
        Buffer.allocUnsafe = (size: number) => {
            allocated += size;
            return originalAllocUnsafe(size);
        };
        let received: unknown[][];
        try {
            received = receive(request, 16 * 1024);
        } finally {
            Buffer.allocUnsafe = originalAllocUnsafe;
        }
        await nextTick();

        assert.equal(received.length, 1);
        assert.equal(received[0][2], value);
        // the old parser allocated the received rest again for every one of the 257 chunks: about 528 MB here
        assert.ok(
            allocated < 3 * request.length,
            `allocated ${allocated} bytes to parse a request of ${request.length} bytes`,
        );
    });
});
