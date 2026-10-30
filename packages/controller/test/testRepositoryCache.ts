import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { clearInactiveRepositoryCaches } from '@iobroker/js-controller-common-db/tools';
import { Repo, type CLIRepoOptions } from '../../cli/build/esm/lib/setup/setupRepo.js';

describe('repository cache retention', () => {
    let directory: string;

    beforeEach(() => {
        directory = fs.mkdtempSync(path.join(os.tmpdir(), 'iobroker-repo-cache-'));
        fs.writeFileSync(path.join(directory, 'repository.json'), '{}');
    });

    afterEach(() => {
        fs.rmSync(directory, { recursive: true, force: true });
    });

    for (const activeRepo of ['custom', ['custom', 'beta']]) {
        it(`evicts inactive catalogues when refreshing ${JSON.stringify(activeRepo)}`, async () => {
            const link = path.join(directory, 'repository.json');
            let repositories = {
                _id: 'system.repositories',
                type: 'config',
                common: { name: 'System repositories' },
                native: {
                    repositories: {
                        stable: { link, json: { old: { version: '1.0.0' } }, hash: 'old', time: 'old' },
                        custom: { link, json: {}, hash: 'custom' },
                        beta: { link, json: {}, hash: 'beta' },
                    },
                },
            } as unknown as ioBroker.RepositoryObject;
            const objects = {
                getObject: (id: string) =>
                    Promise.resolve(
                        structuredClone(id === 'system.config' ? { common: { activeRepo } } : repositories),
                    ),
                setObject: (id: string, value: ioBroker.RepositoryObject) => {
                    assert.equal(id, 'system.repositories');
                    repositories = structuredClone(value);
                    return Promise.resolve();
                },
                getObjectViewAsync: () => Promise.resolve({ rows: [] }),
            };
            const repo = new Repo({ objects, states: {} } as unknown as CLIRepoOptions);

            await repo.showRepo('', {});

            const cached = repositories.native.repositories;
            assert.equal(cached.stable.json, null);
            assert.equal(cached.stable.hash, '');
            assert.equal(cached.stable.time, undefined);
            assert.equal(cached.stable.link, link);
            assert.deepEqual(cached.custom.json, {});
            assert.equal(cached.custom.hash, 'custom');
            assert.equal(cached.beta.hash, Array.isArray(activeRepo) ? 'beta' : '');
            assert.deepEqual(cached.beta.json, Array.isArray(activeRepo) ? {} : null);
        });
    }

    it('preserves explicit requests, renamed repositories, and legacy definitions', () => {
        const repositories = {
            native: {
                repositories: {
                    renamed: { link: 'custom.json', json: {}, hash: 'active' },
                    requested: { link: 'requested.json', json: {}, hash: 'requested' },
                    legacy: 'legacy.json',
                    inactive: { link: 'inactive.json', json: {}, hash: 'old', time: 'old' },
                },
            },
        } as unknown as ioBroker.RepositoryObject;
        const before = structuredClone(repositories);

        assert.equal(clearInactiveRepositoryCaches(repositories, 'renamed', ['requested']), true);
        for (const name of ['renamed', 'requested', 'legacy']) {
            assert.deepEqual(repositories.native.repositories[name], before.native.repositories[name]);
        }
        assert.deepEqual(repositories.native.repositories.inactive, { link: 'inactive.json', json: null, hash: '' });
        assert.equal(clearInactiveRepositoryCaches(repositories, 'renamed', ['requested']), false);
    });

    it('does not evict caches when the active configuration is unavailable', () => {
        const repositories = {
            native: { repositories: { stable: { link: 'stable.json', json: {}, hash: 'cached' } } },
        } as unknown as ioBroker.RepositoryObject;
        const before = structuredClone(repositories);

        assert.equal(clearInactiveRepositoryCaches(repositories, undefined), false);
        assert.deepEqual(repositories, before);
    });

    it('clears all cached data for an explicitly empty active set', () => {
        const repositories = {
            native: { repositories: { stable: { link: 'stable.json', json: null, hash: 'cached', time: 'old' } } },
        } as unknown as ioBroker.RepositoryObject;

        assert.equal(clearInactiveRepositoryCaches(repositories, []), true);
        assert.deepEqual(repositories.native.repositories.stable, { link: 'stable.json', json: null, hash: '' });
    });
});
