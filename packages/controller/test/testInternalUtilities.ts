import { getCronExpression } from '../src/lib/utils.js';
import { expect } from 'chai';
import { BlocklistManager } from '../src/lib/blocklistManager.js';
import { startController, stopController } from './lib/setup4controller.js';
import url from 'node:url';
const thisDir = url.fileURLToPath(new URL('.', import.meta.url));
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import { isInstalledFromNpm } from '@iobroker/js-controller-common';

let objects: ObjectsInRedisClient;

describe('test internal helpers', () => {
    before('Start js-controller', async function () {
        this.timeout(23_000);

        const { objects: _objects } = await startController({
            objects: {
                dataDir: `${thisDir}/../tmp/data`,
                onChange: function (id: string, _obj: ioBroker.AnyObject) {
                    console.log(`object changed. ${id}`);
                },
            },
            states: {
                dataDir: `${thisDir}/../tmp/data`,
                onChange: function (id: string, _state: ioBroker.State) {
                    console.log(`state changed. ${id}`);
                },
            },
        });

        if (!_objects) {
            throw new Error('Could not connect to objects database!');
        }

        objects = _objects;
    });

    it('getCronExpression', () => {
        const cronWithoutSeconds = '15 * * * *';
        const cronWithSeconds = '3 15 * * * *';

        const cronSecondsAdded = getCronExpression({ cronExpression: cronWithoutSeconds, connectionType: 'cloud' });
        expect(cronSecondsAdded).to.be.not.equal(cronWithoutSeconds);
        expect(cronSecondsAdded.split(' ').length).to.be.equal(6);

        const cronNothingAdded = getCronExpression({ cronExpression: cronWithSeconds, connectionType: 'cloud' });
        expect(cronNothingAdded).to.be.equal(cronWithSeconds);

        // no delay for connection types different from cloud
        const cronSecondsWrongConnectionType = getCronExpression({
            cronExpression: cronWithoutSeconds,
            connectionType: 'local',
        });
        expect(cronSecondsWrongConnectionType).to.be.equal(cronWithoutSeconds);
    });

    it('BlocklistManager', async () => {
        const blocklistManager = new BlocklistManager({ objects });

        let isBlocked = await blocklistManager.isAdapterVersionBlocked({ version: '1.0.0', adapterName: 'test' });
        expect(isBlocked).to.be.false;

        isBlocked = await blocklistManager.isAdapterVersionBlocked({ version: '3.14.0', adapterName: 'alexa2' });
        expect(isBlocked).to.be.true;
    });

    it('isInstalledFromNpm', () => {
        expect(
            isInstalledFromNpm({
                adapterName: 'admin',
                installedFrom: 'iobroker.admin@6.13.16' as ioBroker.InstalledFrom,
            }),
        ).to.be.true;

        expect(
            isInstalledFromNpm({
                adapterName: 'benchmark',
                installedFrom: 'foxriver76/ioBroker.benchmark' as ioBroker.InstalledFrom,
            }),
        ).to.be.false;
    });

    after('Stop js-controller', async function () {
        this.timeout(5_000);
        await stopController();
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 2_000);
        });
    });
});
