import path from 'node:path';
import fs from 'fs-extra';
import { EXIT_CODES } from '@iobroker/js-controller-common';
import type { ControllerLogger, Process, RebuildArgs } from '@/lib/controller/types.js';

/**
 * Get the error text from an exit code
 *
 * @param code exit code
 */
export function getErrorText(code: number): string {
    return EXIT_CODES[code];
}

/** Options for `logWriteErrors` */
export interface LogWriteErrorsOptions {
    /** The pending write operations, kept running concurrently */
    writes: Promise<unknown>[];
    /** Context prepended to the error log if a write rejects */
    errorText: string;
    /** The logger to write the errors to */
    logger: ControllerLogger;
    /** Prefix of all log messages */
    logPrefix: string;
}

/**
 * Run fire-and-forget database writes in parallel and log any that reject.
 *
 * @param options The pending writes and the logging context
 */
export function logWriteErrors(options: LogWriteErrorsOptions): void {
    const { writes, errorText, logger, logPrefix } = options;

    /**
     * Wait for all writes and log the ones which have failed
     */
    const awaitWrites = async (): Promise<void> => {
        const results = await Promise.allSettled(writes);

        for (const result of results) {
            if (result.status === 'rejected') {
                logger.error(`${logPrefix} ${errorText}: ${result.reason}`);
            }
        }
    };

    awaitWrites().catch(e => logger.error(`${logPrefix} ${errorText}: ${e.message}`));
}

/** Options for `cleanErrors` */
export interface CleanErrorsOptions {
    /** The process whose errors should be cleaned */
    procObj: Process;
    /** The current timestamp in ms, or null to determine it */
    now: number | null;
    /** Whether the remaining errors should be written to the log */
    doOutput?: boolean;
    /** The logger to write the errors to */
    logger: ControllerLogger;
    /** Prefix of all log messages */
    logPrefix: string;
}

/**
 * Remove outdated error entries of a process and optionally log the remaining ones
 *
 * @param options The process to clean and the logging context
 */
export function cleanErrors(options: CleanErrorsOptions): void {
    const { procObj, doOutput, logger, logPrefix } = options;

    if (!procObj || !procObj.errors || !procObj.errors.length || procObj.startedAsCompactGroup) {
        return;
    }

    const now = options.now || Date.now();

    if (!doOutput && procObj.lastCleanErrors && now - procObj.lastCleanErrors < 1_000) {
        return;
    }

    procObj.lastCleanErrors = now;

    // output of errors into log
    if (doOutput) {
        for (let i = 0; i < procObj.errors.length; i++) {
            if (procObj.errors[i] && now - procObj.errors[i].ts < 30_000 && procObj.errors[i].text) {
                const lines = procObj.errors[i].text
                    .replace('\x1B[31merror\x1B[39m:', '')
                    .replace('\x1B[34mdebug\x1B[39m:', 'debug:')
                    .split('\n');
                for (let k = 0; k < lines.length; k++) {
                    if (lines[k]) {
                        logger.error(`${logPrefix} Caught by controller[${i}]: ${lines[k]}`);
                    }
                }
            }
        }
        procObj.errors = [];
    } else {
        // delete to old errors
        for (let e = procObj.errors.length - 1; e >= 0; e--) {
            if (now - procObj.errors[e].ts > 30_000) {
                procObj.errors.splice(0, e);
                break;
            }
        }
    }
}

/** Options for `determineRebuildArgsFromLog` */
export interface DetermineRebuildArgsOptions {
    /** The log text of the crashed adapter */
    text: string;
    /** The logger to write potential errors to */
    logger: ControllerLogger;
    /** Prefix of all log messages */
    logPrefix: string;
}

/**
 * Parses out the rebuild path, name and version from an error log
 *
 * @param options The log text and the logging context
 */
export function determineRebuildArgsFromLog(options: DetermineRebuildArgsOptions): RebuildArgs | undefined {
    const { text, logger, logPrefix } = options;
    let matches;

    // Try to get a path for this case after a →
    if (text.includes('Could not locate the bindings file.')) {
        matches = text.match(/→ (.+)$/gm);
        if (matches) {
            matches.shift(); // we need to remove the first element from match
        }
    }

    // else, extract a rebuild path the standard way - it is always
    // between the only two single quotes
    if (!matches) {
        matches = text.match(/'.+'/g);
    }

    if (matches) {
        // We only check the first path like entry
        // remove the quotes
        let rebuildPath = matches[0].replace(/'/g, '');
        if (path.isAbsolute(rebuildPath)) {
            // we have found a module which needs rebuild - we need to find the deepest pack.json
            rebuildPath = path.dirname(rebuildPath);
            const rootDir = path.parse(process.cwd()).root;

            while (rebuildPath !== rootDir) {
                const packPath = path.join(rebuildPath, 'package.json');
                if (fs.pathExistsSync(packPath)) {
                    try {
                        const packJson = fs.readJsonSync(packPath);
                        // step outside the module dir itself
                        rebuildPath = path.join(rebuildPath, '..');

                        return { path: rebuildPath, module: packJson.name, version: packJson.version };
                    } catch (e) {
                        logger.error(`${logPrefix} Could not determine rebuild arguments: ${e.message}`);
                        return;
                    }
                } else {
                    rebuildPath = path.join(rebuildPath, '..');
                }
            }
        }
    }
}
