import fs from 'fs-extra';
import path from 'path';
import semver from 'semver';
import os from 'os';
import forge from 'node-forge';
import deepClone from 'deep-clone';
import { ChildProcessPromise, exec as cpExecAsync } from 'promisify-child-process';
import { createInterface } from 'readline';
import { PassThrough } from 'stream';
import { CommandResult, detectPackageManager, InstallOptions, PackageManager, packageManagers } from '@alcalzone/pak';
import { EXIT_CODES } from './exitCodes';
import zlib from 'zlib';
import { password } from './password';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import crypto from 'crypto';
import type { ExecOptions } from 'child_process';
import { exec } from 'child_process';
import { URLSearchParams } from 'url';
import events from 'events';
import { maybeCallbackWithError } from './maybeCallback';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const extend = require('node.extend');

export enum ERRORS {
    ERROR_NOT_FOUND = 'Not exists',
    ERROR_EMPTY_OBJECT = 'null object',
    ERROR_NO_OBJECT = 'no object',
    ERROR_DB_CLOSED = 'DB closed',
    ERROR_NOT_READY = 'Adapter is not ready yet'
}

events.EventEmitter.prototype.setMaxListeners(100);
let npmVersion: string;
let diskusage: typeof import('diskusage');

const randomID = Math.round(Math.random() * 10000000000000); // Used for creation of User-Agent
const VENDOR_FILE = '/etc/iob-vendor.json';

let lastCalculationOfIps: number;
let ownIpArr: string[] = [];
// Here we define all characters that are forbidden in IDs. Since we want to allow multiple
// unicode character classes, we do that by OR-ing the character classes and negating the result.
// Also, we can easily whitelist characters this way.
//
// We allow:
// · Ll = lowercase letters
// · Lu = uppercase letters
// · Nd = numbers
// · ".", "_", "-" (common in IDs)
// · "/" (required for designs)
// · " :!#$%&()+=@^{}|~" (for legacy reasons)
//
/** All characters that may not appear in an object ID. */
export const FORBIDDEN_CHARS = /[^._\-/ :!#$%&()+=@^{}|~\p{Ll}\p{Lu}\p{Nd}]+/gu;

/**
 * recursively copy values from old object to new one
 *
 * @alias copyAttributes
 * @memberof tools
 * @param oldObj source object
 * @param newObj destination object
 * @param originalObj optional object for read __no_change__ values
 * @param isNonEdit optional indicator if copy is in nonEdit part
 *
 */
function copyAttributes(
    oldObj: Record<string, any>,
    newObj: Record<string, any>,
    originalObj?: Record<string, any>,
    isNonEdit?: boolean
): void {
    for (const attr of Object.keys(oldObj)) {
        if (
            oldObj[attr] === undefined ||
            oldObj[attr] === null ||
            typeof oldObj[attr] !== 'object' ||
            oldObj[attr] instanceof Array
        ) {
            if (oldObj[attr] === '__no_change__' && originalObj && !isNonEdit) {
                if (originalObj[attr] !== undefined) {
                    newObj[attr] = deepClone(originalObj[attr]);
                } else {
                    console.log(`Attribute ${attr} ignored by copying`);
                }
            } else if (oldObj[attr] === '__delete__' && !isNonEdit) {
                if (newObj[attr] !== undefined) {
                    delete newObj[attr];
                }
            } else {
                newObj[attr] = oldObj[attr];
            }
        } else {
            newObj[attr] = newObj[attr] || {};
            copyAttributes(
                oldObj[attr],
                newObj[attr],
                originalObj && originalObj[attr],
                isNonEdit || attr === 'nonEdit'
            );
        }
    }
}

/**
 * Checks the flag nonEdit and restores non-changeable values if required
 *
 * @alias checkNonEditable
 * @memberof tools
 * @param oldObject source object
 * @param newObject destination object
 *
 */
export function checkNonEditable(oldObject: Record<string, any> | null, newObject: Record<string, any>): boolean {
    if (!oldObject) {
        return true;
    }
    if (!oldObject.nonEdit && !newObject.nonEdit) {
        return true;
    }

    // if nonEdit is protected with password
    if (oldObject.nonEdit && oldObject.nonEdit.passHash) {
        // If new Object wants to update the nonEdit information
        if (newObject.nonEdit && newObject.nonEdit.password) {
            const hash = crypto.createHash('sha256').update(newObject.nonEdit.password.toString()).digest('base64');
            if (oldObject.nonEdit.passHash !== hash) {
                delete newObject.nonEdit;
                return false;
            } else {
                oldObject.nonEdit = deepClone(newObject.nonEdit);
                delete oldObject.nonEdit.password;
                delete newObject.nonEdit.password;
                oldObject.nonEdit.passHash = hash;
                newObject.nonEdit.passHash = hash;
            }
            copyAttributes(newObject.nonEdit, newObject, newObject);

            if (newObject.passHash) {
                delete newObject.passHash;
            }
            if (newObject.nonEdit && newObject.nonEdit.password) {
                delete newObject.nonEdit.password;
            }

            return true;
        } else {
            newObject.nonEdit = oldObject.nonEdit;
        }
    } else if (newObject.nonEdit) {
        oldObject.nonEdit = deepClone(newObject.nonEdit);
        if (newObject.nonEdit.password) {
            const hash = crypto.createHash('sha256').update(newObject.nonEdit.password.toString()).digest('base64');
            delete oldObject.nonEdit.password;
            delete newObject.nonEdit.password;
            oldObject.nonEdit.passHash = hash;
            newObject.nonEdit.passHash = hash;
        }
    }

    // restore settings
    copyAttributes(oldObject.nonEdit, newObject, oldObject);

    if (newObject.passHash) {
        delete newObject.passHash;
    }
    if (newObject.nonEdit && newObject.nonEdit.password) {
        delete newObject.nonEdit.password;
    }
    return true;
}

/**
 * @param repoVersion
 * @param installedVersion
 * @throws {Error} if version is invalid
 */
export function upToDate(repoVersion: string, installedVersion: string): boolean {
    // Check if the installed version is at least the repo version
    return semver.gte(installedVersion, repoVersion);
}

// TODO: this is only here for backward compatibility, if MULTIHOST password was still setup with old decryption
export function decryptPhrase(password: string, data: any, callback: (decrypted?: null | string) => void): void {
    const decipher = crypto.createDecipher('aes192', password);

    try {
        let decrypted = '';
        decipher.on('readable', () => {
            const data = decipher.read();
            if (data) {
                decrypted += data.toString('utf8');
            }
        });
        decipher.on('error', error => {
            console.error('Cannot decode secret: ' + error);
            callback(null);
        });

        decipher.on('end', () => callback(decrypted));

        decipher.write(data, 'hex');
        decipher.end();
    } catch (e) {
        console.error(`Cannot decode secret: ${e.message}`);
        callback(null);
    }
}

/**
 * Checks if multiple host objects exists, without using object views
 *
 * @param objects the objects db
 * @return true if only one host object exists
 */
export async function isSingleHost(objects: any): Promise<boolean> {
    const res: { rows: ioBroker.GetObjectListItem[] } = await objects.getObjectList({
        startkey: 'system.host.',
        endkey: 'system.host.\u9999'
    });
    const hostObjs = res.rows.filter(obj => obj.value && obj.value.type === 'host');
    return hostObjs.length <= 1; // on setup no host object is there yet
}

/**
 * Checks if at least one host is running in a MH environment
 *
 * @param objects the objects db
 * @param states the states db
 * @return true if one or more hosts running else false
 */
export async function isHostRunning(objects: any, states: any): Promise<boolean> {
    // do it without object view for now, can be reverted if no one downgrades to < 4 (redis-sets)
    // const res = await objects.getObjectViewAsync('system', 'host', { startkey: '', endkey: '\u9999' });
    const res: GetObjectViewResult = await objects.getObjectList({
        startkey: 'system.host.',
        endkey: 'system.host.\u9999'
    });
    res.rows = res.rows.filter(obj => obj.value && obj.value.type === 'host');

    for (const hostObj of res.rows) {
        const state: ioBroker.State = await states.getState(`${hostObj.id}.alive`);
        if (state && state.val) {
            return true;
        }
    }
    return false;
}

/**
 * Checks if ioBroker is installed in a dev environment
 * @private
 * @return {boolean}
 */
function _isDevInstallation() {
    return fs.pathExistsSync(`${__dirname}/../../../../../packages/controller`);
}

function getAppName() {
    if (_isDevInstallation()) {
        // dev install - GitHub folder is uppercase
        return 'ioBroker';
    }

    return 'iobroker';
}

export const appName = getAppName();

export function rmdirRecursiveSync(path: string): void {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            const curPath = `${path}/${file}`;
            try {
                if (fs.statSync(curPath).isDirectory()) {
                    // recurse
                    rmdirRecursiveSync(curPath);
                } else {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            } catch (e) {
                if (e.code !== 'ENOENT') {
                    console.log(`Cannot delete file ${path}: ${e.message}`);
                } else {
                    throw e;
                }
            }
        });
        // delete (hopefully) empty folder
        try {
            fs.rmdirSync(path);
        } catch (e) {
            if (e.code !== 'ENOENT') {
                console.log(`Cannot delete directory ${path}: ${e.message}`);
            } else {
                throw e;
            }
        }
    }
}

export function findIPs(): string[] {
    if (!lastCalculationOfIps || Date.now() - lastCalculationOfIps > 10000) {
        lastCalculationOfIps = Date.now();
        ownIpArr = [];
        try {
            const ifaces = os.networkInterfaces();
            for (const iface of Object.values(ifaces)) {
                iface?.forEach(details => !details.internal && ownIpArr.push(details.address));
            }
        } catch (e) {
            console.error(`Can not find local IPs: ${e.message}`);
        }
    }

    return ownIpArr;
}

function findPath(path: string, url: string) {
    if (!url) {
        return '';
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    } else {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return (path + url).replace(/\/\//g, '/').replace('http:/', 'http://').replace('https:/', 'https://');
        } else {
            if (url[0] === '/') {
                return `${__dirname}/..${url}`;
            } else {
                return `${__dirname}/../${path}${url}`;
            }
        }
    }
}

function getMac(callback: (e?: Error | null, mac?: string) => void) {
    const macRegex = /(?:[a-z0-9]{2}[:-]){5}[a-z0-9]{2}/gi;
    const zeroRegex = /(?:[0]{2}[:-]){5}[0]{2}/;
    const command = process.platform.indexOf('win') === 0 ? 'getmac' : 'ifconfig || ip link';

    exec(command, { windowsHide: true }, (err, stdout, _stderr) => {
        if (err) {
            callback(err);
        } else {
            let macAddress;
            let match;
            let result = null;

            while (true) {
                match = macRegex.exec(stdout);
                if (!match) {
                    break;
                }
                macAddress = match[0];
                if (!zeroRegex.test(macAddress) && !result) {
                    result = macAddress;
                }
            }

            if (result === null) {
                callback(new Error('could not determine the mac address from:\n' + stdout));
            } else {
                callback(null, result.replace(/-/g, ':').toLowerCase());
            }
        }
    });
}

/**
 * Checks if we are running inside a docker container
 */
export function isDocker(): boolean {
    try {
        // deprecated, works only with docker daemon
        fs.statSync('/.dockerenv');
        return true;
    } catch {
        // ignore error
    }

    try {
        // ioBroker docker image specific, will be created during build process
        fs.statSync('/opt/scripts/.docker_config/.thisisdocker');
        return true;
    } catch {
        // ignore error
    }

    try {
        // check docker group, works in most cases, but not on arm
        return fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
    } catch {
        return false;
    }
}

// Build unique uuid based on MAC address if possible
function uuid(givenMac: string | null, callback: (uuid: string) => void): void {
    if (typeof givenMac === 'function') {
        callback = givenMac;
        givenMac = '';
    }

    const _isDocker = isDocker();

    // return constant UUID for all CI environments to keep the statistics clean
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    if (require('ci-info').isCI) {
        return callback('55travis-pipe-line-cior-githubaction');
    }

    let mac = givenMac !== null ? givenMac || '' : null;
    let u;

    if (!_isDocker && mac === '') {
        const ifaces = os.networkInterfaces();

        // Find first not empty MAC
        for (const iface of Object.values(ifaces)) {
            if (iface) {
                for (const entry of iface) {
                    if (entry.mac !== '00:00:00:00:00:00') {
                        mac = entry.mac;
                        break;
                    }
                }
            }

            if (mac) {
                break;
            }
        }
    }

    if (!_isDocker && mac === '') {
        return getMac((_err, mac) => uuid(mac || null, callback));
    }

    if (!_isDocker && mac) {
        const md5sum = crypto.createHash('md5');
        md5sum.update(mac);
        mac = md5sum.digest('hex');
        u =
            mac.substring(0, 8) +
            '-' +
            mac.substring(8, 12) +
            '-' +
            mac.substring(12, 16) +
            '-' +
            mac.substring(16, 20) +
            '-' +
            mac.substring(20);
    } else {
        // Returns a RFC4122 compliant v4 UUID https://gist.github.com/LeverOne/1308368 (DO WTF YOU WANT TO PUBLIC LICENSE)
        let a: any;
        let b;
        b = a = '';
        while (a++ < 36) {
            b += (a * 51) & 52 ? (a ^ 15 ? 8 ^ (Math.random() * (a ^ 20 ? 16 : 4)) : 4).toString(16) : '-';
        }
        u = b;
    }

    callback(u);
}

