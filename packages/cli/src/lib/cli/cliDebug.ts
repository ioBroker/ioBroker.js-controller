import * as CLI from './messages.js';
import { CLICommand, type CLICommandOptions } from './cliCommand.js';
import * as CLITools from './cliTools.js';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';
import { fork } from 'node:child_process';

/** Command ioBroker debug ... */
export class CLIDebug extends CLICommand {
    constructor(options: CLICommandOptions) {
        super(options);
    }

    /**
     * Checks if the adapter instance is running
     *
     * @param adapter adapter name
     * @param instance instance id
     */
    private _isInstanceRunning(adapter: string, instance: string): Promise<boolean> {
        const { dbConnect } = this.options;
        return new Promise(resolve => {
            dbConnect(async ({ states }) => {
                try {
                    const state = await states.getStateAsync(`system.adapter.${adapter}.${instance}.alive`);
                    if (state?.val) {
                        resolve(true);
                        return;
                    }
                } catch {
                    // ignore
                }
                resolve(false);
            });
        });
    }

    /**
     * Executes a command
     *
     * @param args
     */
    async execute(args: any[]): Promise<void> {
        const { callback, ...params } = this.options;
        const adapter = args[0];
        if (!adapter) {
            CLI.error.requiredArgumentMissing('adaptername', 'debug <adaptername>');
            return void callback(34);
        }

        const { name, instance } = CLITools.splitAdapterOrInstanceIdentifierWithVersion(adapter)!;

        if (await this._isInstanceRunning(name, instance || '0')) {
            CLI.error.instanceAlreadyRunning(`${name}.${instance || '0'}`);
            return void callback(EXIT_CODES.ADAPTER_ALREADY_RUNNING);
        }

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
            `--inspect${params.wait ? '-brk' : ''}${!!params.ip || !!params.port ? '=' : ''}${params.ip || ''}${
                !!params.ip && !!params.port ? ':' : ''
            }${params.port || ''}`,
        ];
        // And wait until the sub process has finished
        const cp = fork(mainFile, adapterArgs, {
            cwd: adapterDir,
            execArgv: nodeArgs,
        });
        cp.on('exit', code => callback(code || 0));
    }
}
