/**
 *      Multihost server
 *
 *      Master multihost functionality
 *
 *      Copyright 2014-2024 bluefox <dogafox@gmail.com>,
 *      MIT License
 *
 */

import dgram, { type RemoteInfo, type Socket } from 'node:dgram';
import { createHash } from 'node:crypto';
import type { InternalLogger } from '@iobroker/js-controller-common-db/tools';
import { isLocalObjectsDbServer } from '@iobroker/js-controller-common';

type MHCommand = 'browse';

type MHInfo = {
    node: string;
    arch: string;
    model: string;
    cpus: number;
    mem: number;
    ostype: string;
};

interface BaseCommand {
    cmd: MHCommand;
    id: string;
    result: 'invalid password' | 'not authenticated' | 'ok' | 'unknown command';
}

interface BrowseCommand extends BaseCommand {
    cmd: 'browse';

    objects?: ioBroker.IoBrokerJson['objects'];
    states?: ioBroker.IoBrokerJson['states'];
    info?: MHInfo;
    hostname?: string;
    slave?: boolean;
    salt?: string;
}

const PORT = 50005;
const MULTICAST_ADDR = '239.255.255.250';

/**
 * The Multihost Server allows connection from other ioBroker hosts
 *
 * @param hostname name of the host
 * @param logger
 * @param config
 * @param info
 * @param secret
 */
export class MHServer {
    private readonly count = 0;
    private readonly buffer: Record<string, string> = {};
    private readonly lastFrame: Record<string, number> = {};
    private readonly authList: Record<
        string,
        {
            ts: number;
            salt: string;
            auth: boolean;
        }
    > = {};
    private readonly config: ioBroker.IoBrokerJson;
    private readonly logger: InternalLogger | typeof console;
    private readonly info: MHInfo;
    private readonly secret: string | false;
    private readonly hostname: string;

    private server: Socket | null = null;
    private initTimer: NodeJS.Timeout | null = null;
    private stopped = false;

    constructor(
        hostname: string,
        logger: InternalLogger | typeof console,
        config: ioBroker.IoBrokerJson,
        info: MHInfo,
        secret: string | false,
    ) {
        this.hostname = hostname; // make a copy
        this.config = config; // make a copy
        this.logger = logger; // make a copy
        this.info = info; // make a copy
        this.secret = secret; // make a copy

        this.init();
    }

    private send(msg: BrowseCommand | BaseCommand, rinfo: RemoteInfo): void {
        if (this.server) {
            setImmediate(() => {
                const text = JSON.stringify(msg);
                try {
                    this.server?.send(text, 0, text.length, rinfo.port, rinfo.address);
                } catch (e) {
                    this.logger.warn(
                        `host.${this.hostname} Multi-host discovery server: cannot send answer to ${rinfo.address}:${rinfo.port}: ${e}`,
                    );
                }
            });
        }
    }

    // delete all old connections
    private checkAuthList(ts?: number): void {
        ts = ts || new Date().getTime();
        for (const id of Object.keys(this.authList)) {
            if (!this.authList[id]) {
                delete this.authList[id];
            } else if (ts - this.authList[id].ts > 31000) {
                delete this.authList[id];
            }
        }
    }

    private sha(secret: string, salt: string, callback: (hash: string) => void): void {
        // calculate sha256
        const hash = createHash('sha256');

        hash.on('readable', () => {
            const data = hash.read();
            if (data) {
                callback(data.toString('hex'));
            }
        });

        hash.write(secret + salt);
        hash.end();
    }

