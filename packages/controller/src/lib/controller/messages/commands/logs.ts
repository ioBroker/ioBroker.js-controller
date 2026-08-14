import path from 'node:path';
import fs from 'fs-extra';
import { open } from 'node:fs/promises';
import { setTimeout as wait } from 'node:timers/promises';
import { tools } from '@iobroker/js-controller-common';
import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { getConfig } from '@/lib/controller/config.js';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { ControllerLogger, GetLogFilesResult } from '@/lib/controller/types.js';
import type { InstanceManager } from '@/lib/controller/instances/instanceManager.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { Statistics } from '@/lib/controller/statistics.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for the log files of this host need */
export interface LogCommandsDeps {
    /** The connected states database client */
    states: StatesClient;
    /** Sends the answers back to the requester */
    messages: MessageBus;
    /** Takes care of all instances of this host */
    instances: InstanceManager;
    /** The counters of the received and written states */
    statistics: Statistics;
    /** All instances which have subscribed to the log messages of this host */
    logList: string[];
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** The id of the host object of this controller */
    hostObjectPrefix: ioBroker.ObjectIDs.Host;
    /** Name of this host */
    hostname: string;
    /** Directory of the js-controller */
    controllerDir: string;
}

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
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const getLogs: HostCommand<LogCommandsDeps> = async (deps, msg) => {
    const { logger, hostLogPrefix, controllerDir, messages } = deps;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    const requestedLines = msg.message || 200;
    const logFileNames = [
        // @ts-expect-error types not know this one
        logger.getFileName() as string,
        `${controllerDir}/../../log/${tools.appName}.log`,
    ];

    let lines: string[] | undefined;
    let size = 0;

    // do not check the existence upfront, the file can be rotated away in between - just try to open it
    for (const logFileName of logFileNames) {
        try {
            const file = await open(logFileName, 'r');

            try {
                size = (await file.stat()).size;
                // read only the last ~150 characters per requested line
                const start = size > 150 * requestedLines ? size - 150 * requestedLines : 0;
                const buffer = Buffer.alloc(size - start);
                const { bytesRead } = await file.read(buffer, 0, buffer.length, start);
                let text = buffer.subarray(0, bytesRead).toString();

                if (start) {
                    // drop the first line, it can be incomplete because we did not start reading at 0
                    text = text.substring(text.indexOf('\n') + 1);
                }

                lines = text.split('\n');
                lines.push(size.toString()); // place as last line the current size of log
            } finally {
                await file.close();
            }

            break;
        } catch {
            // try the next location, or answer with the size only if this was the last one
        }
    }

    messages.sendTo(msg.from, msg.command, lines ?? [size], msg.callback);
};

/**
 * Read one specific log file from disk
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const getLogFile: HostCommand<LogCommandsDeps> = (deps, msg) => {
    const { logger, hostLogPrefix, controllerDir, messages } = deps;

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
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const getLogFiles: HostCommand<LogCommandsDeps> = (deps, msg) => {
    const { logger, hostLogPrefix, controllerDir, hostname, messages } = deps;

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
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const delLogs: HostCommand<LogCommandsDeps> = (deps, msg) => {
    const { logger, controllerDir, messages } = deps;

    // @ts-expect-error types not know this one
    const logFile: string = logger.getFileName(); //controllerDir + '/log/' + tools.appName + '.log';

    // truncate whichever of these exist, a missing file simply throws and is ignored
    for (const file of [
        `${controllerDir}/log/${tools.appName}.log`,
        `${controllerDir}/../../log/${tools.appName}.log`,
        logFile,
    ]) {
        try {
            // truncate instead of writing, so a non-existing log file is not created
            fs.truncateSync(file, 0);
        } catch {
            // the file does not exist or cannot be written, nothing to truncate
        }
    }

    msg.callback && msg.from && messages.sendTo(msg.from, msg.command, null, msg.callback);
};

/**
 * Print the state of the log redirection of all instances into the log
 *
 * @param deps What this group of commands needs
 */
const checkLogging: HostCommand<LogCommandsDeps> = async deps => {
    const { states, logger, hostLogPrefix, hostObjectPrefix, logList, instances } = deps;

    // TODO: temporary enough to remove now?
    // this is temporary function to check the logging functionality
    // Print all information into log
    const logs: string[] = [];

    // LogList
    logs.push(`Actual Loglist - ${JSON.stringify(logList)}`);

    // Get a list of all active adapters and send them a message with command checkLogging
    for (const _id of Object.keys(instances.procs)) {
        if (instances.procs[_id].process) {
            deps.statistics.countOutput();
            states
                .setState(`${_id}.checkLogging`, { val: true, ack: false, from: hostObjectPrefix })
                .catch(e => logger.error(`${hostLogPrefix} Cannot set checkLogging state: ${e.message}`));
        }
    }

    // Read the current state of all log subscribers
    const keys = await states.getKeys(`${SYSTEM_ADAPTER_PREFIX}*.logging`);

    if (keys?.length) {
        const objs = await states.getStates(keys);

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

/**
 * Create the host commands for the log files of this host
 *
 * @param deps Everything these commands need
 */
export function createLogCommands(deps: LogCommandsDeps): Record<string, HostCommandHandler> {
    return {
        getLogs: msg => getLogs(deps, msg),
        getLogFile: msg => getLogFile(deps, msg),
        getLogFiles: msg => getLogFiles(deps, msg),
        delLogs: msg => delLogs(deps, msg),
        checkLogging: msg => checkLogging(deps, msg),
    };
}
