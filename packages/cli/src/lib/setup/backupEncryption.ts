import crypto from 'node:crypto';
import { open, rm } from 'node:fs/promises';
import type { FileHandle } from 'node:fs/promises';

/**
 * Format of an encrypted backup (`*.tar.gz.enc`)
 *
 * The backup is packed and compressed as before, the whole `.tar.gz` is then encrypted, so that the names and sizes
 * of the files inside are hidden as well.
 *
 * ```
 * "IOBENC1"                 7 bytes magic
 * version                   uint8, currently 1
 * header length             uint32 BE
 * header                    JSON (utf8): chunk size, base nonce and the recipients with the wrapped data key
 * chunk records             until the end of the file:
 *   ciphertext length       uint32 BE
 *   ciphertext              AES-256-GCM with the data key
 *   tag                     16 bytes
 * ```
 *
 * A random data key encrypts the data. It is wrapped for every recipient: a password (key derived with scrypt) and/or
 * an X25519 public key (ephemeral ECDH, key derived with HKDF). Every chunk has its own nonce (base nonce plus the
 * chunk counter) and authenticates the SHA-256 of the header, its counter and whether it is the last chunk. A changed
 * header, a changed, reordered or missing chunk and a cut off end of the file are detected.
 */

/** Magic at the beginning of an encrypted backup */
export const ENCRYPTED_BACKUP_MAGIC = Buffer.from('IOBENC1', 'ascii');
/** File extension appended to the `.tar.gz` of an encrypted backup */
export const ENCRYPTED_BACKUP_EXTENSION = '.enc';
/** Version of the format */
const FORMAT_VERSION = 1;
/** Size of the plaintext chunks */
const CHUNK_SIZE = 64 * 1024;
/** Size of the GCM authentication tag */
const TAG_SIZE = 16;
/** Size of the GCM nonce */
const NONCE_SIZE = 12;
/** Size of the data key and the key encryption keys */
const KEY_SIZE = 32;
/** Upper bound for the header, a larger value means the file is not an encrypted backup */
const MAX_HEADER_SIZE = 1024 * 1024;
/** Default scrypt parameters: 128 MiB of memory, about a second on a Raspberry Pi 4 */
const DEFAULT_SCRYPT: ScryptParams = { N: 2 ** 17, r: 8, p: 1 };
/** Prefix of a public key in the text form used in iobroker.json */
const PUBLIC_KEY_PREFIX = 'iobbackup-pub-';

/** Cost parameters of scrypt */
export interface ScryptParams {
    /** CPU/memory cost, a power of two */
    N: number;
    /** Block size */
    r: number;
    /** Parallelization */
    p: number;
}

/** For whom a backup is encrypted, at least one of both is required */
export interface EncryptionRecipients {
    /** Password from which the key is derived */
    password?: string;
    /** X25519 public keys in the text form of {@link generateBackupKeyPair} */
    publicKeys?: string[];
    /** Override of the scrypt parameters, e.g. cheaper ones for tests */
    scrypt?: ScryptParams;
}

/** What is needed to decrypt a backup, one of both */
export interface DecryptionCredentials {
    /** Password of the backup */
    password?: string;
    /** X25519 private key as PEM, as written by {@link generateBackupKeyPair} */
    privateKey?: string;
}

/** A key pair for the encryption of backups */
export interface BackupKeyPair {
    /** Public key, one line, to be stored in iobroker.json */
    publicKey: string;
    /** Private key as PEM, needed for the restore - only the owner should have it */
    privateKey: string;
}

/** Recipient whose data key is wrapped with a key derived from a password */
interface PasswordRecipient {
    type: 'password';
    kdf: 'scrypt';
    N: number;
    r: number;
    p: number;
    salt: string;
    nonce: string;
    wrappedKey: string;
}

/** Recipient whose data key is wrapped with a key agreed with an X25519 public key */
interface X25519Recipient {
    type: 'x25519';
    /** The ephemeral public key of the sender, raw, base64 */
    ephemeralPublicKey: string;
    /** The public key of the recipient, raw, base64, to find the right one */
    recipient: string;
    salt: string;
    nonce: string;
    wrappedKey: string;
}

/** Header of an encrypted backup */
interface EncryptionHeader {
    chunkSize: number;
    nonce: string;
    recipients: (PasswordRecipient | X25519Recipient)[];
}

/** An encrypted backup that cannot be decrypted: wrong password or key, or a damaged or manipulated file */
export class BackupDecryptionError extends Error {
    /**
     * @param message what went wrong
     */
    constructor(message: string) {
        super(message);
        this.name = 'BackupDecryptionError';
    }
}

