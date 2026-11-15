import path from 'node:path';
import fs from 'fs-extra';
import semver from 'semver';
import { tools } from '@iobroker/js-controller-common';
import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { isPythonAdapter } from '@/lib/pythonRuntime.js';
import type { InstanceManager, InstanceManagerOptions } from '@/lib/controller/instances/instanceManager.js';

/** Time to collect changes of instance objects before they are looked at, an upgrade writes several of them */
const EVALUATE_DELAY = 2_000;

/** Everything the web extension provider needs to do its work */
export type WebExtensionProviderOptions = Pick<
    InstanceManagerOptions,
    'objects' | 'logger' | 'hostLogPrefix' | 'hostname' | 'isCompactGroupController' | 'state'
> & {
    /** The instances of this host, its install queue installs the code */
    instances: InstanceManager;
};

/** An instance of another host whose web extension a web server of this host loads */
export interface ExtensionOfOtherHost {
    /** id of the instance */
    id: ioBroker.ObjectIDs.Instance;
    /** The host the instance runs on */
    host: string;
    /** The version of the adapter on that host */
    version?: string;
}

/** An adapter of another host whose code a web server of this host needs for its web extension */
export interface NeededExtensionCode {
    /** Name of the adapter, e.g. `frigate` */
    name: string;
    /** The version to install here: the one of the other host, the newest if they differ */
    version?: string;
    /** Where the other host installed the adapter from */
    installedFrom?: string;
    /** The instance on the other host the code is installed for */
    instanceId: ioBroker.ObjectIDs.Instance;
    /** The web servers of this host which load the extension */
    webServers: ioBroker.ObjectIDs.Instance[];
    /** All instances of other hosts whose web extension is loaded here */
    extensions: ExtensionOfOtherHost[];
    /** Whether the adapter has an instance on this host too, which then decides its version here */
    hasInstanceHere: boolean;
}

/** What an adapter is needed for on this host, the answer of the host command `getAdapterUsage` */
export interface AdapterUsage {
    /** Name of the adapter, e.g. `frigate` */
    adapter: string;
    /** The version installed on this host, null if it is not installed */
    installedVersion: string | null;
    /** The instances of the adapter on this host */
    instances: ioBroker.ObjectIDs.Instance[];
    /** The instances of other hosts whose web extension a web server of this host loads */
    webExtensions: ioBroker.ObjectIDs.Instance[];
    /** Whether the package is needed here: false means it can be deleted from this host */
    needed: boolean;
}

/**
 * Puts the code of a web extension on this host when its instance runs on another host.
 *
 * A web server (`common.webExtendable`, i.e. the web adapter) loads every web extension that names it in
 * `native.webInstance` - no matter on which host the instance runs - with a `require` from its own node_modules. An
 * adapter which runs as a daemon on host B and brings a web extension for the web server on host A therefore needs
 * its package on both hosts: the daemon runs on B, the extension inside web on A. Nothing installed it on A so far,
 * and the extension failed to load with "Cannot find module".
 *
 * This host installs such an adapter without an instance, in the version the other host runs, follows the upgrades
 * of the other host and restarts its web servers once the code is there. An adapter which has an instance on this
 * host as well is left alone: its own instance decides its version here.
 */
export class WebExtensionProvider {
    readonly #options: WebExtensionProviderOptions;
    /** All instance objects of all hosts, by id */
    readonly #instanceObjects = new Map<string, ioBroker.InstanceObject>();
    /** Adapters which are being installed right now */
    readonly #installing = new Set<string>();
    /** `name@version` which could not be installed, they are not tried again until the controller restarts */
    readonly #failed = new Set<string>();
    /** Version conflicts which have been warned about, each is reported once */
    readonly #warnedConflicts = new Set<string>();
    /** Timer which collects the changes of instance objects */
    #evaluateTimer: NodeJS.Timeout | null = null;

    /**
     * @param options Everything the provider needs to do its work
     */
    constructor(options: WebExtensionProviderOptions) {
        this.#options = options;
    }

