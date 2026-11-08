import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { isLogLevel } from '@iobroker/js-controller-common-db/tools';
import { getDiskWarningLevel } from '@/lib/utils.js';
import type { IoPackageFile, PluginHandler } from '@iobroker/plugin-base';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { InstanceManager } from '@/lib/controller/instances/instanceManager.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { HostMessageHandler } from '@/lib/controller/messages/hostMessageHandler.js';
import type { HostStatusReporter } from '@/lib/controller/host/hostStatusReporter.js';
import type { Statistics } from '@/lib/controller/statistics.js';
import type { ControllerLogger } from '@/lib/controller/types.js';

/** Everything the state change routing needs to do its work */
export interface StateChangeRouterDeps {
    /** The connected objects database client */
    objects: ObjectsClient;
    /** The connected states database client */
    states: StatesClient;
    /** The configuration of this host (iobroker.json) */
    config: ioBroker.IoBrokerJson;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** The id of the host object of this controller */
    hostObjectPrefix: ioBroker.ObjectIDs.Host;
    /** Directory of the js-controller, needed to instantiate a plugin */
    controllerDir: string;
    /** The raw content of the io-package.json of the js-controller */
    ioPackage: IoPackageFile;
    /** If this controller is a compact group controller, those ignore the host messages */
    isCompactGroupController: boolean;
    /** Wakes up the instances which subscribed to a state */
    instances: InstanceManager;
    /** Recognizes the answers to messages this host has sent */
    messages: MessageBus;
    /** Processes the messages which are sent to this host */
    messageHandler: HostMessageHandler;
    /** Receives a changed disk warning level */
    status: HostStatusReporter;
    /** Enables and disables the plugins of this host */
    pluginHandler: InstanceType<typeof PluginHandler>;
    /** The counters of the received states */
    statistics: Statistics;
    /** Subscribes or unsubscribes a logger instance for redirected log messages */
    logRedirect: (isActive: boolean, id: string, reason: string) => void;
}

/**
 * React on a state change which this host is subscribed to
 *
 * @param deps Everything the state change routing needs
 * @param id The id of the changed state
 * @param stateOrMessage The new state or the received message
 */
