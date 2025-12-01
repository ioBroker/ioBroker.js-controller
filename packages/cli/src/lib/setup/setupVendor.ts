import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import { tools } from '@iobroker/js-controller-common';
import fs from 'fs-extra';
import deepClone from 'deep-clone';
import { isDeepStrictEqual } from 'node:util';
import type { InternalLogger } from '@iobroker/js-controller-common-db/tools';

export interface CLIVendorOptions {
    objects: ObjectsRedisClient;
}

interface iobVendorFile {
    vendor?: {
        id?: string;
        name?: string;
        /** Logo for login in admin */
        icon?: string;
        /** Logo in the top left corner of admin */
        logo?: string;
        admin?: {
            menu?: {
                // Settings for left menu
                editable?: false; // Hide edit button in menu
                'tab-hosts'?: false; // Hide hosts item (See all https://github.com/ioBroker/ioBroker.admin/blob/master/src-rx/src/components/Drawer.js#L142)
                'tab-files'?: false; // Hide files item
                'tab-users'?: false; // Hide users item
                'tab-intro'?: false; // Hide intro item
                'tab-info'?: false; // Hide info item
                'tab-adapters'?: false; // Hide adapters item
                'tab-instances'?: false; // Hide instances item
                'tab-objects'?: false; // Hide objects item
                'tab-enums'?: false; // Hide enums item
                'tab-devices'?: false; // Hide devices item
                'tab-logs'?: false; // Hide logs item
                'tab-scenes'?: false; // Hide scenes item
                'tab-events'?: false; // Hide events item
                'tab-javascript'?: false; // Hide javascript item
                'tab-text2command-0'?: false; // Hide text2command-0 item
                'tab-echarts'?: false; // Hide echarts item
                [tabName: string]: false | undefined;
            };
            appBar?: {
                discovery?: false;
                systemSettings?: false;
                toggleTheme?: false;
                expertMode?: false;
                hostSelector?: false;
            };
            settings?: {
                tabConfig?: false; // Main config tab
                tabRepositories?: false; // Repositories tab
                tabCertificates?: false; // Certificates tab
                tabLetsEncrypt?: false; // Let's Encrypt tab
                tabDefaultACL?: false; // Default ACL tab
                tabStatistics?: false; // Statistics tab

                language?: false;
                tempUnit?: false;
                currency?: false;
                dateFormat?: false;
                isFloatComma?: false;
                defaultHistory?: false;
                activeRepo?: false;
                expertMode?: false;
                defaultLogLevel?: false;
            };
            adapters?: {
                gitHubInstall?: false; // hide button install from GitHub/npm
                statistics?: false; // hide statistics on the right top
                filterUpdates?: false; // hide button filter updates in adapter tab
                allowAdapterRating?: false; // do not show and do not load adapter ratings
            };
            login?: {
                title?: string;
                motto?: string;
                link?: string;
            };
        };
        /** Favicon for admin */
        ico?: string;
        uuidPrefix?: string;
    };
    model?: {
        /** name for host */
        name?: string;
        /** Icon for host */
        icon?: string;
        /** Color for host */
        color?: string;
    };
    uuid?: string;
    iobroker?: Partial<ioBroker.IoBrokerJson>;
    objects?: {
        [id: string]: ioBroker.Object;
    };
}

const VENDOR_FILE = '/etc/iob-vendor.json';

export class Vendor {
    private readonly objects: ObjectsRedisClient;

    constructor(options: CLIVendorOptions) {
        this.objects = options.objects;
    }

    /**
     * Deep merge of source into target object
     *
     * @param target target obj
     * @param source source obj
     */
    private deepMerge(target: Record<string, any>, source: Record<string, any>): void {
        Object.keys(source).forEach(attr => {
            if (typeof source[attr] === 'object' && !(source[attr] instanceof Array)) {
                if (target[attr] && typeof target[attr] !== 'object') {
                    target[attr] = {};
                }
                target[attr] = target[attr] || {};
                this.deepMerge(target[attr], source[attr]);
            } else {
                target[attr] = source[attr];
            }
        });
    }

