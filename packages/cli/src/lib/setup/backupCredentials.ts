import { readFile } from 'node:fs/promises';
import type { DecryptionCredentials, EncryptionRecipients } from './backupEncryption.js';

/** Environment variable with the password of encrypted backups */
export const BACKUP_PASSWORD_ENV = 'IOB_BACKUP_PASSWORD';

/** Called to get the credentials of an encrypted backup, only if the backup is encrypted */
export type DecryptionCredentialsProvider = () => Promise<DecryptionCredentials>;

/**
 * Read a CLI parameter given as `--some-name` or `--someName`
 *
 * @param params the parsed CLI parameters
 * @param name the name with dashes
 */
function param(params: Record<string, any>, name: string): unknown {
    const camelCase = name.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
    return params[name] ?? params[camelCase];
}

/**
 * Whether a password is given without asking for it: `--password`/`-p`, `--password-file` or the environment variable
 *
 * @param params the parsed CLI parameters
 */
function hasGivenPassword(params: Record<string, any>): boolean {
    return (
        param(params, 'password') !== undefined ||
        !!param(params, 'password-file') ||
        !!process.env[BACKUP_PASSWORD_ENV]
    );
}

/**
 * Get the password: from `--password`/`-p`, `--password-file`, the environment variable or the terminal.
 *
 * `--password` is for automated calls. It ends up in the shell history and the process list, so `--password-file` or
 * the environment variable are safer there.
 *
 * @param params the parsed CLI parameters
 * @param confirm whether to ask twice, for a new password
 */
export async function readBackupPassword(params: Record<string, any>, confirm: boolean): Promise<string> {
    const given = param(params, 'password');
    const passwordFile = param(params, 'password-file');
    let password: string | undefined;

    if (given !== undefined) {
        // yargs gives a number for "-p 1234" if the option is not declared as string
        if (typeof given !== 'string' && typeof given !== 'number') {
            throw new Error('--password needs a value');
        }
        password = String(given);
    } else if (typeof passwordFile === 'string' && passwordFile) {
        // a trailing line break is part of most files, but hardly of the password
        password = (await readFile(passwordFile, 'utf8')).replace(/\r?\n$/, '');
    } else if (process.env[BACKUP_PASSWORD_ENV]) {
        password = process.env[BACKUP_PASSWORD_ENV];
    } else if (process.stdin.isTTY) {
        const { default: rl } = await import('readline-sync');
        password = rl.question('Password of the backup: ', { hideEchoBack: true });
        if (confirm && rl.question('Repeat the password: ', { hideEchoBack: true }) !== password) {
            throw new Error('The passwords do not match');
        }
    } else {
        throw new Error(
            `A password is needed: use --password <password>, --password-file <file> or the environment variable ${BACKUP_PASSWORD_ENV}`,
        );
    }

    if (!password) {
        throw new Error('The password of the backup must not be empty');
    }
    return password;
}

/**
 * Decide how a new backup is encrypted, from `--encrypt` and `backup.encryption` of iobroker.json
 *
 * `--encrypt false` creates an unencrypted backup although iobroker.json asks for encryption. A password given with
 * `--password`/`-p` encrypts the backup without `--encrypt`. With the mode `publicKey` no password is needed; a password
 * from `--password`, `--password-file` or the environment is added as a second way to decrypt it.
 *
 * @param params the parsed CLI parameters
 * @param config the iobroker.json
 * @returns null if the backup is not to be encrypted
 */
export async function getBackupEncryption(
    params: Record<string, any>,
    config: ioBroker.IoBrokerJson | undefined,
): Promise<EncryptionRecipients | null> {
    const encrypt = param(params, 'encrypt');
    const settings = config?.backup?.encryption;

    if (encrypt === false || (!encrypt && !settings?.mode && param(params, 'password') === undefined)) {
        return null;
    }

    if (settings?.mode === 'publicKey') {
        if (!settings.publicKey) {
            throw new Error(
                'iobroker.json asks to encrypt backups with a public key (backup.encryption.mode), but has none: create one with "iobroker backup keygen --save"',
            );
        }
        const recipients: EncryptionRecipients = { publicKeys: [settings.publicKey] };
        if (hasGivenPassword(params)) {
            recipients.password = await readBackupPassword(params, false);
        }
        return recipients;
    }

    return { password: await readBackupPassword(params, true) };
}

/**
 * Create the provider of the credentials to restore or validate an encrypted backup: the private key of `--key-file`,
 * else the password. It is only called if the backup turns out to be encrypted.
 *
 * @param params the parsed CLI parameters
 */
export function createDecryptionCredentialsProvider(params: Record<string, any>): DecryptionCredentialsProvider {
    return async () => {
        const keyFile = param(params, 'key-file');
        if (typeof keyFile === 'string' && keyFile) {
            return { privateKey: await readFile(keyFile, 'utf8') };
        }
        return { password: await readBackupPassword(params, false) };
    };
}
