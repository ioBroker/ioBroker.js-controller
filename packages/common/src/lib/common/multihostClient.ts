/**
 * Multihost discovery client.
 *
 * This module implements a lightweight UDP-based discovery protocol (multicast/broadcast)
 * to find other ioBroker hosts on the local network. It supports an optional
 * password-based handshake and returns the objects/states database configuration
 * necessary for remote setup and connection.
 *
 * It is used both by the CLI setup utilities (`iobroker multihost ...`) and by the
 * controller message handler `multihostConnect`, which lets the Admin GUI trigger a
 * multihost connection to a host that was discovered via mDNS.
 */

import dgram from 'node:dgram';
import * as crypto from 'node:crypto';

import { tools } from '@iobroker/js-controller-common';

const PORT = 50005;
const MULTICAST_ADDR = '239.255.255.250';

/**
 * Message structure received from a multihost server during discovery or connect.
 */
export interface ReceivedMessage {
    /** Command name, e.g. 'browse' */
    cmd: 'browse' | 'auth' | 'join' | 'decline' | 'identify';
    /** Unique message identifier */
    id: number;
    /** Result string returned by server: 'ok', 'not authenticated', etc. */
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    result: 'ok' | 'not authenticated' | string;
    /** Optional IP address of responder */
    ip?: string;
    /** Optional hostname of responder */
    hostname?: string;
    /** Informational text */
    info?: string;
    /** Whether responder is a slave */
    slave?: boolean;
    /** The responder belongs to no system yet and can be attached */
    unclaimed?: boolean;
    /** Authentication token (when required) */
    auth?: string;
    /** Salt used for password hashing during authentication */
    salt?: string;
    /** The states config of ioBroker.json  */
    states?: ioBroker.StatesDatabaseOptions;
    /** The objects config of ioBroker.json */
    objects?: ioBroker.ObjectsDatabaseOptions;
}

export type BrowseResultEntry = Partial<ReceivedMessage>;

/**
 * MHClient implements browsing and connecting to multihost-enabled ioBroker hosts.
 *
 * Usage:
 * - Create an instance of MHClient
 * - Call `browse(timeout, isDebug)` to discover hosts
 * - Call `connect(ip, password, callback)` to retrieve configs from a host
 */
export class MHClient {
    /** Incremental message id used for request/response correlation */
    private id: number = 1;
    private timer: NodeJS.Timeout | null = null;
    private server: dgram.Socket | undefined;

