/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';
const tools = require('../../lib/tools.js');

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
    const setup    = require('../../lib/setup.js');
    // passwd, user passwd, user check
    it(testName + 'user passwd', tools.poorMansAsync(function* () {
        let err;

        err = yield setup.processCommandAsync(context.objects, context.states, 'passwd', ['admin'], { password: context.appName.toLowerCase() });
        expect(err).to.be.not.ok;

        // check password
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['check', 'admin'], { password: context.appName.toLowerCase() });
        expect(err).to.be.not.ok;
        // negative check
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['check', 'admin'], { password: context.appName.toLowerCase() + '2' });
        expect(err).to.be.ok;

        // set new password
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['passwd', 'admin'], { password: context.appName.toLowerCase() + '1' });
        expect(err).to.be.not.ok;
        // check new Password
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['check', 'admin'], { password: context.appName.toLowerCase() + '1' });
        expect(err).to.be.not.ok;

        // set password back
        err = yield setup.processCommandAsync(context.objects, context.states, 'passwd', ['admin'], { password: context.appName.toLowerCase() });
        expect(err).to.be.not.ok;
        // check password
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['check', 'admin'], { password: context.appName.toLowerCase() });
        expect(err).to.be.not.ok;

        // set password for non existing user
        err = yield setup.processCommandAsync(context.objects, context.states, 'passwd', ['uuuser'], { password: context.appName.toLowerCase() });
        expect(err).to.be.ok;
        // check password for non existing user
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['check', 'uuuser'], { password: context.appName.toLowerCase() });
        expect(err).to.be.ok;

    })).timeout(2000);

    // user get
    it(testName + 'user get', tools.poorMansAsync(function* () {
        let err;

        // check if no args set
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', [], {});
        expect(err).to.be.ok;
        // no user defined
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['get'], {});
        expect(err).to.be.ok;
        // check admin
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['get', 'admin'], {});
        expect(err).to.be.not.ok;
        // check invalid user
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['get', 'aaaa'], {});
        expect(err).to.be.ok;

    }));

    // adduser user add
    it(testName + 'user add', tools.poorMansAsync(function* () {
        let err;
        // check if no args set
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['add'], {});
        expect(err).to.be.ok;
        // add admin not allowed
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['add', 'admin'], { password: 'aaa' });
        expect(err).to.be.ok;
        // add user
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['add', 'user'], { ingroup: 'user', password: 'user' });
        expect(err).to.be.not.ok;
        // add existing user not allowed
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['add', 'user'], { password: 'user' });
        expect(err).to.be.ok;
        // add with invalid group
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['add', 'user1'], { ingroup: 'invalid', password: 'bbb' });
        expect(err).to.be.ok;
        // check adduser
        err = yield setup.processCommandAsync(context.objects, context.states, 'adduser', ['user2'], { ingroup: 'user', password: 'bbb' });
        expect(err).to.be.not.ok;
    }));

    // user disable / enable
    it(testName + 'user disable/enable', tools.poorMansAsync(function* () {
        let err;
        // add second user
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['add', 'user1'], { ingroup: 'user', password: ' bbb' });
        expect(err).to.be.not.ok;
        // check if no args set
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['enable'], {});
        expect(err).to.be.ok;
        // enable admin
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['enable', 'admin'], {});
        expect(err).to.be.not.ok;
        // test short command
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['e', 'admin'], {});
        expect(err).to.be.not.ok;
        // check invalid user
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['enable', 'aaa'], {});
        expect(err).to.be.ok;
        // admin cannot be disabled
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['disable', 'admin'], {});
        expect(err).to.be.ok;
        // user can be disabled
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['disable', 'user1'], {});
        expect(err).to.be.not.ok;
        // user can be disabled
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['get', 'user1'], {});
        expect(err).to.be.not.ok;
    }));

    // ud udel userdel deluser user del
    it(testName + 'user del', tools.poorMansAsync(function* () {
        let err;
        // check if no args set
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['del'], {});
        expect(err).to.be.ok;
        // delete admin not allowed
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['del', 'admin'], {});
        expect(err).to.be.ok;
        // delete user
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['del', 'user'], {});
        expect(err).to.be.not.ok;
        // delete invalid user
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['del', 'user'], {});
        expect(err).to.be.ok;
        // check adduser
        err = yield setup.processCommandAsync(context.objects, context.states, 'userdel', ['user2'], {});
        expect(err).to.be.not.ok;
    }));

    // group add
    it(testName + 'group add', tools.poorMansAsync(function* () {
        let err;
        // check if no args set
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['add'], {});
        expect(err).to.be.ok;
        // add administrator not allowed
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['add', 'administrator'], {});
        expect(err).to.be.ok;
        // add user
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['add', 'users'], {});
        expect(err).to.be.not.ok;
        // add existing user not allowed
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['add', 'users'], {});
        expect(err).to.be.ok;
    }));

    // group del
    it(testName + 'group del', tools.poorMansAsync(function* () {
        let err;
        // check if no args set
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['del'], {});
        expect(err).to.be.ok;
        // delete admin not allowed
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['del', 'administrator'], {});
        expect(err).to.be.ok;
        // delete users
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['del', 'users'], {});
        expect(err).to.be.not.ok;
        // delete invalid group
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['del', 'users'], {});
        expect(err).to.be.ok;
    }));

    // group list
    it(testName + 'group list', tools.poorMansAsync(function* () {
        let err;
        // check if no args set
        // no user defined
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['list'], {});
        expect(err).to.be.ok;
        // check admin
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['list', 'administrator'], {});
        expect(err).to.be.not.ok;
        // check invalid user
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['list', 'aaaa'], {});
        expect(err).to.be.ok;
    }));

    // group get
    it(testName + 'group get', tools.poorMansAsync(function* () {
        let err;
        // check if no args set
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', [], {});
        expect(err).to.be.ok;
        // no user defined
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['get'], {});
        expect(err).to.be.ok;
        // check admin
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['get', 'administrator'], {});
        expect(err).to.be.not.ok;
        // check invalid user
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['get', 'aaaa'], {});
        expect(err).to.be.ok;
    }));

    // group disable / enable
    it(testName + 'group disable/enable', tools.poorMansAsync(function* () {
        let err;
        // add second group
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['add', 'group1'], {});
        expect(err).to.be.not.ok;
        // check if no args set
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['enable'], {});
        expect(err).to.be.ok;
        // enable administrator
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['enable', 'administrator'], {});
        expect(err).to.be.not.ok;
        // test short command
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['e', 'administrator'], {});
        expect(err).to.be.not.ok;
        // check invalid group
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['enable', 'aaa'], {});
        expect(err).to.be.ok;
        // administrator cannot be disabled
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['disable', 'administrator'], {});
        expect(err).to.be.ok;
        // group can be disabled
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['disable', 'group1'], {});
        expect(err).to.be.not.ok;
        // group can be disabled
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['get', 'group1'], {});
        expect(err).to.be.not.ok;
    }));

    // group useradd
    it(testName + 'group useradd', tools.poorMansAsync(function* () {
        let err;
        // add non existing user
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['useradd', 'group1', 'user4'], {});
        expect(err).to.be.ok;
        // add user for tests
        err = yield setup.processCommandAsync(context.objects, context.states, 'user', ['add', 'user4'], { ingroup: 'user', password: 'bbb' });
        expect(err).to.be.not.ok;
        // add normal user to normal group
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['useradd', 'group1', 'user4'], {});
        expect(err).to.be.not.ok;
        // admin yet added
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['useradd', 'administrator', 'admin'], {});
        expect(err).to.be.not.ok;
        // add to invalid group
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['useradd', 'group5', 'admin'], {});
        expect(err).to.be.ok;
    }));

    // group userdel
    it(testName + 'group userdel', tools.poorMansAsync(function* () {
        let err;
        // delete non existing user
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['userdel', 'group1', 'user5'], {});
        expect(err).to.be.ok;
        // remove normal user from normal group
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['userdel', 'group1', 'user4'], {});
        expect(err).to.be.not.ok;
        // admin not allowed
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['userdel', 'administrator', 'admin'], {});
        expect(err).to.be.not.ok;
        // remove from invalid group
        err = yield setup.processCommandAsync(context.objects, context.states, 'group', ['userdel', 'group5', 'admin'], {});
        expect(err).to.be.ok;
    }));

    // start adapter
    // stop adapter
    // start ??
    // stop ??

    // status
    it(testName + 'status', tools.poorMansAsync(function* () {
        let err;
        // delete non existing user
        err = yield setup.processCommandAsync(context.objects, context.states, 'status', [], {});
        expect(err).to.be.not.ok;
        // remove normal user from normal group
        err = yield setup.processCommandAsync(context.objects, context.states, 'isrun', [], {});
        expect(err).to.be.not.ok;
    }));
    // restart adapter
    // restart ??

    // update
    // setup
    it(testName + 'setup', tools.poorMansAsync(function* () {
        let err;
        // delete non existing user
        err = yield setup.processCommandAsync(context.objects, context.states, 'setup', [], {});
        expect(err).to.be.not.ok;
        // remove normal user from normal group
        err = yield setup.processCommandAsync(context.objects, context.states, 'setup', ['first'], {});
        expect(err).to.be.not.ok;
    }));

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
    it(testName + 'update', tools.poorMansAsync(function* () {
        let err;
        // delete non existing user
        err = yield setup.processCommandAsync(context.objects, context.states, 'update', [], {});
        expect(err).to.be.not.ok;
        err = yield setup.processCommandAsync(context.objects, context.states, 'update', ['http://download.iobroker.net/sources-dist.json'], {});
        expect(err).to.be.not.ok;
    })).timeout(40000);

    // upgrade

    // clean
    // restore
    // backup
    it(testName + 'backup', tools.poorMansAsync(function* () {
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

        let err;
        err = yield setup.processCommandAsync(context.objects, context.states, 'backup', [], {});
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
        err = yield setup.processCommandAsync(context.objects, context.states, 'backup', [name], {});
        expect(err).to.be.not.ok;
        expect(require('fs').existsSync(getBackupDir() + name + '.tar.gz')).to.be.true;
    })).timeout(20000);

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
    it(testName + 'uuid', tools.poorMansAsync(function* () {
        let err;
        // delete non existing user
        err = yield setup.processCommandAsync(context.objects, context.states, 'uuid', [], {});
        expect(err).to.be.not.ok;
        // remove normal user from normal group
        err = yield setup.processCommandAsync(context.objects, context.states, 'id', [], {});
        expect(err).to.be.not.ok;
    }));

    // v version
    it(testName + 'version', tools.poorMansAsync(function* () {
        let err;
        // delete non existing user
        err = yield setup.processCommandAsync(context.objects, context.states, 'version', [], {});
        expect(err).to.be.not.ok;
        // remove normal user from normal group
        err = yield setup.processCommandAsync(context.objects, context.states, 'v', [], {});
        expect(err).to.be.not.ok;
    }));

    // repo
    it(testName + 'repo', tools.poorMansAsync(function* () {
        let err;
        // add non existing repo
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['add', 'local', 'some/path'], {});
        expect(err).to.be.not.ok;
        // set new repo as active
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['set', 'local'], {});
        expect(err).to.be.not.ok;
        // try to delete active repo
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['del', 'local'], {});
        expect(err).to.be.ok;
        // set active repo to default
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['set', 'default'], {});
        expect(err).to.be.not.ok;
        // delete non-active repo
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['del', 'local'], {});
        expect(err).to.be.not.ok;
        // add and set as active new repo, but with too less parameters
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['addset', 'local1'], {});
        expect(err).to.be.ok;
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['addset', 'local1', 'some/path'], {});
        expect(err).to.be.not.ok;
        // try to add new repo with existing name
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['add', 'local1', 'some/path1'], {});
        expect(err).to.be.ok;
        // set active repo to default
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['set', 'default'], {});
        expect(err).to.be.not.ok;
        // try to delete non-active repo
        err = yield setup.processCommandAsync(context.objects, context.states, 'repo', ['del', 'local1'], {});
        expect(err).to.be.not.ok;
    }));

    // license
    it(testName + 'license', tools.poorMansAsync(function* () {
        // test license
        const licenseText = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaW9icm9rZXIudmlzIiwidHlwZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwaXJlcyI6MjQ0NDM5ODA5NSwidmVyc2lvbiI6IjwyIiwiaWQiOiI5NTBkYWEwMC01MzcxLTExZTctYjQwNS14eHh4eHh4eHh4eHh4IiwiaWF0IjoxNDk3NzEzMjk1fQ.K9t9ZtvAsdeNFTJed4Sidq2jrr9UFOYpMt6VLmBdVzWueI9DnCXFS5PwBFTBTmF9WMhVk6LBw5ujIVl130B_5NrHl21PHkCLvJeW7jGsMgWDINuBK5F9k8LZABdsv7uDbqNDSOsVrFwEKOu2V3N5sMWYOVE4N_COIg9saaLvyN69oIP27PTgk1GHuyU4giFKGLPTp10L5p2hxLX0lEPjSdDggbl7dEqEe1-u5WwkyBizp03pMtHGYtjnACtP_KBuOly7QpmAnoPlfFoW79xgRjICbd41wT43IvhKAAo1zfnRAeWfQ7QoUViKsc6N1es87QC4KKw-eToLPXOO5UzWOg';
        let licenseFile = __dirname + '/visLicense.data';
        licenseFile = licenseFile.replace(/\\/g, '/');
        const fs = require('fs');
        fs.writeFileSync(licenseFile, licenseText);

        // expect warning about license
        let err;
        err = yield setup.processCommandAsync(context.objects, context.states, 'license', [], {});
        expect(err).to.be.ok;
        // expect warning about invalid license
        err = yield setup.processCommandAsync(context.objects, context.states, 'license', ['invalidLicense'], {});
        expect(err).to.be.ok;

        yield context.objects.setObjectAsync('system.adapter.vis.0', {
            common: {
                name: 'iobroker.vis'
            },
            native: {

            },
            type: 'instance'
        });
        // license must be taken
        err = yield setup.processCommandAsync(context.objects, context.states, 'license', [licenseFile], {});
        fs.unlinkSync(licenseFile);
        expect(err).to.be.not.ok;
        let obj = yield context.objects.getObjectAsync('system.adapter.vis.0');
        expect(obj.native.license).to.be.equal(licenseText);

        // license must be taken
        err = yield setup.processCommandAsync(context.objects, context.states, 'license', [licenseText], {});
        expect(err).to.be.not.ok;
        obj = yield context.objects.getObjectAsync('system.adapter.vis.0');
        expect(obj.native.license).to.be.equal(licenseText);
    }));
    
    // info
    it(testName + 'info', tools.poorMansAsync(function* () {
        let err;
        err = yield setup.processCommandAsync(context.objects, context.states, 'info', [], {});
        expect(err).to.be.not.ok;
    })).timeout(6000);
}


module.exports.register = register;