    /**
     * Take all instance objects of all hosts and install what the web servers of this host are missing
     *
     * @param instances All instance objects, not only those of this host
     */
    async setInstances(instances: ioBroker.InstanceObject[]): Promise<void> {
        if (this.#options.isCompactGroupController) {
            // the main controller of this host installs adapters
            return;
        }

        this.#instanceObjects.clear();
        for (const instance of instances) {
            this.#instanceObjects.set(instance._id, instance);
        }

        await this.evaluate();
    }

    /**
     * Note the change of an instance object and look at the web extensions again shortly
     *
     * @param id The id of the changed instance
     * @param obj The changed instance object or null if it has been deleted
     */
    handleObjectChange(id: ioBroker.ObjectIDs.Instance, obj: ioBroker.InstanceObject | null): void {
        if (this.#options.isCompactGroupController) {
            return;
        }

        if (obj?.type === 'instance' && obj.common) {
            this.#instanceObjects.set(id, obj);
        } else {
            this.#instanceObjects.delete(id);
        }

        this.#scheduleEvaluate();
    }

    /**
     * Stop the pending look at the web extensions, e.g. because the controller stops
     */
    stop(): void {
        if (this.#evaluateTimer) {
            clearTimeout(this.#evaluateTimer);
            this.#evaluateTimer = null;
        }
    }

    /**
     * Find the adapters of other hosts whose web extension a web server of this host loads and which have no
     * instance on this host, so only the provider puts their code here
     *
     * @returns one entry per adapter
     */
    getNeededCode(): NeededExtensionCode[] {
        return this.#findExtensionsLoadedHere().filter(entry => !entry.hasInstanceHere);
    }

    /**
     * Tell what an adapter is needed for on this host, e.g. to decide if it can be deleted here
     *
     * The decision whether to delete is left to the caller: admin asks every host after it deleted an adapter on
     * one of them. The CLI deletes on its own host only.
     *
     * @param adapter Name of the adapter, e.g. `frigate`
     */
    async getUsage(adapter: string): Promise<AdapterUsage> {
        const isThisHost = this.#isThisHost();
        const instances = [...this.#instanceObjects.values()]
            .filter(instance => adapterNameOf(instance._id) === adapter && isThisHost(instance.common.host))
            .map(instance => instance._id);
        const loaded = this.#findExtensionsLoadedHere().find(entry => entry.name === adapter);
        const webExtensions = loaded?.extensions.map(extension => extension.id) ?? [];

        return {
            adapter,
            installedVersion: await this.getInstalledVersion(adapter),
            instances,
            webExtensions,
            needed: instances.length > 0 || webExtensions.length > 0,
        };
    }

    /**
     * Find the adapters of other hosts whose web extension a web server of this host loads
     *
     * @returns one entry per adapter
     */
    #findExtensionsLoadedHere(): NeededExtensionCode[] {
        const isThisHost = this.#isThisHost();

        const all = [...this.#instanceObjects.values()];
        const webServers = all.filter(
            instance => instance.common.webExtendable && instance.common.enabled && isThisHost(instance.common.host),
        );
        if (!webServers.length) {
            return [];
        }

        const adaptersOfThisHost = new Set(
            all.filter(instance => isThisHost(instance.common.host)).map(instance => adapterNameOf(instance._id)),
        );

        const loaded = new Map<string, NeededExtensionCode>();

        for (const instance of all) {
            const { common, native } = instance;
            const name = adapterNameOf(instance._id);

            if (
                !common.webExtension ||
                // an instance without a host is taken over by the first host which sees it
                !common.host ||
                isThisHost(common.host) ||
                // a Python adapter cannot be loaded into the Node.js process of a web server
                isPythonAdapter(common)
            ) {
                continue;
            }

            // the same conditions under which the web adapter loads an extension
            const loadedBy = webServers
                .filter(
                    web =>
                        (common.enabled || web.native?.startDisabledExtensions) &&
                        (native?.webInstance === '*' || `${SYSTEM_ADAPTER_PREFIX}${native?.webInstance}` === web._id),
                )
                .map(web => web._id);

            if (!loadedBy.length) {
                continue;
            }

            const version = common.installedVersion || common.version;
            const extension: ExtensionOfOtherHost = { id: instance._id, host: common.host, version };
            const known = loaded.get(name);

            if (!known) {
                loaded.set(name, {
                    name,
                    version,
                    installedFrom: common.installedFrom,
                    instanceId: instance._id,
                    webServers: loadedBy,
                    extensions: [extension],
                    hasInstanceHere: adaptersOfThisHost.has(name),
                });
                continue;
            }

            known.extensions.push(extension);
            for (const web of loadedBy) {
                if (!known.webServers.includes(web)) {
                    known.webServers.push(web);
                }
            }

            // instances on several other hosts with different versions: only one can be installed here, the newest
            if (isNewer(version, known.version)) {
                known.version = version;
                known.installedFrom = common.installedFrom;
                known.instanceId = instance._id;
            }
        }

        return [...loaded.values()];
    }

    /**
     * Create a check whether a host name or address in `common.host` means this host
     */
    #isThisHost(): (host: string | undefined) => boolean {
        const { hostname } = this.#options;
        const ipArr = tools.findIPs();
        return host => !!host && (host === hostname || ipArr.includes(host));
    }

    /**
     * Install the code the web servers of this host are missing or have in another version
     */
    async evaluate(): Promise<void> {
        const { logger, hostLogPrefix, state } = this.#options;

        if (state.isStopping) {
            return;
        }

        for (const loaded of this.#findExtensionsLoadedHere()) {
            const installedVersion = await this.getInstalledVersion(loaded.name);
            this.#warnAboutVersionConflict(loaded, installedVersion);

            if (loaded.hasInstanceHere || this.#installing.has(loaded.name) || this.#failed.has(versionKey(loaded))) {
                continue;
            }

            if (installedVersion && (!loaded.version || installedVersion === loaded.version)) {
                logger.debug(
                    `${hostLogPrefix} web extension of ${loaded.instanceId} is installed here in version ${installedVersion}`,
                );
                continue;
            }

            this.#install(loaded, installedVersion);
        }
    }

    /**
     * Warn once if a web server of this host loads an extension in another version than its instance runs
     *
     * The code of one version is installed here, but the instances whose extension is loaded may run other ones:
     * on several other hosts, or the adapter also has an instance on this host, whose version is the one here.
     * The extension then works with the configuration and the daemon of another version.
     *
     * @param loaded The adapter whose extension is loaded here
     * @param installedVersion The version installed on this host, if any
     */
    #warnAboutVersionConflict(loaded: NeededExtensionCode, installedVersion: string | null): void {
        const { logger, hostLogPrefix } = this.#options;

        const versionHere = loaded.hasInstanceHere ? installedVersion : loaded.version;
        const differing = loaded.extensions.filter(extension => extension.version && extension.version !== versionHere);
        if (!versionHere || !differing.length) {
            return;
        }

        const runs = loaded.extensions
            .map(
                extension =>
                    `${extension.id.substring(SYSTEM_ADAPTER_PREFIX.length)} ${extension.version} on ${extension.host}`,
            )
            .join(', ');
        const conflict = `${loaded.name}@${versionHere}: ${runs}`;
        if (this.#warnedConflicts.has(conflict)) {
            return;
        }
        this.#warnedConflicts.add(conflict);

        logger.warn(
            `${hostLogPrefix} ${loaded.webServers.join(', ')} of this host load${
                loaded.webServers.length === 1 ? 's' : ''
            } the web extension of "${loaded.name}" in version ${versionHere}${
                loaded.hasInstanceHere ? ', which the instance of this host runs' : ''
            }, but its instances run other versions (${runs}). The extension may not work with them - please update "${
                loaded.name
            }" on all hosts to the same version`,
        );
    }

