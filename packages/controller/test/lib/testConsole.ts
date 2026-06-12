import path from 'node:path';
import { exec as execAsync } from 'promisify-child-process';
import { BackupRestore } from '@iobroker/js-controller-cli';
import type { TestContext } from '../_Types.js';
import fs from 'fs-extra';
import assert from 'node:assert/strict';
import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

const iobExecutable = path.join(thisDir, '..', '..', 'iobroker.js');

export function register(it: Mocha.TestFunction, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} console: `;

    // passwd, user passwd, user check
    it(`${testName}user passwd`, async () => {
        let res;

        res = await execAsync(
            `"${process.execPath}" "${iobExecutable}" passwd admin --password ${context.appName.toLowerCase()}`,
        );
        assert.ok(!res.stderr);

        // check password
        res = await execAsync(
            `"${process.execPath}" "${iobExecutable}" user check admin --password ${context.appName.toLowerCase()}`,
        );
        assert.ok(!res.stderr);
        // negative check
        try {
            await execAsync(
                `"${process.execPath}" "${iobExecutable}" user check admin --password ${`${context.appName.toLowerCase()}2`}`,
            );
            assert.fail('should throw');
        } catch {
            // ok
        }
        // set new password
        res = await execAsync(
            `"${process.execPath}" "${iobExecutable}" user passwd admin --password ${`${context.appName.toLowerCase()}1`}`,
        );
        assert.ok(!res.stderr);
        // check new Password
        res = await execAsync(
            `"${process.execPath}" "${iobExecutable}" user check admin --password ${`${context.appName.toLowerCase()}1`}`,
        );
        assert.ok(!res.stderr);

        // set password back
        res = await execAsync(
            `"${process.execPath}" "${iobExecutable}" user passwd admin --password ${`${context.appName.toLowerCase()}`}`,
        );
        assert.ok(!res.stderr);
        // check password
        res = await execAsync(
            `"${process.execPath}" "${iobExecutable}" user check admin --password ${`${context.appName.toLowerCase()}`}`,
        );
        assert.ok(!res.stderr);

        // set password for non existing user
        try {
            await execAsync(
                `"${process.execPath}" "${iobExecutable}" user passwd uuuser --password ${`${context.appName.toLowerCase()}1`}`,
            );
            assert.fail('should throw');
        } catch {
            // ok
        }

        // check password for non existing user
        try {
            await execAsync(
                `"${process.execPath}" "${iobExecutable}" user check uuuser --password ${`${context.appName.toLowerCase()}1`}`,
            );
            assert.fail('should throw');
        } catch {
            //ok
        }
    }).timeout(40_000);

    // user get
    it(`${testName}user get`, async () => {
        // check if no args set
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // no user defined
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user get`);
            assert.fail('should throw');
        } catch {
            // ok
        }
        // check admin
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" user get admin`);
        assert.ok(!res.stderr);
        // check invalid user
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user get aaa`);
            assert.fail('should throw');
        } catch {
            // ok
        }
    }).timeout(20_000);

    // adduser user add
    it(`${testName}user add`, async () => {
        let res;
        // check if no args set
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user add`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // add admin not allowed
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user add admin --password aaa`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // add user
        res = await execAsync(
            `"${process.execPath}" "${iobExecutable}" user add newUser --password user --ingroup user`,
        );
        assert.ok(!res.stderr);

        // add existing user not allowed
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user add newUser --password user`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // add with invalid group
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user add user1 --password bbb --ingroup invalid`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // check adduser
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" adduser user2 --password user --ingroup user`);
        assert.ok(!res.stderr);
    }).timeout(20_000);

    // user disable / enable
    it(`${testName}user disable/enable`, async () => {
        let res;

        // add second user
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" user add user1 --password bbb --ingroup user`);
        assert.ok(!res.stderr);

        // check if no args set
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user enable`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // enable admin
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" user enable admin`);
        assert.ok(!res.stderr);

        // test short command
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" user e admin`);
        assert.ok(!res.stderr);

        // check invalid user
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user enable aaa`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // admin cannot be disabled
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user disable admin`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // user can be disabled
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" user disable user1`);
        assert.ok(!res.stderr);

        // user can be disabled
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" user get user1`);
        assert.ok(!res.stderr);
    }).timeout(25_000);

    // ud udel userdel deluser user del
    it(`${testName}user del`, async () => {
        let res;
        // check if no args set
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user del`);
            assert.fail('should throw');
        } catch {
            // ok
        }
        // delete admin not allowed
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user del admin`);
            assert.fail('should throw');
        } catch {
            // ok
        }
        // delete user
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" user del user`);
        assert.ok(!res.stderr);

        // delete invalid user
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" user del user`);
            assert.fail('should throw');
        } catch {
            // ok
        }
        // check userdel
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" userdel user2`);
        assert.ok(!res.stderr);
    }).timeout(20_000);

    // group add
    it(`${testName}group add`, async () => {
        // check if no args set
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group add`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // add administrator not allowed
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group add administrator`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // add user
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" group add users`);
        assert.ok(!res.stderr);

        // add existing user not allowed
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group add users`);
            assert.fail('should throw');
        } catch {
            // ok
        }
    }).timeout(20_000);

    // group del
    it(`${testName}group del`, async () => {
        // check if no args set
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group del`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // delete admin not allowed
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group del administrator`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // delete users
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" group del users`);
        assert.ok(!res.stderr);

        // delete invalid group
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group del users`);
            assert.fail('should throw');
        } catch {
            // ok
        }
    }).timeout(20_000);

    // group list
    it(`${testName}group list`, async () => {
        // check if no args set
        // no user defined
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group list`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // check admin
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" group list administrator`);
        assert.ok(!res.stderr);

        // check invalid user
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group list aaa`);
            assert.fail('should throw');
        } catch {
            // ok
        }
    }).timeout(20_000);

    // group get
    it(`${testName}group get`, async () => {
        // check if no args set
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // no user defined
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group get`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // check admin
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" group get administrator`);
        assert.ok(!res.stderr);

        // check invalid user
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group get aaa`);
            assert.fail('should throw');
        } catch {
            // ok
        }
    }).timeout(20_000);

    // group disable / enable
    it(`${testName}group disable/enable`, async () => {
        let res;
        // add second group
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" group add group1`);
        assert.ok(!res.stderr);

        // check if no args set
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group enable`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // enable administrator
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" group enable administrator`);
        assert.ok(!res.stderr);

        // test short command
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" group e administrator`);
        assert.ok(!res.stderr);

        // check invalid group
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group enable aaa`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // administrator cannot be disabled
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group disable administrator`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // group can be disabled
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" group disable group1`);
        assert.ok(!res.stderr);

        // group can be disabled
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" group get group1`);
        assert.ok(!res.stderr);
    }).timeout(25_000);

    // group useradd
    it(`${testName}group useradd`, async () => {
        let res;

        // add non existing user
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group useradd group1 user4`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // add user for tests
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" user add user4 --ingroup user --password bbb`);
        assert.ok(!res.stderr);

        // add normal user to normal group
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" group useradd group1 user4`);
        assert.ok(!res.stderr);

        // admin yet added
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" group useradd administrator admin`);
        assert.ok(!res.stderr);

        // add to invalid group
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group useradd group5 admin`);
            assert.fail('should throw');
        } catch {
            // ok
        }
    }).timeout(20_000);

    // group userdel
    it(`${testName}group userdel`, async () => {
        // delete non existing user
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group userdel group1 user5`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // remove normal user from normal group
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" group userdel group1 user4`);
        assert.ok(!res.stderr);

        // admin not allowed
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group userdel administrator admin`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // remove from invalid group
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" group userdel group5 admin`);
            assert.fail('should throw');
        } catch {
            // ok
        }
    }).timeout(20_000);

    // status
    it(`${testName}status`, async () => {
        // check status
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" status`);
            assert.fail('should throw');
        } catch (e) {
            assert.strictEqual(e.code, 100);
            assert.strictEqual(e.stdout.includes('ioBroker is not running on this host'), true);
        }

        // check isrun
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" isrun`);
            assert.fail('should throw');
        } catch (e) {
            assert.strictEqual(e.code, 100);
            assert.strictEqual(e.stdout.includes('ioBroker is not running on this host'), true);
        }
    }).timeout(20_000);
    // restart adapter
    // restart ??

    // update
    // setup
    it(`${testName}setup`, async () => {
        let res;
        // check setup
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" setup`);
        // Sentry info is on stderr so check exit code here
        assert.strictEqual(res.code, 0);

        // check setup first
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" setup first`);
        // Sentry info is on stderr so check exit code here
        assert.strictEqual(res.code, 0);
    }).timeout(20_000);

    // setup custom
    // url

    // add a
    // install i

    // upload u
    // delete del
    // unsetup
    // object o

    // state s
    it(`${testName}state set with negative number`, async () => {
        const id = 'system.adapter.admin.upload';
        // check update
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" state set "${id}" "-1" 1`);
        assert.ok(!res.stderr);

        const state = await context.states.getState(id);

        assert.strictEqual(state?.val, -1);
        assert.strictEqual(state?.ack, true);
    }).timeout(20_000);

    // message
    // update
    it(`${testName}update`, async () => {
        // check update
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" update`);
        assert.ok(!res.stderr);
    }).timeout(40_000);

    // backup
    it(`${testName}backup`, async () => {
        // create backup
        const dir = BackupRestore.getBackupDir();

        let files;
        // delete existing files
        if (fs.existsSync(dir)) {
            files = fs.readdirSync(dir);
            for (const file of files) {
                if (file.endsWith('.tar.gz')) {
                    fs.unlinkSync(dir + file);
                }
            }
        }

        let res;
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" backup`);
        assert.ok(!res.stderr);
        files = fs.readdirSync(dir);
        // check 2017_03_09-13_48_33_backupioBroker.tar.gz
        // TODO: found logic not working on CI
        // let found = false;

        console.log(`Check ${dir}`);
        for (const file of files) {
            console.log(`Detect ${dir}${file}`);
            if (file.endsWith('_backupioBroker.tar.gz')) {
                // found = true;
                break;
            }
        }

        // expect(found).to.be.true;

        const name = Math.round(Math.random() * 10_000).toString();
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" backup ${name}`);
        assert.ok(!res.stderr);
        assert.strictEqual(fs.existsSync(`${BackupRestore.getBackupDir() + name}_backupiobroker.tar.gz`), true);
    }).timeout(20_000);

    it(`${testName}validates backup`, async () => {
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" validate 0`);
        assert.ok(!res.stderr);
        assert.ok(res.stdout?.includes('Backup OK'));
    }).timeout(20_000);

    // uuid
    it(`${testName}uuid`, async () => {
        let res;
        // uuid
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" uuid`);
        assert.ok(!res.stderr);

        // id
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" id`);
        assert.ok(!res.stderr);
    }).timeout(20_000);

    // version
    it(`${testName}version`, async () => {
        let res;
        // version
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" version`);
        assert.ok(!res.stderr);

        // short
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" v`);
        assert.ok(!res.stderr);
    }).timeout(20_000);

    // repo
    it(`${testName}repo`, async () => {
        let res;
        // add non existing repo
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" repo add local some/path`);
        assert.ok(!res.stderr);

        // set new repo as active
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" repo set local`);
        assert.ok(!res.stderr);

        // try to delete active repo
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" repo del local`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // set active repo to default
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" repo set stable`);
        assert.ok(!res.stderr);

        // remove local from active repos
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" repo unset local`);
        assert.ok(!res.stderr);

        // delete non-active repo
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" repo del local`);
        assert.ok(!res.stderr);

        // add and set as active new repo, but with too less parameters
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" repo addset local1`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // add and set as active new repo
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" repo addset local1 some/path`);
        assert.ok(!res.stderr);

        // try to add new repo with existing name
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" repo add local1 some/path1`);
            assert.fail('should throw');
        } catch {
            // ok
        }

        // remove local1 from active repos
        await execAsync(`"${process.execPath}" "${iobExecutable}" repo unset local1`);

        // set active repo to default
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" repo set stable`);
        assert.ok(!res.stderr);

        // try to delete non-active repo
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" repo del local1`);
        assert.ok(!res.stderr);
    }).timeout(50_000);

    // license
    it(`${testName}license`, async () => {
        const licenseText =
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaW9icm9rZXIudmlzIiwidHlwZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwaXJlcyI6MjQ0NDM5ODA5NSwidmVyc2lvbiI6IjwyIiwiaWQiOiI5NTBkYWEwMC01MzcxLTExZTctYjQwNS14eHh4eHh4eHh4eHh4IiwiaWF0IjoxNDk3NzEzMjk1fQ.K9t9ZtvAsdeNFTJed4Sidq2jrr9UFOYpMt6VLmBdVzWueI9DnCXFS5PwBFTBTmF9WMhVk6LBw5ujIVl130B_5NrHl21PHkCLvJeW7jGsMgWDINuBK5F9k8LZABdsv7uDbqNDSOsVrFwEKOu2V3N5sMWYOVE4N_COIg9saaLvyN69oIP27PTgk1GHuyU4giFKGLPTp10L5p2hxLX0lEPjSdDggbl7dEqEe1-u5WwkyBizp03pMtHGYtjnACtP_KBuOly7QpmAnoPlfFoW79xgRjICbd41wT43IvhKAAo1zfnRAeWfQ7QoUViKsc6N1es87QC4KKw-eToLPXOO5UzWOg';
        let licenseFile = `${thisDir}/visLicense.data`;
        licenseFile = licenseFile.replace(/\\/g, '/');
        fs.writeFileSync(licenseFile, licenseText);

        let res;

        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" license`);
            assert.fail('should throw');
        } catch {
            /* ok */
        }
        try {
            await execAsync(`"${process.execPath}" "${iobExecutable}" license invalidLicense`);
            assert.fail('should throw');
        } catch {
            /* ok */
        }

        await context.objects.setObject('system.adapter.vis.0', {
            common: {
                name: 'iobroker.vis-2',
                version: '1.0.0',
                host: 'system.host.test',
                enabled: true,
                mode: 'daemon',
                platform: 'Javascript/Node.js',
                materialize: true,
                installedVersion: '1.0.0',
            },
            native: {},
            type: 'instance',
            instanceObjects: [],
            objects: [],
        });
        res = await execAsync(`"${process.execPath}" "${iobExecutable}" license ${licenseFile}`);
        fs.unlinkSync(licenseFile);
        assert.ok(!res.stderr);
        let obj = await context.objects.getObjectAsync('system.adapter.vis.0');
        assert.strictEqual(obj?.native.license, licenseText);

        res = await execAsync(`"${process.execPath}" "${iobExecutable}" license ${licenseText}`);
        assert.ok(!res.stderr);
        obj = await context.objects.getObjectAsync('system.adapter.vis.0');
        assert.strictEqual(obj?.native.license, licenseText);
    }).timeout(20_000);

    // info
    it(`${testName}info`, async () => {
        const res = await execAsync(`"${process.execPath}" "${iobExecutable}" info`);
        assert.ok(!res.stderr);
    }).timeout(10_000);
}
