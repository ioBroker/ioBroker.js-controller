import { createHostCommands, type HostCommandGroupDeps } from '@/lib/controller/messages/commands/index.js';
import type { ControllerState } from '@/lib/controller/state.js';
import type { ControllerLogger } from '@/lib/controller/types.js';

/**
 * A host command which still has to be bound to the dependencies of its group
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
export type HostCommand<TDeps> = (deps: TDeps, msg: ioBroker.SendableMessage) => Promise<void> | void;

/**
 * Handles a single message which has been sent to this host, bound to its dependencies
 *
 * @param msg The received message
 */
export type HostCommandHandler = (msg: ioBroker.SendableMessage) => Promise<void> | void;

/** Everything the host message handler needs to do its work */
export interface HostMessageHandlerOptions {
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** Lifecycle state, no message is processed during a shutdown */
    state: ControllerState;
    /** The dependencies of every group of host commands */
    commandDeps: HostCommandGroupDeps;
}

/**
 * Dispatches the messages which are sent to `system.host.<hostname>` to the responsible command handler
 */
export class HostMessageHandler {
    readonly #logger: ControllerLogger;
    readonly #hostLogPrefix: string;
    readonly #state: ControllerState;

    /** All known host commands by their name, already bound to their dependencies */
    readonly #commands: Record<string, HostCommandHandler>;

    /**
     * @param options Everything the host message handler needs to do its work
     */
    constructor(options: HostMessageHandlerOptions) {
        this.#logger = options.logger;
        this.#hostLogPrefix = options.hostLogPrefix;
        this.#state = options.state;
        this.#commands = createHostCommands(options.commandDeps);
    }

    /**
     * Process a message which has been sent to this host, like execute some script
     *
     * @param msg The message to process
     */
    async process(msg: ioBroker.SendableMessage): Promise<void> {
        if (this.#state.isStopping) {
            this.#logger.debug(
                `${this.#hostLogPrefix} Ignoring incoming Host message because controller is stopping ${msg.command}`,
            );
            return;
        }

        this.#logger.debug(`${this.#hostLogPrefix} Incoming Host message ${msg.command}`);

        const command = this.#commands[msg.command];

        if (!command) {
            return;
        }

        await command(msg);
    }
}
