/**
 * Notification handler class
 *
 *  2021 foxriver76 <moritz.heusinger@gmail.com>
 */

const fs = require('fs-extra');
const tools = require('./tools');
const path = require('path');

class NotificationHandler {

    /**
     * Create a new instance of NotificationHandler
     *
     * @param {object} settings - settings like states/objects db
     */
    constructor(settings) {
        this.states = settings.states;
        this.objects = settings.objects;
        this.log = settings.log;
        this.currentNotifications = {};
        this.setup = {};
        // default data dir is relative to main.js
        this.dataDir = path.join(__dirname, '..', tools.getDefaultDataDir());
        this.logPrefix = settings.logPrefix;
        this.host = settings.host;

        // load notifications file
        this._loadNotifications();
    }

    /**
     * Get all adapter instances on this host and store their notifications config - and clears up removed instances notifications
     *
     * @return {Promise<void>}
     */
    async getSetupOfAllAdaptersFromHost() {
        // create initial notifications object
        let obj;
        try {
            obj = await this.objects.getObjectAsync(`system.host.${this.host}.notifications`);
        } catch {
            // ignore
        }

        if (!obj) {
            try {
                await this.objects.setObjectAsync(`system.host.${this.host}.notifications`, {
                    type: 'folder',
                    common: {
                        name: {
                            en: 'Notifications',
                            de: 'Benachrichtigungen',
                            ru: 'Уведомления',
                            pt: 'Notificações',
                            nl: 'Meldingen',
                            fr: 'Notifications',
                            it: 'Notifiche',
                            es: 'Notificaciones',
                            pl: 'Powiadomienia',
                            'zh-cn': '通知事项'
                        }
                    },
                    native: {}
                });
            } catch (e) {
                this.log.error(`${this.logPrefix} Could not create notifications object: ${e.message}`);
            }
        }

        const instancesOnHost = [];
        // get all instances
        try {
            const res = await this.objects.getObjectViewAsync('system', 'instance', {
                startkey: 'system.adapter.',
                endkey: 'system.adapter.\u9999'
            });

            if (res && Array.isArray(res.rows)) {
                for (const entry of res.rows) {
                    // check that instance has notifications settings
                    if (entry && entry.value) {
                        if (entry.value.notifications) {
                            await this.addConfig(entry.value.notifications, entry.id);
                        }

                        if (entry.value.common && entry.value.common.host === this.host) {
                            // if its on our current host
                            instancesOnHost.push(entry.id);
                        }
                    }
                }
            }
        } catch (e) {
            throw new Error(`Could not get notifications setup from instances: ${e.message}`);
        }

        // now clear up all notifications which do not belong to our host anymore
        for (const scope of Object.keys(this.currentNotifications)) {
            for (const category of Object.keys(this.currentNotifications[scope])) {
                for (const instance of Object.keys(this.currentNotifications[scope][category])) {
                    if (!instancesOnHost.includes(instance)) {
                        // instance no longer on host
                        this.log.info(`${this.logPrefix} Instance ${instance} removed from host, clear notifications`);
                        this.clearNotifications(null, null, instance);
                    }
                }
            }
        }

    }

