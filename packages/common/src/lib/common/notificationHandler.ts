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

/** Settings to configure an instance of NotificationHandler */
export interface NotificationHandlerSettings {
    /** Name of the host (not id - hence, without `system.host.` prefix) */
    host: string;
    /** States DB instance */
    states: StatesInRedisClient;
    /** Objects DB instance */
    objects: ObjectsInRedisClient;
    /** Logger instance */
    log: Winston.Logger | Console;
    /** Prefix for the log messages */
    logPrefix: string;
}

/** A notification config entry represents the top level of the notification structure */
export interface NotificationsConfigEntry {
    /** e.g. system */
    scope: string;
    /** multilingual name */
    name: MultilingualObject;
    /** multilingual description */
    description: MultilingualObject;
    /** The notification categories inside this scope */
    categories: CategoryConfigEntry[];
}

export type Severity = 'info' | 'notify' | 'alert';

/** A notification category entry represents one of the categories of a scope */
export interface CategoryConfigEntry {
    /** Id of the category */
    category: string;
    /** Name of the category */
    name: MultilingualObject;
    /** Allows defining the severity of the notification with `info` being the lowest, `notify` representing middle priority, `alert` representing high priority and often containing critical information */
    severity: Severity;
    /** Description of the category */
    description: MultilingualObject;
    /** Regex where `console.error` output is parsed against to check if a notification of this category should be generated */
    regex: string[];
    /** Restrict the maximum number of messages for this category */
    limit: number;
}

interface NotificationMessageObject {
    message: string;
    ts: number;
    contextData?: ioBroker.NotificationContextData;
}

interface NotificationsCategory {
    [category: string]: {
        [instance: string]: NotificationMessageObject[];
    };
}

interface NotificationsObject {
    [scope: string]: NotificationsCategory;
}

interface FilteredNotificationCategory {
    description: MultilingualObject;
    name: MultilingualObject;
    severity: Severity;
    instances: {
        [instance: string]: {
            messages: NotificationMessageObject[];
        };
    };
}

interface FilteredNotificationScope {
    description: MultilingualObject;
    name: MultilingualObject;
    categories: {
        [category: string]: FilteredNotificationCategory;
    };
}

/** The filtered information as a response for `getFilteredInformation` */
export interface FilteredNotificationInformation {
    [scope: string]: FilteredNotificationScope;
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

/**
 * The Notification handler class provides an interface to manage the ioBroker notification system
 */
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

