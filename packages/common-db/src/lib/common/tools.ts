import fs from 'fs-extra';
import path from 'node:path';
import semver from 'semver';
import os from 'node:os';
import forge from 'node-forge';
import deepClone from 'deep-clone';
import { type ChildProcessPromise, exec as cpExecAsync } from 'promisify-child-process';
import { createInterface } from 'node:readline';
import { PassThrough } from 'node:stream';
import type { CommandResult, InstallOptions, PackageManager } from '@alcalzone/pak';
import { detectPackageManager, packageManagers } from '@alcalzone/pak';
import { EXIT_CODES } from '@/lib/common/exitCodes.js';
import zlib from 'node:zlib';
import { password } from '@/lib/common/password.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import crypto from 'node:crypto';
import type { ExecOptions } from 'node:child_process';
import { exec } from 'node:child_process';
import { URLSearchParams } from 'node:url';
import events from 'node:events';
import { maybeCallbackWithError } from '@/lib/common/maybeCallback.js';
// @ts-expect-error has no types
import extend from 'node.extend';
import { setDefaultResultOrder } from 'node:dns';
import {
    applyAliasAutoScaling,
    applyAliasConvenienceConversion,
    applyAliasTransformer,
} from '@/lib/common/aliasProcessing.js';
import type * as DiskUsage from 'diskusage';
import * as url from 'node:url';
import { createRequire } from 'node:module';
import type { WithRequired } from '@iobroker/types-dev';

// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));
// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

type DockerInformation =
    | {
          /** If it is a Docker installation */
          isDocker: boolean;
          /** If it is the official Docker image */
          isOfficial: true;
          /** Semver string for official Docker image */
          officialVersion: string;
      }
    | {
          /** If it is a Docker installation */
          isDocker: boolean;
          /** If it is the official Docker image */
          isOfficial: false;
      };

export interface HostInfo {
    /** Converted OS for human readability */
    Platform: NodeJS.Platform | 'docker' | 'Windows' | 'OSX';
    /** The underlying OS */
    os: NodeJS.Platform;
    /** Information about the docker installation */
    dockerInformation?: DockerInformation;
    /** Host architecture */
    Architecture: string;
    /** Number of CPUs */
    CPUs: number | null;
    /** CPU speed */
    Speed: number | null;
    /** CPU model */
    Model: string | null;
    /** Total RAM of host */
    RAM: number;
    /** System uptime in seconds */
    'System uptime': number;
    /** Node.JS version */
    'Node.js': string;
    /** Current time to compare to local time */
    time: number;
    /** Timezone offset to compare to local time */
    timeOffset: number;
    /** Number of available adapters */
    'adapters count': number;
    /** NPM version */
    NPM: string;
}

interface FormatAliasValueOptions {
    /** Common attribute of a source object */
    sourceCommon?: Partial<ioBroker.StateCommon>;
    /** Common attribute of a target object */
    targetCommon?: Partial<ioBroker.StateCommon>;
    /** State to format */
    state: ioBroker.State | null | undefined;
    /** Logger used for logging */
    logger: any;
    /** Prefix for log messages */
    logNamespace: string;
    /** Id of the source object, used for logging */
    sourceId?: string;
    /** Id of the target object, used for logging */
    targetId?: string;
}

/**
 * Response from DOCKER_INFO_URL
 */
interface DockerHubResponse {
    /** Results, filtered to one entry */
    results: [
        {
            /** Contains the version like v1.5.3 */
            name: string;
            /** Timestamp of last update of this image, like 2024-08-29T01:26:32.378554Z */
            last_updated: string;
            [other: string]: unknown;
        },
    ];
    [other: string]: unknown;
}

export interface DockerImageInformation {
    /** The official version like v10.0.0 */
    version: string;
    /** Time of last image update */
    lastUpdated: string;
    /** If the version is newer than the one currently running */
    isNew: boolean;
}

export enum ERRORS {
    ERROR_NOT_FOUND = 'Not exists',
    ERROR_EMPTY_OBJECT = 'null object',
    ERROR_NO_OBJECT = 'no object',
    ERROR_DB_CLOSED = 'DB closed',
}

events.EventEmitter.prototype.setMaxListeners(100);
let npmVersion: string;
let diskusage: typeof DiskUsage;

const randomID = Math.round(Math.random() * 10_000_000_000_000); // Used for creation of User-Agent
const VENDOR_FILE = '/etc/iob-vendor.json';
/** This file contains the version string in an official docker image */
const OFFICIAL_DOCKER_FILE = '/opt/scripts/.docker_config/.thisisdocker';
/** URL to fetch information of the latest docker image */
const DOCKER_INFO_URL = 'https://hub.docker.com/v2/namespaces/iobroker/repositories/iobroker/tags?page_size=1';
/** Time the image approx. needs to be built and published to DockerHub */
const DOCKER_HUB_BUILD_TIME_MS = 6 * 60 * 60 * 1_000;
/** Version of official Docker image which started to support UI upgrade */
const DOCKER_VERSION_UI_UPGRADE = '8.1.0';

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
 * recursively copy values from an old object to new one
 *
 * @param oldObj source object
 * @param newObj destination object
 * @param originalObj optional object for read __no_change__ values
 * @param isNonEdit optional indicator if copy is in nonEdit part
 */
export function copyAttributes(
    oldObj: Record<string, any>,
    newObj: Record<string, any>,
    originalObj?: Record<string, any>,
    isNonEdit?: boolean,
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
                isNonEdit || attr === 'nonEdit',
            );
        }
    }
}

/**
 * Checks the flag nonEdit and restores non-changeable values if required
 *
 * @param oldObject source object
 * @param newObject destination object
 */
