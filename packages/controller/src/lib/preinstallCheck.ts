/**
 * we cannot use semver and other dependencies here, because dependencies are
 * not installed yet, so the version checks get a bit messy
 */

import path from 'node:path';
import child_process from 'node:child_process';

const RECOMMENDED_NPM_VERSION = 8;
/** Time to wait for npm version determination */
const EXEC_TIMEOUT = 10_000;
/** Duplicated from exitCodes */
const EXIT_CODE_CANNOT_INSTALL_NPM_PACKET = 25;
const VERSION_COMMAND = 'npm -v';

type VersionString = `${number}.${number}.${number}`;
type VersionObject = { major: number; minor: number; build: number };
type Range = { start: VersionString; end: VersionString };
/** start already unsupported, end is ok again */
const UNSUPPORTED_NPM_VERSION_RANGES: Range[] = [{ start: '5.0.0', end: '5.7.1' }];

function checkNpmVersion(): Promise<string> {
    return new Promise((resolve, reject) => {
        // Get npm version
        try {
            // remove local node_modules\.bin dir from path
            // or we potentially get a wrong npm version
            const newEnv = { ...process.env };
            newEnv.PATH = (newEnv.PATH || newEnv.Path || newEnv.path)!
                .split(path.delimiter)
                .filter(dir => {
                    dir = dir.toLowerCase();
                    return !(dir.includes('iobroker') && dir.includes(path.join('node_modules', '.bin')));
                })
                .join(path.delimiter);

            let timer: NodeJS.Timeout | null = setTimeout(() => {
                timer = null;
                reject(new Error('Timeout'));
            }, EXEC_TIMEOUT);

            child_process.exec(
                VERSION_COMMAND,
                { encoding: 'utf8', env: newEnv, windowsHide: true },
                (error, stdout, _stderr) => {
                    if (timer) {
                        const npmVersion = stdout.trim();
                        clearTimeout(timer);
                        timer = null;

                        if (!npmVersion) {
                            reject(new Error(`Could not determine npm version via "${VERSION_COMMAND}"`));
                        }

                        console.log(`NPM version: ${npmVersion}`);

                        for (const unsupportedVersion of UNSUPPORTED_NPM_VERSION_RANGES) {
                            if (gte(npmVersion, unsupportedVersion.start) && lt(npmVersion, unsupportedVersion.end)) {
                                console.warn(
                                    '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
                                );
                                console.warn('WARNING:');
                                console.warn('You are using an unsupported npm version!');
                                console.warn('This can lead to problems when installing further packages');
                                console.warn();
                                console.warn(
                                    `Please use "npm install -g npm@${RECOMMENDED_NPM_VERSION}" to upgrade npm to ${RECOMMENDED_NPM_VERSION}.x or `,
                                );
                                console.warn('use "npm install -g npm@latest" to install a supported version of npm!');
                                console.warn(
                                    'You need to make sure to repeat this step after installing an update to NodeJS and/or npm.',
                                );
                                console.warn(
                                    '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
                                );
                                process.exit(EXIT_CODE_CANNOT_INSTALL_NPM_PACKET);
                            }
                        }
                        resolve(npmVersion);
                    }
                },
            );
        } catch (e) {
            reject(e as Error);
        }
    });
}

checkNpmVersion()
    .catch(err => {
        console.error(`Could not check npm version: ${err.message}`);
        console.error('Assuming that correct version is installed.');
    })
    .then(() => {
        process.exit(0);
    });

// ======================================
// all the functions to replace `semver`:

/**
 * Parses a version string
 *
 * @param version The version string to parse
 */
function parseVersion(version: string): VersionObject {
    const versionRegExp = /^v?(\d+)\.(\d+)\.(\d+).*?/;
    const parsed = versionRegExp.exec(version);
    if (!parsed) {
        throw new Error(`Could not parse version "${version}"`);
    }

    return {
        major: parseInt(parsed[1]),
        minor: parseInt(parsed[2]),
        build: parseInt(parsed[3]),
    };
}

/**
 * Checks if v1 > v2
 *
 * @param v1
 * @param v2
 */
function gt(v1: VersionObject | string, v2: VersionObject | string): boolean {
    if (typeof v1 === 'string') {
        v1 = parseVersion(v1);
    }
    if (typeof v2 === 'string') {
        v2 = parseVersion(v2);
    }

    if (v1.major > v2.major) {
        return true;
    } else if (v1.major < v2.major) {
        return false;
    }

    if (v1.minor > v2.minor) {
        return true;
    } else if (v1.minor < v2.minor) {
        return false;
    }

    return v1.build > v2.build;
}

/**
 * Checks if v1 < v2
 *
 * @param v1
 * @param v2
 */
function lt(v1: VersionObject | string, v2: VersionObject | string): boolean {
    if (typeof v1 === 'string') {
        v1 = parseVersion(v1);
    }
    if (typeof v2 === 'string') {
        v2 = parseVersion(v2);
    }

    if (v1.major < v2.major) {
        return true;
    } else if (v1.major > v2.major) {
        return false;
    }

    if (v1.minor < v2.minor) {
        return true;
    } else if (v1.minor > v2.minor) {
        return false;
    }

    return v1.build < v2.build;
}

/**
 * Checks if v1 == v2
 *
 * @param v1
 * @param v2
 */
function eq(v1: VersionObject | string, v2: VersionObject | string): boolean {
    if (typeof v1 === 'string') {
        v1 = parseVersion(v1);
    }
    if (typeof v2 === 'string') {
        v2 = parseVersion(v2);
    }

    if (v1.major !== v2.major) {
        return false;
    }
    if (v1.minor !== v2.minor) {
        return false;
    }
    return v1.build === v2.build;
}

/**
 * Checks if v1 >= v2
 *
 * @param v1
 * @param v2
 */
function gte(v1: VersionObject | string, v2: VersionObject | string): boolean {
    return gt(v1, v2) || eq(v1, v2);
}
