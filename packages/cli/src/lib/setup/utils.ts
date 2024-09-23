import { EXIT_CODES } from '@iobroker/js-controller-common';
import { tools } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import semver from 'semver';
import { IoBrokerError } from '@/lib/setup/customError.js';

interface GetRepositoryOptions {
    /** The objects DB client */
    objects: ObjectsClient;
    /** Name of the repository */
    repoName?: string;
}

/**
 * Get JSON of the given repository
 *
 * @param options Repository specific options
 */
export async function getRepository(options: GetRepositoryOptions): Promise<Record<string, any>> {
    const { objects } = options;
    const { repoName } = options;

    let repoNameOrArray: string | string[] | undefined = repoName;
    if (!repoName || repoName === 'auto') {
        const systemConfig = await objects.getObjectAsync('system.config');
        repoNameOrArray = systemConfig!.common.activeRepo;
    }

    const repoArr = !Array.isArray(repoNameOrArray) ? [repoNameOrArray!] : repoNameOrArray;

    const systemRepos = (await objects.getObjectAsync('system.repositories'))!;

    const allSources = {};
    let changed = false;
    let anyFound = false;
    for (const repoUrl of repoArr) {
        const repo = systemRepos.native.repositories[repoUrl];
        if (repo) {
            if (typeof repo === 'string') {
                systemRepos.native.repositories[repo] = {
                    link: repo,
                    json: null,
                };
                changed = true;
            }

            // If repo is not yet loaded
            if (!systemRepos.native.repositories[repoUrl].json) {
                console.log(`Update repository "${repoUrl}" under "${systemRepos.native.repositories[repoUrl].link}"`);
                const data = await tools.getRepositoryFileAsync(systemRepos.native.repositories[repoUrl].link);
                systemRepos.native.repositories[repoUrl].json = data.json;
                systemRepos.native.repositories[repoUrl].hash = data.hash;
                systemRepos.from = `system.host.${tools.getHostName()}.cli`;
                systemRepos.ts = new Date().getTime();
                changed = true;
            }

            if (systemRepos.native.repositories[repoUrl].json) {
                Object.assign(allSources, systemRepos.native.repositories[repoUrl].json);
                anyFound = true;
            }
        }

        if (changed) {
            await objects.setObjectAsync('system.repositories', systemRepos);
        }
    }

    if (!anyFound) {
        let message: string;
        if (repoArr.length) {
            message = `ERROR: No repositories defined matching "${repoArr.join(
                ' | ',
            )}". Please use one of ${Object.keys(systemRepos.native.repositories)
                .map(repo => `"${repo}"`)
                .join(', ')}.`;
        } else {
            message = `ERROR: No repositories defined. Please define one repository as active: "iob repo set <${Object.keys(
                systemRepos.native.repositories,
            ).join(' | ')}>"`;
        }

        throw new IoBrokerError({ message, code: EXIT_CODES.INVALID_REPO });
    } else {
        return allSources;
    }
}

interface VersionOptions {
    /** The adapter name to check the version for */
    adapterName: string;
    /** The objects DB instance */
    objects: ObjectsClient;
}

interface IgnoreVersionOptions extends VersionOptions {
    /** The version which will be checked */
    version: string;
}

/**
 * Get info if a specific version should be ignored of this adapter
 *
 * @param options name and target version of the adapter
 */
export async function isVersionIgnored(options: IgnoreVersionOptions): Promise<boolean> {
    const { adapterName, version, objects } = options;
    const obj = await objects.getObject(`system.host.${tools.getHostName()}.adapter.${adapterName}`);

    if (obj?.common.ignoreVersion === undefined) {
        return false;
    }

    return semver.satisfies(version, obj?.common.ignoreVersion);
}

/**
 * Ignore a specific version of an adapter
 *
 * @param options name and target version of the adapter
 */
export async function ignoreVersion(options: IgnoreVersionOptions): Promise<void> {
    const { adapterName, version, objects } = options;
    const id = `system.host.${tools.getHostName()}.adapter.${adapterName}`;
    const obj = await objects.getObject(id);

    if (!obj) {
        throw new IoBrokerError({ code: EXIT_CODES.CANNOT_SET_OBJECT, message: `Object "${id}" does not exist` });
    }

    obj.common.ignoreVersion = version;

    await objects.setObject(id, obj);
}

/**
 * Recognize all updates of adapter again
 *
 * @param options name of the adapter
 */
export async function recognizeVersion(options: VersionOptions): Promise<void> {
    const { adapterName, objects } = options;
    const id = `system.host.${tools.getHostName()}.adapter.${adapterName}`;
    const obj = await objects.getObject(id);

    if (!obj) {
        throw new IoBrokerError({ code: EXIT_CODES.CANNOT_SET_OBJECT, message: `Object "${id}" does not exist` });
    }

    delete obj.common.ignoreVersion;

    await objects.setObject(id, obj);
}