function updateUuid(newUuid: string, _objects: any, callback: (uuid?: string) => void) {
    uuid('', _uuid => {
        _uuid = newUuid || _uuid;
        // Add vendor prefix to UUID
        if (fs.existsSync(VENDOR_FILE)) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const vendor = require(VENDOR_FILE);
                if (vendor.vendor && vendor.vendor.uuidPrefix && vendor.vendor.uuidPrefix.length === 2) {
                    _uuid = vendor.vendor.uuidPrefix + _uuid;
                }
            } catch {
                console.error(`Cannot parse ${VENDOR_FILE}`);
            }
        }

        _objects.setObject(
            'system.meta.uuid',
            {
                type: 'meta',
                common: {
                    name: 'uuid',
                    type: 'uuid'
                },
                ts: new Date().getTime(),
                from: `system.host.${getHostName()}.tools`,
                native: {
                    uuid: _uuid
                }
            },
            (err: Error | null) => {
                if (err) {
                    console.error(`object system.meta.uuid cannot be updated: ${err.message}`);
                    callback();
                } else {
                    _objects.getObject('system.meta.uuid', (err: Error | null, obj: ioBroker.Object) => {
                        if (obj.native.uuid !== _uuid) {
                            console.error('object system.meta.uuid cannot be updated: write protected');
                        } else {
                            console.log(`object system.meta.uuid created: ${_uuid}`);
                        }
                        callback(_uuid);
                    });
                }
            }
        );
    });
}

/**
 * Generates a new uuid if non existing
 *
 * @param objects - objects DB
 * @return uuid if successfully created/updated
 */
export async function createUuid(objects: any): Promise<void | string> {
    const promiseCheckPassword = new Promise<void>(resolve =>
        objects.getObject('system.user.admin', (err: Error | null, obj: ioBroker.UserObject) => {
            if (err || !obj) {
                // Default Password for user 'admin' is application name in lower case
                password(appName).hash(null, null, (err, res) => {
                    err && console.error(err);

                    // Create user here and not in io-package.js because of hash password
                    objects.setObject(
                        'system.user.admin',
                        {
                            type: 'user',
                            common: {
                                name: 'admin',
                                password: res,
                                dontDelete: true,
                                enabled: true
                            },
                            ts: new Date().getTime(),
                            from: `system.host.${getHostName()}.tools`,
                            native: {}
                        },
                        () => {
                            console.log('object system.user.admin created');
                            resolve();
                        }
                    );
                });
            } else {
                resolve();
            }
        })
    );
    const promiseCheckUuid = new Promise<void | string>(resolve =>
        objects.getObject('system.meta.uuid', (err: Error | null, obj: ioBroker.Object) => {
            if (!err && obj && obj.native && obj.native.uuid) {
                const PROBLEM_UUIDS = [
                    'ab265f4a-67f9-a46a-c0b2-61e4b95cefe5',
                    '7abd3182-d399-f7bd-da19-9550d8babede',
                    'deb6f2a8-fe69-5491-0a50-a9f9b8f3419c',
                    'ec66c85e-fc36-f6f9-f1c9-f5a2882d23c7',
                    'e6203b03-f5f4-253a-e4f6-b295fc543ab7',
                    'd659fa3d-7ef9-202a-ea23-acd0aff67b24'
                ];

                // if COMMON invalid docker uuid
                if (PROBLEM_UUIDS.includes(obj.native.uuid)) {
                    // Read vis license
                    objects.getObject('system.adapter.vis.0', (err: Error | null, licObj: ioBroker.Object) => {
                        if (!licObj || !licObj.native || !licObj.native.license) {
                            // generate new UUID
                            updateUuid('', objects, _uuid => resolve(_uuid));
                        } else {
                            // decode obj.native.license
                            let data;
                            try {
                                data = jwt.decode(licObj.native.license);
                            } catch {
                                data = null;
                            }

                            if (!data || typeof data === 'string' || !data.uuid) {
                                // generate new UUID
                                updateUuid('', objects, __uuid => resolve(__uuid));
                            } else {
                                if (data.uuid !== obj.native.uuid) {
                                    updateUuid(data.correct ? data.uuid : '', objects, _uuid => resolve(_uuid));
                                } else {
                                    // Show error
                                    console.warn(
                                        `Your iobroker.vis license must be updated. Please contact info@iobroker.net to get a new license!`
                                    );
                                    console.warn(
                                        `Provide following information in email: ${data.email}, invoice: ${data.invoice}`
                                    );
                                    resolve();
                                }
                            }
                        }
                    });
                } else {
                    resolve();
                }
            } else {
                // generate new UUID
                updateUuid('', objects, _uuid => resolve(_uuid));
            }
        })
    );

    const result = await Promise.all([promiseCheckPassword, promiseCheckUuid]);
    return result[1];
}

// Download file to tmp or return file name directly
export async function getFile(urlOrPath: string, fileName: string, callback: (file?: string) => void): Promise<void> {
    // If object was read
    if (
        urlOrPath.substring(0, 'http://'.length) === 'http://' ||
        urlOrPath.substring(0, 'https://'.length) === 'https://'
    ) {
        const tmpFile = `${__dirname}/../tmp/${fileName || Math.floor(Math.random() * 0xffffffe) + '.zip'}`;

        try {
            // Add some information to user-agent, like chrome, IE and Firefox do
            const res = await axios.get(urlOrPath, {
                responseType: 'stream',
                headers: {
                    'User-Agent': `${appName}, RND: ${randomID}, N: ${process.version}`,
                    'Accept-Encoding': 'gzip'
                }
            });

            res.data.pipe(fs.createWriteStream(tmpFile)).on('close', () => {
                console.log(`downloaded ${tmpFile}`);
                callback && callback(tmpFile);
            });
        } catch (e) {
            console.log(`Cannot download "${tmpFile}": ${e.message}`);
            callback && callback(tmpFile);
        }
    } else {
        try {
            if (fs.existsSync(urlOrPath)) {
                callback && callback(urlOrPath);
            } else if (fs.existsSync(`${__dirname}/../${urlOrPath}`)) {
                callback && callback(`${__dirname}/../${urlOrPath}`);
            } else if (fs.existsSync(`${__dirname}/../tmp/${urlOrPath}`)) {
                callback && callback(`${__dirname}/../tmp/${urlOrPath}`);
            } else {
                console.log('File not found: ' + urlOrPath);
                process.exit(EXIT_CODES.FILE_NOT_FOUND);
            }
        } catch (err) {
            console.log(`File "${urlOrPath}" could no be read: ${err.message}`);
            process.exit(EXIT_CODES.FILE_NOT_FOUND);
        }
    }
}

// Return content of the json file. Download it or read directly
export async function getJson(
    urlOrPath: string,
    agent: string,
    callback: (sources?: Record<string, any> | null, urlOrPath?: string | null) => void
): Promise<void> {
    if (typeof agent === 'function') {
        callback = agent;
        agent = '';
    }
    agent = agent || '';

    let sources = {};
    // If object was read
    if (urlOrPath && typeof urlOrPath === 'object') {
        if (callback) {
            callback(urlOrPath);
        }
    } else if (!urlOrPath) {
        console.log('Empty url!');
        if (callback) {
            callback(null);
        }
    } else {
        if (
            urlOrPath.substring(0, 'http://'.length) === 'http://' ||
            urlOrPath.substring(0, 'https://'.length) === 'https://'
        ) {
            try {
                const res = await axios.get(urlOrPath, {
                    headers: { 'Accept-Encoding': 'gzip', timeout: 10000, 'User-Agent': agent }
                });

                if (res.status !== 200 || !res.data) {
                    throw new Error(`Invalid response, body: ${res.data}, status code: ${res.status}`);
                }

                sources = res.data;

                if (callback) {
                    callback(sources, urlOrPath);
                }
            } catch (e) {
                console.warn(`Cannot download json from ${urlOrPath}. Error: ${e.message}`);
                if (callback) {
                    callback(null, urlOrPath);
                }
                return;
            }
        } else {
            if (fs.existsSync(urlOrPath)) {
                try {
                    sources = fs.readJSONSync(urlOrPath);
                } catch (e) {
                    console.log(`Cannot parse json file from ${urlOrPath}. Error: ${e.message}`);
                    if (callback) {
                        callback(null, urlOrPath);
                    }
                    return;
                }
                if (callback) {
                    callback(sources, urlOrPath);
                }
            } else if (fs.existsSync(`${__dirname}/../${urlOrPath}`)) {
                try {
                    sources = fs.readJSONSync(`${__dirname}/../${urlOrPath}`);
                } catch (e) {
                    console.log(`Cannot parse json file from ${__dirname}/../${urlOrPath}. Error: ${e.message}`);
                    if (callback) {
                        callback(null, urlOrPath);
                    }
                    return;
                }
                if (callback) {
                    callback(sources, urlOrPath);
                }
            } else if (fs.existsSync(`${__dirname}/../tmp/${urlOrPath}`)) {
                try {
                    sources = fs.readJSONSync(`${__dirname}/../tmp/${urlOrPath}`);
                } catch (e) {
                    console.log(`Cannot parse json file from ${__dirname}/../tmp/${urlOrPath}. Error: ${e.message}`);
                    if (callback) {
                        callback(null, urlOrPath);
                    }
                    return;
                }
                if (callback) {
                    callback(sources, urlOrPath);
                }
            } else {
                //if (urlOrPath.indexOf('/example/') === -1) console.log('Json file not found: ' + urlOrPath);
                if (callback) {
                    callback(null, urlOrPath);
                }
            }
        }
    }
}

/**
 * Return content of the json file. Download it or read directly
 * @param urlOrPath URL where the json file could be found
 * @param agent optional agent identifier like "Windows Chrome 12.56"
 * @returns json object
 */
export async function getJsonAsync(urlOrPath: string, agent?: string): Promise<Record<string, any> | null> {
    agent = agent || '';

    let sources = {};
    // If object was read
    if (urlOrPath && typeof urlOrPath === 'object') {
        return urlOrPath;
    } else if (!urlOrPath) {
        console.log('Empty url!');
        return null;
    } else {
        if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
            try {
                const result = await axios(urlOrPath, {
                    timeout: 10000,
                    headers: { 'User-Agent': agent },
                    validateStatus: status => status !== 200
                });
                return result.data;
            } catch (e) {
                console.warn(`Cannot download json from ${urlOrPath}. Error: ${e.message}`);
                return null;
            }
        } else {
            if (fs.existsSync(urlOrPath)) {
                try {
                    sources = fs.readJSONSync(urlOrPath);
                } catch (e) {
                    console.warn(`Cannot parse json file from ${urlOrPath}. Error: ${e.message}`);
                    return null;
                }
                return sources;
            } else if (fs.existsSync(__dirname + '/../' + urlOrPath)) {
                try {
                    sources = fs.readJSONSync(`${__dirname}/../${urlOrPath}`);
                } catch (e) {
                    console.warn(`Cannot parse json file from ${__dirname}/../${urlOrPath}. Error: ${e.message}`);
                    return null;
                }
                return sources;
            } else if (fs.existsSync(`${__dirname}/../tmp/${urlOrPath}`)) {
                try {
                    sources = fs.readJSONSync(`${__dirname}/../tmp/${urlOrPath}`);
                } catch (e) {
                    console.log(`Cannot parse json file from ${__dirname}/../tmp/${urlOrPath}. Error: ${e.message}`);
                    return null;
                }
                return sources;
            } else {
                //if (urlOrPath.indexOf('/example/') === -1) console.log('Json file not found: ' + urlOrPath);
                return null;
            }
        }
    }
}

export interface AdapterInformation {
    /** this flag is only true for the js-controller */
    controller: boolean;
    /** adapter version **/
    version: string;
    /** path to icon of the adapter */
    icon: string;
    /** path to local icon of the adater */
    localIcon: string;
    /** title of the adapter */
    title: string;
    /** title of the adapter in multiple languages */
    titleLang: Multilingual;
    /** description of the adapter in multiple languages */
    desc: Multilingual;
    /** platform of the adapter */
    platform: 'Javascript/Node.js';
    /** keywords of the adapter */
    keywords: string[];
    /** path to readme file */
    readme: string;
    /** type of the adapter */
    type: string;
    /** license of the adapter */
    license: string;
    /** url to license information */
    licenseUrl?: string;
}

function scanDirectory(dirName: string, list: Record<string, AdapterInformation>, regExp: RegExp) {
    if (fs.existsSync(dirName)) {
        let dirs;
        try {
            dirs = fs.readdirSync(dirName);
        } catch (e) {
            console.log(`Cannot read or parse ${dirName}: ${e.message}`);
            return;
        }
        for (let i = 0; i < dirs.length; i++) {
            try {
                const fullPath = path.join(dirName, dirs[i]);
                const fileIoName = path.join(fullPath, 'io-package.json');
                const fileName = path.join(fullPath, 'package.json');
                if (regExp.test(dirs[i]) && fs.existsSync(fileIoName)) {
                    const ioPackage = fs.readJSONSync(fileIoName);
                    const package_ = fs.existsSync(fileName) ? fs.readJSONSync(fileName) : {};
                    const localIcon = ioPackage.common.icon
                        ? `/adapter/${dirs[i].substring(appName.length + 1)}/${ioPackage.common.icon}`
                        : '';

                    list[ioPackage.common.name] = {
                        controller: ioPackage.common.controller || false,
                        version: ioPackage.common.version,
                        icon: ioPackage.common.extIcon || localIcon,
                        localIcon,
                        title: ioPackage.common.title, // deprecated 2021.04.18 BF
                        titleLang: ioPackage.common.titleLang,
                        desc: ioPackage.common.desc,
                        platform: ioPackage.common.platform,
                        keywords: ioPackage.common.keywords,
                        readme: ioPackage.common.readme,
                        type: ioPackage.common.type,
                        license: ioPackage.common.license
                            ? ioPackage.common.license
                            : package_.licenses && package_.licenses.length
                            ? package_.licenses[0].type
                            : '',
                        licenseUrl: package_.licenses && package_.licenses.length ? package_.licenses[0].url : ''
                    };
                }
            } catch (e) {
                console.log(
                    `Cannot read or parse ${__dirname}/../node_modules/${dirs[i]}/io-package.json: ${e.message}`
                );
            }
        }
    }
}

interface Multilingual {
    en: string;
    de?: string;
    ru?: string;
    pt?: string;
    nl?: string;
    fr?: string;
    it?: string;
    es?: string;
    pl?: string;
    uk?: string;
    'zh-cn'?: string;
}

export interface GetInstalledInfoReponse {
    controller?: boolean;
    version?: string;
    icon?: string;
    title?: string;
    titleLang?: Multilingual;
    desc?: Multilingual;
    platform?: string;
    keywords?: string[];
    readme?: string;
    runningVersion?: string;
    license?: string;
    licenseUrl?: string;
}

