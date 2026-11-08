import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import sinon from 'sinon';
import { getSupportedFeatures } from '@iobroker/js-controller-common';
import { LogReadError, parseGetLogsMessage, readLogTail } from '../src/lib/logsReader.js';

/** A log file as it is written on disk: the level is wrapped in color codes, entries can span lines */
const LOG_CONTENT = [
    '2026-08-06 10:00:00.001  - [32minfo[39m: host.test first info',
    '2026-08-06 10:00:00.002  - [34mdebug[39m: host.test some debug',
    '2026-08-06 10:00:00.003  - [33mwarn[39m: host.test a warning',
    '2026-08-06 10:00:00.004  - [31merror[39m: host.test an error',
    '    at Immediate.<anonymous> (/opt/iobroker/test.ts:1:1)',
    '    at process.processImmediate (node:internal/timers:1:1)',
    '2026-08-06 10:00:00.005  - [32minfo[39m: host.test second info',
].join('\n');

/** Small enough that the generated log is read in a few hundred chunks */
const SMALL_CHUNKS = { chunkBytes: 1000, maxBytes: 20 * 1024 * 1024 };

/**
 * Wrap a level in the color codes the logger puts around it
 *
 * @param level the level as it is written in the log file
 * @param color the ANSI color code the logger uses for this level
 */
function colored(level: string, color: number): string {
    const esc = String.fromCharCode(27);
    return `${esc}[${color}m${level}${esc}[39m`;
}

/**
 * A log in which the errors are spread among many info lines, each of them with a stack trace
 *
 * Most of the text is umlauts, which take two bytes each, so a good part of the chunk boundaries falls
 * inside a character. The file starts with the end of an entry that began in the file before.
 */
function generateLog(): { content: string; errors: string[][] } {
    const lines = ['    at leftover (/opt/iobroker/yesterday.js:1:1)'];
    const errors: string[][] = [];

    for (let i = 0; i < 2000; i++) {
        const time = `2026-08-06 10:00:${String(Math.floor(i / 1000)).padStart(2, '0')}.${String(i % 1000).padStart(3, '0')}`;

        if (i % 25 === 0) {
            const entry = [
                `${time}  - ${colored('error', 31)}: host.test Größe überschritten #${i}`,
                `    at prüfe (/opt/iobroker/größe.js:${i}:1)`,
                `    at Immediate.<anonymous> (/opt/iobroker/äöü.js:${i}:2)`,
            ];
            errors.push(entry);
            lines.push(...entry);
        } else {
            lines.push(`${time}  - ${colored('info', 32)}: host.test #${i} ${'ü'.repeat(40)}`);
        }
    }

    // the last entry is an info, so the empty line after the final line break is not part of a result
    return { content: `${lines.join('\n')}\n`, errors };
}

