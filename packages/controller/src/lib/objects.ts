import fs from 'fs-extra';
import { DEFAULT_DISK_WARNING_LEVEL } from '@/lib/utils.js';
import { tools } from '@iobroker/js-controller-common-db';

interface GetHostOptions {
    /** The host base id */
    id: string;
    /** The host name */
    hostname: string;
    /** If these are the objects for a compact group controller */
    isCompactGroupController: boolean;
    /** The ioBroker config */
    config: ioBroker.IoBrokerJson;
}

export type TaskObject = ioBroker.SettableObject & {
    state?: ioBroker.SettableState;
};

/**
 * Get all ioBroker objects which should be created in the `system.host.<hostname>` scope
 *
 * @param options information about hostname, compact controller, the base ID and the config
 */
export function getHostObjects(options: GetHostOptions): TaskObject[] {
    const { id, hostname, isCompactGroupController, config } = options;

    const objs: TaskObject[] = [];

    if (!isCompactGroupController) {
        objs.push({
            _id: `${id}.compactModeEnabled`,
            type: 'state',
            common: {
                name: 'Controller - compact mode enabled',
                type: 'boolean',
                read: true,
                write: false,
                role: 'indicator',
            },
            native: {},
        });

        objs.push({
            _id: `${id}.compactgroupProcesses`,
            type: 'state',
            common: {
                name: 'Controller - number of compact group controllers',
                type: 'number',
                read: true,
                write: false,
                min: 0,
                role: 'value',
                unit: 'processes',
            },
            native: {},
        });

        objs.push({
            _id: `${id}.nodeVersion`,
            type: 'state',
            common: {
                name: 'Controller - Node.js version',
                type: 'string',
                read: true,
                write: false,
                desc: 'Node.js version of the host process.',
                role: 'state',
            },
            native: {},
        });

        objs.push({
            _id: `${id}.osPackageUpdates`,
            type: 'state',
            common: {
                name: 'Available OS package updates',
                type: 'array',
                read: true,
                write: false,
                desc: 'The output of the "update" command from the package manager like apt or yum',
                role: 'state',
            },
            native: {},
        });
    }

    objs.push({
        _id: `${id}.instancesAsProcess`,
        type: 'state',
        common: {
            name: 'Controller - number of instance processes',
            type: 'number',
            read: true,
            write: false,
            min: 0,
            role: 'value',
            unit: 'processes',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.instancesAsCompact`,
        type: 'state',
        common: {
            name: 'Controller - number of instances started in this host process',
            type: 'number',
            read: true,
            write: false,
            min: 0,
            role: 'value',
            unit: 'instances',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.cpu`,
        type: 'state',
        common: {
            name: 'Controller - cpu usage in % of one core',
            type: 'number',
            read: true,
            write: false,
            min: 0,
            role: 'value',
            unit: '% of one core',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.cputime`,
        type: 'state',
        common: {
            name: 'Controller - accumulated cputime in seconds',
            type: 'number',
            read: true,
            write: false,
            min: 0,
            role: 'value',
            unit: 'seconds',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.mem`,
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: `${hostname} - memory usage in %`,
            unit: '%',
            read: true,
            write: false,
            min: 0,
            max: 100,
        },
        native: {},
    });

    objs.push({
        _id: `${id}.memHeapUsed`,
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: 'Controller - heap memory used in MB',
            read: true,
            write: false,
            min: 0,
            unit: 'MB',
        },
        native: {},
    });

    if (fs.existsSync('/proc/meminfo')) {
        objs.push({
            _id: `${id}.memAvailable`,
            type: 'state',
            common: {
                type: 'number',
                role: 'value',
                name: `${hostname} - available memory from /proc/meminfo in MB`,
                read: true,
                write: false,
                min: 0,
                unit: 'MB',
            },
            native: {},
        });
    }

    objs.push({
        _id: `${id}.memHeapTotal`,
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: 'Controller - heap memory reserved in MB',
            read: true,
            write: false,
            min: 0,
            unit: 'MB',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.memRss`,
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: 'Controller - resident set size memory in MB',
            desc: "RSS is the resident set size, the portion of the process's memory held in RAM",
            read: true,
            write: false,
            min: 0,
            unit: 'MB',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.uptime`,
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: 'Controller - uptime in seconds',
            read: true,
            write: false,
            min: 0,
            unit: 'seconds',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.load`,
        type: 'state',
        common: {
            unit: '',
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            name: `${hostname} - load average 1min`,
        },
        native: {},
    });

    objs.push({
        _id: `${id}.alive`,
        type: 'state',
        common: {
            name: `${hostname} - alive status`,
            read: true,
            write: false,
            type: 'boolean',
            role: 'indicator',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.freemem`,
        type: 'state',
        common: {
            name: `${hostname} - available RAM in MB`,
            unit: 'MB',
            read: true,
            write: false,
            type: 'number',
            role: 'value',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.inputCount`,
        type: 'state',
        common: {
            name: 'Controller - input level in events/15 seconds',
            desc: "State's inputs in 15 seconds",
            type: 'number',
            read: true,
            write: false,
            role: 'value',
            unit: 'events/15 seconds',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.outputCount`,
        type: 'state',
        common: {
            name: 'Controller - output level in events/15 seconds',
            desc: "State's outputs in 15 seconds",
            type: 'number',
            read: true,
            write: false,
            role: 'value',
            unit: 'events/15 seconds',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.eventLoopLag`,
        type: 'state',
        common: {
            name: 'Controller - The Node.js event loop lag in ms, averaged over 15 seconds',
            desc: 'Average Node.js event loop lag in ms',
            type: 'number',
            read: true,
            write: false,
            role: 'value',
            unit: 'ms',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.logLevel`,
        type: 'state',
        common: {
            name: 'Controller - Loglevel',
            type: 'string',
            read: true,
            write: true,
            desc: 'Loglevel of the host process. Will be set on start with defined value but can be overridden during runtime',
            role: 'state',
        },
        native: {},
    });

    objs.push({
        _id: `${id}.pid`,
        type: 'state',
        common: {
            name: 'Controller - Process ID',
            type: 'number',
            read: true,
            write: false,
            role: 'value',
        },
        native: {},
        state: {
            val: process.pid,
            ack: true,
        },
    });

    if (config.system.checkDiskInterval) {
        objs.push({
            _id: `${id}.diskSize`,
            type: 'state',
            common: {
                name: `${hostname} - disk total size`,
                desc: 'Disk size of logical volume where the server is installed in MiB',
                type: 'number',
                read: true,
                write: false,
                role: 'value',
                unit: 'MiB',
            },
            native: {},
        });

        objs.push({
            _id: `${id}.diskFree`,
            type: 'state',
            common: {
                name: `${hostname} - disk free size`,
                desc: 'Free disk size of the logical volume where the server is installed in MiB',
                type: 'number',
                read: true,
                write: false,
                role: 'value',
                unit: 'MiB',
            },
            native: {},
        });

        objs.push({
            _id: `${id}.diskWarning`,
            type: 'state',
            common: {
                name: `${hostname} - disk warning level`,
                desc: 'Generate a warning if the free disk space is below this value',
                type: 'number',
                read: true,
                write: true,
                def: DEFAULT_DISK_WARNING_LEVEL,
                role: 'level',
                unit: '%',
            },
            native: {},
        });
    }

    if (tools.getDockerInformation().isOfficial) {
        objs.push({
            _id: `${id}.availableDockerBuild`,
            type: 'state',
            common: {
                name: 'Last update of the Docker Image',
                desc: 'The timestamp of the last update of the Docker Image',
                type: 'string',
                read: true,
                write: false,
                role: 'date',
            },
            native: {},
        });
    }

    return objs;
}
