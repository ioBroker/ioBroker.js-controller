import assert from 'node:assert/strict';
import { getCodeOnlyInstallArgs, isUrlInstallSource } from '@/lib/utils.js';

describe('isUrlInstallSource', () => {
    it('recognizes the locations only the url command installs from', () => {
        assert.equal(isUrlInstallSource('https://example.com/iobroker.test-1.0.0.tgz'), true);
        assert.equal(isUrlInstallSource('ioBroker/ioBroker.test#abc1234'), true);
        assert.equal(isUrlInstallSource('/tmp/iobroker.test-1.0.0.tgz'), true);
        assert.equal(isUrlInstallSource('iobroker.test@1.0.0'), false);
        assert.equal(isUrlInstallSource('test@1.0.0'), false);
    });
});

describe('getCodeOnlyInstallArgs', () => {
    it('installs a missing adapter in the version of the other host', () => {
        assert.deepEqual(
            getCodeOnlyInstallArgs({
                adapterName: 'frigate',
                version: '2.1.0',
                installedFrom: 'iobroker.frigate@2.1.0',
                isInstalled: false,
                useInstalledFrom: true,
            }),
            ['install', 'frigate@2.1.0'],
        );
    });

    it('upgrades an installed adapter, install refuses it', () => {
        assert.deepEqual(
            getCodeOnlyInstallArgs({
                adapterName: 'frigate',
                version: '2.1.0',
                isInstalled: true,
                useInstalledFrom: true,
            }),
            ['upgrade', 'frigate@2.1.0', '--yes'],
        );
    });

    it('fetches an adapter from a URL again, the version alone does not lead to it', () => {
        const options = {
            adapterName: 'frigate',
            version: '2.1.0',
            installedFrom: 'ioBroker/ioBroker.frigate#abc1234',
            isInstalled: true,
        };

        assert.deepEqual(getCodeOnlyInstallArgs({ ...options, useInstalledFrom: true }), [
            'url',
            'ioBroker/ioBroker.frigate#abc1234',
            'frigate',
        ]);
        // the later attempts fall back to the version
        assert.deepEqual(getCodeOnlyInstallArgs({ ...options, useInstalledFrom: false }), [
            'upgrade',
            'frigate@2.1.0',
            '--yes',
        ]);
    });
});
