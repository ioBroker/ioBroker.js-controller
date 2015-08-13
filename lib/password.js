/**
 *
 *      password hash and check
 *
 *      7'2014 hobbyquaker <hq@ccu.io>
 *
 *      derived from https://github.com/florianheinemann/password-hash-and-salt/ (MIT License)
 *
 *      The created hash is of the following format: <algorithm>$<iterations>$<hash>$<salt>
 *
 *      Usage Example:

 var password = require('./lib/password.js');

 password('test').hash(null, null, function (err, res) {
    console.log(res);

    password('test').check(res, function (err, res) {
        console.log('test: ' + res);
    });

    password('muh').check(res, function (err, res) {
        console.log('muh: ' + res);
    });

 });

 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
'use strict';

var crypto = require('crypto');

var password = function (pw) {

    return {
        hash: function (salt, iterations, callback) {

            salt = salt || crypto.randomBytes(16).toString('hex');
            iterations = iterations || 10000;

            crypto.pbkdf2(pw, salt, iterations, 64, function (err, key) {
                if (err) return callback(err);
                var res = 'pbkdf2$' + iterations +
                    '$' + key.toString('hex') +
                    '$' + salt;
                callback(null, res);
            });

        },
        check: function (hashedPassword, callback) {
            if (!hashedPassword || !password) return callback(null, false);
            var key = hashedPassword.split('$');
            if (key.length !== 4 || !key[2] || !key[3]) return callback('Hash not formatted correctly');
            if (key[0] !== 'pbkdf2') return callback('Unknown');

            this.hash(key[3], parseInt(key[1], 10), function (error, newHash) {
                if (error) return callback(error);
                callback(null, newHash === hashedPassword);
            });

        },
        complexity: function (callback) {
            // Todo: Check for password complexity
            return true;
        }
    };
};

module.exports = password;