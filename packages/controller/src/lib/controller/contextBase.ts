import type { NotificationHandler } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { ControllerContext } from '@/lib/controller/context.js';
import type { ControllerLogger, RepoRequester, UploadTask } from '@/lib/controller/types.js';

/**
 * Base class for all controller managers that read from the shared {@link ControllerContext}.
 *
 * Everything a manager may use is re-exposed as a `protected` member, which allows the short
 * `const { logger, hostLogPrefix } = this;` form inside the managers. The accessors are pure
 * forwarding, all semantics (like the throwing DB getters) live in the context itself.
 *
 * The context is held in a `#ctx` field so it cannot be replaced; managers which compose further
 * managers pass it on via {@link ControllerContextBase.context}.
 *
 * Accessors are `protected` because `#` privates are not visible to subclasses.
 */
export abstract class ControllerContextBase {
    readonly #ctx: ControllerContext;

    /**
     * @param ctx Shared controller context providing live runtime state
     */
    constructor(ctx: ControllerContext) {
        this.#ctx = ctx;
    }

    /** The shared context, to be handed to managers which are created by this one */
    protected get context(): ControllerContext {
        return this.#ctx;
    }

    // ---------------------------------------------------------------------------------- static information
    /** The raw content of the io-package.json of the js-controller */
    protected get ioPackage(): any {
        return this.#ctx.ioPackage;
    }

    /** The version of the js-controller */
    protected get version(): string {
        return this.#ctx.version;
    }

    /** The configuration of this host (iobroker.json) */
    protected get config(): ioBroker.IoBrokerJson {
        return this.#ctx.config;
    }

    /** Name of this host */
    protected get hostname(): string {
        return this.#ctx.hostname;
    }

    /** Directory of the js-controller */
    protected get controllerDir(): string {
        return this.#ctx.controllerDir;
    }

    /** The id of the host object of this controller */
    protected get hostObjectPrefix(): ioBroker.ObjectIDs.Host {
        return this.#ctx.hostObjectPrefix;
    }

    /** Prefix of all log messages of this controller */
    protected get hostLogPrefix(): string {
        return this.#ctx.hostLogPrefix;
    }

    /** If this controller is a compact group controller */
    protected get isCompactGroupController(): boolean {
        return this.#ctx.isCompactGroupController;
    }

    /** The compact group this controller is responsible for */
    protected get compactGroup(): number | null {
        return this.#ctx.compactGroup;
    }

    /** Timestamp of the start of this controller */
    protected get uptimeStart(): number {
        return this.#ctx.uptimeStart;
    }

    // -------------------------------------------------------------------------------------- runtime state
    /** The logger of this controller */
    protected get logger(): ControllerLogger {
        return this.#ctx.logger;
    }

    /**
     * The connected objects database client
     *
     * @throws {Error} `ERROR_DB_CLOSED` if the objects database is not connected
     */
    protected get objects(): ObjectsClient {
        return this.#ctx.objects;
    }

    /**
     * The connected states database client
     *
     * @throws {Error} `ERROR_DB_CLOSED` if the states database is not connected
     */
    protected get states(): StatesClient {
        return this.#ctx.states;
    }

    /** If the objects database client exists and can be used */
    protected get isObjectsConnected(): boolean {
        return this.#ctx.isObjectsConnected;
    }

    /** If the states database client exists and can be used */
    protected get isStatesConnected(): boolean {
        return this.#ctx.isStatesConnected;
    }

    /** If this controller runs as a daemon in the background */
    protected get isDaemon(): boolean {
        return this.#ctx.isDaemon;
    }

    /** If both databases are connected, null as long as there was no connection at all */
    protected get connected(): null | boolean {
        return this.#ctx.connected;
    }

    /** If the instances of this host have been started */
    protected get started(): boolean {
        return this.#ctx.started;
    }

    /** Timestamp of the stop request, null if the controller is not stopping */
    protected get isStopping(): null | number {
        return this.#ctx.isStopping;
    }

    /** All instances which have subscribed to the log messages of this host */
    protected get logList(): string[] {
        return this.#ctx.logList;
    }

    /** All instances which have requested a repository update */
    protected get requestedRepoUpdates(): RepoRequester[] {
        return this.#ctx.requestedRepoUpdates;
    }

    /** Number of state changes since the last status report */
    protected get inputCount(): number {
        return this.#ctx.inputCount;
    }

