import type { NotificationHandler } from '@iobroker/js-controller-common';
import type { PluginHandler } from '@iobroker/plugin-base';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { BlocklistManager } from '@/lib/blocklistManager.js';
import type { AdapterAutoUpgradeManager } from '@/lib/adapterAutoUpgradeManager.js';
import type { InstanceManager } from '@/lib/controller/instances/instanceManager.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { HostMessageHandler } from '@/lib/controller/messages/hostMessageHandler.js';
import type { DiagInfoCollector } from '@/lib/controller/host/diagInfoCollector.js';
import type { HostMetaManager } from '@/lib/controller/host/hostMetaManager.js';
import type { HostStatusReporter } from '@/lib/controller/host/hostStatusReporter.js';
import type { IpManager } from '@/lib/controller/host/ipManager.js';
import type { MultihostManager } from '@/lib/controller/host/multihostManager.js';
import type { SystemChecks } from '@/lib/controller/host/systemChecks.js';
import type { ControllerLogger, RepoRequester, UploadTask } from '@/lib/controller/types.js';

/**
 * Live view of the controller's shared runtime state, passed to the managers at construction time.
 *
 * This is an internal contract between the controller and its parts, it is deliberately not exported
 * from the package. The mutable fields are exposed as getter properties so late-bound values (DB
 * clients, logger, plugin handler) stay live: the controller builds one context whose getters read
 * its own private fields, and every manager reads the same object.
 *
 * The context is the only thing a manager gets, so a test does not have to construct a whole
 * controller - a plain object literal with the few members the manager under test touches is enough.
 */
export interface ControllerContext {
    // ---------------------------------------------------------------------------------- static information
    /** The raw content of the io-package.json of the js-controller */
    readonly ioPackage: any;
    /** The version of the js-controller */
    readonly version: string;
    /** The configuration of this host (iobroker.json) */
    readonly config: ioBroker.IoBrokerJson;
    /** Name of this host */
    readonly hostname: string;
    /** Directory of the js-controller */
    readonly controllerDir: string;
    /** The id of the host object of this controller */
    readonly hostObjectPrefix: ioBroker.ObjectIDs.Host;
    /** Prefix of all log messages of this controller */
    readonly hostLogPrefix: string;
    /** If this controller is a compact group controller */
    readonly isCompactGroupController: boolean;
    /** The compact group this controller is responsible for */
    readonly compactGroup: number | null;
    /** Timestamp of the start of this controller */
    readonly uptimeStart: number;

    // -------------------------------------------------------------------------------------- runtime state
    /** The logger of this controller */
    readonly logger: ControllerLogger;
    /**
     * The connected objects database client
     *
     * @throws {Error} `ERROR_DB_CLOSED` if the objects database is not connected, check
     * {@link ControllerContext.isObjectsConnected} first if the code can run while disconnected
     */
    readonly objects: ObjectsClient;
    /**
     * The connected states database client
     *
     * @throws {Error} `ERROR_DB_CLOSED` if the states database is not connected, check
     * {@link ControllerContext.isStatesConnected} first if the code can run while disconnected
     */
    readonly states: StatesClient;
    /** If the objects database client exists and can be used */
    readonly isObjectsConnected: boolean;
    /** If the states database client exists and can be used */
    readonly isStatesConnected: boolean;
    /** If this controller runs as a daemon in the background */
    readonly isDaemon: boolean;
    /** If both databases are connected, null as long as there was no connection at all */
    readonly connected: null | boolean;
    /** If the instances of this host have been started */
    readonly started: boolean;
    /** Timestamp of the stop request, null if the controller is not stopping */
    readonly isStopping: null | number;
    /** All instances which have subscribed to the log messages of this host */
    readonly logList: string[];
    /** All instances which have requested a repository update */
    readonly requestedRepoUpdates: RepoRequester[];
    /** Number of state changes since the last status report */
    readonly inputCount: number;
    /** Number of state writes since the last status report */
    readonly outputCount: number;

    // ------------------------------------------------------------------------------------------ managers
    /** Takes care of all instances of this host */
    readonly instances: InstanceManager;
    /** Sends messages to other hosts and instances */
    readonly messages: MessageBus;
    /** Answers the messages which are sent to this host */
    readonly messageHandler: HostMessageHandler;
    /** Reports the status of this host */
    readonly status: HostStatusReporter;
    /** Creates and maintains the host object and its states */
    readonly hostMeta: HostMetaManager;
    /** Keeps the IPs of the host object up to date */
    readonly ips: IpManager;
    /** Collects the diagnostics information */
    readonly diag: DiagInfoCollector;
    /** Checks the system for available updates and problems */
    readonly systemChecks: SystemChecks;
    /** Starts and stops the multihost discovery server */
    readonly multihost: MultihostManager;
    /**
     * Handles the plugins of this host
     *
     * @throws {Error} if the plugins have not been initialized yet
     */
    readonly pluginHandler: InstanceType<typeof PluginHandler>;
    /**
     * Handles the notifications of this host
     *
     * @throws {Error} if the databases have not been connected yet
     */
    readonly notificationHandler: NotificationHandler;
    /**
     * Checks adapters against the block list
     *
     * @throws {Error} if the databases have not been connected yet
     */
    readonly blocklistManager: BlocklistManager;
    /**
     * Upgrades adapters automatically
     *
     * @throws {Error} if the databases have not been connected yet
     */
    readonly autoUpgradeManager: AdapterAutoUpgradeManager;

    // ------------------------------------------------------------------------------------------- actions
    /**
     * Count state changes which this host has received
     *
     * @param inc Number of state changes to add, defaults to one
     */
    countInput(inc?: number): void;

    /**
     * Count state writes which this host has performed
     *
     * @param inc Number of state writes to add, defaults to one
     */
    countOutput(inc?: number): void;

    /**
     * Reset the input and output counters, called after they have been reported
     */
    resetCounters(): void;

    /**
     * Remember that the shutdown has started, if it has not been marked before
     *
     * The timestamp of the first call is kept, because a process can receive `SIGTERM` more than once.
     */
    markStopping(): void;

    /**
     * Run fire-and-forget database writes in parallel and log any that reject
     *
     * @param writes The pending write operations, kept running concurrently
     * @param errorText Context prepended to the error log if a write rejects
     */
    logWriteErrors(writes: Promise<unknown>[], errorText: string): void;

    /**
     * Subscribe or unsubscribe a logger instance for receiving redirected log messages
     *
     * @param isActive Whether to subscribe (true) or unsubscribe (false) the logger
     * @param id The id of the logger instance
     * @param reason Human readable reason for the change, used for logging
     */
    logRedirect(isActive: boolean, id: string, reason: string): void;

    /**
     * Upload the given adapter
     *
     * @param task The upload task information containing name and an optional message
     */
    uploadAdapter(task: UploadTask): Promise<void>;

    /**
     * Restart the whole js-controller process
     */
    restartSelf(): Promise<void>;

    /**
     * Stop the js-controller and all running adapter instances
     *
     * @param force kills instances under all circumstances
     * @param exitProcess if the process should be terminated after all instances have been stopped
     */
    stop(force?: boolean, exitProcess?: boolean): Promise<void>;
}
