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
        const id = 'myTestObjectNoType';
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
        context.adapter.getAdapterObjects((objects) => {
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
    it(testName + 'Check get foreign objects', done => {
        context.adapter.getForeignObjects(context.adapterShortName + 'f.0.*', (err, objs) => {
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

    // protection check for getForeignObject
    it(testName + 'Check if foreign system adapters protectedNative is not accessible', function (done) {
        this.timeout(1000);
        // create a system.adapter object of another adapter
        context.adapter.setForeignObject('system.adapter.tesla.0', {
            common: {
                name: 'tesla',
                type: 'number',
                role: 'level',
                members: ['A']
            },
            native: {
                model: 'S P85D',
                username: 'tesla',
                password: 'winning'
            },
            protectedNative: [
                'username',
                'password'
            ]
        }, function (err) {
            expect(err).to.be.null;

            context.adapter.getForeignObject('system.adapter.tesla.0', function (err, obj) {
                expect(err).to.be.not.ok;
                expect(obj).to.be.ok;
                expect(obj.native).to.be.ok;
                expect(obj.common.name).equal('tesla');
                expect(obj.native.model).equal('S P85D');
                expect(obj.native.username).to.be.undefined;
                expect(obj.native.password).to.be.undefined;
                expect(obj._id).equal('system.adapter.tesla.0');
                done();
            });
        });
    });

    // own protectedNative should be available
    it(testName + 'Check if own system adapters protectedNative is available via getForeignObject', function (done) {
        this.timeout(1000);
        // create a system.adapter object of own adapter
        context.adapter.setForeignObject('system.adapter.' + context.adapterShortName + '.0', {
            common: {
                name: 'tesla',
                type: 'number',
                role: 'level',
                members: ['A']
            },
            native: {
                model: 'S P85D',
                username: 'tesla',
                password: 'winning'
            },
            protectedNative: [
                'username',
                'password'
            ]
        }, function (err) {
            expect(err).to.be.null;

            context.adapter.getForeignObject('system.adapter.' + context.adapterShortName + '.0', function (err, obj) {
                expect(err).to.be.not.ok;
                expect(obj).to.be.ok;
                expect(obj.native).to.be.ok;
                expect(obj.common.name).equal('tesla');
                expect(obj.native.model).equal('S P85D');
                expect(obj.native.password).equal('winning');
                expect(obj.native.username).equal('tesla');
                expect(obj._id).equal('system.adapter.' + context.adapterShortName + '.0');
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

    // setForeignObject merge of custom settings
    it(testName + 'Try to merge custom settings', done => {
        context.adapter.setForeignObject(context.adapterShortName + '.0.' + gid, {
            common: {
                name: 'Some name',
                custom: {
                    history: {enabled: true}
                }
            },
            native: {
                ppparam: 11
            },
            type: 'state'
        },
        err => {
            expect(err).to.be.null;
            context.adapter.setForeignObject(context.adapterShortName + '.0.' + gid, {
                common: {
                    name: 'Some name',
                    custom: {
                        material: {enabled: true}
                    }
                },
                native: {
                    ppparam: 12
                },
                type: 'state'
            }, err => {
                expect(err).to.be.null;
                context.adapter.getForeignObject(context.adapterShortName + '.0.' + gid, (err, obj1) => {
                    expect(err).to.be.null;

                    expect(obj1.common.custom.material).to.be.ok;
                    expect(obj1.common.custom.history).to.be.ok;
                    done();
                });
            });
        });
    });

    // setForeignObject merge of custom settings
    it(testName + 'Try to delete custom settings', done => {
        const id = context.adapterShortName + '.0.' + gid;
        context.adapter.setForeignObject(id, {
            common: {
                name: 'Some name',
                custom: {
                    history: {enabled: true}
                }
            },
            native: {
                ppparam: 11
            },
            type: 'state'
        },
        err => {
            expect(err).to.be.null;
            context.adapter.setForeignObject(id, {
                common: {
                    name: 'Some name',
                    desc: 'Hello',
                    custom: {
                        material: null,
                        history: null
                    }
                },
                native: {
                    bluefox: 14
                },
                type: 'state'
            }, err => {
                expect(err).to.be.null;
                context.adapter.getForeignObject(id, (err, obj1) => {
                    expect(err).to.be.null;

                    expect(obj1.common.custom).to.be.not.ok;
                    done();
                });
            });
        });
    });

    // setForeignObject merge of custom settings
    it(testName + 'Try to delete custom settings in new object', done => {
        const id = context.adapterShortName + '.0.' + gid + '6';
        context.adapter.setForeignObject(id, {
            common: {
                name: 'Some name',
                custom: {
                    history: {enabled: true}
                }
            },
            native: {
                ppparam: 11
            },
            type: 'state'
        },
        err => {
            expect(err).to.be.null;
            context.adapter.setForeignObject(id, {
                common: {
                    name: 'Some name',
                    desc: 'Hello',
                    custom: {
                        material: null,
                        history: null
                    }
                },
                native: {
                    bluefox: 14
                },
                type: 'state'
            }, err => {
                expect(err).to.be.null;
                context.adapter.getForeignObject(id, (err, obj1) => {
                    expect(err).to.be.null;

                    expect(obj1.common.custom).to.be.not.ok;
                    done();
                });
            });
        });
    });

    // getObjectView
    it(testName + 'Try to get object view', done => {
        // create the view
        context.adapter.setForeignObjectAsync( '_design/hm-rpc', {
            language: 'javascript',
            views: {
                paramsetDescription: {
                    map: 'function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.meta.type === "paramsetDescription") {\n   emit(doc._id, doc);\n  }\n}'
                }
            },
            common: {}
        }).then(() => {
            // now lets create an object matching the view
            context.adapter.setForeignObjectAsync('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19', {
                type: 'meta',
                meta: {
                    adapter: 'hm-rpc',
                    type: 'paramsetDescription'
                },
                common: {},
                native: {}
            }).then(() => {
                context.adapter.getObjectView('hm-rpc', 'paramsetDescription', {startkey: 'hm-rpc.meta.VALUES', endkey: 'hm-rpc.meta.VALUES.\u9999'}, (err, doc) => {
                    expect(err).to.be.null;
                    // the mapping cannot perform emit, thus we currently get an empty array in doc.rows, non existing view would result in error
                    expect(doc.rows).to.be.an('array');
                    done();
                });
            });
        });
    });

    // getObjectViewAsync
    it(testName + 'Try to get object view in async setup', done => {
        // create the view
        context.adapter.setForeignObjectAsync( '_design/hm-rpc', {
            language: 'javascript',
            views: {
                paramsetDescription: {
                    map: 'function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.meta.type === "paramsetDescription") {\n   emit(doc._id, doc);\n  }\n}'
                }
            },
            common: {}
        }).then(() => {
            // now lets create an object matching the view
            context.adapter.setForeignObjectAsync('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19', {
                type: 'meta',
                meta: {
                    adapter: 'hm-rpc',
                    type: 'paramsetDescription'
                },
                common: {},
                native: {}
            }).then(() => {
                context.adapter.getObjectViewAsync('hm-rpc', 'paramsetDescription', {startkey: 'hm-rpc.meta.VALUES', endkey: 'hm-rpc.meta.VALUES.\u9999'}).then(doc => {
                    // the mapping cannot perform emit, thus we currently get an empty array in doc.rows, non existing view would result in error
                    expect(doc.rows).to.be.an('array');
                    done();
                });
            });
        });
    });

    // getObjectList
    it(testName + 'Try to get object list', done => {
        // lets create an object matching the list
        context.adapter.setForeignObjectAsync('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19', {
            type: 'meta',
            meta: {
                adapter: 'hm-rpc',
                type: 'paramsetDescription'
            },
            common: {},
            native: {}
        }).then(() => {
            // now lets get our object
            context.adapter.getObjectList({
                startkey: 'hm-rpc.meta.VALUES',
                endkey: 'hm-rpc.meta.VALUES.\u9999'
            }, (err, res) => {
                expect(err).to.be.null;
                expect(res.rows.length).to.be.equal(1);
                expect(res.rows[0].id).to.be.equal('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19');

                // and try a non existing pattern
                context.adapter.getObjectList({startkey: '', endkey: '_'}, (err, res) => {
                    expect(err).to.be.not.ok;
                    expect(res.rows.length).to.be.equal(0);
                    done();
                });
            });
        });
    });

    // getObjectListAsync
    it(testName + 'Try to get object list async', done => {
        // lets create an object matching the list
        context.adapter.setForeignObjectAsync('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19', {
            type: 'meta',
            meta: {
                adapter: 'hm-rpc',
                type: 'paramsetDescription'
            },
            common: {},
            native: {}
        }).then(() => {
            // now lets get our object
            context.adapter.getObjectListAsync({
                startkey: 'hm-rpc.meta.VALUES',
                endkey: 'hm-rpc.meta.VALUES.\u9999'
            }).then(res => {
                expect(res.rows.length).to.be.equal(1);
                expect(res.rows[0].id).to.be.equal('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19');

                // and try a non existing pattern
                context.adapter.getObjectListAsync({startkey: '', endkey: '_'}).then(res => {
                    expect(res.rows.length).to.be.equal(0);
                    done();
                });
            });
        });
    });

    // delObject
    it(testName + 'Try to delete existing object', function (done) {
        context.adapter.delObject(gid, function (err) {
            expect(err).to.not.be.ok;

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
            expect(err).to.not.be.ok;

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

    // check that enum membership is removed on delForeignObject
    it(testName + 'should delete enum membership on object deletion', done => {
        const objects = context.objects;
        const enumObj = {
            'common': {
                'name': 'Wohnzimmer',
                'members': [
                    'tesla.0.model',
                    'test.0.test'
                ]
            },
            'native': {},
            'type': 'enum'
        };
        // create our object
        objects.setObject('tesla.0.model', {type: 'state', native: {}, common: {
            name: 'Model'
        }}, () => {
            // now create the enum with object as member
            objects.setObject('enum.rooms.living_room', enumObj, () => {
                // delete the object via adapter method
                context.adapter.delForeignObject('tesla.0.model', () => {
                    // now get enum object
                    objects.getObject('enum.rooms.living_room', (err, obj) => {
                        // check that only the delete object has been removed
                        expect(obj.common.members.indexOf('tesla.0.model')).to.equal(-1);
                        expect(obj.common.members.indexOf('test.0.test')).to.equal(0);
                        done();
                    });
                });
            });
        });
    });

    // subscribeObjects
    it(testName + 'Try to subscribe on objects changes', done => {
        context.adapter.subscribeObjects('*', () => {
            context.onAdapterObjectChanged = (id, obj) => {
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
            err => {
                expect(err).to.be.null;
            });
        });
    });

    // unsubscribeObjects
    it(testName + 'Try to unsubscribe on objects changes', function (done) {
        this.timeout(3000);
        context.adapter.unsubscribeObjects('*', () => {
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
                }, 2000);
            });
        });
    });

    // subscribeForeignObjects
    it(testName + 'Try to subscribe on foreign objects changes', function (done) {
        context.adapter.subscribeForeignObjects(context.adapterShortName + 'f.*', () => {
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
    });

    // check proteciton for subscribeForeignObjects
    it(testName + 'Check if protectedNative is protected in subscribeForeignObjects', function (done) {
        context.adapter.subscribeForeignObjects('system.adapter.tesla.0', () => {
            context.onAdapterObjectChanged = function (id, obj) {
                if (id === 'system.adapter.tesla.0') {
                    expect(obj).to.be.ok;
                    expect(obj.common.name).to.equal('tesla');
                    expect(obj.native).to.be.ok;
                    expect(obj.common.name).equal('tesla');
                    expect(obj.native.model).equal('S P85D');
                    expect(obj.native.username).to.be.undefined;
                    expect(obj.native.password).to.be.undefined;
                    expect(obj._id).equal('system.adapter.tesla.0');
                    context.onAdapterObjectChanged = null;
                    done();
                }
            };
            context.adapter.setForeignObject('system.adapter.tesla.0', {
                common: {
                    name: 'tesla',
                    type: 'number',
                    role: 'level',
                    members: ['A']
                },
                native: {
                    model: 'S P85D',
                    username: 'tesla',
                    password: 'winning'
                },
                protectedNative: [
                    'username',
                    'password'
                ]
            },
            function (err) {
                expect(err).to.be.null;
            });
        });
    });

    it(testName + 'Check if own protectedNative is available in subscribeForeignObjects', function (done) {
        // If own adapter, protectedNative has to be available
        context.adapter.subscribeForeignObjects('system.adapter.' + context.adapterShortName + '.0', () => {
            context.onAdapterObjectChanged = function (id, obj) {
                if (id === 'system.adapter.' + context.adapterShortName + '.0') {
                    expect(obj).to.be.ok;
                    expect(obj.common.name).to.equal('tesla');
                    expect(obj.native).to.be.ok;
                    expect(obj.common.name).equal('tesla');
                    expect(obj.native.model).equal('S P85D');
                    expect(obj.native.username).to.equal('tesla');
                    expect(obj.native.password).to.equal('winning');
                    expect(obj._id).equal('system.adapter.' + context.adapterShortName + '.0');
                    context.onAdapterObjectChanged = null;
                    done();
                }
            };
            context.adapter.setForeignObject('system.adapter.' + context.adapterShortName + '.0', {
                common: {
                    name: 'tesla',
                    type: 'number',
                    role: 'level',
                    members: ['A']
                },
                native: {
                    model: 'S P85D',
                    username: 'tesla',
                    password: 'winning'
                },
                protectedNative: [
                    'username',
                    'password'
                ]
            },
            function (err) {
                expect(err).to.be.null;
            });
        });
    });

    // unsubscribeForeignObjects
    it(testName + 'Try to unsubscribe on foreign objects changes', function (done) {
        this.timeout(3000);
        context.adapter.unsubscribeForeignObjects(context.adapterShortName + 'f.*', () => {
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
                }, 2000);
            });
        });
    });

    // Try to access system configuration
    it(testName + 'Try to access system configuration', function (done) {
        this.timeout(3000);

        context.adapter.getForeignObject('system.config', (err, obj) => {
            expect(err).to.be.null;
            expect(obj).to.be.ok;
            setTimeout(function () {
                done();
            }, 2000);
        });
    });

    // getObject with acls
    it(testName + 'Check getObjects with ACLs', function (done) {
        this.timeout(1000);
        // create testf.0.myTestObject

        context.adapter.setForeignObject('system.group.writer', {
            'common': {
                'name': 'Writer',
                'desc': '',
                'members': [
                    'system.user.write-only'
                ],
                'acl': {
                    'object': {
                        'list': false,
                        'read': true,
                        'write': false,
                        'delete': false
                    },
                    'state': {
                        'list': false,
                        'read': false,
                        'write': false,
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
                'object': 1638,
                'owner': 'system.user.admin',
                'ownerGroup': 'system.group.administrator'
            },
            '_id': 'system.group.writer',
            'type': 'group'
        }, function (err) {
            expect(err).to.be.null;

            context.adapter.setForeignObject('system.user.write-only', {
                'type': 'user',
                'common': {
                    'name': 'write-only',
                    'enabled': true,
                    'groups': [],
                    'password': 'pbkdf2$10000$ab4104d8bb68390ee7e6c9397588e768de6c025f0c732c18806f3d1270c83f83fa86a7bf62583770e5f8d0b405fbb3ad32214ef3584f5f9332478f2506414443a910bf15863b36ebfcaa7cbb19253ae32cd3ca390dab87b29cd31e11be7fa4ea3a01dad625d9de44e412680e1a694227698788d71f1e089e5831dc1bbacfa794b45e1c995214bf71ee4160d98b4305fa4c3e36ee5f8da19b3708f68e7d2e8197375c0f763d90e31143eb04760cc2148c8f54937b9385c95db1742595634ed004fa567655dfe1d9b9fa698074a9fb70c05a252b2d9cf7ca1c9b009f2cd70d6972ccf0ee281d777d66a0346c6c6525436dd7fe3578b28dca2c7adbfde0ecd45148$31c3248ba4dc9600a024b4e0e7c3e585'
                },
                '_id': 'system.user.write-only',
                'native': {},
                'acl': {
                    'object': 1638
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
                        owner: 'system.user.write-only',
                        ownerGroup: 'system.group.administrator',
                        state: 1638
                    }
                }, function (err) {
                    expect(err).to.be.null;

                    context.objects.getObject(context.adapterShortName + 'f.0.' + gid, {user: 'system.user.write-only'}, function (err, obj) {
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
