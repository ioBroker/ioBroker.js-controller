'use strict';
function License(options) {
    const fs    = require('fs');
    const jwt   = require('jsonwebtoken');
    options     = options || {};

    let objects = options.objects;
    // read info from  '/etc/iob_vendor.json' and executes instructions stored there
    this.setLicense = file => {
        if (fs.existsSync(file)) {
            try {
                file = fs.readFileSync(file).toString('utf8');
            } catch (e) {
                return Promise.reject(e);
            }
        }
        // try to encode license
        let license = jwt.decode(file);
        if (!license) {
            return Promise.reject('License cannot be decoded');
        }
        if (!license.name) {
            return Promise.reject('Name not found in the license');
        }
        let adapter = license.name.split('.')[1];
        if (!adapter) {
            return Promise.reject(`Invalid license name ${license.name}`);
        }
        // read all instances of this adapter
        return objects.getObjectListAsync({
            startkey: 'system.adapter.' + adapter + '.',
            endkey:   'system.adapter.' + adapter + '.\u9999'
        }, {checked: true}).then(arr => {
            let promises = [];
            if (arr && arr.rows && arr.rows.length) {
                for (let g = 0; g < arr.rows.length; g++) {
                    let obj = arr.rows[g].value;
                    if (obj && obj.type === 'instance') {
                        obj.native = obj.native || {};
                        obj.native.license = file;
                        promises.push(objects.setObjectAsync(obj._id, obj).then(() => {
                            console.log(`Instance "${obj._id}" updated`);
                        }).catch(err => {
                            console.error(`Cannot update "${obj._id}": ${err}`);
                        }));
                    }
                }
            }
            if (!promises.length) {
                console.warn(`no instances of ${adapter} found`);
                if (arr && arr.rows && arr.rows.length) {
                    for (let g = 0; g < arr.rows.length; g++) {
                        let obj = arr.rows[g].value;
                        if (obj && obj.type === 'adapter') {
                            obj.native = obj.native || {};
                            obj.native.license = file;
                            promises.push(objects.setObjectAsync(obj._id, obj).then(() => {
                                console.log(`Adapter "${obj._id}" updated`);
                            }).catch(err => {
                                console.error(`Cannot update "${obj._id}": ${err}`);
                            }));
                        }
                    }
                }
            }
            if (!promises.length) {
                console.error(`no installations of ${adapter} found`);
            }
            return Promise.all(promises);
        });
    };

    return this;
}

module.exports = License;