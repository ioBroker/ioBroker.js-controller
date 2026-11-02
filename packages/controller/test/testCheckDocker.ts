import assert from 'node:assert/strict';
import path from 'node:path';
import os from 'node:os';
import fs from 'fs-extra';
import {
    checkDocker,
    forkCheck,
    getDockerCheckInstance,
    readDockerApiSource,
    resolveDockerApiAsWritten,
    resolveDockerPlugin,
} from '../src/lib/checkDocker.js';

/**
 * Create an adapter directory with a fake `@iobroker/plugin-docker`
 *
 * @param root directory to create the adapter in
 * @param pluginCode source of the plugin's main file
 * @returns the adapter directory
 */
function createAdapter(root: string, pluginCode: string): string {
    const adapterDir = path.join(root, 'iobroker.fake');
    const pluginDir = path.join(adapterDir, 'node_modules', '@iobroker', 'plugin-docker');
    fs.mkdirpSync(pluginDir);
    fs.writeJSONSync(path.join(adapterDir, 'package.json'), { name: 'iobroker.fake', version: '1.0.0' });
    fs.writeJSONSync(path.join(pluginDir, 'package.json'), { name: '@iobroker/plugin-docker', main: 'index.js' });
    fs.writeFileSync(path.join(pluginDir, 'index.js'), pluginCode);
    return adapterDir;
}

/** A plugin as the real one is exported in CommonJS: the plugin class, with DockerManager hung off it */
const WORKING_PLUGIN = `
class DockerManager {
    constructor(options) {
        this.options = options;
    }
    async getDockerDaemonInfo() {
        this.options.logger.debug('probed for ' + this.options.namespace + ', quiet: ' + this.options.quiet);
        return { version: 'Docker version 28.3.2', daemonRunning: true, removeSupported: true, driver: 'socket' };
    }
}
class DockerPlugin {}
module.exports = DockerPlugin;
module.exports.DockerManager = DockerManager;
`;

/** A plugin whose check answers with the Docker connection it got, and whether a key is on the command line */
const REPORTING_PLUGIN = WORKING_PLUGIN.replace(
    'async getDockerDaemonInfo() {',
    `async getDockerDaemonInfo() {
        const api = this.options.dockerApi;
        return {
            version: api ? api.host + ':' + api.port + ' ' + api.key : 'local',
            daemonRunning: !process.argv.join(' ').includes('KEY'),
            driver: api ? api.protocol : 'socket',
        };`,
);

