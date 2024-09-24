import { CLICommand, type CLICommandOptions } from './cliCommand.js';

import * as CLI from './messages.js';
import { formatValue } from './cliTools.js';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';

interface ParsedPropPathAndAssignment {
    propPath?: string;
    value: unknown;
}

/** Command iobroker object ... */
export class CLIObjects extends CLICommand {
    constructor(options: CLICommandOptions) {
        super(options);
    }

    /**
     * Executes a command
     *
     * @param args
     */
    execute(args: any[]): void {
        const { callback, showHelp } = this.options;
        const command = args[0];

        switch (command) {
            case 'chmod':
                return this.chmod(args);
            case 'chown':
                return this.chown(args);
            case 'list':
            case 'l':
                return this.list(args);
            case 'get':
                return this.get(args);
            case 'set':
                return this.set(args);
            case 'extend':
                return this.extend(args);
            case 'delete':
            case 'del':
                return this.delete(args);
            case 'getDBVersion':
                return this.getDBVersion();
            case 'setDBVersion':
                return this.setDBVersion();
            case 'activateSets':
                return this.activateSets();
            case 'deactivateSets':
                return this.deactivateSets();
            default:
                CLI.error.unknownCommand('object', command);
                showHelp();
                return void callback(3);
        }
    }

    /**
     * Activates the usage of Redis Sets
     */
    activateSets(): void {
        const { callback, dbConnect } = this.options;
        dbConnect(async params => {
            const { states, objects } = params;

            const useSetsIndicator = await objects.getMeta('objects.features.useSets');

            if (!useSetsIndicator || !parseInt(useSetsIndicator)) {
                // all hosts need to be stopped for this
                if (await tools.isHostRunning(objects, states)) {
                    console.log('Cannot activate the usage of Redis Sets while one or more hosts are running');
                    return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                }

                await objects.activateSets();
                const noMigrated = await objects.migrateToSets();

                if (noMigrated) {
                    console.log(`Successfully migrated ${noMigrated} objects to Redis Sets`);
                }
                console.log(
                    `Successfully activated the usage of Redis Sets. Please make sure to only use js-controller 4.0 or higher on all hosts!`,
                );
            } else {
                console.log('Redis Sets are already activated.');
            }
            return void callback(EXIT_CODES.NO_ERROR);
        });
    }

    /**
     * Deactivates the usage of Redis Sets
     */
    deactivateSets(): void {
        const { callback, dbConnect } = this.options;
        dbConnect(async params => {
            const { objects } = params;
            const useSetsIndicator = await objects.getMeta('objects.features.useSets');

            if (useSetsIndicator && parseInt(useSetsIndicator)) {
                await objects.deactivateSets();
                console.log(`Successfully deactivated the usage of Redis Sets.`);
            } else {
                console.log('Redis Sets are already deactivated.');
            }
            return void callback(EXIT_CODES.NO_ERROR);
        });
    }

    /**
     * Get the protocol version
     */
    getDBVersion(): void {
        const { callback, dbConnect } = this.options;
        dbConnect(async params => {
            const { objects } = params;

            const version = await objects.getProtocolVersion();
            console.log(`Current Objects DB protocol version: ${version}`);
            return void callback(EXIT_CODES.NO_ERROR);
        });
    }

    /**
     * Set protocol version
     */
    setDBVersion(): void {
        const { callback, dbConnect } = this.options;
        dbConnect(async params => {
            const { objects } = params;
            const rl = await import('readline-sync');

            let answer = rl.question('Changing the protocol version will restart all hosts! Continue? [N/y]', {
                limit: /^(yes|y|n|no)$/i,
                defaultInput: 'no',
            });

            answer = answer.toLowerCase();

            if (answer !== 'y' && answer !== 'yes') {
                console.log('Protocol version has not been changed!');
                return void callback(EXIT_CODES.NO_ERROR);
            }

            try {
                await objects.setProtocolVersion(this.options.version);
            } catch (e) {
                console.error(`Cannot update protocol version: ${e.message}`);
                return void callback(1);
            }
            console.log(`Objects DB protocol updated to version ${this.options.version}`);
            return void callback(EXIT_CODES.NO_ERROR);
        });
    }

