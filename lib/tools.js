'use strict';

const fs     = require('fs');
const path   = require('path');
const semver = require('semver');
require('events').EventEmitter.prototype._maxListeners = 100;
let request;
let extend;
let password;
let npmVersion;
let crypto;

/**
 * recursively copy values from old object to new one
 *
 * @alias copyAttributes
 * @memberof tools
 * @param {object} oldObj source object
 * @param {object} newObj destination object
 * @param {object} originalObj optional object for read __no_change__ values
 * @param {boolean} isNonEdit optional indicator if copy is in nonEdit part
 *
 */
function copyAttributes(oldObj, newObj, originalObj, isNonEdit) {
    for (let attr in oldObj) {
        if (oldObj.hasOwnProperty(attr)) {
            if (typeof oldObj[attr] !== 'object' || oldObj[attr] instanceof Array) {
                if (oldObj[attr] === '__no_change__' && originalObj && !isNonEdit) {
                    newObj[attr] = JSON.parse(JSON.stringify(originalObj[attr]));
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
    if (!oldObject) return true;
    if (!oldObject.nonEdit && !newObject.nonEdit) return true;

    // if nonEdit is protected with password
    if (oldObject.nonEdit && oldObject.nonEdit.passHash) {
        // If new Object wants to update the nonEdit information
        if (newObject.nonEdit && newObject.nonEdit.password) {
            crypto = crypto || require('crypto');
            const hash = crypto.createHash('sha256').update(newObject.nonEdit.password).digest('base64');
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
            return true;
        } else if (newObject.nonEdit !== undefined) {
            delete newObject.nonEdit;
        }
    } else if (newObject.nonEdit) {
        oldObject.nonEdit = JSON.parse(JSON.stringify(newObject.nonEdit));
        if (newObject.nonEdit.password) {
            crypto = crypto || require('crypto');
            const hash = crypto.createHash('sha256').update(newObject.nonEdit.password).digest('base64');
            delete oldObject.nonEdit.password;
            delete newObject.nonEdit.password;
            oldObject.nonEdit.passHash = hash;
            newObject.nonEdit.passHash = hash;
        }
    }

    // restore settings
    copyAttributes(oldObject.nonEdit, newObject, oldObject);

    if (newObject.passHash) delete newObject.passHash;
    if (newObject.nonEdit && newObject.nonEdit.password) delete newObject.nonEdit.password;
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
    cipher.on('readable', function () {
        const data = cipher.read();
        if (data) {
            encrypted += data.toString('hex');
        }
    });
    cipher.on('end', function () {
        callback(encrypted);
    });

    cipher.write(phrase);
    cipher.end();
}

function decryptPhrase(password, data, callback) {
    crypto = crypto || require('crypto');
    const decipher = crypto.createDecipher('aes192', password);

    try {
        let decrypted = '';
        decipher.on('readable', function () {
            let data = decipher.read();
            if (data) {
                decrypted += data.toString('utf8');
            }
        });
        decipher.on('error', function (error) {
            console.error('Cannot decode secret: ' + error);
            callback(null);
        });
        decipher.on('end', function () {
            callback(decrypted);
        });

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
        fs.readdirSync(path).forEach(function (file/*, index*/) {
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
    let ipArr = [];
    for (let dev in ifaces) {
        if (!ifaces.hasOwnProperty(dev)) continue;
        /*jshint loopfunc:true */
        ifaces[dev].forEach(function (details) {
            //noinspection JSUnresolvedVariable
            if (!details.internal) ipArr.push(details.address);
        });
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
            if (url && url[0] === '/') {
                return __dirname + '/..' + url;
            } else {
                return __dirname + '/../' + path + url;
            }
        }
    }
}

function getMac(callback) {
    const macRegex  = /(?:[a-z0-9]{2}[:\-]){5}[a-z0-9]{2}/ig;
    const zeroRegex = /(?:[0]{2}[:\-]){5}[0]{2}/;
    const command   = (process.platform.indexOf('win') === 0) ? 'getmac' : 'ifconfig || ip link';

    require('child_process').exec(command, function(err, stdout, stderr) {
        if (err) {
            callback(err);
        } else {
            let macAddress;
            let match;
            let result = null;

            while (match = macRegex.exec(stdout)) {
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
        for (let n in ifaces) {
            if (!ifaces.hasOwnProperty(n)) continue;
            for (let c = 0; c < ifaces[n].length; c++) {
                if (ifaces[n][c].mac && ifaces[n][c].mac !== '00:00:00:00:00:00') {
                    mac = ifaces[n][c].mac;
                    break;
                }
            }
            if (mac) break;
        }
    }

    if (mac === '') {
        getMac(function(err, mac) {
            uuid(mac || null, callback);
        });
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

    // todo => delete it after the vendor works 2018.03.28 BF
    if (fs.existsSync('/opt/io-box/config/setup.cfg')) {
        u = 'CM' + u;
    }

    callback(u);
}

function createUuid(_objects, callback) {
    let tasks = 2;
    let _uuid;
    _objects.getObject('system.user.admin', function (err, obj) {
        if (err || !obj) {
            password = password || require(__dirname + '/password');

            // Default Password for user 'admin' is application name in lower case
            password(getAppName()).hash(null, null, function (err, res) {
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
                }, function () {
                    console.log('object system.user.admin created');
                    if (!--tasks && callback) callback(_uuid);
                });
            });
        } else {
            if (!--tasks && callback) callback(_uuid);
        }
    });

    _objects.getObject('system.meta.uuid', function (err, obj) {
        if (!err && obj && obj.native && obj.native.uuid) {
            if (!--tasks && callback) callback();
        } else {
            uuid(function (res) {
                _uuid = res;
                _objects.setObject('system.meta.uuid', {
                    type: 'meta',
                    common: {
                        name: 'uuid',
                        type: 'uuid'
                    },
                    ts: new Date().getTime(),
                    from: 'system.host.' + getHostName() + '.tools',
                    native: {
                        uuid: res
                    }
                }, function () {
                    console.log('object system.meta.uuid created: ' + res);
                    if (!--tasks && callback) callback(_uuid);
                });
            });
        }
    });
}

// Download file to tmp or return file name directly
function getFile(urlOrPath, fileName, callback) {
    if (!request) request = require('request');

    // If object was read
    if (urlOrPath.substring(0, 'http://'.length) === 'http://' ||
        urlOrPath.substring(0, 'https://'.length) === 'https://') {
        const tmpFile = __dirname + '/../tmp/' + (fileName || Math.floor(Math.random() * 0xFFFFFFE) + '.zip');
        request(urlOrPath).on('error', function (error) {
            console.log('Cannot download "' + tmpFile + '": ' + error);
            if (callback) callback(tmpFile);
        }).pipe(fs.createWriteStream(tmpFile)).on('close', function () {
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
function getJson(urlOrPath, callback) {
    if (!request) request = require('request');
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
            request({url: urlOrPath, timeout: 10000}, function (error, response, body) {
                if (error || !body || response.statusCode !== 200) {
                    console.log('Cannot download json from ' + urlOrPath + '. Error: ' + (error || body));
                    if (callback) callback(null, urlOrPath);
                    return;
                }
                try {
                    sources = JSON.parse(body);
                } catch (e) {
                    console.log('Json file is invalid on ' + urlOrPath);
                    if (callback) callback(null, urlOrPath);
                    return;
                }

                if (callback) callback(sources, urlOrPath);
            }).on('error', function (error) {
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

                    //noinspection JSUnresolvedVariable
                    list[ioPackage.common.name] = {
                        controller: ioPackage.common.controller || false,
                        version:    ioPackage.common.version,
                        icon:       ioPackage.common.extIcon || (ioPackage.common.icon ? '/adapter/' + dirs[i] + '/' + ioPackage.common.icon : ''),
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
    let result = {};
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
 * @param {(err: Error | null, version: string) => void} [callback]
 */
function getNpmVersion(adapter, callback) {
    adapter = adapter ? module.exports.appName + '.' + adapter : module.exports.appName;
    adapter = adapter.toLowerCase();

    const cliCommand = `npm view ${adapter}@latest version`;

    const exec = require('child_process').exec;
    exec(cliCommand, {timeout: 2000}, (error, stdout, stderr) => {
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
    getJson(sources[name].meta, function (ioPack) {
        const packUrl = sources[name].meta.replace('io-package.json', 'package.json');
        if (!ioPack) {
            if (sources._helper) sources._helper.failCounter.push(name);
            if (callback) callback(sources, name);
        } else {
            setImmediate(function () {
                getJson(packUrl, function (pack) {
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
                                getNpmVersion(name, function (err, version) {
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
        for (let _name in sources) {
            if (!sources.hasOwnProperty(_name)) continue;
            count++;
        }
        sources._helper = {failCounter: []};

        sources._helper.timeout = setTimeout(function () {
            if (sources._helper) {
                delete sources._helper;
                for (let __name in sources) {
                    if (!sources.hasOwnProperty(__name)) continue;
                    if (sources[__name].processed !== undefined) delete sources[__name].processed;
                }
                if (callback) callback('Timeout by read all package.json (' + count + ') seconds', sources);
                callback = null;
            }
        }, count * 1000);
    }

    for (let name in sources) {
        if (!sources.hasOwnProperty(name)) continue;
        if (sources[name].processed || name === '_helper') continue;

        sources[name].processed = true;
        if (sources[name].url)  sources[name].url  = findPath(path, sources[name].url);
        if (sources[name].meta) sources[name].meta = findPath(path, sources[name].meta);
        if (sources[name].icon) sources[name].icon = findPath(path, sources[name].icon);

        if (!sources[name].name && sources[name].meta) {
            getIoPack(sources, name, function (ignore/*, name*/) {
                if (sources._helper) {
                    if (sources._helper.failCounter.length > 10) {
                        clearTimeout(sources._helper.timeout);
                        delete sources._helper;
                        for (let _name in sources) {
                            if (!sources.hasOwnProperty(_name)) continue;
                            if (sources[_name].processed !== undefined) delete sources[_name].processed;
                        }
                        if (callback) callback('Looks like there is no internet.', sources);
                        callback = null;
                    } else {
                        // process next
                        setImmediate(function () {
                            _getRepositoryFile(sources, path, callback);
                        });
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
        for (let __name in sources) {
            if (!sources.hasOwnProperty(__name)) continue;
            if (sources[__name].processed !== undefined) delete sources[__name].processed;
        }
        if (callback) callback(err, sources);
        callback = null;
    }
}

// Get list of all adapters and controller in some repository file or in /conf/source-dist.json
function getRepositoryFile(urlOrPath, additionalInfo, callback) {
    let sources = {};
    let path =    '';

    if (typeof additionalInfo === 'function') {
        callback = additionalInfo;
        additionalInfo = {};
    }
    if (!additionalInfo) additionalInfo = {};

    if (!extend) extend = require('node.extend');

    if (urlOrPath) {
        let parts = urlOrPath.split('/');
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

        }

        for (let s in sources) {
            if (sources.hasOwnProperty(s) && additionalInfo[s] && additionalInfo[s].published) {
                sources[s].published = additionalInfo[s].published
            }
        }

        _getRepositoryFile(sources, path, function (err) {
            if (err) console.error('[' + new Date() + '] ' + err);
            if (typeof callback === 'function') callback(err, sources);
        });
    } else {
        getJson(urlOrPath, function (sources) {
            if (sources) {
                for (let s in sources) {
                    if (sources.hasOwnProperty(s) && additionalInfo[s] && additionalInfo[s].published) {
                        sources[s].published = additionalInfo[s].published
                    }
                }
                setImmediate(function () {
                    _getRepositoryFile(sources, path, function (err) {
                        if (err) console.error('[' + new Date() + '] ' + err);
                        if (typeof callback === 'function') callback(err, sources);
                    });
                });
            } else {
                if (typeof callback === 'function') callback('Cannot read "' + urlOrPath + '"', {});
            }
        });
    }
}

function sendDiagInfo(obj, callback) {
    if (!request) request = require('request');
    console.log('Send diag info: ' + JSON.stringify(obj));
    request.post({
        url:    'http://download.' + module.exports.appName + '.net/diag.php',
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body:    'data=' + JSON.stringify(obj),
        timeout: 2000
    }, function (err, response, body) {
        /*if (err || !body || response.statusCode !== 200) {

        }*/
        if (typeof callback === 'function') callback();
    }).on('error', function (error) {
        console.log('Cannot send diag info: ' + error.message);
        if (typeof callback === 'function') callback(error);
    });
}

function getAdapterDir(adapter) {
    const appName = module.exports.appName;

    if (adapter.substring(0, appName.length + 1) === appName + '.') {
        adapter = adapter.substring(appName.length + 1);
    }

    let possibilities = [
        appName.toLowerCase() + '.' + adapter + '/package.json',
        appName + '.' + adapter + '/package.json'
    ];

    /** @type {string} */
    let controllerPath;
    for (let i = 0; i < possibilities.length; i++) {
        // special case to not read adapters from js-controller/node_module/adapter adn check first in parent directory
        if (fs.existsSync(__dirname + '/../../' + possibilities[i])) {
            controllerPath = __dirname + '/../../' + possibilities[i];
        } else {
            try {
                controllerPath = require.resolve(possibilities[i]);
                break;
            } catch (e) { /* not found */ }
        }
    }

    if (!controllerPath) {
        return null; // inactive
    } else {
        let parts = path.normalize(controllerPath).split(/[\\\/]/g);
        parts.pop();
        return parts.join('/');
    }
}

function getHostName() {
    try {
        const configName = getConfigFileName();
        const config = JSON.parse(fs.readFileSync(configName, 'utf8'));
        return config.system ? config.system.hostname || require('os').hostname() : require('os').hostname();
    } catch (err) {
        return require('os').hostname();
    }
}

/**
 * Read version of systen npm
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
    let newEnv = Object.assign({}, process.env);
    newEnv.PATH = (newEnv.PATH || newEnv.Path || newEnv.path)
        .split(path.delimiter)
        .filter(dir => {
            dir = dir.toLowerCase();
            return !(dir.indexOf('iobroker') > -1 && dir.indexOf(path.join('node_modules', '.bin')) > -1);

        })
        .join(path.delimiter);

    exec('npm -v', {encoding: 'utf8', env: newEnv}, function (error, stdout) {//, stderr) {
        if (stdout) stdout = semver.valid(stdout.trim());
        if (callback) callback(error, stdout);
    });
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
    const cpus = os.cpus();
    let data = {
        'Platform':     os.platform(),
        'Architecture': os.arch(),
        'CPUs':         cpus.length,
        'Speed':        cpus[0].speed,
        'Model':        cpus[0].model,
        'RAM':          os.totalmem(),
        'System uptime': Math.round(os.uptime()),
        'Node.js':      process.version
    };
    let task = 0;
    task++;
    objects.getObject('system.config', function (err, systemConfig) {
        objects.getObject('system.repositories', function (err, repos) {
            // Check if repositories exists
            if (!err && repos && repos.native && repos.native.repositories) {
                const repo = repos.native.repositories[systemConfig.common.activeRepo];
                if (repo && repo.json) {
                    let count = 0;
                    for (let a in repo.json) {
                        count++;
                    }
                    data['adapters count'] = count;
                }
            }
            if (!--task) {
                callback(err, data);
            }
        });
    });

    if (!npmVersion) {
        task++;
        getSystemNpmVersion(function (err, version) {
            data['NPM'] = 'v' + version;
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
}

// All pathes are returned always relative to /node_modules/' + module.exports.appName + '.js-controller
// the result has always "/" as last symbol
function getDefaultDataDir() {
    //var dataDir = __dirname.replace(/\\/g, '/');
    //dataDir = dataDir.split('/');

    // if debugging with npm5
    if (fs.existsSync(__dirname + '/../../node_modules/' + module.exports.appName + '.js-controller')) {
        return '../' + module.exports.appName + '-data/';
    } else // If installed with npm
    if (fs.existsSync(__dirname + '/../../../node_modules/' + module.exports.appName + '.js-controller')) {
        return '../../' + module.exports.appName + '-data/';
    } else
    {
        //dataDir.splice(dataDir.length - 1, 1);
        //dataDir = dataDir.join('/');
        return './data/';
    }
}

function getConfigFileName() {
    /** @type {string|string[]} */
    let configDir = __dirname.replace(/\\/g, '/');
    configDir = configDir.split('/');

    // If installed with npm
    if (fs.existsSync(__dirname + '/../../../node_modules/' + module.exports.appName.toLowerCase() + '.js-controller') ||
        fs.existsSync(__dirname + '/../../../node_modules/' + module.exports.appName + '.js-controller')) {
        // remove /node_modules/' + module.exports.appName + '.js-controller/lib
        configDir.splice(configDir.length - 3, 3);
        configDir = configDir.join('/');
        return configDir + '/' + module.exports.appName + '-data/' + module.exports.appName + '.json';
    } else
    // if debugging with npm5
    if (fs.existsSync(__dirname + '/../../node_modules/' + module.exports.appName.toLowerCase() + '.js-controller') ||
        fs.existsSync(__dirname + '/../../node_modules/' + module.exports.appName + '.js-controller')) {
        // remove /node_modules/' + module.exports.appName + '.js-controller/lib
        configDir.splice(configDir.length - 2, 2);
        configDir = configDir.join('/');
        return configDir + '/' + module.exports.appName + '-data/' + module.exports.appName + '.json';
    } else {
        // Remove /lib
        configDir.splice(configDir.length - 1, 1);
        configDir = configDir.join('/');
        if (fs.existsSync(__dirname + '/../conf/' + module.exports.appName + '.json')) {
            return configDir + '/conf/' + module.exports.appName + '.json';
        } else {
            return configDir + '/data/' + module.exports.appName + '.json';
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
        return new Promise(function (resolve, reject) {
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
                            default: // multiple values should be returned
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
            ]));
        });
    };
}

/**
 * Promisifies a function which does not provide an error as the first argument in its callback
 * @param {Function} fn The function to promisify
 * @param {any} context (optional) The context (value of `this` to bind the function to)
 * @param {string[]} returnArgNames (optional) If the callback contains multiple arguments, 
 * you can combine them into one object by passing the names as an array. 
 * Otherwise the Promise will resolve with an array
 * @returns {(...args: any[]) => Promise<any>}
 */
function promisifyNoError(fn, context, returnArgNames) {
    return function () {
        const args = sliceArgs(arguments);
        context = context || this;
        return new Promise(function (resolve, reject) {
            fn.apply(context, args.concat([
                function (result) {
                    // decide on how we want to return the callback arguments
                    switch (arguments.length) {
                        case 0: // no arguments were given
                            return resolve(); // Promise<void>
                        case 1: // a single value (result) was returned
                            return resolve(result);
                        default: // multiple values should be returned
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
        return promise.then(result => factory().then(Array.prototype.concat.bind(result)))
    }, Promise.resolve([]));
}

/**
 * Poor man's async/await using generator functions. Turns a generator function into a promise returning function.
 * yield equals await.
 * @template TReturn
 * @param {(...args: any[]) => IterableIterator<TReturn>} makeGenerator A generator function to sequentially execute.
 * @returns {(...args: any[]) => Promise<TReturn>}
 */
function poorMansAsync(makeGenerator) {
    return function () {
        let generator = makeGenerator.apply(this, arguments);

        function handle(result) {
            // result => { done: [Boolean], value: [Object] }
            if (result.done) return Promise.resolve(result.value);

            return Promise.resolve(result.value).then(function (res) {
                return handle(generator.next(res));
            }, function (err) {
                if (typeof err === 'string') err = new Error(err);
                return handle(generator.throw(err));
            });
        }

        try {
            return handle(generator.next());
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
}
// // Example usage:
// function *test(a, b, c) {
//     yield somethingAsyncThatReturnsAPromise(a);
//     // write progress report
//     yield somethingElseThatReturnsAPromise(b);
//     // white progress report
//     yield c;
// }
// var testAsync = gen2Async(test);
// testAsync(1,2,3).then(() => /* we're done */ );

let packageLockDisabled = false;
/**
 * Ensures that package-lock.json gets ignored. Fixes installation issues on npm5
 * @param {(err?) => void} callback The callback to invoke after the command has finished
 */
function disablePackageLock(callback) {
    if (packageLockDisabled) return callback();
    
    const npmrcPath = path.join(__dirname, '../../..', '.npmrc');
    getSystemNpmVersion(function (err, version) {
        packageLockDisabled = true;
        if (version && semver.gte(version, '5.0.0')) {
            // we need to disable the package lock
            if (!fs.existsSync(npmrcPath)) {
                // create the file
                fs.writeFile(npmrcPath, 'package-lock=false\n', {encoding: 'utf8'}, callback);
                return;
            }
        }
        callback();
    });
}

module.exports = {
    appName: getAppName(),
    createUuid,
    decryptPhrase,
    disablePackageLock,
    encryptPhrase,
    findIPs,
    poorMansAsync,
    getAdapterDir,
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
    promisify,
    promisifyNoError,
    promiseSequence,
    rmdirRecursiveSync,
    sendDiagInfo,
    upToDate,
    checkNonEditable,
    copyAttributes
};
