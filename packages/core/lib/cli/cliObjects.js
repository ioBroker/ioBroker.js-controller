'use strict';
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const { formatValue } = require('./cliTools');
const tools = require('../tools.js');

/** Command iobroker object ... */
module.exports = class CLIObjects extends CLICommand {

    /** @param {import('./cliCommand').CLICommandOptions} options */
    constructor(options) {
        super(options);
    }

    /**
     * Executes a command
     * @param {any[]} args
     */
    execute(args) {
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
            default:
                CLI.error.unknownCommand('object', command);
                showHelp();
                return void callback(3);
        }
    }

    /**
     * Changes access rights for all objects matching the pattern
     * @param {any[]} args
     */
    chmod(args) {
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

        dbConnect((objects, states) => {
            objects.chmodObject(pattern, { user: 'system.user.admin', object: modeObject, state: modeState }, (err, processed) => {
                // Print the new object rights
                this.printObjectList(objects, states, err, processed);
            });
        });
    }

    /**
     * Changes owner for all objects matching the pattern
     * @param {any[]} args
     */
    chown(args) {
        const { callback, dbConnect } = this.options;
        /** @type {[string, string, any]} */
        let [user, group, pattern] = (args.slice(1));

        if (!pattern) {
            pattern = group;
            group = undefined;
        }

        if (!user) {
            CLI.error.requiredArgumentMissing('user', 'object chown user system.*');
            return void callback(1);
        } else if (!user.startsWith('system.user.')) {
            user = 'system.user.' + user;
        }
        if (group && !group.startsWith('system.group.')) {
            group = 'system.group.' + group;
        }

        if (!pattern) {
            CLI.error.requiredArgumentMissing('pattern', 'object chown user system.*');
            return void callback(1);
        }
        dbConnect((objects, states) => {
            objects.chownObject(pattern, { user: 'system.user.admin', owner: user, ownerGroup: group }, (err, processed) => {
                // Print the new object rights
                this.printObjectList(objects, states, err, processed);
            });
        });
    }

    /**
     * Lists all objects matching a pattern and their access rights
     * @param {any[]} args
     */
    list(args) {
        const { callback, dbConnect } = this.options;
        let pattern = args[1];
        if (typeof pattern === 'string') {
            pattern = { startkey: pattern.replace('*', ''), endkey: pattern.replace('*', '\u9999') };
        }

        dbConnect((objects, states) => {
            objects.getObjectList(pattern, { user: 'system.user.admin', sorted: true }, (err, processed) => {
                this.printObjectList(
                    objects, states,
                    err,
                    processed && processed.rows && processed.rows.map(r => r.value)
                );
                return void callback();
            });
        });
    }

    /**
     * Retrieves an object or its property from the DB and prints it
     * @param {any[]} args
     */
    get(args) {
        const { callback, pretty, dbConnect } = this.options;
        /** @type {[string, string]} */
        const [id, propPath] = (args.slice(1));
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object get id [propertypath]');
            return void callback(1);
        }

        // If propPath is passed, the given property will be retrieved instead.
        // For example: `"native.something[2].onething"` selects `onething` of the 3rd array element of `object.native.something`.

        dbConnect(objects => {
            objects.getObject(id, (err, res) => {
                if (err || !res) {
                    CLI.error.objectNotFound(id, err);
                    return void callback(3);
                } else {
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
                    return void callback();
                }
            });
        });
    }

    /**
     * Updates an object or its property with the given value
     * @param {any[]} args
     */
    set(args) {
        const { callback, dbConnect } = this.options;
        /** @type {string} */
        const id = args[1];
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object set id [propertypath=]value');
            return void callback(1);
        }

        const lastArg = args.length >= 2 ? args.slice(2).join(' ') : undefined;
        const parsedArg = parsePropPathAndAssignment(lastArg);
        if (!parsedArg) {
            CLI.error.invalidPropertyOrValue();
            return void callback(3);
        }
        const { propPath, value } = parsedArg;

        dbConnect(objects => {
            const doSetObject = obj => {
                objects.setObject(id, obj, err => {
                    if (err) {
                        CLI.error.cannotUpdateObject(id, err);
                        return void callback(1);
                    } else {
                        CLI.success.objectUpdated(id);
                        return void callback();
                    }
                });
            };
            if (!propPath) {
                // We set the entire object, no need to retrieve it first
                doSetObject(value);
            } else {
                // We want to update a part of the object
                // Retrieve the object first
                objects.getObject(id, async (err, res) => {
                    if (err || !res) {
                        CLI.error.objectNotFound(id, err);
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
                    if (/^system\.adapter\.(?<adapterName>.+)\.(?<instanceNr>\d+)$/g.test(id) && res.encryptedNative) {
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
     * @param {object} objects - objects db instance
     * @param {object} res - object which will be adapted
     * @param {string} propPath - path of the changed property
     * @param {any} value - value which has been newly set to the property
     * @return {Promise<void>}
     * @private
     */
    async _autoEncrypt(objects, res, propPath, value) {
        // input: it's an instance object and has encrypted native, was a native value set?
        if (/^native\..+[^.]$/g.test(propPath) && typeof value === 'string') {
            // single native property
            const prop = propPath.split('.')[1];
            if (res.encryptedNative.includes(prop)) {
                try {
                    const config = await objects.getObjectAsync('system.config');
                    res.native[prop] = tools.encrypt(config.native.secret, res.native[prop]);
                } catch (e) {
                    console.error(`Could not auto-encrypt property "${prop}": ${e.message}`);
                }
            }
        } else if (propPath === 'native' && tools.isObject(value)) {
            // whole native attribute
            let config;
            for (const prop in value) {
                if (typeof res.native[prop] === 'string' && res.encryptedNative.includes(prop)) {
                    try {
                        config = config || await objects.getObjectAsync('system.config');
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
     * @param {any[]} args
     */
    extend(args) {
        const { callback, dbConnect } = this.options;
        /** @type {string} */
        const id = args[1];
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object extend id <json-value>');
            return void callback(1);
        }

        const lastArg = args.length >= 2 ? args.slice(2).join(' ') : undefined;
        const parsedArg = parsePropPathAndAssignment(lastArg);
        // extend does not accept a property path, so error when one is passed
        if (!parsedArg || parsedArg.propPath) {
            CLI.error.invalidJSONValue();
            return void callback(3);
        }
        const { value } = parsedArg;

        dbConnect(objects => {
            objects.extendObject(id, value, err => {
                if (err) {
                    CLI.error.cannotUpdateObject(id, err);
                    return void callback(1);
                } else {
                    CLI.success.objectUpdated(id);
                    return void callback();
                }
            });
        });
    }

    /**
     * Collects all object for specific path
     * @param {object} objects class
     * @param {object} params parameters for getObjectView
     * @param {(result: object[]) => void} callback
     * @return {Promise<object[]>}
     */
    async _collectObjects(objects, params, callback) {
        const types = ['state', 'channel', 'device', 'enum', 'instance', 'host', 'adapter', 'meta', 'config', 'group', 'user', 'script'];
        const result = [];

        for (const type of types) {
            try {
                const res = await objects.getObjectViewAsync('system', type, params);
                res.rows && res.rows.forEach(item => result.push(item.value));
            } catch {
                // ignore
            }
        }
        return tools.maybeCallback(callback, result);
    }

    /**
     * Delete all object from list sequentially
     * @param {object} objects class
     * @param {string[]} ids IDs
     * @param {() => void} callback
     * @return {Promise<void>}
     */
    async _deleteObjects(objects, ids, callback) {
        if (!ids || !ids.length) {
            return tools.maybeCallback(callback);
        } else {
            for (const id of ids) {
                try {
                    await objects.delObjectAsync(id);
                    await tools.removeIdFromAllEnums(objects, id);
                } catch (e) {
                    console.warn(`Could not delete object or remove "${id}" from enums: ${e.message}`);
                }
            }
            return tools.maybeCallback(callback);
        }
    }

    /**
     * Deletes an object
     * @param {any[]} args
     */
    delete(args) {
        const { callback, dbConnect } = this.options;
        /** @type {string} */
        const id = args[1];
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object delete id');
            return void callback(1);
        }

        dbConnect(objects => {
            if (id.endsWith('*')) {
                const params = {
                    startkey: id.replace(/\*/g, ''),
                    endkey:   id.replace(/\*/g, '\u9999')
                };
                this._collectObjects(objects, params, result => {
                    if (!result || !result.length) {
                        console.log('No IDs found for this pattern.');
                        return void callback();
                    }
                    const ids = result.map(item => item._id);

                    // if no auto confirmation, ask user
                    if (!this.options.f && this.options.y && !this.options.yes) {
                        const rl = require('readline').createInterface({
                            input:  process.stdin,
                            output: process.stdout
                        });
                        rl.question(result.length + ' object(s) will be deleted. Are you sure? [y/N]: ', answer => {
                            rl.close();
                            if (answer === 'y' || answer === 'yes' || answer === 'j' || answer === 'ja' || answer === 'да' || answer === 'д') {
                                this._deleteObjects(objects, ids, callback);
                            } else {
                                console.log('Aborted.');
                                return void callback(3);
                            }
                        });
                    } else {
                        this._deleteObjects(objects, ids, callback);
                    }
                });
            } else {
                // only one object
                objects.delObject(id, err => {
                    if (err) {
                        CLI.error.objectNotFound(id, err);
                        return void callback(3);
                    } else {
                        tools.removeIdFromAllEnums(objects, id).then(() => {
                            CLI.success.objectDeleted(id);
                            return void callback();
                        }).catch(e => {
                            CLI.error.cannotDeleteObjectFromEnums(id, e.message);
                            return void callback(3);
                        });
                    }
                });
            }
        });
    }

    /**
     * Prints a list of objects and its access properties
     * @param {object} objects objects db
     * @param {object} states states db
     * @param {string | undefined} err An error (if one occured)
     * @param {unknown[]} [objList] The object list to print
     */
    printObjectList(objects, states, err, objList) {
        // TODO: is this supposed to be here?
        const { callback } = this.options;
        if (err) {
            console.error(err);
            return void callback(33);
        }
        if (objList !== null && objList !== undefined) {
            const List = require('../setup/setupList.js');
            const list = new List({
                states: states,
                objects: objects,
                processExit: callback
            });
            list.showObjectHeader();
            objList.forEach(list.showObject);
        }
        setTimeout(callback, 1000);
    }
};

/**
 * Reverses a string
 * @param {string} str The string to reverse
 */
function reverseString(str) {
    return Array.from(str).reverse().join('');
}

/**
 * Normalizes a property path for use in deepSelectProperty and deepSetProperty
 * @param {string} path The property path to normalize
 * @returns {string}
 */
function normalizePropertyPath(path) {
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
 * @template T
 * @param {Record<string, T>} object The object to select a property from
 * @param {string} path The property path to search for
 * @returns {unknown}
 */
function deepSelectProperty(object, path) {
    /**
     * @template T2
     * @param {Record<string, T2>} obj
     * @param {string[]} pathArr
     * @returns {unknown}
     */
    function _deepSelectProperty(obj, pathArr) {
        // are we there yet? then return obj
        if (!pathArr.length) {
            return obj;
        }
        // go deeper
        /** @type {string | number} */
        let propName = pathArr.shift();
        if (/\[\d+]/.test(propName)) {
            // this is an array index
            propName = +propName.slice(1, -1);
        }
        return _deepSelectProperty(obj[propName], pathArr);
    }
    path = normalizePropertyPath(path);
    return _deepSelectProperty(object, path.split('.'));
}

// Vergräbt eine Eigenschaft in einem Objekt (Gegenteil von dig)
/**
 * Changes a property of an object or its sub-objects if it exists. Opposite of `deepSelectProperty`.
 * @template T
 * @param {Record<string, T>} object The object to replace a property in
 * @param {string} path The property path to search for
 * @param {any} value
 * @returns {void}
 */
function deepSetProperty(object, path, value) {
    /**
     * @template T2
     * @param {Record<string, T2>} obj
     * @param {string[]} pathArr
     * @returns {void}
     */
    function _deepSetProperty(obj, pathArr) {
        // are we there yet? then return obj
        if (pathArr.length === 1) {
            obj[pathArr[0]] = value;
            return;
        }
        // go deeper
        /** @type {string | number} */
        let propName = pathArr.shift();
        if (/\[\d+]/.test(propName)) {
            // this is an array index
            propName = parseInt(propName.slice(1, -1));
        }
        _deepSetProperty(obj[propName], pathArr);
    }
    path = normalizePropertyPath(path);
    _deepSetProperty(object, path.split('.'));
}

/**
 * Tries to parse a CLI argument that could be used to set an object
 * @param {string} arg The CLI argument containing the value to be set
 * @returns {string | number | boolean | object | Array}
 */
function parseCLIValue(arg) {
    try {
        // JSON.parse does not allow plain strings
        return JSON.parse(arg);
    } catch {
        // arg is a string
        return arg;
    }
}

/**
 * @typedef {object} ParsedPropPathAndAssignment
 * @property {string} [propPath]
 * @property {unknown} value
 */
/**
 * Tries to parse a CLI argument of the form [propPath=]value.
 * @param {string} arg The CLI argument containing an optional prop path and a JSON value
 * @returns {ParsedPropPathAndAssignment | undefined}
 */
function parsePropPathAndAssignment(arg) {
    const equalsIndex = arg.indexOf('=');
    if (equalsIndex > -1) {
        // This might contain a propPath AND a value
        const propPath = arg.substr(0, equalsIndex);
        const valueString = arg.substr(equalsIndex + 1);
        // For partial assignments, allow strings as the value
        const value = parseCLIValue(valueString);
        return { propPath, value };
    } else {
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
}
