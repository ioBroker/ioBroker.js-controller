'use strict';
const CLI = require('./index');
const CLICommand = require('./cliCommand');
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
        const { callback } = this.options;
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
            case 'delete':
            case 'del':
                return this.delete(args);
            default:
                CLI.error.unknownCommand('object', command);
                return void callback(3);
        }
    }

    /**
     * @param {any[]} args
     */
    chmod(args) {
        const { callback, dbAction } = this.options;
        let [modeObject, modeState, pattern] = args.slice(1);

        // Yargs converts numeric string to number, so we can use that to test
        // Afterwards we parse them ourselves, but with base16
        if (typeof modeObject !== "number") {
            CLI.error.requiredArgumentMissing('mode', 'object chmod 644 system.*');
            return void callback(1);
        }
        modeObject = parseInt(modeObject.toString(), 16);

        if (typeof modeState === "number") {
            // a mode for the state was given, convert it
            modeState = parseInt(modeState.toString(), 16);
        } else {
            pattern = modeState;
            modeState = undefined;
        }

        if (pattern == undefined) {
            CLI.error.requiredArgumentMissing('pattern', 'object chmod 644 system.*');
            return void callback(1);
        }

        dbAction((objects, states) => {
            objects.chmodObject(pattern, { user: 'system.user.admin', object: modeObject, state: modeState }, (err, processed) => {
                // Print the new object rights
                this.printObjectList(objects, states, err, processed);
            });
        });
    }

    /**
     * @param {any[]} args
     */
    chown(args) {
        const { callback, dbAction } = this.options;
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
        dbAction((objects, states) => {
            objects.chownObject(pattern, { user: 'system.user.admin', owner: user, ownerGroup: group }, (err, processed) => {
                // Print the new object rights
                this.printObjectList(objects, states, err, processed);
            });
        });
    }

    /**
     * @param {any[]} args
     */
    list(args) {
        const { callback, dbAction } = this.options;
        let pattern = args[1];
        if (typeof pattern === "string") {
            pattern = { startkey: pattern.replace('*', ''), endkey: pattern.replace('*', '\u9999') };
        }

        dbAction((objects, states) => {
            objects.getObjectList(pattern, { user: 'system.user.admin', sorted: true }, (err, processed) => {
                this.printObjectList(
                    objects, states,
                    err,
                    processed && processed.rows && processed.rows.map(r => r.value)
                );
            });
        });
    }

    /**
     * Retrieves an object or its property from the DB and prints it
     * @param {any[]} args
     */
    get(args) {
        const { callback, pretty, dbAction } = this.options;
        /** @type {[string, string]} */
        let [id, propPath] = (args.slice(1));
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object get id [propertypath]');
            return void callback(1);
        }

        // If propPath is passed, the given property will be retrieved instead.
        // For example: `"native.something[2].onething"` selects `onething` of the 3rd array element of `object.native.something`.

        dbAction((objects) => {
            objects.getObject(id, (err, res) => {
                if (err || !res) {
                    CLI.error.objectNotFound(id, err);
                    return void callback(3);
                } else {
                    if (typeof propPath === 'string') {
                        // We want to select a part of the object
                        try {
                            res = deepSelectProperty(res, propPath);
                        } catch (e) {
                            CLI.error.objectPropertyNotFound(id, propPath);
                            return void callback(3);
                        }
                    }
                    if (pretty) {
                        console.log(JSON.stringify(res, null, 2));
                    } else {
                        console.log(JSON.stringify(res));
                    }
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
        const { callback, dbAction } = this.options;
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

        dbAction((objects) => {
            const doSetObject = (obj) => {
                objects.setObject(id, obj, () => {
                    CLI.success.objectUpdated(id);
                    return void callback();
                });
            }
            if (propPath == undefined) {
                // We set the entire object, no need to retrieve it first
                doSetObject(value);
            } else {
                // We want to update a part of the object
                // Retrieve the object first
                objects.getObject(id, (err, res) => {
                    if (err || !res) {
                        CLI.error.objectNotFound(id, err);
                        return void callback(3);
                    }
                    try {
                        deepSetProperty(res, propPath, value);
                    } catch (e) {
                        CLI.error.objectPropertyNotFound(id, propPath);
                        return void callback(3);
                    }
                    doSetObject(res);
                });
            }
        })
    }

    /**
     * Deletes an object
     * @param {any[]} args
     */
    delete(args) {
        const { callback, dbAction } = this.options;
        /** @type {string} */
        const id = args[1];
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'object delete id');
            return void callback(1);
        }

        dbAction((objects) => {
            objects.delObject(id, err => {
                if (err) {
                    CLI.error.objectNotFound(id, err);
                    return void callback(3);
                } else {
                    CLI.success.objectDeleted(id);
                    return void callback();
                }
            });
        });
    }

    /**
     * Prints a list of objects and its access properties
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
        if (objList != undefined) {
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
}

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
    const arrayIndexRegex = /(\]\d+\[)(?!\.)/g; // Reversing the string reverses the brackets too
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
        if (!pathArr.length) return obj;
        // go deeper
        /** @type {string | number} */
        let propName = pathArr.shift();
        if (/\[\d+\]/.test(propName)) {
            // this is an array index
            propName = +propName.slice(1, -1);
        }
        return _deepSelectProperty(obj[propName], pathArr);
    }
    path = normalizePropertyPath(path);
    return _deepSelectProperty(object, path.split("."));
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
        if (/\[\d+\]/.test(propName)) {
            // this is an array index
            propName = +propName.slice(1, -1);
        }
        _deepSetProperty(obj[propName], pathArr);
    }
    path = normalizePropertyPath(path);
    _deepSetProperty(object, path.split("."));
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
    } catch (e) {
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
            if (!tools.isObject(value)) return undefined;
            return { value };
        } catch (e) {
            // nope!
            return undefined;
        }
    }
}
