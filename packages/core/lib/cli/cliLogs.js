'use strict';
// const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const { getConfigFileName } = require('../tools');
const chokidar = require('chokidar');
const fs = require('fs-extra');
const os = require('os');
const es = require('event-stream');
const tools = require('../tools');

/** Command ioBroker state ... */
module.exports = class CLILogs extends CLICommand {

    /** @param {import('./cliCommand').CLICommandOptions} options */
    constructor(options) {
        super(options);
        /** @type {Map<string, number>} */
        this.fileSizes = new Map();
        this.isReady = false;
    }

    /**
     * Executes a command
     * @param {any[]} args
     */
    execute(args, params) {

        /** @type {string | undefined} */
        const adapterName = args[0];
        const watch = params.watch || params.w;
        const count = params.lines || 1000;
        /** @type {CLILogsOptions} */
        const options = {
            complete: this.options['all'],
            adapterName
        };

        const config = fs.readJSONSync(require.resolve(getConfigFileName()));
        const logger = require('../logger')(config.log);
        let fileName = logger.getFileName();
        if (fileName) {
            let lines = fs.readFileSync(fileName).toString('utf-8').split('\n');
            lines = lines.filter(line => line);
            if (lines.length > count) {
                lines.splice(0, lines.length - count);
            }
            let regex;
            if (adapterName) {
                //2019-03-02 13:26:54.698  - debug: iot.0 [ALEXA] Created ALEXA device: Bad.Hauptlicht.Aktor.STATE ["turnOn","turnOff"]
                regex = new RegExp(': ' + adapterName + '\\.');
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
                chokidar.watch(`${parts.join('/')}/iobroker*`, {awaitWriteFinish: {stabilityThreshold: 500}})
                    .on('all', this.watchHandler.bind(this, options))
                    .on('ready', () => this.isReady = true)
                ;
            }
        } else {
            console.log('No log file found');
        }
    }

    /**
     * @typedef CLILogsOptions
     * @property {boolean} [complete] Whether to show today's full log
     * @property {string} [adapterName] An optional adapter name to filter by
     */

    /**
     * Called by chokidar when watched files change
     * @param {CLILogsOptions} options some options
     * @param {string} event The type of change
     * @param {*} path Which path has changed
     * @param {*} stats Information about the file
     */
    watchHandler(options, event, path, stats) {
        if (event === 'add' || !this.fileSizes.has(path)) {
            this.fileSizes.set(path, stats.size);
            if (
                stats.size > 0 && (
                    this.isReady
                    || (options.complete && this.isTodaysLogfile(path))
                )
            ) {
                this.streamChange(path, 0, options);
            }
        } else if (event === 'change') {
            const oldFileSize = this.fileSizes.get(path);
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
     * @param {string} path The log file path
     */
    isTodaysLogfile(path) {
        const YYYYMMDDDate = new Date().toJSON().slice(0, 10);
        return path.indexOf(YYYYMMDDDate) > -1;
    }

    /**
     * Streams a portion of a file to the console
     * @param {string} path The file to stream
     * @param {number} start The offset in bytes where to start
     * @param {CLILogsOptions} options some options
     */
    streamChange(path, start, options) {
        const input = fs.createReadStream(path, {
            encoding: 'utf8',
            start: start,
            autoClose: true
        });
        if (options.adapterName) {
            // Read the input line by line and only include the lines matching the filter
            input
                .pipe(es.split())
                // @ts-ignore
                .pipe(es.filterSync(line => line.indexOf(options.adapterName) > -1))
                .pipe(es.mapSync(line => line + os.EOL))
                .pipe(process.stdout)
            ;
        } else {
            // just pipe the input through
            tools.pipeLinewise(input, process.stdout);
        }
    }
};

