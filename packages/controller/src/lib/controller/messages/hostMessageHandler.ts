import { hostCommands } from '@/lib/controller/messages/commands/index.js';
import { ControllerContextBase } from '@/lib/controller/contextBase.js';
import type { ControllerContext } from '@/lib/controller/context.js';

/**
 * Handles a single message which has been sent to this host
 *
 * @param ctx The context of the controller which has received the message
 * @param msg The received message
 */
export type HostCommandHandler = (ctx: ControllerContext, msg: ioBroker.SendableMessage) => Promise<void> | void;

/**
 * Dispatches the messages which are sent to `system.host.<hostname>` to the responsible command handler
 */
export class HostMessageHandler extends ControllerContextBase {
    /** All known host commands by their name */
    readonly #commands: Record<string, HostCommandHandler> = hostCommands;

    /**
     * Process a message which has been sent to this host, like execute some script
     *
     * @param msg The message to process
     */
    async process(msg: ioBroker.SendableMessage): Promise<void> {
        const { logger, hostLogPrefix } = this;

        if (this.isStopping) {
            logger.debug(
                `${hostLogPrefix} Ignoring incoming Host message because controller is stopping ${msg.command}`,
            );
            return;
        }

        logger.debug(`${hostLogPrefix} Incoming Host message ${msg.command}`);

        const command = this.#commands[msg.command];

        if (!command) {
            return;
        }

        await command(this.context, msg);
    }
}
