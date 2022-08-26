/**
 *      Upgrade command
 *
 *      Copyright 2013-2022 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */
import Debug from 'debug';
import * as fs from 'fs-extra';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';
import semver from 'semver';
import { Upload } from './setupUpload';
import { Install } from './setupInstall';
import rl from 'readline-sync';
import tty from 'tty';
import type { ObjectsInRedisClient } from '@iobroker/db-objects-redis/build/lib/objects/objectsInRedisClient';

const debug = Debug('iobroker:cli');

type IoPackDependencies = string[] | Record<string, any>[] | Record<string, any>;

interface CLIUpgradeOptions {
    processExit: (exitCode?: number) => void;
    restartController: () => void;
    getRepository: (repoName: string | undefined, params: Record<string, any>) => Record<string, any>;
    objects: ObjectsInRedisClient;
    params: Record<string, any>;
}

export class Upgrade {
    private readonly hostname = tools.getHostName();
    private readonly upload: Upload;
    private readonly install: Install;
    private objects: ObjectsInRedisClient;
    private readonly processExit: CLIUpgradeOptions['processExit'];
    private readonly params: CLIUpgradeOptions['params'];
    private readonly getRepository: CLIUpgradeOptions['getRepository'];

    constructor(options: CLIUpgradeOptions) {
        options = options || {};

        if (!options.processExit) {
            throw new Error('Invalid arguments: processExit is missing');
        }
        if (!options.restartController) {
            throw new Error('Invalid arguments: restartController is missing');
        }
        if (!options.getRepository) {
            throw new Error('Invalid arguments: getRepository is missing');
        }

        this.processExit = options.processExit;
        this.getRepository = options.getRepository;
        this.params = options.params;
        this.objects = options.objects;

        this.upload = new Upload(options);
        this.install = new Install(options);
    }

    /**
     * Sorts the adapters by their dependencies and then upgrades multiple adapters from the given repository url
     *
     * @param repo the repository content
     * @param list list of adapters to upgrade
     * @param forceDowngrade flag to force downgrade
     * @param autoConfirm automatically confirm the tty questions (bypass)
     */
    async upgradeAdapterHelper(
        repo: Record<string, any>,
        list: string[],
        forceDowngrade: boolean,
        autoConfirm: boolean
    ): Promise<void> {
        const relevantAdapters = [];
        // check which adapters are upgradeable and sort them according to their dependencies
        for (const adapter of list) {
            if (repo[adapter].controller) {
                // skip controller
                continue;
            }
            const adapterDir = tools.getAdapterDir(adapter);
            if (fs.existsSync(`${adapterDir}/io-package.json`)) {
                const ioInstalled = fs.readJsonSync(`${adapterDir}/io-package.json`);
                if (!tools.upToDate(repo[adapter].version, ioInstalled.common.version)) {
                    // not up to date, we need to put it into account for our dependency check
                    relevantAdapters.push(adapter);
                }
            }
        }

        if (relevantAdapters.length) {
            const sortedAdapters = [];

            while (relevantAdapters.length) {
                let oneAdapterAdded = false;
                // create ordered list for upgrades
                for (let i = relevantAdapters.length - 1; i >= 0; i--) {
                    const relAdapter = relevantAdapters[i];
                    // if new version has no dependencies we can upgrade
                    if (!repo[relAdapter].dependencies && !repo[relAdapter].globalDependencies) {
                        // no deps, simply add it
                        sortedAdapters.push(relAdapter);
                        relevantAdapters.splice(relevantAdapters.indexOf(relAdapter), 1);
                        oneAdapterAdded = true;
                    } else {
                        const allDeps = {
                            ...tools.parseDependencies(repo[relAdapter].dependencies),
                            ...tools.parseDependencies(repo[relAdapter].globalDependencies)
                        };

                        // we have to check if the deps are there
                        let conflict = false;
                        for (const [depName, version] of Object.entries(allDeps)) {
                            debug(`adapter "${relAdapter}" has dependency "${depName}": "${version}"`);
                            if (version !== '*') {
                                // dependency is important, because it affects version range
                                if (relevantAdapters.includes(depName)) {
                                    // the dependency is also in the upgrade list and not previously added, we should add the dependency first
                                    debug(`conflict for dependency "${depName}" at adapter "${relAdapter}"`);
                                    conflict = true;
                                    break;
                                }
                            }
                        }
                        // we reached here and no conflict so every dep is satisfied
                        if (!conflict) {
                            sortedAdapters.push(relAdapter);
                            relevantAdapters.splice(relevantAdapters.indexOf(relAdapter), 1);
                            oneAdapterAdded = true;
                        }
                    }
                }

                if (!oneAdapterAdded) {
                    // no adapter during this loop -> circular dependency
                    console.warn(`Circular dependency detected between adapters "${relevantAdapters.join(', ')}"`);
                    sortedAdapters.concat(relevantAdapters);
                    break; // however, break and try to update
                }
            }

            debug(`upgrade order is "${sortedAdapters.join(', ')}"`);

            for (const sortedAdapter of sortedAdapters) {
                if (repo[sortedAdapter]?.controller) {
                    continue;
                }
                await this.upgradeAdapter(repo, sortedAdapter, forceDowngrade, autoConfirm, true);
            }
        } else {
            console.log('All adapters are up to date');
        }
    }