    /**
     * Queue the installation of the code of an adapter
     *
     * @param needed The adapter to install
     * @param installedVersion The version installed on this host so far, if any
     */
    #install(needed: NeededExtensionCode, installedVersion: string | null): void {
        const { logger, hostLogPrefix, instances } = this.#options;

        this.#installing.add(needed.name);

        logger.info(
            `${hostLogPrefix} ${needed.webServers.join(', ')} of this host load${
                needed.webServers.length === 1 ? 's' : ''
            } the web extension of ${needed.instanceId}, which runs on another host: installing "${versionKey(
                needed,
            )}" here${installedVersion ? ` instead of ${installedVersion}` : ''}`,
        );

        instances.installQueue.push({
            id: needed.instanceId,
            version: needed.version,
            installedFrom: needed.installedFrom,
            disabled: true,
            codeOnly: {
                isInstalled: !!installedVersion,
                downloadRetry: 0,
                onDone: () =>
                    this.#onInstalled(needed).catch(e =>
                        logger.error(
                            `${hostLogPrefix} Cannot finish the installation of "${needed.name}": ${e.message}`,
                        ),
                    ),
            },
        });
    }

    /**
     * Check the result of an installation and let the web servers load the extension
     *
     * @param needed The adapter which has been installed
     */
    async #onInstalled(needed: NeededExtensionCode): Promise<void> {
        const { logger, hostLogPrefix, objects, instances } = this.#options;

        this.#installing.delete(needed.name);

        const installedVersion = await this.getInstalledVersion(needed.name);
        if (!installedVersion || (needed.version && installedVersion !== needed.version)) {
            this.#failed.add(versionKey(needed));
            logger.error(
                `${hostLogPrefix} Could not install "${versionKey(needed)}" on this host, the web extension of ${
                    needed.instanceId
                } will not work in ${needed.webServers.join(', ')}. To retry it restart this host.`,
            );
            return;
        }

        // A web server restarts itself when the extension instance changes, which happens when the other host
        // upgrades - before the new code is here. Restart it again now that the code is complete.
        for (const id of needed.webServers) {
            if (!instances.procs[id]?.config?.common?.enabled) {
                continue;
            }
            logger.info(`${hostLogPrefix} restart ${id} to load the web extension "${versionKey(needed)}"`);
            // a restart signal via object change also reaches an instance in a compact group process
            await objects.extendObject(id, {});
        }

        // instance objects which changed during the installation
        this.#scheduleEvaluate();
    }

    /**
     * Look at the web extensions again once the changes of instance objects have settled
     */
    #scheduleEvaluate(): void {
        const { logger, hostLogPrefix } = this.#options;

        this.stop();
        this.#evaluateTimer = setTimeout(() => {
            this.#evaluateTimer = null;
            this.evaluate().catch(e =>
                logger.error(`${hostLogPrefix} Cannot check the web extensions of other hosts: ${e.message}`),
            );
        }, EVALUATE_DELAY);
    }

    /**
     * Get the version of an adapter installed on this host
     *
     * @param name Name of the adapter
     * @returns null if it is not installed
     */
    async getInstalledVersion(name: string): Promise<string | null> {
        const adapterDir = tools.getAdapterDir(name);
        if (!adapterDir) {
            return null;
        }

        try {
            const packageJson = await fs.readJSON(path.join(adapterDir, 'package.json'));
            return typeof packageJson.version === 'string' ? packageJson.version : null;
        } catch {
            return null;
        }
    }
}

/**
 * Get the name of the adapter from the id of an instance
 *
 * @param id id of the instance, e.g. `system.adapter.frigate.0`
 */
function adapterNameOf(id: string): string {
    return id.split('.')[2];
}

/**
 * The name of an adapter together with its version, as it is installed
 *
 * @param needed The adapter
 */
function versionKey(needed: NeededExtensionCode): string {
    return needed.version ? `${needed.name}@${needed.version}` : needed.name;
}

/**
 * Whether a version is newer than another one, versions which cannot be compared are never newer
 *
 * @param version The version to check
 * @param than The version to compare with
 */
function isNewer(version: string | undefined, than: string | undefined): boolean {
    if (!version) {
        return false;
    }
    if (!than) {
        return true;
    }
    return !!semver.valid(version) && !!semver.valid(than) && semver.gt(version, than);
}
