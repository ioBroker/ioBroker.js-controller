import assert from 'node:assert/strict';
import { execAsync, execFileAsync, type ExecAsyncError } from '@iobroker/js-controller-common-db/tools';
import { aptUpgradeCommand, PacketManager } from './setupPacketManager.js';

describe('aptUpgradeCommand', () => {
    it('upgrades only the given packets, all in one call', () => {
        const command = aptUpgradeCommand([{ name: 'libssl3' }, { name: 'openssl' }], false);
        assert.match(command, /^apt-get install --only-upgrade -y /);
        assert.match(command, / libssl3 openssl <\/dev\/null$/);
        // not the subcommand upgrade, which upgrades every package of the system
        assert.doesNotMatch(command, /(^|\s)upgrade\s/);
    });

    it('runs with sudo when needed', () => {
        assert.match(aptUpgradeCommand([{ name: 'tzdata' }], true), /^sudo apt-get install --only-upgrade /);
    });

    it('asks nothing and waits for the lock of another apt', () => {
        const command = aptUpgradeCommand([{ name: 'tzdata' }], false);
        assert.match(command, / -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold /);
        assert.match(command, / -o DPkg::Lock::Timeout=300 /);
        assert.match(command, /<\/dev\/null$/);
    });

    it('pins a given version', () => {
        const command = aptUpgradeCommand(
            [
                { name: 'libc6', version: '2.36-9+deb12u10' },
                { name: 'libc6:i386', version: '1:2.36-9' },
                { name: 'tzdata', version: '' },
            ],
            false,
        );
        assert.match(command, / libc6=2\.36-9\+deb12u10 libc6:i386=1:2\.36-9 tzdata <\/dev\/null$/);
    });

    it('refuses what is no package name or version', () => {
        for (const packet of [
            { name: 'tzdata; reboot' },
            { name: '$(reboot)' },
            { name: '-o' },
            { name: 'Tzdata' },
            { name: '' },
            { name: undefined as unknown as string },
            { name: 'tzdata', version: '1.0 && reboot' },
            { name: 'tzdata', version: 2 as unknown as string },
        ]) {
            assert.throws(() => aptUpgradeCommand([{ name: 'openssl' }, packet], false), /Invalid package name/);
        }
    });
});

describe('detection of the packet manager (#3577)', () => {
    // like `apt` without arguments: the usage on stdout, nothing on stderr, exit code 1
    const usageOnStdout = `node -e "process.stdout.write('usage: apt');process.exit(1)"`;
    // like `dpkg` without arguments: the hint on stderr, exit code 2
    const hintOnStderr = `node -e "process.stderr.write('Type dpkg --help for help');process.exit(2)"`;

    it('execAsync keeps the output of a command that exits non-zero', async () => {
        await assert.rejects(execAsync(usageOnStdout), (e: ExecAsyncError) => {
            assert.equal(e.stdout, 'usage: apt');
            assert.equal(e.stderr, '');
            assert.equal(e.code, 1);
            return true;
        });
        await assert.rejects(execAsync(hintOnStderr), (e: ExecAsyncError) => {
            // the output on stderr says more than "Command failed"
            assert.equal(e.message, 'Type dpkg --help for help');
            assert.equal(e.stderr, 'Type dpkg --help for help');
            assert.equal(e.code, 2);
            return true;
        });
    });

    it('execFileAsync keeps the output as well', async () => {
        await assert.rejects(
            execFileAsync(process.execPath, ['-e', "process.stdout.write('usage');process.exit(1)"]),
            (e: ExecAsyncError) => {
                assert.equal(e.stdout, 'usage');
                assert.equal(e.stderr, '');
                assert.equal(e.code, 1);
                return true;
            },
        );
    });

    it('takes a command that prints its usage and exits non-zero for available, as apt does', async () => {
        const isCmd = (PacketManager.prototype as any)._isCmd as (cmd: string) => Promise<boolean>;
        const consoleError = console.error;
        console.error = () => {};
        try {
            assert.equal(await isCmd.call({}, usageOnStdout), true);
            assert.equal(await isCmd.call({}, hintOnStderr), false);
        } finally {
            console.error = consoleError;
        }
    });
});
