/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';
const tools = require(__dirname + '/../../lib/tools.js');

function getBackupDir() {
    let dataDir = tools.getDefaultDataDir();

    // All paths are returned always relative to /node_modules/appName.js-controller
    if (dataDir) {
        if (dataDir[0] === '.' && dataDir[1] === '.') {
            dataDir = __dirname + '/../../' + dataDir;
        } else if (dataDir[0] === '.' && dataDir[1] === '/') {
            dataDir = __dirname + '/../../' + dataDir.substring(2);
        }
    }
    dataDir = dataDir.replace(/\\/g, '/');
    if (dataDir[dataDir.length - 1] !== '/') dataDir += '/';

    let parts = dataDir.split('/');
    parts.pop();// remove data or appName-data
    parts.pop();

    return parts.join('/') + '/backups/';
}

function register(it, expect, context) {
    const testName = context.name + ' ' + context.adapterShortName + ' console: ';
    const setup    = require(__dirname + '/../../lib/setup.js');
    // passwd, user passwd, user check
    it(testName + 'user passwd', function (done) {
        // set initial password
        setup.processCommand(context.objects, context.states, 'passwd', ['admin'], {password: context.appName.toLowerCase()}, err => {
            expect(err).to.be.not.ok;
            // check password
            setup.processCommand(context.objects, context.states, 'user', ['check', 'admin'], {password: context.appName.toLowerCase()}, err => {
                expect(err).to.be.not.ok;
                // negative check
                setup.processCommand(context.objects, context.states, 'user', ['check', 'admin'], {password: context.appName.toLowerCase() + '2'}, err => {
                    expect(err).to.be.ok;
                    // set new password
                    setup.processCommand(context.objects, context.states, 'user', ['passwd', 'admin'], {password: context.appName.toLowerCase() + '1'}, err => {
                        expect(err).to.be.not.ok;
                        // check new Password
                        setup.processCommand(context.objects, context.states, 'user', ['check', 'admin'], {password: context.appName.toLowerCase() + '1'}, err => {
                            expect(err).to.be.not.ok;
                            // set password back
                            setup.processCommand(context.objects, context.states, 'passwd', ['admin'], {password: context.appName.toLowerCase()}, err => {
                                expect(err).to.be.not.ok;
                                // check password
                                setup.processCommand(context.objects, context.states, 'user', ['check', 'admin'], {password: context.appName.toLowerCase()}, err => {
                                    expect(err).to.be.not.ok;
                                    // set password for non existing user
                                    setup.processCommand(context.objects, context.states, 'passwd', ['uuuser'], {password: context.appName.toLowerCase()}, err => {
                                        expect(err).to.be.ok;
                                        // check password for non existing user
                                        setup.processCommand(context.objects, context.states, 'user', ['check', 'uuuser'], {password: context.appName.toLowerCase()}, err => {
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
    }).timeout(2000)

    // user get
    it(testName + 'user get', function (done) {
        // check if no args set
        setup.processCommand(context.objects, context.states, 'user', [], {}, err => {
            expect(err).to.be.ok;
            // no user defined
            setup.processCommand(context.objects, context.states, 'user', ['get'], {}, err => {
                expect(err).to.be.ok;
                // check admin
                setup.processCommand(context.objects, context.states, 'user', ['get', 'admin'], {}, err => {
                    expect(err).to.be.not.ok;
                    // check invalid user
                    setup.processCommand(context.objects, context.states, 'user', ['get', 'aaaa'], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'user', ['add'], {}, err => {
            expect(err).to.be.ok;
            // add admin not allowed
            setup.processCommand(context.objects, context.states, 'user', ['add', 'admin'], {password: 'aaa'}, err => {
                expect(err).to.be.ok;
                // add user
                setup.processCommand(context.objects, context.states, 'user', ['add', 'user'], {ingroup: 'user', password: 'user'}, err => {
                    expect(err).to.be.not.ok;
                    // add existing user not allowed
                    setup.processCommand(context.objects, context.states, 'user', ['add', 'user'], {password: 'user'}, err => {
                        expect(err).to.be.ok;
                        // add with invalid group
                        setup.processCommand(context.objects, context.states, 'user', ['add', 'user1'], {ingroup: 'invalid', password: 'bbb'}, err => {
                            expect(err).to.be.ok;
                            // check adduser
                            setup.processCommand(context.objects, context.states, 'adduser', ['user2'], {ingroup: 'user', password: 'bbb'}, err => {
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
        setup.processCommand(context.objects, context.states, 'user', ['add', 'user1'], {ingroup: 'user', password: ' bbb'}, err => {
            expect(err).to.be.not.ok;
            // check if no args set
            setup.processCommand(context.objects, context.states, 'user', ['enable'], {}, err => {
                expect(err).to.be.ok;
                // enable admin
                setup.processCommand(context.objects, context.states, 'user', ['enable', 'admin'], {}, err => {
                    expect(err).to.be.not.ok;
                    // test short command
                    setup.processCommand(context.objects, context.states, 'user', ['e', 'admin'], {}, err => {
                        expect(err).to.be.not.ok;
                        // check invalid user
                        setup.processCommand(context.objects, context.states, 'user', ['enable', 'aaa'], {}, err => {
                            expect(err).to.be.ok;
                            // admin cannot be disabled
                            setup.processCommand(context.objects, context.states, 'user', ['disable', 'admin'], {}, err => {
                                expect(err).to.be.ok;
                                // user can be disabled
                                setup.processCommand(context.objects, context.states, 'user', ['disable', 'user1'], {}, err => {
                                    expect(err).to.be.not.ok;
                                    // user can be disabled
                                    setup.processCommand(context.objects, context.states, 'user', ['get', 'user1'], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'user', ['del'], {}, err => {
            expect(err).to.be.ok;
            // delete admin not allowed
            setup.processCommand(context.objects, context.states, 'user', ['del', 'admin'], {}, err => {
                expect(err).to.be.ok;
                // delete user
                setup.processCommand(context.objects, context.states, 'user', ['del', 'user'], {}, err => {
                    expect(err).to.be.not.ok;
                    // delete invalid user
                    setup.processCommand(context.objects, context.states, 'user', ['del', 'user'], {}, err => {
                        expect(err).to.be.ok;
                        // check adduser
                        setup.processCommand(context.objects, context.states, 'userdel', ['user2'], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'group', ['add'], {}, err => {
            expect(err).to.be.ok;
            // add administrator not allowed
            setup.processCommand(context.objects, context.states, 'group', ['add', 'administrator'], {}, err => {
                expect(err).to.be.ok;
                // add user
                setup.processCommand(context.objects, context.states, 'group', ['add', 'users'], {}, err => {
                    expect(err).to.be.not.ok;
                    // add existing user not allowed
                    setup.processCommand(context.objects, context.states, 'group', ['add', 'users'], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'group', ['del'], {}, err => {
            expect(err).to.be.ok;
            // delete admin not allowed
            setup.processCommand(context.objects, context.states, 'group', ['del', 'administrator'], {}, err => {
                expect(err).to.be.ok;
                // delete users
                setup.processCommand(context.objects, context.states, 'group', ['del', 'users'], {}, err => {
                    expect(err).to.be.not.ok;
                    // delete invalid group
                    setup.processCommand(context.objects, context.states, 'group', ['del', 'users'], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'group', ['list'], {}, err => {
            expect(err).to.be.ok;
            // check admin
            setup.processCommand(context.objects, context.states, 'group', ['list', 'administrator'], {}, err => {
                expect(err).to.be.not.ok;
                // check invalid user
                setup.processCommand(context.objects, context.states, 'group', ['list', 'aaaa'], {}, err => {
                    expect(err).to.be.ok;
                    done();
                });
            });
        });
    });

    // group get
    it(testName + 'group get', function (done) {
        // check if no args set
        setup.processCommand(context.objects, context.states, 'group', [], {}, err => {
            expect(err).to.be.ok;
            // no user defined
            setup.processCommand(context.objects, context.states, 'group', ['get'], {}, err => {
                expect(err).to.be.ok;
                // check admin
                setup.processCommand(context.objects, context.states, 'group', ['get', 'administrator'], {}, err => {
                    expect(err).to.be.not.ok;
                    // check invalid user
                    setup.processCommand(context.objects, context.states, 'group', ['get', 'aaaa'], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'group', ['add', 'group1'], {}, err => {
            expect(err).to.be.not.ok;
            // check if no args set
            setup.processCommand(context.objects, context.states, 'group', ['enable'], {}, err => {
                expect(err).to.be.ok;
                // enable administrator
                setup.processCommand(context.objects, context.states, 'group', ['enable', 'administrator'], {}, err => {
                    expect(err).to.be.not.ok;
                    // test short command
                    setup.processCommand(context.objects, context.states, 'group', ['e', 'administrator'], {}, err => {
                        expect(err).to.be.not.ok;
                        // check invalid group
                        setup.processCommand(context.objects, context.states, 'group', ['enable', 'aaa'], {}, err => {
                            expect(err).to.be.ok;
                            // administrator cannot be disabled
                            setup.processCommand(context.objects, context.states, 'group', ['disable', 'administrator'], {}, err => {
                                expect(err).to.be.ok;
                                // group can be disabled
                                setup.processCommand(context.objects, context.states, 'group', ['disable', 'group1'], {}, err => {
                                    expect(err).to.be.not.ok;
                                    // group can be disabled
                                    setup.processCommand(context.objects, context.states, 'group', ['get', 'group1'], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'group', ['useradd', 'group1', 'user4'], {}, err => {
            expect(err).to.be.ok;
            // add user for tests
            setup.processCommand(context.objects, context.states, 'user', ['add', 'user4'], {ingroup: 'user', password: 'bbb'}, err => {
                expect(err).to.be.not.ok;
                // add normal user to normal group
                setup.processCommand(context.objects, context.states, 'group', ['useradd', 'group1', 'user4'], {}, err => {
                    expect(err).to.be.not.ok;
                    // admin yet added
                    setup.processCommand(context.objects, context.states, 'group', ['useradd', 'administrator', 'admin'], {}, err => {
                        expect(err).to.be.not.ok;
                        // add to invalid group
                        setup.processCommand(context.objects, context.states, 'group', ['useradd', 'group5', 'admin'], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'group', ['userdel', 'group1', 'user5'], {}, err => {
            expect(err).to.be.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'group', ['userdel', 'group1', 'user4'], {}, err => {
                expect(err).to.be.not.ok;
                // admin not allowed
                setup.processCommand(context.objects, context.states, 'group', ['userdel', 'administrator', 'admin'], {}, err => {
                    expect(err).to.be.not.ok;
                    // remove from invalid group
                    setup.processCommand(context.objects, context.states, 'group', ['userdel', 'group5', 'admin'], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'status', [], {}, err => {
            expect(err).to.be.not.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'isrun', [], {}, err => {
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
        setup.processCommand(context.objects, context.states, 'setup', [], {}, err => {
            expect(err).to.be.not.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'setup', ['first'], {}, err => {
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
        // delete non existing user
        setup.processCommand(context.objects, context.states, 'update', [], {}, err => {
            expect(err).to.be.not.ok;
            setup.processCommand(context.objects, context.states, 'update', ['http://download.iobroker.net/sources-dist.json'], {}, err => {
                expect(err).to.be.not.ok;
                done();
            });
        });
    }).timeout(40000);

    // upgrade

    // clean
    // restore
    // backup
    it(testName + 'backup', done => {
        // create backup
        var dir = getBackupDir();
        var fs = require('fs');
        // delete existing files
        if (fs.existsSync(dir)) {
            var files = fs.readdirSync(dir);
            for (var f = 0; f < files.length; f++) {
                if (files[f].match(/\.tar\.gz$/)) {
                    fs.unlinkSync(dir + files[f]);
                }
            }
        }

        setup.processCommand(context.objects, context.states, 'backup', [], {}, err => {
            expect(err).to.be.not.ok;
            var files = fs.readdirSync(dir);
            // check 2017_03_09-13_48_33_backupioBroker.tar.gz
            var found = false;
            console.log('Check ' + dir);
            for (var f = files.length - 1; f > 0; f--) {
                console.log('Detect ' + dir + files[f]);
                if (files[f].match(/_backupioBroker\.tar\.gz$/)) {
                    found = true;
                    break;
                }
            }
            // TODO why this does not work on TRAVIS
            //expect(found).to.be.true;

            var name = Math.round(Math.random() * 10000).toString();
            setup.processCommand(context.objects, context.states, 'backup', [name], {}, err => {
                expect(err).to.be.not.ok;
                expect(require('fs').existsSync(getBackupDir() + name + '.tar.gz')).to.be.true;
            });
            done();
        });
    }).timeout(20000);

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
        setup.processCommand(context.objects, context.states, 'uuid', [], {}, err => {
            expect(err).to.be.not.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'id', [], {}, err => {
                expect(err).to.be.not.ok;
                done();
            });
        });
    });

    // v version
    it(testName + 'version', function (done) {
        // delete non existing user
        setup.processCommand(context.objects, context.states, 'version', [], {}, err => {
            expect(err).to.be.not.ok;
            // remove normal user from normal group
            setup.processCommand(context.objects, context.states, 'v', [], {}, err => {
                expect(err).to.be.not.ok;
                done();
            });
        });
    });

    // repo
    it(testName + 'repo', function (done) {
        // add non existing repo
        setup.processCommand(context.objects, context.states, 'repo', ['add', 'local', 'some/path'], {}, err => {
            expect(err).to.be.not.ok;
            // set new repo as active
            setup.processCommand(context.objects, context.states, 'repo', ['set', 'local'], {}, err => {
                expect(err).to.be.not.ok;
                // try to delete active repo
                setup.processCommand(context.objects, context.states, 'repo', ['del', 'local'], {}, err => {
                    expect(err).to.be.ok;
                    // set active repo to default
                    setup.processCommand(context.objects, context.states, 'repo', ['set', 'default'], {}, err => {
                        expect(err).to.be.not.ok;
                        // delete non-active repo
                        setup.processCommand(context.objects, context.states, 'repo', ['del', 'local'], {}, err => {
                            expect(err).to.be.not.ok;
                            // add and set as active new repo, but with too less parameters
                            setup.processCommand(context.objects, context.states, 'repo', ['addset', 'local1'], {}, err => {
                                expect(err).to.be.ok;
                                setup.processCommand(context.objects, context.states, 'repo', ['addset', 'local1', 'some/path'], {}, err => {
                                    expect(err).to.be.not.ok;
                                    // try to add new repo with existing name
                                    setup.processCommand(context.objects, context.states, 'repo', ['add', 'local1', 'some/path1'], {}, err => {
                                        expect(err).to.be.ok;
                                        // set active repo to default
                                        setup.processCommand(context.objects, context.states, 'repo', ['set', 'default'], {}, err => {
                                            expect(err).to.be.not.ok;
                                            // try to delete non-active repo
                                            setup.processCommand(context.objects, context.states, 'repo', ['del', 'local1'], {}, err => {
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
        });
    });

    // license
    it(testName + 'license', function (done) {
        // test license
        const licenseText = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaW9icm9rZXIudmlzIiwidHlwZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwaXJlcyI6MjQ0NDM5ODA5NSwidmVyc2lvbiI6IjwyIiwiaWQiOiI5NTBkYWEwMC01MzcxLTExZTctYjQwNS14eHh4eHh4eHh4eHh4IiwiaWF0IjoxNDk3NzEzMjk1fQ.K9t9ZtvAsdeNFTJed4Sidq2jrr9UFOYpMt6VLmBdVzWueI9DnCXFS5PwBFTBTmF9WMhVk6LBw5ujIVl130B_5NrHl21PHkCLvJeW7jGsMgWDINuBK5F9k8LZABdsv7uDbqNDSOsVrFwEKOu2V3N5sMWYOVE4N_COIg9saaLvyN69oIP27PTgk1GHuyU4giFKGLPTp10L5p2hxLX0lEPjSdDggbl7dEqEe1-u5WwkyBizp03pMtHGYtjnACtP_KBuOly7QpmAnoPlfFoW79xgRjICbd41wT43IvhKAAo1zfnRAeWfQ7QoUViKsc6N1es87QC4KKw-eToLPXOO5UzWOg';
        let licenseFile = __dirname + '/visLicense.data';
        licenseFile = licenseFile.replace(/\\/g, '/');
        const fs = require('fs');
        fs.writeFileSync(licenseFile, licenseText);
        // expect warning about license
        setup.processCommand(context.objects, context.states, 'license', [], {}, err => {
            expect(err).to.be.ok;
            // expect warning about invalid license
            setup.processCommand(context.objects, context.states, 'license', ['invalidLicense'], {}, err => {
                expect(err).to.be.ok;
                context.objects.setObjectAsync('system.adapter.vis.0', {
                    common: {
                        name: 'iobroker.vis'
                    },
                    native: {

                    },
                    type: 'instance'
                }).then(() => // license must be taken
                    setup.processCommand(context.objects, context.states, 'license', [licenseFile], {}, err => {
                        fs.unlinkSync(licenseFile);
                        expect(err).to.be.not.ok;
                        context.objects.getObjectAsync('system.adapter.vis.0')
                            .then(obj => {
                                expect(obj.native.license).to.be.equal(licenseText);
                                // license must be taken
                                setup.processCommand(context.objects, context.states, 'license', [licenseText], {}, err => {
                                    expect(err).to.be.not.ok;
                                    context.objects.getObjectAsync('system.adapter.vis.0')
                                        .then(obj => {
                                            expect(obj.native.license).to.be.equal(licenseText);
                                            done();
                                        });

                                });
                            });
                    })
                );
            });
        });
    });
    
    // info
    it(testName + 'info', done => {
        setup.processCommand(context.objects, context.states, 'info', [], {}, err => {
            expect(err).to.be.not.ok;
            done();
        });
    }).timeout(6000)
}


module.exports.register = register;
