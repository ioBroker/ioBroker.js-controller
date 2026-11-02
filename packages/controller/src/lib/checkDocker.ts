/**
 * The host command `checkDocker`: can an instance use Docker on this host?
 *
 * The `checkDocker` control of a jsonConfig dialog asks this. Admin answers it itself only for the host it runs on;
 * for an instance on another host it forwards the question here, because Docker is a property of the machine and
 * cannot be seen from the other one.
 *
 * The check is done by `@iobroker/plugin-docker`, which the controller does not depend on. It is resolved from the
 * directory of the adapter, as the PluginHandler resolves it when the instance starts - so the answer comes from the
 * same code, in the same version, that will run the containers of that instance later.
 *
 * The plugin runs in a child process of its own. It brings a Docker client with many dependencies and calls the
 * docker CLI, and none of that should stay in the memory of the controller, or be able to take it down. A check that
 * hangs is killed after a timeout, together with the processes it started.
 *
 * The Docker that is checked is the one the instance uses: an adapter can name a Docker connection of
 * `system.docker` in its plugin config (`iobDockerApi`), e.g. a Docker on another machine, also through a template
 * like `${config.dockerApi}` that the user fills in the instance settings. The plugin finds that connection itself,
 * in the child, so templates are resolved by the same code as when the instance starts. See
 * {@link readDockerApiSource}.
 */
import { type ChildProcess, execFile, fork } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import url from 'node:url';

/** The answer of `DockerManager.getDockerDaemonInfo()` of the plugin */
export interface DockerCheckResult {
    /** e.g. "Docker version 28.3.2, build 578ccf6" */
    version?: string;
    /** whether the Docker daemon runs */
    daemonRunning?: boolean;
    /** whether containers and images can be removed with this driver */
    removeSupported?: boolean;
    /** how the plugin talks to Docker: 'socket', 'cli', 'http', ... */
    driver?: string;
}

/** What the child process reports back */
interface ChildAnswer {
    result?: DockerCheckResult;
    error?: string;
    /** what the plugin logged, for the debug log of the host */
    logs: string[];
}

/** The plugin needs a few seconds on a slow machine: it probes the socket, two ports and the CLI */
export const CHECK_DOCKER_TIMEOUT_MS = 20_000;

// eslint-disable-next-line unicorn/prefer-module
const modulePath = url.fileURLToPath(import.meta.url || `file://${__filename}`);
// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

/**
 * Read the instance from the message of the host command
 *
 * @param message the message, e.g. `{ instance: "ai-server.0" }`
 * @returns the instance id without `system.adapter.`
 */
export function getDockerCheckInstance(message: unknown): `${string}.${number}` {
    const instance = message && typeof message === 'object' ? (message as { instance?: unknown }).instance : undefined;
    if (typeof instance !== 'string') {
        throw new Error('The message has to name the instance, e.g. { instance: "ai-server.0" }');
    }
    const id = instance.replace(/^system\.adapter\./, '');
    // the adapter name becomes part of a path below, so nothing but a plain name is accepted
    if (!/^[a-z0-9][-_a-z0-9]*\.\d+$/i.test(id)) {
        throw new Error(`Invalid instance "${instance}"`);
    }
    return id as `${string}.${number}`;
}

/**
 * Find the plugin the adapter would use
 *
 * @param adapterDir directory of the adapter
 * @returns the path of the plugin's main file, or null if the adapter does not bring the plugin
 */
export function resolveDockerPlugin(adapterDir: string): string | null {
    try {
        return require.resolve('@iobroker/plugin-docker', { paths: [adapterDir] });
    } catch {
        return null;
    }
}

/** A Docker connection of `system.docker`, as the `DockerManager` of the plugin takes it as `dockerApi` */
export interface DockerApi {
    /** host of the Docker API */
    host?: string;
    /** port of the Docker API */
    port?: number | string;
    /** protocol of the Docker API */
    protocol?: 'http' | 'https' | 'ssh';
    /** CA certificate */
    ca?: string;
    /** client certificate */
    cert?: string;
    /** client key */
    key?: string;
}

/** What decides which Docker an instance uses - see {@link readDockerApiSource} */
export interface DockerApiSource {
    /** `iobDockerApi` of `common.plugins.docker` in the `io-package.json` of the adapter, as written there */
    iobDockerApi: unknown;
    /** `native` of the instance object, which the templates in `iobDockerApi` read, e.g. `${config.dockerApi}` */
    instanceConfig: Record<string, unknown>;
    /** the object `system.docker` with the named connections, null if there is none */
    systemDocker: ioBroker.Object | null;
}

