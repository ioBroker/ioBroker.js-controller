/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

// const promiseSequence = require('../../lib/tools').promiseSequence;

/**
 * @typedef {{adapter: {[fnName: string]: (...args: any[]) => any}}} Context
 */
/**
 * @param {Context} context 
 */
function register(it, expect, context) {
    const testName = context.name + ' ' + context.adapterShortName + ' adapter: ';
    const gid = 'myTestObject';

    // setObject positive
    it(testName + 'Check if objects will be created', function (done) {
        this.timeout(1000);
        context.adapter.setObject(gid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level'
            },
            native: {
                attr1: '1',
                attr2: '2',
                attr3: '3'
            },
            type: 'state'
        }, function (err) {
            expect(err).to.be.null;
            context.objects.getObject(context.adapterShortName + '.0.' + gid, function (err, obj) {
                expect(err).to.be.not.ok;
                expect(obj).to.be.ok;
                expect(obj.native).to.be.ok;
                expect(obj._id).equal(context.adapterShortName + '.0.' + gid);
                expect(obj.common.name).equal('test1');
                expect(obj.type).equal('state');
                //expect(obj.acl).to.be.ok;
                done();
            });
        });
    });

    // NOT READY: need async functions on Objects
    
    // // setObject positive (async)
    // it(testName + 'Check if objects will be created (ASYNC)', function () {
    //     this.timeout(1000);

    //     const tests = [
    //         // Creating an object works
    //         () => context.adapter.setObjectAsync(gid, {
    //             common: {
    //                 name: 'test1',
    //                 type: 'number',
    //                 role: 'level'
    //             },
    //             native: {
    //                 attr1: '1',
    //                 attr2: '2',
    //                 attr3: '3'
    //             },
    //             type: 'state'
    //         }).should.be.fulfilled,

    //         // getting it returns the correct values
    //         () => context.objects.getObjectAsync(context.adapterShortName + '.0.' + gid).should.be.fulfilled.then(obj => {
    //             expect(obj).to.be.ok;
    //             expect(obj.native).to.be.ok;
    //             expect(obj._id).equal(context.adapterShortName + '.0.' + gid);
    //             expect(obj.common.name).equal('test1');
    //             expect(obj.type).equal('state');
    //         })
    //     ]; 

    //     return promiseSequence(tests);
        
    // });
    
    // setObject negative
    it(testName + 'Check if objects will not be created without mandatory attribute type', function (done) {
        this.timeout(1000);
        var id = 'myTestObjectNoType';
        context.adapter.setObject(id, {
            common: {
                name: 'test1',
                type: 'number'
            },
            native: {},
            type_: 'state' // extra no type
        }, function (err) {
            expect(err).to.be.ok;

            context.objects.getObject(context.adapterShortName + '.0.' + id, function (err, obj) {
                expect(err).to.be.not.ok; // there is no message, that object does not exist. Errors will be given back only if no access rights
                expect(obj).to.be.not.ok;
                done();
            });
        });
    });

    // getAdapterObjects
    it(testName + 'Read all objects of adapter', function (done) {
        context.adapter.getAdapterObjects(function (objects) {
            expect(objects).to.be.ok;
            expect(objects[context.adapterShortName + '.0.' + gid]).to.be.ok;
            expect(objects[context.adapterShortName + '.0.' + gid].type).to.be.equal('state');
            done();
        });
    });

    //extendObject
    it(testName + 'Check if objects will be extended', function (done) {
        context.adapter.extendObject(gid, {
            native: {
                attr1: '11', // modify
                attr2: null, // delete
                attr4: '4'   // add
            }
        }, function (err) {
            expect(err).to.be.null;

            context.objects.getObject(context.adapterShortName + '.0.' + gid, function (err, obj) {
                expect(obj).to.be.ok;
                expect(obj.type).to.be.equal('state');
                expect(obj.native.attr1).to.be.equal('11');
                expect(obj.native.attr2).to.be.null;
                expect(obj.native.attr3).to.be.equal('3');
                expect(obj.native.attr4).to.be.equal('4');
                done();
            });
        });
    });

    // setForeignObject
    it(testName + 'Check if foreign objects will be created', function (done) {
        this.timeout(1000);
        // create testf.0.myTestObject

        context.adapter.setForeignObject(context.adapterShortName + 'f.0.' + gid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level',
                members: ['A']
            },
            native: {
                attr1: '1',
                attr2: '2',
                attr3: '3',
                repositories: ['R1'],
                certificates: ['C1'],
                devices: ['D1']
            },
            type: 'state'
        }, function (err) {
            expect(err).to.be.null;

            context.objects.getObject(context.adapterShortName + 'f.0.' + gid, function (err, obj) {
                expect(err).to.be.not.ok;
                expect(obj).to.be.ok;
                expect(obj.native).to.be.ok;
                expect(obj._id).equal(context.adapterShortName + 'f.0.' + gid);
                expect(obj.common.name).equal('test1');
                expect(obj.type).equal('state');
                //expect(obj.acl).to.be.ok;
                done();
            });
        });
    });

    // extendForeignObject
    it(testName + 'Check if foreign objects will be extended', function (done) {
        context.adapter.extendForeignObject(context.adapterShortName + 'f.0.' + gid, {
            native: {
                attr1: '11', // modify
                attr2: null, // delete
                attr4: '4',   // add
                // special cases for native (obj.native.repositories || obj.native.certificates || obj.native.devices)
                // and commons (obj.common.members)
                repositories: ['R2'],
                devices: ['D2']
            }
        }, function (err) {
            expect(err).to.be.null;

            context.objects.getObject(context.adapterShortName + 'f.0.' + gid, function (err, obj) {
                expect(obj).to.be.ok;
                expect(obj.type).to.be.equal('state');
                expect(obj.native.attr1).to.be.equal('11');
                expect(obj.native.attr2).to.be.null;
                expect(obj.native.attr3).to.be.equal('3');
                expect(obj.native.attr4).to.be.equal('4');

                expect(obj.common.members.length).to.be.equal(1);
                expect(obj.common.members[0]).to.be.equal('A');

                expect(obj.native.repositories.length).to.be.equal(1);
                expect(obj.native.repositories[0]).to.be.equal('R2');

                expect(obj.native.certificates.length).to.be.equal(1);
                expect(obj.native.certificates[0]).to.be.equal('C1');

                expect(obj.native.devices.length).to.be.equal(1);
                expect(obj.native.devices[0]).to.be.equal('D2');
                done();
            });
        });
    });

    // getObject
    it(testName + 'Check get object', function (done) {
        context.adapter.getObject(context.adapterShortName + '.0.' + gid, function (err, obj) {
            expect(err).to.be.null;

            expect(obj).to.be.ok;
            expect(obj.type).to.be.equal('state');
            expect(obj.native.attr1).to.be.equal('11');
            context.adapter.getObject(gid, function (err, obj1) {
                expect(err).to.be.null;

                expect(obj1).to.be.ok;
                expect(JSON.stringify(obj1)).to.be.equal(JSON.stringify(obj));
                done();
            });
        });
    });

    // getForeignObjects
    it(testName + 'Check get foreign objects', function (done) {
        context.adapter.getForeignObjects(context.adapterShortName + 'f.0.*', function (err, objs) {
            expect(err).to.be.null;

            expect(objs).to.be.ok;
            expect(objs[context.adapterShortName + 'f.0.' + gid].type).to.be.equal('state');
            expect(objs[context.adapterShortName + 'f.0.' + gid].native.attr1).to.be.equal('11');
            done();
        });
    });

    // findForeignObject
    it(testName + 'Check find foreign object', function (done) {
        context.adapter.findForeignObject('test1', null, function (err, id) {
            expect(err).to.be.null;
            expect(id).to.be.equal(context.adapterShortName + '.0.' + gid);

            context.adapter.findForeignObject('test1', 'number', function (err, id) {
                expect(err).to.be.null;
                expect(id).to.be.equal(context.adapterShortName + '.0.' + gid);

                context.adapter.findForeignObject('test1', 'channel', function (err, id) {
                    expect(err).to.be.null;

                    expect(id).to.be.null;
                    done();
                });

            });
        });
    });

    // getForeignObject
    it(testName + 'Check get foreign object', function (done) {
        context.adapter.getForeignObject(context.adapterShortName + 'f.0.' + gid, function (err, obj) {
            expect(err).to.be.null;

            expect(obj).to.be.ok;
            expect(obj.type).to.be.equal('state');
            expect(obj.native.attr1).to.be.equal('11');
            context.adapter.getForeignObject(gid, function (err, obj1) {
                expect(err).to.be.null;

                expect(obj1).to.be.null;
                done();
            });
        });
    });

    // setObjectNotExists
    it(testName + 'Try to set existing object', function (done) {
        context.adapter.setObjectNotExists(gid, {
            common: {
                name: 'not must be set'
            },
            native: {
                pparam: 10
            },
            type: 'state'
        },
        function (err) {
            expect(err).to.be.null;

            context.adapter.getObject(gid, function (err, obj1) {
                expect(err).to.be.null;

                expect(obj1.native).to.be.ok;
                expect(obj1.native.pparam).to.be.not.ok;

                context.adapter.setObjectNotExists(gid + 'A', {
                        common: {
                            name: 'must be set'
                        },
                        native: {
                            ppparam: 10
                        },
                        type: 'state'
                    },
                    function (err) {
                        expect(err).to.be.null;

                        context.adapter.getObject(gid + 'A', function (err, obj1) {
                            expect(err).to.be.null;

                            expect(obj1.native).to.be.ok;
                            expect(obj1.native.ppparam).to.be.equal(10);
                            done();
                        });
                    });
            });
        });
    });

    // setForeignObjectNotExists
    it(testName + 'Try to set existing foreign object', function (done) {
        context.adapter.setForeignObjectNotExists(context.adapterShortName + '.0.' + gid, {
                common: {
                    name: 'not must be set'
                },
                native: {
                    ppparam: 11
                },
                type: 'state'
            },
            function (err) {
                expect(err).to.be.null;

                context.adapter.getForeignObject(context.adapterShortName + '.0.' + gid, function (err, obj1) {
                    expect(err).to.be.null;

                    expect(obj1.native).to.be.ok;
                    expect(obj1.native.ppparam).to.be.not.ok;

                    context.adapter.setForeignObjectNotExists(context.adapterShortName + 'ff.0.' + gid, {
                            common: {
                                name: 'must be set'
                            },
                            native: {
                                ppparam: 9
                            },
                            type: 'state'
                        },
                        function (err) {
                            expect(err).to.be.null;

                            context.adapter.getForeignObject(context.adapterShortName + 'ff.0.' + gid, function (err, obj1) {
                                expect(err).to.be.null;

                                expect(obj1.native).to.be.ok;
                                expect(obj1.native.ppparam).to.be.equal(9);
                                done();
                            });
                        });
                });
            });
    });

    // delObject
    it(testName + 'Try to delete existing object', function (done) {
        context.adapter.delObject(gid, function (err) {
            expect(err).to.be.null;

            context.adapter.getObject(gid, function (err, obj) {
                expect(err).to.be.null;

                expect(obj).to.be.null;

                context.adapter.delObject(gid, function (err) {
                    expect(err).to.equal('Not exists');

                    done();
                });
            });
        });
    });

    // delForeignObject
    it(testName + 'Try to delete foreign existing object', function (done) {
        context.adapter.delForeignObject(context.adapterShortName + 'f.0.' + gid, function (err) {
            expect(err).to.be.null;

            context.adapter.getForeignObject(context.adapterShortName + 'f.0.' + gid, function (err, obj) {
                expect(err).to.be.null;

                expect(obj).to.be.null;

                context.adapter.delForeignObject(context.adapterShortName + 'f.0.' + gid, function (err) {
                    expect(err).to.equal('Not exists');

                    done();
                });
            });
        });
    });

    // subscribeObjects
    it(testName + 'Try to subscribe on objects changes', function (done) {
        context.adapter.subscribeObjects('*');
        context.onAdapterObjectChanged = function (id, obj) {
            if (id === context.adapterShortName + '.0.' + gid) {
                expect(obj).to.be.ok;
                expect(obj.common.name).to.equal('must be set');
                context.onAdapterObjectChanged = null;
                done();
            }
        };
        context.adapter.setObjectNotExists(gid, {
            common: {
                name: 'must be set'
            },
            native: {
                pparam: 10
            },
            type: 'state'
        },
        function (err) {
            expect(err).to.be.null;
        });
    });

    // unsubscribeObjects
    it(testName + 'Try to unsubscribe on objects changes', function (done) {
        this.timeout(3000);
        context.adapter.unsubscribeObjects('*');
        context.onAdapterObjectChanged = function (id, obj) {
            if (id === context.adapterShortName + '.0.' + gid) {
                expect(obj).to.be.ok;
                expect(obj).to.be.not.ok;
            }
        };
        context.adapter.setObject(gid, {
            common: {
                name: 'must be set'
            },
            native: {
                pparam: 10
            },
            type: 'state'
        },
        function (err) {
            expect(err).to.be.null;
            setTimeout(function () {
                done();
            }, 2000)
        });
    });

    // subscribeForeignObjects
    it(testName + 'Try to subscribe on foreign objects changes', function (done) {
        context.adapter.subscribeForeignObjects(context.adapterShortName + 'f.*');
        context.onAdapterObjectChanged = function (id, obj) {
            if (id === context.adapterShortName + 'f.0.' + gid) {
                expect(obj).to.be.ok;
                expect(obj.common.name).to.equal('must be set');
                context.onAdapterObjectChanged = null;
                done();
            }
        };
        context.adapter.setForeignObject(context.adapterShortName + 'f.0.' + gid, {
                common: {
                    name: 'must be set'
                },
                native: {
                    pparam: 10
                },
                type: 'state'
            },
            function (err) {
                expect(err).to.be.null;
            });
    });

    // unsubscribeForeignObjects
    it(testName + 'Try to unsubscribe on foreign objects changes', function (done) {
        this.timeout(3000);
        context.adapter.unsubscribeForeignObjects(context.adapterShortName + 'f.*');
        context.onAdapterObjectChanged = function (id, obj) {
            if (id === context.adapterShortName + 'f.0.' + gid) {
                expect(obj).to.be.ok;
                expect(obj).to.be.not.ok;
            }
        };
        context.adapter.setForeignObject(context.adapterShortName + 'f.0.' + gid, {
                common: {
                    name: 'must be set'
                },
                native: {
                    pparam: 10
                },
                type: 'state'
            },
            function (err) {
                expect(err).to.be.null;
                setTimeout(function () {
                    done();
                }, 2000)
            });
    });

    // getObject with acls
    it(testName + 'Check getObjects with ACLs', function (done) {
        this.timeout(1000);
        // create testf.0.myTestObject

        context.adapter.setForeignObject('system.group.writer', {
          "common": {
            "name": "Writer",
            "desc": "",
            "members": [
              "system.user.write-only"
            ],
            "acl": {
              "object": {
                "list": false,
                "read": true,
                "write": false,
                "delete": false
              },
              "state": {
                "list": false,
                "read": false,
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
          "_id": "system.group.writer",
          "type": "group"
        }, function (err) {
            expect(err).to.be.null;

            context.adapter.setForeignObject('system.user.write-only', {
                "type": "user",
                "common": {
                    "name": "write-only",
                    "enabled": true,
                    "groups": [],
                    "password": "pbkdf2$10000$ab4104d8bb68390ee7e6c9397588e768de6c025f0c732c18806f3d1270c83f83fa86a7bf62583770e5f8d0b405fbb3ad32214ef3584f5f9332478f2506414443a910bf15863b36ebfcaa7cbb19253ae32cd3ca390dab87b29cd31e11be7fa4ea3a01dad625d9de44e412680e1a694227698788d71f1e089e5831dc1bbacfa794b45e1c995214bf71ee4160d98b4305fa4c3e36ee5f8da19b3708f68e7d2e8197375c0f763d90e31143eb04760cc2148c8f54937b9385c95db1742595634ed004fa567655dfe1d9b9fa698074a9fb70c05a252b2d9cf7ca1c9b009f2cd70d6972ccf0ee281d777d66a0346c6c6525436dd7fe3578b28dca2c7adbfde0ecd45148$31c3248ba4dc9600a024b4e0e7c3e585"
                },
                "_id": "system.user.write-only",
                "native": {},
                "acl": {
                    "object": 1638
                }
            }, function (err) {
                expect(err).to.be.null;

                context.adapter.setForeignObject(context.adapterShortName + 'f.0.' + gid, {
                    common: {
                        name: 'test1',
                        type: 'number',
                        role: 'level',
                        members: ['A']
                    },
                    native: {
                        attr1: '1',
                        attr2: '2',
                        attr3: '3',
                        repositories: ['R1'],
                        certificates: ['C1'],
                        devices: ['D1']
                    },
                    type: 'state',
                    acl: {
                        object: 1638,
                        owner: "system.user.write-only",
                        ownerGroup:"system.group.administrator",
                        state: 1638
                    }
                }, function (err) {
                    expect(err).to.be.null;

                    context.objects.getObject(context.adapterShortName + 'f.0.' + gid, {user: "system.user.write-only"}, function (err, obj) {
                        expect(err).to.be.not.ok;
                        expect(obj).to.be.ok;
                        expect(obj.native).to.be.ok;
                        expect(obj._id).equal(context.adapterShortName + 'f.0.' + gid);
                        expect(obj.common.name).equal('test1');
                        expect(obj.type).equal('state');
                        //expect(obj.acl).to.be.ok;
                        done();
                    });
                });
            });
        });
    });

    // files
}

module.exports.register = register;
