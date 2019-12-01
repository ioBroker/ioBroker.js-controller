/**
 *      Vendor processing
 *
 *      Copyright 2013-2019 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function Vendor(options) {
    const fs    = require('fs');
    const tools = require('../tools');
    options     = options || {};

    const objects = options.objects;

    function deepMerge(target, source) {
        Object.keys(source).forEach(attr => {
            if (typeof source[attr] === 'object' && !(source[attr] instanceof Array)) {
                if (target[attr] && typeof target[attr] !== 'object') {
                    target[attr] = {};
                }
                target[attr] = target[attr] || {};
                deepMerge(target[attr], source[attr]);
            } else {
                target[attr] = source[attr];
            }
        });
    }

    // read info from  '/etc/iob_vendor.json' and executes instructions stored there
    this.checkVendor = (file, password, logger) => {
        logger = logger || {
            debug: text => console.log(text),
            error: text => console.error(text),
            warn:  text => console.warn(text)
        };

        file = file || '/etc/iob-vendor.json';
        let data;
        if (fs.existsSync(file)) {
            try {
                data = JSON.parse(fs.readFileSync(file).toString('utf8'));
            } catch (e) {
                logger.error(`cannot read or parse "${file}": ${e.toString()}`);
                return Promise.reject(`cannot read or parse "${file}": ${e.toString()}`);
            }
        } else {
            logger.error(`"${file}" does not exist`);
            return Promise.reject(`"${file}" does not exist`);
        }

        const promises = [];
        if (data.uuid) {
            const uuid = data.uuid;
            data.uuid = null;

            // check UUID
            promises.push(objects.getObject('system.meta.uuid').then(obj => {
                if (obj && obj.native) {
                    if (obj.native.uuid !== uuid) {
                        obj.native.uuid = uuid;

                        logger.debug(`Update "system.meta.uuid:native.uuid" = "${obj.native.uuid}"`);

                        obj.nonEdit = obj.nonEdit || {};
                        obj.nonEdit.password = password;
                        return objects.setObjectAsync('system.meta.uuid', obj)
                            .then(() => logger.debug('object system.meta.uuid updated: ' + uuid))
                            .catch(e => logger.error(`Cannot update system.meta.uuid: ${e.toString()}`));
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
                    })
                        .then(() => logger.debug('object system.meta.uuid created: ' + uuid))
                        .catch(e => logger.error(`Cannot create system.meta.uuid: ${e.toString()}`));
                }
            }));
        }

        if (data.model) {
            const model = data.model;
            data.model = null;
            const hostname = tools.getHostName();
            promises.push(objects.getObject('system.host.' + hostname).then(obj => {
                if (obj && obj.common) {
                    if ((model.name  && model.name !== 'JS controller' && obj.common.title === 'JS controller') ||
                        (model.icon  && !obj.common.icon) ||
                        (model.color && !obj.common.color)) {
                        if (model.name) {
                            obj.common.title = model.name;
                        }
                        if (model.icon) {
                            obj.common.icon  = model.icon;
                        }
                        if (model.color) {
                            obj.common.color = model.color;
                        }

                        obj.nonEdit = obj.nonEdit || {};
                        obj.nonEdit.password = password;

                        logger.debug(`Update "system.host.${hostname}:common.title" = "${obj.common.title}"`);
                        logger.debug(`Update "system.host.${hostname}:common.icon"  = "${!!obj.common.icon}"`);
                        logger.debug(`Update "system.host.${hostname}:common.color" = "${obj.common.color}"`);

                        return objects.setObjectAsync(obj._id, obj)
                            .then(() => logger.debug(`object "system.host.${hostname}" updated`))
                            .catch(e => logger.error(`Cannot update "system.host.${hostname}": ${e.toString()}`));
                    }
                }
            }));
        }

        // patch iobroker.json file
        if (data.iobroker) {
            const settings = JSON.parse(fs.readFileSync(tools.getConfigFileName()).toString('utf8'));
            logger.debug('Update iobroker.json file');
            deepMerge(settings, data.iobroker);
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(settings, null, 2));
        }

        if (data.vendor) {
            const vendor = JSON.parse(JSON.stringify(data.vendor));
            data._vendor = JSON.parse(JSON.stringify(vendor));
            data.vendor  = null;

            // store vendor
            promises.push(objects.getObject('system.config').then(obj => {
                if (obj && obj.native) {
                    if (JSON.stringify(obj.native.vendor) !== JSON.stringify(vendor)) {
                        obj.native.vendor = vendor;
                        obj.nonEdit = obj.nonEdit || {};
                        obj.nonEdit.password = password;
                        return objects.setObjectAsync(obj._id, obj)
                            .then(() => logger.debug('object system.config updated'))
                            .catch(err => logger.error(`Cannot update system.config: ${err}`));
                    }
                }
            }));
        }

        return Promise.all(promises).then(() => {
            const _promises = [];
            // update all existing objects according to vendor
            if (data.objects) {
                for (let id in data.objects) {
                    if (!data.objects.hasOwnProperty(id)) continue;
                    if (id.indexOf('*') === -1) {
                        ((_id, _obj) => {
                            _promises.push(objects.getObject(_id).then(obj => {
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
                                        logger.debug(`Update "${obj._id}"`);
                                        return objects.setObjectAsync(obj._id, obj)
                                            .then(() => logger.debug(`object "${obj._id}" updated`))
                                            .catch(err => logger.error(`Cannot update "${obj._id}": ${err}`));
                                    }
                                } else {
                                    return objects.setObjectAsync(_id, _obj)
                                        .then(() => logger.debug(`object "${obj._id}" updated`))
                                        .catch(err => logger.error(`Cannot update "${obj._id}": ${err}`));
                                }
                            }));
                        })(id, data.objects[id]);
                    } else {
                        id = id.replace(/\*/g, '');
                        ((_id, _obj) => {
                            _promises.push(objects.getObjectListAsync({
                                startkey: _id,
                                endkey: _id + '\u9999'
                            }, {checked: true}).then(arr => {
                                const tasks = [];
                                if (arr && arr.rows && arr.rows.length) {
                                    for (let g = 0; g < arr.rows.length; g++) {
                                        const obj = arr.rows[g].value;
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
                                                logger.debug(`Update "${obj._id}"`);
                                                tasks.push(objects.setObjectAsync(obj._id, obj)
                                                    .then(() => logger.debug(`object "${obj._id}" updated`))
                                                    .catch(err => logger.error(`Cannot update "${obj._id}": ${err}`)));
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