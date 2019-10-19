'use strict';

const path   = require('path');
const fs     = require('fs');
const crypto = require('crypto');

function mkdirpAsync(dirname) {
    return new Promise((resolve, reject) =>
        mkdirP(dirname, err => err ? reject(err) : resolve()));
}

function fs_readFileAsync(fileName, encoding) {
    return new Promise((resolve, reject) =>
        fs.readFile(fileName, encoding, (err, data) => err ? reject(err) : resolve(data)));
}

function fs_writeFileAsync(fileName, data, encoding) {
    return new Promise((resolve, reject) =>
        fs.writeFile(fileName, data, encoding, err => err ? reject(err) : resolve()));
}

function fs_statAsync(fileName, options) {
    return new Promise((resolve, reject) =>
        fs.stat(fileName, options , (err, stat) => err ? reject(err) : resolve(stat)));
}

function fs_readdirAsync(dirName) {
    return new Promise((resolve, reject) =>
        fs.readdir(dirName, (err, files) => err ? reject(err) : resolve(files)));
}

function pyconf_readFileAsync(fileName) {
    return new Promise((resolve, reject) =>
        pyconf.readFile(fileName, (err, data) => err ? reject(err) : resolve(data)));
}

function pyconf_writeFileAsync(fileName, data) {
    return new Promise((resolve, reject) =>
        pyconf.writeFile(fileName, data, err => err ? reject(err) : resolve()));
}


function fs_unlinkAsync(fileName) {
    return new Promise((resolve, reject) =>
        fs.unlink(fileName, err => err ? reject(err) : resolve()));
}

function fs_renameAsync(name1, name2) {
    return new Promise((resolve, reject) =>
        fs.rename(name1, name2, err => err ? reject(err) : resolve()));
}

// taken from here: https://github.com/substack/node-mkdirp/blob/master/index.js
const _0777 = parseInt('0777', 8);

function mkdirP(p, opts, f, made) {
    if (typeof opts === 'function') {
        f = opts;
        opts = {};
    } else if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }

    let mode = opts.mode;
    const xfs = opts.fs || fs;

    if (mode === undefined) {
        mode = _0777 & (~process.umask());
    }
    if (!made) made = null;

    const cb = f || (() => {});
    p = path.resolve(p);

    xfs.mkdir(p, mode, err => {
        if (!err) {
            made = made || p;
            return cb(null, made);
        }
        if (err.code === 'ENOENT') {
            mkdirP(path.dirname(p), opts, (err, made) => {
                if (err) {
                    cb(err, made);
                } else {
                    mkdirP(p, opts, cb, made);
                }
            });
        } else {
            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            xfs.stat(p, (err2, stat) => {
                // if the stat fails, then that's super weird.
                // let the original error be the failure reason.
                if (err2 || !stat.isDirectory()) {
                    cb(err, made);
                } else {
                    cb(null, made);
                }
            });
        }
    });
}

// taken from here: https://git.coolaj86.com/coolaj86/fs-safe-replace.js/src/branch/master/index.js
function safeReplace(options) {
    if (!options) {
        options = {};
    }
    if (!options.tmp) {
        options.tmp = 'tmp';
    }
    if (!options.bak) {
        options.bak = 'bak';
    }
    if (options.tmp === options.bak) {
        throw new Error("'tmp' and 'bak' suffixes cannot be the same... duh");
    }

    const tmpnamefn = options.tmpnamefn || (pathname => pathname + '.' + crypto.randomBytes(8).toString('hex') + '.' + options.tmp);
    const baknamefn = options.baknamefn || (pathname => pathname + '.' + options.bak);
    /*
    const namefn = options.namefn || function (pathname) {
      return pathname;
    };
    */

    const sfs = {
        writeFileAsync: (filename, data, options) => 
            sfs.stage(filename, data, options)
                .then(tmpname => sfs.commit(tmpname, filename)),
        stageAsync: (filename, data, options) => {
            const tmpname = tmpnamefn(filename);
            return writeFileAsync(tmpname, data, options)
                .then(() => tmpname);
        },
        commitAsync: (tmpname, filename) => {
            const bakname = baknamefn(filename);
            // this may not exist
            // this may not exist
            //console.log(namefn(filename), '->', bakname);
            return fs_unlinkAsync(bakname)
                .then(() => fs_renameAsync(filename, bakname))
                // this must be successful
                .catch(() => {
                    let err;
                    return fs_renameAsync(tmpname, filename)
                        .catch(_err => {
                            err = _err;
                            return sfs.revert(filename)
                        })
                        .then(() => Promise.reject(err));
                });
        },
        revertAsync: filename =>
            new Promise((resolve, reject) => {
                const bakname = baknamefn(filename);
                const tmpname = tmpnamefn(filename);

                const reader = fs.createReadStream(bakname);
                const writer = fs.createWriteStream(tmpname);

                reader.on('error', reject);
                writer.on('error', reject);

                reader.pipe(writer);
                writer.on('close', () => 
                    sfs.commit(tmpname, filename)
                        .then(() => resolve())
                        .catch(e => reject(e)));
            }),
        tmpnamefn,
        baknamefn,
        create
    };
    sfs.writeFile = sfs.writeFileAsync;
    sfs.stage = sfs.stageAsync;
    sfs.commit = sfs.commitAsync;
    sfs.revert = sfs.revertAsync;

    return sfs;
}

