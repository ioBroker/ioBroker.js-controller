/**
 *
 *      password hash and check
 *
 *      7'2014-2016 Bluefox <dogafox@gmail.com>
 *             2014 hobbyquaker <hq@ccu.io>
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

/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';

const crypto  = require('crypto');
let   version = null;

const password = pw => {
    return {
        hash: (salt, iterations, callback) => {

            salt = salt || crypto.randomBytes(16).toString('hex');
            iterations = iterations || 10000;

            // version 0.10 has no 'sha256' and this option must be ignored
            if (version === null) {
                version = process.version.replace('v', '');
                version = !version.match(/^0\.10\./);
            }

            if (version) {
                crypto.pbkdf2(pw, salt, iterations, 256, 'sha256', (err, key) => {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, `pbkdf2$${iterations}$${key.toString('hex')}$${salt}`);
                });
            } else {
                crypto.pbkdf2(pw, salt, iterations, 64, 'sha1', (err, key) => {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, `pbkdf2$${iterations}$${key.toString('hex')}$${salt}`);
                });

            }
        },
        check: function (hashedPassword, callback) {
            if (!hashedPassword || !password) {
                return callback(null, false);
            }
            const key = hashedPassword.split('$');
            if (key.length !== 4 || !key[2] || !key[3]) {
                return callback('Hash not formatted correctly');
            }
            if (key[0] !== 'pbkdf2') {
                return callback('Unknown');
            }

            this.hash(key[3], parseInt(key[1], 10), function (error, newHash) {
                if (error) {
                    return callback(error);
                }
                callback(null, newHash === hashedPassword);
            });

        },
        complexity: _callback => {
            // Todo: Check for password complexity
            return true;
        }
    };
};

module.exports = password;