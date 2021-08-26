'use strict';

const { tools } = require('@iobroker/js-controller-common');

/**
 * Allows to find out if a given states dbType offers a server or not
 * @param dbType {string} database type
 * @returns {boolean} true if a server class is available
 */
function statesDbHasServer(dbType) {
    try {
        const path = require.resolve(`@iobroker/db-states-${dbType}`);
        return !!require(path).Server;
    } catch {
        throw new Error(`Installation error or unknown states database type: ${dbType}`);
    }
}

/**
 * Allows to find out if a given objects dbType offers a server which runs on this host and listens (locally or globally/by IP)
 * @param dbType {string} database type
 * @param host {string} configured db host
 * @param [checkIfLocalOnly=false] {boolean} optional if try the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns {boolean} true if a server listens on this host (locally or globally/by IP)
 */
function isLocalObjectsDbServer(dbType, host, checkIfLocalOnly) {
    const ownIps = tools.findIPs();
    if (!objectsDbHasServer(dbType)) {
        return false; // if no server it can not be a local server
    }
    let result = host === 'localhost' || host === '127.0.0.1'; // reachable locally only
    if (!checkIfLocalOnly) {
        result = result || host === '0.0.0.0' || ownIps.includes(host);
    }
    return result;
}

/**
 * Allows to find out if a given states dbType offers a server which runs on this host and listens (locally or globally/by IP)
 * @param dbType {string} database type
 * @param host {string} configured db host
 * @param [checkIfLocalOnly=false] {boolean} if try the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns {boolean} true if a server listens on this host (locally or globally/by IP)
 */
function isLocalStatesDbServer(dbType, host, checkIfLocalOnly) {
    const ownIps = tools.findIPs();
    if (!statesDbHasServer(dbType)) {
        return false; // if no server it can not be a local server
    }
    let result = host === 'localhost' || host === '127.0.0.1'; // reachable locally only
    if (!checkIfLocalOnly) {
        result = result || host === '0.0.0.0' || ownIps.includes(host);
    }
    return result;
}

/**
 * Allows to find out if a given objects dbType offers a server or not
 * @param dbType {string} database type
 * @returns {boolean} true if a server class is available
 */
function objectsDbHasServer(dbType) {
    try {
        const path = require.resolve(`@iobroker/db-objects-${dbType}`);
        return !!require(path).Server;
    } catch {
        throw new Error(`Installation error or unknown objects database type: ${dbType}`);
    }
}

module.exports = {
    objectsDbHasServer,
    isLocalObjectsDbServer,
    isLocalStatesDbServer,
    statesDbHasServer
}