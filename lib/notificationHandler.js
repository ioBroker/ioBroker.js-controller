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

        if (settings.notificationsSetup) {
            // initial settings are for complete host
            this._addConfig(settings.notificationsSetup, settings.host);
        }
    }

    /**
     * Get all adapter instances on this host and store their notifications config
     *
     * @return {Promise<void>}
     */
    async getSetupOfAllAdaptersFromHost() {
        try {
            const res = await this.objects.getObjectViewAsync('system', 'instance', {
                startkey: 'system.adapter.',
                endkey: 'system.adapter.\u9999'
            });

            if (res && Array.isArray(res.rows)) {
                for (const entry of res.rows) {
                    // check that instance is running on given host and has notifications
                    if (entry && entry.value && entry.value.notifications && entry.value.common && entry.value.common.host === this.host) {
                        this._addConfig(entry.value.notifications, entry.id);
                    }
                }
            }
        } catch (e) {
            throw new Error(`Could not get notifications setup from instances: ${e.message}`);
        }

    }

    /**
     * Add a new category to the given scope with provided optional list of regex
     *
     * @param {object[]} notifications - notifications array
     * @param {string} instance - e.g. hm-rpc.1
     * @private
     */
    _addConfig(notifications, instance) {
        if (instance !== this.host && !instance.startsWith('system.adapter.')) {
            instance = 'system.adapter.' + instance;
        }

        // if valid attributes, store it
        if (Array.isArray(notifications)) {
            for (const scopeObj of notifications) {
                if (Array.isArray(scopeObj.categories)) {
                    for (const categoryObj of scopeObj.categories) {
                        this.setup[scopeObj.scope] = this.setup[scopeObj.scope] || {};
                        this.setup[scopeObj.scope][categoryObj.category] = this.setup[scopeObj.scope][categoryObj.category] || {};
                        try {
                            // regex is an array
                            const regex = categoryObj.regex;
                            for (let i = 0; i < regex.length; i++) {
                                regex[i] = new RegExp(categoryObj.regex[i]);
                            }
                            this.setup[scopeObj.scope][categoryObj.category][instance] = {
                                regex: regex,
                                limit: categoryObj.limit
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
        this.log.warn(instance);
        if (!instance) {
            instance = this.host;
        } else if (instance !== this.host && !instance.startsWith('system.adapter.')) {
            instance = 'system.adapter.' + instance;
        }

        let categories = [category];

        if (!category) {
            // check regex - in parse text we can have multiple matchings
            categories = this._parseText(scope, message, instance);
        }

        this.log.warn('addMessage ' + scope)

        for (const _category of categories) {
            if (_category) {
                this.currentNotifications[scope] = this.currentNotifications[scope] || {};
                this.currentNotifications[scope][_category] = this.currentNotifications[scope][_category] || {};
                // array of all messages for instance/category
                this.currentNotifications[scope][_category][instance] = this.currentNotifications[scope][_category][instance] || [];

                // either we have a setup for the specific instance or for host
                const setup = this.setup[scope][_category][instance] || this.setup[scope][_category][this.host] || {};

                if (!setup) {
                    // no setup for this instance/category combination - so nothing to add
                    continue;
                }

                // if limit exceeded, remove last element - use while if it somehow grew too big
                while (setup.limit < this.currentNotifications[scope][_category][instance].length + 1) {
                    this.currentNotifications[scope][_category][instance].pop();
                }
                // add new element at beginning
                this.currentNotifications[scope][_category][instance].unshift(message);
            }
        }
    }

    /**
     * Check the given message against all regular expressions of the given scope
     *
     * @param {string} scope - scope of the message
     * @param {string} message - message to check
     * @param {string} instance - e.g. hm-rpc.1
     * @return {any[]}
     * @private
     */
    _parseText(scope, message, instance) {
        const categories = [];
        if (this.setup[scope]) {
            for (const category of Object.keys(this.setup[scope])) {
                // we have the category set up for this instance or whole host
                const setup = this.setup[scope][category][instance] || this.setup[scope][category][this.host];
                if (!setup) {
                    continue;
                }

                // check all regular expressions for this category
                for (const regex of setup.regex) {
                    if (regex.test(message)) {
                        // matching category
                        categories.push(category);
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
            this.log.info(`${this.logPrefix} Could not read notifications.json: ${e.message}`);
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
}

module.exports = NotificationHandler;
