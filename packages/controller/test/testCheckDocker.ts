import assert from 'node:assert/strict';
import path from 'node:path';
import os from 'node:os';
import fs from 'fs-extra';
import { checkDocker, getDockerCheckInstance, resolveDockerPlugin } from '../src/lib/checkDocker.js';

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

describe('checkDocker', () => {
    let root: string;

    before(() => {
        root = fs.mkdtempSync(path.join(os.tmpdir(), 'iob-check-docker-'));
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
            assert.deepEqual(logs, ['probed for fake.0, quiet: true']);
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
            assert.deepEqual(firstLogs, ['probed for fake.0, quiet: true']);
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
    });
});