/**
 * Get list of all installed adapters and controller version on this host
 * @param hostRunningVersion Version of the running js-controller, will be included in the returned information if provided
 * @returns object containing information about installed host
 */
export function getInstalledInfo(hostRunningVersion?: string): GetInstalledInfoReponse {
    const result: Record<string, any> = {};
    const fullPath = getControllerDir();

    if (!fullPath) {
        console.error('Could not determine controller directory on getInstalledInfo.');
        return result;
    }

    // Get info about host
    let ioPackage;
    try {
        ioPackage = fs.readJSONSync(path.join(fullPath, 'io-package.json'));
    } catch (e) {
        console.error(`Cannot get installed host information: ${e.message}`);
    }
    const package_ = fs.existsSync(path.join(fullPath, 'package.json'))
        ? fs.readJSONSync(path.join(fullPath, 'package.json'))
        : {};
    const regExp = new RegExp(`^${appName}\\.`, 'i');

    if (ioPackage) {
        result[ioPackage.common.name] = {
            controller: true,
            version: ioPackage.common.version,
            icon: ioPackage.common.extIcon || ioPackage.common.icon,
            title: ioPackage.common.title, // deprecated 2021.04.18 BF
            titleLang: ioPackage.common.titleLang,
            desc: ioPackage.common.desc,
            platform: ioPackage.common.platform,
            keywords: ioPackage.common.keywords,
            readme: ioPackage.common.readme,
            runningVersion: hostRunningVersion,
            license: ioPackage.common.license
                ? ioPackage.common.license
                : package_.licenses && package_.licenses.length
                ? package_.licenses[0].type
                : '',
            licenseUrl: package_.licenses && package_.licenses.length ? package_.licenses[0].url : ''
        };
    }

    // we scan the sub node modules of controller and same hierarchy as controller
    scanDirectory(path.join(fullPath, 'node_modules'), result, regExp);
    scanDirectory(path.join(fullPath, '..'), result, regExp);

    return result;
}

/**
 * Reads an adapter's npm version
 * @param adapter The adapter to read the npm version from. Null for the root ioBroker packet
 * @param callback
 */
function getNpmVersion(adapter: string, callback?: (err: Error | null, version?: string | null) => void) {
    adapter = adapter ? `${appName}.${adapter}` : appName;
    adapter = adapter.toLowerCase();

    const cliCommand = `npm view ${adapter}@latest version`;

    exec(cliCommand, { timeout: 2000, windowsHide: true }, (error, stdout, _stderr) => {
        let version;
        if (error) {
            // command failed
            if (typeof callback === 'function') {
                callback(error);
                return;
            }
        } else if (stdout) {
            version = semver.valid(stdout.trim());
        }
        if (typeof callback === 'function') {
            callback(null, version);
        }
    });
}

function getIoPack(
    sources: Record<string, any>,
    name: string,
    callback: (sources: Record<string, any>, name: string) => void
): void {
    getJson(sources[name].meta, '', ioPack => {
        const packUrl = sources[name].meta.replace('io-package.json', 'package.json');
        if (!ioPack) {
            if (sources._helper) {
                sources._helper.failCounter.push(name);
            }
            if (callback) {
                callback(sources, name);
            }
        } else {
            setImmediate(() => {
                getJson(packUrl, '', pack => {
                    const version = sources[name].version;
                    const type = sources[name].type;
                    // If installed from git or something else
                    // js-controller is exception, because can be installed from npm and from git
                    if (sources[name].url && name !== 'js-controller') {
                        if (ioPack && ioPack.common) {
                            sources[name] = extend(true, sources[name], ioPack.common);

                            // overwrite type of adapter from repository
                            if (type) {
                                sources[name].type = type;
                            }
                            if (pack && pack.licenses && pack.licenses.length) {
                                if (!sources[name].license) {
                                    sources[name].license = pack.licenses[0].type;
                                }
                                if (!sources[name].licenseUrl) {
                                    sources[name].licenseUrl = pack.licenses[0].url;
                                }
                            }
                        }

                        if (callback) {
                            callback(sources, name);
                        }
                    } else {
                        if (ioPack && ioPack.common) {
                            sources[name] = extend(true, sources[name], ioPack.common);
                            if (pack && pack.licenses && pack.licenses.length) {
                                if (!sources[name].license) {
                                    sources[name].license = pack.licenses[0].type;
                                }
                                if (!sources[name].licenseUrl) {
                                    sources[name].licenseUrl = pack.licenses[0].url;
                                }
                            }
                        }

                        // overwrite type of adapter from repository
                        if (type) {
                            sources[name].type = type;
                        }

                        if (version) {
                            sources[name].version = version;
                            if (callback) {
                                callback(sources, name);
                            }
                        } else {
                            if (
                                sources[name].meta.substring(0, 'http://'.length) === 'http://' ||
                                sources[name].meta.substring(0, 'https://'.length) === 'https://'
                            ) {
                                //installed from npm
                                getNpmVersion(name, (_err, version) => {
                                    if (version) {
                                        sources[name].version = version;
                                    } else {
                                        sources[name].version = 'npm error';
                                    }
                                    if (callback) {
                                        callback(sources, name);
                                    }
                                });
                            } else {
                                if (callback) {
                                    callback(sources, name);
                                }
                            }
                        }
                    }
                });
            });
        }
    });
}

function _getRepositoryFile(
    sources: Record<string, any>,
    path: string,
    callback?: (err?: Error, sources?: Record<string, any>) => void
) {
    if (!sources._helper) {
        let count = 0;
        for (const _name in sources) {
            if (!Object.prototype.hasOwnProperty.call(sources, _name)) {
                continue;
            }
            count++;
        }
        sources._helper = { failCounter: [] };

        sources._helper.timeout = setTimeout(() => {
            if (sources._helper) {
                delete sources._helper;
                for (const __name of Object.keys(sources)) {
                    if (sources[__name].processed !== undefined) {
                        delete sources[__name].processed;
                    }
                }
                if (callback) {
                    callback(new Error(`Timeout by read all package.json (${count}) seconds`), sources);
                }
                callback = undefined;
            }
        }, count * 1000);
    }

    for (const name of Object.keys(sources)) {
        if (sources[name].processed || name === '_helper') {
            continue;
        }

        sources[name].processed = true;
        if (sources[name].url) {
            sources[name].url = findPath(path, sources[name].url);
        }
        if (sources[name].meta) {
            sources[name].meta = findPath(path, sources[name].meta);
        }
        if (sources[name].icon) {
            sources[name].icon = findPath(path, sources[name].icon);
        }

        if (!sources[name].name && sources[name].meta) {
            getIoPack(sources, name, _ignore => {
                if (sources._helper) {
                    if (sources._helper.failCounter.length > 10) {
                        clearTimeout(sources._helper.timeout);
                        delete sources._helper;
                        for (const _name of Object.keys(sources)) {
                            if (sources[_name].processed !== undefined) {
                                delete sources[_name].processed;
                            }
                        }
                        if (callback) {
                            callback(new Error('Looks like there is no internet.'), sources);
                        }
                        callback = undefined;
                    } else {
                        // process next
                        setImmediate(() => _getRepositoryFile(sources, path, callback));
                    }
                }
            });
            return;
        }
    }

    // all packages are processed
    if (sources._helper) {
        let err;
        if (sources._helper.failCounter.length) {
            err = new Error(`Following packages cannot be read: ${sources._helper.failCounter.join(', ')}`);
        }
        clearTimeout(sources._helper.timeout);
        delete sources._helper;
        for (const __name of Object.keys(sources)) {
            if (sources[__name].processed !== undefined) {
                delete sources[__name].processed;
            }
        }
        if (callback) {
            callback(err, sources);
        }
        callback = undefined;
    }
}

async function _checkRepositoryFileHash(
    urlOrPath: string,
    additionalInfo: Record<string, any>,
    callback: (err?: null | Error, sources?: Record<string, any> | null, hash?: string | number) => void
) {
    // read hash of file
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
        urlOrPath = urlOrPath.replace(/\.json$/, '-hash.json');
        let json: null | Record<string, any> = null;
        try {
            const res = await axios.get(urlOrPath, { headers: { 'Accept-Encoding': 'gzip', timeout: 10000 } });
            if (!res.data || res.status !== 200) {
                throw new Error(`Invalid response, body: ${res.data}, status code: ${res.status}`);
            }

            json = res.data;
        } catch (e) {
            console.warn(`Cannot download json from ${urlOrPath}. Error: ${e.message}`);
        }

        if (json && json.hash) {
            // The hash download was successful
            if (additionalInfo && additionalInfo.sources && json.hash === additionalInfo.hash) {
                // The hash is the same as for the cached sources
                console.log('hash unchanged, use cached sources');
                callback(null, additionalInfo.sources, json.hash);
            } else {
                // Either we have no sources cached or the hash changed
                // => force download of new sources
                console.log('hash changed or no sources cached => force download of new sources');
                callback(null, null, json.hash);
            }
        } else {
            // Could not download new sources, use the old ones
            console.log('failed to download new sources, use cached sources');
            callback(null, additionalInfo.sources, '');
        }
    } else {
        // it is a file and file has not hash
        callback(null, null, 0);
    }
}

/**
 * Get list of all adapters and controller in some repository file or in /conf/source-dist.json
 *
 * @alias getRepositoryFile
 * @memberof tools
 * @param urlOrPath URL starting with http:// or https:// or local file link
 * @param additionalInfo destination object
 * @param callback function (err, sources, actualHash) { }
 *
 */
export function getRepositoryFile(
    urlOrPath: string,
    additionalInfo: Record<string, any>,
    callback: (err?: Error | null, sources?: Record<string, any>, actualHash?: string | number | undefined) => void
): void {
    let sources: Record<string, any> = {};
    let _path = '';

    if (typeof additionalInfo === 'function') {
        // @ts-expect-error: fix all fun calls then remove
        callback = additionalInfo;
        additionalInfo = {};
    }

    additionalInfo = additionalInfo || {};

    if (urlOrPath) {
        const parts = urlOrPath.split('/');
        _path = parts.splice(0, parts.length - 1).join('/') + '/';
    }

    // If object was read
    if (urlOrPath && typeof urlOrPath === 'object') {
        if (typeof callback === 'function') {
            callback(null, urlOrPath);
        }
    } else if (!urlOrPath) {
        try {
            const controllerDir = getControllerDir();
            if (controllerDir) {
                sources = fs.readJSONSync(path.join(controllerDir, getDefaultDataDir(), 'sources.json'));
            }
        } catch {
            sources = {};
        }
        try {
            const controllerDir = getControllerDir();
            if (controllerDir) {
                const sourcesDist = fs.readJSONSync(path.join(controllerDir, 'conf', 'sources-dist.json'));
                sources = extend(true, sourcesDist, sources);
            }
        } catch {
            // continue regardless of error
        }

        for (const s of Object.keys(sources)) {
            if (additionalInfo[s] && additionalInfo[s].published) {
                sources[s].published = additionalInfo[s].published;
            }
        }

        _getRepositoryFile(sources, _path, err => {
            if (err) {
                console.error(`[${new Date().toString()}] ${err.message}`);
            }
            if (typeof callback === 'function') {
                callback(err, sources);
            }
        });
    } else {
        let agent = '';
        if (additionalInfo) {
            // Add some information to user-agent, like chrome, IE and Firefox do
            agent = `${additionalInfo.name}, RND: ${additionalInfo.randomID || randomID}, Node:${
                additionalInfo.node
            }, V:${additionalInfo.controller}`;
        }

        // load hash of file first to not load the whole 1MB of sources
        _checkRepositoryFileHash(urlOrPath, additionalInfo, (err, sources, actualSourcesHash) => {
            if (!err && sources) {
                // Source file was not changed
                typeof callback === 'function' && callback(err, sources, actualSourcesHash);
            } else {
                getJson(urlOrPath, agent, sources => {
                    if (sources) {
                        for (const s of Object.keys(sources)) {
                            if (additionalInfo[s] && additionalInfo[s].published) {
                                sources[s].published = additionalInfo[s].published;
                            }
                        }
                        setImmediate(() =>
                            _getRepositoryFile(sources, _path, err => {
                                err && console.error(`[${new Date().toString()}] ${err.message}`);
                                typeof callback === 'function' && callback(err, sources, actualSourcesHash);
                            })
                        );
                    } else {
                        // return cached sources, because no sources found
                        console.log(
                            `failed to download new sources, ${
                                additionalInfo.sources ? 'use cached sources' : 'no cached sources available'
                            }`
                        );
                        return maybeCallbackWithError(
                            callback,
                            `Cannot read "${urlOrPath}"`,
                            additionalInfo.sources,
                            ''
                        );
                    }
                });
            }
        });
    }
}

export interface RepositoryFile {
    json: Record<string, any>;
    changed: boolean;
    hash: string;
}

/**
 * Read on repository
 *
 * @alias getRepositoryFileAsync
 * @memberof tools
 * @param url URL starting with http:// or https:// or local file link
 * @param hash actual hash
 * @param force Force repository update despite on hash
 * @param _actualRepo Actual repository
 *
 */
export async function getRepositoryFileAsync(
    url: string,
    hash: string,
    force: boolean,
    _actualRepo: RepositoryFile
): Promise<RepositoryFile> {
    let _hash;
    let data;

    if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
            _hash = await axios({ url: url.replace(/\.json$/, '-hash.json'), timeout: 10000 });
        } catch {
            // ignore missing hash file
        }

        if (_actualRepo && !force && hash && _hash && _hash.data && _hash.data.hash === hash) {
            data = _actualRepo;
        } else {
            const agent = `${appName}, RND: ${randomID}, Node:${process.version}, V:${
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require('@iobroker/js-controller-common/package.json').version
            }`;
            try {
                data = await axios({
                    url,
                    timeout: 10000,
                    headers: { 'User-Agent': agent }
                });
                data = data.data;
            } catch (e) {
                throw new Error(`Cannot download repository file from "${url}": ${e.message}`);
            }
        }
    } else {
        if (fs.existsSync(url)) {
            try {
                data = JSON.parse(fs.readFileSync(url).toString('utf8'));
            } catch (e) {
                throw new Error(`Error: Cannot read or parse file "${url}": ${e}`);
            }
        } else {
            throw new Error(`Error: Cannot find file "${url}"`);
        }
    }

    return {
        json: data,
        changed: _hash && _hash.data ? hash !== _hash.data.hash : true,
        hash: _hash && _hash.data ? _hash.data.hash : ''
    };
}

