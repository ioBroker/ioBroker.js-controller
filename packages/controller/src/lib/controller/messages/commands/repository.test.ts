import assert from 'node:assert/strict';
import sinon from 'sinon';
import { SYSTEM_CONFIG_ID, SYSTEM_REPOSITORIES_ID } from '@iobroker/js-controller-common-db/constants';
import {
    createRepositoryCommands,
    type RepositoryCommandsDeps,
} from '@/lib/controller/messages/commands/repository.js';
import { silentLogger } from '@/lib/controller/testing.test-utils.js';

interface Setup {
    commands: ReturnType<typeof createRepositoryCommands>;
    sendTo: sinon.SinonStub;
    setObject: sinon.SinonStub;
    autoUpgradeAdapters: sinon.SinonStub;
}

/**
 * The repository commands with an objects database that holds the given repositories
 *
 * The cached catalogues carry a fresh time stamp and are not forced, so nothing is downloaded.
 *
 * @param activeRepo `common.activeRepo` of `system.config`
 * @param repositories `native.repositories` of `system.repositories`
 */
function setup(activeRepo: string | string[], repositories: Record<string, unknown>): Setup {
    const sendTo = sinon.stub();
    const setObject = sinon.stub().resolves();
    const autoUpgradeAdapters = sinon.stub().resolves();

    const objects = {
        getObject: (id: string) => Promise.resolve(id === SYSTEM_CONFIG_ID ? { common: { activeRepo } } : null),
        getObjectAsync: (id: string) =>
            Promise.resolve(id === SYSTEM_REPOSITORIES_ID ? structuredClone({ native: { repositories } }) : null),
        setObject,
    };

    const deps = {
        objects,
        messages: { sendTo },
        diag: { tryStartDiagSend: () => false },
        systemChecks: {
            checkAvailableDockerUpdate: sinon.stub().resolves(),
            listUpdatableOsPackages: sinon.stub().resolves(),
            checkRebootRequired: sinon.stub().resolves(),
            disableBlocklistedInstances: sinon.stub().resolves(),
            autoUpgradeAdapters,
        },
        logger: silentLogger(),
        hostLogPrefix: 'host.testhost',
        requestedRepoUpdates: [],
    } as unknown as RepositoryCommandsDeps;

    return { commands: createRepositoryCommands(deps), sendTo, setObject, autoUpgradeAdapters };
}

/**
 * A cached catalogue that is not due for an update
 *
 * @param adapters the adapters the catalogue lists
 */
function cached(adapters: Record<string, unknown>): Record<string, unknown> {
    return { link: 'https://example.com/sources.json', json: adapters, hash: 'abc', time: new Date().toISOString() };
}

/**
 * A received `getRepository` message
 *
 * @param message what the requester asks for
 */
function request(message?: unknown): ioBroker.SendableMessage {
    return {
        command: 'getRepository',
        message,
        from: 'system.adapter.admin.0',
        callback: { id: 1 },
    } as unknown as ioBroker.SendableMessage;
}

describe('getRepository and the catalogues of inactive repositories', () => {
    it('drops the catalogue of an inactive repository, keeps its entry and does not start an auto upgrade', async () => {
        const { commands, sendTo, setObject, autoUpgradeAdapters } = setup('stable', {
            stable: cached({ admin: { version: '7.0.0' } }),
            beta: cached({ admin: { version: '7.1.0' } }),
        });

        await commands.getRepository(request());

        assert.deepStrictEqual(sendTo.firstCall.args[2], { admin: { version: '7.0.0' } });
        assert.strictEqual(setObject.callCount, 1);
        const [id, written] = setObject.firstCall.args;
        assert.strictEqual(id, SYSTEM_REPOSITORIES_ID);
        assert.deepStrictEqual(written.native.repositories.beta, {
            link: 'https://example.com/sources.json',
            json: null,
            hash: '',
        });
        assert.deepStrictEqual(written.native.repositories.stable.json, { admin: { version: '7.0.0' } });
        // the catalogue of the active repository did not change, so there is nothing to upgrade to
        assert.strictEqual(autoUpgradeAdapters.callCount, 0);
    });

    it('keeps every repository of a multi repository setup and a repository requested explicitly', async () => {
        const { commands, setObject } = setup(['stable', 'custom'], {
            stable: cached({ admin: { version: '7.0.0' } }),
            custom: cached({ mine: { version: '1.0.0' } }),
            beta: cached({ admin: { version: '7.1.0' } }),
        });

        await commands.getRepository(request({ repo: ['beta'] }));

        // nothing was dropped and nothing was downloaded, so the object is not written
        assert.strictEqual(setObject.callCount, 0);
    });

    it('does not write the object again once the inactive catalogues are gone', async () => {
        const { commands, setObject } = setup('stable', {
            stable: cached({ admin: { version: '7.0.0' } }),
            beta: { link: 'https://example.com/sources.json', json: null, hash: '' },
        });

        await commands.getRepository(request());

        assert.strictEqual(setObject.callCount, 0);
    });
});