export function checkNonEditable(
    oldObject: ioBroker.SettableObject | null,
    newObject: ioBroker.SettableObject,
): boolean {
    if (!oldObject) {
        return true;
    }
    if (!oldObject.nonEdit && !newObject.nonEdit) {
        return true;
    }

    // if nonEdit is protected with password
    if (oldObject.nonEdit?.passHash) {
        // If new Object wants to update the nonEdit information
        if (newObject.nonEdit?.password) {
            const hash = crypto.createHash('sha256').update(newObject.nonEdit.password.toString()).digest('base64');
            if (oldObject.nonEdit.passHash !== hash) {
                delete newObject.nonEdit;
                return false;
            }
            oldObject.nonEdit = deepClone(newObject.nonEdit);
            delete oldObject.nonEdit.password;
            delete newObject.nonEdit.password;
            oldObject.nonEdit.passHash = hash;
            newObject.nonEdit.passHash = hash;

            copyAttributes(newObject.nonEdit, newObject, newObject);

            if (newObject.nonEdit.passHash) {
                delete newObject.nonEdit.passHash;
            }
            if (newObject.nonEdit?.password) {
                delete newObject.nonEdit.password;
            }

            return true;
        }
        newObject.nonEdit = oldObject.nonEdit;
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
    copyAttributes(oldObject.nonEdit!, newObject, oldObject);

    if (newObject.nonEdit?.passHash) {
        delete newObject.nonEdit.passHash;
    }
    if (newObject.nonEdit?.password) {
        delete newObject.nonEdit.password;
    }
    return true;
}

/**
 * Checks if a version is up-to-date, throws error on invalid version strings
 *
 * @param repoVersion version in repository
 * @param installedVersion the current installed version
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
            console.error(`Cannot decode secret: ${error.message}`);
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
 * @returns true if only one host object exists
 */
export async function isSingleHost(objects: any): Promise<boolean> {
    const res: { rows: ioBroker.GetObjectListItem<ioBroker.HostObject>[] } = await objects.getObjectList({
        startkey: 'system.host.',
        endkey: 'system.host.\u9999',
    });
    const hostObjs = res.rows.filter(obj => obj.value && obj.value.type === 'host');
    return hostObjs.length <= 1; // on setup no host object is there yet
}

/**
 * Checks if at least one host is running in a Multihost environment
 *
 * @param objects the objects db
 * @param states the states db
 * @returns true if one or more hosts running else false
 */
export async function isHostRunning(objects: any, states: any): Promise<boolean> {
    // do it without an object view for now, TODO: can be reverted if no one downgrades to < 4 (redis-sets)
    // const res = await objects.getObjectViewAsync('system', 'host', { startkey: '', endkey: '\u9999' });
    const res: GetObjectViewResult = await objects.getObjectList({
        startkey: 'system.host.',
        endkey: 'system.host.\u9999',
    });

    // TODO: this check should be redundant as soon as we go back to the object view approach
    res.rows = res.rows.filter(obj => obj.value?.type === 'host');

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
 */
export function isDevInstallation(): boolean {
    return fs.pathExistsSync(`${getControllerDir()}/../../packages/controller`);
}

/** In dev installations with uppercase B to match GitHub repo name - try to get rid of it in the long run */
type AppName = 'iobroker' | 'ioBroker';

/**
 * Get the app name either for prod or for dev installation
 */
function getAppName(): AppName {
    if (isDevInstallation()) {
        // dev install - GitHub folder is uppercase
        return 'ioBroker';
    }

    return 'iobroker';
}

export const appNameLowerCase = 'iobroker';
export const appName = getAppName();

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

function findPath(path: string, url: string): string {
    if (!url) {
        return '';
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return (path + url).replace(/\/\//g, '/').replace('http:/', 'http://').replace('https:/', 'https://');
    }
    if (url[0] === '/') {
        return `${thisDir}/..${url}`;
    }
    return `${thisDir}/../${path}${url}`;
}

/**
 * Get MAC address of this host
 */
async function getMac(): Promise<string> {
    const macRegex = /(?:[a-z0-9]{2}[:-]){5}[a-z0-9]{2}/gi;
    const zeroRegex = /(?:[0]{2}[:-]){5}[0]{2}/;
    const command = process.platform.indexOf('win') === 0 ? 'getmac' : 'ifconfig || ip link';

    const { stdout, stderr } = await execAsync(command);

    if (typeof stderr === 'string') {
        throw new Error(stderr);
    }

    if (typeof stdout !== 'string') {
        throw new Error(`Unexpected stdout: ${stdout?.toString()}`);
    }

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
        throw new Error(`Could not determine the mac address from:\n${stdout}`);
    }

    return result.replace(/-/g, ':').toLowerCase();
}

/**
 * Fetch the image information of the newest available (official) ioBroker Docker image from DockerHub
 */
export async function getNewestDockerImageVersion(): Promise<DockerImageInformation> {
    const res = await axios.get<DockerHubResponse>(DOCKER_INFO_URL);

    const dockerResult = res.data.results[0];
    const isNew =
        new Date(dockerResult.last_updated).getTime() >
        new Date(process.env.BUILD).getTime() + DOCKER_HUB_BUILD_TIME_MS;

    return { version: dockerResult.name, lastUpdated: dockerResult.last_updated, isNew };
}

/**
 * Get information of a Docker installation
 */
export function getDockerInformation(): DockerInformation {
    try {
        const versionString = fs.readFileSync(OFFICIAL_DOCKER_FILE, { encoding: 'utf-8' }).trim();
        return { isDocker: true, isOfficial: true, officialVersion: versionString };
    } catch {
        // ignore error
    }

    return { isDocker: isDocker(), isOfficial: false };
}

/**
 * Controller UI upgrade is not supported on Windows and MacOS
 */
export function isControllerUiUpgradeSupported(): boolean {
    const dockerInfo = getDockerInformation();

    if (dockerInfo.isDocker) {
        if (!dockerInfo.isOfficial) {
            return false;
        }

        if (
            !semver.valid(dockerInfo.officialVersion) ||
            semver.lt(dockerInfo.officialVersion, DOCKER_VERSION_UI_UPGRADE)
        ) {
            return false;
        }

        return true;
    }

    return !['win32', 'darwin'].includes(os.platform());
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
        // ioBroker docker image specific, will be created during a build process
        fs.statSync(OFFICIAL_DOCKER_FILE);
        return true;
    } catch {
        // ignore error
    }

    try {
        // check a docker group, works in most cases, but not on arm
        return fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
    } catch {
        return false;
    }
}

/**
 * Build unique uuid based on MAC address if possible
 *
 * @param givenMac the given MAC address
 */
async function uuid(givenMac?: string): Promise<string> {
    givenMac = givenMac ?? '';
    const _isDocker = isDocker();

    // return constant UUID for all CI environments to keep the statistics clean
    if (require('ci-info').isCI) {
        return '55travis-pipe-line-cior-githubaction';
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
        const mac = await getMac();
        return uuid(mac);
    }

    if (!_isDocker && mac) {
        const md5sum = crypto.createHash('md5');
        md5sum.update(mac);
        mac = md5sum.digest('hex');
        u = `${mac.substring(0, 8)}-${mac.substring(8, 12)}-${mac.substring(12, 16)}-${mac.substring(16, 20)}-${mac.substring(20)}`;
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

    return u;
}

/**
 * Update the installation UUID
 *
 * @param newUuid the new UUID to set
 * @param _objects the objects DB instance
 */
async function updateUuid(newUuid: string, _objects: any): Promise<string> {
    let _uuid = await uuid('');
    _uuid = newUuid || _uuid;
    // Add vendor prefix to UUID
    if (fs.existsSync(VENDOR_FILE)) {
        try {
            const vendor = await fs.readJSON(VENDOR_FILE);
            if (vendor.vendor?.uuidPrefix?.length === 2 && !_uuid.startsWith(vendor.vendor.uuidPrefix)) {
                _uuid = vendor.vendor.uuidPrefix + _uuid;
            }
        } catch {
            console.error(`Cannot parse ${VENDOR_FILE}`);
        }
    }

    try {
        await _objects.setObject('system.meta.uuid', {
            type: 'meta',
            common: {
                name: 'uuid',
                type: 'uuid',
            },
            ts: new Date().getTime(),
            from: `system.host.${getHostName()}.tools`,
            native: {
                uuid: _uuid,
            },
        });
    } catch (e) {
        throw new Error(`Object system.meta.uuid cannot be updated: ${e.message}`);
    }

    const obj: ioBroker.Object = await _objects.getObject('system.meta.uuid');

    if (obj.native.uuid !== _uuid) {
        console.error('object system.meta.uuid cannot be updated: write protected');
    } else {
        console.log(`object system.meta.uuid created: ${_uuid}`);
    }

    return _uuid;
}

/**
 * Generates a new uuid if non-existing
 *
 * @param objects - objects DB
 * @returns uuid if successfully created/updated
 */
export async function createUuid(objects: any): Promise<void | string> {
    const userObj: ioBroker.UserObject = await objects.getObject('system.user.admin');
    if (!userObj) {
        await new Promise<void>(resolve => {
            // Default Password for user 'admin' is application name in lower case
            password(appName).hash(null, null, async (err, res) => {
                err && console.error(err);

                // Create user here and not in io-package.js because of hash password
                await objects.setObject('system.user.admin', {
                    type: 'user',
                    common: {
                        name: 'admin',
                        password: res,
                        dontDelete: true,
                        enabled: true,
                    },
                    ts: new Date().getTime(),
                    from: `system.host.${getHostName()}.tools`,
                    native: {},
                });

                console.log('object system.user.admin created');
                resolve();
            });
        });
    }

    const obj: ioBroker.Object = await objects.getObject('system.meta.uuid');
    if (!obj?.native?.uuid) {
        // generate new UUID
        return updateUuid('', objects);
    }

    const PROBLEM_UUIDS = [
        'ab265f4a-67f9-a46a-c0b2-61e4b95cefe5',
        '7abd3182-d399-f7bd-da19-9550d8babede',
        'deb6f2a8-fe69-5491-0a50-a9f9b8f3419c',
        'ec66c85e-fc36-f6f9-f1c9-f5a2882d23c7',
        'e6203b03-f5f4-253a-e4f6-b295fc543ab7',
        'd659fa3d-7ef9-202a-ea23-acd0aff67b24',
    ];

    // check if COMMON invalid docker uuid
    if (!PROBLEM_UUIDS.includes(obj.native.uuid)) {
        return;
    }

    // Read vis license
    const licObj: ioBroker.Object = objects.getObject('system.adapter.vis.0');
    if (!licObj || !licObj.native || !licObj.native.license) {
        return updateUuid('', objects);
    }
    // decode obj.native.license
    let data;
    try {
        data = jwt.decode(licObj.native.license);
    } catch {
        data = null;
    }

    if (!data || typeof data === 'string' || !data.uuid) {
        // generate new UUID
        return updateUuid('', objects);
    }
    if (data.uuid !== obj.native.uuid) {
        return updateUuid(data.correct ? data.uuid : '', objects);
    }
    // Show error
    console.warn(`Your iobroker.vis license must be updated. Please contact info@iobroker.net to get a new license!`);
    console.warn(`Provide following information in email: ${data.email}, invoice: ${data.invoice}`);
}

/**
 * Download file to tmp or return file name directly
 *
 * @param urlOrPath
 * @param fileName
 * @param callback
 */
export async function getFile(urlOrPath: string, fileName: string, callback: (file?: string) => void): Promise<void> {
    // If object was read
    if (
        urlOrPath.substring(0, 'http://'.length) === 'http://' ||
        urlOrPath.substring(0, 'https://'.length) === 'https://'
    ) {
        const tmpFile = `${thisDir}/../tmp/${fileName || `${Math.floor(Math.random() * 0xffffffe)}.zip`}`;

        try {
            // Add some information to user-agent, like chrome, IE and Firefox do
            const res = await axios.get(urlOrPath, {
                responseType: 'stream',
                headers: {
                    'User-Agent': `${appName}, RND: ${randomID}, N: ${process.version}`,
                    'Accept-Encoding': 'gzip',
                },
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
            } else if (fs.existsSync(`${thisDir}/../${urlOrPath}`)) {
                callback && callback(`${thisDir}/../${urlOrPath}`);
            } else if (fs.existsSync(`${thisDir}/../tmp/${urlOrPath}`)) {
                callback && callback(`${thisDir}/../tmp/${urlOrPath}`);
            } else {
                console.log(`File not found: ${urlOrPath}`);
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
    callback: (sources?: Record<string, any> | null, urlOrPath?: string | null) => void,
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
                    headers: { 'Accept-Encoding': 'gzip', timeout: 10000, 'User-Agent': agent },
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
            } else if (fs.existsSync(`${thisDir}/../${urlOrPath}`)) {
                try {
                    sources = fs.readJSONSync(`${thisDir}/../${urlOrPath}`);
                } catch (e) {
                    console.log(`Cannot parse json file from ${thisDir}/../${urlOrPath}. Error: ${e.message}`);
                    if (callback) {
                        callback(null, urlOrPath);
                    }
                    return;
                }
                if (callback) {
                    callback(sources, urlOrPath);
                }
            } else if (fs.existsSync(`${thisDir}/../tmp/${urlOrPath}`)) {
                try {
                    sources = fs.readJSONSync(`${thisDir}/../tmp/${urlOrPath}`);
                } catch (e) {
                    console.log(`Cannot parse json file from ${thisDir}/../tmp/${urlOrPath}. Error: ${e.message}`);
                    if (callback) {
                        callback(null, urlOrPath);
                    }
                    return;
                }
                if (callback) {
                    callback(sources, urlOrPath);
                }
            } else {
                if (callback) {
                    callback(null, urlOrPath);
                }
            }
        }
    }
}

/**
 * Return content of the json file. Download it or read directly
 *
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
    }
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
        try {
            const result = await axios(urlOrPath, {
                timeout: 10000,
                headers: { 'User-Agent': agent },
                validateStatus: status => status !== 200,
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
        } else if (fs.existsSync(`${thisDir}/../${urlOrPath}`)) {
            try {
                sources = fs.readJSONSync(`${thisDir}/../${urlOrPath}`);
            } catch (e) {
                console.warn(`Cannot parse json file from ${thisDir}/../${urlOrPath}. Error: ${e.message}`);
                return null;
            }
            return sources;
        } else if (fs.existsSync(`${thisDir}/../tmp/${urlOrPath}`)) {
            try {
                sources = fs.readJSONSync(`${thisDir}/../tmp/${urlOrPath}`);
            } catch (e) {
                console.log(`Cannot parse json file from ${thisDir}/../tmp/${urlOrPath}. Error: ${e.message}`);
                return null;
            }
            return sources;
        }
        return null;
    }
}

/**
 * Scans directory for adapters and adds information to list
 *
 * @param dirName name of the directory to scan
 * @param list prefilled list to extend adapters too
 * @param regExp regexp to check matching files
 */
function scanDirectory(dirName: string, list: Record<string, AdapterInformation>, regExp: RegExp): void {
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
                        licenseUrl: package_.licenses && package_.licenses.length ? package_.licenses[0].url : '',
                    };
                }
            } catch (e) {
                console.log(`Cannot read or parse ${thisDir}/../node_modules/${dirs[i]}/io-package.json: ${e.message}`);
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

export interface AdapterInformation {
    /** this flag is only true for the js-controller */
    controller: boolean;
    /** adapter version */
    version: string;
    /** path to icon of the adapter */
    icon: string;
    /** path to local icon of the adater */
    localIcon?: string;
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
    /** The installed adapter version, not existing on controller */
    runningVersion?: string;
    /** type of the adapter */
    type: string;
    /** license of the adapter */
    license: string;
    /** url to license information */
    licenseUrl?: string;
}

/**
 * Get a list of all installed adapters and controller version on this host
 *
 * @param hostRunningVersion Version of the running js-controller, will be included in the returned information if provided
 * @returns object containing information about installed host
 */
export function getInstalledInfo(hostRunningVersion?: string): Record<string, AdapterInformation> {
    const result: Record<string, AdapterInformation> = {};
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
        // Add controller information
        result[ioPackage.common.name] = {
            controller: true,
            type: ioPackage.common.type,
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
            licenseUrl: package_.licenses && package_.licenses.length ? package_.licenses[0].url : '',
        };
    }

    // collect adapter information
    scanDirectory(path.join(fullPath, 'node_modules'), result, regExp);
    scanDirectory(path.join(fullPath, '..'), result, regExp);

    return result;
}

/**
 * Reads an adapter's npm version
 *
 * @param adapter The adapter to read the npm version from. Null for the root ioBroker packet
 * @param callback
 */
function getNpmVersion(adapter: string, callback?: (err: Error | null, version?: string | null) => void): void {
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
    callback: (sources: Record<string, any>, name: string) => void,
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
                    // If installed from git or something else,
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
    callback?: (err?: Error, sources?: Record<string, any>) => void,
): void {
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
    callback: (err?: null | Error, sources?: Record<string, any> | null, hash?: string | number) => void,
): Promise<void> {
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
 * Get a list of all adapters and controller in some repository file or in /conf/source-dist.json
 *
 * @param urlOrPath URL starting with http:// or https:// or local file link
 * @param additionalInfo destination object
 * @param callback function (err, sources, actualHash) { }
 */
export function getRepositoryFile(
    urlOrPath: string,
    additionalInfo: Record<string, any>,
    callback: (err?: Error | null, sources?: Record<string, any>, actualHash?: string | number) => void,
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
        _path = `${parts.splice(0, parts.length - 1).join('/')}/`;
    }

    // If an object was read
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
                            }),
                        );
                    } else {
                        // return cached sources, because no sources found
                        console.log(
                            `failed to download new sources, ${
                                additionalInfo.sources ? 'use cached sources' : 'no cached sources available'
                            }`,
                        );
                        return maybeCallbackWithError(
                            callback,
                            `Cannot read "${urlOrPath}"`,
                            additionalInfo.sources,
                            '',
                        );
                    }
                });
            }
        });
    }
}