/**
 * Sends the given object to the diagnosis server
 *
 * @param obj - diagnosis object
 */
export async function sendDiagInfo(obj: Record<string, any>): Promise<void> {
    const objStr = JSON.stringify(obj);
    console.log(`Send diag info: ${objStr}`);
    const params = new URLSearchParams();
    params.append('data', objStr);
    const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 4000
    };

    try {
        await axios.post(`http://download.${appName}.net/diag.php`, params, config);
    } catch (e) {
        console.log(`Cannot send diag info: ${e.message}`);
    }
}

/**
 * Finds the adapter directory of a given adapter
 *
 * @alias getAdapterDir
 * @memberof tools
 * @param adapter name of the adapter, e.g. hm-rpc
 * @returns path to adapter directory or null if no directory found
 */
export function getAdapterDir(adapter: string): string | null {
    // snip off 'iobroker.'
    if (adapter.startsWith(appName + '.')) {
        adapter = adapter.substring(appName.length + 1);
    }
    // snip off instance id
    if (/\.\d+$/.test(adapter)) {
        adapter = adapter.substr(0, adapter.lastIndexOf('.'));
    }

    const possibilities = [`${appName.toLowerCase()}.${adapter}/package.json`, `${appName}.${adapter}/package.json`];

    /** @type {string} */
    let adapterPath;
    for (const possibility of possibilities) {
        // special case to not read adapters from js-controller/node_module/adapter and check first in parent directory
        if (fs.existsSync(`${__dirname}/../../${possibility}`)) {
            adapterPath = `${__dirname}/../../${possibility}`;
        } else {
            try {
                adapterPath = require.resolve(possibility);
            } catch {
                // not found
            }
        }
        if (adapterPath) {
            break;
        }
    }

    if (!adapterPath) {
        return null; // inactive
    } else {
        const parts = path.normalize(adapterPath).split(/[\\/]/g);
        parts.pop();
        return parts.join('/');
    }
}

/**
 * Returns the hostname of this host
 * @alias getHostName
 */
export function getHostName(): string {
    // for tests purposes
    if (process.env.IOB_HOSTNAME) {
        return process.env.IOB_HOSTNAME;
    }
    try {
        const configName = getConfigFileName();
        const config = fs.readJSONSync(configName);
        return config.system?.hostname || os.hostname();
    } catch {
        return os.hostname();
    }
}

/**
 * Read version of system npm
 *
 * @alias getSystemNpmVersion
 * @memberof Tools
 * @param callback return result
 *        <pre><code>
 *            function (err, version) {
 *              adapter.log.debug('NPM version is: ' + version);
 *            }
 *        </code></pre>
 */
function getSystemNpmVersion(callback?: (err?: Error, version?: string | null) => void): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { exec } = require('child_process');

    // remove local node_modules\.bin dir from path
    // or we potentially get a wrong npm version
    const newEnv = Object.assign({}, process.env);
    // @ts-expect-error TODO
    newEnv.PATH = (newEnv.PATH || newEnv.Path || newEnv.path)
        .split(path.delimiter)
        .filter(dir => {
            dir = dir.toLowerCase();
            return !dir.includes('iobroker') || !dir.includes(path.join('node_modules', '.bin'));
        })
        .join(path.delimiter);
    try {
        let timeout: NodeJS.Timeout | null = setTimeout(() => {
            timeout = null;
            if (callback) {
                callback(new Error('timeout'));
                callback = undefined;
            }
        }, 10000);

        exec(
            'npm -v',
            { encoding: 'utf8', env: newEnv, windowsHide: true },
            (error: any, stdout: string | undefined | null) => {
                //, stderr) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                if (stdout) {
                    stdout = semver.valid(stdout.trim());
                }
                if (callback) {
                    callback(error, stdout);
                    callback = undefined;
                }
            }
        );
    } catch (e) {
        if (callback) {
            callback(e);
            callback = undefined;
        }
    }
}

const getSystemNpmVersionAsync = promisify(getSystemNpmVersion);

export interface InstallNodeModuleOptions {
    // Whether the `--unsafe-perm` flag should be used
    unsafePerm?: boolean;
    // Whether to include `stderr` in the output and increase the loglevel to include more than errors
    debug?: boolean;
    // Which directory to work in. If none is given, this defaults to ioBroker's root directory.
    cwd?: string;
}

/**
 * @private
 * Figure out which package manager is in charge, but with a fallback to npm.
 * @param cwd Which directory to work in. If none is given, this defaults to ioBroker's root directory.
 */
async function detectPackageManagerWithFallback(cwd?: string): Promise<PackageManager> {
    try {
        // For the first attempt, use pak's default of requiring a lockfile. This makes sure we find ioBroker's root dir
        return await detectPackageManager(
            typeof cwd === 'string'
                ? // If a cwd was provided, use it
                  { cwd }
                : // Otherwise try to find the ioBroker root dir
                  {
                      cwd: __dirname,
                      setCwdToPackageRoot: true
                  }
        );
    } catch {
        // Lockfile not found, use default to avoid picking up a wrong package manager
        // like a globally installed yarn
    }

    // Since we have no lockfile to rely on, assume the root dir is 2 levels above js-controller
    const ioBrokerRootDir = path.join(getControllerDir(), '..', '..');
    // And fallback to npm
    const pak = new packageManagers.npm();
    pak.cwd = cwd || ioBrokerRootDir;
    return pak;
}

/**
 * Installs a node module using npm or a similar package manager
 * @param npmUrl Which node module to install
 * @param options Options for the installation
 */
export async function installNodeModule(
    npmUrl: string,
    options: InstallNodeModuleOptions = {}
): Promise<CommandResult> {
    // Figure out which package manager is in charge (probably npm at this point)
    const pak = await detectPackageManagerWithFallback(options.cwd);
    // By default, don't print all the stuff the package manager spits out
    if (!options.debug) {
        pak.loglevel = 'error';
    }

    // Set up streams to pass the command output through
    if (options.debug) {
        const stdall = new PassThrough();
        pak.stdall = stdall;
        pipeLinewise(stdall, process.stdout);
    } else {
        const stdout = new PassThrough();
        pak.stdout = stdout;
        pipeLinewise(stdout, process.stdout);
    }

    // And install the module
    const installOpts: InstallOptions = {};
    if (options.unsafePerm) {
        installOpts.additionalArgs = ['--unsafe-perm'];
    }
    return pak.install([npmUrl], installOpts);
}

export interface UninstallNodeModuleOptions {
    // Whether to include `stderr` in the output and increase the loglevel to include more than errors
    debug?: boolean;
    // Which directory to work in. If none is given, this defaults to ioBroker's root directory.
    cwd?: string;
}

/**
 * Uninstalls a node module using npm or a similar package manager
 * @param packageName Which node module to uninstall
 * @param options Options for the installation
 */
export async function uninstallNodeModule(
    packageName: string,
    options: UninstallNodeModuleOptions = {}
): Promise<CommandResult> {
    // Figure out which package manager is in charge (probably npm at this point)
    const pak = await detectPackageManagerWithFallback(options.cwd);
    // By default, don't print all the stuff the package manager spits out
    if (!options.debug) {
        pak.loglevel = 'error';
    }

    // Set up streams to pass the command output through
    if (options.debug) {
        const stdall = new PassThrough();
        pak.stdall = stdall;
        pipeLinewise(stdall, process.stdout);
    } else {
        const stdout = new PassThrough();
        pak.stdout = stdout;
        pipeLinewise(stdout, process.stdout);
    }

    return pak.uninstall([packageName]);
}

export interface RebuildNodeModulesOptions {
    // Whether to include `stderr` in the output and increase the loglevel to include more than errors
    debug?: boolean;
    // Which directory to work in. If none is given, this defaults to ioBroker's root directory.
    cwd?: string;
    // module which should be rebuilt
    module?: string;
}

/**
 * Rebuilds all native node_modules that are dependencies of the project in the current working directory / project root.
 * If `options.cwd` is given, the directory must contain a lockfile.
 * @param options Options for the rebuild
 */
export async function rebuildNodeModules(options: RebuildNodeModulesOptions = {}): Promise<CommandResult> {
    // Figure out which package manager is in charge (probably npm at this point)
    const pak = await detectPackageManagerWithFallback(options.cwd);
    // By default, don't print all the stuff the package manager spits out
    if (!options.debug) {
        pak.loglevel = 'error';
    }

    // Set up streams to pass the command output through
    if (options.debug) {
        const stdall = new PassThrough();
        pak.stdall = stdall;
        pipeLinewise(stdall, process.stdout);
    } else {
        const stdout = new PassThrough();
        pak.stdout = stdout;
        pipeLinewise(stdout, process.stdout);
    }

    return pak.rebuild(options.module ? [options.module] : undefined);
}

export interface GetDiskInfoResponse {
    'Disk size': number;
    'Disk free': number;
}

/**
 * Read disk free space
 *
 * @alias getDiskInfo
 * @memberof Tools
 * @param platform result of os.platform() (win32 => Windows, darwin => OSX)
 * @param callback return result
 *        <pre><code>
 *            function (err, infos) {
 *              adapter.log.debug('Disks sizes is: ' + info['Disk size'] + ' - ' + info['Disk free']);
 *            }
 *        </code></pre>
 */
export function getDiskInfo(
    platform: NodeJS.Platform,
    callback: (err?: Error | null, infos?: null | GetDiskInfoResponse) => void
): void {
    platform = platform || os.platform();
    if (diskusage) {
        try {
            const path = platform === 'win32' ? __dirname.substring(0, 2) : '/';
            const info = diskusage.checkSync(path);
            return callback && callback(null, { 'Disk size': info.total, 'Disk free': info.free });
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            if (platform === 'win32') {
                // Caption  FreeSpace     Size
                // A:
                // C:       66993807360   214640357376
                // D:
                // Y:       116649795584  148368257024
                // Z:       116649795584  148368257024
                const disk = __dirname.substring(0, 2).toUpperCase();

                exec(
                    'wmic logicaldisk get size,freespace,caption',
                    {
                        encoding: 'utf8',
                        windowsHide: true
                    },
                    (error, stdout) => {
                        //, stderr) {
                        if (stdout) {
                            const lines = stdout.split('\n');
                            const line = lines.find(line => {
                                const parts = line.split(/\s+/);
                                return parts[0].toUpperCase() === disk;
                            });
                            if (line) {
                                const parts = line.split(/\s+/);
                                return (
                                    callback &&
                                    callback(error, {
                                        'Disk size': parseInt(parts[2]),
                                        'Disk free': parseInt(parts[1])
                                    })
                                );
                            }
                        }
                        callback && callback(error, null);
                    }
                );
            } else {
                exec('df -k /', { encoding: 'utf8', windowsHide: true }, (error, stdout) => {
                    //, stderr) {
                    // Filesystem            1K-blocks    Used Available Use% Mounted on
                    // /dev/mapper/vg00-lv01 162544556 9966192 145767152   7% /
                    try {
                        if (stdout) {
                            const parts = stdout.split('\n')[1].split(/\s+/);
                            return (
                                callback &&
                                callback(error, {
                                    'Disk size': parseInt(parts[1]) * 1024,
                                    'Disk free': parseInt(parts[3]) * 1024
                                })
                            );
                        }
                    } catch {
                        // continue regardless of error
                    }
                    callback && callback(error, null);
                });
            }
        } catch (e) {
            callback && callback(e, null);
        }
    }
}

const getDiskInfoAsync = promisify(getDiskInfo);

/**
 * Returns information about a certificate
 *
 *
 *  Following info will be returned:
 *     - certificate: the certificate itself
 *     - serialNumber: serial number
 *     - signature: type of signature as text like "RSA",
 *     - keyLength: bits used for encryption key like 2048
 *     - issuer: issuer of the certificate
 *     - subject: subject that is signed
 *     - dnsNames: server name this certificate belong to
 *     - keyUsage: this certificate can be used for the followinf puposes
 *     - extKeyUsage: usable or client, server or ...
 *     - validityNotBefore: certificate validity start datetime
 *     - validityNotAfter: certificate validity end datetime
 *
 * @alias getCertificateInfo
 * @memberof Tools
 * @param cert
 * @return certificate information object
 */
export function getCertificateInfo(cert: string): null | Record<string, any> {
    let info: Record<string, any> | null = null;

    if (!cert) {
        return null;
    }

    const pki = forge.pki;

    let certFile = null;
    try {
        if (typeof cert === 'string' && cert.length < 1024 && fs.existsSync(cert)) {
            certFile = cert;
            cert = fs.readFileSync(cert, 'utf8');
        }

        // cast to any we use some undocumented? properties below
        const crt: any = pki.certificateFromPem(cert);

        info = {
            certificateFilename: certFile,
            certificate: cert,
            serialNumber: crt.serialNumber,
            signature: pki.oids[crt.signatureOid],
            keyLength: crt.publicKey.n.toString(2).length,
            issuer: crt.issuer,
            subject: crt.subject,
            dnsNames: crt.getExtension('subjectAltName').altNames,
            keyUsage: crt.getExtension('keyUsage'),
            extKeyUsage: crt.getExtension('extKeyUsage'),
            validityNotBefore: crt.validity.notBefore,
            validityNotAfter: crt.validity.notAfter
        };

        // do not return info about values
        delete info.keyUsage.value;
        delete info.extKeyUsage.value;
        return info;
    } catch {
        return null;
    }
}

export interface DefaultCertificates {
    defaultPrivate: string;
    defaultPublic: string;
}

/**
 * Returns default SSL certificates (private and public)
 *
 *
 *  Following info will be returned:
 *     - defaultPrivate: private RSA key
 *     - defaultPublic: public certificate
 *
 * @alias generateDefaultCertificates
 * @memberof Tools
 *        <pre><code>
 *            const certificates = tools.generateDefaultCertificates();
 *        </code></pre>
 */