/**
 * Read what decides which Docker the instance uses
 *
 * The plugin reads `iobDockerApi` of `common.plugins.docker` in the `io-package.json` of the adapter, when the
 * instance starts:
 * - not set: the Docker of this host
 * - a name: the connection `native.hosts.<name>` of `system.docker`, or the Docker of this host if there is none
 * - an object: this connection
 *
 * Since version 1.3.0, templates in it are resolved with the instance config first, e.g.
 * `"iobDockerApi": "${config.dockerApi}"`. How exactly is up to the plugin, so this reads only what the plugin
 * reads - the connection is found in the child, by the plugin, see {@link findDockerApi}.
 *
 * @param options where to look
 * @param options.adapterDir directory of the adapter
 * @param options.instance the instance, e.g. "ai-server.0"
 * @param options.getObject reads an object of the objects DB
 * @returns what decides it, or undefined if the adapter names no connection: then it is the Docker of this host
 */
export async function readDockerApiSource(options: {
    adapterDir: string;
    instance: `${string}.${number}`;
    getObject: (id: string) => Promise<ioBroker.Object | null | undefined>;
}): Promise<DockerApiSource | undefined> {
    let ioPackage: { common?: { plugins?: { docker?: { iobDockerApi?: unknown } } } };
    try {
        ioPackage = JSON.parse(await readFile(path.join(options.adapterDir, 'io-package.json'), 'utf8'));
    } catch (e) {
        throw new Error(`Cannot read io-package.json of the adapter: ${e.message}`);
    }
    const iobDockerApi = ioPackage.common?.plugins?.docker?.iobDockerApi;
    // the plugin takes an empty value as none as well
    if (!iobDockerApi) {
        return undefined;
    }

    const instanceObj = await options.getObject(`system.adapter.${options.instance}`);
    if (!instanceObj) {
        throw new Error(`Cannot find instance object system.adapter.${options.instance}`);
    }
    return {
        iobDockerApi,
        instanceConfig: instanceObj.native || {},
        systemDocker: (await options.getObject('system.docker')) || null,
    };
}

/**
 * Find the Docker connection as the plugins before version 1.3.0 do: they do not resolve templates, they look up the
 * name as written
 *
 * A template like `${config.dockerApi}` is no name in `system.docker` then, and the instance uses the Docker of this
 * host - so does the check.
 *
 * @param source what decides it, see {@link readDockerApiSource}
 * @param log receives how the connection was found
 * @returns the connection, or undefined for the Docker of this host
 */
export function resolveDockerApiAsWritten(source: DockerApiSource, log: (text: string) => void): DockerApi | undefined {
    const { iobDockerApi } = source;
    if (iobDockerApi && typeof iobDockerApi === 'object') {
        return iobDockerApi;
    }
    if (!iobDockerApi || typeof iobDockerApi !== 'string') {
        return undefined;
    }
    const hosts = (source.systemDocker?.native as { hosts?: Record<string, DockerApi | undefined> } | undefined)?.hosts;
    // only own entries: a name like "__proto__" is no connection
    const dockerApi = hosts && Object.hasOwn(hosts, iobDockerApi) ? hosts[iobDockerApi] : undefined;
    if (!dockerApi || typeof dockerApi !== 'object') {
        // the plugin warns in the log of the instance and uses the Docker of this host then
        log(
            `The Docker connection "${iobDockerApi}" of the adapter is not defined in system.docker, the Docker of this host is checked, as the instance would use it`,
        );
        return undefined;
    }
    return dockerApi;
}

/** What the child process gets to check */
export interface CheckStart {
    /** main file of `@iobroker/plugin-docker`, see {@link resolveDockerPlugin} */
    pluginPath: string;
    /** the instance the check is done for */
    namespace: `${string}.${number}`;
    /**
     * what decides the Docker connection of the instance, see {@link readDockerApiSource};
     * undefined for the Docker of this host
     */
    dockerApiSource?: DockerApiSource;
}

/** What to check, see {@link checkDocker} */
export interface CheckDockerOptions extends CheckStart {
    /** receives every line the plugin logged */
    log?: (text: string) => void;
    /** kill the child after this time */
    timeoutMs?: number;
}

