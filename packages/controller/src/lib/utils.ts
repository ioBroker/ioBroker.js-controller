import path from 'node:path';
import { tools } from '@iobroker/js-controller-common';

/**
 * Get disk warning level from state
 *
 * @param state disk warning state, normally with value of type number in %
 * @returns The new disk warning level in %
 */
export function getDiskWarningLevel(state: ioBroker.State): number {
    let warningLevel = 0;
    if (typeof state.val === 'number' && state.val <= 100 && state.val >= 0) {
        warningLevel = state.val;
    }

    return warningLevel;
}

/** Default value for disk warning level */
export const DEFAULT_DISK_WARNING_LEVEL = 5;

interface GetCronExpressionOptions {
    /** The cron expression in the schedule */
    cronExpression: string;
    /** The connection type of the instance */
    connectionType?: ioBroker.ConnectionType;
}

/** Max time in seconds to delay an instance start if no seconds specified, has to be below 60 */
const MAX_SCHEDULE_DELAY = 59;

/**
 * Delay the instance start if the expression has no seconds, and it is a cloud connection
 *
 * @param options information about the cron expression and connection type
 */
export function getCronExpression(options: GetCronExpressionOptions): string {
    const { cronExpression, connectionType } = options;
    const cronHasSeconds = cronExpression.split(' ').length > 5;

    if (cronHasSeconds || connectionType !== 'cloud') {
        return cronExpression;
    }

    const randomSeconds = Math.round(Math.random() * MAX_SCHEDULE_DELAY);
    return `${randomSeconds} ${cronExpression}`;
}

/**
 * Get the CLI arguments to reinstall an adapter from the location it was originally installed from
 *
 * @param installedFrom the `common.installedFrom` of the instance
 * @param adapterName name of the adapter, e.g. `admin`
 * @returns the arguments for the CLI, e.g. `['install', 'admin@7.1.0']`
 */
export function getInstallArgsFromInstalledFrom(installedFrom: string, adapterName: string): string[] {
    if (isUrlInstallSource(installedFrom)) {
        // Installing from URL supports raw http(s) and file URLs, the short GitHub URL format and local archives or paths
        return ['url', installedFrom, adapterName];
    }

    if (installedFrom.startsWith(`${tools.appName}.`)) {
        installedFrom = installedFrom.substring(tools.appName.length + 1);
    }
    return ['install', installedFrom];
}

/**
 * Whether an adapter was installed from somewhere else than the repository or npm: a URL, the short GitHub URL
 * format or a local archive or path. Only the `url` command of the CLI can install from there.
 *
 * @param installedFrom the `common.installedFrom` of the instance
 */
export function isUrlInstallSource(installedFrom: string): boolean {
    return (
        tools.isShortGithubUrl(installedFrom) ||
        installedFrom.includes('://') ||
        path.isAbsolute(installedFrom) ||
        /\.(tgz|gz|zip)$/i.test(installedFrom)
    );
}

/** What has to be known to put the code of an adapter on this host without an instance of its own */
export interface CodeOnlyInstallOptions {
    /** Name of the adapter, e.g. `frigate` */
    adapterName: string;
    /** The version the other host runs */
    version?: string;
    /** The `common.installedFrom` of the instance on the other host */
    installedFrom?: string;
    /** Whether a version of the adapter is installed on this host already */
    isInstalled: boolean;
    /** Whether the location of `installedFrom` should be tried, the later attempts fall back to the version */
    useInstalledFrom: boolean;
}

/**
 * Get the CLI arguments to put the code of an adapter in the given version on this host
 *
 * The `install` command refuses an adapter which is installed already, so another version comes with `upgrade`.
 * An adapter from a URL or a local path is fetched from there again: the version alone does not lead to it.
 *
 * @param options what is to be installed
 * @returns the arguments for the CLI, e.g. `['upgrade', 'frigate@2.1.0', '--yes']`
 */
export function getCodeOnlyInstallArgs(options: CodeOnlyInstallOptions): string[] {
    const { adapterName, version, installedFrom, isInstalled, useInstalledFrom } = options;

    if (useInstalledFrom && installedFrom && isUrlInstallSource(installedFrom)) {
        return ['url', installedFrom, adapterName];
    }

    const nameWithVersion = version ? `${adapterName}@${version}` : adapterName;
    return isInstalled ? ['upgrade', nameWithVersion, '--yes'] : ['install', nameWithVersion];
}
