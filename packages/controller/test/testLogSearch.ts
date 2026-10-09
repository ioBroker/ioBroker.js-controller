import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import fs from 'fs-extra';
import { getSupportedFeatures } from '@iobroker/js-controller-common';
import { getLogFiles, searchLogFiles } from '../src/lib/logSearch.js';

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

/** Time of the search - everything logged later is not expected in the result */
const NOW = new Date('2026-09-16T12:00:00').getTime();

const YESTERDAY = [
    '2026-09-15 20:00:00.000  - info: admin.0 (1) yesterday info',
    '2026-09-15 21:00:00.000  - error: admin.0 (1) yesterday error',
];

const TODAY = [
    `2026-09-16 09:00:00.000  - ${colored('info', 32)}: host.test (2) started`,
    `2026-09-16 10:00:00.000  - ${colored('warn', 33)}: admin.0 (3) disk almost full`,
    `2026-09-16 11:00:00.000  - ${colored('error', 31)}: javascript.0 (4) script failed`,
    '    at Script.run (script.js:1:1)',
    `2026-09-16 11:30:00.000  - ${colored('debug', 34)}: admin.0 (3) polling`,
    `2026-09-16 13:00:00.000  - ${colored('info', 32)}: admin.0 (3) after the search started`,
];

/** The error entry of today together with its stack trace, the way the search returns it */
const SCRIPT_FAILED = `${TODAY[2]}\n${TODAY[3]}`;

describe('test logSearch', () => {
    let dir: string;
    let currentFile: string;

    before(async () => {
        dir = await fs.mkdtemp(path.join(os.tmpdir(), 'iob-search-logs-'));
        currentFile = path.join(dir, 'iobroker.2026-09-16.log');
        await fs.writeFile(currentFile, `${TODAY.join('\n')}\n`);
        await fs.writeFile(path.join(dir, 'iobroker.2026-09-15.log.gz'), gzipSync(`${YESTERDAY.join('\n')}\n`));
        await fs.writeFile(
            path.join(dir, 'iobroker.2026-09-10.log'),
            '2026-09-10 10:00:00.000  - error: admin.0 old\n',
        );
        await fs.writeFile(path.join(dir, 'other.log'), '2026-09-16 10:00:00.000  - error: admin.0 not a log file\n');
    });

    after(async () => {
        await fs.remove(dir);
    });

    it('announces the feature so requesters can detect an older host', () => {
        assert.ok(getSupportedFeatures().includes('CONTROLLER_SEARCH_LOGS'));
    });

    it('recognizes the rotated files of the current one', () => {
        const logFiles = getLogFiles('/opt/iobroker/log/iobroker.2026-09-16.log');

        assert.ok(logFiles);
        assert.strictEqual(logFiles.directory, path.dirname('/opt/iobroker/log/iobroker.2026-09-16.log'));
        assert.ok(logFiles.pattern.test('iobroker.2026-09-15.log'));
        assert.ok(logFiles.pattern.test('iobroker.2026-09-15.log.gz'));
        // a counter is added when a `maxSize` is configured
        assert.ok(logFiles.pattern.test('iobroker.2026-09-15.3.log'));
        assert.ok(!logFiles.pattern.test('iobroker.current.log'));
        assert.ok(!logFiles.pattern.test('other.2026-09-15.log'));

        // a file the logger did not write
        assert.strictEqual(getLogFiles('/opt/iobroker/log/iobroker.log'), null);
    });

    it('fails if the host writes no log file', async () => {
        await assert.rejects(searchLogFiles('', {}, NOW), /does not write a log file/);
        await assert.rejects(searchLogFiles(path.join(dir, 'iobroker.log'), {}, NOW), /does not write a log file/);
    });

    it('returns the entries of the requested hours, oldest first and as written', async () => {
        const result = await searchLogFiles(currentFile, { hours: 24 }, NOW);

        assert.deepStrictEqual(result, {
            lines: [...YESTERDAY, TODAY[0], TODAY[1], SCRIPT_FAILED, TODAY[4]],
            truncated: false,
            // the file of 2026-09-10 is too old to be read
            files: 2,
            until: NOW,
        });
    });

    it('looks back one hour by default', async () => {
        const result = await searchLogFiles(currentFile, {}, NOW);

        assert.deepStrictEqual(result.lines, [SCRIPT_FAILED, TODAY[4]]);
        // yesterday's file cannot hold an entry of the last hour
        assert.strictEqual(result.files, 1);
    });

    it('keeps the given level and the more severe ones', async () => {
        const { lines } = await searchLogFiles(currentFile, { hours: 24, level: 'warn' }, NOW);

        assert.deepStrictEqual(lines, [YESTERDAY[1], TODAY[1], SCRIPT_FAILED]);
    });

    it('ignores an unknown level instead of hiding everything', async () => {
        const unfiltered = await searchLogFiles(currentFile, { hours: 24 }, NOW);
        const bogus = await searchLogFiles(currentFile, { hours: 24, level: 'bogus' }, NOW);

        assert.deepStrictEqual(bogus.lines, unfiltered.lines);
    });

    it('filters by source', async () => {
        const { lines } = await searchLogFiles(currentFile, { hours: 24, source: 'admin.0' }, NOW);

        assert.deepStrictEqual(lines, [...YESTERDAY, TODAY[1], TODAY[4]]);
    });

    it('finds a text in the lines that continue an entry, case-insensitive', async () => {
        const { lines } = await searchLogFiles(currentFile, { hours: 24, text: 'script.RUN' }, NOW);

        assert.deepStrictEqual(lines, [SCRIPT_FAILED]);
    });

    it('does not find a text in the color codes', async () => {
        const { lines } = await searchLogFiles(currentFile, { hours: 24, text: '[39m' }, NOW);

        assert.deepStrictEqual(lines, []);
    });

    it('returns the newest entries if more match than requested', async () => {
        const inCurrentFile = await searchLogFiles(currentFile, { hours: 24, maxRows: 2 }, NOW);

        assert.deepStrictEqual(inCurrentFile.lines, [SCRIPT_FAILED, TODAY[4]]);
        assert.strictEqual(inCurrentFile.truncated, true);

        const acrossFiles = await searchLogFiles(currentFile, { hours: 24, maxRows: 5 }, NOW);

        assert.deepStrictEqual(acrossFiles.lines, [YESTERDAY[1], TODAY[0], TODAY[1], SCRIPT_FAILED, TODAY[4]]);
        assert.strictEqual(acrossFiles.truncated, true);
        assert.strictEqual(acrossFiles.files, 2);
    });
});
