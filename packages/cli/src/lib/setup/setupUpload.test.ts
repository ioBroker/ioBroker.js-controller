import assert from 'node:assert/strict';
import { tools } from '@iobroker/js-controller-common';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import { getPreviousInstallation, Upload } from './setupUpload.js';

const NPM_132 = 'iobroker.example@1.3.2' as ioBroker.InstalledFrom;
const NPM_140 = 'iobroker.example@1.4.0' as ioBroker.InstalledFrom;
const GITHUB = 'https://github.com/user/ioBroker.example/tarball/0123abc' as ioBroker.InstalledFrom;

describe('getPreviousInstallation (#3645)', () => {
    it('knows nothing before a new installation', () => {
        assert.deepEqual(
            getPreviousInstallation('example', undefined, { version: '1.4.0', installedFrom: NPM_140 }),
            {},
        );
    });

    it('takes the installed version and its source on an upgrade', () => {
        assert.deepEqual(
            getPreviousInstallation(
                'example',
                { version: '1.3.2', installedVersion: '1.3.2', installedFrom: NPM_132 },
                { version: '1.4.0', installedFrom: NPM_140 },
            ),
            { previousVersion: '1.3.2', previousInstalledFrom: NPM_132 },
        );
    });

    it('takes the installed version on a downgrade', () => {
        assert.deepEqual(
            getPreviousInstallation(
                'example',
                { version: '1.4.0', installedVersion: '1.4.0', installedFrom: NPM_140 },
                { version: '1.3.2', installedFrom: NPM_132 },
            ),
            { previousVersion: '1.4.0', previousInstalledFrom: NPM_140 },
        );
    });

    it('takes the same version from npm when GitHub is installed now', () => {
        assert.deepEqual(
            getPreviousInstallation(
                'example',
                { version: '1.3.2', installedVersion: '1.3.2', installedFrom: NPM_132 },
                { version: '1.3.2', installedFrom: GITHUB },
            ),
            { previousVersion: '1.3.2', previousInstalledFrom: NPM_132 },
        );
    });

    it('keeps the previous installation on an upload or the same version again', () => {
        const installed = {
            version: '1.4.0',
            installedVersion: '1.4.0',
            installedFrom: NPM_140,
            previousVersion: '1.3.2',
            previousInstalledFrom: NPM_132,
        };
        const expected = { previousVersion: '1.3.2', previousInstalledFrom: NPM_132 };
        assert.deepEqual(
            getPreviousInstallation('example', installed, { version: '1.4.0', installedFrom: NPM_140 }),
            expected,
        );
        // npm with and without the version is the same source
        assert.deepEqual(
            getPreviousInstallation('example', installed, {
                version: '1.4.0',
                installedFrom: 'iobroker.example' as ioBroker.InstalledFrom,
            }),
            expected,
        );
        // npm rewrote io-package.json and dropped installedFrom
        assert.deepEqual(getPreviousInstallation('example', installed, { version: '1.4.0' }), expected);
    });

    it('takes no older source when the installed version has none', () => {
        assert.deepEqual(
            getPreviousInstallation(
                'example',
                {
                    version: '1.3.2',
                    installedVersion: '1.3.2',
                    previousVersion: '1.0.0',
                    previousInstalledFrom: GITHUB,
                },
                { version: '1.4.0', installedFrom: NPM_140 },
            ),
            { previousVersion: '1.3.2' },
        );
    });
});

/** Objects DB in memory with what upgradeAdapterObjects uses */
class FakeObjects {
    readonly db = new Map<string, any>();

    getObject(id: string): Promise<any> {
        const obj = this.db.get(id);
        return Promise.resolve(obj ? structuredClone(obj) : null);
    }

    setObject(id: string, obj: Record<string, any>): Promise<{ id: string }> {
        this.db.set(id, structuredClone({ ...obj, _id: id }));
        return Promise.resolve({ id });
    }

    setObjectAsync(id: string, obj: Record<string, any>): Promise<{ id: string }> {
        return this.setObject(id, obj);
    }

