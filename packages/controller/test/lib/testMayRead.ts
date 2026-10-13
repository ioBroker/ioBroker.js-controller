import type { TestContext } from '../_Types.js';
import assert from 'node:assert/strict';
import { PERMISSIONS } from './permissions.js';

/**
 * `mayRead` answers the question a socket server has to ask before it hands an event to a
 * connection: may this user see this at all? The answer has to be the one the database itself would
 * give, which is why these tests go through real users, real groups and real ACLs rather than
 * through a mock of them.
 *
 * @param it The mocha test function to register the tests on
 * @param context The shared test context (adapter, states and objects clients)
 */
export function register(it: Mocha.TestFunction, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} adapter: mayRead `;
    const prefix = `${context.adapterShortName}.0.mayRead`;
    const READER = 'system.user.reader';

    /** Everyone may read it */
    const openId = `${prefix}.open`;
    /** Only its owner may read it */
    const ownerOnlyId = `${prefix}.ownerOnly`;
    /** No object was ever created for it - the database lets anybody read such a state */
    const orphanId = `${prefix}.orphan`;

    it(`${testName}prepares a user, a group and two states`, async () => {
        await context.objects.setObject('system.group.readers', {
            _id: 'system.group.readers',
            type: 'group',
            common: {
                name: 'Readers',
                members: [READER],
                dontDelete: true,
                acl: {
                    object: { list: true, read: true, write: false, delete: false },
                    state: { list: true, read: true, write: false, delete: false, create: false },
                    users: { list: false, read: false, write: false, create: false, delete: false },
                    other: { execute: false, http: false, sendto: false },
                    file: { list: true, read: true, write: false, create: false, delete: false },
                },
            },
            native: {},
            acl: {
                object: PERMISSIONS['0664'],
                owner: 'system.user.admin',
                ownerGroup: 'system.group.administrator',
            },
        } as any);

        await context.objects.setObject(READER, {
            _id: READER,
            type: 'user',
            common: { name: 'reader', password: '', enabled: true },
            native: {},
            acl: {
                object: PERMISSIONS['0664'],
                owner: 'system.user.admin',
                ownerGroup: 'system.group.administrator',
            },
        } as any);

        for (const [id, permission] of [
            [openId, PERMISSIONS['0666']],
            [ownerOnlyId, PERMISSIONS['0600']],
        ] as const) {
            await context.objects.setObject(id, {
                _id: id,
                type: 'state',
                common: { name: id, type: 'number', role: 'state', read: true, write: true },
                native: {},
                acl: {
                    object: permission,
                    state: permission,
                    owner: 'system.user.admin',
                    ownerGroup: 'system.group.administrator',
                },
            } as any);
        }
    });

    it(`${testName}lets an administrator read what is not his`, async () => {
        // the administrator group is not restricted by the ACL of a single object
        assert.equal(
            await context.adapter.mayRead({ user: 'system.user.admin', type: 'state', id: ownerOnlyId }),
            true,
        );
        assert.equal(
            await context.adapter.mayRead({ user: 'system.user.admin', type: 'object', id: ownerOnlyId }),
            true,
        );
    });

    it(`${testName}answers for a state along its ACL`, async () => {
        assert.equal(await context.adapter.mayRead({ user: READER, type: 'state', id: openId }), true);
        assert.equal(await context.adapter.mayRead({ user: READER, type: 'state', id: ownerOnlyId }), false);
    });

    it(`${testName}answers for the object itself as well`, async () => {
        assert.equal(await context.adapter.mayRead({ user: READER, type: 'object', id: openId }), true);
        assert.equal(await context.adapter.mayRead({ user: READER, type: 'object', id: ownerOnlyId }), false);
    });

    it(`${testName}lets a state without an object through, as the database does`, async () => {
        // `getState` of such a state works for anybody, so an event about it may not be held back
        assert.equal(await context.adapter.mayRead({ user: READER, type: 'state', id: orphanId }), true);
    });

    it(`${testName}answers for a file along its mode`, async () => {
        // files live under an object of type `meta`, so one has to exist before anything is written
        const filesId = 'mayReadFiles.0';
        const fileName = 'mayRead/file.json';

        await context.adapter.setForeignObject(filesId, {
            type: 'meta',
            common: { name: 'Files of the mayRead tests', type: 'meta.user' },
            native: {},
        });

        await context.adapter.writeFileAsync(filesId, fileName, '{}');

        assert.equal(
            await context.adapter.mayRead({ user: READER, type: 'file', id: filesId, fileName }),
            true,
            'a file that was just written is readable',
        );

        // now only its owner may have it
        await context.adapter.chmodFileAsync(filesId, fileName, { mode: PERMISSIONS['0600'] });

        assert.equal(await context.adapter.mayRead({ user: READER, type: 'file', id: filesId, fileName }), false);
    });
}