/**
 * The checks that are running, by the plugin that does them and the Docker it checks.
 *
 * A config dialog asks once per `checkDocker` control it renders, and every check starts a node process that loads a
 * Docker client and needs some seconds. The answer depends only on the plugin and on what decides the Docker
 * connection, so a question that comes in while the same plugin is checking the same Docker already gets the answer
 * of that check.
 */
const runningChecks = new Map<string, Promise<DockerCheckResult>>();

/**
 * Let the plugin check Docker in a child process
 *
 * If the same plugin is checking the same Docker already, no second process is started: the caller gets the answer of
 * the running check. Then the plugin logs once, to the `log` of the caller that started the check.
 *
 * @param options what to check
 */
export function checkDocker(options: CheckDockerOptions): Promise<DockerCheckResult> {
    const key = JSON.stringify([
        options.pluginPath,
        // a template like `${instance}` may name another connection for every instance
        options.dockerApiSource ? options.namespace : null,
        options.dockerApiSource ?? null,
    ]);
    let check = runningChecks.get(key);
    if (!check) {
        check = runCheck(options).finally(() => runningChecks.delete(key));
        runningChecks.set(key, check);
    }
    return check;
}

/**
 * Kill a process and every process it started
 *
 * The plugin runs the docker CLI and `systemctl` in processes of their own, and a hanging `docker ps` is what lets a
 * check run into the timeout. Killing only the node process would leave it running - one more with every dialog that
 * asks. On Linux and macOS the child leads a process group of its own (see {@link forkCheck}), which is killed as a
 * whole. Windows has no process groups, there `taskkill /T` kills the tree.
 *
 * @param pid the process
 * @param done called when the kill was sent - if the process kills itself, maybe never
 */
function killProcessTree(pid: number, done: () => void): void {
    if (process.platform === 'win32') {
        // the callback comes with an error as well if the process is gone already, nothing to do then
        execFile('taskkill', ['/pid', String(pid), '/T', '/F'], { windowsHide: true }, () => done());
        return;
    }
    try {
        process.kill(-pid, 'SIGKILL');
    } catch {
        // there is no such group (anymore)
    }
    done();
}

/**
 * Start the child process that checks Docker
 *
 * What to check is sent as the first message, not on the command line: that one every user of the machine can read,
 * and a Docker connection may come with a key.
 *
 * @param start what to check
 */
export function forkCheck(start: CheckStart): ChildProcess {
    // the namespace only names the process, e.g. in `ps`
    const child = fork(modulePath, [start.namespace], {
        stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
        // a debugger port of the controller is taken already, the child could not start with it
        execArgv: process.execArgv.filter(arg => !arg.startsWith('--inspect')),
        // a process group of its own, so that what the plugin starts can be killed with it - see killProcessTree.
        // On Windows this would mean a console of its own instead.
        detached: process.platform !== 'win32',
    });
    child.send(start, () => {
        // if the child cannot get it, it ends without an answer, which the caller reports
    });
    return child;
}

/**
 * Start the child process that checks Docker and wait for its answer
 *
 * @param options what to check
 */
function runCheck(options: CheckDockerOptions): Promise<DockerCheckResult> {
    return new Promise((resolve, reject) => {
        let answer: ChildAnswer | undefined;
        const child = forkCheck({
            pluginPath: options.pluginPath,
            namespace: options.namespace,
            dockerApiSource: options.dockerApiSource,
        });
        const timer = setTimeout(() => {
            reject(
                new Error(`The Docker check did not finish within ${options.timeoutMs || CHECK_DOCKER_TIMEOUT_MS} ms`),
            );
            const killChild = (): void => {
                child.kill('SIGKILL');
            };
            // Once the child is reaped, its pid may belong to another process, which must not be killed. The node
            // process at least is killed in any case, in case the tree could not be.
            if (child.pid && child.exitCode === null && child.signalCode === null) {
                killProcessTree(child.pid, killChild);
            } else {
                killChild();
            }
        }, options.timeoutMs || CHECK_DOCKER_TIMEOUT_MS);

        child.on('message', (message: ChildAnswer) => {
            answer = message;
        });
        child.on('error', error => {
            clearTimeout(timer);
            reject(error);
        });
        // Not 'exit': it can come before the last message of the child - when the event loop of the controller is
        // busy, the exit and the message are read in the same round, in any order. 'close' comes after the IPC
        // channel is closed, so after every message was read.
        child.on('close', code => {
            clearTimeout(timer);
            for (const line of answer?.logs || []) {
                options.log?.(line);
            }
            if (answer?.result) {
                resolve(answer.result);
            } else {
                reject(new Error(answer?.error || `The Docker check ended with code ${code} and no answer`));
            }
        });
    });
}

