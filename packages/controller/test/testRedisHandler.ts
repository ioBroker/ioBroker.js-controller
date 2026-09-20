import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import type { Socket } from 'node:net';

import { RedisHandler } from '@iobroker/db-base';

/**
 * A socket that records what was written to it instead of sending it anywhere.
 *
 * Only three things are ever touched on the real socket -- `remoteAddress`, `remotePort` and
 * `write`, plus the `data` and `error` events an EventEmitter already provides.
 */
class FakeSocket extends EventEmitter {
    remoteAddress = '127.0.0.1';
    remotePort = 6379;
    written: Buffer[] = [];

    write(data: Buffer): boolean {
        this.written.push(data);
        return true;
    }

    destroy(): void {
        // nothing to tear down
    }

    /** Everything the handler has written so far, as one string. */
    get text(): string {
        return Buffer.concat(this.written).toString();
    }
}

/**
 * Encode a command the way a redis client sends it, so the handler's parser accepts it.
 *
 * @param args the command name followed by its arguments
 */
function command(...args: string[]): Buffer {
    return Buffer.from(`*${args.length}\r\n${args.map(arg => `$${Buffer.byteLength(arg)}\r\n${arg}\r\n`).join('')}`);
}

const silentLog = {
    silly: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
};

/** Give the handler's `setImmediate` chain time to run. */
function settle(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 50));
}

describe('RedisHandler: a throwing command handler', () => {
    let socket: FakeSocket;
    let handler: RedisHandler;
    let uncaught: Error[];
    let originalListeners: NodeJS.UncaughtExceptionListener[];

    beforeEach(() => {
        socket = new FakeSocket();
        handler = new RedisHandler(socket as unknown as Socket, {
            log: silentLog,
            handleAsBuffers: false,
        });

        // Mocha installs its own uncaughtException handling; take it off so this test observes the
        // exception itself rather than failing the run somewhere else.
        uncaught = [];
        originalListeners = process.listeners('uncaughtException');
        process.removeAllListeners('uncaughtException');
        process.on('uncaughtException', (e: Error) => uncaught.push(e));
    });

    afterEach(() => {
        process.removeAllListeners('uncaughtException');
        originalListeners.forEach(listener => process.on('uncaughtException', listener));
    });

    it('answers with an error instead of escaping the event loop', async () => {
        // A command handler runs inside setImmediate, so anything it throws used to be an uncaught
        // exception rather than a failed command: no reply reached the client, and the process was
        // left to whatever uncaughtException handling it happened to have. Since the arguments come
        // off a socket, one client could take the database server down with a single message.
        handler.on('publish', () => {
            throw new Error('nope');
        });

        socket.emit('data', command('publish', 'log.somewhere', '{not json'));
        await settle();

        assert.deepEqual(uncaught, [], 'a failing command must not become an uncaught exception');
        assert.match(socket.text, /-.*nope/, 'the client has to be told the command failed');
    });

    it('keeps the error on one line, whatever the client put in it', async () => {
        // A RESP error is one line and is written out as it is, while its text carries what the client sent:
        // the id of a command, or the payload a JSON parser quotes back. A CR or LF in there would end the
        // frame, and what follows would be read as the answer to another command - the client tears the
        // connection down, which is the failure answering instead of throwing is supposed to avoid.
        handler.on('publish', () => {
            throw new Error('nope\r\n-INJECTED\r\n');
        });

        socket.emit('data', command('publish', 'log.somewhere', '{not json'));
        await settle();

        const frames = socket.text.split('\r\n').filter(line => line !== '');
        assert.equal(frames.length, 1, `one frame only, got ${JSON.stringify(socket.text)}`);
        assert.match(frames[0], /^-/, 'and it is the error');
        assert.match(frames[0], /INJECTED/, 'the text is kept, it is only put on one line');
    });

    it('keeps serving the next command', async () => {
        // The point of answering rather than throwing: the connection survives. A client that sent
        // one bad message should not lose the ones after it.
        handler.on('publish', () => {
            throw new Error('nope');
        });
        handler.on('ping', (_data, responseId) => handler.sendString(responseId, 'PONG'));

        socket.emit('data', command('publish', 'log.somewhere', '{not json'));
        await settle();
        socket.written = [];

        socket.emit('data', command('ping'));
        await settle();

        assert.deepEqual(uncaught, []);
        assert.match(socket.text, /PONG/, 'the connection is still usable');
    });

    it('leaves a working command alone', async () => {
        handler.on('ping', (_data, responseId) => handler.sendString(responseId, 'PONG'));

        socket.emit('data', command('ping'));
        await settle();

        assert.deepEqual(uncaught, []);
        assert.match(socket.text, /PONG/);
        assert.doesNotMatch(socket.text, /^-/m, 'nothing failed, so nothing should be reported');
    });
});