    /**
     * Read info from  '/etc/iob_vendor.json' and executes instructions stored there
     *
     * @param file file path if not given, default path is used
     * @param password vendor password
     * @param javascriptPassword vendor JavaScript password
     * @param logger
     */
    async checkVendor(
        file: string | undefined,
        password: string,
        javascriptPassword: string | undefined,
        logger?: InternalLogger,
    ): Promise<void> {
        logger ||= {
            debug: (text: string) => console.log(text),
            info: (text: string) => console.log(text),
            error: (text: string) => console.error(text),
            warn: (text: string) => console.warn(text),
            silly: (text: string) => console.log(text),
        };

        file ||= VENDOR_FILE;
        let data: iobVendorFile | null = null;
        if (fs.existsSync(file)) {
            try {
                data = fs.readJSONSync(file);
            } catch (err) {
                logger.error(`cannot read or parse "${file}": ${err.message}`);
                throw new Error(`cannot read or parse "${file}": ${err.message}`);
            }
        } else {
            logger.error(`"${file}" does not exist`);
            throw new Error(`"${file}" does not exist`);
        }

        if (data?.uuid) {
            const uuid = data.uuid;

            // check UUID
            const obj = await this.objects.getObject('system.meta.uuid');
            if (obj?.native) {
                if (obj.native.uuid !== uuid) {
                    obj.native.uuid = uuid;

                    logger.info(`Update "system.meta.uuid:native.uuid" = "${obj.native.uuid}"`);

                    obj.nonEdit ||= {};
                    obj.nonEdit.password = password;
                    try {
                        await this.objects.setObjectAsync('system.meta.uuid', obj);
                        logger.info(`object system.meta.uuid updated: ${uuid}`);
                    } catch (e) {
                        logger.error(`Cannot update system.meta.uuid: ${e.message}`);
                    }
                }
            } else {
                try {
                    // @ts-expect-error type uuid is not allowed TODO: allow it for meta?
                    await this.objects.setObjectAsync('system.meta.uuid', {
                        type: 'meta',
                        common: {
                            name: 'uuid',
                            type: 'uuid',
                        },
                        ts: new Date().getTime(),
                        from: `system.host.${tools.getHostName()}.tools`,
                        native: {
                            uuid,
                        },
                    });
                    logger.info(`object system.meta.uuid created: ${uuid}`);
                } catch (e) {
                    logger.error(`Cannot create system.meta.uuid: ${e.message}`);
                }
            }
        }

        // patch iobroker.json file
        if (data?.iobroker) {
            const settings = fs.readJSONSync(tools.getConfigFileName());
            logger.info('Update iobroker.json file');
            this.deepMerge(settings, data.iobroker);
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(settings, null, 2));
        }

        if (data?.vendor) {
            const vendor = deepClone(data.vendor);

            // store vendor
            try {
                const obj = await this.objects.getObject('system.config');
                if (obj?.native) {
                    let javascriptPasswordEncrypted: string | undefined;
                    if (javascriptPassword) {
                        javascriptPasswordEncrypted = tools.encrypt(obj.native.secret, javascriptPassword);
                    }

                    if (
                        !isDeepStrictEqual(obj.native.vendor, vendor) ||
                        obj.native.javascriptPassword !== javascriptPasswordEncrypted
                    ) {
                        obj.native.vendor = vendor;
                        obj.nonEdit ||= {};
                        if (javascriptPassword) {
                            obj.native.javascriptPassword = javascriptPasswordEncrypted;
                            obj.nonEdit.native ||= {};
                            obj.nonEdit.native.javascriptPassword = javascriptPasswordEncrypted;
                        }
                        obj.nonEdit.password = password;
                        await this.objects.setObjectAsync(obj._id, obj);
                        logger.info('object system.config updated');
                    }
                }
            } catch (e) {
                logger.error(`Cannot update system.config: ${e.message}`);
            }
        } else if (javascriptPassword) {
            const obj = await this.objects.getObject('system.config');

            if (obj?.native) {
                const javascriptPasswordEncrypted = tools.encrypt(obj.native.secret, javascriptPassword);
                if (obj.native.javascriptPassword !== javascriptPasswordEncrypted) {
                    obj.native.javascriptPassword = javascriptPasswordEncrypted;
                    obj.nonEdit ||= {};
                    obj.nonEdit.password = password;
                    obj.nonEdit.native ||= {};
                    obj.nonEdit.native.javascriptPassword = javascriptPasswordEncrypted;
                    try {
                        await this.objects.setObjectAsync(obj._id, obj);
                        logger.info('object system.config updated');
                    } catch (e) {
                        logger.error(`Cannot update system.config: ${e.message}`);
                    }
                }
            }
        }

