import { zipFiles } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { ControllerLogger } from '@/lib/controller/types.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for zip based file and object transfers need */
export interface FileCommandsDeps {
    /** The connected objects database client */
    objects: ObjectsClient;
    /** Sends the answers back to the requester */
    messages: MessageBus;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
}

/**
 * Read a directory of the files' database as zip file
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const readDirAsZip: HostCommand<FileCommandsDeps> = async (deps, msg) => {
    const { objects, logger, hostLogPrefix, messages } = deps;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    try {
        const base64 = await zipFiles.readDirAsZip(objects, msg.message.id, msg.message.name, msg.message.options);

        if (base64) {
            messages.sendTo(msg.from, msg.command, { error: null, data: base64 }, msg.callback);
        } else {
            messages.sendTo(msg.from, msg.command, { error: null }, msg.callback);
        }
    } catch (e) {
        logger.error(`${hostLogPrefix} Cannot read dir as zip: ${e.message}`);
        messages.sendTo(msg.from, msg.command, { error: e.message }, msg.callback);
    }
};

/**
 * Write a zip file into a directory of the files' database
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const writeDirAsZip: HostCommand<FileCommandsDeps> = async (deps, msg) => {
    const { objects, logger, hostLogPrefix, messages } = deps;

    try {
        await zipFiles.writeDirAsZip(
            objects,
            msg.message.id,
            msg.message.name,
            Buffer.from(msg.message.data, 'base64'),
            msg.message.options,
        );

        msg.callback && msg.from && messages.sendTo(msg.from, msg.command, {}, msg.callback);
    } catch (e) {
        logger.error(`${hostLogPrefix} Cannot write zip file as folder: ${e.message}`);
        msg.callback && msg.from && messages.sendTo(msg.from, msg.command, { error: e.message }, msg.callback);
    }
};

/**
 * Read objects of an adapter as zip file
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const readObjectsAsZip: HostCommand<FileCommandsDeps> = async (deps, msg) => {
    const { objects, logger, hostLogPrefix, messages } = deps;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    let base64: string;
    try {
        base64 = await zipFiles.readObjectsAsZip(objects, msg.message.id, msg.message.adapter, msg.message.options);
    } catch (e) {
        messages.sendTo(msg.from, msg.command, { error: e.message }, msg.callback);
        return;
    }

    // If client supports file via link
    if (!msg.message.link) {
        messages.sendTo(msg.from, msg.command, { data: base64 }, msg.callback);
        return;
    }

    const buff = Buffer.from(base64, 'base64');
    if (!msg.message.fileStorageNamespace) {
        messages.sendTo(
            msg.from,
            msg.command,
            {
                error: `Missing attribute "fileStorageNamespace" use e.g. "admin.0" to save ZIP in file as "zip/${msg.message.link}"`,
            },
            msg.callback,
        );
        return;
    }

    try {
        await objects.writeFileAsync(msg.message.fileStorageNamespace, `zip/${msg.message.link}`, buff);
    } catch (e) {
        messages.sendTo(msg.from, msg.command, { error: e.message }, msg.callback);
        return;
    }

    messages.sendTo(msg.from, msg.command, `${msg.message.fileStorageNamespace}/zip/${msg.message.link}`, msg.callback);
};

/**
 * Write objects of an adapter from a zip file
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const writeObjectsAsZip: HostCommand<FileCommandsDeps> = async (deps, msg) => {
    const { objects, logger, hostLogPrefix, messages } = deps;

    let error: string | undefined;

    try {
        await zipFiles.writeObjectsAsZip(
            objects,
            msg.message.id,
            msg.message.adapter,
            Buffer.from(msg.message.data || '', 'base64'),
            msg.message.options,
        );
    } catch (e) {
        error = e.message;
        logger.error(`${hostLogPrefix} Cannot write objects as zip: ${error}`);
    }

    if (msg.callback && msg.from) {
        messages.sendTo(msg.from, msg.command, { error }, msg.callback);
    }
};

/**
 * Create the host commands for zip based file and object transfers
 *
 * @param deps Everything these commands need
 */
export function createFileCommands(deps: FileCommandsDeps): Record<string, HostCommandHandler> {
    return {
        readDirAsZip: msg => readDirAsZip(deps, msg),
        writeDirAsZip: msg => writeDirAsZip(deps, msg),
        readObjectsAsZip: msg => readObjectsAsZip(deps, msg),
        writeObjectsAsZip: msg => writeObjectsAsZip(deps, msg),
    };
}
