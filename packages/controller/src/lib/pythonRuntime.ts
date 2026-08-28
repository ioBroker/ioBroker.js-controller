/**
 * Support for adapters written in Python.
 *
 * Everything Python-specific lives here so that `main.ts` keeps a single, small
 * branch and the Node start path stays bit-for-bit what it was. An adapter is
 * treated as Python only when its `common.platform` says so; with the default
 * `Javascript/Node.js` nothing in this module is ever reached.
 *
 * The division of labour is deliberate: this controller starts, supervises and
 * stops Python adapters exactly the way it does Node adapters -- the stop path
 * through the `sigKill` state, the `alive`/`uptime` telemetry and the restart
 * logic are already language-neutral. What it does *not* do is manage Python
 * environments. Creating a venv, resolving dependencies and installing packages
 * belong to the `py-controller` adapter, which owns the network access, the disk
 * usage and the UI that comes with them.
 *
 * The contract runs in exactly one direction: this controller starts a Python
 * instance only when its environment already exists. If it does not, the
 * instance is not started and the reason is logged; `py-controller` watches for
 * that, builds the environment and triggers the restart. That keeps the core
 * free of any knowledge about `pip` or `uv` -- it only ever checks whether a
 * directory is there.
 */

import { type ChildProcess, spawn } from 'node:child_process';
import fs from 'fs-extra';
import path from 'node:path';
import { tools } from '@iobroker/js-controller-common-db';

/** Value of `common.platform` that marks an adapter as Python. */
export const PYTHON_PLATFORM = 'Python';

/** Directory below the data directory that holds one environment per adapter. */
const ENV_ROOT = 'py';

/**
 * Name of the file `py-controller` writes next to a virtual environment once it has built it.
 * It records which adapter version the environment was built for, which is what makes an
 * environment that has fallen behind its adapter detectable without parsing any Python metadata.
 */
const STAMP_FILE = 'environment.json';

/** What `py-controller` records about an environment it has built */
export interface PythonEnvironmentStamp {
    /** `common.version` of the adapter the environment was built for */
    adapterVersion: string;
    /** Hash over the adapter's `pyproject.toml`, so edits without a version bump are noticed too */
    dependencyHash?: string;
    /** When the environment was built, ISO 8601 */
    builtAt?: string;
    /** Version of the interpreter in the environment */
    pythonVersion?: string;
}

/** Result of checking an adapter's Python environment */
export interface PythonEnvironment {
    /** Whether the environment is usable and the adapter may be started */
    ready: boolean;
    /** Absolute path to the interpreter inside the venv */
    interpreter: string;
    /** Root of this adapter's environment */
    envDir: string;
    /** Why the environment is unusable; only set when `ready` is false */
    reason?: string;
    /** The environment exists but was built for a different adapter version */
    stale?: boolean;
}

/** Module and working directory a Python adapter is started with */
export interface PythonEntryPoint {
    /** Module to run with `-m`, e.g. `pyexample` */
    module: string;
    /** Working directory the module is started from */
    cwd: string;
}

/**
 * Check whether an adapter is written in Python
 *
 * The comparison ignores case on purpose. `platform` is hand-written in every io-package.json and
 * already carries the wrong case in the wild -- adapters shipping `javascript/Node.js` instead of
 * `Javascript/Node.js` exist today. Refusing to start an adapter over a lower-case "python" would
 * be a needlessly sharp edge on a field nobody validates.
 *
 * @param common the `common` section of the instance or adapter object
 */
export function isPythonAdapter(common?: { platform?: string } | null): boolean {
    return common?.platform?.toLowerCase() === PYTHON_PLATFORM.toLowerCase();
}

/**
 * Determine where an adapter's Python environment lives
 *
 * One environment per adapter rather than per instance: the isolation exists to
 * keep adapters from fighting over package versions, which is not a problem two
 * instances of the same adapter can have.
 *
 * @param adapterName name of the adapter without the `iobroker.` prefix
 */