    /**
     * Changes access rights for all objects matching the pattern
     *
     * @param args
     */
    chmod(args: any[]): void {
        const { callback, dbConnect } = this.options;
        let [modeObject, modeState, pattern] = args.slice(1);

        // Yargs converts numeric string to number, so we can use that to test
        // Afterwards we parse them ourselves, but with base16
        if (typeof modeObject !== 'number') {
            CLI.error.requiredArgumentMissing('mode', 'object chmod 644 system.*');
            return void callback(1);
        }
        modeObject = parseInt(modeObject.toString(), 16);

        if (typeof modeState === 'number') {
            // a mode for the state was given, convert it
            modeState = parseInt(modeState.toString(), 16);
        } else {
            pattern = modeState;
            modeState = undefined;
        }

        if (pattern === undefined) {
            CLI.error.requiredArgumentMissing('pattern', 'object chmod 644 system.*');
            return void callback(1);
        }

        dbConnect(params => {
            const { objects, states } = params;

            objects.chmodObject(
                pattern,
                { user: 'system.user.admin', object: modeObject, state: modeState },
                (err, processed) => {
                    // Print the new object rights
                    this.printObjectList(objects, states, err?.message, processed);
                },
            );
        });
    }

    /**
     * Changes owner for all objects matching the pattern
     *
     * @param args
     */
    chown(args: any[]): void {
        const { callback, dbConnect } = this.options;
        let [user, group, pattern] = args.slice(1);

        if (!pattern) {
            pattern = group;
            group = undefined;
        }

        if (!user) {
            CLI.error.requiredArgumentMissing('user', 'object chown user system.*');
            return void callback(1);
        } else if (!user.startsWith('system.user.')) {
            user = `system.user.${user}`;
        }
        if (group && !group.startsWith('system.group.')) {
            group = `system.group.${group}`;
        }

        if (!pattern) {
            CLI.error.requiredArgumentMissing('pattern', 'object chown user system.*');
            return void callback(1);
        }
        dbConnect(params => {
            const { objects, states } = params;

            objects.chownObject(
                pattern,
                { user: 'system.user.admin', owner: user, ownerGroup: group },
                (err, processed) => {
                    // Print the new object rights
                    this.printObjectList(objects, states, err?.message, processed);
                },
            );
        });
    }

    /**
     * Lists all objects matching a pattern and their access rights
     *
     * @param args
     */
    list(args: any[]): void {
        const { callback, dbConnect } = this.options;
        let pattern = args[1];
        if (typeof pattern === 'string') {
            pattern = { startkey: pattern.replace('*', ''), endkey: pattern.replace('*', '\u9999') };
        }

        dbConnect(params => {
            const { objects, states } = params;

            objects.getObjectList(pattern, { user: 'system.user.admin', sorted: true }, (err, processed) => {
                this.printObjectList(
                    objects,
                    states,
                    err?.message,
                    processed && processed.rows && processed.rows.map(r => r.value),
                );
                return void callback(EXIT_CODES.NO_ERROR);
            });
        });
    }

    /**
     * Retrieves an object or its property from the DB and prints it
     *
     * @param args
     */
    get(args: any[]): void {
        const { callback, pretty, dbConnect } = this.options;
        const [id, propPath] = args.slice(1);
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object get id [propertypath]');
            return void callback(1);
        }

        // If propPath is passed, the given property will be retrieved instead.
        // For example: `"native.something[2].onething"` selects `onething` of the 3rd array element of `object.native.something`.

