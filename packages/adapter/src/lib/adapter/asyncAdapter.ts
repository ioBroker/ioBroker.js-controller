import type {
    AllPropsUnknown,
    NotificationOptions,
    SendToOptions,
    SendToUserInterfaceClientOptions,
} from '@/lib/_Types.js';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { MessagingManager } from '@/lib/adapter/managers/MessagingManager.js';
import { Validator } from '@/lib/adapter/validator.js';

/**
 * Clean async-only facade for the adapter's outbound messaging. Owns the {@link MessagingManager}
 * and exposes promise-based methods without the legacy `*Async` postfix.
 */
export class AsyncAdapter {
    readonly #messaging: MessagingManager;

    /**
     * @param ctx Shared adapter context providing live runtime state
     */
    constructor(ctx: AdapterContext) {
        this.#messaging = new MessagingManager(ctx);
    }

    /**
     * Sends a message to another adapter instance and, unless `options.expectReply` is `false`,
     * resolves with the reply when it arrives (or rejects with `Error('Timeout exceeded')` on timeout).
     *
     * Broadcast targets (instance name without a trailing `.<number>`) resolve void regardless.
     *
     * @param instanceName name of the instance to send the message to
     * @param command command name
     * @param message message payload
     * @param options send options; set `expectReply: false` for fire-and-forget, or pass a legacy
     *        `callback` info header (mutually exclusive with `expectReply`)
     */
    sendTo(
        instanceName: string,
        command: string,
        message: any,
        options?: SendToOptions & { expectReply?: boolean; callback?: ioBroker.MessageCallbackInfo },
    ): Promise<any>;
    /**
     * @internal
     * @param instanceName name of the instance to send the message to
     * @param command command name
     * @param message message payload
     * @param options send options
     */
    sendTo(instanceName: unknown, command: unknown, message?: unknown, options?: unknown): Promise<any>;
    /**
     * @param instanceName name of the instance to send the message to
     * @param command command name
     * @param message message payload
     * @param options send options
     */
    async sendTo(instanceName: unknown, command: unknown, message?: unknown, options?: unknown): Promise<any> {
        Validator.assertString(instanceName, 'instanceName');
        Validator.assertString(command, 'command');
        if (options !== undefined) {
            Validator.assertObject<SendToOptions & { expectReply?: boolean; callback?: ioBroker.MessageCallbackInfo }>(
                options,
                'options',
            );
        }

        const { expectReply, callback, ...sendOptions } = options ?? {};
        return this.#messaging.sendTo({
            instanceName,
            command,
            message,
            callback,
            options: Object.keys(sendOptions).length ? sendOptions : undefined,
            expectReply: callback ? false : (expectReply ?? true),
        });
    }

    /**
     * Sends a message to a host, or broadcasts to all hosts when `hostName` is `null`.
     * For a specific host, resolves with the reply unless `options.expectReply` is `false`.
     * Broadcasts resolve void.
     *
     * @param hostName name of the host, or `null` to broadcast to all hosts
     * @param command command name
     * @param message message payload
     * @param options send options; set `expectReply: false` for fire-and-forget
     */
    sendToHost(
        hostName: string | null,
        command: string,
        message: any,
        options?: SendToOptions & { expectReply?: boolean; callback?: ioBroker.MessageCallbackInfo },
    ): Promise<any>;
    /**
     * @internal
     * @param hostName name of the host, or `null` to broadcast to all hosts
     * @param command command name
     * @param message message payload
     * @param options send options
     */
    sendToHost(hostName: unknown, command: unknown, message?: unknown, options?: unknown): Promise<any>;
    /**
     * @param hostName name of the host, or `null` to broadcast to all hosts
     * @param command command name
     * @param message message payload
     * @param options send options
     */
    async sendToHost(hostName: unknown, command: unknown, message?: unknown, options?: unknown): Promise<any> {
        if (hostName !== null) {
            Validator.assertString(hostName, 'hostName');
        }
        Validator.assertString(command, 'command');
        if (options !== undefined) {
            Validator.assertObject<SendToOptions & { expectReply?: boolean; callback?: ioBroker.MessageCallbackInfo }>(
                options,
                'options',
            );
        }

        const { expectReply, callback, ...sendOptions } = options ?? {};
        return this.#messaging.sendToHost({
            hostName,
            command,
            message,
            callback,
            options: Object.keys(sendOptions).length ? sendOptions : undefined,
            // broadcast (null host) yields many responses → never wait for a reply
            expectReply: hostName !== null && !callback && (expectReply ?? true),
        });
    }

    /**
     * Sends a message to a single UI client, or broadcasts to all connected UI clients when `clientId` is omitted.
     *
     * @param options clientId and data options
     */
    sendToUI(options: AllPropsUnknown<SendToUserInterfaceClientOptions>): Promise<void> {
        const { clientId, data } = options;
        if (clientId !== undefined) {
            Validator.assertString(clientId, 'clientId');
        }
        return this.#messaging.sendToUI({ clientId, data });
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
    /**
     * @param scope notification scope
     * @param category notification category
     * @param message notification message
     * @param options additional notification options
     */
    async registerNotification(scope: unknown, category: unknown, message: unknown, options?: unknown): Promise<void> {
        Validator.assertString(scope, 'scope');
        if (category !== null) {
            Validator.assertString(category, 'category');
        }
        Validator.assertString(message, 'message');
        if (options !== undefined) {
            Validator.assertObject<NotificationOptions>(options, 'options');
        }
        return this.#messaging.registerNotification(scope, category, message, options);
    }

    /**
     * Resolves a pending reply promise for an acked messagebox message.
     * Returns true if a pending entry was found and consumed.
     *
     * @param obj incoming message object from the messagebox
     */
    resolveReply(obj: ioBroker.Message): boolean {
        return this.#messaging.resolveCallback(obj);
    }

    /**
     * Rejects all pending reply promises and clears their timers (used on stop).
     */
    clearPending(): void {
        this.#messaging.clearPendingCallbacks();
    }
}
