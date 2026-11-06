import { adapterFiles } from '@iobroker/js-controller-common';
import type { ControllerLogger } from '@/lib/controller/types.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for the files of installed adapters need */
export interface AdapterFileCommandsDeps {
    /** Sends the answers back to the requester */
    messages: Pick<MessageBus, 'sendTo'>;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
}

/**
 * The payload of a request as an object
 *
 * @param message the received payload
 * @throws {Error} if it is no object
 */
function asRequest(message: unknown): Record<string, unknown> {
    if (!message || typeof message !== 'object' || Array.isArray(message)) {
        throw new Error('invalid message, expected an object');
    }
    return message as Record<string, unknown>;
}

/**
 * Answer a request with the result of `handle`, or with `{ error }` if it throws
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 * @param handle Builds the answer
 */
async function answer(
    deps: AdapterFileCommandsDeps,
    msg: ioBroker.SendableMessage,
    handle: (request: Record<string, unknown>) => Promise<Record<string, unknown>>,
): Promise<void> {
    const { messages, logger, hostLogPrefix } = deps;
    if (!msg.callback || !msg.from) {
        logger.warn(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }
    let result: Record<string, unknown>;
    try {
        result = await handle(asRequest(msg.message));
    } catch (e) {
        result = { error: e.message };
    }
    messages.sendTo(msg.from, msg.command, result, msg.callback);
}

/**
 * List the files of a directory of an adapter installed on this host, e.g. its `widgets` folder
 *
 * The message is `{ adapter, path }`, the answer `{ files: [{ path, size, mtime }] }` with the paths relative to the
 * requested directory, or `{ error }`.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const listAdapterDir: HostCommand<AdapterFileCommandsDeps> = (deps, msg) =>
    answer(deps, msg, async request => ({
        files: await adapterFiles.listAdapterDir(request.adapter, request.path),
    }));

/**
 * Read one piece of a file of an adapter installed on this host
 *
 * The message is `{ adapter, path, offset?, length? }`, the answer `{ size, mtime, offset, data }` with `data` base64
 * encoded, or `{ error }`. Files are handed out in pieces (1 MB by default, at most 4 MB), so that no file goes
 * through the states DB as one huge message.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const readAdapterFile: HostCommand<AdapterFileCommandsDeps> = (deps, msg) =>
    answer(deps, msg, async request => ({
        ...(await adapterFiles.readAdapterFileChunk(request.adapter, request.path, request.offset, request.length)),
    }));

/**
 * Create the host commands that hand out the files of installed adapters to instances on other hosts
 *
 * @param deps Everything these commands need
 */
export function createAdapterFileCommands(deps: AdapterFileCommandsDeps): Record<string, HostCommandHandler> {
    return {
        listAdapterDir: msg => listAdapterDir(deps, msg),
        readAdapterFile: msg => readAdapterFile(deps, msg),
    };
}
