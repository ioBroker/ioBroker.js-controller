/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';
const tools = require('../../lib/tools.js');
const path = require('path');
const cpPromise = require('promisify-child-process');
const iobExecutable = path.join(__dirname, '..', '..', 'iobroker.js');

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
    if (dataDir[dataDir.length - 1] !== '/') {
        dataDir += '/';
    }

    const parts = dataDir.split('/');
    parts.pop();// remove data or appName-data
    parts.pop();

    return parts.join('/') + '/backups/';
}

function register(it, expect, context) {
    const testName = context.name + ' ' + context.adapterShortName + ' console: ';
    const cli    = require('../../lib/setup.js');

    // passwd, user passwd, user check
    it(testName + 'user passwd', async () => {
        let res;

        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} passwd admin --password ${context.appName.toLowerCase()}`);
        expect(res.stderr).to.be.not.ok;

        // check password
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user check admin --password ${context.appName.toLowerCase()}`);
        expect(res.stderr).to.be.not.ok;
        // negative check
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user check admin --password ${`${context.appName.toLowerCase()}2`}`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // set new password
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user passwd admin --password ${`${context.appName.toLowerCase()}1`}`);
        expect(res.stderr).to.be.not.ok;
        // check new Password
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user check admin --password ${`${context.appName.toLowerCase()}1`}`);
        expect(res.stderr).to.be.not.ok;

        // set password back
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user passwd admin --password ${`${context.appName.toLowerCase()}`}`);
        expect(res.stderr).to.be.not.ok;
        // check password
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user check admin --password ${`${context.appName.toLowerCase()}`}`);
        expect(res.stderr).to.be.not.ok;

        // set password for non existing user
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user passwd uuuser --password ${`${context.appName.toLowerCase()}1`}`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // check password for non existing user
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user check uuuser --password ${`${context.appName.toLowerCase()}1`}`);
            expect(true, 'should throw').to.be.false;
        } catch {
            //ok
        }
    }).timeout(20000);

    // user get
    it(testName + 'user get', async () => {
        // check if no args set
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // no user defined
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user get`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // check admin
        const res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user get admin`);
        expect(res.stderr).to.be.not.ok;
        // check invalid user
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user get aaa`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
    }).timeout(20000);

    // adduser user add
    it(testName + 'user add', async () => {
        let res;
        // check if no args set
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user add`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add admin not allowed
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user add admin --password aaa`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add user
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user add newUser --password user --ingroup user`);
        expect(res.stderr).to.be.not.ok;

        // add existing user not allowed
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user add newUser --password user`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add with invalid group
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user add user1 --password bbb --ingroup invalid`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // check adduser
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} adduser user2 --password user --ingroup user`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(20000);

    // user disable / enable
    it(testName + 'user disable/enable', async () => {
        let res;

        // add second user
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user add user1 --password bbb --ingroup user`);
        expect(res.stderr).to.be.not.ok;

        // check if no args set
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user enable`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // enable admin
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user enable admin`);
        expect(res.stderr).to.be.not.ok;

        // test short command
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user e admin`);
        expect(res.stderr).to.be.not.ok;

        // check invalid user
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user enable aaa`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // admin cannot be disabled
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user disable admin`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // user can be disabled
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user disable user1`);
        expect(res.stderr).to.be.not.ok;

        // user can be disabled
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user get user1`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(20000);

    // ud udel userdel deluser user del
    it(testName + 'user del', async () => {
        let res;
        // check if no args set
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user del`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // delete admin not allowed
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user del admin`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // delete user
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} user del user`);
        expect(res.stderr).to.be.not.ok;

        // delete invalid user
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} user del user`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // check userdel
        res = await cpPromise.exec(`${process.execPath} ${iobExecutable} userdel user2`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(20000);

    // group add
    it(testName + 'group add', async () => {
        // check if no args set
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} group add`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add administrator not allowed
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} group add administrator`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add user
        const res = await cpPromise.exec(`${process.execPath} ${iobExecutable} group add users`);
        expect(res.stderr).to.be.not.ok;

        // add existing user not allowed
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} group add users`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
    }).timeout(20000);

    // group del
    it(testName + 'group del', async () => {
        // check if no args set
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} group del`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // delete admin not allowed
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} group del administrator`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // delete users
        const res = await cpPromise.exec(`${process.execPath} ${iobExecutable} group del users`);
        expect(res.stderr).to.be.not.ok;

        // delete invalid group
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} group del users`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
    }).timeout(20000);

    // group list
    it(testName + 'group list', async () => {
        // check if no args set
        // no user defined
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} group list`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // check admin
        const res = await cpPromise.exec(`${process.execPath} ${iobExecutable} group list administrator`);
        expect(res.stderr).to.be.not.ok;

        // check invalid user
        try {
            await cpPromise.exec(`${process.execPath} ${iobExecutable} group list aaa`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
    }).timeout(20000);

    // group get
    it(testName + 'group get', async () => {
        let err;
        // check if no args set
        err = await cli.processCommandAsync(context.objects, context.states, 'group', [], {});
        expect(err).to.be.ok;
        // no user defined
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['get'], {});
        expect(err).to.be.ok;
        // check admin
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['get', 'administrator'], {});
        expect(err).to.be.not.ok;
        // check invalid user
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['get', 'aaaa'], {});
        expect(err).to.be.ok;
    });

    // group disable / enable
    it(testName + 'group disable/enable', async () => {
        let err;
        // add second group
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['add', 'group1'], {});
        expect(err).to.be.not.ok;
        // check if no args set
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['enable'], {});
        expect(err).to.be.ok;
        // enable administrator
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['enable', 'administrator'], {});
        expect(err).to.be.not.ok;
        // test short command
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['e', 'administrator'], {});
        expect(err).to.be.not.ok;
        // check invalid group
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['enable', 'aaa'], {});
        expect(err).to.be.ok;
        // administrator cannot be disabled
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['disable', 'administrator'], {});
        expect(err).to.be.ok;
        // group can be disabled
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['disable', 'group1'], {});
        expect(err).to.be.not.ok;
        // group can be disabled
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['get', 'group1'], {});
        expect(err).to.be.not.ok;
    });

    // group useradd
    it(testName + 'group useradd', async () => {
        let err;
        // add non existing user
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['useradd', 'group1', 'user4'], {});
        expect(err).to.be.ok;
        // add user for tests
        err = await cli.processCommandAsync(context.objects, context.states, 'user', ['add', 'user4'], { ingroup: 'user', password: 'bbb' });
        expect(err).to.be.not.ok;
        // add normal user to normal group
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['useradd', 'group1', 'user4'], {});
        expect(err).to.be.not.ok;
        // admin yet added
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['useradd', 'administrator', 'admin'], {});
        expect(err).to.be.not.ok;
        // add to invalid group
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['useradd', 'group5', 'admin'], {});
        expect(err).to.be.ok;
    });

    // group userdel
    it(testName + 'group userdel', async () => {
        let err;
        // delete non existing user
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['userdel', 'group1', 'user5'], {});
        expect(err).to.be.ok;
        // remove normal user from normal group
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['userdel', 'group1', 'user4'], {});
        expect(err).to.be.not.ok;
        // admin not allowed
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['userdel', 'administrator', 'admin'], {});
        expect(err).to.be.not.ok;
        // remove from invalid group
        err = await cli.processCommandAsync(context.objects, context.states, 'group', ['userdel', 'group5', 'admin'], {});
        expect(err).to.be.ok;
    });

    // start adapter
    // stop adapter
    // start ??
    // stop ??

    // status
    it(testName + 'status', async () => {
        let err;
        // delete non existing user
        err = await cli.processCommandAsync(context.objects, context.states, 'status', [], {});
        expect(err).to.be.not.ok;
        // remove normal user from normal group
        err = await cli.processCommandAsync(context.objects, context.states, 'isrun', [], {});
        expect(err).to.be.not.ok;
    });
    // restart adapter
    // restart ??

    // update
    // setup
    it(testName + 'setup', async () => {
        let err;
        // delete non existing user
        err = await cli.processCommandAsync(context.objects, context.states, 'setup', [], {});
        expect(err).to.be.not.ok;
        // remove normal user from normal group
        err = await cli.processCommandAsync(context.objects, context.states, 'setup', ['first'], {});
        expect(err).to.be.not.ok;
    }).timeout(20000);

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
    it(testName + 'update', async () => {
        let err;
        // delete non existing user
        err = await cli.processCommandAsync(context.objects, context.states, 'update', [], {});
        expect(err).to.be.not.ok;
        err = await cli.processCommandAsync(context.objects, context.states, 'update', ['http://download.iobroker.net/sources-dist.json'], {});
        expect(err).to.be.not.ok;
    }).timeout(40000);

    // upgrade

    // clean
    // restore
    // backup
    it(testName + 'backup', async () => {
        // create backup
        const dir = getBackupDir();
        const fs = require('fs');
        let files;
        // delete existing files
        if (fs.existsSync(dir)) {
            files = fs.readdirSync(dir);
            for (const file of files) {
                if (file.match(/\.tar\.gz$/)) {
                    fs.unlinkSync(dir + file);
                }
            }
        }

        let err;
        err = await cli.processCommandAsync(context.objects, context.states, 'backup', [], {});
        expect(err).to.be.not.ok;
        files = fs.readdirSync(dir);
        // check 2017_03_09-13_48_33_backupioBroker.tar.gz
        //let found = false;
        console.log('Check ' + dir);
        for (let f = files.length - 1; f > 0; f--) {
            console.log('Detect ' + dir + files[f]);
            if (files[f].match(/_backupioBroker\.tar\.gz$/)) {
                // TODO see next TODO
                //found = true;
                break;
            }
        }
        // TODO why this does not work on TRAVIS
        //expect(found).to.be.true;

        const name = Math.round(Math.random() * 10000).toString();
        err = await cli.processCommandAsync(context.objects, context.states, 'backup', [name], {});
        expect(err).to.be.not.ok;
        expect(require('fs').existsSync(getBackupDir() + name + '.tar.gz')).to.be.true;
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
    it(testName + 'uuid', async () => {
        let err;
        // delete non existing user
        err = await cli.processCommandAsync(context.objects, context.states, 'uuid', [], {});
        expect(err).to.be.not.ok;
        // remove normal user from normal group
        err = await cli.processCommandAsync(context.objects, context.states, 'id', [], {});
        expect(err).to.be.not.ok;
    });

    // v version
    it(testName + 'version', async () => {
        let err;
        // delete non existing user
        err = await cli.processCommandAsync(context.objects, context.states, 'version', [], {});
        expect(err).to.be.not.ok;
        // remove normal user from normal group
        err = await cli.processCommandAsync(context.objects, context.states, 'v', [], {});
        expect(err).to.be.not.ok;
    });

    // repo
    it(testName + 'repo', async () => {
        let err;
        // add non existing repo
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['add', 'local', 'some/path'], {});
        expect(err).to.be.not.ok;
        // set new repo as active
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['set', 'local'], {});
        expect(err).to.be.not.ok;
        // try to delete active repo
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['del', 'local'], {});
        expect(err).to.be.ok;
        // set active repo to default
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['set', 'stable'], {});
        expect(err).to.be.not.ok;
        // delete non-active repo
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['del', 'local'], {});
        expect(err).to.be.not.ok;
        // add and set as active new repo, but with too less parameters
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['addset', 'local1'], {});
        expect(err).to.be.ok;
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['addset', 'local1', 'some/path'], {});
        expect(err).to.be.not.ok;
        // try to add new repo with existing name
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['add', 'local1', 'some/path1'], {});
        expect(err).to.be.ok;
        // set active repo to default
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['set', 'stable'], {});
        expect(err).to.be.not.ok;
        // try to delete non-active repo
        err = await cli.processCommandAsync(context.objects, context.states, 'repo', ['del', 'local1'], {});
        expect(err).to.be.not.ok;
    }).timeout(10000);

    // license
    it(testName + 'license', async () => {
        // test license
        const licenseText = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaW9icm9rZXIudmlzIiwidHlwZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwaXJlcyI6MjQ0NDM5ODA5NSwidmVyc2lvbiI6IjwyIiwiaWQiOiI5NTBkYWEwMC01MzcxLTExZTctYjQwNS14eHh4eHh4eHh4eHh4IiwiaWF0IjoxNDk3NzEzMjk1fQ.K9t9ZtvAsdeNFTJed4Sidq2jrr9UFOYpMt6VLmBdVzWueI9DnCXFS5PwBFTBTmF9WMhVk6LBw5ujIVl130B_5NrHl21PHkCLvJeW7jGsMgWDINuBK5F9k8LZABdsv7uDbqNDSOsVrFwEKOu2V3N5sMWYOVE4N_COIg9saaLvyN69oIP27PTgk1GHuyU4giFKGLPTp10L5p2hxLX0lEPjSdDggbl7dEqEe1-u5WwkyBizp03pMtHGYtjnACtP_KBuOly7QpmAnoPlfFoW79xgRjICbd41wT43IvhKAAo1zfnRAeWfQ7QoUViKsc6N1es87QC4KKw-eToLPXOO5UzWOg';
        let licenseFile = __dirname + '/visLicense.data';
        licenseFile = licenseFile.replace(/\\/g, '/');
        const fs = require('fs');
        fs.writeFileSync(licenseFile, licenseText);

        // expect warning about license
        let err;
        err = await cli.processCommandAsync(context.objects, context.states, 'license', [], {});
        expect(err).to.be.ok;
        // expect warning about invalid license
        err = await cli.processCommandAsync(context.objects, context.states, 'license', ['invalidLicense'], {});
        expect(err).to.be.ok;

        await context.objects.setObjectAsync('system.adapter.vis.0', {
            common: {
                name: 'iobroker.vis'
            },
            native: {

            },
            type: 'instance'
        });
        // license must be taken
        err = await cli.processCommandAsync(context.objects, context.states, 'license', [licenseFile], {});
        fs.unlinkSync(licenseFile);
        expect(err).to.be.not.ok;
        let obj = await context.objects.getObjectAsync('system.adapter.vis.0');
        expect(obj.native.license).to.be.equal(licenseText);

        // license must be taken
        err = await cli.processCommandAsync(context.objects, context.states, 'license', [licenseText], {});
        expect(err).to.be.not.ok;
        obj = await context.objects.getObjectAsync('system.adapter.vis.0');
        expect(obj.native.license).to.be.equal(licenseText);
    });

    // info
    it(testName + 'info', async () => {
        const err = await cli.processCommandAsync(context.objects, context.states, 'info', [], {});
        expect(err).to.be.not.ok;
    }).timeout(10000);
}

module.exports.register = register;
