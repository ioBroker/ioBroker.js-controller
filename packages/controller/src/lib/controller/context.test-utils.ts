import { tools } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { ControllerContext } from '@/lib/controller/context.js';
import type { ControllerLogger } from '@/lib/controller/types.js';

/**
 * Overrides for {@link createTestContext}
 *
 * Everything is optional, the database clients and the managers only need to be passed if the code
 * under test actually touches them. They are accepted as partials, so a test can stub the two or
 * three methods it needs instead of implementing a whole client.
 */
export type TestContextOverrides = Partial<Omit<ControllerContext, 'states' | 'objects'>> & {
    /** The states database client, omit it to let every access throw `ERROR_DB_CLOSED` */
    states?: Partial<StatesClient> | null;
    /** The objects database client, omit it to let every access throw `ERROR_DB_CLOSED` */
    objects?: Partial<ObjectsClient> | null;
};

/**
 * Build a minimal `iobroker.json` which is enough for everything that only reads a few entries
 *
 * This has to be a fresh object per context, the controller writes into its config - e.g. the log
 * level - and tests would otherwise influence each other.
 */
function createDefaultConfig(): ioBroker.IoBrokerJson {
    return {
        system: {
            statisticsInterval: 15_000,
            checkDiskInterval: 300_000,
            instanceStartInterval: 2_000,
            compact: false,
        },
        objects: { type: 'jsonl', host: '127.0.0.1' },
        states: { type: 'jsonl', host: '127.0.0.1' },
        log: { level: 'info', noStdout: true, maxDays: 7, transport: {} },
        plugins: {},
    } as unknown as ioBroker.IoBrokerJson;
}

/**
 * Create a logger which swallows all output, so tests do not spam the console
 */
export function createSilentLogger(): ControllerLogger {
    const noop = (): void => {};

    return {
        silly: noop,
        debug: noop,
        info: noop,
        warn: noop,
        error: noop,
        transports: [],
    } as unknown as ControllerLogger;
}

/**
 * Fail with a helpful message when the code under test reaches for something the test did not provide
 *
 * @param name Name of the missing context member
 */
function missing(name: string): never {
    throw new Error(
        `The test context has no "${name}", pass it to createTestContext() if the code under test needs it`,
    );
}

/**
 * Build a {@link ControllerContext} for unit tests without constructing a whole controller
 *
 * Only what the code under test touches has to be passed - everything else either has a harmless
 * default or throws a descriptive error when it is accessed. The counters and the stopping flag
 * behave like the real ones, so `ctx.outputCount` can be asserted after the code under test ran.
 *
 * @param overrides The parts of the context this test wants to control
 */
export function createTestContext(overrides: TestContextOverrides = {}): ControllerContext {
    const states = (overrides.states ?? null) as StatesClient | null;
    const objects = (overrides.objects ?? null) as ObjectsClient | null;

    let inputCount = overrides.inputCount ?? 0;
    let outputCount = overrides.outputCount ?? 0;
    let isStopping = overrides.isStopping ?? null;

    const ctx: ControllerContext = {
        // static information
        ioPackage: overrides.ioPackage ?? { common: { name: 'js-controller', version: '7.0.0' }, notifications: [] },
        version: overrides.version ?? '7.0.0',
        config: overrides.config ?? createDefaultConfig(),
        hostname: overrides.hostname ?? 'testhost',
        controllerDir: overrides.controllerDir ?? '/opt/iobroker/node_modules/iobroker.js-controller',
        hostObjectPrefix: overrides.hostObjectPrefix ?? 'system.host.testhost',
        hostLogPrefix: overrides.hostLogPrefix ?? 'host.testhost',
        isCompactGroupController: overrides.isCompactGroupController ?? false,
        compactGroup: overrides.compactGroup ?? null,
        uptimeStart: overrides.uptimeStart ?? Date.now(),

        // runtime state
        logger: overrides.logger ?? createSilentLogger(),
        get states() {
            if (!states) {
                throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
            }
            return states;
        },
        get objects() {
            if (!objects) {
                throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
            }
            return objects;
        },
        isStatesConnected: overrides.isStatesConnected ?? !!states,
        isObjectsConnected: overrides.isObjectsConnected ?? !!objects,
        isDaemon: overrides.isDaemon ?? false,
        connected: overrides.connected ?? true,
        started: overrides.started ?? true,
        get isStopping() {
            return isStopping;
        },
        logList: overrides.logList ?? [],
        requestedRepoUpdates: overrides.requestedRepoUpdates ?? [],
        get inputCount() {
            return inputCount;
        },
        get outputCount() {
            return outputCount;
        },

        // managers
        get instances() {
            return overrides.instances ?? missing('instances');
        },
        get messages() {
            return overrides.messages ?? missing('messages');
        },
        get messageHandler() {
            return overrides.messageHandler ?? missing('messageHandler');
        },
        get status() {
            return overrides.status ?? missing('status');
        },
        get hostMeta() {
            return overrides.hostMeta ?? missing('hostMeta');
        },
        get ips() {
            return overrides.ips ?? missing('ips');
        },
        get diag() {
            return overrides.diag ?? missing('diag');
        },
        get systemChecks() {
            return overrides.systemChecks ?? missing('systemChecks');
        },
        get multihost() {
            return overrides.multihost ?? missing('multihost');
        },
        get pluginHandler() {
            return overrides.pluginHandler ?? missing('pluginHandler');
        },
        get notificationHandler() {
            return overrides.notificationHandler ?? missing('notificationHandler');
        },
        get blocklistManager() {
            return overrides.blocklistManager ?? missing('blocklistManager');
        },
        get autoUpgradeManager() {
            return overrides.autoUpgradeManager ?? missing('autoUpgradeManager');
        },

        // actions
        countInput:
            overrides.countInput ??
            ((inc = 1): void => {
                inputCount += inc;
            }),
        countOutput:
            overrides.countOutput ??
            ((inc = 1): void => {
                outputCount += inc;
            }),
        resetCounters:
            overrides.resetCounters ??
            ((): void => {
                inputCount = 0;
                outputCount = 0;
            }),
        markStopping:
            overrides.markStopping ??
            ((): void => {
                isStopping = isStopping || Date.now();
            }),
        logWriteErrors: overrides.logWriteErrors ?? ((): void => {}),
        logRedirect: overrides.logRedirect ?? ((): void => {}),
        uploadAdapter: overrides.uploadAdapter ?? ((): Promise<void> => Promise.resolve()),
        restartSelf: overrides.restartSelf ?? ((): Promise<void> => Promise.resolve()),
        stop: overrides.stop ?? ((): Promise<void> => Promise.resolve()),
    };

    return ctx;
}
