import { tools, EXIT_CODES } from '@iobroker/js-controller-common';
import axios from 'axios';
import fs from 'fs-extra';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import { isVersionIgnored } from '@/lib/setup/utils.js';
import path from 'node:path';

export interface CLIRepoOptions {
    objects: ObjectsRedisClient;
    states: StatesRedisClient;
}

export interface RepoFlags {
    /** Also list not installed adapters */
    a?: boolean;
    all?: boolean;
    /** Only list updatable adapters */
    u?: boolean;
    updatable?: boolean;
    /** Force update even if hash hasn't changed */
    f?: boolean;
    force?: boolean;
}

export class Repo {
    private readonly defaultSystemRepo: ioBroker.RepositoryObject;
    private readonly objects: ObjectsRedisClient;
    private readonly states: StatesRedisClient;
    private readonly controllerVersion: string;

    constructor(options: CLIRepoOptions) {
        if (!options?.objects) {
            throw new Error('Invalid arguments: objects is missing');
        }
        if (!options?.states) {
            throw new Error('Invalid arguments: states is missing');
        }

        const ioPackage = fs.readJSONSync(path.join(tools.getControllerDir(), 'io-package.json'));
        this.controllerVersion = ioPackage.common.version;

        this.objects = options.objects;
        this.states = options.states;

        this.defaultSystemRepo = {
            common: {
                name: 'System repositories',
                dontDelete: true,
            },
            native: {
                repositories: {
                    stable: {
                        link: 'http://download.iobroker.net/sources-dist.json',
                        json: null,
                    },
                    beta: {
                        link: 'http://download.iobroker.net/sources-dist-latest.json',
                        json: null,
                    },
                },
            },
            _id: 'system.repositories',
            type: 'config',
        };
    }

    /**
     * Update the given repository and returns new repo content
     *
     * @param repoName name of the repository
     * @param force force update even if same hash
     * @param systemConfig content of system.config object
     * @param systemRepos content of system.repositories object
     */
    private async updateRepo(
        repoName: string,
        force: boolean | undefined,
        systemConfig?: ioBroker.OtherObject,
        systemRepos?: ioBroker.RepositoryObject,
    ): Promise<null | ioBroker.RepositoryJson> {
        if (!repoName) {
            const sysConfig = systemConfig || (await this.objects.getObject('system.config'));
            repoName = sysConfig!.common.activeRepo;
        }

        const oldRepos = systemRepos || (await this.objects.getObject('system.repositories'));
        if (!oldRepos?.native.repositories?.[repoName]) {
            console.log(`Error: repository "${repoName}" not found in the "system.repositories`);
            return null;
        }

        const urlOrPath = oldRepos.native.repositories[repoName].link;
        const hashUrl = urlOrPath.replace(/\.json$/, '-hash.json');
        let hash;

        if (
            !force &&
            oldRepos.native.repositories[repoName].hash &&
            oldRepos.native.repositories[repoName].json &&
            (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://'))
        ) {
            try {
                hash = await axios({ url: hashUrl, timeout: 10_000 });
            } catch (e) {
                console.error(`Cannot download repository hash file from "${hashUrl}": ${e.message}`);
            }
            if (hash?.data && oldRepos.native.repositories[repoName].hash === hash.data.hash) {
                return oldRepos.native.repositories[repoName].json;
            }
        }

        let data;

        if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
            if (!hash) {
                try {
                    hash = await axios({ url: hashUrl, timeout: 10000 });
                } catch (e) {
                    console.error(`Cannot download repository hash file from "${hashUrl}": ${e.message}`);
                }
            }

            const agent = `${tools.appName}, RND: CLI, Node:${process.version}, V:${this.controllerVersion}`;
            try {
                data = await axios({
                    url: urlOrPath,
                    timeout: 10_000,
                    headers: { 'User-Agent': agent },
                });
                if (data.data) {
                    data = data.data;
                } else {
                    data = null;
                }
            } catch (e) {
                console.error(`Cannot download repository file from "${urlOrPath}": ${e.message}`);
                data = null;
            }
        } else {
            if (fs.existsSync(urlOrPath)) {
                try {
                    data = JSON.parse(fs.readFileSync(urlOrPath).toString('utf8'));
                } catch (err) {
                    console.error(`Error: Cannot read or parse file "${urlOrPath}": ${err.message}`);
                }
            } else {
                console.error(`Error: Cannot find file "${urlOrPath}"`);
            }
        }

        let changed;
        if (data) {
            oldRepos.native.repositories[repoName].json = data;
            changed = true;
        }
        if (hash?.data) {
            oldRepos.native.repositories[repoName].hash = hash.data.hash;
            changed = true;
        }
        if (changed) {
            oldRepos.from = `system.host.${tools.getHostName()}.cli`;
            oldRepos.ts = Date.now();
            await this.objects.setObject('system.repositories', oldRepos);
        }

        return oldRepos.native.repositories[repoName].json;
    }

