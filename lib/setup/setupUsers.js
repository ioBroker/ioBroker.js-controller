function Users(options) {
    var fs = require('fs');
    var tools = require(__dirname + '/../tools.js');

    var that = this;

    options = options || {};

    if (!options.objects)     throw "Invalid arguments: objects is missing";
    if (!options.processExit) throw "Invalid arguments: processExit is missing";

    var objects = options.objects;
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
                        enabled: true,
                        groups: []
                    }
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
                objects.setObject('system.user.' + _user, obj, function (err) {
                    if (typeof callback === 'function') callback(err);
                });
            });
        });

    };

    this.delUser = function (user, callback) {
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
                                        var pos = groups.rows[g].value.common.members.indexOf('system.user.' + _user);
                                        groups.rows[i].value.common.members.splice(pos, 1);
                                        count++;
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

        objects.getObject('system.user.' + _user, function (err, obj) {
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

                if (obj.common.members.indexOf('system.user.' + _user) == -1) {
                    obj.common.members.push('system.user.' + _user);
                    objects.setObject(group, obj, function (err) {
                        callback(err);
                    });
                } else {
                    callback();
                }
            });
        });
    };
}

module.exports = Users;