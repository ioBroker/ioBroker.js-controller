/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

function prepareGroupsAndUsers(objects) {
    return objects.setObject('system.group.userC', {
        '_id' : 'system.group.userC',
        'type' : 'group',
        'common' : {
            'name' : {
                'en' : 'User C',
                'de' : 'Benutzer C',
                'ru' : 'Пользователь',
                'pt' : 'Do utilizador',
                'nl' : 'Gebruiker',
                'fr' : 'Utilisateur',
                'it' : 'Utente',
                'es' : 'Usuario',
                'pl' : 'Użytkownik'
            },
            'description' : {
                'en' : 'Cannot modify everything',
                'de' : 'Kann nicht alles ändern',
                'ru' : 'Не может изменять все',
                'pt' : 'Não é possível modificar tudo',
                'nl' : 'Kan niet alles wijzigen',
                'fr' : 'Impossible de tout modifier',
                'it' : 'Non è possibile modificare tutto',
                'es' : 'No se puede modificar todo',
                'pl' : 'Nie można modyfikować wszystkiego'
            },
            'members' : ['system.user.userC'],
            'dontDelete' : true,
            'url' : 'https://github.com/ioBroker/ioBroker.js-controller/archive/master.zip',
            'meta' : 'https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/io-package.json',
            'acl' : {
                'object' : {
                    'list' : true,
                    'read' : true,
                    'write' : false,
                    'delete' : false
                },
                'state' : {
                    'list' : true,
                    'read' : true,
                    'write' : true,
                    'create' : true,
                    'delete' : false
                },
                'users' : {
                    'list' : true,
                    'read' : true,
                    'write' : false,
                    'create' : false,
                    'delete' : false
                },
                'other' : {
                    'execute' : false,
                    'http' : true,
                    'sendto' : false
                },
                'file' : {
                    'list' : true,
                    'read' : true,
                    'write' : false,
                    'create' : false,
                    'delete' : false
                }
            }
        }
    }).then(() => objects.setObject('system.user.userC', {
        '_id' : 'system.user.userC',
        'common' : {
            'name' : 'UserC',
            'icon' : '',
            'color' : '#44d8f1',
            'desc' : '',
            'enabled' : true,
            'password' : 'pbkdf2$10000$47785e10d8e468765c06b371f45981d625274dec3f8f6261b12d67320d07e7844e1e30df575f55ed3686804fbbae442ee9503c9c93fdcff4c46b8243200e1839b77fa18f769c9f71b13f12c4002e1cee03e6fa54878a2d6a9629589bd9169459989fc63abddce94690e5744e69658be43e1a9c7b38f1535eb9946a05394ee16f3724b75e0829ece04a05ef8848509d27b7944a9e064bba9341350d39d7a7e5bc4fe1980ae6da737c9e5e79e5a5a7e969825e94302c047a6054f3524b71c52acd33f2f83b1ed026c05af514da0a2e57c2267aeb10021f9503b5db02d8cc946421604f73548ceecc2a10b44be6a5b859e43e706cc86ee36b21984fc33abf9b2d66$0c4a5d538c84116846aac1c20fdc3fdd'
        },
        'type' : 'user',
        'native' : {},
        'from' : 'system.adapter.admin.0',
        'user' : 'system.user.admin',
        'ts' : 1534947164702,
        'acl' : {
            'object' : 1636, // 0664
            'owner' : 'system.user.admin',
            'ownerGroup' : 'system.group.administrator'
        }
    })).then(() => objects.setObject('system.group.userD', {
        '_id' : 'system.group.userD',
        'type' : 'group',
        'common' : {
            'name' : {
                'en' : 'User D',
                'de' : 'Benutzer D',
                'ru' : 'Пользователь',
                'pt' : 'Do utilizador',
                'nl' : 'Gebruiker',
                'fr' : 'Utilisateur',
                'it' : 'Utente',
                'es' : 'Usuario',
                'pl' : 'Użytkownik'
            },
            'description' : {
                'en' : 'Cannot modify everything',
                'de' : 'Kann nicht alles ändern',
                'ru' : 'Не может изменять все',
                'pt' : 'Não é possível modificar tudo',
                'nl' : 'Kan niet alles wijzigen',
                'fr' : 'Impossible de tout modifier',
                'it' : 'Non è possibile modificare tutto',
                'es' : 'No se puede modificar todo',
                'pl' : 'Nie można modyfikować wszystkiego'
            },
            'members' : ['system.user.userD'],
            'dontDelete' : true,
            'url' : 'https://github.com/ioBroker/ioBroker.js-controller/archive/master.zip',
            'meta' : 'https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/io-package.json',
            'acl' : {
                'object' : {
                    'list' : true,
                    'read' : true,
                    'write' : false,
                    'delete' : false
                },
                'state' : {
                    'list' : true,
                    'read' : true,
                    'write' : true,
                    'create' : true,
                    'delete' : false
                },
                'users' : {
                    'list' : true,
                    'read' : true,
                    'write' : false,
                    'create' : false,
                    'delete' : false
                },
                'other' : {
                    'execute' : false,
                    'http' : true,
                    'sendto' : false
                },
                'file' : {
                    'list' : true,
                    'read' : true,
                    'write' : false,
                    'create' : false,
                    'delete' : false
                }
            }
        }
    }).then(() => objects.setObject('system.user.userD', {
        '_id' : 'system.user.userD',
        'common' : {
            'name' : 'UserC',
            'icon' : '',
            'color' : '#44d8f1',
            'desc' : '',
            'enabled' : true,
            'password' : 'pbkdf2$10000$47785e10d8e468765c06b371f45981d625274dec3f8f6261b12d67320d07e7844e1e30df575f55ed3686804fbbae442ee9503c9c93fdcff4c46b8243200e1839b77fa18f769c9f71b13f12c4002e1cee03e6fa54878a2d6a9629589bd9169459989fc63abddce94690e5744e69658be43e1a9c7b38f1535eb9946a05394ee16f3724b75e0829ece04a05ef8848509d27b7944a9e064bba9341350d39d7a7e5bc4fe1980ae6da737c9e5e79e5a5a7e969825e94302c047a6054f3524b71c52acd33f2f83b1ed026c05af514da0a2e57c2267aeb10021f9503b5db02d8cc946421604f73548ceecc2a10b44be6a5b859e43e706cc86ee36b21984fc33abf9b2d66$0c4a5d538c84116846aac1c20fdc3fdd'
        },
        'type' : 'user',
        'native' : {},
        'from' : 'system.adapter.admin.0',
        'user' : 'system.user.admin',
        'ts' : 1534947164702,
        'acl' : {
            'object' : 1636, // 0664
            'owner' : 'system.user.admin',
            'ownerGroup' : 'system.group.administrator'
        }
    })));
}