    /**
     * Checks that local and global deps are fulfilled else rejects promise
     * @param deps local dependencies - required on this host
     * @param globalDeps global dependencies - required on one of the hosts
     */
    private async _checkDependencies(deps: IoPackDependencies, globalDeps: IoPackDependencies): Promise<void> {
        if (!deps && !globalDeps) {
            return Promise.resolve();
        }

        deps = tools.parseDependencies(deps);
        globalDeps = tools.parseDependencies(globalDeps);
        // combine both dependencies
        const allDeps = { ...deps, ...globalDeps };

        // Get all installed adapters
        let objs;
        try {
            objs = await this.objects.getObjectViewAsync(
                'system',
                'instance',
                {
                    startkey: 'system.adapter.',
                    endkey: 'system.adapter.\u9999'
                },
                undefined
            );
        } catch (err) {
            return Promise.reject(err);
        }

        if (objs && objs.rows && objs.rows.length) {
            for (const dName in allDeps) {
                if (dName === 'js-controller') {
                    const version = allDeps[dName];
                    // Check only if version not *, else we dont have to read io-pack unnecessarily
                    if (version !== '*') {
                        const iopkg_ = fs.readJSONSync(`${tools.getControllerDir()}/package.json`);
                        try {
                            if (!semver.satisfies(iopkg_.version, version, { includePrerelease: true })) {
                                return Promise.reject(
                                    new Error(
                                        `Invalid version of "${dName}". Installed "${iopkg_.version}", required "${version}`
                                    )
                                );
                            }
                        } catch (err) {
                            console.log(`Can not check js-controller dependency requirement: ${err.message}`);
                            return Promise.reject(
                                new Error(
                                    `Invalid version of "${dName}". Installed "${iopkg_.version}", required "${version}`
                                )
                            );
                        }
                    }
                } else {
                    let gInstances: ioBroker.GetObjectViewItem<ioBroker.InstanceObject>[] = [];
                    let locInstances: ioBroker.GetObjectViewItem<ioBroker.InstanceObject>[] = [];
                    // if global dep get all instances of adapter
                    if (globalDeps[dName] !== undefined) {
                        gInstances = objs.rows.filter(
                            obj => obj && obj.value && obj.value.common && obj.value.common.name === dName
                        );
                    }
                    if (deps[dName] !== undefined) {
                        // local dep get all instances on same host
                        locInstances = objs.rows.filter(
                            obj =>
                                obj &&
                                obj.value &&
                                obj.value.common &&
                                obj.value.common.name === dName &&
                                obj.value.common.host === this.hostname
                        );
                        if (locInstances.length === 0) {
                            return Promise.reject(new Error(`Required dependency "${dName}" not found on this host.`));
                        }
                    }

                    let isFound = false;
                    // we check, that all instances match - respect different local and global dep versions
                    for (const instance of locInstances) {
                        try {
                            if (
                                // @ts-expect-error InstaceCommon has version: TODO fix types
                                !semver.satisfies(instance.value!.common.version, deps[dName], {
                                    includePrerelease: true
                                })
                            ) {
                                return Promise.reject(
                                    new Error(
                                        `Invalid version of "${dName}". Installed "${
                                            // @ts-expect-error InstaceCommon has version: TODO fix types
                                            instance.value!.common.version
                                        }", required "${deps[dName]}`
                                    )
                                );
                            }
                        } catch (err) {
                            console.log(`Can not check dependency requirement: ${err.message}`);
                            return Promise.reject(
                                new Error(
                                    `Invalid version of "${dName}". Installed "${
                                        // @ts-expect-error InstaceCommon has version: TODO fix types
                                        instance.value!.common.version
                                    }", required "${deps[dName]}`
                                )
                            );
                        }
                        isFound = true;
                    }

                    for (const instance of gInstances) {
                        try {
                            if (
                                // @ts-expect-error InstaceCommon has version: TODO fix types
                                !semver.satisfies(instance.value!.common.version, globalDeps[dName], {
                                    includePrerelease: true
                                })
                            ) {
                                return Promise.reject(
                                    new Error(
                                        `Invalid version of "${dName}". Installed "${
                                            // @ts-expect-error InstaceCommon has version: TODO fix types
                                            instance.value!.common.version
                                        }", required "${globalDeps[dName]}`
                                    )
                                );
                            }
                        } catch (err) {
                            console.log(`Can not check dependency requirement: ${err.message}`);
                            return Promise.reject(
                                new Error(
                                    `Invalid version of "${dName}". Installed "${
                                        // @ts-expect-error InstaceCommon has version: TODO fix types
                                        instance.value!.common.version
                                    }", required "${globalDeps[dName]}`
                                )
                            );
                        }
                        isFound = true;
                    }

                    if (isFound === false) {
                        return Promise.reject(new Error(`Required dependency "${dName}" not found.`));
                    }
                }
            }
        }
    }

