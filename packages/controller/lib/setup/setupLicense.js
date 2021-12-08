/**
 *      Check license
 *
 *      Copyright 2013-2021 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function License(options) {
    const fs    = require('fs');
    const jwt   = require('jsonwebtoken');
    options     = options || {};

    const objects = options.objects;
    // read info from  '/etc/iob_vendor.json' and executes instructions stored there
    this.setLicense = async file => {
        if (fs.existsSync(file)) {
            file = fs.readFileSync(file, 'utf8');
        }
        // try to encode license
        const license = jwt.decode(file);
        if (!license) {
            throw new Error('License cannot be decoded');
        }
        if (!license.name) {
            throw new Error('Name not found in the license');
        }
        const adapter = license.name.split('.')[1];
        if (!adapter) {
            throw new Error(`Invalid license name ${license.name}`);
        }

        // read all instances of this adapter
        const arr = await objects.getObjectListAsync({
            startkey: 'system.adapter.' + adapter + '.',
            endkey:   'system.adapter.' + adapter + '.\u9999'
        }, {checked: true});

        let updated = 0;

        if (arr && arr.rows && arr.rows.length) {
            for (let g = 0; g < arr.rows.length; g++) {
                const obj = arr.rows[g].value;
                if (obj && obj.type === 'instance') {
                    obj.native = obj.native || {};
                    obj.native.license = file;
                    updated++;
                    try {
                        await objects.setObjectAsync(obj._id, obj);
                        console.log(`Instance "${obj._id}" updated`);
                    } catch (err) {
                        console.error(`Cannot update "${obj._id}": ${err}`);
                    }
                }
            }
        }

        if (!updated) {
            console.warn(`no instances of ${adapter} found`);
            if (arr && arr.rows && arr.rows.length) {
                for (let g = 0; g < arr.rows.length; g++) {
                    const obj = arr.rows[g].value;
                    if (obj && obj.type === 'adapter') {
                        obj.native = obj.native || {};
                        obj.native.license = file;
                        updated++;
                        try {
                            await objects.setObjectAsync(obj._id, obj);
                            console.log(`Adapter "${obj._id}" updated`);
                        } catch (err) {
                            console.error(`Cannot update "${obj._id}": ${err}`);
                        }
                    }
                }
            }
        }

        if (!updated) {
            console.error(`no installations of ${adapter} found`);
        }
    };

    return this;
}

module.exports = License;
