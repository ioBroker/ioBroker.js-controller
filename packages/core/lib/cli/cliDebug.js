'use strict';
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const CLITools = require('./cliTools');
const tools = require('../tools.js');
const child_process = require('child_process');

/** Command ioBroker debug ... */
module.exports = class CLICompact extends CLICommand {
    /** @param {import('./cliCommand.js').CLICommandOptions} options */
    constructor(options) {
        super(options);
    }

    /**
     * Executes a command
     * @param {any[]} args
     */
    async execute(args) {
        const { callback, ...params } = this.options;
        const adapter = args[0];
        if (!adapter) {
            CLI.error.requiredArgumentMissing(
                'adaptername',
                'debug <adaptername>'
            );
            return void callback(34);
        }

        const { instance } = CLITools.splitAdapterOrInstanceIdentifierWithVersion(adapter);

        const adapterDir = tools.getAdapterDir(adapter);
        if (!adapterDir) {
            CLI.error.adapterDirNotFound(adapter);
            return void callback(34);
        }

        let mainFile;
        try {
            mainFile = await tools.resolveAdapterMainFile(adapter);
        } catch {
            CLI.error.mainFileNotFound(adapter);
            return callback(1);
        }

        // Start the adapter with force and console logs
        const adapterArgs = [instance || '0', '--debug'];
        // Tell node to attach a debugger
        const nodeArgs = [
            ...tools.getDefaultNodeArgs(mainFile),
            // --inspect[-brk][=[ip]:[port]]
            `--inspect${params.wait ? '-brk' : ''}${
                !!params.ip || !!params.port ? '=' : ''
            }${params.ip || ''}${
                !!params.ip && !!params.port ? ':' : ''
            }${params.port || ''}`
        ];
        // And wait until the sub process has finished
        const cp = child_process.fork(mainFile, adapterArgs, {
            cwd: adapterDir,
            execArgv: nodeArgs
        });
        cp.on('exit', code => callback(code || 0));
    }
};