export function generateDefaultCertificates(): DefaultCertificates {
    const pki = forge.pki;
    const keys = pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    const cert = pki.createCertificate();

    cert.publicKey = keys.publicKey;
    cert.serialNumber = `0${makeid(17)}`;
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

    const subAttrs = [
        { name: 'commonName', value: getHostName() },
        { name: 'organizationName', value: 'ioBroker GmbH' },
        { shortName: 'OU', value: 'iobroker' }
    ];

    const issAttrs = [
        { name: 'commonName', value: 'iobroker' },
        { name: 'organizationName', value: 'ioBroker GmbH' },
        { shortName: 'OU', value: 'iobroker' }
    ];

    cert.setSubject(subAttrs);
    cert.setIssuer(issAttrs);

    cert.setExtensions([
        {
            name: 'basicConstraints',
            critical: true,
            cA: false
        },
        {
            name: 'keyUsage',
            critical: true,
            digitalSignature: true,
            contentCommitment: true,
            keyEncipherment: true,
            dataEncipherment: true,
            keyAgreement: true,
            keyCertSign: true,
            cRLSign: true,
            encipherOnly: true,
            decipherOnly: true
        },
        {
            name: 'subjectAltName',
            altNames: [
                {
                    type: 2,
                    value: os.hostname()
                }
            ]
        },
        {
            name: 'subjectKeyIdentifier'
        },
        {
            name: 'extKeyUsage',
            serverAuth: true,
            clientAuth: true,
            codeSigning: false,
            emailProtection: false,
            timeStamping: false
        },
        {
            name: 'authorityKeyIdentifier'
        }
    ]);

    cert.sign(keys.privateKey, forge.md.sha256.create());

    const pem_pkey = pki.privateKeyToPem(keys.privateKey);
    const pem_cert = pki.certificateToPem(cert);

    return {
        defaultPrivate: pem_pkey,
        defaultPublic: pem_cert
    };
}

function makeid(length: number) {
    let result = '';
    const characters = 'abcdef0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Collects information about host and available adapters
 *
 *  Following info will be collected:
 *    - available adapters
 *    - node.js --version
 *    - npm --version
 *
 * @alias getHostInfo
 * @memberof Tools
 * @param objects db
 * @param callback
 *        <pre><code>
 *            function (result) {
 *              adapter.log.debug('Info about host: ' + JSON.stringify(result, null, 2);
 *            }
 *        </code></pre>
 */
export async function getHostInfo(
    objects: any,
    callback: (result?: Record<string, any>) => void
): Promise<Record<string, any>> {
    if (diskusage) {
        try {
            diskusage = diskusage || require('diskusage');
        } catch {
            // ignore
        }
    }

    const cpus = os.cpus();
    const dateObj = new Date();

    const data: Record<string, any> = {
        Platform: isDocker() ? 'docker' : os.platform(),
        os: process.platform,
        Architecture: os.arch(),
        CPUs: cpus && Array.isArray(cpus) ? cpus.length : null,
        Speed: cpus && Array.isArray(cpus) ? cpus[0].speed : null,
        Model: cpus && Array.isArray(cpus) ? cpus[0].model : null,
        RAM: os.totalmem(),
        'System uptime': Math.round(os.uptime()),
        'Node.js': process.version,
        time: dateObj.getTime(), // give infos to compare the local times
        timeOffset: dateObj.getTimezoneOffset()
    };

    if (data.Platform === 'win32') {
        data.Platform = 'Windows';
    } else if (data.Platform === 'darwin') {
        data.Platform = 'OSX';
    }

    const systemConfig: ioBroker.Object = await objects.getObjectAsync('system.config');
    const systemRepos: ioBroker.Object = await objects.getObjectAsync('system.repositories');

    // Check if repositories exists
    const allRepos: Record<string, any> = {};
    if (systemRepos && systemRepos.native && systemRepos.native.repositories) {
        const repos: string[] = Array.isArray(systemConfig.common.activeRepo)
            ? systemConfig.common.activeRepo
            : [systemConfig.common.activeRepo];
        repos
            .filter(repo => systemRepos.native.repositories[repo] && systemRepos.native.repositories[repo].json)
            .forEach(repo => Object.assign(allRepos, systemRepos.native.repositories[repo].json));

        data['adapters count'] = Object.keys(allRepos).length;
    }

    if (!npmVersion) {
        try {
            const version = await getSystemNpmVersionAsync();
            data.NPM = `v${version || ' ---'}`;
            npmVersion = version;
        } catch (e) {
            console.error(`Cannot get NPM version: ${e.message}`);
        }
    } else {
        data.NPM = npmVersion;
    }
    try {
        const info = await getDiskInfoAsync(data.Platform);
        if (info) {
            Object.assign(data, info);
        }
    } catch (e) {
        console.error(`Cannot get disk information: ${e.message}`);
    }
    callback && callback(data);

    return data;
}

/**
 * Finds the controller root directory
 * @returns absolute path to controller dir without ending slash
 */
export function getControllerDir(): string {
    const possibilities = ['iobroker.js-controller', 'ioBroker.js-controller'];
    for (const pkg of possibilities) {
        try {
            // package.json is guaranteed to be in the module root folder
            // so once that is resolved, take the dirname and we're done
            const possiblePath = require.resolve(`${pkg}/package.json`);
            if (fs.existsSync(possiblePath)) {
                return path.dirname(possiblePath);
            }
        } catch {
            /* not found */
        }
    }

    // Apparently, checking vs null/undefined may miss the odd case of controllerPath being ""
    // Thus we check for falsyness, which includes failing on an empty path
    let checkPath = path.join(__dirname, '../..');
    // Also check in the current check dir (along with iobroker.js-controller subdirs)
    possibilities.unshift('');
    while (true) {
        for (const pkg of possibilities) {
            try {
                const possiblePath = path.join(checkPath, pkg);
                if (fs.existsSync(path.join(possiblePath, 'iob.bat'))) {
                    return possiblePath;
                }
            } catch {
                // not found, continue with next possiblity
            }
        }

        // Controller not found here - go to the parent dir
        const newPath = path.dirname(checkPath);
        if (newPath === checkPath) {
            // We already reached the root dir, abort
            break;
        }
        checkPath = newPath;
    }

    throw new Error('Could not determine controller directory');
}

// All paths are returned always relative to /node_modules/' + appName + '.js-controller
// the result has always "/" as last symbol
export function getDefaultDataDir(): string {
    if (_isDevInstallation()) {
        // dev install
        return './data/';
    }

    const _appName = appName.toLowerCase();

    // if debugging with npm5
    if (fs.existsSync(`${__dirname}/../../../node_modules/${_appName}.js-controller`)) {
        return `../${_appName}-data/`;
    } else {
        // If installed with npm
        return `../../${_appName}-data/`;
    }
}

/**
 * Returns the path of the config file
 */
export function getConfigFileName(): string {
    const _appName = appName.toLowerCase();
    let devConfigDir;

    if (_isDevInstallation()) {
        devConfigDir = __dirname.replace(/\\/g, '/');
        const devConfigParts = devConfigDir.split('/');

        // dev install -> Remove /lib
        devConfigParts.splice(devConfigParts.length - 4, 4);
        devConfigDir = devConfigParts.join('/');
        devConfigDir += '/controller'; // go inside controller dir
        if (fs.existsSync(`${devConfigDir}/conf/${_appName}.json`)) {
            return `${devConfigDir}/conf/${_appName}.json`;
        } else if (fs.existsSync(`${devConfigDir}/data/${_appName}.json`)) {
            return `${devConfigDir}/data/${_appName}.json`;
        }
    }

    let configDir = __dirname.replace(/\\/g, '/');
    const configParts = configDir.split('/');

    // if debugging with npm5 -> node_modules on e.g. /opt/node_modules
    if (
        fs.existsSync(`${__dirname}/../../../../../../../../node_modules/${_appName.toLowerCase()}.js-controller`) ||
        fs.existsSync(`${__dirname}/../../../../../../../../node_modules/${_appName}.js-controller`)
    ) {
        // remove /node_modules/' + appName + '.js-controller/lib
        configParts.splice(configParts.length - 8, 8);
        configDir = configParts.join('/');
    } else {
        // If installed with npm -> remove node_modules/@iobroker/js-controller-common/src/lib/common
        configParts.splice(configParts.length - 6, 6);
        configDir = configParts.join('/');
    }

    if (!fs.existsSync(`${configDir}/${_appName}-data/${_appName}.json`) && devConfigDir) {
        return `${devConfigDir}/data/${_appName}.json`;
    }

    return `${configDir}/${_appName}-data/${_appName}.json`;
}

/**
 * Puts all values from an `arguments` object into an array, starting at the given index
 * @param argsObj An `arguments` object as passed to a function
 * @param startIndex The optional index to start taking the arguments from
 */
function sliceArgs(argsObj: IArguments, startIndex = 0) {
    if (startIndex === null || startIndex === undefined) {
        startIndex = 0;
    }
    const ret = [];
    for (let i = startIndex; i < argsObj.length; i++) {
        ret.push(argsObj[i]);
    }
    return ret;
}

/**
 * Promisifies a function which returns an error as the first argument in its callback
 * @param fn The function to promisify
 * @param context (optional) The context (value of `this` to bind the function to)
 * @param returnArgNames (optional) If the callback contains multiple arguments,
 * you can combine them into one object by passing the names as an array.
 * Otherwise the Promise will resolve with an array
 */
export function promisify(
    fn: (...args: any[]) => void,
    context?: any,
    returnArgNames?: string[]
): (...args: any[]) => Promise<any> {
    return function () {
        // eslint-disable-next-line prefer-rest-params
        const args = sliceArgs(arguments);
        // @ts-expect-error we cannot know the type of `this`
        context = context || this;
        return new Promise<void | Record<string, any> | any[]>((resolve, reject) => {
            fn.apply(
                context,
                args.concat([
                    function (error: string | Error, result: any) {
                        if (error) {
                            return reject(error instanceof Error ? error : new Error(error));
                        } else {
                            // decide on how we want to return the callback arguments
                            switch (arguments.length) {
                                case 1: // only an error was given
                                    return resolve(); // Promise<void>
                                case 2: // a single value (result) was returned
                                    return resolve(result);
                                default: {
                                    // multiple values should be returned
                                    let ret: Record<string, any> | any[];
                                    // eslint-disable-next-line prefer-rest-params
                                    const extraArgs = sliceArgs(arguments, 1);
                                    if (returnArgNames && returnArgNames.length === extraArgs.length) {
                                        // we can build an object
                                        ret = {};
                                        for (let i = 0; i < returnArgNames.length; i++) {
                                            ret[returnArgNames[i]] = extraArgs[i];
                                        }
                                    } else {
                                        // we return the raw array
                                        ret = extraArgs;
                                    }
                                    return resolve(ret);
                                }
                            }
                        }
                    }
                ])
            );
        });
    };
}

/**
 * Promisifies a function which does not provide an error as the first argument in its callback
 * @param fn The function to promisify
 * @param context (optional) The context (value of `this` to bind the function to)
 * @param returnArgNames (optional) If the callback contains multiple arguments,
 * you can combine them into one object by passing the names as an array.
 * Otherwise the Promise will resolve with an array
 */
export function promisifyNoError(
    fn: (...args: any[]) => void,
    context?: any,
    returnArgNames?: string[]
): (...args: any[]) => Promise<any> {
    return function () {
        // eslint-disable-next-line prefer-rest-params
        const args = sliceArgs(arguments);
        // @ts-expect-error we cannot know the type of `this`
        context = context || this;
        return new Promise<void | Record<string, any> | any[]>((resolve, _reject) => {
            fn.apply(
                context,
                args.concat([
                    function (result: any) {
                        // decide on how we want to return the callback arguments
                        switch (arguments.length) {
                            case 0: // no arguments were given
                                return resolve(); // Promise<void>
                            case 1: // a single value (result) was returned
                                return resolve(result);
                            default: {
                                // multiple values should be returned
                                let ret: Record<string, any> | any[];
                                // eslint-disable-next-line prefer-rest-params
                                const extraArgs = sliceArgs(arguments, 0);
                                if (returnArgNames && returnArgNames.length === extraArgs.length) {
                                    // we can build an object
                                    ret = {};
                                    for (let i = 0; i < returnArgNames.length; i++) {
                                        ret[returnArgNames[i]] = extraArgs[i];
                                    }
                                } else {
                                    // we return the raw array
                                    ret = extraArgs;
                                }
                                return resolve(ret);
                            }
                        }
                    }
                ])
            );
        });
    };
}

/**
 * Creates and executes an array of promises in sequence
 * @param promiseFactories An array of promise-returning functions
 */
export function promiseSequence(promiseFactories: ((...args: any[]) => Promise<any>)[]): any[] {
    /** @ts-expect-error don't want to touch now */
    return promiseFactories.reduce((promise, factory) => {
        return promise.then(result => factory().then(Array.prototype.concat.bind(result)));
    }, Promise.resolve([]));
}

async function _setQualityForStates(states: any, keys: string[], quality: number): Promise<void> {
    for (const key of keys) {
        try {
            await states.setState(key, { ack: null, q: quality });
        } catch {
            // ignore
        }
    }
}

export function setQualityForInstance(objects: any, states: any, namespace: string, q: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        objects.getObjectView(
            'system',
            'state',
            {
                startkey: `${namespace}.`,
                endkey: `${namespace}.\u9999`,
                include_docs: false
            },
            (err: Error | null, _states?: GetObjectViewResult) => {
                if (err) {
                    reject(err);
                } else {
                    let keys: string[] = [];
                    if (_states && _states.rows) {
                        for (let s = 0; s < _states.rows.length; s++) {
                            const id = _states.rows[s].id;
                            // if instance still active, but device is offline
                            if (!(q & 0x10) && id.match(/\.info\.connection$/)) {
                                continue;
                            }
                            keys.push(id);
                        }
                    }
                    // read all values for IDs
                    states.getStates(keys, async (_err: Error | null, values: Record<string, ioBroker.State>) => {
                        // Get only states, that have ack = true
                        keys = keys.filter((_id, i) => values[i] && values[i].ack);
                        // update quality code of the states to new one
                        await _setQualityForStates(states, keys, q);
                        resolve();
                    });
                }
            }
        );
    });
}