export function getPythonEnvDir(adapterName: string): string {
    // getDefaultDataDir() is relative to the controller directory by design, and it has to be made
    // absolute here. The interpreter path derived from it becomes the executable of a spawn() whose
    // cwd is the adapter's package directory -- a relative path would be resolved against that and
    // fail with ENOENT, while every check done from the controller's own cwd would still pass.
    return path.resolve(tools.getControllerDir(), tools.getDefaultDataDir(), ENV_ROOT, adapterName);
}

/**
 * Determine the interpreter path inside an adapter's environment
 *
 * @param adapterName name of the adapter without the `iobroker.` prefix
 */
export function getPythonInterpreter(adapterName: string): string {
    const venvDir = path.join(getPythonEnvDir(adapterName), 'venv');

    return process.platform === 'win32'
        ? path.join(venvDir, 'Scripts', 'python.exe')
        : path.join(venvDir, 'bin', 'python');
}

/**
 * Check whether an adapter's Python environment can be used to start it
 *
 * Deliberately only a file system check plus the stamp `py-controller` leaves behind. Validating
 * the installed packages would mean knowing about `pip`, which is exactly the knowledge this side
 * of the contract does not want -- so instead the component that installed them says what it
 * installed them for, and this side only compares two version strings.
 *
 * An environment that is merely out of date is reported as not ready as well. Starting an adapter
 * against dependencies resolved for an older version of it produces failures far away from their
 * cause, which is worse than refusing with a clear reason.
 *
 * @param adapterName name of the adapter without the `iobroker.` prefix
 * @param expectedVersion `common.version` of the installed adapter; omit to skip the staleness check
 */
export async function checkPythonEnvironment(
    adapterName: string,
    expectedVersion?: string,
): Promise<PythonEnvironment> {
    const envDir = getPythonEnvDir(adapterName);
    const interpreter = getPythonInterpreter(adapterName);

    if (!(await fs.pathExists(interpreter))) {
        return {
            ready: false,
            interpreter,
            envDir,
            reason:
                `Python environment is missing (expected "${interpreter}"). ` +
                'Install the "py-controller" adapter, which creates and maintains it.',
        };
    }

    if (!expectedVersion) {
        return { ready: true, interpreter, envDir };
    }

    const stamp = await readEnvironmentStamp(adapterName);

    if (!stamp) {
        // Environments built before the stamp existed, or built by hand. Refusing to start those
        // would break working installations for no gain, so they are accepted and left to
        // py-controller to bring up to date.
        return { ready: true, interpreter, envDir };
    }

    if (stamp.adapterVersion !== expectedVersion) {
        return {
            ready: false,
            interpreter,
            envDir,
            stale: true,
            reason:
                `Python environment was built for version ${stamp.adapterVersion}, but ` +
                `${expectedVersion} is installed. The "py-controller" adapter rebuilds it.`,
        };
    }

    return { ready: true, interpreter, envDir };
}

/**
 * Read what `py-controller` recorded about an adapter's environment
 *
 * @param adapterName name of the adapter without the `iobroker.` prefix
 * @returns the stamp, or null when there is none or it cannot be read
 */
export async function readEnvironmentStamp(adapterName: string): Promise<PythonEnvironmentStamp | null> {
    const stampFile = path.join(getPythonEnvDir(adapterName), STAMP_FILE);

    try {
        const stamp: PythonEnvironmentStamp = await fs.readJSON(stampFile);

        return typeof stamp?.adapterVersion === 'string' ? stamp : null;
    } catch {
        // Missing or unreadable is not an error here -- the caller treats it as "unknown".
        return null;
    }
}

/**
 * Derive the Python module to start from the adapter's `common.main`
 *
 * The convention is `python/<module>/__main__.py`, mirroring how the package is
 * laid out in the repository. The module is started with `-m` rather than by
 * file path, because a file started directly is not part of a package and its
 * relative imports fail.
 *
 * @param adapterDir directory the adapter is installed in
 * @param main value of `common.main`, relative to the adapter directory
 */
