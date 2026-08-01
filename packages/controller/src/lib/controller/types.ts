import type schedule from 'node-schedule';
import type cp from 'node:child_process';
import type { logger as toolsLogger } from '@iobroker/js-controller-common';

/** The logger instance used by the controller and all its managers */
export type ControllerLogger = ReturnType<typeof toolsLogger>;

/** Amount of information which is collected for the diagnostics */
export type DiagInfoType = 'extended' | 'normal' | 'no-city' | 'none';

/** Dependencies of an adapter as they can be defined in the io-package.json */
export type Dependencies = string[] | Record<string, string>[] | string | Record<string, string>;

/** Host information including host id and running version */
export type HostInformation = ioBroker.HostCommon & { host: string; runningVersion: string };

/** Result of the `getLogFiles` host message */
export interface GetLogFilesResult {
    /** All log files of this host with their size */
    list: { fileName: string; size: number }[];
}

/** A pending upload of an adapter */
export interface UploadTask {
    /** Name of the adapter which should be uploaded */
    adapter: string;
    /** The message which has requested the upload, if any */
    msg?: ioBroker.SendableMessage;
}

/** Arguments needed to rebuild a native module */
export interface RebuildArgs {
    /** Name of the module which needs to be rebuilt */
    module: string;
    /** Path of the module which needs to be rebuilt */
    path: string;
    /** Version of the module which needs to be rebuilt */
    version: string;
}

/** An entry of the installation/rebuild queue */
export interface InstallQueueEntry {
    /** The instance which needs an installation or rebuild */
    id: ioBroker.ObjectIDs.Instance;
    /** If the adapter needs to be rebuilt instead of installed */
    rebuild?: boolean;
    /** If the instance is disabled, so it should not be started after the installation */
    disabled?: boolean;
    /** Version which should be installed */
    version?: string;
    /** Location the adapter has been installed from */
    installedFrom?: string;
    /** If the instance is only started to be woken up */
    wakeUp?: boolean;
    /** Arguments for the rebuild */
    rebuildArgs?: RebuildArgs;
    /** If the task is currently being executed */
    inProgress?: boolean;
}

/** Everything the controller knows about a single instance */
export interface Process {
    /** the process itself */
    process?: cp.ChildProcess;
    /** the config of the instance (mainly io-pack attributes) */
    config: ioBroker.InstanceObject;
    /** Timer which restarts the instance */
    restartTimer?: NodeJS.Timeout;
    /** If the instance has been stopped to be restarted afterwards */
    restartExpected?: boolean;
    /** How often the installation of the adapter has been tried */
    downloadRetry?: number;
    /** If the instance runs inside the process of this controller */
    startedInCompactMode?: boolean;
    /** If the native modules of the adapter need to be rebuilt */
    needsRebuild?: boolean;
    /** The stderr output of the instance since the last output into the log */
    errors?: { ts: number; text: string }[];
    /** How often the rebuild of the native modules has been tried */
    rebuildCounter?: number;
    /** Arguments for the rebuild of the native modules */
    rebuildArgs?: RebuildArgs;
    /** If the instance is handled by a compact group controller */
    startedAsCompactGroup?: boolean;
    /** The Node.js version required by the adapter */
    engine?: string;
    /** Timestamp of the last cleanup of the stored errors */
    lastCleanErrors?: number;
    /** Timestamp of the last start of the instance */
    lastStart?: number;
    /** Name of the variable that is subscribed automatically */
    subscribe?: string;
    /** If the instance is currently being stopped */
    stopping?: boolean;
    /** How often the instance has crashed in a row */
    crashCount?: number;
    /** Timer which resets the crash counter */
    crashResetTimer?: NodeJS.Timeout;
    /** The cron job of an instance of type `schedule` */
    schedule?: schedule.Job;
}

/** Everything the controller knows about a single compact group controller */
export interface CompactProcess extends Process {
    /** instances in this compact group */
    instances: ioBroker.ObjectIDs.Instance[];
    /** the process itself */
    process?: cp.ChildProcess;
}

/** A pending stop of an instance */
export interface StopTimeoutObject {
    /** Timer which kills the instance if it does not stop by itself */
    timeout: NodeJS.Timeout | null;
    /** Resolves the pending stop as soon as the instance has been stopped */
    resolve?: (() => void) | null;
}

/** An instance which is waiting for the repository update */
export interface RepoRequester {
    /** requesting instance */
    from: string;
    /** The callback which has to be used to answer the request */
    callback: ioBroker.MessageCallbackInfo;
}

/** An instance of type `schedule` which is waiting to be started */
export interface ScheduledInstanceEntry {
    /** Directory of the adapter */
    adapterDir: string;
    /** Full path of the main file of the adapter */
    fileNameFull: string;
    /** If the instance is only started to be woken up */
    wakeUp: boolean;
}

/** Options for `sendResponseTo` */
export interface SendResponseToOptions {
    /** The message we want to respond to */
    receivedMsg: ioBroker.SendableMessage;
    /** The response payload */
    payload: Record<string, unknown>;
}