    /**
     * Show repo on CLI
     *
     * @param repoUrl url of the repository
     * @param flags CLI flags
     */
    async showRepo(repoUrl: string | string[], flags: RepoFlags): Promise<void> {
        // Get the repositories
        const systemConfig = await this.objects.getObject('system.config');
        const systemRepos = await this.objects.getObject('system.repositories');
        if (!systemConfig) {
            console.error('Error: Object "system.config" not found');
        } else if (!systemRepos) {
            console.error('Error: Object "system.repositories" not found');
        } else if (!systemRepos.native || !systemRepos.native.repositories) {
            console.error('Error: no repositories found in the "system.config');
        } else {
            repoUrl = repoUrl || systemConfig.common.activeRepo;

            if (!Array.isArray(repoUrl)) {
                repoUrl = [repoUrl];
            }

            console.log(`Used ${repoUrl.length > 1 ? 'repositories' : 'repository'}: ${repoUrl.join(', ')}`);

            const allSources = {};

            for (const url of repoUrl) {
                const repo = systemRepos.native.repositories[url];
                // If known repository
                if (repo) {
                    if (typeof repo === 'string') {
                        systemRepos.native.repositories[url] = {
                            link: repo,
                            json: null,
                            hash: '',
                        };
                    }

                    const sources = await this.updateRepo(url, flags.force || flags.f, systemConfig, systemRepos);
                    sources && Object.assign(allSources, sources);
                } else {
                    console.error(
                        `Error: unknown repository is active - "${url}". Known: ${Object.keys(
                            systemRepos.native.repositories,
                        ).join(', ')}`,
                    );
                }
            }

            try {
                // update variables of every admin instance
                await this.updateInfo(allSources);
            } catch {
                // not important if fails
            }

            return this.showRepoResult(allSources, flags);
        }
    }

    /**
     * Show the repo result on CLI
     *
     * @param sources Repo json sources
     * @param flags CLI flags
     */
    private async showRepoResult(sources: Record<string, any>, flags: RepoFlags): Promise<void> {
        const installed = tools.getInstalledInfo();
        const adapters = Object.keys(sources).sort();

        for (const name of adapters) {
            let updatable = false;
            let text = sources[name].controller ? 'Controller ' : 'Adapter    ';
            text += `"${name}"`;
            text = text.padEnd(11 + 15);

            if (sources[name].version) {
                text += `: ${sources[name].version}`;
            }
            text = text.padEnd(11 + 15 + 11);

            if (!(flags.all || flags.a) && !installed[name]) {
                continue;
            }

            if (installed[name]?.version) {
                text += `, installed ${installed[name].version}`;
                try {
                    // tools.upToDate can throw if version is invalid
                    if (
                        sources[name].version !== installed[name].version &&
                        sources[name].version &&
                        !tools.upToDate(sources[name].version, installed[name].version)
                    ) {
                        updatable = true;
                        text = text.padEnd(11 + 15 + 11 + 18);
                        const isIgnored = await isVersionIgnored({
                            adapterName: name,
                            objects: this.objects,
                            version: sources[name].version,
                        });

                        text += isIgnored ? ' [Ignored]' : ' [Updatable]';
                    }
                } catch (e) {
                    console.error(`Cannot determine update info of "${name}": ${e.message}`);
                }
            }
            if ((flags.updatable || flags.u) && !updatable) {
                continue;
            }
            console.log(text);
        }
    }