function register(it, expect, context) {
    const testName = context.name + ' ' + context.adapterShortName + ' aliases: ';
    const gid = 'someAdapter.0.testStates';
    const gAliasID = 'alias.0.testStates';

    // Scaling of aliases
    it(testName + 'Read alias state', done => {
        context.adapter.setForeignObject(gid, {
            common: {
                name: 'forAlias',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {
            },
            type: 'state',
            acl : {
                object: 1536, // 0600
                owner: 'system.user.userC',
                ownerGroup: 'system.group.user1'
            }
        }, err => {
            context.adapter.setForeignState(gid, 2, true, err => {
                expect(err).to.be.not.ok;
                
                // create alias
                context.adapter.setForeignObject(gAliasID, {
                    common: {
                        name: 'Test Alias',
                        type: 'number',
                        role: 'state',
                        min: -10,
                        max: 10,
                        alias: {
                            id: gid
                        }
                    },
                    native: {},
                    type: 'state',
                    acl : {
                        object: 1638, // 0666
                        owner: 'system.user.userC',
                        ownerGroup: 'system.group.user1'
                    }
                }, err => {
                    context.adapter.getForeignState(gAliasID, (err, state) => {
                        // It must be scaled from -100, 2, 100
                        // to                     -10, 0.2, 10
                        expect(state.val.toFixed(3)).to.be.equal('0.200');
                        expect(state.ack).to.be.true;
                        done();
                    });
                });
            });
        });
    }).timeout(1000);

    it(testName + 'Write alias state', done => {
        context.adapter.setForeignState(gAliasID, 10, false, (err, state) => {
            context.adapter.getForeignState(gid, (err, state) => {
                // It must be scaled from -10, 10, 10
                // to                     -100, 100, 100
                expect(state.val.toFixed(3)).to.be.equal('100.000');
                expect(state.ack).to.be.false;
                done();
            });
        });
    }).timeout(1000);

    // custom read/write functions
    it(testName + 'Use convert state', done => {
        context.adapter.setForeignObject(gid + 'C', {
            common: {
                name: 'forAliasC',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {},
            type: 'state'
        }, err => {
            context.adapter.setForeignState(gid + 'C', 2, true, err => {
                expect(err).to.be.not.ok;

                // create alias
                context.adapter.setForeignObject(gAliasID + 'C', {
                    common: {
                        name: 'Test AliasC',
                        type: 'number',
                        role: 'state',
                        min: -10,
                        max: 10,
                        alias: {
                            id: gid + 'C',
                            read: 'val * 10 + 1',
                            write: '(val - 1) / 10'
                        }
                    },
                    native: {},
                    type: 'state'
                }, err => {
                    context.adapter.getForeignState(gAliasID + 'C', (err, state) => {
                        // It must be converted 2 * 10 + 1
                        expect(state.val.toFixed(3)).to.be.equal('21.000');

                        expect(state.ack).to.be.true;

                        context.adapter.setForeignState(gAliasID + 'C', 41, true, err => {
                            expect(err).to.be.not.ok;
                            context.adapter.getForeignState(gid + 'C', (err, state) => {
                                expect(state.val.toFixed(3)).to.be.equal('4.000');

                                expect(state.ack).to.be.true;
                                done();
                            });
                        });
                    });
                });
            });
        });
    }).timeout(1000);

    it(testName + 'Read alias state by not admin', done => {
        prepareGroupsAndUsers(context.objects)
            .then(() => {
                context.adapter.setForeignState(gAliasID, 10, false, {user: 'system.user.userC'}, (err, state) => {
                    context.adapter.getForeignState(gid, {user: 'system.user.userC'}, (err, state) => {
                        // It must be scaled from -10, 10, 10
                        // to                     -100, 100, 100
                        expect(state.val.toFixed(3)).to.be.equal('100.000');
                        expect(state.ack).to.be.false;

                        context.adapter.setForeignState(gid, 10, false, {user: 'system.user.userC'}, (err, state) => {
                            context.adapter.getForeignState(gAliasID, {user: 'system.user.userC'}, (err, state) => {
                                // It must be scaled from -10, 10, 10
                                // to                     -100, 100, 100
                                expect(state.val.toFixed(3)).to.be.equal('1.000');
                                expect(state.ack).to.be.false;
                                done();
                            });
                        });
                    });
                });
            });
    }).timeout(1000);

    it(testName + 'Read alias state by not admin without rights', done => {
        prepareGroupsAndUsers(context.objects)
            .then(() => {
                context.adapter.setForeignState(gAliasID, 10, false, {user: 'system.user.userD'}, (err, state) => {
                    expect(err).to.be.equal('permissionError');

                    context.adapter.getForeignState(gid, {user: 'system.user.userD'}, (err, state) => {
                        expect(err).to.be.equal('permissionError');
                        done();
                    });
                });
            });
    }).timeout(1000);

    // test subscriptions
    // subscribeForeignStates
    it(testName + 'Test subscribe aliases', done => {
        context.onAdapterStateChanged = function (id, state) {
            if (id === gAliasID) {
                expect(state).to.be.ok;
                expect(state.val).to.equal(1);
                context.onAdapterStateChanged = null;
                done();
            }
        };

        context.adapter.subscribeForeignStates(gAliasID, () =>
            context.states.setState(gid, 10, err =>
                expect(err).to.be.not.ok));
    }).timeout(1000);

    it(testName + 'Test unsubscribe aliases', done => {
        context.onAdapterStateChanged = function (id, state) {
            expect(true).to.be.false;
        };

        context.adapter.unsubscribeForeignStates(gAliasID, () => {
            context.states.setState(gid, 10, err => {
                expect(err).to.be.not.ok;
                setTimeout(() => done(), 500);
            });
        });
    }).timeout(1000);

    /*
    // getState
    it(testName + 'Get local state', function (done) {
        this.timeout(1000);
        context.adapter.getState(gid, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                expect(err).to.be.null;
                expect(state).to.be.ok;
                expect(state.val).to.equal(3);
                expect(state.ack).to.equal(true);

                // ask for non-existing state
                context.adapter.getState(gid + '6', function (err, state) {
                    expect(err).to.be.not.ok;
                    expect(state).to.be.not.ok;
                    done();
                });
            });
        });
    });

    // getStates
    it(testName + 'Get local states', function (done) {
        this.timeout(1000);
        context.adapter.getStates('*', function (err, states) {
            expect(err).to.be.not.ok;
            expect(states).to.be.an('object');
            expect(states[context.adapterShortName + '.0.' + gid]).to.be.ok;
            expect(states[context.adapterShortName + '.0.' + gid].val).to.equal(3);
            expect(states[context.adapterShortName + '.0.' + gid].ack).equal(true);

            context.adapter.getStates('abc*', function (err, states) {
                expect(err).to.be.not.ok;
                expect(states).to.be.an('object');
                let found = false;
                // TODO: what does this loop do?
                for(const _a in states) {
                    found = true;
                }
                expect(found).to.be.false;

                context.adapter.getStates(gid.substring(0, gid.length - 2) + '*', function (err, states) {
                    expect(err).to.be.not.ok;
                    expect(states).to.be.an('object');
                    expect(states[context.adapterShortName + '.0.' + gid]).to.be.ok;
                    expect(states[context.adapterShortName + '.0.' + gid].val).to.equal(3);
                    expect(states[context.adapterShortName + '.0.' + gid].ack).equal(true);

                    done();
                });
            });
        });
    });

    // delState
    it(testName + 'Delete local state', function (done) {
        this.timeout(1000);
        context.adapter.delState(gid, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.getState(gid, function (err, state) {
                expect(err).to.be.not.ok;
                expect(state).to.be.not.ok;

                context.adapter.delState(gid, function (err) {
                    expect(err).to.be.not.ok;

                    done();
                });
            });
        });
    });

    // setStateChanged
    it(testName + 'Set local state if changed', function (done)  {
        // create object
        context.adapter.setObject(gid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {
            },
            type: 'state'
        }, function (err) {
            expect(err).to.be.null;
            const ts = new Date().getTime() - 1000;
            context.adapter.setState(gid, {val: 1, ts: ts, ack: false}, function (err) {
                expect(err).to.be.not.ok;
                context.adapter.setStateChanged(gid, 1, function (err, id, notChanged) {
                    expect(err).to.be.not.ok;
                    // redis do not return ID
                    expect(id).to.be.equal(context.adapterShortName + '.0.' + gid);
                    expect(notChanged).to.be.true;

                    context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                        expect(err).to.be.not.ok;
                        expect(state).to.be.ok;
                        expect(state.ts).to.be.equal(ts);

                        context.adapter.setStateChanged(gid, 1, true, function (err, id, notChanged) {
                            expect(err).to.be.not.ok;
                            expect(id).to.be.equal(context.adapterShortName + '.0.' + gid);
                            expect(notChanged).to.be.false;

                            context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                                expect(err).to.be.not.ok;
                                expect(state).to.be.ok;
                                expect(state.ack).to.be.true;
                                expect(state.ts).to.be.not.equal(ts);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    // subscribeStates
    it(testName + 'Test subscribe local states', function (done) {
        this.timeout(1000);
        const sGid = gid + '5';

        context.adapter.setObject(sGid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {
            },
            type: 'state'
        }, function (err) {
            expect(err).to.be.null;

            context.states.setState(context.adapterShortName + '.0.' + sGid, 9, function (err) {
                expect(err).to.be.not.ok;

                context.onAdapterStateChanged = function (id, state) {
                    if (id === context.adapterShortName + '.0.' + sGid) {
                        expect(state).to.be.ok;
                        expect(state.val).to.equal(10);
                        context.onAdapterStateChanged = null;
                        done();
                    }
                };

                context.adapter.subscribeStates('*', function () {
                    context.states.setState(context.adapterShortName + '.0.' + sGid, 10, function (err) {
                        expect(err).to.be.not.ok;
                    });
                });
            });
        });
    });

    // unsubscribeStates
    it(testName + 'Test unsubscribe local states', function (done) {
        this.timeout(1000);
        const sGid = gid + '5';

        context.onAdapterStateChanged = function (id, state) {
            if (id === context.adapterShortName + '.0.' + sGid) {
                expect(state).to.be.ok;
                expect(state.val).to.equal(9);
            }
        };

        context.states.setState(context.adapterShortName + '.0.' + sGid, 9, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.unsubscribeStates('*', function () {
                context.states.setState(context.adapterShortName + '.0.' + sGid, 10, function (err) {
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
    it(testName + 'Set foreign state', function (done) {
        this.timeout(1000);
        const fGid = context.adapterShortName + '1.0.' + gid;
        context.objects.setObject(fGid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {
            },
            type: 'state'
        }, function (err) {
            expect(err).to.be.null;

            context.states.getState(fGid, function (err, _state) {
                expect(err).to.be.null;

                context.adapter.setForeignState(fGid, 1, function (err) {
                    expect(err).to.be.not.ok;

                    context.states.getState(fGid, function (err, state) {
                        expect(err).to.be.null;
                        expect(state).to.be.ok;
                        expect(state.val).to.equal(1);
                        expect(state.ack).to.equal(false);

                        context.adapter.setForeignState(fGid, 2, true, function (err) {
                            expect(err).to.be.not.ok;

                            context.states.getState(fGid, function (err, state) {
                                expect(err).to.be.null;
                                expect(state).to.be.ok;
                                expect(state.val).to.equal(2);
                                expect(state.ack).to.equal(true);

                                context.adapter.setForeignState(fGid, {val: 3, ack: true}, function (err) {
                                    expect(err).to.be.not.ok;

                                    context.states.getState(fGid, function (err, state) {
                                        expect(err).to.be.null;
                                        expect(state).to.be.ok;
                                        expect(state.val).to.equal(3);
                                        expect(state.ack).to.equal(true);
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // setForeignState with acl all
    it(testName + 'Set foreign state with acl', function (done) {
        this.timeout(1000);
        const fGid = context.adapterShortName + '3.0.' + gid;
        context.adapter.setForeignObject('system.group.writer2', {
            'common': {
                'name': 'Writer2',
                'desc': '',
                'members': [
                    'system.user.write-only2'
                ],
                'acl': {
                    'object': {
                        'list': false,
                        'read': true, // required to read permissions
                        'write': false,
                        'delete': false
                    },
                    'state': {
                        'list': false,
                        'read': false,
                        'write': true,
                        'create': false,
                        'delete': false
                    },
                    'users': {
                        'write': false,
                        'create': false,
                        'delete': false
                    },
                    'other': {
                        'execute': false,
                        'http': false,
                        'sendto': false
                    },
                    'file': {
                        'list': false,
                        'read': false,
                        'write': false,
                        'create': false,
                        'delete': false
                    }
                }
            },
            'native': {},
            'acl': {
                'object': 1638, // 0666
                'owner': 'system.user.admin',
                'ownerGroup': 'system.group.administrator'
            },
            '_id': 'system.group.writer2',
            'type': 'group'
        }, function (err) {
            expect(err).to.be.null;

            context.adapter.setForeignObject('system.user.write-only2', {
                'type': 'user',
                'common': {
                    'name': 'write-only2',
                    'enabled': true,
                    'groups': [],
                    'password': 'pbkdf2$10000$ab4104d8bb68390ee7e6c9397588e768de6c025f0c732c18806f3d1270c83f83fa86a7bf62583770e5f8d0b405fbb3ad32214ef3584f5f9332478f2506414443a910bf15863b36ebfcaa7cbb19253ae32cd3ca390dab87b29cd31e11be7fa4ea3a01dad625d9de44e412680e1a694227698788d71f1e089e5831dc1bbacfa794b45e1c995214bf71ee4160d98b4305fa4c3e36ee5f8da19b3708f68e7d2e8197375c0f763d90e31143eb04760cc2148c8f54937b9385c95db1742595634ed004fa567655dfe1d9b9fa698074a9fb70c05a252b2d9cf7ca1c9b009f2cd70d6972ccf0ee281d777d66a0346c6c6525436dd7fe3578b28dca2c7adbfde0ecd45148$31c3248ba4dc9600a024b4e0e7c3e585'
                },
                '_id': 'system.user.write-only2',
                'native': {},
                'acl': {
                    'object': 1638 // 0666
                }
            }, function (_err) {

                context.objects.setObject(fGid, {
                    common: {
                        name: 'test1',
                        type: 'number',
                        role: 'level',
                        min: -100,
                        def: 10,
                        max: 100
                    },
                    native: {
                    },
                    type: 'state',
                    acl: {
                        object: 1638, // 0666
                        owner: 'system.user.write-only2',
                        ownerGroup: 'system.group.administrator',
                        state: 1638 // 0666
                    }
                }, function (err) {
                    expect(err).to.be.null;
                    context.adapter.setForeignState(fGid, 1, false, function (_err) {
                        context.states.getState(fGid, function (err, state) {
                            expect(err).to.be.null;
                            expect(state).to.be.ok;
                            expect(state.val).to.be.equal(1);

                            context.adapter.setForeignState(fGid, 2, false, {user: 'system.user.write-only2'}, err => {
                                expect(err).to.be.not.ok;

                                context.states.getState(fGid, (err, state) => {
                                    expect(err).to.be.null;
                                    expect(state).to.be.ok;
                                    expect(state.val).to.equal(2);
                                    expect(state.ack).to.equal(false);
                                    context.adapter.getForeignState(fGid, {user: 'system.user.write-only2'}, (err, state) => {
                                        expect(err).to.be.ok;
                                        expect(state).to.be.not.ok;
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // setForeignState with acl failure
    it(testName + 'Set foreign state with acl failure', function (done) {
        this.timeout(1000);
        const fGid = context.adapterShortName + '3.1.' + gid;

        context.objects.setObject(fGid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {
            },
            type: 'state',
            acl: {
                object: 102,
                owner: 'system.user.write-only',
                ownerGroup:'system.group.administrator',
                state: 102
            }
        }, function (err) {
            expect(err).to.be.null;

            context.states.getState(fGid, function (err, _state) {
                expect(err).to.be.null;

                context.adapter.setForeignState(fGid, 1, false, {user: 'system.user.write-only'}, function (err) {
                    expect(err).to.be.equal('permissionError');
                    done();
                });
            });
        });
    });

    // setForeignState with acl write only
    it(testName + 'Set foreign state with acl write only', function (done) {
        this.timeout(1000);
        const fGid = context.adapterShortName + '3.0.' + gid;
        context.objects.setObject(fGid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {
            },
            type: 'state',
            acl: {
                object: 1126,
                owner: 'system.user.write-only2',
                ownerGroup:'system.group.administrator',
                state: 614
            }
        }, function (err) {
            expect(err).to.be.null;

            context.states.getState(fGid, function (err, _state) {
                expect(err).to.be.null;

                context.adapter.setForeignState(fGid, 1, false, {user: 'system.user.write-only2'}, function (err) {
                    expect(err).to.be.not.ok;

                    context.states.getState(fGid, function (err, state) {
                        expect(err).to.be.null;
                        expect(state).to.be.ok;
                        expect(state.val).to.equal(1);
                        expect(state.ack).to.equal(false);
                        done();
                    });
                });
            });
        });
    });

    // setForeignStateChanged
    it(testName + 'Set foreign state if changed', function (done)  {
        // create object
        const fGid = context.adapterShortName + '1.0.1' + gid;
        context.adapter.setForeignObject(fGid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {
            },
            type: 'state'
        }, function (err) {
            expect(err).to.be.null;
            const ts = new Date().getTime() - 1000;
            context.adapter.setForeignState(fGid, {val: 1, ts: ts, ack: false}, function (err) {
                expect(err).to.be.not.ok;
                context.adapter.setForeignStateChanged(fGid, 1, function (err, id, notChanged) {
                    expect(err).to.be.not.ok;
                    // redis do not return ID
                    expect(id).to.be.equal(fGid);
                    expect(notChanged).to.be.true;

                    context.states.getState(fGid, function (err, state) {
                        expect(err).to.be.not.ok;
                        expect(state).to.be.ok;
                        expect(state.ts).to.be.equal(ts);

                        context.adapter.setForeignStateChanged(fGid, 1, true, function (err, id, notChanged) {
                            expect(err).to.be.not.ok;
                            expect(id).to.be.equal(fGid);
                            expect(notChanged).to.be.false;

                            context.states.getState(fGid, function (err, state) {
                                expect(err).to.be.not.ok;
                                expect(state).to.be.ok;
                                expect(state.ack).to.be.true;
                                expect(state.ts).to.be.not.equal(ts);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    // getForeignState
    it(testName + 'Get foreign state', function (done) {
        this.timeout(1000);
        const fGid = context.adapterShortName + '1.0.' + gid;
        context.adapter.getForeignState(fGid, function (err, state) {
            expect(err).to.be.null;
            expect(state).to.be.ok;
            expect(state.val).to.equal(3);
            expect(state.ack).to.equal(true);

            // ask for non-existing state
            context.adapter.getForeignState(fGid + '5', function (err, state) {
                expect(err).to.be.not.ok;
                expect(state).to.be.not.ok;
                done();
            });
        });
    });

    // getForeignStates
    it(testName + 'Get foreign states', function (done) {
        this.timeout(1000);
        context.adapter.getForeignStates(context.adapterShortName + '1.0.*', function (err, states) {
            expect(err).to.be.not.ok;
            expect(states).to.be.an('object');
            expect(states[context.adapterShortName + '1.0.' + gid]).to.be.ok;
            expect(states[context.adapterShortName + '1.0.' + gid].val).to.equal(3);
            expect(states[context.adapterShortName + '1.0.' + gid].ack).equal(true);

            context.adapter.getForeignStates(context.adapterShortName + '1.0.abc*', function (err, states) {
                expect(err).to.be.not.ok;
                expect(states).to.be.an('object');
                let found = false;
                for(const _a in states) {
                    found = true;
                }
                expect(found).to.be.false;

                context.adapter.getForeignStates(context.adapterShortName + '1.0.' + gid.substring(0, gid.length - 2) + '*', function (err, states) {
                    expect(err).to.be.not.ok;
                    expect(states).to.be.an('object');
                    expect(states[context.adapterShortName + '1.0.' + gid]).to.be.ok;
                    expect(states[context.adapterShortName + '1.0.' + gid].val).to.equal(3);
                    expect(states[context.adapterShortName + '1.0.' + gid].ack).equal(true);

                    done();
                });
            });
        });
    });

    // delForeignState
    it(testName + 'Delete foreign state', function (done) {
        this.timeout(1000);
        context.adapter.delForeignState(context.adapterShortName + '1.0.' + gid, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.getForeignState(context.adapterShortName + '1.0.' + gid, function (err, state) {
                expect(err).to.be.not.ok;
                expect(state).to.be.not.ok;

                context.adapter.delForeignState(context.adapterShortName + '1.0.' + gid, function (err) {
                    expect(err).to.be.not.ok;

                    done();
                });
            });
        });
    });

    // get foreign system state
    it(testName + 'Get System State', function (done) {
        this.timeout(3000);

        context.adapter.getForeignState('system.context.adapter.test.0.memRss', (err, state) => {
            expect(err).to.be.null;
            expect(state).to.be.ok;
            expect(state.val).to.be.ok;
            done();
        });
    });

    // subscribeForeignStates
    it(testName + 'Test subscribe foreign states', function (done) {
        this.timeout(1000);
        const sGid = context.adapterShortName + '2.0.' + gid + '6';

        context.adapter.setForeignObject(sGid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {
            },
            type: 'state'
        }, function (err) {
            expect(err).to.be.null;

            context.states.setState(sGid, 9, function (err) {
                expect(err).to.be.not.ok;

                context.onAdapterStateChanged = function (id, state) {
                    if (id === sGid) {
                        expect(state).to.be.ok;
                        expect(state.val).to.equal(10);
                        context.onAdapterStateChanged = null;
                        done();
                    }
                };

                context.adapter.subscribeForeignStates(context.adapterShortName + '2.0.*', function () {
                    context.states.setState(sGid, 10, function (err) {
                        expect(err).to.be.not.ok;
                    });
                });
            });
        });
    });

    // unsubscribeForeignStates
    it(testName + 'Test unsubscribe foreign states', function (done) {
        this.timeout(4000);
        const sGid = context.adapterShortName + '2.0.' + gid + '6';

        context.onAdapterStateChanged = function (id, state) {
            if (id === sGid) {
                expect(state).to.be.ok;
                expect(state.val).to.be.not.equal(10);
            }
        };

        context.states.setState(sGid, 9, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.unsubscribeForeignStates(context.adapterShortName + '2.0.*', function () {
                context.states.setState(sGid, 10, function (err) {
                    expect(err).to.be.not.ok;
                    setTimeout(function () {
                        context.onAdapterStateChanged = null;
                        done();
                    }, 2000);
                });
            });
        });
    });*/

    // getHistory - cannot be tested
}

module.exports.register = register;
