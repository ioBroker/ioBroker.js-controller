/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

function prepareGroupsAndUsers(objects) {
    return objects.setObject('system.group.userC', {
        '_id': 'system.group.userC',
        'type': 'group',
        'common': {
            'name': {
                'en': 'User C',
                'de': 'Benutzer C',
                'ru': 'Пользователь',
                'pt': 'Do utilizador',
                'nl': 'Gebruiker',
                'fr': 'Utilisateur',
                'it': 'Utente',
                'es': 'Usuario',
                'pl': 'Użytkownik'
            },
            'description': {
                'en': 'Cannot modify everything',
                'de': 'Kann nicht alles ändern',
                'ru': 'Не может изменять все',
                'pt': 'Não é possível modificar tudo',
                'nl': 'Kan niet alles wijzigen',
                'fr': 'Impossible de tout modifier',
                'it': 'Non è possibile modificare tutto',
                'es': 'No se puede modificar todo',
                'pl': 'Nie można modyfikować wszystkiego'
            },
            'members': ['system.user.userC'],
            'dontDelete': true,
            'url': 'https://github.com/ioBroker/ioBroker.js-controller/archive/master.zip',
            'meta': 'https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/io-package.json',
            'acl': {
                'object': {
                    'list': true,
                    'read': true,
                    'write': false,
                    'delete': false
                },
                'state': {
                    'list': true,
                    'read': true,
                    'write': true,
                    'create': true,
                    'delete': false
                },
                'users': {
                    'list': true,
                    'read': true,
                    'write': false,
                    'create': false,
                    'delete': false
                },
                'other': {
                    'execute': false,
                    'http': true,
                    'sendto': false
                },
                'file': {
                    'list': true,
                    'read': true,
                    'write': false,
                    'create': false,
                    'delete': false
                }
            }
        }
    }).then(() => objects.setObject('system.user.userC', {
        '_id': 'system.user.userC',
        'common': {
            'name': 'UserC',
            'icon': '',
            'color': '#44d8f1',
            'desc': '',
            'enabled': true,
            'password': 'pbkdf2$10000$47785e10d8e468765c06b371f45981d625274dec3f8f6261b12d67320d07e7844e1e30df575f55ed3686804fbbae442ee9503c9c93fdcff4c46b8243200e1839b77fa18f769c9f71b13f12c4002e1cee03e6fa54878a2d6a9629589bd9169459989fc63abddce94690e5744e69658be43e1a9c7b38f1535eb9946a05394ee16f3724b75e0829ece04a05ef8848509d27b7944a9e064bba9341350d39d7a7e5bc4fe1980ae6da737c9e5e79e5a5a7e969825e94302c047a6054f3524b71c52acd33f2f83b1ed026c05af514da0a2e57c2267aeb10021f9503b5db02d8cc946421604f73548ceecc2a10b44be6a5b859e43e706cc86ee36b21984fc33abf9b2d66$0c4a5d538c84116846aac1c20fdc3fdd'
        },
        'type': 'user',
        'native': {},
        'from': 'system.adapter.admin.0',
        'user': 'system.user.admin',
        'ts': 1534947164702,
        'acl': {
            'object': 1636, // 0664
            'owner': 'system.user.admin',
            'ownerGroup': 'system.group.administrator'
        }
    })).then(() => objects.setObject('system.group.userD', {
        '_id': 'system.group.userD',
        'type': 'group',
        'common': {
            'name': {
                'en': 'User D',
                'de': 'Benutzer D',
                'ru': 'Пользователь',
                'pt': 'Do utilizador',
                'nl': 'Gebruiker',
                'fr': 'Utilisateur',
                'it': 'Utente',
                'es': 'Usuario',
                'pl': 'Użytkownik'
            },
            'description': {
                'en': 'Cannot modify everything',
                'de': 'Kann nicht alles ändern',
                'ru': 'Не может изменять все',
                'pt': 'Não é possível modificar tudo',
                'nl': 'Kan niet alles wijzigen',
                'fr': 'Impossible de tout modifier',
                'it': 'Non è possibile modificare tutto',
                'es': 'No se puede modificar todo',
                'pl': 'Nie można modyfikować wszystkiego'
            },
            'members': ['system.user.userD'],
            'dontDelete': true,
            'url': 'https://github.com/ioBroker/ioBroker.js-controller/archive/master.zip',
            'meta': 'https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/io-package.json',
            'acl': {
                'object': {
                    'list': true,
                    'read': true,
                    'write': false,
                    'delete': false
                },
                'state': {
                    'list': true,
                    'read': true,
                    'write': true,
                    'create': true,
                    'delete': false
                },
                'users': {
                    'list': true,
                    'read': true,
                    'write': false,
                    'create': false,
                    'delete': false
                },
                'other': {
                    'execute': false,
                    'http': true,
                    'sendto': false
                },
                'file': {
                    'list': true,
                    'read': true,
                    'write': false,
                    'create': false,
                    'delete': false
                }
            }
        }
    }).then(() => objects.setObject('system.user.userD', {
        '_id': 'system.user.userD',
        'common': {
            'name': 'UserC',
            'icon': '',
            'color': '#44d8f1',
            'desc': '',
            'enabled': true,
            'password': 'pbkdf2$10000$47785e10d8e468765c06b371f45981d625274dec3f8f6261b12d67320d07e7844e1e30df575f55ed3686804fbbae442ee9503c9c93fdcff4c46b8243200e1839b77fa18f769c9f71b13f12c4002e1cee03e6fa54878a2d6a9629589bd9169459989fc63abddce94690e5744e69658be43e1a9c7b38f1535eb9946a05394ee16f3724b75e0829ece04a05ef8848509d27b7944a9e064bba9341350d39d7a7e5bc4fe1980ae6da737c9e5e79e5a5a7e969825e94302c047a6054f3524b71c52acd33f2f83b1ed026c05af514da0a2e57c2267aeb10021f9503b5db02d8cc946421604f73548ceecc2a10b44be6a5b859e43e706cc86ee36b21984fc33abf9b2d66$0c4a5d538c84116846aac1c20fdc3fdd'
        },
        'type': 'user',
        'native': {},
        'from': 'system.adapter.admin.0',
        'user': 'system.user.admin',
        'ts': 1534947164702,
        'acl': {
            'object': 1636, // 0664
            'owner': 'system.user.admin',
            'ownerGroup': 'system.group.administrator'
        }
    })));
}