        dbConnect(params => {
            const { objects } = params;

            objects.getObject(id, (err, res) => {
                if (err || !res) {
                    CLI.error.objectNotFound(id, err?.message);
                    return void callback(3);
                }
                if (typeof propPath === 'string') {
                    // We want to select a part of the object
                    try {
                        res = deepSelectProperty(res, propPath);
                    } catch {
                        CLI.error.objectPropertyNotFound(id, propPath);
                        return void callback(3);
                    }
                }
                console.log(formatValue(res, pretty));
                return void callback(EXIT_CODES.NO_ERROR);
            });
        });
    }

    /**
     * Updates an object or its property with the given value
     *
     * @param args
     */
    set(args: any[]): void {
        const { callback, dbConnect } = this.options;
        const id: string = args[1];
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object set id [propertypath=]value');
            return void callback(1);
        }

        const lastArg = args.length >= 2 ? args.slice(2).join(' ') : undefined;
        const parsedArg = parsePropPathAndAssignment(lastArg!);
        if (!parsedArg) {
            CLI.error.invalidPropertyOrValue();
            return void callback(3);
        }
        const { propPath, value } = parsedArg;

        dbConnect(params => {
            const { objects } = params;

            const doSetObject = (obj: any): void => {
                objects.setObject(id, obj, err => {
                    if (err) {
                        CLI.error.cannotUpdateObject(id, err.message);
                        return void callback(1);
                    }
                    CLI.success.objectUpdated(id);
                    return void callback(EXIT_CODES.NO_ERROR);
                });
            };
            if (!propPath) {
                // We set the entire object, no need to retrieve it first
                doSetObject(value as any);
            } else {
                // We want to update a part of the object
                // Retrieve the object first
                objects.getObject(id, async (err, res) => {
                    if (err || !res) {
                        CLI.error.objectNotFound(id, err?.message);
                        return void callback(3);
                    }
                    try {
                        deepSetProperty(res, propPath, value);
                    } catch {
                        CLI.error.objectPropertyNotFound(id, propPath);
                        return void callback(3);
                    }

                    // auto encrypt -> only do that here, no one configures an instance by setting the whole object,
                    // else it would be copied and probably already encrypted
                    if (
                        /^system\.adapter\.(?<adapterName>.+)\.(?<instanceNr>\d+)$/g.test(id) &&
                        'encryptedNative' in res
                    ) {
                        await this._autoEncrypt(objects, res, propPath, value);
                    }

                    doSetObject(res);
                });
            }
        });
    }

    /**
     * Encrypts all newly set properties of encryptedNative - currently customized for propPath
     *
     * @param objects - objects db instance
     * @param res - object which will be adapted
     * @param propPath - path of the changed property
     * @param value - value which has been newly set to the property
     */
    private async _autoEncrypt(
        objects: ObjectsClient,
        res: ioBroker.AnyObject,
        propPath: string,
        value: any,
    ): Promise<void> {
        // input: it's an instance object and has encrypted native, was a native value set?
        if (/^native\..+[^.]$/g.test(propPath) && typeof value === 'string') {
            // single native property
            const prop = propPath.split('.')[1];
            if ('encryptedNative' in res && res.encryptedNative?.includes(prop)) {
                try {
                    const config = await objects.getObjectAsync('system.config');
                    res.native[prop] = tools.encrypt(config!.native.secret, res.native[prop]);
                } catch (e) {
                    console.error(`Could not auto-encrypt property "${prop}": ${e.message}`);
                }
            }
        } else if (propPath === 'native' && tools.isObject(value)) {
            // whole native attribute
            let config;
            for (const prop in value) {
                if (
                    typeof (res.native as Record<string, any>)[prop] === 'string' &&
                    'encryptedNative' in res &&
                    res.encryptedNative?.includes(prop)
                ) {
                    try {
                        config = config || (await objects.getObjectAsync('system.config'))!;
                        res.native[prop] = tools.encrypt(config.native.secret, res.native[prop]);
                    } catch (e) {
                        console.error(`Could not auto-encrypt property "${prop}": ${e.message}`);
                    }
                }
            }
        }
    }

    /**
     * Extends an object with the given value
     *
     * @param args
     */
    extend(args: any[]): void {
        const { callback, dbConnect } = this.options;
        const id: string = args[1];
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object extend id <json-value>');
            return void callback(1);
        }

        const lastArg = args.length >= 2 ? args.slice(2).join(' ') : undefined;
        const parsedArg = parsePropPathAndAssignment(lastArg!);
        // extend does not accept a property path, so error when one is passed
        if (!parsedArg || parsedArg.propPath) {
            CLI.error.invalidJSONValue();
            return void callback(3);
        }
        const { value } = parsedArg;

        dbConnect(params => {
            const { objects } = params;

            objects.extendObject(id, value as any, null, err => {
                if (err) {
                    CLI.error.cannotUpdateObject(id, err.message);
                    return void callback(1);
                }
                CLI.success.objectUpdated(id);
                return void callback(EXIT_CODES.NO_ERROR);
            });
        });
    }

    /**
     * Collects all object for specific path
     *
     * @param objects class
     * @param params parameters for getObjectView
     */
    async _collectObjects(objects: ObjectsClient, params: ioBroker.GetObjectViewParams): Promise<ioBroker.AnyObject[]> {
        const types = [
            'state',
            'channel',
            'device',
            'enum',
            'instance',
            'host',
            'adapter',
            'meta',
            'config',
            'group',
            'user',
            'script',
        ];
        const result: ioBroker.AnyObject[] = [];

        for (const type of types) {
            try {
                const res = await objects.getObjectViewAsync('system', type, params);
                res.rows.forEach(item => {
                    if (item.value) {
                        result.push(item.value);
                    }
                });
            } catch {
                // ignore
            }
        }
        return result;
    }

    /**
     * Delete all object from list sequentially
     *
     * @param objects class
     * @param ids IDs
     * @param callback
     */
    async _deleteObjects(objects: ObjectsClient, ids: string[], callback: (exitCode: number) => void): Promise<void> {
        if (!ids || !ids.length) {
            return tools.maybeCallback(callback, EXIT_CODES.NO_ERROR);
        }
        let allEnums;

        try {
            // cache all enums, else it will be slow to delete many objects
            allEnums = await tools.getAllEnums(objects);
        } catch (e) {
            console.error(`Could not retrieve all enums: ${e.message}`);
        }

        for (const id of ids) {
            try {
                await objects.delObjectAsync(id);
                await tools.removeIdFromAllEnums(objects, id, allEnums);
            } catch (e) {
                console.warn(`Could not delete object or remove "${id}" from enums: ${e.message}`);
            }
        }
        return tools.maybeCallback(callback, EXIT_CODES.NO_ERROR);
    }

    /**
     * Deletes an object
     *
     * @param args
     */
    delete(args: any[]): void {
        const { callback, dbConnect } = this.options;
        const id: string = args[1];
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object delete id');
            return void callback(1);
        }

        dbConnect(async params => {
            const { objects } = params;

            if (id.endsWith('*')) {
                const params = {
                    startkey: id.replace(/\*/g, ''),
                    endkey: id.replace(/\*/g, '\u9999'),
                };

                const result = await this._collectObjects(objects, params);
                if (!result || !result.length) {
                    console.log('No IDs found for this pattern.');
                    return void callback(EXIT_CODES.NO_ERROR);
                }
                const ids = result.map(item => item._id);

                // if no auto confirmation, ask user
                if (!this.options.f && this.options.y && !this.options.yes) {
                    const rl = (await import('node:readline')).createInterface({
                        input: process.stdin,
                        output: process.stdout,
                    });
                    rl.question(`${result.length} object(s) will be deleted. Are you sure? [y/N]: `, answer => {
                        rl.close();
                        if (
                            answer === 'y' ||
                            answer === 'yes' ||
                            answer === 'j' ||
                            answer === 'ja' ||
                            answer === 'да' ||
                            answer === 'д'
                        ) {
                            this._deleteObjects(objects, ids, callback);
                        } else {
                            console.log('Aborted.');
                            return void callback(3);
                        }
                    });
                } else {
                    this._deleteObjects(objects, ids, callback);
                }
            } else {
                // only one object
                objects.delObject(id, async err => {
                    if (err) {
                        CLI.error.objectNotFound(id, err.message);
                        callback(3);
                    } else {
                        try {
                            await tools.removeIdFromAllEnums(objects, id);
                            CLI.success.objectDeleted(id);
                            callback(EXIT_CODES.NO_ERROR);
                        } catch (e) {
                            CLI.error.cannotDeleteObjectFromEnums(id, e.message);
                            callback(3);
                        }
                    }
                });
            }
        });
    }

    /**
     * Prints a list of objects and its access properties
     *
     * @param objects objects db
     * @param states states db
     * @param err An error (if one occurred)
     * @param objList The object list to print
     */
    async printObjectList(
        objects: ObjectsClient,
        states: StatesClient,
        err: string | undefined,
        objList?: ioBroker.AnyObject[],
    ): Promise<void> {
        // TODO: is this supposed to be here?
        const { callback } = this.options;
        if (err) {
            console.error(err);
            return void callback(33);
        }
        if (objList !== null && objList !== undefined) {
            const { List } = await import('../setup/setupList.js');
            const list = new List({
                states,
                objects,
                processExit: callback,
            });
            list.showObjectHeader();
            objList.forEach(list.showObject);
        }
        setTimeout(callback, 1_000);
    }
}

