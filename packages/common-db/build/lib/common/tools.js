'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectsDbHasServer = exports.isLocalStatesDbServer = exports.isLocalObjectsDbServer = exports.statesDbHasServer = void 0;
// we currently have no typings so ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const js_controller_common_1 = require("@iobroker/js-controller-common");
/**
 * Allows to find out if a given states dbType offers a server or not
 * @param dbType database type
 * @returns true if a server class is available
 */
function statesDbHasServer(dbType) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return !!require(`@iobroker/db-states-${dbType}`).Server;
    }
    catch (_a) {
        throw new Error(`Installation error or unknown states database type: ${dbType}`);
    }
}
exports.statesDbHasServer = statesDbHasServer;
/**
 * Allows to find out if a given objects dbType offers a server which runs on this host and listens (locally or globally/by IP)
 * @param dbType database type
 * @param host configured db host
 * @param checkIfLocalOnly if true the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns true if a server listens on this host (locally or globally/by IP)
 */
function isLocalObjectsDbServer(dbType, host, checkIfLocalOnly = false) {
    const ownIps = js_controller_common_1.tools.findIPs();
    if (!objectsDbHasServer(dbType)) {
        return false; // if no server it can not be a local server
    }
    let result = host === 'localhost' || host === '127.0.0.1'; // reachable locally only
    if (!checkIfLocalOnly) {
        result = result || host === '0.0.0.0' || ownIps.includes(host);
    }
    return result;
}
exports.isLocalObjectsDbServer = isLocalObjectsDbServer;
/**
 * Allows to find out if a given states dbType offers a server which runs on this host and listens (locally or globally/by IP)
 * @param dbType database type
 * @param host configured db host
 * @param checkIfLocalOnly if true the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns true if a server listens on this host (locally or globally/by IP)
 */
function isLocalStatesDbServer(dbType, host, checkIfLocalOnly = false) {
    const ownIps = js_controller_common_1.tools.findIPs();
    if (!statesDbHasServer(dbType)) {
        return false; // if no server it can not be a local server
    }
    let result = host === 'localhost' || host === '127.0.0.1'; // reachable locally only
    if (!checkIfLocalOnly) {
        result = result || host === '0.0.0.0' || ownIps.includes(host);
    }
    return result;
}
exports.isLocalStatesDbServer = isLocalStatesDbServer;
/**
 * Allows to find out if a given objects dbType offers a server or not
 * @param dbType database type
 * @returns true if a server class is available
 */
function objectsDbHasServer(dbType) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return !!require(`@iobroker/db-objects-${dbType}`).Server;
    }
    catch (_a) {
        throw new Error(`Installation error or unknown objects database type: ${dbType}`);
    }
}
exports.objectsDbHasServer = objectsDbHasServer;
