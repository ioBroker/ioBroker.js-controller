import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { AdapterClass } from '@/lib/adapter/adapter.js';
import type {
    UserInterfaceClientRemoveMessage,
    UserInterfaceClientSubscribeHandler,
    UserInterfaceClientSubscribeReturnType,
    UserInterfaceClientUnsubscribeHandler,
} from '@/lib/_Types.js';

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
    /** ID of the client to send the message to, will send to all if omitted */
    clientId: string;
    /** Data to send to the client */
    data: unknown;
    /** The states db */
    states: StatesInRedisClient;
}

export type SendToAllClientOptions = Omit<SendToClientOptions, 'clientId'>;

export interface ClientHandler {
    /** The session id of the client connection */
    sid: string;
    /** Name of the subscriber */
    from: string;
    /** Individual type which can be specified */
    type: string;
}

/**
 * The message has short keys, to save bytes for high-throughput messaging
 */
interface UserInterfaceMessage {
    /** The individual type of the client handler */
    m: string;
    /** The session id of the client connection */
    s: string;
    /** The actual data */
    d: unknown;
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
     * Send a message to the given clientId
     *
     * @param options Data, states and client information
     */
    sendToClient(options: SendToClientOptions): Promise<void> {
        const { states, clientId, data } = options;

        if (!this.handlers.has(clientId)) {
            throw new Error(`Client "${clientId}" is not registered`);
        }

        const handler = this.handlers.get(clientId)!;

        return states.pushMessage(handler.from, {
            command: 'im',
            message: { m: handler.type, s: handler.sid, d: data } satisfies UserInterfaceMessage,
            from: `system.adapter.${this.adapter.namespace}`,
        });
    }

    /**
     * Send a message to all active clients
     *
     * @param options Data and states options
     */
    async sendToAllClients(options: SendToAllClientOptions): Promise<void> {
        const { states, data } = options;

        for (const clientId of Object.keys(this.handlers)) {
            await this.sendToClient({ clientId, data, states });
        }
    }

    /**
     * Register subscription from new client
     *
     * @param msg The subscribe message
     */
    async registerClientSubscribeByMessage(
        msg: ioBroker.Message,
    ): Promise<UserInterfaceClientSubscribeReturnType | undefined> {
        if (!this.subscribeCallback) {
            return;
        }

        const handler = this.extractHandlerFromMessage(msg);
        const clientId = this.handlerToId(handler);

        if (this.heartbeatTimers.has(clientId)) {
            this.heartbeatTimers.get(clientId)!.timer.refresh();
            return;
        }

        const resOrAwaitable = this.subscribeCallback({ clientId, message: msg });
        let res: UserInterfaceClientSubscribeReturnType;

        if (resOrAwaitable instanceof Promise) {
            res = await resOrAwaitable;
        } else {
            res = resOrAwaitable;
        }

        if (!res.accepted) {
            return res;
        }

        this.handlers.set(clientId, handler);
        if (res.heartbeat) {
            const timer = setTimeout(() => this.heartbeatExpired(clientId), res.heartbeat);
            this.heartbeatTimers.set(clientId, { heartbeat: res.heartbeat, timer });
        }

        return res;
    }

    /**
     * Remove a client subscription, issued by message
     * It contains an array of types which should be unsubscribed
     *
     * @param msg The unsubscribe message
     */
    removeClientSubscribeByMessage(msg: UserInterfaceClientRemoveMessage): void {
        const handler = this.extractHandlerFromMessage(msg);
        const reason = msg.command === 'clientSubscribeError' ? msg.command : msg.message.reason;

        const types = msg.message.type;

        for (const type of types) {
            const clientId = this.handlerToId({ ...handler, type });

            if (this.heartbeatTimers.has(clientId)) {
                const timer = this.heartbeatTimers.get(clientId)!;

                clearTimeout(timer.timer);
                this.heartbeatTimers.delete(clientId);
            }

            if (!this.handlers.has(clientId)) {
                return;
            }

            this.handlers.delete(clientId);
            if (this.unsubscribeCallback) {
                this.unsubscribeCallback({ clientId, message: msg, reason });
            }
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
        return { sid: msg.message.sid, from: msg.from, type: msg.message.type };
    }

    /**
     * Handle expired heartbeat
     *
     * @param clientId the id of the expired client
     */
    private heartbeatExpired(clientId: string): void {
        this.handlers.delete(clientId);
        this.heartbeatTimers.delete(clientId);

        if (this.unsubscribeCallback) {
            this.unsubscribeCallback({ clientId, reason: 'timeout' });
        }
    }
}
