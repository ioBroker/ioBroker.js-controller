import { objectsUtils, type Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import assert from 'node:assert/strict';

/**
 * A stand-in for the objects DB that counts the reads of all users and all groups and answers
 * them a little later, like a large database does.
 *
 * @param members the members of the administrator group
 */
function countingObjects(members: ioBroker.ObjectIDs.User[]): {
    objects: ObjectsInRedisClient;
    reads: string[];
} {
    const reads: string[] = [];
    const objects = {
        async getObjectListAsync(params: { startkey: string }) {
            reads.push(params.startkey);
            await new Promise(resolve => setTimeout(resolve, 20));
            if (params.startkey === 'system.group.') {
                return {
                    rows: [
                        {
                            id: 'system.group.administrator',
                            value: {
                                _id: 'system.group.administrator',
                                type: 'group',
                                common: { name: 'Administrator', members },
                                native: {},
                            },
                        },
                    ],
                };
            }
            return {
                rows: members.map(id => ({ id, value: { _id: id, type: 'user', common: { name: id }, native: {} } })),
            };
        },
    };
    return { objects: objects as unknown as ObjectsInRedisClient, reads };
}

describe('getUserGroupAsync', () => {
    it('reads all users and groups only once for parallel requests of an unknown user', async () => {
        // a user no other test knows, so the cache of this process cannot have it yet
        const user = `system.user.cache-test-${Date.now()}` as ioBroker.ObjectIDs.User;
        const { objects, reads } = countingObjects(['system.user.admin', user]);

        // what a restarted web adapter sees: hundreds of requests before the first answer
        const results = await Promise.all(
            Array.from({ length: 200 }, () => objectsUtils.getUserGroupAsync(objects, user)),
        );

        assert.deepEqual(reads, ['system.group.', 'system.user.'], 'one read of all groups and of all users');
        for (const [id, groups] of results) {
            assert.equal(id, user);
            assert.deepEqual(groups, ['system.group.administrator']);
        }

        // and later requests are answered from the cache
        await objectsUtils.getUserGroupAsync(objects, user);
        assert.equal(reads.length, 2);
    });
});
