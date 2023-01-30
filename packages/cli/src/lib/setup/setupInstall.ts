/**
 *      Install adapter
 *
 *      Copyright 2013-2022 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import { tools, EXIT_CODES } from '@iobroker/js-controller-common';
import fs from 'fs-extra';
import path from 'path';
import semver from 'semver';
import child_process from 'child_process';
import axios from 'axios';
import deepClone from 'deep-clone';
import { URL } from 'url';
import { Upload } from './setupUpload';
import { PacketManager } from './setupPacketManager';
import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import type { GetRepositoryHandler, ProcessExitCallback } from '../_Types';

const hostname = tools.getHostName();
const osPlatform = process.platform;

/** Note: this is duplicated in preinstallCheck */
const RECOMMENDED_NPM_VERSION = 8;

export interface CLIInstallOptions {
    params: Record<string, any>;
    getRepository: GetRepositoryHandler;
    states?: StatesRedisClient;
    objects: ObjectsRedisClient;
    processExit: ProcessExitCallback;
}

type Dependencies = string[] | Record<string, string>[] | string | Record<string, string>;

interface DownloadPacketReturnObject {
    stoppedList: ioBroker.InstanceObject[];
    packetName: string;
}

export interface CLIDownloadPacketOptions {
    /** will stop the db before upgrade ONLY use it for controller upgrade */
    stopDb?: boolean;
    /** name of the packet */
    packetName?: string;
    /** if unsafe-perm flag is required */
    unsafePerm?: boolean;
}

interface CreateInstanceOptions {
    instance?: number;
    ignoreIfExists?: boolean;
    // TODO we really need those strings?
    enabled?: boolean | 'true' | 'false';
    host?: string;
    port?: number;
}

export class Install {
    private readonly isRootOnUnix: boolean;
    private readonly objects: ObjectsRedisClient;
    private readonly states: StatesRedisClient;
    private readonly processExit: ProcessExitCallback;
    private readonly getRepository: GetRepositoryHandler;
    private readonly params: Record<string, any>;
    private readonly tarballRegex: RegExp;
    private upload: Upload;
    private packetManager?: PacketManager;

    constructor(options: CLIInstallOptions) {
        this.isRootOnUnix = typeof process.getuid === 'function' && process.getuid() === 0;

        options = options || {};

        if (!options.states) {
            throw new Error('Invalid arguments: states is missing');
        }
        if (!options.objects) {
            throw new Error('Invalid arguments: objects is missing');
        }
        if (!options.processExit) {
            throw new Error('Invalid arguments: processExit is missing');
        }
        if (!options.getRepository) {
            throw new Error('Invalid arguments: getRepository is missing');
        }

        this.objects = options.objects;
        this.states = options.states;
        this.processExit = options.processExit;
        this.getRepository = options.getRepository;
        this.params = options.params || {};

        this.tarballRegex = /\/tarball\/[^/]+$/;

        this.upload = new Upload(options);
    }

    /**
     * Enables or disables given instances
     */
    async enableInstances(instances: ioBroker.InstanceObject[], enabled: boolean): Promise<void> {
        if (instances && instances.length) {
            const ts = Date.now();
            for (const instance of instances) {
                const updatedObj = {
                    common: {
                        enabled
                    },
                    from: `system.host.${tools.getHostName()}.cli`,
                    ts
                };
                console.log(`host.${hostname} Adapter "${instance._id}" is ${enabled ? 'started' : 'stopped.'}`);
                // @ts-expect-error should be fixed with #1917
                await this.objects.extendObjectAsync(instance._id, updatedObj);
            }
        }
    }

    /**
     * Download given packet
     *
     * @param repoUrl
     * @param packetName
     * @param options, { stopDb: true } - will stop the db before upgrade ONLY use it for controller upgrade -
     * db is gone afterwards, does not work with stoppedList
     * @param stoppedList
     */
    async downloadPacket(
        repoUrl: string | undefined | Record<string, any>,
        packetName: string,
        options?: CLIDownloadPacketOptions,
        stoppedList?: ioBroker.InstanceObject[]
    ): Promise<DownloadPacketReturnObject | void> {
        let url;
        if (!options || typeof options !== 'object') {
            options = {};
        }

        stoppedList = stoppedList || [];
        let sources: Record<string, any>;

        if (!repoUrl || !tools.isObject(repoUrl)) {
            try {
                sources = await this.getRepository(repoUrl, this.params);
            } catch (err) {
                return this.processExit(err);
            }
        } else {
            sources = repoUrl;
        }

        if (options.stopDb && stoppedList.length) {
            console.warn('[downloadPacket] stoppedList cannot be used if stopping of databases is requested');
            stoppedList = [];
        }

        const debug = process.argv.includes('--debug');

        let version;
        // check if the adapter has format adapter@1.0.0
        if (packetName.includes('@')) {
            const parts = packetName.split('@');
            packetName = parts[0];
            version = parts[1];
        } else {
            // always take version from repository
            if (sources[packetName]?.version) {
                version = sources[packetName].version;
            } else {
                version = '';
            }
        }
        options.packetName = packetName;

        options.unsafePerm = sources[packetName]?.unsafePerm;

        // Check if flag stopBeforeUpdate is true or on windows we stop because of issue #1436
        if ((sources[packetName]?.stopBeforeUpdate || osPlatform === 'win32') && !stoppedList.length) {
            stoppedList = await this._getInstancesOfAdapter(packetName);
            await this.enableInstances(stoppedList, false);
        }

        // try to extract the information from local sources-dist.json
        if (!sources[packetName]) {
            try {
                const sourcesDist = fs.readJsonSync(`${tools.getControllerDir()}/conf/sources-dist.json`);
                sources[packetName] = sourcesDist[packetName];
            } catch {
                // OK
            }
        }

        if (sources[packetName]) {
            url = sources[packetName].url;

            if (
                url &&
                packetName === 'js-controller' &&
                fs.pathExistsSync(`${tools.getControllerDir()}/../../node_modules/${tools.appName}.js-controller`)
            ) {
                url = null;
            }

            if (!url && packetName !== 'example') {
                if (options.stopDb) {
                    if (this.objects.destroy) {
                        await this.objects.destroy();
                        console.log('Stopped Objects DB');
                    }
                    if (this.states.destroy) {
                        await this.states.destroy();
                        console.log('Stopped States DB');
                    }
                }

                // Install node modules
                await this._npmInstallWithCheck(
                    `${tools.appName.toLowerCase()}.${packetName}${version ? `@${version}` : ''}`,
                    options,
                    debug
                );

                return { packetName, stoppedList };
            } else if (url && url.match(this.tarballRegex)) {
                if (options.stopDb) {
                    if (this.objects.destroy) {
                        await this.objects.destroy();
                        console.log('Stopped Objects DB');
                    }
                    if (this.states.destroy) {
                        await this.states.destroy();
                        console.log('Stopped States DB');
                    }
                }

                // Install node modules
                await this._npmInstallWithCheck(url, options, debug);
                return { packetName, stoppedList };
            } else if (!url) {
                // Adapter
                console.warn(
                    `host.${hostname} Adapter "${packetName}" can be updated only together with ${tools.appName}.js-controller`
                );
                return { packetName, stoppedList };
            }
        }

        console.error(
            `host.${hostname} Unknown packetName ${packetName}. Please install packages from outside the repository using npm!`
        );
        return this.processExit(EXIT_CODES.UNKNOWN_PACKET_NAME);
    }