/**
 * Generate a key pair for the encryption of backups
 *
 * The public key is stored on the host and encrypts backups without a password, so they can be created unattended.
 * Only the private key can decrypt them again and should therefore not be kept on the host.
 */
export function generateBackupKeyPair(): BackupKeyPair {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('x25519');

    return {
        publicKey: `${PUBLIC_KEY_PREFIX}${rawPublicKey(publicKey).toString('base64url')}`,
        privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
    };
}

/**
 * Check if a file is an encrypted backup
 *
 * @param file path of the file
 */
export async function isEncryptedBackup(file: string): Promise<boolean> {
    let handle: FileHandle | undefined;
    try {
        handle = await open(file, 'r');
        const magic = Buffer.alloc(ENCRYPTED_BACKUP_MAGIC.length);
        const { bytesRead } = await handle.read(magic, 0, magic.length, 0);
        return bytesRead === magic.length && magic.equals(ENCRYPTED_BACKUP_MAGIC);
    } catch {
        return false;
    } finally {
        await handle?.close();
    }
}

/**
 * Encrypt a file, e.g. a packed backup
 *
 * @param source the file to encrypt
 * @param target the encrypted file to write, it is removed again if the encryption fails
 * @param recipients the password and/or public keys which can decrypt it
 */
export async function encryptFile(source: string, target: string, recipients: EncryptionRecipients): Promise<void> {
    const dataKey = crypto.randomBytes(KEY_SIZE);
    const header: EncryptionHeader = {
        chunkSize: CHUNK_SIZE,
        nonce: crypto.randomBytes(NONCE_SIZE).toString('base64'),
        recipients: await createRecipients(dataKey, recipients),
    };
    const headerJson = Buffer.from(JSON.stringify(header), 'utf8');
    const prefix = Buffer.alloc(ENCRYPTED_BACKUP_MAGIC.length + 5);
    ENCRYPTED_BACKUP_MAGIC.copy(prefix, 0);
    prefix.writeUInt8(FORMAT_VERSION, ENCRYPTED_BACKUP_MAGIC.length);
    prefix.writeUInt32BE(headerJson.length, ENCRYPTED_BACKUP_MAGIC.length + 1);
    const headerBytes = Buffer.concat([prefix, headerJson]);
    const headerHash = crypto.createHash('sha256').update(headerBytes).digest();
    const baseNonce = Buffer.from(header.nonce, 'base64');

    const input = await open(source, 'r');
    let output: FileHandle | undefined;
    try {
        output = await open(target, 'w');
        await output.write(headerBytes);

        const { size } = await input.stat();
        const buffer = Buffer.alloc(CHUNK_SIZE);
        let position = 0;
        let counter = 0n;

        let isLast = false;

        // an empty file still gets one (empty) last chunk, so that a missing end is detected
        while (!isLast) {
            const { bytesRead } = await input.read(buffer, 0, CHUNK_SIZE, position);
            position += bytesRead;
            isLast = position >= size || bytesRead === 0;
            const cipher = crypto.createCipheriv('aes-256-gcm', dataKey, chunkNonce(baseNonce, counter));
            cipher.setAAD(chunkAad(headerHash, counter, isLast));
            const ciphertext = Buffer.concat([cipher.update(buffer.subarray(0, bytesRead)), cipher.final()]);
            const length = Buffer.alloc(4);
            length.writeUInt32BE(ciphertext.length);
            await output.write(Buffer.concat([length, ciphertext, cipher.getAuthTag()]));
            counter++;
        }
    } catch (e) {
        await output?.close();
        output = undefined;
        await rm(target, { force: true });
        throw e;
    } finally {
        await input.close();
        await output?.close();
    }
}

/**
 * Decrypt an encrypted backup
 *
 * The whole file is decrypted and verified. On any error the target is removed again, so that nothing of an
 * unverified backup is left to be extracted.
 *
 * @param source the encrypted file
 * @param target the decrypted file to write
 * @param credentials the password or private key
 * @throws {BackupDecryptionError} if it cannot be decrypted with the credentials or the file is damaged
 */
