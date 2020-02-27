'use strict';

const fs     = require('fs');
const path   = require('path');
const semver = require('semver');
const os     = require('os');
const forge  = require('node-forge');

// @ts-ignore
require('events').EventEmitter.prototype._maxListeners = 100;
let request;
let extend;
let password;
let npmVersion;
let crypto;
let diskusage;
const randomID = Math.round(Math.random() * 10000000000000);  // Used for creation of User-Agent
const VENDOR_FILE = '/etc/iob-vendor.json';

/**
 * recursively copy values from old object to new one
 *
 * @alias copyAttributes
 * @memberof tools
 * @param {object} oldObj source object
 * @param {object} newObj destination object
 * @param {object} [originalObj] optional object for read __no_change__ values
 * @param {boolean} [isNonEdit] optional indicator if copy is in nonEdit part
 *
 */
function copyAttributes(oldObj, newObj, originalObj, isNonEdit) {
    for (const attr in oldObj) {
        if (oldObj.hasOwnProperty(attr)) {
            if (typeof oldObj[attr] !== 'object' || oldObj[attr] instanceof Array) {
                if (oldObj[attr] === '__no_change__' && originalObj && !isNonEdit) {
                    if (originalObj[attr] !== undefined) {
                        newObj[attr] = JSON.parse(JSON.stringify(originalObj[attr]));
                    } else {
                        console.log(`Attribute ${attr} ignored by copying`);
                    }
                } else
                if (oldObj[attr] === '__delete__' && !isNonEdit) {
                    if (newObj[attr] !== undefined) {
                        delete newObj[attr];
                    }
                } else {
                    newObj[attr] = oldObj[attr];
                }
            } else {
                newObj[attr] = newObj[attr] || {};
                copyAttributes(oldObj[attr], newObj[attr], originalObj && originalObj[attr], isNonEdit || attr === 'nonEdit');
            }
        }
    }
}

/**
 * Checks the flag nonEdit and restores non-changeable values if required
 *
 * @alias checkNonEditable
 * @memberof tools
 * @param {object} oldObject source object
 * @param {object} newObject destination object
 *
 */
function checkNonEditable(oldObject, newObject) {
    if (!oldObject) {
        return true;
    }
    if (!oldObject.nonEdit && !newObject.nonEdit) {
        return true;
    }

    // if nonEdit is protected with password
    if (oldObject.nonEdit && oldObject.nonEdit.passHash) {
        // If new Object wants to update the nonEdit information
        if (newObject.nonEdit && newObject.nonEdit.password) {
            crypto = crypto || require('crypto');
            const hash = crypto.createHash('sha256').update(newObject.nonEdit.password.toString()).digest('base64');
            if (oldObject.nonEdit.passHash !== hash) {
                delete newObject.nonEdit;
                return false;
            } else {
                oldObject.nonEdit = JSON.parse(JSON.stringify(newObject.nonEdit));
                delete oldObject.nonEdit.password;
                delete newObject.nonEdit.password;
                oldObject.nonEdit.passHash = hash;
                newObject.nonEdit.passHash = hash;
            }
            copyAttributes(newObject.nonEdit, newObject, newObject);

            if (newObject.passHash) {
                delete newObject.passHash;
            }
            if (newObject.nonEdit && newObject.nonEdit.password) {
                delete newObject.nonEdit.password;
            }

            return true;
        } else {
            newObject.nonEdit = oldObject.nonEdit;
        }

    } else if (newObject.nonEdit) {
        oldObject.nonEdit = JSON.parse(JSON.stringify(newObject.nonEdit));
        if (newObject.nonEdit.password) {
            crypto = crypto || require('crypto');
            const hash = crypto.createHash('sha256').update(newObject.nonEdit.password.toString()).digest('base64');
            delete oldObject.nonEdit.password;
            delete newObject.nonEdit.password;
            oldObject.nonEdit.passHash = hash;
            newObject.nonEdit.passHash = hash;
        }
    }

    // restore settings
    copyAttributes(oldObject.nonEdit, newObject, oldObject);

    if (newObject.passHash) {
        delete newObject.passHash;
    }
    if (newObject.nonEdit && newObject.nonEdit.password) {
        delete newObject.nonEdit.password;
    }
    return true;
}

