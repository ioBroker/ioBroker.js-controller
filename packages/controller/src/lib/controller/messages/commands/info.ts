import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import deepClone from 'deep-clone';
import { getSupportedFeatures, tools, type SupportedFeature } from '@iobroker/js-controller-common';
import { HIGHEST_UNICODE_SYMBOL, SYSTEM_HOST_PREFIX } from '@iobroker/js-controller-common-db/constants';
import type { HostInfo } from '@iobroker/js-controller-common-db/tools';
import type { HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';
import type { HostInformation } from '@/lib/controller/types.js';

const execAsync = promisify(exec);

/**
 * Collect the installed adapters of all hosts
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const getInstalled: HostCommandHandler = async (ctx, msg) => {
    const { objects, logger, hostLogPrefix, hostObjectPrefix, hostname, ioPackage, version, messages } = ctx;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    // Get a list of all hosts
    const doc = await objects.getObjectViewAsync('system', 'host', {
        startkey: SYSTEM_HOST_PREFIX,
        endkey: `${SYSTEM_HOST_PREFIX}${HIGHEST_UNICODE_SYMBOL}`,
    });

    const installedInfo = tools.getInstalledInfo();
    const hosts: Record<string, HostInformation> = {};

    if (doc?.rows.length) {
        // Read installed versions of all hosts
        for (const row of doc.rows) {
            // If desired a local version, do not ask it, just answer
            if (row.id === hostObjectPrefix) {
                const ioPackCommon = deepClone(ioPackage.common);

                ioPackCommon.host = hostname;
                ioPackCommon.runningVersion = version;
                hosts[hostname] = ioPackCommon;
            } else {
                const ioPack = await messages.getVersionFromHost(row.id);
                if (ioPack) {
                    hosts[ioPack.host] = ioPack;
                }
            }
        }
    }

    messages.sendTo(msg.from, msg.command, { ...installedInfo, hosts }, msg.callback);
};

/**
 * Read the io-package.json of a locally installed adapter
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const getInstalledAdapter: HostCommandHandler = (ctx, msg) => {
    const { logger, hostLogPrefix, messages } = ctx;

    if (!msg.callback || !msg.from || !msg.message) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    // read adapter file
    const dir = tools.getAdapterDir(msg.message);
    let _result = null;
    if (fs.existsSync(`${dir}/io-package.json`)) {
        try {
            _result = fs.readJSONSync(`${dir}/io-package.json`);
        } catch {
            logger.error(`${hostLogPrefix} cannot read and parse "${dir}/io-package.json"`);
        }
    }

    messages.sendTo(msg.from, msg.command, _result, msg.callback);
};

/**
 * Answer with the version information of this host
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const getVersion: HostCommandHandler = (ctx, msg) => {
    const { logger, hostLogPrefix, hostname, ioPackage, version, messages } = ctx;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    const ioPackCommon: HostInformation = deepClone(ioPackage.common);
    ioPackCommon.host = hostname;
    ioPackCommon.runningVersion = version;
    messages.sendTo(msg.from, msg.command, ioPackCommon, msg.callback);
};

/**
 * Collect the diagnostics information of this installation
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const getDiagData: HostCommandHandler = async (ctx, msg) => {
    const { logger, hostLogPrefix, diag, messages } = ctx;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    if (!msg.message) {
        messages.sendTo(msg.from, msg.command, null, msg.callback);
        return;
    }

    try {
        const obj = await diag.collectDiagInfo(msg.message);
        messages.sendTo(msg.from, msg.command, obj, msg.callback);
    } catch {
        messages.sendTo(msg.from, msg.command, null, msg.callback);
    }
};

/**
 * Answer with the location of the js-controller on disk
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const getLocationOnDisk: HostCommandHandler = (ctx, msg) => {
    const { logger, hostLogPrefix, controllerDir, messages } = ctx;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    messages.sendTo(msg.from, msg.command, { path: controllerDir, platform: os.platform() }, msg.callback);
};

/**
 * List the content of `/dev` on linux systems
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const getDevList: HostCommandHandler = async (ctx, msg) => {
    const { logger, hostLogPrefix, messages } = ctx;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    if (os.platform() !== 'linux') {
        messages.sendTo(msg.from, msg.command, null, msg.callback);
        return;
    }

    logger.info(`${hostLogPrefix} ls /dev`);

    let result = '';
    try {
        const { stdout, stderr } = await execAsync('ls /dev', { windowsHide: true });
        result = stdout.toString();

        if (stderr) {
            logger.error(`${hostLogPrefix} ls ${stderr.toString()}`);
        }
    } catch (e) {
        logger.error(`${hostLogPrefix} ls ${e.message}`);
    }

    result = result.replace(/(\r\n|\n|\r|\t)/gm, ' ');
    const parts = result.split(' ');
    const resList = [];
    for (let t = 0; t < parts.length; t++) {
        parts[t] = parts[t].trim();
        if (parts[t]) {
            resList.push(parts[t]);
        }
    }

    messages.sendTo(msg.from, msg.command, resList, msg.callback);
};

/**
 * Collect detailed information about this host
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const getHostInfo: HostCommandHandler = async (ctx, msg) => {
    const { objects, logger, hostLogPrefix, controllerDir, uptimeStart, instances, messages } = ctx;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    // installed adapters
    // available adapters
    // node.js --version
    // npm --version
    // uptime
    let hostInfo: HostInfo;
    try {
        hostInfo = await tools.getHostInfo(objects);
    } catch (e) {
        logger.error(`${hostLogPrefix} cannot get getHostInfo: ${e.message}`);
        return;
    }

    // add information about running instances
    let count = 0;
    for (const proc of Object.values(instances.procs)) {
        if (proc.process) {
            count++;
        }
    }

    let location = path.normalize(`${controllerDir}/../`);
    if (path.basename(location) === 'node_modules') {
        location = path.normalize(`${controllerDir}/../../`);
    }

    const enrichedHostInfo = {
        ...hostInfo,
        'Active instances': count,
        location,
        Uptime: Math.round((Date.now() - uptimeStart) / 1_000),
    };

    messages.sendTo(msg.from, msg.command, enrichedHostInfo, msg.callback);
};

/**
 * Same as `getHostInfo`, but faster because it delivers less information
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const getHostInfoShort: HostCommandHandler = (ctx, msg) => {
    const { logger, hostLogPrefix, controllerDir, messages } = ctx;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    let location = path.normalize(`${controllerDir}/../`);
    if (path.basename(location) === 'node_modules') {
        location = path.normalize(`${controllerDir}/../../`);
    }

    const cpus = os.cpus();
    const dateObj = new Date();

    const data: Record<string, any> = {
        Platform: os.platform(),
        os: process.platform,
        Architecture: os.arch(),
        CPUs: cpus.length,
        Speed: tools.isObject(cpus[0]) ? cpus[0].speed : undefined,
        Model: tools.isObject(cpus[0]) ? cpus[0].model : undefined,
        RAM: os.totalmem(),
        'System uptime': Math.round(os.uptime()),
        'Node.js': process.version,
        location,
        time: dateObj.getTime(), // give infos to compare the local times
        timeOffset: dateObj.getTimezoneOffset(),
    };

    if (data.Platform === 'win32') {
        data.Platform = 'Windows';
    } else if (data.Platform === 'darwin') {
        data.Platform = 'OSX';
    }

    messages.sendTo(msg.from, msg.command, data, msg.callback);
};

/**
 * Answer with all network interfaces of this host
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const getInterfaces: HostCommandHandler = (ctx, msg) => {
    const { logger, hostLogPrefix, messages } = ctx;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    messages.sendTo(msg.from, msg.command, { result: os.networkInterfaces() }, msg.callback);
};

/**
 * Check if a specific feature is supported by this js-controller
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
const checkFeatureSupported: HostCommandHandler = (ctx, msg) => {
    const { messages } = ctx;
    const feature: unknown = msg.message;

    if (!msg.callback || !msg.from) {
        return;
    }

    if (typeof feature === 'string') {
        const result = getSupportedFeatures().includes(feature as SupportedFeature);
        messages.sendTo(msg.from, msg.command, { result }, msg.callback);
    } else {
        messages.sendTo(msg.from, msg.command, { error: 'Invalid feature type' }, msg.callback);
    }
};

/** All commands which deliver information about this host */
export const infoCommands: Record<string, HostCommandHandler> = {
    getInstalled,
    getInstalledAdapter,
    getVersion,
    getDiagData,
    getLocationOnDisk,
    getDevList,
    getHostInfo,
    getHostInfoShort,
    getInterfaces,
    checkFeatureSupported,
};
