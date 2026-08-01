import { setTimeout as wait } from 'node:timers/promises';
import { tools } from '@iobroker/js-controller-common';
import type SentryPlugin from '@iobroker/plugin-sentry';
import { AdapterUpgradeManager } from '@/lib/adapterUpgradeManager.js';
import type { HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';
import type { InstallQueueEntry } from '@/lib/controller/types.js';

/**
 * Upgrade the js-controller itself via the detached upgrade manager
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const upgradeController: HostCommandHandler = async (controller, msg) => {
    const { logger, hostLogPrefix, systemChecks, messages } = controller;

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
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const upgradeAdapterWithWebserver: HostCommandHandler = async (controller, msg) => {
    const { objects, states, logger, messages } = controller;
    const { version, adapterName, useHttps, port, certPrivateName, certPublicName } = msg.message;

    const upgradeManager = new AdapterUpgradeManager({
        logger,
        adapterName,
        version,
        useHttps,
        objects: objects!,
        states: states!,
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
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const upload: HostCommandHandler = async (controller, msg) => {
    const { logger, hostLogPrefix } = controller;

    if (!msg.message) {
        logger.error(`${hostLogPrefix} No adapter name is specified for upload command from  ${msg.from}`);
        return;
    }

    await controller.uploadAdapter({ adapter: msg.message, msg });
};

/**
 * Queue an adapter for a rebuild of its native modules
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const rebuildAdapter: HostCommandHandler = (controller, msg) => {
    const { logger, hostLogPrefix, instances, messages } = controller;
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
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const updateLicenses: HostCommandHandler = async (controller, msg) => {
    const { objects, logger, hostLogPrefix, messages } = controller;

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
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const upgradeOsPackages: HostCommandHandler = async (controller, msg) => {
    const { logger, hostLogPrefix, systemChecks, messages } = controller;
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
        await controller.restartSelf();
    }
};

/**
 * Restart the js-controller
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const restartController: HostCommandHandler = async (controller, msg) => {
    const { messages } = controller;

    if (msg.callback) {
        messages.sendTo(msg.from, msg.command, '', msg.callback);
    }
    // let the answer be sent
    await wait(200);
    await controller.restartSelf();
};

/**
 * Forward a message to Sentry if the Sentry plugin is active
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const sendToSentry: HostCommandHandler = (controller, msg) => {
    const { logger, hostLogPrefix, pluginHandler } = controller;

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

/** All commands which install, upgrade or restart something */
export const upgradeCommands: Record<string, HostCommandHandler> = {
    upgradeController,
    upgradeAdapterWithWebserver,
    upload,
    rebuildAdapter,
    updateLicenses,
    upgradeOsPackages,
    restartController,
    sendToSentry,
};