    /**
     * Try to async upgrade adapter from given source with some checks
     *
     * @param repoUrl url of the selected repository or parsed repo
     * @param adapter name of the adapter
     * @param forceDowngrade flag to force downgrade
     * @param autoConfirm automatically confirm the tty questions (bypass)
     * @param upgradeAll if true, this is an upgrade all call, we don't do major upgrades if no tty
     */
    async upgradeAdapter(
        repoUrlOrObject: string | Record<string, any>,
        adapter: string,
        forceDowngrade: boolean,
        autoConfirm: boolean,
        upgradeAll: boolean
    ) {
        let sources: Record<string, any>;
        if (!repoUrlOrObject || !tools.isObject(repoUrlOrObject)) {
            try {
                sources = await this.getRepository(repoUrlOrObject, this.params);
            } catch (e) {
                return this.processExit(e);
            }
        } else {
            sources = repoUrlOrObject;
        }

        // TODO: not really adapter object but close enough
        const finishUpgrade = async (name: string, ioPack?: ioBroker.AdapterObject) => {
            if (!ioPack) {
                const adapterDir = tools.getAdapterDir(name);
                try {
                    ioPack = fs.readJSONSync(`${adapterDir}/io-package.json`);
                } catch {
                    console.error(`Cannot find io-package.json in ${adapterDir}`);
                    return this.processExit(EXIT_CODES.MISSING_ADAPTER_FILES);
                }
            }

            // Upload www and admin files of adapter into CouchDB
            await this.upload.uploadAdapter(name, false, true);
            // extend all adapter instance default configs with current config
            // (introduce potentially new attributes while keeping current settings)
            await this.upload.upgradeAdapterObjects(name, ioPack);
            await this.upload.uploadAdapter(name, true, true);
        };

        let version: string;
        if (adapter.includes('@')) {
            const parts = adapter.split('@');
            adapter = parts[0];
            version = parts[1];
        } else {
            version = '';
        }
        if (version) {
            forceDowngrade = true;
        }

        const adapterDir = tools.getAdapterDir(adapter);

        // Read actual description of installed adapter with version
        if (!version && !fs.existsSync(`${adapterDir}/io-package.json`)) {
            return console.log(
                `Adapter "${adapter}"${
                    adapter.length < 15 ? new Array(15 - adapter.length).join(' ') : ''
                } is not installed.`
            );
        }
        // Get the url of io-package.json or direct the version
        if (!sources[adapter]) {
            console.log(`Adapter "${adapter}" is not in the repository and cannot be updated.`);
        }
        if (sources[adapter].controller) {
            return console.log(
                `Cannot update ${adapter} using this command. Please use "iobroker upgrade self" instead!`
            );
        }

        // TODO: not 100 % true but should be correct enough
        let ioInstalled: Partial<ioBroker.AdapterObject>;
        if (fs.existsSync(`${adapterDir}/io-package.json`)) {
            ioInstalled = fs.readJsonSync(`${adapterDir}/io-package.json`);
        } else {
            // @ts-expect-error https://github.com/ioBroker/adapter-core/issues/455
            ioInstalled = { common: { version: '0.0.0' } };
        }

        /**
         * We show changelog (news) and ask user if he really wants to upgrade but only if fd is associated with a tty, returns true if upgrade desired
         * @param installedVersion - installed version of adapter
         * @param targetVersion - target version of adapter
         * @param adapterName - name of the adapter
         * @return {boolean}
         */
        const showUpgradeDialog = (installedVersion: string, targetVersion: string, adapterName: string) => {
            // major upgrade or downgrade
            const isMajor = semver.major(installedVersion) !== semver.major(targetVersion);

            if (autoConfirm || (!tty.isatty(process.stdout.fd) && (!isMajor || !upgradeAll))) {
                // force flag or script on non major or single adapter upgrade -> always upgrade
                return true;
            }

            if (!tty.isatty(process.stdout.fd) && isMajor && upgradeAll) {
                // no tty and not forced and multiple adapters, do not upgrade
                console.log(`Skip major upgrade of ${adapterName} from ${installedVersion} to ${targetVersion}`);
                return false;
            }

            const isUpgrade = semver.gt(targetVersion, installedVersion);
            const isDowngrade = semver.lt(targetVersion, installedVersion);

            // if information in repo files -> show news
            if (sources[adapter] && sources[adapter].news) {
                const news = sources[adapter].news;

                let first = true;
                // check if upgrade or downgrade
                if (isUpgrade) {
                    for (const version in news) {
                        try {
                            if (semver.lte(version, targetVersion) && semver.gt(version, installedVersion)) {
                                if (first === true) {
                                    const noMissingNews = news[targetVersion] && news[installedVersion];
                                    console.log(
                                        `\nThis upgrade of "${adapter}" will ${
                                            noMissingNews ? '' : 'at least '
                                        }introduce the following changes:`
                                    );
                                    console.log(
                                        '=========================================================================='
                                    );
                                    first = false;
                                } else if (first === false) {
                                    console.log();
                                }
                                console.log(`-> ${version}:`);
                                console.log(news[version].en);
                            }
                        } catch {
                            // ignore
                        }
                    }
                } else if (isDowngrade) {
                    for (const version in news) {
                        try {
                            if (semver.gt(version, targetVersion) && semver.lte(version, installedVersion)) {
                                if (first === true) {
                                    const noMissingNews = news[targetVersion] && news[installedVersion];
                                    console.log(
                                        `\nThis downgrade of "${adapter}" will ${
                                            noMissingNews ? '' : 'at least '
                                        }remove the following changes:`
                                    );
                                    console.log(
                                        '=========================================================================='
                                    );
                                    first = false;
                                } else if (first === false) {
                                    console.log();
                                }
                                console.log(`-> ${version}`);
                                console.log(news[version].en);
                            }
                        } catch {
                            // ignore
                        }
                    }
                }
                if (first === false) {
                    console.log('==========================================================================\n');
                }
            }

            let answer;

            // ask user if he really wants to upgrade/downgrade/reinstall - repeat until (y)es or (n)o given
            do {
                if (isUpgrade || isDowngrade) {
                    if (isMajor) {
                        console.log(
                            `BE CAREFUL: THIS IS A MAJOR ${
                                isUpgrade ? 'UPGRADE' : 'DOWNGRADE'
                            }, WHICH WILL MOST LIKELY INTRODUCE BREAKING CHANGES!`
                        );
                    }
                    answer = rl.question(
                        `Would you like to ${isUpgrade ? 'upgrade' : 'downgrade'} ${adapter} from @${
                            ioInstalled.common!.version
                        } to @${version || sources[adapter].version} now? [(y)es, (n)o]: `,
                        {
                            defaultInput: 'n'
                        }
                    );
                } else {
                    answer = rl.question(
                        `Would you like to reinstall version ${
                            version || sources[adapter].version
                        } of ${adapter} now? [(y)es, (n)o]: `,
                        {
                            defaultInput: 'n'
                        }
                    );
                }

                answer = answer.toLowerCase();

                if (answer === 'n' || answer === 'no') {
                    return false;
                }
            } while (answer !== 'y' && answer !== 'yes');
            return true;
        };

        // If version is included in repository
        if (sources[adapter].version) {
            if (!forceDowngrade) {
                try {
                    await this._checkDependencies(sources[adapter].dependencies, sources[adapter].globalDependencies);
                } catch (err) {
                    return console.error(`Cannot check dependencies: ${err.message}`);
                }
            }

            if (
                !forceDowngrade &&
                (sources[adapter].version === ioInstalled.common!.version ||
                    tools.upToDate(sources[adapter].version, ioInstalled.common!.version))
            ) {
                return console.log(
                    `Adapter "${adapter}"${
                        adapter.length < 15 ? new Array(15 - adapter.length).join(' ') : ''
                    } is up to date.`
                );
            } else {
                const targetVersion = version || sources[adapter].version;
                try {
                    if (!showUpgradeDialog(ioInstalled.common!.version, targetVersion, adapter)) {
                        return console.log(`No upgrade of "${adapter}" desired.`);
                    }
                } catch (err) {
                    console.log(`Can not check version information to display upgrade infos: ${err.message}`);
                }
                console.log(`Update ${adapter} from @${ioInstalled.common!.version} to @${targetVersion}`);
                // Get the adapter from web site
                // @ts-expect-error it could also call processExit internally but we want change it in future anyway
                const { packetName, stoppedList } = await this.install.downloadPacket(
                    sources,
                    `${adapter}@${targetVersion}`
                );
                await finishUpgrade(packetName);
                await this.install.enableInstances(stoppedList, true);
            }
        } else if (sources[adapter].meta) {
            // Read repository from url or file
            const ioPack = (await tools.getJsonAsync(sources[adapter].meta)) as ioBroker.AdapterObject;
            if (!ioPack) {
                return console.error(`Cannot parse file${sources[adapter].meta}`);
            }

            if (!forceDowngrade) {
                try {
                    // @ts-expect-error https://github.com/ioBroker/adapter-core/issues/455
                    await this._checkDependencies(ioPack.common.dependencies, ioPack.common.globalDependencies);
                } catch (err) {
                    return console.error(`Cannot check dependencies: ${err.message}`);
                }
            }

            if (
                !version &&
                (ioPack.common.version === ioInstalled.common!.version ||
                    (!forceDowngrade && tools.upToDate(ioPack.common.version, ioInstalled.common!.version)))
            ) {
                console.log(
                    `Adapter "${adapter}"${
                        adapter.length < 15 ? new Array(15 - adapter.length).join(' ') : ''
                    } is up to date.`
                );
            } else {
                // Get the adapter from web site
                const targetVersion = version || ioPack.common.version;
                try {
                    if (!showUpgradeDialog(ioInstalled.common!.version, targetVersion, adapter)) {
                        return console.log(`No upgrade of "${adapter}" desired.`);
                    }
                } catch (err) {
                    console.log(`Can not check version information to display upgrade infos: ${err.message}`);
                }
                console.log(`Update ${adapter} from @${ioInstalled.common!.version} to @${targetVersion}`);
                // @ts-expect-error it could also call processExit internally but we want change it in future anyway
                const { packetName, stoppedList } = await this.install.downloadPacket(
                    sources,
                    `${adapter}@${targetVersion}`
                );
                await finishUpgrade(packetName, ioPack);
                await this.install.enableInstances(stoppedList, true);
            }
        } else {
            if (forceDowngrade) {
                try {
                    if (!showUpgradeDialog(ioInstalled.common!.version, version, adapter)) {
                        return console.log(`No upgrade of "${adapter}" desired.`);
                    }
                } catch (err) {
                    console.log(`Can not check version information to display upgrade infos: ${err.message}`);
                }
                console.warn(`Unable to get version for "${adapter}". Update anyway.`);
                console.log(`Update ${adapter} from @${ioInstalled.common!.version} to @${version}`);
                // Get the adapter from web site
                // @ts-expect-error it could also call processExit internally but we want change it in future anyway
                const { packetName, stoppedList } = await this.install.downloadPacket(sources, `${adapter}@${version}`);
                await finishUpgrade(packetName);
                await this.install.enableInstances(stoppedList, true);
            } else {
                return console.error(`Unable to get version for "${adapter}".`);
            }
        }
    }

