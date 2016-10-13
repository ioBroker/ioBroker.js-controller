// Initially copied from https://github.com/Daplie/le-store-certbot
// but must be completely rewritten to support DB

'use strict';

var PromiseA = require('bluebird');
var mkdirpAsync = PromiseA.promisify(require('mkdirp'));
var path = require('path');
var fs = PromiseA.promisifyAll(require('fs'));
var sfs = require('safe-replace');

var log = function (debug) {
    if (debug) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        args.unshift('[le-store-certbot]');
        console.log.apply(console, args);
    }
};

function writeRenewalConfig(args) {
    var pyobj = args.pyobj;
    pyobj.checkpoints = parseInt(pyobj.checkpoints, 10) || 0;

    var pyconf = PromiseA.promisifyAll(require('pyconf'));

    var liveDir = args.liveDir || path.join(args.configDir, 'live', args.domains[0]);

    var certPath = args.certPath || pyobj.cert || path.join(liveDir, 'cert.pem');
    var fullchainPath = args.fullchainPath || pyobj.fullchain || path.join(liveDir, 'fullchain.pem');
    var chainPath = args.chainPath || pyobj.chain || path.join(liveDir, 'chain.pem');
    var privkeyPath = args.privkeyPath || pyobj.privkey
        //|| args.domainPrivateKeyPath || args.domainKeyPath || pyobj.keyPath
        || path.join(liveDir, 'privkey.pem');

    log(args.debug, 'writeRenewalConfig privkeyPath', privkeyPath);

    var updates = {
        account: args.account.id
        , configDir: args.configDir
        , domains: args.domains

        , email: args.email
        , tos: args.agreeTos && true
        // yes, it's an array. weird, right?
        , webrootPath: args.webrootPath && [args.webrootPath] || []
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
    args.domains.forEach(function (hostname) {
        updates[hostname] = args.webrootPath;
    });

    // must write back to the original pyobject or
    // annotations will be lost
    Object.keys(updates).forEach(function (key) {
        pyobj[key] = updates[key];
    });

    return mkdirpAsync(path.dirname(args.renewalPath)).then(function () {
        return pyconf.writeFileAsync(args.renewalPath, pyobj);
    }).then(function () {
        // NOTE
        // writing twice seems to causes a bug,
        // so instead we re-read the file from the disk
        return pyconf.readFileAsync(args.renewalPath);
    });
}

function pyToJson(pyobj) {
    if (!pyobj) {
        return null;
    }

    var jsobj = {};
    Object.keys(pyobj).forEach(function (key) {
        jsobj[key] = pyobj[key];
    });
    jsobj.__lines = undefined;
    jsobj.__keys = undefined;

    return jsobj;
}

var defaults = {
    configDir: [ '~', 'letsencrypt', 'etc' ].join(path.sep)                     // /etc/letsencrypt/
    , logsDir: [ '~', 'letsencrypt', 'var', 'log' ].join(path.sep)                // /var/log/letsencrypt/
    , workDir: [ '~', 'letsencrypt', 'var', 'lib' ].join(path.sep)                // /var/lib/letsencrypt/

    , accountsDir: [ ':configDir', 'accounts', ':serverDir' ].join(path.sep)
    , renewalPath: [ ':configDir', 'renewal', ':hostname.conf' ].join(path.sep)
    , renewalDir: [ ':configDir', 'renewal', '' ].join(path.sep)
    , serverDirGet: function (copy) {
        return (copy.server || '').replace('https://', '').replace(/(\/)$/, '').replace(/\//g, path.sep);
    }

    , privkeyPath: ':configDir/live/:hostname/privkey.pem'.split(/\//).join(path.sep)
    , fullchainPath: [ ':configDir', 'live', ':hostname', 'fullchain.pem' ].join(path.sep)
    , certPath: [ ':configDir', 'live', ':hostname', 'cert.pem' ].join(path.sep)
    , chainPath: [ ':configDir', 'live', ':hostname', 'chain.pem' ].join(path.sep)

    , rsaKeySize: 2048
    , webrootPath: [ ':workDir', 'acme-challenge' ].join(path.sep)
};

module.exports.create = function (configs) {
    var mergedConfigs;

    if (configs && typeof configs.log === 'function') log = configs.log;

    var store = {
        getOptions: function () {
            if (mergedConfigs) {
                return configs;
            }

            if (!configs.domainKeyPath) {
                configs.domainKeyPath = configs.privkeyPath || defaults.privkeyPath;
            }

            Object.keys(defaults).forEach(function (key) {
                if (!configs[key]) {
                    configs[key] = defaults[key];
                }
            });

            mergedConfigs = configs;
            return configs;
        }

        , keypairs: {
            checkAsync: function (keypath, format) {
                if (!keypath) {
                    return null;
                }
                return fs.readFileAsync(keypath, 'ascii').then(function (key) {
                    if ('jwk' === format) {
                        return { privateKeyJwk: JSON.parse(key) };
                    }
                    else {
                        return { privateKeyPem: key };
                    }
                }, function (err) {
                    if ('ENOENT' !== err.code) {
                        throw err;
                    }

                    return null;
                });
            }
            , setAsync: function (keypath, keypair, format) {
                return mkdirpAsync(path.dirname(keypath)).then(function () {
                    var key;

                    if ('jwk' === format) {
                        key = JSON.stringify(keypair.privateKeyJwk, null, '  ');
                    }
                    else {
                        key = keypair.privateKeyPem;
                    }

                    return fs.writeFileAsync(keypath, key, 'ascii').then(function () {
                        return keypair;
                    });
                });
            }
        }

        //
        // Certificates
        //
        , certificates: {
            // Certificates
            checkKeypairAsync: function (args) {
                if (!args.domainKeyPath) {
                    return PromiseA.reject(new Error("missing options.domainKeyPath"));
                }

                return store.keypairs.checkAsync(args.domainKeyPath, 'pem');
            }
            // Certificates
            , setKeypairAsync: function (args, keypair) {
                return store.keypairs.setAsync(args.domainKeyPath, keypair, 'pem');
            }
            // Certificates
            , checkAsync: function (args) {
                if (!args.fullchainPath || !args.privkeyPath || !args.certPath || !args.chainPath) {
                    return PromiseA.reject(new Error("missing one or more of privkeyPath, fullchainPath, certPath, chainPath from options"));
                }

                //, fs.readFileAsync(fullchainPath, 'ascii')
                // note: if this ^^ gets added back in, the arrays below must change
                return PromiseA.all([
                      fs.readFileAsync(args.privkeyPath, 'ascii')   // 0
                    , fs.readFileAsync(args.certPath, 'ascii')      // 1
                    , fs.readFileAsync(args.chainPath, 'ascii')     // 2
                    , fs.readFileAsync(args.fullchainPath, 'ascii') // 3

                    // stat the file, not the link
                    , fs.statAsync(args.certPath)                   // 4
                ]).then(function (arr) {
                    return {
                          privkey: arr[0]                       // privkey.pem
                        , cert: arr[1]                          // cert.pem
                        , chain: arr[2]                         // chain.pem
                        , fullchain: arr[3]                     // fullchain.pem
                        /*
                         // TODO populate these values only if they are known
                         , issuedAt: arr[4].mtime.valueOf()
                         , expiresAt: arr[4].mtime.valueOf() + (90 * 24 * 60 * 60 * 100)
                         */
                    };
                }, function (err) {
                    if (args.debug) {
                        console.error("[le-store-certbot] certificates.check");
                        console.error(err.stack);
                    }
                    return null;
                });
            }
            // Certificates
            , setAsync: function (args) {
                return store.configs.getAsync(args).then(function (pyobj) {
                    var pems = args.pems;

                    pyobj.checkpoints = parseInt(pyobj.checkpoints, 10) || 0;

                    var liveDir = args.liveDir || path.join(args.configDir, 'live', args.domains[0]);

                    var certPath = args.certPath || pyobj.cert || path.join(liveDir, 'cert.pem');
                    var fullchainPath = args.fullchainPath || pyobj.fullchain || path.join(liveDir, 'fullchain.pem');
                    var chainPath = args.chainPath || pyobj.chain || path.join(liveDir, 'chain.pem');
                    var privkeyPath = args.privkeyPath || pyobj.privkey
                        || args.domainKeyPath
                        || path.join(liveDir, 'privkey.pem');

                    var archiveDir = args.archiveDir || path.join(args.configDir, 'archive', args.domains[0]);

                    var checkpoints = pyobj.checkpoints.toString();
                    var certArchive = path.join(archiveDir, 'cert' + checkpoints + '.pem');
                    var fullchainArchive = path.join(archiveDir, 'fullchain' + checkpoints + '.pem');
                    var chainArchive = path.join(archiveDir, 'chain'+ checkpoints + '.pem');
                    var privkeyArchive = path.join(archiveDir, 'privkey' + checkpoints + '.pem');

                    return mkdirpAsync(archiveDir).then(function () {
                        return PromiseA.all([
                            sfs.writeFileAsync(certArchive, pems.cert, 'ascii')
                            , sfs.writeFileAsync(chainArchive, pems.chain, 'ascii')
                            , sfs.writeFileAsync(fullchainArchive, pems.cert + pems.chain, 'ascii')
                            , sfs.writeFileAsync(privkeyArchive, pems.privkey, 'ascii')
                        ]);
                    }).then(function () {
                        return mkdirpAsync(liveDir);
                    }).then(function () {
                        return PromiseA.all([
                            sfs.writeFileAsync(certPath, pems.cert, 'ascii')
                            , sfs.writeFileAsync(chainPath, pems.chain, 'ascii')
                            , sfs.writeFileAsync(fullchainPath, pems.cert + pems.chain, 'ascii')
                            , sfs.writeFileAsync(privkeyPath, pems.privkey, 'ascii')
                        ]);
                    }).then(function () {
                        pyobj.checkpoints += 1;
                        args.checkpoints += 1;

                        // TODO other than for compatibility this is optional, right?
                        // or is it actually needful for renewal? (i.e. list of domains)
                        return writeRenewalConfig(args);
                    }).then(function () {
                        return {
                            privkey: pems.privkey
                            , cert: pems.cert
                            , chain: pems.chain

                            /*
                             // TODO populate these only if they are actually known
                             , issuedAt: Date.now()
                             , expiresAt: Date.now() + (90 * 24 * 60 * 60 * 100)
                             */
                        };
                    });
                });
            }

        }

        //
        // Accounts
        //
        , accounts: {
            // Accounts
            _getAccountKeyPath: function (args) {
                var promise = PromiseA.resolve(args.accountId);

                if (args.email && !args.accountKeyPath && !args.accountId) {
                    promise = store.accounts._getAccountIdByEmail(args);
                }

                return promise.then(function (accountId) {
                    if (!accountId) {
                        return null;
                    }
                    return args.accountKeyPath || path.join(args.accountsDir, accountId, 'private_key.json');
                });
            }
            // Accounts
            , _getAccountIdByEmail: function (args) {
                // If we read 10,000 account directories looking for
                // just one email address, that could get crazy.
                // We should have a folder per email and list
                // each account as a file in the folder
                // TODO
                var email = args.email;
                if ('string' !== typeof email) {
                    log(args.debug, "No email given");
                    return PromiseA.resolve(null);
                }
                return fs.readdirAsync(args.accountsDir).then(function (nodes) {
                    log(args.debug, "success reading arg.accountsDir");

                    return PromiseA.all(nodes.map(function (node) {
                        return fs.readFileAsync(path.join(args.accountsDir, node, 'regr.json'), 'utf8').then(function (text) {
                            var regr = JSON.parse(text);
                            regr.__accountId = node;

                            return regr;
                        });
                    })).then(function (regrs) {
                        var accountId;

                        log(args.debug, "regrs.length", regrs.length);

                        regrs.some(function (regr) {
                            return regr.body.contact.some(function (contact) {
                                var match = contact.toLowerCase() === 'mailto:' + email.toLowerCase();
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

                    return PromiseA.reject(err);
                });
            }
            // Accounts
            , _getAccountIdByPublicKey: function (keypair) {
                // we use insecure md5 - even though we know it's bad - because that's how the python client did
                return require('crypto').createHash('md5').update(keypair.publicKeyPem).digest('hex');
            }
            // Accounts
            , checkKeypairAsync: function (args) {
                if (!(args.accountKeyPath || args.accountsDir)) {
                    return PromiseA.reject(new Error("must provide one of options.accountKeyPath or options.accountsDir"));
                }

                return store.accounts._getAccountKeyPath(args).then(function (keypath) {
                    return store.keypairs.checkAsync(keypath, 'jwk');
                });
            }
            // Accounts
            , setKeypairAsync: function (args, keypair) {
                var accountId;

                if (args.email) {
                    accountId = store.accounts._getAccountIdByPublicKey(keypair);
                }

                return store.accounts._getAccountKeyPath({
                    accountsDir: args.accountsDir
                    , email: args.email
                    , accountId: args.accountId || accountId
                }).then(function (keypath) {
                    return store.keypairs.setAsync(keypath, keypair, 'jwk');
                });
            }
            // Accounts
            , checkAsync: function (args) {
                var promise;
                var files = {};
                var accountId;

                if (args.accountId) {
                    promise = PromiseA.resolve(args.accountId);
                }
                else if (args.email) {
                    promise = store.accounts._getAccountIdByEmail(args);
                }
                else {
                    promise = PromiseA.reject(new Error("must provide accountId or email"));
                }

                return promise.then(function (_accountId) {
                    log(args.debug, 'accountId:', _accountId);
                    if (!_accountId) {
                        return false;
                    }
                    accountId = _accountId;
                    var accountDir = path.join(args.accountsDir, accountId);
                    var configs = [ 'meta.json', 'private_key.json', 'regr.json' ];

                    return PromiseA.all(configs.map(function (filename) {
                        var keyname = filename.slice(0, -5);

                        return fs.readFileAsync(path.join(accountDir, filename), 'utf8').then(function (text) {
                            var data;

                            try {
                                data = JSON.parse(text);
                            } catch(e) {
                                files[keyname] = { error: e };
                                return;
                            }

                            files[keyname] = data;

                            return true;
                        }, function (err) {
                            log(args.debug, 'Error reading account files:', err);
                            files[keyname] = { error: err };
                        });
                    }));
                }).then(function (hasAccount) {
                    if (!hasAccount) {
                        return null;
                    }
                    var err;

                    if (!Object.keys(files).every(function (key) {
                            return !files[key].error;
                        }) || !files.private_key || !files.private_key.n) {
                        err = new Error("Account '" + accountId + "' was corrupt (had id, but was missing files).");
                        err.code = 'E_ACCOUNT_CORRUPT';
                        err.data = files;
                        return PromiseA.reject(err);
                    }

                    //files.private_key;
                    //files.regr;
                    //files.meta;
                    files.accountId = accountId;                  // preserve current account id
                    files.id = accountId;
                    files.keypair = { privateKeyJwk: files.private_key };

                    return files;
                });
            }
            // Accounts
            , setAsync: function (args, reg) {
                var os = require("os");
                var accountId = store.accounts._getAccountIdByPublicKey(reg.keypair);
                var accountDir = path.join(args.accountsDir, accountId);
                var accountMeta = {
                    creation_host: os.hostname()
                    , creation_dt: new Date().toISOString()
                };

                return mkdirpAsync(accountDir).then(function () {

                    // TODO abstract file writing
                    return PromiseA.all([
                        // meta.json {"creation_host": "ns1.redirect-www.org", "creation_dt": "2015-12-11T04:14:38Z"}
                        fs.writeFileAsync(path.join(accountDir, 'meta.json'), JSON.stringify(accountMeta), 'utf8')
                        // private_key.json { "e", "d", "n", "q", "p", "kty", "qi", "dp", "dq" }
                        , fs.writeFileAsync(path.join(accountDir, 'private_key.json'), JSON.stringify(reg.keypair.privateKeyJwk), 'utf8')
                        // regr.json:
                        /*
                         { body: { contact: [ 'mailto:coolaj86@gmail.com' ],
                         agreement: 'https://letsencrypt.org/documents/LE-SA-v1.0.1-July-27-2015.pdf',
                         key: { e: 'AQAB', kty: 'RSA', n: '...' } },
                         uri: 'https://acme-v01.api.letsencrypt.org/acme/reg/71272',
                         new_authzr_uri: 'https://acme-v01.api.letsencrypt.org/acme/new-authz',
                         terms_of_service: 'https://letsencrypt.org/documents/LE-SA-v1.0.1-July-27-2015.pdf' }
                         */
                        , fs.writeFileAsync(path.join(accountDir, 'regr.json'), JSON.stringify({ body: reg.receipt }), 'utf8')
                    ]);
                }).then(function () {
                    return {
                        id: accountId
                        , accountId: accountId
                        , email: args.email
                        , keypair: reg.keypair
                        , receipt: reg.receipt
                    };
                });
            }
            // Accounts
            , getAccountIdAsync: function (args) {
                var pyconf = PromiseA.promisifyAll(require('pyconf'));

                return pyconf.readFileAsync(args.renewalPath).then(function (renewal) {
                    var accountId = renewal.account;
                    renewal = renewal.account;

                    return accountId;
                }, function (err) {
                    if ("ENOENT" === err.code) {
                        return store.accounts._getAccountIdByEmail(args);
                    }

                    return PromiseA.reject(err);
                });
            }
        }

        //
        // Configs
        //
        , configs: {
            // Configs
            checkAsync: function (copy) {
                copy.domains = [];

                return store.configs._checkHelperAsync(copy).then(function (pyobj) {
                    var exists = pyobj.checkpoints >= 0;
                    if (!exists) {
                        return null;
                    }

                    return pyToJson(pyobj);
                });
            }
            // Configs
            , _checkHelperAsync: function (args) {
                var pyconf = PromiseA.promisifyAll(require('pyconf'));

                return pyconf.readFileAsync(args.renewalPath).then(function (pyobj) {
                    return pyobj;
                }, function () {
                    return pyconf.readFileAsync(path.join(__dirname, 'renewal.conf.tpl')).then(function (pyobj) {
                        return pyobj;
                    });
                });
            }
            // Configs
            , getAsync: function (args) {
                return store.configs._checkHelperAsync(args).then(function (pyobj) {
                    var minver = pyobj.checkpoints >= 0;

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
                });
            }
            // Configs
            , allAsync: function (copy) {
                copy.domains = [];

                return fs.readdirAsync(copy.renewalDir).then(function (nodes) {
                    nodes = nodes.filter(function (node) {
                        return /^[a-z0-9]+.*\.conf$/.test(node);
                    });

                    return PromiseA.all(nodes.map(function (node) {
                        copy.domains = [node.replace(/\.conf$/, '')];
                        return store.configs.getAsync(copy);
                    }));
                });
            }
        }

    };

    return store;
};