describe('checkDocker', () => {
    let root: string;

    before(() => {
        // the real path, as require.resolve answers with it - on macOS the temp directory is behind a symlink
        root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'iob-check-docker-')));
    });

    after(() => {
        fs.removeSync(root);
    });

    describe('getDockerCheckInstance', () => {
        it('accepts an instance with and without the prefix', () => {
            assert.equal(getDockerCheckInstance({ instance: 'ai-server.0' }), 'ai-server.0');
            assert.equal(getDockerCheckInstance({ instance: 'system.adapter.ai-server.1' }), 'ai-server.1');
        });

        it('refuses a message without an instance', () => {
            assert.throws(() => getDockerCheckInstance(null), /has to name the instance/);
            assert.throws(() => getDockerCheckInstance({}), /has to name the instance/);
            assert.throws(() => getDockerCheckInstance('ai-server.0'), /has to name the instance/);
        });

        it('refuses everything that is not a plain adapter name, as it becomes part of a path', () => {
            for (const instance of ['ai-server', '../ai-server.0', 'ai/server.0', 'ai-server.x', '.0', 'a b.0']) {
                assert.throws(() => getDockerCheckInstance({ instance }), /Invalid instance/, instance);
            }
        });
    });

    describe('resolveDockerPlugin', () => {
        it('finds the plugin in the directory of the adapter', () => {
            const adapterDir = createAdapter(path.join(root, 'resolve'), WORKING_PLUGIN);
            assert.equal(
                resolveDockerPlugin(adapterDir),
                path.join(adapterDir, 'node_modules', '@iobroker', 'plugin-docker', 'index.js'),
            );
        });

        it('answers null for an adapter without the plugin', () => {
            const adapterDir = path.join(root, 'without', 'iobroker.plain');
            fs.mkdirpSync(adapterDir);
            assert.equal(resolveDockerPlugin(adapterDir), null);
        });
    });

    const REMOTE = { host: '192.168.1.5', port: 2376, protocol: 'https', ca: 'CA', cert: 'CERT', key: 'KEY' };
    const SYSTEM_DOCKER = {
        _id: 'system.docker',
        type: 'config',
        common: { name: 'Docker' },
        native: { hosts: { local: { host: '127.0.0.1', port: 2375 }, nas: REMOTE } },
    } as unknown as ioBroker.Object;

    describe('readDockerApiSource', () => {
        /**
         * Read the source for an adapter with this plugin config
         *
         * @param dir directory to create the adapter in
         * @param docker `common.plugins.docker` of the io-package.json, undefined for none
         * @param objects the objects DB
         * @returns the source and the objects that were read
         */
        async function read(
            dir: string,
            docker: Record<string, unknown> | undefined,
            objects: Record<string, unknown> = {},
        ): Promise<{ source: unknown; asked: string[] }> {
            const adapterDir = path.join(root, 'api', dir);
            fs.mkdirpSync(adapterDir);
            fs.writeJSONSync(path.join(adapterDir, 'io-package.json'), {
                common: { name: 'fake', ...(docker ? { plugins: { docker } } : {}) },
            });
            const asked: string[] = [];
            const source = await readDockerApiSource({
                adapterDir,
                instance: 'fake.1',
                getObject: id => {
                    asked.push(id);
                    return Promise.resolve((objects[id] as ioBroker.Object | undefined) ?? null);
                },
            });
            return { source, asked };
        }

        it('reads nothing more for an adapter that names no connection: the Docker of this host', async () => {
            for (const docker of [undefined, { iobDockerComposeFiles: ['compose.yaml'] }, { iobDockerApi: '' }]) {
                const { source, asked } = await read('none', docker);
                assert.equal(source, undefined);
                assert.deepEqual(asked, []);
            }
        });

        it('reads the config of the instance and system.docker, for the plugin to resolve the connection', async () => {
            const native = { dockerApi: 'nas' };
            const { source, asked } = await read(
                'template',
                { iobDockerApi: '${config.dockerApi}' },
                { 'system.adapter.fake.1': { native }, 'system.docker': SYSTEM_DOCKER },
            );
            // the template is not resolved here, that is up to the plugin
            assert.deepEqual(source, {
                iobDockerApi: '${config.dockerApi}',
                instanceConfig: native,
                systemDocker: SYSTEM_DOCKER,
            });
            assert.deepEqual(asked.sort(), ['system.adapter.fake.1', 'system.docker']);
        });

        it('passes on that there is no system.docker', async () => {
            const { source } = await read('own', { iobDockerApi: REMOTE }, { 'system.adapter.fake.1': { native: {} } });
            assert.deepEqual(source, { iobDockerApi: REMOTE, instanceConfig: {}, systemDocker: null });
        });

        it('refuses an instance that does not exist', async () => {
            await assert.rejects(read('no-instance', { iobDockerApi: 'nas' }), /Cannot find instance object/);
        });

        it('refuses an adapter without io-package.json', async () => {
            const adapterDir = path.join(root, 'api', 'no-io-package');
            fs.mkdirpSync(adapterDir);
            await assert.rejects(
                readDockerApiSource({ adapterDir, instance: 'fake.0', getObject: () => Promise.resolve(null) }),
                /Cannot read io-package.json/,
            );
        });
    });

    describe('resolveDockerApiAsWritten - for plugins before 1.3.0', () => {
        /**
         * Find the connection
         *
         * @param iobDockerApi as in the plugin config
         * @param systemDocker the object `system.docker`, null for none
         * @returns the connection and what was logged
         */
        function resolve(
            iobDockerApi: unknown,
            systemDocker: Partial<ioBroker.Object> | null = SYSTEM_DOCKER,
        ): { dockerApi: unknown; logs: string[] } {
            const logs: string[] = [];
            const dockerApi = resolveDockerApiAsWritten(
                { iobDockerApi, instanceConfig: { dockerApi: 'nas' }, systemDocker: systemDocker as ioBroker.Object },
                text => logs.push(text),
            );
            return { dockerApi, logs };
        }

        it('takes the connection of system.docker that the adapter names', () => {
            assert.deepEqual(resolve('nas').dockerApi, REMOTE);
        });

        it('takes a connection that the adapter defines itself', () => {
            assert.deepEqual(resolve(REMOTE, null).dockerApi, REMOTE);
        });

        it('is the Docker of this host, as for the instance, if system.docker does not define the name', () => {
            for (const systemDocker of [null, { native: {} }, { native: { hosts: { other: REMOTE } } }]) {
                const { dockerApi, logs } = resolve('nas', systemDocker);
                assert.equal(dockerApi, undefined);
                assert.match(logs.join(), /"nas" .* not defined in system.docker, the Docker of this host is checked/);
            }
            // nothing from the prototype of the hosts
            for (const name of ['__proto__', 'constructor', 'toString']) {
                assert.equal(resolve(name, { native: { hosts: {} } }).dockerApi, undefined, name);
            }
        });

        it('looks up a template as written, as these plugins do', () => {
            const { dockerApi, logs } = resolve('${config.dockerApi}');
            assert.equal(dockerApi, undefined);
            assert.match(logs.join(), /"\$\{config.dockerApi\}" .* not defined in system.docker/);
        });
    });

    describe('checkDocker', function () {
        // every check starts a node process, which loads the TypeScript sources here
        this.timeout(20_000);

        it('answers with what the plugin found, from a quiet manager for the instance', async () => {
            const pluginPath = resolveDockerPlugin(createAdapter(path.join(root, 'working'), WORKING_PLUGIN))!;
            const logs: string[] = [];

            const result = await checkDocker({ pluginPath, namespace: 'fake.0', log: text => logs.push(text) });

            assert.deepEqual(result, {
                version: 'Docker version 28.3.2',
                daemonRunning: true,
                removeSupported: true,
                driver: 'socket',
            });
            assert.deepEqual(logs, ['Checks the Docker of this host', 'probed for fake.0, quiet: true']);
        });

        it('lets the plugin find the Docker connection of the instance, as when it starts (1.3.0 and later)', async () => {
            const callFile = path.join(root, 'resolving.call');
            const code = `${REPORTING_PLUGIN}
module.exports.resolveDockerApi = async options => {
    const systemDocker = await options.getSystemDocker();
    const { iobDockerApi, instanceConfig, instance } = options;
    require('node:fs').writeFileSync(
        ${JSON.stringify(callFile)},
        JSON.stringify({ iobDockerApi, instanceConfig, instance, systemDocker }),
    );
    options.log.warn('resolved for instance ' + instance);
    return systemDocker.native.hosts[instanceConfig.dockerApi];
};
`;
            const pluginPath = resolveDockerPlugin(createAdapter(path.join(root, 'resolving'), code))!;
            const dockerApiSource = {
                iobDockerApi: '${config.dockerApi}',
                instanceConfig: { dockerApi: 'nas' },
                systemDocker: SYSTEM_DOCKER,
            };
            const logs: string[] = [];

            const result = await checkDocker({
                pluginPath,
                namespace: 'fake.3',
                dockerApiSource,
                log: text => logs.push(text),
            });

            // the key reached the manager, but not the command line
            assert.deepEqual(result, { version: '192.168.1.5:2376 KEY', daemonRunning: true, driver: 'https' });
            assert.deepEqual(JSON.parse(fs.readFileSync(callFile, 'utf8')), { ...dockerApiSource, instance: 3 });
            // what the plugin warned, and the address - not the key
            assert.deepEqual(logs, ['resolved for instance 3', 'Checks the Docker API https://192.168.1.5:2376']);
        });

        it('looks up the connection itself for a plugin that cannot (before 1.3.0), as such a plugin does', async () => {
            const pluginPath = resolveDockerPlugin(createAdapter(path.join(root, 'remote'), REPORTING_PLUGIN))!;
            const logs: string[] = [];

            const named = await checkDocker({
                pluginPath,
                namespace: 'fake.0',
                dockerApiSource: { iobDockerApi: 'nas', instanceConfig: {}, systemDocker: SYSTEM_DOCKER },
                log: text => logs.push(text),
            });
            assert.deepEqual(named, { version: '192.168.1.5:2376 KEY', daemonRunning: true, driver: 'https' });
            assert.ok(logs.includes('Checks the Docker API https://192.168.1.5:2376'), logs.join('\n'));
            assert.ok(!logs.join('\n').includes('KEY'), logs.join('\n'));

            const template = await checkDocker({
                pluginPath,
                namespace: 'fake.0',
                dockerApiSource: {
                    iobDockerApi: '${config.dockerApi}',
                    instanceConfig: { dockerApi: 'nas' },
                    systemDocker: SYSTEM_DOCKER,
                },
            });
            assert.deepEqual(template, { version: 'local', daemonRunning: true, driver: 'socket' });

            const local = await checkDocker({ pluginPath, namespace: 'fake.0' });
            assert.deepEqual(local, { version: 'local', daemonRunning: true, driver: 'socket' });
        });

        it('passes on that Docker is not running', async () => {
            const code = WORKING_PLUGIN.replace(
                "{ version: 'Docker version 28.3.2', daemonRunning: true, removeSupported: true, driver: 'socket' }",
                "{ version: '', daemonRunning: false, removeSupported: true, driver: 'cli' }",
            );
            const pluginPath = resolveDockerPlugin(createAdapter(path.join(root, 'stopped'), code))!;

            const result = await checkDocker({ pluginPath, namespace: 'fake.0' });

            assert.equal(result.daemonRunning, false);
        });

        it('refuses a plugin without DockerManager', async () => {
            const pluginPath = resolveDockerPlugin(
                createAdapter(path.join(root, 'old'), 'module.exports = class {};'),
            )!;

            await assert.rejects(checkDocker({ pluginPath, namespace: 'fake.0' }), /cannot check Docker/);
        });

        it('reports a plugin that cannot be loaded', async () => {
            const pluginPath = resolveDockerPlugin(
                createAdapter(path.join(root, 'broken'), "throw new Error('dockerode is missing');"),
            )!;

            await assert.rejects(checkDocker({ pluginPath, namespace: 'fake.0' }), /dockerode is missing/);
        });

        it('reports a failing check', async () => {
            const code = WORKING_PLUGIN.replace(
                'async getDockerDaemonInfo() {',
                "async getDockerDaemonInfo() { throw new Error('permission denied');",
            );
            const pluginPath = resolveDockerPlugin(createAdapter(path.join(root, 'failing'), code))!;

            await assert.rejects(checkDocker({ pluginPath, namespace: 'fake.0' }), /permission denied/);
        });

        it('kills a check that does not finish', async () => {
            const code = WORKING_PLUGIN.replace(
                'async getDockerDaemonInfo() {',
                'async getDockerDaemonInfo() { setInterval(() => {}, 1000); await new Promise(() => {});',
            );
            const pluginPath = resolveDockerPlugin(createAdapter(path.join(root, 'hanging'), code))!;

            await assert.rejects(checkDocker({ pluginPath, namespace: 'fake.0', timeoutMs: 3000 }), /did not finish/);
        });

        /**
         * A plugin that notes every check in a file and needs a while for it
         *
         * @param dir directory to create the adapter in
         * @param fail whether the check fails
         * @returns the main file of the plugin and the file with one line per check
         */
        function createCountingPlugin(dir: string, fail = false): { pluginPath: string; countFile: string } {
            const countFile = path.join(root, `${dir}.count`);
            const code = WORKING_PLUGIN.replace(
                'async getDockerDaemonInfo() {',
                `async getDockerDaemonInfo() {
                    require('node:fs').appendFileSync(${JSON.stringify(countFile)}, 'check\\n');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    ${fail ? "throw new Error('permission denied');" : ''}`,
            );
            return { pluginPath: resolveDockerPlugin(createAdapter(path.join(root, dir), code))!, countFile };
        }

        /**
         * How many checks the plugin did
         *
         * @param countFile file of the plugin, see createCountingPlugin
         */
        function countChecks(countFile: string): number {
            return fs.existsSync(countFile) ? fs.readFileSync(countFile, 'utf8').split('\n').filter(Boolean).length : 0;
        }

        it('lets a second caller wait for the running check of the same plugin, and checks again afterwards', async () => {
            const { pluginPath, countFile } = createCountingPlugin('shared');
            const firstLogs: string[] = [];
            const secondLogs: string[] = [];

            const [first, second] = await Promise.all([
                checkDocker({ pluginPath, namespace: 'fake.0', log: text => firstLogs.push(text) }),
                checkDocker({ pluginPath, namespace: 'fake.1', log: text => secondLogs.push(text) }),
            ]);

            assert.equal(countChecks(countFile), 1);
            assert.deepEqual(second, first);
            assert.equal(first.daemonRunning, true);
            // the plugin logged once, to the caller that started the check
            assert.deepEqual(firstLogs, ['Checks the Docker of this host', 'probed for fake.0, quiet: true']);
            assert.deepEqual(secondLogs, []);

            // the check is over, so the next question is checked anew
            await checkDocker({ pluginPath, namespace: 'fake.0' });
            assert.equal(countChecks(countFile), 2);
        });

        it('passes a failing check on to every caller that waited for it', async () => {
            const { pluginPath, countFile } = createCountingPlugin('shared-failing', true);

            const answers = await Promise.allSettled([
                checkDocker({ pluginPath, namespace: 'fake.0' }),
                checkDocker({ pluginPath, namespace: 'fake.0' }),
            ]);

            assert.equal(countChecks(countFile), 1);
            for (const answer of answers) {
                assert.equal(answer.status, 'rejected');
                // narrowed by the strict assert above
                assert.match(answer.reason.message, /permission denied/);
            }

            await assert.rejects(checkDocker({ pluginPath, namespace: 'fake.0' }), /permission denied/);
            assert.equal(countChecks(countFile), 2);
        });

        it('checks different plugins each on its own', async () => {
            const a = createCountingPlugin('own-a');
            const b = createCountingPlugin('own-b');

            await Promise.all([
                checkDocker({ pluginPath: a.pluginPath, namespace: 'fake.0' }),
                checkDocker({ pluginPath: b.pluginPath, namespace: 'fake.0' }),
            ]);

            assert.equal(countChecks(a.countFile), 1);
            assert.equal(countChecks(b.countFile), 1);
        });

        it('checks different Docker connections of the same plugin each on its own', async () => {
            const { pluginPath, countFile } = createCountingPlugin('per-connection');
            const nas = { iobDockerApi: 'nas', instanceConfig: {}, systemDocker: SYSTEM_DOCKER };
            const own = { iobDockerApi: REMOTE, instanceConfig: {}, systemDocker: SYSTEM_DOCKER };

            await Promise.all([
                checkDocker({ pluginPath, namespace: 'fake.0' }),
                checkDocker({ pluginPath, namespace: 'fake.1' }),
                checkDocker({ pluginPath, namespace: 'fake.0', dockerApiSource: nas }),
                checkDocker({ pluginPath, namespace: 'fake.0', dockerApiSource: structuredClone(nas) }),
                checkDocker({ pluginPath, namespace: 'fake.0', dockerApiSource: own }),
                // a template like `${instance}` may name another connection for every instance
                checkDocker({ pluginPath, namespace: 'fake.1', dockerApiSource: structuredClone(nas) }),
            ]);

            // the Docker of this host once for both instances, the NAS once per instance, the own connection once
            assert.equal(countChecks(countFile), 4);
        });

        /**
         * A plugin that starts a process through the shell, as it runs `docker ps`, and then hangs
         *
         * @param dir directory to create the adapter in
         * @returns the main file of the plugin and the file the started process writes its pid to
         */
        function createPluginThatStartsAProcess(dir: string): { pluginPath: string; pidFile: string } {
            const pidFile = path.join(root, `${dir}.pid`);
            const script =
                "require('fs').writeFileSync(process.argv[1], String(process.pid)); setInterval(() => {}, 1000)";
            const command = `"${process.execPath}" -e "${script}" "${pidFile}"`;
            const code = WORKING_PLUGIN.replace(
                'async getDockerDaemonInfo() {',
                `async getDockerDaemonInfo() {
                    require('node:child_process').exec(${JSON.stringify(command)});
                    await new Promise(() => {});`,
            );
            return { pluginPath: resolveDockerPlugin(createAdapter(path.join(root, dir), code))!, pidFile };
        }

        /**
         * Whether a process runs
         *
         * @param pid the process
         */
        function isRunning(pid: number): boolean {
            try {
                process.kill(pid, 0);
                return true;
            } catch {
                return false;
            }
        }

        /**
         * Wait until a condition is met
         *
         * @param condition the condition
         * @param what what is waited for, for the error
         * @param timeoutMs how long to wait
         */
        async function waitFor(condition: () => boolean, what: string, timeoutMs = 5000): Promise<void> {
            const end = Date.now() + timeoutMs;
            while (!condition()) {
                if (Date.now() > end) {
                    throw new Error(`Waited ${timeoutMs} ms in vain for: ${what}`);
                }
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        /**
         * The pid the process started by the plugin wrote
         *
         * @param pidFile see createPluginThatStartsAProcess
         */
        async function readStartedPid(pidFile: string): Promise<number> {
            await waitFor(
                () => fs.existsSync(pidFile) && !!fs.readFileSync(pidFile, 'utf8'),
                'the plugin started its process',
                10_000,
            );
            return Number(fs.readFileSync(pidFile, 'utf8'));
        }

        it('kills what the plugin started, together with a check that does not finish', async () => {
            const { pluginPath, pidFile } = createPluginThatStartsAProcess('tree');
            let started: number | undefined;
            try {
                await assert.rejects(
                    checkDocker({ pluginPath, namespace: 'fake.0', timeoutMs: 5000 }),
                    /did not finish/,
                );
                started = await readStartedPid(pidFile);
                await waitFor(() => !isRunning(started!), 'the process the plugin started is killed');
            } finally {
                if (started && isRunning(started)) {
                    process.kill(started, 'SIGKILL');
                }
            }
        });

        it('ends the check, with what the plugin started, when the controller goes away', async () => {
            const { pluginPath, pidFile } = createPluginThatStartsAProcess('orphan');
            const child = forkCheck({ pluginPath, namespace: 'fake.0' });
            let started: number | undefined;
            try {
                started = await readStartedPid(pidFile);
                // what the child sees when the controller ends
                child.disconnect();
                await waitFor(() => child.exitCode !== null || child.signalCode !== null, 'the check ends');
                await waitFor(() => !isRunning(started!), 'the process the plugin started is killed');
            } finally {
                child.kill('SIGKILL');
                if (started && isRunning(started)) {
                    process.kill(started, 'SIGKILL');
                }
            }
        });
    });
});