export interface RepositoryFile {
    json: ioBroker.RepositoryJson;
    changed: boolean;
    hash: string;
}

/**
 * Read on repository
 *
 * @param url URL starting with http:// or https:// or local file link
 * @param hash actual hash
 * @param force Force repository update despite on hash
 * @param _actualRepo Actual repository JSON content
 */
export async function getRepositoryFileAsync(
    url: string,
    hash?: string,
    force?: boolean,
    _actualRepo?: ioBroker.RepositoryJson | null,
): Promise<RepositoryFile> {
    let _hash;
    let data;

    if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
            _hash = await axios({ url: url.replace(/\.json$/, '-hash.json'), timeout: 10_000 });
        } catch {
            // ignore missing hash file
        }

        if (_actualRepo && !force && hash && _hash?.data && _hash.data.hash === hash) {
            data = _actualRepo;
        } else {
            const agent = `${appName}, RND: ${randomID}, Node:${process.version}, V:${
                require('@iobroker/js-controller-common/package.json').version
            }`;
            try {
                data = await axios({
                    url,
                    timeout: 10_000,
                    headers: { 'User-Agent': agent },
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
        changed: _hash?.data ? hash !== _hash.data.hash : true,
        hash: _hash && _hash.data ? _hash.data.hash : '',
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
        timeout: 4000,
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
 * @param adapter name of the adapter, e.g., hm-rpc
 * @returns path to adapter directory or null if no directory found
 */
export function getAdapterDir(adapter: string): string | null {
    // snip off 'iobroker.'
    if (adapter.toLowerCase().startsWith(`${appNameLowerCase}.`)) {
        adapter = adapter.substring(appName.length + 1);
    }
    // snip off instance id
    if (/\.\d+$/.test(adapter)) {
        adapter = adapter.slice(0, adapter.lastIndexOf('.'));
    }

    const possibilities = [`${appName.toLowerCase()}.${adapter}/package.json`, `${appName}.${adapter}/package.json`];

    let adapterPath;
    for (const possibility of possibilities) {
        // special case to not read adapters from js-controller/node_module/adapter and check first in parent directory
        if (fs.existsSync(path.join(getControllerDir(), '..', possibility))) {
            adapterPath = path.join(getControllerDir(), '..', possibility);
        } else if (fs.existsSync(path.join(getControllerDir(), 'node_modules', possibility))) {
            adapterPath = path.join(getControllerDir(), 'node_modules', possibility);
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
    }
    const parts = path.normalize(adapterPath).split(/[\\/]/g);
    parts.pop();
    return parts.join('/');
}

/**
 * Returns the hostname of this host
 */
export function getHostName(): string {
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
 * @param callback return result
 *        <pre><code>
 *            function (err, version) {
 *              adapter.log.debug('NPM version is: ' + version);
 *            }
 *        </code></pre>
 */
function getSystemNpmVersion(callback?: (err?: Error, version?: string | null) => void): void {
    const { exec } = require('node:child_process');

    // remove local node_modules\.bin dir from a path
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
        }, 10_000);

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
            },
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
 *
 * Figure out which package manager is in charge, but with a fallback to npm.
 *
 * @param cwd Which directory to work in. If none is given, this defaults to ioBroker's root directory.
 */
export async function detectPackageManagerWithFallback(cwd?: string): Promise<PackageManager> {
    try {
        // For the first attempt, use pak's default of requiring a lockfile. This makes sure we find ioBroker's root dir
        return await detectPackageManager(
            typeof cwd === 'string'
                ? // If a cwd was provided, use it
                  { cwd }
                : // Otherwise, try to find the ioBroker root dir
                  {
                      cwd: (isDevServerInstallation() && require.main?.path) || thisDir,
                      setCwdToPackageRoot: true,
                  },
        );
    } catch {
        // Lockfile is not found, use default to avoid picking up a wrong package manager
        // like a globally installed yarn
    }

    // Since we have no lockfile to rely on, assume the root dir is 2 levels above js-controller
    const ioBrokerRootDir = getRootDir();
    // And fallback to npm
    const pak = new packageManagers.npm();
    pak.cwd = cwd || ioBrokerRootDir;
    return pak;
}

/**
 * Installs a node module using npm or a similar package manager
 *
 * @param npmUrl Which node module to install
 * @param options Options for the installation
 */
export async function installNodeModule(
    npmUrl: string,
    options: InstallNodeModuleOptions = {},
): Promise<CommandResult> {
    // Figure out which package manager is in charge (probably npm at this point)
    const pak = await detectPackageManagerWithFallback(options.cwd);
    // By default, don't print all the stuff the package manager spits out
    if (!options.debug) {
        pak.loglevel = 'error';
    }

    // And install the module
    const installOpts: WithRequired<InstallOptions, 'additionalArgs'> = {
        additionalArgs: [],
    };

    // Set up streams to pass the command output through
    if (options.debug) {
        const stdall = new PassThrough();
        pak.stdall = stdall;
        pipeLinewise(stdall, process.stdout);
        installOpts.additionalArgs.push('--foreground-scripts');
    } else {
        const stdout = new PassThrough();
        pak.stdout = stdout;
        pipeLinewise(stdout, process.stdout);
    }

    if (options.unsafePerm) {
        installOpts.additionalArgs.push('--unsafe-perm');
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
 *
 * @param packageName Which node module to uninstall
 * @param options Options for the installation
 */
export async function uninstallNodeModule(
    packageName: string,
    options: UninstallNodeModuleOptions = {},
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
 *
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
 */
export async function getDiskInfo(): Promise<GetDiskInfoResponse | null> {
    const platform = process.platform;
    if (diskusage) {
        try {
            const path = platform === 'win32' ? thisDir.substring(0, 2) : '/';
            const info = diskusage.checkSync(path);
            return { 'Disk size': info.total, 'Disk free': info.free };
        } catch (e) {
            console.log(e.message);
        }
    } else {
        if (platform === 'win32') {
            // Caption  FreeSpace     Size
            // A:
            // C:       66993807360   214640357376
            // D:
            // Y:       116649795584  148368257024
            // Z:       116649795584  148368257024
            const disk = thisDir.substring(0, 2).toUpperCase();

            const { stdout } = await execAsync('wmic logicaldisk get size,freespace,caption');

            if (typeof stdout === 'string') {
                const lines = stdout.split('\n');
                const line = lines.find(line => {
                    const parts = line.split(/\s+/);
                    return parts[0].toUpperCase() === disk;
                });
                if (line) {
                    const parts = line.split(/\s+/);
                    return {
                        'Disk size': parseInt(parts[2]),
                        'Disk free': parseInt(parts[1]),
                    };
                }
            }
        } else {
            const { stdout } = await execAsync(`df -k ${getRootDir()}`);
            //, stderr) {
            // Filesystem            1K-blocks    Used Available Use% Mounted on
            // /dev/mapper/vg00-lv01 162544556 9966192 145767152   7% /
            try {
                if (typeof stdout === 'string') {
                    const parts = stdout.split('\n')[1].split(/\s+/);
                    return {
                        'Disk size': parseInt(parts[1]) * 1024,
                        'Disk free': parseInt(parts[3]) * 1024,
                    };
                }
            } catch {
                // continue regardless of error
            }
        }
    }

    return null;
}

export interface CertificateInfo {
    certificateFilename: string | null;
    /** the certificate itself */
    certificate: string;
    /** serial number */
    serialNumber: string;
    /** type of signature as text like "RSA" */
    signature: string;
    /** bits used for encryption key like 2048 */
    keyLength: number;
    /** issuer of the certificate */
    issuer: Record<string, any>;
    /** subject that is signed */
    subject: Record<string, any>;
    /** server name this certificate belong to */
    dnsNames: {
        type: number;
        value: string;
    }[];
    /** this certificate can be used for the following purposes */
    keyUsage: Record<string, any>;
    /** usable or client, server or ... */
    extKeyUsage: Record<string, any>;
    /** certificate validity start datetime */
    validityNotBefore: Date;
    /** certificate validity end datetime */
    validityNotAfter: Date;
}

/**
 * Returns information about a certificate
 *
 * @param cert
 * @returns certificate information object
 */
export function getCertificateInfo(cert: string): null | CertificateInfo {
    let info: CertificateInfo | null = null;

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

        // cast to any we use some undocumented? the properties below
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
            validityNotAfter: crt.validity.notAfter,
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

/** Maximum time after which cert has to expire - 365 days in ms */
export const MAX_CERT_VALIDITY = 365 * 24 * 60 * 60 * 1_000;

/**
 * Returns default SSL certificates (private and public)
 *
 *
 *  The following info will be returned:
 *     - defaultPrivate: private RSA key
 *     - defaultPublic: public certificate
 *
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

    cert.validity.notAfter = new Date(Date.now() + MAX_CERT_VALIDITY);

    const subAttrs = [
        { name: 'commonName', value: getHostName() },
        { name: 'organizationName', value: 'ioBroker GmbH' },
        { shortName: 'OU', value: 'iobroker' },
    ];

    const issAttrs = [
        { name: 'commonName', value: 'iobroker' },
        { name: 'organizationName', value: 'ioBroker GmbH' },
        { shortName: 'OU', value: 'iobroker' },
    ];

    cert.setSubject(subAttrs);
    cert.setIssuer(issAttrs);

    cert.setExtensions([
        {
            name: 'basicConstraints',
            critical: true,
            cA: false,
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
            decipherOnly: true,
        },
        {
            name: 'subjectAltName',
            altNames: [
                {
                    type: 2,
                    value: os.hostname(),
                },
            ],
        },
        {
            name: 'subjectKeyIdentifier',
        },
        {
            name: 'extKeyUsage',
            serverAuth: true,
            clientAuth: true,
            codeSigning: false,
            emailProtection: false,
            timeStamping: false,
        },
        {
            name: 'authorityKeyIdentifier',
        },
    ]);

    cert.sign(keys.privateKey, forge.md.sha256.create());

    const pem_pkey = pki.privateKeyToPem(keys.privateKey);
    const pem_cert = pki.certificateToPem(cert);

    return {
        defaultPrivate: pem_pkey,
        defaultPublic: pem_cert,
    };
}

function makeid(length: number): string {
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
 * @param objects db
 */
export async function getHostInfo(objects: any): Promise<HostInfo> {
    if (!diskusage) {
        try {
            diskusage = require('diskusage');
        } catch {
            // ignore
        }
    }

    const systemConfig: ioBroker.OtherObject = await objects.getObjectAsync('system.config');
    const systemRepos: ioBroker.OtherObject = await objects.getObjectAsync('system.repositories');

    // Check if repositories exist
    const allRepos: Record<string, any> = {};
    if (systemRepos?.native?.repositories && systemConfig) {
        const repos: string[] = Array.isArray(systemConfig.common.activeRepo)
            ? systemConfig.common.activeRepo
            : [systemConfig.common.activeRepo];
        repos
            .filter(repo => systemRepos.native.repositories[repo] && systemRepos.native.repositories[repo].json)
            .forEach(repo => Object.assign(allRepos, systemRepos.native.repositories[repo].json));
    }

    if (!npmVersion) {
        try {
            npmVersion = await getSystemNpmVersionAsync();
        } catch (e) {
            console.error(`Cannot get NPM version: ${e.message}`);
        }
    }

    const cpus = os.cpus();
    const dateObj = new Date();

    const data: HostInfo = {
        Platform: isDocker() ? 'docker' : os.platform(),
        os: process.platform,
        Architecture: os.arch(),
        CPUs: cpus && Array.isArray(cpus) ? cpus.length : null,
        Speed: cpus && Array.isArray(cpus) ? cpus[0].speed : null,
        Model: cpus && Array.isArray(cpus) ? cpus[0].model : null,
        RAM: os.totalmem(),
        'System uptime': Math.round(os.uptime()),
        'Node.js': process.version,
        time: dateObj.getTime(),
        timeOffset: dateObj.getTimezoneOffset(),
        NPM: npmVersion,
        'adapters count': Object.keys(allRepos).length,
    };

    if (data.Platform === 'win32') {
        data.Platform = 'Windows';
    } else if (data.Platform === 'darwin') {
        data.Platform = 'OSX';
    }

    if (data.Platform === 'docker') {
        data.dockerInformation = getDockerInformation();
    }

    try {
        const info = await getDiskInfo();
        if (info) {
            Object.assign(data, info);
        }
    } catch (e) {
        console.error(`Cannot get disk information: ${e.message}`);
    }

    return data;
}

/**
 * Finds the controller root directory
 *
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

    // Also check in the current check dir (along with iobroker.js-controller sub-dirs)
    let checkPath = path.join(thisDir, '..', '..');

    possibilities.unshift('');

    while (true) {
        for (const pkg of possibilities) {
            try {
                const possiblePath = path.join(checkPath, pkg);

                if (fs.existsSync(path.join(possiblePath, `${appNameLowerCase}.js`))) {
                    return possiblePath;
                }
            } catch {
                // not found, continue with next possibility
            }
        }

        // Controller isn't found here - go to the parent dir
        const newPath = path.dirname(checkPath);
        if (newPath === checkPath) {
            // We already reached the root dir, abort
            break;
        }
        checkPath = newPath;
    }

    throw new Error('Could not determine controller directory');
}

/**
 * Get the root dir of the ioBroker installation
 */
export function getRootDir(): string {
    return path.join(getControllerDir(), '..', '..');
}

/** Returns whether the current process is executed via dev-server */
export function isDevServerInstallation(): boolean {
    return !!require.main?.path.includes(`${path.sep}.dev-server${path.sep}`);
}

/**
 * All paths are returned always relative to /node_modules/' + appName + '.js-controller
 * the result has always "/" as last symbol
 */
export function getDefaultDataDir(): string {
    // Allow overriding the data directory with an environment variable
    let envDataDir = process.env[`${appName.toUpperCase()}_DATA_DIR`];
    if (envDataDir) {
        if (path.isAbsolute(envDataDir)) {
            envDataDir = path.relative(getControllerDir(), envDataDir);
        }
        return envDataDir;
    }

    if (isDevInstallation()) {
        // dev install
        return './data/';
    }

    return path.join('..', '..', `${appNameLowerCase}-data/`);
}

/**
 * Returns the path of the config file
 */
export function getConfigFileName(): string {
    // Allow overriding the config file location with an environment variable
    let envDataDir = process.env[`${appName.toUpperCase()}_DATA_DIR`];
    if (envDataDir) {
        if (!path.isAbsolute(envDataDir)) {
            envDataDir = path.join(getControllerDir(), envDataDir);
        }
        return path.join(envDataDir, `${appNameLowerCase}.json`);
    }

    const controllerDir = getControllerDir();
    const fallbackConfigFile = path.join(controllerDir, 'data', `${appNameLowerCase}.json`);
    const isDevInstall = isDevInstallation();

    if (isDevInstall) {
        const devConfigFile = path.join(controllerDir, 'conf', `${appNameLowerCase}.json`);

        if (fs.existsSync(devConfigFile)) {
            return devConfigFile;
        } else if (fs.existsSync(fallbackConfigFile)) {
            return fallbackConfigFile;
        }
    }

    const prodConfigFile = path.join(getRootDir(), `${appNameLowerCase}-data`, `${appNameLowerCase}.json`);

    if (!fs.existsSync(prodConfigFile) && isDevInstall) {
        return fallbackConfigFile;
    }

    return prodConfigFile;
}

/**
 * Puts all values from an `arguments` object into an array, starting at the given index
 *
 * @param argsObj An `arguments` object as passed to a function
 * @param startIndex The optional index to start taking the arguments from
 */
function sliceArgs(argsObj: IArguments, startIndex = 0): any[] {
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
 *
 * @param fn The function to promisify
 * @param context (optional) The context (value of `this` to bind the function to)
 * @param returnArgNames (optional) If the callback contains multiple arguments,
 * you can combine them into one object by passing the names as an array.
 * Otherwise, the Promise will resolve with an array
 */
export function promisify(
    fn: (...args: any[]) => void,
    context?: any,
    returnArgNames?: string[],
): (...args: any[]) => Promise<any> {
    return function () {
        // eslint-disable-next-line prefer-rest-params
        const args = sliceArgs(arguments);
        // @ts-expect-error we cannot know the type of `this`
        context = context || this;
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<void | Record<string, any> | any[]>(async (resolve, reject) => {
            try {
                // await this to allow streamlining errors not passed via callback by async methods
                // eslint-disable-next-line @typescript-eslint/await-thenable
                await fn.apply(
                    context,
                    args.concat([
                        function (error: string | Error, result: any) {
                            if (error) {
                                return reject(error instanceof Error ? error : new Error(error));
                            }
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
                        },
                    ]),
                );
            } catch (e) {
                reject(e as Error);
            }
        });
    };
}

/**
 * Promisifies a function which does not provide an error as the first argument in its callback
 *
 * @param fn The function to promisify
 * @param context (optional) The context (value of `this` to bind the function to)
 * @param returnArgNames (optional) If the callback contains multiple arguments,
 * you can combine them into one object by passing the names as an array.
 * Otherwise, the Promise will resolve with an array
 */
export function promisifyNoError(
    fn: (...args: any[]) => void,
    context?: any,
    returnArgNames?: string[],
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
                    },
                ]),
            );
        });
    };
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
                include_docs: false,
            },
            (err: Error | null, _states?: GetObjectViewResult<ioBroker.StateObject>) => {
                if (err) {
                    reject(err);
                } else {
                    let keys: string[] = [];
                    if (_states?.rows) {
                        for (const row of _states.rows) {
                            const id = row.id;
                            // if instance still active, but a device is offline
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
            },
        );
    });
}

/**
 * Converts ioB pattern into regex.
 *
 * @param pattern - Regex string to use it in new RegExp(pattern)
 */
export function pattern2RegEx(pattern: string): string {
    pattern = (pattern || '').toString();

    if (!isValidPattern(pattern)) {
        throw new Error(`The pattern "${pattern}" is not a valid ID pattern`);
    }

    const startsWithWildcard = pattern[0] === '*';
    const endsWithWildcard = pattern[pattern.length - 1] === '*';

    pattern = pattern.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*');

    return (startsWithWildcard ? '' : '^') + pattern + (endsWithWildcard ? '' : '$');
}

/**
 * Checks if a pattern is valid
 *
 * @param pattern
 * @pattern pattern to check for validity
 */
export function isValidPattern(pattern: string): boolean {
    pattern = pattern.replace(/\*/g, '');

    return !FORBIDDEN_CHARS.test(pattern);
}

/**
 * Generates a stack trace that can be added to log outputs to trace their source
 *
 * @param [wrapperName] The wrapper function after which the stack trace should begin
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
 *
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
 *
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
 *
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
    // if not encrypted as aes-192 or key not a valid 48-digit hex -> fallback
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
 *
 * @param it The variable to test
 * @returns true if it is Record<string, any>
 */
export function isObject(it: unknown): it is Record<string, any> {
    // This is necessary because:
    // typeof null === 'object'
    // typeof [] === 'object'
    // [] instanceof Object === true
    return Object.prototype.toString.call(it) === '[object Object]'; // this code is 25% faster than below one
    // return it && typeof it === 'object' && !(it instanceof Array);
}

/**
 * Tests whether the given variable is really an Array
 *
 * @param it The variable to test
 */
export function isArray(it: unknown): it is any[] {
    return Array.isArray(it);
}

/**
 * Measure the Node.js event loop lag and repeatedly call the provided callback function with the updated results
 *
 * @param ms The number of milliseconds for monitoring
 * @param cb Callback function to call for each new value
 */
export function measureEventLoopLag(ms: number, cb: (eventLoopLag?: number) => void): void {
    let start = hrtime();

    let timeout = setTimeout(check, ms);
    timeout.unref();

    function check(): void {
        // workaround for https://github.com/joyent/node/issues/8364
        clearTimeout(timeout);

        // how much time has actually elapsed in the loop beyond what
        // setTimeout says is supposed to happen. we use setTimeout to
        // cover multiple iterations of the event loop, getting a larger
        // sample of what the process is working on.
        const t = hrtime();

        // we use Math.max to handle a case where timers are running efficiently
        // and our callback executes earlier than `ms` due to how timers are
        // implemented. this is ok. it means we're healthy.
        cb && cb(Math.max(0, t - start - ms));
        start = t;

        timeout = setTimeout(check, ms);
        timeout.unref();
    }

    function hrtime(): number {
        const t = process.hrtime();
        return t[0] * 1e3 + t[1] / 1e6;
    }
}

/**
 * This function convert state values by read and write of aliases. Function is synchronous.
 * On errors, null is returned instead
 *
 * @param options
 */
export function formatAliasValue(options: FormatAliasValueOptions): ioBroker.State | null {
    const { sourceCommon, sourceId, targetCommon, targetId, state, logger } = options;
    const logNamespace = options.logNamespace ? `${options.logNamespace} ` : '';

    if (!state) {
        return null;
    }
    if (state.val === undefined) {
        state.val = null;
        return state;
    }

    if (targetCommon?.alias?.read) {
        if (!sourceCommon) {
            logger.error(
                `${logNamespace}source in "${targetId}" does not exist for "read" function: "${targetCommon.alias.read}"`,
            );
            return null;
        }
        try {
            state.val = applyAliasTransformer({
                transformer: targetCommon.alias.read,
                firstCommon: targetCommon,
                secondCommon: sourceCommon,
                isRead: true,
                state,
            });
        } catch (e) {
            logger.error(
                `${logNamespace}Invalid read function for "${targetId}": "${targetCommon.alias.read}" => ${e.message}`,
            );
            return null;
        }
    }

    if (sourceCommon?.alias?.write) {
        if (!targetCommon) {
            logger.error(
                `${logNamespace}target for "${sourceId}" does not exist for "write" function: "${sourceCommon.alias.write}"`,
            );
            return null;
        }
        try {
            state.val = applyAliasTransformer({
                transformer: sourceCommon.alias.write,
                firstCommon: sourceCommon,
                secondCommon: targetCommon,
                isRead: false,
                state,
            });
        } catch (e) {
            logger.error(
                `${logNamespace}Invalid write function for "${sourceId}": "${sourceCommon.alias.write}" => ${e.message}`,
            );
            return null;
        }
    }

    state.val = applyAliasConvenienceConversion({ state, targetCommon });
    state.val = applyAliasAutoScaling({ state, sourceCommon, targetCommon });

    return state;
}

/**
 * remove given id from all enums
 *
 * @param objects object to access objects db
 * @param id the object id which will be deleted from enums
 * @param allEnums objects with all enums to use - if not provided all enums will be queried
 * @returns Promise All objects are tried to be updated - reject will happen as soon as one fails with the error of the first fail
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
 * @param dependencies dependencies array or single dependency
 * @returns parsedDeps parsed dependencies
 */
export function parseDependencies(
    dependencies: string[] | Record<string, string>[] | string | Record<string, string> | undefined,
): Record<string, string> {
    let adapters: Record<string, string> = {};
    if (Array.isArray(dependencies)) {
        dependencies.forEach(rule => {
            if (typeof rule === 'string') {
                // No version given, all are okay
                adapters[rule] = '*';
            } else if (isObject(rule)) {
                // can be if an object containing a single adapter or multiple
                Object.keys(rule)
                    .filter(adapter => !adapters[adapter])
                    .forEach(adapter => (adapters[adapter] = rule[adapter]));
            }
        });
    } else if (typeof dependencies === 'string') {
        // it's a single string without version requirement
        adapters[dependencies] = '*';
    } else if (isObject(dependencies)) {
        // if dependencies is already an object, just use it
        adapters = dependencies;
    }
    return adapters;
}

/**
 * Validates types of `obj.common` properties and `object.type`, if invalid types are used, an error is thrown.
 * If attributes of `obj.common` are not provided, no error is thrown. obj.type has to be there and has to be valid.
 *
 * @param obj an object which will be validated
 * @param extend (optional) if true checks allow more optional cases for extendObject calls
 * @throws Error if a property has the wrong type or `obj.type` is non-existing
 */
export function validateGeneralObjectProperties(obj: any, extend?: boolean): void {
    if (!obj || (obj.type === undefined && !extend)) {
        throw new Error(`obj.type has to exist`);
    }

    if (obj.type !== undefined && typeof obj.type !== 'string') {
        throw new Error(`obj.type has an invalid type! Expected "string", received "${typeof obj.type}"`);
    }

    if (obj.native !== undefined && !isObject(obj.native)) {
        throw new Error(`obj.native has an invalid type! Expected a "real object", received "${typeof obj.native}"`);
    }

    const allowedObjectTypes: ioBroker.ObjectType[] = [
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
        'folder',
        'schedule',
        'design',
    ];

    if (obj.type !== undefined && !allowedObjectTypes.includes(obj.type)) {
        throw new Error(
            `obj.type has an invalid value (${obj.type}) but has to be one of ${allowedObjectTypes.join(', ')}`,
        );
    }

    // obj.common is optional in general check
    if (!obj.common) {
        return;
    }

    if (obj.common.name !== undefined && typeof obj.common.name !== 'string' && typeof obj.common.name !== 'object') {
        throw new Error(
            `obj.common.name has an invalid type! Expected "string" or "object", received "${typeof obj.common.name}"`,
        );
    } else if (['adapter'].includes(obj.type) && typeof obj.common.name !== 'string') {
        // TODO: we need this for group/user too, but have to solve problems described in #1266
        // for some types, name needs to be a unique string
        throw new Error(`obj.common.name has an invalid type! Expected "string", received "${typeof obj.common.name}"`);
    }

    if (obj.common.type !== undefined) {
        if (typeof obj.common.type !== 'string') {
            throw new Error(
                `obj.common.type has an invalid type! Expected "string", received "${typeof obj.common.type}"`,
            );
        }

        if (obj.type === 'state') {
            // if an object type indicates a state, check that `common.type` matches
            const allowedStateTypes = ['number', 'string', 'boolean', 'array', 'object', 'mixed', 'json'];
            if (!allowedStateTypes.includes(obj.common.type)) {
                throw new Error(
                    `obj.common.type has an invalid value (${
                        obj.common.type
                    }) but has to be one of ${allowedStateTypes.join(', ')}`,
                );
            }

            // ensure that min max only exists for common.type number and is number itself
            if (obj.common.min !== undefined) {
                if (typeof obj.common.min !== 'number') {
                    throw new Error(
                        `obj.common.min has an invalid type! Expected "number", received "${typeof obj.common.min}"`,
                    );
                }

                if (obj.common.type !== 'number' && obj.common.type !== 'mixed') {
                    throw new Error(
                        `obj.common.min is only allowed on obj.common.type "number" or "mixed", received "${obj.common.type}"`,
                    );
                }
            }

            if (obj.common.max !== undefined) {
                if (typeof obj.common.max !== 'number') {
                    throw new Error(
                        `obj.common.max has an invalid type! Expected "number", received "${typeof obj.common.max}"`,
                    );
                }

                if (obj.common.type !== 'number' && obj.common.type !== 'mixed') {
                    throw new Error(
                        `obj.common.max is only allowed on obj.common.type "number" or "mixed", received "${obj.common.type}"`,
                    );
                }

                if (obj.common.min !== undefined && obj.common.min > obj.common.max) {
                    throw new Error(
                        `obj.common.min (${obj.common.min}) needs to be less than or equal to obj.common.max (${obj.common.max})`,
                    );
                }
            }

            // ensure, that default value has correct type
            if (obj.common.def !== undefined && obj.common.def !== null) {
                // else do what strictObjectChecks does for val
                if (
                    !(
                        (obj.common.type === 'mixed' && typeof obj.common.def !== 'object') ||
                        (obj.common.type !== 'object' && obj.common.type === typeof obj.common.def) ||
                        (obj.common.type === 'array' && typeof obj.common.def === 'string') ||
                        (obj.common.type === 'json' && typeof obj.common.def === 'string') ||
                        (obj.common.type === 'object' && typeof obj.common.def === 'string')
                    )
                ) {
                    // types can be 'number', 'string', 'boolean', 'array', 'object', 'mixed', 'json';
                    // 'array', 'object', 'json' need to be string
                    if (['object', 'json', 'array'].includes(obj.common.type)) {
                        throw new Error(
                            `Default value has to be stringified but received type "${typeof obj.common.def}"`,
                        );
                    } else {
                        throw new Error(
                            `Default value has to be ${
                                obj.common.type === 'mixed'
                                    ? `one of type "string", "number", "boolean"`
                                    : `type "${obj.common.type}"`
                            } but received type "${typeof obj.common.def}"`,
                        );
                    }
                }
            }
        }
    }

    if (obj.common.read !== undefined && typeof obj.common.read !== 'boolean') {
        throw new Error(
            `obj.common.read has an invalid type! Expected "boolean", received "${typeof obj.common.read}"`,
        );
    }

    if (obj.common.write !== undefined && typeof obj.common.write !== 'boolean') {
        throw new Error(
            `obj.common.write has an invalid type! Expected "boolean", received "${typeof obj.common.write}"`,
        );
    }

    if (obj.common.role !== undefined && typeof obj.common.role !== 'string') {
        throw new Error(`obj.common.role has an invalid type! Expected "string", received "${typeof obj.common.role}"`);
    }

    if (obj.common.desc !== undefined && typeof obj.common.desc !== 'string' && typeof obj.common.desc !== 'object') {
        throw new Error(
            `obj.common.desc has an invalid type! Expected "string" or "object", received "${typeof obj.common.desc}"`,
        );
    }

    if (
        obj.type === 'state' &&
        obj.common.custom !== undefined &&
        obj.common.custom !== null &&
        !isObject(obj.common.custom)
    ) {
        throw new Error(
            `obj.common.custom has an invalid type! Expected "object", received "${typeof obj.common.custom}"`,
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
            `obj.common.states has an invalid type! Expected "object", received "${typeof obj.common.states}"`,
        );
    }
}

/**
 * get all instances of all adapters in the list
 *
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

/** Just a helper, as we have no access to DB package and the specific types here */
type GetObjectViewResult<TObject extends ioBroker.AnyObject = ioBroker.Object> = Awaited<
    ioBroker.GetObjectViewPromise<TObject>
>;

/**
 * Get all existing enums
 *
 * @param objects - objects db
 * @returns Promise
 */
export async function getAllEnums(objects: any): Promise<Record<string, ioBroker.EnumObject>> {
    const allEnums: Record<string, any> = {};
    const res: GetObjectViewResult<ioBroker.EnumObject> = await objects.getObjectViewAsync('system', 'enum', {
        startkey: 'enum.',
        endkey: 'enum.\u9999',
    });
    if (res?.rows) {
        for (const row of res.rows) {
            allEnums[row.id] = row.value;
        }
    }

    return allEnums;
}

/**
 * get async all instances of one adapter
 *
 * @param adapter name of the adapter
 * @param objects objects DB
 * @param withObjects return objects instead of only ids
 */
export async function getInstances<TWithObjects extends boolean>(
    adapter: string,
    objects: any,
    withObjects: TWithObjects,
): Promise<TWithObjects extends true ? ioBroker.InstanceObject[] : ioBroker.ObjectIDs.Instance[]> {
    const arr = await objects.getObjectListAsync({
        startkey: `system.adapter.${adapter}.`,
        endkey: `system.adapter.${adapter}.\u9999`,
    });

    const instances = [];

    if (arr?.rows) {
        for (const row of arr.rows) {
            if (row.value.type !== 'instance') {
                continue;
            }
            if (withObjects) {
                instances.push(row.value);
            } else {
                instances.push(row.value._id);
            }
        }
    }

    return instances;
}

/**
 * Executes a command asynchronously. On success, the promise resolves with stdout and stderr.
 * On error, the promise rejects with the exit code or signal, as well as stdout and stderr.
 *
 * @param command The command to execute
 * @param execOptions The options for child_process.exec
 * @returns child process promise
 */
export function execAsync(command: string, execOptions?: ExecOptions): ChildProcessPromise {
    const defaultOptions = {
        // we do not want to show the node.js window on Windows
        windowsHide: true,
        // And we want to capture stdout/stderr
        encoding: 'utf8',
    };

    return cpExecAsync(command, { ...defaultOptions, ...execOptions });
}

/**
 * Takes input from one stream and writes it to another as soon as a complete line was read.
 *
 * @param input The stream to read from
 * @param output The stream to write into
 */
export function pipeLinewise(input: NodeJS.ReadableStream, output: NodeJS.WritableStream): void {
    const rl = createInterface({
        input,
        crlfDelay: Infinity,
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
 * Checks if an adapter is an ESM module or CJS
 *
 * @param adapter name of the adapter like hm-rpc
 */
export async function isAdapterEsmModule(adapter: string): Promise<boolean> {
    const adapterDir = getAdapterDir(adapter);
    if (!adapterDir) {
        throw new Error(`Could not find adapter dir of ${adapter}`);
    }

    const packJson = await fs.readJSON(path.join(adapterDir, 'package.json'), { encoding: 'utf-8' });

    return packJson.type === 'module';
}

/**
 * Find the adapter main file as full path
 *
 * @param adapter - adapter name of the adapter, e.g., hm-rpc
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
 * Returns the default nodeArgs required to execute the main file, e.g., transpile hooks for TypeScript
 *
 * @param mainFile
 * @returns default node args for cli
 */
export function getDefaultNodeArgs(mainFile: string): string[] {
    const ret: string[] = [];
    // Support executing TypeScript files directly
    if (mainFile.endsWith('.ts')) {
        ret.push('-r', '@alcalzone/esbuild-register');
    }
    // If JS-controller was started with --preserve-symlinks, do the same for adapters
    if (process.execArgv.includes('--preserve-symlinks')) {
        ret.push('--preserve-symlinks-main', '--preserve-symlinks');
    }
    return ret;
}

/**
 * Returns the default paths used to resolve modules using `require.resolve()`
 *
 * @param callerModule The module that wants to resolve another module
 */
export function getDefaultRequireResolvePaths(callerModule: NodeModule): string[] {
    const ret: string[] = [
        // This is the default for require.resolve
        ...callerModule.paths,
    ];
    // If JS-controller was started with --preserve-symlinks, start looking where the process entry point was
    if (process.execArgv.includes('--preserve-symlinks') && require.main) {
        ret.unshift(...require.main.paths);
    }
    return ret;
}

/** This is used for the short GitHub URL format that NPM accepts (<githubname>/<githubrepo>[#<commit-ish>]) */
const shortGithubUrlRegex = /^(?<user>[^/]+)\/(?<repo>[^#]+)(?:#(?<commit>.+))?$/;

/**
 * Tests if the given URL matches the format <githubname>/<githubrepo>[#<commit-ish>]
 *
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
 * Tries to parse a URL in the format <githubname>/<githubrepo>[#<commit-ish>] into its separate parts
 *
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
        commit: match.groups.commit,
    };
}

/** This is used to parse the pathname of a GitHub URL */
const githubPathnameRegex =
    /^\/(?<user>[^/]+)\/(?<repo>[^/]*?)(?:\.git)?(?:\/(?:tree|tarball|archive)\/(?<commit>.*?)(?:\.(?:zip|gz|tar\.gz))?)?$/;

/**
 * Tests if the given pathname matches the format /<githubname>/<githubrepo>[.git][/<tarball|tree|archive>/<commit-ish>[.zip|.gz]]
 *
 * @param pathname The pathname part of a GitHub URL
 */
export function isGithubPathname(pathname: string): boolean {
    return githubPathnameRegex.test(pathname);
}

/**
 * Tries to a GitHub pathname format /<githubname>/<githubrepo>[.git][/<tarball|tree|archive>/<commit-ish>[.zip|.gz|.tar.gz]] into its separate parts
 *
 * @param pathname The pathname part of a GitHub URL
 */
export function parseGithubPathname(pathname: string): ParsedGithubUrl | null {
    const match = githubPathnameRegex.exec(pathname);
    if (!match || !match.groups) {
        return null;
    }
    return {
        user: match.groups.user,
        repo: match.groups.repo,
        commit: match.groups.commit,
    };
}

/**
 * Removes properties which are given by preserve
 *
 * @param preserve - object which has true entries (or array of selected attributes) for all attributes that should be removed from currObj
 * @param oldObj - old object
 * @param newObj - new object
 */
export function removePreservedProperties(
    preserve: Record<string, any>,
    oldObj: Record<string, any>,
    newObj: Record<string, any>,
): void {
    for (const prop of Object.keys(preserve)) {
        if (isObject(preserve[prop]) && isObject(newObj[prop])) {
            // we have to go one step deeper
            removePreservedProperties(preserve[prop], oldObj[prop], newObj[prop]);
        } else if (newObj && newObj[prop] !== undefined && oldObj && oldObj[prop] !== undefined) {
            // we only need to remove something if it's in the old object and in the new one
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
 * @param namespace - adapter namespace + id, e.g., hm-rpc.0
 */
export function getInstanceIndicatorObjects(namespace: string): ioBroker.StateObject[] {
    const id = `system.adapter.${namespace}`;

    return [
        {
            _id: `${id}.alive`,
            type: 'state',
            common: {
                name: `${namespace} alive`,
                type: 'boolean',
                read: true,
                write: true,
                role: 'indicator.state',
            },
            native: {},
        },
        {
            _id: `${id}.connected`,
            type: 'state',
            common: {
                name: `${namespace} is connected`,
                type: 'boolean',
                read: true,
                write: false,
                role: 'indicator.state',
            },
            native: {},
        },
        {
            _id: `${id}.compactMode`,
            type: 'state',
            common: {
                name: `${namespace}.compactMode`,
                type: 'boolean',
                read: true,
                write: false,
                role: 'indicator.state',
            },
            native: {},
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
                unit: '% of one core',
            },
            native: {},
        },
        {
            _id: `${id}.cputime`,
            type: 'state',
            common: {
                name: `${namespace}.cputime`,
                type: 'number',
                read: true,
                write: false,
                role: 'indicator.state',
                unit: 'seconds',
            },
            native: {},
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
                unit: 'MB',
            },
            native: {},
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
                unit: 'MB',
            },
            native: {},
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
                unit: 'MB',
            },
            native: {},
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
                unit: 'seconds',
            },
            native: {},
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
                unit: 'events/15 seconds',
            },
            native: {},
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
                unit: 'events/15 seconds',
            },
            native: {},
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
                unit: 'ms',
            },
            native: {},
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
                role: 'state',
            },
            native: {},
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
                role: 'state',
            },
            native: {},
        },
    ];
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
            },
        };
    } else if (!log.silly) {
        log.silly = log.debug;
    }
    return log;
}