    /**
     * Install npm module from url
     */
    private async _npmInstallWithCheck(
        npmUrl: string,
        options: CLIDownloadPacketOptions,
        debug: boolean
    ): Promise<void | { installDir: string; _url: string }> {
        // Get npm version
        try {
            let npmVersion;
            try {
                npmVersion = child_process.execSync('npm -v', { encoding: 'utf8' });
                if (npmVersion) {
                    npmVersion = semver.valid(npmVersion.trim());
                }
                console.log(`NPM version: ${npmVersion}`);
            } catch (err) {
                console.error(`Error trying to check npm version: ${err.message}`);
            }

            if (!npmVersion) {
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.error('Aborting install because the npm version could not be checked!');
                console.error('Please check that npm is installed correctly.');
                console.error(
                    `Use "npm install -g npm@${RECOMMENDED_NPM_VERSION}" or "npm install -g npm@latest" to install a supported version.`
                );
                console.error(
                    'You need to make sure to repeat this step after installing an update to NodeJS and/or npm'
                );
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                return this.processExit(EXIT_CODES.INVALID_NPM_VERSION);
            } else if (semver.gte(npmVersion, '5.0.0') && semver.lt(npmVersion, '5.7.1')) {
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.error('NPM 5 is only supported starting with version 5.7.1!');
                console.error(
                    `Please use "npm install -g npm@${RECOMMENDED_NPM_VERSION}" to upgrade npm to ${RECOMMENDED_NPM_VERSION}.x or `
                );
                console.error('use "npm install -g npm@latest" to install a supported version of npm!');
                console.error(
                    'You need to make sure to repeat this step after installing an update to NodeJS and/or npm'
                );
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                return this.processExit(EXIT_CODES.INVALID_NPM_VERSION);
            }
        } catch (err) {
            console.error(`Could not check npm version: ${err.message}`);
            console.error('Assuming that correct version is installed.');
        }

        try {
            return await this._npmInstall(npmUrl, options, debug);
        } catch (err) {
            console.error(`Could not install ${npmUrl}: ${err.message}`);
        }
    }

    private async _npmInstall(npmUrl: string, options: CLIDownloadPacketOptions, debug: boolean) {
        if (typeof options !== 'object') {
            options = {};
        }

        if (this.isRootOnUnix) {
            // If ioBroker or the CLI is executed as root on unix platforms,
            // not providing the --unsafe-perm options means that every pre/postinstall
            // script fails when it uses npm commands.
            options.unsafePerm = true;
        }

        console.log(` Installing ${npmUrl}... (System call)`);

        const result = await tools.installNodeModule(npmUrl, {
            debug: !!debug,
            unsafePerm: !!options.unsafePerm
        });

        if (result.success || result.exitCode === 1) {
            // code 1 is strange error that cannot be explained. Everything is installed but error :(

            // Determine where the packet would be installed if npm succeeds
            // TODO: There's probably a better way to figure this out
            let packetDirName: string;
            if (options.packetName) {
                packetDirName = `${tools.appName.toLowerCase()}.${options.packetName}`;
            } else {
                packetDirName = npmUrl.toLowerCase();
                // If the user installed a git commit-ish, the url contains stuff that doesn't belong in a folder name
                // e.g. iobroker/iobroker.javascript#branch-name
                if (packetDirName.includes('#')) {
                    packetDirName = packetDirName.substr(0, packetDirName.indexOf('#'));
                }
                if (packetDirName.includes('/') && !packetDirName.startsWith('@')) {
                    // only scoped packages (e.g. @types/node ) may have a slash in their path
                    packetDirName = packetDirName.substring(packetDirName.lastIndexOf('/') + 1);
                }
            }
            const installDir = tools.getAdapterDir(packetDirName);

            // inject the installedFrom information in io-package
            if (installDir && fs.existsSync(installDir)) {
                const ioPackPath = path.join(installDir, 'io-package.json');
                let iopack;
                try {
                    iopack = fs.readJSONSync(ioPackPath);
                } catch {
                    iopack = null;
                }
                if (iopack) {
                    iopack.common = iopack.common || {};
                    iopack.common.installedFrom = npmUrl;
                    try {
                        fs.writeFileSync(ioPackPath, JSON.stringify(iopack, null, 2), 'utf8');
                    } catch {
                        // OK
                    }
                }
            } else {
                // TODO: revisit this - this should not happen
                console.error(`host.${hostname} Cannot install ${npmUrl}: ${result.exitCode}`);
                return this.processExit(EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
            }
            // create file that indicates, that npm was called there
            fs.writeFileSync(path.join(installDir, 'iob_npm.done'), ' ');
            // command succeeded
            return { _url: npmUrl, installDir: path.dirname(installDir) };
        } else {
            console.error(`host.${hostname} Cannot install ${npmUrl}: ${result.exitCode}`);
            return this.processExit(EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
        }
    }

    private async _npmUninstall(packageName: string, debug: boolean): Promise<void> {
        const result = await tools.uninstallNodeModule(packageName, { debug: !!debug });
        if (!result.success) {
            throw new Error(`host.${hostname}: Cannot uninstall ${packageName}: ${result.exitCode}`);
        }
    }

    // this command is executed always on THIS host
    private async _checkDependencies(
        adapter: string,
        deps: Dependencies,
        globalDeps: Dependencies,
        _options: Record<string, any>
    ) {
        if (!deps && !globalDeps) {
            return adapter;
        }

        deps = tools.parseDependencies(deps);
        globalDeps = tools.parseDependencies(globalDeps);

        // combine both dependencies
        const allDeps = { ...deps, ...globalDeps };

        // Get all installed adapters
        const objs = await this.objects.getObjectViewAsync('system', 'instance', {
            startkey: 'system.adapter.',
            endkey: 'system.adapter.\u9999'
        });

        if (objs && objs.rows && objs.rows.length) {
            for (const dName in allDeps) {
                let isFound = false;

                if (dName === 'js-controller') {
                    const version = allDeps[dName];
                    // Check only if version not *, else we dont have to read io-pack unnecessarily
                    if (version !== '*') {
                        const packJson = fs.readJSONSync(`${tools.getControllerDir()}/package.json`);
                        if (!semver.satisfies(packJson.version, version, { includePrerelease: true })) {
                            console.error(
                                `host.${hostname} Invalid version of "${dName}". Installed "${packJson.version}", required "${version}"`
                            );
                            return this.processExit(EXIT_CODES.INVALID_DEPENDENCY_VERSION);
                        } else {
                            isFound = true;
                        }
                    } else {
                        isFound = true;
                    }
                }

                if (!isFound) {
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
                                obj.value.common.host === hostname
                        );
                        if (locInstances.length === 0) {
                            console.error(`host.${hostname} Required dependency "${dName}" not found on this host.`);
                        }
                    }

                    // we check, that all existing instances match - respect different versions for local and global deps
                    for (const instance of locInstances) {
                        const instanceVersion = instance.value!.common.version;
                        if (
                            !semver.satisfies(instanceVersion, deps[dName], {
                                includePrerelease: true
                            })
                        ) {
                            console.error(
                                `host.${hostname} Invalid version of "${dName}". Installed "${instanceVersion}", required "${deps[dName]}"`
                            );
                            return this.processExit(EXIT_CODES.INVALID_DEPENDENCY_VERSION);
                        } else {
                            isFound = true;
                        }
                    }

                    for (const instance of gInstances) {
                        const instanceVersion = instance.value!.common.version;
                        if (
                            !semver.satisfies(instanceVersion, globalDeps[dName], {
                                includePrerelease: true
                            })
                        ) {
                            console.error(
                                `host.${hostname} Invalid version of "${dName}". Installed "${instanceVersion}", required "${globalDeps[dName]}"`
                            );
                            return this.processExit(EXIT_CODES.INVALID_DEPENDENCY_VERSION);
                        } else {
                            isFound = true;
                        }
                    }
                }

                // if required dependency not found => install it
                if (!isFound) {
                    await this.createInstance(dName, _options);
                }
            }
        }
    }