/**
 * Reverses a string
 *
 * @param str The string to reverse
 */
function reverseString(str: string): string {
    return Array.from(str).reverse().join('');
}

/**
 * Normalizes a property path for use in deepSelectProperty and deepSetProperty
 *
 * @param path The property path to normalize
 */
function normalizePropertyPath(path: string): string {
    // Basically we want to support paths like "obj[1][2]", but the other methods expect "obj.[1].[2]"
    // So we need to replace all occurences of square brackets without leading dots
    // JS Regex only supports negative lookbehind in ES 2018, so we fake it using reversed strings and
    // negative lookahead
    const arrayIndexRegex = /(]\d+\[)(?!\.)/g; // Reversing the string reverses the brackets too
    let ret = reverseString(path);
    // Append the dot to each bracket, since we're going to reverse it
    ret = ret.replace(arrayIndexRegex, '$1.');
    return reverseString(ret);
}

/**
 * Selects a property of an object or its sub-objects and returns it if it exists. E.g.
 * `deepSelectProperty(obj, "common.asdf.qwer")` => `obj.common.asdf.qwer`
 *
 * @param object The object to select a property from
 * @param path The property path to search for
 */
function deepSelectProperty(object: ioBroker.AnyObject, path: string): any {
    /**
     * @param obj
     * @param pathArr
     */
    function _deepSelectProperty(obj: any, pathArr: string[]): unknown {
        // are we there yet? then return obj
        if (!pathArr.length) {
            return obj;
        }
        // go deeper
        let propName = pathArr.shift()!;
        if (/\[\d+]/.test(propName)) {
            // this is an array index
            // @ts-expect-error // TODO: fix it - this is not ts fashion, assigning numbers to the string array here
            propName = parseInt(propName.slice(1, -1));
        }
        return _deepSelectProperty(obj[propName], pathArr);
    }
    path = normalizePropertyPath(path);
    return _deepSelectProperty(object, path.split('.'));
}

