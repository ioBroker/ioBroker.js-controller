import { password, tools, EXIT_CODES } from '@iobroker/js-controller-common';
import type { ProcessExitCallback } from "../_Types";
import type { Client as ObjectsRedisClient } from "@iobroker/db-objects-redis";
import prompt from 'prompt';

export interface CLIUsersOptions {
    processExit: ProcessExitCallback;
    objects: ObjectsRedisClient;
}

class Users {
    private objects: ObjectsRedisClient;
    private processExit: ProcessExitCallback;

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
    addUser(user: string, pw: string, callback) {
        // user id's should be case insensitive
        const _user = user.replace(/\s/g, '_').toLowerCase();
        this.objects.getObject('system.user.' + _user, (err, obj) => {
            if (obj) {
                return tools.maybeCallbackWithError(callback, 'User yet exists');
            } else {
                this.objects.setObject(
                    `system.user.${_user}`,
                    {
                        type: 'user',
                        common: {
                            name: user,
                            enabled: true
                        },
                        from: 'system.host.' + tools.getHostName() + '.cli',
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
    };

    /**
     * Checks if user exists
     *
     * @param user username
     * @param callback
     */
    isUser(user: string, callback: (err: null, exists: boolean) => void) {
        const _user = user.replace(/\s/g, '_').toLowerCase();
        this.objects.getObject(`system.user.${_user}`, (err, obj) => {
            return tools.maybeCallbackWithError(callback, null, !!obj);
        });
    };

    /**
     * Set password for specific user
     *
     * @param user username
     * @param pw password
     * @param callback
     */
    setPassword(user: string, pw: string, callback) {
        const _user = user.replace(/\s/g, '_').toLowerCase();

        this.objects.getObject(`system.user.${_user}`, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(callback, 'User does not exist');
            }

            password(pw).hash(null, null, (err, res) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                obj.common.password = res;
                obj.from = `system.host.${tools.getHostName()}.cli`;
                obj.ts = Date.now();
                this.objects.setObject(`system.user.${_user}`, obj, err => {
                    return tools.maybeCallbackWithError(callback, err);
                });
            });
        });
    };

    /**
     * Checks if password is correct for given user
     *
     * @param user username
     * @param pw password
     * @param callback
     */
    checkPassword(user: string, pw: string, callback: (err?: Error | null, res: any) => void) {
        const _user = user.replace(/\s/g, '_').toLowerCase();

        this.objects.getObject(`system.user.${_user}`, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(callback, 'User does not exist');
            }

            password(pw).check(obj.common.password, (err, res) => {
                return tools.maybeCallbackWithError(callback, err, res);
            });
        });
    };