        // update all existing objects according to vendor
        if (data?.objects) {
            for (let id of Object.keys(data.objects)) {
                if (!id.includes('*')) {
                    const _newObj = data.objects[id];
                    const obj = await this.objects.getObject(id);
                    if (obj) {
                        obj.nonEdit ||= {} as ioBroker.NonEditable;
                        const originalObj = deepClone(obj);
                        _newObj.nonEdit ||= {} as ioBroker.NonEditable;
                        _newObj.nonEdit.passHash = obj.nonEdit.passHash;
                        // merge objects
                        tools.copyAttributes(_newObj, obj);

                        if (!isDeepStrictEqual(originalObj, obj)) {
                            delete obj.nonEdit.passHash;
                            obj.nonEdit.password = password;
                            logger.info(`Update "${obj._id}"`);
                            try {
                                await this.objects.setObjectAsync(obj._id, obj);
                                logger.info(`object "${obj._id}" updated`);
                            } catch (e) {
                                logger.error(`Cannot update "${obj._id}": ${e.message}`);
                            }
                        }
                    } else {
                        try {
                            await this.objects.setObjectAsync(id, _newObj);
                            logger.info(`object "${_newObj._id}" updated`);
                        } catch (e) {
                            logger.error(`Cannot update ${id} "${JSON.stringify(_newObj)}": ${e.message}`);
                        }
                    }
                } else {
                    id = id.replace(/\*/g, '');
                    const _obj = data.objects[id];
                    const arr = await this.objects.getObjectListAsync(
                        {
                            startkey: id,
                            endkey: `${id}\u9999`,
                        },
                        { checked: true },
                    );

                    if (arr?.rows?.length) {
                        for (const row of arr.rows) {
                            const obj = row.value;
                            if (obj) {
                                obj.nonEdit ||= {};
                                const originalObj = deepClone(obj);
                                _obj.nonEdit ||= {};
                                _obj.nonEdit.passHash = obj.nonEdit.passHash;
                                // merge objects
                                tools.copyAttributes(_obj, obj);

                                if (!isDeepStrictEqual(originalObj, obj)) {
                                    delete obj.nonEdit.passHash;
                                    obj.nonEdit.password = password;
                                    logger.info(`Update "${obj._id}"`);
                                    try {
                                        await this.objects.setObjectAsync(obj._id, obj);
                                        logger.info(`object "${obj._id}" updated`);
                                    } catch (e) {
                                        logger.error(`Cannot update "${obj._id}": ${e.message}`);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // update host as last
        if (data?.model) {
            const model = data.model;
            const hostname = tools.getHostName();
            const obj = await this.objects.getObject(`system.host.${hostname}`);
            if (obj?.common) {
                if (
                    (model.name && model.name !== 'JS controller' && obj.common.title === 'JS controller') ||
                    (model.icon && !obj.common.icon) ||
                    (model.color && !obj.common.color)
                ) {
                    if (model.name) {
                        obj.common.title = model.name;
                    }
                    if (model.icon) {
                        obj.common.icon = model.icon;
                    }
                    if (model.color) {
                        obj.common.color = model.color;
                    }

                    obj.nonEdit ||= {};
                    obj.nonEdit.password = password;

                    if (obj.common.title) {
                        logger.info(`Update "system.host.${hostname}:common.title" = "${obj.common.title}"`);
                    }
                    if (obj.common.icon) {
                        logger.info(`Update "system.host.${hostname}:common.icon"  = "${!!obj.common.icon}"`);
                    }
                    if (obj.common.color) {
                        logger.info(`Update "system.host.${hostname}:common.color" = "${obj.common.color}"`);
                    }

                    try {
                        await this.objects.setObjectAsync(obj._id, obj);
                        logger.info(`object "system.host.${hostname}" updated`);
                    } catch (e) {
                        logger.error(`Cannot update "system.host.${hostname}": ${e.message}`);
                    }
                }
            }
        }

        // restart ioBroker
        setTimeout(() => {
            logger.warn('RESTART!');
            process.exit(-1);
        }, 2_000);
    }
}
