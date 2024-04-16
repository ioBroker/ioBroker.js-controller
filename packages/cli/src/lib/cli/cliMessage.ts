import * as CLI from './messages.js';
import { CLICommand, type CLICommandOptions } from './cliCommand.js';
import { enumInstances } from './cliTools.js';
import type { Client as StatesClient } from '@iobroker/db-states-redis';

export class CLIMessage extends CLICommand {
    /** @param options The CLI Message options */
    constructor(options: CLICommandOptions) {
        super(options);
    }

    /**
     * Executes a command
     *
     * @param args parsed arguments
     */
    execute(args: any[]): void {
        const { callback, dbConnect, showHelp } = this.options;
        let [adapter, command, message] = args;
        if (adapter === null || adapter === undefined) {
            CLI.error.requiredArgumentMissing('adapter');
            showHelp();
            return void callback(1);
        }
        if (message === null || message === undefined) {
            if (command === null || command === undefined) {
                CLI.error.requiredArgumentMissing('message');
                showHelp();
                return void callback(1);
            }
            message = command;
            command = 'send';
        }
        // Try to parse JSON
        // TODO: can we use the methods from cliObjects?
        if (typeof message === 'string' && message.startsWith('{') && message.endsWith('}')) {
            message = JSON.parse(message);
        }

        dbConnect(async params => {
            const { states, objects } = params;

            try {
                const pos = adapter.indexOf('.');
                let instance = null;
                if (pos !== -1) {
                    instance = adapter.substring(pos + 1);
                    adapter = adapter.substring(0, pos);
                }
                let messageTargets = [];
                if (instance === null) {
                    // This message wasn't meant for a specific instance,
                    const adapterInstances = await enumInstances(objects, adapter);
                    if (adapterInstances.length === 0) {
                        CLI.error.noInstancesFound(adapter);
                        return void callback(1);
                    }
                    messageTargets = adapterInstances.map(row => row._id);
                } else {
                    messageTargets.unshift(`system.adapter.${adapter}.${instance}`);
                }

                // Send the message to all targets
                const messagePromises = messageTargets.map(t => sendMessage(states, t, command, message));
                await Promise.all(messagePromises);
                return void callback();
            } catch (err) {
                CLI.error.unknown(err.message);
                return void callback(1);
            }
        });
    }
}

/**
 * @param states The States DB
 * @param targetId The instance or adapter to send the message to
 * @param command The command to send
 * @param message The message to send
 */
async function sendMessage(states: StatesClient, targetId: string, command: string, message: string): Promise<void> {
    await states.pushMessage(targetId, { command, message, from: 'cli' });
    CLI.success.messageSent(targetId, command, message);
}
