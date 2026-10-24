import assert from 'node:assert/strict';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import { calcProjects } from '../src/lib/vis/states.js';

/** A project with one widget bound to one state */
const project = {
    ___settings: {},
    main: {
        settings: {},
        widgets: {
            w00001: { tpl: 'tplValueString', data: { oid: 'javascript.0.test' }, style: {} },
        },
    },
};

/** Just the methods of the objects database that calcProjects uses */
function getObjects(projectNames: string[]): ObjectsClient {
    return {
        readDirAsync: () => Promise.resolve(projectNames.map(file => ({ file, isDir: true }))),
        fileExists: () => Promise.resolve(true),
        readFile: () => Promise.resolve({ file: JSON.stringify(project) }),
    } as unknown as ObjectsClient;
}

describe('test the datapoints of the vis projects', () => {
    it('names the datapoint of a project without its dots and spaces', async () => {
        const points = await calcProjects({
            objects: getObjects(['test', 'my project', 'v1.2']),
            instance: 0,
            visAdapter: 'vis-2',
        });

        assert.deepEqual(
            points.map(point => point.id),
            [
                'vis-2.0.datapoints.test',
                'vis-2.0.datapoints.my_project',
                'vis-2.0.datapoints.v1_2',
                'vis-2.0.datapoints.total',
            ],
        );
        assert.equal(points[0].val, 1);
        assert.equal(points[3].val, 3);
    });
});
