import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import semver from 'semver';
import { setTimeout as wait } from 'node:timers/promises';
import {
    EXIT_CODES,
    NotificationHandler,
    getObjectsConstructor,
    getStatesConstructor,
    isLocalObjectsDbServer,
    isLocalStatesDbServer,
    logger as toolsLogger,
    tools,
} from '@iobroker/js-controller-common';
import { SYSTEM_ADAPTER_PREFIX, SYSTEM_HOST_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { PluginHandler, type PluginHandlerSettings } from '@iobroker/plugin-base';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import { Upload } from '@iobroker/js-controller-cli';
import restart from '@/lib/restart.js';
import { BlocklistManager } from '@/lib/blocklistManager.js';
import { AdapterAutoUpgradeManager } from '@/lib/adapterAutoUpgradeManager.js';
import { getDiskWarningLevel } from '@/lib/utils.js';
import { getConfig } from '@/lib/controller/config.js';
import { logWriteErrors } from '@/lib/controller/helpers.js';
import {
    COMPACT_GROUP_OBJECT_PREFIX,
    PRIMARY_HOST_LOCK_TIME,
    VENDOR_BOOTSTRAP_FILE,
} from '@/lib/controller/constants.js';
import { ControllerState } from '@/lib/controller/state.js';
import { Statistics } from '@/lib/controller/statistics.js';
import { handleStateChange, type StateChangeRouterDeps } from '@/lib/controller/db/stateChangeRouter.js';
import { InstanceManager, type InstanceManagerOptions } from '@/lib/controller/instances/instanceManager.js';
import { MessageBus } from '@/lib/controller/messages/messageBus.js';
import { HostMessageHandler } from '@/lib/controller/messages/hostMessageHandler.js';
import type { HostCommandGroupDeps } from '@/lib/controller/messages/commands/index.js';
import { DiagInfoCollector } from '@/lib/controller/host/diagInfoCollector.js';
import { HostMetaManager } from '@/lib/controller/host/hostMetaManager.js';
import { HostStatusReporter } from '@/lib/controller/host/hostStatusReporter.js';
import { IpManager } from '@/lib/controller/host/ipManager.js';
import { MultihostManager } from '@/lib/controller/host/multihostManager.js';
import { SystemChecks } from '@/lib/controller/host/systemChecks.js';
import type { ControllerLogger, RepoRequester, UploadTask } from '@/lib/controller/types.js';

/** Options to create a controller */
export interface ControllerOptions {
    /** The id of the compact group if this controller is a compact group controller */
    compactGroupId?: number;
}

/**
 * The js-controller itself
 *
 * It connects to both databases, starts and monitors all instances of this host, answers the messages
 * which are sent to this host and keeps the information about this host up to date.
 *
 * Its managers are created once both databases are connected, each of them gets exactly the
 * components it needs handed into its constructor. This class itself only exposes its lifecycle:
 * {@link Controller.init} and {@link Controller.stop}.
 */
export class Controller {
    // -------------------------------------------------------------------------------------------- static information
    /** The raw content of the io-package.json of the js-controller */
    readonly #ioPackage: any;
    /** The version of the js-controller */
    readonly #version: string;
    /** The configuration of this host (iobroker.json) */
    readonly #config: ioBroker.IoBrokerJson;
    /** Name of this host */
    readonly #hostname = tools.getHostName();
    /** Directory of the js-controller */
    readonly #controllerDir = tools.getControllerDir();
    /** The id of the host object of this controller */
    readonly #hostObjectPrefix: ioBroker.ObjectIDs.Host;
    /** Prefix of all log messages of this controller */
    readonly #hostLogPrefix: string;
    /** If this controller is a compact group controller */
    readonly #isCompactGroupController: boolean;
    /** The compact group this controller is responsible for */
    readonly #compactGroup: number | null;
    /** Timestamp of the start of this controller */
    readonly #uptimeStart = Date.now();

    // ------------------------------------------------------------------------------------------------ runtime state
    /** The lifecycle state which the managers observe */
    readonly #state = new ControllerState();
    /** The counters of the received and written states */
    readonly #statistics = new Statistics();
    /** The logger of this controller */
    #logger!: ControllerLogger;
    /** The objects database client */
    #objects: ObjectsClient | null = null;
    /** The states database client */
    #states: StatesClient | null = null;
    /** If this controller runs as a daemon in the background */
    #isDaemon = false;
    /** If this host is the primary host of the installation */
    #isPrimary = false;
    /** All instances which have subscribed to the log messages of this host */
    readonly #logList: string[] = [];
    /** All instances which have requested a repository update */
    readonly #requestedRepoUpdates: RepoRequester[] = [];
    /** controller versions of multihost environments */
    readonly #controllerVersions: Record<string, string> = {};

    // ---------------------------------------------------------------------------------------------------- managers
    /** If the managers have been created, they only exist once both databases are connected */
    #managersCreated = false;
    /** Takes care of all instances of this host */
    #instances?: InstanceManager;
    /** Sends messages to other hosts and instances */
    #messages?: MessageBus;
    /** Answers the messages which are sent to this host */
    #messageHandler?: HostMessageHandler;
    /** Reports the status of this host */
    #status?: HostStatusReporter;
    /** Creates and maintains the host object and its states */
    #hostMeta?: HostMetaManager;
    /** Keeps the IPs of the host object up to date */
    #ips?: IpManager;
    /** Collects the diagnostics information */
    #diag?: DiagInfoCollector;
    /** Checks the system for available updates and problems */
    #systemChecks?: SystemChecks;
    /** Starts and stops the multihost discovery server */
    #multihost?: MultihostManager;
    /** What the routing of an incoming state change is called with */
    #stateChangeDeps?: StateChangeRouterDeps;
    /** Handles the plugins of this host */
    #pluginHandler?: InstanceType<typeof PluginHandler>;
    /** Handles the notifications of this host */
    #notificationHandler?: NotificationHandler;
    /** Checks adapters against the block list */
    #blocklistManager?: BlocklistManager;
    /** Upgrades adapters automatically */
    #autoUpgradeManager?: AdapterAutoUpgradeManager;

    // ----------------------------------------------------------------------------------------------------- internals
    /** The constructor of the objects database client */
    #ObjectsClass!: typeof ObjectsClient;
    /** The constructor of the states database client */
    #StatesClass!: typeof StatesClient;
    /** Uploads adapters, will be used only once by upload of adapter */
    #upload?: InstanceType<typeof Upload>;
    /** Maximum time we wait for the instances to stop */
    #stopTimeout = 10_000;
    /** Number of uncaught exceptions since the start */
    #uncaughtExceptionCount = 0;
    /** Timer which restarts the controller if the databases are not reachable */
    #connectTimeout: NodeJS.Timeout | null = null;
    /** Timer which restarts the controller after a lost connection */
    #restartTimeout: NodeJS.Timeout | null = null;
    /** Timer which detects a lost connection to the objects database */
    #objectsDisconnectTimeout: NodeJS.Timeout | null = null;
    /** Timer which detects a lost connection to the states database */
    #statesDisconnectTimeout: NodeJS.Timeout | null = null;
    /** Timer which renews the primary host lock */
    #primaryHostInterval: NodeJS.Timeout | null = null;

    /**
     * @param options The id of the compact group if this is a compact group controller
     */
    constructor(options: ControllerOptions = {}) {
        this.#ioPackage = fs.readJSONSync(path.join(tools.getControllerDir(), 'io-package.json'));
        this.#version = this.#ioPackage.common.version;
        this.#config = getConfig();

        let hostObjectPrefix: ioBroker.ObjectIDs.Host = `${SYSTEM_HOST_PREFIX}${this.#hostname}`;
        let hostLogPrefix = `host.${this.#hostname}`;

        if (options.compactGroupId) {
            this.#isCompactGroupController = true;
            this.#compactGroup = options.compactGroupId;
            hostObjectPrefix = `${hostObjectPrefix}${COMPACT_GROUP_OBJECT_PREFIX}${this.#compactGroup}`;
            hostLogPrefix = `${hostLogPrefix}${COMPACT_GROUP_OBJECT_PREFIX}${this.#compactGroup}`;
            this.#isDaemon = true;
        } else {
            this.#isCompactGroupController = false;
            this.#compactGroup = null;
            this.#stopTimeout += 5_000;
        }

        this.#hostObjectPrefix = hostObjectPrefix;
        this.#hostLogPrefix = hostLogPrefix;
    }

    /**
     * Create the services which need a database connection
     *
     * Called once, as soon as both databases are connected and before the managers are created.
     */
    #createDatabaseServices(): void {
        const objects = this.#objects!;
        const states = this.#states!;

        this.#notificationHandler = new NotificationHandler({
            states,
            objects,
            log: this.#logger,
            logPrefix: this.#hostLogPrefix,
            host: this.#hostname,
        });

        this.#autoUpgradeManager = new AdapterAutoUpgradeManager({
            objects,
            states,
            logger: this.#logger,
            logPrefix: this.#hostLogPrefix,
        });

        this.#blocklistManager = new BlocklistManager({ objects });
    }

    /**
     * Create all managers of this controller and hand each of them the components it needs
     *
     * This can only happen once both databases are connected, because the managers work with the
     * connected clients instead of looking them up on every access. The database clients survive a
     * reconnect, so the managers are created exactly once.
     */
    #createManagers(): void {
        const objects = this.#objects!;
        const states = this.#states!;
        const notificationHandler = this.#notificationHandler!;

        /** What every manager needs to identify itself and to write log messages */
        const identity = {
            logger: this.#logger,
            hostLogPrefix: this.#hostLogPrefix,
            hostObjectPrefix: this.#hostObjectPrefix,
            hostname: this.#hostname,
        };

        this.#messages = new MessageBus({ states, ...identity });

        this.#ips = new IpManager({
            objects,
            uptimeStart: this.#uptimeStart,
            state: this.#state,
            ...identity,
        });

        this.#hostMeta = new HostMetaManager({
            objects,
            states,
            config: this.#config,
            compactGroup: this.#compactGroup,
            isCompactGroupController: this.#isCompactGroupController,
            pluginHandler: this.#pluginHandler!,
            notificationHandler,
            ips: this.#ips,
            restartSelf: () => this.#restartSelf(),
            ...identity,
        });

        this.#diag = new DiagInfoCollector({
            objects,
            states,
            config: this.#config,
            logger: this.#logger,
            hostLogPrefix: this.#hostLogPrefix,
            hostMeta: this.#hostMeta,
        });

        this.#systemChecks = new SystemChecks({
            objects,
            states,
            notificationHandler,
            autoUpgradeManager: this.#autoUpgradeManager!,
            blocklistManager: this.#blocklistManager!,
            ...identity,
        });

        this.#multihost = new MultihostManager({
            objects,
            isCompactGroupController: this.#isCompactGroupController,
            logger: this.#logger,
            hostLogPrefix: this.#hostLogPrefix,
            hostname: this.#hostname,
        });

        const instanceOptions: InstanceManagerOptions = {
            objects,
            states,
            config: this.#config,
            ioPackage: this.#ioPackage,
            isDaemon: this.#isDaemon,
            isCompactGroupController: this.#isCompactGroupController,
            compactGroup: this.#compactGroup,
            notificationHandler,
            blocklistManager: this.#blocklistManager!,
            messages: this.#messages,
            statistics: this.#statistics,
            state: this.#state,
            logWriteErrors: (writes, errorText) => this.#logWriteErrors(writes, errorText),
            uploadAdapter: task => this.#uploadAdapter(task),
            requestRebuild: msg => this.#requestRebuild(msg),
            ...identity,
        };

        this.#instances = new InstanceManager(instanceOptions);

        this.#status = new HostStatusReporter({
            states,
            config: this.#config,
            isCompactGroupController: this.#isCompactGroupController,
            compactGroup: this.#compactGroup,
            notificationHandler,
            instances: this.#instances,
            statistics: this.#statistics,
            state: this.#state,
            logWriteErrors: (writes, errorText) => this.#logWriteErrors(writes, errorText),
            stopController: (force, exitProcess) => this.stop(force, exitProcess),
            ...identity,
        });

        const { logger, hostLogPrefix, hostObjectPrefix, hostname } = identity;
        const messages = this.#messages;
        const instances = this.#instances;

        // every group of host commands gets its own bundle, so it is visible here what each may touch
        const commandDeps: HostCommandGroupDeps = {
            files: { objects, messages, logger, hostLogPrefix },
            info: {
                objects,
                messages,
                instances,
                diag: this.#diag,
                ioPackage: this.#ioPackage,
                version: this.#version,
                controllerDir: this.#controllerDir,
                uptimeStart: this.#uptimeStart,
                logger,
                hostLogPrefix,
                hostObjectPrefix,
                hostname,
            },
            logs: {
                states,
                messages,
                instances,
                statistics: this.#statistics,
                logList: this.#logList,
                controllerDir: this.#controllerDir,
                logger,
                hostLogPrefix,
                hostObjectPrefix,
                hostname,
            },
            notifications: { notificationHandler, messages },
            repository: {
                objects,
                messages,
                diag: this.#diag,
                systemChecks: this.#systemChecks,
                requestedRepoUpdates: this.#requestedRepoUpdates,
                logger,
                hostLogPrefix,
            },
            settings: {
                messages,
                multihost: this.#multihost,
                uptimeStart: this.#uptimeStart,
                logger,
                hostLogPrefix,
            },
            shell: { config: this.#config, messages, logger, hostLogPrefix },
            upgrade: {
                objects,
                states,
                messages,
                instances,
                systemChecks: this.#systemChecks,
                pluginHandler: this.#pluginHandler!,
                uploadAdapter: task => this.#uploadAdapter(task),
                restartSelf: () => this.#restartSelf(),
                logger,
                hostLogPrefix,
            },
        };

        this.#messageHandler = new HostMessageHandler({
            logger: this.#logger,
            hostLogPrefix: this.#hostLogPrefix,
            state: this.#state,
            commandDeps,
        });

        this.#stateChangeDeps = {
            objects,
            states,
            config: this.#config,
            controllerDir: this.#controllerDir,
            ioPackage: this.#ioPackage,
            isCompactGroupController: this.#isCompactGroupController,
            instances: this.#instances,
            messages: this.#messages,
            messageHandler: this.#messageHandler,
            status: this.#status,
            pluginHandler: this.#pluginHandler!,
            statistics: this.#statistics,
            logRedirect: (isActive, id, reason) => this.#logRedirect(isActive, id, reason),
            ...identity,
        };

        this.#managersCreated = true;
    }

    /**
     * Run fire-and-forget database writes in parallel and log any that reject
     *
     * @param writes The pending write operations, kept running concurrently
     * @param errorText Context prepended to the error log if a write rejects
     */
    #logWriteErrors(writes: Promise<unknown>[], errorText: string): void {
        logWriteErrors({ writes, errorText, logger: this.#logger, logPrefix: this.#hostLogPrefix });
    }

    /**
     * Have the native modules of an adapter rebuilt
     *
     * A compact group controller cannot do it itself, because only one npm process may run at a time.
     *
     * @param msg The `rebuildAdapter` message describing what has to be rebuilt
     */
    #requestRebuild(msg: ioBroker.SendableMessage): void {
        if (!this.#isCompactGroupController) {
            this.#messageHandler
                ?.process(msg)
                .catch(e => this.#logger.error(`${this.#hostLogPrefix} Cannot process message: ${e.message}`));
            return;
        }

        // send to the main controller to make sure only one npm process runs at a time
        this.#messages
            ?.sendTo(`${SYSTEM_HOST_PREFIX}${this.#hostname}`, 'rebuildAdapter', msg as ioBroker.MessagePayload)
            .catch(e => this.#logger.error(`${this.#hostLogPrefix} Cannot send rebuildAdapter: ${e.message}`));
    }

    /**
     * Subscribe or unsubscribe a logger instance for receiving redirected log messages
     *
     * @param isActive Whether to subscribe (true) or unsubscribe (false) the logger
     * @param id The id of the logger instance
     * @param reason Human readable reason for the change, used for logging
     */
    #logRedirect(isActive: boolean, id: string, reason: string): void {
        console.log(`================================== > LOG REDIRECT ${id} => ${isActive} [${reason}]`);
        if (isActive) {
            if (!this.#logList.includes(id)) {
                this.#logList.push(id);
            }
        } else {
            const pos = this.#logList.indexOf(id);
            if (pos !== -1) {
                this.#logList.splice(pos, 1);
            }
        }
    }

    /**
     * Upload given adapter
     *
     * @param task The upload task information containing name and an optional message
     */
    async #uploadAdapter(task: UploadTask): Promise<void> {
        if (!this.#upload) {
            this.#upload = new Upload({
                states: this.#states!,
                objects: this.#objects!,
            });
        }

        const msg = task.msg;

        const logger = msg?.from
            ? {
                  log: (text: string) =>
                      // @ts-expect-error formally text is not allowed in Message, why not wrapped in message payload property?
                      this.#states!.pushMessage(msg.from, { command: 'log', text, from: this.#hostObjectPrefix }),
                  warn: (text: string) =>
                      // @ts-expect-error formally text is not allowed in Message, why not wrapped in message payload property?
                      this.#states!.pushMessage(msg.from, { command: 'warn', text, from: this.#hostObjectPrefix }),
                  error: (text: string) =>
                      // @ts-expect-error formally text is not allowed in Message, why not wrapped in message payload property?
                      this.#states!.pushMessage(msg.from, { command: 'error', text, from: this.#hostObjectPrefix }),
              }
            : undefined;

        await this.#upload.uploadAdapter(task.adapter, true, true, '', logger);
        await this.#upload.upgradeAdapterObjects(task.adapter, undefined, logger);
        await this.#upload.uploadAdapter(task.adapter, false, true, '', logger);
        // send response to requester
        if (msg?.callback && msg.from) {
            this.#messages?.sendTo(msg.from, msg.command, { result: 'done' }, msg.callback);
        }
    }

    /**
     * Restart the whole js-controller process
     */
    async #restartSelf(): Promise<void> {
        await restart(false);

        if (!this.#state.isStopping) {
            await this.stop(false);
        }
    }

    /**
     * Create and initialize the states database client
     *
     * @param onConnect Called once the states database is connected
     */
    #createStates(onConnect: () => void): void {
        this.#states = new this.#StatesClass({
            namespace: this.#hostLogPrefix,
            connection: this.#config.states,
            logger: this.#logger,
            hostname: this.#hostname,
            change: async (id, stateOrMessage) => {
                if (!this.#stateChangeDeps) {
                    this.#logger.error(
                        `${this.#hostLogPrefix} Could not handle state change of "${id}", because not connected`,
                    );
                    return;
                }

                return handleStateChange(this.#stateChangeDeps, id, stateOrMessage);
            },
            connected: () => {
                if (this.#statesDisconnectTimeout) {
                    clearTimeout(this.#statesDisconnectTimeout);
                    this.#statesDisconnectTimeout = null;
                }

                // both databases are up now, so everything can be wired together
                if (this.#objects && !this.#managersCreated) {
                    this.#createDatabaseServices();
                    this.#createManagers();
                }

                // both have to run on every reconnect too, a lost connection loses the subscription
                this.#messages?.initMessageQueue();
                this.#status?.startAliveInterval();

                this.#initializeController().catch(e =>
                    this.#logger.error(`${this.#hostLogPrefix} Cannot initialize controller: ${e.message}`),
                );
                onConnect && onConnect();
            },
            disconnected: () => {
                if (this.#restartTimeout) {
                    return;
                }

                this.#statesDisconnectTimeout && clearTimeout(this.#statesDisconnectTimeout);

                this.#statesDisconnectTimeout = setTimeout(
                    async () => {
                        this.#statesDisconnectTimeout = null;
                        await this.#handleDisconnect();
                    },
                    (this.#config.states.connectTimeout || 2000) + (!this.#isCompactGroupController ? 500 : 0),
                );
            },
        });
    }

    /**
     * Create and initialize the objects database client
     *
     * @param onConnect Called once the objects database is connected
     */
    #createObjects(onConnect: () => void): void {
        this.#objects = new this.#ObjectsClass({
            namespace: this.#hostLogPrefix,
            connection: this.#config.objects,
            controller: true,
            logger: this.#logger,
            hostname: this.#hostname,
            connected: async () => {
                // stop disconnect timeout
                if (this.#objectsDisconnectTimeout) {
                    clearTimeout(this.#objectsDisconnectTimeout);
                    this.#objectsDisconnectTimeout = null;
                }

                // subscribe to primary host expiration
                try {
                    await this.#objects!.subscribePrimaryHost();
                } catch (e) {
                    this.#logger.error(
                        `${this.#hostLogPrefix} Cannot subscribe to primary host expiration: ${e.message}`,
                    );
                }

                if (!this.#primaryHostInterval && !this.#isCompactGroupController) {
                    this.#primaryHostInterval = setInterval(() => this.#checkPrimaryHost(), PRIMARY_HOST_LOCK_TIME / 2);
                }

                // first execution now
                this.#checkPrimaryHost().catch(e =>
                    this.#logger.error(`${this.#hostLogPrefix} Cannot check primary host: ${e.message}`),
                );

                this.#initializeController().catch(e =>
                    this.#logger.error(`${this.#hostLogPrefix} Cannot initialize controller: ${e.message}`),
                );
                onConnect && onConnect();
            },
            disconnected: (/*error*/) => {
                if (this.#restartTimeout) {
                    return;
                }
                // on reconnection this will be determined anew
                this.#isPrimary = false;
                this.#objectsDisconnectTimeout && clearTimeout(this.#objectsDisconnectTimeout);
                this.#objectsDisconnectTimeout = setTimeout(
                    async () => {
                        this.#objectsDisconnectTimeout = null;
                        await this.#handleDisconnect();
                    },
                    (this.#config.objects.connectTimeout || 2000) + (!this.#isCompactGroupController ? 500 : 0),
                );
                // give the main controller a bit longer, so that adapter and compact processes can exit before
            },
            change: async (id, obj) => this.#instances?.handleObjectChange(id, obj),
            primaryHostLost: () => {
                if (!this.#state.isStopping) {
                    this.#isPrimary = false;
                    this.#logger.info('The primary host is no longer active. Checking responsibilities.');
                    this.#checkPrimaryHost().catch(e =>
                        this.#logger.error(`${this.#hostLogPrefix} Cannot check primary host: ${e.message}`),
                    );
                }
            },
        });
    }

    /**
     * Called as soon as one of the databases is connected, initializes everything which needs a database connection
     */
    async #initializeController(): Promise<void> {
        if (!this.#states || !this.#objects || this.#state.connected) {
            return;
        }

        this.#logger.info(`${this.#hostLogPrefix} connected to Objects and States`);

        if (this.#ioPackage.notifications) {
            try {
                await this.#notificationHandler!.addConfig(this.#ioPackage.notifications);
                this.#logger.info(`${this.#hostLogPrefix} added notifications configuration of host`);
                // load setup of all adapters to class, to remember messages even of non-running hosts
                await this.#notificationHandler!.getSetupOfAllAdaptersFromHost();
            } catch (e) {
                this.#logger.error(
                    `${this.#hostLogPrefix} Could not add notifications config of this host: ${e.message}`,
                );
            }
        }

        await this.#systemChecks!.checkSystemLocaleSupported();

        if (this.#state.connected === null) {
            this.#state.setConnected(true);
            if (!this.#state.isStopping) {
                // @ts-expect-error objects and state object version conflicts that are none
                this.#pluginHandler!.setDatabaseForPlugins(this.#objects, this.#states);
                await this.#pluginHandler!.initPlugins(this.#ioPackage);
                this.#states
                    .subscribe(`${this.#hostObjectPrefix}.plugins.*`)
                    .catch(e =>
                        this.#logger.error(`${this.#hostLogPrefix} Cannot subscribe to plugin states: ${e.message}`),
                    );

                // Do not start if we're still stopping the instances
                await this.#hostMeta!.checkHost();
                await this.#multihost!.startMultihost(this.#config);
                await this.#hostMeta!.setMeta();
                this.#state.setStarted(true);
                await this.#instances!.getInstances();
            }
        } else {
            this.#state.setConnected(true);
            this.#state.setStarted(true);

            // Do not start if we're still stopping the instances
            if (!this.#state.isStopping) {
                await this.#instances!.getInstances();
            }
        }
    }

    /**
     * React on a lost connection to one of the databases
     */
    async #handleDisconnect(): Promise<void> {
        if (!this.#state.connected || this.#restartTimeout || this.#state.isStopping) {
            return;
        }
        if (this.#statesDisconnectTimeout) {
            clearTimeout(this.#statesDisconnectTimeout);
            this.#statesDisconnectTimeout = null;
        }
        if (this.#objectsDisconnectTimeout) {
            clearTimeout(this.#objectsDisconnectTimeout);
            this.#objectsDisconnectTimeout = null;
        }

        this.#state.setConnected(false);
        this.#logger.warn(`${this.#hostLogPrefix} Slave controller detected disconnection. Stop all instances.`);

        if (this.#isCompactGroupController) {
            await this.stop(true);
            return;
        }

        await this.stop(true, false);

        this.#restartTimeout = setTimeout(async () => {
            await this.#restartByMessage();
            await wait(1_000);
            process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED);
        }, 10_000);
    }

    /**
     * Restart the controller process via the `_restart` command of the CLI
     */
    async #restartByMessage(): Promise<void> {
        if (!this.#messageHandler) {
            // the databases never connected, so there is nothing which could handle the message
            this.#logger.error(`${this.#hostLogPrefix} Cannot restart, the controller has never been connected`);
            return;
        }

        try {
            await this.#messageHandler.process({
                command: 'cmdExec',
                message: { data: '_restart' },
                from: this.#hostObjectPrefix,
            });
        } catch (e) {
            this.#logger.error(`${this.#hostLogPrefix} Cannot process restart message: ${e.message}`);
        }
    }

    /**
     * Ensures that we take over primary host if no other is doing the job
     */
    async #checkPrimaryHost(): Promise<void> {
        // we cannot interact with db now because currently reconnecting
        if (this.#objectsDisconnectTimeout || this.#isCompactGroupController) {
            return;
        }

        // let our host value live PRIMARY_HOST_LOCK_TIME seconds, while it should be renewed lock time / 2
        try {
            if (!this.#isPrimary) {
                this.#isPrimary = !!(await this.#objects!.setPrimaryHost(PRIMARY_HOST_LOCK_TIME));
            } else {
                const lockExtended = !!(await this.#objects!.extendPrimaryHostLock(PRIMARY_HOST_LOCK_TIME));
                if (!lockExtended) {
                    // if we are host, a lock extension should always work, fallback to acquire lock
                    this.#isPrimary = !!(await this.#objects!.setPrimaryHost(PRIMARY_HOST_LOCK_TIME));
                }
            }
        } catch (e) {
            this.#logger.error(`${this.#hostLogPrefix} Could not execute primary host determination: ${e.message}`);
        }
    }

    /**
     * Stops the js-controller and all running adapter instances
     *
     * If `exitProcess` is set, pids.txt is deleted and the process is terminated afterwards
     *
     * The managers are only created once the databases are connected, so a shutdown during the
     * startup has to cope with them being absent.
     *
     * @param force kills instances under all circumstances
     * @param exitProcess if the process should be terminated after all instances have been stopped
     */
    async stop(force = false, exitProcess = true): Promise<void> {
        this.#multihost?.close();

        if (this.#primaryHostInterval) {
            clearInterval(this.#primaryHostInterval);
            this.#primaryHostInterval = null;
        }

        this.#ips?.close();
        this.#status?.close();

        if (this.#state.isStopping) {
            return;
        }

        const wasForced = (await this.#instances?.stopInstances(force, this.#stopTimeout)) ?? false;

        await this.#pluginHandler?.destroyAll();
        this.#notificationHandler?.storeNotifications();

        try {
            // if we are the host, we should now let someone else take over
            if (this.#isPrimary) {
                await this.#objects!.releasePrimaryHost();
                this.#isPrimary = false;
            }
        } catch {
            // ignore
        }

        if (this.#objects && this.#objects.destroy) {
            await this.#objects.destroy();
        }

        if (!this.#states || force) {
            this.#logger.info(
                `${this.#hostLogPrefix} ${
                    wasForced ? 'force terminating' : 'terminated'
                }. Could not reset alive status for instances`,
            );
            if (!exitProcess) {
                return;
            }

            await wait(1_000);
            process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED);
        }

        this.#statistics.countOutput();
        try {
            await this.#states.setState(`${this.#hostObjectPrefix}.alive`, {
                val: false,
                ack: true,
                from: this.#hostObjectPrefix,
            });
            await this.#states.setState(`${this.#hostObjectPrefix}.pid`, {
                val: null,
                ack: true,
                from: this.#hostObjectPrefix,
            });
        } catch {
            // ignore
        }

        this.#logger.info(`${this.#hostLogPrefix} ${wasForced ? 'force terminating' : 'terminated'}`);
        if (wasForced && this.#instances) {
            for (const i of Object.keys(this.#instances.procs)) {
                const proc = this.#instances.procs[i];
                if (proc.process) {
                    if (proc.config && proc.config.common && proc.config.common.name) {
                        this.#logger.info(`${this.#hostLogPrefix} Adapter ${proc.config.common.name} still running`);
                    }
                }
            }
            for (const i of Object.keys(this.#instances.compactProcs)) {
                if (this.#instances.compactProcs[i].process) {
                    this.#logger.info(`${this.#hostLogPrefix} Compact group controller ${i} still running`);
                }
            }
        }

        if (this.#states?.destroy) {
            await this.#states.destroy();
        }

        if (!exitProcess) {
            return;
        }

        await wait(1_000);

        try {
            // avoid pids been written after deletion
            this.#instances?.clearStoreTimer();
            // delete pids.txt
            await fs.unlink(tools.getPidsFileName());
        } catch (e) {
            if (e.code !== 'ENOENT') {
                this.#logger.error(`${this.#hostLogPrefix} Could not delete ${tools.getPidsFileName()}: ${e}`);
            }
        }

        process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED);
    }

    /**
     * Initialize the controller and connect to both databases
     */
    async init(): Promise<void> {
        let title = `${tools.appName}.js-controller`;

        if (this.#isCompactGroupController) {
            title += `${COMPACT_GROUP_OBJECT_PREFIX}${this.#compactGroup}`;
        }

        // If a bootstrap file detected, it must be deleted, but give time for a bootstrap process to use this file
        if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
            setTimeout(() => {
                try {
                    if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
                        fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                        this.#logger?.info(`${this.#hostLogPrefix} Deleted ${VENDOR_BOOTSTRAP_FILE}`);
                    }
                } catch (e) {
                    this.#logger?.error(`${this.#hostLogPrefix} Cannot delete ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`);
                }
            }, 30_000);
        }

        process.title = title;

        // Get "objects" object
        // If "file" and on the local machine
        const hasLocalObjectsServer = await isLocalObjectsDbServer(
            this.#config.objects.type,
            this.#config.objects.host,
        );
        if (hasLocalObjectsServer && !this.#isCompactGroupController) {
            this.#ObjectsClass = (await import(`@iobroker/db-objects-${this.#config.objects.type}`)).Server;
        } else {
            this.#ObjectsClass = await getObjectsConstructor();
        }

        const hasLocalStatesServer = await isLocalStatesDbServer(this.#config.states.type, this.#config.states.host);
        // Get "states" object
        if (hasLocalStatesServer && !this.#isCompactGroupController) {
            this.#StatesClass = (await import(`@iobroker/db-states-${this.#config.states.type}`)).Server;
        } else {
            this.#StatesClass = await getStatesConstructor();
        }

        this.#initLogger();

        // find our notifier transport
        // @ts-expect-error types do not seem to be perfect here
        const ts = this.#logger.transports.find(t => t.name === 'NT');
        ts!.on('logged', info => {
            info.from = this.#hostLogPrefix;
            for (const log of this.#logList) {
                this.#states!.pushLog(log, info).catch(e =>
                    this.#logger.error(`${this.#hostLogPrefix} Cannot push log: ${e.message}`),
                );
            }
        });

        if (!this.#isCompactGroupController) {
            this.#logger.info(
                `${this.#hostLogPrefix} ${tools.appName}.js-controller version ${this.#version} ${this.#ioPackage.common.name} starting`,
            );
            this.#logger.info(`${this.#hostLogPrefix} Copyright (c) 2014-2024 bluefox, 2014 hobbyquaker`);
            this.#logger.info(`${this.#hostLogPrefix} hostname: ${this.#hostname}, node: ${process.version}`);
            this.#logger.info(`${this.#hostLogPrefix} ip addresses: ${tools.findIPs().join(' ')}`);

            this.#ensureCorePackageJson(title);
        } else {
            this.#logger.info(
                `${this.#hostLogPrefix} ${tools.appName}.js-controller version ${this.#version} ${this.#ioPackage.common.name} starting`,
            );
        }

        const packageJson = this.#checkNodeVersion();
        this.#initPlugins(packageJson);

        this.#createObjects(async () => {
            this.#objects!.subscribe(`${SYSTEM_ADAPTER_PREFIX}*`);

            // get the current host versions
            try {
                const hostView = await this.#objects!.getObjectViewAsync('system', 'host');
                for (const row of hostView.rows) {
                    if (row.value?.common?.installedVersion) {
                        this.#controllerVersions[row.id] = row.value.common.installedVersion;
                    }
                }
            } catch {
                // ignore
            }

            // create the states object
            this.#createStates(async () => {
                await this.#onDatabasesConnected();
            });
        });

        this.#connectTimeout = setTimeout(async () => {
            this.#connectTimeout = null;
            this.#logger.error(`${this.#hostLogPrefix} No connection to databases possible, restart`);
            if (!this.#isCompactGroupController) {
                await this.#restartByMessage();
            }
            await wait(this.#isCompactGroupController ? 0 : 1_000);
            process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED);
        }, 30_000);

        this.#registerProcessHandlers();
    }

    /**
     * Create the logger of this controller and handle an inaccessible logging directory
     */
    #initLogger(): void {
        // Detect if outputs to console are forced. By default, they are disabled and redirected to the log file
        if (
            this.#config.log.noStdout &&
            process.argv &&
            (process.argv.includes('--console') || process.argv.includes('--logs') || process.argv.includes('--debug'))
        ) {
            this.#config.log.noStdout = false;
        }

        // Detect if controller runs as a linux-daemon
        if (process.argv.includes('start') && !this.#isCompactGroupController) {
            this.#isDaemon = true;
            this.#config.log.noStdout = true;
        }

        try {
            this.#logger = toolsLogger(this.#config.log);
        } catch (e) {
            if (e.code === 'EACCES_LOG') {
                // We could not access logging directory - e.g., because of restored backup
                console.error(`Could not access logging directory "${e.path}", fallback to default`);

                // read a fresh config to avoid overwriting e.g., noStdout
                const _config = getConfig();
                // persist the config to be fixed permanently
                const configFile = tools.getConfigFileName();
                const fixedLogPath = 'log/iobroker';
                _config.log.transport.file1.filename = fixedLogPath;
                fs.writeFileSync(configFile, JSON.stringify(_config, null, 2));

                // fix this run
                this.#config.log.transport.file1.filename = fixedLogPath;
                // @ts-expect-error TODO: correct way to apply config?
                this.#logger = toolsLogger.logger(this.#config.log);

                this.#logger.warn(
                    `${this.#hostLogPrefix} Your logging path "${e.path}" was invalid, it has been changed to "${fixedLogPath}"`,
                );
            } else {
                // without logger multiple things will have undefined behavior, and probably more is wrong -> do not start
                console.error(`Error initializing logger: ${e.stack}`);
                process.exit(EXIT_CODES.UNKNOWN_ERROR);
            }
        }

        if (!this.#isCompactGroupController) {
            // Delete all log files older than x days
            // @ts-expect-error we have augmented winston instance with this method
            this.#logger.activateDateChecker(true, this.#config.log.maxDays);
        }
    }

    /**
     * Create the package.json of the ioBroker core for npm >= 3.x if it does not exist
     *
     * @param title The process title, used to detect if we run inside node_modules
     */
    #ensureCorePackageJson(title: string): void {
        const corePackageJson = {
            name: 'iobroker.core',
            version: '1.0.0',
            private: true,
        };

        // create package.json for npm >= 3.x if not exists
        const isInNodeModules = this.#controllerDir
            .toLowerCase()
            .includes(`${path.sep}node_modules${path.sep}${title.toLowerCase()}`);

        if (!isInNodeModules || tools.isDevServerInstallation()) {
            return;
        }

        try {
            if (!fs.existsSync(`${this.#controllerDir}/../../package.json`)) {
                fs.writeFileSync(`${this.#controllerDir}/../../package.json`, JSON.stringify(corePackageJson, null, 2));
            } else {
                // npm3 requires version attribute
                const p = fs.readJSONSync(`${this.#controllerDir}/../../package.json`);
                if (!p.version) {
                    fs.writeFileSync(
                        `${this.#controllerDir}/../../package.json`,
                        JSON.stringify(corePackageJson, null, 2),
                    );
                }
            }
        } catch (e) {
            console.error(`Cannot create "${this.#controllerDir}/../../package.json": ${e}`);
        }
    }

    /**
     * Check if the running Node.js version fulfills the requirements of the js-controller
     *
     * @returns the package.json of the js-controller
     */
    #checkNodeVersion(): Record<string, any> | undefined {
        let packageJson;
        try {
            packageJson = fs.readJSONSync(`${this.#controllerDir}/package.json`);
        } catch {
            this.#logger.error(`${this.#hostLogPrefix} Can not read js-controller package.json`);
        }

        if (!packageJson?.engines?.node) {
            return packageJson;
        }

        let invalidVersion;
        try {
            invalidVersion = !semver.satisfies(process.version, packageJson.engines.node);
        } catch {
            // semver could also not support the node version or something else ... failsafe
            invalidVersion = true;
        }

        if (invalidVersion) {
            this.#logger.error(
                `${this.#hostLogPrefix} ioBroker requires Node.js in version ${packageJson.engines.node}, you have ${process.version}`,
            );
            this.#logger.error(
                `${this.#hostLogPrefix} Please upgrade your Node.js version. See https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten`,
            );

            console.error(
                `ioBroker requires Node.js in version ${packageJson.engines.node}, you have ${process.version}`,
            );
            console.error(
                'Please upgrade your Node.js version. See https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten',
            );

            process.exit(EXIT_CODES.INVALID_NODE_VERSION);
        }

        return packageJson;
    }

    /**
     * Create the plugin handler and register all plugins of the host
     *
     * @param packageJson The package.json of the js-controller
     */
    #initPlugins(packageJson: Record<string, any> | undefined): void {
        const pluginSettings: PluginHandlerSettings = {
            scope: 'controller',
            namespace: this.#hostObjectPrefix,
            logNamespace: this.#hostLogPrefix,
            log: this.#logger as any,
            iobrokerConfig: this.#config,
            parentPackage: packageJson!,
            controllerVersion: this.#version,
        };

        this.#pluginHandler = new PluginHandler(pluginSettings);
        this.#pluginHandler.addPlugins(this.#ioPackage.common.plugins, this.#controllerDir); // Plugins from io-package have priority over ...

        try {
            this.#pluginHandler.addPlugins(this.#config.plugins, this.#controllerDir); // ... plugins from iobroker.json
        } catch (e) {
            this.#logger.error(
                `${this.#hostLogPrefix} Cannot load plugins ${JSON.stringify(this.#config.plugins)}: ${e}`,
            );
            console.error(`Cannot load plugins ${JSON.stringify(this.#config.plugins)}: ${e}`);
        }
    }

    /**
     * Called as soon as both databases are connected, subscribes to all states this host needs
     */
    async #onDatabasesConnected(): Promise<void> {
        const states = this.#states;
        const objects = this.#objects;

        if (!states || !objects) {
            throw new Error(`States or objects have not been initialized yet`);
        }

        if (this.#connectTimeout) {
            clearTimeout(this.#connectTimeout);
            this.#connectTimeout = null;
        }

        // Subscribe for all logging objects, all alive states and disk warnings
        this.#logWriteErrors(
            [
                states.subscribe(`${SYSTEM_ADAPTER_PREFIX}*.logging`),
                states.subscribe(`${SYSTEM_ADAPTER_PREFIX}*.alive`),
                states.subscribe(`${this.#hostObjectPrefix}.diskWarning`),
            ],
            'Cannot subscribe to system states',
        );

        const diskWarningState = await states.getState(`${this.#hostObjectPrefix}.diskWarning`);
        if (diskWarningState) {
            this.#status!.setDiskWarningLevel(getDiskWarningLevel(diskWarningState));
        }

        // set current Loglevel and subscribe for changes
        this.#logWriteErrors(
            [
                states.setState(`${this.#hostObjectPrefix}.logLevel`, {
                    val: this.#config.log.level,
                    ack: true,
                    from: this.#hostObjectPrefix,
                }),
                states.subscribe(`${this.#hostObjectPrefix}.logLevel`),
            ],
            'Cannot set/subscribe logLevel',
        );

        if (!this.#isCompactGroupController) {
            await this.#checkNodeVersionChanged();
        }

        await this.#restoreLogRedirects();
    }

    /**
     * Detect a change of the Node.js version and ensure the capabilities are set again if needed
     */
    async #checkNodeVersionChanged(): Promise<void> {
        const states = this.#states;

        try {
            const nodeVersion = process.version.replace(/^v/, '');
            const prevNodeVersionState = await states!.getStateAsync(`${this.#hostObjectPrefix}.nodeVersion`);

            if (!prevNodeVersionState || prevNodeVersionState.val !== nodeVersion) {
                // detected a change in the nodejs version (or state non-existing - upgrade from below v4)
                this.#logger.info(
                    `${this.#hostLogPrefix} Node.js version has changed from ${
                        prevNodeVersionState ? prevNodeVersionState.val : 'unknown'
                    } to ${nodeVersion}`,
                );
                if (os.platform() === 'linux' && process.env.IOB_NO_SETCAP !== 'true') {
                    // ensure capabilities are set
                    const capabilities = ['cap_net_admin', 'cap_net_bind_service', 'cap_net_raw'];
                    await tools.setExecutableCapabilities(process.execPath, capabilities, true, true, true);
                    this.#logger.info(
                        `${this.#hostLogPrefix} Successfully updated capabilities "${capabilities.join(', ')}" for ${
                            process.execPath
                        }`,
                    );
                }
            }

            // set current node version
            await states!.setState(`${this.#hostObjectPrefix}.nodeVersion`, {
                val: nodeVersion,
                ack: true,
                from: this.#hostObjectPrefix,
            });
        } catch (e) {
            this.#logger.warn(
                `${this.#hostLogPrefix} Error while trying to update capabilities after detecting new Node.js version: ${e.message}`,
            );
        }
    }

    /**
     * Read the current state of all log subscribers and restore the log redirection for them
     */
    async #restoreLogRedirects(): Promise<void> {
        const states = this.#states;
        const objects = this.#objects;
        let keys: string[] | undefined;

        try {
            // Read the current state of all log subscribers
            keys = (await states!.getKeys(`${SYSTEM_ADAPTER_PREFIX}*.logging`))!;
        } catch {
            // ignore
        }

        if (!keys?.length) {
            return;
        }

        const oKeys = keys.map(id => id.replace(/\.logging$/, ''));
        let objs: ioBroker.AnyObject[];

        try {
            objs = await objects!.getObjects(oKeys);
        } catch {
            return;
        }

        const toDelete = keys.filter((id, i) => !objs[i]);
        keys = keys.filter((id, i) => objs[i]);

        let statesArr: (ioBroker.State | null)[] | undefined;

        try {
            statesArr = (await states!.getStates(keys))!;
        } catch {
            // ignore
        }

        if (statesArr) {
            for (let i = 0; i < keys.length; i++) {
                const state = statesArr[i];
                if (state?.val === true) {
                    this.#logRedirect(
                        true,
                        keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, ''),
                        'starting',
                    );
                }
            }
        }

        if (toDelete.length) {
            toDelete.forEach(id => {
                this.#logger.warn(`${this.#hostLogPrefix} logger ${id} was deleted`);
                states!
                    .delState(id)
                    .catch(e => this.#logger.error(`${this.#hostLogPrefix} Cannot delete ${id}: ${e.message}`));
            });
        }
    }

    /**
     * Register the handlers for the process signals and uncaught exceptions
     */
    #registerProcessHandlers(): void {
        const exceptionHandler = async (err: Error): Promise<void> => {
            if (this.#isCompactGroupController) {
                console.error(err.message);
                if (err.stack) {
                    console.error(err.stack);
                }
                await this.stop(false);
                return;
            }
            console.error(err.message);
            if (err.stack) {
                console.error(err.stack);
            }

            // If by terminating one more exception => stop immediately to break the circle
            if (this.#uncaughtExceptionCount) {
                console.error(err.message);
                if (err.stack) {
                    console.error(err.stack);
                }
                process.exit(EXIT_CODES.UNCAUGHT_EXCEPTION);
                return;
            }
            this.#uncaughtExceptionCount++;
            if (typeof err === 'object') {
                // @ts-expect-error should be correct
                if (err.errno === 'EADDRINUSE') {
                    this.#logger.error(
                        `${this.#hostLogPrefix} Another instance is running or some application uses port!`,
                    );
                    this.#logger.error(`${this.#hostLogPrefix} uncaught exception: ${err.message}`);
                } else {
                    this.#logger.error(`${this.#hostLogPrefix} uncaught exception: ${err.message}`);
                    this.#logger.error(`${this.#hostLogPrefix} ${err.stack}`);
                }
            } else {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                this.#logger.error(`${this.#hostLogPrefix} uncaught exception: ${err}`);
                // @ts-expect-error todo: can this else clause even happen
                this.#logger.error(`${this.#hostLogPrefix} ${err.stack}`);
            }
            await this.stop(false);
            // Restart itself
            await this.#restartByMessage();
        };

        /**
         * Log an error of the shutdown, because we cannot do anything else at this point
         *
         * @param e The error which happened while stopping the controller
         */
        const logStopError = (e: Error): void => {
            this.#logger.error(`${this.#hostLogPrefix} Cannot stop controller: ${e.message}`);
        };

        process.on('SIGINT', () => {
            this.#logger.info(`${this.#hostLogPrefix} received SIGINT`);
            this.stop(false).catch(logStopError);
        });

        process.on('SIGTERM', () => {
            this.#logger.info(`${this.#hostLogPrefix} received SIGTERM`);
            this.stop(false).catch(logStopError);
        });

        process.on('uncaughtException', err => exceptionHandler(err).catch(logStopError));
        process.on('unhandledRejection', err => exceptionHandler(err as Error).catch(logStopError));
    }
}
