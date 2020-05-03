'use strict';

// we cannot use semver here, because dependencies are not installed yet
// so the version checks get a bit messy

const path = require('path');
const child_process = require('child_process');

function checkNpmVersion() {
    return new Promise((resolve, reject) => {
        // Get npm version
        try {
            // remove local node_modules\.bin dir from path
            // or we potentially get a wrong npm version
            const newEnv = Object.assign({}, process.env);
            newEnv.PATH = (newEnv.PATH || newEnv.Path || newEnv.path)
                .split(path.delimiter)
                .filter(dir => {
                    dir = dir.toLowerCase();
                    return !(dir.indexOf('iobroker') > -1 && dir.indexOf(path.join('node_modules', '.bin')) > -1);
                })
                .join(path.delimiter);

            let timer = setTimeout(() => {
                timer = null;
                reject(new Error('Timeout'));
            }, 10000);

            child_process.exec('npm -v', {encoding: 'utf8', env: newEnv, windowsHide: true}, (error, stdout, _stderr) => {
                if (timer) {
                    let npmVersion = stdout;
                    clearTimeout(timer);
                    timer = null;
                    npmVersion = npmVersion.trim();
                    console.log('NPM version: ' + npmVersion);

                    if (gte(npmVersion, '5.0.0') && lt(npmVersion, '5.7.1')) {
                        console.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        console.warn('WARNING:');
                        console.warn('You are using an unsupported npm version!');
                        console.warn('This can lead to problems when installing further packages');
                        console.warn();
                        console.warn('Please use "npm install -g npm@4" to downgrade npm to 4.x or ');
                        console.warn('use "npm install -g npm@latest" to install a supported version of npm!');
                        console.warn('You need to make sure to repeat this step after installing an update to NodeJS and/or npm.');
                        console.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        process.exit(25);
                    }
                    resolve(npmVersion);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

checkNpmVersion()
    .catch(err => {
        console.error('Could not check npm version: ' + err);
        console.error('Assuming that correct version is installed.');
    }).then(() => {
        process.exit(0);
    });

// ======================================
// all the functions to replace `semver`:

/**
 * @typedef {{major: number, minor: number, build: number}} Version
 */
/**
 * Parses a version string
 * @param {string} version The version string to parse
 * @returns {Version | null} The parsed version
 */
function parseVersion(version) {
    const versionRegExp = /^v?(\d+)\.(\d+)\.(\d+).*?/;
    const parsed = versionRegExp.exec(version);
    if (!parsed) {
        return null;
    }

    return {
        major: +parsed[1],
        minor: +parsed[2],
        build: +parsed[3]
    };
}

/**
 * Checks if v1 > v2
 * @param {Version | string} v1
 * @param {Version | string} v2
 */
function gt(v1, v2) {
    if (typeof v1 === 'string') {
        v1 = parseVersion(v1);
    }
    if (typeof v2 === 'string') {
        v2 = parseVersion(v2);
    }

    if (v1.major > v2.major) {
        return true;
    } else if (v1.major < v2.major) {
        return false;
    }

    if (v1.minor > v2.minor) {
        return true;
    } else if (v1.minor < v2.minor) {
        return false;
    }

    return (v1.build > v2.build);
}

/**
 * Checks if v1 < v2
 * @param {Version | string} v1
 * @param {Version | string} v2
 */
function lt(v1, v2) {
    if (typeof v1 === 'string') {
        v1 = parseVersion(v1);
    }
    if (typeof v2 === 'string') {
        v2 = parseVersion(v2);
    }

    if (v1.major < v2.major) {
        return true;
    } else if (v1.major > v2.major) {
        return false;
    }

    if (v1.minor < v2.minor) {
        return true;
    } else if (v1.minor > v2.minor) {
        return false;
    }

    return (v1.build < v2.build);
}

/**
 * Checks if v1 == v2
 * @param {Version | string} v1
 * @param {Version | string} v2
 */
function eq(v1, v2) {
    if (typeof v1 === 'string') {
        v1 = parseVersion(v1);
    }
    if (typeof v2 === 'string') {
        v2 = parseVersion(v2);
    }

    if (v1.major !== v2.major) {
        return false;
    }
    if (v1.minor !== v2.minor) {
        return false;
    }
    return v1.build === v2.build;
}

// /**
//  * Checks if v1 != v2
//  * @param {Version | string} v1
//  * @param {Version | string} v2
//  */
// function ne(v1, v2) {
//     return !eq(v1, v2);
// }

/**
 * Checks if v1 >= v2
 * @param {Version | string} v1
 * @param {Version | string} v2
 */
function gte(v1, v2) {
    return gt(v1, v2) || eq(v1, v2);
}

// /**
//  * Checks if v1 <= v2
//  * @param {Version | string} v1
//  * @param {Version | string} v2
//  */
// function lte(v1, v2) {
//     return lt(v1, v2) || eq(v1, v2);
// }