/**
 * Converts ioB pattern into regex.
 * @param pattern - Regex string to use it in new RegExp(pattern)
 */
export function pattern2RegEx(pattern: string): string {
    pattern = (pattern || '').toString();

    const startsWithWildcard = pattern[0] === '*';
    const endsWithWildcard = pattern[pattern.length - 1] === '*';

    pattern = pattern.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*');

    return (startsWithWildcard ? '' : '^') + pattern + (endsWithWildcard ? '' : '$');
}

/**
 * Generates a stack trace that can be added to log outputs to trace their source
 * @param [wrapperName = 'captureStackTrace'] The wrapper function after which the stack trace should begin
 */
function captureStackTrace(wrapperName: string): string {
    if (typeof wrapperName !== 'string') {
        wrapperName = 'captureStackTrace';
    }

    const ret = new Error();
    if (ret.stack) {
        let foundSelf = false;
        const lines = ret.stack.split('\n').filter(line => {
            // keep all lines after this function's
            if (foundSelf) {
                return true;
            }
            if (line.includes(wrapperName)) {
                foundSelf = true;
            }
            return false;
        });
        return lines.join('\n');
    }
    return '';
}

/**
 * Appends the stack trace generated by `captureStackTrace` to the given string
 * @param str - The string to append the stack trace to
 */
export function appendStackTrace(str: string): string {
    // Convert anything that isn't a string into a string
    if (typeof str !== 'string') {
        str = String(str);
    }
    if (!str.endsWith('\n')) {
        str += '\n';
    }
    return str + captureStackTrace('appendStackTrace');
}

/**
 * Encrypt the password/value with given key
 * @param key - Secret key
 * @param value - value to encrypt
 */
function encryptLegacy(key: string, value: string): string {
    let result = '';
    for (let i = 0; i < value.length; i++) {
        result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
    }
    return result;
}

/**
 * Decrypt the password/value with given key
 * @param key - Secret key
 * @param value - value to decrypt
 */
function decryptLegacy(key: string, value: string): string {
    let result = '';
    for (let i = 0; i < value.length; i++) {
        result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
    }
    return result;
}

/**
 * encrypts a value by a given key via AES-192-CBC
 *
 * @param key - Secret key
 * @param value - value to decrypt
 */