/**
 * Changes a property of an object or its sub-objects if it exists. Opposite of `deepSelectProperty`.
 *
 * @param object The object to replace a property in
 * @param path The property path to search for
 * @param value
 */
function deepSetProperty(object: ioBroker.AnyObject, path: string, value: any): void {
    /**
     * @param obj
     * @param pathArr
     */
    function _deepSetProperty(obj: any, pathArr: string[]): void {
        // are we there yet? then return obj
        if (pathArr.length === 1) {
            obj[pathArr[0]] = value;
            return;
        }
        // go deeper
        let propName = pathArr.shift()!;
        if (/\[\d+]/.test(propName)) {
            // this is an array index
            // @ts-expect-error // TODO: fix it - this is not ts fashion, assigning numbers to the string array here
            propName = parseInt(propName.slice(1, -1));
        }
        _deepSetProperty(obj[propName], pathArr);
    }
    path = normalizePropertyPath(path);
    _deepSetProperty(object, path.split('.'));
}

/**
 * Tries to parse a CLI argument that could be used to set an object
 *
 * @param arg The CLI argument containing the value to be set
 */
function parseCLIValue(arg: string): any {
    try {
        // JSON.parse does not allow plain strings
        return JSON.parse(arg);
    } catch {
        // arg is a string
        return arg;
    }
}

/**
 * Tries to parse a CLI argument of the form [propPath=]value.
 *
 * @param arg The CLI argument containing an optional prop path and a JSON value
 */
function parsePropPathAndAssignment(arg: string): ParsedPropPathAndAssignment | undefined {
    const equalsIndex = arg.indexOf('=');
    if (equalsIndex > -1) {
        // This might contain a propPath AND a value
        const propPath = arg.substr(0, equalsIndex);
        const valueString = arg.substr(equalsIndex + 1);
        // For partial assignments, allow strings as the value
        const value = parseCLIValue(valueString);
        return { propPath, value };
    }
    // This is a full assignment, allow only objects
    try {
        const value = JSON.parse(arg);
        if (!tools.isObject(value)) {
            return undefined;
        }
        return { value };
    } catch {
        // nope!
        return undefined;
    }
}
