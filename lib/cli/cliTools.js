'use strict';
const tools = require('../tools.js');

/**
 *
 * @param {any} val The value to format for output
 * @param {boolean} [pretty=false] Whether it should be pretty-printed
 */
function formatValue(val, pretty) {
    // Only use JSON.stringify if we need it (for objects and arrays)
    const needsStringify = tools.isObject(val) || tools.isArray(val);
    const output = !needsStringify ? val
        : pretty ? JSON.stringify(val, null, 2)
            : JSON.stringify(val);
    return output;
}

/** Returns the "from" property for objects changed by the CLI */
function getObjectFrom() {
    return `system.host.${tools.getHostName()}.cli`;
}

/**
 * Removes <tools.appName> from the start of the adapter name if it is there
 * E.g. iobroker.admin -> admin
 * @param {string} name The adapter name to normalize
 */
function normalizeAdapterName(name) {
    if (typeof name === 'string') {
        name = name.replace(new RegExp('^' + tools.appName + '\\.', 'i'), '');
    }
    return name;
}

/**
 * Ensures that the given string is a valid adapter identifier (<adaptername>) WITHOUT instance number
 * @param {string} name The name which is supposed to be an adapter identifier
 */
function validateAdapterIdentifier(name) {
    return /^[a-z0-9\-_]+$/.test(name);
}

/**
 * Ensures that the given string contains a valid identifier for 
 * an adapter (without instance number) or instance (with instance number)
 * @param {string} name
 */
function validateAdapterOrInstanceIdentifier(name) {
    return /^[a-z0-9\-_]+(\.\d+)?$/.test(name);
}

/**
 * Extracts the instance name from an object ID
 * @param {string} instanceObjID The ID of the instance object
 */
function getInstanceName(instanceObjID) {
    return instanceObjID.replace(/^system\.adapter\./i, '');
}

/**
 * Enumerates the instances of an adapter or all of them
 * @param {any} objects The objects DB to use
 * @param {string} [adapter] (optional) The adapter whose instances should be enumerated
 * @returns {Promise<any[]>} An array of instance objects
 */
function enumInstances(objects, adapter) {
    const startkey = 'system.adapter.' + (adapter != undefined ? adapter + '.' : '');
    return enumObjects(objects, 'instance', startkey);
}

/**
 * Enumerates all known hosts
 * @param {any} objects The objects DB to use
 * @returns {Promise<any[]>} An array of host objects
 */
function enumHosts(objects) {
    return enumObjects(objects, 'host', 'system.host.');
}

/**
 * Enumerates all objects of a given type
 * @param {any} objects The objects DB to use
 * @param {string} type The type of the objects to enumerate
 * @param {string} startkey The prefix of the objects
 */
function enumObjects(objects, type, startkey) {
    return new Promise((resolve, reject) => {
        const endkey = startkey + '\u9999';
        objects.getObjectView('system', type, { startkey, endkey }, null, (err, res) => {
            if (err) return reject(err);

            let ret = [];
            if (res && res.rows) ret = res.rows.map(row => row.value);
            resolve(ret);
        });
    });
}

module.exports = {
    formatValue,
    getObjectFrom,
    normalizeAdapterName,
    validateAdapterIdentifier,
    validateAdapterOrInstanceIdentifier,
    getInstanceName,
    enumInstances,
    enumHosts,
    enumObjects
};