    /**
     * Deletes user from system
     *
     * @param user username
     * @param callback
     */
    delUser(user: string, callback): void {
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
                                    if (! groups) {
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
                                }
                            );
                        } else {
                            return tools.maybeCallbackWithError(callback, err);
                        }
                    });
                }
            }
        });
    };

    /**
     * Adds user to given group
     *
     * @param user username
     * @param group groupname
     * @param callback
     */
    addUserToGroup(user: string, group: string, callback) {
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
    };

    /**
     * Add user via CLI prompt
     *
     * @param user username
     * @param group groupname
     * @param password user password
     * @param callback
     */
    addUserPrompt(user: string, group: string, password: string, callback) {
        if (!user) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "adduser newUser"');
        }

        // Check group
        if (group.substring(0, 13) !== 'system.group.') {
            group = `system.group.${group}`;
        }

        this.objects.getObject(group,  (err, obj) => {
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
                        //create user
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
    };

    /**
     * Set password of user
     *
     * @param user username
     * @param password password of user
     * @param callback
     */
    setUserPassword(user: string, password: string, callback) {
        if (!user) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "passwd username"');
        }

        this.isUser(user, (err, result) => {
            if (err) {
                console.error(`Cannot read user: ${err}`);
            }
            if (!result) {
                return tools.maybeCallbackWithError(callback, `User "${user}" does not exist.`);
            } else {
                // Check group
                if (!password) {
                    const prompt = require('prompt');
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
                            // set user password
                            that.setPassword(user, result.password, err => {
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
                    that.setPassword(user, password, err => {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        } else {
                            return tools.maybeCallback(callback);
                        }
                    });
                }
            }
        });
    };

    this.enableUser = function (user, enable, callback) {
        if (!user) {
            return tools.maybeCallbackWithError(callback, 'Please define user name, like: "enable username"');
        }
        if (user.startsWith('system.user.')) {
            user = user.substring('system.user.'.length);
        }

        if (user === 'admin' && !enable) {
            return tools.maybeCallbackWithError(callback, 'User admin cannot be disabled');
        }

        objects.getObject(`system.user.${user}`, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read user: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `User "${user}" not found`);
            } else {
                obj.common.enabled = enable;
                obj.from = `system.host.${tools.getHostName()}.cli`;
                obj.ts = Date.now();
                objects.setObject(obj._id, obj, err => {
                    return tools.maybeCallbackWithError(callback, err);
                });
            }
        });
    };

    this.checkUserPassword = function (user, password, callback) {
        let prompt;
        let schema;
        if (!user && !password) {
            prompt = require('prompt');
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
                that.checkPassword(result.username, result.password, (err, res) => {
                    if (err || !res) {
                        return tools.maybeCallbackWithError(
                            callback,
                            `Password for user "${result.username}" does not match${err ? ': ' + err : ''}`
                        );
                    } else {
                        return tools.maybeCallbackWithError(callback, null);
                    }
                });
            });
        } else if (!password) {
            prompt = require('prompt');
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
                that.checkPassword(user, result.password, (err, res) => {
                    if (err || !res) {
                        return tools.maybeCallbackWithError(
                            callback,
                            'Password for user "' + user + '" does not matched' + (err ? ': ' + err : '')
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
    };

    this.getUser = function (user, callback) {
        objects.getObject(`system.user.${user}`, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read user: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `User "${user}" not found`);
            } else {
                return tools.maybeCallbackWithError(callback, null, obj.common.enabled);
            }
        });
    };

    this.getGroup = function (group, callback) {
        objects.getObject(`system.group.${group}`, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read group: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `Group "${group}" not found`);
            } else {
                return tools.maybeCallbackWithError(callback, null, obj.common.enabled, obj.common.members);
            }
        });
    };

    this.enableGroup = function (group, enable, callback) {
        if (!group) {
            return tools.maybeCallbackWithError(callback, 'Please define group name, like: "enable groupname"');
        }
        if (group.startsWith('system.group.')) {
            group = group.substring('system.group.'.length);
        }

        if (group === 'administrator' && !enable) {
            return tools.maybeCallbackWithError(callback, 'Group "administrator" cannot be disabled');
        }

        objects.getObject('system.group.' + group, (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, `Cannot read group: ${err.message}`);
            }
            if (!obj) {
                return tools.maybeCallbackWithError(callback, `Group "${group}" not found`);
            } else {
                obj.common.enabled = enable;
                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                obj.ts = Date.now();
                objects.setObject(obj._id, obj, err => {
                    return tools.maybeCallbackWithError(callback, err);
                });
            }
        });
    };

    this.addGroup = function (group, callback) {
        const _group = group.replace(/\s/g, '_');
        objects.getObject('system.group.' + _group, (err, obj) => {
            if (obj) {
                return tools.maybeCallbackWithError(callback, 'Group yet exists');
            } else {
                objects.setObject(
                    'system.group.' + _group,
                    {
                        type: 'group',
                        common: {
                            name: group,
                            enabled: true,
                            members: []
                        },
                        from: 'system.host.' + tools.getHostName() + '.cli',
                        ts: Date.now(),
                        native: {}
                    },
                    err => {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                );
            }
        });
    };

    this.delGroup = function (group, callback) {
        const _group = group.replace(/\s/g, '_');

        if (group === 'administrator') {
            return tools.maybeCallbackWithError(callback, 'Group "administrator" cannot be deleted');
        } else {
            objects.getObject('system.group.' + _group, (err, obj) => {
                if (!obj) {
                    return tools.maybeCallbackWithError(callback, 'Group does not exists');
                } else {
                    objects.delObject(`system.group.${_group}`, err => {
                        return tools.maybeCallbackWithError(callback, err);
                    });
                }
            });
        }
    };

    this.removeUserFromGroup = function (user, group, callback) {
        const _group = group.replace(/\s/g, '_');
        objects.getObject('system.group.' + _group, (err, obj) => {
            if (!obj) {
                return tools.maybeCallbackWithError(callback, 'Group does not exists');
            } else {
                const pos = obj.common.members.indexOf(`system.user.${user}`);
                if (pos === -1) {
                    return tools.maybeCallbackWithError(callback, 'User not in group');
                } else {
                    obj.common.members.splice(pos, 1);
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();
                    objects.setObject(obj._id, obj, err => {
                        return tools.maybeCallbackWithError(callback, err);
                    });
                }
            }
        });
    };
}

module.exports = Users;
