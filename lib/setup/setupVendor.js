'use strict';
function Vendor(options) {
    const fs    = require('fs');
    const tools = require(__dirname + '/../tools.js');
    options     = options || {};

    let objects = options.objects;
    // read info from  '/etc/iob_vendor.json' and executes instructions stored there
    this.checkVendor = (file, password) => {
        file = file || '/etc/iob-vendor.json';
        let data;
        if (fs.existsSync(file)) {
            try {
                data = JSON.parse(fs.readFileSync(file).toString('utf8'));
            } catch (e) {
                return Promise.reject(`cannot read or parse "${file}": ${JSON.stringify(e)}`);
            }
        } else {
            return Promise.reject(`"${file}" does not exist`);
        }

        let promises = [];
        if (data.uuid) {
            const uuid = data.uuid;
            data.uuid = null;

            // check UUID
            promises.push(objects.getObjectAsync('system.meta.uuid').then(obj => {
                if (obj && obj.native) {
                    if (obj.native.uuid !== uuid) {
                        obj.native.uuid = uuid;

                        console.log(`Update "system.meta.uuid:native.uuid" = "${obj.native.uuid}"`);

                        obj.nonEdit = obj.nonEdit || {};
                        obj.nonEdit.password = password;
                        return objects.setObjectAsync('system.meta.uuid', obj).then(() => {
                            console.log('object system.meta.uuid updated: ' + uuid);
                        }).catch(err => {
                            console.error(`Cannot update system.meta.uuid: ${err}`);
                        });
                    }
                } else {
                    return objects.setObjectAsync('system.meta.uuid', {
                        type: 'meta',
                        common: {
                            name: 'uuid',
                            type: 'uuid'
                        },
                        ts: new Date().getTime(),
                        from: 'system.host.' + tools.getHostName() + '.tools',
                        native: {
                            uuid: uuid
                        }
                    }).then(() => {
                        console.log('object system.meta.uuid created: ' + uuid);
                    }).catch(err => {
                        console.error(`Cannot create system.meta.uuid: ${err}`);
                    });
                }
            }));
        }

        if (data.model) {
            const model = data.model;
            data.model = null;
            const hostname = tools.getHostName();
            promises.push(objects.getObjectAsync('system.host.' + hostname).then(obj => {
                if (obj && obj.common) {
                    if ((model.name  && model.name !== 'JS controller' && obj.common.title === 'JS controller') ||
                        (model.icon  && !obj.common.icon) ||
                        (model.color && !obj.common.color)) {
                        obj.common.title = model.name;
                        obj.common.icon  = model.icon;
                        obj.common.color = model.color;

                        obj.nonEdit = obj.nonEdit || {};
                        obj.nonEdit.password = password;

                        console.log(`Update "system.host.${hostname}:common.title" = "${obj.common.title}"`);
                        console.log(`Update "system.host.${hostname}:common.icon"  = "${!!obj.common.icon}"`);
                        console.log(`Update "system.host.${hostname}:common.color" = "${obj.common.color}"`);

                        return objects.setObjectAsync(obj._id, obj).then(() => {
                            console.log(`object "system.host.${hostname}" updated`);
                        }).catch(err => {
                            console.error(`Cannot update "system.host.${hostname}": ${err}`);
                        });
                    }
                }
            }));
        }

        if (data.vendor) {
            const vendor = JSON.parse(JSON.stringify(data.vendor));
            data._vendor = JSON.parse(JSON.stringify(vendor));
            data.vendor  = null;

            // store vendor
            promises.push(objects.getObjectAsync('system.config').then(obj => {
                if (obj && obj.native) {
                    if (JSON.stringify(obj.native.vendor) !== JSON.stringify(vendor)) {
                        obj.native.vendor = vendor;
                        obj.nonEdit = obj.nonEdit || {};
                        obj.nonEdit.password = password;
                        return objects.setObjectAsync(obj._id, obj).then(() => {
                            console.log('object system.config updated');
                        }).catch(err => {
                            console.error(`Cannot update system.config: ${err}`);
                        });
                    }
                }
            }));
        }

        return Promise.all(promises).then(() => {
            let _promises = [];
            // update all existing objects according to vendor
            if (data.objects) {
                for (let id in data.objects) {
                    if (!data.objects.hasOwnProperty(id)) continue;
                    if (id.indexOf('*') === -1) {
                        ((_id, _obj) => {
                            _promises.push(objects.getObjectAsync(_id).then(obj => {
                                if (obj) {
                                    obj.nonEdit = obj.nonEdit || {};
                                    const originalObj = JSON.stringify(obj);
                                    _obj.nonEdit = _obj.nonEdit || {};
                                    _obj.nonEdit.passHash = obj.nonEdit.passHash;
                                    // merge objects
                                    tools.copyAttributes(_obj, obj);

                                    if (originalObj !== JSON.stringify(obj)) {
                                        delete obj.nonEdit.passHash;
                                        obj.nonEdit.password = password;
                                        console.log(`Update "${obj._id}"`);
                                        return objects.setObjectAsync(obj._id, obj).then(() => {
                                            console.log(`object "${obj._id}" updated`);
                                        }).catch(err => {
                                            console.error(`Cannot update "${obj._id}": ${err}`);
                                        });
                                    }
                                } else {
                                    return objects.setObjectAsync(_id, _obj).then(() => {
                                        console.log(`object "${obj._id}" updated`);
                                    }).catch(err => {
                                        console.error(`Cannot update "${obj._id}": ${err}`);
                                    });
                                }
                            }));
                        })(id, data.objects[id]);
                    } else {
                        id = id.replace('*', '');
                        ((_id, _obj) => {
                            _promises.push(objects.getObjectListAsync({
                                startkey: _id,
                                endkey: _id + '\u9999'
                            }, {checked: true}).then(arr => {
                                let tasks = [];
                                if (arr && arr.rows && arr.rows.length) {
                                    for (let g = 0; g < arr.rows.length; g++) {
                                        let obj = arr.rows[g].value;
                                        if (obj) {
                                            obj.nonEdit = obj.nonEdit || {};
                                            const originalObj = JSON.stringify(obj);
                                            _obj.nonEdit = _obj.nonEdit || {};
                                            _obj.nonEdit.passHash = obj.nonEdit.passHash;
                                            // merge objects
                                            tools.copyAttributes(_obj, obj);
                                            if (originalObj !== JSON.stringify(obj)) {
                                                delete obj.nonEdit.passHash;
                                                obj.nonEdit.password = password;
                                                console.log(`Update "${obj._id}"`);
                                                tasks.push(objects.setObjectAsync(obj._id, obj).then(() => {
                                                    console.log(`object "${obj._id}" updated`);
                                                }).catch(err => {
                                                    console.error(`Cannot update "${obj._id}": ${err}`);
                                                }));
                                            }
                                        }
                                    }
                                }
                                return Promise.all(tasks);
                            }));
                        })(id, data.objects[id]);
                    }
                }
            }

            return Promise.all(_promises);
        });
    };

    return this;
}

module.exports = Vendor;