import os from 'node:os';
import path from 'node:path';
import { tools } from '@iobroker/js-controller-common';
import { readDiskDir, type ReadDiskDirRequest } from '@/lib/diskDir.js';
import type { ControllerLogger } from '@/lib/controller/types.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for the disk of this host need */
export interface DiskCommandsDeps {
    /** Sends the answers back to the requester */
    messages: MessageBus;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
}

/**
 * List a directory on the disk of this host, with only the entries the user of ioBroker may read
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const readDiskDirCommand: HostCommand<DiskCommandsDeps> = async (deps, msg) => {
    const { messages, logger, hostLogPrefix } = deps;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    const request: ReadDiskDirRequest =
        msg.message && typeof msg.message === 'object' ? (msg.message as ReadDiskDirRequest) : {};

    const answer = await readDiskDir(request, {
        dataDir: path.resolve(tools.getControllerDir(), tools.getDefaultDataDir()),
        rootDir: path.resolve(tools.getRootDir()),
        homeDir: os.homedir(),
    });
    if (answer.error) {
        logger.debug(
            `${hostLogPrefix} Cannot read the directory "${request.path || request.root || ''}": ${answer.error}`,
        );
    }

    messages.sendTo(msg.from, msg.command, answer, msg.callback);
};

/**
 * Create the host commands for the disk of this host
 *
 * @param deps Everything these commands need
 */
export function createDiskCommands(deps: DiskCommandsDeps): Record<string, HostCommandHandler> {
    return {
        readDiskDir: msg => readDiskDirCommand(deps, msg),
    };
}
