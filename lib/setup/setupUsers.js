'use strict';

function Users(options) {
    var fs    = require('fs');
    var tools = require(__dirname + '/../tools.js');

    var that  = this;

    options   = options || {};

    if (!options.objects)     throw 'Invalid arguments: objects is missing';
    if (!options.processExit) throw 'Invalid arguments: processExit is missing';

    var objects     = options.objects;
    var processExit = options.processExit;

    this.addUser = function (user, pw, callback) {
        var _user = user.replace(/\s/g, '_');
        objects.getObject('system.user.' + _user, function (err, obj) {
            if (obj) {
                if (callback) callback('User yet exists');
            } else {
                objects.setObject('system.user.' + _user, {
                    type: 'user',
                    common: {
                        name: user,
                        enabled: true
                    },
                    from: 'system.host.' + tools.getHostName() + '.cli',
                    ts: new Date().getTime(),
                    native: {}
                }, function (err) {
                    if (!err) {
                        that.setPassword(user, pw, callback);
                    } else {
                        if (typeof callback === 'function') callback(err);
                    }
                });
            }
        });
    };

    this.isUser = function (user, callback) {
        var _user = user.replace(/\s/g, '_');
        objects.getObject('system.user.' + _user, function (err, obj) {
            if (callback) callback(null, !!obj);
        });
    };

    this.setPassword = function (user, pw, callback) {
        var _user = user.replace(/\s/g, '_');

        objects.getObject('system.user.' + _user, function (err, obj) {
            if (err || !obj) {
                if (typeof callback === 'function') callback('User does not exist');
                return;
            }
            var password = require(__dirname + '/../password');

            password(pw).hash(null, null, function (err, res) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                    return;
                }
                obj.common.password = res;
                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                obj.ts = new Date().getTime();
                objects.setObject('system.user.' + _user, obj, function (err) {
                    if (typeof callback === 'function') callback(err);
                });
            });
        });
    };
    
    this.checkPassword = function (user, pw, callback) {
        objects.getObject('system.user.' + user, function (err, obj) {
            if (err || !obj) {
                if (typeof callback === 'function') callback('User does not exist');
                return;
            }
            var password = require(__dirname + '/../password');

            password(pw).check(obj.common.password, function (err, res) {
                if (typeof callback === 'function') callback(err, res);
            });
        });
    };

    this.delUser = function (user, callback) {
        if (!user) {
            if (callback) callback('Please define user name, like: "userdel user"');
            return;
        }

        var _user = user.replace(/\s/g, '_');

        objects.getObject('system.user.' + _user, function (err, obj) {
            if (err || !obj) {
                if (callback) callback('User does not exist');
            } else {
                if (obj.common.dontDelete) {
                    if (callback) callback('Cannot delete user, while is system user');
                } else {
                    objects.delObject('system.user.' + _user, function (err) {
                        // Remove this user from all groups
                        if (!err) {
                            objects.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, function (err, groups) {
                                var count = 0;
                                for (var i = 0; i < groups.rows.length; i++) {
                                    if (groups.rows[i].value.type != 'group') continue;
                                    // find all groups
                                    if (groups.rows[i].value.common.members && groups.rows[i].value.common.members.indexOf('system.user.' + _user) != -1) {
                                        var pos = groups.rows[i].value.common.members.indexOf('system.user.' + _user);
                                        groups.rows[i].value.common.members.splice(pos, 1);
                                        count++;
                                        groups.rows[i].value.from = 'system.host.' + tools.getHostName() + '.cli';
                                        groups.rows[i].value.ts = new Date().getTime();
                                        objects.setObject(groups.rows[i].value._id, groups.rows[i].value, function (err) {
                                            if (!(--count)) callback(err);
                                        });
                                    }
                                }
                                if (!count) callback();
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
        var _user = user.replace(/\s/g, '_');
        if (!group.match(/^system\.group\./)) group = 'system.group.' + group;
        if (!_user.match(/^system\.user\./)) _user = 'system.user.' + _user;

        objects.getObject(_user, function (err, obj) {
            if (err || !obj) {
                if (typeof callback === 'function') callback('User does not exist');
                return;
            }
            objects.getObject(group, function (err, obj) {
                if (err || !obj) {
                    if (typeof callback === 'function') callback('Group does not exist');
                    return;
                }
                obj.common = obj.common || {};
                obj.common.members = obj.common.members || [];

                if (obj.common.members.indexOf(_user) == -1) {
                    obj.common.members.push(_user);
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = new Date().getTime();
                    objects.setObject(group, obj, function (err) {
                        callback(err);
                    });
                } else {
                    callback();
                }
            });
        });
    };

    this.addUserPrompt = function (user, group, password, callback) {
        if (!user) {
            if (callback) callback('Please define user name, like: "adduser newUser"');
            return;
        }

        // Check group
        if (group.substring(0, 13) !== 'system.group.' ) group = 'system.group.' + group;

        objects.getObject(group, function (err, obj) {
            if (!obj) {
                if (callback) callback('Unknown group: ' + group);
                return;
            }
            if (!password) {
                var prompt = require('prompt');
                prompt.message = '';
                prompt.delimiter = '';
                var schema = {
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

                prompt.get(schema, function (err, result) {
                    if (result) {
                        if (result.password !== result.repeatPassword) {
                            console.log('Passwords are not identical!');
                            processExit(31);
                        }
                        //create user
                        that.addUser(user, result.password, function (err) {
                            if (err) {
                                if (callback) callback(err);
                            } else {
                                that.addUserToGroup(user, group, function (err) {
                                    if (err) {
                                        if (callback) callback(err);
                                    } else {
                                        if (callback) callback();
                                    }
                                });
                            }
                        });
                    } else {
                        if (callback) callback(err);
                    }
                });
            } else {
                that.addUser(user, password, function (err) {
                    if (err) {
                        if (callback) callback(err);
                    } else {
                        that.addUserToGroup(user, group, function (err) {
                            if (err) {
                                if (callback) callback(err);
                            } else {
                                if (callback) callback();
                            }
                        });
                    }
                });
            }
        });
    };

    this.setUserPassword = function (user, password, callback) {
        if (!user) {
            if (callback) callback('Please define user name, like: "passwd username"');
            return;
        }

        this.isUser(user, function (err, result) {
            if (err) console.error('Cannot read user: ' + err);
            if (!result) {
                if (callback) callback('User "' + user + '" does not exist.');
            } else {
                // Check group
                if (!password) {
                    var prompt = require('prompt');
                    prompt.message   = '';
                    prompt.delimiter = '';
                    var schema = {
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

                    prompt.get(schema, function (err, result) {
                        if (result) {
                            if (result.password !== result.repeatPassword) {
                                if (callback) callback('Passwords are not identical!');
                                return;
                            }
                            // set user password
                            that.setPassword(user, result.password, function (err) {
                                if (err) {
                                    if (callback) callback(err);
                                } else {
                                    if (callback) callback();
                                }
                            });
                        } else {
                            if (callback) callback('No password entered!');
                        }
                    });
                } else {
                    that.setPassword(user, password, function (err) {
                        if (err) {
                            if (callback) callback(err);
                        } else {
                            if (callback) callback();
                        }
                    });
                }
            }
        });
    };

    this.enableUser = function (user, enable, callback) {
        if (!user) {
            if (callback) callback('Please define user name, like: "enable username"');
            return;
        }
        if (user && user.match(/^system\.user\./)) user = user.substring('system.user.'.length);

        if (user === 'admin' && !enable) {
            if (callback) callback('User admin cannot be disabled');
            return;
        }

        objects.getObject('system.user.' + user, function (err, obj) {
            if (err) {
                if (callback) callback('Cannot read user: ' + err);
            } if (!obj) {
                if (callback) callback('User "' + user + '" not found');
            } else {
                obj.common.enabled = enable;
                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                obj.ts = new Date().getTime();
                objects.setObject(obj._id, obj, function (err) {
                    if (typeof callback === 'function') callback(err);
                });
            }
        });
    };

    this.checkUserPassword = function (user, password, callback) {
        var prompt;
        var schema;
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

            prompt.get(schema, function (err, result) {
                that.checkPassword(result.username, result.password, function (err, res) {
                    if (err || !res) {
                        if (callback) callback('Password for user "' + result.username + '" does not matched' + (err ? ': ' + err : ''));
                    } else {
                        if (callback) callback(null);
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

            prompt.get(schema, function (err, result) {
                that.checkPassword(user, result.password, function (err, res) {
                    if (err || !res) {
                        if (callback) callback('Password for user "' + user + '" does not matched' + (err ? ': ' + err : ''));
                    } else {
                        if (callback) callback(null);
                    }
                });
            });
        } else{
            this.checkPassword(user, password, function (err, res) {
                if (err || !res) {
                    if (callback) callback('Password for user "' + user + '" does not matched' + (err ? ': ' + err : ''));
                } else {
                    if (callback) callback(null);
                }
            });
        }
    };
    
    this.getUser = function (user, callback) {
        objects.getObject('system.user.' + user, function (err, obj) {
            if (err) {
                if (callback) callback('Cannot read user: ' + err);
            } if (!obj) {
                if (callback) callback('User "' + user + '" not found');
            } else {
                if (callback) callback(null, obj.common.enabled);
            }
        });
    };

    this.getGroup = function (group, callback) {
        objects.getObject('system.group.' + group, function (err, obj) {
            if (err) {
                if (callback) callback('Cannot read group: ' + err);
            } if (!obj) {
                if (callback) callback('Group "' + group + '" not found');
            } else {
                if (callback) callback(null, obj.common.enabled, obj.common.members);
            }
        });
    };

    this.enableGroup = function (group, enable, callback) {
        if (!group) {
            if (callback) callback('Please define group name, like: "enable groupname"');
            return;
        }
        if (group && group.match(/^system\.group\./)) group = group.substring('system.group.'.length);

        if (group === 'administrator' && !enable) {
            if (callback) callback('Group "administrator" cannot be disabled');
            return;
        }

        objects.getObject('system.group.' + group, function (err, obj) {
            if (err) {
                if (callback) callback('Cannot read group: ' + err);
            } if (!obj) {
                if (callback) callback('Group "' + group + '" not found');
            } else {
                obj.common.enabled = enable;
                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                obj.ts = new Date().getTime();
                objects.setObject(obj._id, obj, function (err) {
                    if (typeof callback === 'function') callback(err);
                });
            }
        });
    };
    
    this.addGroup = function (group, callback) {
        var _group = group.replace(/\s/g, '_');
        objects.getObject('system.group.' + _group, function (err, obj) {
            if (obj) {
                if (callback) callback('Group yet exists');
            } else {
                objects.setObject('system.group.' + _group, {
                    type: 'group',
                    common: {
                        name: group,
                        enabled: true,
                        members: []
                    },
                    from: 'system.host.' + tools.getHostName() + '.cli',
                    ts: new Date().getTime(),
                    native: {}
                }, function (err) {
                    if (typeof callback === 'function') callback(err);
                });
            }
        });
    };
    
    this.delGroup = function (group, callback) {
        var _group = group.replace(/\s/g, '_');
        
        if (group === 'administrator') {
            if (typeof callback === 'function') callback('Group "administrator" cannot be deleted');
        } else {
            objects.getObject('system.group.' + _group, function (err, obj) {
                if (!obj) {
                    if (callback) callback('Group does not exists');
                } else {
                    objects.delObject('system.group.' + _group, function (err) {
                        if (typeof callback === 'function') callback(err);
                    });
                }
            });
        }
    };

    this.removeUserFromGroup = function (user, group, callback) {
        var _group = group.replace(/\s/g, '_');
        objects.getObject('system.group.' + _group, function (err, obj) {
            if (!obj) {
                if (callback) callback('Group does not exists');
            } else {
                var pos = obj.common.members.indexOf('system.user.' + user);
                if (pos === -1) {
                    if (typeof callback === 'function') callback('User not in group');
                } else {
                    obj.common.members.splice(pos, 1);
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = new Date().getTime();
                    objects.setObject(obj._id, obj, function (err) {
                        if (typeof callback === 'function') callback(err);
                    });
                }
            }
        });
    };
}

module.exports = Users;