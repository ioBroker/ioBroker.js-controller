/**
 * Notification handler class
 *
 *  2021-2024 foxriver76 <moritz.heusinger@gmail.com>
 */

import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common-db';
import path from 'node:path';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type Winston from 'winston';

type MultilingualObject = Exclude<ioBroker.StringOrTranslated, string>;

export interface NotificationHandlerSettings {
    host: string;
    states: StatesInRedisClient;
    objects: ObjectsInRedisClient;
    log: Winston.Logger | Console;
    logPrefix: string;
}

export interface NotificationsConfigEntry {
    /** e.g. system */
    scope: string;
    /** multilingual name */
    name: MultilingualObject;
    /** multilingual description */
    description: MultilingualObject;
    categories: CategoryConfigEntry[];
}

export type Severity = 'info' | 'notify' | 'alert';

export interface CategoryConfigEntry {
    category: string;
    name: MultilingualObject;
    /** Allows defining the severity of the notification with `info` being the lowest, `notify` representing middle priority, `alert` representing high priority and often containing critical information */
    severity: Severity;
    description: MultilingualObject;
    regex: string[];
    limit: number;
}

interface NotificationMessageObject {
    message: string;
    ts: number;
    contextData?: ioBroker.NotificationContextData;
}

interface NotificationsObject {
    [scope: string]: {
        [category: string]: {
            [instance: string]: NotificationMessageObject[];
        };
    };
}

export interface FilteredNotificationInformation {
    [scope: string]: {
        description: MultilingualObject;
        name: MultilingualObject;
        categories: {
            [category: string]: {
                description: MultilingualObject;
                name: MultilingualObject;
                severity: Severity;
                instances: {
                    [instance: string]: {
                        messages: NotificationMessageObject[];
                    };
                };
            };
        };
    };
}

interface NotificationSetupCategory {
    regex: RegExp[];
    limit: number;
    name: MultilingualObject;
    severity: Severity;
    description: MultilingualObject;
}

interface NotificationSetupObject {
    [scope: string]: {
        name: MultilingualObject;
        description: MultilingualObject;
        categories: {
            [category: string]: NotificationSetupCategory;
        };
    };
}

interface ScopeStateValue {
    [category: string]: {
        count: number;
    };
}

interface AddMessageOptions {
    /** Scope of the message */
    scope: string;
    /** Category of the message, if non we check against regex of scope */
    category?: string | null;
    /** Message to add */
    message: string;
    /** Instance e.g., hm-rpc.1 or hostname, if hostname it needs to be prefixed like system.host.rpi */
    instance: string;
    /** Additional context for the notification which can be used by notification processing adapters */
    contextData?: ioBroker.NotificationContextData;
}

export class NotificationHandler {
    private states: StatesInRedisClient;
    private objects: ObjectsInRedisClient;
    private log: Winston.Logger | Console;
    private currentNotifications: NotificationsObject = {};
    // default data dir is relative to controllerDir
    private readonly dataDir = path.join(tools.getControllerDir(), tools.getDefaultDataDir());
    private readonly setup: NotificationSetupObject = {};
    private readonly logPrefix: string;
    private readonly host: string;

    constructor(settings: NotificationHandlerSettings) {
        this.states = settings.states;
        this.objects = settings.objects;
        this.log = settings.log;
        this.logPrefix = settings.logPrefix;
        this.host = settings.host;

        // load notifications file
        this._loadNotifications();
    }

    /**
     * Get all adapter instances on this host and store their notifications config - and clears up removed instances notifications - should be called once after init
     */
    async getSetupOfAllAdaptersFromHost(): Promise<void> {
        // create the initial notifications object
        let obj;
        try {
            obj = await this.objects.getObject(`system.host.${this.host}.notifications`);
        } catch {
            // ignore
        }

        if (!obj) {
            try {
                await this.objects.setObject(`system.host.${this.host}.notifications`, {
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
                            uk: 'Сповіщення',
                            'zh-cn': '通知事项',
                        },
                    },
                    native: {},
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
                endkey: 'system.adapter.\u9999',
            });

            for (const entry of res.rows) {
                // check that instance has notification settings
                if (entry.value.notifications) {
                    await this.addConfig(entry.value.notifications);
                }

                if (entry.value.common && entry.value.common.host === this.host) {
                    // if it's on our current host
                    instancesOnHost.push(entry.id);
                }
            }
        } catch (e) {
            throw new Error(`Could not get notifications setup from instances: ${e.message}`);
        }