    private async _uploadStaticObjects(adapter: string, _adapterConf?: Record<string, any>) {
        let adapterConf: Record<string, any>;
        if (!_adapterConf) {
            const adapterDir = tools.getAdapterDir(adapter);
            if (!adapterDir || !fs.existsSync(path.join(adapterDir, 'io-package.json'))) {
                const message = `Adapter directory "${adapterDir}" does not exists`;
                console.error(`host.${hostname} ${message}`);
                throw new Error(message);
            }
            try {
                adapterConf = await fs.readJSON(path.join(adapterDir, 'io-package.json'));
            } catch (err) {
                const message = `error reading io-package.json: ${err.message}`;
                console.error(`host.${hostname} ${message}`, adapter);
                throw new Error(message);
            }
        } else {
            adapterConf = _adapterConf;
        }

        let objs;
        if (adapterConf.objects && adapterConf.objects.length > 0) {
            objs = adapterConf.objects;
        } else {
            objs = [];
        }

        // check if some dependencies are missing and install them if some found
        await this._checkDependencies(
            adapter,
            adapterConf.common.dependencies,
            adapterConf.common.globalDependencies,
            this.params
        );
        adapterConf.common.installedVersion = adapterConf.common.version;

        if (adapterConf.common.news) {
            delete adapterConf.common.news; // remove this information as it will be taken from repo
        }

        objs.push({
            _id: `system.adapter.${adapterConf.common.name}`,
            type: 'adapter',
            common: adapterConf.common,
            native: adapterConf.native
        });

        if (objs && objs.length) {
            for (let i = 0; i < objs.length; i++) {
                const obj = objs[i];
                obj.from = `system.host.${tools.getHostName()}.cli`;
                obj.ts = Date.now();

                try {
                    await this.objects.extendObjectAsync(obj._id, obj);
                } catch (err) {
                    console.error(`host.${hostname} error setObject ${obj._id} ${err.message}`);
                    return EXIT_CODES.CANNOT_SET_OBJECT;
                }

                console.log(`host.${hostname} object ${obj._id} created/updated`);
            }
        }
    }