    /**
     * Upgrade the js-controller
     *
     * @param repoUrl
     * @param forceDowngrade
     * @param controllerRunning
     */
    async upgradeController(
        repoUrlOrObject: string,
        forceDowngrade: boolean,
        controllerRunning: boolean
    ): Promise<void> {
        let sources: Record<string, any>;
        if (!repoUrlOrObject || !tools.isObject(repoUrlOrObject)) {
            try {
                const result = await this.getRepository(repoUrlOrObject, this.params);
                if (!result) {
                    return console.warn(`Cannot get repository under "${repoUrlOrObject}"`);
                }
                sources = result;
            } catch (err) {
                return this.processExit(err);
            }
        } else {
            sources = repoUrlOrObject;
        }

        const installed = fs.readJSONSync(`${tools.getControllerDir()}/io-package.json`);
        if (!installed || !installed.common || !installed.common.version) {
            return console.error(
                `Host "${this.hostname}"${
                    this.hostname.length < 15 ? ''.padStart(15 - this.hostname.length) : ''
                } is not installed.`
            );
        }
        if (!sources[installed.common.name]) {
            // no info for controller
            return console.error(`Cannot find this controller "${installed.common.name}" in repository.`);
        }

        if (sources[installed.common.name].version) {
            if (
                !forceDowngrade &&
                (sources[installed.common.name].version === installed.common.version ||
                    tools.upToDate(sources[installed.common.name].version, installed.common.version))
            ) {
                console.log(
                    `Host    "${this.hostname}"${
                        this.hostname.length < 15 ? new Array(15 - this.hostname.length).join(' ') : ''
                    } is up to date.`
                );
            } else if (controllerRunning) {
                console.warn(`Controller is running. Please stop ioBroker first.`);
            } else {
                console.log(
                    `Update ${installed.common.name} from @${installed.common.version} to @${
                        sources[installed.common.name].version
                    }`
                );
                // Get the controller from web site
                await this.install.downloadPacket(
                    sources,
                    `${installed.common.name}@${sources[installed.common.name].version}`,
                    { stopDb: true }
                );
            }
        } else {
            const ioPack = await tools.getJsonAsync(sources[installed.common.name].meta);
            if ((!ioPack || !ioPack.common) && !forceDowngrade) {
                return console.warn(
                    `Cannot read version. Write "${tools.appName} upgrade self --force" to upgrade controller anyway.`
                );
            }
            let version = ioPack && ioPack.common ? ioPack.common.version : '';
            if (version) {
                version = `@${version}`;
            }

            if (
                (ioPack && ioPack.common && ioPack.common.version === installed.common.version) ||
                (!forceDowngrade &&
                    ioPack &&
                    ioPack.common &&
                    tools.upToDate(ioPack.common.version, installed.common.version))
            ) {
                console.log(
                    `Host    "${this.hostname}"${
                        this.hostname.length < 15 ? new Array(15 - this.hostname.length).join(' ') : ''
                    } is up to date.`
                );
            } else if (controllerRunning) {
                console.warn(`Controller is running. Please stop ioBroker first.`);
            } else {
                const name = ioPack && ioPack.common && ioPack.common.name ? ioPack.common.name : installed.common.name;
                console.log(`Update ${name} from @${installed.common.version} to ${version}`);
                // Get the controller from web site
                await this.install.downloadPacket(sources, name + version, { stopDb: true });
            }
        }
    }
}
