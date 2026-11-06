import semver from 'semver';
import { tools } from '@iobroker/js-controller-common';
import { HIGHEST_UNICODE_SYMBOL, SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { ControllerLogger, Dependencies } from '@/lib/controller/types.js';

/**
 * Thrown by `checkVersion` if no instance of the required adapter exists
 */
class AdapterNotFoundError extends Error {
    /** Name of the required adapter */
    readonly adapter: string;

    /**
     * @param adapter name of the required adapter
     */
    constructor(adapter: string) {
        super(`required adapter "${adapter}" not found!`);
        this.adapter = adapter;
    }
}

/**
 * Thrown by `checkVersion` if the required adapter or js-controller has a version outside the required range
 */
class AdapterVersionMismatchError extends Error {
    /** Host of the instance with the wrong version, not set for a js-controller dependency */
    readonly host?: string;

    /**
     * @param message the error message
     * @param host host of the instance with the wrong version
     */
    constructor(message: string, host?: string) {
        super(message);
        this.host = host;
    }
}

/**
 * Checks if at least one of the instances of given name satisfies the version
 *
 * @param name - name of the dependency
 * @param version - version requirement, e.g. ">=3.3.0"
 * @param instances - object of instances and their corresponding instance objects
 * @param controllerVersion - the version of the running js-controller
 * @throws {Error} if the required adapter version is not satisfied or the adapter is not found
 */
function checkVersion(
    name: string,
    version: string,
    instances: Record<string, ioBroker.InstanceObject>,
    controllerVersion: string,
): void {
    let isFound = false;

    if (name === 'js-controller') {
        // Check only a version
        if (version) {
            if (!semver.satisfies(controllerVersion, version, { includePrerelease: true })) {
                throw new AdapterVersionMismatchError(
                    `Invalid version of "${name}". Installed "${controllerVersion}", required "${version}"`,
                );
            } else {
                isFound = true;
            }
        } else {
            isFound = true;
        }
    }

    if (!isFound) {
        // get all instances of this adapter
        const filteredInst = Object.keys(instances).filter(
            p => instances[p] && instances[p].common && instances[p].common.name === name,
        );
        for (const inst of filteredInst) {
            if (version && !semver.satisfies(instances[inst].common.version, version, { includePrerelease: true })) {
                throw new AdapterVersionMismatchError(
                    `required adapter "${name}" has wrong version. Installed "${instances[inst].common.version}", required "${version}"!`,
                    instances[inst].common.host,
                );
            }
            isFound = true;
        }
    }

    if (!isFound) {
        throw new AdapterNotFoundError(name);
    }
}

/** Options for `checkVersions` */
export interface CheckVersionsOptions {
    /** The objects client */
    objects: ObjectsClient;
    /** instance id of the requiring instance (only used for logging) */
    id: string;
    /** same host dependencies as defined in io-pack */
    deps?: Dependencies;
    /** global dependencies, as defined in io-pack */
    globalDeps?: Dependencies;
    /** Name of this host */
    hostname: string;
    /** The version of the running js-controller */
    controllerVersion: string;
    /** The logger to write the errors to */
    logger: ControllerLogger;
    /** Prefix of all log messages */
    logPrefix: string;
}

/**
 * Checks if all dependencies of an adapter are satisfied
 *
 * @param options The instance to check and its dependencies
 * @throws {Error} if a dependency is not fulfilled
 */
export async function checkVersions(options: CheckVersionsOptions): Promise<void> {
    const { objects, id, hostname, controllerVersion, logger, logPrefix } = options;

    const res = await objects.getObjectViewAsync('system', 'instance', {
        startkey: SYSTEM_ADAPTER_PREFIX,
        endkey: `${SYSTEM_ADAPTER_PREFIX}${HIGHEST_UNICODE_SYMBOL}`,
    });
    const instances: Record<string, ioBroker.InstanceObject> = {};
    const globInstances: Record<string, ioBroker.InstanceObject> = {};

    res.rows.forEach(item => {
        if (!item.value._id) {
            return;
        }
        globInstances[item.value._id] = item.value;
    });

    Object.keys(globInstances).forEach(id => {
        if (globInstances[id]?.common && globInstances[id].common.host === hostname) {
            instances[id] = globInstances[id];
        }
    });

    // this ensures we have a real object with correct structure
    const deps = tools.parseDependencies(options.deps);
    const globalDeps = tools.parseDependencies(options.globalDeps);

    // check local dependencies: required adapter must be installed on the same host
    try {
        for (const dep of Object.keys(deps)) {
            checkVersion(dep, deps[dep], instances, controllerVersion);
        }
    } catch (e) {
        logger.debug(`${logPrefix} ${id} [sameHostDependency]: ${JSON.stringify(deps)}`);
        throw new Error(`Adapter dependency not fulfilled on "${hostname}": ${e.message}`);
    }

    // check global dependencies: required adapter must be NOT installed on the same host
    try {
        for (const gDep of Object.keys(globalDeps)) {
            checkVersion(gDep, globalDeps[gDep], globInstances, controllerVersion);
        }
    } catch (e) {
        logger.debug(`${logPrefix} ${id} [globalDependency]: ${JSON.stringify(globalDeps)}`);

        if (e instanceof AdapterNotFoundError) {
            throw new Error(
                `Adapter dependency not fulfilled: required adapter "${e.adapter}" is not installed on any host!`,
            );
        }
        if (e instanceof AdapterVersionMismatchError && e.host) {
            // name the host with the wrong version, the same way as for a same-host dependency
            throw new Error(`Adapter dependency not fulfilled on "${e.host}": ${e.message}`);
        }
        // js-controller version, which is the one of this host, or any other error
        throw new Error(`Adapter dependency not fulfilled: ${e.message}`);
    }
}