    // hello => auth => browse
    private async process(
        msg: {
            auth: boolean;
            id: string;
            cmd: MHCommand;
            password?: string;
        },
        rinfo: RemoteInfo,
    ): Promise<void> {
        if (!msg) {
            return;
        }

        const ts = new Date().getTime();
        this.checkAuthList(ts);

        const id = `${rinfo.address}:${rinfo.port}`;

        switch (msg.cmd) {
            case 'browse':
                if (this.secret && msg.password && this.authList[id]) {
                    this.sha(this.secret, this.authList[id].salt, async (shaText: string) => {
                        if (shaText !== msg.password) {
                            this.send(
                                {
                                    auth: this.config.multihostService.secure,
                                    cmd: 'browse',
                                    id: msg.id,
                                    result: 'invalid password',
                                } as BrowseCommand,
                                rinfo,
                            );
                        } else {
                            this.authList[id].auth = true;
                            this.send(
                                {
                                    auth: this.config.multihostService.secure,
                                    cmd: 'browse',
                                    id: msg.id,
                                    result: 'ok',

                                    objects: this.config.objects,
                                    states: this.config.states,
                                    info: this.info,
                                    hostname: this.hostname,
                                    slave: !(await isLocalObjectsDbServer(
                                        this.config.objects.type,
                                        this.config.objects.host,
                                    )),
                                } as BrowseCommand,
                                rinfo,
                            );
                        }
                    });
                    return;
                }

                if (!this.config.multihostService.secure || (this.authList[id] && this.authList[id].auth)) {
                    this.send(
                        {
                            auth: this.config.multihostService.secure,
                            cmd: 'browse',
                            id: msg.id,
                            result: 'ok',

                            objects: this.config.objects,
                            states: this.config.states,
                            info: this.info,
                            hostname: this.hostname,
                            slave: !(await isLocalObjectsDbServer(this.config.objects.type, this.config.objects.host)),
                        } as BrowseCommand,
                        rinfo,
                    );
                } else {
                    this.authList[id] = {
                        ts,
                        salt: (Math.random() * 1000000 + ts).toString().substring(0, 16),
                        auth: false,
                    };
                    // padding
                    if (this.authList[id].salt.length < 16) {
                        this.authList[id].salt += new Array(16 - this.authList[id].salt.length).join('_');
                    }
                    this.send(
                        {
                            auth: this.config.multihostService.secure,
                            cmd: 'browse',
                            id: msg.id,
                            result: 'not authenticated',

                            salt: this.authList[id].salt,
                        } as BrowseCommand,
                        rinfo,
                    );
                }
                break;

            default:
                this.send(
                    {
                        cmd: msg.cmd,
                        id: msg.id,
                        result: 'unknown command',
                    },
                    rinfo,
                );
                break;
        }
    }

    init(): void {
        this.stopped = false;
        if (this.initTimer) {
            clearTimeout(this.initTimer);
            this.initTimer = null;
        }

        if (this.count > 10) {
            return this.logger.warn(
                `host.${this.hostname} Multi-host discovery server: Port ${PORT} is occupied. Service stopped.`,
            );
        }

        this.server = dgram.createSocket({ type: 'udp4', reuseAddr: true });

        this.server.on('error', err => {
            this.logger.error(`host.${this.hostname} Multi-host discovery server: error: ${err.stack}`);
            this.server?.close();
            this.server = null;

            this.initTimer =
                this.initTimer ||
                setTimeout(() => {
                    this.initTimer = null;
                    this.init();
                }, 5000);
        });

        this.server.on('close', () => {
            this.server = null;

            if (!this.initTimer && !this.stopped) {
                this.initTimer = setTimeout(() => {
                    this.initTimer = null;
                    this.init();
                }, 5000);
            }
        });

        this.server.on('message', (msg: Buffer, rinfo: RemoteInfo) => {
            // following messages are allowed
            const text = msg.toString();
            const now = new Date().getTime();
            const id = `${rinfo.address}:${rinfo.port}`;

            for (const ids in this.buffer) {
                if (!this.lastFrame[ids]) {
                    delete this.buffer[ids];
                } else if (now - this.lastFrame[ids] > 1000) {
                    delete this.buffer[ids];
                    delete this.lastFrame[ids];
                }
            }

            if (this.lastFrame[id] && now - this.lastFrame[id] > 1000) {
                this.buffer[id] = '';
            }

            this.lastFrame[id] = now;

            if (!this.buffer[id] && text[0] !== '{') {
                // ignore message
                this.logger.debug(
                    `host.${this.hostname} Multi-host discovery server: Message from ${rinfo.address} ignored: ${text}`,
                );
            } else {
                this.buffer[id] = (this.buffer[id] || '') + msg.toString();
                if (this.buffer[id] && this.buffer[id][this.buffer[id].length - 1] === '}') {
                    try {
                        const data = JSON.parse(this.buffer[id]);
                        this.buffer[id] = '';
                        if (data) {
                            this.process(data, rinfo);
                        }
                    } catch {
                        // may be not yet complete.
                    }
                }
            }
        });

        this.server.on('listening', () => {
            try {
                this.server?.addMembership(MULTICAST_ADDR);
            } catch {
                this.logger.warn(
                    `host.${this.hostname} Multi-host discovery server: Multicast membership could not be added.`,
                );
            }
            const address = this.server?.address();
            this.logger.info(
                `host.${this.hostname} Multi-host discovery server: service started on ${address?.address}:${address?.port}`,
            );
        });

        this.server.bind(PORT);
    }

    close(callback?: () => void): void {
        this.stopped = true;
        if (this.initTimer) {
            clearTimeout(this.initTimer);
            this.initTimer = null;
        }
        if (this.server) {
            try {
                this.server.close(callback);
                this.server = null;
            } catch {
                this.server = null;
                if (callback) {
                    callback();
                }
            }
        } else if (callback) {
            callback();
        }
    }
}
