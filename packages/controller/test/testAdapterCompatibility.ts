import assert from 'node:assert/strict';
import { checkAdapterCompatibility } from '@iobroker/js-controller-cli';
import { EXIT_CODES } from '@iobroker/js-controller-common';

describe('checkAdapterCompatibility', () => {
    const system = { platform: 'linux', nodeVersion: 'v22.19.0' };

    it('accepts an adapter without restrictions', () => {
        assert.equal(checkAdapterCompatibility({ ioPackage: { common: {} }, packageJson: {}, ...system }), null);
        assert.equal(checkAdapterCompatibility({ ioPackage: { common: {} }, packageJson: null, ...system }), null);
    });

    it('refuses an adapter with "nogit" only when it comes from GitHub', () => {
        const ioPackage = { common: { nogit: true as const } };
        const problem = checkAdapterCompatibility({ ioPackage, fromGitHub: true, ...system });
        assert.equal(problem?.exitCode, EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
        assert.match(problem.message, /cannot be installed from GitHub \("nogit"/);
        // from npm or the repository it is fine
        assert.equal(checkAdapterCompatibility({ ioPackage, ...system }), null);
    });

    it('checks "nogit" before the operating system', () => {
        const problem = checkAdapterCompatibility({
            ioPackage: { common: { nogit: true, os: 'win32' } },
            fromGitHub: true,
            ...system,
        });
        assert.equal(problem?.exitCode, EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
    });

    it('checks the operating system as a string and as a list', () => {
        assert.deepEqual(checkAdapterCompatibility({ ioPackage: { common: { os: 'win32' } }, ...system }), {
            exitCode: EXIT_CODES.INVALID_OS,
            message: 'Adapter does not support current os. Required win32. Actual platform: linux',
        });
        assert.deepEqual(checkAdapterCompatibility({ ioPackage: { common: { os: ['win32', 'darwin'] } }, ...system }), {
            exitCode: EXIT_CODES.INVALID_OS,
            message: 'Adapter does not support current os. Required one of win32, darwin. Actual platform: linux',
        });
        assert.equal(checkAdapterCompatibility({ ioPackage: { common: { os: 'linux' } }, ...system }), null);
        assert.equal(
            checkAdapterCompatibility({ ioPackage: { common: { os: ['darwin', 'linux'] } }, ...system }),
            null,
        );
    });

    it('checks the Node.js version from package.json', () => {
        assert.deepEqual(
            checkAdapterCompatibility({
                ioPackage: { common: {} },
                packageJson: { engines: { node: '>=24' } },
                ...system,
            }),
            {
                exitCode: EXIT_CODES.INVALID_NODE_VERSION,
                message: 'Adapter does not support current nodejs version. Required >=24. Actual version: v22.19.0',
            },
        );
        assert.equal(
            checkAdapterCompatibility({
                ioPackage: { common: {} },
                packageJson: { engines: { node: '>=22' } },
                ...system,
            }),
            null,
        );
    });

    it('checks this system if nothing else is given', () => {
        const own = process.platform as 'linux' | 'darwin' | 'win32';
        const other = own === 'win32' ? 'linux' : 'win32';
        assert.equal(
            checkAdapterCompatibility({ ioPackage: { common: { os: other } } })?.exitCode,
            EXIT_CODES.INVALID_OS,
        );
        assert.equal(checkAdapterCompatibility({ ioPackage: { common: { os: own } } }), null);
    });
});
