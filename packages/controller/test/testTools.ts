import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
    FORBIDDEN_CHARS,
    execAsync,
    execFileAsync,
    isForeignProcess,
    isInstanceLogLevel,
    isLogLevel,
    isProcessRunning,
    nodeVersionSatisfies,
} from '@iobroker/js-controller-common-db/tools';

/**
 * Check whether WMI answers a process query on this machine
 *
 * @returns true if the own process could be looked up
 */
async function wmiAnswers(): Promise<boolean> {
    try {
        const { stdout } = await execFileAsync(
            'powershell.exe',
            [
                '-NoProfile',
                '-NonInteractive',
                '-Command',
                `(Get-CimInstance Win32_Process -Filter 'ProcessId=${process.pid}').Name`,
            ],
            // the first query after a reboot may take a while, which is also what warms WMI up for the test
            { timeout: 90_000 },
        );
        return !!stdout?.trim();
    } catch {
        return false;
    }
}

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

    it('execFileAsync', async () => {
        const res = await execFileAsync(process.execPath, ['-e', 'console.log("test")']);
        assert.strictEqual((res.stdout as string).trim(), 'test');
    });

    it('execFileAsync keeps what the failure was', async () => {
        type Failure = Error & { code?: string | number; killed?: boolean };

        // a caller has to tell a missing command, a timeout and a non-zero exit apart
        await assert.rejects(
            () => execFileAsync('iobroker-no-such-command', []),
            (e: Failure) => e.code === 'ENOENT',
        );

        await assert.rejects(
            () => execFileAsync(process.execPath, ['-e', 'setTimeout(() => {}, 30_000)'], { timeout: 500 }),
            (e: Failure) => e.killed === true,
        );

        // the output on stderr becomes the message, because it says more than "Command failed"
        await assert.rejects(
            () => execFileAsync(process.execPath, ['-e', 'console.error("why it failed"); process.exit(3)']),
            (e: Failure) => e.code === 3 && e.message.includes('why it failed'),
        );
    }).timeout(20_000);

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

    it('isForeignProcess', async function () {
        // On a busy GitHub Windows runner WMI sometimes does not answer at all. isForeignProcess then rightly
        // answers "cannot inspect" for every process, which proves nothing about how it tells them apart.
        if (os.platform() === 'win32' && !(await wmiAnswers())) {
            console.warn('WMI does not answer on this machine, isForeignProcess cannot be verified');
            this.skip();
        }

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
    })
        // the WMI probe and six inspections, each of which may need its own PowerShell start on Windows
        .timeout(330_000);
});

describe('nodeVersionSatisfies', () => {
    it('takes a prerelease or nightly build by its version', () => {
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v27.0.0-alpha.0'), true);
        assert.equal(nodeVersionSatisfies('>=22.22.2', '27.0.0-nightly20261101abcdef'), true);
    });

    it('does not take a prerelease for the release it leads to', () => {
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v22.22.2-rc.1'), false);
        assert.equal(nodeVersionSatisfies('>=22 <27', 'v27.0.0-alpha.0'), false);
    });

    it('lets a range without minor and patch start with the prereleases of that major', () => {
        assert.equal(nodeVersionSatisfies('>=22', 'v22.0.0-rc.1'), true);
    });

    it('checks released versions as before', () => {
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v22.22.2'), true);
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v26.1.0'), true);
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v22.22.1'), false);
    });

    it('checks the running version if no other is given', () => {
        assert.equal(nodeVersionSatisfies('*'), true);
        assert.equal(nodeVersionSatisfies(`>${process.version}`), false);
    });

    it('does not throw on what it cannot read', () => {
        assert.equal(nodeVersionSatisfies('not a range', 'v22.22.2'), false);
        assert.equal(nodeVersionSatisfies('>=22', 'not a version'), false);
    });
});

describe('isLogLevel and isInstanceLogLevel', () => {
    it('accepts the levels of a log entry', () => {
        for (const level of ['silly', 'debug', 'info', 'warn', 'error']) {
            assert.equal(isLogLevel(level), true, level);
            assert.equal(isInstanceLogLevel(level), true, level);
        }
    });

    it('accepts "off" only as the level of an instance', () => {
        // a log entry never has the level "off", so the filters of the log files must keep refusing it
        assert.equal(isLogLevel('off'), false);
        assert.equal(isInstanceLogLevel('off'), true);
    });

    it('refuses what is no level', () => {
        for (const level of ['', 'verbose', 'OFF', 'Error', 'none']) {
            assert.equal(isLogLevel(level), false, level);
            assert.equal(isInstanceLogLevel(level), false, level);
        }
    });
});
