import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import {
    BACKUP_PASSWORD_ENV,
    createDecryptionCredentialsProvider,
    getBackupEncryption,
} from '@/lib/setup/backupCredentials.js';

/**
 * An iobroker.json with the given encryption settings
 *
 * @param encryption the settings of `backup.encryption`
 */
function config(encryption?: Record<string, unknown>): ioBroker.IoBrokerJson {
    return { backup: encryption ? { encryption } : undefined } as unknown as ioBroker.IoBrokerJson;
}

describe('backup credentials', () => {
    let dir: string;
    let passwordFile: string;
    const envBefore = process.env[BACKUP_PASSWORD_ENV];

    beforeEach(async () => {
        dir = await mkdtemp(path.join(os.tmpdir(), 'iob-backup-cred-'));
        passwordFile = path.join(dir, 'password');
        await writeFile(passwordFile, 'from-file\n');
        delete process.env[BACKUP_PASSWORD_ENV];
    });

    afterEach(async () => {
        await rm(dir, { recursive: true, force: true });
        if (envBefore === undefined) {
            delete process.env[BACKUP_PASSWORD_ENV];
        } else {
            process.env[BACKUP_PASSWORD_ENV] = envBefore;
        }
    });

    it('does not encrypt without --encrypt and without settings', async () => {
        assert.equal(await getBackupEncryption({}, config()), null);
    });

    it('does not encrypt with --encrypt false although iobroker.json asks for it', async () => {
        assert.equal(await getBackupEncryption({ encrypt: false }, config({ mode: 'password' })), null);
    });

    it('takes the password from the file without the line break', async () => {
        assert.deepEqual(await getBackupEncryption({ encrypt: true, 'password-file': passwordFile }, config()), {
            password: 'from-file',
        });
        // yargs also gives the parameter in camel case
        assert.deepEqual(await getBackupEncryption({ encrypt: true, passwordFile }, config()), {
            password: 'from-file',
        });
    });

    it('takes the password from the environment', async () => {
        process.env[BACKUP_PASSWORD_ENV] = 'from-env';
        assert.deepEqual(await getBackupEncryption({}, config({ mode: 'password' })), { password: 'from-env' });
    });

    it('encrypts for the public key of iobroker.json without a password', async () => {
        assert.deepEqual(await getBackupEncryption({}, config({ mode: 'publicKey', publicKey: 'iobbackup-pub-x' })), {
            publicKeys: ['iobbackup-pub-x'],
        });
    });

    it('adds a given password to the public key', async () => {
        process.env[BACKUP_PASSWORD_ENV] = 'from-env';
        assert.deepEqual(await getBackupEncryption({}, config({ mode: 'publicKey', publicKey: 'iobbackup-pub-x' })), {
            publicKeys: ['iobbackup-pub-x'],
            password: 'from-env',
        });
    });

    it('refuses the mode publicKey without a public key', async () => {
        await assert.rejects(getBackupEncryption({}, config({ mode: 'publicKey' })), /keygen --save/);
    });

    it('decrypts with the private key of --key-file before a password', async () => {
        const keyFile = path.join(dir, 'key.pem');
        await writeFile(keyFile, 'PRIVATE KEY');
        process.env[BACKUP_PASSWORD_ENV] = 'from-env';

        assert.deepEqual(await createDecryptionCredentialsProvider({ 'key-file': keyFile })(), {
            privateKey: 'PRIVATE KEY',
        });
        assert.deepEqual(await createDecryptionCredentialsProvider({})(), { password: 'from-env' });
    });
});
