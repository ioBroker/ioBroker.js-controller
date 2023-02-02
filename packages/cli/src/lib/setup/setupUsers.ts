import { password, tools, EXIT_CODES } from '@iobroker/js-controller-common';
import type { ProcessExitCallback } from '../_Types';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import prompt from 'prompt';

export interface CLIUsersOptions {
    processExit: ProcessExitCallback;
    objects: ObjectsRedisClient;
}

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
     * @param user username
     * @param pw password
     * @param callback
     */
    addUser(user: string, pw: string, callback: ioBroker.ErrorCallback): void {
        // user id's should be case insensitive
        const _user = user.replace(/\s/g, '_').toLowerCase();
        this.objects.getObject(`system.user.${_user}`, (err, obj) => {
            if (obj) {
                return tools.maybeCallbackWithError(callback, 'User yet exists');
            } else {
                this.objects.setObject(
                    `system.user.${_user}`,
                    {
                        type: 'user',
                        common: {
                            name: user,
                            enabled: true,
                            password: ''
                        },
                        from: `system.host.${tools.getHostName()}.cli`,
                        ts: Date.now(),
                        native: {}
                    },
                    err => {
                        if (!err) {
                            this.setPassword(user, pw, callback);
                        } else {
                            return tools.maybeCallbackWithError(callback, err);
                        }
                    }
                );
            }
        });
    }

    /**
     * Checks if user exists
     *
     * @param user username
     */
    async isUser(user: string): Promise<boolean> {
        const _user = user.replace(/\s/g, '_').toLowerCase();
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
     * @param user username
     * @param pw password
     * @param callback
     */
    setPassword(user: string, pw: string, callback: ioBroker.ErrorCallback): void {
        const _user = user.replace(/\s/g, '_').toLowerCase();

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
     * @param user username
     * @param pw password
     * @param callback
     */
    checkPassword(user: string, pw: string, callback: (err?: Error | null, isOk?: boolean) => void): void {
        const _user = user.replace(/\s/g, '_').toLowerCase();

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
     * @param user username
     * @param callback
     */
    delUser(user: string, callback: ioBroker.ErrorCallback): void {
        if (!user) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "userdel user"');
        }

        const _user = user.replace(/\s/g, '_').toLowerCase();

        this.objects.getObject(`system.user.${_user}`, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(callback, 'User does not exist');
            } else {
                if (obj.common.dontDelete) {
                    return tools.maybeCallbackWithError(callback, 'Cannot delete user, while is system user');
                } else {
                    this.objects.delObject('system.user.' + _user, err => {
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
                                            groups.rows[i].value.common.members.indexOf('system.user.' + _user) !== -1
                                        ) {
                                            const pos = groups.rows[i].value.common.members.indexOf(
                                                'system.user.' + _user
                                            );
                                            groups.rows[i].value.common.members.splice(pos, 1);
                                            count++;
                                            groups.rows[i].value.from = 'system.host.' + tools.getHostName() + '.cli';
                                            groups.rows[i].value.ts = Date.now();
                                            this.objects.setObject(
                                                groups.rows[i].value._id,
                                                groups.rows[i].value,
                                                err => {
                                                    if (!--count) {
                                                        return tools.maybeCallbackWithError(callback, err);
                                                    }
                                                }
                                            );
                                        }
                                    }
                                    if (!count) {
                                        return tools.maybeCallback(callback);
                                    }
                                }
                            );
                        } else {
                            return tools.maybeCallbackWithError(callback, err);
                        }
                    });
                }
            }
        });
    }

    /**
     * Adds user to given group
     *
     * @param user username
     * @param group groupn6ame
     * @param callback
     */
    addUserToGroup(user: string, group: string, callback: ioBroker.ErrorCallback): void {
        let _user = user.replace(/\s/g, '_').toLowerCase();
        if (!group.startsWith('system.group.')) {
            group = `system.group.${group}`;
        }
        if (!_user.startsWith('system.user.')) {
            _user = `system.user.${_user}`;
        }

        this.objects.getObject(_user, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(callback, 'User does not exist');
            }
            this.objects.getObject(group, (err, obj) => {
                if (err || !obj) {
                    return tools.maybeCallbackWithError(callback, 'Group does not exist');
                }
                obj.common = obj.common || {};
                obj.common.members = obj.common.members || [];

                if (obj.common.members.indexOf(_user) === -1) {
                    obj.common.members.push(_user);
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();
                    this.objects.setObject(group, obj, err => {
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
     * @param user username
     * @param group groupname
     * @param password user password
     * @param callback
     */
    addUserPrompt(user: string, group: string, password: string, callback: ioBroker.ErrorCallback): void {
        if (!user) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "adduser newUser"');
        }

        // Check group
        if (group.substring(0, 13) !== 'system.group.') {
            group = `system.group.${group}`;
        }

        this.objects.getObject(group, (err, obj) => {
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `Unknown group: ${group}`);
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
                            hidden: true
                        },
                        repeatPassword: {
                            description: 'Repeat your password:',
                            pattern: /^[^'"]+$/,
                            message: 'No " are allowed',
                            hidden: true
                        }
                    }
                };
                prompt.start();

                prompt.get(schema, (err, result) => {
                    if (result) {
                        if (result.password !== result.repeatPassword) {
                            console.log('Passwords are not identical!');
                            return void this.processExit(EXIT_CODES.INVALID_PASSWORD);
                        }
                        // @ts-expect-error external types problem?
                        this.addUser(user, result.password, err => {
                            if (err) {
                                return tools.maybeCallbackWithError(callback, err);
                            } else {
                                this.addUserToGroup(user, group, err => {
                                    if (err) {
                                        return tools.maybeCallbackWithError(callback, err);
                                    } else {
                                        return tools.maybeCallback(callback);
                                    }
                                });
                            }
                        });
                    } else {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                });
            } else {
                this.addUser(user, password, err => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        this.addUserToGroup(user, group, err => {
                            if (err) {
                                return tools.maybeCallbackWithError(callback, err);
                            } else {
                                return tools.maybeCallback(callback);
                            }
                        });
                    }
                });
            }
        });
    }

    /**
     * Set password of user
     *
     * @param user username
     * @param password password of user
     * @param callback
     */
    async setUserPassword(user: string, password: string, callback: ioBroker.ErrorCallback): Promise<void> {
        if (!user) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "passwd username"');
        }

        const isExisting = await this.isUser(user);
        if (!isExisting) {
            return tools.maybeCallbackWithError(callback, `User "${user}" does not exist.`);
        } else {
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
                            hidden: true
                        },
                        repeatPassword: {
                            description: 'Repeat your password:',
                            pattern: /^[^'"]*$/,
                            message: 'No " are allowed',
                            hidden: true
                        }
                    }
                };
                prompt.start();

                prompt.get(schema, (err, result) => {
                    if (result) {
                        if (result.password !== result.repeatPassword) {
                            return tools.maybeCallbackWithError(callback, 'Passwords are not identical!');
                        }
                        // @ts-expect-error external types problem?
                        this.setPassword(user, result.password, err => {
                            if (err) {
                                return tools.maybeCallbackWithError(callback, err);
                            } else {
                                return tools.maybeCallback(callback);
                            }
                        });
                    } else {
                        return tools.maybeCallbackWithError(callback, 'No password entered!');
                    }
                });
            } else {
                this.setPassword(user, password, err => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        return tools.maybeCallback(callback);
                    }
                });
            }
        }
    }

    /**
     * Enable user
     * @param user username
     * @param enable true if it should be enabled else false
     * @param callback
     */
    enableUser(user: string, enable: boolean, callback: ioBroker.ErrorCallback): void {
        if (!user) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "enable username"');
        }
        if (user.startsWith('system.user.')) {
            user = user.substring('system.user.'.length);
        }

        if (user === 'admin' && !enable) {
            return tools.maybeCallbackWithError(callback, 'User admin cannot be disabled');
        }

        this.objects.getObject(`system.user.${user}`, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read user: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `User "${user}" not found`);
            } else {
                obj.common.enabled = enable;
                obj.from = `system.host.${tools.getHostName()}.cli`;
                obj.ts = Date.now();
                this.objects.setObject(obj._id, obj, err => {
                    return tools.maybeCallbackWithError(callback, err);
                });
            }
        });
    }

    /**
     * Check if user password is valid
     *
     * @param user username
     * @param password password to check
     * @param callback
     */
    checkUserPassword(user: string, password: string, callback: ioBroker.ErrorCallback): void {
        let schema;
        if (!user && !password) {
            prompt.message = '';
            prompt.delimiter = '';
            schema = {
                properties: {
                    username: {
                        description: 'Enter username to check password:',
                        pattern: /^[^'"]+$/,
                        message: 'No " are allowed',
                        hidden: false
                    },
                    password: {
                        description: 'Enter current password:',
                        pattern: /^[^'"]+$/,
                        message: 'No " are allowed',
                        hidden: true
                    }
                }
            };
            prompt.start();

            prompt.get(schema, (err, result) => {
                // @ts-expect-error external types problem?
                this.checkPassword(result.username, result.password, (err, res) => {
                    if (err || !res) {
                        return tools.maybeCallbackWithError(
                            callback,
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            `Password for user "${result.username}" does not match${err ? ': ' + err : ''}`
                        );
                    } else {
                        return tools.maybeCallbackWithError(callback, null);
                    }
                });
            });
        } else if (!password) {
            prompt.message = '';
            prompt.delimiter = '';
            schema = {
                properties: {
                    password: {
                        description: 'Enter current password:',
                        pattern: /^[^'"]+$/,
                        message: 'No " are allowed',
                        hidden: true
                    }
                }
            };
            prompt.start();

            prompt.get(schema, (err, result) => {
                // @ts-expect-error external types problem?
                this.checkPassword(user, result.password, (err, res) => {
                    if (err || !res) {
                        return tools.maybeCallbackWithError(
                            callback,
                            `Password for user "${user}" does not matched${err ? ': ' + err : ''}`
                        );
                    } else {
                        return tools.maybeCallbackWithError(callback, null);
                    }
                });
            });
        } else {
            this.checkPassword(user, password, (err, res) => {
                if (err || !res) {
                    return tools.maybeCallbackWithError(
                        callback,
                        'Password for user "' + user + '" does not matched' + (err ? ': ' + err : '')
                    );
                } else {
                    return tools.maybeCallbackWithError(callback, null);
                }
            });
        }
    }

    /**
     * Get user object
     *
     * @param user username
     * @param callback
     */
    getUser(user: string, callback: (err?: Error | null, enabled?: boolean) => void): void {
        this.objects.getObject(`system.user.${user}`, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read user: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `User "${user}" not found`);
            } else {
                return tools.maybeCallbackWithError(callback, null, obj.common.enabled);
            }
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
            } else {
                return tools.maybeCallbackWithError(callback, null, obj.common.enabled, obj.common.members);
            }
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
            } else {
                obj.common.enabled = enable;
                obj.from = `system.host.${tools.getHostName()}.cli`;
                obj.ts = Date.now();
                this.objects.setObject(obj._id, obj, err => {
                    return tools.maybeCallbackWithError(callback, err);
                });
            }
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
                    members: []
                },
                from: `system.host.${tools.getHostName()}.cli`,
                ts: Date.now(),
                native: {}
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
        } else {
            this.objects.getObject(`system.group.${_group}`, (err, obj) => {
                if (!obj) {
                    return tools.maybeCallbackWithError(callback, 'Group does not exists');
                } else {
                    this.objects.delObject(`system.group.${_group}`, err => {
                        return tools.maybeCallbackWithError(callback, err);
                    });
                }
            });
        }
    }

    /**
     * Remove user from given group
     *
     * @param user username
     * @param group groupname
     * @param callback
     */
    removeUserFromGroup(user: string, group: string, callback: ioBroker.ErrorCallback): void {
        const _group = group.replace(/\s/g, '_');
        this.objects.getObject(`system.group.${_group}`, (err, obj) => {
            if (!obj) {
                return tools.maybeCallbackWithError(callback, 'Group does not exists');
            } else {
                const pos = obj.common.members.indexOf(`system.user.${user}`);
                if (pos === -1) {
                    return tools.maybeCallbackWithError(callback, 'User not in group');
                } else {
                    obj.common.members.splice(pos, 1);
                    obj.from = `system.host.${tools.getHostName()}.cli`;
                    obj.ts = Date.now();
                    this.objects.setObject(obj._id, obj, err => {
                        return tools.maybeCallbackWithError(callback, err);
                    });
                }
            }
        });
    }
}
