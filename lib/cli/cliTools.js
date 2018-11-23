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

module.exports = {
    formatValue,
};
