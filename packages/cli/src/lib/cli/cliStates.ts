import { tools } from '@iobroker/js-controller-common';
import { CLICommand, CLICommandOptions } from './cliCommand.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CLI = require('./messages.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { formatValue } = require('./cliTools');
import * as rl from 'readline-sync';

const ALIAS_STARTS_WITH = 'alias.';

type ResultTransform = (input: any) => any;

/** Command iobroker state ... */
export class CLIStates extends CLICommand {
    constructor(options: CLICommandOptions) {
        super(options);
    }

    /**
     * Executes a command
     * @param args
     */
    execute(args: any[]): void {
        const { callback, pretty, showHelp } = this.options;
        const command = args[0];
        let resultTransform: ResultTransform;

        switch (command) {
            case 'get':
                resultTransform = obj => formatValue(obj, pretty);
                return this.get_(args, resultTransform);
            case 'getPlain':
            case 'getplain':
                resultTransform = obj => {
                    if (!obj) {
                        return 'null';
                    }

                    return [obj.val, obj.ack, obj.from, obj.ts, obj.lc].map(line => formatValue(line)).join('\n');
                };
                return this.get_(args, resultTransform);
            case 'getValue':
            case 'getvalue':
                resultTransform = obj => (obj ? formatValue(obj.val, pretty) : 'null');
                return this.get_(args, resultTransform);
            case 'getBinary':
            case 'getbinary':
                return this._getBinary(args);
            case 'set':
                return this.set_(args);
            case 'chmod':
            case 'chown':
                CLI.error.wrongCommandPrefix('state', command, 'object');
                return void callback(3);
            case 'delete':
            case 'del':
                return this.delete(args);
            case 'getDBVersion':
                return this.getDBVersion();
            case 'setDBVersion':
                return this.setDBVersion();
            default:
                CLI.error.unknownCommand('state', command);
                showHelp();
                return void callback(3);
        }
    }

    /**
     * Get the protocol version
     */
    getDBVersion(): void {
        const { callback, dbConnect } = this.options;
        dbConnect(async (objects, states) => {
            const version = await states.getProtocolVersion();
            console.log(`Current States DB protocol version: ${version}`);
            return void callback(0);
        });
    }

    /**
     * Set protocol version
     */
    setDBVersion(): void {
        const { callback, dbConnect } = this.options;
        dbConnect(async (objects, states) => {
            let answer = rl.question('Changing the protocol version will restart all hosts! Continue? [N/y]', {
                limit: /^(yes|y|n|no)$/i,
                defaultInput: 'no'
            });

            answer = answer.toLowerCase();

            if (answer !== 'y' && answer !== 'yes') {
                console.log('Protocol version has not been changed!');
                return void callback(0);
            }

            try {
                await states.setProtocolVersion(this.options.version);
            } catch (e) {
                console.error(`Cannot update protocol version: ${e.message}`);
                return void callback(1);
            }
            console.log(`States DB protocol updated to version ${this.options.version}`);
            return void callback(0);
        });
    }

    /**
     * Checks if state is a binary state
     * @param id id of the state
     * @param {object} objects the objects db
     * @param {ioBroker.OtherObject?} _obj cached object
     */
    private async _isBinary(id: string, objects: ObjectsClient, _obj?: ioBroker.AnyObject | null): Promise<boolean> {
        const obj = _obj || (await objects.getObjectAsync(id));

        return !!(obj && ('binary' in obj || (obj.common && 'type' in obj.common && obj.common.type === 'file')));
    }

    /**
     * Get and show binary state
     *
     * @param args
     */
    private _getBinary(args: any[]): void {
        const { callback, dbConnect } = this.options;
        const id = args[1];
        dbConnect(async (objects, states) => {
            try {
                // @ts-expect-error #1917
                const state = await states.getBinaryState(id);

                if (!state) {
                    CLI.error.stateNotFound(id);
                    return void callback(1);
                }

                if (Buffer.isBuffer(state)) {
                    // console.log would append new lines which will mess up the result
                    process.stdout.write(state, this.options.encoding);
                    return void callback(0);
                } else {
                    CLI.error.stateNotBinary(id);
                    return void callback(1);
                }
            } catch (e) {
                CLI.error.unknown(e);
                return void callback(1);
            }
        });
    }

    /**
     * Returns the value of a state
     * @param args
     * @param resultTransform
     */
    get_(args: any[], resultTransform: ResultTransform): void {
        const { callback, dbConnect } = this.options;
        const id = args[1];

        if (!id) {
            CLI.error.stateNotFound(id);
            return;
        }

        dbConnect(async (objects, states) => {
            if (id.startsWith(ALIAS_STARTS_WITH)) {
                objects.getObject(id, (err, targetObj) => {
                    // alias
                    if (targetObj && targetObj.common && 'alias' in targetObj.common && targetObj.common.alias.id) {
                        const aliasId =
                            typeof targetObj.common.alias.id.read === 'string'
                                ? targetObj.common.alias.id.read
                                : targetObj.common.alias.id;
                        objects.getObject(aliasId, async (err, sourceObj) => {
                            // read target
                            try {
                                // @ts-expect-error TODO All objects should be assignable to AnyObject?
                                if (await this._isBinary(aliasId, objects, targetObj)) {
                                    CLI.error.stateBinaryGetUnsupported(aliasId);
                                    return void callback(1);
                                }

                                const state = await states.getStateAsync(aliasId);
                                if (!state) {
                                    CLI.error.stateNotFound(id);
                                } else {
                                    // @ts-expect-error fix after #1917
                                    tools.formatAliasValue(sourceObj?.common, targetObj.common, state, console, '');
                                    console.log(resultTransform(state));
                                }
                            } catch (e) {
                                CLI.error.unknown(e);
                            }
                            return void callback(0);
                        });
                    } else {
                        CLI.error.unknown(err || `Alias ${id} has no target`);
                        return void callback(1); // ?
                    }
                });
            } else {
                try {
                    if (await this._isBinary(id, objects)) {
                        CLI.error.stateBinaryGetUnsupported(id);
                        return void callback(1);
                    }
                    const state = await states.getStateAsync(id);
                    if (!state) {
                        CLI.error.stateNotFound(id);
                    } else {
                        console.log(resultTransform(state));
                    }
                } catch (e) {
                    CLI.error.unknown(e);
                }
                return void callback(0);
            }
        });
    }

