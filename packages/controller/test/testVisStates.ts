import { calcProjects } from '../src/lib/vis/states.js';
import assert from 'node:assert/strict';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

/**
 * A stand-in for the objects database that holds one vis project per given name
 *
 * @param projectNames - the names of the project directories
 */
function objectsWithProjects(projectNames: string[]): ObjectsClient {
    const views = JSON.stringify({ view1: { widgets: { w000001: { data: { oid: '0_userdata.0.test' } } } } });
    return {
        readDirAsync: () => Promise.resolve(projectNames.map(file => ({ file, isDir: true }))),
        fileExists: () => Promise.resolve(true),
        readFile: () => Promise.resolve({ file: views }),
    } as unknown as ObjectsClient;
}

describe('test vis data point count', () => {
    it('names the state of a project with spaces and dots replaced, other characters kept', async () => {
        const result = await calcProjects({
            objects: objectsWithProjects(['New project', 'settings', 'my.vis', 'tab\tname', 'main']),
            instance: 0,
            visAdapter: 'vis-2',
        });

        assert.deepEqual(
            result.map(entry => entry.id),
            [
                'vis-2.0.datapoints.New_project',
                'vis-2.0.datapoints.settings',
                'vis-2.0.datapoints.my_vis',
                'vis-2.0.datapoints.tab_name',
                'vis-2.0.datapoints.main',
                'vis-2.0.datapoints.total',
            ],
        );
        assert.equal(result.at(-1)?.val, 5);
    });

    it('reports a total of 0 without projects', async () => {
        const result = await calcProjects({ objects: objectsWithProjects([]), instance: 0, visAdapter: 'vis' });

        assert.deepEqual(result, [{ id: 'vis.0.datapoints.total', val: 0 }]);
    });
});