describe('test logsReader', () => {
    let dir: string;
    let logFile: string;

    /**
     * Write a log file for one test
     *
     * @param name file name
     * @param content what the file contains
     */
    async function writeLog(name: string, content: string): Promise<string> {
        const file = path.join(dir, name);
        await fs.writeFile(file, content);
        return file;
    }

    before(async () => {
        dir = await fs.mkdtemp(path.join(os.tmpdir(), 'iob-logs-'));
        logFile = await writeLog('iobroker.log', LOG_CONTENT);
    });

    after(async () => {
        await fs.remove(dir);
    });

    it('announces the feature so requesters can detect an older host', () => {
        // an older js-controller does not know the flag and answers "false" to checkFeatureSupported,
        // which is how admin can tell that it has to stay with the plain number of lines
        assert.ok(getSupportedFeatures().includes('CONTROLLER_GET_LOGS_LOG_LEVEL'));
    });

    it('parseGetLogsMessage stays backward compatible', () => {
        // the message used to be just the number of lines
        assert.deepStrictEqual(parseGetLogsMessage(500), { lines: 500 });
        // no message at all keeps the defaults
        assert.deepStrictEqual(parseGetLogsMessage(undefined), {});
        // the new object form
        assert.deepStrictEqual(parseGetLogsMessage({ lines: 100, logLevel: 'warn' }), {
            lines: 100,
            logLevel: 'warn',
        });
        // an unknown level is ignored instead of hiding everything
        assert.deepStrictEqual(parseGetLogsMessage({ lines: 100, logLevel: 'bogus' }), {
            lines: 100,
            logLevel: undefined,
        });
    });

    it('parseGetLogsMessage accepts the shapes a message can arrive in', () => {
        // the old handler multiplied the message, so a numeric string worked and still does
        assert.deepStrictEqual(parseGetLogsMessage('500'), { lines: 500 });
        assert.strictEqual(parseGetLogsMessage({ lines: '500' }).lines, 500);
        assert.strictEqual(parseGetLogsMessage(12.7).lines, 12);

        // anything that is not at least one line means the default
        for (const message of [0, -5, 0.5, NaN, Infinity, '', 'abc', null, true, [], [500]]) {
            assert.strictEqual(parseGetLogsMessage(message).lines, undefined, JSON.stringify(message));
        }
        for (const lines of [0, -5, '', 'abc', null, {}]) {
            assert.strictEqual(parseGetLogsMessage({ lines }).lines, undefined, JSON.stringify(lines));
        }

        assert.deepStrictEqual(parseGetLogsMessage({ logLevel: 'error' }), { lines: undefined, logLevel: 'error' });
        assert.strictEqual(parseGetLogsMessage({ logLevel: 3 }).logLevel, undefined);
    });

    it('takes a number of lines that is not one for the default', async () => {
        const unfiltered = await readLogTail(logFile, {});

        for (const lines of [-5, 0, NaN]) {
            const result = await readLogTail(logFile, { lines });
            assert.deepStrictEqual(result.lines, unfiltered.lines, `lines: ${lines}`);
        }
    });

    it('returns every line when no level is given', async () => {
        const { lines, size } = await readLogTail(logFile, {});

        assert.deepStrictEqual(lines, LOG_CONTENT.split('\n'));
        assert.strictEqual(size, Buffer.byteLength(LOG_CONTENT));
    });

    it('keeps the given level and the more severe ones', async () => {
        const { lines } = await readLogTail(logFile, { logLevel: 'warn' });

        assert.ok(
            lines.every(line => /warn|error|at /.test(line)),
            `unexpected lines: ${lines.join(' | ')}`,
        );
        assert.ok(lines.some(line => line.includes('a warning')));
        assert.ok(lines.some(line => line.includes('an error')));
        assert.ok(!lines.some(line => line.includes('some debug')));
        assert.ok(!lines.some(line => line.includes('first info')));
    });

    it('keeps the follow-up lines of a matching entry', async () => {
        const { lines } = await readLogTail(logFile, { logLevel: 'error' });

        assert.deepStrictEqual(lines, [
            '2026-08-06 10:00:00.004  - [31merror[39m: host.test an error',
            '    at Immediate.<anonymous> (/opt/iobroker/test.ts:1:1)',
            '    at process.processImmediate (node:internal/timers:1:1)',
        ]);
    });

    it('the lowest level returns the same as no filter at all', async () => {
        const unfiltered = await readLogTail(logFile, {});
        const silly = await readLogTail(logFile, { logLevel: 'silly' });

        assert.deepStrictEqual(silly.lines, unfiltered.lines);
    });

    it('trims to the requested number of lines without cutting an entry', async () => {
        const { lines } = await readLogTail(logFile, { lines: 2, logLevel: 'silly' });

        // the newest line is always there
        assert.ok(lines[lines.length - 1].includes('second info'));
        // the cut would land inside the error entry and its stack trace, so the window is extended
        // backwards to the header - returning the two `at ...` frames on their own would be useless
        assert.ok(lines[0].includes('an error'), `result starts mid-entry: ${JSON.stringify(lines)}`);
        assert.strictEqual(lines.length, 4);
    });

    it('does not report a level token quoted inside a message', async () => {
        const file = await writeLog(
            'quoted.log',
            [
                '2026-08-06 10:00:00.001  - [32minfo[39m: host.test parse failed: " - error: boom" in payload',
                '2026-08-06 10:00:00.002  - [31merror[39m: host.test a real error',
            ].join('\n'),
        );

        const { lines } = await readLogTail(file, { logLevel: 'error' });

        assert.strictEqual(lines.length, 1, `an info line leaked: ${JSON.stringify(lines)}`);
        assert.ok(lines[0].includes('a real error'));
    });

    it('does not take a continuation line for the start of an entry', async () => {
        const file = await writeLog(
            'continuation.log',
            [
                '2026-08-06 10:00:00.001  - [32minfo[39m: host.test multi',
                '     payload:  - error: nested',
                '2026-08-06 10:00:00.002  - [31merror[39m: host.test a real error',
            ].join('\n'),
        );

        const { lines } = await readLogTail(file, { logLevel: 'error' });

        // the continuation belongs to an info entry - returning it alone, without its header,
        // would be worse than dropping it
        assert.strictEqual(lines.length, 1, `a continuation line leaked: ${JSON.stringify(lines)}`);
        assert.ok(lines[0].includes('a real error'));
    });

    it('reads a file with Windows line endings', async () => {
        // the logger ends its lines with os.EOL
        const file = await writeLog('windows.log', LOG_CONTENT.replace(/\n/g, '\r\n'));

        const { lines } = await readLogTail(file, { logLevel: 'error' });

        // the lines come back as written, like the ones of a request without a level always did
        assert.deepStrictEqual(lines, [
            '2026-08-06 10:00:00.004  - [31merror[39m: host.test an error\r',
            '    at Immediate.<anonymous> (/opt/iobroker/test.ts:1:1)\r',
            '    at process.processImmediate (node:internal/timers:1:1)\r',
        ]);
    });

    it('reads backwards over many chunks and keeps every entry whole', async () => {
        const { content, errors } = generateLog();
        const file = await writeLog('many.log', content);

        // a chunk smaller than a line, one that cuts lines and characters at varying places, and one
        // that holds the whole file
        for (const chunkBytes of [64, 1000, 4093, 1024 * 1024]) {
            const limits = { ...SMALL_CHUNKS, chunkBytes };

            const fifteen = await readLogTail(file, { lines: 15, logLevel: 'error' }, limits);
            assert.deepStrictEqual(fifteen.lines, errors.slice(-5).flat(), `chunkBytes: ${chunkBytes}`);

            // 16 lines end inside the sixth newest error, which then comes back whole
            const sixteen = await readLogTail(file, { lines: 16, logLevel: 'error' }, limits);
            assert.deepStrictEqual(sixteen.lines, errors.slice(-6).flat(), `chunkBytes: ${chunkBytes}`);
        }
    });

    it('stops at the beginning of the file and drops the lines before its first entry', async () => {
        const { content, errors } = generateLog();
        const file = await writeLog('beginning.log', content);

        const { lines } = await readLogTail(file, { lines: 100_000, logLevel: 'error' }, SMALL_CHUNKS);

        // the stack trace the file starts with belongs to an entry of the file before
        assert.deepStrictEqual(lines, errors.flat());
    });

    it('stops after maxBytes and drops a stack trace whose first line is beyond', async () => {
        const { content, errors } = generateLog();
        const file = await writeLog('limit.log', content);

        // let the window begin a few bytes into the stack trace of the third newest error
        const followUp = content.indexOf(errors[errors.length - 3][1]);
        const maxBytes = Buffer.byteLength(content) - Buffer.byteLength(content.slice(0, followUp)) - 5;

        const { lines } = await readLogTail(file, { lines: 100, logLevel: 'error' }, { ...SMALL_CHUNKS, maxBytes });

        assert.deepStrictEqual(lines, errors.slice(-2).flat());
    });

    it('reads the whole range when a read returns less than asked for', async () => {
        const { content, errors } = generateLog();
        const file = await writeLog('short.log', content);
        const read = fs.read;
        // a read may stop early without having reached the end of the file - the cast picks the promise
        // form of the overloaded `read` instead of its last, callback based signature
        const stub = (sinon.stub(fs, 'read') as sinon.SinonStub).callsFake(
            (fd: number, buffer: Buffer, offset: number, length: number, position: number) =>
                read(fd, buffer, offset, Math.min(length, 7), position),
        );

        try {
            const unfiltered = await readLogTail(file, { lines: 5 });
            assert.deepStrictEqual(unfiltered.lines, content.split('\n').slice(-6));

            const filtered = await readLogTail(file, { lines: 15, logLevel: 'error' }, SMALL_CHUNKS);
            assert.deepStrictEqual(filtered.lines, errors.slice(-5).flat());

            assert.ok(stub.callCount > 100);
        } finally {
            stub.restore();
        }
    });

    it('reports the size when the file can be measured but not read', async () => {
        // getLogs answers with it, so a requester keeps the position it continues from
        const hasSize = (e: unknown): boolean => {
            assert.ok(e instanceof LogReadError);
            assert.strictEqual(e.size, Buffer.byteLength(LOG_CONTENT));
            return true;
        };

        const read = sinon.stub(fs, 'read').rejects(new Error('EIO: i/o error, read'));
        try {
            await assert.rejects(readLogTail(logFile, { logLevel: 'error' }), hasSize);
            await assert.rejects(readLogTail(logFile, {}), hasSize);
        } finally {
            read.restore();
        }

        // e.g. while the file is rotated
        const open = sinon.stub(fs, 'open').rejects(new Error('EBUSY: resource busy or locked, open'));
        try {
            await assert.rejects(readLogTail(logFile, { logLevel: 'error' }), hasSize);
        } finally {
            open.restore();
        }
    });

    it('fails without a size when there is no file', async () => {
        await assert.rejects(readLogTail(path.join(dir, 'missing.log'), {}), (e: unknown) => {
            assert.ok(!(e instanceof LogReadError));
            return true;
        });
    });

    it('reports the current file size', async () => {
        const { size } = await readLogTail(logFile, { logLevel: 'error' });

        assert.strictEqual(size, Buffer.byteLength(LOG_CONTENT));
    });
});