    /**
     * Creates a new instance of the notification handler class
     *
     * @param settings settings to configure the handler instance
     */
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
        for (const notificationsCategory of Object.values(this.currentNotifications)) {
            for (const instancesInfo of Object.values(notificationsCategory)) {
                for (const instance of Object.keys(instancesInfo)) {
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
                    const setupScope = this.setup[scopeObj.scope] || {
                        name: scopeObj.name,
                        description: scopeObj.description,
                        categories: {},
                    };

                    // only if scope has at least one category
                    this.setup[scopeObj.scope] = setupScope;

                    for (const categoryObj of scopeObj.categories) {
                        const setupCategory = setupScope.categories[categoryObj.category] || {
                            regex: [],
                            limit: categoryObj.limit,
                            name: categoryObj.name,
                            severity: categoryObj.severity,
                            description: categoryObj.description,
                        };
                        setupScope.categories[categoryObj.category] = setupCategory;

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

                            setupCategory.regex = regex;
                        } catch (e) {
                            this.log.error(
                                `${this.logPrefix} Cannot store regex "${JSON.stringify(categoryObj.regex)}" for scope "${
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

        const currentScopeObj = this.currentNotifications[scope] || {};
        this.currentNotifications[scope] = currentScopeObj;

        for (const _category of categories) {
            if (!_category) {
                continue;
            }

            const currentCategoryObj = currentScopeObj[_category] || {};
            currentScopeObj[_category] = currentCategoryObj;

            // array of all messages for instance/category
            const currentInstances = currentCategoryObj[instance] || [];
            currentCategoryObj[instance] = currentInstances;

            const setupCategory = this.setup[scope]?.categories[_category];

            if (!setupCategory) {
                // no setup for this instance/category combination found - so we have nothing to add
                this.log.warn(
                    `${this.logPrefix} No configuration found for scope "${scope}" and category "${_category}"`,
                );
                continue;
            }

            // if limit exceeded, remove last element - use while if it somehow grew too big
            while (setupCategory.limit < currentInstances.length + 1) {
                currentInstances.pop();
            }

            // add a new element at the beginning
            currentInstances.unshift({ message, ts: Date.now(), contextData });
        }

        // now count all messages of this scope - if nothing matched it can be undefined, and we can skip
        if (tools.isObject(this.currentNotifications[scope])) {
            for (const [categoryName, category] of Object.entries(currentScopeObj)) {
                const categoryCounter = Object.keys(category).length;

                stateVal[categoryName] = { count: categoryCounter };
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
        for (const [scope, scopeObj] of Object.entries(this.currentNotifications)) {
            const stateVal: ScopeStateValue = {};

            for (const [category, categoryObj] of Object.entries(scopeObj)) {
                // count the number of instances with this error
                const catCounter = Object.keys(categoryObj).length;
                stateVal[category] = { count: catCounter };
            }

            // set updated scope state
            try {
                await this.states.setState(`system.host.${this.host}.notifications.${scope}`, {
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
        const categories: string[] = [];

        const scopeObj = this.setup[scope];

        if (!scopeObj) {
            return categories;
        }

        for (const [categoryId, categoryObj] of Object.entries(scopeObj.categories)) {
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
        for (const [scope, currentNotification] of Object.entries(this.currentNotifications)) {
            if (scopeFilter && scopeFilter !== scope) {
                // scope filtered out
                continue;
            }

            const scopeObj = this.setup[scope];

            if (!scopeObj) {
                // no scope set up
                continue;
            }

            const scopeResult: FilteredNotificationScope = {
                categories: {},
                description: scopeObj.description,
                name: scopeObj.name,
            };

            res[scope] = scopeResult;

            for (const [category, currentCategoryObj] of Object.entries(currentNotification)) {
                if (categoryFilter && categoryFilter !== category) {
                    // category filtered out
                    continue;
                }

                const categoryObj = scopeObj.categories[category];

                if (!categoryObj) {
                    // no category set up
                    continue;
                }

                const resultCategories: FilteredNotificationCategory = {
                    instances: {},
                    description: categoryObj.description,
                    name: categoryObj.name,
                    severity: categoryObj.severity,
                };

                scopeResult.categories[category] = resultCategories;

                for (const [instance, instanceObj] of Object.entries(currentCategoryObj)) {
                    if (instanceFilter && instanceFilter !== instance) {
                        // instance filtered out
                        continue;
                    }

                    resultCategories.instances[instance] = {
                        messages: instanceObj,
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
            const currentNotificationScope = this.currentNotifications[scope];

            if (!currentNotificationScope) {
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

            for (const [category, categoryObj] of Object.entries(currentNotificationScope)) {
                if (categoryFilter && categoryFilter !== category) {
                    // category filtered out
                    continue;
                }

                let categoryCounter = 0;
                for (const instance of Object.keys(categoryObj)) {
                    if (instanceFilter && instanceFilter !== instance) {
                        // instance filtered out - message counter remains
                        categoryCounter += 1;
                        continue;
                    }

                    // not filtered out -> remove
                    delete categoryObj[instance];
                }

                stateVal[category] = { count: categoryCounter };

                // check if all instances of this category deleted
                if (!Object.keys(categoryObj).length) {
                    delete currentNotificationScope[category];
                    delete stateVal[category];
                }
            }

            // check if all categories of this scope deleted
            if (!Object.keys(currentNotificationScope).length) {
                delete this.currentNotifications[scope];
            }

            // set updated state
            try {
                await this.states.setState(`system.host.${this.host}.notifications.${scope}`, {
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
