import type { TestContext } from '../_Types.js';
import assert from 'node:assert/strict';

/**
 * Contains tests directly interacting with DB
 */

export function register(it: Mocha.TestFunction, context: TestContext): void {
    const testName = `${context.name} objects: `;

    const namespace = 'testObject.0';
    const testId = `${namespace}.test2`;

    it(`${testName}should create and read object`, async (): Promise<void> => {
        const objects = context.objects;
        const res = await objects.setObjectAsync(testId, {
            type: 'state',
            common: {
                type: 'string',
                name: 'test2',
                read: true,
                write: true,
                role: 'state',
            },
            native: {},
        });
        assert.ok(res);
        assert.strictEqual(res.id, testId);

        const obj = await objects.getObjectAsync(testId);
        assert.ok(obj);
        assert.strictEqual(obj.common.name, 'test2');
        assert.strictEqual(obj._id, testId);
        console.log(JSON.stringify(obj));
    });

    it(`${testName}should create object async`, done => {
        const objects = context.objects;
        objects
            .setObjectAsync(`${testId}async`, {
                type: 'state',
                common: {
                    type: 'string',
                    name: 'test1a',
                    read: true,
                    write: true,
                    role: 'state',
                },
                native: {},
            })
            .then(res => {
                assert.ok(res);
                assert.strictEqual(res.id, `${testId}async`);
                done();
            })
            .catch(err => {
                assert.ok(!err);
            });
    });

    it(`${testName}should read object async`, done => {
        const objects = context.objects;
        objects
            .getObjectAsync(`${testId}async`)
            .then(obj => {
                assert.ok(obj);
                assert.strictEqual(obj.common.name, 'test1a');
                assert.strictEqual(obj._id, `${testId}async`);
                console.log(JSON.stringify(obj));
                done();
            })
            .catch(err => {
                assert.ok(!err);
            });
    }).timeout(3_000);

    it(`${testName}should find object`, done => {
        const objects = context.objects;
        objects.findObject(testId, null, (err, id, idOrName) => {
            assert.ok(!err);
            assert.strictEqual(idOrName, 'test2');
            assert.strictEqual(id, testId);

            objects.findObject('test2', null, (err, id, idOrName) => {
                assert.ok(!err);
                assert.strictEqual(id, testId);
                assert.strictEqual(idOrName, 'test2');

                objects.findObject('test3', null, (err, id, idOrName) => {
                    assert.ok(!err);
                    assert.strictEqual(idOrName, 'test3');
                    assert.strictEqual(id, undefined);

                    objects.findObject('test2', 'boolean', (err, id, idOrName) => {
                        assert.ok(!err);
                        assert.strictEqual(idOrName, 'test2');
                        assert.strictEqual(id, undefined);

                        objects.findObject('test2', 'string', (err, id, idOrName) => {
                            assert.ok(!err);
                            assert.strictEqual(idOrName, 'test2');
                            assert.strictEqual(id, testId);
                            done();
                        });
                    });
                });
            });
        });
    });

    it(`${testName}should find object async`, done => {
        const objects = context.objects;
        objects
            .findObject(testId)
            .then(id => {
                assert.strictEqual(id, testId);
                return objects.findObject('test2');
            })
            .then(id => {
                assert.strictEqual(id, testId);

                return objects.findObject('test3');
            })
            .then(id => {
                assert.strictEqual(id, undefined);
                return objects.findObject('test3', 'boolean');
            })
            .then(id => {
                assert.strictEqual(id, undefined);
                return objects.findObject('test2', 'string');
            })
            .then(id => {
                assert.strictEqual(id, testId);
                done();
            })
            .catch(err => {
                console.error(err);
                assert.fail('Never happens');
            });
    });

    it(`${testName}should read objects by pattern`, done => {
        const objects = context.objects;
        objects.getObjectsByPattern(`${testId}*`, null, (err, objs) => {
            assert.ok(!err);
            assert.strictEqual(objs?.length, 2);

            objects.getObjectsByPattern(testId, null, (err, objs) => {
                assert.ok(!err);
                assert.strictEqual(objs?.length, 1);
                assert.strictEqual(typeof objs[0], 'object');
                assert.strictEqual(objs[0]._id, testId);

                objects.getObjectsByPattern(`${testId}non`, null, (err, objs) => {
                    assert.ok(!err);
                    assert.strictEqual(objs?.length, 0);

                    done();
                });
            });
        });
    });

    it(`${testName}should read objects by pattern async`, done => {
        const objects = context.objects;
        objects
            .getObjectsByPattern(`${testId}*`, null)
            .then(objs => {
                assert.strictEqual(objs?.length, 2);

                return objects.getObjectsByPattern(testId, null);
            })
            .then(objs => {
                assert.strictEqual(objs?.length, 1);
                assert.strictEqual(typeof objs[0], 'object');
                assert.strictEqual(objs[0]._id, testId);

                return objects.getObjectsByPattern(`${testId}non`, null);
            })
            .then(objs => {
                assert.strictEqual(objs?.length, 0);

                done();
            })
            .catch(_err => {
                assert.fail('Never happens');
            });
    });

    it(`${testName}should read keys`, done => {
        const objects = context.objects;
        objects.getKeys(`${testId}*`, (err, keys) => {
            assert.ok(!err);
            assert.strictEqual(keys?.length, 2);

            objects.getKeys(testId, (err, keys) => {
                assert.ok(!err);
                assert.strictEqual(keys?.length, 1);
                assert.strictEqual(keys[0], testId);

                objects.getKeys(`${testId}non`, (err, keys) => {
                    assert.ok(!err);
                    assert.strictEqual(keys?.length, 0);

                    done();
                });
            });
        });
    });

    it(`${testName}should read keys async`, done => {
        const objects = context.objects;
        objects
            .getKeys(`${testId}*`)
            .then(keys => {
                assert.strictEqual(keys?.length, 2);

                return objects.getKeys(testId);
            })
            .then(keys => {
                assert.strictEqual(keys?.length, 1);
                assert.strictEqual(keys[0], testId);

                return objects.getKeys(`${testId}non`);
            })
            .then(keys => {
                assert.strictEqual(keys?.length, 0);

                done();
            })
            .catch(_err => {
                assert.fail('Never happens');
            });
    });

    it(`${testName}should read objects`, done => {
        const objects = context.objects;
        objects.getKeys(`${testId}*`, (err, keys) => {
            assert.ok(!err);
            objects.getObjects(keys!, (err, objs) => {
                assert.ok(!err);
                assert.strictEqual(objs?.length, 2);
                assert.strictEqual(objs[0]._id, keys![0]);
                assert.strictEqual(objs[1]._id, keys![1]);
                done();
            });
        });
    });

    it(`${testName}should read objects async`, done => {
        const objects = context.objects;
        let gKeys: string[] | undefined;
        objects
            .getKeys(`${testId}*`)
            .then(keys => {
                gKeys = keys;
                return objects.getObjects(keys!);
            })
            .then(objs => {
                assert.strictEqual(objs.length, 2);
                assert.strictEqual(objs[0]._id, gKeys![0]);
                assert.strictEqual(objs[1]._id, gKeys![1]);
                done();
            })
            .catch(_err => {
                assert.fail('Never happens');
            });
    });

    it(`${testName}should extend object`, done => {
        const objects = context.objects;
        objects.extendObject(testId, { common: { def: 'default' } }, null, (err, res, id) => {
            assert.ok(!err);
            assert.strictEqual(id, testId);
            assert.strictEqual(res?.id, testId);
            assert.strictEqual(res?.value.common.def, 'default');

            objects.getObject(testId, (err, obj) => {
                assert.ok(!err);
                assert.strictEqual(obj!._id, testId);
                assert.strictEqual((obj!.common as ioBroker.StateCommon).def, 'default');
                assert.strictEqual(obj!.common.name, 'test2');

                objects.extendObject(`${namespace}.other`, { common: { def: 'default' } }, null, (err, res, id) => {
                    assert.ok(!err);
                    assert.strictEqual(id, `${namespace}.other`);
                    assert.strictEqual(res!.id, `${namespace}.other`);
                    assert.strictEqual(res!.value.common.def, 'default');

                    done();
                });
            });
        });
    });

    it(`${testName}should extend object async`, done => {
        const objects = context.objects;
        objects
            .extendObject(testId, { common: { def: 'default' } })
            .then(res => {
                assert.strictEqual(res!.id, testId);
                assert.strictEqual(res!.value.common.def, 'default');
                return objects.extendObject(`${namespace}.otherAsync`, { common: { def: 'default' } });
            })
            .then(res => {
                assert.strictEqual(res!.id, `${namespace}.otherAsync`);
                assert.strictEqual(res!.value.common.def, 'default');
                done();
            })
            .catch(_err => {
                assert.fail('Never happens');
            });
    });

    it(`${testName}should getObjectList`, done => {
        const objects = context.objects;
        objects.getObjectList({ startkey: namespace, endkey: testId }, (err, res) => {
            console.log(res!.rows.map(e => e.id));
            assert.ok(!err);
            assert.strictEqual(res!.rows.length, 3);
            const obj = res!.rows.find(val => val.value._id === testId);
            assert.strictEqual(obj!.id, testId);
            assert.strictEqual(obj!.value._id, testId);

            objects.getObjectList({ startkey: '', endkey: ' ' }, (err, res) => {
                assert.ok(!err);
                assert.strictEqual(res!.rows.length, 0);
                done();
            });
        });
    });

    it(`${testName}should getObjectList async`, done => {
        const objects = context.objects;
        objects
            .getObjectList({ startkey: namespace, endkey: testId })
            .then(res => {
                assert.strictEqual(res.rows.length, 3);
                const obj = res.rows.find(val => val.value._id === testId);
                assert.strictEqual(obj!.id, testId);
                assert.strictEqual(obj!.value._id, testId);
                return objects.getObjectList({ startkey: '', endkey: ' ' });
            })
            .then(res => {
                console.log(JSON.stringify(res));
                assert.strictEqual(res.rows.length, 0);
                done();
            })
            .catch(err => {
                console.error(err);
                assert.fail('Never happens');
            });
    });

    it(`${testName}should getObjectView without sets`, async () => {
        // @ts-expect-error turn off useSets and reinitialize scripts, thus we will have old scripts and do not use SADD on setting objects
        context.objects.useSets = false;
        await context.objects.loadLuaScripts();

        await context.objects.setObjectAsync('_design/testAdapter', {
            type: 'design',
            language: 'javascript',
            views: {
                test: {
                    map: 'function(doc) {\n  if (doc._id.match(/^testAdapter/) && doc.meta.type === "test") {\n   emit(doc._id, doc);\n  }\n}',
                },
            },
            common: {
                name: 'Test Design',
            },
            native: {},
        });

        // now let's create an object matching the view
        await context.objects.setObjectAsync('testAdapter.test', {
            type: 'meta',
            common: {
                type: 'meta.user',
                name: 'Test Meta Object',
            },
            meta: {
                adapter: 'testAdapter',
                type: 'test',
            },
            native: {},
        } as ioBroker.SettableMetaObject);

        const doc = await context.objects.getObjectViewAsync('testAdapter', 'test', {
            startkey: 'testAdapter',
            endkey: 'testAdapter\u9999',
        });

        // now check that our object view contains our object
        assert.ok(Array.isArray(doc.rows));
        assert.strictEqual(doc.rows.length, 1);
        assert.strictEqual(doc.rows[0].value._id, 'testAdapter.test');

        // @ts-expect-error put it back on
        context.objects.useSets = true;
        await context.objects.loadLuaScripts();
    });

    it(`${testName}Should check object existence`, async () => {
        // object should not exist
        let exists = await context.objects.objectExists('test.0.objectExistenceCheck');
        assert.strictEqual(exists, false);

        // create object
        await context.objects.setObjectAsync('test.0.objectExistenceCheck', {
            type: 'meta',
            native: {},
        } as ioBroker.SettableMetaObject);

        // object should now exist
        exists = await context.objects.objectExists('test.0.objectExistenceCheck');
        assert.strictEqual(exists, true);
    });

    // todo chmod
    // tofo chown

    it(`${testName}should delete object`, done => {
        const objects = context.objects;
        objects.delObject(testId, err => {
            assert.ok(!err);
            done();
        });
    });

    it(`${testName}should delete object async`, done => {
        const objects = context.objects;
        objects
            .delObjectAsync(`${testId}async`)
            .then(() => {
                done();
            })
            .catch(err => {
                assert.ok(!err);
            });
    });

    it(`${testName}should not delete non existing object`, done => {
        const objects = context.objects;
        objects.delObject(`${testId}not`, err => {
            assert.ok(!err);
            done();
        });
    });

    it(`${testName}should not delete non existing object async`, done => {
        const objects = context.objects;
        objects
            .delObjectAsync(`${testId}async1`)
            .then(() => {
                done();
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Should not happen');
            });
    });

    it(`${testName}should close DB`, () => {
        const objects = context.objects;
        // we're running as a server, so nothing should happen
        return objects.destroy();
    });
}
