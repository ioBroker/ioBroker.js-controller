import { ControllerState } from '@/lib/controller/state.js';
import { Statistics } from '@/lib/controller/statistics.js';
import type { ControllerLogger } from '@/lib/controller/types.js';

/** The identity every manager is constructed with */
export interface TestIdentity {
    /** A logger which swallows everything */
    logger: ControllerLogger;
    /** Prefix of all log messages */
    hostLogPrefix: string;
    /** The id of the host object */
    hostObjectPrefix: ioBroker.ObjectIDs.Host;
    /** Name of the host */
    hostname: string;
}

/**
 * Create a logger which swallows all output, so tests do not spam the console
 *
 * Pass sinon stubs for the levels a test wants to assert on.
 *
 * @param over The log levels this test wants to observe
 */
export function silentLogger(over: Partial<Record<string, unknown>> = {}): ControllerLogger {
    const noop = (): void => {};

    return {
        silly: noop,
        debug: noop,
        info: noop,
        warn: noop,
        error: noop,
        transports: [],
        ...over,
    } as unknown as ControllerLogger;
}

/**
 * Create the identity block which every manager needs
 *
 * @param over The parts this test wants to control
 */
export function testIdentity(over: Partial<TestIdentity> = {}): TestIdentity {
    return {
        logger: silentLogger(),
        hostLogPrefix: 'host.testhost',
        hostObjectPrefix: 'system.host.testhost',
        hostname: 'testhost',
        ...over,
    };
}

/**
 * Create a minimal `iobroker.json`
 *
 * A fresh object per call, the controller writes into its config - e.g. the log level.
 */
export function testConfig(): ioBroker.IoBrokerJson {
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
 * Create a fresh lifecycle state
 *
 * @param options How the controller should look to the code under test
 * @param options.stopping If a shutdown has been requested
 * @param options.connected If both databases are connected
 * @param options.started If the instances of this host have been started
 */
export function testState(
    options: { stopping?: boolean; connected?: boolean; started?: boolean } = {},
): ControllerState {
    const state = new ControllerState();

    state.setConnected(options.connected ?? true);
    state.setStarted(options.started ?? true);

    if (options.stopping) {
        state.markStopping();
    }

    return state;
}

/**
 * Create a fresh statistics counter
 */
export function testStatistics(): Statistics {
    return new Statistics();
}
