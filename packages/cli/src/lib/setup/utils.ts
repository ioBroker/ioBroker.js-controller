import { EXIT_CODES } from '@iobroker/js-controller-common';
import { tools } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import { IoBrokerError } from './customError.js';

interface GetRepositoryOptions {
    /** The objects DB client */
    objects: ObjectsClient;
    /** Name of the repository */
    repoName?: string;
}

/**
 * Get json of the given repository
 *
 * @param options Repository specific options
 */
export async function getRepository(options: GetRepositoryOptions): Promise<Record<string, any>> {
    const { objects } = options;
    const { repoName } = options;

    let repoNameOrArray: string | string[] | undefined = repoName;
    if (!repoName || repoName === 'auto') {
        const systemConfig = await objects!.getObjectAsync('system.config');
        repoNameOrArray = systemConfig!.common.activeRepo;
    }

    const repoArr = !Array.isArray(repoNameOrArray) ? [repoNameOrArray!] : repoNameOrArray;

    const systemRepos = (await objects!.getObjectAsync('system.repositories'))!;

    const allSources = {};
    let changed = false;
    let anyFound = false;
    for (const repoUrl of repoArr) {
        const repo = systemRepos.native.repositories[repoUrl];
        if (repo) {
            if (typeof repo === 'string') {
                systemRepos.native.repositories[repo] = {
                    link: repo,
                    json: null
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
                ' | '
            )}". Please use one of ${Object.keys(systemRepos.native.repositories)
                .map(repo => `"${repo}"`)
                .join(', ')}.`;
        } else {
            message = `ERROR: No repositories defined. Please define one repository as active: "iob repo set <${Object.keys(
                systemRepos.native.repositories
            ).join(' | ')}>"`;
        }

        throw new IoBrokerError({ message, code: EXIT_CODES.INVALID_REPO });
    } else {
        return allSources;
    }
}
