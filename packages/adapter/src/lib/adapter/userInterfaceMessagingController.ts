import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { AdapterClass } from './adapter';
import type {
    UserInterfaceClientSubscribeHandler,
    UserInterfaceClientSubscribeReturnType,
    UserInterfaceClientUnsubscribeHandler
} from '../_Types';
import { clearTimeout } from 'timers';

export interface HeartbeatTimer {
    /** The actual timer */
    timer: NodeJS.Timeout;
    /** The heartbeat interval */
    heartbeat: number;
}

export interface MessagingControllerOptions {
    /** The adapter using this messaging controller */
    adapter: AdapterClass;
    /** Callback to call if successfully subscribed */
    subscribeCallback?: UserInterfaceClientSubscribeHandler;
    /** Callback to call if successfully unsubscribed */
    unsubscribeCallback?: UserInterfaceClientUnsubscribeHandler;
}

export interface SendToClientOptions {
    /** ID of the handler to send the message to */
    handlerId: string;
    /** Data to send to the client */
    data: unknown;
    /** The states db */
    states: StatesInRedisClient;
}

export interface ClientHandler {
    /** The session id of the client connection */
    sid: string;
    /** Name of the subscriber */
    from: string;
    /** Timestamp of subscription */
    ts: number;
    /** Individual type which can be specified */
    type: string;
}

export class UserInterfaceMessagingController {
    /** The adapter using this messaging controller */
    private readonly adapter: AdapterClass;
    /** Callback to call if successfully subscribed */
    private readonly unsubscribeCallback?: UserInterfaceClientUnsubscribeHandler;
    /** Callback to call if successfully unsubscribed */
    private readonly subscribeCallback?: UserInterfaceClientSubscribeHandler;
    /** All currently registered client handlers */
    private readonly handlers = new Map<string, ClientHandler>();
    /** Collection of current heartbeat timers */
    private heartbeatTimers = new Map<string, HeartbeatTimer>();
    constructor(options: MessagingControllerOptions) {
        const { adapter, unsubscribeCallback, subscribeCallback } = options;

        this.adapter = adapter;
        this.unsubscribeCallback = unsubscribeCallback;
        this.subscribeCallback = subscribeCallback;
    }

    /**
     * Send a message to the client configured by the handler
     *
     * @param options Data and client information
     */
    sendToClient(options: SendToClientOptions): Promise<void> {
        const { states, handlerId, data } = options;

        if (!this.handlers.has(handlerId)) {
            throw new Error(`Handler "${handlerId}" is not registered`);
        }

        const handler = this.handlers.get(handlerId)!;

        return states.pushMessage(handler.from, {
            command: 'im',
            message: { m: handler.type, s: handler.sid, d: data },
            from: `system.adapter.${this.adapter.namespace}`
        });
    }

    /**
     * Register subscription from new client
     *
     * @param msg The subscribe message
     */
    async registerClientSubscribeByMessage(msg: ioBroker.Message): Promise<void> {
        if (!this.subscribeCallback) {
            return;
        }
        const handler = this.extractHandlerFromMessage(msg);
        const handlerId = this.handlerToId(handler);

        const resOrAwaitable = this.subscribeCallback({ handlerId, message: msg });
        let res: UserInterfaceClientSubscribeReturnType;

        if (resOrAwaitable instanceof Promise) {
            res = await resOrAwaitable;
        } else {
            res = resOrAwaitable;
        }

        if (!res.accepted) {
            return;
        }

        this.handlers.set(handlerId, handler);

        if (res.heartbeat) {
            const timer = setTimeout(() => this.heartbeatExpired(handlerId), res.heartbeat);
            this.heartbeatTimers.set(handlerId, { heartbeat: res.heartbeat, timer });
        }
    }

    /**
     * Remove a client subscription, issued by message
     *
     * @param msg The unsubscribe message
     */
    removeClientSubscribeByMessage(msg: ioBroker.Message): void {
        const handler = this.extractHandlerFromMessage(msg);
        const handlerId = this.handlerToId(handler);

        if (this.heartbeatTimers.has(handlerId)) {
            const timer = this.heartbeatTimers.get(handlerId)!;

            clearTimeout(timer.timer);
            this.heartbeatTimers.delete(handlerId);
        }

        if (!this.handlers.has(handlerId)) {
            return;
        }

        this.handlers.delete(handlerId);
        if (this.unsubscribeCallback) {
            this.unsubscribeCallback({ handlerId, message: msg, reason: 'client_unsubscribe' });
        }
    }

    /**
     * Convert handler to id
     *
     * @param handler the client handler to creat the id for
     */
    private handlerToId(handler: ClientHandler): string {
        const { sid, type, from } = handler;

        return `${sid}-${from}-${type}`;
    }

    /**
     * Extract the client handler from a given message
     *
     * @param msg the subscribe or unsubscribe message
     */
    private extractHandlerFromMessage(msg: ioBroker.Message): ClientHandler {
        return { sid: msg.message.sid, from: msg.from, type: msg.message.type, ts: Date.now() };
    }

    /**
     * Handle expired heartbeat
     *
     * @param handlerId the id of the expired handler
     */
    private heartbeatExpired(handlerId: string): void {
        this.handlers.delete(handlerId);
        this.heartbeatTimers.delete(handlerId);

        if (this.unsubscribeCallback) {
            this.unsubscribeCallback({ handlerId, reason: 'timeout' });
        }
    }
}
