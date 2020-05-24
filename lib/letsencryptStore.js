'use strict';

const path   = require('path');
const fs     = require('fs-extra');
const crypto = require('crypto');

// taken from here: https://git.coolaj86.com/coolaj86/fs-safe-replace.js/src/branch/master/index.js
const sfs = {
    writeFileAsync: (filename, data, options) =>
        sfs.stageAsync(filename, data, options)
            .then(tmpname => sfs.commitAsync(tmpname, filename)),
    /**
     * @param {string | import('fs-extra').WriteFileOptions} options
     */
    stageAsync: (filename, data, options) => {
        const tmpname = sfs.tmpnamefn(filename);
        return fs.writeFile(tmpname, data, options)
            .then(() => tmpname);
    },
    commitAsync: (tmpname, filename) => {
        const bakname = sfs.baknamefn(filename);
        // this may not exist
        return fs.unlink(bakname)
            .then(() => fs.rename(filename, bakname))
            // this must be successful
            .catch(_err =>
                fs.rename(tmpname, filename)
                    .catch(err =>
                        sfs.revert(filename)
                            .then(() => Promise.reject(err))));
    },
    tmpnamefn: pathname => pathname + '.' + crypto.randomBytes(8).toString('hex') + '.' + 'tmp',
    baknamefn: pathname => pathname + '.' + 'bak'
};

// taken from here: https://git.coolaj86.com/coolaj86/pyconf.js/src/branch/master/index.js
function parsePythonConf(str) {
    const keys = {};
    const obj = {};
    const lines = str.split('\n');

    lines.forEach((line, i) => {
        line = line.replace(/#.*/, '').trim();

        if (!line) {
            return null;
        }

        const parts = line.split('=');
        const pykey = parts.shift().trim();
        const key = pykey.replace(/_([a-z0-9])/g, (match, c) => c.toUpperCase());
        let val = parts.join('=').trim();

        if ('True' === val) {
            val = true;
        } else if ('False' === val) {
            val = false;
        } else if ('None' === val || '' === val) {
            val = null;
        } else if (/,/.test(val) && !/^"[^"]*"$/.test(val)) {
            val = val.split(',').map(x => x.trim());
        } else if (/^-?[0-9]+$/.test(val)) {
            val = parseInt(val, 10);
        }

        obj[key] = val;
        if ('undefined' !== typeof keys[key]) {
            console.warn(`unexpected duplicate key "${key}": "${val}"`);
        }

        keys[key] = i;
    });

    // we want to be able to rewrite the file with comments, etc
    obj.__keys = keys;
    obj.__lines = lines;

    return obj;
}

function toPyVal(val) {
    if (null === val || '' === val) {
        return 'None';
    } else if (true === val) {
        return 'True';
    } else if (false === val) {
        return 'False';
    } else if ('string' === typeof val) {
        return val;
    } else if ('number' === typeof val) {
        return val;
    } else if (Array.isArray(val)) {
        val = val.join(',');
        if (val.indexOf(',') === -1) {
            val += ','; // disambiguates value from array with one element
        }
        return val;
    } else {
        return val && JSON.stringify(val);
    }
}

