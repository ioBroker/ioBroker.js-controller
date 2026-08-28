/**
 * Support for adapters written in Python.
 *
 * Everything Python-specific lives here so that `main.ts` keeps a single, small
 * branch and the Node start path stays bit-for-bit what it was. An adapter is
 * treated as Python only when its `common.runtime` says so; without that field
 * nothing in this module is ever reached.
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

/** Value of `common.runtime` that marks an adapter as Python. */
export const PYTHON_RUNTIME = 'python';

/** Directory below the data directory that holds one environment per adapter. */
const ENV_ROOT = 'py';

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
 * @param common the `common` section of the instance or adapter object
 */
export function isPythonAdapter(common?: { runtime?: string } | null): boolean {
    return common?.runtime === PYTHON_RUNTIME;
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
 * Deliberately only a file system check. Validating the installed packages
 * would mean knowing about `pip`, which is exactly the knowledge this side of
 * the contract does not want.
 *
 * @param adapterName name of the adapter without the `iobroker.` prefix
 */
export async function checkPythonEnvironment(adapterName: string): Promise<PythonEnvironment> {
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

    return { ready: true, interpreter, envDir };
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

    const normalized = main.replace(/\\/g, '/');

    if (!normalized.endsWith('/__main__.py')) {
        throw new Error(
            `common.main must point at a "__main__.py" inside the package directory, got "${main}". ` +
                'The expected layout is "python/<module>/__main__.py".',
        );
    }

    const mainFile = path.join(adapterDir, normalized);
    const moduleDir = path.dirname(mainFile);

    return { module: path.basename(moduleDir), cwd: path.dirname(moduleDir) };
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

    return spawn(interpreter, ['-m', entry.module, ...args], {
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
