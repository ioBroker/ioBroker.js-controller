import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs-extra';
import path from 'node:path';
import { startController, stopController, appName, rootDir } from './setup4controller.js';
import deepClone from 'deep-clone';
import type { TestContext } from '../_Types.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import { Adapter } from '@iobroker/js-controller-adapter';
import { register as testAdapterHelpers } from './testAdapterHelpers.js';
import { register as testEnums } from './testEnums.js';
import { register as testFiles } from './testFiles.js';
import { register as testHelperStates } from './testHelperStates.js';
import { register as testMessages } from './testMessages.js';
import { register as testObjectsFunctions } from './testObjectsFunctions.js';
import { register as testObjectsACL } from './testObjectsACL.js';
import { register as testStates } from './testStates.js';
import { register as testAliases } from './testAliases.js';
import { register as testConsole } from './testConsole.js';

import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

const expect = chai.expect;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ioBroker {
        interface AdapterConfig {
            paramBoolean: boolean;
            paramNumber: number;
            username: string;
            password: string;
            secondPassword: string;
            paramString: string;
        }
    }
}

before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

export default function testAdapter(options: Record<string, any>): void {
    const statesConfig = options.statesConfig;
    const objectsConfig = options.objectsConfig;
    options.name = options.name || 'Test';

    const tests = [
        testAdapterHelpers,
        testEnums,
        testFiles,
        testHelperStates,
        testMessages,
        testObjectsFunctions,
        testObjectsACL,
        testStates,
        testAliases,
        testConsole,
    ];

    const context: TestContext = {
        /** @ts-expect-error will be filled in time */
        objects: null,
        /** @ts-expect-error will be filled in time */
        states: null,
        /** @ts-expect-error will be filled in time */
        adapter: null,
        onControllerStateChanged: null,
        onControllerObjectChanged: null,
        onAdapterStateChanged: null,
        onAdapterFileChanged: null,
        onAdapterObjectChanged: null,
        onAdapterUnload: null,
        onAdapterMessage: null,
        sendToID: 1,
        adapterShortName: 'test',
        name: options.name,
        appName,
        statesConfig,
        objectsConfig,
    };

    function startAdapter(): Promise<void> {
        return new Promise(resolve => {
            context.adapter = new Adapter({
                config: {
                    // @ts-expect-error todo types do not include this yet
                    states: statesConfig,
                    objects: objectsConfig,
                    consoleOutput: true,
                },
                dirname: `${thisDir}/`,
                name: context.adapterShortName,
                objectChange: (id, obj) => {
                    context.onAdapterObjectChanged && context.onAdapterObjectChanged(id, obj);
                },
                stateChange: (id, state) => {
                    context.onAdapterStateChanged && context.onAdapterStateChanged(id, state);
                },
                fileChange: (id, fileName, size) =>
                    context.onAdapterFileChanged && context.onAdapterFileChanged(id, fileName, size),
                unload: callback => {
                    if (context.onAdapterUnload) {
                        context.onAdapterUnload(callback);
                    }
                },
                message: obj => {
                    if (context.onAdapterMessage) {
                        context.onAdapterMessage(obj);
                    }
                },
                ready: () => {
                    resolve();
                },
                compact: true,
                /** activate the log transporter to be tested */
                logTransporter: true,
            });
        });
    }

    function checkConnectionOfAdapter(isConnected: boolean, cb: (err?: string) => void, counter?: number): void {
        counter = counter || 0;
        console.log(`Try check #${counter}`);
        if (counter > 30) {
            if (cb) {
                cb('Cannot check connection');
            }
            return;
        }

        context.states.getState(`system.adapter.${context.adapterShortName}.0.alive`, (err, state) => {
            if (err) {
                console.error(err);
            }
            if (state && state.val === isConnected) {
                if (cb) {
                    cb();
                }
            } else {
                setTimeout(() => checkConnectionOfAdapter(isConnected, cb, counter + 1), 1_000);
            }
        });
    }

    /**
     * Sets the provided Objets to the db
     *
     * @param objects - objects instance
     * @param objs - objects to set
     */
    async function addObjects(objects: ObjectsClient, objs: Record<string, ioBroker.SettableObject>): Promise<void> {
        for (const [id, obj] of Object.entries(objs)) {
            if (obj) {
                try {
                    await objects.setObjectAsync(id, obj);
                } catch (e) {
                    console.error(e.message);
                }
            }
        }
    }

    function addInstance(): void {
        if (!fs.existsSync(`${rootDir}tmp/`)) {
            fs.mkdirSync(`${rootDir}tmp/`);
        }
        if (statesConfig.dataDir && !fs.existsSync(statesConfig.dataDir)) {
            fs.mkdirSync(statesConfig.dataDir);
        }
        if (objectsConfig.dataDir && !fs.existsSync(objectsConfig.dataDir)) {
            fs.mkdirSync(objectsConfig.dataDir);
        }
        if (objectsConfig.dataDir) {
            fs.writeFileSync(`${objectsConfig.dataDir}/objects.json`, fs.readFileSync(`${thisDir}/objects.json`));
        }
        if (statesConfig.dataDir) {
            fs.writeFileSync(`${statesConfig.dataDir}/states.json`, fs.readFileSync(`${thisDir}/states.json`));
        }
    }

    describe(`${options.name} ${context.adapterShortName} adapter`, function () {
        before(`Test ${context.adapterShortName} adapter: Start js-controller and adapter`, async function () {
            this.timeout(10_000); // no installation

            addInstance();
            const _statesConfig = deepClone(statesConfig);
            const _objectsConfig = deepClone(objectsConfig);

            _statesConfig.onChange = (id: string, state: ioBroker.State) => {
                console.log(`state changed. ${id}`);
                if (context.onControllerStateChanged) {
                    context.onControllerStateChanged(id, state);
                }
            };
            _objectsConfig.onChange = (id: string, obj: ioBroker.AnyObject) => {
                console.log(`object changed. ${id}`);
                if (context.onControllerObjectChanged) {
                    context.onControllerObjectChanged(id, obj);
                }
            };

            const { objects: _objects, states: _states } = await startController({
                objects: _objectsConfig,
                states: _statesConfig,
            });

            context.objects = _objects!;
            context.states = _states!;
            expect(context.objects).to.be.ok;
            expect(context.states).to.be.ok;

            if (objectsConfig.type !== 'file') {
                const objs = fs.readJSONSync(path.join(thisDir, 'objects.json'));
                await addObjects(context.objects, objs);
                await startAdapter();
            } else {
                await startAdapter();
            }
        });

        it(`${options.name} ${context.adapterShortName} adapter: Check if adapter started`, function (done) {
            this.timeout(60_000);
            checkConnectionOfAdapter(true, function (err) {
                if (err) {
                    console.log(err);
                }
                expect(err).not.to.be.equal('Cannot check connection');
                done();
            });
        });

        it(`${options.name} ${context.adapterShortName} adapter: check all important adapter attributes`, function (done) {
            this.timeout(2000);
            expect(context.adapter.namespace).to.be.equal(`${context.adapterShortName}.0`);
            expect(context.adapter.name).to.be.equal(context.adapterShortName);
            expect(context.adapter.instance).to.be.equal(0);
            // @ts-expect-error should not exist
            expect(context.adapter.states).to.be.undefined;
            // @ts-expect-error should not exist
            expect(context.adapter.objects).to.be.undefined;
            expect(context.adapter.log).to.be.ok;
            expect(context.adapter.log.info).to.be.a('function');
            expect(context.adapter.log.debug).to.be.a('function');
            expect(context.adapter.log.warn).to.be.a('function');
            expect(context.adapter.log.error).to.be.a('function');
            expect(context.adapter.config.paramString).to.be.equal('value1');
            expect(context.adapter.config.paramNumber).to.be.equal(42);
            expect(context.adapter.config.paramBoolean).to.be.equal(false);
            expect(context.adapter.config.username).to.be.equal('tesla');
            // password has to be winning (decrypted via legacy - backward compatibility)
            expect(context.adapter.config.password).to.be.equal('winning');
            // secondPassword should be decrypted with AES-256 correctly
            expect(context.adapter.config.secondPassword).to.be.equal('ii-€+winning*-³§"');

            let count = 0;

            context.states.getState(`system.adapter.${context.adapterShortName}.0.compactMode`, function (err, state) {
                expect(state!.val).to.be.equal(true);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.connected`, function (err, state) {
                expect(state!.val).to.be.equal(true);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.memRss`, function (err, state) {
                expect(state!.val).to.be.equal(0);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.memHeapTotal`, function (err, state) {
                expect(state!.val).to.be.equal(0);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.memHeapUsed`, function (err, state) {
                expect(state!.val).to.be.equal(0);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.uptime`, function (err, state) {
                expect(state!.val).to.be.at.least(0);
                setTimeout(() => !--count && done(), 0);
            });
        });

        for (const test of tests) {
            test(it, expect, context);
        }

        after(`${options.name} ${context.adapterShortName} adapter: Stop js-controller`, async function () {
            this.timeout(35_000);

            expect(context.adapter.connected).to.be.true;
            await stopController();
            console.log('Adapter terminated');
            let adapterStopped = false;
            context.adapter.on('exit', () => {
                console.log('Adapter stopped');
                adapterStopped = true;
                expect(context.adapter.connected).to.be.false;
            });
            // redis server cannot be stopped
            if (objectsConfig.type === 'file') {
                await new Promise<void>(resolve => {
                    setTimeout(() => resolve(), 3_000 + (process.platform === 'win32' ? 5_000 : 0));
                });
                expect(context.adapter.connected).to.be.false;
                context.adapter.stop!();

                await new Promise<void>(resolve => {
                    setTimeout(() => resolve(), 2_000);
                });
                expect(adapterStopped).to.be.true;

                await new Promise<void>(resolve => {
                    setTimeout(() => resolve(), 2_000);
                });
            } else {
                await new Promise<void>(resolve => {
                    setTimeout(() => resolve(), 2_000);
                });
            }
        });
    });
}