    /**
     * Stops the MH server and clears any pending timers.
     *
     * Cleans up the UDP socket and associated timeout to ensure no resources
     * are leaked after browsing or connect operations finish.
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
     * Calculate SHA-256 hash from secret and salt.
     *
     * @param secret - Multihost secret/password
     * @param salt - Salt provided by server
     * @param callback - Called with hex-encoded SHA-256 result
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
     * Starts a UDP server socket used for discovery and authentication.
     *
     * @param isBroadcast - If true, enables broadcast mode on the socket.
     * @param timeout - Time in ms after which the server will be automatically closed.
     * @param onReady - Called once the socket is bound and ready to send.
     * @param onMessage - Handler invoked for each parsed message. Return true to stop the server.
     * @param onFinished - Called when the server stops or an error occurs.
     */
    private startServer(
        isBroadcast: boolean,
        timeout: number,
        onReady: () => void,
        onMessage: (msg: ReceivedMessage, rinfo: dgram.RemoteInfo) => boolean,
        onFinished: (err?: Error) => void,
    ): void {
        if (this.server) {
            onFinished(new Error('Some operation still active'));
            return;
        }
        this.server = dgram.createSocket('udp4');
        timeout = timeout || 2_000;

        this.timer = setTimeout(() => {
            if (this.server) {
                this.stopServer();
                onFinished();
            }
        }, timeout);

        this.server.on('error', err => {
            if (this.server) {
                this.stopServer();
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
            if (isBroadcast) {
                this.server!.setBroadcast(true);
            }
            onReady();
        });

        this.server.bind();
    }

    /**
     * Browse for multihost servers.
     *
     * Sends a multicast/broadcast "browse" request and collects responses until timeout.
     *
     * @param timeout - Milliseconds to wait for responses.
     * @param isDebug - If true, include local addresses and log received messages.
     * @returns Promise resolving to an array of discovered hosts (partial ReceivedMessage entries).
     */
    browse(timeout: number, isDebug: boolean): Promise<BrowseResultEntry[]> {
        const result: BrowseResultEntry[] = [];
        const ownIps = tools.findIPs();

        return new Promise((resolve, reject) => {
            this.startServer(
                true,
                timeout,
                () => {
                    const text = JSON.stringify({
                        cmd: 'browse',
                        id: ++this.id,
                    });
                    this.server!.send(text, 0, text.length, PORT, MULTICAST_ADDR);
                },
                (msg, rinfo) => {
                    // ignore own answers
                    if (isDebug || (!tools.isLocalAddress(rinfo.address) && !ownIps.includes(rinfo.address))) {
                        if (msg.result === 'not authenticated') {
                            result.push({
                                ip: rinfo.address,
                                hostname: rinfo.address,
                                info: 'authentication required',
                                auth: msg.auth,
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
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result);
                },
            );
        });
    }

    /**
     * Connect to a single multihost server and retrieve its objects/states configuration.
     *
     * Performs an optional password-based authentication handshake if the server requires it.
     *
     * @param ip - IP address of the server to connect to.
     * @param password - Password to use for authentication (if required). Pass empty string to skip.
     * @param callback - Callback called with (err, objectsConfig, statesConfig, address).
     */
    connect(
        ip: string,
        password: string,
        callback: (
            err: Error | undefined,
            objectsConfig?: ioBroker.ObjectsDatabaseOptions,
            statesConfig?: ioBroker.StatesDatabaseOptions,
            address?: string,
        ) => void,
    ): void {
        let callCb = true;

        this.startServer(
            false,
            2_000,
            () => {
                const text = JSON.stringify({
                    cmd: 'browse',
                    id: ++this.id,
                });
                this.server!.send(text, 0, text.length, PORT, ip);
            },
            (msg, rinfo) => {
                // we expect only one answer
                if (msg.cmd === 'browse' && msg.id === this.id) {
                    if (msg.result === 'ok') {
                        if (callCb) {
                            if (!msg.objects) {
                                callback(new Error(`Invalid configuration received: ${JSON.stringify(msg)}`));
                                callCb = false;
                            } else if (!msg.states) {
                                callback(new Error(`Invalid configuration received: ${JSON.stringify(msg)}`));
                                callCb = false;
                            } else if (typeof callback === 'function') {
                                callback(undefined, msg.objects, msg.states, rinfo.address);
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
                                    password: shaText,
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
                }
                console.warn(`Multihost discovery client: Unexpected message: ${JSON.stringify(msg)}`);

                return false;
            },
            function onFinished(err) {
                if (callCb) {
                    callback(err);
                    callCb = false;
                }
            },
        );
    }

    /**
     * Send a write command to a host that is not part of this system yet.
     *
     * `browse` asks and the other host answers. These commands go the other way: the master tells a
     * freshly installed host what to do. That host is not connected to any states database, so this
     * socket is the only way to reach it.
     *
     * Sent as unicast - the multicast address is only needed for finding hosts.
     *
     * @param ip - Address of the target host
     * @param cmd - `join` to attach it, `decline` to be ignored by it, `identify` to make it log
     * @param payload - additional fields of the command
     * @param payload.masterUuid - UUID of this master, used by `join` and `decline`
     * @param payload.password - multihost password, used by `join`
     * @param payload.revoke - `decline` only: take the rejection back
     * @param timeout - Milliseconds to wait for the answer
     * @returns the answer of the host
     */
    sendCommand(
        ip: string,
        cmd: 'join' | 'decline' | 'identify',
        payload: { masterUuid?: string; password?: string; revoke?: boolean } = {},
        timeout = 2_000,
    ): Promise<ReceivedMessage> {
        return new Promise((resolve, reject) => {
            let answered = false;
            const requestId = ++this.id;

            this.startServer(
                false,
                timeout,
                () => {
                    const text = JSON.stringify({ cmd, id: requestId, ...payload });
                    this.server!.send(text, 0, text.length, PORT, ip);
                },
                msg => {
                    if (msg.cmd !== cmd || msg.id !== requestId) {
                        // not ours - keep listening
                        return false;
                    }
                    answered = true;
                    resolve(msg);
                    return true;
                },
                err => {
                    if (!answered) {
                        reject(err || new Error(`No answer from ${ip} for command "${cmd}"`));
                    }
                },
            );
        });
    }
}