export async function decryptFile(source: string, target: string, credentials: DecryptionCredentials): Promise<void> {
    const input = await open(source, 'r');
    let output: FileHandle | undefined;
    try {
        const { size } = await input.stat();
        const { header, headerBytes } = await readHeader(input, size);
        const dataKey = await unwrapDataKey(header, credentials);
        const headerHash = crypto.createHash('sha256').update(headerBytes).digest();
        const baseNonce = Buffer.from(header.nonce, 'base64');

        if (baseNonce.length !== NONCE_SIZE || !Number.isInteger(header.chunkSize) || header.chunkSize <= 0) {
            throw new BackupDecryptionError('The header of the encrypted backup is invalid');
        }

        output = await open(target, 'w');
        let position = headerBytes.length;
        let counter = 0n;
        let lastSeen = false;

        while (position < size) {
            const length = await readExactly(input, 4, position);
            const ciphertextLength = length.readUInt32BE(0);
            if (ciphertextLength > header.chunkSize || position + 4 + ciphertextLength + TAG_SIZE > size) {
                throw new BackupDecryptionError('The encrypted backup is damaged or incomplete');
            }
            const ciphertext = await readExactly(input, ciphertextLength, position + 4);
            const tag = await readExactly(input, TAG_SIZE, position + 4 + ciphertextLength);
            position += 4 + ciphertextLength + TAG_SIZE;

            // the last chunk has to be the last record of the file, a cut-off file fails here
            const isLast = position >= size;
            const decipher = crypto.createDecipheriv('aes-256-gcm', dataKey, chunkNonce(baseNonce, counter));
            decipher.setAAD(chunkAad(headerHash, counter, isLast));
            decipher.setAuthTag(tag);
            let plaintext: Buffer;
            try {
                plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
            } catch {
                throw new BackupDecryptionError('The encrypted backup is damaged, incomplete or was changed');
            }
            await output.write(plaintext);
            counter++;
            lastSeen = isLast;
        }

        if (!lastSeen) {
            throw new BackupDecryptionError('The encrypted backup is incomplete');
        }
    } catch (e) {
        await output?.close();
        output = undefined;
        await rm(target, { force: true });
        throw e;
    } finally {
        await input.close();
        await output?.close();
    }
}

/**
 * Wrap the data key for every recipient
 *
 * @param dataKey the random key which encrypts the data
 * @param recipients the password and/or public keys
 */
async function createRecipients(
    dataKey: Buffer,
    recipients: EncryptionRecipients,
): Promise<(PasswordRecipient | X25519Recipient)[]> {
    const result: (PasswordRecipient | X25519Recipient)[] = [];

    if (recipients.password) {
        const params = recipients.scrypt ?? DEFAULT_SCRYPT;
        const salt = crypto.randomBytes(16);
        const kek = await scrypt(recipients.password, salt, params);
        const { nonce, wrappedKey } = wrapKey(kek, dataKey);
        result.push({ type: 'password', kdf: 'scrypt', ...params, salt: b64(salt), nonce, wrappedKey });
    }

    for (const publicKeyText of recipients.publicKeys ?? []) {
        const recipientKey = parsePublicKey(publicKeyText);
        const ephemeral = crypto.generateKeyPairSync('x25519');
        const ephemeralRaw = rawPublicKey(ephemeral.publicKey);
        const recipientRaw = rawPublicKey(recipientKey);
        const salt = crypto.randomBytes(16);
        const shared = crypto.diffieHellman({ privateKey: ephemeral.privateKey, publicKey: recipientKey });
        const kek = x25519Kek(shared, salt, ephemeralRaw, recipientRaw);
        const { nonce, wrappedKey } = wrapKey(kek, dataKey);
        result.push({
            type: 'x25519',
            ephemeralPublicKey: b64(ephemeralRaw),
            recipient: b64(recipientRaw),
            salt: b64(salt),
            nonce,
            wrappedKey,
        });
    }

    if (!result.length) {
        throw new Error('A password or a public key is needed to encrypt a backup');
    }
    return result;
}

/**
 * Get the data key with the given credentials
 *
 * @param header the header of the backup
 * @param credentials the password or private key
 */