    getObjectViewAsync(
        _design: string,
        search: string,
        params: { startkey: string; endkey: string },
    ): Promise<{ rows: { id: string; value: any }[] }> {
        const rows = [...this.db.entries()]
            .filter(([id, obj]) => obj.type === search && id >= params.startkey && id <= params.endkey)
            .map(([id, value]) => ({ id, value: structuredClone(value) }));
        return Promise.resolve({ rows });
    }
}

describe('Upload.upgradeAdapterObjects keeps the previous installation (#3645)', () => {
    // not installed, so io-package.json comes only from the argument
    const name = 'previous-version-test';
    const hostname = tools.getHostName();
    const from = (version: string): ioBroker.InstalledFrom => `iobroker.${name}@${version}` as ioBroker.InstalledFrom;
    const quiet = { log: (): void => {}, warn: (): void => {}, error: (): void => {} };

    /**
     * io-package.json of the given version, as installed from npm
     *
     * @param version version of the adapter
     */
    function ioPackage(version: string): ioBroker.AdapterObject {
        return {
            _id: `system.adapter.${name}`,
            type: 'adapter',
            common: { name, version, installedFrom: from(version) } as ioBroker.AdapterCommon,
            native: {},
        };
    }

    /** Objects as another host and this host left them, with an instance on this host */
    function multihostObjects(): FakeObjects {
        const objects = new FakeObjects();
        // written last by another host, which has 2.0.0
        objects.db.set(`system.adapter.${name}`, {
            ...ioPackage('2.0.0'),
            common: { ...ioPackage('2.0.0').common, installedVersion: '2.0.0' },
        });
        objects.db.set(`system.host.${hostname}.adapter.${name}`, {
            ...ioPackage('1.3.2'),
            _id: `system.host.${hostname}.adapter.${name}`,
            common: { ...ioPackage('1.3.2').common, installedVersion: '1.3.2' },
        });
        objects.db.set(`system.adapter.${name}.0`, {
            _id: `system.adapter.${name}.0`,
            type: 'instance',
            common: {
                name,
                version: '1.3.2',
                installedVersion: '1.3.2',
                installedFrom: from('1.3.2'),
                host: hostname,
                enabled: true,
            },
            native: {},
            ts: 1,
        });
        return objects;
    }

    /**
     * Upload with the given objects DB
     *
     * @param objects the objects DB
     */
    function upload(objects: FakeObjects): Upload {
        return new Upload({
            objects: objects as unknown as ObjectsRedisClient,
            states: {} as StatesRedisClient,
        });
    }

    it('takes the version of this host, not of system.adapter, as the previous one', async () => {
        const objects = multihostObjects();
        await upload(objects).upgradeAdapterObjects(name, ioPackage('1.4.0'), quiet);

        for (const id of [
            `system.adapter.${name}`,
            `system.host.${hostname}.adapter.${name}`,
            `system.adapter.${name}.0`,
        ]) {
            const { common } = objects.db.get(id);
            assert.equal(common.installedVersion, '1.4.0', id);
            assert.equal(common.previousVersion, '1.3.2', id);
            assert.equal(common.previousInstalledFrom, from('1.3.2'), id);
        }
    });

    it('keeps it on a later upload, without changing the instance', async () => {
        const objects = multihostObjects();
        await upload(objects).upgradeAdapterObjects(name, ioPackage('1.4.0'), quiet);
        const instanceBefore = objects.db.get(`system.adapter.${name}.0`);

        await upload(objects).upgradeAdapterObjects(name, ioPackage('1.4.0'), quiet);

        const { common } = objects.db.get(`system.host.${hostname}.adapter.${name}`);
        assert.equal(common.previousVersion, '1.3.2');
        assert.equal(common.previousInstalledFrom, from('1.3.2'));
        // unchanged, so not written again (that would restart the instance)
        assert.deepEqual(objects.db.get(`system.adapter.${name}.0`), instanceBefore);
    });

    it('sets nothing on a new installation', async () => {
        const objects = new FakeObjects();
        await upload(objects).upgradeAdapterObjects(name, ioPackage('1.4.0'), quiet);

        const { common } = objects.db.get(`system.host.${hostname}.adapter.${name}`);
        assert.equal(common.installedVersion, '1.4.0');
        assert.equal('previousVersion' in common, false);
        assert.equal('previousInstalledFrom' in common, false);
    });
});
