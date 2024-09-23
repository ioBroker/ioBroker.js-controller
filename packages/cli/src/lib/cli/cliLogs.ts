import { CLICommand, type CLICommandOptions } from './cliCommand.js';
import { tools, logger as toolsLogger } from '@iobroker/js-controller-common';
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
}

/** Command ioBroker state ... */
export class CLILogs extends CLICommand {
    private readonly fileSizes = new Map<string, number>();
    private isReady = false;

    constructor(options: CLICommandOptions) {
        super(options);
    }

    /**
     * Executes a command
     *
     * @param args
     * @param params additional parsed CLI parameters
     */
    execute(args: any[], params: Record<string, any>): void {
        const adapterName = args[0];
        const watch = params.watch || params.w;
        const count = params.lines || 1_000;

        const options: CLILogsOptions = {
            complete: this.options.all,
        };

        const config = fs.readJSONSync(require.resolve(getConfigFileName()));
        const logger = toolsLogger(config.log);
        /** @ts-expect-error todo adjust logger type */
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
                if (regex && !regex.test(line)) {
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
     */
    watchHandler(options: CLILogsOptions, event: string, path: string, stats: Record<string, any>): void {
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
        if (options.regex) {
            // Read the input line by line and only include the lines matching the filter
            input
                .pipe(es.split())
                .pipe(es.filterSync(line => options.regex!.test(line)))
                .pipe(es.mapSync((line: string) => line + os.EOL))
                .pipe(process.stdout);
        } else {
            // just pipe the input through
            tools.pipeLinewise(input, process.stdout);
        }
    }
}
