import fs from 'fs-extra';
import path from 'node:path';
import { tools } from '@iobroker/js-controller-common';
import { isLocalObjectsDbServer, isLocalStatesDbServer } from '@iobroker/js-controller-common';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import { MHClient, type BrowseResultEntry } from './multihostClient.js';
import readline from 'node:readline';
import prompt from 'prompt';

interface MHParams {
    secure?: boolean;
    persist?: boolean;
    debug?: boolean;
}

export interface CLIMultihostOptions {
    objects: ObjectsRedisClient;
    params?: MHParams;
}

export class Multihost {
    private readonly configName: string;
    private params: MHParams;
    private objects: ObjectsRedisClient;

    constructor(options: CLIMultihostOptions) {
        this.configName = tools.getConfigFileName();
        this.params = options.params || {};
        this.objects = options.objects;
    }

    /**
     * Retrive config (iobroker.json content)
     */
    getConfig(): ioBroker.IoBrokerJson {
        let config;
        // read actual configuration
        try {
            if (fs.existsSync(this.configName)) {
                config = fs.readJsonSync(this.configName);
            } else {
                config = fs.readJsonSync(
                    path.join(tools.getControllerDir(), 'conf', `${tools.appName.toLowerCase()}-dist.json`),
                );
            }
        } catch {
            config = fs.readJsonSync(
                path.join(tools.getControllerDir(), 'conf', `${tools.appName.toLowerCase()}-dist.json`),
            );
        }
        return config;
    }

    /**
     * Show hosts on CLI
     *
     * @param list list of hosts
     */
    showHosts(list: BrowseResultEntry[]): void {
        if (!list || !list.length) {
            console.info(
                'No Multihost server found. Make sure iobroker is running on the host where you enabled multihost discovery (and it is not this host)!',
            );
        } else {
            for (let i = 0; i < list.length; i++) {
                console.log(
                    `${i + 1} | ${list[i].hostname!.padStart(20)} | ${list[i].slave ? 'slave' : ' host'} | ${list[
                        i
                    ].ip!.padStart(20)} | ${JSON.stringify(list[i].info)}`,
                );
            }
        }
    }

    /**
     * Start MH browsing
     */
    async browse(): Promise<BrowseResultEntry[]> {
        const mhClient = new MHClient();
        try {
            const res = await mhClient.browse(2_000, !!this.params.debug);
            return res;
        } catch (e) {
            throw new Error(`Multihost discovery client: Cannot browse: ${e.message}`);
        }
    }

    /**
     * Show MH state on CLI
     *
     * @param config iob config
     * @param changed if config has changed
     */
    private async showMHState(config: ioBroker.IoBrokerJson, changed: boolean): Promise<void> {
        if (config.multihostService.enabled) {
            let warningShown = false;

            const hasLocalObjectsServer = await isLocalObjectsDbServer(config.objects.type, config.objects.host, true);

            if (hasLocalObjectsServer) {
                console.log('Changing objects server to accept connections on all IP addresses.');
                config.objects.host = tools.getListenAllAddress();
                changed = true;
            } else if (config.objects.type === 'redis') {
                warningShown = true;
                console.log(
                    `Please check the binding of redis service. By default it is only local: http://download.redis.io/redis-stable/redis.conf\nChange "bind 127.0.0.1" to "bind ${tools.getListenAllAddress()}" or to others.`,
                );
            } else {
                warningShown = true;
                console.log(
                    `Please check the binding of the configured ${config.objects.type} server to allow remote connections.`,
                );
            }

            const hasLocalStatesServer = await isLocalStatesDbServer(config.states.type, config.states.host, true);

            if (hasLocalStatesServer) {
                console.log('Changing states server to accept connections on all IP addresses.');
                config.states.host = tools.getListenAllAddress();
                changed = true;
            } else if (config.states.type === 'redis') {
                !warningShown &&
                    console.log(
                        `Please check the binding of redis service. By default it is only local: http://download.redis.io/redis-stable/redis.conf\nChange "bind 127.0.0.1" to "bind ${tools.getListenAllAddress()}" or to others.`,
                    );
            } else {
                !warningShown &&
                    console.log(
                        `Please check the binding of the configured ${config.states.type} server to allow remote connections.`,
                    );
            }
        }
        if (!changed) {
            console.log('No configuration change needed.');
        } else {
            fs.writeFileSync(this.configName, JSON.stringify(config, null, 2));
            console.log('Please restart ioBroker for the changes to take effect: "iobroker restart"');
        }
        console.log('\n');
        console.log(`Multihost discovery server: ${config.multihostService.enabled ? 'enabled' : 'disabled'}`);
        console.log(`Discovery authentication:   ${config.multihostService.secure ? 'enabled' : 'disabled'}`);
        console.log(
            `Persistent activation:      ${
                config.multihostService.enabled && config.multihostService.persist ? 'enabled' : 'disabled'
            }`,
        );
        console.log(`Objects:                    ${config.objects.type} on ${config.objects.host}`);
        console.log(`States:                     ${config.states.type} on ${config.states.host}`);
    }

