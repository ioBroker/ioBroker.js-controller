import type Winston from 'winston';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { UserInterfaceMessagingController } from '../userInterfaceMessagingController.js';
import type { InternalSendToHostOptions, InternalSendToOptions, MessageCallbackObject, SendToOptions } from '../../_Types.js';
import { Validator } from '../validator.js';
import { tools } from '@iobroker/js-controller-common';
import { isMessageboxSupported } from '@/lib/adapter/utils.js';

export type Validated<T> = { ok: true; value: T } | { ok: false; error: Error };

/** Dependencies injected into MessagingManager at construction time. */
export interface MessagingManagerDeps {
    readonly namespace: `${string}.${number}`;
    readonly namespaceLog: string;
    readonly logger: Winston.Logger;
    readonly uiMessagingController: UserInterfaceMessagingController;
    getStates: () => StatesInRedisClient | null | undefined;
    getObjects: () => ObjectsInRedisClient | null | undefined;
    getCommon: () => ioBroker.InstanceCommon | undefined;
}

/** Owns the adapter's outbound messaging and the pending message-callback registry. */
export class MessagingManager {
    readonly #callbacks = new Map<number, MessageCallbackObject>();
    #callbackId = 1;
    #mboxSubscribed = false;

    constructor(private readonly deps: MessagingManagerDeps) {}

    /**
     * Validates and normalizes sendTo arguments, returning a typed result.
     *
     * @param instanceName target adapter instance, e.g. `"pushover.0"`
     * @param command command name
     * @param message message payload
     * @param callback optional response callback or callback-info object
     * @param options optional send options (e.g. timeout)
     */
    assertSendTo(
        instanceName: unknown,
        command: unknown,
        message: unknown,
        callback?: unknown,
        options?: unknown,
    ): Validated<InternalSendToOptions> {
        try {
            if (typeof message === 'function' && typeof callback === 'undefined') {
                callback = message;
                message = undefined;
            }
            if (typeof message === 'undefined') {
                message = command;
                command = 'send';
            }
            Validator.assertString(instanceName, 'instanceName');
            Validator.assertString(command, 'command');
            if (!tools.isObject(callback)) {
                Validator.assertOptionalCallback(callback, 'callback');
            }
            if (options !== undefined) {
                Validator.assertObject(options, 'options');
            }
            return {
                ok: true,
                value: {
                    instanceName,
                    command,
                    message,
                    options: options as SendToOptions | undefined,
                    callback: callback as ioBroker.MessageCallback | ioBroker.MessageCallbackInfo,
                },
            };
        } catch (e) {
            return { ok: false, error: e instanceof Error ? e : new Error(String(e)) };
        }
    }