async function unwrapDataKey(header: EncryptionHeader, credentials: DecryptionCredentials): Promise<Buffer> {
    if (credentials.privateKey) {
        let privateKey: crypto.KeyObject;
        try {
            privateKey = crypto.createPrivateKey(credentials.privateKey);
        } catch (e) {
            throw new BackupDecryptionError(`The private key is invalid: ${e.message}`);
        }
        if (privateKey.asymmetricKeyType !== 'x25519') {
            throw new BackupDecryptionError('The private key is no X25519 key of a backup key pair');
        }
        const ownRaw = b64(rawPublicKey(crypto.createPublicKey(privateKey)));

        for (const recipient of header.recipients) {
            if (recipient.type !== 'x25519' || recipient.recipient !== ownRaw) {
                continue;
            }
            const ephemeralRaw = Buffer.from(recipient.ephemeralPublicKey, 'base64');
            const shared = crypto.diffieHellman({ privateKey, publicKey: publicKeyFromRaw(ephemeralRaw) });
            const kek = x25519Kek(
                shared,
                Buffer.from(recipient.salt, 'base64'),
                ephemeralRaw,
                Buffer.from(recipient.recipient, 'base64'),
            );
            return unwrapKey(kek, recipient.nonce, recipient.wrappedKey, 'The private key does not match the backup');
        }
        throw new BackupDecryptionError('The backup is not encrypted for this private key');
    }

    if (credentials.password !== undefined) {
        const recipient = header.recipients.find(entry => entry.type === 'password');
        if (!recipient || recipient.type !== 'password') {
            throw new BackupDecryptionError('The backup is not encrypted with a password, use the private key');
        }
        // the parameters come from the file, a manipulated one must not make scrypt take all memory
        if (
            !Number.isInteger(recipient.N) ||
            recipient.N > 2 ** 20 ||
            !Number.isInteger(recipient.r) ||
            recipient.r > 32 ||
            !Number.isInteger(recipient.p) ||
            recipient.p > 16
        ) {
            throw new BackupDecryptionError('The header of the encrypted backup is invalid');
        }
        const kek = await scrypt(credentials.password, Buffer.from(recipient.salt, 'base64'), recipient);
        return unwrapKey(kek, recipient.nonce, recipient.wrappedKey, 'Wrong password');
    }

    throw new BackupDecryptionError('A password or a private key is needed to decrypt the backup');
}

/**
 * Read and check the header of an encrypted backup
 *
 * @param input the opened file
 * @param size the size of the file
 */
async function readHeader(input: FileHandle, size: number): Promise<{ header: EncryptionHeader; headerBytes: Buffer }> {
    const prefixLength = ENCRYPTED_BACKUP_MAGIC.length + 5;
    if (size < prefixLength) {
        throw new BackupDecryptionError('The file is no encrypted backup');
    }
    const prefix = await readExactly(input, prefixLength, 0);
    if (!prefix.subarray(0, ENCRYPTED_BACKUP_MAGIC.length).equals(ENCRYPTED_BACKUP_MAGIC)) {
        throw new BackupDecryptionError('The file is no encrypted backup');
    }
    const version = prefix.readUInt8(ENCRYPTED_BACKUP_MAGIC.length);
    if (version !== FORMAT_VERSION) {
        throw new BackupDecryptionError(
            `The encrypted backup has the format version ${version}, this js-controller supports ${FORMAT_VERSION}`,
        );
    }
    const headerLength = prefix.readUInt32BE(ENCRYPTED_BACKUP_MAGIC.length + 1);
    if (headerLength > MAX_HEADER_SIZE || prefixLength + headerLength > size) {
        throw new BackupDecryptionError('The header of the encrypted backup is invalid');
    }
    const headerJson = await readExactly(input, headerLength, prefixLength);

    let header: EncryptionHeader;
    try {
        header = JSON.parse(headerJson.toString('utf8'));
    } catch {
        throw new BackupDecryptionError('The header of the encrypted backup is invalid');
    }
    if (!header || !Array.isArray(header.recipients) || typeof header.nonce !== 'string') {
        throw new BackupDecryptionError('The header of the encrypted backup is invalid');
    }

    return { header, headerBytes: Buffer.concat([prefix, headerJson]) };
}

/**
 * Read exactly the given number of bytes
 *
 * @param input the opened file
 * @param length number of bytes
 * @param position where to read
 */
async function readExactly(input: FileHandle, length: number, position: number): Promise<Buffer> {
    const buffer = Buffer.alloc(length);
    let read = 0;
    while (read < length) {
        const { bytesRead } = await input.read(buffer, read, length - read, position + read);
        if (!bytesRead) {
            throw new BackupDecryptionError('The encrypted backup is incomplete');
        }
        read += bytesRead;
    }
    return buffer;
}

/**
 * Encrypt the data key with a key encryption key
 *
 * @param kek the key encryption key
 * @param dataKey the data key
 */
function wrapKey(kek: Buffer, dataKey: Buffer): { nonce: string; wrappedKey: string } {
    const nonce = crypto.randomBytes(NONCE_SIZE);
    const cipher = crypto.createCipheriv('aes-256-gcm', kek, nonce);
    const wrapped = Buffer.concat([cipher.update(dataKey), cipher.final(), cipher.getAuthTag()]);
    return { nonce: b64(nonce), wrappedKey: b64(wrapped) };
}

/**
 * Decrypt the data key with a key encryption key
 *
 * @param kek the key encryption key
 * @param nonce the nonce, base64
 * @param wrappedKey the encrypted data key with the tag, base64
 * @param errorMessage the message if the key does not fit
 */
