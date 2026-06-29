import type Winston from 'winston';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { UserInterfaceMessagingController } from '../userInterfaceMessagingController.js';
import type {
    AllPropsUnknown,
    InternalSendToHostOptions,
    InternalSendToOptions,
    MessageCallbackObject,
    NotificationOptions,
    SendToOptions,
    SendToUserInterfaceClientOptions,
} from '../../_Types.js';
import { Validator } from '../validator.js';
import { tools } from '@iobroker/js-controller-common';
import { isMessageboxSupported } from '@/lib/adapter/utils.js';

export type Validated<T> =
    | {
          /** Discriminant: validation succeeded */
          ok: true;
          /** Validated and normalized value */
          value: T;
      }
    | {
          /** Discriminant: validation failed */
          ok: false;
          /** Validation error */
          error: Error;
      };

/** Dependencies injected into MessagingManager at construction time. */
export interface MessagingManagerDeps {
    /** Returns the current adapter namespace (re-derived during init), e.g. `"adapter.0"` */
    getNamespace: () => `${string}.${number}`;
    /** Returns the current namespace string used in log messages (re-derived during init) */
    getNamespaceLog: () => string;
    /** Logger instance */
    readonly logger: Winston.Logger;
    /** Controller for UI messaging */
    readonly uiMessagingController: UserInterfaceMessagingController;
    /** Returns the current host name (late-bound; may be undefined before init) */
    getHost: () => string | undefined;
    /** Returns the current states DB client */
    getStates: () => StatesInRedisClient | null | undefined;
    /** Returns the current objects DB client */
    getObjects: () => ObjectsInRedisClient | null | undefined;
    /** Returns the current adapter common config */
    getCommon: () => ioBroker.InstanceCommon | undefined;
}

/** Owns the adapter's outbound messaging and the pending message-callback registry. */
export class MessagingManager {
    readonly #callbacks = new Map<number, MessageCallbackObject>();
    #callbackId = 1;
    #mboxSubscribed = false;

