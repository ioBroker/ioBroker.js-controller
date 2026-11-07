import semver from 'semver';
import { EXIT_CODES } from '@iobroker/js-controller-common-db';

/** What is known about an adapter that is about to be installed */
export interface AdapterCompatibilityInput {
    /** Content of its `io-package.json` */
    ioPackage: { common?: Partial<Pick<ioBroker.AdapterCommon, 'os' | 'nogit'>> } | null | undefined;
    /** Content of its `package.json`, if known */
    packageJson?: { engines?: { node?: string } } | null;
    /** Whether it is installed directly from GitHub (`iobroker url <github-url>`) */
    fromGitHub?: boolean;
    /** Operating system to check against, default `process.platform` */
    platform?: string;
    /** Node.js version to check against, default `process.version` */
    nodeVersion?: string;
}

/** Why an adapter cannot be installed */
export interface AdapterCompatibilityProblem {
    /** Exit code of the CLI */
    exitCode: EXIT_CODES;
    /** Message for the user */
    message: string;
}

/**
 * Check whether an adapter can be installed on this system: from GitHub only without `common.nogit`, only on a
 * supported operating system (`common.os`) and only with a supported Node.js version (`engines.node`).
 *
 * The same checks run before a GitHub installation (with the files from GitHub) and before an adapter is set up
 * (with the installed files).
 *
 * @param input the adapter files and the system to check against
 * @returns the first problem found, or `null` if the adapter can be installed
 */
export function checkAdapterCompatibility(input: AdapterCompatibilityInput): AdapterCompatibilityProblem | null {
    const common = input.ioPackage?.common;
    const platform = input.platform ?? process.platform;
    const nodeVersion = (input.nodeVersion ?? process.version).replace(/^v/, '');

    if (input.fromGitHub && common?.nogit === true) {
        return {
            exitCode: EXIT_CODES.CANNOT_INSTALL_NPM_PACKET,
            message:
                'Adapter cannot be installed from GitHub ("nogit" is set in io-package.json). Install it from the repository or from npm instead',
        };
    }

    const os = common?.os;
    if (typeof os === 'string' && os !== platform) {
        return {
            exitCode: EXIT_CODES.INVALID_OS,
            message: `Adapter does not support current os. Required ${os}. Actual platform: ${platform}`,
        };
    }
    if (Array.isArray(os) && !(os as string[]).includes(platform)) {
        return {
            exitCode: EXIT_CODES.INVALID_OS,
            message: `Adapter does not support current os. Required one of ${os.join(', ')}. Actual platform: ${platform}`,
        };
    }

    const engine = input.packageJson?.engines?.node;
    if (engine && !semver.satisfies(nodeVersion, engine)) {
        return {
            exitCode: EXIT_CODES.INVALID_NODE_VERSION,
            message: `Adapter does not support current nodejs version. Required ${engine}. Actual version: v${nodeVersion}`,
        };
    }

    return null;
}
