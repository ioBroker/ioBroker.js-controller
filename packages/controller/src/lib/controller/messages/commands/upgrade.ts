import { setTimeout as wait } from 'node:timers/promises';
import { tools } from '@iobroker/js-controller-common';
import type SentryPlugin from '@iobroker/plugin-sentry';
import { AdapterUpgradeManager } from '@/lib/adapterUpgradeManager.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { ControllerLogger, UploadTask, InstallQueueEntry } from '@/lib/controller/types.js';
import type { InstanceManager } from '@/lib/controller/instances/instanceManager.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { PluginHandler } from '@iobroker/plugin-base';
import type { SystemChecks } from '@/lib/controller/host/systemChecks.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for upgrades, rebuilds and restarts need */
export interface UpgradeCommandsDeps {
    /** The connected objects database client */
    objects: ObjectsClient;
    /** The connected states database client */
    states: StatesClient;
    /** Sends the answers back to the requester */
    messages: MessageBus;
    /** Takes care of all instances of this host */
    instances: InstanceManager;
    /** Checks the system for available updates and problems */
    systemChecks: SystemChecks;
    /** Handles the plugins of this host */
    pluginHandler: InstanceType<typeof PluginHandler>;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** Uploads an adapter on request */
    uploadAdapter: (task: UploadTask) => Promise<void>;
    /** Restarts the whole js-controller process */
    restartSelf: () => Promise<void>;
}