const sfs = safeReplace();

// taken from here: https://git.coolaj86.com/coolaj86/pyconf.js/src/branch/master/index.js
function snakeCase(key) {
    // TODO let user supply list of exceptions
    if ('tlsSni01Port' === key) {
        return 'tls_sni_01_port';
    }
    /*
    else if ('http01Port' === key) {
      return 'http01-port';
    }
    */
    else {
        return key.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
}

function uc(match, c) {
    return c.toUpperCase();
}

function camelCase(key) {
    return key.replace(/_([a-z0-9])/g, uc);
}

function parsePythonConf(str, cb) {
    const keys = {};
    const obj = {};
    const lines = str.split('\n');

    lines.forEach((line, i) => {
        line = line.replace(/#.*/, '').trim();

        if (!line) {
            return;
        }

        const parts = line.split('=');
        const pykey = parts.shift().trim();
        const key = camelCase(pykey);
        let val = parts.join('=').trim();

        if ('True' === val) {
            val = true;
        }
        else if ('False' === val) {
            val = false;
        }
        else if ('None' === val || '' === val) {
            val = null;
        }
        else if (/,/.test(val) && !/^"[^"]*"$/.test(val)) {
            val = val.split(',').map(function(x) { return x.trim(); });
        }
        else if (/^-?[0-9]+$/.test(val)) {
            val = parseInt(val, 10);
        }

        obj[key] = val;
        if ('undefined' !== typeof keys[key]) {
            console.warn("unexpected duplicate key '" + key + "': '" + val + "'");
        }

        keys[key] = i;
    });

    // we want to be able to rewrite the file with comments, etc
    obj.__keys = keys;
    obj.__lines = lines;

    cb(null, obj);
}

function toPyVal(val) {
    if (null === val || '' === val) {
        return 'None';
    }
    else if (true === val) {
        return 'True';
    }
    else if (false === val) {
        return 'False';
    }
    else if ('string' === typeof val) {
        return val;
    }
    else if ('number' === typeof val) {
        return val;
    }
    else if (Array.isArray(val)) {
        val = val.join(',');
        if (-1 === val.indexOf(',')) {
            val += ','; // disambiguates value from array with one element
        }
        return val;
    }

    return val && JSON.stringify(val);
}

function stringifyPythonConf(obj, cb) {
    let endline;

    // nix the final newline
    if (!obj.__lines[obj.__lines.length - 1].trim()) {
        endline = obj.__lines.pop();
    }

    Object.keys(obj).forEach(key => {
        if ('__' === key.slice(0, 2)) {
            return;
        }

        const pykey = snakeCase(key);
        let pyval = toPyVal(obj[key]);
        const num = obj.__keys[key];
        let comment = '';

        if ('undefined' === typeof pyval) {
            if ('number' === typeof num) {
                pyval = 'None';
            } else {
                return;
            }
        }

        if ('number' !== typeof num) {
            obj.__lines.push(pykey + ' = ' + pyval);
            obj.__keys[key] = obj.__lines.length - 1;
            return;
        }

        if ('[' === pykey[0]) {
            return;
        }

        if (!obj.__lines[num] || !obj.__lines[num].indexOf) {
            console.warn('[pyconf] WARN index past array length:');
            console.log(obj.__lines.length, num, obj.__lines[num]);
            return;
        }

        // restore comments
        if (-1 !== obj.__lines[num].indexOf('#')) {
            comment = obj.__lines[num].replace(/.*?(\s*#.*)/, '$1');
        }

        obj.__lines[num] = pykey + ' = ' + pyval + comment;
    });

    if ('string' === typeof endline) {
        obj.__lines.push(endline);
    }

    cb(null, obj.__lines.join('\n'));
}

function writePythonConfFile(pathname, obj, cb) {
    // TODO re-read file?
    stringifyPythonConf(obj, (err, text) => {
        sfs.writeFileAsync(pathname, text, 'utf8')
            .then(() => cb(null, null))
            .catch(err => cb(err));
    });
}

function parsePythonConfFile(pathname, cb) {
    fs.readFile(pathname, 'utf8', (err, text) => {
        if (err) {
            cb(err);
            return;
        }

        parsePythonConf(text, cb);
    });
}

const pyconf = {
    readFile: parsePythonConfFile,
    writeFile: writePythonConfFile,
};

// Initially copied from https://github.com/Daplie/le-store-certbot
// but must be completely rewritten to support DB
let log = function (debug) {
    if (debug) {
        const args = Array.prototype.slice.call(arguments);
        args.shift();
        args.unshift('[le-store-certbot]');
        console.log.apply(console, args);
    }
};

function writeRenewalConfig(args) {
    const pyobj = args.pyobj;
    pyobj.checkpoints = parseInt(pyobj.checkpoints, 10) || 0;

    const liveDir = args.liveDir || path.join(args.configDir, 'live', args.domains[0]);

    const certPath = args.certPath || pyobj.cert || path.join(liveDir, 'cert.pem');
    const fullchainPath = args.fullchainPath || pyobj.fullchain || path.join(liveDir, 'fullchain.pem');
    const chainPath = args.chainPath || pyobj.chain || path.join(liveDir, 'chain.pem');
    const privkeyPath = args.privkeyPath || pyobj.privkey
        //|| args.domainPrivateKeyPath || args.domainKeyPath || pyobj.keyPath
        || path.join(liveDir, 'privkey.pem');

    log(args.debug, 'writeRenewalConfig privkeyPath', privkeyPath);

    const updates = {
        account: args.account.id
        , configDir: args.configDir
        , domains: args.domains

        , email: args.email
        , tos: args.agreeTos && true
        // yes, it's an array. weird, right?
        , webrootPath: args.webrootPath !== undefined ? [args.webrootPath] : []
        , server: args.server || args.acmeDiscoveryUrl

        , privkey: privkeyPath
        , fullchain: fullchainPath
        , cert: certPath
        , chain: chainPath

        , http01Port: args.http01Port
        , keyPath: args.domainPrivateKeyPath || args.privkeyPath
        , rsaKeySize: args.rsaKeySize
        , checkpoints: pyobj.checkpoints
        /* // TODO XXX what's the deal with these? they don't make sense
         // are they just old junk? or do they have a meaning that I don't know about?
         , fullchainPath: path.join(args.configDir, 'chain.pem')
         , certPath: path.join(args.configDir, 'cert.pem')
         , chainPath: path.join(args.configDir, 'chain.pem')
         */ // TODO XXX end
        , workDir: args.workDir
        , logsDir: args.logsDir
    };

    // final section is completely dynamic
    // :hostname = :webroot_path
    args.domains.forEach(hostname => updates[hostname] = args.webrootPath);

    // must write back to the original pyobject or
    // annotations will be lost
    Object.keys(updates).forEach(key => pyobj[key] = updates[key]);

    return mkdirpAsync(path.dirname(args.renewalPath))
        .then(() => pyconf_writeFileAsync(args.renewalPath, pyobj))
        // NOTE
        // writing twice seems to causes a bug,
        // so instead we re-read the file from the disk
        .then(() => pyconf_readFileAsync(args.renewalPath));
}

function pyToJson(pyobj) {
    if (!pyobj) {
        return null;
    }

    const jsobj = {};
    Object.keys(pyobj).forEach(key => jsobj[key] = pyobj[key]);
    jsobj.__lines = undefined;
    jsobj.__keys = undefined;

    return jsobj;
}

const defaults = {
    configDir: [ '~', 'letsencrypt', 'etc' ].join(path.sep),                     // /etc/letsencrypt/
    logsDir: [ '~', 'letsencrypt', 'let', 'log' ].join(path.sep),               // /let/log/letsencrypt/
    workDir: [ '~', 'letsencrypt', 'let', 'lib' ].join(path.sep),                // /let/lib/letsencrypt/

    accountsDir: [ ':configDir', 'accounts', ':serverDir' ].join(path.sep),
    renewalPath: [ ':configDir', 'renewal', ':hostname.conf' ].join(path.sep),
    renewalDir: [ ':configDir', 'renewal', '' ].join(path.sep),
    serverDirGet: copy => (copy.server || '').replace('https://', '').replace(/(\/)$/, '').replace(/\//g, path.sep),

    privkeyPath: ':configDir/live/:hostname/privkey.pem'.split(/\//).join(path.sep),
    fullchainPath: [ ':configDir', 'live', ':hostname', 'fullchain.pem' ].join(path.sep),
    certPath: [ ':configDir', 'live', ':hostname', 'cert.pem' ].join(path.sep),
    chainPath: [ ':configDir', 'live', ':hostname', 'chain.pem' ].join(path.sep),

    rsaKeySize: 2048,
    webrootPath: [ ':workDir', 'acme-challenge' ].join(path.sep),
};

module.exports.create = function (configs) {
    let mergedConfigs;

    if (configs && typeof configs.log === 'function') {
        log = configs.log;
    }

    const store = {
        getOptions: () => {
            if (mergedConfigs) {
                return configs;
            }

            if (!configs.domainKeyPath) {
                configs.domainKeyPath = configs.privkeyPath || defaults.privkeyPath;
            }

            Object.keys(defaults).forEach(key =>  {
                if (!configs[key]) {
                    configs[key] = defaults[key];
                }
            });

            mergedConfigs = configs;
            return configs;
        },
        keypairs: {
            checkAsync: (keypath, format) => {
                if (!keypath) {
                    return null;
                }
                return fs_readFileAsync(keypath, 'ascii')
                    .then(key => {
                        if ('jwk' === format) {
                            return { privateKeyJwk: JSON.parse(key) };
                        } else {
                            return { privateKeyPem: key };
                        }
                    })
                    .catch(err => {
                        if ('ENOENT' !== err.code) {
                            throw err;
                        } else {
                            return null;
                        }
                    });
            },
            setAsync: (keypath, keypair, format) => mkdirpAsync(path.dirname(keypath))
                .then(() => {
                    let key;

                    if ('jwk' === format) {
                        key = JSON.stringify(keypair.privateKeyJwk, null, '  ');
                    } else {
                        key = keypair.privateKeyPem;
                    }

                    return fs_writeFileAsync(keypath, key, 'ascii')
                        .then(() => keypair);
                })
        },

        //
        // Certificates
        //
        certificates: {
            // Certificates
            checkKeypairAsync: args => {
                if (!args.domainKeyPath) {
                    return Promise.reject(new Error('missing options.domainKeyPath'));
                } else {
                    return store.keypairs.checkAsync(args.domainKeyPath, 'pem');
                }
            },
            // Certificates
            setKeypairAsync: (args, keypair) => store.keypairs.setAsync(args.domainKeyPath, keypair, 'pem'),
            // Certificates
            checkAsync: args => {
                if (!args.fullchainPath || !args.privkeyPath || !args.certPath || !args.chainPath) {
                    return Promise.reject(new Error('missing one or more of privkeyPath, fullchainPath, certPath, chainPath from options'));
                }

                //, fs_readFileAsync(fullchainPath, 'ascii')
                // note: if this ^^ gets added back in, the arrays below must change
                return Promise.all([
                    fs_readFileAsync(args.privkeyPath, 'ascii'),   // 0
                    fs_readFileAsync(args.certPath, 'ascii'),      // 1
                    fs_readFileAsync(args.chainPath, 'ascii'),     // 2
                    fs_readFileAsync(args.fullchainPath, 'ascii'), // 3

                    // stat the file, not the link
                    fs_statAsync(args.certPath),                           // 4
                ])
                    .then(arr => {
                        return {
                            privkey: arr[0],                       // privkey.pem
                            cert: arr[1],                          // cert.pem
                            chain: arr[2],                        // chain.pem
                            fullchain: arr[3],                     // fullchain.pem
                            /*
                             // TODO populate these values only if they are known
                             , issuedAt: arr[4].mtime.valueOf()
                             , expiresAt: arr[4].mtime.valueOf() + (90 * 24 * 60 * 60 * 100)
                             */
                        };
                    })
                    .catch(err => {
                        if (args.debug) {
                            console.error('[le-store-certbot] certificates.check');
                            console.error(err.stack);
                        }
                        return null;
                    });
            },
            // Certificates
            setAsync: args => store.configs.getAsync(args)
                .then(pyobj => {
                    const pems = args.pems;

                    pyobj.checkpoints = parseInt(pyobj.checkpoints, 10) || 0;

                    const liveDir = args.liveDir || path.join(args.configDir, 'live', args.domains[0]);

                    const certPath = args.certPath || pyobj.cert || path.join(liveDir, 'cert.pem');
                    const fullchainPath = args.fullchainPath || pyobj.fullchain || path.join(liveDir, 'fullchain.pem');
                    const chainPath = args.chainPath || pyobj.chain || path.join(liveDir, 'chain.pem');
                    const privkeyPath = args.privkeyPath || pyobj.privkey
                        || args.domainKeyPath
                        || path.join(liveDir, 'privkey.pem');

                    const archiveDir = args.archiveDir || path.join(args.configDir, 'archive', args.domains[0]);

                    const checkpoints = pyobj.checkpoints.toString();
                    const certArchive = path.join(archiveDir, 'cert' + checkpoints + '.pem');
                    const fullchainArchive = path.join(archiveDir, 'fullchain' + checkpoints + '.pem');
                    const chainArchive = path.join(archiveDir, 'chain' + checkpoints + '.pem');
                    const privkeyArchive = path.join(archiveDir, 'privkey' + checkpoints + '.pem');

                    return mkdirpAsync(archiveDir).then(() =>
                        Promise.all([
                            sfs.writeFileAsync(certArchive, pems.cert, 'ascii'),
                            sfs.writeFileAsync(chainArchive, pems.chain, 'ascii'),
                            sfs.writeFileAsync(fullchainArchive, pems.cert + pems.chain, 'ascii'),
                            sfs.writeFileAsync(privkeyArchive, pems.privkey, 'ascii'),
                        ]))
                        .then(() => mkdirpAsync(liveDir))
                        .then(() =>
                            Promise.all([
                                sfs.writeFileAsync(certPath, pems.cert, 'ascii'),
                                sfs.writeFileAsync(chainPath, pems.chain, 'ascii'),
                                sfs.writeFileAsync(fullchainPath, pems.cert + pems.chain, 'ascii'),
                                sfs.writeFileAsync(privkeyPath, pems.privkey, 'ascii')
                            ]))
                        .then(() => {
                            pyobj.checkpoints += 1;
                            args.checkpoints += 1;

                            // TODO other than for compatibility this is optional, right?
                            // or is it actually needful for renewal? (i.e. list of domains)
                            return writeRenewalConfig(args);
                        }).then(() => {
                            return {
                                privkey: pems.privkey,
                                cert: pems.cert,
                                chain: pems.chain,

                                /*
                                 // TODO populate these only if they are actually known
                                 , issuedAt: Date.now()
                                 , expiresAt: Date.now() + (90 * 24 * 60 * 60 * 100)
                                 */
                            };
                        });
                }),
        },
        //
        // Accounts
        //
        accounts: {
            // Accounts
            _getAccountKeyPath: function (args) {
                let promise = Promise.resolve(args.accountId);

                if (args.email && !args.accountKeyPath && !args.accountId) {
                    promise = store.accounts._getAccountIdByEmail(args);
                }

                return promise.then(function (accountId) {
                    if (!accountId) {
                        return null;
                    }
                    return args.accountKeyPath || path.join(args.accountsDir, accountId, 'private_key.json');
                });
            },
            // Accounts
            _getAccountIdByEmail: function (args) {
                // If we read 10,000 account directories looking for
                // just one email address, that could get crazy.
                // We should have a folder per email and list
                // each account as a file in the folder
                // TODO
                const email = args.email;
                if ('string' !== typeof email) {
                    log(args.debug, 'No email given');
                    return Promise.resolve(null);
                }
                return fs_readdirAsync(args.accountsDir).then(function (nodes) {
                    log(args.debug, 'success reading arg.accountsDir');

                    return Promise.all(nodes.map(function (node) {
                        return fs_readFileAsync(path.join(args.accountsDir, node, 'regr.json'), 'utf8').then(function (text) {
                            const regr = JSON.parse(text);
                            regr.__accountId = node;

                            return regr;
                        });
                    })).then(function (regrs) {
                        let accountId;

                        log(args.debug, 'regrs.length', regrs.length);

                        regrs.some(function (regr) {
                            return regr.body.contact.some(function (contact) {
                                const match = contact.toLowerCase() === 'mailto:' + email.toLowerCase();
                                if (match) {
                                    accountId = regr.__accountId;
                                    return true;
                                }
                            });
                        });

                        if (!accountId) {
                            return null;
                        }

                        return accountId;
                    });
                }).then(function (accountId) {
                    return accountId;
                }, function (err) {
                    if ('ENOENT' === err.code) {
                        // ignore error
                        return null;
                    }

                    return Promise.reject(err);
                });
            },
            // Accounts
            _getAccountIdByPublicKey: keypair =>
                // we use insecure md5 - even though we know it's bad - because that's how the python client did
                crypto.createHash('md5').update(keypair.publicKeyPem).digest('hex'),
            // Accounts
            checkKeypairAsync: args => {
                if (!(args.accountKeyPath || args.accountsDir)) {
                    return Promise.reject(new Error('must provide one of options.accountKeyPath or options.accountsDir'));
                }

                return store.accounts._getAccountKeyPath(args).then(keypath =>
                    store.keypairs.checkAsync(keypath, 'jwk'));
            },
            // Accounts
            setKeypairAsync: (args, keypair) => {
                let accountId;

                if (args.email) {
                    accountId = store.accounts._getAccountIdByPublicKey(keypair);
                }

                return store.accounts._getAccountKeyPath({
                    accountsDir: args.accountsDir,
                    email: args.email,
                    accountId: args.accountId || accountId,
                })
                    .then(keypath => store.keypairs.setAsync(keypath, keypair, 'jwk'));
            },
            // Accounts
            checkAsync: args => {
                let promise;
                const files = {};
                let accountId;

                if (args.accountId) {
                    promise = Promise.resolve(args.accountId);
                }
                else if (args.email) {
                    promise = store.accounts._getAccountIdByEmail(args);
                }
                else {
                    promise = Promise.reject(new Error('must provide accountId or email'));
                }

                return promise.then(_accountId => {
                    log(args.debug, 'accountId:', _accountId);
                    if (!_accountId) {
                        return false;
                    }
                    accountId = _accountId;
                    const accountDir = path.join(args.accountsDir, accountId);
                    const configs = [ 'meta.json', 'private_key.json', 'regr.json' ];

                    return Promise.all(configs.map(filename => {
                        const keyname = filename.slice(0, -5);

                        return fs_readFileAsync(path.join(accountDir, filename), 'utf8')
                            .then(text => {
                                let data;

                                try {
                                    data = JSON.parse(text);
                                } catch(e) {
                                    files[keyname] = { error: e };
                                    return;
                                }

                                files[keyname] = data;

                                return true;
                            })
                            .catch(err => {
                                log(args.debug, 'Error reading account files:', err);
                                files[keyname] = { error: err };
                            });
                    }));
                }).then(hasAccount => {
                    if (!hasAccount) {
                        return null;
                    }
                    let err;

                    if (!Object.keys(files).every(key => !files[key].error) || !files.private_key || !files.private_key.n) {
                        err = new Error("Account '" + accountId + "' was corrupt (had id, but was missing files).");
                        err.code = 'E_ACCOUNT_CORRUPT';
                        err.data = files;
                        return Promise.reject(err);
                    }

                    //files.private_key;
                    //files.regr;
                    //files.meta;
                    files.accountId = accountId;                  // preserve current account id
                    files.id = accountId;
                    files.keypair = { privateKeyJwk: files.private_key };

                    return files;
                });
            },
            // Accounts
            setAsync: (args, reg) => {
                const os = require('os');
                const accountId = store.accounts._getAccountIdByPublicKey(reg.keypair);
                const accountDir = path.join(args.accountsDir, accountId);
                const accountMeta = {
                    creation_host: os.hostname(),
                    creation_dt: new Date().toISOString(),
                };

                return mkdirpAsync(accountDir)
                // TODO abstract file writing
                    .then(() => Promise.all([
                        // meta.json {"creation_host": "ns1.redirect-www.org", "creation_dt": "2015-12-11T04:14:38Z"}
                        fs_writeFileAsync(path.join(accountDir, 'meta.json'), JSON.stringify(accountMeta), 'utf8'),
                        // private_key.json { "e", "d", "n", "q", "p", "kty", "qi", "dp", "dq" }
                        fs_writeFileAsync(path.join(accountDir, 'private_key.json'), JSON.stringify(reg.keypair.privateKeyJwk), 'utf8'),
                        // regr.json:
                        /*
                         { body: { contact: [ 'mailto:coolaj86@gmail.com' ],
                         agreement: 'https://letsencrypt.org/documents/LE-SA-v1.0.1-July-27-2015.pdf',
                         key: { e: 'AQAB', kty: 'RSA', n: '...' } },
                         uri: 'https://acme-v01.api.letsencrypt.org/acme/reg/71272',
                         new_authzr_uri: 'https://acme-v01.api.letsencrypt.org/acme/new-authz',
                         terms_of_service: 'https://letsencrypt.org/documents/LE-SA-v1.0.1-July-27-2015.pdf' }
                         */
                        fs_writeFileAsync(path.join(accountDir, 'regr.json'), JSON.stringify({ body: reg.receipt }), 'utf8'),
                    ]))
                    .then(() => {
                        return {
                            id: accountId,
                            accountId: accountId,
                            email: args.email,
                            keypair: reg.keypair,
                            receipt: reg.receipt,
                        };
                    });
            },
            // Accounts
            getAccountIdAsync: args =>
                pyconf_readFileAsync(args.renewalPath)
                    .then(renewal => renewal.account)
                    .catch(err => {
                        if ('ENOENT' === err.code) {
                            return store.accounts._getAccountIdByEmail(args);
                        } else {
                            return Promise.reject(err);
                        }
                    })
        },

        //
        // Configs
        //
        configs: {
            // Configs
            checkAsync: copy => {
                copy.domains = [];

                return store.configs._checkHelperAsync(copy).then(pyobj => {
                    const exists = pyobj.checkpoints >= 0;
                    if (!exists) {
                        return null;
                    } else {
                        return pyToJson(pyobj);
                    }
                });
            },
            // Configs
            _checkHelperAsync: args =>
                pyconf_readFileAsync(args.renewalPath)
                    .catch(err => pyconf_readFileAsync(path.join(__dirname, 'renewal.conf.tpl'))),
            // Configs
            getAsync: args => store.configs._checkHelperAsync(args)
                .then(pyobj => {
                    const minver = pyobj.checkpoints >= 0;

                    args.pyobj = pyobj;

                    if (!minver) {
                        args.checkpoints = 0;
                        pyobj.checkpoints = 0;
                        return writeRenewalConfig(args);
                    }

                    // args.account.id = pyobj.account
                    // args.configDir = args.configDir || pyobj.configDir;

                    args.checkpoints = pyobj.checkpoints;

                    args.agreeTos = (args.agreeTos || pyobj.tos) && true;
                    args.email = args.email || pyobj.email;
                    args.domains = args.domains || pyobj.domains;

                    // yes, it's an array. weird, right?
                    args.webrootPath = args.webrootPath || pyobj.webrootPath[0];
                    args.server = args.server || args.acmeDiscoveryUrl || pyobj.server;

                    args.certPath = args.certPath || pyobj.cert;
                    args.privkeyPath = args.privkeyPath || pyobj.privkey;
                    args.chainPath = args.chainPath || pyobj.chain;
                    args.fullchainPath = args.fullchainPath || pyobj.fullchain;

                    //, workDir: args.workDir
                    //, logsDir: args.logsDir
                    args.rsaKeySize = args.rsaKeySize || pyobj.rsaKeySize;
                    args.http01Port = args.http01Port || pyobj.http01Port;
                    args.domainKeyPath = args.domainKeyPath || args.keyPath || pyobj.keyPath;

                    return writeRenewalConfig(args);
                }),
            // Configs
            allAsync: copy => {
                copy.domains = [];

                return fs_readdirAsync(copy.renewalDir).then(nodes => {
                    nodes = nodes.filter(node => /^[a-z0-9]+.*\.conf$/.test(node));

                    return Promise.all(nodes.map(node => {
                        copy.domains = [node.replace(/\.conf$/, '')];
                        return store.configs.getAsync(copy);
                    }));
                });
            }
        }
    };

    return store;
};