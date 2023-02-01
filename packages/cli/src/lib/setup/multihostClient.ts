import dgram from 'dgram';
import { tools } from '@iobroker/js-controller-common';
import crypto from 'crypto';

const PORT = 50005;
const MULTICAST_ADDR = '239.255.255.250';

interface ReceivedMessage {
    cmd: string;
    id: number;
    result: string;
    ip?: string;
    hostname?: string;
    info?: string;
    slave?: boolean;
    auth?: string;
    salt?: string;
    /** The states config of iobroker.json  */
    states?: Record<string, any>;
    /** The objects config of iobroker.json */
    objects?: Record<string, any>;
}

export type BrowseResultEntry = Partial<ReceivedMessage>;

export class MHClient {
    private id: number = 1;
    private timer: NodeJS.Timeout | null = null;
    private server: dgram.Socket | undefined;

    /**
     * Stops the MH server
     */
    private stopServer(): void {
        if (this.server) {
            try {
                this.server.close();
            } catch {
                // OK
            }
            this.server = undefined;
        }

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    /**
     * Calculate the SHA
     *
     * @param secret the MH secret
     * @param salt the MH salt
     * @param callback
     */
    private sha(secret: string, salt: string, callback: (sha: string) => void): void {
        // calculate sha256
        const hash = crypto.createHash('sha256');

        hash.on('readable', function () {
            const data = hash.read();
            if (data) {
                callback(data.toString('hex'));
            }
        });

        hash.write(secret + salt);
        hash.end();
    }

    /**
     * Starts the MH server
     * @param isBroadcast if server should receive broadcast
     * @param timeout timeout after which MH server will be closed
     * @param onReady ready handler
     * @param onMessage message handler, if return true here, server will be stopped
     * @param onFinished finished handler
     */
    private startServer(
        isBroadcast: boolean,
        timeout: number,
        onReady: () => void,
        onMessage: (msg: ReceivedMessage, rinfo: dgram.RemoteInfo) => boolean,
        onFinished: (err?: Error) => void
    ) {
        if (this.server) {
            onFinished(new Error('Some operation still active'));
            return;
        }
        this.server = dgram.createSocket('udp4');
        timeout = timeout || 2_000;

        this.timer = setTimeout(() => {
            this.stopServer();

            if (this.server) {
                onFinished();
            }
        }, timeout);

        this.server.on('error', err => {
            this.stopServer();

            if (this.server) {
                onFinished(err);
            }
        });

        this.server.on('message', (msg, rinfo) => {
            try {
                const message: ReceivedMessage = JSON.parse(msg.toString());
                if (this.server) {
                    if (onMessage(message, rinfo)) {
                        this.stopServer();
                    }
                }
            } catch {
                console.error(`Multihost discovery client: Invalid answer: ${msg.toString()}`);
            }
        });

        this.server.on('listening', () => {
            // var address = server.address();
            if (isBroadcast) {
                this.server!.setBroadcast(true);
            }
            onReady();
        });

        this.server.bind();
    }

    /**
     * Start MH browsing for server
     *
     * @param timeout timeout to stop browsing
     * @param isDebug
     * @param callback
     */
    browse(
        timeout: number,
        isDebug: boolean,
        callback: (err: Error | undefined, res: BrowseResultEntry[]) => void
    ): void {
        const result: BrowseResultEntry[] = [];
        const ownIps = tools.findIPs();

        this.startServer(
            true,
            timeout,
            () => {
                const text = JSON.stringify({
                    cmd: 'browse',
                    id: ++this.id
                });
                this.server!.send(text, 0, text.length, PORT, MULTICAST_ADDR);
            },
            (msg, rinfo) => {
                // ignore own answers
                if (isDebug || (rinfo.address !== '127.0.0.1' && ownIps.indexOf(rinfo.address) === -1)) {
                    if (msg.result === 'not authenticated') {
                        result.push({
                            ip: rinfo.address,
                            hostname: rinfo.address,
                            info: 'authentication required',
                            auth: msg.auth
                        });
                    } else if (msg.result === 'ok') {
                        result.push(msg);
                    } else {
                        console.log(`Multihost discovery client: Unknown answer: ${JSON.stringify(msg)}`);
                    }
                }
                if (isDebug) {
                    console.log(JSON.stringify(msg));
                }

                return false;
            },
            err => {
                callback(err, result);
            }
        );
    }

    /**
     * Connect to server
     * @param ip ip address of server
     * @param password password for authentication
     * @param callback
     */
    connect(
        ip: string,
        password: string,
        callback: (
            err: Error | undefined,
            objectsConfig?: Record<string, any>,
            statesConfig?: Record<string, any>,
            address?: string
        ) => void
    ): void {
        let callCb = true;

        this.startServer(
            false,
            2_000,
            () => {
                const text = JSON.stringify({
                    cmd: 'browse',
                    id: ++this.id
                });
                this.server!.send(text, 0, text.length, PORT, ip);
            },
            (msg, rinfo) => {
                if (msg.cmd === 'browse' && msg.id === this.id) {
                    if (msg.result === 'ok') {
                        if (callCb) {
                            if (!msg.objects) {
                                callback(new Error(`Invalid configuration received: ${JSON.stringify(msg)}`));
                                callCb = false;
                            } else if (!msg.states) {
                                callback(new Error(`Invalid configuration received: ${JSON.stringify(msg)}`));
                                callCb = false;
                            } else {
                                if (typeof callback === 'function') {
                                    callback(undefined, msg.objects, msg.states, rinfo.address);
                                }
                            }
                        }
                    } else if (msg.result === 'not authenticated') {
                        if (!password) {
                            if (callCb) {
                                callback(new Error(`not authenticated: ${JSON.stringify(msg)}`));
                                callCb = false;
                            }
                        } else {
                            this.sha(password, msg.salt!, shaText => {
                                // send password
                                const text = JSON.stringify({
                                    cmd: 'browse',
                                    id: ++this.id,
                                    password: shaText
                                });
                                this.server!.send(text, 0, text.length, PORT, ip);
                            });
                            return false;
                        }
                    } else if (msg.result === 'invalid password') {
                        if (callCb) {
                            callback(new Error('invalid password'));
                            callCb = false;
                        }
                    } else {
                        console.log(msg.result);
                    }
                    return true;
                } else {
                    console.warn(`Multihost discovery client: Unexpected message: ${JSON.stringify(msg)}`);
                }

                return false;
            },
            function onFinished(err) {
                if (callCb) {
                    callback(err);
                    callCb = false;
                }
            }
        );
    }
}
