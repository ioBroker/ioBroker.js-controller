import path from 'node:path';
import { spawn } from 'node:child_process';
import { tools } from '@iobroker/js-controller-common';
import { getDefaultNodeArgs } from '@iobroker/js-controller-common-db/tools';
import type { ControllerLogger } from '@/lib/controller/types.js';

/**
 * Start the CLI with `_restart`, which brings a new controller process up once this one is gone.
 *
 * This is the way around the host message bus on purpose: the normal restart goes through the `cmdExec` host
 * command, so whoever asked for it sees the output - but that needs a message handler, and there is none while
 * the databases have never connected. That is exactly the situation the connect timeout is about, so the
 * restart has to work without them.
 *
 * The child is detached and its streams are dropped, because this process is about to exit: it has to survive
 * its parent, and nobody is left to read from a pipe.
 *
 * @param logger the logger of this controller
 * @param hostLogPrefix prefix of all log messages of this controller
 */
export function spawnControllerRestart(logger: ControllerLogger, hostLogPrefix: string): void {
    const mainFile = path.join(tools.getControllerDir(), `${tools.appName.toLowerCase()}.js`);
    const args = [...getDefaultNodeArgs(mainFile), mainFile, '_restart'];

    try {
        const child = spawn(process.execPath, args, {
            windowsHide: true,
            detached: true,
            stdio: 'ignore',
        });
        child.unref();
        logger.info(`${hostLogPrefix} Restart requested via "${tools.appName.toLowerCase()} _restart"`);
    } catch (e) {
        logger.error(`${hostLogPrefix} Cannot restart the controller: ${e.message}`);
    }
}