/**
 * Set capabilities of the given executable on Linux systems
 *
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
    modeInherited?: boolean,
): Promise<void> {
    // if not linux do nothing and silent exit
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
                    // if Admin Capability is not included in System Capabilities, we remove it from an array
                    if (!capBndArr.includes('cap_net_admin')) {
                        capabilities = capabilities.filter(c => c !== 'cap_net_admin');
                    }
                }
            }
        } catch {
            // Ok, we could not find it out, so update Caps but better without Admin Capability
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

        // if this throws, it needs to be caught outside
        await execAsync(`sudo setcap ${capabilitiesStr}${modes} ${execPath}`);
    }
}

/**
 * Requests the licenses from ioBroker.net
 *
 * @param login Login for ioBroker.net
 * @param password Decoded password for ioBroker.net
 * @returns array of all licenses stored on iobroker.net
 */
async function _readLicenses(login: string, password: string): Promise<any[]> {
    const config = {
        headers: { Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}` },
        timeout: 4_000,
    };

    try {
        const response = await axios.get(`https://iobroker.net:3001/api/v1/licenses`, config);
        if (response.data?.length) {
            const now = Date.now();
            response.data = response.data.filter(
                (license: { validTill: string | number }) =>
                    !license.validTill ||
                    license.validTill === '0000-00-00 00:00:00' ||
                    new Date(license.validTill).getTime() > now,
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
 * Reads the licenses from iobroker.net and if no login/password provided stores it in `system.licenses`
 *
 * @param objects Object store instance
 * @param login Login for ioBroker.net
 * @param password Decoded password for ioBroker.net
 * @returns array of all licenses stored on iobroker.net
 */
export async function updateLicenses(objects: any, login: string, password: string): Promise<any[]> {
    // if login and password provided in the message, just try to read without saving it in system.licenses
    if (login && password) {
        return _readLicenses(login, password);
    }
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
            // save licenses to system.licenses and remember the time.
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
            if (err.message.includes('Authentication required') || err.message.includes('Cannot decode password:')) {
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

export interface GZipFileOptions {
    // Delete the input file after compression. Default: false.
    deleteInput?: boolean;
}
/**
 * Compresses an input file using GZip and writes it somewhere else
 *
 * @param inputFilename The filename of the input file that should be gzipped
 * @param outputFilename The filename of the output file where the gzipped content should be written to
 * @param options Options for the compression
 */
export function compressFileGZip(
    inputFilename: string,
    outputFilename: string,
    options: GZipFileOptions = {},
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
        reason: isValid ? 'Valid data directory' : 'Data directory is not allowed to point into node_modules folder',
    };
}

/**
 * If an array is passed it will be stringified, else the parameter is returned
 *
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

type DNSOrder = 'ipv4first' | 'verbatim';

/**
 * Get the configured DNS resolution order
 */
function getDNSResolutionOrder(): DNSOrder {
    let dnsOrder: DNSOrder = 'ipv4first';

    try {
        const configName = getConfigFileName();
        const config: ioBroker.IoBrokerJson = fs.readJSONSync(configName);
        dnsOrder = config.dnsResolution || dnsOrder;
    } catch (e) {
        if (e.code !== 'ENOENT') {
            console.warn(`Could not determine dns resolution order, fallback to "ipv4first": ${e.message}`);
        }
    }

    return dnsOrder;
}

/**
 * Checks if given ip address is matching ipv4 or ipv6 localhost
 *
 * @param ip ipv4 or ipv6 address
 */
export function isLocalAddress(ip: string): boolean {
    const localAddresses = ['::1', '127.0.0.1', 'localhost'];

    return localAddresses.includes(ip);
}

/**
 * Checks if given ip address is matching ipv4 or ipv6 "listen all" address
 *
 * @param ip ipv4 or ipv6 address
 */
export function isListenAllAddress(ip: string): boolean {
    return ip === '0.0.0.0' || ip === '::';
}

/**
 * Retrieve the localhost address according to the configured DNS resolution strategy
 */
export function getLocalAddress(): '127.0.0.1' | '::1' {
    const dnsOrder = getDNSResolutionOrder();

    return dnsOrder === 'ipv4first' ? '127.0.0.1' : '::1';
}

/**
 * Get the ip to listen to all addresses according to configured DNS resolution strategy
 */
export function getListenAllAddress(): '0.0.0.0' | '::' {
    const dnsOrder = getDNSResolutionOrder();

    return dnsOrder === 'ipv4first' ? '0.0.0.0' : '::';
}

/**
 * Ensure that DNS is resolved according to ioBroker config
 */
export function ensureDNSOrder(): void {
    const dnsOrder = getDNSResolutionOrder();
    setDefaultResultOrder(dnsOrder);
}

/**
 * Determine if ioBroker is installed as systemd service
 */
export async function isIoBrokerInstalledAsSystemd(): Promise<boolean> {
    try {
        const res = await execAsync('systemctl status iobroker');
        return !res.stderr;
    } catch {
        return false;
    }
}

/**
 * Get a new host object
 *
 * @param oldObj the previous host object
 */
export function getHostObject(oldObj?: ioBroker.HostObject | null): ioBroker.HostObject {
    const hostname = getHostName();
    const ioPackage = fs.readJSONSync(path.join(getControllerDir(), 'io-package.json'));

    const newObj: ioBroker.HostObject = {
        _id: `system.host.${hostname}`,
        type: 'host',
        common: {
            name: hostname,
            title: oldObj?.common?.title || ioPackage.common.title,
            installedVersion: ioPackage.common.version,
            platform: ioPackage.common.platform,
            cmd: `${process.argv[0]} ${`${process.execArgv.join(' ')} `.replace(/--inspect-brk=\d+ /, '')}${process.argv
                .slice(1)
                .join(' ')}`,
            hostname,
            address: findIPs(),
            type: ioPackage.common.name,
        },
        native: {
            process: {
                title: process.title,
                versions: process.versions,
                env: process.env,
            },
            os: {
                hostname: hostname,
                type: os.type(),
                platform: os.platform(),
                arch: os.arch(),
                release: os.release(),
                endianness: os.endianness(),
                tmpdir: os.tmpdir(),
            },
            hardware: {
                cpus: os.cpus(),
                totalmem: os.totalmem(),
                networkInterfaces: {},
            },
        },
    };

    if (oldObj?.common?.icon) {
        newObj.common.icon = oldObj.common.icon;
    }
    if (oldObj?.common?.color) {
        newObj.common.color = oldObj.common.color;
    }
    // remove dynamic information
    if (newObj.native?.hardware?.cpus) {
        for (const cpu of newObj.native.hardware.cpus) {
            if (cpu.times) {
                delete cpu.times;
            }
        }
    }
    if (oldObj?.native.hardware?.networkInterfaces) {
        newObj.native.hardware.networkInterfaces = oldObj.native.hardware.networkInterfaces;
    }

    return newObj;
}

/**
 * Get file name of the pids file
 *
 * @returns file name of the pids file
 */
export function getPidsFileName(): string {
    return path.join(getControllerDir(), 'pids.txt');
}

/**
 * Get all ioBroker process ids
 *
 * @returns process ids or empty array if no process running
 */
export async function getPids(): Promise<number[]> {
    let pids: number[] = [];

    try {
        const pidsContent = await fs.readFile(getPidsFileName(), { encoding: 'utf-8' });
        pids = JSON.parse(pidsContent);
    } catch (e) {
        if (e.code !== 'ENOENT') {
            throw e;
        }
    }

    return pids;
}

/**
 * Get the controller pid
 *
 * @returns pid if running else undefined
 */
export async function getControllerPid(): Promise<number | undefined> {
    const pids = await getPids();
    return pids.pop();
}

export * from '@/lib/common/maybeCallback.js';
