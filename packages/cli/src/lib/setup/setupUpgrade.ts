import Debug from 'debug';
import fs from 'fs-extra';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';
import semver from 'semver';
import { Upload } from '@/lib/setup/setupUpload.js';
import { Install } from '@/lib/setup/setupInstall.js';
import rl from 'readline-sync';
import tty from 'node:tty';
import path from 'node:path';
import { getRepository, isVersionIgnored } from '@/lib/setup/utils.js';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { ProcessExitCallback } from '@/lib/_Types.js';
import { IoBrokerError } from '@/lib/setup/customError.js';

const debug = Debug('iobroker:cli');

type IoPackDependencies = string[] | Record<string, any>[] | Record<string, any>;

interface CLIUpgradeOptions {
    processExit: ProcessExitCallback;
    objects: ObjectsInRedisClient;
    states: StatesInRedisClient;
    params: Record<string, any>;
}

export class Upgrade {
    private readonly hostname = tools.getHostName();
    private readonly upload: Upload;
    private readonly install: Install;
    private readonly objects: ObjectsInRedisClient;
    private readonly processExit: ProcessExitCallback;

    constructor(options: CLIUpgradeOptions) {
        options = options || {};

        if (!options.processExit) {
            throw new Error('Invalid arguments: processExit is missing');
        }

        this.processExit = options.processExit;
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
        autoConfirm: boolean,
    ): Promise<void> {
        const relevantAdapters = [];
        // check which adapters are upgradeable and sort them according to their dependencies
        for (const adapter of list) {
            if (repo[adapter].controller) {
                // skip controller
                continue;
            }
            const adapterDir = tools.getAdapterDir(adapter);
            if (adapterDir && fs.existsSync(path.join(adapterDir, 'io-package.json'))) {
                const ioInstalled = fs.readJsonSync(path.join(adapterDir, 'io-package.json'));
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
                // create an ordered list for upgrades
                for (let i = relevantAdapters.length - 1; i >= 0; i--) {
                    const relAdapter = relevantAdapters[i];
                    // if a new version has no dependencies, we can upgrade
                    if (!repo[relAdapter].dependencies && !repo[relAdapter].globalDependencies) {
                        // no deps, simply add it
                        sortedAdapters.push(relAdapter);
                        relevantAdapters.splice(relevantAdapters.indexOf(relAdapter), 1);
                        oneAdapterAdded = true;
                    } else {
                        const allDeps: Record<string, string> = {
                            ...tools.parseDependencies(repo[relAdapter].dependencies),
                            ...tools.parseDependencies(repo[relAdapter].globalDependencies),
                        };

                        // we have to check if the deps are there
                        let conflict = false;
                        for (const [depName, version] of Object.entries(allDeps)) {
                            debug(`adapter "${relAdapter}" has dependency "${depName}": "${version}"`);
                            if (version !== '*') {
                                // dependency is important because it affects the version range
                                if (relevantAdapters.includes(depName)) {
                                    // the dependency is also in the upgrade list and not previously added, we should add the dependency first
                                    debug(`conflict for dependency "${depName}" at adapter "${relAdapter}"`);
                                    conflict = true;
                                    break;
                                }
                            }
                        }
                        // we reached here and no conflict, so every dep is satisfied
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
     *
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
        const objs = await this.objects.getObjectViewAsync(
            'system',
            'instance',
            {
                startkey: 'system.adapter.',
                endkey: 'system.adapter.\u9999',
            },
            undefined,
        );

        if (objs?.rows?.length) {
            for (const dName in allDeps) {
                if (dName === 'js-controller') {
                    const version = allDeps[dName];
                    // Check only if version not *, else we don't have to read io-pack unnecessarily
                    if (version !== '*') {
                        const iopkg_ = fs.readJSONSync(`${tools.getControllerDir()}/package.json`);
                        try {
                            if (!semver.satisfies(iopkg_.version, version, { includePrerelease: true })) {
                                return Promise.reject(
                                    new Error(
                                        `Invalid version of "${dName}". Installed "${iopkg_.version}", required "${version}`,
                                    ),
                                );
                            }
                        } catch (e) {
                            console.log(`Can not check js-controller dependency requirement: ${e.message}`);
                            return Promise.reject(
                                new Error(
                                    `Invalid version of "${dName}". Installed "${iopkg_.version}", required "${version}`,
                                ),
                            );
                        }
                    }
                } else {
                    let gInstances: ioBroker.GetObjectViewItem<ioBroker.InstanceObject>[] = [];
                    let locInstances: ioBroker.GetObjectViewItem<ioBroker.InstanceObject>[] = [];
                    // if global dep get all instances of adapter
                    if (globalDeps[dName] !== undefined) {
                        gInstances = objs.rows.filter(obj => obj.value.common && obj.value.common.name === dName);
                    }
                    if (deps[dName] !== undefined) {
                        // local dependencies: get all instances on the same host
                        locInstances = objs.rows.filter(
                            obj =>
                                obj.value.common &&
                                obj.value.common.name === dName &&
                                obj.value.common.host === this.hostname,
                        );
                        if (locInstances.length === 0) {
                            return Promise.reject(new Error(`Required dependency "${dName}" not found on this host.`));
                        }
                    }

                    let isFound = false;
                    // we check that all instances match - respect different local and global dep versions
                    for (const instance of locInstances) {
                        const instanceVersion = instance.value.common.version;
                        try {
                            if (
                                !semver.satisfies(instanceVersion, deps[dName], {
                                    includePrerelease: true,
                                })
                            ) {
                                return Promise.reject(
                                    new Error(
                                        `Invalid version of "${dName}". Installed "${instanceVersion}", required "${deps[dName]}`,
                                    ),
                                );
                            }
                        } catch (e) {
                            console.log(`Can not check dependency requirement: ${e.message}`);
                            return Promise.reject(
                                new Error(
                                    `Invalid version of "${dName}". Installed "${instanceVersion}", required "${deps[dName]}`,
                                ),
                            );
                        }
                        isFound = true;
                    }

                    for (const instance of gInstances) {
                        const instanceVersion = instance.value.common.version;
                        try {
                            if (
                                !semver.satisfies(instanceVersion, globalDeps[dName], {
                                    includePrerelease: true,
                                })
                            ) {
                                return Promise.reject(
                                    new Error(
                                        `Invalid version of "${dName}". Installed "${instanceVersion}", required "${globalDeps[dName]}`,
                                    ),
                                );
                            }
                        } catch (e) {
                            console.log(`Can not check dependency requirement: ${e.message}`);
                            return Promise.reject(
                                new Error(
                                    `Invalid version of "${dName}". Installed "${instanceVersion}", required "${globalDeps[dName]}`,
                                ),
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
     * Try to async upgrade adapter from a given source with some checks
     *
     * @param repoUrlOrObject url of the selected repository or parsed repo, if undefined, use current active repository
     * @param adapter name of the adapter (can also include version like web@3.0.0)
     * @param forceDowngrade flag to force downgrade
     * @param autoConfirm automatically confirm the tty questions (bypass)
     * @param upgradeAll if true, this is an upgrade all call, we don't do major upgrades if no tty
     */
    async upgradeAdapter(
        repoUrlOrObject: string | Record<string, any> | undefined,
        adapter: string,
        forceDowngrade: boolean,
        autoConfirm: boolean,
        upgradeAll: boolean,
    ): Promise<void> {
        let sources: Record<string, any>;
        if (!repoUrlOrObject || !tools.isObject(repoUrlOrObject)) {
            try {
                sources = await getRepository({ repoName: repoUrlOrObject, objects: this.objects });
            } catch (e) {
                console.error(e.message);
                return this.processExit(e instanceof IoBrokerError ? e.code : e);
            }
        } else {
            sources = repoUrlOrObject;
        }

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

        /** Repository entry of this adapter */
        const repoAdapter: Record<string, any> = sources[adapter];

        // TODO: not really adapter object but close enough
        const finishUpgrade = async (name: string, ioPack?: ioBroker.AdapterObject): Promise<void> => {
            if (!ioPack) {
                const adapterDir = tools.getAdapterDir(name);

                if (!adapterDir) {
                    console.error(`Cannot find io-package.json in ${adapterDir}`);
                    return this.processExit(EXIT_CODES.MISSING_ADAPTER_FILES);
                }

                try {
                    // close enough to an AdapterObject
                    ioPack = fs.readJSONSync(path.join(adapterDir, 'io-package.json')) as ioBroker.AdapterObject;
                } catch {
                    console.error(`Cannot find io-package.json in ${adapterDir}`);
                    return this.processExit(EXIT_CODES.MISSING_ADAPTER_FILES);
                }
            }

            if (ioPack.common.osDependencies) {
                // install linux/osx libraries
                await this.install.installOSPackages(ioPack.common.osDependencies);
            }

            // Upload www and admin files of adapter
            await this.upload.uploadAdapter(name, false, true);
            // extend all adapter instance default configs with current config
            // (introduce potentially new attributes while keeping current settings)
            await this.upload.upgradeAdapterObjects(name, ioPack);
            await this.upload.uploadAdapter(name, true, true);
        };

        const adapterDir = tools.getAdapterDir(adapter);

        // Read the actual description of installed adapter with a version
        if (!adapterDir || (!version && !fs.existsSync(path.join(adapterDir, 'io-package.json')))) {
            return console.log(
                `Adapter "${adapter}"${
                    adapter.length < 15 ? new Array(15 - adapter.length).join(' ') : ''
                } is not installed.`,
            );
        }
        // Get the url of io-package.json or direct the version
        if (!repoAdapter) {
            console.log(`Adapter "${adapter}" is not in the repository and cannot be updated.`);
            return this.processExit(EXIT_CODES.ADAPTER_NOT_FOUND);
        }
        if (repoAdapter.controller) {
            return console.log(
                `Cannot update ${adapter} using this command. Please use "iobroker upgrade self" instead!`,
            );
        }

        // TODO: not 100 % true but should be correct enough
        let ioInstalled: Pick<ioBroker.AdapterObject, 'common'>;
        if (adapterDir && fs.existsSync(path.join(adapterDir, 'io-package.json'))) {
            ioInstalled = fs.readJsonSync(`${adapterDir}/io-package.json`);
        } else {
            // @ts-expect-error https://github.com/ioBroker/adapter-core/issues/455
            ioInstalled = { common: { version: '0.0.0' } };
        }

        const installedVersion = ioInstalled.common.version;

        /**
         * We show changelog (news) and ask user if he really wants to upgrade but only if fd is associated with a tty, returns true if upgrade desired
         *
         * @param installedVersion - installed version of adapter
         * @param targetVersion - target version of adapter
         * @param adapterName - name of the adapter
         */
        const showUpgradeDialog = (installedVersion: string, targetVersion: string, adapterName: string): boolean => {
            // major upgrade or downgrade
            const isMajor = semver.major(installedVersion) !== semver.major(targetVersion);

            if (autoConfirm || (!tty.isatty(process.stdout.fd) && (!isMajor || !upgradeAll))) {
                // force flag or script on non-major or single adapter upgrade -> always upgrade
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
            if (repoAdapter?.news) {
                const news = repoAdapter.news;

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
                                        }introduce the following changes:`,
                                    );
                                    console.log(
                                        '==========================================================================',
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
                                        }remove the following changes:`,
                                    );
                                    console.log(
                                        '==========================================================================',
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
                            }, WHICH WILL MOST LIKELY INTRODUCE BREAKING CHANGES!`,
                        );
                    }
                    answer = rl.question(
                        `Would you like to ${
                            isUpgrade ? 'upgrade' : 'downgrade'
                        } ${adapter} from @${installedVersion} to @${
                            version || repoAdapter.version
                        } now? [(y)es, (n)o]: `,
                        {
                            defaultInput: 'n',
                        },
                    );
                } else {
                    answer = rl.question(
                        `Would you like to reinstall version ${
                            version || repoAdapter.version
                        } of ${adapter} now? [(y)es, (n)o]: `,
                        {
                            defaultInput: 'n',
                        },
                    );
                }

                answer = answer.toLowerCase();

                if (answer === 'n' || answer === 'no') {
                    return false;
                }
            } while (answer !== 'y' && answer !== 'yes');
            return true;
        };

        // If a version is included in the repository
        if (repoAdapter.version) {
            if (!forceDowngrade) {
                try {
                    await this._checkDependencies(repoAdapter.dependencies, repoAdapter.globalDependencies);
                } catch (e) {
                    return console.error(`Cannot check dependencies: ${e.message}`);
                }
            }

            if (
                !forceDowngrade &&
                (repoAdapter.version === installedVersion || tools.upToDate(repoAdapter.version, installedVersion))
            ) {
                return console.log(
                    `Adapter "${adapter}"${
                        adapter.length < 15 ? new Array(15 - adapter.length).join(' ') : ''
                    } is up to date.`,
                );
            }
            const targetVersion = version || repoAdapter.version;

            const isIgnored = await isVersionIgnored({
                adapterName: adapter,
                version: targetVersion,
                objects: this.objects,
            });

            if (isIgnored) {
                console.log(
                    `No upgrade of "${adapter}" desired, because version "${targetVersion}" is configured to be ignored by the user. Run "${tools.appNameLowerCase} version ${adapter} --recognize" to allow this upgrade!`,
                );
                return;
            }

            try {
                if (!showUpgradeDialog(installedVersion, targetVersion, adapter)) {
                    console.log(`No upgrade of "${adapter}" desired.`);
                    return;
                }
            } catch (e) {
                console.log(`Can not check version information to display upgrade infos: ${e.message}`);
            }
            console.log(`Update ${adapter} from @${installedVersion} to @${targetVersion}`);
            const npmPacketName = `${tools.appNameLowerCase}.${adapter}`;

            try {
                if (!semver.diff(installedVersion, targetVersion)) {
                    console.log(`Uninstall npm packet "${npmPacketName}" for a clean re-installation`);
                    await tools.uninstallNodeModule(npmPacketName, { debug: process.argv.includes('--debug') });
                }
            } catch (e) {
                console.warn(`Could not uninstall npm packet "${npmPacketName}": ${e.message}`);
            }

            // Get the adapter from website
            const { packetName, stoppedList } = await this.install.downloadPacket(
                sources,
                `${adapter}@${targetVersion}`,
            );
            await finishUpgrade(packetName);
            await this.install.enableInstances(stoppedList, true);
        } else if (repoAdapter.meta) {
            // Read repository from url or file
            const ioPack = (await tools.getJsonAsync(repoAdapter.meta)) as ioBroker.AdapterObject;
            if (!ioPack) {
                console.error(`Cannot parse file${repoAdapter.meta}`);
                return;
            }

            if (!forceDowngrade) {
                try {
                    // @ts-expect-error https://github.com/ioBroker/adapter-core/issues/455
                    await this._checkDependencies(ioPack.common.dependencies, ioPack.common.globalDependencies);
                } catch (e) {
                    console.error(`Cannot check dependencies: ${e.message}`);
                    return;
                }
            }

            if (
                !version &&
                (ioPack.common.version === installedVersion ||
                    (!forceDowngrade && tools.upToDate(ioPack.common.version, installedVersion)))
            ) {
                console.log(
                    `Adapter "${adapter}"${
                        adapter.length < 15 ? new Array(15 - adapter.length).join(' ') : ''
                    } is up to date.`,
                );
            } else {
                // Get the adapter from website
                const targetVersion = version || ioPack.common.version;

                const isIgnored = await isVersionIgnored({
                    adapterName: adapter,
                    version: targetVersion,
                    objects: this.objects,
                });

                if (isIgnored) {
                    console.log(
                        `No upgrade of "${adapter}" desired, because version "${targetVersion}" is configured to be ignored by the user. Run "${tools.appNameLowerCase} version ${adapter} --recognize" to allow this upgrade!`,
                    );
                    return;
                }

                try {
                    if (!showUpgradeDialog(installedVersion, targetVersion, adapter)) {
                        console.log(`No upgrade of "${adapter}" desired.`);
                        return;
                    }
                } catch (e) {
                    console.log(`Can not check version information to display upgrade infos: ${e.message}`);
                }
                console.log(`Update ${adapter} from @${installedVersion} to @${targetVersion}`);
                const { packetName, stoppedList } = await this.install.downloadPacket(
                    sources,
                    `${adapter}@${targetVersion}`,
                );
                await finishUpgrade(packetName, ioPack);
                await this.install.enableInstances(stoppedList, true);
            }
        } else if (forceDowngrade) {
            try {
                if (!showUpgradeDialog(installedVersion, version, adapter)) {
                    return console.log(`No upgrade of "${adapter}" desired.`);
                }
            } catch (e) {
                console.log(`Can not check version information to display upgrade infos: ${e.message}`);
            }
            console.warn(`Unable to get version for "${adapter}". Update anyway.`);
            console.log(`Update ${adapter} from @${installedVersion} to @${version}`);
            // Get the adapter from website
            const { packetName, stoppedList } = await this.install.downloadPacket(sources, `${adapter}@${version}`);
            await finishUpgrade(packetName);
            await this.install.enableInstances(stoppedList, true);
        } else {
            return console.error(`Unable to get version for "${adapter}".`);
        }
    }

    /**
     * Upgrade the js-controller
     *
     * @param repoUrl the repo or url
     * @param forceDowngrade if downgrades are allowed
     * @param controllerRunning if controller is currently running
     */
    async upgradeController(repoUrl: string, forceDowngrade: boolean, controllerRunning: boolean): Promise<void> {
        let sources: Record<string, any>;

        try {
            const result = await getRepository({ repoName: repoUrl, objects: this.objects });
            if (!result) {
                return console.warn(`Cannot get repository under "${repoUrl}"`);
            }
            sources = result;
        } catch (e) {
            console.error(e.message);
            return this.processExit(e instanceof IoBrokerError ? e.code : e);
        }

        const installed = fs.readJSONSync(`${tools.getControllerDir()}/io-package.json`);
        if (!installed || !installed.common || !installed.common.version) {
            return console.error(
                `Host "${this.hostname}"${
                    this.hostname.length < 15 ? ''.padStart(15 - this.hostname.length) : ''
                } is not installed.`,
            );
        }

        const controllerName = installed.common.name;
        /** Repository entry of the controller */
        const repoController = sources[controllerName];

        if (!repoController) {
            // no info for controller
            return console.error(`Cannot find this controller "${controllerName}" in repository.`);
        }

        if (repoController.version) {
            if (
                !forceDowngrade &&
                (repoController.version === installed.common.version ||
                    tools.upToDate(repoController.version, installed.common.version))
            ) {
                console.log(
                    `Host    "${this.hostname}"${
                        this.hostname.length < 15 ? new Array(15 - this.hostname.length).join(' ') : ''
                    } is up to date.`,
                );
            } else if (controllerRunning) {
                console.warn(`Controller is running. Please stop ioBroker first.`);
            } else {
                console.log(`Update ${controllerName} from @${installed.common.version} to @${repoController.version}`);
                // Get the controller from website
                await this.install.downloadPacket(sources, `${controllerName}@${repoController.version}`, {
                    stopDb: true,
                });
            }
        } else {
            const ioPack = await tools.getJsonAsync(repoController.meta);
            if ((!ioPack || !ioPack.common) && !forceDowngrade) {
                return console.warn(
                    `Cannot read version. Write "${tools.appName} upgrade self --force" to upgrade controller anyway.`,
                );
            }
            let version = ioPack?.common ? ioPack.common.version : '';
            if (version) {
                version = `@${version}`;
            }

            if (
                (ioPack?.common && ioPack.common.version === installed.common.version) ||
                (!forceDowngrade && ioPack?.common && tools.upToDate(ioPack.common.version, installed.common.version))
            ) {
                console.log(
                    `Host    "${this.hostname}"${
                        this.hostname.length < 15 ? new Array(15 - this.hostname.length).join(' ') : ''
                    } is up to date.`,
                );
            } else if (controllerRunning) {
                console.warn(`Controller is running. Please stop ioBroker first.`);
            } else {
                const name = ioPack?.common?.name || controllerName;
                console.log(`Update ${name} from @${installed.common.version} to ${version}`);
                // Get the controller from website
                await this.install.downloadPacket(sources, name + version, { stopDb: true });
            }
        }
    }
}
