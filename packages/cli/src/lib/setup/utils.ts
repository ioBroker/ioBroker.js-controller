import { EXIT_CODES } from '@iobroker/js-controller-common';
import { tools } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

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
    let { repoName } = options;

    if (!repoName || repoName === 'auto') {
        const systemConfig = await objects!.getObjectAsync('system.config');
        repoName = systemConfig!.common.activeRepo;
    }

    const repoArr = !Array.isArray(repoName) ? [repoName!] : repoName!;

    const systemRepos = (await objects!.getObjectAsync('system.repositories'))!;

    const allSources = {};
    let changed = false;
    let anyFound = false;
    for (const repo of repoArr) {
        if (systemRepos.native.repositories[repo]) {
            if (typeof systemRepos.native.repositories[repo] === 'string') {
                systemRepos.native.repositories[repo] = {
                    link: systemRepos.native.repositories[repo],
                    json: null
                };
                changed = true;
            }

            // If repo is not yet loaded
            if (!systemRepos.native.repositories[repo].json) {
                console.log(`Update repository "${repo}" under "${systemRepos.native.repositories[repo].link}"`);
                const data = await tools.getRepositoryFileAsync(systemRepos.native.repositories[repo].link);
                systemRepos.native.repositories[repo].json = data.json;
                systemRepos.native.repositories[repo].hash = data.hash;
                systemRepos.from = `system.host.${tools.getHostName()}.cli`;
                systemRepos.ts = new Date().getTime();
                changed = true;
            }

            if (systemRepos.native.repositories[repo].json) {
                Object.assign(allSources, systemRepos.native.repositories[repo].json);
                anyFound = true;
            }
        }

        if (changed) {
            await objects.setObjectAsync('system.repositories', systemRepos);
        }
    }

    if (!anyFound) {
        console.error(
            `ERROR: No repositories defined. Please define one repository as active:  "iob repo set <${Object.keys(
                systemRepos.native.repositories
            ).join(' | ')}>`
        );
        // @ts-expect-error todo throw code or description?
        throw new Error(EXIT_CODES.INVALID_REPO);
    } else {
        return allSources;
    }
}