    /**
     * Sends a message to another adapter instance.
     *
     * @param opts validated send options produced by {@link assertSendTo}
     */
    async sendTo(opts: InternalSendToOptions): Promise<void> {
        const { command, message, callback, options } = opts;
        let { instanceName } = opts;

        const obj: ioBroker.SendableMessage = {
            command,
            message,
            from: `system.adapter.${this.deps.namespace}`,
        };

        if (!instanceName) {
            // @ts-expect-error TODO it could also be the cb object
            return tools.maybeCallbackWithError(callback, 'No instanceName provided or not a string');
        }

        if (!instanceName.startsWith('system.adapter.')) {
            instanceName = `system.adapter.${instanceName}`;
        }

        const states = this.deps.getStates();
        if (!states) {
            this.deps.logger.info(`${this.deps.namespaceLog} sendTo not processed because States database not connected`);
            // @ts-expect-error TODO it could also be the cb object
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (typeof message !== 'object') {
            this.deps.logger.silly(
                `${this.deps.namespaceLog} sendTo "${command}" to ${instanceName} from system.adapter.${this.deps.namespace}: ${message}`,
            );
        } else {
            this.deps.logger.silly(
                `${this.deps.namespaceLog} sendTo "${command}" to ${instanceName} from system.adapter.${this.deps.namespace}`,
            );
        }

        // If not specific instance
        if (!instanceName.match(/\.[0-9]+$/)) {
            const objects = this.deps.getObjects();
            if (!objects) {
                this.deps.logger.info(`${this.deps.namespaceLog} sendTo not processed because Objects database not connected`);
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                // Send it to all instances of adapter
                const res = await objects.getObjectView('system', 'instance', {
                    startkey: `${instanceName}.`,
                    endkey: `${instanceName}.香`,
                });

                if (res) {
                    for (const row of res.rows) {
                        try {
                            await states.pushMessage(row.id, obj);
                        } catch (e) {
                            // @ts-expect-error TODO it could also be the cb object
                            return tools.maybeCallbackWithError(callback, e);
                        }
                    }
                }
            } catch {
                //ignore
            }
        } else {
            if (callback) {
                if (typeof callback === 'function') {
                    // force subscribe even no messagebox enabled
                    if (!isMessageboxSupported(this.deps.getCommon()!) && !this.#mboxSubscribed) {
                        this.#mboxSubscribed = true;
                        states.subscribeMessage(`system.adapter.${this.deps.namespace}`);
                    }

                    obj.callback = {
                        message,
                        id: this.#callbackId++,
                        ack: false,
                        time: Date.now(),
                    };
                    if (this.#callbackId >= 0xffffffff) {
                        this.#callbackId = 1;
                    }

                    const callbackId = obj.callback.id;

                    let timer: undefined | NodeJS.Timeout;

                    if (options?.timeout) {
                        timer = setTimeout(() => {
                            const callbackObj = this.#callbacks.get(callbackId);

                            if (callbackObj) {
                                callbackObj.cb(new Error('Timeout exceeded'));
                                this.#callbacks.delete(callbackId);
                            }
                        }, options.timeout);
                    }

                    this.#callbacks.set(callbackId, { cb: callback, time: Date.now(), timer });

                    // delete too old callbacks IDs
                    const now = Date.now();
                    for (const [_id, cb] of this.#callbacks) {
                        if (now - cb.time > 3_600_000) {
                            this.#callbacks.delete(_id);
                        }
                    }
                } else {
                    // callback is an object
                    obj.callback = callback;
                    obj.callback.ack = true;
                }
            }

            try {
                await states.pushMessage(instanceName, obj);
            } catch (e) {
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }

    /**
     * Validates and normalizes sendToHost arguments, returning a typed result.
     * A `null` hostName means broadcast to all hosts.
     *
     * @param hostName target host name or `null` to broadcast to all hosts
     * @param command command name
     * @param message message payload
     * @param callback optional response callback or callback-info object
     */
    assertSendToHost(
        hostName: unknown,
        command: unknown,
        message: unknown,
        callback?: unknown,
    ): Validated<InternalSendToHostOptions> {
        try {
            if (typeof message === 'undefined') {
                message = command;
                command = 'send';
            }

            if (hostName !== null) {
                Validator.assertString(hostName, 'hostName');
            }

            Validator.assertString(command, 'command');

            if (!tools.isObject(callback)) {
                Validator.assertOptionalCallback(callback, 'callback');
            }

            return {
                ok: true,
                value: {
                    hostName: hostName as string | null,
                    command,
                    message,
                    callback: callback as ioBroker.MessageCallback | ioBroker.MessageCallbackInfo,
                },
            };
        } catch (e) {
            return { ok: false, error: e instanceof Error ? e : new Error(String(e)) };
        }
    }

    /**
     * Sends a message to a host, or broadcasts to all hosts when `hostName` is `null`.
     *
     * @param opts validated send options produced by {@link assertSendToHost}
     */
    async sendToHost(opts: InternalSendToHostOptions): Promise<void> {
        const { command, message, callback } = opts;
        let { hostName } = opts;
        const obj: Partial<ioBroker.Message> = { command, message, from: `system.adapter.${this.deps.namespace}` };

        const states = this.deps.getStates();
        if (!states) {
            this.deps.logger.info(`${this.deps.namespaceLog} sendToHost not processed because States database not connected`);
            // @ts-expect-error TODO it could also be the cb object
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (hostName && !hostName.startsWith('system.host.')) {
            hostName = `system.host.${hostName}`;
        }

        if (!hostName) {
            const objects = this.deps.getObjects();
            if (!objects) {
                this.deps.logger.info(
                    `${this.deps.namespaceLog} sendToHost not processed because Objects database not connected`,
                );
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            objects.getObjectList(
                {
                    startkey: 'system.host.',
                    endkey: `system.host.香`,
                },
                null,
                async (err, res) => {
                    const broadcastStates = this.deps.getStates();
                    if (!broadcastStates) {
                        return;
                    }
                    if (!err && res?.rows.length) {
                        for (const row of res.rows) {
                            const parts: string[] = row.id.split('.');
                            // ignore system.host.name.alive and so on
                            if (parts.length === 3) {
                                try {
                                    await broadcastStates.pushMessage(row.id, obj as any);
                                } catch (e) {
                                    // @ts-expect-error TODO it could also be the cb object
                                    return tools.maybeCallbackWithError(callback, e);
                                }
                            }
                        }
                    }
                },
            );
        } else {
            if (callback) {
                if (typeof callback === 'function') {
                    // force subscribe even no messagebox enabled
                    if (!isMessageboxSupported(this.deps.getCommon()!) && !this.#mboxSubscribed) {
                        this.#mboxSubscribed = true;
                        states.subscribeMessage(`system.adapter.${this.deps.namespace}`);
                    }

                    obj.callback = {
                        message,
                        id: this.#callbackId++,
                        ack: false,
                        time: Date.now(),
                    };
                    if (this.#callbackId >= 0xffffffff) {
                        this.#callbackId = 1;
                    }

                    this.#callbacks.set(obj.callback.id, { cb: callback, time: Date.now() });
                } else {
                    obj.callback = callback;
                    obj.callback.ack = true;
                }
            }

            try {
                await states.pushMessage(hostName, obj as any);
            } catch (e) {
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }
}
