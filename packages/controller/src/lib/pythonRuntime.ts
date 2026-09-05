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
    /**
     * Set while py-controller is replacing this environment, cleared when it succeeds.
     *
     * A rebuild empties the venv and fills it again. In between, the interpreter is already back
     * -- `uv venv --clear` recreates it in the first moment -- while `site-packages` is still
     * empty, and the stamp from the previous build still names the right version. Without this
     * flag both checks below pass and the adapter is started against an environment that has
     * nothing in it, which it reports as `ModuleNotFoundError` naming a package that was there a
     * second ago.
     *
     * It stays set if the rebuild is interrupted, which is the honest outcome: an environment
     * nobody finished building is one nothing should be started from until it is rebuilt.
     */
    building?: boolean;
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
 * Determine the interpreter path inside an adapter's environment
 *
 * @param adapterName name of the adapter without the `iobroker.` prefix
 */
export function getPythonInterpreter(adapterName: string): string {
    const venvDir = path.join(tools.getPythonEnvDir(adapterName), 'venv');

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
    const envDir = tools.getPythonEnvDir(adapterName);
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

    if (stamp.building) {
        return {
            ready: false,
            interpreter,
            envDir,
            stale: true,
            reason:
                'Python environment is being rebuilt by the "py-controller" adapter. ' +
                'The instance starts by itself once that has finished.',
        };
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
    const stampFile = path.join(tools.getPythonEnvDir(adapterName), STAMP_FILE);

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
 * Two differences to the Node path are intentional. Both output streams are piped rather than
 * discarded: a Node adapter logs exclusively through the states database, but Python does not --
 * `print()` and libraries logging to stdout go one way, while tracebacks and the `logging` module's
 * default handler go to stderr. And no IPC channel is set up, because nothing in this controller
 * ever sends a message across it.
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
 * The SDK reads these instead of parsing `iobroker.json` itself, which keeps the credentials out
 * of the process list: `ps` and `/proc/<pid>/cmdline` are readable by any user on the machine,
 * while the environment of a running process is not. That is a narrower claim than "secret" --
 * root and the owning user can still read it -- but it removes the case where a password is
 * visible to everyone logged in.
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

    // Everything this function manages is cleared first. The controller's own environment is
    // inherited on purpose -- an adapter needs PATH and friends -- but if it was started from a
    // shell that already had IOB_STATES_HOST set, an inherited value would survive wherever the
    // configuration has none and quietly point the adapter at a different database. The adapter's
    // environment has to be decided by the configuration alone.
    for (const key of Object.keys(env)) {
        if (/^IOB_(STATES|OBJECTS)_/.test(key) || key === 'IOB_INSTANCE' || key === 'IOB_LOGLEVEL') {
            delete env[key];
        }
    }

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

/**
 * Check whether the database configuration can be handed to a Python adapter at all
 *
 * {@link buildPythonEnv} expresses a connection as one host and one port. A Redis Sentinel setup
 * (recognisable by `host` being an array) cannot be flattened that way: the entries are sentinels,
 * not databases, and a client connecting to one of them as if it were a plain Redis fails in a way
 * that looks like a network problem. Refusing to start with the actual reason is the honest
 * alternative until the topology can be passed through.
 *
 * @param config the controller configuration
 * @returns a human-readable reason when the configuration cannot be supported, else `null`
 */
export function unsupportedPythonDbConfig(config: ioBroker.IoBrokerJson): string | null {
    for (const section of ['states', 'objects'] as const) {
        if (Array.isArray(config[section]?.host)) {
            return (
                `the ${section} database is configured with multiple hosts (Redis Sentinel), ` +
                'which cannot be passed to a Python adapter yet'
            );
        }
    }

    return null;
}

/** Sink that receives whole, non-empty log lines recovered from a Python adapter's output */
export type PythonLogSink = (level: 'info' | 'error', line: string) => void;

/**
 * Build a consumer that turns a stream of chunks into whole log lines
 *
 * Chunks are not lines. A read can end in the middle of one, so the incomplete tail is held back
 * until the rest arrives -- otherwise a traceback arrives torn across two log entries at exactly
 * the moment someone is trying to read it. Empty lines are dropped and trailing whitespace
 * (including the `\r` of Windows line endings) is removed.
 *
 * @param emit called once per recovered line
 */
export function createLineSplitter(emit: (line: string) => void): {
    onData: (data: unknown) => void;
    flush: () => void;
} {
    let pending = '';

    const emitLine = (line: string): void => {
        if (line.trim()) {
            emit(line.trimEnd());
        }
    };

    return {
        onData(data: unknown): void {
            pending += String(data);
            const lines = pending.split('\n');
            // The last element is whatever came after the final newline: either empty, or the
            // start of a line still being written.
            pending = lines.pop() ?? '';

            for (const line of lines) {
                emitLine(line);
            }

            // An adapter writing without newlines would otherwise grow this without limit.
            if (pending.length > 8_192) {
                emitLine(pending);
                pending = '';
            }
        },
        flush(): void {
            emitLine(pending);
            pending = '';
        },
    };
}

/**
 * Forward both output streams of a Python adapter to a log sink
 *
 * A Node adapter logs exclusively through the states database and its output is discarded. Python
 * does not: `print()` and libraries logging to stdout go one way, tracebacks and the `logging`
 * module's default handler go to stderr. Both would be lost otherwise, and a traceback is the most
 * useful thing an adapter ever produces.
 *
 * @param child the started process
 * @param log receives every recovered line with its severity
 */
export function forwardPythonOutput(child: ChildProcess, log: PythonLogSink): void {
    const out = createLineSplitter(line => log('info', line));
    const err = createLineSplitter(line => log('error', line));

    child.stdout?.on('data', out.onData);
    child.stderr?.on('data', err.onData);

    // Whatever was still buffered belongs in the log too -- a crash often ends without a trailing
    // newline, and that last line is the interesting one.
    child.on('close', () => {
        out.flush();
        err.flush();
    });
}
