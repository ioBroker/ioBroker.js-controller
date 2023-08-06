import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { AdapterClass } from './adapter';
import type { ClientHandler, ClientSubscribeHandler, ClientUnsubscribeHandler } from '../_Types';

export interface SendToClientOptions {
    /** The client handler to send the message to */
    handler: ClientHandler;
    /** Data to send to the client */
    data: unknown;
    /** The states db */
    states: StatesInRedisClient;
}

export interface RegisterClientBaseOptions {
    /** The message which contains the subscribe/unsubscribe command */
    msg: ioBroker.Message;
}

export interface RegisterClientOptions extends RegisterClientBaseOptions {
    /** Callback to call if successfully subscribed */
    callback?: ClientSubscribeHandler;
}

export interface UnregisterClientOptions extends RegisterClientBaseOptions {
    /** Callback to call if successfully unsubscribed */
    callback?: ClientUnsubscribeHandler;
}

export class MessagingController {
    /** The adapter using this messaging controller */
    private readonly adapter: AdapterClass;
    /** All currently registered client handlers */
    private readonly handlers = new Map<string, ClientHandler>();
    constructor(adapter: AdapterClass) {
        this.adapter = adapter;
    }

    /**
     * Send a message to the client configured by the handler
     *
     * @param options Data and client information
     */
    sendToClient(options: SendToClientOptions): Promise<void> {
        const { states, handler, data } = options;

        return states.pushMessage(handler.from, {
            command: 'im',
            message: { m: handler.type, s: handler.sid, d: data },
            from: `system.adapter.${this.adapter.namespace}`
        });
    }

    /**
     * Register subscription from new client
     *
     * @param options Message and handler information
     */
    registerClientSubscribeByMessage(options: RegisterClientOptions): void {
        const { msg, callback } = options;
        const handler = this.extractHandlerFromMessage(msg);

        this.handlers.set(this.handlerToId(handler), handler);
        if (callback) {
            callback(handler, msg);
        }
    }

    /**
     * Remove a client subscription, issued by message
     *
     * @param options Message and handler information
     */
    removeClientSubscribeByMessage(options: UnregisterClientOptions): void {
        const { msg, callback } = options;
        const handler = this.extractHandlerFromMessage(msg);
        const handlerId = this.handlerToId(handler);

        if (!this.handlers.has(handlerId)) {
            return;
        }

        this.handlers.delete(handlerId);
        if (callback) {
            callback(handler, msg, 'client_unsubscribe');
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
}
