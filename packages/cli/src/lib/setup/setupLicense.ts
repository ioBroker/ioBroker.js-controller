import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import { tools } from '@iobroker/js-controller-common';
import fs from 'fs-extra';
import jwt from 'jsonwebtoken';

export interface CLILicenseOptions {
    objects: ObjectsRedisClient;
}

export class License {
    private readonly objects: ObjectsRedisClient;

    constructor(options: CLILicenseOptions) {
        this.objects = options.objects;
    }

    /**
     * Read info from  '/etc/iob_vendor.json' and executes instructions stored there
     *
     * @param file path of license file
     */
    async setLicense(file: string): Promise<void> {
        if (fs.existsSync(file)) {
            file = fs.readFileSync(file, 'utf8');
        }
        // try to encode license
        const license = jwt.decode(file);
        if (!license) {
            throw new Error('License cannot be decoded');
        }
        if (!tools.isObject(license) || !license.name) {
            throw new Error('Name not found in the license');
        }
        const adapter = license.name.split('.')[1];
        if (!adapter) {
            throw new Error(`Invalid license name ${license.name}`);
        }

        // read all instances of this adapter
        const arr = await this.objects.getObjectListAsync(
            {
                startkey: `system.adapter.${adapter}.`,
                endkey: `system.adapter.${adapter}.\u9999`,
            },
            { checked: true },
        );

        let updated = 0;

        if (arr.rows.length) {
            for (let g = 0; g < arr.rows.length; g++) {
                const obj = arr.rows[g].value;
                if (obj && obj.type === 'instance') {
                    obj.native = obj.native || {};
                    obj.native.license = file;
                    updated++;
                    try {
                        await this.objects.setObjectAsync(obj._id, obj);
                        console.log(`Instance "${obj._id}" updated`);
                    } catch (err) {
                        console.error(`Cannot update "${obj._id}": ${err}`);
                    }
                }
            }
        }

        if (!updated) {
            console.warn(`no instances of ${adapter} found`);
            if (arr.rows.length) {
                for (let g = 0; g < arr.rows.length; g++) {
                    const obj = arr.rows[g].value;
                    if (obj && obj.type === 'adapter') {
                        obj.native = obj.native || {};
                        obj.native.license = file;
                        updated++;
                        try {
                            await this.objects.setObjectAsync(obj._id, obj);
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
    }
}
