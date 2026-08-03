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
import fs from 'fs-extra';
import path from 'node:path';
import type { InternalLogger } from '@iobroker/js-controller-common-db/tools';
import { isLocalObjectsDbServer, tools } from '@iobroker/js-controller-common';

/**
 * `browse` is the original read-only command: a client asks, this host answers with its database
 * configuration.
 *
 * The other three write: they are sent by a master to a host that is *not yet* part of the system.
 * That host cannot be reached over the states database - it is not connected to one - so this
 * socket is the only way in.
 */
type MHCommand = 'browse' | 'join' | 'decline' | 'identify';

interface MHInfo {
    node: string;
    arch: string;
    model: string;
    cpus: number;
    mem: number;
    ostype: string;
}

interface BaseCommand {
    cmd: MHCommand;
    id: string;
    result:
        | 'invalid password'
        | 'not authenticated'
        | 'ok'
        | 'unknown command'
        /** this host already belongs to a system, joining would discard its database */
        | 'already claimed'
        /** the user rejected this master earlier */
        | 'declined'
        | 'error';
    /** free text, only filled for 'error' */
    error?: string;
}

interface BrowseCommand extends BaseCommand {
    cmd: 'browse';

    objects?: ioBroker.IoBrokerJson['objects'];
    states?: ioBroker.IoBrokerJson['states'];
    info?: MHInfo;
    hostname?: string;
    slave?: boolean;
    salt?: string;
    /** The host belongs to no system yet and can be attached */
    unclaimed?: boolean;
    /** Installation id of the answering host, used as the key of the ignore list of a master */
    uuid?: string;
}

/** UDP port of the multihost service. Also the port the mDNS announcement points at */
export const MULTIHOST_PORT = 50005;
const PORT = MULTIHOST_PORT;
const MULTICAST_ADDR = '239.255.255.250';
/** Masters the user rejected. Stored next to iobroker.json so it survives a restart */
const DECLINED_FILE = 'declined-masters.json';

/**
 * Options for the write commands. Without `onJoin` the host only answers `browse` as before.
 */
