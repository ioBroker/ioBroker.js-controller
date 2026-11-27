import assert from 'node:assert/strict';
import { aptUpgradeCommand } from './setupPacketManager.js';

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
