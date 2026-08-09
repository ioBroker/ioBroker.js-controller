import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import type { ControllerLogger } from '@/lib/controller/types.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { MultihostManager } from '@/lib/controller/host/multihostManager.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for the iobroker.json of this host need */
export interface SettingsCommandsDeps {
    /** Sends the answers back to the requester */
    messages: MessageBus;
    /** Starts and stops the multihost discovery server */
    multihost: MultihostManager;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** Timestamp of the start of this controller */
    uptimeStart: number;
}

/**
 * Read the iobroker.json of this host
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const readBaseSettings: HostCommand<SettingsCommandsDeps> = (deps, msg) => {
    const { logger, hostLogPrefix, uptimeStart, messages } = deps;

    if (!msg.callback || !msg.from) {
        logger.error(
            `${hostLogPrefix} Invalid request ${msg.command}. "callback"(${!!msg.callback}) or "from"(${!!msg.from}) is null`,
        );
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
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const writeBaseSettings: HostCommand<SettingsCommandsDeps> = (deps, msg) => {
    const { logger, hostLogPrefix, messages } = deps;

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
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const updateMultihost: HostCommand<SettingsCommandsDeps> = (deps, msg) => {
    const { multihost, messages } = deps;

    const result = multihost.startMultihost();

    if (msg.callback) {
        messages.sendTo(msg.from, msg.command, { result: result }, msg.callback);
    }
};

/**
 * Create the host commands for the iobroker.json of this host
 *
 * @param deps Everything these commands need
 */
export function createSettingsCommands(deps: SettingsCommandsDeps): Record<string, HostCommandHandler> {
    return {
        readBaseSettings: msg => readBaseSettings(deps, msg),
        writeBaseSettings: msg => writeBaseSettings(deps, msg),
        updateMultihost: msg => updateMultihost(deps, msg),
    };
}
