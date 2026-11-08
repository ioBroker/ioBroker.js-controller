import assert from 'node:assert/strict';
import { Upgrade } from '@iobroker/js-controller-cli';
import { EXIT_CODES } from '@iobroker/js-controller-common';

/** A requirement this controller cannot meet */
const TOO_NEW = { 'js-controller': '>=999.0.0' };

/**
 * An upgrade that downloads and uploads nothing. Do not upgrade to the installed version with it: this uninstalls the
 * real npm packet first.
 */
class TestUpgrade extends Upgrade {
    /** The packets that would have been downloaded */
    downloaded: string[] = [];

    constructor() {
        super({
            objects: {
                getObject: () => Promise.resolve(null),
                getObjectAsync: () => Promise.resolve(null),
                getObjectViewAsync: () => Promise.resolve({ rows: [] }),
            },
            states: {},
            params: {},
            processExit: () => undefined,
        } as any);
        const self = this as any;
        self.install = {
            downloadPacket: (_sources: unknown, packet: string) => {
                this.downloaded.push(packet);
                return Promise.resolve({ packetName: packet.split('@')[0], stoppedList: [] });
            },
            enableInstances: () => Promise.resolve(),
            installOSPackages: () => Promise.resolve(),
        };
        self.upload = {
            uploadAdapter: () => Promise.resolve(),
            upgradeAdapterObjects: () => Promise.resolve(),
        };
    }
}

/**
 * A repository with one newer version of the adapter
 *
 * @param dependencies the dependencies of this version
 */
function repository(dependencies: Record<string, string>): ioBroker.RepositoryJson {
    return {
        'js-controller': { version: '99.1.0', dependencies: [dependencies] },
    } as unknown as ioBroker.RepositoryJson;
}

describe('iobroker upgrade checks the dependencies', () => {
    for (const packet of ['js-controller', 'js-controller@99.1.0', 'js-controller@99.2.0']) {
        it(`refuses "${packet}" before anything is downloaded`, async () => {
            const upgrade = new TestUpgrade();

            await assert.rejects(upgrade.upgradeAdapter(repository(TOO_NEW), packet, false, true, false), {
                code: EXIT_CODES.INVALID_DEPENDENCY_VERSION,
                message: /Dependencies of "js-controller" are not met: Invalid version of "js-controller"/,
            });

            assert.deepEqual(upgrade.downloaded, []);
        });
    }

    it('upgrades if they are met', async () => {
        const upgrade = new TestUpgrade();

        await upgrade.upgradeAdapter(
            repository({ 'js-controller': '>=1.0.0' }),
            'js-controller@99.1.0',
            false,
            true,
            false,
        );

        assert.deepEqual(upgrade.downloaded, ['js-controller@99.1.0']);
    });

    it('does not check them with --force', async () => {
        const upgrade = new TestUpgrade();

        await upgrade.upgradeAdapter(repository(TOO_NEW), 'js-controller@99.1.0', true, true, false);

        assert.deepEqual(upgrade.downloaded, ['js-controller@99.1.0']);
    });

    it('does not check them for an older version, as the repository names those of its newest version', async () => {
        const upgrade = new TestUpgrade();

        await upgrade.upgradeAdapter(repository(TOO_NEW), 'js-controller@0.0.1', false, true, false);

        assert.deepEqual(upgrade.downloaded, ['js-controller@0.0.1']);
    });

    it('checks them for a version range, as it is not known where it leads', async () => {
        const upgrade = new TestUpgrade();

        await assert.rejects(upgrade.upgradeAdapter(repository(TOO_NEW), 'js-controller@^1.0.0', false, true, false), {
            code: EXIT_CODES.INVALID_DEPENDENCY_VERSION,
        });
    });

    it('does not abort "upgrade all", which goes on with the next adapter', async () => {
        const upgrade = new TestUpgrade();

        await upgrade.upgradeAdapterHelper(repository({ admin: '>=999.0.0' }), ['js-controller'], false, true);

        assert.deepEqual(upgrade.downloaded, []);
    });
});