    /**
     * Update Admin info states with number of updates
     *
     * @param sources the repository object
     */
    private async updateInfo(sources: Record<string, any>): Promise<void> {
        const installed = tools.getInstalledInfo();
        const list: string[] = [];

        for (const name of Object.keys(sources)) {
            if (installed[name] && installed[name].version && sources[name].version) {
                try {
                    // tools.upToDate can throw if version is invalid
                    if (
                        sources[name].version !== installed[name].version &&
                        !tools.upToDate(sources[name].version, installed[name].version)
                    ) {
                        // remove first part of the name
                        const n = name.indexOf('.');
                        list.push(n === -1 ? name : name.substring(n + 1));
                    }
                } catch (e) {
                    console.error(`Cannot determine update info of "${name}": ${e.message}`);
                }
            }
        }

        const objs = await this.objects.getObjectViewAsync('system', 'instance', {
            startkey: 'system.adapter.admin',
            endkey: 'system.adapter.admin\u9999',
        });

        if (objs?.rows?.length) {
            const listStr = list.join(', ');
            for (const row of objs.rows) {
                if (row?.value?.type === 'instance') {
                    await this.states.setState(`${row.id}.info.updatesNumber`, { val: list.length, ack: true });
                    await this.states.setState(`${row.id}.info.updatesList`, { val: listStr, ack: true });
                }
            }
        }
    }

    /**
     * Show current status of Repo on CLI
     */
    async showRepoStatus(): Promise<number> {
        try {
            const obj = await this.objects.getObject('system.repositories');
            const objCfg = await this.objects.getObject('system.config');

            if (!obj) {
                console.error('List is empty');
                return EXIT_CODES.CANNOT_GET_REPO_LIST;
            } else if (obj.native.repositories) {
                console.table(
                    Object.entries(obj.native.repositories).map(([key, value]) => {
                        return {
                            name: key,
                            url: value.link,
                            'auto upgrade': objCfg?.common.adapterAutoUpgrade?.repositories[key] ?? false,
                        };
                    }),
                );

                if (objCfg?.common) {
                    let activeRepo = objCfg.common.activeRepo;
                    if (typeof activeRepo === 'string') {
                        activeRepo = [activeRepo];
                    }
                    console.log(`\nActive repo(s): ${activeRepo.join(', ')}`);
                    console.log(`Upgrade policy: ${objCfg.common.adapterAutoUpgrade?.defaultPolicy ?? 'none'}`);
                }
            } else {
                console.error('List is empty');
                return EXIT_CODES.CANNOT_GET_REPO_LIST;
            }
        } catch (err) {
            console.error(`Cannot get list: ${err}`);
        }
        return EXIT_CODES.CANNOT_GET_REPO_LIST;
    }

    /**
     * Add new repo
     *
     * @param repoName name of new repo
     * @param repoUrl url of new repo
     */
    async add(repoName: string, repoUrl: string): Promise<void> {
        const sysRepoObj = await this.objects.getObjectAsync('system.repositories');
        const obj = sysRepoObj || this.defaultSystemRepo;

        if (obj.native.repositories[repoName]) {
            throw new Error(`Repository "${repoName}" yet exists: ${obj.native.repositories[repoName].link}`);
        } else {
            obj.native.repositories[repoName] = {
                link: repoUrl,
                json: null,
            };
            obj.from = `system.host.${tools.getHostName()}.cli`;
            obj.ts = Date.now();
            await this.objects.setObjectAsync('system.repositories', obj);
        }
    }

    /**
     * Remove repository from sources
     *
     * @param repoName name of repository to remove
     */
    async del(repoName: string): Promise<void> {
        const obj = await this.objects.getObjectAsync('system.config');
        if (
            (obj?.common.activeRepo &&
                typeof obj.common.activeRepo === 'string' &&
                obj.common.activeRepo === repoName) ||
            (obj?.common.activeRepo && Array.isArray(obj.common.activeRepo) && obj.common.activeRepo.includes(repoName))
        ) {
            throw new Error(`Cannot delete active repository: ${repoName}`);
        } else {
            const repoObj = await this.objects.getObjectAsync('system.repositories');
            if (repoObj) {
                if (!repoObj.native.repositories[repoName]) {
                    throw new Error(`Repository "${repoName}" not found.`);
                } else {
                    delete repoObj.native.repositories[repoName];
                    repoObj.from = `system.host.${tools.getHostName()}.cli`;
                    repoObj.ts = Date.now();
                    await this.objects.setObject('system.repositories', repoObj);
                }
            }
        }
    }

