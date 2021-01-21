/**
 *      Show users and groups
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function Users(options) {
    const tools = require('../tools');

    const that  = this;

    options   = options || {};

    if (!options.objects)     {
        throw new Error('Invalid arguments: objects is missing');
    }
    if (!options.processExit) {
        throw new Error('Invalid arguments: processExit is missing');
    }

    const objects     = options.objects;
    const processExit = options.processExit;
    const EXIT_CODES  = require('../exitCodes');

    this.addUser = function (user, pw, callback) {
        // user id's should be case insensitive
        const _user = user.replace(/\s/g, '_').toLowerCase();
        objects.getObject('system.user.' + _user, (err, obj) => {
            if (obj) {
                callback && callback('User yet exists');
            } else {
                objects.setObject('system.user.' + _user, {
                    type: 'user',
                    common: {
                        name: user,
                        enabled: true
                    },
                    from: 'system.host.' + tools.getHostName() + '.cli',
                    ts: Date.now(),
                    native: {}
                }, err => {
                    if (!err) {
                        that.setPassword(user, pw, callback);
                    } else {
                        typeof callback === 'function' && callback(err);
                    }
                });
            }
        });
    };

    this.isUser = function (user, callback) {
        const _user = user.replace(/\s/g, '_').toLowerCase();
        objects.getObject('system.user.' + _user, (err, obj) => typeof callback === 'function' && callback(null, !!obj));
    };

    this.setPassword = function (user, pw, callback) {
        const _user = user.replace(/\s/g, '_').toLowerCase();

        objects.getObject('system.user.' + _user, (err, obj) => {
            if (err || !obj) {
                if (typeof callback === 'function') {
                    callback('User does not exist');
                }
                return;
            }
            const password = require('../password');

            password(pw).hash(null, null, (err, res) => {
                if (err) {
                    if (typeof callback === 'function') {
                        callback(err);
                    }
                    return;
                }
                obj.common.password = res;
                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                obj.ts = Date.now();
                objects.setObject('system.user.' + _user, obj, err => (typeof callback === 'function') && callback(err));
            });
        });
    };

    this.checkPassword = function (user, pw, callback) {
        const _user = user.replace(/\s/g, '_').toLowerCase();

        objects.getObject(`system.user.${_user}`, (err, obj) => {
            if (err || !obj) {
                if (typeof callback === 'function') {
                    callback('User does not exist');
                }
                return;
            }
            const password = require('../password');

            password(pw).check(obj.common.password, (err, res) =>
                typeof callback === 'function' && callback(err, res));
        });
    };

    this.delUser = function (user, callback) {
        if (!user) {
            typeof callback === 'function' && callback('Please define user name, like: "userdel user"');
            return;
        }

        const _user = user.replace(/\s/g, '_').toLowerCase();

        objects.getObject('system.user.' + _user, (err, obj) => {
            if (err || !obj) {
                typeof callback === 'function' && callback('User does not exist');
            } else {
                if (obj.common.dontDelete) {
                    typeof callback === 'function' && callback('Cannot delete user, while is system user');
                } else {
                    objects.delObject('system.user.' + _user, err => {
                        // Remove this user from all groups
                        if (!err) {
                            objects.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, (err, groups) => {
                                let count = 0;
                                for (let i = 0; i < groups.rows.length; i++) {
                                    if (groups.rows[i].value.type !== 'group') {
                                        continue;
                                    }
                                    // find all groups
                                    if (groups.rows[i].value.common.members && groups.rows[i].value.common.members.indexOf('system.user.' + _user) !== -1) {
                                        const pos = groups.rows[i].value.common.members.indexOf('system.user.' + _user);
                                        groups.rows[i].value.common.members.splice(pos, 1);
                                        count++;
                                        groups.rows[i].value.from = 'system.host.' + tools.getHostName() + '.cli';
                                        groups.rows[i].value.ts = Date.now();
                                        objects.setObject(groups.rows[i].value._id, groups.rows[i].value, err =>
                                            !(--count) && callback(err));
                                    }
                                }
                                if (!count) {
                                    callback();
                                }
                            });
                        } else if (callback) {
                            callback(err);
                        }
                    });
                }
            }
        });
    };

    this.addUserToGroup = function (user, group, callback) {
        let _user = user.replace(/\s/g, '_').toLowerCase();
        if (!group.match(/^system\.group\./)) {
            group = 'system.group.' + group;
        }
        if (!_user.match(/^system\.user\./)) {
            _user = 'system.user.' + _user;
        }

        objects.getObject(_user, (err, obj) => {
            if (err || !obj) {
                if (typeof callback === 'function') {
                    callback('User does not exist');
                }
                return;
            }
            objects.getObject(group, (err, obj) => {
                if (err || !obj) {
                    if (typeof callback === 'function') {
                        callback('Group does not exist');
                    }
                    return;
                }
                obj.common = obj.common || {};
                obj.common.members = obj.common.members || [];

                if (obj.common.members.indexOf(_user) === -1) {
                    obj.common.members.push(_user);
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();
                    objects.setObject(group, obj, err => callback(err));
                } else {
                    callback();
                }
            });
        });
    };

    this.addUserPrompt = function (user, group, password, callback) {
        if (!user) {
            typeof callback === 'function' && callback('Please define user name, like: "adduser newUser"');
            return;
        }

        // Check group
        if (group.substring(0, 13) !== 'system.group.' ) {
            group = 'system.group.' + group;
        }

        objects.getObject(group, function (err, obj) {
            if (!obj) {
                typeof callback === 'function' && callback('Unknown group: ' + group);
                return;
            }
            if (!password) {
                const prompt = require('prompt');
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
                            processExit(EXIT_CODES.INVALID_PASSWORD);
                        }
                        //create user
                        that.addUser(user, result.password, err => {
                            if (err) {
                                typeof callback === 'function' && callback(err);
                            } else {
                                that.addUserToGroup(user, group, err => {
                                    if (err) {
                                        typeof callback === 'function' && callback(err);
                                    } else {
                                        typeof callback === 'function' && callback();
                                    }
                                });
                            }
                        });
                    } else {
                        typeof callback === 'function' && callback(err);
                    }
                });
            } else {
                that.addUser(user, password, err => {
                    if (err) {
                        typeof callback === 'function' && callback(err);
                    } else {
                        that.addUserToGroup(user, group, err => {
                            if (err) {
                                typeof callback === 'function' && callback(err);
                            } else {
                                typeof callback === 'function' && callback();
                            }
                        });
                    }
                });
            }
        });
    };

    this.setUserPassword = function (user, password, callback) {
        if (!user) {
            typeof callback === 'function' && callback('Please define user name, like: "passwd username"');
            return;
        }

        this.isUser(user, (err, result) => {
            if (err) {
                console.error('Cannot read user: ' + err);
            }
            if (!result) {
                typeof callback === 'function' && callback('User "' + user + '" does not exist.');
            } else {
                // Check group
                if (!password) {
                    const prompt = require('prompt');
                    prompt.message   = '';
                    prompt.delimiter = '';
                    const schema = {
                        properties: {
                            password: {
                                description: 'Enter your password:',
                                pattern:     /^[^'"]*$/,
                                message:     'No " are allowed',
                                hidden:      true
                            },
                            repeatPassword: {
                                description: 'Repeat your password:',
                                pattern:     /^[^'"]*$/,
                                message:     'No " are allowed',
                                hidden:      true
                            }
                        }
                    };
                    prompt.start();

                    prompt.get(schema, (err, result) => {
                        if (result) {
                            if (result.password !== result.repeatPassword) {
                                typeof callback === 'function' && callback('Passwords are not identical!');
                                return;
                            }
                            // set user password
                            that.setPassword(user, result.password, err => {
                                if (err) {
                                    typeof callback === 'function' && callback(err);
                                } else {
                                    typeof callback === 'function' && callback();
                                }
                            });
                        } else {
                            typeof callback === 'function' && callback('No password entered!');
                        }
                    });
                } else {
                    that.setPassword(user, password, err => {
                        if (err) {
                            typeof callback === 'function' && callback(err);
                        } else {
                            typeof callback === 'function' && callback();
                        }
                    });
                }
            }
        });
    };

    this.enableUser = function (user, enable, callback) {
        if (!user) {
            typeof callback === 'function' && callback('Please define user name, like: "enable username"');
            return;
        }
        if (user.match(/^system\.user\./)) {
            user = user.substring('system.user.'.length);
        }

        if (user === 'admin' && !enable) {
            typeof callback === 'function' && callback('User admin cannot be disabled');
            return;
        }

        objects.getObject(`system.user.${user}`, (err, obj) => {
            if (err) {
                typeof callback === 'function' && callback('Cannot read user: ' + err);
            } if (!obj) {
                typeof callback === 'function' && callback('User "' + user + '" not found');
            } else {
                obj.common.enabled = enable;
                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                obj.ts = Date.now();
                objects.setObject(obj._id, obj, err => {
                    if (typeof callback === 'function') {
                        callback(err);
                    }
                });
            }
        });
    };

    this.checkUserPassword = function (user, password, callback) {
        let prompt;
        let schema;
        if (!user && !password) {
            prompt = require('prompt');
            prompt.message   = '';
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
                        typeof callback === 'function' && callback(`Password for user "${result.username}" does not match${err ? ': ' + err : ''}`);
                    } else {
                        typeof callback === 'function' && callback(null);
                    }
                });
            });
        } else if (!password) {
            prompt = require('prompt');
            prompt.message   = '';
            prompt.delimiter = '';
            schema = {
                properties: {
                    password: {
                        description: 'Enter current password:',
                        pattern:  /^[^'"]+$/,
                        message: 'No " are allowed',
                        hidden: true
                    }
                }
            };
            prompt.start();

            prompt.get(schema, (err, result) => {
                that.checkPassword(user, result.password, (err, res) => {
                    if (err || !res) {
                        typeof callback === 'function' && callback('Password for user "' + user + '" does not matched' + (err ? ': ' + err : ''));
                    } else {
                        typeof callback === 'function' && callback(null);
                    }
                });
            });
        } else{
            this.checkPassword(user, password, (err, res) => {
                if (err || !res) {
                    typeof callback === 'function' && callback('Password for user "' + user + '" does not matched' + (err ? ': ' + err : ''));
                } else {
                    typeof callback === 'function' && callback(null);
                }
            });
        }
    };

    this.getUser = function (user, callback) {
        objects.getObject('system.user.' + user, (err, obj) => {
            if (err) {
                typeof callback === 'function' && callback('Cannot read user: ' + err);
            } if (!obj) {
                typeof callback === 'function' && callback('User "' + user + '" not found');
            } else {
                typeof callback === 'function' && callback(null, obj.common.enabled);
            }
        });
    };

    this.getGroup = function (group, callback) {
        objects.getObject('system.group.' + group, (err, obj) => {
            if (err) {
                typeof callback === 'function' && callback('Cannot read group: ' + err);
            } if (!obj) {
                typeof callback === 'function' && callback('Group "' + group + '" not found');
            } else {
                typeof callback === 'function' && callback(null, obj.common.enabled, obj.common.members);
            }
        });
    };

    this.enableGroup = function (group, enable, callback) {
        if (!group) {
            typeof callback === 'function' && callback('Please define group name, like: "enable groupname"');
            return;
        }
        if (group.match(/^system\.group\./)) {
            group = group.substring('system.group.'.length);
        }

        if (group === 'administrator' && !enable) {
            typeof callback === 'function' && callback('Group "administrator" cannot be disabled');
            return;
        }

        objects.getObject('system.group.' + group, (err, obj) => {
            if (err) {
                typeof callback === 'function' && callback('Cannot read group: ' + err);
            } if (!obj) {
                typeof callback === 'function' && callback('Group "' + group + '" not found');
            } else {
                obj.common.enabled = enable;
                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                obj.ts = Date.now();
                objects.setObject(obj._id, obj, err => {
                    if (typeof callback === 'function') {
                        callback(err);
                    }
                });
            }
        });
    };

    this.addGroup = function (group, callback) {
        const _group = group.replace(/\s/g, '_');
        objects.getObject('system.group.' + _group, (err, obj) => {
            if (obj) {
                typeof callback === 'function' && callback('Group yet exists');
            } else {
                objects.setObject('system.group.' + _group, {
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
                err => typeof callback === 'function' && callback(err)
                );
            }
        });
    };

    this.delGroup = function (group, callback) {
        const _group = group.replace(/\s/g, '_');

        if (group === 'administrator') {
            if (typeof callback === 'function') {
                callback('Group "administrator" cannot be deleted');
            }
        } else {
            objects.getObject('system.group.' + _group, (err, obj) => {
                if (!obj) {
                    typeof callback === 'function' && callback('Group does not exists');
                } else {
                    objects.delObject('system.group.' + _group, err => (typeof callback === 'function') && callback(err));
                }
            });
        }
    };

    this.removeUserFromGroup = function (user, group, callback) {
        const _group = group.replace(/\s/g, '_');
        objects.getObject('system.group.' + _group, (err, obj) => {
            if (!obj) {
                typeof callback === 'function' && callback('Group does not exists');
            } else {
                const pos = obj.common.members.indexOf('system.user.' + user);
                if (pos === -1) {
                    if (typeof callback === 'function') {
                        callback('User not in group');
                    }
                } else {
                    obj.common.members.splice(pos, 1);
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();
                    objects.setObject(obj._id, obj, err => typeof callback === 'function' && callback(err));
                }
            }
        });
    };
}

module.exports = Users;