    /**
     * Enables or disables the multihost discovery server in the config json
     *
     * @param isEnable - if the server should be activated or deactivated
     * @param callback - callback function to be executed
     */
    enable(isEnable: boolean, callback: (err?: Error) => void): void {
        let changed = false;
        const config = this.getConfig();
        config.multihostService = config.multihostService || { enabled: false, secure: true };

        if (isEnable && !config.multihostService.enabled) {
            changed = true;
            config.multihostService.enabled = true;
            config.multihostService.password = '';
            console.log(
                'Multihost discovery server activated on this host. If iobroker is currently not running please start befeore trying to discover this host.',
            );
            console.log(
                'Important: Multihost discovery works with UDP packets. Make sure they are routed correctly in your network. If you use Docker you also need to configure this correctly.',
            );
            if (!this.params.persist) {
                console.log(
                    'Multihost discovery will be automatically deactivated after 15 minutes. If you want to activate it permanently use the --persist flag',
                );
            }
        } else if (!isEnable && config.multihostService.enabled) {
            changed = true;
            config.multihostService.enabled = false;
            config.multihostService.password = '';
            console.log('Multihost discovery server deactivated on this host.');
        }
        if (this.params.secure === undefined) {
            this.params.secure = true;
        }

        this.params.persist = !!this.params.persist;

        if (
            isEnable &&
            (config.multihostService.secure !== this.params.secure ||
                (config.multihostService.secure && !config.multihostService.password) ||
                config.multihostService.persist !== this.params.persist)
        ) {
            changed = true;
            config.multihostService.secure = this.params.secure;
            config.multihostService.persist = this.params.persist;
            console.log(`Discovery authentication ${this.params.secure ? 'activated' : 'deactivated'}.`);
            if (config.multihostService.secure) {
                prompt.message = '';
                prompt.delimiter = '';
                const schema = {
                    properties: {
                        password: {
                            description: 'Enter secret phrase for connection:',
                            pattern: /^[^'"]+$/,
                            message: 'No " are allowed',
                            hidden: true,
                        },
                        passwordRepeat: {
                            description: 'Repeat secret phrase for connection:',
                            pattern: /^[^'"]+$/,
                            message: 'No " are allowed',
                            hidden: true,
                        },
                    },
                };
                prompt.start();

                prompt.get(schema, (err, password) => {
                    if (password?.password) {
                        if (password.password !== password.passwordRepeat) {
                            callback(new Error('Secret phrases are not equal!'));
                        } else {
                            this.objects.getObject('system.config', (err, obj) => {
                                config.multihostService.password = tools.encrypt(
                                    obj!.native.secret,
                                    password.password as string,
                                );
                                this.showMHState(config, changed);
                                callback();
                            });
                        }
                    } else {
                        callback(new Error('No secret phrase entered!'));
                    }
                });
            } else {
                this.showMHState(config, changed);
                callback();
            }
        } else {
            this.showMHState(config, changed);
            callback();
        }
    }

    /**
     * Show the MH status
     */
    status(): void {
        const config = this.getConfig();
        config.multihostService = config.multihostService || { enabled: false, secure: true };
        this.showMHState(config, false);
    }

    /**
     * Read password from cli
     *
     * @param callback
     */
    readPassword(callback: (password: string) => void): void {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        function hidden(query: string, callback: (pw: string) => void): void {
            const stdin = process.openStdin();
            process.stdin.on('data', _char => {
                const char = _char.toString();
                switch (char) {
                    case '\n':
                    case '\r':
                    case '\u0004':
                        stdin.pause();
                        break;

                    default:
                        process.stdout.write(`\x1B[2K\x1B[200D${query}${new Array(rl.line.length + 1).join('*')}`);
                        break;
                }
            });

            rl.question(query, value => {
                callback(value);
            });
        }

        hidden('Enter secret phrase for connection: ', password => callback(password));
    }

    /**
     * Connect to given MH server
     *
     * @param mhClient mhclient used for connection
     * @param ip ip address of server
     * @param pass password
     * @param callback
     */
    connectHelper(mhClient: MHClient, ip: string, pass: string, callback: (err?: Error) => void): void {
        mhClient.connect(ip, pass, async (err, oObjects, oStates, ipHost) => {
            if (err) {
                callback(new Error(`Cannot connect to "${ip}": ${err.message}`));
            } else if (oObjects && oStates) {
                const config = this.getConfig();
                config.objects = oObjects;
                config.states = oStates;

                const hasLocalObjectsServer = await isLocalObjectsDbServer(
                    config.objects.type,
                    config.objects.host,
                    true,
                );
                const hasLocalStatesServer = await isLocalStatesDbServer(config.states.type, config.states.host, true);

                if (hasLocalObjectsServer || hasLocalStatesServer) {
                    callback(
                        new Error(
                            `IP Address of the remote host is ${tools.getLocalAddress()}. Connections from this host will not be accepted. Please change the configuration of this host to accept remote connections.`,
                        ),
                    );
                } else {
                    if (tools.isListenAllAddress(config.states.host)) {
                        // TODO: why we set the remote IP only when the local config allows full connectivity?
                        config.states.host = ipHost ?? '';
                    }
                    if (tools.isListenAllAddress(config.objects.host)) {
                        // TODO: why we set the remote IP only when the local config allows full connectivity?
                        config.objects.host = ipHost ?? '';
                    }

                    fs.writeFileSync(this.configName, JSON.stringify(config, null, 2));
                    console.log('Config ok. Please restart ioBroker: "iobroker restart"');
                    callback();
                }
            } else {
                callback(new Error('No configuration received!'));
            }
        });
    }

    /**
     * Connect to MH Server
     *
     * @param index index of host to connect to
     * @param pass password
     * @param callback
     */
    async connect(
        index: number | null,
        pass: string | null,
        callback: (err?: Error, list?: BrowseResultEntry[]) => void,
    ): Promise<void> {
        if (typeof pass === 'function') {
            callback = pass;
            pass = null;
        }
        if (typeof index === 'function') {
            callback = index;
            index = null;
        }

        const mhClient = new MHClient();
        let list: BrowseResultEntry[];

        try {
            list = await mhClient.browse(2_000, !!this.params.debug);
        } catch (e) {
            callback(new Error(`Cannot browse: ${e.message}`));
            return;
        }

        this.showHosts(list);

        if (index !== null && index !== undefined && index > 0) {
            if (list && index < list.length + 1) {
                if (!pass) {
                    callback(new Error('No password defined: please use "multihost connect <NUMBER> <PASSWORD>"'));
                } else {
                    this.connectHelper(mhClient, list[index - 1].ip!, pass, callback);
                }
            } else {
                callback(new Error(`Invalid index: ${index}`));
            }
        } else if (list && list.length) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question('Please select host [1]: ', answer => {
                if (answer === '' || answer === null || answer === undefined) {
                    index = 1;
                }
                index = parseInt(answer, 10) - 1;
                const listEntry = list[index];
                if (!listEntry) {
                    rl.close();
                    callback(new Error(`Invalid index: ${answer}`));
                } else {
                    if (listEntry.auth) {
                        this.readPassword(password => {
                            if (password) {
                                this.connectHelper(mhClient, listEntry.ip!, password, callback);
                            } else {
                                callback(new Error('No password entered!'));
                            }
                        });
                    } else {
                        this.connectHelper(mhClient, listEntry.ip!, '', callback);
                    }
                }
            });
        } else {
            callback(undefined, list);
        }
    }
}