export function resolvePythonEntry(adapterDir: string, main?: string): PythonEntryPoint {
    if (!main) {
        throw new Error('common.main is not set, cannot determine the Python module');
    }

    // Matched strictly against the documented layout instead of merely looking for a trailing
    // "__main__.py". A looser check accepts "python/foo/bar/__main__.py" and derives the module
    // "bar" from it, which is wrong for a nested package -- `python -m bar` would fail while the
    // configuration looked plausible. Rejecting it names the problem instead.
    const match = /^python\/([^/]+)\/__main__\.py$/.exec(main.replace(/\\/g, '/'));

    if (!match) {
        throw new Error(`common.main must follow the layout "python/<module>/__main__.py", got "${main}".`);
    }

    return { module: match[1], cwd: path.join(adapterDir, 'python') };
}

/** Everything needed to start a Python adapter process */
export interface SpawnPythonOptions {
    /** Name of the adapter without the `iobroker.` prefix */
    adapterName: string;
    /** Directory the adapter is installed in */
    adapterDir: string;
    /** Value of `common.main` */
    main?: string;
    /** Interpreter to use, from {@link checkPythonEnvironment} */
    interpreter: string;
    /** The same arguments a Node adapter receives, e.g. `--instance 0` */
    args: string[];
    /** Connection settings handed to the adapter through the environment */
    env: NodeJS.ProcessEnv;
}

/**
 * Start a Python adapter
 *
 * Two differences to the Node path are intentional. Standard output is piped
 * rather than discarded: a Node adapter logs exclusively through the states
 * database, but third-party Python libraries print tracebacks to stdout, and
 * those would otherwise be lost. And no IPC channel is set up, because nothing
 * in this controller ever sends a message across it.
 *
 * @param options where and how to start the adapter
 */
export function spawnPythonAdapter(options: SpawnPythonOptions): ChildProcess {
    const { adapterDir, main, interpreter, args, env } = options;
    const entry = resolvePythonEntry(adapterDir, main);

    // -u disables buffering. Python block-buffers stdout as soon as it is a pipe rather than a
    // terminal, which is exactly the case here: forwarded output would arrive in 8 KB chunks long
    // after the fact, and whatever sat in the buffer would be lost if the process is killed.
    return spawn(interpreter, ['-u', '-m', entry.module, ...args], {
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true,
        cwd: entry.cwd,
        env,
    });
}

/**
 * Build the environment a Python adapter needs to reach the databases
 *
 * The SDK reads these instead of parsing `iobroker.json` itself, which keeps the
 * credentials out of the process list -- unlike command line arguments, the
 * environment of a process is not world-readable.
 *
 * @param config the controller configuration
 * @param instance instance number the adapter is started for
 * @param logLevel log level for this instance
 */
export function buildPythonEnv(
    config: ioBroker.IoBrokerJson,
    instance: number | string,
    logLevel?: string,
): NodeJS.ProcessEnv {
    const env: NodeJS.ProcessEnv = { ...process.env };

    for (const section of ['states', 'objects'] as const) {
        const part = config[section];

        if (!part) {
            continue;
        }

        const prefix = `IOB_${section.toUpperCase()}_`;
        env[`${prefix}HOST`] = Array.isArray(part.host) ? part.host[0] : part.host;
        env[`${prefix}PORT`] = String(Array.isArray(part.port) ? part.port[0] : part.port);
        env[`${prefix}TYPE`] = part.type;

        const options = part.options as { db?: number; auth_pass?: string | null } | undefined;

        if (options?.db !== undefined) {
            env[`${prefix}DB`] = String(options.db);
        }
        if (options?.auth_pass) {
            env[`${prefix}PASS`] = options.auth_pass;
        }
    }

    env.IOB_INSTANCE = String(instance);

    if (logLevel) {
        env.IOB_LOGLEVEL = logLevel;
    }

    return env;
}
