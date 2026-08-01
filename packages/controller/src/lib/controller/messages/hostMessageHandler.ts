import { hostCommands } from '@/lib/controller/messages/commands/index.js';
import type { Controller } from '@/lib/controller/controller.js';

/**
 * Handles a single message which has been sent to this host
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
export type HostCommandHandler = (controller: Controller, msg: ioBroker.SendableMessage) => Promise<void> | void;

/**
 * Dispatches the messages which are sent to `system.host.<hostname>` to the responsible command handler
 */
export class HostMessageHandler {
    /** All known host commands by their name */
    private readonly commands: Record<string, HostCommandHandler> = hostCommands;

    /**
     * @param controller The controller this message handler belongs to
     */
    constructor(private readonly controller: Controller) {}

    /**
     * Process a message which has been sent to this host, like execute some script
     *
     * @param msg The message to process
     */
    async process(msg: ioBroker.SendableMessage): Promise<void> {
        const { logger, hostLogPrefix } = this.controller;

        if (this.controller.isStopping) {
            logger.debug(
                `${hostLogPrefix} Ignoring incoming Host message because controller is stopping ${msg.command}`,
            );
            return;
        }

        logger.debug(`${hostLogPrefix} Incoming Host message ${msg.command}`);

        const command = this.commands[msg.command];

        if (!command) {
            return;
        }

        await command(this.controller, msg);
    }
}