    /**
     * Add a new category to the given scope with provided optional list of regex
     *
     * @param {object[]} notifications - notifications array
     * @param {string} instance - e.g. hm-rpc.1 or host
     * @return Promise<void>
     */
    async addConfig(notifications, instance) {
        if (instance !== this.host && !instance.startsWith('system.adapter.')) {
            instance = `system.adapter.${instance}`;
        }

        // if valid attributes, store it
        if (Array.isArray(notifications)) {
            for (const scopeObj of notifications) {
                // create state object for each scope if non existing
                let obj;
                try {
                    obj = await this.objects.getObjectAsync(`system.host.${this.host}.notifications.${scopeObj.scope}`);
                } catch {
                    // ignore
                }

                if (!obj) {
                    try {
                        await this.objects.setObjectAsync(`system.host.${this.host}.notifications.${scopeObj.scope}`, {
                            type: 'state',
                            common: {
                                type: 'object',
                                role: 'value',
                                read: true,
                                name: scopeObj.name,
                                desc: scopeObj.description
                            },
                            native: {}
                        });
                    } catch (e) {
                        this.log.error(`${this.logPrefix} Could not create notifications object for category "${scopeObj.category}": ${e.message}`);
                    }
                }

                if (Array.isArray(scopeObj.categories)) {
                    for (const categoryObj of scopeObj.categories) {
                        this.setup[scopeObj.scope] = this.setup[scopeObj.scope] || {};
                        this.setup[scopeObj.scope][categoryObj.category] = this.setup[scopeObj.scope][categoryObj.category] || {};
                        try {
                            // regex is an array
                            let regex = categoryObj.regex;
                            if (Array.isArray(regex)) {
                                for (const i in regex) {
                                    regex[i] = new RegExp(categoryObj.regex[i]);
                                }
                            } else if (typeof regex === 'string') {
                                // if someone passes string, convert to single entry array
                                regex = [new RegExp(regex)];
                            }

                            // we overwrite config, maybe it would also make sense to only add the new regex to existing ones
                            this.setup[scopeObj.scope][categoryObj.category] = {
                                regex: regex || [],
                                limit: categoryObj.limit,
                                name: categoryObj.name,
                                severity: categoryObj.severity,
                                description: categoryObj.description
                            };
                        } catch (e) {
                            this.log.error(`${this.logPrefix} Cannot store ${categoryObj.regex} for scope "${scopeObj.scope}", category "${categoryObj.category}" and instance "${instance}": ${e.message}`);
                        }
                    }
                }
            }
        }
    }

    /**
     * Add a message to the scope and category
     *
     * @param {string} scope - scope of the message
     * @param {string|null|undefined} category - category of the message, if non we check against regex of scope
     * @param {string} message - message to add
     * @param {string|null} instance - instance e.g. hm-rpc.1
     */
    addMessage(scope, category, message, instance) {
        if (!instance) {
            instance = this.host;
        } else if (instance !== this.host && !instance.startsWith('system.adapter.')) {
            instance = 'system.adapter.' + instance;
        }

        let categories = [category];

        if (!category) {
            // check regex - in parse text we can have multiple matchings
            categories = this._parseText(scope, message);
        }

        for (const _category of categories) {
            if (_category) {
                this.currentNotifications[scope] = this.currentNotifications[scope] || {};
                this.currentNotifications[scope][_category] = this.currentNotifications[scope][_category] || {};
                // array of all messages for instance/category
                this.currentNotifications[scope][_category][instance] = this.currentNotifications[scope][_category][instance] || [];

                if (!this.setup[scope] || !this.setup[scope][_category]) {
                    // no setup for this instance/category combination found - so nothing to add
                    this.log.warn(`${this.logPrefix} No configuration found for scope "${scope}" and category "${_category}"`);
                    continue;
                }

                // if limit exceeded, remove last element - use while if it somehow grew too big
                while (this.setup[scope][_category].limit < this.currentNotifications[scope][_category][instance].length + 1) {
                    this.currentNotifications[scope][_category][instance].pop();
                }

                // add new element at beginning
                this.currentNotifications[scope][_category][instance].unshift(message);
                // todo: update state of scope with {categoryA: {count: length of curr instance messages, lastMessage: message}, catB: ...}
                // maybe count of whole category?
            }
        }
    }

    /**
     * Check the given message against all regular expressions of the given scope
     *
     * @param {string} scope - scope of the message
     * @param {string} message - message to check
     * @return {any[]}
     * @private
     */
    _parseText(scope, message) {
        const categories = [];
        if (this.setup[scope]) {
            for (const category of Object.keys(this.setup[scope])) {
                if (!this.setup[scope][category]) {
                    continue;
                }

                // check all regular expressions for this category
                for (const regex of this.setup[scope][category].regex) {
                    if (regex.test(message)) {
                        // matching category
                        categories.push(category);
                        // no further testing needed for this category
                        break;
                    }
                }
            }
        }

        return categories;
    }

