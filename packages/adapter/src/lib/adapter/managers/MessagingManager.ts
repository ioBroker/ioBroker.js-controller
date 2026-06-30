import type Winston from 'winston';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { UserInterfaceMessagingController } from '../userInterfaceMessagingController.js';
import type {
    AllPropsUnknown,
    InternalSendToHostOptions,
    InternalSendToOptions,
    NotificationOptions,
    SendToOptions,
    SendToUserInterfaceClientOptions,
} from '../../_Types.js';
import { Validator } from '../validator.js';
import { tools } from '@iobroker/js-controller-common';
import { isMessageboxSupported } from '@/lib/adapter/utils.js';

/** Entry in the pending-reply registry for sendTo calls with expectReply=true */
interface PendingReply {
    resolve: (msg: any) => void;
    reject: (e: Error) => void;
    timer?: NodeJS.Timeout;
    time: number;
}

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

/** Owns the adapter's outbound messaging and the pending-reply registry. */
export class MessagingManager {
    readonly #pending = new Map<number, PendingReply>();
    #callbackId = 1;
    #mboxSubscribed = false;

    /**
     * @param deps Dependencies injected at construction time
     */
    constructor(private readonly deps: MessagingManagerDeps) {}

    /**
     * Sends a message to another adapter instance. Validates args and throws on error.
     *
     * When `opts.expectReply` is true and the target is a specific instance (not broadcast),
     * the returned promise resolves with the reply message when it arrives, or rejects with
     * `Error('Timeout exceeded')` if `opts.options.timeout` elapses.
     *
     * @param opts Normalized send options
     */
    async sendTo(opts: InternalSendToOptions): Promise<any> {
        const { command, message, callback, options, expectReply } = opts;
        let { instanceName } = opts;

        if (!instanceName) {
            throw new Error('No instanceName provided or not a string');
        }

        if (!instanceName.startsWith('system.adapter.')) {
            instanceName = `system.adapter.${instanceName}`;
        }

        const obj: ioBroker.SendableMessage = {
            command,
            message,
            from: `system.adapter.${this.deps.getNamespace()}`,
        };

        const states = this.deps.getStates();
        if (!states) {
            this.deps.logger.info(
                `${this.deps.getNamespaceLog()} sendTo not processed because States database not connected`,
            );
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
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

        // Broadcast path: instanceName has no trailing .<number>
        if (!instanceName.match(/\.[0-9]+$/)) {
            const objects = this.deps.getObjects();
            if (!objects) {
                this.deps.logger.info(
                    `${this.deps.getNamespaceLog()} sendTo not processed because Objects database not connected`,
                );
                throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                const res = await objects.getObjectView('system', 'instance', {
                    startkey: `${instanceName}.`,
                    endkey: `${instanceName}.香`,
                });

                if (res) {
                    for (const row of res.rows) {
                        await states.pushMessage(row.id, obj);
                    }
                }
            } catch {
                // broadcast errors are ignored (mirrors original behavior)
            }
            return;
        }

        // Specific instance, reply-wait path
        if (expectReply) {
            return this.#registerReply(states, instanceName, obj, options);
        }

        // Specific instance, legacy callback-info object path
        if (callback) {
            obj.callback = { ...callback, ack: true };
        }

        await states.pushMessage(instanceName, obj);
    }

    /**
     * Subscribes to this instance's messagebox on demand when the adapter does not advertise
     * messagebox support, so replies to outbound messages are received. Idempotent.
     *
     * @param states the connected states DB client
     */
    #maybeSubscribe(states: StatesInRedisClient): void {
        const common = this.deps.getCommon();
        if (common && !isMessageboxSupported(common) && !this.#mboxSubscribed) {
            this.#mboxSubscribed = true;
            states
                .subscribeMessage(`system.adapter.${this.deps.getNamespace()}`)
                .catch(e =>
                    this.deps.logger.error(`${this.deps.getNamespaceLog()} Cannot subscribe to messages: ${e.message}`),
                );
        }
    }

