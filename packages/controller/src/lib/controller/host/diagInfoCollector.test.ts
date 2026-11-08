import assert from 'node:assert/strict';
import sinon from 'sinon';
import { DiagInfoCollector } from '@/lib/controller/host/diagInfoCollector.js';
import { silentLogger, testConfig } from '@/lib/controller/testing.test-utils.js';

const INTERVAL = 30_000;

describe('DiagInfoCollector.tryStartDiagSend', () => {
    it('allows the first send', () => {
        const diag = new DiagInfoCollector({
            objects: {} as any,
            states: {} as any,
            config: testConfig(),
            logger: silentLogger(),
            hostLogPrefix: 'host.testhost',
            hostMeta: {} as any,
        });

        assert.equal(diag.tryStartDiagSend(INTERVAL), true);
    });

    it('blocks a second send within the interval', () => {
        const clock = sinon.useFakeTimers();
        try {
            const diag = new DiagInfoCollector({
                objects: {} as any,
                states: {} as any,
                config: testConfig(),
                logger: silentLogger(),
                hostLogPrefix: 'host.testhost',
                hostMeta: {} as any,
            });

            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
            clock.tick(INTERVAL - 1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), false);
            // exactly at the interval it is still blocked, only a later call passes
            clock.tick(1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), false);
        } finally {
            clock.restore();
        }
    });

    it('allows the next send once the interval has passed', () => {
        const clock = sinon.useFakeTimers();
        try {
            const diag = new DiagInfoCollector({
                objects: {} as any,
                states: {} as any,
                config: testConfig(),
                logger: silentLogger(),
                hostLogPrefix: 'host.testhost',
                hostMeta: {} as any,
            });

            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
            clock.tick(INTERVAL + 1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
        } finally {
            clock.restore();
        }
    });

    it('restarts the interval on every accepted send', () => {
        const clock = sinon.useFakeTimers();
        try {
            const diag = new DiagInfoCollector({
                objects: {} as any,
                states: {} as any,
                config: testConfig(),
                logger: silentLogger(),
                hostLogPrefix: 'host.testhost',
                hostMeta: {} as any,
            });

            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
            clock.tick(INTERVAL + 1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
            // the second send reset the timestamp, so we are blocked again
            clock.tick(1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), false);
        } finally {
            clock.restore();
        }
    });
});

describe('DiagInfoCollector.collectDiagInfo', () => {
    it('answers with null for a diagnostics type which sends nothing', async () => {
        const diag = new DiagInfoCollector({
            objects: {} as any,
            states: {} as any,
            config: testConfig(),
            logger: silentLogger(),
            hostLogPrefix: 'host.testhost',
            hostMeta: {} as any,
        });

        assert.equal(await diag.collectDiagInfo('none'), null);
    });
});

describe('DiagInfoCollector: data point counts of vis projects', () => {
    const views = JSON.stringify({ view1: { widgets: { w000001: { data: { oid: '0_userdata.0.test' } } } } });

    /**
     * A collector on stand-ins for the databases with vis-2 installed
     *
     * @param projects the names of the project directories of vis-2.0
     * @param stateIds the IDs of the existing states below vis-2.0.datapoints and their common.name
     */
    function setup(
        projects: string[],
        stateIds: Record<string, string>,
    ): {
        diag: DiagInfoCollector;
        deletedObjects: string[];
        deletedStates: string[];
        written: string[];
    } {
        const deletedObjects: string[] = [];
        const deletedStates: string[] = [];
        const written: string[] = [];
        const objects = {
            getObject: () => Promise.resolve({ common: { language: 'en' } }),
            getObjectAsync: () => Promise.resolve({ native: { uuid: 'test' } }),
            getObjectViewAsync: (_design: string, search: string, params: { startkey: string; endkey: string }) => {
                if (search === 'adapter') {
                    return Promise.resolve({
                        rows: [{ id: 'system.adapter.vis-2', value: { common: { name: 'vis-2', version: '2.0.0' } } }],
                    });
                }
                if (search === 'state') {
                    return Promise.resolve({
                        rows: Object.entries(stateIds)
                            .filter(([id]) => id >= params.startkey && id <= params.endkey)
                            .map(([id, name]) => ({ id, value: { _id: id, type: 'state', common: { name } } })),
                    });
                }
                return Promise.resolve({ rows: [] });
            },
            readDirAsync: () => Promise.resolve(projects.map(file => ({ file, isDir: true }))),
            fileExists: () => Promise.resolve(true),
            readFile: () => Promise.resolve({ file: views }),
            delObjectAsync: (id: string) => {
                deletedObjects.push(id);
                return Promise.resolve();
            },
        };
        const states = {
            delState: (id: string) => {
                deletedStates.push(id);
                return Promise.resolve();
            },
        };
        const hostMeta = {
            extendObjects: (tasks: { _id: string }[]) => {
                written.push(...tasks.map(task => task._id));
                return Promise.resolve();
            },
        };
        const diag = new DiagInfoCollector({
            objects: objects as any,
            states: states as any,
            config: testConfig(),
            logger: silentLogger(),
            hostLogPrefix: 'host.testhost',
            hostMeta: hostMeta as any,
        });
        return { diag, deletedObjects, deletedStates, written };
    }

    it('deletes the counts of former projects and of the former names, keeps the others', async () => {
        const { diag, deletedObjects, deletedStates, written } = setup(['test', 'New project'], {
            'vis-2.0.datapoints.test': 'Datapoints count',
            'vis-2.0.datapoints.New_project': 'Datapoints count',
            'vis-2.0.datapoints.total': 'Datapoints count',
            // named by the former rule, which replaced the "s" instead of the spaces
            'vis-2.0.datapoints.te_t': 'Datapoints count',
            'vis-2.0.datapoints.New project': 'Datapoints count',
            // a project that was deleted
            'vis-2.0.datapoints.old': 'Datapoints count',
            // not created for the count
            'vis-2.0.datapoints.mine': 'Something of the user',
        });

        const result = await diag.collectDiagInfo('normal');

        assert.equal((result as Record<string, any>)['vis-2'], 2);
        assert.deepEqual(written, [
            'vis-2.0.datapoints.test',
            'vis-2.0.datapoints.New_project',
            'vis-2.0.datapoints.total',
        ]);
        const stale = ['vis-2.0.datapoints.te_t', 'vis-2.0.datapoints.New project', 'vis-2.0.datapoints.old'];
        assert.deepEqual(deletedObjects.sort(), [...stale].sort());
        assert.deepEqual(deletedStates.sort(), [...stale].sort());
    });

    it('deletes the counts of all projects when there is none any more', async () => {
        const { diag, deletedObjects } = setup([], {
            'vis-2.0.datapoints.total': 'Datapoints count',
            'vis-2.0.datapoints.old': 'Datapoints count',
        });

        await diag.collectDiagInfo('normal');

        assert.deepEqual(deletedObjects, ['vis-2.0.datapoints.old']);
    });
});
