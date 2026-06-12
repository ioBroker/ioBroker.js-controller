import type { TestContext } from '../_Types.js';
import assert from 'node:assert/strict';

/**
 * Contains tests interacting with DB via adapter.ts
 *
 * @param it - mocha test function
 * @param context - test context
 */
export function register(it: Mocha.TestFunction, context: TestContext): void {
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
                assert.strictEqual(err, null);
                context.objects.getObject(`${context.adapterShortName}.0.${gid}`, function (err, obj) {
                    assert.ok(!err);
                    assert.ok(obj);
                    assert.ok(obj.native);
                    assert.strictEqual(obj._id, `${context.adapterShortName}.0.${gid}`);
                    assert.strictEqual(obj.common.name, 'test1');
                    assert.strictEqual(obj.type, 'state');
                    //assert.ok(obj.acl);
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
                assert.ok(err);

                context.objects.getObject(`${context.adapterShortName}.0.${id}`, function (err, obj) {
                    assert.ok(!err); // there is no message, that object does not exist. Errors will be given back only if no access rights
                    assert.ok(!obj);
                    done();
                });
            },
        );
    });

    // getAdapterObjects
    it(`${testName}Read all objects of adapter`, function (done) {
        context.adapter.getAdapterObjects(objects => {
            assert.ok(objects);
            assert.ok(objects[`${context.adapterShortName}.0.${gid}`]);
            assert.strictEqual(objects[`${context.adapterShortName}.0.${gid}`].type, 'state');
            done();
        });
    });

    it(`${testName}setObject without callback is async`, async () => {
        const id = `${gid}AsyncNoCb`;

        const res = await context.adapter.setObject(id, {
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
        });

        assert.ok(res);
        assert.strictEqual(res.id, `${context.adapter.namespace}.${id}`);
    });

    it(`${testName}setForeignObject without callback is async`, async () => {
        const id = `${context.adapterShortName}.0.${gid}ForeignAsyncNoCb`;

        const res = await context.adapter.setForeignObject(id, {
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
        });

        assert.ok(res);
        assert.strictEqual(res.id, id);
    });

    // extendObject
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
                assert.ok(!err);
                assert.ok(obj);

                context.objects.getObject(`${context.adapterShortName}.0.${gid}`, function (err, obj) {
                    assert.ok(obj);
                    assert.strictEqual(obj.type, 'state');
                    assert.strictEqual(obj.native.attr1, '11');
                    assert.strictEqual(obj.native.attr2, null);
                    assert.strictEqual(obj.native.attr3, '3');
                    assert.strictEqual(obj.native.attr4, '4');
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
                assert.strictEqual(err, null);

                context.objects.getObject(`${context.adapterShortName}f.0.${gid}`, function (err, obj) {
                    assert.ok(!err);
                    assert.ok(obj);
                    assert.ok(obj.native);
                    assert.strictEqual(obj._id, `${context.adapterShortName}f.0.${gid}`);
                    assert.strictEqual(obj.common.name, 'test1');
                    assert.strictEqual(obj.type, 'state');
                    //assert.ok(obj.acl);
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
                assert.ok(!err);
                assert.ok(obj);

                context.objects.getObject(`${context.adapterShortName}f.0.${gid}`, (err, obj) => {
                    assert.ok(obj);
                    assert.strictEqual(obj.type, 'state');
                    assert.strictEqual(obj.native.attr1, '11');
                    assert.strictEqual(obj.native.attr2, null);
                    assert.strictEqual(obj.native.attr3, '3');
                    assert.strictEqual(obj.native.attr4, '4');

                    assert.strictEqual(obj.native.repositories.length, 1);
                    assert.strictEqual(obj.native.repositories[0], 'R2');

                    assert.strictEqual(obj.native.certificates.length, 1);
                    assert.strictEqual(obj.native.certificates[0], 'C1');

                    assert.strictEqual(obj.native.devices.length, 1);
                    assert.strictEqual(obj.native.devices[0], 'D2');
                    done();
                });
            },
        );
    });

    // getObject
    it(`${testName}Check get object`, function (done) {
        context.adapter.getObject(`${context.adapterShortName}.0.${gid}`, function (err, obj) {
            assert.strictEqual(err, null);

            assert.ok(obj);
            assert.strictEqual(obj.type, 'state');
            assert.strictEqual(obj.native.attr1, '11');
            context.adapter.getObject(gid, function (err, obj1) {
                assert.strictEqual(err, null);

                assert.ok(obj1);
                assert.strictEqual(JSON.stringify(obj1), JSON.stringify(obj));
                done();
            });
        });
    });

    // getForeignObjects
    it(`${testName}Check get foreign objects (pattern)`, done => {
        context.adapter.getForeignObjects(`${context.adapterShortName}f.0.*`, (err, objs) => {
            assert.strictEqual(err, null);

            assert.ok(objs);
            assert.strictEqual(objs[`${context.adapterShortName}f.0.${gid}`].type, 'state');
            assert.strictEqual(objs[`${context.adapterShortName}f.0.${gid}`].native.attr1, '11');
            done();
        });
    });

    it(`${testName}Check get foreign objects (array)`, async () => {
        const id = `${context.adapterShortName}f.0.${gid}`;
        const id2 = `${context.adapterShortName}.0.${gid}`;

        const objs = await context.adapter.getForeignObjects([id, id2]);

        assert.ok(objs);
        assert.strictEqual(objs[id].type, 'state');
        assert.strictEqual(objs[id].native.attr1, '11');
        assert.strictEqual(objs[id2].type, 'state');
    });

    it(`${testName}Check get foreign objects - default enum functionality`, async () => {
        const id = `${context.adapterShortName}.0.${gid}`;

        // add the state to the enum, so we can check enum functionality
        await context.adapter.addStateToEnumAsync('enum.rooms', 'kitchen', '', '', gid);

        // when no argument is provided, all enums should be taken into account
        const objs = await context.adapter.getForeignObjects([id]);

        assert.ok(objs);

        const obj = objs[id];

        assert.strictEqual(obj.type, 'state');
        assert.strictEqual(obj.native.attr1, '11');
        assert.ok(obj.enums);
        assert.strictEqual((obj.enums['enum.rooms.kitchen'] as ioBroker.Translated).en, 'Kitchen');
    });

    // findForeignObject
    it(`${testName}Check find foreign object`, function (done) {
        context.adapter.findForeignObject('test1', null, function (err, id) {
            assert.strictEqual(err, null);
            assert.strictEqual(id, `${context.adapterShortName}.0.${gid}`);

            context.adapter.findForeignObject('test1', 'number', function (err, id) {
                assert.strictEqual(err, null);
                assert.strictEqual(id, `${context.adapterShortName}.0.${gid}`);

                context.adapter.findForeignObject('test1', 'boolean', function (err, id) {
                    assert.strictEqual(err, null);

                    assert.strictEqual(id, undefined);
                    done();
                });
            });
        });
    });

    // getForeignObject
    it(`${testName}Check get foreign object`, function (done) {
        context.adapter.getForeignObject(`${context.adapterShortName}f.0.${gid}`, function (err, obj) {
            assert.strictEqual(err, null);

            assert.ok(obj);
            assert.strictEqual(obj.type, 'state');
            assert.strictEqual(obj.native.attr1, '11');
            context.adapter.getForeignObject(gid, function (err, obj1) {
                assert.ok(!err);

                assert.strictEqual(obj1, null);
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
                    complex: {
                        password: 'winning',
                    },
                    attrArray: [
                        { password: 'winning', value: 'not encoded 1' },
                        { value: 'not encoded 2' },
                        { password: 'winning', value: 'not encoded 3' },
                    ],
                },
                protectedNative: ['username', 'password', 'complex.password', 'attrArray.password'],
                objects: [],
                instanceObjects: [],
            },
            function (err) {
                assert.strictEqual(err, null);

                context.adapter.getForeignObject('system.adapter.tesla.0', function (err, obj) {
                    assert.ok(!err);
                    assert.ok(obj);
                    assert.ok(obj.native);
                    assert.strictEqual(obj.common.name, 'tesla');
                    assert.strictEqual(obj.native.model, 'S P85D');
                    assert.strictEqual(obj.native.username, undefined);
                    assert.strictEqual(obj.native.password, undefined);
                    assert.strictEqual(obj.native.complex.password, undefined);
                    assert.strictEqual(obj.native.attrArray[0].password, undefined);
                    assert.strictEqual(obj.native.attrArray[1].password, undefined);
                    assert.strictEqual(obj.native.attrArray[2].password, undefined);
                    assert.strictEqual(obj.native.attrArray[1].value, 'not encoded 2');
                    assert.strictEqual(obj._id, 'system.adapter.tesla.0');
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
                    complex: {
                        password: 'winning',
                    },
                    attrArray: [
                        { password: 'winning1', value: 'not encoded 1' },
                        { password: 'winning2', value: 'not encoded 2' },
                    ],
                },
                protectedNative: ['username', 'password', 'complex.password', 'attrArray.password'],
                objects: [],
                instanceObjects: [],
            },
            function (err) {
                assert.strictEqual(err, null);

                context.adapter.getForeignObject(`system.adapter.${context.adapterShortName}.0`, function (err, obj) {
                    assert.ok(!err);
                    assert.ok(obj);
                    assert.ok(obj.native);
                    assert.strictEqual(obj.common.name, 'tesla');
                    assert.strictEqual(obj.native.model, 'S P85D');
                    assert.strictEqual(obj.native.password, 'winning');
                    assert.strictEqual(obj.native.username, 'tesla');
                    assert.strictEqual(obj.native.complex.password, 'winning');
                    assert.strictEqual(obj.native.attrArray[0].password, 'winning1');
                    assert.strictEqual(obj.native.attrArray[1].password, 'winning2');
                    assert.strictEqual(obj._id, `system.adapter.${context.adapterShortName}.0`);
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
                assert.strictEqual(err, null);

                context.adapter.getObject(gid, function (err, obj1) {
                    assert.strictEqual(err, null);

                    assert.ok(obj1!.native);
                    assert.ok(!obj1!.native.pparam);

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
                            assert.strictEqual(err, null);

                            context.adapter.getObject(`${gid}A`, function (err, obj1) {
                                assert.strictEqual(err, null);

                                assert.ok(obj1!.native);
                                assert.strictEqual(obj1!.native.ppparam, 10);
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
                assert.strictEqual(err, null);

                context.adapter.getForeignObject(`${context.adapterShortName}.0.${gid}`, function (err, obj1) {
                    assert.strictEqual(err, null);

                    assert.ok(obj1!.native);
                    assert.ok(!obj1!.native.ppparam);

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
                            assert.strictEqual(err, null);

                            context.adapter.getForeignObject(
                                `${context.adapterShortName}ff.0.${gid}`,
                                function (err, obj1) {
                                    assert.strictEqual(err, null);

                                    assert.ok(obj1!.native);
                                    assert.strictEqual(obj1!.native.ppparam, 9);
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
                assert.strictEqual(err, null);
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
                        assert.strictEqual(err, null);
                        context.adapter.getForeignObject(`${context.adapterShortName}.0.${gid}`, (err, obj1) => {
                            assert.strictEqual(err, null);

                            assert.ok(obj1!.common.custom!.material);
                            assert.ok(obj1!.common.custom!.history);
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
                assert.strictEqual(err, null);
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
                        assert.strictEqual(err, null);
                        context.adapter.getForeignObject(id, (err, obj1) => {
                            assert.strictEqual(err, null);

                            assert.ok(!obj1!.common.custom);
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
                assert.strictEqual(err, null);
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
                        assert.strictEqual(err, null);
                        context.adapter.getForeignObject(id, (err, obj1) => {
                            assert.strictEqual(err, null);

                            assert.ok(!obj1!.common.custom);
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
                                assert.strictEqual(err, null);
                                assert.ok(Array.isArray(doc!.rows));
                                assert.strictEqual(doc!.rows.length, 1);
                                assert.strictEqual(
                                    doc!.rows[0].value._id,
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
        assert.ok(Array.isArray(doc.rows));
        assert.strictEqual(doc.rows.length, 1);
        assert.strictEqual(doc.rows[0].value._id, 'hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19');
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
        assert.ok(Array.isArray(doc.rows));
        assert.strictEqual(doc.rows.length, 1);
        assert.strictEqual(doc.rows[0].id, `${context.adapterShortName}.1.device.channel.testState`);
        assert.deepStrictEqual(doc.rows[0].value, customObj);
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
                        assert.strictEqual(err, null);
                        assert.strictEqual(res!.rows.length, 1);
                        assert.strictEqual(
                            res!.rows[0].id,
                            'hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19',
                        );

                        // and try a non existing pattern
                        context.adapter.getObjectList({ startkey: '', endkey: '_' }, (err, res) => {
                            assert.ok(!err);
                            assert.strictEqual(res!.rows.length, 0);
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
                        assert.strictEqual(res.rows.length, 1);
                        assert.strictEqual(res.rows[0].id, 'hm-rpc.meta.VALUES.HM-CC-RT-DN.CLIMATECONTROL_RECEIVER.19');

                        // and try a non-existing pattern
                        context.adapter.getObjectListAsync({ startkey: '', endkey: '_' }).then(res => {
                            assert.strictEqual(res.rows.length, 0);
                            done();
                        });
                    });
            });
    });

    // delObject
    it(`${testName}Try to delete existing object`, done => {
        context.adapter.delObject(gid, err => {
            assert.ok(!err);

            context.adapter.getObject(gid, (err, obj) => {
                assert.ok(!err);

                assert.strictEqual(obj, null);

                // deleting non existing object should not result in an error
                context.adapter.delObject(gid, err => {
                    assert.ok(!err);
                    done();
                });
            });
        });
    });

    // delForeignObject
    it(`${testName}Try to delete foreign existing object`, function (done) {
        context.adapter.delForeignObject(`${context.adapterShortName}f.0.${gid}`, function (err) {
            assert.ok(!err);

            context.adapter.getForeignObject(`${context.adapterShortName}f.0.${gid}`, function (err, obj) {
                assert.ok(!err);

                assert.strictEqual(obj, null);

                // deleting non existing object should not result in an error
                context.adapter.delForeignObject(`${context.adapterShortName}f.0.${gid}`, function (err) {
                    assert.ok(!err);
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
                // now create the enum with an object as member
                objects.setObject('enum.rooms.living_room', enumObj, () => {
                    // delete the object via adapter method
                    context.adapter.delForeignObject('tesla.0.model', () => {
                        // now get an enum object
                        objects.getObject('enum.rooms.living_room', (err, obj) => {
                            // check that only the deleted object has been removed
                            assert.strictEqual(
                                (obj as ioBroker.EnumObject).common.members!.indexOf('tesla.0.model'),
                                -1,
                            );
                            assert.strictEqual((obj as ioBroker.EnumObject).common.members!.indexOf('test.0.test'), 0);
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
                    assert.ok(obj);
                    assert.strictEqual(obj.common.name, 'must be set');
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
                    assert.strictEqual(err, null);
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
                    assert.ok(obj);
                    assert.ok(!obj);
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
                    assert.strictEqual(err, null);
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
                    assert.ok(obj);
                    assert.strictEqual(obj.common.name, 'must be set');
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
                    assert.strictEqual(err, null);
                },
            );
        });
    });

    // check proteciton for subscribeForeignObjects
    it(`${testName}Check if protectedNative is protected in subscribeForeignObjects`, function (done) {
        context.adapter.subscribeForeignObjects('system.adapter.tesla.0', () => {
            context.onAdapterObjectChanged = function (id, obj) {
                if (id === 'system.adapter.tesla.0') {
                    assert.ok(obj);
                    assert.strictEqual(obj.common.name, 'tesla');
                    assert.ok(obj.native);
                    assert.strictEqual(obj.common.name, 'tesla');
                    assert.strictEqual(obj.native.model, 'S P85D');
                    assert.strictEqual(obj.native.username, undefined);
                    assert.strictEqual(obj.native.password, undefined);
                    assert.strictEqual(obj.native.complex.password, undefined);
                    assert.strictEqual(obj._id, 'system.adapter.tesla.0');
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
                        complex: {
                            password: 'winning',
                        },
                        attrArray: [
                            { password: 'winning1', value: 'not encoded 1' },
                            { password: 'winning2', value: 'not encoded 2' },
                        ],
                    },
                    protectedNative: ['username', 'password', 'complex.password', 'attrArray.password'],
                    objects: [],
                    instanceObjects: [],
                },
                function (err) {
                    assert.strictEqual(err, null);
                },
            );
        });
    });

    it(`${testName}Check if own protectedNative is available in subscribeForeignObjects`, function (done) {
        // If own adapter, protectedNative has to be available
        context.adapter.subscribeForeignObjects(`system.adapter.${context.adapterShortName}.0`, () => {
            context.onAdapterObjectChanged = (id, obj) => {
                if (id === `system.adapter.${context.adapterShortName}.0`) {
                    assert.ok(obj);
                    assert.strictEqual(obj.common.name, 'tesla');
                    assert.ok(obj.native);
                    assert.strictEqual(obj.common.name, 'tesla');
                    assert.strictEqual(obj.native.model, 'S P85D');
                    assert.strictEqual(obj.native.username, 'tesla');
                    assert.strictEqual(obj.native.password, 'winning');
                    assert.strictEqual(obj.native.complex.password, 'winning');
                    assert.strictEqual(obj.native.attrArray[0].password, 'winning1');
                    assert.strictEqual(obj.native.attrArray[1].password, 'winning2');
                    assert.strictEqual(obj._id, `system.adapter.${context.adapterShortName}.0`);
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
                        complex: {
                            password: 'winning',
                        },
                        attrArray: [
                            { password: 'winning1', value: 'not encoded 1' },
                            { password: 'winning2', value: 'not encoded 2' },
                        ],
                    },
                    protectedNative: ['username', 'password', 'complex.password', 'attrArray.password'],
                    objects: [],
                    instanceObjects: [],
                },
                function (err) {
                    assert.strictEqual(err, null);
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
                    assert.ok(obj);
                    assert.ok(!obj);
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
                    assert.strictEqual(err, null);
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
            assert.strictEqual(err, null);
            assert.ok(obj);
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
                assert.strictEqual(err, null);

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
                        assert.strictEqual(err, null);

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
                                assert.strictEqual(err, null);

                                context.objects.getObject(
                                    `${context.adapterShortName}f.0.${gid}`,
                                    { user: 'system.user.write-only' },
                                    function (err, obj) {
                                        assert.ok(!err);
                                        assert.ok(obj);
                                        assert.ok(obj.native);
                                        assert.strictEqual(obj._id, `${context.adapterShortName}f.0.${gid}`);
                                        assert.strictEqual(obj.common.name, 'test1');
                                        assert.strictEqual(obj.type, 'state');
                                        //assert.ok(obj.acl);
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
        assert.strictEqual(state!.val, 'Run Forrest, Run!');
        assert.strictEqual(state!.ack, true);
        return Promise.resolve();
    });

    // should use def as default state value on extendObject when obj non-existing
    it(`${testName}Check extendObject state with def`, async function () {
        this.timeout(3_000);
        let obj = await context.adapter.extendObject('testDefaultValExtend', {
            type: 'state',
            common: {
                type: 'string',
                def: 'Run Forrest, Run!',
            },
        });

        assert.ok(obj);

        let state = await context.adapter.getStateAsync('testDefaultValExtend');
        assert.strictEqual(state!.val, 'Run Forrest, Run!');
        assert.strictEqual(state!.ack, true);

        // when state already exists def should not override
        obj = await context.adapter.extendObjectAsync('testDefaultValExtend', {
            common: {
                def: 'Please, do not set me up',
            },
        });

        assert.ok(obj);

        state = await context.adapter.getStateAsync('testDefaultValExtend');
        assert.strictEqual(state!.val, 'Run Forrest, Run!');

        // delete state but not object
        await context.adapter.delStateAsync('testDefaultValExtend');
        // extend it again - def should be created again, because state has been removed - now we set a def object
        obj = await context.adapter.extendObject('testDefaultValExtend', {
            common: {
                def: { hello: 'world' },
            },
        });

        assert.ok(obj);

        state = await context.adapter.getStateAsync('testDefaultValExtend');
        // @ts-expect-error TODO do we want this auto parsing?
        assert.strictEqual(state!.val!.hello, 'world');
        assert.strictEqual(state!.ack, true);
    });

    // should use def as default state value on extendForeignObject when obj non-existing
    it(`${testName}Check extendForeignObject state with def`, async () => {
        const id = 'foreign.0.testDefaultValExtend';
        let obj = await context.adapter.extendForeignObject(id, {
            type: 'state',
            common: {
                type: 'string',
                def: 'Run Forrest, Run!',
            },
        });

        assert.ok(obj);
        assert.strictEqual(obj?.id, id);

        let state = await context.adapter.getForeignStateAsync(id);
        assert.strictEqual(state!.val, 'Run Forrest, Run!');
        assert.strictEqual(state!.ack, true);

        // when state already exists def should not override
        obj = await context.adapter.extendForeignObjectAsync(id, {
            common: {
                def: 'Please, do not set me up',
            },
        });

        assert.ok(obj);

        state = await context.adapter.getForeignStateAsync(id);
        assert.strictEqual(state!.val, 'Run Forrest, Run!');

        // delete state but not object
        await context.adapter.delForeignStateAsync(id);
        // extend it again - def should be created again, because state has been removed - now we set a def object
        obj = await context.adapter.extendForeignObjectAsync(id, {
            common: {
                def: { hello: 'world' },
            },
        });

        assert.ok(obj);

        state = await context.adapter.getForeignStateAsync(id);
        // @ts-expect-error TODO do we want this auto parsing?
        assert.strictEqual(state!.val!.hello, 'world');
        assert.strictEqual(state!.ack, true);
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

        assert.ok(obj);

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
        assert.strictEqual(objGet!.common.name, "Don't change me");
        assert.strictEqual(objGet!.native.existing, 'exists');
        assert.strictEqual((objGet as ioBroker.StateObject).common.def, 'Changed');
        assert.strictEqual(objGet!.native.bool, false);

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
        assert.strictEqual(objGet!.common.name, "Don't change me");
        assert.strictEqual((objGet as ioBroker.StateObject).common.type, 'string');
        assert.strictEqual((objGet as ioBroker.StateObject).common.def, 'Run Forrest, Run!');
        assert.strictEqual(objGet!.native.bool, false);

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

        assert.strictEqual((objGet as ioBroker.StateObject).common.smartName, 'test');

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
        assert.strictEqual(objGet!.common.name, 'CHANGED');

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
        assert.strictEqual(objGet!.common.name, 'CHANGED');
    });

    // test that real errors of methods promisified via tools.promisify are propagated, can be adapted to a more generic test
    it(`${testName}Check that crashes of promisified methods are propagated`, async function () {
        await assert.rejects(
            context.adapter.extendObjectAsync('testDefaultValExtend', {
                type: 'state',
                common: {
                    type: 'string',
                    def: 'Run Forrest, Run!',
                },
                // @ts-expect-error force crash
                native: -3,
            }),
            /Cannot use 'in' operator to search for 'repositories' in -3/,
        );
    });

    it(`${testName}Should check object existence`, async () => {
        const id = 'objectExistenceCheckAdapter';
        // object should not exist
        let exists = await context.adapter.objectExists(id);
        assert.strictEqual(exists, false);

        // create object
        await context.adapter.setObjectAsync(id, {
            type: 'meta',
            common: { name: 'meta', type: 'meta.user' },
            native: {},
        });

        // object should now exist
        exists = await context.adapter.objectExists(id);
        assert.strictEqual(exists, true);
    });

    it(`${testName}Should check foreign object existence`, async () => {
        const id = `${context.adapterShortName}.0.objectForeignExistenceCheckAdapter`;
        // object should not exist
        let exists = await context.adapter.foreignObjectExists(id);
        assert.strictEqual(exists, false);

        // create object
        await context.adapter.setForeignObjectAsync(id, {
            type: 'meta',
            common: { name: 'meta', type: 'meta.user' },
            native: {},
        });

        // object should now exist
        exists = await context.adapter.foreignObjectExists(id);
        assert.strictEqual(exists, true);
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
        assert.strictEqual(exists, false);

        // create file and check existence again
        await context.adapter.writeFileAsync('fileTest.0', 'testExists.txt', 'lorem ipsum..');
        exists = await context.adapter.fileExists('fileTest.0', 'testExists.txt');
        assert.strictEqual(exists, true);
    });

    // write file meta check
    it(`${testName}Should not write file w/o meta`, async () => {
        try {
            await context.adapter.writeFileAsync('nonExisting.0', 'test.txt', '...');
        } catch (e) {
            assert.strictEqual(e.message.includes('is not an object of type "meta"'), true);
            return Promise.resolve();
        }
        return Promise.reject(new Error('it should have returned before'));
    });
}