export interface MHServerOptions {
    /**
     * The host is not a multihost master itself and only listens for pairing commands. `browse` is
     * then answered with name and `unclaimed: true` only - an unconfigured host must not hand out
     * its database configuration.
     */
    pairingOnly?: boolean;
    /** Performs the actual join. Returns an error text when it failed */
    onJoin?: (masterIp: string, password: string) => Promise<{ result: boolean; error?: string }>;
    /**
     * Whether this host may still be taken over. Injected because the answer needs the objects
     * database, which this class has no access to. Without it only the configuration is checked,
     * which cannot tell a fresh installation from a master that already has slaves.
     */
    isUnclaimed?: () => Promise<boolean>;
    /** Installation id of this host, published in the answer so a master can identify it */
    getUuid?: () => string;
}

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
    private readonly logger: InternalLogger;
    private readonly info: MHInfo;
    private readonly secret: string | false;
    private readonly hostname: string;

    private readonly options: MHServerOptions;

    private server: Socket | null = null;
    private initTimer: NodeJS.Timeout | null = null;
    private stopped = false;

    /**
     * @param hostname The name of this host
     * @param logger The logger instance
     * @param config The ioBroker configuration
     * @param info Multihost information such as the number of hosts
     * @param secret Shared secret used for authentication, or false if authentication is disabled
     * @param options Pairing behaviour, see {@link MHServerOptions}
     */
    constructor(
        hostname: string,
        logger: InternalLogger,
        config: ioBroker.IoBrokerJson,
        info: MHInfo,
        secret: string | false,
        options?: MHServerOptions,
    ) {
        this.hostname = hostname;
        this.config = config;
        this.logger = logger;
        this.info = info;
        this.secret = secret;
        this.options = options || {};

        this.init();
    }

    /** Path of the file holding the rejected masters */
    private getDeclinedFile(): string {
        return path.join(path.dirname(tools.getConfigFileName()), DECLINED_FILE);
    }

    /**
     * UUIDs of the masters the user rejected.
     *
     * Stored on *this* host, not on the master: a reinstalled master would otherwise forget the
     * decision. Kept per master so that a rejected host stays visible to a second master - a host
     * that is invisible to everybody could never be brought back, and without a screen or SSH that
     * would mean reflashing it.
     */
    private readDeclined(): string[] {
        try {
            const file = this.getDeclinedFile();
            if (fs.existsSync(file)) {
                const list = fs.readJSONSync(file);
                return Array.isArray(list) ? list : [];
            }
        } catch (e) {
            this.logger.warn(`host.${this.hostname} Multi-host: cannot read ${DECLINED_FILE}: ${e}`);
        }
        return [];
    }

    private addDeclined(masterUuid: string): void {
        const list = this.readDeclined();
        if (!list.includes(masterUuid)) {
            list.push(masterUuid);
            try {
                fs.writeJSONSync(this.getDeclinedFile(), list, { spaces: 2 });
            } catch (e) {
                this.logger.warn(`host.${this.hostname} Multi-host: cannot store ${DECLINED_FILE}: ${e}`);
            }
        }
    }

    private removeDeclined(masterUuid: string): void {
        const list = this.readDeclined().filter(uuid => uuid !== masterUuid);
        try {
            fs.writeJSONSync(this.getDeclinedFile(), list, { spaces: 2 });
        } catch (e) {
            this.logger.warn(`host.${this.hostname} Multi-host: cannot store ${DECLINED_FILE}: ${e}`);
        }
    }

    /**
     * Whether this host may still be taken over.
     *
     * Checked here rather than trusting what the sender claims - joining discards the local database
     * configuration, and on a host that already runs a system that would cut it off from its data.
     *
     * The controller supplies the real check via {@link MHServerOptions.isUnclaimed}, which also
     * looks at the other hosts of the system. The fallback only sees the configuration and therefore
     * considers every host with a local database free, which is why it is not used when the
     * controller provides something better.
     */
    private async isUnclaimed(): Promise<boolean> {
        if (this.options.isUnclaimed) {
            return this.options.isUnclaimed();
        }

        return isLocalObjectsDbServer(this.config.objects.type, this.config.objects.host);
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
            /** UUID of the sending master, used by `join` and `decline` */
            masterUuid?: string;
            /** `decline` only: take the rejection back */
            revoke?: boolean;
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
            case 'join': {
                if (!this.options.onJoin) {
                    this.send({ cmd: 'join', id: msg.id, result: 'unknown command' }, rinfo);
                    break;
                }
                if (msg.masterUuid && this.readDeclined().includes(msg.masterUuid)) {
                    this.logger.info(
                        `host.${this.hostname} Multi-host: join from ${rinfo.address} refused, this master was declined`,
                    );
                    this.send({ cmd: 'join', id: msg.id, result: 'declined' }, rinfo);
                    break;
                }
                if (!(await this.isUnclaimed())) {
                    this.logger.warn(
                        `host.${this.hostname} Multi-host: join from ${rinfo.address} refused, this host already belongs to a system`,
                    );
                    this.send({ cmd: 'join', id: msg.id, result: 'already claimed' }, rinfo);
                    break;
                }

                this.logger.info(`host.${this.hostname} Multi-host: joining master ${rinfo.address}`);
                // The answer has to leave before the controller restarts, so it is sent first and
                // the join runs afterwards.
                this.send({ cmd: 'join', id: msg.id, result: 'ok' }, rinfo);

                const joinResult = await this.options.onJoin(rinfo.address, msg.password || '');
                if (!joinResult.result) {
                    this.logger.error(
                        `host.${this.hostname} Multi-host: cannot join ${rinfo.address}: ${joinResult.error}`,
                    );
                }
                break;
            }

            case 'decline':
                if (!msg.masterUuid) {
                    this.send({ cmd: 'decline', id: msg.id, result: 'error', error: 'No masterUuid' }, rinfo);
                    break;
                }
                if (msg.revoke) {
                    this.removeDeclined(msg.masterUuid);
                    this.logger.info(`host.${this.hostname} Multi-host: master ${msg.masterUuid} accepted again`);
                } else {
                    this.addDeclined(msg.masterUuid);
                    this.logger.info(`host.${this.hostname} Multi-host: master ${msg.masterUuid} declined`);
                }
                // The announcement deliberately keeps running - a silent host could never be
                // reached again without a screen or SSH.
                this.send({ cmd: 'decline', id: msg.id, result: 'ok' }, rinfo);
                break;

            case 'identify':
                // Helps to tell two freshly flashed hosts apart
                this.logger.info(
                    `host.${this.hostname} Multi-host: identify requested by ${rinfo.address} - this is "${this.hostname}"`,
                );
                this.send({ cmd: 'identify', id: msg.id, result: 'ok' }, rinfo);
                break;

            case 'browse':
                if (this.options.pairingOnly) {
                    // A host that belongs to no system has to be findable - over UDP as well, not
                    // only over mDNS, which does not survive a Docker bridge. It answers with its
                    // name and the hint that it is free, but never with its database configuration.
                    this.send(
                        {
                            cmd: 'browse',
                            id: msg.id,
                            result: 'ok',
                            hostname: this.hostname,
                            info: this.info,
                            unclaimed: await this.isUnclaimed(),
                            uuid: this.options.getUuid?.() || undefined,
                        },
                        rinfo,
                    );
                    break;
                }
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

    /**
     * Start the multihost discovery server and (re)initialize it
     */
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
                            this.process(data, rinfo).catch(e =>
                                this.logger.error(`Cannot process multihost message: ${e.message}`),
                            );
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

    /**
     * Stop the multihost server and release the socket
     *
     * @param callback Called once the server has been closed
     */
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