// Compare versions
function upToDate(online, installed) {
    online = online.split('.');
    installed = installed.split('.');
    online[0] = parseInt(online[0], 10);
    installed[0] = parseInt(installed[0], 10);
    if (online[0] > installed[0]) {
        return false;
    } else if (online[0] === installed[0]) {
        online[1]    = parseInt(online[1], 10);
        installed[1] = parseInt(installed[1], 10);

        if (online[1] > installed[1]) {
            return false;
        } else if (online[1] === installed[1]) {
            online[2]    = parseInt(online[2], 10);
            installed[2] = parseInt(installed[2], 10);
            return installed[2] >= online[2];
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function encryptPhrase(password, phrase, callback) {
    // encrypt secret
    crypto = crypto || require('crypto');
    const cipher = crypto.createCipher('aes192', password);

    let encrypted = '';
    cipher.on('readable', () => {
        const data = cipher.read();
        if (data) {
            encrypted += data.toString('hex');
        }
    });

    cipher.on('end', () => callback(encrypted));

    cipher.write(phrase);
    cipher.end();
}

function decryptPhrase(password, data, callback) {
    crypto = crypto || require('crypto');
    const decipher = crypto.createDecipher('aes192', password);

    try {
        let decrypted = '';
        decipher.on('readable', () => {
            const data = decipher.read();
            if (data) {
                decrypted += data.toString('utf8');
            }
        });
        decipher.on('error', error => {
            console.error('Cannot decode secret: ' + error);
            callback(null);
        });

        decipher.on('end', () => callback(decrypted));

        decipher.write(data, 'hex');
        decipher.end();
    } catch (e) {
        console.error('Cannot decode secret: ' + e);
        callback(null);
    }
}

function getAppName() {
    const parts = __dirname.replace(/\\/g, '/').split('/');
    return parts[parts.length - 2].split('.')[0];
}

function rmdirRecursiveSync(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file/*, index*/) => {
            const curPath = path + '/' + file;
            if (fs.statSync(curPath).isDirectory()) {
                // recurse
                rmdirRecursiveSync(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        // delete (hopefully) empty folder
        try {
            fs.rmdirSync(path);
        } catch (e) {
            console.log('Cannot delete directory ' + path + ': ' + e.toString());
        }
    }
}

function findIPs() {
    const ifaces = require('os').networkInterfaces();
    const ipArr = [];
    for (const dev in ifaces) {
        if (!ifaces.hasOwnProperty(dev)) continue;
        /*jshint loopfunc:true */
        ifaces[dev].forEach(details =>
            //noinspection JSUnresolvedVariable
            !details.internal && ipArr.push(details.address));
    }
    return ipArr;
}

function findPath(path, url) {
    if (!url) return '';
    if (url.substring(0, 'http://'.length)  === 'http://' ||
        url.substring(0, 'https://'.length) === 'https://') {
        return url;
    } else {
        if (path.substring(0, 'http://'.length)  === 'http://' ||
            path.substring(0, 'https://'.length) === 'https://') {
            return (path + url).replace(/\/\//g, '/').replace('http:/', 'http://').replace('https:/', 'https://');
        } else {
            if (url[0] === '/') {
                return __dirname + '/..' + url;
            } else {
                return __dirname + '/../' + path + url;
            }
        }
    }
}

function getMac(callback) {
    const macRegex  = /(?:[a-z0-9]{2}[:-]){5}[a-z0-9]{2}/ig;
    const zeroRegex = /(?:[0]{2}[:-]){5}[0]{2}/;
    const command   = (process.platform.indexOf('win') === 0) ? 'getmac' : 'ifconfig || ip link';

    require('child_process').exec(command, {windowsHide: true}, (err, stdout, _stderr) => {
        if (err) {
            callback(err);
        } else {
            let macAddress;
            let match;
            let result = null;

            while (true) {
                match = macRegex.exec(stdout);
                if (!match) break;
                macAddress = match[0];
                if (!zeroRegex.test(macAddress) && !result) result = macAddress;
            }

            if (result === null) {
                callback(new Error('could not determine the mac address from:\n' + stdout));
            } else {
                callback(null, result.replace(/-/g, ':').toLowerCase());
            }
        }
    });
}

// Build unique uuid based on MAC address if possible
function uuid(givenMac, callback) {
    if (typeof givenMac === 'function') {
        callback = givenMac;
        givenMac = '';
    }

    let mac = (givenMac !== null) ? (givenMac || '') : null;
    let u;

    if (mac === '') {
        const ifaces = require('os').networkInterfaces();

        // Find first not empty MAC
        for (const n in ifaces) {
            if (!ifaces.hasOwnProperty(n)) {
                continue;
            }
            for (let c = 0; c < ifaces[n].length; c++) {
                if (ifaces[n][c].mac && ifaces[n][c].mac !== '00:00:00:00:00:00') {
                    mac = ifaces[n][c].mac;
                    break;
                }
            }
            if (mac) {
                break;
            }
        }
    }

    if (mac === '') {
        getMac((_err, mac) => uuid(mac || null, callback));
        return;
    }

    if (mac) {
        const md5sum = require('crypto').createHash('md5');
        md5sum.update(mac);
        mac = md5sum.digest('hex');
        u = mac.substring(0, 8) + '-' + mac.substring(8, 12) + '-' + mac.substring(12, 16) + '-' + mac.substring(16, 20) + '-' + mac.substring(20);
    } else {
        // Returns a RFC4122 compliant v4 UUID https://gist.github.com/LeverOne/1308368 (DO WTF YOU WANT TO PUBLIC LICENSE)
        let a;
        let b;
        b = a = '';
        while (a++ < 36) {
            b += ((a * 51) & 52) ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-';
        }
        u = b;
    }

    callback(u);
}

function createUuid(_objects, callback) {
    let tasks = 2;
    let _uuid;
    _objects.getObject('system.user.admin', (err, obj) => {
        if (err || !obj) {
            password = password || require('./password');

            // Default Password for user 'admin' is application name in lower case
            password(getAppName()).hash(null, null, (err, res) => {
                if (err) console.error(err);
                // Create user here and not in io-package.js because of hash password
                let tasks = 0;

                tasks++;
                _objects.setObject('system.user.admin', {
                    type: 'user',
                    common: {
                        name:      'admin',
                        password:   res,
                        dontDelete: true,
                        enabled:    true
                    },
                    ts: new Date().getTime(),
                    from: 'system.host.' + getHostName() + '.tools',
                    native: {}
                }, () => {
                    console.log('object system.user.admin created');
                    !--tasks && callback && callback(_uuid);
                });
            });
        } else {
            !--tasks && callback && callback(_uuid);
        }
    });

    _objects.getObject('system.meta.uuid', (err, obj) => {
        if (!err && obj && obj.native && obj.native.uuid) {
            !--tasks && callback && callback();
        } else {
            uuid(__uuid => {
                _uuid = __uuid;

                // Add vendor prefix to UUID
                if (fs.existsSync(VENDOR_FILE)) {
                    try {
                        const vendor = require(VENDOR_FILE);
                        if (vendor.vendor && vendor.vendor.uuidPrefix && vendor.vendor.uuidPrefix.length === 2) {
                            _uuid = vendor.vendor.uuidPrefix + _uuid;
                        }
                    } catch (e) {
                        console.error(`Cannot parse ${VENDOR_FILE}`);
                    }
                }

                _objects.setObject('system.meta.uuid', {
                    type: 'meta',
                    common: {
                        name: 'uuid',
                        type: 'uuid'
                    },
                    ts: new Date().getTime(),
                    from: 'system.host.' + getHostName() + '.tools',
                    native: {
                        uuid: _uuid
                    }
                }, err => {
                    if (err) {
                        console.error('object system.meta.uuid cannot be updated: ' + err);
                        !--tasks && callback && callback(_uuid);
                    } else {
                        _objects.getObject('system.meta.uuid', (err, obj) => {
                            if (obj.native.uuid !== _uuid) {
                                console.error('object system.meta.uuid cannot be updated: write protected');
                            } else {
                                console.log('object system.meta.uuid created: ' + _uuid);
                            }

                            !--tasks && callback && callback(_uuid);
                        });
                    }
                });
            });
        }
    });
}

// Download file to tmp or return file name directly
function getFile(urlOrPath, fileName, callback) {
    request = request || require('request');

    // If object was read
    if (urlOrPath.substring(0, 'http://'.length) === 'http://' ||
        urlOrPath.substring(0, 'https://'.length) === 'https://') {
        const tmpFile = __dirname + '/../tmp/' + (fileName || Math.floor(Math.random() * 0xFFFFFFE) + '.zip');
        // Add some information to user-agent, like chrome, IE and Firefox do
        request({url: urlOrPath, gzip: true, headers: {'User-Agent': `${module.exports.appName}, RND: ${randomID}, N: ${process.version}`}}).on('error', error => {
            console.log('Cannot download "' + tmpFile + '": ' + error);
            if (callback) callback(tmpFile);
        }).pipe(fs.createWriteStream(tmpFile)).on('close', () => {
            console.log('downloaded ' + tmpFile);
            if (callback) callback(tmpFile);
        });
    } else {
        if (fs.existsSync(urlOrPath)) {
            if (callback) callback(urlOrPath);
        } else
        if (fs.existsSync(__dirname + '/../' + urlOrPath)) {
            if (callback) callback(__dirname + '/../' + urlOrPath);
        } else if (fs.existsSync(__dirname + '/../tmp/' + urlOrPath)) {
            if (callback) callback(__dirname + '/../tmp/' + urlOrPath);
        } else {
            console.log('File not found: ' + urlOrPath);
            process.exit(1);
        }
    }
}

// Return content of the json file. Download it or read directly
function getJson(urlOrPath, agent, callback) {
    if (typeof agent === 'function') {
        callback = agent;
        agent = '';
    }
    agent = agent || '';

    request = request || require('request');
    let sources = {};
    // If object was read
    if (urlOrPath && typeof urlOrPath === 'object') {
        if (callback) callback(urlOrPath);
    } else
    if (!urlOrPath) {
        console.log('Empty url!');
        if (callback) callback(null);
    } else {
        if (urlOrPath.substring(0, 'http://'.length) === 'http://' ||
            urlOrPath.substring(0, 'https://'.length) === 'https://') {
            request({url: urlOrPath, timeout: 10000, gzip: true, headers: {'User-Agent': agent}}, (error, response, body) => {
                if (error || !body || response.statusCode !== 200) {
                    console.warn('Cannot download json from ' + urlOrPath + '. Error: ' + (error || body));
                    if (callback) callback(null, urlOrPath);
                    return;
                }
                try {
                    sources = JSON.parse(body);
                } catch (e) {
                    console.error('Json file is invalid on ' + urlOrPath);
                    if (callback) callback(null, urlOrPath);
                    return;
                }

                if (callback) callback(sources, urlOrPath);
            }).on('error', _error => {
                //console.log('Cannot download json from ' + urlOrPath + '. Error: ' + error);
                //if (callback) callback(null, urlOrPath);
            });
        } else {
            if (fs.existsSync(urlOrPath)) {
                try {
                    sources = JSON.parse(fs.readFileSync(urlOrPath, 'utf8'));
                } catch (e) {
                    console.log('Cannot parse json file from ' + urlOrPath + '. Error: ' + e);
                    if (callback) callback(null, urlOrPath);
                    return;
                }
                if (callback) callback(sources, urlOrPath);
            } else
            if (fs.existsSync(__dirname + '/../' + urlOrPath)) {
                try {
                    sources = JSON.parse(fs.readFileSync(__dirname + '/../' + urlOrPath, 'utf8'));
                }catch (e) {
                    console.log('Cannot parse json file from ' + __dirname + '/../' + urlOrPath + '. Error: ' + e);
                    if (callback) callback(null, urlOrPath);
                    return;
                }
                if (callback) callback(sources, urlOrPath);
            } else if (fs.existsSync(__dirname + '/../tmp/' + urlOrPath)) {
                try {
                    sources = JSON.parse(fs.readFileSync(__dirname + '/../tmp/' + urlOrPath, 'utf8'));
                } catch (e) {
                    console.log('Cannot parse json file from ' + __dirname + '/../tmp/' + urlOrPath + '. Error: ' + e);
                    if (callback) callback(null, urlOrPath);
                    return;
                }
                if (callback) callback(sources, urlOrPath);
            } else {
                //if (urlOrPath.indexOf('/example/') === -1) console.log('Json file not found: ' + urlOrPath);
                if (callback) callback(null, urlOrPath);
            }
        }
    }
}

function scanDirectory(dirName, list, regExp) {
    if (fs.existsSync(dirName)) {
        const dirs = fs.readdirSync(dirName);
        for (let i = 0; i < dirs.length; i++) {
            try {
                const fullPath   = path.join(dirName, dirs[i]);
                const fileIoName = path.join(fullPath, 'io-package.json');
                const fileName   = path.join(fullPath, 'package.json');
                if (regExp.test(dirs[i]) && fs.existsSync(fileIoName)) {
                    const ioPackage = JSON.parse(fs.readFileSync(fileIoName, 'utf8'));
                    const package_  = fs.existsSync(fileName) ? JSON.parse(fs.readFileSync(fileName, 'utf8')) : {};
                    const localIcon = (ioPackage.common.icon ? '/adapter/' + dirs[i].substring(module.exports.appName.length + 1) + '/' + ioPackage.common.icon : '');
                    //noinspection JSUnresolvedVariable
                    list[ioPackage.common.name] = {
                        controller: ioPackage.common.controller || false,
                        version:    ioPackage.common.version,
                        icon:       ioPackage.common.extIcon || localIcon,
                        localIcon,
                        title:      ioPackage.common.title,
                        desc:       ioPackage.common.desc,
                        platform:   ioPackage.common.platform,
                        keywords:   ioPackage.common.keywords,
                        readme:     ioPackage.common.readme,
                        type:       ioPackage.common.type,
                        license:    ioPackage.common.license ? ioPackage.common.license : ((package_.licenses && package_.licenses.length) ? package_.licenses[0].type : ''),
                        licenseUrl: (package_.licenses && package_.licenses.length) ? package_.licenses[0].url : ''
                    };
                }
            } catch (e) {
                console.log('Cannot read or parse ' + __dirname + '/../node_modules/' + dirs[i] + '/io-package.json: ' + e.toString());
            }
        }
    }
}
// Get list of all installed adapters and controller version on this host
function getInstalledInfo(hostRunningVersion) {
    const result = {};
    const path = __dirname + '/../';
    // Get info about host
    const ioPackage = JSON.parse(fs.readFileSync(path + 'io-package.json', 'utf8'));
    const package_  = fs.existsSync(path + 'package.json') ? JSON.parse(fs.readFileSync(path + 'package.json', 'utf8')) : {};
    const regExp    = new RegExp('^' + module.exports.appName + '\\.', 'i');

    //noinspection JSUnresolvedVariable
    result[ioPackage.common.name] = {
        controller:     true,
        version:        ioPackage.common.version,
        icon:           ioPackage.common.extIcon || ioPackage.common.icon,
        title:          ioPackage.common.title,
        desc:           ioPackage.common.desc,
        platform:       ioPackage.common.platform,
        keywords:       ioPackage.common.keywords,
        readme:         ioPackage.common.readme,
        runningVersion: hostRunningVersion,
        license:        ioPackage.common.license ? ioPackage.common.license : ((package_.licenses && package_.licenses.length) ? package_.licenses[0].type : ''),
        licenseUrl:     (package_.licenses && package_.licenses.length) ? package_.licenses[0].url : ''
    };
    scanDirectory(__dirname + '/../node_modules',    result, regExp);
    scanDirectory(__dirname + '/../../node_modules', result, regExp);

    if (fs.existsSync(__dirname + '/../../../node_modules/' + module.exports.appName.toLowerCase() + '.js-controller') ||
        fs.existsSync(__dirname + '/../../../node_modules/' + module.exports.appName + '.js-controller')) {
        scanDirectory(__dirname + '/../..', result, regExp);
    }
    return result;
}

/**
 * Reads an adapter's npm version
 * @param {string | null} adapter The adapter to read the npm version from. Null for the root ioBroker packet
 * @param {(err: Error | null, version?: string) => void} [callback]
 */
function getNpmVersion(adapter, callback) {
    adapter = adapter ? module.exports.appName + '.' + adapter : module.exports.appName;
    adapter = adapter.toLowerCase();

    const cliCommand = `npm view ${adapter}@latest version`;

    const exec = require('child_process').exec;
    exec(cliCommand, {timeout: 2000, windowsHide: true}, (error, stdout, _stderr) => {
        let version;
        if (error) {
            // command failed
            if (typeof callback === 'function') {
                callback(error);
                return;
            }
        } else if (stdout) {
            version = semver.valid(stdout.trim());
        }
        if (typeof callback === 'function') callback(null, version);
    });
}

function getIoPack(sources, name, callback) {
    getJson(sources[name].meta, ioPack => {
        const packUrl = sources[name].meta.replace('io-package.json', 'package.json');
        if (!ioPack) {
            if (sources._helper) sources._helper.failCounter.push(name);
            if (callback) callback(sources, name);
        } else {
            setImmediate(() => {
                getJson(packUrl, pack => {
                    const version = sources[name].version;
                    const type    = sources[name].type;
                    // If installed from git or something else
                    // js-controller is exception, because can be installed from npm and from git
                    if (sources[name].url && name !== 'js-controller') {
                        if (ioPack && ioPack.common) {
                            sources[name] = extend(true, sources[name], ioPack.common);

                            // overwrite type of adapter from repository
                            if (type) {
                                sources[name].type = type;
                            }
                            if (pack && pack.licenses && pack.licenses.length) {
                                if (!sources[name].license)    sources[name].license    = pack.licenses[0].type;
                                if (!sources[name].licenseUrl) sources[name].licenseUrl = pack.licenses[0].url;
                            }
                        }

                        if (callback) callback(sources, name);
                    } else {
                        if (ioPack && ioPack.common) {
                            sources[name] = extend(true, sources[name], ioPack.common);
                            if (pack && pack.licenses && pack.licenses.length) {
                                if (!sources[name].license)    sources[name].license    = pack.licenses[0].type;
                                if (!sources[name].licenseUrl) sources[name].licenseUrl = pack.licenses[0].url;
                            }
                        }

                        // overwrite type of adapter from repository
                        if (type) {
                            sources[name].type = type;
                        }

                        if (version) {
                            sources[name].version = version;
                            if (callback) callback(sources, name);
                        } else {
                            if (sources[name].meta.substring(0, 'http://'.length)  === 'http://' ||
                                sources[name].meta.substring(0, 'https://'.length) === 'https://') {
                                //installed from npm
                                getNpmVersion(name, (_err, version) => {
                                    if (version) {
                                        sources[name].version = version;
                                    } else {
                                        sources[name].version = 'npm error';
                                    }
                                    if (callback) callback(sources, name);
                                });
                            } else {
                                if (callback) callback(sources, name);
                            }
                        }
                    }
                });
            });
        }
    });
}

function _getRepositoryFile(sources, path, callback) {
    if (!sources._helper) {
        let count = 0;
        for (const _name in sources) {
            if (!sources.hasOwnProperty(_name)) continue;
            count++;
        }
        sources._helper = {failCounter: []};

        sources._helper.timeout = setTimeout(() => {
            if (sources._helper) {
                delete sources._helper;
                for (const __name in sources) {
                    if (!sources.hasOwnProperty(__name)) continue;
                    if (sources[__name].processed !== undefined) delete sources[__name].processed;
                }
                if (callback) callback('Timeout by read all package.json (' + count + ') seconds', sources);
                callback = null;
            }
        }, count * 1000);
    }

    for (const name in sources) {
        if (!sources.hasOwnProperty(name)) continue;
        if (sources[name].processed || name === '_helper') continue;

        sources[name].processed = true;
        if (sources[name].url)  sources[name].url  = findPath(path, sources[name].url);
        if (sources[name].meta) sources[name].meta = findPath(path, sources[name].meta);
        if (sources[name].icon) sources[name].icon = findPath(path, sources[name].icon);

        if (!sources[name].name && sources[name].meta) {
            getIoPack(sources, name, (_ignore/*, name*/) => {
                if (sources._helper) {
                    if (sources._helper.failCounter.length > 10) {
                        clearTimeout(sources._helper.timeout);
                        delete sources._helper;
                        for (const _name in sources) {
                            if (!sources.hasOwnProperty(_name)) continue;
                            if (sources[_name].processed !== undefined) delete sources[_name].processed;
                        }
                        if (callback) callback('Looks like there is no internet.', sources);
                        callback = null;
                    } else {
                        // process next
                        setImmediate(() =>
                            _getRepositoryFile(sources, path, callback));
                    }
                }
            });
            return;
        }
    }
    // all packages are processed
    if (sources._helper) {
        let err;
        if (sources._helper.failCounter.length) {
            err = 'Following packages cannot be read: ' + sources._helper.failCounter.join(', ');
        }
        clearTimeout(sources._helper.timeout);
        delete sources._helper;
        for (const __name in sources) {
            if (!sources.hasOwnProperty(__name)) continue;
            if (sources[__name].processed !== undefined) delete sources[__name].processed;
        }
        if (callback) callback(err, sources);
        callback = null;
    }
}

function _checkRepositoryFileHash(urlOrPath, additionalInfo, callback) {
    request = request || require('request');

    // read hash of file
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
        urlOrPath = urlOrPath.replace(/\.json$/, '-hash.json');
        let json = null;
        request({url: urlOrPath, timeout: 10000, gzip: true}, (error, response, body) => {
            if (error || !body || response.statusCode !== 200) {
                console.warn('Cannot download json from ' + urlOrPath + '. Error: ' + (error || body));
            } else {
                try {
                    json = JSON.parse(body);
                } catch (e) {
                    console.error('Json file is invalid on ' + urlOrPath);
                }
            }
            if (json && json.hash) {
                // The hash download was successful
                if (additionalInfo && additionalInfo.sources && json.hash === additionalInfo.hash) {
                    // The hash is the same as for the cached sources
                    console.log('hash unchanged, use cached sources');
                    callback(null, additionalInfo.sources, json.hash);
                } else {
                    // Either we have no sources cached or the hash changed
                    // => force download of new sources
                    console.log('hash changed or no sources cached => force download of new sources');
                    callback(null, null, json.hash);
                }
            } else {
                // Could not download new sources, use the old ones
                console.log('failed to download new sources, use cached sources');
                callback(null, additionalInfo.sources, '');
            }
        }).on('error', _error => {
            //console.log('Cannot download json from ' + urlOrPath + '. Error: ' + error);
            //if (callback) callback(null, urlOrPath);
        });
    } else {
        // it is a file and file has not hash
        callback(null, null, 0);
    }
}

/**
 * Get list of all adapters and controller in some repository file or in /conf/source-dist.json
 *
 * @alias getRepositoryFile
 * @memberof tools
 * @param {string} urlOrPath URL stargin with http:// or https:// or local file link
 * @param {object} additionalInfo destination object
 * @param {function} callback function (err, sources, actualHash) { }
 *
 */
function getRepositoryFile(urlOrPath, additionalInfo, callback) {
    let sources = {};
    let path =    '';

    if (typeof additionalInfo === 'function') {
        callback = additionalInfo;
        additionalInfo = {};
    }

    additionalInfo = additionalInfo || {};

    extend = extend || require('node.extend');

    if (urlOrPath) {
        const parts = urlOrPath.split('/');
        path  = parts.splice(0, parts.length - 1).join('/') + '/';
    }

    // If object was read
    if (urlOrPath && typeof urlOrPath === 'object') {
        if (typeof callback === 'function') callback(null, urlOrPath);
    } else
    if (!urlOrPath) {
        try {
            sources = JSON.parse(fs.readFileSync(getDefaultDataDir() + 'sources.json', 'utf8'));
        } catch (e) {
            sources = {};
        }
        try {
            const sourcesDist = JSON.parse(fs.readFileSync(__dirname + '/../conf/sources-dist.json', 'utf8'));
            sources = extend(true, sourcesDist, sources);
        } catch (e) {
            // continue regardless of error
        }

        for (const s in sources) {
            if (sources.hasOwnProperty(s) && additionalInfo[s] && additionalInfo[s].published) {
                sources[s].published = additionalInfo[s].published;
            }
        }

        _getRepositoryFile(sources, path, err => {
            if (err) console.error('[' + new Date() + '] ' + err);
            if (typeof callback === 'function') callback(err, sources);
        });
    } else {
        let agent = '';
        if (additionalInfo) {
            // Add some information to user-agent, like chrome, IE and Firefox do
            agent = `${additionalInfo.name}, RND: ${additionalInfo.randomID || randomID}, Node:${additionalInfo.node}, V:${additionalInfo.controller}`;
        }

        // load hash of file first to not load the whole 1MB of sources
        _checkRepositoryFileHash(urlOrPath, additionalInfo, (err, sources, actualSourcesHash) => {
            if (!err && sources) {
                // Source file was not changed
                typeof callback === 'function' && callback(err, sources, actualSourcesHash);
            } else {
                getJson(urlOrPath, agent, sources => {
                    if (sources) {
                        for (const s in sources) {
                            if (sources.hasOwnProperty(s) && additionalInfo[s] && additionalInfo[s].published) {
                                sources[s].published = additionalInfo[s].published;
                            }
                        }
                        setImmediate(() =>
                            _getRepositoryFile(sources, path, err => {
                                err && console.error('[' + new Date() + '] ' + err);
                                typeof callback === 'function' && callback(err, sources, actualSourcesHash);
                            }));
                    } else {
                        if (typeof callback === 'function') {
                            callback('Cannot read "' + urlOrPath + '"', {});
                        }
                    }
                });
            }
        });
    }
}

function sendDiagInfo(obj, callback) {
    request = request || require('request');

    console.log('Send diag info: ' + JSON.stringify(obj));
    request.post({
        url:    'http://download.' + module.exports.appName + '.net/diag.php',
        method: 'POST',
        gzip: true,
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body:    'data=' + JSON.stringify(obj),
        timeout: 2000
    }, (_err, _response, _body) => {
        /*if (err || !body || response.statusCode !== 200) {

        }*/
        if (typeof callback === 'function') callback();
    }).on('error', error => {
        console.log('Cannot send diag info: ' + error.message);
        if (typeof callback === 'function') callback(error);
    });
}

function getAdapterDir(adapter) {
    const appName = module.exports.appName;

    if (adapter.substring(0, appName.length + 1) === appName + '.') {
        adapter = adapter.substring(appName.length + 1);
    }

    const possibilities = [
        appName.toLowerCase() + '.' + adapter + '/package.json',
        appName + '.' + adapter + '/package.json'
    ];

    /** @type {string} */
    let adapterPath;
    for (let i = 0; i < possibilities.length; i++) {
        // special case to not read adapters from js-controller/node_module/adapter adn check first in parent directory
        if (fs.existsSync(__dirname + '/../../' + possibilities[i])) {
            adapterPath = __dirname + '/../../' + possibilities[i];
        } else {
            try {
                adapterPath = require.resolve(possibilities[i]);
                break;
            } catch (e) { /* not found */ }
        }
    }

    if (!adapterPath) {
        return null; // inactive
    } else {
        const parts = path.normalize(adapterPath).split(/[\\\/]/g);
        parts.pop();
        return parts.join('/');
    }
}

function getHostName() {
    // for tests purposes
    if (process.env.IOB_HOSTNAME) {
        return process.env.IOB_HOSTNAME;
    }
    try {
        const configName = getConfigFileName();
        const config = JSON.parse(fs.readFileSync(configName, 'utf8'));
        return config.system ? config.system.hostname || require('os').hostname() : require('os').hostname();
    } catch (err) {
        return require('os').hostname();
    }
}

/**
 * Read version of system npm
 *
 * @alias getSystemNpmVersion
 * @memberof Tools
 * @param {function} callback return result
 *        <pre><code>
 *            function (err, version) {
 *              adapter.log.debug('NPM version is: ' + version);
 *            }
 *        </code></pre>
 */
function getSystemNpmVersion(callback) {
    const exec = require('child_process').exec;

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
    try {
        let timeout = setTimeout(() => {
            timeout = null;
            if (callback) {
                callback('timeout');
                callback = null;
            }
        }, 10000);

        exec('npm -v', {encoding: 'utf8', env: newEnv, windowsHide: true}, (error, stdout) => {//, stderr) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            if (stdout) stdout = semver.valid(stdout.trim());
            if (callback) {
                callback(error, stdout);
                callback = null;
            }
        });
    } catch (e) {
        if (callback) {
            callback(e);
            callback = null;
        }
    }
}

/**
 * Read disk free space
 *
 * @alias getDiskInfo
 * @memberof Tools
 * @param {string} platform result of os.platform() (win32 => Windows, darwin => OSX)
 * @param {function} callback return result
 *        <pre><code>
 *            function (err, infos) {
 *              adapter.log.debug('Disks sizes is: ' + info['Disk size'] + ' - ' + info['Disk free']);
 *            }
 *        </code></pre>
 */
function getDiskInfo(platform, callback) {
    platform = platform || require('os').platform();
    if (diskusage) {
        try {
            const path = platform === 'win32' ? __dirname.substring(0, 2) : '/';
            const info = diskusage.checkSync(path);
            return callback && callback(null, {'Disk size': info.total, 'Disk free': info.free});
        }
        catch (err) {
            console.log(err);
        }
    } else {
        const exec = require('child_process').exec;
        try {
            if (platform === 'Windows' || platform === 'win32') {
                // Caption  FreeSpace     Size
                // A:
                // C:       66993807360   214640357376
                // D:
                // Y:       116649795584  148368257024
                // Z:       116649795584  148368257024
                const disk = __dirname.substring(0, 2).toUpperCase();

                exec('wmic logicaldisk get size,freespace,caption', {encoding: 'utf8', windowsHide: true}, (error, stdout) => {//, stderr) {
                    if (stdout) {
                        const lines = stdout.split('\n');
                        const line = lines.find(line => {
                            const parts = line.split(/\s+/);
                            return parts[0].toUpperCase() === disk;
                        });
                        if (line) {
                            const parts = line.split(/\s+/);
                            return callback && callback(error, {'Disk size': parseInt(parts[2]), 'Disk free': parseInt(parts[1])});
                        }
                    }
                    callback && callback(error, null);
                });
            } else {
                exec('df -k /', {encoding: 'utf8', windowsHide: true}, (error, stdout) => {//, stderr) {
                    // Filesystem            1K-blocks    Used Available Use% Mounted on
                    // /dev/mapper/vg00-lv01 162544556 9966192 145767152   7% /
                    try {
                        if (stdout) {
                            const parts = stdout.split('\n')[1].split(/\s+/);
                            return callback && callback(error, {'Disk size': parseInt(parts[1]) * 1024, 'Disk free': parseInt(parts[3]) * 1024});
                        }
                    } catch (e) {
                        // continue regardless of error
                    }
                    callback && callback(error, null);
                });
            }
        } catch (e) {
            callback && callback(e, null);
        }
    }
}

/**
 * Returns information about a certificate
 *
 *
 *  Following info will be returned:
 *     - certificate: the certificate itself
 *     - serialNumber: serial number
 *     - signature: type of signature as text like "RSA",
 *     - keyLength: bits used for encryption key like 2048
 *     - issuer: issuer of the certificate
 *     - subject: subject that is signed
 *     - dnsNames: server name this certificate belong to
 *     - keyUsage: this certificate can be used for the followinf puposes
 *     - extKeyUsage: usable or client, server or ...
 *     - validityNotBefore: certificate validity start datetime
 *     - validityNotAfter: certificate validity end datetime
 *
 * @alias getCertificateInfo
 * @memberof Tools
 * @param {string} cert
 * @return certificate information object
 */
function getCertificateInfo(cert) {
    let info = null;

    if (!cert) return null;
    // https://github.com/digitalbazaar/forge
    forge.options.usePureJavaScript = false;
    const pki = forge.pki;

    let certFile = null;
    try {
        if (typeof cert === 'string' && cert.length < 1024 && fs.existsSync(cert)) {
            certFile = cert;
            cert = fs.readFileSync(cert).toString();
        }

        const crt = pki.certificateFromPem(cert);

        info = {
            certificateFilename: certFile,
            certificate: cert,
            serialNumber: crt.serialNumber,
            signature: pki.oids[crt.signatureOid],
            keyLength: crt.publicKey.n.toString(2).length,
            issuer: crt.issuer,
            subject: crt.subject,
            dnsNames: crt.getExtension('subjectAltName').altNames,
            keyUsage: crt.getExtension('keyUsage'),
            extKeyUsage: crt.getExtension('extKeyUsage'),
            validityNotBefore: crt.validity.notBefore,
            validityNotAfter: crt.validity.notAfter
        };

        // do not return info about values
        delete info.keyUsage.value;
        delete info.extKeyUsage.value;
        return info;
    }
    catch (err) {
        return null;
    }
}

/**
 * Returns default SSL certificates (private and public)
 *
 *
 *  Following info will be returned:
 *     - defaultPrivate: private RSA key
 *     - defaultPublic: public certificate
 *
 * @alias generateDefaultCertificates
 * @memberof Tools
 * @returns {{ defaultPrivate: any[];defaultPublic: any[] }}
 *        <pre><code>
 *            const certificates = tools.generateDefaultCertificates();
 *        </code></pre>
 */
function generateDefaultCertificates() {
    // If at any time you wish to disable the use of native code, where available, for particular forge features
    // like its secure random number generator, you may set the forge.options.usePureJavaScript flag to true. It
    // is not recommended that you set this flag as native code is typically more performant and may have stronger
    // security properties. It may be useful to set this flag to test certain features that you plan to run in
    // environments that are different from your testing environment.
    // https://github.com/digitalbazaar/forge
    forge.options.usePureJavaScript = false;
    const pki = forge.pki;
    const keys = pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    const cert = pki.createCertificate();

    cert.publicKey = keys.publicKey;
    cert.serialNumber = '0' + makeid(17);
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

    const subAttrs = [
        { name: 'commonName', value: getHostName() },
        { name: 'organizationName', value: 'ioBroker GmbH' },
        { shortName: 'OU', value: 'iobroker' }
    ];

    const issAttrs = [
        { name: 'commonName', value: 'iobroker' },
        { name: 'organizationName', value: 'ioBroker GmbH' },
        { shortName: 'OU', value: 'iobroker' }
    ];

    cert.setSubject(subAttrs);
    cert.setIssuer(issAttrs);

    cert.setExtensions([
        {
            name: 'basicConstraints',
            critical: true,
            cA: false
        },
        {
            name: 'keyUsage',
            critical: true,
            digitalSignature: true,
            contentCommitment: true,
            keyEncipherment: true,
            dataEncipherment: true,
            keyAgreement: true,
            keyCertSign: true,
            cRLSign: true,
            encipherOnly: true,
            decipherOnly: true
        },
        {
            name: 'subjectAltName',
            altNames: [{
                type: 2,
                value: os.hostname()
            }]
        },
        {
            name: 'subjectKeyIdentifier'
        },
        {
            name: 'extKeyUsage',
            serverAuth: true,
            clientAuth: true,
            codeSigning: false,
            emailProtection: false,
            timeStamping: false
        },
        {
            name: 'authorityKeyIdentifier'
        }
    ]);

    cert.sign(keys.privateKey, forge.md.sha256.create());

    const pem_pkey = pki.privateKeyToPem(keys.privateKey);
    const pem_cert = pki.certificateToPem(cert);

    //console.log(pem_pkey);
    //console.log(pem_cert);

    return {
        defaultPrivate: pem_pkey,
        defaultPublic: pem_cert
    };
}

function makeid(length) {
    let result           = '';
    const characters       = 'abcdef0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Collects information about host and available adapters
 *
 *  Following info will be collected:
 *    - available adapters
 *    - node.js --version
 *    - npm --version
 *
 * @alias getHostInfo
 * @memberof Tools
 * @param {object} objects
 * @param {function} callback return result
 *        <pre><code>
 *            function (err, result) {
 *              adapter.log.debug('Info about host: ' + JSON.stringify(result, null, 2);
 *            }
 *        </code></pre>
 */
function getHostInfo(objects, callback) {
    const os = require('os');

    if (diskusage !== false) {
        try {
            diskusage = diskusage || require('diskusage');
        } catch (e) {
            diskusage = false;
        }
    }

    const cpus = os.cpus();
    const data = {
        Platform:     os.platform(),
        os:           process.platform,
        Architecture: os.arch(),
        CPUs:         cpus.length,
        Speed:        cpus[0].speed,
        Model:        cpus[0].model,
        RAM:          os.totalmem(),
        'System uptime': Math.round(os.uptime()),
        'Node.js':    process.version
    };

    if (data.Platform === 'win32') {
        data.Platform = 'Windows';
    } else
    if (data.Platform === 'darwin') {
        data.Platform = 'OSX';
    }

    let task = 0;
    task++;
    objects.getObject('system.config', (_err, systemConfig) => {
        objects.getObject('system.repositories', (err, repos) => {
            // Check if repositories exists
            if (!err && repos && repos.native && repos.native.repositories) {
                const repo = repos.native.repositories[systemConfig.common.activeRepo];
                if (repo && repo.json) {
                    data['adapters count'] = Object.keys(repo.json).length;
                }
            }
            if (!--task) {
                callback(err, data);
            }
        });
    });

    if (!npmVersion) {
        task++;
        getSystemNpmVersion((err, version) => {
            data['NPM'] = 'v' + (version || ' ---');
            npmVersion = version;
            if (!--task) {
                callback(err, data);
            }
        });
    } else {
        data['NPM'] = npmVersion;
        if (!task) {
            callback(null, data);
        }
    }
    task++;
    getDiskInfo(data.Platform, (err, info) => {
        if (info) {
            Object.assign(data, info);
        }
        if (!--task) {
            callback(err, data);
        }
    });
}

// All pathes are returned always relative to /node_modules/' + module.exports.appName + '.js-controller
// the result has always "/" as last symbol
function getDefaultDataDir() {
    //var dataDir = __dirname.replace(/\\/g, '/');
    //dataDir = dataDir.split('/');

    const appName = module.exports.appName.toLowerCase();

    // if debugging with npm5
    if (fs.existsSync(__dirname + '/../../node_modules/' + appName + '.js-controller')) {
        return '../' + appName + '-data/';
    } else // If installed with npm
    if (fs.existsSync(__dirname + '/../../../node_modules/' + appName + '.js-controller')) {
        return '../../' + appName + '-data/';
    } else {
        //dataDir.splice(dataDir.length - 1, 1);
        //dataDir = dataDir.join('/');
        return './data/';
    }
}

function getConfigFileName() {
    /** @type {string|string[]} */
    let configDir = __dirname.replace(/\\/g, '/');
    configDir = configDir.split('/');
    const appName = module.exports.appName.toLowerCase();

    // If installed with npm
    if (fs.existsSync(__dirname + '/../../../node_modules/' + appName.toLowerCase() + '.js-controller') ||
        fs.existsSync(__dirname + '/../../../node_modules/' + appName + '.js-controller')) {
        // remove /node_modules/' + appName + '.js-controller/lib
        configDir.splice(configDir.length - 3, 3);
        configDir = configDir.join('/');
        return configDir + '/' + appName + '-data/' + appName + '.json';
    } else
    // if debugging with npm5
    if (fs.existsSync(__dirname + '/../../node_modules/' + appName.toLowerCase() + '.js-controller') ||
        fs.existsSync(__dirname + '/../../node_modules/' + appName + '.js-controller')) {
        // remove /node_modules/' + appName + '.js-controller/lib
        configDir.splice(configDir.length - 2, 2);
        configDir = configDir.join('/');
        return configDir + '/' + appName + '-data/' + appName + '.json';
    } else {
        // Remove /lib
        configDir.splice(configDir.length - 1, 1);
        configDir = configDir.join('/');
        if (fs.existsSync(__dirname + '/../conf/' + appName + '.json')) {
            return configDir + '/conf/' + appName + '.json';
        } else {
            return configDir + '/data/' + appName + '.json';
        }
    }
}

/**
 * Puts all values from an `arguments` object into an array, starting at the given index
 * @param {IArguments} argsObj An `arguments` object as passed to a function
 * @param {number} [startIndex=0] The optional index to start taking the arguments from
 */
function sliceArgs(argsObj, startIndex) {
    if (startIndex == null) startIndex = 0;
    const ret = [];
    for (let i = startIndex; i < argsObj.length; i++) {
        ret.push(argsObj[i]);
    }
    return ret;
}

/**
 * Promisifies a function which returns an error as the first argument in its callback
 * @param {Function} fn The function to promisify
 * @param {any} [context=this] (optional) The context (value of `this` to bind the function to)
 * @param {string[]} [returnArgNames] (optional) If the callback contains multiple arguments,
 * you can combine them into one object by passing the names as an array.
 * Otherwise the Promise will resolve with an array
 * @returns {(...args: any[]) => Promise<any>}
 */
function promisify(fn, context, returnArgNames) {
    return function () {
        const args = sliceArgs(arguments);
        context = context || this;
        return new Promise((resolve, reject) => {
            fn.apply(context, args.concat([
                function (error, result) {
                    if (error) {
                        return reject(error);
                    } else {
                        // decide on how we want to return the callback arguments
                        switch (arguments.length) {
                            case 1: // only an error was given
                                return resolve(); // Promise<void>
                            case 2: // a single value (result) was returned
                                return resolve(result);
                            default: {// multiple values should be returned
                                /** @type {{} | any[]} */
                                let ret;
                                const extraArgs = sliceArgs(arguments, 1);
                                if (returnArgNames && returnArgNames.length === extraArgs.length) {
                                    // we can build an object
                                    ret = {};
                                    for (let i = 0; i < returnArgNames.length; i++) {
                                        ret[returnArgNames[i]] = extraArgs[i];
                                    }
                                } else {
                                    // we return the raw array
                                    ret = extraArgs;
                                }
                                return resolve(ret);
                            }
                        }
                    }
                }
            ]));
        });
    };
}

/**
 * Promisifies a function which does not provide an error as the first argument in its callback
 * @param {Function} fn The function to promisify
 * @param {any} [context] (optional) The context (value of `this` to bind the function to)
 * @param {string[]} [returnArgNames] (optional) If the callback contains multiple arguments,
 * you can combine them into one object by passing the names as an array.
 * Otherwise the Promise will resolve with an array
 * @returns {(...args: any[]) => Promise<any>}
 */
function promisifyNoError(fn, context, returnArgNames) {
    return function () {
        const args = sliceArgs(arguments);
        context = context || this;
        return new Promise((resolve, _reject) => {
            fn.apply(context, args.concat([
                function (result) {
                    // decide on how we want to return the callback arguments
                    switch (arguments.length) {
                        case 0: // no arguments were given
                            return resolve(); // Promise<void>
                        case 1: // a single value (result) was returned
                            return resolve(result);
                        default: {// multiple values should be returned
                            /** @type {{} | any[]} */
                            let ret;
                            const extraArgs = sliceArgs(arguments, 0);
                            if (returnArgNames && returnArgNames.length === extraArgs.length) {
                                // we can build an object
                                ret = {};
                                for (let i = 0; i < returnArgNames.length; i++) {
                                    ret[returnArgNames[i]] = extraArgs[i];
                                }
                            } else {
                                // we return the raw array
                                ret = extraArgs;
                            }
                            return resolve(ret);
                        }
                    }
                }
            ]));
        });
    };
}

/**
 * Creates and executes an array of promises in sequence
 * @param {((...args: any[]) => Promise<any>)[]} promiseFactories An array of promise-returning functions
 */
function promiseSequence(promiseFactories) {
    return promiseFactories.reduce((promise, factory) => {
        return promise.then(result => factory().then(Array.prototype.concat.bind(result)));
    }, Promise.resolve([]));
}

function _setQualityForStates(states, keys, quality, cb) {
    if (!keys || !states || !keys.length) {
        cb();
    } else {
        states.setState(keys.shift(), {ack: null, q: quality}, () => setImmediate(_setQualityForStates, states, keys, quality, cb));
    }
}

function setQualityForInstance(objects, states, namespace, q) {
    return new Promise((resolve, reject) => {
        objects.getObjectView('system', 'state', {startkey: namespace + '.', endkey: namespace + '.\u9999', include_docs: false}, (err, _states) => {
            if (err) {
                reject(err);
            } else {
                let keys = [];
                if (_states && _states.rows) {
                    for (let s = 0; s < _states.rows.length; s++) {
                        const id = _states.rows[s].id;
                        // if instance still active, but device is offline
                        if (!(q & 0x10) && id.match(/\.info\.connection$/)) {
                            continue;
                        }
                        keys.push(id);
                    }
                }
                // read all values for IDs
                states.getStates(keys, (_err, values) => {
                    // Get only states, that have ack = true
                    keys = keys.filter((_id, i) => values[i] && values[i].ack);
                    // update quality code of the states to new one
                    _setQualityForStates(states, keys, q, err => err ? reject(err) : resolve());
                });
            }
        });
    });
}

/**
 * Converts ioB pattern into regex.
 * @param {string} pattern - Regex string to us it in new RegExp(pattern)
 * @returns {string}
 */
function pattern2RegEx(pattern) {
    pattern = (pattern || '').toString()
        .replace(/\$/g, '\\$')
        .replace(/\^/g, '\\^');

    if (pattern !== '*') {
        if (pattern[0] === '*' && pattern[pattern.length - 1] !== '*') pattern += '$';
        if (pattern[0] !== '*' && pattern[pattern.length - 1] === '*') pattern = '^' + pattern;
        if (pattern[0] !== '*' && pattern[pattern.length - 1] !== '*') pattern = '^' + pattern + '$';
    }

    pattern = pattern
        .replace(/\?/g, '\\?')
        .replace(/\./g, '\\.')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\[/g, '\\[')
        .replace(/]/g, '\\]')
        .replace(/\*/g, '.*');

    return pattern;
}

/**
 * Generates a stack trace that can be added to log outputs to trace their source
 * @param {string} [wrapperName = 'captureStackTrace'] The wrapper function after which the stack trace should begin
 * @returns {string}
 */
function captureStackTrace(wrapperName) {
    if (typeof wrapperName !== 'string') wrapperName = 'captureStackTrace';

    const ret = new Error();
    if (ret.stack) {
        let foundSelf = false;
        const lines = ret.stack.split('\n')
            .filter(line => {
                // keep all lines after this function's
                if (foundSelf) return true;
                if (line.indexOf(wrapperName) > -1) foundSelf = true;
                return false;
            });
        return lines.join('\n');
    }
    return '';
}

/**
 * Appends the stack trace generated by `captureStackTrace` to the given string
 * @param {string} str - The string to append the stack trace to
 * @returns {string}
 */
function appendStackTrace(str) {
    // Convert anything that isn't a string into a string
    if (typeof str !== 'string') str = String(str);
    if (str.substr(-1) !== '\n') str += '\n';
    return str + captureStackTrace('appendStackTrace');
}

/**
 * @template T
 * @typedef {{new (...args: any[]): T}} ES6Class<T>
 */
/**
 * @template T
 * @typedef {{new (...args: any[]): T; (...args: any[]): T; prototype: Function}} Class<T>
 */

/**
 * Wraps an ES6 class so it can be called from legacy code without the new keyword.
 * Usage e.g.:
 * ```js
 // filename: foo.js
 class Foo {
     constructor() { this.bar = 1; }
 }
 module.exports = wrapES6Class(Foo);

 // filename: index.js
 const Foo = require("./foo");
 var x = new Foo(); // works!
 var y = Foo(); // works too!
 ```
 * @template T
 * @param {ES6Class<T>} Class
 * @returns {Class<T>}
 */
function wrapES6Class(Class) {
    const _Class = function _Class() {
        const args = sliceArgs(arguments);
        return new (Function.prototype.bind.apply(Class, [null].concat(args)))();
    };
    _Class.prototype = Class.prototype;
    // @ts-ignore
    return _Class;
}

/**
 * Encrypt the password/value with given key
 * @param {string} key - Secret key
 * @param {string} value - value to encrypt
 * @returns {string}
 */
function encrypt(key, value) {
    let result = '';
    for(let i = 0; i < value.length; i++) {
        result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
    }
    return result;
}

/**
 * Decrypt the password/value with given key
 * @param {string} key - Secret key
 * @param {string} value - value to decript
 * @returns {string}
 */
function decrypt(key, value) {
    let result = '';
    for(let i = 0; i < value.length; i++) {
        result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
    }
    return result;
}

/**
 * Tests whether the given variable is a real object and not an Array
 * @param {any} it The variable to test
 */
function isObject(it) {
    // This is necessary because:
    // typeof null === 'object'
    // typeof [] === 'object'
    // [] instanceof Object === true
    return Object.prototype.toString.call(it) === '[object Object]';
}

/**
 * Tests whether the given variable is really an Array
 * @param {any} it The variable to test
 */
function isArray(it) {
    if (Array.isArray != null) return Array.isArray(it);
    return Object.prototype.toString.call(it) === '[object Array]';
}

/**
 * Measure the Node.js event loop lag and repeatedly call the provided callback function with the updated results
 * @param {number} ms The number of milliseconds for monitoring
 * @param {function} cb Callback function to call for each new value
 */
function measureEventLoopLag(ms, cb) {
    let start = hrtime();

    let timeout = setTimeout(check, ms);
    timeout.unref();

    function check() {
        // workaround for https://github.com/joyent/node/issues/8364
        clearTimeout(timeout);

        // how much time has actually elapsed in the loop beyond what
        // setTimeout says is supposed to happen. we use setTimeout to
        // cover multiple iterations of the event loop, getting a larger
        // sample of what the process is working on.
        const t = hrtime();

        // we use Math.max to handle case where timers are running efficiently
        // and our callback executes earlier than `ms` due to how timers are
        // implemented. this is ok. it means we're healthy.
        cb && cb(Math.max(0, t - start - ms));
        start = t;

        timeout = setTimeout(check, ms);
        timeout.unref();
    }

    function hrtime() {
        const t = process.hrtime();
        return (t[0] * 1e3) + (t[1] / 1e6);
    }
}

/**
 * This function convert state values by read and write of aliases. Function is synchron.
 *
 * @param {object} sourceObj
 * @param {object} targetObj
 * @param {object} state Object with val, ack and so on
 * @param {object} logger Logging object
 * @param {string} logNamespace optional Logging namespace
 */
function formatAliasValue(sourceObj, targetObj, state, logger, logNamespace) {
    logNamespace = logNamespace ? logNamespace + ' ' : '';

    if (!state) {
        return;
    }
    if (state.val === undefined) {
        state.val = null;
        return state;
    }

    if (targetObj && targetObj.alias && targetObj.alias.read) {
        try {
            // process the value here
            const func = new Function('val', 'return ' + targetObj.alias.read);
            state.val = func(state.val);
        } catch (e) {
            logger.error(`${logNamespace}Invalid read function for ${targetObj._id}: ${targetObj.alias.read} => ${e}`);
            return null;
        }
    }

    if (sourceObj && sourceObj.alias && sourceObj.alias.write) {
        try {
            // process the value here
            const func = new Function('val', 'return ' + sourceObj.alias.write);
            state.val = func(state.val);
        } catch (e) {
            logger.error(`${logNamespace}Invalid write function for ${sourceObj._id}: ${sourceObj.alias.write} => ${e}`);
            return null;
        }
    }

    if (targetObj && typeof state.val !== targetObj.type && state.val !== null) {
        if (targetObj.type === 'boolean') {
            const lowerVal = typeof state.val === 'string' ? state.val.toLowerCase() : state.val;
            if (lowerVal === 'off' || lowerVal === 'aus' || state.val === '0') {
                state.val = false;
            } else {
                // this also handles strings like "EIN" or such that will be true
                state.val = !!state.val;
            }
        } else if (targetObj.type === 'number') {
            state.val = parseFloat(state.val);
        } else if (targetObj.type === 'string') {
            state.val = state.val.toString();
        }
    }

    // auto-scaling
    if ((targetObj && targetObj.alias && !targetObj.alias.read) || (sourceObj && sourceObj.alias && !sourceObj.alias.write)) {
        if (targetObj &&
            targetObj.type === 'number' &&
            targetObj.max !== undefined &&
            targetObj.min !== undefined &&
            sourceObj &&
            sourceObj.max !== undefined &&
            sourceObj.min !== undefined) {
            const val = (state.val - sourceObj.min) / (sourceObj.max - sourceObj.min);
            state.val = (targetObj.max - targetObj.min) * val + targetObj.min;
        }
    }

    return state;
}

// This function migrates encrypted attributes to "enc_",
// that will be automatically encrypted and decrypted in admin and in adapter.js
//
// Usage:
// migrateEncodedAttributes(adapter, ['pass', 'token'], true).then(migrated => {
//    if (migrated) {
//       // do nothing and wait for adapter restart
//       return;
//    }
// });
function migrateEncodedAttributes(adapter, attrs, onlyRename) {
    if (typeof attrs === 'string') {
        attrs = [attrs];
    }
    const toMigrate = [];
    attrs.forEach(attr =>
        adapter.config[attr] !== undefined && adapter.config['enc_' + attr] === undefined && toMigrate.push(attr));

    if (toMigrate.length) {
        return new Promise((resolve, reject) => {
            // read system secret
            adapter.getForeignObject('system.config', null, (err, data) => {
                let systemSecret;
                if (data && data.native) {
                    systemSecret = data.native.secret;
                }
                if (systemSecret) {
                    // read instance configuration
                    adapter.getForeignObject('system.adapter.' + adapter.namespace, (err, obj) => {
                        if (obj && obj.native) {
                            toMigrate.forEach(attr => {
                                if (obj.native[attr]) {
                                    if (onlyRename) {
                                        obj.native['enc_' + attr] = obj.native[attr];
                                    } else {
                                        obj.native['enc_' + attr] = adapter.tools.encrypt(systemSecret, obj.native[attr]);
                                    }
                                } else {
                                    obj.native['enc_' + attr] = '';
                                }
                                delete obj.native[attr];
                            });
                            adapter.setForeignObject('system.adapter.' + adapter.namespace, obj, err => {
                                err && adapter.log.error(`Cannot write system.adapter.${adapter.namespace}: ${err}`);
                                !err && adapter.log.info('Attributes are migrated and adapter will be restarted');
                                err ? reject(err) : resolve(true);
                            });
                        } else {
                            adapter.log.error(`system.adapter.${adapter.namespace} not found!`);
                            reject(`system.adapter.${adapter.namespace} not found!`);
                        }
                    });
                } else {
                    adapter.log.error('No system secret found!');
                    reject('No system secret found!');
                }
            });
        });
    } else {
        return Promise.resolve(false);
    }
}

/**
 * remove given id from all enums
 *
 * @alias removeIdFromAllEnums
 * @memberof tools
 * @param {object} objects object to access objects db
 * @param {string} id the object id which will be deleted from enums
 * @returns {Promise}
 *
 */
function removeIdFromAllEnums(objects, id) {
    return new Promise((resolve, reject) => {
        objects.getObjectView('system', 'enum', {startkey: '', endkey: '\u9999'}, (err, res) => {
            if (err) {
                reject(err);
            } else {
                const promises = [];
                for (const obj of res.rows) {
                    const idx = obj.value && obj.value.common && obj.value.common.members ? obj.value.common.members.indexOf(id) : -1;
                    if (idx !== -1) {
                        // the id is in the enum now we have to remove it
                        obj.value.common.members.splice(idx, 1);
                        promises.push(new Promise(resolve => {
                            objects.setObject(obj.value._id, obj.value, err => {
                                err ? reject(err) : resolve();
                            });
                        }));
                    } // endIf
                } // endFor
                Promise.all(promises).then(resolve);
            } // endElse
        });
    });
}

module.exports = {
    appName: getAppName(),
    createUuid,
    decryptPhrase,
    encryptPhrase,
    findIPs,
    generateDefaultCertificates,
    getAdapterDir,
    getCertificateInfo,
    getConfigFileName,
    getDefaultDataDir,
    getFile,
    getHostInfo,
    getHostName,
    getInstalledInfo,
    getIoPack,
    getJson,
    getRepositoryFile,
    getSystemNpmVersion,
    isObject,
    isArray,
    promisify,
    promisifyNoError,
    promiseSequence,
    removeIdFromAllEnums,
    rmdirRecursiveSync,
    sendDiagInfo,
    upToDate,
    checkNonEditable,
    copyAttributes,
    getDiskInfo,
    wrapES6Class,
    setQualityForInstance,
    appendStackTrace,
    captureStackTrace,
    pattern2RegEx,
    encrypt,
    decrypt,
    migrateEncodedAttributes,
    measureEventLoopLag,
    formatAliasValue,
    ERRORS: {
        ERROR_NOT_FOUND: 'Not exists',
        ERROR_EMPTY_OBJECT: 'null object'
    }
};
