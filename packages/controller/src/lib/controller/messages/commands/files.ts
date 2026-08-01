import { zipFiles } from '@iobroker/js-controller-common';
import type { HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/**
 * Read a directory of the files' database as zip file
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const readDirAsZip: HostCommandHandler = async (controller, msg) => {
    const { objects, logger, hostLogPrefix, messages } = controller;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    try {
        const base64 = await zipFiles.readDirAsZip(objects!, msg.message.id, msg.message.name, msg.message.options);

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
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const writeDirAsZip: HostCommandHandler = async (controller, msg) => {
    const { objects, logger, hostLogPrefix, messages } = controller;

    try {
        await zipFiles.writeDirAsZip(
            objects!,
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
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const readObjectsAsZip: HostCommandHandler = async (controller, msg) => {
    const { objects, logger, hostLogPrefix, messages } = controller;

    if (!msg.callback || !msg.from) {
        logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }

    let base64: string;
    try {
        base64 = await zipFiles.readObjectsAsZip(objects!, msg.message.id, msg.message.adapter, msg.message.options);
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
        await objects!.writeFileAsync(msg.message.fileStorageNamespace, `zip/${msg.message.link}`, buff);
    } catch (e) {
        messages.sendTo(msg.from, msg.command, { error: e.message }, msg.callback);
        return;
    }

    messages.sendTo(msg.from, msg.command, `${msg.message.fileStorageNamespace}/zip/${msg.message.link}`, msg.callback);
};

/**
 * Write objects of an adapter from a zip file
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const writeObjectsAsZip: HostCommandHandler = async (controller, msg) => {
    const { objects, logger, hostLogPrefix, messages } = controller;

    let error: string | undefined;

    try {
        await zipFiles.writeObjectsAsZip(
            objects!,
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

/** All commands which read or write zip files */
export const fileCommands: Record<string, HostCommandHandler> = {
    readDirAsZip,
    writeDirAsZip,
    readObjectsAsZip,
    writeObjectsAsZip,
};