export async function handleStateChange(
    deps: StateChangeRouterDeps,
    id: string,
    stateOrMessage: ioBroker.State | ioBroker.Message | null | undefined,
): Promise<void> {
    const { states, objects, config, logger, hostLogPrefix, hostObjectPrefix, isCompactGroupController } = deps;

    deps.statistics.countInput();
    if (!id) {
        logger.error(`${hostLogPrefix} change event with no ID: ${JSON.stringify(stateOrMessage)}`);
        return;
    }

    // If some log transporter activated or deactivated
    if (id.startsWith(SYSTEM_ADAPTER_PREFIX) && id.endsWith('.logging')) {
        const state = stateOrMessage as ioBroker.State;
        deps.logRedirect(state ? (state.val as boolean) : false, id.substring(0, id.length - '.logging'.length), id);
    } else if (!isCompactGroupController && id === `messagebox.${hostObjectPrefix}`) {
        // If this is messagebox, only the main controller is handling the host messages
        const obj = stateOrMessage as ioBroker.Message;
        if (obj) {
            // If callback stored for this request
            if (!deps.messages.handleResponse(obj)) {
                deps.messageHandler
                    .process(obj)
                    .catch(e => logger.error(`${hostLogPrefix} Cannot process message: ${e.message}`));
            }
        }
    } else if (!isCompactGroupController && id.match(/^system.adapter.[^.]+\.\d+\.alive$/)) {
        const state = stateOrMessage as ioBroker.State;
        // If this system.adapter.NAME.0.alive, only main controller is handling this
        if (state && !state.ack) {
            const enabled = state.val;
            let obj: ioBroker.Object | null | undefined;

            try {
                obj = await objects.getObject(id.substring(0, id.length - 6 /*'.alive'.length*/));
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot read object: ${e.message}`);
            }

            if (obj?.common) {
                // IF adapter enabled => disable it
                if ((obj.common.enabled && !enabled) || (!obj.common.enabled && enabled)) {
                    obj.common.enabled = !!enabled;
                    logger.info(
                        `${hostLogPrefix} instance "${obj._id}" ${obj.common.enabled ? 'enabled' : 'disabled'} via .alive`,
                    );
                    obj.from = hostObjectPrefix;
                    obj.ts = Date.now();
                    try {
                        await objects.setObject(obj._id, obj);
                    } catch (e) {
                        logger.error(`${hostLogPrefix} Cannot set object: ${e.message}`);
                    }
                }
            }
        }
    } else if (deps.instances.subscribe[id]) {
        const { instances } = deps;

        for (const sub of instances.subscribe[id]) {
            // wake up adapter
            if (instances.procs[sub]) {
                logger.debug(`${hostLogPrefix} Wake up ${sub} because of state change on ${id}`);
                instances
                    .startInstance(sub, true)
                    .catch(e => logger.error(`${hostLogPrefix} Cannot start instance ${sub}: ${e.message}`));
            } else {
                logger.warn(`${hostLogPrefix} controller Adapter subscribed on ${id} does not exist!`);
            }
        }
    } else if (id === `${hostObjectPrefix}.logLevel`) {
        const state = stateOrMessage as ioBroker.State;

        if (!config || !config.log || !state || state.ack) {
            return;
        }
        let currentLevel = config.log.level;
        if (typeof state.val === 'string' && state.val !== currentLevel && isLogLevel(state.val)) {
            config.log.level = state.val;
            for (const transport of logger.transports) {
                if (
                    transport.level === currentLevel &&
                    // @ts-expect-error it's our custom property
                    !transport._defaultConfigLoglevel
                ) {
                    transport.level = state.val;
                }
            }
            logger.info(`${hostLogPrefix} Loglevel changed from "${currentLevel}" to "${state.val}"`);
            currentLevel = state.val;
        } else if (state.val && state.val !== currentLevel) {
            logger.info(`${hostLogPrefix} Got invalid loglevel "${state.val}", ignoring`);
        }
        await states.setState(`${hostObjectPrefix}.logLevel`, {
            val: currentLevel,
            ack: true,
            from: hostObjectPrefix,
        });
    } else if (id.startsWith(`${hostObjectPrefix}.plugins.`) && id.endsWith('.enabled')) {
        const state = stateOrMessage as ioBroker.State;

        if (!config || !config.log || !state || state.ack) {
            return;
        }
        const pluginStatesIndex = `${hostObjectPrefix}.plugins.`.length;
        let nameEndIndex: number | undefined = id.indexOf('.', pluginStatesIndex + 1);
        if (nameEndIndex === -1) {
            nameEndIndex = undefined;
        }
        const pluginName = id.substring(pluginStatesIndex, nameEndIndex);
        const { pluginHandler, controllerDir, ioPackage } = deps;

        if (!pluginHandler.pluginExists(pluginName)) {
            return;
        }
        if (pluginHandler.isPluginActive(pluginName) !== state.val) {
            if (state.val) {
                if (!pluginHandler.isPluginInstantiated(pluginName)) {
                    pluginHandler.instantiatePlugin(
                        pluginName,
                        pluginHandler.getPluginConfig(pluginName)!,
                        controllerDir,
                    );
                    // @ts-expect-error objects and state object version conflicts that are none
                    pluginHandler.setDatabaseForPlugin(pluginName, objects, states);
                    await pluginHandler.initPlugin(pluginName, ioPackage);
                }
            } else {
                if (!(await pluginHandler.destroy(pluginName))) {
                    logger.info(
                        `${hostLogPrefix} Plugin ${pluginName} could not be disabled. Please restart ioBroker to disable it.`,
                    );
                }
            }
        }
    } else if (
        id === `${hostObjectPrefix}.diskWarning` &&
        stateOrMessage &&
        'ack' in stateOrMessage &&
        !stateOrMessage.ack
    ) {
        const warningLevel = getDiskWarningLevel(stateOrMessage);
        deps.status.setDiskWarningLevel(warningLevel);
        await states.setState(id, { val: warningLevel, ack: true });
    }
}
