import type {
    AllPropsUnknown,
    InternalAdapterConfig,
    InternalGetCertificatesResult,
    NotificationOptions,
    SendToOptions,
    SendToUserInterfaceClientOptions,
} from '@/lib/_Types.js';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { CertificateManager } from '@/lib/adapter/managers/CertificateManager.js';
import { MessagingManager } from '@/lib/adapter/managers/MessagingManager.js';
import { ResourceManager } from '@/lib/adapter/managers/ResourceManager.js';
import { Validator } from '@/lib/adapter/validator.js';

/**
 * Clean async-only facade for the adapter's outbound messaging. Owns the {@link MessagingManager}
 * and exposes promise-based methods without the legacy `*Async` postfix.
 */
export class AsyncAdapter {
    readonly #ctx: AdapterContext;
    #messagingInstance?: MessagingManager;
    #certificatesInstance?: CertificateManager;
    #resourcesInstance?: ResourceManager;

    /**
     * @param ctx Shared adapter context providing live runtime state
     */
    constructor(ctx: AdapterContext) {
        this.#ctx = ctx;
    }

    /** Lazily-constructed outbound messaging manager. */
    get #messaging(): MessagingManager {
        return (this.#messagingInstance ??= new MessagingManager(this.#ctx));
    }

    /** Lazily-constructed certificate manager. */
    get #certificates(): CertificateManager {
        return (this.#certificatesInstance ??= new CertificateManager(this.#ctx));
    }

    /** Lazily-constructed exclusive-resource manager. */
    get #resources(): ResourceManager {
        return (this.#resourcesInstance ??= new ResourceManager(this.#ctx));
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
     * Loads SSL certificates by name, falling back to the instance config defaults. File-backed
     * certificate values are resolved to their content and their paths returned for watching.
     *
     * @param publicName public certificate name (defaults to `config.certPublic`)
     * @param privateName private key name (defaults to `config.certPrivate`)
     * @param chainedName chained certificate name (defaults to `config.certChained`)
     */
    getCertificates(
        publicName?: string,
        privateName?: string,
        chainedName?: string,
    ): Promise<InternalGetCertificatesResult>;
    /**
     * @internal
     * @param publicName public certificate name
     * @param privateName private key name
     * @param chainedName chained certificate name
     */
    getCertificates(
        publicName?: unknown,
        privateName?: unknown,
        chainedName?: unknown,
    ): Promise<InternalGetCertificatesResult>;
    /**
     * @param publicName public certificate name
     * @param privateName private key name
     * @param chainedName chained certificate name
     */
    async getCertificates(
        publicName?: unknown,
        privateName?: unknown,
        chainedName?: unknown,
    ): Promise<InternalGetCertificatesResult> {
        const config = this.#ctx.config as InternalAdapterConfig;
        publicName = publicName || config.certPublic;
        privateName = privateName || config.certPrivate;
        chainedName = chainedName || config.certChained;

        if (publicName !== undefined) {
            Validator.assertString(publicName, 'publicName');
        }
        if (privateName !== undefined) {
            Validator.assertString(privateName, 'privateName');
        }
        if (chainedName !== undefined) {
            Validator.assertString(chainedName, 'chainedName');
        }

        return this.#certificates.getCertificates({ publicName, privateName, chainedName });
    }

    /**
     * Tells whether a new version of the `system.certificates` object changes one of the certificates
     * handed out by the last {@link getCertificates} call. Returns false if certificates were never
     * requested, so unrelated certificate edits do not concern this adapter.
     *
     * @param obj the new `system.certificates` object, or null/undefined if it was deleted
     */
    hasRelevantCertificateChange(obj: ioBroker.OtherObject | null | undefined): boolean {
        return this.#certificatesInstance?.hasRelevantChange(obj) ?? false;
    }

    /**
     * Forgets the certificates handed out by the last {@link getCertificates} call, so
     * {@link hasRelevantCertificateChange} no longer reports changes to them. Used when the adapter
     * stops watching its certificates.
     */
    stopWatchingCertificates(): void {
        this.#certificatesInstance?.stopWatching();
    }

    /**
     * Registers an exclusive resource (serial port, TCP/UDP port, USB device, ...) as used by this
     * instance. The registration is forwarded to the host, which stores it under
     * `system.host.<hostname>.usedResources.<type>`.
     *
     * @param type the kind of resource, e.g. "serialPort" or "tcpPort"
     * @param data payload describing the resource
     * @param doNotDeleteAlreadyUsed if true, keep the resources this instance already registered instead of replacing them
     */
    async registerUsedResource<T extends ioBroker.UsedResourceType>(
        type: T,
        data: ioBroker.UsedResourceData<T>,
        doNotDeleteAlreadyUsed?: boolean,
    ): Promise<void> {
        Validator.assertString(type, 'type');
        Validator.assertObject(data, 'data');
        if (doNotDeleteAlreadyUsed !== undefined) {
            Validator.assertBoolean(doNotDeleteAlreadyUsed, 'doNotDeleteAlreadyUsed');
        }
        return this.#resources.registerUsedResource(type, data, doNotDeleteAlreadyUsed);
    }

    /**
     * Frees a previously registered exclusive resource of this instance. If `data` is omitted, all
     * registered resources of the given `type` are freed.
     *
     * @param type the kind of resource, e.g. "serialPort" or "tcpPort"
     * @param data payload of the resource to free; if omitted, all resources of `type` are freed
     */
    async freeUsedResource<T extends ioBroker.UsedResourceType>(
        type: T,
        data?: ioBroker.UsedResourceData<T>,
    ): Promise<void> {
        Validator.assertString(type, 'type');
        if (data !== undefined) {
            Validator.assertObject(data, 'data');
        }
        return this.#resources.freeUsedResource(type, data);
    }

    /**
     * Reads the exclusive resources of the given `type` registered on this instance's host (across all
     * instances of that host).
     *
     * @param type resource type to read, e.g. "serialPort"
     */
    getUsedResources<T extends ioBroker.UsedResourceType>(type: T): Promise<ioBroker.RegisteredResource<T>[]> {
        if (type !== undefined) {
            Validator.assertString(type, 'type');
        }
        return this.#resources.getUsedResources(type);
    }

    /**
     * Reads all exclusive resources of every type registered on this instance's host (across all
     * instances of that host).
     */
    getAllUsedResources(): Promise<ioBroker.RegisteredResource[]> {
        return this.#resources.getAllUsedResources();
    }

    /**
     * Resolves a pending reply promise for an acked messagebox message.
     * Returns true if a pending entry was found and consumed.
     *
     * @param obj incoming message object from the messagebox
     */
    resolveReply(obj: ioBroker.Message): boolean {
        return this.#messagingInstance?.resolveCallback(obj) ?? false;
    }

    /**
     * Rejects all pending reply promises and clears their timers (used on stop).
     */
    clearPending(): void {
        this.#messagingInstance?.clearPendingCallbacks();
    }
}
