import path from 'node:path';
import fs from 'fs-extra';
import { open, stat } from 'node:fs/promises';
import { setTimeout as wait } from 'node:timers/promises';
import { tools } from '@iobroker/js-controller-common';
import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { getConfig } from '@/lib/controller/config.js';
import type { HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';
import type { GetLogFilesResult } from '@/lib/controller/types.js';

/**
 * Determine the directory of a configured file transport
 *
 * @param transportConfig The transport entry of the iobroker.json
 * @param controllerDir The directory of the js-controller
 */
function getLogDirectory(transportConfig: Record<string, any>, controllerDir: string): string {
    let filename = transportConfig.filename || 'log/';
    const parts = filename.replace(/\\/g, '/').split('/');
    parts.pop();
    filename = parts.join('/');

    if (filename[0] !== '/' && !filename.match(/^\W:/)) {
        const parts = ['..', '..', '..', '..'];
        do {
            parts.pop();
            const _filename = path.normalize(`${controllerDir}/${parts.join('/')}/`) + filename;
            if (fs.existsSync(_filename)) {
                filename = _filename;
                break;
            }
        } while (parts.length);
    }

    return filename;
}

/**
 * Read the last lines of the current log file
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const getLogs: HostCommandHandler = async (controller, msg) => {
    const { logger, hostLogPrefix, controllerDir, messages } = controller;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    const requestedLines = msg.message || 200;
    // @ts-expect-error types not know this one
    let logFileName = logger.getFileName();

    if (!fs.existsSync(logFileName)) {
        logFileName = `${controllerDir}/../../log/${tools.appName}.log`;
    }

    if (!fs.existsSync(logFileName)) {
        messages.sendTo(msg.from, msg.command, [0], msg.callback);
        return;
    }

    const stats = await stat(logFileName);
    // read only the last ~150 characters per requested line
    const start = stats.size > 150 * requestedLines ? stats.size - 150 * requestedLines : 0;

    let text: string;
    const file = await open(logFileName, 'r');

    try {
        const buffer = Buffer.alloc(stats.size - start);
        const { bytesRead } = await file.read(buffer, 0, buffer.length, start);
        text = buffer.subarray(0, bytesRead).toString();
    } catch {
        messages.sendTo(msg.from, msg.command, [stats.size], msg.callback);
        return;
    } finally {
        await file.close();
    }

    const lines = text.split('\n');
    if (start) {
        lines.shift(); // remove first line of the file as it could be not full if starts not from 0
    }
    lines.push(stats.size.toString()); // place as last line the current size of log

    messages.sendTo(msg.from, msg.command, lines, msg.callback);
};

/**
 * Read one specific log file from disk
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const getLogFile: HostCommandHandler = (controller, msg) => {
    const { logger, hostLogPrefix, controllerDir, messages } = controller;

    if (!msg.callback || !msg.from || !msg.message) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    const config = getConfig();
    if (!config?.log?.transport?.[msg.message.transport]) {
        messages.sendTo(msg.from, msg.command, { error: 'invalid config' }, msg.callback);
        return;
    }

    const filename = getLogDirectory(config.log.transport[msg.message.transport], controllerDir);

    if (!fs.existsSync(filename)) {
        messages.sendTo(msg.from, msg.command, { error: 'Cannot find file' }, msg.callback);
        return;
    }

    try {
        const file = path.join(filename, msg.message.filename);
        const stat = fs.lstatSync(file);

        const data = fs.readFileSync(file);
        messages.sendTo(
            msg.from,
            msg.command,
            { data, gz: msg.message.filename.toLowerCase().endsWith('.gz'), size: stat.size },
            msg.callback,
        );
    } catch (e) {
        messages.sendTo(msg.from, msg.command, { error: `Cannot read file: ${e}` }, msg.callback);
    }
};

/**
 * List all log files of all configured file transports
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const getLogFiles: HostCommandHandler = (controller, msg) => {
    const { logger, hostLogPrefix, controllerDir, hostname, messages } = controller;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    const config = getConfig();
    const result: GetLogFilesResult = { list: [] };

    // detect file log
    if (config?.log?.transport) {
        for (const transport in config.log.transport) {
            if (config.log.transport[transport] && config.log.transport[transport].type === 'file') {
                const filename = getLogDirectory(config.log.transport[transport], controllerDir);

                try {
                    if (fs.existsSync(filename)) {
                        const files = fs.readdirSync(filename);

                        for (const file of files) {
                            try {
                                if (!file.endsWith('-audit.json')) {
                                    const stat = fs.lstatSync(path.join(filename, file));
                                    if (!stat.isDirectory()) {
                                        result.list.push({
                                            fileName: `log/${hostname}/${transport}/${file}`,
                                            size: stat.size,
                                        });
                                    }
                                }
                            } catch (e) {
                                logger.error(
                                    `${hostLogPrefix} cannot check file: ${path.join(filename, file)} - ${e.message}`,
                                );
                            }
                        }
                    }
                } catch (e) {
                    logger.error(`${hostLogPrefix} cannot check files: ${filename} - ${e.message}`);
                }
            }
        }
    }

    messages.sendTo(msg.from, msg.command, result, msg.callback);
};

/**
 * Truncate all known log files
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const delLogs: HostCommandHandler = (controller, msg) => {
    const { logger, controllerDir, messages } = controller;

    // @ts-expect-error types not know this one
    const logFile = logger.getFileName(); //controllerDir + '/log/' + tools.appName + '.log';
    fs.existsSync(`${controllerDir}/log/${tools.appName}.log`) &&
        fs.writeFileSync(`${controllerDir}/log/${tools.appName}.log`, '');
    fs.existsSync(`${controllerDir}/../../log/${tools.appName}.log`) &&
        fs.writeFileSync(`${controllerDir}/../../log/${tools.appName}.log`, '');
    fs.existsSync(logFile) && fs.writeFileSync(logFile, '');

    msg.callback && msg.from && messages.sendTo(msg.from, msg.command, null, msg.callback);
};

/**
 * Print the state of the log redirection of all instances into the log
 *
 * @param controller The controller which has received the message
 */
const checkLogging: HostCommandHandler = async controller => {
    const { states, logger, hostLogPrefix, hostObjectPrefix, logList, instances } = controller;

    // TODO: temporary enough to remove now?
    // this is temporary function to check the logging functionality
    // Print all information into log
    const logs: string[] = [];

    // LogList
    logs.push(`Actual Loglist - ${JSON.stringify(logList)}`);

    // Get a list of all active adapters and send them a message with command checkLogging
    for (const _id of Object.keys(instances.procs)) {
        if (instances.procs[_id].process) {
            controller.outputCount++;
            states!
                .setState(`${_id}.checkLogging`, { val: true, ack: false, from: hostObjectPrefix })
                .catch(e => logger.error(`${hostLogPrefix} Cannot set checkLogging state: ${e.message}`));
        }
    }

    // Read the current state of all log subscribers
    const keys = await states!.getKeys(`${SYSTEM_ADAPTER_PREFIX}*.logging`);

    if (keys?.length) {
        const objs = await states!.getStates(keys);

        if (objs) {
            for (let i = 0; i < keys.length; i++) {
                const obj = objs[i];
                if (obj) {
                    const id = keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, '');

                    if (obj.val === true) {
                        logs.push(`Subscriber - ${id} ENABLED`);
                    } else {
                        logs.push(`Subscriber - ${id} (disabled)`);
                    }
                }
            }
        }

        // give the instances some time to answer before the collected information is printed
        await wait(3_000);

        for (const log of logs) {
            logger.error(`${hostLogPrefix} LOGINFO: ${log}`);
        }
    }
};

/** All commands which deal with the log files of this host */
export const logCommands: Record<string, HostCommandHandler> = {
    getLogs,
    getLogFile,
    getLogFiles,
    delLogs,
    checkLogging,
};