    /**
     * @param args
     */
    set_(args: any[]): void {
        const { callback, dbConnect, showHelp } = this.options;
        // eslint-disable-next-line prefer-const
        let [id, val, ack] = args.slice(1) as [string, any, any];
        const force = args.includes('--force') || args.includes('-f');

        if (val === undefined) {
            CLI.error.requiredArgumentMissing('value');
            showHelp();
            return void callback(0);
        }

        if (ack !== undefined) {
            ack = ack === 'true' || ack === '1' || ack === 1 || ack === true;
        }

        dbConnect((objects, states) => {
            const newVal = ack === undefined ? { val, ack: false } : { val, ack: !!ack };

            if (id.startsWith(ALIAS_STARTS_WITH)) {
                objects.getObject(id, async (err, obj) => {
                    if (await this._isBinary(id, objects, obj)) {
                        CLI.error.stateBinarySetUnsupported(id);
                        return void callback(1);
                    }
                    // alias
                    if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                        const aliasId =
                            typeof obj.common.alias.id.write === 'string'
                                ? obj.common.alias.id.write
                                : obj.common.alias.id;

                        objects.getObject(aliasId, (err, targetObj) => {
                            if (err) {
                                CLI.error.unknown(err);
                                return void callback(1); // access error
                            }
                            if (!obj && !force) {
                                CLI.error.objectNotFound(id, 'null');
                                return void callback(1); // object not exists
                            }

                            if (obj && obj.common && obj.common.type) {
                                if (obj.common.type === 'string') {
                                    newVal.val = newVal.val.toString();
                                } else if (obj.common.type === 'number') {
                                    newVal.val = parseFloat(newVal.val);
                                } else if (obj.common.type === 'boolean') {
                                    newVal.val = newVal.val.toString();
                                    newVal.val =
                                        newVal.val === 'true' ||
                                        newVal.val === '1' ||
                                        newVal.val === 'ON' ||
                                        newVal.val === 'on';
                                }
                            }

                            // write target
                            states.setState(
                                aliasId,
                                // @ts-expect-error fix after #1917
                                tools.formatAliasValue(obj.common, targetObj.common, newVal, console, ''),
                                err => {
                                    if (err) {
                                        CLI.error.unknown(err);
                                        return void callback(1); // ?
                                    } else {
                                        CLI.success.stateUpdated(id, val, !!ack);
                                        return void callback(0);
                                    }
                                }
                            );
                        });
                    } else {
                        CLI.error.unknown(`Alias ${id} has no target`);
                        return void callback(1); // ?
                    }
                });
            } else {
                objects.getObject(id, async (err, obj) => {
                    if (err) {
                        CLI.error.unknown(err);
                        return void callback(1); // access error
                    }

                    if (await this._isBinary(id, objects, obj)) {
                        CLI.error.stateBinarySetUnsupported(id);
                        return void callback(1);
                    }

                    if (!obj && !force) {
                        CLI.error.objectNotFound(id, 'null');
                        return void callback(1); // object not exists
                    }

                    if (obj && obj.common && obj.common.type) {
                        if (obj.common.type === 'string') {
                            newVal.val = newVal.val.toString();
                        } else if (obj.common.type === 'number') {
                            newVal.val = parseFloat(newVal.val);
                        } else if (obj.common.type === 'boolean') {
                            newVal.val = newVal.val.toString();
                            newVal.val =
                                newVal.val === 'true' ||
                                newVal.val === '1' ||
                                newVal.val === 'ON' ||
                                newVal.val === 'on';
                        }
                    }

                    states.setState(id, newVal, err => {
                        if (err) {
                            CLI.error.unknown(err);
                            return void callback(1); // ?
                        } else {
                            CLI.success.stateUpdated(id, val, !!ack);
                            return void callback(0);
                        }
                    });
                });
            }
        });
    }

    /**
     * Deletes a state
     * @param args
     */
    delete(args: any[]): void {
        const { callback, dbConnect } = this.options;
        const id: string = args[1];
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'state delete id');
            return void callback(1);
        }

        dbConnect((objects, states) =>
            states.delState(id, err => {
                if (err) {
                    CLI.error.stateNotFound(id, err);
                    return void callback(3);
                } else {
                    CLI.success.stateDeleted(id);
                    return void callback(0);
                }
            })
        );
    }
}
