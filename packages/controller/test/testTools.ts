import assert from 'node:assert/strict';
import { FORBIDDEN_CHARS, execAsync } from '@iobroker/js-controller-common-db/tools';

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
});
