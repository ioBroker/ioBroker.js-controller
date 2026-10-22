import assert from 'node:assert/strict';
import fs from 'fs-extra';
import sinon from 'sinon';
import { Upgrade } from '@iobroker/js-controller-cli';
import { tools } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import { AdapterAutoUpgradeManager } from '../src/lib/adapterAutoUpgradeManager.js';

describe('automatic adapter upgrade dependency checks', () => {
    const sandbox = sinon.createSandbox();
    let controllerVersion: string;
    let adminVersion: string | undefined;
    let repository: Record<string, ioBroker.RepositoryJsonAdapterContent>;
    let installed: { value: { common: { name: string; version: string; host?: string } } }[];
    let manager: AdapterAutoUpgradeManager;
    let upgrade: sinon.SinonStub;
    let getObjectView: sinon.SinonStub;
    let logError: sinon.SinonStub;

    beforeEach(() => {
        controllerVersion = '7.2.2';
        adminVersion = '8.0.14';
        repository = {
            javascript: {
                name: 'javascript',
                version: '10.4.4',
                blockedVersions: [],
                meta: 'https://example.invalid/io-package.json',
                news: {},
                dependencies: [{ 'js-controller': '>=7.2.5' }],
                globalDependencies: [{ admin: '>=8.0.0' }],
            },
        };
        installed = [{ value: { common: { name: 'javascript', version: '10.4.3' } } }];

        getObjectView = sandbox.stub().callsFake((_design: string, search: string) => {
            if (search === 'adapter') {
                return Promise.resolve({ rows: installed });
            }
            return Promise.resolve({
                rows: [
                    ...installed,
                    ...(adminVersion ? [{ value: { common: { name: 'admin', version: adminVersion } } }] : []),
                ],
            });
        });
        const objects = {
            getObjectViewAsync: getObjectView,
            getObjectAsync: sandbox.stub().callsFake((id: string) => {
                if (id === 'system.config') {
                    return Promise.resolve({
                        common: {
                            activeRepo: ['stable'],
                            adapterAutoUpgrade: { defaultPolicy: 'minor', repositories: { stable: true } },
                        },
                    });
                }
                if (id === 'system.repositories') {
                    return Promise.resolve({ native: { repositories: { stable: { json: repository } } } });
                }
                throw new Error(`Unexpected object read: ${id}`);
            }),
        } as unknown as ObjectsClient;

        sandbox
            .stub(fs, 'readJSONSync')
            .callThrough()
            .withArgs(`${tools.getControllerDir()}/package.json`)
            .callsFake(() => ({ version: controllerVersion }));

        // Leave the real dependency checker in place, but never install or stop an adapter.
        upgrade = sandbox.stub(Upgrade.prototype, 'upgradeAdapter').resolves();
        logError = sandbox.stub();
        const logger = { info: sandbox.stub(), error: logError } as unknown as ConstructorParameters<
            typeof AdapterAutoUpgradeManager
        >[0]['logger'];
        manager = new AdapterAutoUpgradeManager({ objects, states: {} as StatesClient, logger, logPrefix: 'test' });
    });

    afterEach(() => sandbox.restore());

    it('rejects an incompatible controller before calling the installer', async () => {
        const result = await manager.upgradeAdapters();

        assert.equal(upgrade.callCount, 0);
        assert.equal(result.upgradedAdapters.length, 0);
        assert.equal(result.failedAdapters.length, 1);
        assert.match(logError.firstCall.args[0], /Invalid version of "js-controller"/);
    });

    for (const version of ['7.2.5', '7.2.6']) {
        it(`allows controller ${version} when the requirements are satisfied`, async () => {
            controllerVersion = version;

            const result = await manager.upgradeAdapters();

            sinon.assert.calledOnceWithExactly(upgrade, 'stable', 'javascript@10.4.4', false, true, false);
            assert.equal(result.upgradedAdapters.length, 1);
            assert.equal(result.failedAdapters.length, 0);
        });
    }

    for (const version of ['7.9.0', undefined]) {
        it(`rejects ${version ? 'an incompatible' : 'a missing'} global dependency`, async () => {
            controllerVersion = '7.2.5';
            adminVersion = version;

            const result = await manager.upgradeAdapters();

            assert.equal(upgrade.callCount, 0);
            assert.equal(result.upgradedAdapters.length, 0);
            assert.equal(result.failedAdapters.length, 1);
            assert.match(logError.firstCall.args[0], /admin/);
        });
    }

    it('does not install if reading dependency information fails', async () => {
        getObjectView.withArgs('system', 'instance').rejects(new Error('Database unavailable'));

        const result = await manager.upgradeAdapters();

        assert.equal(upgrade.callCount, 0);
        assert.equal(result.failedAdapters.length, 1);
        assert.match(logError.firstCall.args[0], /Database unavailable/);
    });

    it('rejects an incompatible local adapter dependency', async () => {
        repository.javascript.dependencies = [{ web: '>=6.0.0' }];
        installed.push({ value: { common: { name: 'web', version: '5.9.0', host: tools.getHostName() } } });

        const result = await manager.upgradeAdapters();

        assert.equal(upgrade.callCount, 0);
        assert.equal(result.failedAdapters.length, 1);
        assert.match(logError.firstCall.args[0], /Invalid version of "web"/);
    });

    it('does not satisfy a local dependency with an adapter on another host', async () => {
        repository.javascript.dependencies = [{ web: '>=6.0.0' }];
        installed.push({ value: { common: { name: 'web', version: '6.0.0', host: `${tools.getHostName()}-other` } } });

        const result = await manager.upgradeAdapters();

        assert.equal(upgrade.callCount, 0);
        assert.equal(result.failedAdapters.length, 1);
        assert.match(logError.firstCall.args[0], /Required dependency "web" not found on this host/);
    });

    it('allows an adapter without dependency requirements', async () => {
        repository.javascript.dependencies = [];
        repository.javascript.globalDependencies = [];

        const result = await manager.upgradeAdapters();

        assert.equal(upgrade.callCount, 1);
        assert.equal(result.upgradedAdapters.length, 1);
        assert.equal(result.failedAdapters.length, 0);
    });

    it('continues with a compatible adapter after rejecting an incompatible one', async () => {
        repository.example = {
            ...repository.javascript,
            name: 'example',
            version: '1.0.1',
            dependencies: [],
            globalDependencies: [],
        };
        installed.push({ value: { common: { name: 'example', version: '1.0.0' } } });

        const result = await manager.upgradeAdapters();

        sinon.assert.calledOnceWithExactly(upgrade, 'stable', 'example@1.0.1', false, true, false);
        assert.deepEqual(
            result.failedAdapters.map(adapter => adapter.name),
            ['javascript'],
        );
        assert.deepEqual(
            result.upgradedAdapters.map(adapter => adapter.name),
            ['example'],
        );
    });
});
