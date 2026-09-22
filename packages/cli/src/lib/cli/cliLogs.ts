import { CLICommand, type CLICommandOptions } from './cliCommand.js';
import {
    tools,
    logger as toolsLogger,
    EXIT_CODES,
    LOG_LEVELS,
    isLogLevelAtLeast,
    parseLogEntryHeader,
} from '@iobroker/js-controller-common';
import chokidar from 'chokidar';
import fs from 'fs-extra';
import os from 'node:os';
import es from 'event-stream';
import { createRequire } from 'node:module';
// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

const { getConfigFileName } = tools;

interface CLILogsOptions {
    /** Whether to show today's full log */
    complete?: boolean;
    /** An optional RegExp to filter by */
    regex?: RegExp;
    /** The lowest level to still show, if the output is restricted to a severity */
    minLevel?: ioBroker.LogLevel;
}

/** Command ioBroker state ... */
export class CLILogs extends CLICommand {
    private readonly fileSizes = new Map<string, number>();
    private isReady = false;
    /** Whether the log entry currently being read passed the level filter */
    private showCurrentEntry = true;

    /**
     * @param options The command options including context and parameters
     */
    constructor(options: CLICommandOptions) {
        super(options);
    }

    /**
     * Executes a command
     *
     * @param args The command arguments (the first is the sub-command)
     * @param params additional parsed CLI parameters
     */
    execute(args: string[], params: Record<string, any>): void {
        const adapterName = args[0];
        const watch = params.watch || params.w;
        const count = params.lines || 1_000;

        const options: CLILogsOptions = {
            complete: this.options.all,
        };

        // Optional, so calls without a level keep showing everything as before
        if (params.level !== undefined) {
            const level = String(params.level).toLowerCase();

            if (!tools.isLogLevel(level)) {
                console.error(`Unknown log level "${params.level}". Use one of: ${LOG_LEVELS.join(', ')}`);
                return void this.options.callback(EXIT_CODES.UNKNOWN_ERROR);
            }

            options.minLevel = level;
        }

        const config = fs.readJSONSync(require.resolve(getConfigFileName()));
        const logger = toolsLogger(config.log);
        // @ts-expect-error todo adjust logger type
        let fileName = logger.getFileName();
        if (fileName) {
            let lines = fs.readFileSync(fileName).toString('utf-8').split('\n');
            lines = lines.filter(line => line);
            if (lines.length > count) {
                lines.splice(0, lines.length - count);
            }
            let regex: RegExp;
            if (adapterName) {
                //2019-03-02 13:26:54.698  - debug: iot.0 [ALEXA] Created ALEXA device: Bad.Hauptlicht.Aktor.STATE ["turnOn","turnOff"]
                regex = new RegExp(`: ${adapterName}\\.`);
                options.regex = regex;
            }
            lines.forEach(line => {
                if (!this.matches(line, options)) {
                    return;
                }
                console.log(line);
            });

            if (watch) {
                fileName = fileName.replace(/\\/g, '/');
                const parts = fileName.split('/');
                parts.pop();
                chokidar
                    .watch(`${parts.join('/')}/iobroker*`, {
                        awaitWriteFinish: { stabilityThreshold: 500 },
                        followSymlinks: false,
                    })
                    .on('all', this.watchHandler.bind(this, options))
                    .on('ready', () => (this.isReady = true));
            }
        } else {
            console.log('No log file found');
        }
    }

    /**
     * Called by chokidar when watched files change
     *
     * @param options some options
     * @param event The type of change
     * @param path Which path has changed
     * @param stats Information about the file
     * @param stats.size The current size of the file in bytes
     */
    watchHandler(
        options: CLILogsOptions,
        event: string,
        path: string,
        stats?: {
            size: number;
        },
    ): void {
        if (!stats) {
            return;
        }
        if (event === 'add' || !this.fileSizes.has(path)) {
            this.fileSizes.set(path, stats.size);
            if (stats.size > 0 && (this.isReady || (options.complete && this.isTodaysLogfile(path)))) {
                this.streamChange(path, 0, options);
            }
        } else if (event === 'change') {
            const oldFileSize = this.fileSizes.get(path)!;
            this.fileSizes.set(path, stats.size);
            if (this.isReady && stats.size > oldFileSize) {
                this.streamChange(path, oldFileSize, options);
            }
        } else if (event === 'unlink') {
            this.fileSizes.delete(path);
        }
    }

    /**
     * If the log file belongs to today
     *
     * @param path The log file path
     */
    isTodaysLogfile(path: string): boolean {
        const YYYYMMDDDate = new Date().toJSON().slice(0, 10);
        return path.includes(YYYYMMDDDate);
    }

    /**
     * Streams a portion of a file to the console
     *
     * @param path The file to stream
     * @param start The offset in bytes where to start
     * @param options some options
     */
    streamChange(path: string, start: number, options: CLILogsOptions): void {
        const input = fs.createReadStream(path, {
            encoding: 'utf8',
            start,
            autoClose: true,
        });
        if (options.regex || options.minLevel) {
            // Read the input line by line and only include the lines matching the filter
            input
                .pipe(es.split())
                .pipe(es.filterSync((line: string) => this.matches(line, options)))
                .pipe(es.mapSync((line: string) => line + os.EOL))
                .pipe(process.stdout);
        } else {
            // just pipe the input through
            tools.pipeLinewise(input, process.stdout);
        }
    }

    /**
     * Check a log line against the active filters
     *
     * A log entry can span several lines, e.g. a stack trace, and only its first line carries the
     * level. Those follow-up lines inherit the decision made for the entry they belong to, so
     * filtering by level does not cut a stack trace in half. Which lines start an entry is decided
     * by the shared parser, the same one the host commands `getLogs` and `searchLogs` use: it takes
     * a level only where the time stamp of an entry is, so a level quoted inside a message does not
     * count as one.
     *
     * @param line the log line to check
     * @param options the active filters
     */
    private matches(line: string, options: CLILogsOptions): boolean {
        if (options.minLevel) {
            const header = parseLogEntryHeader(line);

            if (header) {
                this.showCurrentEntry = isLogLevelAtLeast(header.level, options.minLevel);
            }

            if (!this.showCurrentEntry) {
                return false;
            }
        }

        if (options.regex && !options.regex.test(line)) {
            return false;
        }

        return true;
    }
}
