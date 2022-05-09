/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jshint expr: true */
'use strict';

function register(it, expect, context) {
    const testName = context.name + ' objects: ';

    const namespace = 'testObject.0';
    const testId = namespace + '.test2';

    it(testName + 'should create and read object', done => {
        const objects = context.objects;
        objects.setObject(
            testId,
            {
                common: {
                    name: 'test2'
                },
                native: {}
            },
            (err, res) => {
                expect(err).to.be.not.ok;
                expect(res).to.be.ok;
                expect(res.id).to.be.equal(testId);

                objects.getObject(testId, (err, obj) => {
                    expect(err).to.be.not.ok;
                    expect(obj).to.be.ok;
                    expect(obj.common.name).to.be.equal('test2');
                    expect(obj._id).to.be.equal(testId);
                    console.log(JSON.stringify(obj));
                    done();
                });
            }
        );
    });

    it(testName + 'should create object async', done => {
        const objects = context.objects;
        objects
            .setObjectAsync(testId + 'async', {
                common: {
                    name: 'test1a'
                },
                native: {}
            })
            .then(res => {
                expect(res).to.be.ok;
                expect(res.id).to.be.equal(testId + 'async');
                done();
            })
            .catch(err => {
                expect(err).to.be.not.ok;
            });
    });

    it(testName + 'should read object async', done => {
        const objects = context.objects;
        objects
            .getObjectAsync(testId + 'async')
            .then(obj => {
                expect(obj).to.be.ok;
                expect(obj.common.name).to.be.equal('test1a');
                expect(obj._id).to.be.equal(testId + 'async');
                console.log(JSON.stringify(obj));
                done();
            })
            .catch(err => {
                expect(err).to.be.not.ok;
            });
    }).timeout(3000);

    it(testName + 'should find object', done => {
        const objects = context.objects;
        objects.findObject(testId, (err, id, idOrName) => {
            expect(err).to.be.not.ok;
            expect(idOrName).to.be.equal('test2');
            expect(id).to.be.equal(testId);

            objects.findObject('test2', (err, id, idOrName) => {
                expect(err).to.be.not.ok;
                expect(id).to.be.equal(testId);
                expect(idOrName).to.be.equal('test2');

                objects.findObject('test3', (err, id, idOrName) => {
                    expect(err).to.be.not.ok;
                    expect(idOrName).to.be.equal('test3');
                    expect(id).to.be.equal(undefined);

                    objects.findObject('test2', 'channel', (err, id, idOrName) => {
                        expect(err).to.be.not.ok;
                        expect(idOrName).to.be.equal('test2');
                        expect(id).to.be.equal(undefined);
                        done();
                    });
                });
            });
        });
    });

    it(testName + 'should find object async', done => {
        const objects = context.objects;
        objects
            .findObject(testId)
            .then(id => {
                expect(id).to.be.equal(testId);
                return objects.findObject('test2');
            })
            .then(id => {
                expect(id).to.be.equal(testId);

                return objects.findObject('test3');
            })
            .then(id => {
                expect(id).to.be.equal(undefined);
                return objects.findObject('test3', 'channel');
            })
            .then(id => {
                expect(id).to.be.equal(undefined);
                done();
            })
            .catch(err => {
                console.error(err);
                expect(1).to.be.equal('Never happens');
            });
    });

    it(testName + 'should read objects by pattern', done => {
        const objects = context.objects;
        objects.getObjectsByPattern(testId + '*', (err, objs) => {
            expect(err).to.be.not.ok;
            expect(objs.length).to.be.equal(2);

            objects.getObjectsByPattern(testId, (err, objs) => {
                expect(err).to.be.not.ok;
                expect(objs.length).to.be.equal(1);
                expect(typeof objs[0]).to.be.equal('object');
                expect(objs[0]._id).to.be.equal(testId);

                objects.getObjectsByPattern(testId + 'non', (err, objs) => {
                    expect(err).to.be.not.ok;
                    expect(objs.length).to.be.equal(0);

                    done();
                });
            });
        });
    });

    it(testName + 'should read objects by pattern async', done => {
        const objects = context.objects;
        objects
            .getObjectsByPattern(testId + '*')
            .then(objs => {
                expect(objs.length).to.be.equal(2);

                return objects.getObjectsByPattern(testId);
            })
            .then(objs => {
                expect(objs.length).to.be.equal(1);
                expect(typeof objs[0]).to.be.equal('object');
                expect(objs[0]._id).to.be.equal(testId);

                return objects.getObjectsByPattern(testId + 'non');
            })
            .then(objs => {
                expect(objs.length).to.be.equal(0);

                done();
            })
            .catch(_err => {
                expect(1).to.be.equal('Never happens');
            });
    });

    it(testName + 'should read keys', done => {
        const objects = context.objects;
        objects.getKeys(testId + '*', (err, keys) => {
            expect(err).to.be.not.ok;
            expect(keys.length).to.be.equal(2);

            objects.getKeys(testId, (err, keys) => {
                expect(err).to.be.not.ok;
                expect(keys.length).to.be.equal(1);
                expect(keys[0]).to.be.equal(testId);

                objects.getKeys(testId + 'non', (err, keys) => {
                    expect(err).to.be.not.ok;
                    expect(keys.length).to.be.equal(0);

                    done();
                });
            });
        });
    });

    it(testName + 'should read keys async', done => {
        const objects = context.objects;
        objects
            .getKeys(testId + '*')
            .then(keys => {
                expect(keys.length).to.be.equal(2);

                return objects.getKeys(testId);
            })
            .then(keys => {
                expect(keys.length).to.be.equal(1);
                expect(keys[0]).to.be.equal(testId);

                return objects.getKeys(testId + 'non');
            })
            .then(keys => {
                expect(keys.length).to.be.equal(0);

                done();
            })
            .catch(_err => {
                expect(1).to.be.equal('Never happens');
            });
    });

    it(testName + 'should read objects', done => {
        const objects = context.objects;
        objects.getKeys(testId + '*', (err, keys) => {
            expect(err).to.be.not.ok;
            objects.getObjects(keys, (err, objs) => {
                expect(err).to.be.not.ok;
                expect(objs.length).to.be.equal(2);
                expect(objs[0]._id).to.be.equal(keys[0]);
                expect(objs[1]._id).to.be.equal(keys[1]);
                done();
            });
        });
    });

    it(testName + 'should read objects async', done => {
        const objects = context.objects;
        let gKeys;
        objects
            .getKeys(testId + '*')
            .then(keys => {
                gKeys = keys;
                return objects.getObjects(keys);
            })
            .then(objs => {
                expect(objs.length).to.be.equal(2);
                expect(objs[0]._id).to.be.equal(gKeys[0]);
                expect(objs[1]._id).to.be.equal(gKeys[1]);
                done();
            })
            .catch(_err => {
                expect(1).to.be.equal('Never happens');
            });
    });

    it(testName + 'should extend object', done => {
        const objects = context.objects;
        objects.extendObject(testId, { common: { def: 'default' } }, (err, res, id) => {
            expect(err).to.be.not.ok;
            expect(id).to.be.equal(testId);
            expect(res.id).to.be.equal(testId);
            expect(res.value.common.def).to.be.equal('default');

            objects.getObject(testId, (err, obj) => {
                expect(err).to.be.not.ok;
                expect(obj._id).to.be.equal(testId);
                expect(obj.common.def).to.be.equal('default');
                expect(obj.common.name).to.be.equal('test2');

                objects.extendObject(namespace + '.other', { common: { def: 'default' } }, (err, res, id) => {
                    expect(err).to.be.not.ok;
                    expect(id).to.be.equal(namespace + '.other');
                    expect(res.id).to.be.equal(namespace + '.other');
                    expect(res.value.common.def).to.be.equal('default');

                    done();
                });
            });
        });
    });

    it(testName + 'should extend object async', done => {
        const objects = context.objects;
        objects
            .extendObject(testId, { common: { def: 'default' } })
            .then(res => {
                expect(res.id).to.be.equal(testId);
                expect(res.value.common.def).to.be.equal('default');
                return objects.extendObject(namespace + '.otherAsync', { common: { def: 'default' } });
            })
            .then(res => {
                expect(res.id).to.be.equal(namespace + '.otherAsync');
                expect(res.value.common.def).to.be.equal('default');
                done();
            })
            .catch(_err => {
                expect(1).to.be.equal('Never happens');
            });
    });

    it(testName + 'should getObjectList', done => {
        const objects = context.objects;
        objects.getObjectList({ startkey: namespace, endkey: testId }, (err, res) => {
            console.log(res.rows.map(e => e.id));
            expect(err).to.be.not.ok;
            expect(res.rows.length).to.be.equal(3);
            const obj = res.rows.find(val => val.value._id === testId);
            expect(obj.id).to.be.equal(testId);
            expect(obj.value._id).to.be.equal(testId);

            objects.getObjectList({ startkey: '', endkey: ' ' }, (err, res) => {
                expect(err).to.be.not.ok;
                expect(res.rows.length).to.be.equal(0);
                done();
            });
        });
    });

    it(testName + 'should getObjectList async', done => {
        const objects = context.objects;
        objects
            .getObjectList({ startkey: namespace, endkey: testId })
            .then(res => {
                expect(res.rows.length).to.be.equal(3);
                const obj = res.rows.find(val => val.value._id === testId);
                expect(obj.id).to.be.equal(testId);
                expect(obj.value._id).to.be.equal(testId);
                return objects.getObjectList({ startkey: '', endkey: ' ' });
            })
            .then(res => {
                console.log(JSON.stringify(res));
                expect(res.rows.length).to.be.equal(0);
                done();
            })
            .catch(err => {
                console.error(err);
                expect(1).to.be.equal('Never happens');
            });
    });

    it(testName + 'should getObjectView without sets', async () => {
        // turn off useSets and reinitialize scripts, thus we will have old scripts and do not use SADD on setting objects
        context.objects.useSets = false;
        await context.objects.loadLuaScripts();

        await context.objects.setObjectAsync('_design/testAdapter', {
            language: 'javascript',
            views: {
                test: {
                    map: 'function(doc) {\n  if (doc._id.match(/^testAdapter/) && doc.meta.type === "test") {\n   emit(doc._id, doc);\n  }\n}'
                }
            },
            common: {}
        });

        // now lets create an object matching the view
        await context.objects.setObjectAsync('testAdapter.test', {
            type: 'meta',
            meta: {
                adapter: 'testAdapter',
                type: 'test'
            },
            common: {},
            native: {}
        });

        const doc = await context.objects.getObjectViewAsync('testAdapter', 'test', {
            startkey: 'testAdapter',
            endkey: 'testAdapter\u9999'
        });

        // now check that our object view contains our object
        expect(doc.rows).to.be.an('array');
        expect(doc.rows.length).to.be.equal(1);
        expect(doc.rows[0].value._id).to.be.equal('testAdapter.test');

        // put it back on
        context.objects.useSets = true;
        await context.objects.loadLuaScripts();
    });

    it(testName + 'should create and read file', done => {
        const objects = context.objects;
        objects.setObject(testId, { type: 'meta' }, err => {
            expect(err).to.be.not.ok;
            objects.writeFile(testId, 'myFile/abc.txt', 'dataInFile', err => {
                err && console.error(`Got ${JSON.stringify(objects.getStatus())}: ${err.stack}`);
                expect(err).to.be.not.ok;

                objects.readFile(testId, 'myFile/abc.txt', (err, data, mimeType) => {
                    expect(err).to.be.not.ok;
                    expect(data).to.be.equal('dataInFile');
                    expect(mimeType).to.be.equal('text/javascript');
                    objects.rm(testId, 'myFile/*', (err, files) => {
                        expect(err).to.be.not.ok;
                        const file = files.find(f => f.file === 'abc.txt');
                        expect(file.file).to.be.equal('abc.txt');
                        expect(file.path).to.be.equal('myFile');
                        objects.readFile(testId, 'myFile/abc.txt', (err, _data, _mimeType) => {
                            expect(err.message).to.be.equal('Not exists');
                            done();
                        });
                    });
                });
            });
        });
    });

    it(testName + 'should read directory', done => {
        const objects = context.objects;
        objects.writeFile(testId, 'myFile/abc1.txt', 'dataInFile', err => {
            expect(err).to.be.not.ok;
            objects.writeFile(testId, 'myFile/abc2.txt', Buffer.from('ABC'), err => {
                expect(err).to.be.not.ok;
                objects.readDir(testId, 'myFile/', (err, data) => {
                    expect(err).to.be.not.ok;
                    expect(data.length).to.be.equal(2);
                    expect(data[0].file).to.be.equal('abc1.txt');
                    expect(data[1].file).to.be.equal('abc2.txt');
                    expect(data[1].stats.size).to.be.equal(3);
                    done();
                });
            });
        });
    });

    it(testName + 'should read file and prevent path traversing', done => {
        const objects = context.objects;
        objects.readFile(testId, '../../myFile/abc1.txt', (err, data, _mimeType) => {
            expect(err).to.be.not.ok;
            expect(data).to.be.equal('dataInFile');
            objects.readFile(testId, '/myFile/abc1.txt', (err, data, _mimeType) => {
                expect(err).to.be.not.ok;
                expect(data).to.be.equal('dataInFile');
                objects.readFile(testId, '/../../myFile/abc1.txt', (err, data, _mimeType) => {
                    expect(err).to.be.not.ok;
                    expect(data).to.be.equal('dataInFile');
                    objects.readFile(testId, 'myFile/../blubb/../myFile/abc1.txt', (err, data, _mimeType) => {
                        expect(err).to.be.not.ok;
                        expect(data).to.be.equal('dataInFile');
                        objects.readFile(testId, '/myFile/../blubb/../myFile/abc1.txt', (err, data, _mimeType) => {
                            expect(err).to.be.not.ok;
                            expect(data).to.be.equal('dataInFile');
                            objects.readFile(testId, '../blubb/../myFile/abc1.txt', (err, data, _mimeType) => {
                                expect(err).to.be.not.ok;
                                expect(data).to.be.equal('dataInFile');
                                objects.readFile(testId, '/../blubb/../myFile/abc1.txt', (err, data, _mimeType) => {
                                    expect(err).to.be.not.ok;
                                    expect(data).to.be.equal('dataInFile');
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it(testName + 'should unlink file', done => {
        const objects = context.objects;
        objects.unlink(testId, 'myFile/abc1.txt', err => {
            expect(err).to.be.not.ok;
            objects.unlink(testId, 'myFile/abc1.txt', err => {
                expect(err.message).to.be.equal('Not exists');
                done();
            });
        });
    });

    it(testName + 'should rename file', done => {
        const objects = context.objects;
        objects.writeFile(testId, 'myFile1/abcRename.txt', Buffer.from('abcd'), err => {
            expect(err).to.be.not.ok;
            objects.rename(testId, 'myFile1/abcRename.txt', 'myFile/abc3.txt', err => {
                expect(err).to.be.not.ok;
                objects.readFile(testId, 'myFile/abc3.txt', (err, data, _meta) => {
                    expect(err).to.be.not.ok;
                    expect(data.toString('utf8')).to.be.equal('abcd');
                    objects.readFile(testId, 'myFile1/abcRename.txt', err => {
                        expect(err.message).to.be.equal('Not exists');
                        done();
                    });
                });
            });
        });
    });

    it(testName + 'should touch file', done => {
        const objects = context.objects;
        objects.readDir(testId, 'myFile', (err, files) => {
            expect(err).to.be.not.ok;
            const file = files.find(f => f.file === 'abc3.txt');

            setTimeout(() => {
                objects.touch(testId, 'myFile/abc3.txt', err => {
                    expect(err).to.be.not.ok;
                    objects.readDir(testId, 'myFile', (_err, files) => {
                        const file1 = files.find(f => f.file === 'abc3.txt');
                        expect(file1.modifiedAt).to.be.not.equal(file.modifiedAt);
                        done();
                    });
                });
            }, 200);
        });
    });

    it(testName + 'should create directory', done => {
        const objects = context.objects;
        objects.mkdir(testId, 'myFile' + Math.round(Math.random() * 100000), err => {
            expect(err).to.be.not.ok;
            done();
        });
    });

    // todo chmod
    // tofo chown

    it(testName + 'should enable file cache', done => {
        const objects = context.objects;
        objects.enableFileCache(true, err => {
            expect(err).to.be.not.ok;
            done();
        });
    });

    it(testName + 'should delete object', done => {
        const objects = context.objects;
        objects.delObject(testId, err => {
            expect(err).to.be.not.ok;
            done();
        });
    });

    it(testName + 'should delete object async', done => {
        const objects = context.objects;
        objects
            .delObjectAsync(testId + 'async')
            .then(() => {
                done();
            })
            .catch(err => {
                expect(err).to.be.not.ok;
            });
    });

    it(testName + 'should not delete non existing object', done => {
        const objects = context.objects;
        objects.delObject(testId + 'not', err => {
            expect(err).to.be.not.ok;
            done();
        });
    });

    it(testName + 'should not delete non existing object async', done => {
        const objects = context.objects;
        objects
            .delObjectAsync(testId + 'async1')
            .then(() => {
                done();
            })
            .catch(err => {
                expect(err.message).to.be.equal('Should not happen');
            });
    });

    it(testName + 'should close DB', () => {
        const objects = context.objects;
        // we're running as a server, so nothing should happen
        return objects.destroy();
    });
}

module.exports.register = register;
