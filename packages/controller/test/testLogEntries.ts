import assert from 'node:assert/strict';
import { isLogLevelAtLeast, parseLogEntryHeader, stripLogColors } from '@iobroker/js-controller-common';

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

describe('test logEntries', () => {
    it('reads the first line of an entry', () => {
        const header = parseLogEntryHeader('2026-09-16 10:11:12.123  - info: admin.0 (1234) text');

        assert.deepStrictEqual(header, {
            ts: new Date('2026-09-16T10:11:12.123').getTime(),
            level: 'info',
            source: 'admin.0',
            message: 'admin.0 (1234) text',
        });
    });

    it('reads a level wrapped in color codes', () => {
        const header = parseLogEntryHeader(`2026-09-16 10:11:12.123  - ${colored('error', 31)}: host.raspi boom`);

        assert.strictEqual(header?.level, 'error');
        assert.strictEqual(header?.source, 'host.raspi');
        // the color codes are gone from the message as well
        assert.strictEqual(header?.message, 'host.raspi boom');
    });

    it('reads a time stamp without milliseconds and a level in upper case', () => {
        const header = parseLogEntryHeader('2026-09-16 10:11:12  - WARN: admin.0 text');

        assert.strictEqual(header?.ts, new Date('2026-09-16T10:11:12').getTime());
        assert.strictEqual(header?.level, 'warn');
    });

    it('reads an entry without a text', () => {
        const header = parseLogEntryHeader('2026-09-16 10:11:12.123  - info:');

        assert.strictEqual(header?.level, 'info');
        assert.strictEqual(header?.source, '');
        assert.strictEqual(header?.message, '');
    });

    it('does not take a continuation line for the start of an entry', () => {
        assert.strictEqual(parseLogEntryHeader('    at Immediate.<anonymous> (/opt/iobroker/test.ts:1:1)'), null);
        // a level quoted in a continuation line - without the time stamp anchor it would count
        assert.strictEqual(parseLogEntryHeader('     payload:  - error: nested'), null);
        assert.strictEqual(parseLogEntryHeader(''), null);
    });

    it('takes the level of the entry, not one quoted in its text', () => {
        const header = parseLogEntryHeader('2026-09-16 10:11:12.123  - info: host.test parse failed: " - error: boom"');

        assert.strictEqual(header?.level, 'info');
    });

    it('removes the color codes of a line', () => {
        assert.strictEqual(stripLogColors(`a ${colored('warn', 33)} b`), 'a warn b');
        assert.strictEqual(stripLogColors('no colors'), 'no colors');
    });

    it('compares levels by severity', () => {
        assert.ok(isLogLevelAtLeast('error', 'warn'));
        assert.ok(isLogLevelAtLeast('warn', 'warn'));
        assert.ok(isLogLevelAtLeast('debug', 'silly'));
        assert.ok(!isLogLevelAtLeast('info', 'warn'));
        assert.ok(!isLogLevelAtLeast('silly', 'debug'));
    });
});