function register(it, expect, context) {
    const testName = context.name + ' ' + context.adapterShortName + ' aliases: ';
    const gid = 'someAdapter.0.testStates';
    const gAliasID = 'alias.0.testStates';

    // Scaling of aliases - when unit % is set to target or source
    it(testName + 'Read alias state', done => {
        context.adapter.setForeignObject(gid, {
            common: {
                name: 'forAlias',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {},
            type: 'state',
            acl: {
                object: 1536, // 0600
                owner: 'system.user.userC',
                ownerGroup: 'system.group.user1'
            }
        }, err => {
            expect(err).to.be.not.ok;
            context.adapter.setForeignState(gid, 2, true, err => {
                expect(err).to.be.not.ok;

                // create alias
                context.adapter.setForeignObject(gAliasID, {
                    common: {
                        name: 'Test Alias',
                        type: 'number',
                        role: 'state',
                        min: 0,
                        max: 100,
                        unit: '%',
                        alias: {
                            id: gid
                        }
                    },
                    native: {},
                    type: 'state',
                    acl: {
                        object: 1638, // 0666
                        owner: 'system.user.userC',
                        ownerGroup: 'system.group.user1'
                    }
                }, () => {
                    context.adapter.getForeignState(gAliasID, (err, state) => {
                        // It must be scaled from -100, 2, 100
                        // to                     0, 51, 100 %
                        expect(state.val.toFixed(3)).to.be.equal('51.000');
                        expect(state.ack).to.be.true;
                        done();
                    });
                });
            });
        });
    }).timeout(1000);

    it(testName + 'Read alias states', done => {
        context.adapter.setForeignObject(gid + '1', {
            common: {
                name: 'forAlias1',
                type: 'number',
                role: 'level'
            },
            native: {},
            type: 'state',
            acl: {
                object: 1536, // 0600
                owner: 'system.user.userC',
                ownerGroup: 'system.group.user1'
            }
        }, err => {
            expect(err).to.be.not.ok;
            context.adapter.setForeignState(gid + '1', 5, true, err => {
                expect(err).to.be.not.ok;

                // create alias
                context.adapter.setForeignObject(gAliasID + '1', {
                    common: {
                        name: 'Test Alias1',
                        type: 'number',
                        role: 'state',
                        min: -10,
                        max: 10,
                        alias: {
                            id: gid + '1'
                        }
                    },
                    native: {},
                    type: 'state',
                    acl: {
                        object: 1638, // 0666
                        owner: 'system.user.userC',
                        ownerGroup: 'system.group.user1'
                    }
                }, err => {
                    expect(err).to.be.not.ok;
                    context.adapter.getForeignStates(gAliasID + '1', (err, states) => {
                        // No scaling because no % and no min, max in source object
                        expect(states[gAliasID + '1'].val).to.be.equal(5);
                        expect(states[gAliasID + '1'].ack).to.be.true;

                        // original array should not be changed
                        const ids = [gAliasID + '1'];
                        context.adapter.getForeignStates(ids, (err, states) => {
                            // It must be scaled from -100, 2, 100
                            // to                     -10, 0.2, 10
                            expect(ids[0]).to.be.equal(gAliasID + '1');
                            expect(states[gAliasID + '1'].val).to.be.equal(5);
                            expect(states[gAliasID + '1'].ack).to.be.true;
                            done();
                        });
                    });
                });
            });
        });
    }).timeout(2000);

    it(testName + 'Write alias state', done => {
        context.adapter.setForeignState(gAliasID, 10, false, () => {
            context.adapter.getForeignState(gid, (err, state) => {
                // It must be scaled from 0, 10, 100
                // to                     -100, -80, 100
                expect(state.val.toFixed(3)).to.be.equal('-80.000');
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
        }, () => {
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
                }, () => {
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
                context.adapter.setForeignState(gAliasID, 10, false, {user: 'system.user.userC'}, () => {
                    context.adapter.getForeignState(gid, {user: 'system.user.userC'}, (err, state) => {
                        // It must be scaled from 0, 10, 100 %
                        // to                     -100, -80, 100
                        expect(state.val.toFixed(3)).to.be.equal('-80.000');
                        expect(state.ack).to.be.false;

                        context.adapter.setForeignState(gid, 10, false, {user: 'system.user.userC'}, () => {
                            context.adapter.getForeignState(gAliasID, {user: 'system.user.userC'}, (err, state) => {
                                // It must be scaled from -100, 10, 100
                                // to                     0, 55, 100 %
                                expect(state.val.toFixed(3)).to.be.equal('55.000');
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
                context.adapter.setForeignState(gAliasID, 10, false, {user: 'system.user.userD'}, err => {
                    expect(err.message).to.be.equal('permissionError');

                    context.adapter.getForeignState(gid, {user: 'system.user.userD'}, err => {
                        expect(err.message).to.be.equal('permissionError');
                        done();
                    });
                });
            });
    }).timeout(1000);

    // test subscriptions
    // subscribeForeignStates
    it(testName + 'Test subscribe aliases', done => {
        context.onAdapterStateChanged = (id, state) => {
            if (id === gAliasID) {
                expect(state).to.be.ok;
                // from -100 10 100 to 0 55 100 %
                expect(state.val.toFixed(3)).to.equal('55.000');
                context.onAdapterStateChanged = null;
                done();
            }
        };

        context.adapter.subscribeForeignStates(gAliasID, () =>
            context.states.setState(gid, 10, err =>
                expect(err).to.be.not.ok));
    }).timeout(1000);

    it(testName + 'Test unsubscribe aliases', done => {
        context.onAdapterStateChanged = () => {
            expect(true).to.be.false;
        };

        context.adapter.unsubscribeForeignStates(gAliasID, () => {
            context.states.setState(gid, 10, err => {
                expect(err).to.be.not.ok;
                setTimeout(() => done(), 500);
            });
        });
    }).timeout(1000);

    it(testName + 'Test subscribe aliases pattern', done => {
        context.onAdapterStateChanged = (id, state) => {
            if (id === gAliasID) {
                expect(state).to.be.ok;
                // from -100 10 100 to 0 55 100 %
                expect(state.val.toFixed(3)).to.equal('55.000');
                context.onAdapterStateChanged = null;
                done();
            }
        };

        const parts = gAliasID.split('.');
        parts.pop();

        context.adapter.subscribeForeignStates(parts.join('.') + '.*', () =>
            context.states.setState(gid, 10, err =>
                expect(err).to.be.not.ok));
    }).timeout(1000);

    it(testName + 'Test unsubscribe aliases pattern', done => {
        context.onAdapterStateChanged = () => {
            expect(true).to.be.false;
        };

        const parts = gAliasID.split('.');
        parts.pop();

        context.adapter.unsubscribeForeignStates(parts.join('.') + '.*', () => {
            context.states.setState(gid, 10, err => {
                expect(err).to.be.not.ok;
                setTimeout(() => done(), 500);
            });
        });
    }).timeout(1000);

    it(testName + 'Test negative subscribe aliases regex', done => {
        const parts = gAliasID.split('.');
        parts.pop();
        const regexp = new RegExp(parts.join('\\.') + '\\..*');

        context.adapter.subscribeForeignStates(regexp, err => {
            expect(err).to.be.ok;
            done();
        });
    }).timeout(1000);

    it(testName + 'Test unsubscribe aliases regex', done => {
        context.onAdapterStateChanged = () => {
            expect(true).to.be.false;
        };

        const parts = gAliasID.split('.');
        parts.pop();
        const regexp = new RegExp(parts.join('\\.') + '\\..*');

        context.adapter.unsubscribeForeignStates(regexp, () => {
            context.states.setState(gid, 10, err => {
                expect(err).to.be.not.ok;
                setTimeout(() => done(), 500);
            });
        });
    }).timeout(1000);

    it(testName + 'Test subscribe aliases array', done => {
        let count = 0;
        context.onAdapterStateChanged = (id, state) => {
            if (id === gAliasID) {
                count++;
                expect(state).to.be.ok;
                expect(state.val.toFixed(3)).to.equal('55.000');
                if (count === 2) {
                    context.onAdapterStateChanged = null;
                    done();
                }
            } else if (id === gid) {
                count++;
                expect(state).to.be.ok;
                expect(state.val).to.equal(10);
                if (count === 2) {
                    context.onAdapterStateChanged = null;
                    done();
                }
            }
        };

        context.adapter.subscribeForeignStates([gAliasID, gid], () =>
            context.states.setState(gid, 10, err =>
                expect(err).to.be.not.ok));
    }).timeout(1000);

    it(testName + 'Test unsubscribe aliases array', done => {
        context.onAdapterStateChanged = () => {
            expect(true).to.be.false;
        };

        context.adapter.unsubscribeForeignStates([gAliasID, gid], () => {
            context.states.setState(gid, 10, err => {
                expect(err).to.be.not.ok;
                setTimeout(() => done(), 500);
            });
        });
    }).timeout(1000);

    it(testName + 'Test change subscribed aliases', done => {
        context.onAdapterStateChanged = (id, state) => {
            if (id === gAliasID) {
                // A:
                expect(state).to.be.ok;
                expect(state.val.toFixed(3)).to.equal('55.000');

                // update alias
                context.adapter.setForeignObject(gAliasID, {
                    common: {
                        name: 'Test Alias',
                        type: 'number',
                        role: 'state',
                        min: 0,
                        max: 100,
                        unit: '%',
                        alias: {
                            id: gid + 'A'
                        }
                    },
                    native: {},
                    type: 'state',
                    acl: {
                        object: 1638, // 0666
                        owner: 'system.user.userC',
                        ownerGroup: 'system.group.user1'
                    }
                }, () => {
                    context.onAdapterStateChanged = context.onAdapterStateChanged = function (id, state) {
                        if (id === gAliasID) {
                            // A:
                            expect(state).to.be.ok;
                            // -200, 10 , 200 => 0, 52.5, 100
                            expect(state.val).to.equal(52.5);
                            context.adapter.unsubscribeForeignStates(gAliasID, () => {
                                context.states.setState(gid + 'A', 11, () => {
                                    done();
                                });
                            });
                        }
                    };

                    // give some time to update subscribes
                    setTimeout(() => {
                        // this change must be ignored
                        context.states.setState(gid, 20, () => {
                            context.states.setState(gid + 'A', 10, () => {

                            });
                        });
                    }, 100);
                });
            }
        };

        // create new alias
        context.adapter.setForeignObject(gid + 'A', {
            common: {
                name: 'forAliasA',
                type: 'number',
                role: 'level',
                min: -200,
                max: 200
            },
            native: {},
            type: 'state'
        }, () =>
            context.adapter.subscribeForeignStates(gAliasID, () =>
                context.states.setState(gid, 10, err =>
                    expect(err).to.be.not.ok))); // => GOTO A:

    }).timeout(3000);

    it(testName + 'Test subscribe "*"', done => {
        // 1. Create alias
        // 2. Create normal state (independent from alias)
        // 3. subscribe "*"
        // 4. changes must come for alias and independent state
        // 5. unsubscribe "*"
        // 6. changes must not come for any state

        // 1. create new alias
        context.adapter.setForeignObject(gid + 'Star', {
            common: {
                name: 'forAliasStar',
                type: 'number',
                role: 'level',
                min: 0,
                max: 100
            },
            native: {},
            type: 'state'
        }, () =>
            context.adapter.setForeignObject(gAliasID + 'Star', {
                common: {
                    name: 'Test Alias',
                    type: 'number',
                    role: 'state',
                    min: -10,
                    max: 10,
                    alias: {
                        id: gid + 'Star'
                    }
                },
                native: {},
                type: 'state'
            }, () =>
                // 2. Create normal state (independent from alias)
                context.adapter.setForeignObject(gid + 'NotAlias', {
                    common: {
                        name: 'NotForAliasStar',
                        type: 'number',
                        role: 'level',
                        min: 0,
                        max: 10
                    },
                    native: {},
                    type: 'state'
                }, () =>
                    context.adapter.subscribeForeignStates('*', () => {
                        let count = 0;
                        context.onAdapterStateChanged = (id, state) => {
                            // B:
                            if (id === gid + 'NotAlias') {
                                expect(state.val).to.be.equal(2);
                                count++;
                            } else if (id === gAliasID + 'Star') {
                                count++;
                                // no % -> no scaling
                                expect(state.val).to.be.equal(10);
                            } else if (id === gid + 'Star') {
                                count++;
                                expect(state.val).to.be.equal(10);
                            }

                            if (count === 3) {
                                // 6. changes must not come for any state
                                context.onAdapterStateChanged = () => {
                                    // C:
                                    expect('Shit happens!').to.be.equal('Should not happen');
                                };

                                // 5. unsubscribe "*"
                                context.adapter.unsubscribeForeignStates('*', () =>
                                    context.states.setState(gid + 'NotAlias', 3, () =>
                                        context.states.setState(gAliasID + 'Star', 5, () =>
                                            setTimeout(() => done(), 500))));
                            }
                        };

                        // 4. changes must come for alias and independent state
                        context.states.setState(gid + 'NotAlias', 2, () =>
                            context.states.setState(gid + 'Star', 10, () => {
                                // go to B:
                            }));
                    }))));
    }).timeout(3000);

    it(testName + 'Test newly created alias after subscribe', done => {
        // at first we subscribe
        context.adapter.subscribeForeignStates('*', err => {
            // create orig object
            expect(err).to.be.not.ok;
            context.adapter.setForeignObject(`${gid}afterSub`, {
                common: {
                    name: 'for Alias',
                    type: 'number',
                    role: 'level',
                    min: 0,
                    max: 100
                },
                native: {},
                type: 'state'
            }, err => {
                expect(err).to.be.not.ok;
                // alias created after existing subscription
                context.adapter.setForeignObject(`${gAliasID}afterSubAlias`, {
                    common: {
                        name: 'Test Alias',
                        type: 'number',
                        role: 'state',
                        min: -10,
                        max: 10,
                        alias: {
                            id: `${gid}afterSub`
                        }
                    },
                    native: {},
                    type: 'state'
                }, err => {
                    expect(err).to.be.not.ok;
                    // listen on state changes
                    context.onAdapterStateChanged = (id, state) => {
                        if (id === `${gAliasID}afterSubAlias`) {
                            // no % -> no scaling
                            expect(state.val).to.be.equal(50);
                            done();
                        }
                    };
                    // give adapter time to update alias subscription
                    setTimeout(() => {
                        context.states.setState(`${gid}afterSub`, 50);
                    }, 100);
                });
            });
        });
    }).timeout(3000);

    it(testName + 'Test newly created alias after partial subscribe', done => {
        // at first we subscribe, but only partial
        context.adapter.unsubscribeForeignStates('*', () => {
            context.adapter.subscribeForeignStates(`${gAliasID}okay*`, err => {
                // create orig object
                expect(err).to.be.not.ok;
                context.adapter.setForeignObject(`${gid}partialOrig`, {
                    common: {
                        name: 'for Alias',
                        type: 'number',
                        role: 'level',
                        min: 0,
                        max: 100
                    },
                    native: {},
                    type: 'state'
                }, err => {
                    expect(err).to.be.not.ok;
                    // alias created after existing subscription which does not match pattern
                    context.adapter.setForeignObject(`${gAliasID}notOkay`, {
                        common: {
                            name: 'Test Alias',
                            type: 'number',
                            role: 'state',
                            min: -10,
                            max: 10,
                            alias: {
                                id: `${gid}partialOrig`
                            }
                        },
                        native: {},
                        type: 'state'
                    }, err => {
                        expect(err).to.be.not.ok;
                        // listen on state changes

                        context.onAdapterStateChanged = id => {
                            if (id === `${gAliasID}notOkay`) {
                                clearTimeout(doneTimer);
                                expect('Sparta').to.be.equal('Athens');
                            }
                        };

                        // give adapter time to update alias subscription
                        setTimeout(() => {
                            context.states.setState(`${gid}partialOrig`, 50);
                        }, 100);

                        // if state change not triggered in 1 sec -> pass
                        const doneTimer = setTimeout(done, 1000);
                    });
                });
            });
        });
    }).timeout(3000);

    it(testName + 'should respect different read and write ids', done => {
        // first we subscribe to all
        context.adapter.subscribeForeignStates('*', err => {
            expect(err).to.not.be.ok;
            // define alias with different read and write
            context.adapter.setForeignObject(`${gAliasID}aliasReadWrite`, {
                common: {
                    name: 'Test Alias R/W',
                    type: 'number',
                    role: 'state',
                    min: -10,
                    max: 10,
                    alias: {
                        id: {
                            read: `${gid}readOrig`,
                            write: `${gid}writeOrig`
                        }
                    }
                },
                native: {},
                type: 'state'
            }, err => {
                expect(err).to.not.be.ok;
                // set our alias read obj
                context.adapter.setForeignObject(`${gid}readOrig`, {
                    common: {
                        name: 'Test ID read',
                        type: 'number',
                        role: 'state',
                        min: -10,
                        max: 10
                    },
                    native: {},
                    type: 'state'
                }, err => {
                    expect(err).to.not.be.ok;
                    // set our write object
                    context.adapter.setForeignObject(`${gid}writeOrig`, {
                        common: {
                            name: 'Test ID write',
                            type: 'number',
                            role: 'state',
                            min: -10,
                            max: 10
                        },
                        native: {},
                        type: 'state'
                    }, err => {
                        expect(err).to.not.be.ok;
                        // set a state to readOrig
                        context.adapter.setForeignState(`${gid}readOrig`, 5, err => {
                            expect(err).to.not.be.ok;
                            // check that our alias has val of read state
                            context.adapter.getForeignState(`${gAliasID}aliasReadWrite`, (err, state) => {
                                expect(err).to.not.be.ok;
                                expect(state.val).to.be.equal(5);
                                // now set the alias
                                context.adapter.setForeignState(`${gAliasID}aliasReadWrite`, -2, err => {
                                    expect(err).to.not.be.ok;
                                    context.adapter.getForeignState(`${gid}writeOrig`, (err, state) => {
                                        expect(err).to.not.be.ok;
                                        expect(state.val).to.be.equal(-2);
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

    it(testName + 'should respect alias read id on getForeignStates', async () => {
        // set our alias read obj
        await context.adapter.setForeignObjectAsync(`${gid}readGetStates`, {
            common: {
                name: 'Test ID read',
                type: 'number',
                role: 'state',
                def: 5,
                min: -10,
                max: 10
            },
            native: {},
            type: 'state'
        });

        await context.adapter.setForeignObjectAsync(`${gid}writeGetStates`, {
            common: {
                name: 'Test ID read',
                type: 'number',
                role: 'state',
                min: -10,
                max: 10,
                def: 10
            },
            native: {},
            type: 'state'
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
                        write: `${gid}writeGetStates`
                    }
                }
            },
            native: {},
            type: 'state'
        });

        // now perform getStates with pattern
        const states = await context.adapter.getForeignStatesAsync(`${gAliasID}aliasReadWriteGetStates*`);

        // read def is 5
        expect(states[`${gAliasID}aliasReadWriteGetStates`].val).to.be.equal(5);
    });
}

module.exports.register = register;
