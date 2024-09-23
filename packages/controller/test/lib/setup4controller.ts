import fs from 'fs-extra';
import path from 'node:path';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { Client as StateRedisClient } from '@iobroker/db-states-redis';
import * as url from 'node:url';
import { appNameLowerCase } from '@iobroker/js-controller-common-db/tools';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

export const rootDir = path.normalize(`${thisDir}/../../`);

interface StartControllerReturnObject {
    states: StateRedisClient | null;
    objects: ObjectsInRedisClient | null;
}

export const appName = appNameLowerCase;

let objects: ObjectsInRedisClient | null;
let states: StateRedisClient | null;

// ensure the temp dir is empty, because content of data/files etc is created and checked for existence in some tests
fs.emptyDirSync(`${rootDir}tmp`);

export async function startController(options: Record<string, any>): Promise<StartControllerReturnObject> {
    if (!options) {
        options = {};
    }

    let isObjectConnected: boolean;
    let isStatesConnected: boolean;

    console.log('startController...');

    // adjust db for the cli tests
    const iobrokerJSON = fs.readJSONSync(path.join(rootDir, 'data', `${appName}.json`));
    iobrokerJSON.objects.type = options.objects.type || 'file';
    iobrokerJSON.objects.port = options.objects.port === undefined ? 19001 : options.objects.port;
    iobrokerJSON.objects.host = options.objects.host || '127.0.0.1';
    iobrokerJSON.objects.redisNamespace = options.objects.redisNamespace || '';
    iobrokerJSON.states.type = options.states.type || 'file';
    iobrokerJSON.states.port = options.states.port === undefined ? 19000 : options.states.port;
    iobrokerJSON.states.host = options.states.host || '127.0.0.1';
    fs.writeJSONSync(path.join(rootDir, 'data', `${appName}.json`), iobrokerJSON, { spaces: 2 });

    let Objects;

    if (options.objects) {
        if (!options.objects.type || options.objects.type === 'file') {
            console.log('Used class for Objects: Objects Server');
            Objects = (await import('@iobroker/db-objects-file')).Server;
        } else if (options.objects.type === 'redis') {
            console.log('Used class for Objects: Objects Redis Client');
            Objects = (await import('@iobroker/db-objects-redis')).Client;
        } else {
            console.log(`Used custom class for Objects (assume Server available): Objects ${options.objects.type}`);
            Objects = (await import(`@iobroker/db-objects-${options.objects.type}`)).Server;
        }
    } else {
        console.log('Used class for Objects: Objects Server');
        Objects = (await import('@iobroker/db-objects-file')).Server;
    }

    let States;
    // Just open in memory DB itself
    if (options.states) {
        if (!options.states.type || options.states.type === 'file') {
            console.log('Used class for States: States Server');
            States = (await import('@iobroker/db-states-file')).Server;
        } else if (options.states.type === 'redis') {
            console.log('Used class for States: States Redis Client');
            States = (await import('@iobroker/db-states-redis')).Client;
        } else {
            console.log(`Used custom class for States (assume Server available): States ${options.states.type}`);
            States = (await import(`@iobroker/db-states-${options.states.type}`)).Server;
        }
    } else {
        console.log('Used class for States: States Server');
        States = (await import('@iobroker/db-states-file')).Server;
    }

    return new Promise(resolve => {
        const settingsObjects = {
            connection: {
                type: options.objects.type || 'file',
                host: options.objects.host || '127.0.0.1',
                port: options.objects.port === undefined ? 19001 : options.objects.port,
                user: options.objects.user || '',
                pass: options.objects.pass || '',
                redisNamespace: options.objects.redisNamespace || '',
                noFileCache: options.objects.noFileCache === undefined ? options.objects.noFileCache : true,
                connectTimeout: options.objects.connectTimeout || 2000,
                dataDir: options.objects.dataDir || '',
                enhancedLogging: true,
            },
            logger: options.objects.logger ||
                options.logger || {
                    silly: (msg: string) => console.log(msg),
                    debug: (msg: string) => console.log(msg),
                    info: (msg: string) => console.log(msg),
                    warn: (msg: string) => console.warn(msg),
                    error: (msg: string) => console.error(msg),
                },
            connected: () => {
                // clear all objects
                objects!.destroyDB(null, async () => {
                    await objects!.activateSets();
                    // we need to read the sets lua scripts
                    await objects!.loadLuaScripts();
                    isObjectConnected = true;
                    if (isStatesConnected && states) {
                        console.log('startController: started!');
                        resolve({ objects, states });
                    }
                });
            },
            change: options.objects.onChange || null,
        };

        objects = new Objects(settingsObjects);

        const settingsStates = {
            connection: {
                options: {
                    auth_pass: null,
                    retry_max_delay: 15000,
                },
                type: options.states.type || 'file',
                host: options.states.host || '127.0.0.1',
                port: options.states.port === undefined ? 19000 : options.states.port,
                user: options.states.user || '',
                pass: options.states.pass || '',
                dataDir: options.states.dataDir || '',
                enhancedLogging: true,
            },
            logger: options.states.logger ||
                options.logger || {
                    silly: (msg: string) => console.log(msg),
                    debug: (msg: string) => console.log(msg),
                    info: (msg: string) => console.log(msg),
                    warn: (msg: string) => console.warn(msg),
                    error: (msg: string) => console.error(msg),
                },
            connected: () => {
                if (settingsStates.connection.type === 'redis') {
                    states!.destroyDB(() => {
                        console.log('States ok');
                        isStatesConnected = true;
                        if (isObjectConnected && objects) {
                            console.log('startController: started!');
                            resolve({ objects, states });
                        }
                    });
                } else {
                    console.log('States ok');
                    isStatesConnected = true;
                    if (isObjectConnected && objects) {
                        console.log('startController: started!');
                        resolve({ objects, states });
                    }
                }
            },
            change: options.states.onChange || null,
        };

        states = new States(settingsStates);
    });
}

export async function stopController(): Promise<void> {
    if (objects) {
        await objects.destroy();
        objects = null;
    }
    if (states) {
        await states.destroy();
        states = null;
    }
}
