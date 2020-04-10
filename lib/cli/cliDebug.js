'use strict';
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const tools = require('../tools.js');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

/** Command ioBroker compact ... */
module.exports = class CLICompact extends CLICommand {
    /** @param {import('./cliCommand.js').CLICommandOptions} options */
    constructor(options) {
        super(options);
    }

    /**
     * Executes a command
     * @param {any[]} args
     */
    execute(args) {
        const { callback, ...params } = this.options;
        const adapter = args[0];
        if (!adapter) {
            CLI.error.requiredArgumentMissing(
                'adaptername',
                'debug <adaptername>'
            );
            return void callback(34);
        }

        const adapterDir = tools.getAdapterDir(adapter);
        if (!adapterDir) {
            CLI.error.adapterDirNotFound(adapter);
            return void callback(34);
        }

        let ioPack;
        try {
            ioPack = JSON.parse(
                fs.readFileSync(
                    path.join(adapterDir, 'io-package.json'),
                    'utf8'
                )
            );
        } catch (e) {
            CLI.error.cannotLoadIoPackage(adapter);
            return void callback(34);
        }

        const possibleMainFiles = [
            ioPack.common.main,
            'main.js',
            `${adapter}.js`
        ];
        // Try all possible main files
        for (const mainFile of possibleMainFiles) {
            const fullFileName = path.join(adapterDir, mainFile);
            if (fs.existsSync(fullFileName)) {
                // Start the adapter with force and console logs
                const adapterArgs = ['--force', '--logs'];
                // Tell node to attach a debugger
                const nodeArgs = [
                    // --inspect[-brk][=[ip]:[port]]
                    `--inspect${params.wait ? '-brk' : ''}${
                        !!params.ip || !!params.port ? '=' : ''
                    }${params.ip || ''}${
                        !!params.ip && !!params.port ? ':' : ''
                    }${params.port || ''}`
                ];
                // And wait until the sub process has finished
                const cp = child_process.fork(fullFileName, adapterArgs, {
                    cwd: adapterDir,
                    execArgv: nodeArgs
                });
                cp.on('exit', code => callback(code || 0));
                // We've found our main file
                return;
            }
        }

        CLI.error.mainFileNotFound(adapter);
        callback(1);
    }
};
