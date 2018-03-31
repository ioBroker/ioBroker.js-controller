/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

function register(it, expect, context) {
    const testName = context.name + ' ' + context.adapterShortName + ' adapter: ';
    const gid = 'testStates';

    // setState
    it(testName + 'Set local state', function (done) {
        this.timeout(1000);
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

            context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                expect(err).to.be.null;

                context.adapter.setState(gid, 1, function (err) {
                    expect(err).to.be.not.ok;

                    context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                        expect(err).to.be.null;
                        expect(state).to.be.ok;
                        expect(state.val).to.equal(1);
                        expect(state.ack).to.equal(false);

                        context.adapter.setState(gid, 2, true, function (err) {
                            expect(err).to.be.not.ok;

                            context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                                expect(err).to.be.null;
                                expect(state).to.be.ok;
                                expect(state.val).to.equal(2);
                                expect(state.ack).to.equal(true);

                                context.adapter.setState(gid, {val: 3, ack: true}, function (err) {
                                    expect(err).to.be.not.ok;

                                    context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
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
                var found = false;
                for(var a in states) {
                    found = true;
                }
                expect(found).to.be.false;

                var iid = gid;
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
            var ts = new Date().getTime() - 1000;
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
        var sGid = gid + '5';

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
        var sGid = gid + '5';

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
        var fGid = context.adapterShortName + '1.0.' + gid;
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

            context.states.getState(fGid, function (err, state) {
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
        var fGid = context.adapterShortName + '3.0.' + gid;
        context.adapter.setForeignObject('system.group.writer2', {
          "common": {
            "name": "Writer2",
            "desc": "",
            "members": [
              "system.user.write-only2"
            ],
            "acl": {
              "object": {
                "list": false,
                "read": false,
                "write": false,
                "delete": false
              },
              "state": {
                "list": false,
                "read": true,
                "write": false,
                "create": false,
                "delete": false
              },
              "users": {
                "write": false,
                "create": false,
                "delete": false
              },
              "other": {
                "execute": false,
                "http": false,
                "sendto": false
              },
              "file": {
                "list": false,
                "read": false,
                "write": false,
                "create": false,
                "delete": false
              }
            }
          },
          "native": {},
          "acl": {
            "object": 1638,
            "owner": "system.user.admin",
            "ownerGroup": "system.group.administrator"
          },
          "_id": "system.group.writer2",
          "type": "group"
        }, function (err) {
            expect(err).to.be.null;

            context.adapter.setForeignObject('system.user.write-only2', {
                "type": "user",
                "common": {
                    "name": "write-only2",
                    "enabled": true,
                    "groups": [],
                    "password": "pbkdf2$10000$ab4104d8bb68390ee7e6c9397588e768de6c025f0c732c18806f3d1270c83f83fa86a7bf62583770e5f8d0b405fbb3ad32214ef3584f5f9332478f2506414443a910bf15863b36ebfcaa7cbb19253ae32cd3ca390dab87b29cd31e11be7fa4ea3a01dad625d9de44e412680e1a694227698788d71f1e089e5831dc1bbacfa794b45e1c995214bf71ee4160d98b4305fa4c3e36ee5f8da19b3708f68e7d2e8197375c0f763d90e31143eb04760cc2148c8f54937b9385c95db1742595634ed004fa567655dfe1d9b9fa698074a9fb70c05a252b2d9cf7ca1c9b009f2cd70d6972ccf0ee281d777d66a0346c6c6525436dd7fe3578b28dca2c7adbfde0ecd45148$31c3248ba4dc9600a024b4e0e7c3e585"
                },
                "_id": "system.user.write-only2",
                "native": {},
                "acl": {
                    "object": 1638
                }
            }, function (err) {

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
                        object: 1638,
                        owner: "system.user.write-only2",
                        ownerGroup:"system.group.administrator",
                        state: 1638
                    }
                }, function (err) {
                    expect(err).to.be.null;

                    context.states.getState(fGid, function (err, state) {
                        expect(err).to.be.null;

                        context.adapter.setForeignState(fGid, 1, false, {user: "system.user.write-only2"}, function (err) {
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
        });
    });

    // setForeignState with acl failure
    it(testName + 'Set foreign state with acl failure', function (done) {
        this.timeout(1000);
        var fGid = context.adapterShortName + '3.1.' + gid;

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
                owner: "system.user.write-only",
                ownerGroup:"system.group.administrator",
                state: 102
            }
        }, function (err) {
            expect(err).to.be.null;

            context.states.getState(fGid, function (err, state) {
                expect(err).to.be.null;

                context.adapter.setForeignState(fGid, 1, false, {user: "system.user.write-only"}, function (err) {
                    expect(err).to.be.equal("permissionError");
                    done();
                });
            });
        });
    });

    // setForeignState with acl write only
    it(testName + 'Set foreign state with acl write only', function (done) {
        this.timeout(1000);
        var fGid = context.adapterShortName + '3.0.' + gid;
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
                owner: "system.user.write-only2",
                ownerGroup:"system.group.administrator",
                state: 614
            }
        }, function (err) {
            expect(err).to.be.null;

            context.states.getState(fGid, function (err, state) {
                expect(err).to.be.null;

                context.adapter.setForeignState(fGid, 1, false, {user: "system.user.write-only2"}, function (err) {
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
        var fGid = context.adapterShortName + '1.0.1' + gid;
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
            var ts = new Date().getTime() - 1000;
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
        var fGid = context.adapterShortName + '1.0.' + gid;
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
                var found = false;
                for(var a in states) {
                    found = true;
                }
                expect(found).to.be.false;

                var iid = gid;
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

    // subscribeForeignStates
    it(testName + 'Test subscribe foreign states', function (done) {
        this.timeout(1000);
        var sGid = context.adapterShortName + '2.0.' + gid + '6';

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
        this.timeout(1000);
        var sGid = context.adapterShortName + '2.0.' + gid + '6';

        context.onAdapterStateChanged = function (id, state) {
            if (id === sGid) {
                expect(state).to.be.ok;
                expect(state.val).to.equal(9);
            }
        };

        context.states.setState(sGid, 9, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.unsubscribeForeignStates(context.adapterShortName + '2.0.*', function () {
                context.states.setState(sGid, 10, function (err) {
                    expect(err).to.be.not.ok;
                });
                setTimeout(function () {
                    context.onAdapterStateChanged = null;
                    done();
                }, 300);
            });
        });
    });

    // getHistory - cannot be tested
}

module.exports.register = register;