        // now clear up all notifications that do not belong to our host anymore
        for (const scope of Object.keys(this.currentNotifications)) {
            for (const category of Object.keys(this.currentNotifications[scope])) {
                for (const instance of Object.keys(this.currentNotifications[scope][category])) {
                    if (!instancesOnHost.includes(instance) && instance !== `system.host.${this.host}`) {
                        // instance no longer on host
                        this.log.info(`${this.logPrefix} Instance ${instance} removed from host, clear notifications`);
                        await this.clearNotifications(null, null, instance);
                    }
                }
            }
        }

        // now sync RAM with state
        await this._updateScopeStates();
    }

    /**
     * Add a new category to the given scope with a provided optional list of regex
     *
     * @param notifications - Array with notifications
     */
    async addConfig(notifications: NotificationsConfigEntry[]): Promise<void> {
        // if valid attributes, store it
        if (Array.isArray(notifications)) {
            for (const scopeObj of notifications) {
                // create the state object for each scope if non-existing
                let obj;
                try {
                    obj = await this.objects.getObject(`system.host.${this.host}.notifications.${scopeObj.scope}`);
                } catch {
                    // ignore
                }

                if (!obj) {
                    try {
                        await this.objects.setObject(`system.host.${this.host}.notifications.${scopeObj.scope}`, {
                            type: 'state',
                            common: {
                                type: 'object',
                                role: 'value',
                                read: true,
                                write: false,
                                name: scopeObj.name,
                                desc: scopeObj.description,
                            },
                            native: {},
                        });
                    } catch (e) {
                        this.log.error(
                            `${this.logPrefix} Could not create notifications object for scope "${scopeObj.scope}": ${e.message}`,
                        );
                    }
                }

                if (Array.isArray(scopeObj.categories) && scopeObj.categories.length) {
                    // only if scope has at least one category
                    this.setup[scopeObj.scope] = this.setup[scopeObj.scope] || {
                        name: scopeObj.name,
                        description: scopeObj.description,
                        categories: {},
                    };

                    for (const categoryObj of scopeObj.categories) {
                        this.setup[scopeObj.scope].categories[categoryObj.category] =
                            this.setup[scopeObj.scope].categories[categoryObj.category] || {};
                        try {
                            let regex: RegExp[] = [];
                            if (Array.isArray(categoryObj.regex)) {
                                for (const regexString of categoryObj.regex) {
                                    regex.push(new RegExp(regexString));
                                }
                            } else if (typeof categoryObj.regex === 'string') {
                                // if someone passes a string, convert to a single entry array
                                regex = [new RegExp(categoryObj.regex)];
                            }

                            // we overwrite config, maybe it would also make sense to only add the new regex to existing ones
                            this.setup[scopeObj.scope].categories[categoryObj.category] = {
                                regex,
                                limit: categoryObj.limit,
                                name: categoryObj.name,
                                severity: categoryObj.severity,
                                description: categoryObj.description,
                            };
                        } catch (e) {
                            this.log.error(
                                `${this.logPrefix} Cannot store ${JSON.stringify(categoryObj.regex)} for scope "${
                                    scopeObj.scope
                                }", category "${categoryObj.category}": ${e.message}`,
                            );
                        }
                    }
                }
            }
        }
    }

    /**
     * Add a message to the scope and category
     *
     * @param options The scope, category, message, instance and contextData information
     */
    async addMessage(options: AddMessageOptions): Promise<void> {
        const { message, scope, category, contextData } = options;
        let { instance } = options;

        if (typeof instance !== 'string') {
            this.log.error(
                `${this.logPrefix} [addMessage] Instance has to be of type "string", got "${typeof instance}"`,
            );
            return;
        }

        if (!instance.startsWith('system.adapter.') && !instance.startsWith('system.host.')) {
            instance = `system.adapter.${instance}`;
        }

        // get state of the scope
        let stateVal: ScopeStateValue = {};
        try {
            const state = await this.states.getStateAsync(`system.host.${this.host}.notifications.${scope}`);
            stateVal = state?.val ? JSON.parse(state.val as string) : {};
        } catch (e) {
            this.log.error(`${this.logPrefix} Could not get state for scope "${scope}": ${e.message}`);
        }

        let categories = [category];

        if (!category) {
            // check regex - in parse text we can have multiple matches
            categories = this._parseText(scope, message);
        }

        for (const _category of categories) {
            if (_category) {
                this.currentNotifications[scope] = this.currentNotifications[scope] || {};
                this.currentNotifications[scope][_category] = this.currentNotifications[scope][_category] || {};
                // array of all messages for instance/category
                this.currentNotifications[scope][_category][instance] =
                    this.currentNotifications[scope][_category][instance] || [];

                if (!this.setup[scope]?.categories[_category]) {
                    // no setup for this instance/category combination found - so we have nothing to add
                    this.log.warn(
                        `${this.logPrefix} No configuration found for scope "${scope}" and category "${_category}"`,
                    );
                    continue;
                }

                // if limit exceeded, remove last element - use while if it somehow grew too big
                while (
                    this.setup[scope].categories[_category].limit <
                    this.currentNotifications[scope][_category][instance].length + 1
                ) {
                    this.currentNotifications[scope][_category][instance].pop();
                }

                // add a new element at the beginning
                this.currentNotifications[scope][_category][instance].unshift({ message, ts: Date.now(), contextData });
            }
        }

        // now count all messages of this scope - if nothing matched it can be undefined, and we can skip
        if (tools.isObject(this.currentNotifications[scope])) {
            for (const _category of Object.keys(this.currentNotifications[scope])) {
                const categoryCounter = Object.keys(this.currentNotifications[scope][_category]).length;

                stateVal[_category] = { count: categoryCounter };
            }
        }

        // set updated scope state
        try {
            await this.states.setState(`system.host.${this.host}.notifications.${scope}`, {
                val: JSON.stringify(stateVal),
                ack: true,
            });
        } catch (e) {
            this.log.error(`${this.logPrefix} Could not set notifications state for scope "${scope}": ${e.message}`);
        }
    }

    /**
     * Updates all scope states by current notifications in RAM
     */
    private async _updateScopeStates(): Promise<void> {
        for (const scope of Object.keys(this.currentNotifications)) {
            const stateVal: ScopeStateValue = {};

            for (const category of Object.keys(this.currentNotifications[scope])) {
                // count the number of instances with this error
                const catCounter = Object.keys(this.currentNotifications[scope][category]).length;
                stateVal[category] = { count: catCounter };
            }

            // set updated scope state
            try {
                await this.states.setStateAsync(`system.host.${this.host}.notifications.${scope}`, {
                    val: JSON.stringify(stateVal),
                    ack: true,
                });
            } catch (e) {
                this.log.error(
                    `${this.logPrefix} Could not set notifications state for scope "${scope}": ${e.message}`,
                );
            }
        }
    }

    /**
     * Check the given message against all regular expressions of the given scope
     *
     * @param scope - scope of the message
     * @param message - message to check
     */
    private _parseText(scope: string, message: string): string[] {
        const categories = [];
        if (this.setup[scope]) {
            for (const [categoryId, categoryObj] of Object.entries(this.setup[scope].categories)) {
                // check all regular expressions for this category
                for (const regex of categoryObj.regex) {
                    if (regex.test(message)) {
                        // matching category
                        categories.push(categoryId);
                        // no further testing needed for this category
                        break;
                    }
                }
            }
        }

        return categories;
    }

    /**
     * Load notifications from a file
     */
    private _loadNotifications(): void {
        try {
            this.currentNotifications = fs.readJSONSync(path.join(this.dataDir, 'notifications.json'));
        } catch (e) {
            // at first start its normal, that we cannot read notifications, so just info
            this.log.debug(`${this.logPrefix} Could not read notifications.json: ${e.message}`);
        }
    }

    /**
     * Save current notifications to file
     */
    storeNotifications(): void {
        try {
            fs.writeJSONSync(path.join(this.dataDir, 'notifications.json'), this.currentNotifications);
        } catch (e) {
            this.log.error(`${this.logPrefix} Could not write notifications.json: ${e.message}`);
        }
    }

    /**
     * Returns the stored notifications matching the filters with description and name
     *
     * @param scopeFilter - scope of notifications
     * @param categoryFilter - category of notifications
     * @param instanceFilter - instance of notifications
     */
    getFilteredInformation(
        scopeFilter: string | null | undefined,
        categoryFilter: string | null | undefined,
        instanceFilter: string | null | undefined,
    ): FilteredNotificationInformation {
        const res: FilteredNotificationInformation = {};
        for (const scope of Object.keys(this.currentNotifications)) {
            if (scopeFilter && scopeFilter !== scope) {
                // scope filtered out
                continue;
            }

            if (!this.setup[scope]) {
                // no scope set up
                continue;
            }

            res[scope] = {
                categories: {},
                description: this.setup[scope].description,
                name: this.setup[scope].name,
            };

            for (const category of Object.keys(this.currentNotifications[scope])) {
                if (categoryFilter && categoryFilter !== category) {
                    // category filtered out
                    continue;
                }

                const categoryObj = this.setup[scope].categories[category];

                if (!categoryObj) {
                    // no category set up
                    continue;
                }

                res[scope].categories[category] = {
                    instances: {},
                    description: categoryObj.description,
                    name: categoryObj.name,
                    severity: categoryObj.severity,
                };

                for (const instance of Object.keys(this.currentNotifications[scope][category])) {
                    if (instanceFilter && instanceFilter !== instance) {
                        // instance filtered out
                        continue;
                    }

                    res[scope].categories[category].instances[instance] = {
                        messages: this.currentNotifications[scope][category][instance],
                    };
                }
            }
        }
        return res;
    }

    /**
     * Clears the stored notifications matching the filters
     *
     * @param scopeFilter - scope of notifications
     * @param categoryFilter - category of notifications
     * @param instanceFilter - instance of notifications
     */
    async clearNotifications(
        scopeFilter: string | null | undefined,
        categoryFilter: string | null | undefined,
        instanceFilter: string | null | undefined,
    ): Promise<void> {
        for (const scope of Object.keys(this.currentNotifications)) {
            if (!this.currentNotifications[scope]) {
                delete this.currentNotifications[scope];
                continue;
            }
            if (scopeFilter && scopeFilter !== scope) {
                // skip this, because not desired to be deleted
                continue;
            }

            let stateVal: ScopeStateValue = {};
            try {
                const state = await this.states.getStateAsync(`system.host.${this.host}.notifications.${scope}`);
                stateVal = state && state.val ? JSON.parse(state.val as string) : {};
            } catch (e) {
                this.log.error(`${this.logPrefix} Could not get state for scope "${scope}": ${e.message}`);
            }

            for (const category of Object.keys(this.currentNotifications[scope])) {
                if (categoryFilter && categoryFilter !== category) {
                    // category filtered out
                    continue;
                }

                let categoryCounter = 0;
                for (const instance of Object.keys(this.currentNotifications[scope][category])) {
                    if (instanceFilter && instanceFilter !== instance) {
                        // instance filtered out - message counter remains
                        categoryCounter += 1;
                        continue;
                    }

                    // not filtered out -> remove
                    delete this.currentNotifications[scope][category][instance];
                }

                stateVal[category] = { count: categoryCounter };

                // check if all instances of this category deleted
                if (!Object.keys(this.currentNotifications[scope][category]).length) {
                    delete this.currentNotifications[scope][category];
                    delete stateVal[category];
                }
            }

            // check if all categories of this scope deleted
            if (!Object.keys(this.currentNotifications[scope]).length) {
                delete this.currentNotifications[scope];
            }

            // set updated state
            try {
                await this.states.setStateAsync(`system.host.${this.host}.notifications.${scope}`, {
                    val: JSON.stringify(stateVal),
                    ack: true,
                });
            } catch (e) {
                this.log.error(
                    `${this.logPrefix} Could not set notifications state for scope "${scope}": ${e.message}`,
                );
            }
        }
    }

    /**
     * Check if given scope exists in config
     *
     * @param scope - scope to be checked for
     */
    scopeExists(scope: string): boolean {
        return !!this.setup[scope];
    }
}
