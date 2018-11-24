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
 * Extracts the instance name from an object ID
 * @param {string} instanceObjID The ID of the instance object
 */
function getInstanceName(instanceObjID) {
    return instanceObjID.replace(/^system\.adapter\./i, '');
}

module.exports = {
    formatValue,
    getObjectFrom,
    normalizeAdapterName,
    getInstanceName
};
