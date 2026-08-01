import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import type { HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/**
 * Read the iobroker.json of this host
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const readBaseSettings: HostCommandHandler = (controller, msg) => {
    const { logger, hostLogPrefix, uptimeStart, messages } = controller;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} No adapter name is specified for readBaseSettings command from  ${msg.from}`);
        return;
    }

    const configFile = tools.getConfigFileName();

    if (!fs.existsSync(configFile)) {
        const error = `Cannot find file ${configFile}`;
        logger.error(`${hostLogPrefix} ${error}`);
        messages.sendTo(msg.from, msg.command, { error }, msg.callback);
        return;
    }

    try {
        const config: ioBroker.IoBrokerJson = fs.readJsonSync(configFile);
        const stat = fs.lstatSync(configFile);
        messages.sendTo(msg.from, msg.command, { config, isActive: uptimeStart > stat.mtimeMs }, msg.callback);
    } catch {
        const error = `Cannot parse file ${configFile}`;
        logger.error(`${hostLogPrefix} ${error}`);
        messages.sendTo(msg.from, msg.command, { error }, msg.callback);
    }
};

/**
 * Write the iobroker.json of this host
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const writeBaseSettings: HostCommandHandler = (controller, msg) => {
    const { logger, hostLogPrefix, messages } = controller;

    if (!msg.message) {
        const error = `No data found on writeBaseSettings from "${msg.from}"`;
        logger.error(`${hostLogPrefix} ${error}`);
        return messages.sendResponseTo({ receivedMsg: msg, payload: { error } });
    }

    const configFile = tools.getConfigFileName();

    if (!fs.existsSync(configFile)) {
        const error = `No config file exists on writeBaseSettings from "${msg.from}"`;
        logger.error(`${hostLogPrefix} ${error}`);
        return messages.sendResponseTo({ receivedMsg: msg, payload: { error } });
    }

    let config: ioBroker.IoBrokerJson | undefined;
    if (typeof msg.message === 'string') {
        try {
            config = JSON.parse(msg.message);
        } catch {
            return messages.sendResponseTo({
                receivedMsg: msg,
                payload: { error: `Cannot parse data: "${msg.message}"` },
            });
        }
    } else {
        config = msg.message;
    }

    if (!config) {
        return messages.sendResponseTo({ receivedMsg: msg, payload: { error: 'Empty config' } });
    }

    if (!config.system) {
        return messages.sendResponseTo({ receivedMsg: msg, payload: { error: 'Cannot find "system" in data' } });
    }
    if (!config.objects) {
        return messages.sendResponseTo({ receivedMsg: msg, payload: { error: 'Cannot find "objects" in data' } });
    }
    if (!config.states) {
        return messages.sendResponseTo({ receivedMsg: msg, payload: { error: 'Cannot find "states" in data' } });
    }
    if (!config.log) {
        return messages.sendResponseTo({ receivedMsg: msg, payload: { error: 'Cannot find "log" in data' } });
    }

    try {
        fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    } catch {
        return messages.sendResponseTo({ receivedMsg: msg, payload: { error: `Cannot write file ${configFile}` } });
    }

    return messages.sendResponseTo({ receivedMsg: msg, payload: { result: 'ok' } });
};

/**
 * Start or stop the multihost discovery server according to the current configuration
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const updateMultihost: HostCommandHandler = (controller, msg) => {
    const { multihost, messages } = controller;

    const result = multihost.startMultihost();

    if (msg.callback) {
        messages.sendTo(msg.from, msg.command, { result: result }, msg.callback);
    }
};

/** All commands which read or write the base settings of this host */
export const settingsCommands: Record<string, HostCommandHandler> = {
    readBaseSettings,
    writeBaseSettings,
    updateMultihost,
};
