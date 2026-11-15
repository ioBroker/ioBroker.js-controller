import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import { mkdtemp, readFile, rm, stat, truncate, writeFile } from 'node:fs/promises';
import {
    BackupDecryptionError,
    decryptFile,
    encryptFile,
    generateBackupKeyPair,
    isEncryptedBackup,
} from '@/lib/setup/backupEncryption.js';

/** Cheap scrypt parameters, the default ones take about a second per call */
const scrypt = { N: 2 ** 10, r: 8, p: 1 };

describe('backup encryption', function () {
    // scrypt and several MB of data, a busy CI machine needs longer than the default
    this.timeout(10_000);

    let dir: string;
    let plain: string;
    let encrypted: string;
    let decrypted: string;

    beforeEach(async () => {
        dir = await mkdtemp(path.join(os.tmpdir(), 'iob-backup-enc-'));
        plain = path.join(dir, 'backup.tar.gz');
        encrypted = path.join(dir, 'backup.tar.gz.enc');
        decrypted = path.join(dir, 'decrypted.tar.gz');
    });

    afterEach(async () => {
        await rm(dir, { recursive: true, force: true });
    });

    /**
     * Write random data as the backup to encrypt
     *
     * @param size number of bytes
     */
    async function writePlain(size: number): Promise<Buffer> {
        const data = crypto.randomBytes(size);
        await writeFile(plain, data);
        return data;
    }

    it('decrypts with the password what it encrypted, over several chunks', async () => {
        // three full chunks and a partial one
        const data = await writePlain(3 * 64 * 1024 + 123);
        await encryptFile(plain, encrypted, { password: 'secret', scrypt });

        assert.equal(await isEncryptedBackup(encrypted), true);
        assert.equal(await isEncryptedBackup(plain), false);
        // the content is not readable in the encrypted file
        assert.equal((await readFile(encrypted)).includes(data.subarray(0, 64)), false);

        await decryptFile(encrypted, decrypted, { password: 'secret' });
        assert.deepEqual(await readFile(decrypted), data);
    });

    it('handles an empty file and a file of exactly one chunk', async () => {
        for (const size of [0, 64 * 1024]) {
            const data = await writePlain(size);
            await encryptFile(plain, encrypted, { password: 'secret', scrypt });
            await decryptFile(encrypted, decrypted, { password: 'secret' });
            assert.deepEqual(await readFile(decrypted), data);
        }
    });

    it('decrypts with the private key what it encrypted for the public key', async () => {
        const data = await writePlain(100_000);
        const { publicKey, privateKey } = generateBackupKeyPair();
        await encryptFile(plain, encrypted, { publicKeys: [publicKey] });

        await decryptFile(encrypted, decrypted, { privateKey });
        assert.deepEqual(await readFile(decrypted), data);
    });

    it('decrypts with either of both when encrypted for a password and a public key', async () => {
        const data = await writePlain(1_000);
        const { publicKey, privateKey } = generateBackupKeyPair();
        await encryptFile(plain, encrypted, { password: 'secret', publicKeys: [publicKey], scrypt });

        await decryptFile(encrypted, decrypted, { privateKey });
        assert.deepEqual(await readFile(decrypted), data);
        await decryptFile(encrypted, decrypted, { password: 'secret' });
        assert.deepEqual(await readFile(decrypted), data);
    });

    it('refuses a wrong password and leaves nothing behind', async () => {
        await writePlain(1_000);
        await encryptFile(plain, encrypted, { password: 'secret', scrypt });

        await assert.rejects(decryptFile(encrypted, decrypted, { password: 'wrong' }), (e: Error) => {
            assert.ok(e instanceof BackupDecryptionError);
            assert.match(e.message, /Wrong password/);
            return true;
        });
        await assert.rejects(stat(decrypted));
    });

    it('refuses another private key', async () => {
        await writePlain(1_000);
        await encryptFile(plain, encrypted, { publicKeys: [generateBackupKeyPair().publicKey] });

        await assert.rejects(
            decryptFile(encrypted, decrypted, { privateKey: generateBackupKeyPair().privateKey }),
            /not encrypted for this private key/,
        );
    });

    it('detects a changed chunk', async () => {
        await writePlain(200_000);
        await encryptFile(plain, encrypted, { password: 'secret', scrypt });
        const content = await readFile(encrypted);
        // flip a byte in the middle of the data
        content[Math.floor(content.length / 2)] ^= 0x01;
        await writeFile(encrypted, content);

        await assert.rejects(decryptFile(encrypted, decrypted, { password: 'secret' }), /damaged|changed/);
        await assert.rejects(stat(decrypted));
    });

    it('detects a changed header', async () => {
        await writePlain(1_000);
        await encryptFile(plain, encrypted, { password: 'secret', scrypt });
        const content = await readFile(encrypted);
        const text = content.toString('latin1').replace('"chunkSize":65536', '"chunkSize":65537');
        await writeFile(encrypted, Buffer.from(text, 'latin1'));

        await assert.rejects(decryptFile(encrypted, decrypted, { password: 'secret' }), BackupDecryptionError);
    });

    it('detects a file that was cut off at the end of a chunk', async () => {
        await writePlain(3 * 64 * 1024);
        await encryptFile(plain, encrypted, { password: 'secret', scrypt });
        const { size } = await stat(encrypted);
        // remove the whole last record: length, one full chunk and its tag
        await truncate(encrypted, size - (4 + 64 * 1024 + 16));

        await assert.rejects(decryptFile(encrypted, decrypted, { password: 'secret' }), BackupDecryptionError);
        await assert.rejects(stat(decrypted));
    });

    it('detects a file that was cut off inside a chunk', async () => {
        await writePlain(100_000);
        await encryptFile(plain, encrypted, { password: 'secret', scrypt });
        const { size } = await stat(encrypted);
        await truncate(encrypted, size - 100);

        await assert.rejects(decryptFile(encrypted, decrypted, { password: 'secret' }), BackupDecryptionError);
    });

    it('needs a password or a public key to encrypt', async () => {
        await writePlain(10);
        await assert.rejects(encryptFile(plain, encrypted, {}), /password or a public key is needed/);
        await assert.rejects(stat(encrypted));
    });

    it('refuses a public key in a wrong form', async () => {
        await writePlain(10);
        await assert.rejects(encryptFile(plain, encrypted, { publicKeys: ['abc'] }), /must start with/);
    });
});