    /**
     * @param deps Dependencies injected at construction time
     */
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
                Validator.assertObject<SendToOptions>(options, 'options');
            }
            return {
                ok: true,
                value: {
                    instanceName,
                    command,
                    message,
                    options,
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
            from: `system.adapter.${this.deps.getNamespace()}`,
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
            this.deps.logger.info(
                `${this.deps.getNamespaceLog()} sendTo not processed because States database not connected`,
            );
            // @ts-expect-error TODO it could also be the cb object
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (typeof message !== 'object') {
            this.deps.logger.silly(
                `${this.deps.getNamespaceLog()} sendTo "${command}" to ${instanceName} from system.adapter.${this.deps.getNamespace()}: ${message}`,
            );
        } else {
            this.deps.logger.silly(
                `${this.deps.getNamespaceLog()} sendTo "${command}" to ${instanceName} from system.adapter.${this.deps.getNamespace()}`,
            );
        }

        if (!instanceName.match(/\.[0-9]+$/)) {
            const objects = this.deps.getObjects();
            if (!objects) {
                this.deps.logger.info(
                    `${this.deps.getNamespaceLog()} sendTo not processed because Objects database not connected`,
                );
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
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
                        states
                            .subscribeMessage(`system.adapter.${this.deps.getNamespace()}`)
                            .catch(e =>
                                this.deps.logger.error(
                                    `${this.deps.getNamespaceLog()} Cannot subscribe to messages: ${e.message}`,
                                ),
                            );
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

                    const now = Date.now();
                    for (const [_id, cb] of this.#callbacks) {
                        if (now - cb.time > 3_600_000) {
                            this.#callbacks.delete(_id);
                        }
                    }
                } else {
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
                    hostName,
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
     * Resolves a stored callback for an acked messagebox reply. Returns true if a stored callback was consumed.
     *
     * @param obj incoming message object from the messagebox
     */
    resolveCallback(obj: ioBroker.Message): boolean {
        let callbackObj: MessageCallbackObject | undefined;
        if (obj.callback?.id) {
            callbackObj = this.#callbacks.get(obj.callback.id);
        }
        if (obj.callback?.ack && obj.callback.id && callbackObj) {
            if (typeof callbackObj.cb === 'function') {
                callbackObj.cb(obj.message);
                if (callbackObj.timer) {
                    clearTimeout(callbackObj.timer);
                }
                this.#callbacks.delete(obj.callback.id);
            }
            const now = Date.now();
            for (const [id, callback] of this.#callbacks) {
                if (now - callback.time > 3_600_000) {
                    this.#callbacks.delete(id);
                }
            }
            return true;
        }
        return false;
    }

    /**
     * Clears all pending callbacks and their timers (used on stop).
     */
    clearPendingCallbacks(): void {
        if (this.#callbacks.size) {
            this.#callbacks.forEach(callbackObj => clearTimeout(callbackObj.timer));
            this.#callbacks.clear();
        }
    }

    /**
     * Sends a message to a single UI client, or broadcasts to all connected UI clients when `clientId` is omitted.
     *
     * @param options clientId and data options
     */
    sendToUI(options: SendToUserInterfaceClientOptions): Promise<void>;
    /**
     * @internal
     * @param options clientId and data options
     */
    sendToUI(options: AllPropsUnknown<SendToUserInterfaceClientOptions>): Promise<void>;
    sendToUI(options: AllPropsUnknown<SendToUserInterfaceClientOptions>): Promise<void> {
        const states = this.deps.getStates();
        if (!states) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        const { clientId, data } = options;

        if (clientId === undefined) {
            return this.deps.uiMessagingController.sendToAllClients({
                data,
                states,
            });
        }

        Validator.assertString(clientId, 'clientId');

        return this.deps.uiMessagingController.sendToClient({
            clientId,
            data,
            states,
        });
    }

    /**
     * Sends an addNotification command to the host of this adapter instance.
     *
     * @param scope notification scope
     * @param category notification category, or `null` to match by scope regex
     * @param message notification message
     * @param options additional notification options
     */
    registerNotification<Scope extends keyof ioBroker.NotificationScopes>(
        scope: Scope,
        category: ioBroker.NotificationScopes[Scope] | null,
        message: string,
        options?: NotificationOptions,
    ): Promise<void>;
    /**
     * @internal
     * @param scope notification scope
     * @param category notification category
     * @param message notification message
     * @param options additional notification options
     */
    registerNotification(scope: unknown, category: unknown, message: unknown, options?: unknown): Promise<void>;
    async registerNotification(scope: unknown, category: unknown, message: unknown, options?: unknown): Promise<void> {
        const states = this.deps.getStates();
        if (!states) {
            this.deps.logger.info(
                `${this.deps.getNamespaceLog()} registerNotification not processed because States database not connected`,
            );
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        Validator.assertString(scope, 'scope');
        if (category !== null) {
            Validator.assertString(category, 'category');
        }
        Validator.assertString(message, 'message');

        if (options !== undefined) {
            Validator.assertObject<NotificationOptions>(options, 'options');
        }

        const obj = {
            command: 'addNotification',
            message: {
                scope,
                category,
                message,
                instance: this.deps.getNamespace(),
                contextData: options?.contextData,
            },
            from: `system.adapter.${this.deps.getNamespace()}`,
        };

        await states.pushMessage(`system.host.${this.deps.getHost()}`, obj as any);
    }

    /**
     * Sends a message to a host, or broadcasts to all hosts when `hostName` is `null`.
     *
     * @param opts validated send options produced by {@link assertSendToHost}
     */
    async sendToHost(opts: InternalSendToHostOptions): Promise<void> {
        const { command, message, callback } = opts;
        let { hostName } = opts;
        const obj: Partial<ioBroker.Message> = { command, message, from: `system.adapter.${this.deps.getNamespace()}` };

        const states = this.deps.getStates();
        if (!states) {
            this.deps.logger.info(
                `${this.deps.getNamespaceLog()} sendToHost not processed because States database not connected`,
            );
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
                    `${this.deps.getNamespaceLog()} sendToHost not processed because Objects database not connected`,
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
                        states
                            .subscribeMessage(`system.adapter.${this.deps.getNamespace()}`)
                            .catch(e =>
                                this.deps.logger.error(
                                    `${this.deps.getNamespaceLog()} Cannot subscribe to messages: ${e.message}`,
                                ),
                            );
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
