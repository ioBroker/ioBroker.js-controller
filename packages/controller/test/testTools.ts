import assert from 'node:assert/strict';
import { FORBIDDEN_CHARS, execAsync, isProcessRunning } from '@iobroker/js-controller-common-db/tools';

describe('test tools.js helpers', () => {
    it('FORBIDDEN_CHARS', () => {
        const tests = [
            { input: 'abc?def.0.1.foo-bar_', expected: 'abc_def.0.1.foo-bar_' },
            { input: 'ݑ', expected: '_' }, // Arabic Letter Beh with Dot Below and Three Dots Above (is an "other letter")
            { input: 'ⴃ', expected: 'ⴃ' }, // Georgian Small Letter Don (is a lowercase letter)
            { input: 'Ϣ', expected: 'Ϣ' }, // Coptic Capital Letter Shei (is a uppercase letter)
            { input: 'ok﹏﹏ok', expected: 'ok_ok' }, // multiple disallowed characters are replaced with one "_"
            { input: 'Th1s-IS_0.k4y', expected: 'Th1s-IS_0.k4y' },
        ];
        for (const { input, expected } of tests) {
            assert.strictEqual(input.replace(FORBIDDEN_CHARS, '_'), expected);
        }
    });

    it('execAsync', async () => {
        const res = await execAsync('echo test');
        assert.strictEqual((res.stdout as string).trim(), 'test');
    });

    it('isProcessRunning', () => {
        // our own process is definitely running
        assert.strictEqual(isProcessRunning(process.pid), true);

        // pid 0 addresses the process group instead of a single process, so it must not be
        // mistaken for a running controller
        assert.strictEqual(isProcessRunning(0), false);

        // a pid above the highest one the system can hand out cannot belong to a process,
        // this is what a pids.txt left over by a power loss looks like
        assert.strictEqual(isProcessRunning(0x7fffffff), false);
    });
});
