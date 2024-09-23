/**
 *
 *      password hash and check
 *
 *      7'2014-2024 Bluefox <dogafox@gmail.com>
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

import crypto from 'node:crypto';

export interface PasswordReturnValue {
    complexity: (password: string, callback: (isComplex: boolean) => void) => boolean;
    check: (hashedPassword: string, callback: (err?: Error | null, isOk?: boolean) => void) => void;
    hash: (
        salt: string | null,
        iterations: number | null,
        callback: (err?: Error | null, hash?: string) => void,
    ) => void;
}

export function password(pw: string): PasswordReturnValue {
    return {
        hash: (salt, iterations, callback) => {
            salt = salt || crypto.randomBytes(16).toString('hex');
            iterations = iterations || 10_000;

            crypto.pbkdf2(pw, salt, iterations, 256, 'sha256', (err, key) => {
                if (err) {
                    return callback(err);
                }

                callback(null, `pbkdf2$${iterations}$${key.toString('hex')}$${salt}`);
            });
        },
        check: function (hashedPassword, callback) {
            if (!hashedPassword) {
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
        complexity: (password, callback) => {
            let result = false;
            if (typeof password === 'string') {
                result =
                    password.length >= 8 && // minimum length is 8
                    /\d/.test(password) && // contains at least one digit
                    /[a-z]/.test(password) && // contains at least one lower case letter
                    /[A-Z]/.test(password); // contains at least one upper case letter
            }
            typeof callback === 'function' && callback(result);
            return result; // true if the complexity OK
        },
    };
}
