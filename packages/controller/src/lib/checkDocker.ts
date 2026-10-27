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
 * docker CLI, and none of that should stay in the memory of the controller, or be able to take it down.
 */
import { fork } from 'node:child_process';
import { createRequire } from 'node:module';
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

/**
 * Let the plugin check Docker in a child process
 *
 * @param options what to check
 * @param options.pluginPath main file of `@iobroker/plugin-docker`, see {@link resolveDockerPlugin}
 * @param options.namespace the instance the check is done for
 * @param options.log receives every line the plugin logged
 * @param options.timeoutMs kill the child after this time
 */
export function checkDocker(options: {
    pluginPath: string;
    namespace: `${string}.${number}`;
    log?: (text: string) => void;
    timeoutMs?: number;
}): Promise<DockerCheckResult> {
    return new Promise((resolve, reject) => {
        let answer: ChildAnswer | undefined;
        const child = fork(modulePath, [options.pluginPath, options.namespace], {
            stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
            // a debugger port of the controller is taken already, the child could not start with it
            execArgv: process.execArgv.filter(arg => !arg.startsWith('--inspect')),
        });
        const timer = setTimeout(() => {
            child.kill('SIGKILL');
            reject(
                new Error(`The Docker check did not finish within ${options.timeoutMs || CHECK_DOCKER_TIMEOUT_MS} ms`),
            );
        }, options.timeoutMs || CHECK_DOCKER_TIMEOUT_MS);

        child.on('message', (message: ChildAnswer) => {
            answer = message;
        });
        child.on('error', error => {
            clearTimeout(timer);
            reject(error);
        });
        child.on('exit', code => {
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

/**
 * The part that runs in the child process
 *
 * @param pluginPath main file of the plugin
 * @param namespace the instance the check is done for
 */
async function runCheckInChild(pluginPath: string, namespace: string): Promise<void> {
    const logs: string[] = [];
    const collect = (text: string): void => {
        logs.push(text);
    };
    let answer: ChildAnswer;
    try {
        const plugin = require(pluginPath);
        const DockerManager = plugin.DockerManager || plugin.default?.DockerManager;
        if (typeof DockerManager !== 'function') {
            throw new Error('This version of @iobroker/plugin-docker cannot check Docker');
        }
        const manager = new DockerManager({
            logger: { level: 'debug', silly: collect, debug: collect, info: collect, warn: collect, error: collect },
            namespace,
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
    void runCheckInChild(process.argv[2], process.argv[3]);
}