export function encrypt(key: string, value: string): string {
    if (!/^[0-9a-f]{48}$/.test(key)) {
        // key length is not matching for AES-192-CBC or key is no valid hex - fallback to old encryption
        return encryptLegacy(key, value);
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-192-cbc', Buffer.from(key, 'hex'), iv);

    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);

    return `$/aes-192-cbc:${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * encrypts a value by a given key via AES-192-CBC
 *
 * @param key - Secret key
 * @param value - value to decrypt
 */
export function decrypt(key: string, value: string): string {
    // if not encrypted as aes-192 or key not a valid 48 digit hex -> fallback
    if (!value.startsWith(`$/aes-192-cbc:`) || !/^[0-9a-f]{48}$/.test(key)) {
        return decryptLegacy(key, value);
    }

    const textParts = value.split(':', 3) as [algorithm: string, iv: string, encryptedText: string];
    const iv = Buffer.from(textParts[1], 'hex');
    const encryptedText = Buffer.from(textParts[2], 'hex');
    const decipher = crypto.createDecipheriv('aes-192-cbc', Buffer.from(key, 'hex'), iv);

    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

    return decrypted.toString();
}

/**
 * Tests whether the given variable is a real object and not an Array
 * @param it The variable to test
 * @returns true if it is Record<string, any>
 */
export function isObject(it: any): it is Record<string, any> {
    // This is necessary because:
    // typeof null === 'object'
    // typeof [] === 'object'
    // [] instanceof Object === true
    return Object.prototype.toString.call(it) === '[object Object]'; // this code is 25% faster than below one
    // return it && typeof it === 'object' && !(it instanceof Array);
}

/**
 * Tests whether the given variable is really an Array
 * @param it The variable to test
 */
export function isArray(it: any): it is any[] {
    return Array.isArray(it); // from node 0.1 is a part of engine
}

/**
 * Measure the Node.js event loop lag and repeatedly call the provided callback function with the updated results
 * @param ms The number of milliseconds for monitoring
 * @param cb Callback function to call for each new value
 */
export function measureEventLoopLag(ms: number, cb: (eventLoopLag?: number) => void): void {
    let start = hrtime();

    let timeout = setTimeout(check, ms);
    timeout.unref();

    function check() {
        // workaround for https://github.com/joyent/node/issues/8364
        clearTimeout(timeout);

        // how much time has actually elapsed in the loop beyond what
        // setTimeout says is supposed to happen. we use setTimeout to
        // cover multiple iterations of the event loop, getting a larger
        // sample of what the process is working on.
        const t = hrtime();

        // we use Math.max to handle case where timers are running efficiently
        // and our callback executes earlier than `ms` due to how timers are
        // implemented. this is ok. it means we're healthy.
        cb && cb(Math.max(0, t - start - ms));
        start = t;

        timeout = setTimeout(check, ms);
        timeout.unref();
    }

    function hrtime() {
        const t = process.hrtime();
        return t[0] * 1e3 + t[1] / 1e6;
    }
}

/**
 * This function convert state values by read and write of aliases. Function is synchron.
 *
 * @param sourceObj
 * @param targetObj
 * @param state Object with val, ack and so on
 * @param logger Logging object
 * @param logNamespace optional Logging namespace
 */
export function formatAliasValue(
    sourceObj: Record<string, any>,
    targetObj: Record<string, any>,
    state: ioBroker.State | null | undefined,
    logger: any,
    logNamespace?: string
): ioBroker.State | null {
    logNamespace = logNamespace ? `${logNamespace} ` : '';

    if (!state) {
        return null;
    }
    if (state.val === undefined) {
        state.val = null;
        return state;
    }

    if (targetObj?.alias?.read) {
        try {
            // process the value here
            const func = new Function(
                'val',
                'type',
                'min',
                'max',
                'sType',
                'sMin',
                'sMax',
                `return ${targetObj.alias.read}`
            );
            state.val = func(
                state.val,
                targetObj.type,
                targetObj.min,
                targetObj.max,
                sourceObj.type,
                sourceObj.min,
                sourceObj.max
            );
        } catch (e) {
            logger.error(
                `${logNamespace} Invalid read function for ${targetObj._id}: ${targetObj.alias.read} => ${e.message}`
            );
            return null;
        }
    }

    if (sourceObj && sourceObj.alias && sourceObj.alias.write) {
        try {
            // process the value here
            const func = new Function(
                'val',
                'type',
                'min',
                'max',
                'tType',
                'tMin',
                'tMax',
                `return ${sourceObj.alias.write}`
            );
            state.val = func(
                state.val,
                sourceObj.type,
                sourceObj.min,
                sourceObj.max,
                targetObj.type,
                targetObj.min,
                targetObj.max
            );
        } catch (e) {
            logger.error(
                `${logNamespace} Invalid write function for ${sourceObj._id}: ${sourceObj.alias.write} => ${e.message}`
            );
            return null;
        }
    }

    if (targetObj && typeof state.val !== targetObj.type && state.val !== null) {
        if (targetObj.type === 'boolean') {
            const lowerVal = typeof state.val === 'string' ? state.val.toLowerCase() : state.val;
            if (lowerVal === 'off' || lowerVal === 'aus' || state.val === '0') {
                state.val = false;
            } else {
                // this also handles strings like "EIN" or such that will be true
                state.val = !!state.val;
            }
        } else if (targetObj.type === 'number') {
            state.val = parseFloat(state.val as any);
        } else if (targetObj.type === 'string') {
            state.val = state.val.toString();
        }
    }

    // auto-scaling, only if val not null and unit for target (x)or source is %
    if (
        ((targetObj && targetObj.alias && !targetObj.alias.read) ||
            (sourceObj && sourceObj.alias && !sourceObj.alias.write)) &&
        state.val !== null
    ) {
        if (
            targetObj &&
            targetObj.type === 'number' &&
            targetObj.unit === '%' &&
            sourceObj &&
            sourceObj.type === 'number' &&
            sourceObj.unit !== '%' &&
            sourceObj.min !== undefined &&
            sourceObj.max !== undefined
        ) {
            // scale target between 0 and 100 % based on sources min/max
            state.val = (((state.val as any) - sourceObj.min) / (sourceObj.max - sourceObj.min)) * 100;
        } else if (
            sourceObj &&
            sourceObj.type === 'number' &&
            sourceObj.unit === '%' &&
            targetObj &&
            targetObj.unit !== '%' &&
            targetObj.type === 'number' &&
            targetObj.min !== undefined &&
            targetObj.max !== undefined
        ) {
            // scale target based on its min/max by its source (assuming source is meant to be 0 - 100 %)
            state.val = ((targetObj.max - targetObj.min) * (state.val as any)) / 100 + targetObj.min;
        }
    }

    return state;
}

/**
 * remove given id from all enums
 *
 * @alias removeIdFromAllEnums
 * @memberof tools
 * @param objects object to access objects db
 * @param id the object id which will be deleted from enums
 * @param allEnums objects with all enums to use - if not provided all enums will be queried
 * @returns Promise All objects are tried to be updated - reject will happen as soon as one fails with the error of the first fail
 *
 */
export async function removeIdFromAllEnums(objects: any, id: string, allEnums?: Record<string, any>): Promise<void> {
    if (!allEnums) {
        allEnums = await getAllEnums(objects);
    }

    let error = null;
    for (const [enumId, enumObj] of Object.entries(allEnums)) {
        const idx = enumObj.common.members ? enumObj.common.members.indexOf(id) : -1;
        if (idx !== -1) {
            // the id is in the enum now we have to remove it
            enumObj.common.members.splice(idx, 1);
            try {
                await objects.setObjectAsync(enumId, enumObj);
                // update cache directly to prevent race conditions when sending many delete in a short time
                allEnums[enumId] = enumObj;
            } catch (err) {
                if (!error) {
                    error = err;
                }
            }
        }
    }
    if (error) {
        throw error;
    }
}

/**
 * Parses dependencies to standardized object of form
 *
 * @alias parseDependencies
 * @memberof tools
 * @param dependencies dependencies array or single dependency
 * @returns parsedDeps parsed dependencies
 */
export function parseDependencies(
    dependencies: string[] | Record<string, string>[] | string | Record<string, string>
): Record<string, string> {
    let adapters: Record<string, string> = {};
    if (Array.isArray(dependencies)) {
        dependencies.forEach(rule => {
            if (typeof rule === 'string') {
                // No version given, all are okay
                adapters[rule] = '*';
            } else if (isObject(rule)) {
                // can be object containing single adapter or multiple
                Object.keys(rule)
                    .filter(adapter => !adapters[adapter])
                    .forEach(adapter => (adapters[adapter] = rule[adapter]));
            }
        });
    } else if (typeof dependencies === 'string') {
        // its a single string without version requirement
        adapters[dependencies] = '*';
    } else if (isObject(dependencies)) {
        // if dependencies is already an object, just use it
        adapters = dependencies;
    }
    return adapters;
}

/**
 * Validates types of obj.common properties and object.type, if invalid types are used, an error is thrown.
 * If attributes of obj.common are not provided, no error is thrown. obj.type has to be there and has to be valid.
 *
 * @param obj an object which will be validated
 * @param extend (optional) if true checks will allow more optional cases for extendObject calls
 * @throws Error if a property has the wrong type or obj.type is non-existing
 */
export function validateGeneralObjectProperties(obj: any, extend?: boolean): void {
    // designs have no type but have attribute views
    if (obj && obj.type === undefined && obj.views !== undefined) {
        return;
    }

    if (!obj || (obj.type === undefined && !extend)) {
        throw new Error(`obj.type has to exist`);
    }

    if (obj.type !== undefined && typeof obj.type !== 'string') {
        throw new Error(`obj.type has an invalid type! Expected "string", received "${typeof obj.type}"`);
    }

    const allowedObjectTypes = [
        'state',
        'channel',
        'device',
        'enum',
        'host',
        'adapter',
        'instance',
        'meta',
        'config',
        'script',
        'user',
        'group',
        'chart',
        'folder'
    ];
    if (obj.type !== undefined && !allowedObjectTypes.includes(obj.type)) {
        throw new Error(
            `obj.type has an invalid value (${obj.type}) but has to be one of ${allowedObjectTypes.join(', ')}`
        );
    }

    // obj.common is optional in general check
    if (!obj.common) {
        return;
    }

    if (obj.common.name !== undefined && typeof obj.common.name !== 'string' && typeof obj.common.name !== 'object') {
        throw new Error(
            `obj.common.name has an invalid type! Expected "string" or "object", received "${typeof obj.common.name}"`
        );
    } else if (['adapter'].includes(obj.type) && typeof obj.common.name !== 'string') {
        // TODO: we need this for group/user too, but have to solve problems described in #1266
        // for some types, name needs to be a unique string
        throw new Error(`obj.common.name has an invalid type! Expected "string", received "${typeof obj.common.name}"`);
    }

    if (obj.common.type !== undefined) {
        if (typeof obj.common.type !== 'string') {
            throw new Error(
                `obj.common.type has an invalid type! Expected "string", received "${typeof obj.common.type}"`
            );
        }

        if (obj.type === 'state') {
            // if object type indicates a state, check that common.type matches
            const allowedStateTypes = ['number', 'string', 'boolean', 'array', 'object', 'mixed', 'file', 'json'];
            if (!allowedStateTypes.includes(obj.common.type)) {
                throw new Error(
                    `obj.common.type has an invalid value (${
                        obj.common.type
                    }) but has to be one of ${allowedStateTypes.join(', ')}`
                );
            }

            // ensure that min max only exists for common.type number and is number itself
            if (obj.common.min !== undefined) {
                if (typeof obj.common.min !== 'number') {
                    throw new Error(
                        `obj.common.min has an invalid type! Expected "number", received "${typeof obj.common.min}"`
                    );
                }

                if (obj.common.type !== 'number' && obj.common.type !== 'mixed') {
                    throw new Error(
                        `obj.common.min is only allowed on obj.common.type "number" or "mixed", received "${obj.common.type}"`
                    );
                }
            }

            if (obj.common.max !== undefined) {
                if (typeof obj.common.max !== 'number') {
                    throw new Error(
                        `obj.common.max has an invalid type! Expected "number", received "${typeof obj.common.max}"`
                    );
                }

                if (obj.common.type !== 'number' && obj.common.type !== 'mixed') {
                    throw new Error(
                        `obj.common.max is only allowed on obj.common.type "number" or "mixed", received "${obj.common.type}"`
                    );
                }

                if (obj.common.min !== undefined && obj.common.min > obj.common.max) {
                    throw new Error(
                        `obj.common.min (${obj.common.min}) needs to be less than or equal to obj.common.max (${obj.common.max})`
                    );
                }
            }

            // ensure, that default value has correct type
            if (obj.common.def !== undefined && obj.common.def !== null) {
                if (obj.common.type === 'file') {
                    // defaults are set via setState but would need setBinaryState
                    throw new Error('Default value is not supported for type "file"');
                }

                // else do what strictObjectChecks does for val
                if (
                    !(
                        (obj.common.type === 'mixed' && typeof obj.common.def !== 'object') ||
                        (obj.common.type !== 'object' && obj.common.type === typeof obj.common.def) ||
                        (obj.common.type === 'array' && typeof obj.common.def === 'string') ||
                        (obj.common.type === 'json' && typeof obj.common.def === 'string') ||
                        (obj.common.type === 'file' && typeof obj.common.def === 'string') ||
                        (obj.common.type === 'object' && typeof obj.common.def === 'string')
                    )
                ) {
                    // types can be 'number', 'string', 'boolean', 'array', 'object', 'mixed', 'file', 'json'
                    // array, object, json need to be string
                    if (['object', 'json', 'file', 'array'].includes(obj.common.type)) {
                        throw new Error(
                            `Default value has to be stringified but received type "${typeof obj.common.def}"`
                        );
                    } else {
                        throw new Error(
                            `Default value has to be ${
                                obj.common.type === 'mixed'
                                    ? `one of type "string", "number", "boolean"`
                                    : `type "${obj.common.type}"`
                            } but received type "${typeof obj.common.def}"`
                        );
                    }
                }
            }
        }
    }

    if (obj.common.read !== undefined && typeof obj.common.read !== 'boolean') {
        throw new Error(
            `obj.common.read has an invalid type! Expected "boolean", received "${typeof obj.common.read}"`
        );
    }

    if (obj.common.write !== undefined && typeof obj.common.write !== 'boolean') {
        throw new Error(
            `obj.common.write has an invalid type! Expected "boolean", received "${typeof obj.common.write}"`
        );
    }

    if (obj.common.role !== undefined && typeof obj.common.role !== 'string') {
        throw new Error(`obj.common.role has an invalid type! Expected "string", received "${typeof obj.common.role}"`);
    }

    if (obj.common.desc !== undefined && typeof obj.common.desc !== 'string' && typeof obj.common.desc !== 'object') {
        throw new Error(
            `obj.common.desc has an invalid type! Expected "string" or "object", received "${typeof obj.common.desc}"`
        );
    }

    if (
        obj.type === 'state' &&
        obj.common.custom !== undefined &&
        obj.common.custom !== null &&
        !isObject(obj.common.custom)
    ) {
        throw new Error(
            `obj.common.custom has an invalid type! Expected "object", received "${typeof obj.common.custom}"`
        );
    }

    // common.states needs to be a real object or an array
    if (
        obj.common.states !== null && // we allow null for deletion TODO: implement https://github.com/ioBroker/ioBroker.js-controller/issues/1735
        obj.common.states !== undefined &&
        !isObject(obj.common.states) &&
        !Array.isArray(obj.common.states)
    ) {
        throw new Error(
            `obj.common.states has an invalid type! Expected "object", received "${typeof obj.common.states}"`
        );
    }
}

/**
 * get all instances of all adapters in the list
 *
 * @alias getAllInstances
 * @memberof tools
 * @param adapters list of adapter names to get instances for
 * @param objects class redis objects
 * @returns array of IDs
 */
export async function getAllInstances(adapters: string[], objects: any): Promise<string[]> {
    const instances: string[] = [];

    for (let i = 0; i < adapters.length; i++) {
        if (!adapters[i]) {
            continue;
        }
        if (!adapters[i].includes('.')) {
            const inst = await getInstances(adapters[i], objects, false);
            for (let j = 0; j < inst.length; j++) {
                if (!instances.includes(inst[j])) {
                    instances.push(inst[j]);
                }
            }
        } else {
            if (!instances.includes(adapters[i])) {
                instances.push(adapters[i]);
            }
        }
    }

    return instances;
}

export interface GetObjectViewResult {
    rows: ioBroker.GetObjectViewItem<ioBroker.Object>[];
}

export interface GetObjectViewInstanceEntry {
    id: string;
    value: ioBroker.InstanceObject;
}

export interface GetObjectViewInstanceResult {
    rows: GetObjectViewInstanceEntry[];
}

/**
 * Get all existing enums
 *
 * @param objects - objects db
 * @returns Promise
 */
export async function getAllEnums(objects: any): Promise<Record<string, any>> {
    const allEnums: Record<string, any> = {};
    const res: GetObjectViewResult = await objects.getObjectViewAsync('system', 'enum', {
        startkey: 'enum.',
        endkey: 'enum.\u9999'
    });
    if (res && res.rows) {
        for (const row of res.rows) {
            allEnums[row.id] = row.value;
        }
    }

    return allEnums;
}

/**
 * get async all instances of one adapter
 *
 * @alias getInstances
 * @param adapter name of the adapter
 * @param objects objects DB
 * @param withObjects return objects instead of only ids
 */
export async function getInstances(adapter: string, objects: any, withObjects: boolean): Promise<any[] | string[]> {
    const arr = await objects.getObjectListAsync({
        startkey: `system.adapter.${adapter}.`,
        endkey: `system.adapter.${adapter}.\u9999`
    });
    const instances = [];
    if (arr && arr.rows) {
        for (let i = 0; i < arr.rows.length; i++) {
            if (arr.rows[i].value.type !== 'instance') {
                continue;
            }
            if (withObjects) {
                instances.push(arr.rows[i].value);
            } else {
                instances.push(arr.rows[i].value._id);
            }
        }
    }

    return instances;
}

/**
 * Executes a command asynchronously. On success, the promise resolves with stdout and stderr.
 * On error, the promise rejects with the exit code or signal, as well as stdout and stderr.
 * @param command The command to execute
 * @param execOptions The options for child_process.exec
 * @returns child process promise
 */
export function execAsync(command: string, execOptions?: ExecOptions): ChildProcessPromise {
    const defaultOptions = {
        // we do not want to show the node.js window on Windows
        windowsHide: true,
        // And we want to capture stdout/stderr
        encoding: 'utf8'
    };

    return cpExecAsync(command, { ...defaultOptions, ...execOptions });
}

/**
 * Takes input from one stream and writes it to another as soon as a complete line was read.
 * @param input The stream to read from
 * @param output The stream to write into
 */
export function pipeLinewise(input: NodeJS.ReadableStream, output: NodeJS.WritableStream): void {
    const rl = createInterface({
        input,
        crlfDelay: Infinity
    });
    rl.on('line', line => {
        try {
            output.write(line + os.EOL);
        } catch {
            // ignore
        }
    });
    rl.on('error', () => {
        /** Ignore Errors */
    });
}

/**
 * Find the adapter main file as full path
 *
 * @memberof tools
 * @param adapter - adapter name of the adapter, e.g. hm-rpc
 * @returns full file name
 */
export async function resolveAdapterMainFile(adapter: string): Promise<string> {
    const adapterDir = getAdapterDir(adapter);
    if (!adapterDir) {
        throw new Error(`Could not find adapter dir of ${adapter}`);
    }

    const possibleMainFiles = ['main.js', `${adapter}.js`];

    // Add package.json -> main as the 2nd choice
    try {
        const pack = JSON.parse(await fs.readFile(path.join(adapterDir, 'package.json'), 'utf8'));
        if (pack && typeof pack.main === 'string') {
            possibleMainFiles.unshift(pack.main);
        }
    } catch {
        // Ignore, we have fallback solutions
    }

    // Add io-package.json -> common.main as the preferred choice
    try {
        const ioPack = JSON.parse(await fs.readFile(path.join(adapterDir, 'io-package.json'), 'utf8'));
        if (ioPack && ioPack.common && typeof ioPack.common.main === 'string') {
            possibleMainFiles.unshift(ioPack.common.main);
        }
    } catch {
        // Ignore, we have fallback solutions
    }

    // Try all possible main files
    for (const mainFile of possibleMainFiles) {
        const fullFileName = path.join(adapterDir, mainFile);
        if (await fs.pathExists(fullFileName)) {
            return fullFileName;
        }
    }

    throw new Error(`Could not find main file of ${adapter}`);
}

/**
 * Returns the default nodeArgs required to execute the main file, e.g. transpile hooks for TypeScript
 * @param mainFile
 * @returns default node args for cli
 */
export function getDefaultNodeArgs(mainFile: string): string[] {
    if (mainFile.endsWith('.ts')) {
        return ['-r', '@alcalzone/esbuild-register'];
    }
    return [];
}

/** This is used for the short github URL format that NPM accepts (<githubname>/<githubrepo>[#<commit-ish>]) */
const shortGithubUrlRegex = /^(?<user>[^/]+)\/(?<repo>[^#]+)(?:#(?<commit>.+))?$/;

/**
 * Tests if the given URL matches the format <githubname>/<githubrepo>[#<commit-ish>]
 * @param url The URL to parse
 */
export function isShortGithubUrl(url: string): boolean {
    return shortGithubUrlRegex.test(url);
}

export interface ParsedGithubUrl {
    user: string;
    repo: string;
    commit?: string;
}

/**
 * Tries to parse an URL in the format <githubname>/<githubrepo>[#<commit-ish>] into its separate parts
 * @param url The URL to parse
 */
export function parseShortGithubUrl(url: string): ParsedGithubUrl | null {
    const match = shortGithubUrlRegex.exec(url);
    if (!match || !match.groups) {
        return null;
    }
    return {
        user: match.groups.user,
        repo: match.groups.repo,
        commit: match.groups.commit
    };
}

/** This is used to parse the pathname of a github URL */
const githubPathnameRegex =
    /^\/(?<user>[^/]+)\/(?<repo>[^/]*?)(?:\.git)?(?:\/(?:tree|tarball|archive)\/(?<commit>.*?)(?:\.(?:zip|gz|tar\.gz))?)?$/;

/**
 * Tests if the given pathname matches the format /<githubname>/<githubrepo>[.git][/<tarball|tree|archive>/<commit-ish>[.zip|.gz]]
 * @param pathname The pathname part of a Github URL
 */
export function isGithubPathname(pathname: string): boolean {
    return githubPathnameRegex.test(pathname);
}

/**
 * Tries to a github pathname format /<githubname>/<githubrepo>[.git][/<tarball|tree|archive>/<commit-ish>[.zip|.gz|.tar.gz]] into its separate parts
 * @param pathname The pathname part of a Github URL
 */
export function parseGithubPathname(pathname: string): ParsedGithubUrl | null {
    const match = githubPathnameRegex.exec(pathname);
    if (!match || !match.groups) {
        return null;
    }
    return {
        user: match.groups.user,
        repo: match.groups.repo,
        commit: match.groups.commit
    };
}

/**
 * Removes properties which are given by preserve
 * @param preserve - object which has true entries (or array of selected attributes) for all attributes which should be removed from currObj
 * @param oldObj - old object
 * @param newObj - new object
 */
export function removePreservedProperties(
    preserve: Record<string, any>,
    oldObj: Record<string, any>,
    newObj: Record<string, any>
): void {
    for (const prop of Object.keys(preserve)) {
        if (isObject(preserve[prop]) && isObject(newObj[prop])) {
            // we have to go one step deeper
            removePreservedProperties(preserve[prop], oldObj[prop], newObj[prop]);
        } else if (newObj && newObj[prop] !== undefined && oldObj && oldObj[prop] !== undefined) {
            // we only need to remove something if its in the old object and in the new one
            if (typeof preserve[prop] === 'boolean') {
                delete newObj[prop];
            } else if (Array.isArray(preserve[prop])) {
                // array, only rm selected subattributes instead of whole attribute
                for (const rmProp of preserve[prop]) {
                    if (oldObj[prop][rmProp] !== undefined && newObj[prop][rmProp] !== undefined) {
                        // only delete if conflicting
                        delete newObj[prop][rmProp];
                    }
                }
            }
        }
    }
}

/**
 * Returns the array of system.adapter.<namespace>.* objects which are created for every instance
 *
 * @param namespace - adapter namespace + id, e.g. hm-rpc.0
 * @param createWakeup - indicator to create wakeup object too
 */
export function getInstanceIndicatorObjects(namespace: string, createWakeup: boolean): ioBroker.StateObject[] {
    const id = `system.adapter.${namespace}`;
    const objs: ioBroker.StateObject[] = [
        {
            _id: `${id}.alive`,
            type: 'state',
            common: {
                name: `${namespace} alive`,
                type: 'boolean',
                read: true,
                write: true,
                role: 'indicator.state'
            },
            native: {}
        },
        {
            _id: `${id}.connected`,
            type: 'state',
            common: {
                name: `${namespace} is connected`,
                type: 'boolean',
                read: true,
                write: false,
                role: 'indicator.state'
            },
            native: {}
        },
        {
            _id: `${id}.compactMode`,
            type: 'state',
            common: {
                name: `${namespace}.compactMode`,
                type: 'boolean',
                read: true,
                write: false,
                role: 'indicator.state'
            },
            native: {}
        },
        {
            _id: `${id}.cpu`,
            type: 'state',
            common: {
                name: `${namespace}.cpu`,
                type: 'number',
                read: true,
                write: false,
                role: 'indicator.state',
                unit: '% of one core'
            },
            native: {}
        },
        {
            _id: `${id}.cputime`,
            type: 'state',
            common: {
                name: namespace + '.cputime',
                type: 'number',
                read: true,
                write: false,
                role: 'indicator.state',
                unit: 'seconds'
            },
            native: {}
        },
        {
            _id: `${id}.memHeapUsed`,
            type: 'state',
            common: {
                name: `${namespace} heap actually Used`,
                type: 'number',
                read: true,
                write: false,
                role: 'indicator.state',
                unit: 'MB'
            },
            native: {}
        },
        {
            _id: `${id}.memHeapTotal`,
            type: 'state',
            common: {
                name: `${namespace} total Size of the Heap`,
                read: true,
                write: false,
                type: 'number',
                role: 'indicator.state',
                unit: 'MB'
            },
            native: {}
        },
        {
            _id: `${id}.memRss`,
            type: 'state',
            common: {
                name: `${namespace} resident Set Size`,
                desc: 'Resident set size',
                read: true,
                write: false,
                type: 'number',
                role: 'indicator.state',
                unit: 'MB'
            },
            native: {}
        },
        {
            _id: `${id}.uptime`,
            type: 'state',
            common: {
                name: `${namespace} uptime`,
                type: 'number',
                read: true,
                write: false,
                role: 'indicator.state',
                unit: 'seconds'
            },
            native: {}
        },
        {
            _id: `${id}.inputCount`,
            type: 'state',
            common: {
                name: `${namespace} events input counter`,
                desc: "State's inputs in 15 seconds",
                type: 'number',
                read: true,
                write: false,
                role: 'state',
                unit: 'events/15 seconds'
            },
            native: {}
        },
        {
            _id: `${id}.outputCount`,
            type: 'state',
            common: {
                name: `${namespace} events output counter`,
                desc: "State's outputs in 15 seconds",
                type: 'number',
                read: true,
                write: false,
                role: 'state',
                unit: 'events/15 seconds'
            },
            native: {}
        },
        {
            _id: `${id}.eventLoopLag`,
            type: 'state',
            common: {
                name: `${namespace} Node.js event loop lag`,
                desc: 'Node.js event loop lag in ms averaged over 15 seconds',
                type: 'number',
                read: true,
                write: false,
                role: 'state',
                unit: 'ms'
            },
            native: {}
        },
        {
            _id: `${id}.sigKill`,
            type: 'state',
            common: {
                name: `${namespace} kill signal`,
                type: 'number',
                read: true,
                write: false,
                desc: 'Process id that must survive. All other IDs must terminate itself',
                role: 'state'
            },
            native: {}
        },
        {
            _id: `${id}.logLevel`,
            type: 'state',
            common: {
                name: `${namespace} loglevel`,
                type: 'string',
                read: true,
                write: true,
                desc: 'Loglevel of the adapter. Will be set on start with defined value but can be overridden during runtime',
                role: 'state'
            },
            native: {}
        }
    ];

    if (createWakeup) {
        objs.push({
            _id: `${id}.wakeup`,
            type: 'state',
            common: {
                name: `${namespace}.wakeup`,
                read: true,
                write: true,
                type: 'boolean',
                role: 'adapter.wakeup'
            },
            native: {}
        });
    }

    return objs;
}

export type InternalLogger = Omit<ioBroker.Logger, 'level'>;

export function getLogger(log: any): InternalLogger {
    if (!log) {
        log = {
            silly: function (_msg: string) {
                /*console.log(msg);*/
            },
            debug: function (_msg: string) {
                /*console.log(msg);*/
            },
            info: function (_msg: string) {
                /*console.log(msg);*/
            },
            warn: function (msg: string) {
                console.log(msg);
            },
            error: function (msg: string) {
                console.log(msg);
            }
        };
    } else if (!log.silly) {
        log.silly = log.debug;
    }
    return log;
}

export interface OrderedInstancesObject {
    1: ioBroker.InstanceObject[];
    2: ioBroker.InstanceObject[];
    3: ioBroker.InstanceObject[];
    admin: ioBroker.InstanceObject[];
}

/**
 * Get ordered instances according to tier level
 *
 * @param objects - Objects DB
 * @param logger - logger object
 * @param logPrefix prefix for logging
 */
export async function getInstancesOrderedByStartPrio(
    objects: any,
    logger: any,
    logPrefix = ''
): Promise<Record<string, any>[]> {
    const instances: OrderedInstancesObject = { 1: [], 2: [], 3: [], admin: [] };
    const allowedTiers = [1, 2, 3];

    if (logPrefix) {
        // append space if we have a prefix
        logPrefix += ' ';
    }

    let doc: GetObjectViewInstanceResult = { rows: [] };
    try {
        doc = await objects.getObjectViewAsync('system', 'instance', {
            startkey: 'system.adapter.',
            endkey: 'system.adapter.\u9999'
        });
    } catch (e) {
        if (e.message && e.message.startsWith('Cannot find ')) {
            logger.error(`${logPrefix} _design/system missing - call node ${appName}.js setup`);
        } else {
            logger.error(`${logPrefix} Can not get instances: ${e.message}`);
        }
    }

    if (!doc.rows || doc.rows.length === 0) {
        logger.info(`${logPrefix} no instances found`);
    } else {
        for (const row of doc.rows) {
            if (row && row.value) {
                if (row.value._id.startsWith('system.adapter.admin')) {
                    instances.admin.push(row.value);
                    /** @ts-expect-error https://github.com/ioBroker/adapter-core/issues/427 */
                } else if (row.value.common && allowedTiers.includes(parseInt(row.value.common.tier))) {
                    /** @ts-expect-error we have checked that it is in allowedTiers, thus it is valid */
                    instances[row.value.common.tier].push(row.value);
                } else {
                    // no valid tier so put it in the last one
                    instances['3'].push(row.value);
                }
            }
        }
    }

    return [...instances.admin, ...instances['1'], ...instances['2'], ...instances['3']];
}

/**
 * Set capabilities of the given executable on Linux systems
 * @param execPath - path to the executable for node you can determine it via process.execPath
 * @param capabilities - capabilities to set, e.g. ['cap_net_admin', 'cap_net_bind_service']
 * @param modeEffective - add effective mode
 * @param modePermitted - add permitted mode
 * @param modeInherited - add inherited mode
 */
export async function setExecutableCapabilities(
    execPath: string,
    capabilities: string[],
    modeEffective?: boolean,
    modePermitted?: boolean,
    modeInherited?: boolean
): Promise<void> {
    // if not linux do nothing and silently exit
    if (os.platform() !== 'linux') {
        return;
    }

    // if Docker and Admin Capabilities should be set check if we are allowed to do that
    if (isDocker() && capabilities.includes('cap_net_admin')) {
        try {
            const systemCaps = fs.readFileSync(`/proc/${process.pid}/status`, 'utf-8');
            const capBnd = systemCaps.match(/^CapBnd:\s(.+)$/m);
            // We found a value in CapBnd line
            if (capBnd && capBnd[1]) {
                const { stdout } = await execAsync(`capsh --decode=${capBnd[1]}`);
                // Stdout looks like "0x00000000a80425fb=cap_chown,cap_dac_override,..."
                if (typeof stdout === 'string' && stdout.startsWith(`0x${capBnd[1]}=`)) {
                    const capBndArr = stdout.substring(capBnd[1].length + 3).split(',');
                    // if Admin Capability is not included in System Capabilities we remove it from array
                    if (!capBndArr.includes('cap_net_admin')) {
                        capabilities = capabilities.filter(c => c !== 'cap_net_admin');
                    }
                }
            }
        } catch {
            // Ok we could not find it out, so update Caps but better without Admin Capability
            capabilities = capabilities.filter(c => c !== 'cap_net_admin');
        }
    }

    if (capabilities.length) {
        let modes = '';
        const capabilitiesStr = capabilities.join(',');

        if (modeEffective) {
            modes += 'e';
        }

        if (modePermitted) {
            modes += 'p';
        }

        if (modeInherited) {
            modes += 'i';
        }

        if (modes.length) {
            modes = `+${modes}`;
        }

        // if this throws it needs to be caught outside
        await execAsync(`sudo setcap ${capabilitiesStr}${modes} ${execPath}`);
    }
}

/**
 * Requests the licenses from ioBroker.net
 * @param login Login for ioBroker.net
 * @param password Decoded password for ioBroker.net
 * @returns array of all licenses stored on iobroker.net
 */
async function _readLicenses(login: string, password: string): Promise<any[]> {
    const config = {
        headers: { Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}` },
        timeout: 4000
    };

    try {
        const response = await axios.get(`https://iobroker.net:3001/api/v1/licenses`, config);
        if (response.data && response.data.length) {
            const now = Date.now();
            response.data = response.data.filter(
                (license: { validTill: string | number }) =>
                    !license.validTill ||
                    license.validTill === '0000-00-00 00:00:00' ||
                    new Date(license.validTill).getTime() > now
            );
        }

        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error((err.response.data && err.response.data.error) || err.response.data || err.response.status);
        } else if (err.request) {
            throw new Error('no response');
        } else {
            throw err;
        }
    }
}

