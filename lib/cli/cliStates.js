'use strict';
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const { formatValue } = require('./cliTools');
const tools = require('../tools.js');

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
                resultTransform = (obj) => formatValue(obj, pretty);
                return this.get(args, resultTransform);
            case 'getplain':
                resultTransform = (obj) => {
                    if (obj == undefined) return 'null';
                    return [
                        obj.val,
                        obj.ack,
                        obj.from,
                        obj.ts,
                        obj.lc
                    ].map(line => formatValue(line)).join('\n');
                };
                return this.get(args, resultTransform);
            case 'getvalue':
                resultTransform = (obj) => obj != undefined ? formatValue(obj, pretty) : 'null';
                return this.get(args, resultTransform);
            case 'set':
                return this.set(args);
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
    get(args, resultTransform) {
        const { callback, dbConnect } = this.options;
        const id = args[1];

        dbConnect((objects, states) => {
            states.getState(id, (err, obj) => {
                if (err || !obj) {
                    CLI.error.stateNotFound(id, err);
                } else {
                    console.log(resultTransform(obj));
                }
                return void callback();
            });
        });
    }

    /**
     * @param {any[]} args 
     */
    set(args) {
        const { callback, dbConnect, showHelp } = this.options;
        /** @type {[string, any, any]} */
        let [id, val, ack] = (args.slice(1));

        if (val === undefined) {
            CLI.error.requiredArgumentMissing('value');
            showHelp();
            return void callback();
        }
        dbConnect((objects, states) => {
            const newVal = ack === undefined ? val : { val, ack };
            states.setState(id, newVal, err => {
                if (err) {
                    CLI.error.unknown(err);
                    return void callback(1); // ?
                } else {
                    CLI.success.stateUpdated(id, val, ack);
                    return void callback();
                }
            });
        })
    }

    /**
     * Deletes a state
     * @param {any[]} args
     */
    delete(args) {
        const { callback, dbConnect } = this.options;
        /** @type {string} */
        const id = args[1];
        if (!id) {
            CLI.error.requiredArgumentMissing('id', 'state delete id');
            return void callback(1);
        }

        dbConnect((objects, states) => {
            states.delState(id, err => {
                if (err) {
                    CLI.error.stateNotFound(id, err);
                    return void callback(3);
                } else {
                    CLI.success.stateDeleted(id);
                    return void callback();
                }
            });
        });
    }
}