    /**
     * Set specific repo as active one
     *
     * @param repoName name of the respository to activate
     */
    async setActive(repoName: string): Promise<void> {
        const sysRepoObj = await this.objects.getObjectAsync('system.repositories');
        const obj = sysRepoObj || this.defaultSystemRepo;

        if (!obj.native.repositories[repoName]) {
            throw new Error(`Repository "${repoName}" not found.`);
        } else {
            const confObj = await this.objects.getObjectAsync('system.config');
            if (typeof confObj?.common.activeRepo === 'string') {
                confObj.common.activeRepo = [confObj.common.activeRepo];
            }

            if (confObj && !confObj.common.activeRepo.includes(repoName)) {
                confObj.common.activeRepo.push(repoName);
                confObj.from = `system.host.${tools.getHostName()}.cli`;
                confObj.ts = Date.now();
                await this.objects.setObjectAsync('system.config', confObj);
            }
        }
    }

    /**
     * Set given repo as inactive
     *
     * @param repoName name of the repository
     */
    async setInactive(repoName: string): Promise<void> {
        const confObj = (await this.objects.getObjectAsync('system.config'))!;
        if (typeof confObj?.common.activeRepo === 'string') {
            confObj.common.activeRepo = [confObj.common.activeRepo];
        }

        const pos = confObj.common.activeRepo.indexOf(repoName);
        if (pos !== -1) {
            confObj.common.activeRepo.splice(pos, 1);
            confObj.from = `system.host.${tools.getHostName()}.cli`;
            confObj.ts = Date.now();
            await this.objects.setObjectAsync('system.config', confObj);
        }
    }

    /**
     * Renames existing repository if old name and link matches, renaming will not be performed if an repo with the new name already exists
     *
     * @param oldName - name of the current repository
     * @param newName - target name
     * @param repoUrl - hyperlink of the repository
     */
    async rename(oldName: string, newName: string, repoUrl: string): Promise<void> {
        let repoObj;
        let sysConfigObj;
        try {
            sysConfigObj = await this.objects.getObjectAsync('system.config');
            repoObj = await this.objects.getObjectAsync('system.repositories');
        } catch (err) {
            throw new Error(`Could not rename repository "${oldName}" to "${newName}": ${err.message}`);
        }

        if (repoObj && repoObj.native && repoObj.native.repositories) {
            if (
                repoObj.native.repositories[oldName] &&
                repoObj.native.repositories[oldName].link === repoUrl &&
                !repoObj.native.repositories[newName]
            ) {
                repoObj.native.repositories[newName] = repoObj.native.repositories[oldName];
                delete repoObj.native.repositories[oldName];

                try {
                    await this.objects.setObjectAsync('system.repositories', repoObj);
                    console.log(`Renamed repository "${oldName} to "${newName}"`);
                } catch (err) {
                    throw new Error(`Could not rename repository "${oldName}" to "${newName}": ${err.message}`);
                }

                // if we changed the name of the activeRepo, we should set newName as active repo
                if (
                    sysConfigObj &&
                    sysConfigObj.common &&
                    ((typeof sysConfigObj.common.activeRepo === 'string' &&
                        sysConfigObj.common.activeRepo === oldName) ||
                        (Array.isArray(sysConfigObj.common.activeRepo) &&
                            sysConfigObj.common.activeRepo.includes(oldName)))
                ) {
                    if (typeof sysConfigObj.common.activeRepo === 'string') {
                        sysConfigObj.common.activeRepo = [sysConfigObj.common.activeRepo];
                    }
                    const pos = sysConfigObj.common.activeRepo.indexOf(oldName);
                    sysConfigObj.common.activeRepo.splice(pos, 1, newName);

                    try {
                        await this.objects.setObjectAsync('system.config', sysConfigObj);
                    } catch (err) {
                        throw new Error(`Could not set "${newName}" as active repository: ${err.message}`);
                    }
                }
            }
        }
    }
}