/** What the child takes from the plugin, as its CommonJS build exports it */
interface DockerPluginModule {
    /** the plugin class; the exports hang off it, in some builds off `default` as well */
    default?: DockerPluginModule;
    /** checks Docker */
    DockerManager?: new (options: {
        dockerApi?: DockerApi;
        logger: Pick<ioBroker.Logger, 'silly' | 'debug' | 'info' | 'warn' | 'error'> & { level: string };
        namespace: string;
        quiet?: boolean;
    }) => { getDockerDaemonInfo: () => Promise<DockerCheckResult> };
    /** finds the Docker connection of an instance - since version 1.3.0 */
    resolveDockerApi?: (options: {
        iobDockerApi: unknown;
        instanceConfig: Record<string, unknown>;
        instance: number;
        getSystemDocker: () => Promise<ioBroker.Object | null | undefined>;
        log?: { warn: (text: string) => void };
    }) => Promise<DockerApi | undefined>;
}

/**
 * Find the Docker connection of the instance, with the code of the plugin
 *
 * Plugins before version 1.3.0 do not export `resolveDockerApi()`; for them the name is looked up as written, as they
 * do it themselves, see {@link resolveDockerApiAsWritten}.
 *
 * @param plugin the loaded plugin
 * @param start what to check
 * @param log receives how the connection was found
 * @returns the connection, or undefined for the Docker of this host
 */
async function findDockerApi(
    plugin: DockerPluginModule,
    start: CheckStart,
    log: (text: string) => void,
): Promise<DockerApi | undefined> {
    const source = start.dockerApiSource;
    if (!source) {
        return undefined;
    }
    const resolveDockerApi = plugin.resolveDockerApi || plugin.default?.resolveDockerApi;
    if (typeof resolveDockerApi !== 'function') {
        log('This version of the plugin resolves no templates in iobDockerApi, the name is looked up as written');
        return resolveDockerApiAsWritten(source, log);
    }
    return resolveDockerApi({
        iobDockerApi: source.iobDockerApi,
        instanceConfig: source.instanceConfig,
        instance: Number(start.namespace.slice(start.namespace.lastIndexOf('.') + 1)),
        getSystemDocker: () => Promise.resolve(source.systemDocker),
        log: { warn: log },
    });
}

/**
 * The part that runs in the child process
 *
 * @param start what to check, see {@link forkCheck}
 */
async function runCheckInChild(start: CheckStart): Promise<void> {
    const logs: string[] = [];
    const collect = (text: string): void => {
        logs.push(text);
    };
    let answer: ChildAnswer;
    try {
        const plugin: DockerPluginModule = require(start.pluginPath);
        const DockerManager = plugin.DockerManager || plugin.default?.DockerManager;
        if (typeof DockerManager !== 'function') {
            throw new Error('This version of @iobroker/plugin-docker cannot check Docker');
        }
        const dockerApi = await findDockerApi(plugin, start, collect);
        // the address only - a connection may come with a key
        collect(
            dockerApi
                ? `Checks the Docker API ${dockerApi.protocol || 'http'}://${dockerApi.host}:${dockerApi.port}`
                : 'Checks the Docker of this host',
        );
        const manager = new DockerManager({
            // undefined: the Docker of this host
            dockerApi,
            logger: { level: 'debug', silly: collect, debug: collect, info: collect, warn: collect, error: collect },
            namespace: start.namespace,
            // the plugin logs a missing Docker on debug level only, the caller shows the result itself
            quiet: true,
        });
        // nothing to clean up afterwards: the process ends with the answer
        const result: DockerCheckResult = await manager.getDockerDaemonInfo();
        answer = { result, logs };
    } catch (e) {
        answer = { error: e.message, logs };
    }
    process.send!(answer, () => process.exit(0));
}

if (process.argv[1] === modulePath && process.send) {
    // The controller is gone: nobody waits for the answer anymore, and nobody would kill a check that hangs.
    // So the check ends here, with everything it started.
    process.on('disconnect', () => killProcessTree(process.pid, () => process.exit(1)));
    process.once('message', (start: CheckStart) => void runCheckInChild(start));
}
