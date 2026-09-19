import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
    FORBIDDEN_CHARS,
    execAsync,
    isForeignProcess,
    isProcessRunning,
} from '@iobroker/js-controller-common-db/tools';

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

    it('isForeignProcess', async () => {
        const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'iob-pids-'));
        // mimic an installation, so the controller directory shows up in both command lines
        const controllerDir = path.join(tmpDir, 'node_modules', 'iobroker.js-controller');
        await fs.mkdir(controllerDir, { recursive: true });
        for (const script of ['controller.js', 'iobroker.js']) {
            await fs.writeFile(path.join(controllerDir, script), 'setInterval(() => {}, 1_000);');
        }

        const controller = spawn(process.execPath, [path.join(controllerDir, 'controller.js')]);
        const cli = spawn(process.execPath, [path.join(controllerDir, 'iobroker.js'), 'start']);
        // e.g. Node-RED or zigbee2mqtt, which took over the pid of the controller after a reboot
        const otherNode = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1_000);']);
        const notNode = os.platform() === 'win32' ? spawn('ping', ['-n', '60', '127.0.0.1']) : spawn('sleep', ['60']);

        try {
            assert.strictEqual(await isForeignProcess(controller.pid!), false);
            assert.strictEqual(await isForeignProcess(cli.pid!), true);
            assert.strictEqual(await isForeignProcess(otherNode.pid!), true);
            assert.strictEqual(await isForeignProcess(notNode.pid!), true);

            // the process asking can never be the controller it is looking for
            assert.strictEqual(await isForeignProcess(process.pid), true);

            // a process which cannot be inspected must be left alone
            assert.strictEqual(await isForeignProcess(0x7fffffff), false);
        } finally {
            controller.kill();
            cli.kill();
            otherNode.kill();
            notNode.kill();
            await fs.rm(tmpDir, { recursive: true, force: true });
        }
    }).timeout(60_000);
});
