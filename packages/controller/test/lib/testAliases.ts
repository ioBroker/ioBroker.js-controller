import type { TestContext } from '../_Types.js';
import assert from 'node:assert/strict';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import { PERMISSIONS } from './permissions.js';
import { setTimeout as wait } from 'node:timers/promises';

async function prepareGroupsAndUsers(objects: ObjectsInRedisClient): Promise<void> {
    await objects.setObject('system.group.userC', {
        _id: 'system.group.userC',
        type: 'group',
        common: {
            name: 'User C',
            members: ['system.user.userC'],
            dontDelete: true,
            acl: {
                object: {
                    list: true,
                    read: true,
                    write: false,
                    delete: false,
                    create: false,
                },
                state: {
                    list: true,
                    read: true,
                    write: true,
                    create: true,
                    delete: false,
                },
                users: {
                    list: true,
                    read: true,
                    write: false,
                    create: false,
                    delete: false,
                },
                other: {
                    execute: false,
                    http: true,
                    sendto: false,
                },
                file: {
                    list: true,
                    read: true,
                    write: false,
                    create: false,
                    delete: false,
                },
            },
        },
        native: {},
    });

    await objects.setObject('system.user.userC', {
        _id: 'system.user.userC',
        common: {
            name: 'UserC',
            icon: '',
            color: '#44d8f1',
            enabled: true,
            password:
                'pbkdf2$10000$47785e10d8e468765c06b371f45981d625274dec3f8f6261b12d67320d07e7844e1e30df575f55ed3686804fbbae442ee9503c9c93fdcff4c46b8243200e1839b77fa18f769c9f71b13f12c4002e1cee03e6fa54878a2d6a9629589bd9169459989fc63abddce94690e5744e69658be43e1a9c7b38f1535eb9946a05394ee16f3724b75e0829ece04a05ef8848509d27b7944a9e064bba9341350d39d7a7e5bc4fe1980ae6da737c9e5e79e5a5a7e969825e94302c047a6054f3524b71c52acd33f2f83b1ed026c05af514da0a2e57c2267aeb10021f9503b5db02d8cc946421604f73548ceecc2a10b44be6a5b859e43e706cc86ee36b21984fc33abf9b2d66$0c4a5d538c84116846aac1c20fdc3fdd',
        },
        type: 'user',
        native: {},
        from: 'system.adapter.admin.0',
        user: 'system.user.admin',
        ts: 1534947164702,
        acl: {
            object: PERMISSIONS['0664'],
            owner: 'system.user.admin',
            ownerGroup: 'system.group.administrator',
        },
    });

    await objects.setObject('system.group.userD', {
        _id: 'system.group.userD',
        type: 'group',
        common: {
            name: 'User D',
            members: ['system.user.userD'],
            dontDelete: true,
            acl: {
                object: {
                    list: true,
                    read: true,
                    write: false,
                    delete: false,
                    create: false,
                },
                state: {
                    list: true,
                    read: true,
                    write: true,
                    create: true,
                    delete: false,
                },
                users: {
                    list: true,
                    read: true,
                    write: false,
                    create: false,
                    delete: false,
                },
                other: {
                    execute: false,
                    http: true,
                    sendto: false,
                },
                file: {
                    list: true,
                    read: true,
                    write: false,
                    create: false,
                    delete: false,
                },
            },
        },
        native: {},
    });

    await objects.setObject('system.user.userD', {
        _id: 'system.user.userD',
        common: {
            name: 'UserC',
            icon: '',
            color: '#44d8f1',
            enabled: true,
            password:
                'pbkdf2$10000$47785e10d8e468765c06b371f45981d625274dec3f8f6261b12d67320d07e7844e1e30df575f55ed3686804fbbae442ee9503c9c93fdcff4c46b8243200e1839b77fa18f769c9f71b13f12c4002e1cee03e6fa54878a2d6a9629589bd9169459989fc63abddce94690e5744e69658be43e1a9c7b38f1535eb9946a05394ee16f3724b75e0829ece04a05ef8848509d27b7944a9e064bba9341350d39d7a7e5bc4fe1980ae6da737c9e5e79e5a5a7e969825e94302c047a6054f3524b71c52acd33f2f83b1ed026c05af514da0a2e57c2267aeb10021f9503b5db02d8cc946421604f73548ceecc2a10b44be6a5b859e43e706cc86ee36b21984fc33abf9b2d66$0c4a5d538c84116846aac1c20fdc3fdd',
        },
        type: 'user',
        native: {},
        from: 'system.adapter.admin.0',
        user: 'system.user.admin',
        ts: 1534947164702,
        acl: {
            object: PERMISSIONS['0664'],
            owner: 'system.user.admin',
            ownerGroup: 'system.group.administrator',
        },
    });
}

