'use strict';
// const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const {getDefaultDataDir} = require('../tools');
const chokidar = require('chokidar');
const fs = require('fs');

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
     * @param {any[]} _args
     */
    execute(_args) {
        // TODO: There must be a better way to find the log dir
        const logDir = getDefaultDataDir().replace(/\/[^/]+\/?$/, '/log');
        chokidar.watch(`${logDir}/iobroker*`)
            .on('all', this.watchHandler.bind(this))
            .on('ready', () => this.isReady = true)
        ;
    }

    /**
     * Called by chokidar when watched files change
     * @param {string} event The type of change
     * @param {*} path Which path has changed
     * @param {*} stats Information about the file
     */
    watchHandler(event, path, stats) {
        if (event === 'add' || !this.fileSizes.has(path)) {
            this.fileSizes.set(path, stats.size);
            if (this.isReady && stats.size > 0) {
                this.streamChange(path, 0, stats.size);
            }
        } else if (event === 'change') {
            const oldFileSize = this.fileSizes.get(path);
            this.fileSizes.set(path, stats.size);
            if (this.isReady && stats.size > oldFileSize) {
                this.streamChange(path, oldFileSize, stats.size);
            }
        } else if (event === 'unlink') {
            this.fileSizes.delete(path);
        }
    }

    /**
     * Streams a portion of a file to the console
     * @param {string} path The file to stream
     * @param {number} from The offset in bytes where to start
     * @param {number} to The offset in bytes where to end (exclusive)
     */
    streamChange(path, from, to) {
        fs.createReadStream(path, {
            encoding: 'utf8',
            start: from,
            end: to - 1,
            autoClose: true
        }).pipe(process.stdout);
    }
};