    /**
     * Installs given adapter
     */
    async installAdapter(adapter: string, repoUrl?: string, _installCount?: number): Promise<string | void> {
        _installCount = _installCount || 0;
        const fullName = adapter;
        if (adapter.includes('@')) {
            adapter = adapter.split('@')[0];
        }
        const adapterDir = tools.getAdapterDir(adapter);

        console.log(`host.${hostname} install adapter ${fullName}`);

        if (!adapterDir || !fs.existsSync(path.join(adapterDir, 'io-package.json'))) {
            if (_installCount === 2) {
                console.error(`host.${hostname} Cannot install ${adapter}`);
                return this.processExit(EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
            }
            _installCount++;

            // @ts-expect-error TODO needs adaption
            const { stoppedList } = await this.downloadPacket(repoUrl, fullName);
            await this.installAdapter(adapter, repoUrl, _installCount);
            await this.enableInstances(stoppedList, true); // even if unlikely make sure to reenable disabled instances
            return adapter;
        }
        let adapterConf: ioBroker.AdapterObject;
        try {
            adapterConf = fs.readJSONSync(path.join(adapterDir, 'io-package.json'));
        } catch (err) {
            console.error(`host.${hostname} error: reading io-package.json ${err.message}`);
            return this.processExit(EXIT_CODES.INVALID_IO_PACKAGE_JSON);
        }

        // Check if the operation system is ok
        if (adapterConf.common && adapterConf.common.os) {
            if (typeof adapterConf.common.os === 'string' && adapterConf.common.os !== osPlatform) {
                console.error(
                    `host.${hostname} Adapter does not support current os. Required ${adapterConf.common.os}. Actual platform: ${osPlatform}`
                );
                return this.processExit(EXIT_CODES.INVALID_OS);
            } else if (Array.isArray(adapterConf.common.os) && !adapterConf.common.os.includes(osPlatform as any)) {
                console.error(
                    `host.${hostname} Adapter does not support current os. Required one of ${adapterConf.common.os.join(
                        ', '
                    )}. Actual platform: ${osPlatform}`
                );
                return this.processExit(EXIT_CODES.INVALID_OS);
            }
        }

        let engineVersion;
        try {
            // read directly from disk and not via require to allow "on the fly" updates of adapters.
            const p = fs.readJSONSync(path.join(adapterDir, 'package.json'), 'utf8');
            engineVersion = p && p.engines && p.engines.node;
        } catch {
            console.error(`host.${hostname}: Cannot read and parse "${adapterDir}/package.json"`);
        }

        // check node.js version if defined in package.json
        if (engineVersion) {
            if (!semver.satisfies(process.version.replace(/^v/, ''), engineVersion)) {
                console.error(
                    `host.${hostname} Adapter does not support current nodejs version. Required ${engineVersion}. Actual version: ${process.version}`
                );
                return this.processExit(EXIT_CODES.INVALID_NODE_VERSION);
            }
        }

        if (adapterConf.common.osDependencies) {
            // install linux/osx libraries
            await this.installOSPackages(adapterConf.common.osDependencies);
        }

        await this.upload.uploadAdapter(adapter, true, true);
        await this.upload.uploadAdapter(adapter, false, true);
        await this.callInstallOfAdapter(adapter, adapterConf);
        await this._uploadStaticObjects(adapter);
        await this.upload.upgradeAdapterObjects(adapter);
        return adapter;
    }

    async installOSPackages(osDependencies: NonNullable<ioBroker.AdapterCommon['osDependencies']>): Promise<void> {
        if (osPlatform in osDependencies) {
            try {
                this.packetManager = this.packetManager || new PacketManager();
                await this.packetManager.update();
                // @ts-expect-error we have checked that platform is a valid key
                await this.packetManager.install(osDependencies[osPlatform]);
            } catch (err) {
                console.error(`host.${hostname} Could not install required OS packages: ${err.message}`);
            }
        }
    }

    async callInstallOfAdapter(adapter: string, config: Record<string, any>): Promise<string | void> {
        if (config.common.install) {
            // Install node modules
            let cmd = 'node ';

            let fileFullName: string;
            try {
                fileFullName = await tools.resolveAdapterMainFile(adapter);
            } catch {
                return;
            }

            return new Promise(resolve => {
                cmd += `"${fileFullName}" --install`;
                console.log(`host.${hostname} command: ${cmd}`);
                const child = child_process.exec(cmd, { windowsHide: true });
                if (child.stderr) {
                    tools.pipeLinewise(child.stderr, process.stdout);
                }
                child.on('exit', () => resolve(adapter));
            });
        }
    }

    /**
     * Create adapter instance
     */
    async createInstance(adapter: string, options?: CreateInstanceOptions): Promise<void> {
        let ignoreIfExists = false;
        options = options || {};
        options.host = options.host || tools.getHostName();

        if (options.enabled === 'true') {
            options.enabled = true;
        }
        if (options.enabled === 'false') {
            options.enabled = false;
        }

        if (options.ignoreIfExists !== undefined) {
            ignoreIfExists = !!options.ignoreIfExists;
            delete options.ignoreIfExists;
        }

        let doc;
        let err;
        try {
            doc = await this.objects.getObjectAsync(`system.adapter.${adapter}`);
        } catch (_err) {
            err = _err;
        }
        // Adapter is not installed - install it now
        if (err || !doc || !doc.common.installedVersion) {
            await this.installAdapter(adapter);
            doc = await this.objects.getObjectAsync(`system.adapter.${adapter}`);
        }

        if (!doc) {
            console.error('Adapter object not found, cannot create instance');
            return void this.processExit(EXIT_CODES.ADAPTER_NOT_FOUND);
        }

        // Check if some web pages should be uploaded
        await this.upload.uploadAdapter(adapter, true, false);
        await this.upload.uploadAdapter(adapter, false, false);

        const res = await this.objects.getObjectViewAsync('system', 'instance', {
            startkey: `system.adapter.${adapter}.`,
            endkey: `system.adapter.${adapter}.\u9999`
        });
        const systemConfig = await this.objects.getObjectAsync('system.config');
        const defaultLogLevel = systemConfig && systemConfig.common && systemConfig.common.defaultLogLevel;
        if (!res) {
            console.error(`host.${hostname} error: view instanceStats`);
            return this.processExit(EXIT_CODES.CANNOT_READ_INSTANCES);
        }

        // Count started instances
        if (doc.common.singleton && res.rows.length) {
            if (ignoreIfExists) {
                return;
            }
            console.error(`host.${hostname} error: this adapter does not allow multiple instances`);
            return this.processExit(EXIT_CODES.NO_MULTIPLE_INSTANCES_ALLOWED);
        }

        // check singletonHost one on host
        if (doc.common.singletonHost) {
            for (const row of res.rows) {
                if (row.value.common.host === hostname) {
                    if (ignoreIfExists) {
                        return;
                    }
                    console.error(`host.${hostname} error: this adapter does not allow multiple instances on one host`);
                    return this.processExit(EXIT_CODES.NO_MULTIPLE_INSTANCES_ALLOWED_ON_HOST);
                }
            }
        }

        let instance: null | number = null;

        if (options.instance !== undefined) {
            instance = options.instance;
            // find max instance
            if (res.rows.find(obj => parseInt(obj.id.split('.').pop()!, 10) === instance)) {
                console.error(`host.${hostname} error: instance yet exists`);
                return this.processExit(EXIT_CODES.INSTANCE_ALREADY_EXISTS);
            }
        } else {
            // find max instance
            for (const row of res.rows) {
                const iInstance = parseInt(row.id.split('.').pop()!, 10);
                if (instance === null || iInstance > instance) {
                    instance = iInstance;
                }
            }
            if (instance === null) {
                instance = 0;
            } else {
                instance++;
            }
        }

        const instanceObj = deepClone(doc);

        instanceObj._id = `system.adapter.${adapter}.${instance}`;
        // @ts-expect-error we now convert the adapter object to an instance object
        instanceObj.type = 'instance';
        // @ts-expect-error types needed TODO
        if (instanceObj.common.news) {
            // @ts-expect-error types needed TODO
            delete instanceObj.common.news; // remove this information as it could be big, but it will be taken from repo
        }

        instanceObj.common.enabled =
            options.enabled === true || options.enabled === false
                ? options.enabled
                : instanceObj.common.enabled === true || instanceObj.common.enabled === false
                ? instanceObj.common.enabled
                : false;

        // @ts-expect-error we now convert the adapter object to an instance object
        instanceObj.common.host = options.host;

        if (options.port) {
            instanceObj.native = instanceObj.native || {};
            instanceObj.native.port = options.port;
        }

        if (instanceObj.common.dataFolder && instanceObj.common.dataFolder.includes('%INSTANCE%')) {
            instanceObj.common.dataFolder = instanceObj.common.dataFolder.replace(/%INSTANCE%/g, instance.toString());
        }

        if (defaultLogLevel) {
            // @ts-expect-error TODO should it be loglevel or logLevel
            instanceObj.common.loglevel = defaultLogLevel;
            // @ts-expect-error TODO should it be loglevel or logLevel
        } else if (!instanceObj.common.loglevel) {
            // @ts-expect-error TODO should it be loglevel or logLevel looked into my objects -> loglevel
            instanceObj.common.loglevel = 'info';
        }

        console.log(`host.${hostname} create instance ${adapter}`);

        let objs: ioBroker.StateObject[];
        if (!instanceObj.common.onlyWWW && instanceObj.common.mode !== 'once') {
            objs = tools.getInstanceIndicatorObjects(`${adapter}.${instance}`, !!instanceObj.common.wakeup);
        } else {
            objs = [];
        }

        const adapterDir = tools.getAdapterDir(adapter);

        if (!adapterDir) {
            console.error(`host.${hostname} error: reading io-package.json ${err.message}`);
            return this.processExit(EXIT_CODES.INVALID_IO_PACKAGE_JSON);
        }

        if (fs.existsSync(path.join(adapterDir, 'www'))) {
            objs.push({
                _id: `system.adapter.${adapter}.upload`,
                type: 'state',
                common: {
                    name: adapter + '.upload',
                    type: 'number',
                    read: true,
                    write: false,
                    role: 'indicator.state',
                    unit: '%',
                    def: 0,
                    desc: 'Upload process indicator'
                },
                native: {}
            });
        }

        let adapterConf: Record<string, any>;

        try {
            adapterConf = fs.readJSONSync(path.join(adapterDir, 'io-package.json'));
        } catch (err) {
            console.error(`host.${hostname} error: reading io-package.json ${err.message}`);
            return this.processExit(EXIT_CODES.INVALID_IO_PACKAGE_JSON);
        }

        adapterConf.instanceObjects = adapterConf.instanceObjects || [];
        adapterConf.objects = adapterConf.objects || [];

        const defStates: Map<string, ioBroker.SettableState> = new Map();

        // Create only for this instance the predefined in io-package.json objects
        // It is not necessary to write "system.adapter.name.N." in the object '_id'
        for (const instanceObject of adapterConf.instanceObjects) {
            instanceObject._id = `${adapter}.${instance}${instanceObject._id ? `.${instanceObject._id}` : ''}`;

            if (instanceObject.common) {
                if (instanceObject.common.name) {
                    // if name has many languages
                    if (typeof instanceObject.common.name === 'object') {
                        Object.keys(instanceObject.common.name).forEach(
                            lang =>
                                (instanceObject.common.name[lang] = instanceObject.common.name[lang].replace(
                                    '%INSTANCE%',
                                    instance
                                ))
                        );
                    } else {
                        instanceObject.common.name = instanceObject.common.name.replace('%INSTANCE%', instance);
                    }
                }
                if (instanceObject.common.desc) {
                    // if name has many languages
                    if (typeof instanceObject.common.desc === 'object') {
                        Object.keys(instanceObject.common.desc).forEach(
                            lang =>
                                (instanceObject.common.desc[lang] = instanceObject.common.desc[lang].replace(
                                    '%INSTANCE%',
                                    instance
                                ))
                        );
                    } else {
                        instanceObject.common.desc = instanceObject.common.desc.replace('%INSTANCE%', instance);
                    }
                }
            }

            objs.push(instanceObject);
            if (instanceObject.common && instanceObject.common.def !== undefined) {
                defStates.set(instanceObject._id, {
                    val: instanceObject.common.def
                });
            }
        }

        // upload all objects
        for (const obj of objs) {
            try {
                tools.validateGeneralObjectProperties(obj);
            } catch (err) {
                // todo: in the future we will not create this object
                console.warn(`host.${hostname} Object ${obj._id} is invalid: ${err.message}`);
                console.warn(
                    `host.${hostname} This object will not be created in future versions. Please report this to the developer.`
                );
            }

            obj.from = `system.host.${tools.getHostName()}.cli`;
            obj.ts = Date.now();
            try {
                await this.objects.setObjectAsync(obj._id, obj);
                console.log(`host.${hostname} object ${obj._id} created`);
            } catch (err) {
                console.error(`host.${hostname} error: ${err.message}`);
            }
        }

        // sets the default states if any given
        for (const [id, defState] of defStates) {
            defState.ack = true;
            defState.from = `system.host.${tools.getHostName()}.cli`;
            try {
                await this.states.setStateAsync(id, defState);
                console.log(`host.${hostname} Set default value of ${id}: ${defState.val}`);
            } catch (err) {
                console.error(`host.${hostname} error: ${err.message}`);
            }
        }

        instanceObj.from = `system.host.${tools.getHostName()}.cli`;
        instanceObj.ts = Date.now();

        try {
            await this.objects.setObjectAsync(instanceObj._id, instanceObj);
            console.log(`host.${hostname} object ${instanceObj._id} created`);
        } catch (err) {
            console.error(`host.${hostname} error: ${err.message}`);
        }
    }

    /**
     * Enumerate all instances of an adapter
     */
    private async _enumerateAdapterInstances(
        knownObjIDs: string[],
        notDeleted: string[],
        adapter: string,
        instance?: number
    ): Promise<void> {
        if (!notDeleted) {
            notDeleted = [];
        }

        // We need to filter the instances using RegExp, because the naive approach with startkey/endkey
        //   startkey: system.adapter.mqtt
        //   endkey: system.adapter.mqtt.\u9999
        // matches system.adapter.mqtt AND system.adapter.mqtt-client
        const instanceRegex =
            instance !== undefined
                ? new RegExp(`^system\\.adapter\\.${adapter}\\.${instance}$`)
                : new RegExp(`^system\\.adapter\\.${adapter}\\.\\d+$`);

        try {
            const doc = await this.objects.getObjectView('system', 'instance', {
                startkey: `system.adapter.${adapter}${instance !== undefined ? `.${instance}` : ''}`,
                endkey: `system.adapter.${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
            });

            // add non-duplicates to the list (if instance not given -> only for this host)
            const newObjIDs = doc.rows
                // only the ones with an ID ...
                .filter(
                    (
                        row
                    ): row is ioBroker.GetObjectViewItem<ioBroker.InstanceObject> & {
                        value: ioBroker.InstanceObject;
                    } => !!row?.value?._id
                )
                //  ... that matches the pattern
                .filter(row => instanceRegex.test(row.value._id))
                // if instance given also delete from foreign host else only instance on this host
                .filter(row => {
                    if (instance !== undefined || !row.value.common?.host || row.value.common?.host === hostname) {
                        return true;
                    } else {
                        if (!notDeleted.includes(row.value._id)) {
                            notDeleted.push(row.value._id);
                        }
                        return false;
                    }
                })
                .map(row => row.value._id)
                .filter(id => !knownObjIDs.includes(id));

            knownObjIDs.push(...newObjIDs);

            if (newObjIDs.length > 0) {
                console.log(
                    `host.${hostname} Counted ${newObjIDs.length} instances of ${adapter}${
                        instance !== undefined ? `.${instance}` : ''
                    }`
                );
            }
        } catch (err) {
            err !== tools.ERRORS.ERROR_NOT_FOUND &&
                err.message !== tools.ERRORS.ERROR_NOT_FOUND &&
                console.error(`host.${hostname} error: ${err.message}`);
        }
    }

    /**
     * Enumerate all meta objects of an adapter
     */
    async _enumerateAdapterMeta(knownObjIDs: string[], adapter: string, metaFilesToDelete: string[]): Promise<void> {
        try {
            const doc = await this.objects.getObjectViewAsync('system', 'meta', {
                startkey: `${adapter}.`,
                endkey: `${adapter}.\u9999`
            });

            if (doc && doc.rows.length !== 0) {
                const adapterRegex = new RegExp(`^${adapter}\\.`);

                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id))
                    .filter(id => knownObjIDs.indexOf(id) === -1);
                knownObjIDs.push(...newObjs);
                // meta ids can also be present as files
                metaFilesToDelete.push(...newObjs);

                if (newObjs.length) {
                    console.log(`host.${hostname} Counted ${newObjs.length} meta of ${adapter}`);
                }
            }
        } catch (err) {
            err !== tools.ERRORS.ERROR_NOT_FOUND &&
                err.message !== tools.ERRORS.ERROR_NOT_FOUND &&
                console.error(`host.${hostname} error: ${err.message}`);
        }
    }

    private async _enumerateAdapters(
        knownObjIDs: string[],
        adapter: string
    ): Promise<EXIT_CODES.CANNOT_DELETE_NON_DELETABLE | EXIT_CODES.NO_ERROR | void> {
        // This does not really enumerate the adapters, but finds the adapter object
        // if it exists and adds it to the list
        try {
            const obj = await this.objects.getObjectAsync(`system.adapter.${adapter}`);
            if (obj) {
                if (obj.common && obj.common.nondeletable) {
                    // If the adapter is non-deletable, mark it as not installed
                    console.log(
                        `host.${hostname} Adapter ${adapter} cannot be deleted completely, because it is marked non-deletable.`
                    );
                    obj.common.installedVersion = '';
                    obj.from = `system.host.${tools.getHostName()}.cli`;
                    obj.ts = Date.now();
                    await this.objects.setObjectAsync(obj._id, obj);

                    return EXIT_CODES.CANNOT_DELETE_NON_DELETABLE;
                } else {
                    // The adapter is deletable, remember it for deletion
                    knownObjIDs.push(obj._id);
                    console.log(`host.${hostname} Counted 1 adapter for ${adapter}`);

                    return EXIT_CODES.NO_ERROR;
                }
            }
        } catch (err) {
            console.error(`host.${hostname} Cannot enumerate adapters: ${err.message}`);
        }
    }

    /**
     * Enumerates the devices of an adapter (or instance)
     *
     * @param knownObjIDs The already known object ids
     * @param adapter The adapter to enumerate the devices for
     * @param instance The instance to enumerate the devices for (optional)
     */
    private async _enumerateAdapterDevices(knownObjIDs: string[], adapter: string, instance?: number) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}\\.`);

        try {
            const doc = await this.objects.getObjectViewAsync('system', 'device', {
                startkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}`,
                endkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
            });

            if (doc && doc.rows && doc.rows.length) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id))
                    .filter(id => !knownObjIDs.includes(id));

                knownObjIDs.push(...newObjs);
                if (newObjs.length > 0) {
                    console.log(
                        `host.${hostname} Counted ${newObjs.length} devices of ${adapter}${
                            instance !== undefined ? `.${instance}` : ''
                        }`
                    );
                }
            }
        } catch (err) {
            err !== tools.ERRORS.ERROR_NOT_FOUND &&
                err.message !== tools.ERRORS.ERROR_NOT_FOUND &&
                console.error(`host.${hostname} error: ${err.message}`);
        }
    }

    /**
     * Enumerates the channels of an adapter (or instance)
     * @param knownObjIDs The already known object ids
     * @param adapter The adapter to enumerate the channels for
     * @param instance The instance to enumerate the channels for (optional)
     */
    private async _enumerateAdapterChannels(knownObjIDs: string[], adapter: string, instance?: number) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}\\.`);
        try {
            const doc = await this.objects.getObjectViewAsync('system', 'channel', {
                startkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}`,
                endkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
            });

            if (doc && doc.rows && doc.rows.length) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id))
                    .filter(id => !knownObjIDs.includes(id));

                knownObjIDs.push(...newObjs);
                if (newObjs.length > 0) {
                    console.log(
                        `host.${hostname} Counted ${newObjs.length} channels of ${adapter}${
                            instance ? `.${instance}` : ''
                        }`
                    );
                }
            }
        } catch (err) {
            err !== tools.ERRORS.ERROR_NOT_FOUND &&
                err.message !== tools.ERRORS.ERROR_NOT_FOUND &&
                console.error(`host.${hostname} error: ${err.message}`);
        }
    }

    /**
     * Enumerates the states of an adapter (or instance)
     * @param knownObjIDs The already known object ids
     * @param adapter The adapter to enumerate the states for
     * @param instance The instance to enumerate the states for (optional)
     */
    async _enumerateAdapterStateObjects(knownObjIDs: string[], adapter: string, instance?: number): Promise<void> {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}\\.`);
        const sysAdapterRegex = new RegExp(`^system\\.adapter\\.${adapter}${instance ? `\\.${instance}` : ''}\\.`);

        try {
            let doc = await this.objects.getObjectViewAsync('system', 'state', {
                startkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}`,
                endkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
            });

            if (doc && doc.rows && doc.rows.length) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id))
                    .filter(id => !knownObjIDs.includes(id));

                knownObjIDs.push(...newObjs);

                if (newObjs.length > 0) {
                    console.log(
                        `host.${hostname} Counted ${newObjs.length} states of ${adapter}${
                            instance ? `.${instance}` : ''
                        }`
                    );
                }
            }

            doc = await this.objects.getObjectViewAsync('system', 'state', {
                startkey: `system.adapter.${adapter}${instance !== undefined ? `.${instance}` : ''}`,
                endkey: `system.adapter.${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
            });

            if (doc && doc.rows && doc.rows.length) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => sysAdapterRegex.test(id))
                    .filter(id => !knownObjIDs.includes(id));

                knownObjIDs.push(...newObjs);

                if (newObjs.length > 0) {
                    console.log(
                        `host.${hostname} Counted ${newObjs.length} states of system.adapter.${adapter}${
                            instance ? `.${instance}` : ''
                        }`
                    );
                }
            }
        } catch (err) {
            err !== tools.ERRORS.ERROR_NOT_FOUND &&
                err.message !== tools.ERRORS.ERROR_NOT_FOUND &&
                console.error(`host.${hostname} error: ${err.message}`);
        }
    }

    /**
     * Enumerates the docs of an adapter (or instance)
     * @param knownObjIDs The already known object ids
     * @param adapter The adapter to enumerate the states for
     * @param instance The instance to enumerate the states for (optional)
     */
    private async _enumerateAdapterDocs(knownObjIDs: string[], adapter: string, instance?: number) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}\\.`);
        const sysAdapterRegex = new RegExp(`^system\\.adapter\\.${adapter}${instance ? `\\.${instance}` : ''}\\.`);

        try {
            const doc = await this.objects.getObjectListAsync({ include_docs: true });
            if (doc && doc.rows && doc.rows.length) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id) || sysAdapterRegex.test(id))
                    .filter(id => !knownObjIDs.includes(id));

                knownObjIDs.push(...newObjs);
                if (newObjs.length > 0) {
                    console.log(
                        `host.${hostname} Counted ${newObjs.length} objects of ${adapter}${
                            instance ? `.${instance}` : ''
                        }`
                    );
                }
            }
        } catch (err) {
            err !== tools.ERRORS.ERROR_NOT_FOUND &&
                err.message !== tools.ERRORS.ERROR_NOT_FOUND &&
                console.error(`host.${hostname} error: ${err.message}`);
        }
    }

    /**
     * Enumerate all state IDs of an adapter (or instance)
     */
    async _enumerateAdapterStates(knownStateIDs: string[], adapter: string, instance?: number): Promise<void> {
        for (const pattern of [
            `io.${adapter}.${instance ? instance + '.' : ''}*`,
            `messagebox.${adapter}.${instance ? instance + '.' : ''}*`,
            `log.${adapter}.${instance ? instance + '.' : ''}*`,
            `${adapter}.${instance ? instance + '.' : ''}*`,
            `system.adapter.${adapter}.${instance ? instance + '.' : ''}*`
        ]) {
            try {
                const ids = await this.states.getKeys(pattern);
                if (ids && ids.length) {
                    // add non-duplicates to the list
                    const newStates = ids.filter(id => !knownStateIDs.includes(id));

                    knownStateIDs.push(...newStates);

                    if (newStates.length) {
                        console.log(`host.${hostname} Counted ${newStates.length} states (${pattern}) from states`);
                    }
                }
            } catch (err) {
                console.error(`host.${hostname} Cannot get keys async: ${err.message}`);
            }
        }
    }

    /**
     * delete WWW pages, objects and meta files
     */
    private async _deleteAdapterFiles(adapter: string, metaFilesToDelete: string[]): Promise<void> {
        // special files, which are not meta (vis widgets), combined with meta object ids
        const filesToDelete = [
            { id: `vis`, name: `widgets/${adapter}` },
            { id: `vis`, name: `widgets/${adapter}.html` },
            { id: adapter },
            { id: `${adapter}.admin` },
            ...metaFilesToDelete.map(id => ({ id }))
        ];

        for (const file of filesToDelete) {
            const id = typeof file === 'object' ? file.id : file;
            try {
                // @ts-expect-error #1917
                await this.objects.unlinkAsync(id, file.name || '');
                console.log(`host.${hostname} file ${id + (file.name ? `/${file.name}` : '')} deleted`);
            } catch (err) {
                err !== tools.ERRORS.ERROR_NOT_FOUND &&
                    err.message !== tools.ERRORS.ERROR_NOT_FOUND &&
                    console.error(`host.${hostname} Cannot delete ${id} files folder: ${err.message}`);
            }
        }

        for (const objId of [adapter, `${adapter}.admin`]) {
            try {
                await this.objects.delObjectAsync(objId);
                console.log(`host.${hostname} object ${objId} deleted`);
            } catch (err) {
                err !== tools.ERRORS.ERROR_NOT_FOUND &&
                    err.message !== tools.ERRORS.ERROR_NOT_FOUND &&
                    console.error(`host.${hostname} cannot delete objects: ${err.message}`);
            }
        }
    }

    private async _deleteAdapterStates(stateIDs: string[]): Promise<void> {
        if (stateIDs.length > 1000) {
            console.log(`host.${hostname} Deleting ${stateIDs.length} state(s). Be patient...`);
        } else if (stateIDs.length) {
            console.log(`host.${hostname} Deleting ${stateIDs.length} state(s).`);
        }

        while (stateIDs.length > 0) {
            if (stateIDs.length % 200 === 0) {
                // write progress report
                console.log(`host.${hostname}: Only ${stateIDs.length} states left to be deleted.`);
            }
            // try to delete the current state
            try {
                await this.states.delState(stateIDs.pop()!);
            } catch (err) {
                // yep that works!
                err !== tools.ERRORS.ERROR_NOT_FOUND &&
                    err.message !== tools.ERRORS.ERROR_NOT_FOUND &&
                    console.error(`host.${hostname} Cannot delete states: ${err.message}`);
            }
        }
    }

    private async _deleteAdapterObjects(objIDs: string[]): Promise<void> {
        if (objIDs.length > 1000) {
            console.log(`host.${hostname} Deleting ${objIDs.length} object(s). Be patient...`);
        } else if (objIDs.length) {
            console.log(`host.${hostname} Deleting ${objIDs.length} object(s).`);
        }

        let allEnums;

        if (objIDs.length > 1) {
            try {
                // cache all enums, else it will be slow to delete many objects
                allEnums = await tools.getAllEnums(this.objects);
            } catch (e) {
                console.error(`host.${hostname}: Could not retrieve all enums: ${e.message}`);
            }
        }

        while (objIDs.length > 0) {
            if (objIDs.length % 200 === 0) {
                // write progress report
                console.log(`host.${hostname}: Only ${objIDs.length} objects left to be deleted.`);
            }
            // try to delete the current object
            try {
                const id = objIDs.pop()!;
                await this.objects.delObjectAsync(id);
                await tools.removeIdFromAllEnums(this.objects, id, allEnums);
            } catch (e) {
                if (e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND) {
                    console.error(`host.${hostname} cannot delete objects: ${e.message}`);
                }
            }
        }
    }

    /**
     * Deltes given adapter from filesystem and removes all instances
     */
    async deleteAdapter(adapter: string): Promise<EXIT_CODES> {
        const knownObjectIDs: string[] = [];
        const metaFilesToDelete: string[] = [];
        const notDeletedObjectIDs: string[] = [];
        const knownStateIDs: string[] = [];
        let resultCode = EXIT_CODES.NO_ERROR;

        const _uninstallNpm = async () => {
            try {
                // find the adapter's io-package.json
                const adapterNpm = `${tools.appName}.${adapter}`;
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const ioPack = require(`${adapterNpm}/io-package.json`); // yep, it's that easy

                if (!ioPack.common || !ioPack.common.nondeletable) {
                    await this._npmUninstall(adapterNpm, false);
                    // after uninstalling we have to restart the defined adapters
                    if (ioPack.common.restartAdapters) {
                        if (!Array.isArray(ioPack.common.restartAdapters)) {
                            // its not an array, now it can only be a single adapter as string
                            if (typeof ioPack.common.restartAdapters !== 'string') {
                                return;
                            }
                            ioPack.common.restartAdapters = [ioPack.common.restartAdapters];
                        }
                        if (ioPack.common.restartAdapters.length && ioPack.common.restartAdapters[0]) {
                            const instances = await tools.getAllInstances(ioPack.common.restartAdapters, this.objects);
                            if (instances && instances.length) {
                                for (const instance of instances) {
                                    const obj = await this.objects.getObjectAsync(instance);
                                    // if instance is enabled
                                    if (obj && obj.common && obj.common.enabled) {
                                        try {
                                            obj.common.enabled = false; // disable instance
                                            obj.from = `system.host.${tools.getHostName()}.cli`;
                                            obj.ts = Date.now();

                                            await this.objects.setObjectAsync(obj._id, obj);

                                            obj.common.enabled = true; // enable instance

                                            obj.from = `system.host.${tools.getHostName()}.cli`;
                                            obj.ts = Date.now();

                                            await this.objects.setObjectAsync(obj._id, obj);
                                            console.log(`Adapter "${obj._id}" restarted.`);
                                        } catch (err) {
                                            console.error(`Cannot restart adapter "${obj._id}": ${err.message}`);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                console.error(`Error deleting adapter ${adapter} from disk: ${err.message}`);
                console.error(`You might have to delete it yourself!`);
            }
        };

        try {
            // detect if all instances on this host, if not so the www and admin must not be deleted
            await this._enumerateAdapterInstances(knownObjectIDs, notDeletedObjectIDs, adapter);

            if (notDeletedObjectIDs.length) {
                // just delete all instances on this host and then delete npm
                for (const knownObjectID of knownObjectIDs) {
                    await this.deleteInstance(adapter, parseInt(knownObjectID.split('.').pop()!));
                }

                // remove adapter from custom
                await this._removeCustomFromObjects([adapter]);
                await _uninstallNpm();
            } else {
                // we are not allowed to delete last instance if another instance depends on us
                const dependentInstance = await this._hasDependentInstances(adapter);

                if (dependentInstance) {
                    console.log(
                        `Cannot remove adapter "${adapter}", because instance "${dependentInstance}" depends on it!`
                    );
                    return EXIT_CODES.CANNOT_DELETE_DEPENDENCY;
                }

                const instances = knownObjectIDs.map(id => `${adapter}.${id.split('.').pop()}`);
                await this._enumerateAdapterMeta(knownObjectIDs, adapter, metaFilesToDelete);
                resultCode = (await this._enumerateAdapters(knownObjectIDs, adapter)) || resultCode;

                await this._enumerateAdapterDevices(knownObjectIDs, adapter);
                await this._enumerateAdapterChannels(knownObjectIDs, adapter);
                await this._enumerateAdapterStateObjects(knownObjectIDs, adapter);
                await this._enumerateAdapterStates(knownStateIDs, adapter);
                await this._enumerateAdapterDocs(knownObjectIDs, adapter);
                await this._deleteAdapterFiles(adapter, metaFilesToDelete);
                await this._deleteAdapterObjects(knownObjectIDs);
                await this._deleteAdapterStates(knownStateIDs);

                if (this.params.custom) {
                    // remove adapter from custom
                    await this._removeCustomFromObjects([...instances, adapter]);
                }

                await _uninstallNpm();
            }
        } catch (err) {
            console.error(`There was an error uninstalling ${adapter} on ${hostname}: ${err.message}`);
        }

        return resultCode;
    }

    /**
     * Deletes given instance of an adapter
     *
     * @param adapter adapter name like hm-rpc
     * @param instance e.g. 1
     */
    async deleteInstance(adapter: string, instance?: number): Promise<void | EXIT_CODES.CANNOT_DELETE_DEPENDENCY> {
        const knownObjectIDs: string[] = [];
        const knownStateIDs: string[] = [];

        // we are not allowed to delete last instance if another instance depends on us
        const dependentInstance = await this._hasDependentInstances(adapter, instance);

        if (dependentInstance) {
            console.log(
                `Cannot remove instance "${adapter}.${instance}", because instance "${dependentInstance}" depends on it!`
            );
            return EXIT_CODES.CANNOT_DELETE_DEPENDENCY;
        }

        await this._enumerateAdapterInstances(knownObjectIDs, [], adapter, instance);
        await this._enumerateAdapterDevices(knownObjectIDs, adapter, instance);
        await this._enumerateAdapterChannels(knownObjectIDs, adapter, instance);
        await this._enumerateAdapterStateObjects(knownObjectIDs, adapter, instance);
        await this._enumerateAdapterStates(knownStateIDs, adapter, instance);
        await this._enumerateAdapterDocs(knownObjectIDs, adapter, instance);
        await this._deleteAdapterObjects(knownObjectIDs);
        await this._deleteAdapterStates(knownStateIDs);
        if (this.params.custom) {
            // delete instance from custom
            await this._removeCustomFromObjects([`${adapter}.${instance}`]);
        }
        // TODO delete meta objects - I think a recursive deletion of all child object would be less effort.
    }

    /**
     * Removes the custom attribute of the provided adapter/instance
     *
     * @param ids - id of the adapter/instance to check for
     */
    private async _removeCustomFromObjects(ids: string[]): Promise<void> {
        // get all objects which have a custom attribute
        const res = await this.objects.getObjectViewAsync('system', 'custom', {
            startkey: '',
            endkey: '\u9999'
        });

        if (res && res.rows) {
            for (const row of res.rows) {
                let obj;
                for (const id of ids) {
                    if (Object.prototype.hasOwnProperty.call(row.value, id)) {
                        if (!obj) {
                            obj = await this.objects.getObjectAsync(row.id);
                        }

                        if (obj?.common?.custom) {
                            delete obj.common.custom[id];
                        }
                    }
                }

                if (obj) {
                    // if we have removed a custom attribute, set it to db
                    await this.objects.setObjectAsync(row.id, obj);
                }
            }
        }
    }

    /**
     * Installs an adapter from given url
     */
    async installAdapterFromUrl(url: string, name: string): Promise<void> {
        // If the user provided an URL, try to parse it into known ways to represent a Github URL
        let parsedUrl;
        try {
            parsedUrl = new URL(url);
        } catch {
            /* ignore, not a valid URL */
        }

        const debug = process.argv.includes('--debug');

        if (parsedUrl && parsedUrl.hostname === 'github.com') {
            if (!tools.isGithubPathname(parsedUrl.pathname)) {
                return console.error(`Cannot install from GitHub. Invalid URL ${url}`);
            }

            // This is a URL we can parse
            // @ts-expect-error check if type check above is enough
            const { repo, user, commit } = tools.parseGithubPathname(parsedUrl.pathname);

            if (!commit) {
                // No commit given, try to get it from the API
                try {
                    const result = await axios(`http://api.github.com/repos/${user}/${repo}/commits`, {
                        headers: {
                            'User-Agent': 'ioBroker Adapter install',
                            // @ts-expect-error should be okay..
                            validateStatus: status => status === 200
                        }
                    });
                    if (result.data && Array.isArray(result.data) && result.data.length >= 1 && result.data[0].sha) {
                        url = `${user}/${repo}#${result.data[0].sha}`;
                    } else {
                        console.log(
                            `Info: Can not get current GitHub commit, only remember that we installed from GitHub.`
                        );
                        url = `${user}/${repo}`;
                    }
                } catch (err) {
                    console.log(
                        `Info: Can not get current GitHub commit, only remember that we installed from GitHub: ${err.message}`
                    );
                    // Install using the npm GitHub URL syntax `npm i user/repo_name`:
                    url = `${user}/${repo}`;
                }
            } else {
                // We've extracted all we need from the URL
                url = `${user}/${repo}#${commit}`;
            }
        }

        console.log(`install ${url}`);

        // Try to extract name from URL
        if (!name) {
            const reNpmPacket = new RegExp('^' + tools.appName + '\\.([-_\\w\\d]+)(@.*)?$', 'i');
            const match = reNpmPacket.exec(url); // we have iobroker.adaptername@1.2.3
            if (match) {
                name = match[1];
            } else if (url.match(/\.(tgz|gz|zip|tar\.gz)$/)) {
                const parts = url.split('/');
                const last = parts.pop()!;
                const mm = last.match(/\.([-_\w\d]+)-[.\d]+/);
                if (mm) {
                    name = mm[1];
                }
            } else {
                const githubUrlParts = tools.parseShortGithubUrl(url);
                // Try to extract the adapter name from the GitHub url if possible
                // Otherwise fall back to the complete URL
                if (githubUrlParts) {
                    name = githubUrlParts.repo;
                } else {
                    name = url;
                }
                // Remove the leading `iobroker.` from the name
                const reG = new RegExp(tools.appName + '\\.([-_\\w\\d]+)$', 'i');
                const match = reG.exec(name);
                if (match) {
                    name = match[1];
                }
            }
        }

        if (name === 'js-controller') {
            console.error(`Cannot install "js-controller" from url, use "${tools.appName.toLowerCase()} upgrade self"`);
            return;
        }

        const options = {
            packetName: name
        };

        /** list of stopped instances for windows */
        let stoppedList: ioBroker.InstanceObject[] = [];

        if (osPlatform === 'win32') {
            stoppedList = await this._getInstancesOfAdapter(name);
            await this.enableInstances(stoppedList, false);
        }

        const res = await this._npmInstallWithCheck(url, options, debug);
        // if we have no installDir, the method has called processExit itself
        if (!res || !res.installDir) {
            return;
        }

        const { installDir } = res;

        if (name) {
            await this.upload.uploadAdapter(name, true, true);
            await this.upload.uploadAdapter(name, false, true);
            await this.upload.upgradeAdapterObjects(name);
        } else {
            // Try to find io-package.json with the newest date
            const dirs = fs.readdirSync(installDir);
            let date = null;
            let dir = null;
            for (const _dir of dirs) {
                if (fs.existsSync(`${installDir}/${_dir}/io-package.json`)) {
                    const stat = fs.statSync(`${installDir}/${_dir}/io-package.json`);
                    if (!date || stat.mtime.getTime() > date.getTime()) {
                        dir = _dir;
                        date = stat.mtime;
                    }
                }
            }
            // if modify time is not older than one hour
            if (dir && date && Date.now() - date.getTime() < 3600000) {
                name = dir.substring(tools.appName.length + 1);
                await this.upload.uploadAdapter(name, true, true);
                await this.upload.uploadAdapter(name, false, true);
                await this.upload.upgradeAdapterObjects(name);
            }
        }

        // re-enable stopped instances
        await this.enableInstances(stoppedList, true);
    }

    /**
     * Checks if other adapters depend on this adapter
     *
     * @param adapter adapter name
     * @param instance instance, like 1
     * @return if dependent exists returns adapter name
     */
    private async _hasDependentInstances(adapter: string, instance?: number): Promise<void | string> {
        try {
            // lets get all instances
            const doc = await this.objects.getObjectViewAsync('system', 'instance', {
                startkey: 'system.adapter.',
                endkey: 'system.adapter.\u9999'
            });

            if (!doc) {
                console.error(
                    `Could not check dependent instances for "${adapter}", because instances could not be read`
                );
                return;
            }

            let scopedHostname;

            if (instance) {
                // we need to respect host relative to the instance
                [scopedHostname] = doc.rows
                    .filter(row => row.id === `system.adapter.${adapter}.${instance}`)
                    .map(row => row.value.common.host);
            }

            // fallback is this host
            scopedHostname = scopedHostname || hostname;

            for (const row of doc.rows) {
                if (!row.value.common) {
                    // this object seems to be corrupted so it will not need our adapter
                    continue;
                }

                const localDeps = tools.parseDependencies(row.value.common.dependencies);

                for (const localDep of Object.keys(localDeps)) {
                    if (row.value.common.host === scopedHostname && localDep === adapter) {
                        if (!instance) {
                            // this adapter needs us locally and all instances should be deleted
                            return `${row.value.common.name}.${row.id.split('.').pop()}`;
                        } else {
                            // check if other instance of us exists on this host
                            if (this._checkDependencyFulfilledThisHost(adapter, instance, doc.rows, scopedHostname)) {
                                // there are other instances of our adapter - ok
                                break;
                            } else {
                                return `${row.value.common.name}.${row.id.split('.').pop()}`;
                            }
                        }
                    }
                }

                const globalDeps = tools.parseDependencies(row.value.common.globalDependencies);

                for (const globalDep of Object.keys(globalDeps)) {
                    if (globalDep === adapter) {
                        if (!instance) {
                            // all instances on this host should be removed so check if there are some on other hosts
                            if (this._checkDependencyFulfilledForeignHosts(adapter, doc.rows, scopedHostname)) {
                                break;
                            } else {
                                return row.value.common.name;
                            }
                        } else if (
                            this._checkDependencyFulfilledForeignHosts(adapter, doc.rows, scopedHostname) ||
                            this._checkDependencyFulfilledThisHost(adapter, instance, doc.rows, scopedHostname)
                        ) {
                            // another instance of our adapter is on another host or on ours, no need to search further
                            break;
                        } else {
                            return row.value.common.name;
                        }
                    }
                }
            }
        } catch (e) {
            console.error(`Could not check dependent instances for "${adapter}": ${e.message}`);
        }
    }

    /**
     * Checks if adapter can also be found on another host than this
     *
     * @param adapter adapter name
     * @param instancesRows all instances objects view rows
     * @param scopedHostname hostname which should be assumed as local
     * @return true if an instance is present on other host
     */
    private _checkDependencyFulfilledForeignHosts(
        adapter: string,
        instancesRows: ioBroker.GetObjectViewItem<ioBroker.InstanceObject>[],
        scopedHostname: string
    ): boolean {
        for (const row of instancesRows) {
            if (row.value && row.value.common.name === adapter && row.value.common.host !== scopedHostname) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if another instance then the given is present on this host
     *
     * @param adapter adapter name
     * @param instance instance number like 1
     * @param instancesRows all instances objects view rows
     * @param scopedHostname hostname which should be assumed as local
     * @return true if another instance is present on this host
     */
    private _checkDependencyFulfilledThisHost(
        adapter: string,
        instance: number,
        instancesRows: ioBroker.GetObjectViewItem<ioBroker.InstanceObject>[],
        scopedHostname: string
    ): boolean {
        for (const row of instancesRows) {
            if (
                row.value &&
                row.value.common.name === adapter &&
                row.value.common.host === scopedHostname &&
                parseInt(row.value._id.split('.').pop()!) !== instance
            ) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get all instances of an adapter which are on the current host
     */
    private async _getInstancesOfAdapter(adapter: string): Promise<ioBroker.InstanceObject[]> {
        const instances = [];
        const doc = await this.objects.getObjectListAsync({
            startkey: `system.adapter.${adapter}.`,
            endkey: `system.adapter.${adapter}.\u9999`
        });

        if (doc) {
            for (const row of doc.rows) {
                // stop only started instances on this host
                if (row.value.common.enabled && hostname === row.value.common.host) {
                    instances.push(row.value);
                }
            }
        }

        return instances as ioBroker.InstanceObject[];
    }
}
