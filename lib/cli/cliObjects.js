'use strict';
const CLI = require('./index');
const CLICommand = require('./cliCommand');
const tools = require('../tools.js');

/** Command iobroker object ... */
module.exports = class CLIObjects extends CLICommand {

    /** @param {import('./cliCommand').CLICommandParams} options */
    constructor(options) {
        super(options);
        // Ensure the required params were given
        this.requireArgument('objects');
    }

    /**
     * Retrieves an object or its property from the DB and prints it
     * @param {string} id The id of the object to retrieve
     * @param {string} [propPath] If passed, the given property will be retrieved instead.
     * For example: `"native.something[2].onething"` selects `onething` of the 3rd array element of `object.native.something`.
     */
    get(id, propPath) {
        const callback = this.options.callback;

        this.options.objects.getObject(id, (err, res) => {
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
                if (this.options.pretty) {
                    console.log(JSON.stringify(res, null, 2));
                } else {
                    console.log(JSON.stringify(res));
                }
                return void callback();
            }
        });
    }

    /**
     * Updates an object or its property with the given value
     * @param {string} id The id of the object to update
     * @param {string | undefined} propPath If passed, the given property will be updated instead.
     * @param {any} value The value to set
     */
    set(id, propPath, value) {
        const { callback, objects } = this.options;

        function doSetObject(obj) {
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
