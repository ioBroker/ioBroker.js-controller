import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import { parseGetLogsMessage, readLogTail } from '../src/lib/logsReader.js';

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

describe('test logsReader', () => {
    let logFile: string;

    before(async () => {
        const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'iob-logs-'));
        logFile = path.join(dir, 'iobroker.log');
        await fs.writeFile(logFile, LOG_CONTENT);
    });

    after(async () => {
        await fs.remove(path.dirname(logFile));
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

    it('returns at most the requested number of lines', async () => {
        const { lines } = await readLogTail(logFile, { lines: 2, logLevel: 'silly' });

        assert.strictEqual(lines.length, 2);
        // the newest ones
        assert.ok(lines[1].includes('second info'));
    });

    it('reports the current file size', async () => {
        const { size } = await readLogTail(logFile, { logLevel: 'error' });

        assert.strictEqual(size, Buffer.byteLength(LOG_CONTENT));
    });
});
