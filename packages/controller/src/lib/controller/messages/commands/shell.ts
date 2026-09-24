import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import { exec, spawn } from 'node:child_process';
import { EXIT_CODES, tools } from '@iobroker/js-controller-common';
import { getDefaultNodeArgs } from '@iobroker/js-controller-common-db/tools';
import type { ControllerLogger } from '@/lib/controller/types.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for executing shell and CLI commands need */
export interface ShellCommandsDeps {
    /** The configuration of this host (iobroker.json) */
    config: ioBroker.IoBrokerJson;
    /** Sends the answers back to the requester */
    messages: MessageBus;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
}

/**
 * Execute a shell command if this is allowed by the configuration
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const shell: HostCommand<ShellCommandsDeps> = (deps, msg) => {
    const { config, logger, hostLogPrefix } = deps;

    if (config.system?.allowShellCommands) {
        logger.info(`${hostLogPrefix} ${tools.appName} execute shell command: ${msg.message}`);
        exec(msg.message, { windowsHide: true }, (err, stdout, stderr) => {
            if (err) {
                return logger.error(`${hostLogPrefix} error: ${err.message}`);
            }

            logger.info(`${hostLogPrefix} stdout: ${stdout}`);
            logger.error(`${hostLogPrefix} stderr: ${stderr}`);
        });
    } else {
        logger.warn(
            `${hostLogPrefix} ${tools.appName} cannot execute shell command "${
                msg.message
            }" because not enabled in ${tools.appName.toLowerCase()}.json file`,
        );
    }
};

/**
 * Execute an `iobroker` CLI command in an own process and stream the output back to the requester
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const cmdExec: HostCommand<ShellCommandsDeps> = (deps, msg) => {
    const { logger, hostLogPrefix, messages } = deps;

    const mainFile = path.join(tools.getControllerDir(), `${tools.appName.toLowerCase()}.js`);
    const args = [...getDefaultNodeArgs(mainFile), mainFile];
    const message: {
        id: string;
        data: string;
        files?: { file: string | Buffer; name: string; doNotDelete?: boolean }[];
    } = msg.message;
    // Each cmdExec call gets an own temporary folder for the sent files to avoid collisions between parallel calls
    let tmpFolder: string | undefined;
    let keepTmpFolder = false;
    const filesToDelete: string[] = [];

    const exitFromCmd = (exitCode: number | null, error?: string): void => {
        if (tmpFolder) {
            if (keepTmpFolder) {
                // Some files are marked with "doNotDelete", so delete only the other ones
                for (const fileName of filesToDelete) {
                    try {
                        fs.unlinkSync(fileName);
                    } catch (e) {
                        logger.error(`Cannot delete file "${fileName}": ${e.message}`);
                    }
                }
            } else {
                try {
                    fs.rmSync(tmpFolder, { recursive: true, force: true });
                } catch (e) {
                    logger.error(`Cannot delete temporary folder "${tmpFolder}": ${e.message}`);
                }
            }
        }
        if (msg.from) {
            if (error) {
                messages
                    .sendTo(msg.from, 'cmdStderr', {
                        id: message.id,
                        data: error,
                    })
                    .catch(e => logger.error(`Cannot sendTo: ${e}`));
            }
            messages
                .sendTo(msg.from, 'cmdExit', { id: message.id, data: exitCode })
                .catch(e => logger.error(`Cannot sendTo: ${e}`));
            // Sometimes finished command is lost, resend it
            setTimeout(
                () =>
                    messages
                        .sendTo(msg.from, 'cmdExit', { id: message.id, data: exitCode })
                        .catch(e => logger.error(`Cannot sendTo: ${e}`)),
                1_000,
            );
        }
    };

    if (!message.data || typeof message.data !== 'string') {
        logger.warn(
            `${hostLogPrefix} ${
                tools.appName
            } Invalid cmdExec object. Expected key "data" with the command as string. Got as "data": ${JSON.stringify(
                message.data,
            )}`,
        );
        exitFromCmd(
            EXIT_CODES.INVALID_ARGUMENTS,
            'Invalid cmdExec object. Expected key "data" with the command as string',
        );
        return;
    }

    // cmdExec can send files with the command
    const fileNames = new Map<string, string>();
    if (message.files?.length) {
        // store files in an own temporary folder, so parallel cmdExec calls cannot overwrite each other
        try {
            tmpFolder = fs.mkdtempSync(path.join(os.tmpdir(), `${tools.appName.toLowerCase()}-cmd-`));
        } catch (e) {
            exitFromCmd(EXIT_CODES.UNKNOWN_ERROR, `Cannot create temporary folder: ${e.message}`);
            return;
        }
        for (const file of message.files) {
            if (!file.name || typeof file.name !== 'string') {
                exitFromCmd(EXIT_CODES.INVALID_ARGUMENTS, 'Empty file name');
                return;
            }
            if (file.name.includes('\\') || file.name.includes('/')) {
                exitFromCmd(EXIT_CODES.INVALID_ARGUMENTS, 'Invalid file name: file name cannot contain \\ or /');
                return;
            }
            const data = typeof file.file === 'string' ? Buffer.from(file.file, 'base64') : file.file;
            const fullName = path.join(tmpFolder, file.name);
            try {
                fs.writeFileSync(fullName, data);
            } catch (e) {
                exitFromCmd(EXIT_CODES.INVALID_ARGUMENTS, `Cannot write file "${fullName}": ${e.toString()}`);
                return;
            }
            fileNames.set(file.name, fullName);
            if (file.doNotDelete) {
                keepTmpFolder = true;
            } else {
                filesToDelete.push(fullName);
            }
        }
    }

    // The sender refers to the sent files just by name, so replace the names with the full paths in the temporary folder
    const extraArgs = message.data.split(' ').map(arg => fileNames.get(arg) || arg);
    args.push(...extraArgs);
    logger.info(`${hostLogPrefix} ${tools.appName.toLowerCase()} ${extraArgs.join(' ')}`);

    try {
        const child = spawn(process.execPath, args, { windowsHide: true });
        child.stdout?.on('data', data => {
            data = data.toString().replace(/\n/g, '');
            logger.info(`${hostLogPrefix} ${tools.appName} ${data}`);
            if (msg.from) {
                messages
                    .sendTo(msg.from, 'cmdStdout', { id: message.id, data })
                    .catch(e => logger.error(`Cannot sendTo: ${e}`));
            }
        });

        child.stderr?.on('data', data => {
            data = data.toString().replace(/\n/g, '');
            logger.error(`${hostLogPrefix} ${tools.appName} ${data}`);
            if (msg.from) {
                messages
                    .sendTo(msg.from, 'cmdStderr', { id: message.id, data })
                    .catch(e => logger.error(`Cannot sendTo: ${e}`));
            }
        });

        child.on('error', error => {
            logger.error(`${hostLogPrefix} ${tools.appName} error: ${error.message}`);
            exitFromCmd(EXIT_CODES.UNKNOWN_ERROR, error.message);
        });

        child.on('exit', exitCode => {
            logger.info(`${hostLogPrefix} ${tools.appName} exit ${exitCode}`);
            exitFromCmd(exitCode);
        });
    } catch (e) {
        logger.error(`${hostLogPrefix} ${tools.appName} ${e.message}`);
        exitFromCmd(EXIT_CODES.UNKNOWN_ERROR, e.message);
    }
};

/**
 * Create the host commands for executing shell and CLI commands
 *
 * @param deps Everything these commands need
 */
export function createShellCommands(deps: ShellCommandsDeps): Record<string, HostCommandHandler> {
    return {
        shell: msg => shell(deps, msg),
        cmdExec: msg => cmdExec(deps, msg),
    };
}
