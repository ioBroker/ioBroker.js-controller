import assert from 'node:assert/strict';
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

export default function testAdapter(options: Record<string, any>): void {
    const statesConfig = options.statesConfig;
    const objectsConfig = options.objectsConfig;
    options.name ||= 'Test';

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
        // @ts-expect-error will be filled in time
        objects: null,
        // @ts-expect-error will be filled in time
        states: null,
        // @ts-expect-error will be filled in time
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
            assert.ok(context.objects);
            assert.ok(context.states);

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
                assert.notStrictEqual(err, 'Cannot check connection');
                done();
            });
        });

        it(`${options.name} ${context.adapterShortName} adapter: check all important adapter attributes`, function (done) {
            this.timeout(2000);
            assert.strictEqual(context.adapter.namespace, `${context.adapterShortName}.0`);
            assert.strictEqual(context.adapter.name, context.adapterShortName);
            assert.strictEqual(context.adapter.instance, 0);
            // @ts-expect-error should not exist
            assert.strictEqual(context.adapter.states, undefined);
            // @ts-expect-error should not exist
            assert.strictEqual(context.adapter.objects, undefined);
            assert.ok(context.adapter.log);
            assert.strictEqual(typeof context.adapter.log.info, 'function');
            assert.strictEqual(typeof context.adapter.log.debug, 'function');
            assert.strictEqual(typeof context.adapter.log.warn, 'function');
            assert.strictEqual(typeof context.adapter.log.error, 'function');
            assert.strictEqual(context.adapter.config.paramString, 'value1');
            assert.strictEqual(context.adapter.config.paramNumber, 42);
            assert.strictEqual(context.adapter.config.paramBoolean, false);
            assert.strictEqual(context.adapter.config.username, 'tesla');
            // password has to be winning (decrypted via legacy - backward compatibility)
            assert.strictEqual(context.adapter.config.password, 'winning');
            // secondPassword should be decrypted with AES-256 correctly
            assert.strictEqual(context.adapter.config.secondPassword, 'ii-€+winning*-³§"');

            let count = 0;

            context.states.getState(`system.adapter.${context.adapterShortName}.0.compactMode`, function (err, state) {
                assert.strictEqual(state!.val, true);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.connected`, function (err, state) {
                assert.strictEqual(state!.val, true);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.memRss`, function (err, state) {
                assert.strictEqual(state!.val, 0);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.memHeapTotal`, function (err, state) {
                assert.strictEqual(state!.val, 0);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.memHeapUsed`, function (err, state) {
                assert.strictEqual(state!.val, 0);
                setTimeout(() => !--count && done(), 0);
            });

            count++;
            context.states.getState(`system.adapter.${context.adapterShortName}.0.uptime`, function (err, state) {
                assert.ok((state!.val as number) >= 0);
                setTimeout(() => !--count && done(), 0);
            });
        });

        for (const test of tests) {
            test(it, context);
        }

        after(`${options.name} ${context.adapterShortName} adapter: Stop js-controller`, async function () {
            this.timeout(35_000);

            assert.strictEqual(context.adapter.connected, true);
            await stopController();
            console.log('Adapter terminated');
            let adapterStopped = false;
            context.adapter.on('exit', () => {
                console.log('Adapter stopped');
                adapterStopped = true;
                assert.strictEqual(context.adapter.connected, false);
            });
            // redis server cannot be stopped
            if (objectsConfig.type === 'file') {
                await new Promise<void>(resolve => {
                    setTimeout(() => resolve(), 3_000 + (process.platform === 'win32' ? 5_000 : 0));
                });
                assert.strictEqual(context.adapter.connected, false);
                context.adapter.stop!();

                await new Promise<void>(resolve => {
                    setTimeout(() => resolve(), 2_000);
                });
                assert.strictEqual(adapterStopped, true);

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
