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
    isAcceptableScrypt,
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

    /**
     * Change the JSON header of the encrypted file, its length is written again
     *
     * @param change changes the parsed header in place
     */
    async function changeHeader(change: (header: Record<string, any>) => void): Promise<void> {
        const file = await readFile(encrypted);
        const prefixLength = 'IOBENC1'.length + 5;
        const headerLength = file.readUInt32BE(prefixLength - 4);
        const header = JSON.parse(file.subarray(prefixLength, prefixLength + headerLength).toString('utf8'));
        change(header);
        const headerJson = Buffer.from(JSON.stringify(header), 'utf8');
        const prefix = Buffer.from(file.subarray(0, prefixLength));
        prefix.writeUInt32BE(headerJson.length, prefixLength - 4);
        await writeFile(encrypted, Buffer.concat([prefix, headerJson, file.subarray(prefixLength + headerLength)]));
    }

    it('refuses scrypt parameters in the file which would take too much memory or time, before running scrypt', async () => {
        await writePlain(10);
        await encryptFile(plain, encrypted, { password: 'secret', scrypt });
        // each value alone was accepted before, together they ask for 4 GiB
        await changeHeader(header => Object.assign(header.recipients[0], { N: 2 ** 20, r: 32, p: 16 }));

        const started = Date.now();
        await assert.rejects(decryptFile(encrypted, decrypted, { password: 'secret' }), /header .* is invalid/);
        assert.ok(Date.now() - started < 1_000);
    });

    it('refuses a chunk size in the file which is larger than any written one', async () => {
        await writePlain(10);
        await encryptFile(plain, encrypted, { password: 'secret', scrypt });
        await changeHeader(header => (header.chunkSize = 2 ** 31));

        await assert.rejects(decryptFile(encrypted, decrypted, { password: 'secret' }), BackupDecryptionError);
    });
});

describe('isAcceptableScrypt', () => {
    it('accepts the default parameters and the cheap ones of the tests', () => {
        assert.equal(isAcceptableScrypt({ N: 2 ** 17, r: 8, p: 1 }), true);
        assert.equal(isAcceptableScrypt(scrypt), true);
    });

    it('accepts up to twice the memory and four times the work of the default', () => {
        assert.equal(isAcceptableScrypt({ N: 2 ** 18, r: 8, p: 1 }), true);
        assert.equal(isAcceptableScrypt({ N: 2 ** 17, r: 8, p: 4 }), true);
    });

    it('refuses more memory or work, also if each value alone is moderate', () => {
        assert.equal(isAcceptableScrypt({ N: 2 ** 19, r: 8, p: 1 }), false);
        assert.equal(isAcceptableScrypt({ N: 2 ** 17, r: 32, p: 1 }), false);
        assert.equal(isAcceptableScrypt({ N: 2 ** 17, r: 8, p: 8 }), false);
        assert.equal(isAcceptableScrypt({ N: 2 ** 20, r: 32, p: 16 }), false);
    });

    it('refuses parameters which are no valid scrypt parameters', () => {
        assert.equal(isAcceptableScrypt({ N: 1000, r: 8, p: 1 }), false);
        assert.equal(isAcceptableScrypt({ N: 1, r: 8, p: 1 }), false);
        assert.equal(isAcceptableScrypt({ N: 2 ** 10, r: 0, p: 1 }), false);
        assert.equal(isAcceptableScrypt({ N: 2 ** 10, r: 8, p: 0 }), false);
        assert.equal(isAcceptableScrypt({ N: 2 ** 10, r: 8.5, p: 1 }), false);
        assert.equal(isAcceptableScrypt({ N: '1024', r: 8, p: 1 } as any), false);
    });
});
