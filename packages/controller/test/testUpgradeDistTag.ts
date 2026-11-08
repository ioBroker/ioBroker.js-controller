import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Upgrade } from '@iobroker/js-controller-cli';
import { tools } from '@iobroker/js-controller-common';

/** The version of the js-controller the tests run with */
const installed: string = JSON.parse(readFileSync(`${tools.getControllerDir()}/io-package.json`, 'utf8')).common
    .version;

/** An upgrade that asks a table instead of npm, and downloads and uploads nothing */
class TestUpgrade extends Upgrade {
    /** The packets that would have been downloaded */
    downloaded: string[] = [];
    /** The exit code, if the process would have exited */
    exitCode: number | undefined;
    /** The dist tags that were looked up */
    lookedUp: string[] = [];

    /**
     * @param tags the version of each dist tag
     */
    constructor(private readonly tags: Record<string, string>) {
        super({
            objects: { getObject: () => Promise.resolve(null), getObjectAsync: () => Promise.resolve(null) },
            states: {},
            params: {},
            processExit: (code?: number) => {
                this.exitCode = code;
            },
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

    /**
     * @param name name of the adapter
     * @param tag the dist tag
     */
    protected override lookUpDistTag(name: string, tag: string): Promise<string> {
        this.lookedUp.push(`${name}@${tag}`);
        return tag in this.tags
            ? Promise.resolve(this.tags[tag])
            : Promise.reject(new Error('Command failed: npm view\nnpm error code E404'));
    }
}

/** A repository that offers the installed version, so nothing but a tag leads to an upgrade */
const repository = { 'js-controller': { version: installed } } as unknown as ioBroker.RepositoryJson;

describe('iobroker upgrade with an npm dist tag', () => {
    it('knows a dist tag from a version or a range', () => {
        for (const tag of ['latest', 'next', 'beta', 'dev-1.x', 'alpha.2']) {
            assert.equal(tools.isNpmDistTag(tag), true, tag);
        }
        for (const version of ['', '1.2.3', 'v1.2.3', '1.2.3-alpha.1', '1.x', '^1.2.0', 'x', '*']) {
            assert.equal(tools.isNpmDistTag(version), false, version);
        }
    });

    it('does not put anything else into the command line', () => {
        assert.equal(tools.isNpmDistTag('latest;reboot'), false);
        assert.equal(tools.isNpmDistTag('$(reboot)'), false);
        assert.throws(() => tools.resolveNpmDistTag('web;reboot', 'latest'), /Invalid npm dist tag/);
        assert.throws(() => tools.resolveNpmDistTag('web', 'latest;reboot'), /Invalid npm dist tag/);
    });

    it('installs the version a tag stands for, even if the repository offers another one', async () => {
        const upgrade = new TestUpgrade({ next: '99.1.0' });

        await upgrade.upgradeAdapter(repository, 'js-controller@next', false, true, false);

        assert.deepEqual(upgrade.lookedUp, ['js-controller@next']);
        assert.deepEqual(upgrade.downloaded, ['js-controller@99.1.0']);
        assert.equal(upgrade.exitCode, undefined);
    });

    it('is up to date if the tag stands for the installed version', async () => {
        const upgrade = new TestUpgrade({ latest: installed });

        await upgrade.upgradeAdapter(repository, 'js-controller@latest', false, true, false);

        assert.deepEqual(upgrade.lookedUp, ['js-controller@latest']);
        assert.deepEqual(upgrade.downloaded, []);
    });

    it('reports an unknown tag and installs nothing', async () => {
        const upgrade = new TestUpgrade({});

        await upgrade.upgradeAdapter(repository, 'js-controller@nope', false, true, false);

        assert.deepEqual(upgrade.downloaded, []);
        assert.notEqual(upgrade.exitCode, undefined);
    });

    it('does not ask npm for a version', async () => {
        const upgrade = new TestUpgrade({});

        await upgrade.upgradeAdapter(repository, 'js-controller@99.2.0', false, true, false);

        assert.deepEqual(upgrade.lookedUp, []);
        assert.deepEqual(upgrade.downloaded, ['js-controller@99.2.0']);
    });

    it('upgrades the controller to the version a tag stands for', async () => {
        const upgrade = new TestUpgrade({ next: '99.1.0' });

        await upgrade.upgradeController({ forceDowngrade: false, controllerRunning: false, version: 'next' });

        assert.deepEqual(upgrade.downloaded, ['js-controller@99.1.0']);
    });

    it('leaves the controller alone if the tag stands for the installed version or an unknown one', async () => {
        const same = new TestUpgrade({ latest: installed });
        await same.upgradeController({ forceDowngrade: false, controllerRunning: false, version: 'latest' });
        assert.deepEqual(same.downloaded, []);

        const unknown = new TestUpgrade({});
        await unknown.upgradeController({ forceDowngrade: false, controllerRunning: false, version: 'nope' });
        assert.deepEqual(unknown.downloaded, []);
        assert.notEqual(unknown.exitCode, undefined);
    });
});
