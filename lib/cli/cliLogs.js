'use strict';
// const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const { getDefaultDataDir } = require('../tools');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

/** Command iobroker state ... */
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
    execute(args) {

        /** @type {string} */
        const param = args[0];
        /** @type {WatchHandlerOptions} */
        const options = {
            complete: param === 'all'
        };

        // TODO: There must be a better way to find the log dir
        const logDir = path.join(
            __dirname, // from here
            '../..', // go to js-controller root
            // and from there to the logs dir
            getDefaultDataDir().replace(/\/[^/]+\/?$/, '/log')
        );
        chokidar.watch(`${logDir}/iobroker*`, { awaitWriteFinish: { stabilityThreshold: 500 } })
            .on('all', this.watchHandler.bind(this, options))
            .on('ready', () => this.isReady = true)
        ;
    }

    /**
     * @typedef WatchHandlerOptions
     * @property {boolean} [complete] Whether to show today's full log
     */

    /**
     * Called by chokidar when watched files change
     * @param {WatchHandlerOptions} options some options
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
                this.streamChange(path, 0);
            }
        } else if (event === 'change') {
            const oldFileSize = this.fileSizes.get(path);
            this.fileSizes.set(path, stats.size);
            if (this.isReady && stats.size > oldFileSize) {
                this.streamChange(path, oldFileSize);
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
     */
    streamChange(path, start) {
        fs.createReadStream(path, {
            encoding: 'utf8',
            start: start,
            autoClose: true
        }).pipe(process.stdout);
    }
};