/**
 * Upgrade the js-controller itself via the detached upgrade manager
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const upgradeController: HostCommand<UpgradeCommandsDeps> = async (deps, msg) => {
    const { logger, hostLogPrefix, systemChecks, messages } = deps;

    if (!tools.isControllerUiUpgradeSupported()) {
        if (msg.callback) {
            messages.sendTo(msg.from, msg.command, { result: false }, msg.callback);
        }
        return;
    }

    const { version, adminInstance } = msg.message;

    logger.info(`${hostLogPrefix} Controller will upgrade itself to version ${version}`);
    await systemChecks.startUpgradeManager({
        version,
        adminInstance,
        uid: process.getuid ? process.getuid() : 0,
        gid: process.getgid ? process.getgid() : 0,
    });

    if (msg.callback) {
        messages.sendTo(msg.from, msg.command, { result: true }, msg.callback);
    }
};

/**
 * Upgrade an adapter and provide a web server which informs about the progress
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const upgradeAdapterWithWebserver: HostCommand<UpgradeCommandsDeps> = async (deps, msg) => {
    const { objects, states, logger, messages } = deps;
    const { version, adapterName, useHttps, port, certPrivateName, certPublicName } = msg.message;

    const upgradeManager = new AdapterUpgradeManager({
        logger,
        adapterName,
        version,
        useHttps,
        objects: objects,
        states: states,
        port,
        certPrivateName,
        certPublicName,
    });

    if (msg.callback) {
        messages.sendTo(msg.from, msg.command, { result: true }, msg.callback);
    }

    await upgradeManager.stopAdapter();
    await upgradeManager.startWebServer();
    await upgradeManager.performUpgrade();
};

/**
 * Upload the files of an adapter into the files' database
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const upload: HostCommand<UpgradeCommandsDeps> = async (deps, msg) => {
    const { logger, hostLogPrefix } = deps;

    if (!msg.message) {
        logger.error(`${hostLogPrefix} No adapter name is specified for upload command from  ${msg.from}`);
        return;
    }

    await deps.uploadAdapter({ adapter: msg.message, msg });
};

/**
 * Queue an adapter for a rebuild of its native modules
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const rebuildAdapter: HostCommand<UpgradeCommandsDeps> = (deps, msg) => {
    const { logger, hostLogPrefix, instances, messages } = deps;
    const { installQueue } = instances;

    if (!msg.message.id) {
        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { error: 'Adapter to rebuild not provided.' }, msg.callback);
        }
        return;
    }

    if (installQueue.has(msg.message.id)) {
        logger.info(`${hostLogPrefix} ${msg.message.id} still in installQueue, rebuild will be done with install`);
        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { result: 'pending' }, msg.callback);
        }
        return;
    }

    logger.info(
        `${hostLogPrefix} ${msg.message.id} will be rebuilt${
            msg.message.rebuildArgs ? ` (Args: ${JSON.stringify(msg.message.rebuildArgs)})` : ''
        }`,
    );
    const installObj: InstallQueueEntry = { id: msg.message.id, rebuild: true };
    if (msg.message.rebuildArgs) {
        installObj.rebuildArgs = msg.message.rebuildArgs;
    }

    installQueue.push(installObj);

    if (msg.callback && msg.from) {
        messages.sendTo(msg.from, msg.command, { result: 'ok' }, msg.callback);
    }
};

/**
 * Read the licenses from iobroker.net
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const updateLicenses: HostCommand<UpgradeCommandsDeps> = async (deps, msg) => {
    const { objects, logger, hostLogPrefix, messages } = deps;

    try {
        const licenses = await tools.updateLicenses(
            objects,
            msg.message && msg.message.login,
            msg.message && msg.message.password,
        );
        logger.info(
            `${hostLogPrefix} Received ${licenses.length} licenses: "${licenses.map(l => l.product).join(', ')}"`,
        );
        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { result: licenses }, msg.callback);
        }
    } catch (e) {
        logger.error(`${hostLogPrefix} Cannot read licenses: ${e.message}`);

        msg.callback &&
            msg.from &&
            messages.sendTo(msg.from, msg.command, { result: [], error: e.message }, msg.callback);
    }
};

/**
 * Upgrade the given operating system packages
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const upgradeOsPackages: HostCommand<UpgradeCommandsDeps> = async (deps, msg) => {
    const { logger, hostLogPrefix, systemChecks, messages } = deps;
    const { packages, restart: restartRequired } = msg.message;

    try {
        await systemChecks.upgradeOsPackages(packages);
        msg.callback && messages.sendTo(msg.from, msg.command, { success: true }, msg.callback);
    } catch (e) {
        msg.callback && messages.sendTo(msg.from, msg.command, { error: e.message, success: false }, msg.callback);
        return;
    }

    try {
        await systemChecks.listUpdatableOsPackages();
    } catch (e) {
        logger.warn(`${hostLogPrefix} Could not check for new OS updates after upgrade: ${e.message}`);
    }

    if (restartRequired) {
        logger.info(`${hostLogPrefix} Restart js-controller because desired after package upgrade`);
        await wait(200);
        await deps.restartSelf();
    }
};

/**
 * Restart the js-controller
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const restartController: HostCommand<UpgradeCommandsDeps> = async (deps, msg) => {
    const { messages } = deps;

    if (msg.callback) {
        messages.sendTo(msg.from, msg.command, '', msg.callback);
    }
    // let the answer be sent
    await wait(200);
    await deps.restartSelf();
};

/**
 * Forward a message to Sentry if the Sentry plugin is active
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const sendToSentry: HostCommand<UpgradeCommandsDeps> = (deps, msg) => {
    const { logger, hostLogPrefix, pluginHandler } = deps;

    const message: string = msg.message.message;
    const level: string = msg.message.level;
    const extraInfo: Record<string, unknown> = msg.message.extraInfo;

    const sentryObj = (
        pluginHandler.getPluginInstance('sentry') as InstanceType<typeof SentryPlugin.default> | null
    )?.getSentryObject();

    if (!sentryObj) {
        logger.debug(`${hostLogPrefix} Do not send message "${message}" to Sentry, because it is disabled`);
        return;
    }

    sentryObj.withScope((scope: any) => {
        scope.setLevel(level);
        for (const [attr, val] of Object.entries(extraInfo)) {
            scope.setExtra(attr, val);
        }

        sentryObj.captureMessage(message, 'info');
    });
};

/**
 * Create the host commands for upgrades, rebuilds and restarts
 *
 * @param deps Everything these commands need
 */
export function createUpgradeCommands(deps: UpgradeCommandsDeps): Record<string, HostCommandHandler> {
    return {
        upgradeController: msg => upgradeController(deps, msg),
        upgradeAdapterWithWebserver: msg => upgradeAdapterWithWebserver(deps, msg),
        upload: msg => upload(deps, msg),
        rebuildAdapter: msg => rebuildAdapter(deps, msg),
        updateLicenses: msg => updateLicenses(deps, msg),
        upgradeOsPackages: msg => upgradeOsPackages(deps, msg),
        restartController: msg => restartController(deps, msg),
        sendToSentry: msg => sendToSentry(deps, msg),
    };
}
