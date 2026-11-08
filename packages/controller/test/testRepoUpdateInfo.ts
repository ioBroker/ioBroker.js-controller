import assert from 'node:assert/strict';
import { Repo, type CLIRepoOptions } from '@iobroker/js-controller-cli';

/** The instances a view of the system design would find, sorted as the database does */
const INSTANCE_IDS = ['system.adapter.admin-extra.0', 'system.adapter.admin.0', 'system.adapter.admin.1'];

describe('iobroker update', () => {
    it('writes the number and the list of updates to the states of the admin instances', async () => {
        const written: string[] = [];
        const objects = {
            getObjectViewAsync: (_design: string, _search: string, params: { startkey: string; endkey: string }) =>
                Promise.resolve({
                    rows: INSTANCE_IDS.filter(id => id >= params.startkey && id <= params.endkey).map(id => ({
                        id,
                        value: { type: 'instance' },
                    })),
                }),
        };
        const states = {
            setState: (id: string) => {
                written.push(id);
                return Promise.resolve();
            },
        };
        const repo = new Repo({ objects, states } as unknown as CLIRepoOptions);

        await (repo as any).updateInfo({});

        assert.deepEqual(written, [
            'admin.0.info.updatesNumber',
            'admin.0.info.updatesList',
            'admin.1.info.updatesNumber',
            'admin.1.info.updatesList',
        ]);
    });
});