export function register(it: Mocha.TestFunction, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} aliases: `;
    const gid = 'someAdapter.0.testStates';
    const gAliasID = 'alias.0.testStates';

    // Scaling of aliases - when unit % is set to target or source
    it(`${testName}Read alias state`, done => {
        context.adapter.setForeignObject(
            gid,
            {
                common: {
                    name: 'forAlias',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                    read: true,
                    write: true,
                },
                native: {},
                type: 'state',
                acl: {
                    state: PERMISSIONS['0666'],
                    object: PERMISSIONS['0600'],
                    owner: 'system.user.userC',
                    ownerGroup: 'system.group.user1',
                },
            },
            err => {
                assert.ok(!err);
                context.adapter.setForeignState(gid, 2, true, err => {
                    assert.ok(!err);

                    // create alias
                    context.adapter.setForeignObject(
                        gAliasID,
                        {
                            common: {
                                name: 'Test Alias',
                                type: 'number',
                                role: 'state',
                                min: 0,
                                max: 100,
                                unit: '%',
                                alias: {
                                    id: gid,
                                },
                                read: true,
                                write: true,
                            },
                            native: {},
                            type: 'state',
                            acl: {
                                state: PERMISSIONS['0666'],
                                object: PERMISSIONS['0600'],
                                owner: 'system.user.userC',
                                ownerGroup: 'system.group.user1',
                            },
                        },
                        () => {
                            context.adapter.getForeignState(gAliasID, (err, state) => {
                                // It must be scaled from -100, 2, 100
                                // to                     0, 51, 100 %
                                assert.strictEqual((state!.val as number).toFixed(3), '51.000');
                                assert.strictEqual(state!.ack, true);
                                done();
                            });
                        },
                    );
                });
            },
        );
    }).timeout(3_000);

    it(`${testName}Read alias states`, async () => {
        const nonAliasId1 = `${gid}nonAlias1`;
        const nonAliasId2 = `${gid}nonAlias2`;
        // create some non-alias data to check that it works with mixed ids
        await context.adapter.setForeignObjectAsync(nonAliasId1, {
            type: 'state',
            common: {
                name: 'noAlias1',
                type: 'number',
                role: 'level',
                read: true,
                write: true,
            },
            native: {},
        });

        // create some non-alias data to check that it works with mixed ids
        await context.adapter.setForeignObjectAsync(nonAliasId2, {
            type: 'state',
            common: {
                name: 'noAlias2',
                type: 'number',
                role: 'level',
                read: true,
                write: true,
            },
            native: {},
        });

        await context.adapter.setForeignObjectAsync(`${gid}1`, {
            common: {
                name: 'forAlias1',
                type: 'number',
                role: 'level',
                read: true,
                write: true,
            },
            native: {},
            type: 'state',
            acl: {
                state: PERMISSIONS['0666'],
                object: PERMISSIONS['0600'],
                owner: 'system.user.userC',
                ownerGroup: 'system.group.user1',
            },
        });

        await context.adapter.setForeignStateAsync(`${gid}1`, 5, true);
        await context.adapter.setForeignStateAsync(nonAliasId1, 3, true);
        await context.adapter.setForeignStateAsync(nonAliasId2, 2, true);

        // create alias
        await context.adapter.setForeignObjectAsync(`${gAliasID}1`, {
            common: {
                name: 'Test Alias1',
                type: 'number',
                role: 'state',
                min: -10,
                max: 10,
                alias: {
                    id: `${gid}1`,
                },
                read: true,
                write: true,
            },
            native: {},
            type: 'state',
            acl: {
                state: PERMISSIONS['0666'],
                object: PERMISSIONS['0666'],
                owner: 'system.user.userC',
                ownerGroup: 'system.group.user1',
            },
        });

        let states = await context.adapter.getForeignStatesAsync(`${gAliasID}1`);
        // No scaling because no % and no min, max in source object
        assert.strictEqual(states[`${gAliasID}1`].val, 5);
        assert.strictEqual(states[`${gAliasID}1`].ack, true);

        // original array should not be changed
        const ids = [nonAliasId1, `${gAliasID}1`, nonAliasId2];

        states = await context.adapter.getForeignStatesAsync(ids);
        assert.strictEqual(ids[0], nonAliasId1);
        assert.strictEqual(states[nonAliasId1].val, 3);
        assert.strictEqual(states[nonAliasId1].ack, true);

        // It must be scaled from -100, 2, 100
        // to                     -10, 0.2, 10
        assert.strictEqual(ids[1], `${gAliasID}1`);
        assert.strictEqual(states[`${gAliasID}1`].val, 5);
        assert.strictEqual(states[`${gAliasID}1`].ack, true);

        assert.strictEqual(ids[2], nonAliasId2);
        assert.strictEqual(states[nonAliasId2].val, 2);
        assert.strictEqual(states[nonAliasId2].ack, true);
    }).timeout(3_000);

    it(`${testName}Write alias state`, done => {
        context.adapter.setForeignState(gAliasID, 10, false, () => {
            context.adapter.getForeignState(gid, (err, state) => {
                // It must be scaled from 0, 10, 100
                // to                     -100, -80, 100
                assert.strictEqual((state!.val as number).toFixed(3), '-80.000');
                assert.strictEqual(state!.ack, false);
                done();
            });
        });
    }).timeout(3_000);

    // custom read/write functions
    it(`${testName}Use convert state`, done => {
        context.adapter.setForeignObject(
            `${gid}C`,
            {
                common: {
                    name: 'forAliasC',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                    read: true,
                    write: true,
                },
                native: {},
                type: 'state',
            },
            () => {
                context.adapter.setForeignState(`${gid}C`, 2, true, err => {
                    assert.ok(!err);

                    // create alias
                    context.adapter.setForeignObject(
                        `${gAliasID}C`,
                        {
                            common: {
                                name: 'Test AliasC',
                                type: 'number',
                                role: 'state',
                                min: -10,
                                max: 10,
                                read: true,
                                write: true,
                                alias: {
                                    id: `${gid}C`,
                                    read: 'val * 10 + 1',
                                    write: '(val - 1) / 10',
                                },
                            },
                            native: {},
                            type: 'state',
                        },
                        () => {
                            context.adapter.getForeignState(`${gAliasID}C`, (err, state) => {
                                // It must be converted 2 * 10 + 1
                                assert.strictEqual((state!.val as number).toFixed(3), '21.000');

                                assert.strictEqual(state!.ack, true);

                                context.adapter.setForeignState(`${gAliasID}C`, 41, true, err => {
                                    assert.ok(!err);
                                    context.adapter.getForeignState(`${gid}C`, (err, state) => {
                                        assert.strictEqual((state!.val as number).toFixed(3), '4.000');

                                        assert.strictEqual(state!.ack, true);
                                        done();
                                    });
                                });
                            });
                        },
                    );
                });
            },
        );
    }).timeout(3_000);

    it(`${testName}Read alias state by not admin`, async () => {
        await prepareGroupsAndUsers(context.objects);
        await context.adapter.setForeignStateAsync(gAliasID, 10, false, { user: 'system.user.userC' });
        let state = await context.adapter.getForeignStateAsync(gid, { user: 'system.user.userC' });
        // It must be scaled from 0, 10, 100 %
        // to                     -100, -80, 100
        assert.strictEqual((state!.val as number).toFixed(3), '-80.000');
        assert.strictEqual(state!.ack, false);

        await context.adapter.setForeignStateAsync(gid, 10, false, { user: 'system.user.userC' });
        state = await context.adapter.getForeignStateAsync(gAliasID, { user: 'system.user.userC' });
        // It must be scaled from -100, 10, 100
        // to                     0, 55, 100 %
        assert.strictEqual((state!.val as number).toFixed(3), '55.000');
        assert.strictEqual(state!.ack, false);
    }).timeout(3_000);

    it(`${testName}Read alias state by not admin without rights`, async () => {
        await prepareGroupsAndUsers(context.objects);

        try {
            await context.adapter.setForeignStateAsync(gAliasID, 10, false, { user: 'system.user.userD' });
            assert.strictEqual(1, 2, 'Should have thrown a permissionError');
        } catch (e) {
            assert.strictEqual(e.message, 'permissionError');
        }

        try {
            await context.adapter.getForeignStateAsync(gid, { user: 'system.user.userD' });
            assert.strictEqual(1, 2, 'Should have thrown a permissionError');
        } catch (e) {
            assert.strictEqual(e.message, 'permissionError');
        }
    }).timeout(3_000);

    // test subscriptions
    // subscribeForeignStates
    it(`${testName}Test subscribe aliases`, done => {
        context.onAdapterStateChanged = (id, state) => {
            if (id === gAliasID) {
                assert.ok(state);
                // from -100 10 100 to 0 55 100 %
                assert.strictEqual((state.val as number).toFixed(3), '55.000');
                context.onAdapterStateChanged = null;
                done();
            }
        };

        context.adapter.subscribeForeignStates(gAliasID, () =>
            context.states.setState(gid, 10, err => assert.ok(!err)),
        );
    }).timeout(3_000);

    it(`${testName}Test unsubscribe aliases`, done => {
        context.onAdapterStateChanged = () => {
            assert.strictEqual(true, false);
        };

        context.adapter.unsubscribeForeignStates(gAliasID, () => {
            context.states.setState(gid, 10, err => {
                assert.ok(!err);
                setTimeout(() => done(), 500);
            });
        });
    }).timeout(3_000);

    it(`${testName}Test subscribe aliases pattern`, done => {
        context.onAdapterStateChanged = (id, state) => {
            if (id === gAliasID) {
                assert.ok(state);
                // from -100 10 100 to 0 55 100 %
                assert.strictEqual((state.val as number).toFixed(3), '55.000');
                context.onAdapterStateChanged = null;
                done();
            }
        };

        const parts = gAliasID.split('.');
        parts.pop();

        context.adapter.subscribeForeignStates(`${parts.join('.')}.*`, () =>
            context.states.setState(gid, 10, err => assert.ok(!err)),
        );
    }).timeout(3_000);

    it(`${testName}Test unsubscribe aliases pattern`, done => {
        context.onAdapterStateChanged = () => {
            assert.strictEqual(true, false);
        };

        const parts = gAliasID.split('.');
        parts.pop();

        context.adapter.unsubscribeForeignStates(`${parts.join('.')}.*`, () => {
            context.states.setState(gid, 10, err => {
                assert.ok(!err);
                setTimeout(() => done(), 500);
            });
        });
    }).timeout(3_000);

    // Avoid Issue 2753
    it(`${testName}Test subscribe alias multiple times should only publish once`, async () => {
        let noTriggered = 0;

        context.onAdapterStateChanged = (id, state) => {
            if (id === gAliasID) {
                assert.ok(state);
                noTriggered++;
            }
        };

        await context.adapter.subscribeForeignStatesAsync(gAliasID);
        await context.adapter.subscribeForeignStatesAsync(gAliasID);

        await context.states.setState(gid, 10);
        await wait(500);

        assert.strictEqual(noTriggered, 1);
    }).timeout(3_000);

    it(`${testName}Test negative subscribe aliases regex`, done => {
        const parts = gAliasID.split('.');
        parts.pop();
        const regexp = new RegExp(`${parts.join('\\.')}\\..*`);

        // @ts-expect-error we are passing a regexp which is not allowed
        context.adapter.subscribeForeignStates(regexp, err => {
            // regexp not allowed so err
            assert.ok(err);
            done();
        });
    }).timeout(3_000);

    it(`${testName}Test unsubscribe aliases regex`, done => {
        const parts = gAliasID.split('.');
        parts.pop();
        const regexp = new RegExp(`${parts.join('\\.')}\\..*`);

        // @ts-expect-error we are passing a regexp which is not allowed
        context.adapter.unsubscribeForeignStates(regexp, err => {
            assert.ok(err);
            done();
        });
    }).timeout(3_000);

    it(`${testName}Test subscribe aliases array`, done => {
        let count = 0;
        context.onAdapterStateChanged = (id, state) => {
            if (id === gAliasID) {
                count++;
                assert.ok(state);
                assert.strictEqual((state.val as number).toFixed(3), '55.000');
                if (count === 2) {
                    context.onAdapterStateChanged = null;
                    done();
                }
            } else if (id === gid) {
                count++;
                assert.ok(state);
                assert.strictEqual(state.val, 10);
                if (count === 2) {
                    context.onAdapterStateChanged = null;
                    done();
                }
            }
        };

        context.adapter.subscribeForeignStates([gAliasID, gid], () =>
            context.states.setState(gid, 10, err => assert.ok(!err)),
        );
    }).timeout(3_000);

    it(`${testName}Test unsubscribe aliases array`, done => {
        context.onAdapterStateChanged = () => {
            assert.strictEqual(true, false);
        };

        context.adapter.unsubscribeForeignStates([gAliasID, gid], () => {
            context.states.setState(gid, 10, err => {
                assert.ok(!err);
                setTimeout(() => done(), 500);
            });
        });
    }).timeout(3_000);

    it(`${testName}Test change subscribed aliases`, done => {
        context.onAdapterStateChanged = (id, state) => {
            if (id === gAliasID) {
                // A:
                assert.ok(state);
                assert.strictEqual((state.val as number).toFixed(3), '55.000');

                // update alias
                context.adapter.setForeignObject(
                    gAliasID,
                    {
                        common: {
                            name: 'Test Alias',
                            type: 'number',
                            role: 'state',
                            min: 0,
                            max: 100,
                            unit: '%',
                            alias: {
                                id: `${gid}A`,
                            },
                            read: true,
                            write: true,
                        },
                        native: {},
                        type: 'state',
                        acl: {
                            object: PERMISSIONS['0666'],
                            state: PERMISSIONS['0666'],
                            owner: 'system.user.userC',
                            ownerGroup: 'system.group.user1',
                        },
                    },
                    () => {
                        context.onAdapterStateChanged = function (id, state) {
                            if (id === gAliasID) {
                                // A:
                                assert.ok(state);
                                // -200, 10 , 200 => 0, 52.5, 100
                                assert.strictEqual(state.val, 52.5);
                                context.adapter.unsubscribeForeignStates(gAliasID, () => {
                                    context.states.setState(`${gid}A`, 11, () => {
                                        done();
                                    });
                                });
                            }
                        };

                        // give some time to update subscribes
                        setTimeout(() => {
                            // this change must be ignored
                            context.states.setState(gid, 20, () => {
                                context.states.setState(`${gid}A`, 10);
                            });
                        }, 100);
                    },
                );
            }
        };

        // create new alias
        context.adapter.setForeignObject(
            `${gid}A`,
            {
                common: {
                    name: 'forAliasA',
                    type: 'number',
                    role: 'level',
                    min: -200,
                    max: 200,
                    read: true,
                    write: true,
                },
                native: {},
                type: 'state',
            },
            () =>
                context.adapter.subscribeForeignStates(gAliasID, () =>
                    context.states.setState(gid, 10, err => assert.ok(!err)),
                ),
        ); // => GOTO A:
    }).timeout(3_000);

    it(`${testName}Test subscribe "*"`, done => {
        // 1. Create alias
        // 2. Create normal state (independent from alias)
        // 3. subscribe "*"
        // 4. changes must come for alias and independent state
        // 5. unsubscribe "*"
        // 6. changes must not come for any state

        // 1. create new alias
        context.adapter.setForeignObject(
            `${gid}Star`,
            {
                common: {
                    name: 'forAliasStar',
                    type: 'number',
                    role: 'level',
                    min: 0,
                    max: 100,
                    read: true,
                    write: true,
                },
                native: {},
                type: 'state',
            },
            () =>
                context.adapter.setForeignObject(
                    `${gAliasID}Star`,
                    {
                        common: {
                            name: 'Test Alias',
                            type: 'number',
                            role: 'state',
                            min: -10,
                            max: 10,
                            alias: {
                                id: `${gid}Star`,
                            },
                            read: true,
                            write: true,
                        },
                        native: {},
                        type: 'state',
                    },
                    () =>
                        // 2. Create normal state (independent from alias)
                        context.adapter.setForeignObject(
                            `${gid}NotAlias`,
                            {
                                common: {
                                    name: 'NotForAliasStar',
                                    type: 'number',
                                    role: 'level',
                                    min: 0,
                                    max: 10,
                                    read: true,
                                    write: true,
                                },
                                native: {},
                                type: 'state',
                            },
                            () =>
                                context.adapter.subscribeForeignStates('*', () => {
                                    let count = 0;
                                    context.onAdapterStateChanged = (id, state) => {
                                        // B:
                                        if (id === `${gid}NotAlias`) {
                                            assert.strictEqual(state!.val, 2);
                                            count++;
                                        } else if (id === `${gAliasID}Star`) {
                                            count++;
                                            // no % -> no scaling
                                            assert.strictEqual(state!.val, 10);
                                        } else if (id === `${gid}Star`) {
                                            count++;
                                            assert.strictEqual(state!.val, 10);
                                        }

                                        if (count === 3) {
                                            // 6. changes must not come for any state
                                            context.onAdapterStateChanged = () => {
                                                // C:
                                                assert.strictEqual('Shit happens!', 'Should not happen');
                                            };

                                            // 5. unsubscribe "*"
                                            context.adapter.unsubscribeForeignStates('*', () =>
                                                context.states.setState(`${gid}NotAlias`, 3, () =>
                                                    context.states.setState(`${gAliasID}Star`, 5, () =>
                                                        setTimeout(() => done(), 500),
                                                    ),
                                                ),
                                            );
                                        }
                                    };

                                    // 4. changes must come for alias and independent state
                                    context.states.setState(`${gid}NotAlias`, 2, () =>
                                        context.states.setState(`${gid}Star`, 10, () => {
                                            // go to B:
                                        }),
                                    );
                                }),
                        ),
                ),
        );
    }).timeout(3_000);

    it(`${testName}Test newly created alias after subscribe`, done => {
        // at first we subscribe
        context.adapter.subscribeForeignStates('*', err => {
            // create orig object
            assert.ok(!err);
            context.adapter.setForeignObject(
                `${gid}afterSub`,
                {
                    common: {
                        name: 'for Alias',
                        type: 'number',
                        role: 'level',
                        min: 0,
                        max: 100,
                        read: true,
                        write: true,
                    },
                    native: {},
                    type: 'state',
                },
                err => {
                    assert.ok(!err);
                    // alias created after existing subscription
                    context.adapter.setForeignObject(
                        `${gAliasID}afterSubAlias`,
                        {
                            common: {
                                name: 'Test Alias',
                                type: 'number',
                                role: 'state',
                                min: -10,
                                max: 10,
                                alias: {
                                    id: `${gid}afterSub`,
                                },
                                read: true,
                                write: true,
                            },
                            native: {},
                            type: 'state',
                        },
                        err => {
                            assert.ok(!err);
                            // listen on state changes
                            context.onAdapterStateChanged = (id, state) => {
                                if (id === `${gAliasID}afterSubAlias`) {
                                    // no % -> no scaling
                                    assert.strictEqual(state!.val, 50);
                                    done();
                                }
                            };
                            // give adapter time to update alias subscription
                            setTimeout(() => {
                                context.states.setState(`${gid}afterSub`, 50);
                            }, 100);
                        },
                    );
                },
            );
        });
    }).timeout(3_000);

    it(`${testName}Test newly created alias after partial subscribe`, done => {
        // at first we subscribe, but only partial
        context.adapter.unsubscribeForeignStates('*', () => {
            context.adapter.subscribeForeignStates(`${gAliasID}okay*`, err => {
                // create orig object
                assert.ok(!err);
                context.adapter.setForeignObject(
                    `${gid}partialOrig`,
                    {
                        common: {
                            name: 'for Alias',
                            type: 'number',
                            role: 'level',
                            min: 0,
                            max: 100,
                            read: true,
                            write: true,
                        },
                        native: {},
                        type: 'state',
                    },
                    err => {
                        assert.ok(!err);
                        // alias created after existing subscription which does not match pattern
                        context.adapter.setForeignObject(
                            `${gAliasID}notOkay`,
                            {
                                common: {
                                    name: 'Test Alias',
                                    type: 'number',
                                    role: 'state',
                                    min: -10,
                                    max: 10,
                                    alias: {
                                        id: `${gid}partialOrig`,
                                    },
                                    read: true,
                                    write: true,
                                },
                                native: {},
                                type: 'state',
                            },
                            err => {
                                assert.ok(!err);
                                // listen on state changes

                                // if state change not triggered in 1 sec -> pass
                                const doneTimer = setTimeout(done, 1_000);

                                context.onAdapterStateChanged = id => {
                                    if (id === `${gAliasID}notOkay`) {
                                        clearTimeout(doneTimer);
                                        assert.strictEqual('Sparta', 'Athens');
                                    }
                                };

                                // give adapter time to update alias subscription
                                setTimeout(() => {
                                    context.states.setState(`${gid}partialOrig`, 50);
                                }, 100);
                            },
                        );
                    },
                );
            });
        });
    }).timeout(3_000);

    it(`${testName}should respect different read and write ids`, done => {
        // first we subscribe to all
        context.adapter.subscribeForeignStates('*', err => {
            assert.ok(!err);
            // define alias with different read and write
            context.adapter.setForeignObject(
                `${gAliasID}aliasReadWrite`,
                {
                    common: {
                        name: 'Test Alias R/W',
                        type: 'number',
                        role: 'state',
                        min: -10,
                        max: 10,
                        read: true,
                        write: true,
                        alias: {
                            id: {
                                read: `${gid}readOrig`,
                                write: `${gid}writeOrig`,
                            },
                        },
                    },
                    native: {},
                    type: 'state',
                },
                err => {
                    assert.ok(!err);
                    // set our alias read obj
                    context.adapter.setForeignObject(
                        `${gid}readOrig`,
                        {
                            common: {
                                name: 'Test ID read',
                                type: 'number',
                                role: 'state',
                                min: -10,
                                max: 10,
                                read: true,
                                write: true,
                            },
                            native: {},
                            type: 'state',
                        },
                        err => {
                            assert.ok(!err);
                            // set our write object
                            context.adapter.setForeignObject(
                                `${gid}writeOrig`,
                                {
                                    common: {
                                        name: 'Test ID write',
                                        type: 'number',
                                        role: 'state',
                                        min: -10,
                                        max: 10,
                                        read: true,
                                        write: true,
                                    },
                                    native: {},
                                    type: 'state',
                                },
                                err => {
                                    assert.ok(!err);
                                    // set a state to readOrig
                                    context.adapter.setForeignState(`${gid}readOrig`, 5, err => {
                                        assert.ok(!err);
                                        // check that our alias has val of read state
                                        context.adapter.getForeignState(`${gAliasID}aliasReadWrite`, (err, state) => {
                                            assert.ok(!err);
                                            assert.strictEqual(state!.val, 5);
                                            // now set the alias
                                            context.adapter.setForeignState(`${gAliasID}aliasReadWrite`, -2, err => {
                                                assert.ok(!err);
                                                context.adapter.getForeignState(`${gid}writeOrig`, (err, state) => {
                                                    assert.ok(!err);
                                                    assert.strictEqual(state!.val, -2);
                                                    done();
                                                });
                                            });
                                        });
                                    });
                                },
                            );
                        },
                    );
                },
            );
        });
    }).timeout(3_000);

    it(`${testName}should respect alias read id on getForeignStates`, async () => {
        // set our alias read obj
        await context.adapter.setForeignObjectAsync(`${gid}readGetStates`, {
            common: {
                name: 'Test ID read',
                type: 'number',
                role: 'state',
                def: 5,
                min: -10,
                max: 10,
                read: true,
                write: true,
            },
            native: {},
            type: 'state',
        });

        await context.adapter.setForeignObjectAsync(`${gid}writeGetStates`, {
            common: {
                name: 'Test ID read',
                type: 'number',
                role: 'state',
                min: -10,
                max: 10,
                def: 10,
                read: true,
                write: true,
            },
            native: {},
            type: 'state',
        });

        // set write object
        await context.adapter.setForeignObjectAsync(`${gAliasID}aliasReadWriteGetStates`, {
            common: {
                name: 'Test Alias R/W',
                type: 'number',
                role: 'state',
                min: -10,
                max: 10,
                alias: {
                    id: {
                        read: `${gid}readGetStates`,
                        write: `${gid}writeGetStates`,
                    },
                },
                read: true,
                write: true,
            },
            native: {},
            type: 'state',
        });

        // now perform getStates with pattern
        const states = await context.adapter.getForeignStatesAsync(`${gAliasID}aliasReadWriteGetStates*`);

        // read def is 5
        assert.strictEqual(states[`${gAliasID}aliasReadWriteGetStates`].val, 5);
    }).timeout(3_000);

    it(`${testName}Read alias states via getStates should apply permissions`, async () => {
        const states = await context.adapter.getForeignStatesAsync(`${gAliasID}*`, { user: 'system.user.queen' });
        // on permission problems, we will receive only an id with null, ensure that this does not happen
        assert.ok(states[`${gAliasID}C`]);
    });

    it(`${testName}Alias setState ignores source permissions`, async () => {
        const nonAliasId = `${gid}.permissionNonAlias`;
        const aliasId = `${gAliasID}.permissionOnlyAlias`;
        const val = 3;

        // we create a non-alias object where we have no permissions for
        await context.adapter.setForeignObjectAsync(nonAliasId, {
            common: {
                name: 'forAlias',
                type: 'number',
                role: 'level',
                read: true,
                write: true,
            },
            native: {},
            type: 'state',
            acl: {
                state: PERMISSIONS['0600'], // 0600 only owner is allowed to write
                object: PERMISSIONS['0600'],
                owner: 'system.user.user',
                ownerGroup: 'system.group.user1',
            },
        });

        // we create an alias objects, where we have permissions for
        await context.adapter.setForeignObjectAsync(aliasId, {
            common: {
                name: 'Test Alias',
                type: 'number',
                role: 'state',
                min: 0,
                max: 100,
                unit: '%',
                alias: {
                    id: nonAliasId,
                },
                read: true,
                write: true,
            },
            native: {},
            type: 'state',
            acl: {
                state: PERMISSIONS['0666'],
                object: PERMISSIONS['0666'],
                owner: 'system.user.userC',
                ownerGroup: 'system.group.user1',
            },
        });

        // we use the user which is allowed to modify alias but not the source object
        await context.adapter.setForeignStateAsync(aliasId, { val, ack: true }, { user: 'system.user.userD' });
        // reading the alias should be okay
        const state = await context.adapter.getForeignStateAsync(aliasId, { user: 'system.user.userD' });
        assert.strictEqual(state?.val, val);
        // reading the source obj should not be ok
        await assert.rejects(
            context.adapter.getForeignStateAsync(nonAliasId, { user: 'system.user.userD' }),
            /permissionError/,
        );
    });

    it(`${testName}Non-existing alias should return a null value just like other state`, async () => {
        const normalState = await context.adapter.getForeignStateAsync(`${gid}.isNotExisting`);
        const aliasState = await context.adapter.getForeignStateAsync(`${gAliasID}.isNotExisting`);

        assert.strictEqual(normalState, null);
        assert.strictEqual(aliasState, normalState);
    });
}