/**
 * Reads the licenses from iobroker.net
 * Reads the licenses from iobroker.net and if no login/password provided stores it in system.licenses
 * @param objects Object store instance
 * @param login Login for ioBroker.net
 * @param password Decoded password for ioBroker.net
 * @returns array of all licenses stored on iobroker.net
 */
export async function updateLicenses(objects: any, login: string, password: string): Promise<any[]> {
    // if login and password provided in the message, just try to read without saving it in system.licenses
    if (login && password) {
        return _readLicenses(login, password);
    } else {
        // get actual object
        const systemLicenses: ioBroker.Object = await objects.getObjectAsync('system.licenses');
        // If password and login exist
        if (systemLicenses && systemLicenses.native && systemLicenses.native.password && systemLicenses.native.login) {
            try {
                // get the secret to decode the password
                const systemConfig: ioBroker.Object = await objects.getObjectAsync('system.config');

                // decode the password
                let password;
                try {
                    password = decrypt(systemConfig.native.secret, systemLicenses.native.password);
                } catch (err) {
                    throw new Error(`Cannot decode password: ${err.message}`);
                }

                // read licenses from iobroker.net
                const licenses = await _readLicenses(systemLicenses.native.login, password);
                // save licenses to system.licenses and remember the time
                // merge the information together
                const oldLicenses: any[] = systemLicenses.native.licenses || [];
                systemLicenses.native.licenses = licenses;
                oldLicenses.forEach(oldLicense => {
                    if (oldLicense.usedBy) {
                        const newLicense = licenses.find(item => item.json === oldLicense.json);
                        if (newLicense) {
                            newLicense.usedBy = oldLicense.usedBy;
                        }
                    }
                });

                systemLicenses.native.readTime = new Date().toISOString();

                // update read time
                await objects.setObjectAsync('system.licenses', systemLicenses);
                return licenses;
            } catch (err) {
                // if password is invalid
                if (
                    err.message.includes('Authentication required') ||
                    err.message.includes('Cannot decode password:')
                ) {
                    // clear existing licenses if exist
                    if (
                        systemLicenses &&
                        systemLicenses.native &&
                        systemLicenses.native.licenses &&
                        systemLicenses.native.licenses.length
                    ) {
                        systemLicenses.native.licenses = [];
                        systemLicenses.native.readTime = new Date().toISOString();
                        await objects.setObjectAsync('system.licenses', systemLicenses);
                    }
                }

                throw err;
            }
        } else {
            // if password or login are empty => clear existing licenses if exist
            if (
                systemLicenses &&
                systemLicenses.native &&
                systemLicenses.native.licenses &&
                systemLicenses.native.licenses.length
            ) {
                systemLicenses.native.licenses = [];
                systemLicenses.native.readTime = new Date().toISOString();
                await objects.setObjectAsync('system.licenses', systemLicenses);
            }
            throw new Error('No password or login');
        }
    }
}

export interface GZipFileOptions {
    // Delete the input file after compression. Default: false.
    deleteInput?: boolean;
}
/**
 * Compresses an input file using GZip and writes it somewhere else
 * @param inputFilename The filename of the input file that should be gzipped
 * @param outputFilename The filename of the output file where the gzipped content should be written to
 * @param options Options for the compression
 */
export function compressFileGZip(
    inputFilename: string,
    outputFilename: string,
    options: GZipFileOptions = {}
): Promise<void> {
    const { deleteInput = false } = options;

    return new Promise((resolve, reject) => {
        const input = fs.createReadStream(inputFilename);
        const output = fs.createWriteStream(outputFilename);
        const compress = zlib.createGzip();
        input.on('error', err => {
            reject(err);
        });
        output.on('error', err => {
            reject(err);
        });
        compress.on('error', err => {
            reject(err);
        });
        output.on('close', () => {
            if (deleteInput) {
                try {
                    fs.unlinkSync(inputFilename);
                } catch {
                    // Ignore
                }
            }
            resolve();
        });

        input.pipe(compress).pipe(output);
    });
}

export interface DataDirValidation {
    /** if data directory is valid */
    valid: boolean;
    /** absolute path it resolves too */
    path: string;
    /** reason of rejection */
    reason: string;
}

/**
 * Validate if the dir, is a valid dataDir
 * Data dirs in node_modules are not allowed, note that dataDirs are relative to js-controller dir or absolute
 *
 * @param dataDir dataDir to check
 */
export function validateDataDir(dataDir: string): DataDirValidation {
    if (!path.isAbsolute(dataDir)) {
        dataDir = path.normalize(path.join(getControllerDir(), dataDir));
    }

    const pathParts = dataDir.split(path.sep);

    const isValid = !pathParts.includes('node_modules');

    return {
        valid: isValid,
        path: dataDir,
        reason: isValid ? 'Valid data directory' : 'Data directory is not allowed to point into node_modules folder'
    };
}

/**
 * If an array is passed it will be stringified, else the parameter is returned
 * @param maybeArr parameter which will be stringified if it is an array
 */
export function maybeArrayToString<T>(maybeArr: T): T extends any[] ? string : T {
    if (Array.isArray(maybeArr)) {
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/33912
        return JSON.stringify(maybeArr);
    }

    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/33912
    return maybeArr;
}

export * from './maybeCallback';
