function register(it, expect, context) {
    var testName = context.name + ' ' + context.adapterShortName + ' adapter: ';
    var gid = 'myTestObject';

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
    it(testName + 'Check get foreign objecst', function (done) {
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
    // setForeignObjectNotExists

    // delObject
    // delForeignObject

    // subscribeObjects
    // subscribeForeignObjects
    // unsubscribeForeignObjects
    // unsubscribeObjects


}


module.exports.register = register;