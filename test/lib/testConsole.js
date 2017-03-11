/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';
var tools = require(__dirname + '/../../lib/tools.js');

function getBackupDir() {
    var dataDir = tools.getDefaultDataDir();

    // All pathes are returned always relative to /node_modules/appName.js-controller
    if (dataDir) {
        if (dataDir[0] == '.' && dataDir[1] == '.') {
            dataDir = __dirname + '/../../' + dataDir;
        } else if (dataDir[0] == '.' && dataDir[1] == '/') {
            dataDir = __dirname + '/../../' + dataDir.substring(2);
        }
    }
    dataDir = dataDir.replace(/\\/g, '/');
    if (dataDir[dataDir.length - 1] != '/') dataDir += '/';

    var parts = dataDir.split('/');
    parts.pop();// remove data or appName-data
    parts.pop();

    return parts.join('/') + '/backups/';
}

function register(it, expect, context) {
    var testName = context.name + ' ' + context.adapterShortName + ' console: ';
    var setup    = require(__dirname + '/../../lib/setup.js');
    // passwd, user passwd, user check
    it(testName + 'user passwd', function (done) {
        this.timeout(1000);
        // set initial password
        setup.processCommand(context.objects, context.states, 'passwd', ['admin'], {password: context.appName.toLowerCase()}, function (err) {
            expect(err).to.be.not.ok;
            // check password
            setup.processCommand(context.objects, context.states, 'user', ['check', 'admin'], {password: context.appName.toLowerCase()}, function (err) {
                expect(err).to.be.not.ok;
                // negative check
                setup.processCommand(context.objects, context.states, 'user', ['check', 'admin'], {password: context.appName.toLowerCase() + '2'}, function (err) {
                    expect(err).to.be.ok;
                    // set new password
                    setup.processCommand(context.objects, context.states, 'user', ['passwd', 'admin'], {password: context.appName.toLowerCase() + '1'}, function (err) {
                        expect(err).to.be.not.ok;
                        // check new Password
                        setup.processCommand(context.objects, context.states, 'user', ['check', 'admin'], {password: context.appName.toLowerCase() + '1'}, function (err) {
                            expect(err).to.be.not.ok;
                            // set password back
                            setup.processCommand(context.objects, context.states, 'passwd', ['admin'], {password: context.appName.toLowerCase()}, function (err) {
                                expect(err).to.be.not.ok;
                                // check password
                                setup.processCommand(context.objects, context.states, 'user', ['check', 'admin'], {password: context.appName.toLowerCase()}, function (err) {
                                    expect(err).to.be.not.ok;
                                    // set password for non existing user
                                    setup.processCommand(context.objects, context.states, 'passwd', ['uuuser'], {password: context.appName.toLowerCase()}, function (err) {
                                        expect(err).to.be.ok;
                                        // check password for non existing user
                                        setup.processCommand(context.objects, context.states, 'user', ['check', 'uuuser'], {password: context.appName.toLowerCase()}, function (err) {
                                            expect(err).to.be.ok;
                                            done();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // user get
    it(testName + 'user get', function (done) {
        // check if no args set
        setup.processCommand(context.objects, context.states, 'user', [], {}, function (err) {
            expect(err).to.be.ok;
            // no user defined
            setup.processCommand(context.objects, context.states, 'user', ['get'], {}, function (err) {
                expect(err).to.be.ok;
                // check admin
                setup.processCommand(context.objects, context.states, 'user', ['get', 'admin'], {}, function (err) {
                    expect(err).to.be.not.ok;
                    // check invalid user
                    setup.processCommand(context.objects, context.states, 'user', ['get', 'aaaa'], {}, function (err) {
                        expect(err).to.be.ok;
                        done();
                    });
                });
            });
        });
    });

    // adduser user add
    it(testName + 'user add', function (done) {
        // check if no args set
        setup.processCommand(context.objects, context.states, 'user', ['add'], {}, function (err) {
            expect(err).to.be.ok;
            // add admin not allowed
            setup.processCommand(context.objects, context.states, 'user', ['add', 'admin'], {password: 'aaa'}, function (err) {
                expect(err).to.be.ok;
                // add user
                setup.processCommand(context.objects, context.states, 'user', ['add', 'user'], {ingroup: 'user', password: 'user'}, function (err) {
                    expect(err).to.be.not.ok;
                    // add existing user not allowed
                    setup.processCommand(context.objects, context.states, 'user', ['add', 'user'], {password: 'user'}, function (err) {
                        expect(err).to.be.ok;
                        // add with invalid group
                        setup.processCommand(context.objects, context.states, 'user', ['add', 'user1'], {ingroup: 'invalid', password: 'bbb'}, function (err) {
                            expect(err).to.be.ok;
                            // check adduser
                            setup.processCommand(context.objects, context.states, 'adduser', ['user2'], {ingroup: 'user', password: 'bbb'}, function (err) {
                                expect(err).to.be.not.ok;
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
    
    // user disable / enable
    it(testName + 'user disable/enable', function (done) {
        // add second user
        setup.processCommand(context.objects, context.states, 'user', ['add', 'user1'], {ingroup: 'user', password: ' bbb'}, function (err) {
            expect(err).to.be.not.ok;
            // check if no args set
            setup.processCommand(context.objects, context.states, 'user', ['enable'], {}, function (err) {
                expect(err).to.be.ok;
                // enable admin
                setup.processCommand(context.objects, context.states, 'user', ['enable', 'admin'], {}, function (err) {
                    expect(err).to.be.not.ok;
                    // test short command
                    setup.processCommand(context.objects, context.states, 'user', ['e', 'admin'], {}, function (err) {
                        expect(err).to.be.not.ok;
                        // check invalid user
                        setup.processCommand(context.objects, context.states, 'user', ['enable', 'aaa'], {}, function (err) {
                            expect(err).to.be.ok;
                            // admin cannot be disabled
                            setup.processCommand(context.objects, context.states, 'user', ['disable', 'admin'], {}, function (err) {
                                expect(err).to.be.ok;
                                // user can be disabled
                                setup.processCommand(context.objects, context.states, 'user', ['disable', 'user1'], {}, function (err) {
                                    expect(err).to.be.not.ok;
                                    // user can be disabled
                                    setup.processCommand(context.objects, context.states, 'user', ['get', 'user1'], {}, function (err) {
                                        expect(err).to.be.not.ok;
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // ud udel userdel deluser user del
    it(testName + 'user del', function (done) {
        // check if no args set
        setup.processCommand(context.objects, context.states, 'user', ['del'], {}, function (err) {
            expect(err).to.be.ok;
            // delete admin not allowed
            setup.processCommand(context.objects, context.states, 'user', ['del', 'admin'], {}, function (err) {
                expect(err).to.be.ok;
                // delete user
                setup.processCommand(context.objects, context.states, 'user', ['del', 'user'], {}, function (err) {
                    expect(err).to.be.not.ok;
                    // delete invalid user
                    setup.processCommand(context.objects, context.states, 'user', ['del', 'user'], {}, function (err) {
                        expect(err).to.be.ok;
                        // check adduser
                        setup.processCommand(context.objects, context.states, 'userdel', ['user2'], {}, function (err) {
                            expect(err).to.be.not.ok;
                            done();
                        });
                    });
                });
            });
        });
    });

    // group add
    it(testName + 'group add', function (done) {
        // check if no args set
        setup.processCommand(context.objects, context.states, 'group', ['add'], {}, function (err) {
            expect(err).to.be.ok;
            // add administrator not allowed
            setup.processCommand(context.objects, context.states, 'group', ['add', 'administrator'], {}, function (err) {
                expect(err).to.be.ok;
                // add user
                setup.processCommand(context.objects, context.states, 'group', ['add', 'users'], {}, function (err) {
                    expect(err).to.be.not.ok;
                    // add existing user not allowed
                    setup.processCommand(context.objects, context.states, 'group', ['add', 'users'], {}, function (err) {
                        expect(err).to.be.ok;
                        done();
                    });
                });
            });
        });
    });

    // group del
    it(testName + 'group del', function (done) {
        // check if no args set
        setup.processCommand(context.objects, context.states, 'group', ['del'], {}, function (err) {
            expect(err).to.be.ok;
            // delete admin not allowed
            setup.processCommand(context.objects, context.states, 'group', ['del', 'administrator'], {}, function (err) {
                expect(err).to.be.ok;
                // delete users
                setup.processCommand(context.objects, context.states, 'group', ['del', 'users'], {}, function (err) {
                    expect(err).to.be.not.ok;
                    // delete invalid group
                    setup.processCommand(context.objects, context.states, 'group', ['del', 'users'], {}, function (err) {
                        expect(err).to.be.ok;
                        done();
                    });
                });
            });
        });
    });

    // group list
    it(testName + 'group list', function (done) {
        // check if no args set
        // no user defined
        setup.processCommand(context.objects, context.states, 'group', ['list'], {}, function (err) {
            expect(err).to.be.ok;
            // check admin
            setup.processCommand(context.objects, context.states, 'group', ['list', 'administrator'], {}, function (err) {
                expect(err).to.be.not.ok;
                // check invalid user
                setup.processCommand(context.objects, context.states, 'group', ['list', 'aaaa'], {}, function (err) {
                    expect(err).to.be.ok;
                    done();
                });
            });
        });
    });

    // group get
    it(testName + 'group get', function (done) {
        // check if no args set
        setup.processCommand(context.objects, context.states, 'group', [], {}, function (err) {
            expect(err).to.be.ok;
            // no user defined
            setup.processCommand(context.objects, context.states, 'group', ['get'], {}, function (err) {
                expect(err).to.be.ok;
                // check admin
                setup.processCommand(context.objects, context.states, 'group', ['get', 'administrator'], {}, function (err) {
                    expect(err).to.be.not.ok;
                    // check invalid user
                    setup.processCommand(context.objects, context.states, 'group', ['get', 'aaaa'], {}, function (err) {
                        expect(err).to.be.ok;
                        done();
                    });
                });
            });
        });
    });

    // group disable / enable
    it(testName + 'group disable/enable', function (done) {
        // add second group
        setup.processCommand(context.objects, context.states, 'group', ['add', 'group1'], {}, function (err) {
            expect(err).to.be.not.ok;
            // check if no args set
            setup.processCommand(context.objects, context.states, 'group', ['enable'], {}, function (err) {
                expect(err).to.be.ok;
                // enable administrator
                setup.processCommand(context.objects, context.states, 'group', ['enable', 'administrator'], {}, function (err) {
                    expect(err).to.be.not.ok;
                    // test short command
                    setup.processCommand(context.objects, context.states, 'group', ['e', 'administrator'], {}, function (err) {
                        expect(err).to.be.not.ok;
                        // check invalid group
                        setup.processCommand(context.objects, context.states, 'group', ['enable', 'aaa'], {}, function (err) {
                            expect(err).to.be.ok;
                            // administrator cannot be disabled
                            setup.processCommand(context.objects, context.states, 'group', ['disable', 'administrator'], {}, function (err) {
                                expect(err).to.be.ok;
                                // group can be disabled
                                setup.processCommand(context.objects, context.states, 'group', ['disable', 'group1'], {}, function (err) {
                                    expect(err).to.be.not.ok;
                                    // group can be disabled
                                    setup.processCommand(context.objects, context.states, 'group', ['get', 'group1'], {}, function (err) {
                                        expect(err).to.be.not.ok;
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // group useradd
    it(testName + 'group useradd', function (done) {
        // add non existing user
        setup.processCommand(context.objects, context.states, 'group', ['useradd', 'group1', 'user4'], {}, function (err) {
            expect(err).to.be.ok;
            // add user for tests
            setup.processCommand(context.objects, context.states, 'user', ['add', 'user4'], {ingroup: 'user', password: 'bbb'}, function (err) {
                expect(err).to.be.not.ok;
                // add normal user to normal group
                setup.processCommand(context.objects, context.states, 'group', ['useradd', 'group1', 'user4'], {}, function (err) {
                    expect(err).to.be.not.ok;
                    // admin yet added
                    setup.processCommand(context.objects, context.states, 'group', ['useradd', 'administrator', 'admin'], {}, function (err) {
                        expect(err).to.be.not.ok;
                        // add to invalid group
                        setup.processCommand(context.objects, context.states, 'group', ['useradd', 'group5', 'admin'], {}, function (err) {
                            expect(err).to.be.ok;
                            done();
                        });
                    });
                });
            });
        });
    });

    // group userdel
    it(testName + 'group userdel', function (done) {
        // delete non existing user
        setup.processCommand(context.objects, context.states, 'group', ['userdel', 'group1', 'user5'], {}, function (err) {
            expect(err).to.be.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'group', ['userdel', 'group1', 'user4'], {}, function (err) {
                expect(err).to.be.not.ok;
                // admin not allowed
                setup.processCommand(context.objects, context.states, 'group', ['userdel', 'administrator', 'admin'], {}, function (err) {
                    expect(err).to.be.not.ok;
                    // remove from invalid group
                    setup.processCommand(context.objects, context.states, 'group', ['userdel', 'group5', 'admin'], {}, function (err) {
                        expect(err).to.be.ok;
                        done();
                    });
                });
            });
        });
    });

    // start adapter
    // stop adapter
    // start ??
    // stop ??
    
    // status
    it(testName + 'status', function (done) {
        // delete non existing user
        setup.processCommand(context.objects, context.states, 'status', [], {}, function (err) {
            expect(err).to.be.not.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'isrun', [], {}, function (err) {
                expect(err).to.be.not.ok;
                done();
            });
        });
    });
    // restart adapter 
    // restart ??
    
    // update
    // setup
    it(testName + 'setup', function (done) {
        // delete non existing user
        setup.processCommand(context.objects, context.states, 'setup', [], {}, function (err) {
            expect(err).to.be.not.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'setup', ['first'], {}, function (err) {
                expect(err).to.be.not.ok;
                done();
            });
        });
    });

    // setup custom
    // url
    
    // add a
    // install i
    
    // upload u
    // delete del
    // unsetup
    // object o

    // state s

    // message
    // update
    it(testName + 'update', function (done) {
        this.timeout(20000);
        // delete non existing user
        setup.processCommand(context.objects, context.states, 'update', [], {}, function (err) {
            expect(err).to.be.not.ok;
            setup.processCommand(context.objects, context.states, 'update', ['http://download.iobroker.net/sources-dist.json'], {}, function (err) {
                expect(err).to.be.not.ok;
                done();
            });
        });
    });

    // upgrade

    // clean
    // restore
    // backup
    it(testName + 'backup', function (done) {
        this.timeout(20000);
        // create backup
        var time = new Date();

        setup.processCommand(context.objects, context.states, 'backup', [], {}, function (err) {
            expect(err).to.be.not.ok;
            var dir = getBackupDir();
            var files = require('fs').readdirSync(dir);
            // check 2017_03_09-13_48_33_backupioBroker.tar.gz
            var found = false;
            var offset = -(new Date().getTimezoneOffset() / 60);
            if (offset >= 0) {
                if (offset < 10) offset = '0' + offset;
                offset = '+' + offset + ':00';
            } else {
                if (offset > -10) offset = '0' + Math.abs(offset);
                offset = '-' + offset + ':00';
            }

            for (var f = files.length - 1; f > 0; f--) {
                if (files[f].match(/_backupioBroker.tar.gz$/)) {
                    var t = files[f].substring(0, '2017_03_09-13_48_33'.length);
                    t = t.substring(0, 4) + '-' + t.substring(5, 7) + '-' + t.substring(8, 10) + 'T' + t.substring(11, 13) + ':' + t.substring(14, 16) + ':' + t.substring(17);

                    var tt = new Date(Date.parse(t + offset));
                    if (tt.getTime() >= time.getTime() - 2000) {
                        found = true;
                        break;
                    }
                }
            }
            expect(found).to.be.true;

            var name = Math.round(Math.random() * 10000).toString();
            setup.processCommand(context.objects, context.states, 'backup', [name], {}, function (err) {
                expect(err).to.be.not.ok;
                expect(require('fs').existsSync(getBackupDir() + name + '.tar.gz')).to.be.true;
            });
            done();
        });
    });

    // list l
    // touch
    // rm
    // chmod
    // chown
    // package
    // set
    // host
    // visdebug
    // file f

    // id uuid
    it(testName + 'uuid', function (done) {
        // delete non existing user
        setup.processCommand(context.objects, context.states, 'uuid', [], {}, function (err) {
            expect(err).to.be.not.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'id', [], {}, function (err) {
                expect(err).to.be.not.ok;
                done();
            });
        });
    });

    // v version
    it(testName + 'version', function (done) {
        // delete non existing user
        setup.processCommand(context.objects, context.states, 'version', [], {}, function (err) {
            expect(err).to.be.not.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'v', [], {}, function (err) {
                expect(err).to.be.not.ok;
                done();
            });
        });
    });

    // repo
    
}


module.exports.register = register;
