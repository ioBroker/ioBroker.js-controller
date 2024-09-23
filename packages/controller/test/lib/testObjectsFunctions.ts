import type { TestContext } from '../_Types.js';

/**
 * Contains tests interacting with DB via adapter.ts
 *
 * @param it
 * @param expect
 * @param context
 */
export function register(it: Mocha.TestFunction, expect: Chai.ExpectStatic, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} adapter: `;
    const gid = 'myTestObject';

    // setObject positive
    it(`${testName}Check if objects will be created`, function (done) {
        this.timeout(3_000);
        context.adapter.setObject(
            gid,
            {
                type: 'state',
                common: {
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    read: true,
                    write: true,
                },
                native: {
                    attr1: '1',
                    attr2: '2',
                    attr3: '3',
                },
            },
            function (err) {
                expect(err).to.be.null;
                context.objects.getObject(`${context.adapterShortName}.0.${gid}`, function (err, obj) {
                    expect(err).to.be.not.ok;
                    expect(obj).to.be.ok;
                    expect(obj!.native).to.be.ok;
                    expect(obj!._id).equal(`${context.adapterShortName}.0.${gid}`);
                    expect(obj!.common.name).equal('test1');
                    expect(obj!.type).equal('state');
                    //expect(obj.acl).to.be.ok;
                    done();
                });
            },
        );
    });

    // setObject negative
    it(`${testName}Check if objects will not be created without mandatory attribute type`, function (done) {
        this.timeout(3_000);
        const id = 'myTestObjectNoType';
        context.adapter.setObject(
            id,
            {
                common: {
                    name: 'test1',
                    type: 'number',
                },
                native: {},
                // @ts-expect-error should error as type is missing
                type_: 'state',
            },
            (err: any) => {
                expect(err).to.be.ok;

                context.objects.getObject(`${context.adapterShortName}.0.${id}`, function (err, obj) {
                    expect(err).to.be.not.ok; // there is no message, that object does not exist. Errors will be given back only if no access rights
                    expect(obj).to.be.not.ok;
                    done();
                });
            },
        );
    });

    // getAdapterObjects
    it(`${testName}Read all objects of adapter`, function (done) {
        context.adapter.getAdapterObjects(objects => {
            expect(objects).to.be.ok;
            expect(objects[`${context.adapterShortName}.0.${gid}`]).to.be.ok;
            expect(objects[`${context.adapterShortName}.0.${gid}`].type).to.be.equal('state');
            done();
        });
    });

    //extendObject
    it(`${testName}Check if objects will be extended`, function (done) {
        context.adapter.extendObject(
            gid,
            {
                native: {
                    attr1: '11', // modify
                    attr2: null, // delete
                    attr4: '4', // add
                },
            },
            function (err, obj) {
                expect(err).to.be.not.ok;
                expect(obj).to.be.ok;

                context.objects.getObject(`${context.adapterShortName}.0.${gid}`, function (err, obj) {
                    expect(obj).to.be.ok;
                    expect(obj!.type).to.be.equal('state');
                    expect(obj!.native.attr1).to.be.equal('11');
                    expect(obj!.native.attr2).to.be.null;
                    expect(obj!.native.attr3).to.be.equal('3');
                    expect(obj!.native.attr4).to.be.equal('4');
                    done();
                });
            },
        );
    });

    // setForeignObject
    it(`${testName}Check if foreign objects will be created`, function (done) {
        this.timeout(3_000);
        // create testf.0.myTestObject

        context.adapter.setForeignObject(
            `${context.adapterShortName}f.0.${gid}`,
            {
                type: 'state',
                common: {
                    name: 'test1',
                    type: 'number',
                    role: 'level',
                    read: true,
                    write: true,
                },
                native: {
                    attr1: '1',
                    attr2: '2',
                    attr3: '3',
                    repositories: ['R1'],
                    certificates: ['C1'],
                    devices: ['D1'],
                },
            },
            function (err) {
                expect(err).to.be.null;

                context.objects.getObject(`${context.adapterShortName}f.0.${gid}`, function (err, obj) {
                    expect(err).to.be.not.ok;
                    expect(obj).to.be.ok;
                    expect(obj!.native).to.be.ok;
                    expect(obj!._id).equal(`${context.adapterShortName}f.0.${gid}`);
                    expect(obj!.common.name).equal('test1');
                    expect(obj!.type).equal('state');
                    //expect(obj.acl).to.be.ok;
                    done();
                });
            },
        );
    });

    // extendForeignObject
    it(`${testName}Check if foreign objects will be extended`, function (done) {
        context.adapter.extendForeignObject(
            `${context.adapterShortName}f.0.${gid}`,
            {
                native: {
                    attr1: '11', // modify
                    attr2: null, // delete
                    attr4: '4', // add
                    // special cases for native (obj.native.repositories || obj.native.certificates || obj.native.devices)
                    // and commons (obj.common.members)
                    repositories: ['R2'],
                    devices: ['D2'],
                },
            },
            function (err, obj) {
                expect(err).to.be.not.ok;
                expect(obj).to.be.ok;

                context.objects.getObject(`${context.adapterShortName}f.0.${gid}`, (err, obj) => {
                    expect(obj).to.be.ok;
                    expect(obj!.type).to.be.equal('state');
                    expect(obj!.native.attr1).to.be.equal('11');
                    expect(obj!.native.attr2).to.be.null;
                    expect(obj!.native.attr3).to.be.equal('3');
                    expect(obj!.native.attr4).to.be.equal('4');

                    expect(obj!.native.repositories.length).to.be.equal(1);
                    expect(obj!.native.repositories[0]).to.be.equal('R2');

                    expect(obj!.native.certificates.length).to.be.equal(1);
                    expect(obj!.native.certificates[0]).to.be.equal('C1');

                    expect(obj!.native.devices.length).to.be.equal(1);
                    expect(obj!.native.devices[0]).to.be.equal('D2');
                    done();
                });
            },
        );
    });

    // getObject
    it(`${testName}Check get object`, function (done) {
        context.adapter.getObject(`${context.adapterShortName}.0.${gid}`, function (err, obj) {
            expect(err).to.be.null;

            expect(obj).to.be.ok;
            expect(obj!.type).to.be.equal('state');
            expect(obj!.native.attr1).to.be.equal('11');
            context.adapter.getObject(gid, function (err, obj1) {
                expect(err).to.be.null;

                expect(obj1).to.be.ok;
                expect(JSON.stringify(obj1)).to.be.equal(JSON.stringify(obj));
                done();
            });
        });
    });

    // getForeignObjects
    it(`${testName}Check get foreign objects (pattern)`, done => {
        context.adapter.getForeignObjects(`${context.adapterShortName}f.0.*`, (err, objs) => {
            expect(err).to.be.null;

            expect(objs).to.be.ok;
            expect(objs![`${context.adapterShortName}f.0.${gid}`].type).to.be.equal('state');
            expect(objs![`${context.adapterShortName}f.0.${gid}`].native.attr1).to.be.equal('11');
            done();
        });
    });

    it(`${testName}Check get foreign objects (array)`, async () => {
        const id = `${context.adapterShortName}f.0.${gid}`;
        const id2 = `${context.adapterShortName}.0.${gid}`;

        const objs = await context.adapter.getForeignObjects([id, id2]);

        expect(objs).to.be.ok;
        expect(objs[id].type).to.be.equal('state');
        expect(objs[id].native.attr1).to.be.equal('11');
        expect(objs[id2].type).to.be.equal('state');
    });

    it(`${testName}Check get foreign objects - default enum functionality`, async () => {
        const id = `${context.adapterShortName}.0.${gid}`;

        // add the state to the enum, so we can check enum functionality
        await context.adapter.addStateToEnumAsync('enum.rooms', 'kitchen', '', '', gid);

        // when no argument is provided, all enums should be taken into account
        const objs = await context.adapter.getForeignObjects([id]);

        expect(objs).to.be.ok;

        const obj = objs[id];

        expect(obj.type).to.be.equal('state');
        expect(obj.native.attr1).to.be.equal('11');
        expect(obj.enums).to.be.ok;
        expect((obj.enums!['enum.rooms.kitchen'] as ioBroker.Translated).en).to.be.equal('Kitchen');
    });

    // findForeignObject
    it(`${testName}Check find foreign object`, function (done) {
        context.adapter.findForeignObject('test1', null, function (err, id) {
            expect(err).to.be.null;
            expect(id).to.be.equal(`${context.adapterShortName}.0.${gid}`);

            context.adapter.findForeignObject('test1', 'number', function (err, id) {
                expect(err).to.be.null;
                expect(id).to.be.equal(`${context.adapterShortName}.0.${gid}`);

                context.adapter.findForeignObject('test1', 'channel', function (err, id) {
                    expect(err).to.be.null;

                    expect(id).to.be.undefined;
                    done();
                });
            });
        });
    });

    // getForeignObject
    it(`${testName}Check get foreign object`, function (done) {
        context.adapter.getForeignObject(`${context.adapterShortName}f.0.${gid}`, function (err, obj) {
            expect(err).to.be.null;

            expect(obj).to.be.ok;
            expect(obj!.type).to.be.equal('state');
            expect(obj!.native.attr1).to.be.equal('11');
            context.adapter.getForeignObject(gid, function (err, obj1) {
                expect(err).to.be.not.ok;

                expect(obj1).to.be.null;
                done();
            });
        });
    });

    // protection check for getForeignObject
    it(`${testName}Check if foreign system adapters protectedNative is not accessible`, function (done) {
        this.timeout(3_000);
        // create a system.adapter object of another adapter
        context.adapter.setForeignObject(
            'system.adapter.tesla.0',
            {
                type: 'instance',
                common: {
                    name: 'tesla',
                    enabled: true,
                    version: '1.0.0',
                    host: 'system.host.test',
                    mode: 'daemon',
                    materialize: true,
                    platform: 'Javascript/Node.js',
                    installedVersion: '1.0.0',
                },
                native: {
                    model: 'S P85D',
                    username: 'tesla',
                    password: 'winning',
                },
                protectedNative: ['username', 'password'],
                objects: [],
                instanceObjects: [],
            },
            function (err) {
                expect(err).to.be.null;

                context.adapter.getForeignObject('system.adapter.tesla.0', function (err, obj) {
                    expect(err).to.be.not.ok;
                    expect(obj).to.be.ok;
                    expect(obj!.native).to.be.ok;
                    expect(obj!.common.name).equal('tesla');
                    expect(obj!.native.model).equal('S P85D');
                    expect(obj!.native.username).to.be.undefined;
                    expect(obj!.native.password).to.be.undefined;
                    expect(obj!._id).equal('system.adapter.tesla.0');
                    done();
                });
            },
        );
    });

    // own protectedNative should be available
    it(`${testName}Check if own system adapters protectedNative is available via getForeignObject`, function (done) {
        this.timeout(3_000);
        // create a system.adapter object of own adapter
        context.adapter.setForeignObject(
            `system.adapter.${context.adapterShortName}.0`,
            {
                type: 'instance',
                common: {
                    name: 'tesla',
                    enabled: true,
                    version: '1.0.0',
                    host: 'system.host.test',
                    mode: 'daemon',
                    platform: 'Javascript/Node.js',
                    materialize: true,
                    installedVersion: '1.0.0',
                },
                native: {
                    model: 'S P85D',
                    username: 'tesla',
                    password: 'winning',
                },
                protectedNative: ['username', 'password'],
                objects: [],
                instanceObjects: [],
            },
            function (err) {
                expect(err).to.be.null;

                context.adapter.getForeignObject(`system.adapter.${context.adapterShortName}.0`, function (err, obj) {
                    expect(err).to.be.not.ok;
                    expect(obj).to.be.ok;
                    expect(obj!.native).to.be.ok;
                    expect(obj!.common.name).equal('tesla');
                    expect(obj!.native.model).equal('S P85D');
                    expect(obj!.native.password).equal('winning');
                    expect(obj!.native.username).equal('tesla');
                    expect(obj!._id).equal(`system.adapter.${context.adapterShortName}.0`);
                    done();
                });
            },
        );
    });

    // setObjectNotExists
    it(`${testName}Try to set existing object`, function (done) {
        context.adapter.setObjectNotExists(
            gid,
            {
                type: 'state',
                common: {
                    name: 'not must be set',
                    read: true,
                    write: true,
                    type: 'number',
                    role: 'state',
                },
                native: {
                    pparam: 10,
                },
            },
            function (err) {
                expect(err).to.be.null;

                context.adapter.getObject(gid, function (err, obj1) {
                    expect(err).to.be.null;

                    expect(obj1!.native).to.be.ok;
                    expect(obj1!.native.pparam).to.be.not.ok;

                    context.adapter.setObjectNotExists(
                        `${gid}A`,
                        {
                            common: {
                                name: 'must be set',
                                read: true,
                                write: true,
                                type: 'number',
                                role: 'state',
                            },
                            native: {
                                ppparam: 10,
                            },
                            type: 'state',
                        },
                        function (err) {
                            expect(err).to.be.null;

                            context.adapter.getObject(`${gid}A`, function (err, obj1) {
                                expect(err).to.be.null;

                                expect(obj1!.native).to.be.ok;
                                expect(obj1!.native.ppparam).to.be.equal(10);
                                done();
                            });
                        },
                    );
                });
            },
        );
    });

    // setForeignObjectNotExists
    it(`${testName}Try to set existing foreign object`, function (done) {
        context.adapter.setForeignObjectNotExists(
            `${context.adapterShortName}.0.${gid}`,
            {
                common: {
                    name: 'not must be set',
                    read: true,
                    write: true,
                    type: 'number',
                    role: 'state',
                },
                native: {
                    ppparam: 11,
                },
                type: 'state',
            },
            function (err) {
                expect(err).to.be.null;

                context.adapter.getForeignObject(`${context.adapterShortName}.0.${gid}`, function (err, obj1) {
                    expect(err).to.be.null;

                    expect(obj1!.native).to.be.ok;
                    expect(obj1!.native.ppparam).to.be.not.ok;

                    context.adapter.setForeignObjectNotExists(
                        `${context.adapterShortName}ff.0.${gid}`,
                        {
                            common: {
                                name: 'must be set',
                                read: true,
                                write: true,
                                type: 'number',
                                role: 'state',
                            },
                            native: {
                                ppparam: 9,
                            },
                            type: 'state',
                        },
                        function (err) {
                            expect(err).to.be.null;

                            context.adapter.getForeignObject(
                                `${context.adapterShortName}ff.0.${gid}`,
                                function (err, obj1) {
                                    expect(err).to.be.null;

                                    expect(obj1!.native).to.be.ok;
                                    expect(obj1!.native.ppparam).to.be.equal(9);
                                    done();
                                },
                            );
                        },
                    );
                });
            },
        );
    });

    // setForeignObject merge of custom settings
    it(`${testName}Try to merge custom settings`, done => {
        context.adapter.setForeignObject(
            `${context.adapterShortName}.0.${gid}`,
            {
                type: 'state',
                common: {
                    type: 'string',
                    name: 'Some name',
                    read: true,
                    write: true,
                    role: 'state',
                    custom: {
                        history: { enabled: true },
                    },
                },
                native: {
                    ppparam: 11,
                },
            },
            err => {
                expect(err).to.be.null;
                context.adapter.setForeignObject(
                    `${context.adapterShortName}.0.${gid}`,
                    {
                        common: {
                            type: 'string',
                            name: 'Some name',
                            read: true,
                            write: true,
                            role: 'state',
                            custom: {
                                material: { enabled: true },
                            },
                        },
                        native: {
                            ppparam: 12,
                        },
                        type: 'state',
                    },
                    err => {
                        expect(err).to.be.null;
                        context.adapter.getForeignObject(`${context.adapterShortName}.0.${gid}`, (err, obj1) => {
                            expect(err).to.be.null;

                            expect(obj1!.common.custom!.material).to.be.ok;
                            expect(obj1!.common.custom!.history).to.be.ok;
                            done();
                        });
                    },
                );
            },
        );
    });

    // setForeignObject merge of custom settings
    it(`${testName}Try to delete custom settings`, done => {
        const id = `${context.adapterShortName}.0.${gid}`;
        context.adapter.setForeignObject(
            id,
            {
                common: {
                    type: 'string',
                    name: 'Some name',
                    read: true,
                    write: true,
                    role: 'state',
                    custom: {
                        history: { enabled: true },
                    },
                },
                native: {
                    ppparam: 11,
                },
                type: 'state',
            },
            err => {
                expect(err).to.be.null;
                context.adapter.setForeignObject(
                    id,
                    {
                        common: {
                            type: 'string',
                            name: 'Some name',
                            desc: 'Hello',
                            custom: {
                                material: null,
                                history: null,
                            },
                            read: true,
                            write: true,
                            role: 'state',
                        },
                        native: {
                            bluefox: 14,
                        },
                        type: 'state',
                    },
                    err => {
                        expect(err).to.be.null;
                        context.adapter.getForeignObject(id, (err, obj1) => {
                            expect(err).to.be.null;

                            expect(obj1!.common.custom).to.be.not.ok;
                            done();
                        });
                    },
                );
            },
        );
    });

    // setForeignObject merge of custom settings
    it(`${testName}Try to delete custom settings in new object`, done => {
        const id = `${context.adapterShortName}.0.${gid}6`;

        context.adapter.setForeignObject(
            id,
            {
                common: {
                    type: 'string',
                    name: 'Some name',
                    read: true,
                    write: true,
                    role: 'state',
                    custom: {
                        history: { enabled: true },
                    },
                },
                native: {
                    ppparam: 11,
                },
                type: 'state',
            },
            err => {
                expect(err).to.be.null;
                context.adapter.setForeignObject(
                    id,
                    {
                        common: {
                            type: 'string',
                            name: 'Some name',
                            desc: 'Hello',
                            custom: {
                                material: null,
                                history: null,
                            },
                            read: true,
                            write: true,
                            role: 'state',
                        },
                        native: {
                            bluefox: 14,
                        },
                        type: 'state',
                    },
                    err => {
                        expect(err).to.be.null;
                        context.adapter.getForeignObject(id, (err, obj1) => {
                            expect(err).to.be.null;

                            expect(obj1!.common.custom).to.be.not.ok;
                            done();
                        });
                    },
                );
            },
        );
    });

    // getObjectView
    it(`${testName}Try to get object view`, done => {
        // create the view
        context.adapter
            .setForeignObjectAsync('_design/hm-rpc', {
                language: 'javascript',
                type: 'design',
                views: {
                    paramsetDescription: {
                        map: 'function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.native.type === "paramsetDescription") {\n   emit(doc._id, doc);\n  }\n}',
                    },
                },
                common: {
                    name: 'HM-RPC Design',
                },
                native: {},
            })
            .then(() => {
                // now let's create an object matching the view
                context.adapter
                    .setForeignObjectAsync('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19', {
                        type: 'meta',
                        common: {
                            type: 'meta.user',
                            name: 'meta hm-rpc',
                        },
                        native: {
                            adapter: 'hm-rpc',
                            type: 'paramsetDescription',
                        },
                    })
                    .then(() => {
                        context.adapter.getObjectView(
                            'hm-rpc',
                            'paramsetDescription',
                            {
                                startkey: 'hm-rpc.meta.VALUES',
                                endkey: 'hm-rpc.meta.VALUES.\u9999',
                            },
                            (err, doc) => {
                                // now check that our object view contains our object
                                expect(err).to.be.null;
                                expect(doc!.rows).to.be.an('array');
                                expect(doc!.rows.length).to.be.equal(1);
                                expect(doc!.rows[0].value._id).to.be.equal(
                                    'hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19',
                                );
                                done();
                            },
                        );
                    });
            });
    });

    // getObjectViewAsync
    it(`${testName}Try to get object view in async setup`, async () => {
        // create the view
        await context.adapter.setForeignObjectAsync('_design/hm-rpc', {
            language: 'javascript',
            type: 'design',
            views: {
                paramsetDescription: {
                    map: 'function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.native.type === "paramsetDescription") {\n   emit(doc._id, doc);\n  }\n}',
                },
            },
            common: {
                name: 'Test',
            },
            native: {},
        });

        // now lets create an object matching the view
        await context.adapter.setForeignObjectAsync('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19', {
            type: 'meta',
            common: {
                name: 'test',
                type: 'meta.user',
            },
            native: {
                adapter: 'hm-rpc',
                type: 'paramsetDescription',
            },
        });

        const doc = await context.adapter.getObjectViewAsync('hm-rpc', 'paramsetDescription', {
            startkey: 'hm-rpc.meta.VALUES',
            endkey: 'hm-rpc.meta.VALUES.\u9999',
        });

        // now check that our object view contains our object
        expect(doc.rows).to.be.an('array');
        expect(doc.rows.length).to.be.equal(1);
        expect(doc.rows[0].value._id).to.be.equal('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19');
    });

    it(`${testName}Try to get object view with custom`, async function () {
        this.timeout(3_000);

        const customObj = {
            'history.0': {
                enabled: true,
                aliasId: '',
                changesOnly: false,
                debounce: 0,
                changesRelogInterval: 0,
                changesMinDelta: 0,
                maxLength: 10,
                retention: 31536000,
            },
        };

        // lets create an object matching the view
        await context.adapter.setForeignObjectAsync(`${context.adapterShortName}.1.device.channel.testState`, {
            type: 'state',
            common: {
                role: 'switch',
                name: 'Test',
                type: 'boolean',
                read: false,
                write: true,
                custom: customObj,
            },
            native: {},
        });

        const doc = await context.adapter.getObjectViewAsync('system', 'custom', {
            startkey: `${context.adapterShortName}.1.device.channel.`,
            endkey: `${context.adapterShortName}.1.device.channel.\u9999`,
        });

        // now check that our object view contains our object
        expect(doc.rows).to.be.an('array');
        expect(doc.rows.length).to.be.equal(1);
        expect(doc.rows[0].id).to.be.equal(`${context.adapterShortName}.1.device.channel.testState`);
        expect(doc.rows[0].value).to.deep.equal(customObj);
    });

    // getObjectList
    it(`${testName}Try to get object list`, done => {
        // let's create an object matching the list
        context.adapter
            .setForeignObjectAsync('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19', {
                type: 'meta',
                common: {
                    type: 'meta.user',
                    name: 'test',
                },
                native: {
                    adapter: 'hm-rpc',
                    type: 'paramsetDescription',
                },
            })
            .then(() => {
                // now lets get our object
                context.adapter.getObjectList(
                    {
                        startkey: 'hm-rpc.meta.VALUES',
                        endkey: 'hm-rpc.meta.VALUES.\u9999',
                    },
                    (err, res) => {
                        expect(err).to.be.null;
                        expect(res!.rows.length).to.be.equal(1);
                        expect(res!.rows[0].id).to.be.equal(
                            'hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19',
                        );

                        // and try a non existing pattern
                        context.adapter.getObjectList({ startkey: '', endkey: '_' }, (err, res) => {
                            expect(err).to.be.not.ok;
                            expect(res!.rows.length).to.be.equal(0);
                            done();
                        });
                    },
                );
            });
    });

    // getObjectListAsync
    it(`${testName}Try to get object list async`, done => {
        // let's create an object matching the list
        context.adapter
            .setForeignObjectAsync('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19', {
                type: 'meta',
                common: {
                    name: 'test',
                    type: 'meta.user',
                },
                native: {
                    adapter: 'hm-rpc',
                    type: 'paramsetDescription',
                },
            })
            .then(() => {
                // now lets get our object
                context.adapter
                    .getObjectListAsync({
                        startkey: 'hm-rpc.meta.VALUES',
                        endkey: 'hm-rpc.meta.VALUES.\u9999',
                    })
                    .then(res => {
                        expect(res.rows.length).to.be.equal(1);
                        expect(res.rows[0].id).to.be.equal('hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19');

                        // and try a non-existing pattern
                        context.adapter.getObjectListAsync({ startkey: '', endkey: '_' }).then(res => {
                            expect(res.rows.length).to.be.equal(0);
                            done();
                        });
                    });
            });
    });

    // delObject
    it(`${testName}Try to delete existing object`, done => {
        context.adapter.delObject(gid, err => {
            expect(err).to.not.be.ok;

            context.adapter.getObject(gid, (err, obj) => {
                expect(err).to.be.not.ok;

                expect(obj).to.be.null;

                // deleting non existing object should not result in an error
                context.adapter.delObject(gid, err => {
                    expect(err).to.not.be.ok;
                    done();
                });
            });
        });
    });

    // delForeignObject
    it(`${testName}Try to delete foreign existing object`, function (done) {
        context.adapter.delForeignObject(`${context.adapterShortName}f.0.${gid}`, function (err) {
            expect(err).to.not.be.ok;

            context.adapter.getForeignObject(`${context.adapterShortName}f.0.${gid}`, function (err, obj) {
                expect(err).to.be.not.ok;

                expect(obj).to.be.null;

                // deleting non existing object should not result in an error
                context.adapter.delForeignObject(`${context.adapterShortName}f.0.${gid}`, function (err) {
                    expect(err).to.be.not.ok;
                    done();
                });
            });
        });
    });

    // check that enum membership is removed on delForeignObject
    it(`${testName}should delete enum membership on object deletion`, done => {
        const objects = context.objects;
        const enumObj: ioBroker.SettableEnumObject = {
            common: {
                name: 'Wohnzimmer',
                members: ['tesla.0.model', 'test.0.test'],
            },
            native: {},
            type: 'enum',
        };
        // create our object
        objects.setObject(
            'tesla.0.model',
            {
                type: 'state',
                native: {},
                common: {
                    type: 'string',
                    name: 'Model',
                    read: true,
                    write: true,
                    role: 'state',
                },
            },
            () => {
                // now create the enum with object as member
                objects.setObject('enum.rooms.living_room', enumObj, () => {
                    // delete the object via adapter method
                    context.adapter.delForeignObject('tesla.0.model', () => {
                        // now get enum object
                        objects.getObject('enum.rooms.living_room', (err, obj) => {
                            // check that only the deleted object has been removed
                            expect((obj as ioBroker.EnumObject).common.members!.indexOf('tesla.0.model')).to.equal(-1);
                            expect((obj as ioBroker.EnumObject).common.members!.indexOf('test.0.test')).to.equal(0);
                            done();
                        });
                    });
                });
            },
        );
    });

    // subscribeObjects
    it(`${testName}Try to subscribe on objects changes`, done => {
        context.adapter.subscribeObjects('*', () => {
            context.onAdapterObjectChanged = (id, obj) => {
                if (id === `${context.adapterShortName}.0.${gid}`) {
                    expect(obj).to.be.ok;
                    expect(obj!.common.name).to.equal('must be set');
                    context.onAdapterObjectChanged = null;
                    done();
                }
            };
            context.adapter.setObjectNotExists(
                gid,
                {
                    common: {
                        type: 'string',
                        name: 'must be set',
                        read: true,
                        write: true,
                        role: 'state',
                    },
                    native: {
                        pparam: 10,
                    },
                    type: 'state',
                },
                err => {
                    expect(err).to.be.null;
                },
            );
        });
    });

    // unsubscribeObjects
    it(`${testName}Try to unsubscribe on objects changes`, function (done) {
        this.timeout(3_000);
        context.adapter.unsubscribeObjects('*', () => {
            context.onAdapterObjectChanged = function (id, obj) {
                if (id === `${context.adapterShortName}.0.${gid}`) {
                    expect(obj).to.be.ok;
                    expect(obj).to.be.not.ok;
                }
            };
            context.adapter.setObject(
                gid,
                {
                    common: {
                        type: 'string',
                        name: 'must be set',
                        read: true,
                        write: true,
                        role: 'state',
                    },
                    native: {
                        pparam: 10,
                    },
                    type: 'state',
                },
                function (err) {
                    expect(err).to.be.null;
                    setTimeout(function () {
                        done();
                    }, 2_000);
                },
            );
        });
    });

    // subscribeForeignObjects
    it(`${testName}Try to subscribe on foreign objects changes`, function (done) {
        context.adapter.subscribeForeignObjects(`${context.adapterShortName}f.*`, () => {
            context.onAdapterObjectChanged = function (id, obj) {
                if (id === `${context.adapterShortName}f.0.${gid}`) {
                    expect(obj).to.be.ok;
                    expect(obj!.common.name).to.equal('must be set');
                    context.onAdapterObjectChanged = null;
                    done();
                }
            };
            context.adapter.setForeignObject(
                `${context.adapterShortName}f.0.${gid}`,
                {
                    common: {
                        type: 'string',
                        name: 'must be set',
                        read: true,
                        write: true,
                        role: 'state',
                    },
                    native: {
                        pparam: 10,
                    },
                    type: 'state',
                },
                function (err) {
                    expect(err).to.be.null;
                },
            );
        });
    });

    // check proteciton for subscribeForeignObjects
    it(`${testName}Check if protectedNative is protected in subscribeForeignObjects`, function (done) {
        context.adapter.subscribeForeignObjects('system.adapter.tesla.0', () => {
            context.onAdapterObjectChanged = function (id, obj) {
                if (id === 'system.adapter.tesla.0') {
                    expect(obj).to.be.ok;
                    expect(obj!.common.name).to.equal('tesla');
                    expect(obj!.native).to.be.ok;
                    expect(obj!.common.name).equal('tesla');
                    expect(obj!.native.model).equal('S P85D');
                    expect(obj!.native.username).to.be.undefined;
                    expect(obj!.native.password).to.be.undefined;
                    expect(obj!._id).equal('system.adapter.tesla.0');
                    context.onAdapterObjectChanged = null;
                    done();
                }
            };
            context.adapter.setForeignObject(
                'system.adapter.tesla.0',
                {
                    type: 'instance',
                    common: {
                        name: 'tesla',
                        enabled: true,
                        version: '1.0.0',
                        host: 'system.host.test',
                        mode: 'daemon',
                        platform: 'Javascript/Node.js',
                        materialize: true,
                        installedVersion: '1.0.0',
                    },
                    native: {
                        model: 'S P85D',
                        username: 'tesla',
                        password: 'winning',
                    },
                    protectedNative: ['username', 'password'],
                    objects: [],
                    instanceObjects: [],
                },
                function (err) {
                    expect(err).to.be.null;
                },
            );
        });
    });

    it(`${testName}Check if own protectedNative is available in subscribeForeignObjects`, function (done) {
        // If own adapter, protectedNative has to be available
        context.adapter.subscribeForeignObjects(`system.adapter.${context.adapterShortName}.0`, () => {
            context.onAdapterObjectChanged = (id, obj) => {
                if (id === `system.adapter.${context.adapterShortName}.0`) {
                    expect(obj).to.be.ok;
                    expect(obj!.common.name).to.equal('tesla');
                    expect(obj!.native).to.be.ok;
                    expect(obj!.common.name).equal('tesla');
                    expect(obj!.native.model).equal('S P85D');
                    expect(obj!.native.username).to.equal('tesla');
                    expect(obj!.native.password).to.equal('winning');
                    expect(obj!._id).equal(`system.adapter.${context.adapterShortName}.0`);
                    context.onAdapterObjectChanged = null;
                    done();
                }
            };
            context.adapter.setForeignObject(
                `system.adapter.${context.adapterShortName}.0`,
                {
                    type: 'instance',
                    common: {
                        name: 'tesla',
                        enabled: true,
                        version: '1.0.0',
                        host: 'system.host.test',
                        mode: 'daemon',
                        platform: 'Javascript/Node.js',
                        materialize: true,
                        installedVersion: '1.0.0',
                    },
                    native: {
                        model: 'S P85D',
                        username: 'tesla',
                        password: 'winning',
                    },
                    protectedNative: ['username', 'password'],
                    objects: [],
                    instanceObjects: [],
                },
                function (err) {
                    expect(err).to.be.null;
                },
            );
        });
    });

    // unsubscribeForeignObjects
    it(`${testName}Try to unsubscribe on foreign objects changes`, function (done) {
        this.timeout(3_000);
        context.adapter.unsubscribeForeignObjects(`${context.adapterShortName}f.*`, () => {
            context.onAdapterObjectChanged = function (id, obj) {
                if (id === `${context.adapterShortName}f.0.${gid}`) {
                    expect(obj).to.be.ok;
                    expect(obj).to.be.not.ok;
                }
            };
            context.adapter.setForeignObject(
                `${context.adapterShortName}f.0.${gid}`,
                {
                    common: {
                        type: 'string',
                        name: 'must be set',
                        read: true,
                        write: true,
                        role: 'state',
                    },
                    native: {
                        pparam: 10,
                    },
                    type: 'state',
                },
                function (err) {
                    expect(err).to.be.null;
                    setTimeout(function () {
                        done();
                    }, 2000);
                },
            );
        });
    });

    // Try to access system configuration
    it(`${testName}Try to access system configuration`, function (done) {
        this.timeout(3_000);

        context.adapter.getForeignObject('system.config', (err, obj) => {
            expect(err).to.be.null;
            expect(obj).to.be.ok;
            setTimeout(function () {
                done();
            }, 2000);
        });
    });

    // getObject with acls
    it(`${testName}Check getObjects with ACLs`, function (done) {
        this.timeout(3_000);
        // create testf.0.myTestObject

        context.adapter.setForeignObject(
            'system.group.writer',
            {
                common: {
                    name: 'Writer',
                    members: ['system.user.write-only'],
                    acl: {
                        object: {
                            list: false,
                            read: true,
                            write: false,
                            delete: false,
                            create: false,
                        },
                        state: {
                            list: false,
                            read: false,
                            write: false,
                            create: false,
                            delete: false,
                        },
                        users: {
                            write: false,
                            create: false,
                            delete: false,
                            list: false,
                            read: false,
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
                    object: 1638,
                    owner: 'system.user.admin',
                    ownerGroup: 'system.group.administrator',
                },
                _id: 'system.group.writer',
                type: 'group',
            },
            function (err) {
                expect(err).to.be.null;

                context.adapter.setForeignObject(
                    'system.user.write-only',
                    {
                        type: 'user',
                        common: {
                            name: 'write-only',
                            enabled: true,
                            password:
                                'pbkdf2$10000$ab4104d8bb68390ee7e6c9397588e768de6c025f0c732c18806f3d1270c83f83fa86a7bf62583770e5f8d0b405fbb3ad32214ef3584f5f9332478f2506414443a910bf15863b36ebfcaa7cbb19253ae32cd3ca390dab87b29cd31e11be7fa4ea3a01dad625d9de44e412680e1a694227698788d71f1e089e5831dc1bbacfa794b45e1c995214bf71ee4160d98b4305fa4c3e36ee5f8da19b3708f68e7d2e8197375c0f763d90e31143eb04760cc2148c8f54937b9385c95db1742595634ed004fa567655dfe1d9b9fa698074a9fb70c05a252b2d9cf7ca1c9b009f2cd70d6972ccf0ee281d777d66a0346c6c6525436dd7fe3578b28dca2c7adbfde0ecd45148$31c3248ba4dc9600a024b4e0e7c3e585',
                        },
                        _id: 'system.user.write-only',
                        native: {},
                        acl: {
                            object: 1638,
                            owner: 'system.user.admin',
                            ownerGroup: 'system.group.administrator',
                        },
                    },
                    function (err) {
                        expect(err).to.be.null;

                        context.adapter.setForeignObject(
                            `${context.adapterShortName}f.0.${gid}`,
                            {
                                type: 'state',
                                common: {
                                    name: 'test1',
                                    type: 'number',
                                    role: 'level',
                                    read: true,
                                    write: true,
                                },
                                native: {
                                    attr1: '1',
                                    attr2: '2',
                                    attr3: '3',
                                    repositories: ['R1'],
                                    certificates: ['C1'],
                                    devices: ['D1'],
                                },
                                acl: {
                                    object: 1638,
                                    owner: 'system.user.write-only',
                                    ownerGroup: 'system.group.administrator',
                                    state: 1638,
                                },
                            },
                            function (err) {
                                expect(err).to.be.null;

                                context.objects.getObject(
                                    `${context.adapterShortName}f.0.${gid}`,
                                    { user: 'system.user.write-only' },
                                    function (err, obj) {
                                        expect(err).to.be.not.ok;
                                        expect(obj).to.be.ok;
                                        expect(obj!.native).to.be.ok;
                                        expect(obj!._id).equal(`${context.adapterShortName}f.0.${gid}`);
                                        expect(obj!.common.name).equal('test1');
                                        expect(obj!.type).equal('state');
                                        //expect(obj.acl).to.be.ok;
                                        done();
                                    },
                                );
                            },
                        );
                    },
                );
            },
        );
    });

    // should use def as default state value
    it(`${testName}Check setObject state with def`, async () => {
        await context.adapter.setObjectNotExistsAsync('testDefaultVal', {
            type: 'state',
            common: {
                name: 'Test',
                type: 'string',
                def: 'Run Forrest, Run!',
                read: true,
                write: true,
                role: 'state',
            },
            native: {},
        });

        const state = await context.adapter.getStateAsync('testDefaultVal');
        expect(state!.val).to.equal('Run Forrest, Run!');
        expect(state!.ack).to.equal(true);
        return Promise.resolve();
    });

    // should use def as default state value on extendObject when obj non-existing
    it(`${testName}Check extendObject state with def`, async function () {
        this.timeout(3_000);
        let obj = await context.adapter.extendObjectAsync('testDefaultValExtend', {
            type: 'state',
            common: {
                type: 'string',
                def: 'Run Forrest, Run!',
            },
        });

        expect(obj).to.be.ok;

        let state = await context.adapter.getStateAsync('testDefaultValExtend');
        expect(state!.val).to.equal('Run Forrest, Run!');
        expect(state!.ack).to.equal(true);

        // when state already exists def should not override
        obj = await context.adapter.extendObjectAsync('testDefaultValExtend', {
            common: {
                def: 'Please, do not set me up',
            },
        });

        expect(obj).to.be.ok;

        state = await context.adapter.getStateAsync('testDefaultValExtend');
        expect(state!.val).to.equal('Run Forrest, Run!');

        // delete state but not object
        await context.adapter.delStateAsync('testDefaultValExtend');
        // extend it again - def should be created again, because state has been removed - now we set a def object
        obj = await context.adapter.extendObjectAsync('testDefaultValExtend', {
            common: {
                def: { hello: 'world' },
            },
        });

        expect(obj).to.be.ok;

        state = await context.adapter.getStateAsync('testDefaultValExtend');
        // @ts-expect-error TODO do we want this auto parsing?
        expect(state!.val!.hello).to.equal('world');
        expect(state!.ack).to.equal(true);
    });

    // should use def as default state value on extendForeignObject when obj non-existing
    it(`${testName}Check extendForeignObject state with def`, async () => {
        let obj = await context.adapter.extendForeignObjectAsync('foreign.0.testDefaultValExtend', {
            type: 'state',
            common: {
                type: 'string',
                def: 'Run Forrest, Run!',
            },
        });

        expect(obj).to.be.ok;

        let state = await context.adapter.getForeignStateAsync('foreign.0.testDefaultValExtend');
        expect(state!.val).to.equal('Run Forrest, Run!');
        expect(state!.ack).to.equal(true);

        // when state already exists def should not override
        obj = await context.adapter.extendForeignObjectAsync('foreign.0.testDefaultValExtend', {
            common: {
                def: 'Please, do not set me up',
            },
        });

        expect(obj).to.be.ok;

        state = await context.adapter.getForeignStateAsync('foreign.0.testDefaultValExtend');
        expect(state!.val).to.equal('Run Forrest, Run!');

        // delete state but not object
        await context.adapter.delForeignStateAsync('foreign.0.testDefaultValExtend');
        // extend it again - def should be created again, because state has been removed - now we set a def object
        obj = await context.adapter.extendForeignObjectAsync('foreign.0.testDefaultValExtend', {
            common: {
                def: { hello: 'world' },
            },
        });

        expect(obj).to.be.ok;

        state = await context.adapter.getForeignStateAsync('foreign.0.testDefaultValExtend');
        // @ts-expect-error TODO do we want this auto parsing?
        expect(state!.val!.hello).to.equal('world');
        expect(state!.ack).to.equal(true);
    });

    it(`${testName}Check extendForeignObject with preserve option`, async () => {
        const obj = await context.adapter.extendForeignObjectAsync('foreign.0.testExtendPreserve', {
            type: 'state',
            common: {
                name: "Don't change me",
                type: 'string',
                def: 'Run Forrest, Run!',
            },
            native: {
                bool: false,
            },
        });

        expect(obj).to.be.ok;

        let options: Record<string, any> = { preserve: { common: ['name'], native: ['bool'] } };

        // extend object again with new, preserved and override values
        await context.adapter.extendForeignObjectAsync(
            'foreign.0.testExtendPreserve',
            {
                common: {
                    def: 'Changed',
                    name: 'Changed',
                },
                native: {
                    existing: 'exists',
                    bool: true,
                },
            },
            options,
        );

        let objGet = await context.adapter.getForeignObjectAsync('foreign.0.testExtendPreserve');

        // preserved name but def is not preserved and stuff is there
        expect(objGet!.common.name).to.be.equal("Don't change me");
        expect(objGet!.native.existing).to.be.equal('exists');
        expect((objGet as ioBroker.StateObject).common.def).to.be.equal('Changed');
        expect(objGet!.native.bool).to.be.equal(false);

        // now overwrite all
        await context.adapter.setForeignObjectAsync('foreign.0.testExtendPreserve', {
            type: 'state',
            common: {
                name: "Don't change me",
                type: 'string',
                def: 'Run Forrest, Run!',
                read: true,
                write: true,
                role: 'state',
            },
            native: {
                bool: false,
            },
        });

        options = { preserve: { common: true } };

        // preserve whole common
        await context.adapter.extendForeignObjectAsync(
            'foreign.0.testExtendPreserve',
            {
                type: 'state',
                common: {
                    name: 'CHANGED',
                    type: 'number',
                    def: 1,
                },
                native: {
                    bool: false,
                },
            },
            options,
        );

        objGet = await context.adapter.getForeignObjectAsync('foreign.0.testExtendPreserve');

        // preserved whole common but native is not preserved and stuff is there
        expect(objGet!.common.name).to.be.equal("Don't change me");
        expect((objGet as ioBroker.StateObject).common.type).to.be.equal('string');
        expect((objGet as ioBroker.StateObject).common.def).to.be.equal('Run Forrest, Run!');
        expect(objGet!.native.bool).to.be.equal(false);

        // Now preserve a property which is not in the oldObj
        options = { preserve: { common: ['newStuff'] } };

        await context.adapter.extendForeignObjectAsync(
            'foreign.0.testExtendPreserve',
            {
                type: 'state',
                common: {
                    name: 'CHANGED',
                    type: 'number',
                    def: 1,
                    smartName: 'test',
                },
                native: {
                    bool: false,
                },
            },
            options,
        );

        objGet = await context.adapter.getForeignObjectAsync('foreign.0.testExtendPreserve');

        expect((objGet as ioBroker.StateObject).common.smartName).to.be.equal('test');

        // Now preserve a property which is not in the newObj
        options = { preserve: { common: ['name'] } };

        await context.adapter.extendForeignObjectAsync(
            'foreign.0.testExtendPreserve',
            {
                type: 'state',
                common: {
                    type: 'number',
                    def: 1,
                    smartName: 'test',
                },
                native: {
                    bool: false,
                },
            },
            options,
        );

        objGet = await context.adapter.getForeignObjectAsync('foreign.0.testExtendPreserve');

        // should not be deleted
        expect(objGet!.common.name).to.be.equal('CHANGED');

        // Now preserve a property whose type is changing
        options = { preserve: { common: ['name'] } };

        await context.adapter.extendForeignObjectAsync(
            'foreign.0.testExtendPreserve',
            {
                type: 'state',
                common: {
                    name: {
                        en: 'Hallo',
                        de: 'Hello',
                    },
                    type: 'number',
                    def: 1,
                    smartName: 'test',
                },
                native: {
                    bool: false,
                },
            },
            options,
        );

        objGet = await context.adapter.getForeignObjectAsync('foreign.0.testExtendPreserve');
        // should still be the string, because preserved
        expect(objGet!.common.name).to.be.equal('CHANGED');
    });

    // test that real errors of methods promisified via tools.promisify are propagated, can be adapted to a more generic test
    it(`${testName}Check that crashes of promisified methods are propagated`, function () {
        return expect(
            context.adapter.extendObjectAsync('testDefaultValExtend', {
                type: 'state',
                common: {
                    type: 'string',
                    def: 'Run Forrest, Run!',
                },
                // @ts-expect-error force crash
                native: -3,
            }),
        ).to.be.eventually.rejectedWith(
            `Cannot use 'in' operator to search for 'repositories' in -3`,
            'Should have thrown',
        );
    });

    it(`${testName}Should check object existence`, async () => {
        const id = 'objectExistenceCheckAdapter';
        // object should not exist
        let exists = await context.adapter.objectExists(id);
        expect(exists).to.be.false;

        // create object
        await context.adapter.setObjectAsync(id, {
            type: 'meta',
            common: { name: 'meta', type: 'meta.user' },
            native: {},
        });

        // object should now exist
        exists = await context.adapter.objectExists(id);
        expect(exists).to.be.true;
    });

    it(`${testName}Should check foreign object existence`, async () => {
        const id = `${context.adapterShortName}.0.objectForeignExistenceCheckAdapter`;
        // object should not exist
        let exists = await context.adapter.foreignObjectExists(id);
        expect(exists).to.be.false;

        // create object
        await context.adapter.setForeignObjectAsync(id, {
            type: 'meta',
            common: { name: 'meta', type: 'meta.user' },
            native: {},
        });

        // object should now exist
        exists = await context.adapter.foreignObjectExists(id);
        expect(exists).to.be.true;
    });

    // files
    it(`${testName}Should check file existence`, async () => {
        // create meta object
        await context.objects.setObjectAsync('fileTest.0', {
            type: 'meta',
            common: { name: 'meta', type: 'meta.user' },
            native: {},
        });

        // file should not exist
        let exists = await context.adapter.fileExists('fileTest.0', 'testExists.txt');
        expect(exists).to.be.false;

        // create file and check existence again
        await context.adapter.writeFileAsync('fileTest.0', 'testExists.txt', 'lorem ipsum..');
        exists = await context.adapter.fileExists('fileTest.0', 'testExists.txt');
        expect(exists).to.be.true;
    });

    // write file meta check
    it(`${testName}Should not write file w/o meta`, async () => {
        try {
            await context.adapter.writeFileAsync('nonExisting.0', 'test.txt', '...');
        } catch (e) {
            expect(e.message.includes('is not an object of type "meta"')).to.be.true;
            return Promise.resolve();
        }
        return Promise.reject(new Error('it should have returned before'));
    });
}