function unwrapKey(kek: Buffer, nonce: string, wrappedKey: string, errorMessage: string): Buffer {
    const wrapped = Buffer.from(wrappedKey, 'base64');
    if (wrapped.length !== KEY_SIZE + TAG_SIZE) {
        throw new BackupDecryptionError('The header of the encrypted backup is invalid');
    }
    try {
        const decipher = crypto.createDecipheriv('aes-256-gcm', kek, Buffer.from(nonce, 'base64'));
        decipher.setAuthTag(wrapped.subarray(KEY_SIZE));
        return Buffer.concat([decipher.update(wrapped.subarray(0, KEY_SIZE)), decipher.final()]);
    } catch {
        throw new BackupDecryptionError(errorMessage);
    }
}

/**
 * Derive a key from a password
 *
 * @param password the password
 * @param salt the salt
 * @param params the cost parameters
 */
function scrypt(password: string, salt: Buffer, params: ScryptParams): Promise<Buffer> {
    return new Promise((resolve, reject) =>
        crypto.scrypt(
            password.normalize('NFC'),
            salt,
            KEY_SIZE,
            { N: params.N, r: params.r, p: params.p, maxmem: 256 * params.N * params.r + 16 * 1024 * 1024 },
            (err, key) => (err ? reject(err) : resolve(key)),
        ),
    );
}

/**
 * Derive the key encryption key from an X25519 shared secret
 *
 * @param shared the shared secret
 * @param salt the salt
 * @param ephemeralRaw the ephemeral public key of the sender
 * @param recipientRaw the public key of the recipient
 */
function x25519Kek(shared: Buffer, salt: Buffer, ephemeralRaw: Buffer, recipientRaw: Buffer): Buffer {
    const info = Buffer.concat([Buffer.from('IOBENC1 x25519', 'ascii'), ephemeralRaw, recipientRaw]);
    return Buffer.from(crypto.hkdfSync('sha256', shared, salt, info, KEY_SIZE));
}

/**
 * The nonce of a chunk: the base nonce with the counter added to its last 8 bytes
 *
 * @param baseNonce the random base nonce of the file
 * @param counter the number of the chunk
 */
function chunkNonce(baseNonce: Buffer, counter: bigint): Buffer {
    const nonce = Buffer.from(baseNonce);
    const sum = (nonce.readBigUInt64BE(4) + counter) & 0xffffffffffffffffn;
    nonce.writeBigUInt64BE(sum, 4);
    return nonce;
}

/**
 * The additional authenticated data of a chunk: the header, the position of the chunk and whether it is the last one
 *
 * @param headerHash SHA-256 of the header
 * @param counter the number of the chunk
 * @param isLast whether this is the last chunk
 */
function chunkAad(headerHash: Buffer, counter: bigint, isLast: boolean): Buffer {
    const aad = Buffer.alloc(headerHash.length + 9);
    headerHash.copy(aad, 0);
    aad.writeBigUInt64BE(counter, headerHash.length);
    aad.writeUInt8(isLast ? 1 : 0, headerHash.length + 8);
    return aad;
}

/**
 * Parse a public key in the text form of {@link generateBackupKeyPair}
 *
 * @param text the public key
 */
function parsePublicKey(text: string): crypto.KeyObject {
    const trimmed = text.trim();
    if (!trimmed.startsWith(PUBLIC_KEY_PREFIX)) {
        throw new Error(`The public key for the backup encryption must start with "${PUBLIC_KEY_PREFIX}"`);
    }
    const raw = Buffer.from(trimmed.substring(PUBLIC_KEY_PREFIX.length), 'base64url');
    if (raw.length !== 32) {
        throw new Error('The public key for the backup encryption is invalid');
    }
    return publicKeyFromRaw(raw);
}

/**
 * Create an X25519 public key from its 32 raw bytes
 *
 * @param raw the raw key
 */
function publicKeyFromRaw(raw: Buffer): crypto.KeyObject {
    return crypto.createPublicKey({ key: { kty: 'OKP', crv: 'X25519', x: raw.toString('base64url') }, format: 'jwk' });
}

/**
 * Get the 32 raw bytes of an X25519 public key
 *
 * @param key the public key
 */
function rawPublicKey(key: crypto.KeyObject): Buffer {
    const jwk = key.export({ format: 'jwk' });
    return Buffer.from(jwk.x!, 'base64url');
}

/**
 * Encode as base64
 *
 * @param data the data
 */
function b64(data: Buffer): string {
    return data.toString('base64');
}
