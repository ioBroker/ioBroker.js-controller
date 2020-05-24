'use strict';
const tools             = require('../tools');
const CLI               = require('./messages.js');
const CLICommand        = require('./cliCommand.js');
const {formatValue}     = require('./cliTools');
const ALIAS_STARTS_WITH = 'alias.';

/** Command iobroker state ... */
module.exports = class CLIStates extends CLICommand {

    /** @param {import('./cliCommand').CLICommandOptions} options */
    constructor(options) {
        super(options);
    }

    /**
     * Executes a command
     * @param {any[]} args
     */
    execute(args) {
        const { callback, pretty, showHelp } = this.options;
        const command = args[0];
        let resultTransform;

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

                    return [
                        obj.val,
                        obj.ack,
                        obj.from,
                        obj.ts,
                        obj.lc
                    ].map(line => formatValue(line)).join('\n');
                };
                return this.get_(args, resultTransform);
            case 'getValue':
            case 'getvalue':
                resultTransform = obj => obj ? formatValue(obj.val, pretty) : 'null';
                return this.get_(args, resultTransform);
            case 'set':
                return this.set_(args);
            case 'chmod':
            case 'chown':
                CLI.error.wrongCommandPrefix('state', command, 'object');
                return void callback(3);
            case 'delete':
            case 'del':
                return this.delete(args);
            default:
                CLI.error.unknownCommand('state', command);
                showHelp();
                return void callback(3);
        }
    }

    /**
     * Returns the value of a state
     * @param {any[]} args
     * @param {(input: any) => any} resultTransform
     */
    get_(args, resultTransform) {
        const {callback, dbConnect} = this.options;
        const id = args[1];

        dbConnect((objects, states) => {
            if (id.startsWith(ALIAS_STARTS_WITH)) {
                objects.getObject(id, (err, targetObj) => {
                    // alias
                    if (targetObj && targetObj.common && targetObj.common.alias && targetObj.common.alias.id) {
                        const aliasId = typeof targetObj.common.alias.id.read === 'string' ? targetObj.common.alias.id.read : targetObj.common.alias.id;
                        objects.getObject(aliasId, (err, sourceObj) => {
                            // write target
                            states.getState(aliasId, (err, state) => {
                                if (err || !targetObj) {
                                    CLI.error.unknown(err);
                                } else {
                                    tools.formatAliasValue(sourceObj.common, targetObj.common, state, console, '');
                                    console.log(resultTransform(state));
                                }
                                return void callback();
                            });
                        });
                    } else {
                        CLI.error.unknown(err || `Alias ${id} has no target`);
                        return void callback(1); // ?
                    }
                });
            } else {
                states.getState(id, (err, state) => {
                    if (err || !state) {
                        CLI.error.stateNotFound(id, err);
                    } else {
                        console.log(resultTransform(state));
                    }
                    return void callback();
                });
            }
        });
    }

    /**
     * @param {any[]} args
     */
    set_(args) {
        const {callback, dbConnect, showHelp} = this.options;
        // eslint-disable-next-line prefer-const
        let [id, val, ack] = /** @type {[string, any, any]} */ (args.slice(1));
        const force = args.includes('--force') || args.includes('-f');

        if (val === undefined) {
            CLI.error.requiredArgumentMissing('value');
            showHelp();
            return void callback();
        }

        if (ack !== undefined) {
            ack = ack === 'true' || ack === '1' || ack === 1 || ack === true;
        }

        dbConnect((objects, states) => {
            const newVal = ack === undefined ?  {val, ack: false} : {val, ack: !!ack};

            if (id.startsWith(ALIAS_STARTS_WITH)) {
                objects.getObject(id, (err, obj) => {
                    // alias
                    if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                        const aliasId = typeof obj.common.alias.id.write === 'string' ? obj.common.alias.id.write : obj.common.alias.id;

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
                                    newVal.val = newVal.val === 'true' || newVal.val === '1' || newVal.val === 'ON' || newVal.val === 'on';
                                }
                            }

                            // write target
                            states.setState(aliasId, tools.formatAliasValue(obj.common, targetObj.common, newVal, console, ''), err => {
                                if (err) {
                                    CLI.error.unknown(err);
                                    return void callback(1); // ?
                                } else {
                                    CLI.success.stateUpdated(id, val, !!ack);
                                    return void callback();
                                }
                            });
                        });
                    } else {
                        CLI.error.unknown(`Alias ${id} has no target`);
                        return void callback(1); // ?
                    }
                });
            } else {
                objects.getObject(id, (err, obj) => {
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
                            newVal.val = newVal.val === 'true' || newVal.val === '1' || newVal.val === 'ON' || newVal.val === 'on';
                        }
                    }

                    states.setState(id, newVal, err => {
                        if (err) {
                            CLI.error.unknown(err);
                            return void callback(1); // ?
                        } else {
                            CLI.success.stateUpdated(id, val, !!ack);
                            return void callback();
                        }
                    });
                });
            }
        });
    }

    /**
     * Deletes a state
     * @param {any[]} args
     */
    delete(args) {
        const {callback, dbConnect} = this.options;
        /** @type {string} */
        const id = args[1];
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
                    return void callback();
                }
            }));
    }
};