    /** Number of state writes since the last status report */
    protected get outputCount(): number {
        return this.#ctx.outputCount;
    }

    // ------------------------------------------------------------------------------------------ managers
    /** Takes care of all instances of this host */
    protected get instances(): ControllerContext['instances'] {
        return this.#ctx.instances;
    }

    /** Sends messages to other hosts and instances */
    protected get messages(): ControllerContext['messages'] {
        return this.#ctx.messages;
    }

    /** Answers the messages which are sent to this host */
    protected get messageHandler(): ControllerContext['messageHandler'] {
        return this.#ctx.messageHandler;
    }

    /** Reports the status of this host */
    protected get status(): ControllerContext['status'] {
        return this.#ctx.status;
    }

    /** Creates and maintains the host object and its states */
    protected get hostMeta(): ControllerContext['hostMeta'] {
        return this.#ctx.hostMeta;
    }

    /** Keeps the IPs of the host object up to date */
    protected get ips(): ControllerContext['ips'] {
        return this.#ctx.ips;
    }

    /** Collects the diagnostics information */
    protected get diag(): ControllerContext['diag'] {
        return this.#ctx.diag;
    }

    /** Checks the system for available updates and problems */
    protected get systemChecks(): ControllerContext['systemChecks'] {
        return this.#ctx.systemChecks;
    }

    /** Starts and stops the multihost discovery server */
    protected get multihost(): ControllerContext['multihost'] {
        return this.#ctx.multihost;
    }

    /** Handles the plugins of this host */
    protected get pluginHandler(): ControllerContext['pluginHandler'] {
        return this.#ctx.pluginHandler;
    }

    /** Handles the notifications of this host */
    protected get notificationHandler(): NotificationHandler {
        return this.#ctx.notificationHandler;
    }

    /** Checks adapters against the block list */
    protected get blocklistManager(): ControllerContext['blocklistManager'] {
        return this.#ctx.blocklistManager;
    }

    /** Upgrades adapters automatically */
    protected get autoUpgradeManager(): ControllerContext['autoUpgradeManager'] {
        return this.#ctx.autoUpgradeManager;
    }

    // ------------------------------------------------------------------------------------------- actions
    /**
     * Count state changes which this host has received
     *
     * @param inc Number of state changes to add, defaults to one
     */
    protected countInput(inc?: number): void {
        this.#ctx.countInput(inc);
    }

    /**
     * Count state writes which this host has performed
     *
     * @param inc Number of state writes to add, defaults to one
     */
    protected countOutput(inc?: number): void {
        this.#ctx.countOutput(inc);
    }

    /**
     * Reset the input and output counters, called after they have been reported
     */
    protected resetCounters(): void {
        this.#ctx.resetCounters();
    }

    /**
     * Remember that the shutdown has started, if it has not been marked before
     */
    protected markStopping(): void {
        this.#ctx.markStopping();
    }

    /**
     * Run fire-and-forget database writes in parallel and log any that reject
     *
     * @param writes The pending write operations, kept running concurrently
     * @param errorText Context prepended to the error log if a write rejects
     */
    protected logWriteErrors(writes: Promise<unknown>[], errorText: string): void {
        this.#ctx.logWriteErrors(writes, errorText);
    }

    /**
     * Subscribe or unsubscribe a logger instance for receiving redirected log messages
     *
     * @param isActive Whether to subscribe (true) or unsubscribe (false) the logger
     * @param id The id of the logger instance
     * @param reason Human readable reason for the change, used for logging
     */
    protected logRedirect(isActive: boolean, id: string, reason: string): void {
        this.#ctx.logRedirect(isActive, id, reason);
    }

    /**
     * Upload the given adapter
     *
     * @param task The upload task information containing name and an optional message
     */
    protected async uploadAdapter(task: UploadTask): Promise<void> {
        return this.#ctx.uploadAdapter(task);
    }

    /**
     * Restart the whole js-controller process
     */
    protected async restartSelf(): Promise<void> {
        return this.#ctx.restartSelf();
    }

    /**
     * Stop the js-controller and all running adapter instances
     *
     * @param force kills instances under all circumstances
     * @param exitProcess if the process should be terminated after all instances have been stopped
     */
    protected async stopController(force?: boolean, exitProcess?: boolean): Promise<void> {
        return this.#ctx.stop(force, exitProcess);
    }
}