function stringifyPythonConf(obj) {
    let endLine;

    // nix the final newline
    if (!obj.__lines[obj.__lines.length - 1].trim()) {
        endLine = obj.__lines.pop();
    }

    Object.keys(obj).forEach(key => {
        if ('__' === key.slice(0, 2)) {
            return;
        }

        let pykey;
        if ('tlsSni01Port' === key) {
            pykey = 'tls_sni_01_port';
        }
        /*
        else if ('http01Port' === key) {
          return 'http01-port';
        }
        */
        else {
            pykey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        }

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
        if (obj.__lines[num].indexOf('#') !== -1) {
            comment = obj.__lines[num].replace(/.*?(\s*#.*)/, '$1');
        }

        obj.__lines[num] = pykey + ' = ' + pyval + comment;
    });

    'string' === typeof endLine && obj.__lines.push(endLine);

    return obj.__lines.join('\n');
}

const pyconf = {
    readFileAsync: pathname =>
        new Promise((resolve, reject) => {
            try {
                resolve(parsePythonConf(fs.readFileSync(pathname, 'utf8')));
            } catch (err) {
                reject(err);
            }
        }),
    writeFileAsync: (pathname, obj) => {
        const text = stringifyPythonConf(obj);
        return sfs.writeFileAsync(pathname, text, 'utf8');
    }
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

    const certPath      = args.certPath      || pyobj.cert      || path.join(liveDir, 'cert.pem');
    const fullchainPath = args.fullchainPath || pyobj.fullchain || path.join(liveDir, 'fullchain.pem');
    const chainPath     = args.chainPath     || pyobj.chain     || path.join(liveDir, 'chain.pem');
    const privkeyPath   = args.privkeyPath   || pyobj.privkey
        //|| args.domainPrivateKeyPath || args.domainKeyPath || pyobj.keyPath
        || path.join(liveDir, 'privkey.pem');

    log(args.debug, 'writeRenewalConfig privkeyPath ', privkeyPath);

    const updates = {
        account:            args.account.id,
        configDir:          args.configDir,
        domains:            args.domains,

        email:              args.email,
        tos:                args.agreeTos && true,
        // yes, it's an array. weird, right?
        webrootPath:        args.webrootPath !== undefined ? [args.webrootPath] : [],
        server:             args.server || args.acmeDiscoveryUrl,

        privkey:            privkeyPath,
        fullchain:          fullchainPath,
        cert:               certPath,
        chain:              chainPath,

        http01Port:         args.http01Port,
        keyPath:            args.domainPrivateKeyPath || args.privkeyPath,
        rsaKeySize:         args.rsaKeySize,
        checkpoints:        pyobj.checkpoints,
        /* // TODO XXX what's the deal with these? they don't make sense
         // are they just old junk? or do they have a meaning that I don't know about?
         fullchainPath: path.join(args.configDir, 'chain.pem'),
         certPath: path.join(args.configDir, 'cert.pem'),
         chainPath: path.join(args.configDir, 'chain.pem'),
         */ // TODO XXX end
        workDir:            args.workDir,
        logsDir:            args.logsDir
    };

    // final section is completely dynamic
    // :hostname = :webroot_path
    args.domains.forEach(hostname => updates[hostname] = args.webrootPath);

    // must write back to the original pyobject or
    // annotations will be lost
    Object.keys(updates).forEach(key => pyobj[key] = updates[key]);

    return fs.ensureDir(path.dirname(args.renewalPath))
        .then(() => pyconf.writeFileAsync(args.renewalPath, pyobj))
        // NOTE
        // writing twice seems to causes a bug,
        // so instead we re-read the file from the disk
        .then(() => pyconf.readFileAsync(args.renewalPath));
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
    configDir:      ['~', 'letsencrypt', 'etc'].join(path.sep),                     // /etc/letsencrypt/
    logsDir:        ['~', 'letsencrypt', 'let', 'log'].join(path.sep),              // /let/log/letsencrypt/
    workDir:        ['~', 'letsencrypt', 'let', 'lib'].join(path.sep),              // /let/lib/letsencrypt/

    accountsDir:    [':configDir', 'accounts', ':serverDir'].join(path.sep),
    renewalPath:    [':configDir', 'renewal', ':hostname.conf'].join(path.sep),
    renewalDir:     [':configDir', 'renewal', ''].join(path.sep),
    serverDirGet:   copy => (copy.server || '').replace('https://', '').replace(/(\/)$/, '').replace(/\//g, path.sep),

    privkeyPath:    ':configDir/live/:hostname/privkey.pem'.split(/\//).join(path.sep),
    fullchainPath:  [':configDir', 'live', ':hostname', 'fullchain.pem'].join(path.sep),
    certPath:       [':configDir', 'live', ':hostname', 'cert.pem'].join(path.sep),
    chainPath:      [':configDir', 'live', ':hostname', 'chain.pem'].join(path.sep),

    rsaKeySize:     2048,
    webrootPath:    [':workDir', 'acme-challenge'].join(path.sep)
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
                } else {
                    return fs.readFile(keypath, 'ascii')
                        .then(key => {
                            if ('jwk' === format) {
                                return {privateKeyJwk: JSON.parse(key)};
                            } else {
                                return {privateKeyPem: key};
                            }
                        })
                        .catch(err => {
                            if ('ENOENT' !== err.code) {
                                throw err;
                            } else {
                                return null;
                            }
                        });
                }
            },
            setAsync: (keypath, keypair, format) =>
                fs.ensureDir(path.dirname(keypath))
                    .then(() => {
                        const key = 'jwk' === format ? JSON.stringify(keypair.privateKeyJwk, null, '  ') : keypair.privateKeyPem;

                        return fs.writeFile(keypath, key, 'ascii')
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

                //, fs.readFile(fullchainPath, 'ascii')
                // note: if this ^^ gets added back in, the arrays below must change
                try {
                    // const stat =   fs.statSync(args.certPath);
                    /*
                     // TODO populate these values only if they are known
                     , issuedAt: arr[4].mtime.valueOf()
                     , expiresAt: arr[4].mtime.valueOf() + (90 * 24 * 60 * 60 * 100)
                     */

                    return Promise.resolve({
                        privkey:   fs.readFileSync(args.privkeyPath,   'ascii'),                     // privkey.pem
                        cert:      fs.readFileSync(args.certPath,      'ascii'),                     // cert.pem
                        chain:     fs.readFileSync(args.chainPath,     'ascii'),                     // chain.pem
                        fullchain: fs.readFileSync(args.fullchainPath, 'ascii')                     // fullchain.pem
                    });
                } catch (err) {
                    args.debug && console.error('[le-store-certbot] certificates.check: ' + err.message);
                    return Promise.resolve(null);
                }
            },
            // Certificates
            setAsync: args => store.configs.getAsync(args)
                .then(pyobj => {
                    const pems = args.pems;

                    pyobj.checkpoints = parseInt(pyobj.checkpoints, 10) || 0;

                    const liveDir = args.liveDir || path.join(args.configDir, 'live', args.domains[0]);

                    const certPath      = args.certPath      || pyobj.cert      || path.join(liveDir, 'cert.pem');
                    const fullchainPath = args.fullchainPath || pyobj.fullchain || path.join(liveDir, 'fullchain.pem');
                    const chainPath     = args.chainPath     || pyobj.chain     || path.join(liveDir, 'chain.pem');
                    const privkeyPath   = args.privkeyPath   || pyobj.privkey
                        || args.domainKeyPath
                        || path.join(liveDir, 'privkey.pem');

                    const archiveDir = args.archiveDir || path.join(args.configDir, 'archive', args.domains[0]);

                    const checkpoints      = pyobj.checkpoints.toString();
                    const certArchive      = path.join(archiveDir, 'cert' + checkpoints + '.pem');
                    const fullchainArchive = path.join(archiveDir, 'fullchain' + checkpoints + '.pem');
                    const chainArchive     = path.join(archiveDir, 'chain' + checkpoints + '.pem');
                    const privkeyArchive   = path.join(archiveDir, 'privkey' + checkpoints + '.pem');

                    return fs.ensureDir(archiveDir).then(() =>
                        Promise.all([
                            sfs.writeFileAsync(certArchive, pems.cert, 'ascii'),
                            sfs.writeFileAsync(chainArchive, pems.chain, 'ascii'),
                            sfs.writeFileAsync(fullchainArchive, pems.cert + pems.chain, 'ascii'),
                            sfs.writeFileAsync(privkeyArchive, pems.privkey, 'ascii')
                        ]))
                        .then(() => fs.ensureDir(liveDir))
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
                                chain: pems.chain

                                /*
                                 // TODO populate these only if they are actually known
                                 , issuedAt: Date.now()
                                 , expiresAt: Date.now() + (90 * 24 * 60 * 60 * 100)
                                 */
                            };
                        });
                })
        },
        //
        // Accounts
        //
        accounts: {
            // Accounts
            _getAccountKeyPath: args => {
                let promise = Promise.resolve(args.accountId);

                if (args.email && !args.accountKeyPath && !args.accountId) {
                    promise = store.accounts._getAccountIdByEmail(args);
                }

                return promise.then(accountId =>
                    !accountId ? null : args.accountKeyPath || path.join(args.accountsDir, accountId, 'private_key.json'));
            },
            // Accounts
            _getAccountIdByEmail: args => {
                // If we read 10,000 account directories looking for
                // just one email address, that could get crazy.
                // We should have a folder per email and list
                // each account as a file in the folder
                // TODO
                const email = args.email;
                if ('string' !== typeof email) {
                    log(args.debug, 'No email given');
                    return Promise.resolve(null);
                } else {
                    return fs.readdir(args.accountsDir)
                        .then(nodes => {
                            log(args.debug, 'success reading arg.accountsDir');

                            return Promise.all(nodes.map(node =>
                                fs.readFile(path.join(args.accountsDir, node, 'regr.json'), 'utf8')
                                    .then(text => {
                                        const regr = JSON.parse(text);
                                        regr.__accountId = node;

                                        return regr;
                                    }))
                            )
                                .then(regrs => {
                                    let accountId;

                                    log(args.debug, 'regrs.length', regrs.length);

                                    regrs.some(regr =>
                                        regr.body.contact.some(contact => {
                                            const match = contact.toLowerCase() === 'mailto:' + email.toLowerCase();
                                            if (match) {
                                                accountId = regr.__accountId;
                                                return true;
                                            }
                                        }));

                                    if (!accountId) {
                                        return null;
                                    }

                                    return accountId;
                                });
                        })
                        .catch(err => {
                            if ('ENOENT' === err.code) {
                                // ignore error
                                return null;
                            } else {
                                return Promise.reject(err);
                            }
                        });
                }
            },
            // Accounts
            _getAccountIdByPublicKey: keypair =>
                // we use insecure md5 - even though we know it's bad - because that's how the python client did
                crypto.createHash('md5').update(keypair.publicKeyPem).digest('hex'),
            // Accounts
            checkKeypairAsync: args => {
                if (!(args.accountKeyPath || args.accountsDir)) {
                    return Promise.reject(new Error('must provide one of options.accountKeyPath or options.accountsDir'));
                } else {
                    return store.accounts._getAccountKeyPath(args)
                        .then(keypath => store.keypairs.checkAsync(keypath, 'jwk'));
                }
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
                    accountId: args.accountId || accountId
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
                } else if (args.email) {
                    promise = store.accounts._getAccountIdByEmail(args);
                } else {
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

                        return fs.readFile(path.join(accountDir, filename), 'utf8')
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
                            .catch(error => {
                                log(args.debug, 'Error reading account files:', error);
                                files[keyname] = {error};
                            });
                    }));
                }).then(hasAccount => {
                    if (!hasAccount) {
                        return null;
                    }
                    let err;

                    if (!Object.keys(files).every(key => !files[key].error) || !files.private_key || !files.private_key.n) {
                        err = new Error(`Account "${accountId}" was corrupt (had id, but was missing files).`);
                        err.code = 'E_ACCOUNT_CORRUPT';
                        err.data = files;
                        return Promise.reject(err);
                    }

                    //files.private_key;
                    //files.regr;
                    //files.meta;
                    files.accountId = accountId;                  // preserve current account id
                    files.id = accountId;
                    files.keypair = {privateKeyJwk: files.private_key};

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
                    creation_dt: new Date().toISOString()
                };

                return fs.ensureDir(accountDir)
                // TODO abstract file writing
                    .then(() => Promise.all([
                        // meta.json {"creation_host": "ns1.redirect-www.org", "creation_dt": "2015-12-11T04:14:38Z"}
                        fs.writeFile(path.join(accountDir, 'meta.json'), JSON.stringify(accountMeta), 'utf8'),
                        // private_key.json { "e", "d", "n", "q", "p", "kty", "qi", "dp", "dq" }
                        fs.writeFile(path.join(accountDir, 'private_key.json'), JSON.stringify(reg.keypair.privateKeyJwk), 'utf8'),
                        // regr.json:
                        /*
                         { body: { contact: [ 'mailto:coolaj86@gmail.com' ],
                         agreement: 'https://letsencrypt.org/documents/LE-SA-v1.0.1-July-27-2015.pdf',
                         key: { e: 'AQAB', kty: 'RSA', n: '...' } },
                         uri: 'https://acme-v01.api.letsencrypt.org/acme/reg/71272',
                         new_authzr_uri: 'https://acme-v01.api.letsencrypt.org/acme/new-authz',
                         terms_of_service: 'https://letsencrypt.org/documents/LE-SA-v1.0.1-July-27-2015.pdf' }
                         */
                        fs.writeFile(path.join(accountDir, 'regr.json'), JSON.stringify({ body: reg.receipt }), 'utf8')
                    ]))
                    .then(() => {
                        return {
                            id: accountId,
                            accountId,
                            email: args.email,
                            keypair: reg.keypair,
                            receipt: reg.receipt
                        };
                    });
            },
            // Accounts
            getAccountIdAsync: args =>
                pyconf.readFileAsync(args.renewalPath)
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
                pyconf.readFileAsync(args.renewalPath)
                    .catch(_err => pyconf.readFileAsync(path.join(__dirname, 'renewal.conf.tpl'))),
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

                return fs.readdir(copy.renewalDir).then(nodes => {
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