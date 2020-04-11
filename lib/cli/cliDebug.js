'use strict';
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const tools = require('../tools.js');
const fs = require('fs');
const path = require('path');
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

        // Compile a list of all possible main files
        const possibleMainFiles = [
            'main.js',
            `${adapter}.js`
        ];

        // Add package.json -> main as the 2nd choice
        try {
            const pack = JSON.parse(
                fs.readFileSync(
                    path.join(adapterDir, 'package.json'),
                    'utf8'
                )
            );
            if (pack && typeof pack.main === 'string') {
                possibleMainFiles.unshift(pack.main);
            }
        } catch (e) {
            // Ignore, we have fallback solutions
        }

        // Add io-package.json -> common.main as the preferred choice
        try {
            const ioPack = JSON.parse(
                fs.readFileSync(
                    path.join(adapterDir, 'io-package.json'),
                    'utf8'
                )
            );
            if (ioPack && ioPack.common && typeof ioPack.common.main === 'string') {
                possibleMainFiles.unshift(ioPack.common.main);
            }
        } catch (e) {
            // Ignore, we have fallback solutions
        }

        // Try all possible main files
        for (const mainFile of possibleMainFiles) {
            const fullFileName = path.join(adapterDir, mainFile);
            if (fs.existsSync(fullFileName)) {
                // Start the adapter with force and console logs
                const adapterArgs = ['--debug'];
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
