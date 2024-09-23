import { password, tools, EXIT_CODES } from '@iobroker/js-controller-common';
import type { ProcessExitCallback } from '../_Types.js';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import prompt from 'prompt';

export interface CLIUsersOptions {
    processExit: ProcessExitCallback;
    objects: ObjectsRedisClient;
}

/** Map a prompt.Schema to properties of type string */
type SchemaPropsToString<TSchema extends prompt.Schema> = { [Property in keyof TSchema['properties']]: string };

export class Users {
    private readonly objects: ObjectsRedisClient;
    private readonly processExit: ProcessExitCallback;

    constructor(options: CLIUsersOptions) {
        if (!options.objects) {
            throw new Error('Invalid arguments: objects is missing');
        }
        if (!options.processExit) {
            throw new Error('Invalid arguments: processExit is missing');
        }

        this.objects = options.objects;
        this.processExit = options.processExit;
    }

    /**
     * Adds new user to system
     *
     * @param username name of the user which will be added
     * @param pw password
     * @param callback
     */
    addUser(username: string, pw: string, callback: ioBroker.ErrorCallback): void {
        // user id's should be case insensitive
        const _user = username.replace(/\s/g, '_').toLowerCase();
        this.objects.getObject(`system.user.${_user}`, (err, obj) => {
            if (obj) {
                return tools.maybeCallbackWithError(callback, 'User yet exists');
            }
            this.objects.setObject(
                `system.user.${_user}`,
                {
                    type: 'user',
                    common: {
                        name: username,
                        enabled: true,
                        password: '',
                    },
                    from: `system.host.${tools.getHostName()}.cli`,
                    ts: Date.now(),
                    native: {},
                },
                err => {
                    if (!err) {
                        this.setPassword(username, pw, callback);
                    } else {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                },
            );
        });
    }

    /**
     * Checks if user exists
     *
     * @param username name of the user to check existence of
     */
    async isUser(username: string): Promise<boolean> {
        const _user = username.replace(/\s/g, '_').toLowerCase();
        let isExisting = false;
        try {
            isExisting = await this.objects.objectExists(`system.user.${_user}`);
        } catch {
            // ignore
        }

        return isExisting;
    }

    /**
     * Set password for specific user
     *
     * @param username name of the user to set password for
     * @param pw password
     * @param callback
     */
    setPassword(username: string, pw: string, callback: ioBroker.ErrorCallback): void {
        const _user = username.replace(/\s/g, '_').toLowerCase();

        this.objects.getObject(`system.user.${_user}`, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(callback, 'User does not exist');
            }

            password(pw).hash(null, null, (err, res) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                obj.common.password = res ?? '';
                obj.from = `system.host.${tools.getHostName()}.cli`;
                obj.ts = Date.now();
                this.objects.setObject(`system.user.${_user}`, obj, err => {
                    return tools.maybeCallbackWithError(callback, err);
                });
            });
        });
    }

    /**
     * Checks if password is correct for given user
     *
     * @param username name of the user to check password
     * @param pw password
     * @param callback
     */
    checkPassword(username: string, pw: string, callback: (err?: Error | null, isOk?: boolean) => void): void {
        const _user = username.replace(/\s/g, '_').toLowerCase();

        this.objects.getObject(`system.user.${_user}`, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(callback, 'User does not exist');
            }

            password(pw).check(obj.common.password, (err, res) => {
                return tools.maybeCallbackWithError(callback, err, res);
            });
        });
    }

    /**
     * Deletes user from system
     *
     * @param username name of the user to delete
     * @param callback
     */
    delUser(username: string, callback: ioBroker.ErrorCallback): void {
        if (!username) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "userdel user"');
        }

        const _user = username.replace(/\s/g, '_').toLowerCase();

        this.objects.getObject(`system.user.${_user}`, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(callback, 'User does not exist');
            }
            if (obj.common.dontDelete) {
                return tools.maybeCallbackWithError(callback, 'Cannot delete user, while is system user');
            }
            this.objects.delObject(`system.user.${_user}`, err => {
                // Remove this user from all groups
                if (!err) {
                    this.objects.getObjectList(
                        { startkey: 'system.group.', endkey: 'system.group.\u9999' },
                        (err, groups) => {
                            if (!groups) {
                                return tools.maybeCallback(callback);
                            }

                            let count = 0;
                            for (let i = 0; i < groups.rows.length; i++) {
                                if (groups.rows[i].value.type !== 'group') {
                                    continue;
                                }
                                // find all groups
                                if (
                                    groups.rows[i].value.common.members &&
                                    groups.rows[i].value.common.members.indexOf(`system.user.${_user}`) !== -1
                                ) {
                                    const pos = groups.rows[i].value.common.members.indexOf(`system.user.${_user}`);
                                    groups.rows[i].value.common.members.splice(pos, 1);
                                    count++;
                                    groups.rows[i].value.from = `system.host.${tools.getHostName()}.cli`;
                                    groups.rows[i].value.ts = Date.now();
                                    this.objects.setObject(groups.rows[i].value._id, groups.rows[i].value, err => {
                                        if (!--count) {
                                            return tools.maybeCallbackWithError(callback, err);
                                        }
                                    });
                                }
                            }
                            if (!count) {
                                return tools.maybeCallback(callback);
                            }
                        },
                    );
                } else {
                    return tools.maybeCallbackWithError(callback, err);
                }
            });
        });
    }

    /**
     * Adds user to given group
     *
     * @param username user which will be added to the group
     * @param groupName name of the group where the user will be added to
     * @param callback
     */
    addUserToGroup(username: string, groupName: string, callback: ioBroker.ErrorCallback): void {
        let _user = username.replace(/\s/g, '_').toLowerCase();
        if (!groupName.startsWith('system.group.')) {
            groupName = `system.group.${groupName}`;
        }
        if (!_user.startsWith('system.user.')) {
            _user = `system.user.${_user}`;
        }

        this.objects.getObject(_user, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(callback, 'User does not exist');
            }
            this.objects.getObject(groupName, (err, obj) => {
                if (err || !obj) {
                    return tools.maybeCallbackWithError(callback, 'Group does not exist');
                }
                obj.common = obj.common || {};
                obj.common.members = obj.common.members || [];

                if (obj.common.members.indexOf(_user) === -1) {
                    obj.common.members.push(_user);
                    obj.from = `system.host.${tools.getHostName()}.cli`;
                    obj.ts = Date.now();
                    this.objects.setObject(groupName, obj, err => {
                        return tools.maybeCallbackWithError(callback, err);
                    });
                } else {
                    return tools.maybeCallback(callback);
                }
            });
        });
    }

    /**
     * Add user via CLI prompt
     *
     * @param username user which sohuld be created
     * @param groupName default group for the new user
     * @param password user password
     * @param callback
     */
    addUserPrompt(username: string, groupName: string, password: string, callback: ioBroker.ErrorCallback): void {
        if (!username) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "adduser newUser"');
        }

        // Check group
        if (groupName.substring(0, 13) !== 'system.group.') {
            groupName = `system.group.${groupName}`;
        }

        this.objects.getObject(groupName, (err, obj) => {
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `Unknown group: ${groupName}`);
            }
            if (!password) {
                prompt.message = '';
                prompt.delimiter = '';
                const schema = {
                    properties: {
                        password: {
                            description: 'Enter your password:',
                            pattern: /^[^'"]+$/,
                            message: 'No " are allowed',
                            hidden: true,
                        },
                        repeatPassword: {
                            description: 'Repeat your password:',
                            pattern: /^[^'"]+$/,
                            message: 'No " are allowed',
                            hidden: true,
                        },
                    },
                } as const satisfies prompt.Schema;
                prompt.start();

                prompt.get<SchemaPropsToString<typeof schema>>(schema, (err, result) => {
                    if (result) {
                        if (result.password !== result.repeatPassword) {
                            console.log('Passwords are not identical!');
                            return void this.processExit(EXIT_CODES.INVALID_PASSWORD);
                        }

                        this.addUser(username, result.password, err => {
                            if (err) {
                                return tools.maybeCallbackWithError(callback, err);
                            }
                            this.addUserToGroup(username, groupName, err => {
                                if (err) {
                                    return tools.maybeCallbackWithError(callback, err);
                                }
                                return tools.maybeCallback(callback);
                            });
                        });
                    } else {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                });
            } else {
                this.addUser(username, password, err => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    this.addUserToGroup(username, groupName, err => {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        }
                        return tools.maybeCallback(callback);
                    });
                });
            }
        });
    }

    /**
     * Set password of user
     *
     * @param username name of the user to set password for
     * @param password password of user
     * @param callback
     */
    async setUserPassword(username: string, password: string, callback: ioBroker.ErrorCallback): Promise<void> {
        if (!username) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "passwd username"');
        }

        const isExisting = await this.isUser(username);
        if (!isExisting) {
            return tools.maybeCallbackWithError(callback, `User "${username}" does not exist.`);
        }
        // Check group
        if (!password) {
            prompt.message = '';
            prompt.delimiter = '';
            const schema = {
                properties: {
                    password: {
                        description: 'Enter your password:',
                        pattern: /^[^'"]*$/,
                        message: 'No " are allowed',
                        hidden: true,
                    },
                    repeatPassword: {
                        description: 'Repeat your password:',
                        pattern: /^[^'"]*$/,
                        message: 'No " are allowed',
                        hidden: true,
                    },
                },
            } as const satisfies prompt.Schema;
            prompt.start();

            prompt.get<SchemaPropsToString<typeof schema>>(schema, (err, result) => {
                if (result) {
                    if (result.password !== result.repeatPassword) {
                        return tools.maybeCallbackWithError(callback, 'Passwords are not identical!');
                    }

                    this.setPassword(username, result.password, err => {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        }
                        return tools.maybeCallback(callback);
                    });
                } else {
                    return tools.maybeCallbackWithError(callback, 'No password entered!');
                }
            });
        } else {
            this.setPassword(username, password, err => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                return tools.maybeCallback(callback);
            });
        }
    }

    /**
     * Enable user
     *
     * @param username name of the user which will be activated
     * @param enable true if it should be enabled else false
     * @param callback
     */
    enableUser(username: string, enable: boolean, callback: ioBroker.ErrorCallback): void {
        if (!username) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "enable username"');
        }
        if (username.startsWith('system.user.')) {
            username = username.substring('system.user.'.length);
        }

        if (username === 'admin' && !enable) {
            return tools.maybeCallbackWithError(callback, 'User admin cannot be disabled');
        }

        this.objects.getObject(`system.user.${username}`, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read user: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `User "${username}" not found`);
            }
            obj.common.enabled = enable;
            obj.from = `system.host.${tools.getHostName()}.cli`;
            obj.ts = Date.now();
            this.objects.setObject(obj._id, obj, err => {
                return tools.maybeCallbackWithError(callback, err);
            });
        });
    }

    /**
     * Check if user password is valid
     *
     * @param username name of the user to check password for
     * @param password password to check
     * @param callback
     */
    checkUserPassword(username: string, password: string, callback: ioBroker.ErrorCallback): void {
        if (!username && !password) {
            prompt.message = '';
            prompt.delimiter = '';
            const schema = {
                properties: {
                    username: {
                        description: 'Enter username to check password:',
                        pattern: /^[^'"]+$/,
                        message: 'No " are allowed',
                        hidden: false,
                    },
                    password: {
                        description: 'Enter current password:',
                        pattern: /^[^'"]+$/,
                        message: 'No " are allowed',
                        hidden: true,
                    },
                },
            } as const satisfies prompt.Schema;
            prompt.start();

            prompt.get<SchemaPropsToString<typeof schema>>(schema, (err, result) => {
                this.checkPassword(result.username, result.password, (err, res) => {
                    if (err || !res) {
                        return tools.maybeCallbackWithError(
                            callback,
                            `Password for user "${result.username}" does not match${err ? `: ${err.message}` : ''}`,
                        );
                    }
                    return tools.maybeCallbackWithError(callback, null);
                });
            });
        } else if (!password) {
            prompt.message = '';
            prompt.delimiter = '';
            const schema = {
                properties: {
                    password: {
                        description: 'Enter current password:',
                        pattern: /^[^'"]+$/,
                        message: 'No " are allowed',
                        hidden: true,
                    },
                },
            } as const satisfies prompt.Schema;
            prompt.start();

            prompt.get<SchemaPropsToString<typeof schema>>(schema, (err, result) => {
                this.checkPassword(username, result.password, (err, res) => {
                    if (err || !res) {
                        return tools.maybeCallbackWithError(
                            callback,
                            `Password for user "${username}" does not match${err ? `: ${err.message}` : ''}`,
                        );
                    }
                    return tools.maybeCallbackWithError(callback, null);
                });
            });
        } else {
            this.checkPassword(username, password, (err, res) => {
                if (err || !res) {
                    return tools.maybeCallbackWithError(
                        callback,
                        `Password for user "${username}" does not match${err ? `: ${err.message}` : ''}`,
                    );
                }
                return tools.maybeCallbackWithError(callback, null);
            });
        }
    }

    /**
     * Get user object
     *
     * @param username name of the user to get object of
     * @param callback
     */
    getUser(username: string, callback: (err?: Error | null, enabled?: boolean) => void): void {
        this.objects.getObject(`system.user.${username}`, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read user: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `User "${username}" not found`);
            }
            return tools.maybeCallbackWithError(callback, null, obj.common.enabled);
        });
    }

    /**
     * Get group object
     *
     * @param group groupname
     * @param callback
     */
    getGroup(group: string, callback: (err?: Error | null, enabled?: boolean, members?: string[]) => void): void {
        this.objects.getObject(`system.group.${group}`, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read group: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `Group "${group}" not found`);
            }
            return tools.maybeCallbackWithError(callback, null, obj.common.enabled, obj.common.members);
        });
    }

    /**
     * Enable or disable group by name
     *
     * @param group groupname
     * @param enable if enable or disable
     * @param callback
     */
    enableGroup(group: string, enable: boolean, callback: ioBroker.ErrorCallback): void {
        if (!group) {
            return tools.maybeCallbackWithError(callback, 'Please define group name, like: "enable groupname"');
        }
        if (group.startsWith('system.group.')) {
            group = group.substring('system.group.'.length);
        }

        if (group === 'administrator' && !enable) {
            return tools.maybeCallbackWithError(callback, 'Group "administrator" cannot be disabled');
        }

        this.objects.getObject(`system.group.${group}`, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read group: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `Group "${group}" not found`);
            }
            obj.common.enabled = enable;
            obj.from = `system.host.${tools.getHostName()}.cli`;
            obj.ts = Date.now();
            this.objects.setObject(obj._id, obj, err => {
                return tools.maybeCallbackWithError(callback, err);
            });
        });
    }

    /**
     * Add new group
     *
     * @param group groupname
     */
    async addGroup(group: string): Promise<void> {
        const _group = group.replace(/\s/g, '_');
        const obj = await this.objects.getObject(`system.group.${_group}`);
        if (obj) {
            throw new Error('Group yet exists');
        } else {
            // TODO: shoudln't it have some default acl? TS is worrying
            await this.objects.setObject(`system.group.${_group}`, {
                type: 'group',
                common: {
                    name: group,
                    enabled: true,
                    members: [],
                },
                from: `system.host.${tools.getHostName()}.cli`,
                ts: Date.now(),
                native: {},
            } as any);
        }
    }

    /**
     * Remove group
     *
     * @param group groupname
     * @param callback
     */
    delGroup(group: string, callback: ioBroker.ErrorCallback): void {
        const _group = group.replace(/\s/g, '_');

        if (group === 'administrator') {
            return tools.maybeCallbackWithError(callback, 'Group "administrator" cannot be deleted');
        }
        this.objects.getObject(`system.group.${_group}`, (err, obj) => {
            if (!obj) {
                return tools.maybeCallbackWithError(callback, 'Group does not exists');
            }
            this.objects.delObject(`system.group.${_group}`, err => {
                return tools.maybeCallbackWithError(callback, err);
            });
        });
    }

    /**
     * Remove user from given group
     *
     * @param username name of the user which will be removed from group
     * @param groupName name of the group user will be removed from
     * @param callback
     */
    removeUserFromGroup(username: string, groupName: string, callback: ioBroker.ErrorCallback): void {
        const _group = groupName.replace(/\s/g, '_');
        this.objects.getObject(`system.group.${_group}`, (err, obj) => {
            if (!obj) {
                return tools.maybeCallbackWithError(callback, 'Group does not exists');
            }
            const pos = obj.common.members.indexOf(`system.user.${username}`);
            if (pos === -1) {
                return tools.maybeCallbackWithError(callback, 'User not in group');
            }
            obj.common.members.splice(pos, 1);
            obj.from = `system.host.${tools.getHostName()}.cli`;
            obj.ts = Date.now();
            this.objects.setObject(obj._id, obj, err => {
                return tools.maybeCallbackWithError(callback, err);
            });
        });
    }
}
