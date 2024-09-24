import type { TestContext } from '../_Types.js';

export function register(it: Mocha.TestFunction, expect: Chai.ExpectStatic, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} adapter: `;
    const gid = 'testStates';

    // setState
    it(`${testName}Set local state`, function (done) {
        this.timeout(3_000);
        context.adapter.setObject(
            gid,
            {
                common: {
                    read: true,
                    write: true,
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
            },
            function (err) {
                expect(err).to.be.null;

                context.states.getState(`${context.adapterShortName}.0.${gid}`, function (err, _state) {
                    expect(err).to.be.null;

                    context.adapter.setState(gid, 1, function (err) {
                        expect(err).to.be.not.ok;

                        context.states.getState(`${context.adapterShortName}.0.${gid}`, function (err, state) {
                            expect(err).to.be.null;
                            expect(state).to.be.ok;
                            expect(state!.val).to.equal(1);
                            expect(state!.ack).to.equal(false);

                            context.adapter.setState(gid, 2, true, function (err) {
                                expect(err).to.be.not.ok;

                                context.states.getState(`${context.adapterShortName}.0.${gid}`, function (err, state) {
                                    expect(err).to.be.null;
                                    expect(state).to.be.ok;
                                    expect(state!.val).to.equal(2);
                                    expect(state!.ack).to.equal(true);

                                    context.adapter.setState(gid, { val: 3, ack: true }, function (err) {
                                        expect(err).to.be.not.ok;

                                        context.states.getState(
                                            `${context.adapterShortName}.0.${gid}`,
                                            function (err, state) {
                                                expect(err).to.be.null;
                                                expect(state).to.be.ok;
                                                expect(state!.val).to.equal(3);
                                                expect(state!.ack).to.equal(true);

                                                context.adapter.setState(gid, { ack: false }, function (err) {
                                                    expect(err).to.be.not.ok;

                                                    context.states.getState(
                                                        `${context.adapterShortName}.0.${gid}`,
                                                        function (err, state) {
                                                            expect(err).to.be.null;
                                                            expect(state).to.be.ok;
                                                            expect(state!.val).to.equal(3);
                                                            expect(state!.ack).to.equal(false);

                                                            context.adapter.setState(
                                                                gid,
                                                                { ack: true },
                                                                function (err) {
                                                                    expect(err).to.be.not.ok;

                                                                    context.states.getState(
                                                                        `${context.adapterShortName}.0.${gid}`,
                                                                        function (err, state) {
                                                                            expect(err).to.be.null;
                                                                            expect(state).to.be.ok;
                                                                            expect(state!.val).to.equal(3);
                                                                            expect(state!.ack).to.equal(true);
                                                                            done();
                                                                        },
                                                                    );
                                                                },
                                                            );
                                                        },
                                                    );
                                                });
                                            },
                                        );
                                    });
                                });
                            });
                        });
                    });
                });
            },
        );
    });

    // getState
    it(`${testName}Get local state`, function (done) {
        this.timeout(3_000);
        context.adapter.getState(gid, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.getState(`${context.adapterShortName}.0.${gid}`, function (err, state) {
                expect(err).to.be.null;
                expect(state).to.be.ok;
                expect(state!.val).to.equal(3);
                expect(state!.ack).to.equal(true);

                // ask for non-existing state
                context.adapter.getState(`${gid}6`, function (err, state) {
                    expect(err).to.be.not.ok;
                    expect(state).to.be.null;
                    done();
                });
            });
        });
    });

    // getStates
    it(`${testName}Get local states`, function (done) {
        this.timeout(3_000);
        context.adapter.getStates('*', function (err, states) {
            expect(err).to.be.not.ok;
            expect(states).to.be.an('object');
            expect(states![`${context.adapterShortName}.0.${gid}`]).to.be.an('object');
            expect(states![`${context.adapterShortName}.0.${gid}`].val).to.equal(3);
            expect(states![`${context.adapterShortName}.0.${gid}`].ack).equal(true);

            context.adapter.getStates('abc*', function (err, states) {
                expect(err).to.be.not.ok;
                expect(states).to.be.an('object');

                // no states should match
                expect(Object.keys(states!).length).to.be.equal(0);

                context.adapter.getStates(`${gid.substring(0, gid.length - 2)}*`, function (err, states) {
                    expect(err).to.be.not.ok;
                    expect(states).to.be.an('object');
                    expect(states![`${context.adapterShortName}.0.${gid}`]).to.be.an('object');
                    expect(states![`${context.adapterShortName}.0.${gid}`].val).to.equal(3);
                    expect(states![`${context.adapterShortName}.0.${gid}`].ack).equal(true);

                    done();
                });
            });
        });
    });

    // delState
    it(`${testName}Delete local state`, function (done) {
        this.timeout(3_000);
        context.adapter.delState(gid, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.getState(gid, function (err, state) {
                expect(err).to.be.not.ok;
                expect(state).to.be.null;

                context.adapter.delState(gid, function (err) {
                    expect(err).to.be.not.ok;

                    done();
                });
            });
        });
    });

    // setStateChanged
    it(`${testName}Set local state if changed`, function (done) {
        // create object
        context.adapter.setObject(
            gid,
            {
                common: {
                    read: true,
                    write: true,
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
            },
            function (err) {
                expect(err).to.be.null;
                const ts = new Date().getTime() - 1000;
                context.adapter.setState(gid, { val: 1, ts: ts, ack: false }, function (err) {
                    expect(err).to.be.not.ok;
                    context.adapter.setStateChanged(gid, 1, function (err, id, notChanged) {
                        expect(err).to.be.not.ok;
                        // redis do not return ID
                        expect(id).to.be.equal(`${context.adapterShortName}.0.${gid}`);
                        expect(notChanged).to.be.true;

                        context.states.getState(`${context.adapterShortName}.0.${gid}`, function (err, state) {
                            expect(err).to.be.not.ok;
                            expect(state).to.be.ok;
                            expect(state!.ts).to.be.equal(ts);

                            context.adapter.setStateChanged(gid, 1, true, function (err, id, notChanged) {
                                expect(err).to.be.not.ok;
                                expect(id).to.be.equal(`${context.adapterShortName}.0.${gid}`);
                                expect(notChanged).to.be.false;

                                context.states.getState(`${context.adapterShortName}.0.${gid}`, function (err, state) {
                                    expect(err).to.be.not.ok;
                                    expect(state).to.be.ok;
                                    expect(state!.ack).to.be.true;
                                    expect(state!.ts).to.be.not.equal(ts);
                                    done();
                                });
                            });
                        });
                    });
                });
            },
        );
    });

    // subscribeStates
    it(`${testName}Test subscribe local states`, function (done) {
        this.timeout(3_000);
        const sGid = `${gid}5`;

        context.adapter.setObject(
            sGid,
            {
                common: {
                    read: true,
                    write: true,
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
            },
            function (err) {
                expect(err).to.be.null;

                context.states.setState(`${context.adapterShortName}.0.${sGid}`, 9, function (err) {
                    expect(err).to.be.not.ok;

                    context.onAdapterStateChanged = function (id, state) {
                        if (id === `${context.adapterShortName}.0.${sGid}`) {
                            expect(state).to.be.ok;
                            expect(state!.val).to.equal(10);
                            context.onAdapterStateChanged = null;
                            done();
                        }
                    };

                    context.adapter.subscribeStates('*', function () {
                        context.states.setState(`${context.adapterShortName}.0.${sGid}`, 10, function (err) {
                            expect(err).to.be.not.ok;
                        });
                    });
                });
            },
        );
    });

    it(`${testName}Test subscribe local states on array`, async () => {
        const sGid = `${gid}subscribeArray`;
        const testVal = 50;

        await context.adapter.setObjectAsync(sGid, {
            common: {
                read: true,
                write: true,
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100,
            },
            native: {},
            type: 'state',
        });

        await context.adapter.subscribeStatesAsync([sGid]);

        return new Promise(resolve => {
            context.onAdapterStateChanged = (id, state) => {
                if (id === `${context.adapterShortName}.0.${sGid}`) {
                    expect(state).to.be.ok;
                    expect(state!.val).to.equal(testVal);
                    context.onAdapterStateChanged = null;
                    resolve();
                }
            };

            context.adapter.setState(sGid, testVal);
        });
    });

    // unsubscribeStates
    it(`${testName}Test unsubscribe local states`, function (done) {
        this.timeout(3_000);
        const sGid = `${gid}5`;

        context.onAdapterStateChanged = function (id, state) {
            if (id === `${context.adapterShortName}.0.${sGid}`) {
                expect(state).to.be.ok;
                expect(state!.val).to.equal(9);
            }
        };

        context.states.setState(`${context.adapterShortName}.0.${sGid}`, 9, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.unsubscribeStates('*', function () {
                context.states.setState(`${context.adapterShortName}.0.${sGid}`, 10, function (err) {
                    expect(err).to.be.not.ok;
                });
                setTimeout(function () {
                    context.onAdapterStateChanged = null;
                    done();
                }, 300);
            });
        });
    });

    // -------------------------------------------------------------------------------------
    // setForeignState
    it(`${testName}Set foreign state`, function (done) {
        this.timeout(3_000);
        const fGid = `${context.adapterShortName}1.0.${gid}`;
        context.objects.setObject(
            fGid,
            {
                common: {
                    read: true,
                    write: true,
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
            },
            function (err) {
                expect(err).to.be.null;

                context.states.getState(fGid, function (err, _state) {
                    expect(err).to.be.null;

                    context.adapter.setForeignState(fGid, 1, function (err) {
                        expect(err).to.be.not.ok;

                        context.states.getState(fGid, function (err, state) {
                            expect(err).to.be.null;
                            expect(state).to.be.ok;
                            expect(state!.val).to.equal(1);
                            expect(state!.ack).to.equal(false);

                            context.adapter.setForeignState(fGid, 2, true, function (err) {
                                expect(err).to.be.not.ok;

                                context.states.getState(fGid, function (err, state) {
                                    expect(err).to.be.null;
                                    expect(state).to.be.ok;
                                    expect(state!.val).to.equal(2);
                                    expect(state!.ack).to.equal(true);

                                    context.adapter.setForeignState(fGid, { val: 3, ack: true }, function (err) {
                                        expect(err).to.be.not.ok;

                                        context.states.getState(fGid, function (err, state) {
                                            expect(err).to.be.null;
                                            expect(state).to.be.ok;
                                            expect(state!.val).to.equal(3);
                                            expect(state!.ack).to.equal(true);
                                            done();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            },
        );
    });

    // setForeignState with acl all
    it(`${testName}Set foreign state with acl`, function (done) {
        this.timeout(3_000);
        const fGid = `${context.adapterShortName}3.0.${gid}`;
        context.adapter.setForeignObject(
            'system.group.writer2',
            {
                common: {
                    name: 'Writer2',
                    members: ['system.user.write-only2'],
                    acl: {
                        object: {
                            list: false,
                            read: true, // required to read permissions
                            write: false,
                            delete: false,
                            create: false,
                        },
                        state: {
                            list: false,
                            read: false,
                            write: true,
                            create: false,
                            delete: false,
                        },
                        users: {
                            write: false,
                            create: false,
                            delete: false,
                            read: false,
                            list: false,
                        },
                        other: {
                            execute: false,
                            http: false,
                            sendto: false,
                        },
                        file: {
                            list: false,
                            read: false,
                            write: false,
                            create: false,
                            delete: false,
                        },
                    },
                },
                native: {},
                acl: {
                    object: 1638, // 0666
                    owner: 'system.user.admin',
                    ownerGroup: 'system.group.administrator',
                },
                _id: 'system.group.writer2',
                type: 'group',
            },
            function (err) {
                expect(err).to.be.null;

                context.adapter.setForeignObject(
                    'system.user.write-only2',
                    {
                        type: 'user',
                        common: {
                            name: 'write-only2',
                            enabled: true,
                            password:
                                'pbkdf2$10000$ab4104d8bb68390ee7e6c9397588e768de6c025f0c732c18806f3d1270c83f83fa86a7bf62583770e5f8d0b405fbb3ad32214ef3584f5f9332478f2506414443a910bf15863b36ebfcaa7cbb19253ae32cd3ca390dab87b29cd31e11be7fa4ea3a01dad625d9de44e412680e1a694227698788d71f1e089e5831dc1bbacfa794b45e1c995214bf71ee4160d98b4305fa4c3e36ee5f8da19b3708f68e7d2e8197375c0f763d90e31143eb04760cc2148c8f54937b9385c95db1742595634ed004fa567655dfe1d9b9fa698074a9fb70c05a252b2d9cf7ca1c9b009f2cd70d6972ccf0ee281d777d66a0346c6c6525436dd7fe3578b28dca2c7adbfde0ecd45148$31c3248ba4dc9600a024b4e0e7c3e585',
                        },
                        _id: 'system.user.write-only2',
                        native: {},
                        acl: {
                            owner: 'system.user.admin',
                            ownerGroup: 'system.group.administrator',
                            object: 1638, // 0666
                        },
                    },
                    function (_err) {
                        context.objects.setObject(
                            fGid,
                            {
                                common: {
                                    read: true,
                                    write: true,
                                    name: 'test1',
                                    type: 'number',
                                    role: 'level',
                                    min: -100,
                                    def: 10,
                                    max: 100,
                                },
                                native: {},
                                type: 'state',
                                acl: {
                                    object: 1638, // 0666
                                    owner: 'system.user.write-only2',
                                    ownerGroup: 'system.group.administrator',
                                    state: 1638, // 0666
                                },
                            },
                            function (err) {
                                expect(err).to.be.null;
                                context.adapter.setForeignState(fGid, 1, false, function (_err) {
                                    context.states.getState(fGid, function (err, state) {
                                        expect(err).to.be.null;
                                        expect(state).to.be.ok;
                                        expect(state!.val).to.be.equal(1);

                                        context.adapter.setForeignState(
                                            fGid,
                                            2,
                                            false,
                                            { user: 'system.user.write-only2' },
                                            err => {
                                                expect(err).to.be.not.ok;

                                                context.states.getState(fGid, (err, state) => {
                                                    expect(err).to.be.null;
                                                    expect(state).to.be.ok;
                                                    expect(state!.val).to.equal(2);
                                                    expect(state!.ack).to.equal(false);
                                                    context.adapter.getForeignState(
                                                        fGid,
                                                        { user: 'system.user.write-only2' },
                                                        (err, state) => {
                                                            expect(err).to.be.ok;
                                                            expect(state).to.be.not.ok;
                                                            done();
                                                        },
                                                    );
                                                });
                                            },
                                        );
                                    });
                                });
                            },
                        );
                    },
                );
            },
        );
    });

    // setForeignState with acl failure
    it(`${testName}Set foreign state with acl failure`, function (done) {
        this.timeout(3_000);
        const fGid = `${context.adapterShortName}3.1.${gid}`;

        context.objects.setObject(
            fGid,
            {
                common: {
                    read: true,
                    write: true,
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
                acl: {
                    object: 102,
                    owner: 'system.user.write-only',
                    ownerGroup: 'system.group.administrator',
                    state: 102,
                },
            },
            function (err) {
                expect(err).to.be.null;

                context.states.getState(fGid, function (err, _state) {
                    expect(err).to.be.null;

                    context.adapter.setForeignState(fGid, 1, false, { user: 'system.user.write-only' }, function (err) {
                        expect(err!.message).to.be.equal('permissionError');
                        done();
                    });
                });
            },
        );
    });

    // setForeignState with acl write only
    it(`${testName}Set foreign state with acl write only`, function (done) {
        this.timeout(3_000);
        const fGid = `${context.adapterShortName}3.0.${gid}`;
        context.objects.setObject(
            fGid,
            {
                common: {
                    read: true,
                    write: true,
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
                acl: {
                    object: 1126,
                    owner: 'system.user.write-only2',
                    ownerGroup: 'system.group.administrator',
                    state: 614,
                },
            },
            function (err) {
                expect(err).to.be.null;

                context.states.getState(fGid, function (err, _state) {
                    expect(err).to.be.null;

                    context.adapter.setForeignState(
                        fGid,
                        1,
                        false,
                        { user: 'system.user.write-only2' },
                        function (err) {
                            expect(err).to.be.not.ok;

                            context.states.getState(fGid, function (err, state) {
                                expect(err).to.be.null;
                                expect(state).to.be.ok;
                                expect(state!.val).to.equal(1);
                                expect(state!.ack).to.equal(false);
                                done();
                            });
                        },
                    );
                });
            },
        );
    });

    // setForeignStateChanged
    it(`${testName}Set foreign state if changed`, function (done) {
        // create object
        const fGid = `${context.adapterShortName}1.0.1${gid}`;
        context.adapter.setForeignObject(
            fGid,
            {
                common: {
                    read: true,
                    write: true,
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
            },
            function (err) {
                expect(err).to.be.null;
                const ts = new Date().getTime() - 1000;
                context.adapter.setForeignState(fGid, { val: 1, ts: ts, ack: false }, function (err) {
                    expect(err).to.be.not.ok;
                    context.adapter.setForeignStateChanged(fGid, 1, function (err, id, notChanged) {
                        expect(err).to.be.not.ok;
                        // redis do not return ID
                        expect(id).to.be.equal(fGid);
                        expect(notChanged).to.be.true;

                        context.states.getState(fGid, function (err, state) {
                            expect(err).to.be.not.ok;
                            expect(state).to.be.ok;
                            expect(state!.ts).to.be.equal(ts);

                            context.adapter.setForeignStateChanged(fGid, 1, true, function (err, id, notChanged) {
                                expect(err).to.be.not.ok;
                                expect(id).to.be.equal(fGid);
                                expect(notChanged).to.be.false;

                                context.states.getState(fGid, function (err, state) {
                                    expect(err).to.be.not.ok;
                                    expect(state).to.be.ok;
                                    expect(state!.ack).to.be.true;
                                    expect(state!.ts).to.be.not.equal(ts);
                                    done();
                                });
                            });
                        });
                    });
                });
            },
        );
    });

    // getForeignState
    it(`${testName}Get foreign state`, function (done) {
        this.timeout(3_000);
        const fGid = `${context.adapterShortName}1.0.${gid}`;
        context.adapter.getForeignState(fGid, function (err, state) {
            expect(err).to.be.null;
            expect(state).to.be.ok;
            expect(state!.val).to.equal(3);
            expect(state!.ack).to.equal(true);

            // ask for non-existing state
            context.adapter.getForeignState(`${fGid}5`, function (err, state) {
                expect(err).to.be.not.ok;
                expect(state).to.be.null;
                done();
            });
        });
    });

    // getForeignStates
    it(`${testName}Get foreign states`, function (done) {
        this.timeout(3_000);
        context.adapter.getForeignStates(`${context.adapterShortName}1.0.*`, function (err, states) {
            expect(err).to.be.not.ok;
            expect(states).to.be.an('object');
            expect(states![`${context.adapterShortName}1.0.${gid}`]).to.be.ok;
            expect(states![`${context.adapterShortName}1.0.${gid}`].val).to.equal(3);
            expect(states![`${context.adapterShortName}1.0.${gid}`].ack).equal(true);

            context.adapter.getForeignStates(`${context.adapterShortName}1.0.abc*`, function (err, states) {
                expect(err).to.be.not.ok;
                expect(states).to.be.an('object');

                // no states should match
                expect(Object.keys(states!).length).to.be.equal(0);

                context.adapter.getForeignStates(
                    `${context.adapterShortName}1.0.${gid.substring(0, gid.length - 2)}*`,
                    function (err, states) {
                        expect(err).to.be.not.ok;
                        expect(states).to.be.an('object');
                        expect(states![`${context.adapterShortName}1.0.${gid}`]).to.be.ok;
                        expect(states![`${context.adapterShortName}1.0.${gid}`].val).to.equal(3);
                        expect(states![`${context.adapterShortName}1.0.${gid}`].ack).equal(true);

                        done();
                    },
                );
            });
        });
    });

    // delForeignState
    it(`${testName}Delete foreign state`, function (done) {
        this.timeout(3_000);
        context.adapter.delForeignState(`${context.adapterShortName}1.0.${gid}`, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.getForeignState(`${context.adapterShortName}1.0.${gid}`, function (err, state) {
                expect(err).to.be.not.ok;
                expect(state).to.be.not.ok;

                context.adapter.delForeignState(`${context.adapterShortName}1.0.${gid}`, function (err) {
                    expect(err).to.be.not.ok;

                    done();
                });
            });
        });
    });

    // get foreign system state
    it(`${testName}Get System State`, function (done) {
        this.timeout(3_000);

        context.adapter.getForeignState('system.adapter.test.0.memRss', (err, state) => {
            expect(err).to.be.null;
            expect(state).to.be.ok;
            expect(state!.val).to.be.equal(0);
            done();
        });
    });

    // subscribeForeignStates
    it(`${testName}Test subscribe foreign states`, function (done) {
        this.timeout(3_000);
        const sGid = `${context.adapterShortName}2.0.${gid}6`;

        context.adapter.setForeignObject(
            sGid,
            {
                common: {
                    read: true,
                    write: true,
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
            },
            function (err) {
                expect(err).to.be.null;

                context.states.setState(sGid, 9, function (err) {
                    expect(err).to.be.not.ok;

                    context.onAdapterStateChanged = function (id, state) {
                        if (id === sGid) {
                            expect(state).to.be.ok;
                            expect(state!.val).to.equal(10);
                            context.onAdapterStateChanged = null;
                            done();
                        }
                    };

                    context.adapter.subscribeForeignStates(`${context.adapterShortName}2.0.*`, function () {
                        context.states.setState(sGid, 10, function (err) {
                            expect(err).to.be.not.ok;
                        });
                    });
                });
            },
        );
    });

    // subscribeForeignStates with array
    it(`${testName}Test subscribe foreign states with array`, async () => {
        const stateIds = [
            `${context.adapterShortName}3.0.${gid}76`,
            `${context.adapterShortName}3.0.${gid}77`,
            `${context.adapterShortName}3.0.${gid}78`,
        ];

        for (const id of stateIds) {
            await context.adapter.setForeignObjectAsync(id, {
                common: {
                    read: true,
                    write: true,
                    name: 'test',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
            });
        }

        // finally subscribe with an array
        await context.adapter.subscribeForeignStatesAsync(stateIds);

        let changesRegistered = 0;

        return new Promise((resolve, reject) => {
            context.onAdapterStateChanged = id => {
                if (stateIds.includes(id)) {
                    changesRegistered++;
                } else if (id === `${context.adapterShortName}3.0.${gid}81`) {
                    // we haven't subscribed to this
                    reject(new Error(`State ${id} has not been subscribed`));
                }

                if (changesRegistered === stateIds.length) {
                    context.onAdapterStateChanged = null;
                    resolve();
                }
            };

            // set one wrong state at the beginning
            for (const id of [`${context.adapterShortName}3.0.${gid}81`, ...stateIds]) {
                context.states.setState(id, 10);
            }
        });
    }).timeout(3_000);

    // unsubscribeForeignStates
    it(`${testName}Test unsubscribe foreign states`, function (done) {
        this.timeout(3_000);
        const sGid = `${context.adapterShortName}2.0.${gid}6`;

        context.onAdapterStateChanged = function (id, state) {
            if (id === sGid) {
                expect(state!.val).to.be.equal(9);
            } else {
                expect(true).to.be.false;
            }
        };

        context.states.setState(sGid, 9, err => {
            expect(err).to.be.not.ok;

            context.adapter.unsubscribeForeignStates(`${context.adapterShortName}2.0.*`, () =>
                context.states.setState(sGid, 10, err => {
                    expect(err).to.be.not.ok;
                    setTimeout(() => {
                        context.onAdapterStateChanged = null;
                        done();
                    }, 1000);
                }),
            );
        });
    });

    // getState
    it(`${testName}Set/Get local state wit expiry`, function (done) {
        this.timeout(10000);

        const eGid = `${context.adapterShortName}.0.${gid}_expire`;
        context.adapter.setForeignObject(
            eGid,
            {
                common: {
                    read: true,
                    write: true,
                    name: 'test1_expire',
                    type: 'number',
                    role: 'level',
                    min: -100,
                    max: 100,
                },
                native: {},
                type: 'state',
            },
            function (err) {
                expect(err).to.be.null;

                let published = false;
                context.onAdapterStateChanged = function (id, state) {
                    if (id === eGid) {
                        expect(state).to.be.null;
                        context.onAdapterStateChanged = null;
                        published = true;
                    }
                };

                context.adapter.setState(`${gid}_expire`, { val: 1, expire: 4, ack: true }, function (err) {
                    expect(err).to.be.not.ok;

                    context.adapter.getState(`${gid}_expire`, function (err, state) {
                        // read directly, should work
                        expect(err).to.be.null;
                        expect(state).to.be.ok;
                        expect(state!.val).to.equal(1);
                        expect(state!.ack).to.equal(true);

                        context.adapter.subscribeForeignStates(eGid, function () {
                            setTimeout(() => {
                                // read after timeout, should not work
                                context.adapter.getState(`${gid}_expire`, function (err, state) {
                                    expect(err).to.be.not.ok;
                                    expect(state).to.be.null;
                                    expect(published).to.be.true;
                                    context.adapter.unsubscribeForeignStates(eGid, () => done());
                                });
                            }, 6000);
                        });
                    });
                });
            },
        );
    });

    it(`${testName}Should respect from`, done => {
        // we set a state and set a custom from property
        context.adapter.setState(`${gid}stateWithFrom`, { val: 1, from: 'Paris with love' }, err => {
            expect(err).to.be.not.ok;
            context.states.getState(`${context.adapter.namespace}.${gid}stateWithFrom`, (err, state) => {
                expect(err).to.be.not.ok;
                expect(state!.from).to.equal('Paris with love');
                done();
            });
        });
    });

    it(`${testName}Should use default from`, done => {
        // we set a state without providing `from` property
        context.adapter.setState(`${gid}stateWithFrom`, { val: 1 }, err => {
            expect(err).to.be.not.ok;
            context.states.getState(`${context.adapter.namespace}.${gid}stateWithFrom`, (err, state) => {
                expect(err).to.be.not.ok;
                expect(state!.from).to.equal(`system.adapter.${context.adapter.namespace}`);
                done();
            });
        });
    });

    /**
     TODO: Reactivate with next controller (02.05.2021)
    it(testName + 'Should decline undefined state value', async () => {
        // set state to 1
        await context.adapter.setStateAsync(`${gid}undefinedState`, 1);
        try {
            // we set state to undefined
            await context.adapter.setStateAsync(`${gid}undefinedState`, undefined);
            expect(1).to.be.equal(2, 'Should have thrown');
        } catch (e) {
            if (e.message.includes('undefined is not a valid state value')) {
                // correct error -> now check that we have old state
                const state = await context.adapter.getStateAsync(`${gid}undefinedState`);
                expect(state.val).to.equal(1);
            } else {
                throw new Error(e.message);
            }
        }
    });
     */

    it(`${testName}Should also set object id`, async () => {
        // set state with device, channel, state it is supported (legacy) but not recommended, so pass as any
        await context.adapter.setStateAsync({ device: `${gid}derGeraet`, channel: 'donau', state: 'awake' } as any, {
            val: 5,
        });
        const state = await context.adapter.getStateAsync({
            device: `${gid}derGeraet`,
            channel: 'donau',
            state: 'awake',
        } as any);
        expect(state!.val).to.equal(5);
        // check with string
        const stateTwo = await context.adapter.getStateAsync(`${gid}derGeraet.donau.awake`);
        expect(stateTwo!.val).to.equal(5);
        return Promise.resolve();
    });

    it(`${testName}Should round to next 5`, async () => {
        // we test the step attribute here
        await context.adapter.setObjectAsync(`${gid}step`, {
            common: {
                read: true,
                write: true,
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100,
                step: 5,
            },
            native: {},
            type: 'state',
        });

        // now the state should be rounded
        await context.adapter.setStateAsync(`${gid}step`, 13, true);

        let state = await context.adapter.getStateAsync(`${gid}step`);
        expect(state!.val).to.equal(15);

        // now with a negative value
        await context.adapter.setStateAsync(`${gid}step`, -18, true);

        state = await context.adapter.getStateAsync(`${gid}step`);
        expect(state!.val).to.equal(-20);
    });

    it(`${testName}Should throw on invalid subscribe`, async () => {
        expect(context.adapter.subscribeStatesAsync('hm-rpc.0.§.test')).to.be.rejectedWith(
            /is not a valid ID pattern/g,
            'Should throw on invalid pattern',
        );
        await context.adapter.subscribeStatesAsync('*hm-rpc.0._.**test/*');
    });

    it(`${testName}sendTo with timeout should reject in time`, () => {
        return expect(
            context.adapter.sendToAsync('testInstance.0', 'test', {}, { timeout: 500 }),
        ).to.be.eventually.rejectedWith('Timeout exceeded', 'Should have thrown after timeout is over');
    });
}
