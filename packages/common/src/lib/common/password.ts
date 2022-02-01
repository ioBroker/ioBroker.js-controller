/**
 *
 *      password hash and check
 *
 *      7'2014-2021 Bluefox <dogafox@gmail.com>
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

import * as crypto from 'crypto';
let versionOk: boolean;

export const password = (
    pw: string
): {
    complexity: (password: string, callback: (isComplex: boolean) => void) => boolean;
    check: (hashedPassword: string, callback: (err?: Error | null, isOk?: boolean) => void) => void;
    hash: (salt: string, iterations: number, callback: (err?: Error | null, hash?: string) => void) => void;
} => {
    return {
        hash: (salt: string, iterations: number, callback: (err?: Error | null, hash?: string) => void) => {
            salt = salt || crypto.randomBytes(16).toString('hex');
            iterations = iterations || 10000;

            // version 0.10 has no 'sha256' and this option must be ignored
            if (versionOk === undefined) {
                const version = process.version.replace('v', '');
                versionOk = !version.startsWith('0.10.');
            }

            if (versionOk) {
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
        check: function (hashedPassword: string, callback: (err?: Error | null, isOk?: boolean) => void) {
            if (!hashedPassword || !password) {
                return callback(null, false);
            }
            const key = hashedPassword.split('$');
            if (key.length !== 4 || !key[2] || !key[3]) {
                return callback(new Error('Hash not formatted correctly'));
            }
            if (key[0] !== 'pbkdf2') {
                return callback(new Error('Unknown'));
            }

            this.hash(key[3], parseInt(key[1], 10), (error, newHash) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, newHash === hashedPassword);
                }
            });
        },
        complexity: (password: string, callback: (isComplex: boolean) => void): boolean => {
            let result = false;
            if (typeof password === 'string') {
                result = !!(
                    password.length >= 8 && // minimum length is 8
                    password.match(/\d/) && // contains at least one digit
                    password.match(/[a-z]/) && // contains at least one lower case letter
                    password.match(/[A-Z]/)
                ); // contains at least one upper case letter
            }
            typeof callback === 'function' && callback(result);
            return result; // true if the complexity OK
        }
    };
};