    /**
     * Sets a reply callback header on `obj`, registers a pending-reply resolver keyed by its id,
     * subscribes the messagebox on demand, pushes the message and returns a promise that resolves
     * with the reply once `resolveCallback` is invoked for the matching id, or rejects with
     * `Error('Timeout exceeded')` when `options.timeout` elapses.
     *
     * @param states the connected states DB client
     * @param target the recipient id (instance or host) for `pushMessage`
     * @param obj the message to send; its `callback` header is set here
     * @param options additional send options (e.g. timeout)
     */
    async #registerReply(
        states: StatesInRedisClient,
        target: string,
        obj: ioBroker.SendableMessage,
        options?: SendToOptions,
    ): Promise<any> {
        this.#maybeSubscribe(states);

        const id = this.#callbackId++;
        if (this.#callbackId >= 0xffffffff) {
            this.#callbackId = 1;
        }

        obj.callback = {
            message: obj.message,
            id,
            ack: false,
            time: Date.now(),
        };

        let pendingEntry!: PendingReply;
        const replyPromise = new Promise<any>((resolve, reject) => {
            let timer: NodeJS.Timeout | undefined;
            if (options?.timeout) {
                timer = setTimeout(() => {
                    if (this.#pending.has(id)) {
                        this.#pending.delete(id);
                        reject(new Error('Timeout exceeded'));
                    }
                }, options.timeout);
            }

            pendingEntry = { resolve, reject, timer, time: Date.now() };
            this.#pending.set(id, pendingEntry);
        });

        const now = Date.now();
        for (const [_id, entry] of this.#pending) {
            if (now - entry.time > 3_600_000) {
                this.#pending.delete(_id);
            }
        }

        try {
            await states.pushMessage(target, obj);
        } catch (e) {
            if (pendingEntry.timer) {
                clearTimeout(pendingEntry.timer);
            }
            this.#pending.delete(id);
            throw e;
        }
        return replyPromise;
    }

    /**
     * Sends a message to a host, or broadcasts to all hosts when `hostName` is `null`.
     * Validates args and throws on error.
     *
     * When `opts.expectReply` is true and a specific host is targeted, the returned promise
     * resolves with the reply message when it arrives, or rejects with `Error('Timeout exceeded')`
     * if `opts.options.timeout` elapses. Broadcasts (hostName === null) resolve void.
     *
     * @param opts Normalized send options
     */
    async sendToHost(opts: InternalSendToHostOptions): Promise<any> {
        const { command, message, expectReply, options } = opts;
        let { hostName } = opts;
        const obj: ioBroker.SendableMessage = {
            command,
            message,
            from: `system.adapter.${this.deps.getNamespace()}`,
        };

        const states = this.deps.getStates();
        if (!states) {
            this.deps.logger.info(
                `${this.deps.getNamespaceLog()} sendToHost not processed because States database not connected`,
            );
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
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
                throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
            }

            const res = await new Promise<{ rows: { id: string }[] } | undefined>((resolve, reject) =>
                objects.getObjectList({ startkey: 'system.host.', endkey: 'system.host.香' }, null, (err, result) =>
                    err ? reject(err) : resolve(result as { rows: { id: string }[] } | undefined),
                ),
            );

            const broadcastStates = this.deps.getStates();
            if (!broadcastStates) {
                return;
            }

            if (res?.rows.length) {
                for (const row of res.rows) {
                    const parts: string[] = row.id.split('.');
                    // ignore system.host.name.alive and so on
                    if (parts.length === 3) {
                        await broadcastStates.pushMessage(row.id, obj);
                    }
                }
            }
            return;
        }

        if (expectReply) {
            return this.#registerReply(states, hostName, obj, options);
        }

        await states.pushMessage(hostName, obj);
    }

    /**
     * Resolves a pending reply promise for an acked messagebox message.
     * Returns true if a pending entry was found and consumed.
     *
     * @param obj incoming message object from the messagebox
     */
    resolveCallback(obj: ioBroker.Message): boolean {
        if (!obj.callback?.ack || !obj.callback.id) {
            return false;
        }

        const entry = this.#pending.get(obj.callback.id);
        if (!entry) {
            return false;
        }

        if (entry.timer) {
            clearTimeout(entry.timer);
        }
        this.#pending.delete(obj.callback.id);
        entry.resolve(obj.message);

        const now = Date.now();
        for (const [id, pending] of this.#pending) {
            if (now - pending.time > 3_600_000) {
                this.#pending.delete(id);
            }
        }

        return true;
    }

    /**
     * Rejects all pending reply promises and clears their timers (used on stop).
     */
    clearPendingCallbacks(): void {
        if (this.#pending.size) {
            const err = new Error('Adapter stopped');
            for (const entry of this.#pending.values()) {
                if (entry.timer) {
                    clearTimeout(entry.timer);
                }
                entry.reject(err);
            }
            this.#pending.clear();
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
}