    /**
     * Load notifications from file
     *
     * @private
     */
    _loadNotifications() {
        try {
            this.currentNotifications = fs.readJSONSync(path.join(this.dataDir, 'notifications.json'));
        } catch (e) {
            // at first start its normal, that we cannot read notifications, so just an info
            this.log.debug(`${this.logPrefix} Could not read notifications.json: ${e.message}`);
        }
    }

    /**
     * Save current notifications to file
     */
    storeNotifications() {
        try {
            fs.writeJSONSync(path.join(this.dataDir, 'notifications.json'), this.currentNotifications);
        } catch (e) {
            this.log.error(`${this.logPrefix} Could not write notifications.json: ${e.message}`);
        }
    }

    /**
     * Returns the stored notifications matching the filters with description and name
     *
     * @param {string|null|undefined} scopeFilter - scope of notifications
     * @param {string|null|undefined} categoryFilter - category of notifications
     * @param {string|null|undefined} instanceFilter - instance of notifications
     * @return {object}
     */
    getFilteredInformation(scopeFilter, categoryFilter, instanceFilter) {
        const res = {};
        for (const scope of Object.keys(this.currentNotifications)) {
            if (scopeFilter && scopeFilter !== scope) {
                // scope filtered out
                continue;
            }

            if (!this.setup[scope]) {
                // no scope set up
                continue;
            }

            res[scope] = {categories: {}};
            res[scope].description = this.setup[scope].description;
            res[scope].name = this.setup[scope].name;

            for (const category of Object.keys(this.currentNotifications[scope])) {
                if (categoryFilter && categoryFilter !== category) {
                    // category filtered out
                    continue;
                }

                if (!this.setup[scope][category]) {
                    // no category set up
                    continue;
                }

                res[scope].categories[category] = {instances: {}};
                res[scope].categories[category].description = this.setup[scope][category].description;
                res[scope].categories[category].name = this.setup[scope][category].name;
                res[scope].categories[category].severity = this.setup[scope][category].severity;

                for (const instance of Object.keys(this.currentNotifications[scope][category])) {
                    if (instanceFilter && instanceFilter !== instance) {
                        // instance filtered out
                        continue;
                    }

                    res[scope].categories[category].instances[instance] = {};
                    res[scope].categories[category].instances[instance].messages = this.currentNotifications[scope][category][instance];
                }
            }
        }
        return res;
    }

    /**
     * Clears the stored notifications matching the filters
     *
     * @param {string|null|undefined} scopeFilter - scope of notifications
     * @param {string|null|undefined} categoryFilter - category of notifications
     * @param {string|null|undefined} instanceFilter - instance of notifications
     */
    clearNotifications(scopeFilter, categoryFilter, instanceFilter) {
        for (const scope of Object.keys(this.currentNotifications)) {
            if (scopeFilter && scopeFilter !== scope) {
                // skip this, because not desired too be deleted
                continue;
            }

            for (const category of Object.keys(this.currentNotifications[scope])) {
                if (categoryFilter && categoryFilter !== category) {
                    // category filtered out
                    continue;
                }

                for (const instance of Object.keys(this.currentNotifications[scope][category])) {
                    if (instanceFilter && instanceFilter !== instance) {
                        // instance filtered out
                        continue;
                    }

                    // not filtered out -> remove
                    delete this.currentNotifications[scope][category][instance];
                }

                // check if all instances of this category deleted
                if (!Object.keys(this.currentNotifications[scope][category]).length) {
                    delete this.currentNotifications[scope][category];
                }
            }

            // check if all categories of this scope deleted
            if (!Object.keys(this.currentNotifications[scope]).length) {
                delete this.currentNotifications[scope];
            }
        }
    }
}

module.exports = NotificationHandler;
