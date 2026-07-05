import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type {
    InternalSendToHostOptions,
    InternalSendToOptions,
    NotificationOptions,
    SendToOptions,
    SendToUserInterfaceClientOptions,
} from '../../_Types.js';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { tools } from '@iobroker/js-controller-common';
import { isMessageboxSupported } from '@/lib/adapter/utils.js';

/** Entry in the pending-reply registry for sendTo calls with expectReply=true */
interface PendingReply {
    resolve: (msg: any) => void;
    reject: (e: Error) => void;
    timer?: NodeJS.Timeout;
    time: number;
}

/** Owns the adapter's outbound messaging and the pending-reply registry. */
export class MessagingManager {
    readonly #pending = new Map<number, PendingReply>();
    #callbackId = 1;
    #mboxSubscribed = false;

    /**
     * @param ctx Shared adapter context providing live runtime state
     */
    constructor(private readonly ctx: AdapterContext) {}

    /**
     * Sends a message to another adapter instance.
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
            from: `system.adapter.${this.ctx.namespace}`,
        };

        const states = this.ctx.states;
        if (!states) {
            this.ctx.logger.info(`${this.ctx.namespaceLog} sendTo not processed because States database not connected`);
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (typeof message !== 'object') {
            this.ctx.logger.silly(
                `${this.ctx.namespaceLog} sendTo "${command}" to ${instanceName} from system.adapter.${this.ctx.namespace}: ${message}`,
            );
        } else {
            this.ctx.logger.silly(
                `${this.ctx.namespaceLog} sendTo "${command}" to ${instanceName} from system.adapter.${this.ctx.namespace}`,
            );
        }

        if (!instanceName.match(/\.[0-9]+$/)) {
            const objects = this.ctx.objects;
            if (!objects) {
                this.ctx.logger.info(
                    `${this.ctx.namespaceLog} sendTo not processed because Objects database not connected`,
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

        if (expectReply) {
            return this.#registerReply(states, instanceName, obj, options);
        }

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
        const common = this.ctx.common;
        if (common && !isMessageboxSupported(common) && !this.#mboxSubscribed) {
            this.#mboxSubscribed = true;
            states
                .subscribeMessage(`system.adapter.${this.ctx.namespace}`)
                .catch(e =>
                    this.ctx.logger.error(`${this.ctx.namespaceLog} Cannot subscribe to messages: ${e.message}`),
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
            from: `system.adapter.${this.ctx.namespace}`,
        };

        const states = this.ctx.states;
        if (!states) {
            this.ctx.logger.info(
                `${this.ctx.namespaceLog} sendToHost not processed because States database not connected`,
            );
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (hostName && !hostName.startsWith('system.host.')) {
            hostName = `system.host.${hostName}`;
        }

        if (!hostName) {
            const objects = this.ctx.objects;
            if (!objects) {
                this.ctx.logger.info(
                    `${this.ctx.namespaceLog} sendToHost not processed because Objects database not connected`,
                );
                throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
            }

            const res = await objects.getObjectList({ startkey: 'system.host.', endkey: 'system.host.香' });

            const broadcastStates = this.ctx.states;
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
    sendToUI(options: SendToUserInterfaceClientOptions): Promise<void> {
        const states = this.ctx.states;
        if (!states) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        const { clientId, data } = options;

        if (clientId === undefined) {
            return this.ctx.uiMessagingController.sendToAllClients({
                data,
                states,
            });
        }

        return this.ctx.uiMessagingController.sendToClient({
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
    async registerNotification(
        scope: string,
        category: string | null,
        message: string,
        options?: NotificationOptions,
    ): Promise<void> {
        const states = this.ctx.states;
        if (!states) {
            this.ctx.logger.info(
                `${this.ctx.namespaceLog} registerNotification not processed because States database not connected`,
            );
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        const obj = {
            command: 'addNotification',
            message: {
                scope,
                category,
                message,
                instance: this.ctx.namespace,
                contextData: options?.contextData,
            },
            from: `system.adapter.${this.ctx.namespace}`,
        };

        await states.pushMessage(`system.host.${this.ctx.host}`, obj);
    }
}
