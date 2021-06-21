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

    // passwd, user passwd, user check
    it(testName + 'user passwd', async () => {
        let res;

        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" passwd admin --password ${context.appName.toLowerCase()}`);
        expect(res.stderr).to.be.not.ok;

        // check password
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user check admin --password ${context.appName.toLowerCase()}`);
        expect(res.stderr).to.be.not.ok;
        // negative check
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user check admin --password ${`${context.appName.toLowerCase()}2`}`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // set new password
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user passwd admin --password ${`${context.appName.toLowerCase()}1`}`);
        expect(res.stderr).to.be.not.ok;
        // check new Password
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user check admin --password ${`${context.appName.toLowerCase()}1`}`);
        expect(res.stderr).to.be.not.ok;

        // set password back
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user passwd admin --password ${`${context.appName.toLowerCase()}`}`);
        expect(res.stderr).to.be.not.ok;
        // check password
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user check admin --password ${`${context.appName.toLowerCase()}`}`);
        expect(res.stderr).to.be.not.ok;

        // set password for non existing user
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user passwd uuuser --password ${`${context.appName.toLowerCase()}1`}`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // check password for non existing user
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user check uuuser --password ${`${context.appName.toLowerCase()}1`}`);
            expect(true, 'should throw').to.be.false;
        } catch {
            //ok
        }
    }).timeout(40000);

    // user get
    it(testName + 'user get', async () => {
        // check if no args set
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // no user defined
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user get`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // check admin
        const res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user get admin`);
        expect(res.stderr).to.be.not.ok;
        // check invalid user
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user get aaa`);
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
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user add`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add admin not allowed
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user add admin --password aaa`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add user
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user add newUser --password user --ingroup user`);
        expect(res.stderr).to.be.not.ok;

        // add existing user not allowed
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user add newUser --password user`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add with invalid group
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user add user1 --password bbb --ingroup invalid`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // check adduser
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" adduser user2 --password user --ingroup user`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(20000);

    // user disable / enable
    it(testName + 'user disable/enable', async () => {
        let res;

        // add second user
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user add user1 --password bbb --ingroup user`);
        expect(res.stderr).to.be.not.ok;

        // check if no args set
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user enable`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // enable admin
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user enable admin`);
        expect(res.stderr).to.be.not.ok;

        // test short command
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user e admin`);
        expect(res.stderr).to.be.not.ok;

        // check invalid user
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user enable aaa`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // admin cannot be disabled
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user disable admin`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // user can be disabled
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user disable user1`);
        expect(res.stderr).to.be.not.ok;

        // user can be disabled
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user get user1`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(20000);

    // ud udel userdel deluser user del
    it(testName + 'user del', async () => {
        let res;
        // check if no args set
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user del`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // delete admin not allowed
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user del admin`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // delete user
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user del user`);
        expect(res.stderr).to.be.not.ok;

        // delete invalid user
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user del user`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
        // check userdel
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" userdel user2`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(20000);

    // group add
    it(testName + 'group add', async () => {
        // check if no args set
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group add`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add administrator not allowed
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group add administrator`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add user
        const res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group add users`);
        expect(res.stderr).to.be.not.ok;

        // add existing user not allowed
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group add users`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
    }).timeout(20000);

    // group del
    it(testName + 'group del', async () => {
        // check if no args set
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group del`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // delete admin not allowed
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group del administrator`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // delete users
        const res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group del users`);
        expect(res.stderr).to.be.not.ok;

        // delete invalid group
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group del users`);
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
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group list`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // check admin
        const res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group list administrator`);
        expect(res.stderr).to.be.not.ok;

        // check invalid user
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group list aaa`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
    }).timeout(20000);

    // group get
    it(testName + 'group get', async () => {
        // check if no args set
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // no user defined
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group get`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // check admin
        const res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group get administrator`);
        expect(res.stderr).to.be.not.ok;

        // check invalid user
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group get aaa`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
    }).timeout(20000);

    // group disable / enable
    it(testName + 'group disable/enable', async () => {
        let res;
        // add second group
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group add group1`);
        expect(res.stderr).to.be.not.ok;

        // check if no args set
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group enable`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // enable administrator
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group enable administrator`);
        expect(res.stderr).to.be.not.ok;

        // test short command
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group e administrator`);
        expect(res.stderr).to.be.not.ok;

        // check invalid group
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group enable aaa`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // administrator cannot be disabled
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group disable administrator`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // group can be disabled
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group disable group1`);
        expect(res.stderr).to.be.not.ok;

        // group can be disabled
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group get group1`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(20000);

    // group useradd
    it(testName + 'group useradd', async () => {
        let res;

        // add non existing user
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group useradd group1 user4`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // add user for tests
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" user add user4 --ingroup user --password bbb`);
        expect(res.stderr).to.be.not.ok;

        // add normal user to normal group
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group useradd group1 user4`);
        expect(res.stderr).to.be.not.ok;

        // admin yet added
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group useradd administrator admin`);
        expect(res.stderr).to.be.not.ok;

        // add to invalid group
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group useradd group5 admin`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
    }).timeout(20000);

    // group userdel
    it(testName + 'group userdel', async () => {
        // delete non existing user
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group userdel group1 user5`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // remove normal user from normal group
        const res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group userdel group1 user4`);
        expect(res.stderr).to.be.not.ok;

        // admin not allowed
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group userdel administrator admin`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // remove from invalid group
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" group userdel group5 admin`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }
    }).timeout(20000);

    // start adapter
    // stop adapter
    // start ??
    // stop ??

    // status
    it(testName + 'status', async () => {
        // check status
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" status`);
            expect(true, 'should throw').to.be.false;
        } catch (e) {
            // due to exit code 100 (controller not running) it throws
            expect(e.code).to.be.equal(100);
            expect(e.stdout.includes('ioBroker is not running on this host')).to.be.true;
        }

        // check isrun
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" isrun`);
            expect(true, 'should throw').to.be.false;
        } catch (e) {
            // due to exit code 100 (controller not running) it throws
            expect(e.code).to.be.equal(100);
            expect(e.stdout.includes('ioBroker is not running on this host')).to.be.true;
        }
    }).timeout(20000);
    // restart adapter
    // restart ??

    // update
    // setup
    it(testName + 'setup', async () => {
        let res;
        // check setup
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" setup`);
        // Sentry info is on stderr so check exit code here
        expect(res.code).to.be.equal(0);

        // check setup first
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" setup first`);
        // Sentry info is on stderr so check exit code here
        expect(res.code).to.be.equal(0);
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
        let res;
        // check update
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" update`);
        expect(res.stderr).to.be.not.ok;

        // check update with repo url
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" update http://download.iobroker.net/sources-dist.json`);
        expect(res.stderr).to.be.not.ok;
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

        let res;
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" backup`);
        expect(res.stderr).to.be.not.ok;
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
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" backup ${name}`);
        expect(res.stderr).to.be.not.ok;
        expect(require('fs').existsSync(`${getBackupDir() + name}.tar.gz`)).to.be.true;
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
        let res;
        // uuid
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" uuid`);
        expect(res.stderr).to.be.not.ok;

        // id
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" id`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(20000);

    // v version
    it(testName + 'version', async () => {
        let res;
        // version
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" version`);
        expect(res.stderr).to.be.not.ok;

        // short
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" v`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(20000);

    // repo
    it(testName + 'repo', async () => {
        let res;
        // add non existing repo
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo add local some/path`);
        expect(res.stderr).to.be.not.ok;

        // set new repo as active
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo set local`);
        expect(res.stderr).to.be.not.ok;

        // try to delete active repo
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo del local`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // set active repo to default
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo set stable`);
        expect(res.stderr).to.be.not.ok;

        // delete non-active repo
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo del local`);
        expect(res.stderr).to.be.not.ok;

        // add and set as active new repo, but with too less parameters
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo addset local1`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // delete non-active repo
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo addset local1 some/path`);
        expect(res.stderr).to.be.not.ok;

        // try to add new repo with existing name
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo add local1 some/path1`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // set active repo to default
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo set stable`);
        expect(res.stderr).to.be.not.ok;

        // try to delete non-active repo
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" repo del local1`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(40000);

    // license
    it(testName + 'license', async () => {
        // test license
        const licenseText = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaW9icm9rZXIudmlzIiwidHlwZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwaXJlcyI6MjQ0NDM5ODA5NSwidmVyc2lvbiI6IjwyIiwiaWQiOiI5NTBkYWEwMC01MzcxLTExZTctYjQwNS14eHh4eHh4eHh4eHh4IiwiaWF0IjoxNDk3NzEzMjk1fQ.K9t9ZtvAsdeNFTJed4Sidq2jrr9UFOYpMt6VLmBdVzWueI9DnCXFS5PwBFTBTmF9WMhVk6LBw5ujIVl130B_5NrHl21PHkCLvJeW7jGsMgWDINuBK5F9k8LZABdsv7uDbqNDSOsVrFwEKOu2V3N5sMWYOVE4N_COIg9saaLvyN69oIP27PTgk1GHuyU4giFKGLPTp10L5p2hxLX0lEPjSdDggbl7dEqEe1-u5WwkyBizp03pMtHGYtjnACtP_KBuOly7QpmAnoPlfFoW79xgRjICbd41wT43IvhKAAo1zfnRAeWfQ7QoUViKsc6N1es87QC4KKw-eToLPXOO5UzWOg';
        let licenseFile = __dirname + '/visLicense.data';
        licenseFile = licenseFile.replace(/\\/g, '/');
        const fs = require('fs');
        fs.writeFileSync(licenseFile, licenseText);

        let res;

        // expect warning about license
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" license`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        // expect warning about invalid license
        try {
            await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" license invalidLicense`);
            expect(true, 'should throw').to.be.false;
        } catch {
            // ok
        }

        await context.objects.setObjectAsync('system.adapter.vis.0', {
            common: {
                name: 'iobroker.vis'
            },
            native: {

            },
            type: 'instance'
        });
        // license must be taken
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" license ${licenseFile}`);
        fs.unlinkSync(licenseFile);
        expect(res.stderr).to.be.not.ok;
        let obj = await context.objects.getObjectAsync('system.adapter.vis.0');
        expect(obj.native.license).to.be.equal(licenseText);

        // license must be taken
        res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" license ${licenseText}`);
        expect(res.stderr).to.be.not.ok;
        obj = await context.objects.getObjectAsync('system.adapter.vis.0');
        expect(obj.native.license).to.be.equal(licenseText);
    }).timeout(20000);

    // info
    it(testName + 'info', async () => {
        const res = await cpPromise.exec(`"${process.execPath}" "${iobExecutable}" info`);
        expect(res.stderr).to.be.not.ok;
    }).timeout(10000);
}

module.exports.register = register;
