import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { forwardPythonOutput } from '@/lib/pythonRuntime.js';
import type cp from 'node:child_process';
import type { ControllerLogger } from '@/lib/controller/types.js';

/** What the forwarding of the output of a Python adapter needs */
export interface PythonOutputDeps {
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
}

/**
 * Log the output of a Python adapter under this host
 *
 * A Python adapter writes its log to stdout and stderr instead of sending it over an IPC channel, so the host
 * reads it from there: that is what puts the lines into the host's log file and what surfaces a crash.
 *
 * A record the adapter pushed to the log transporters itself is marked as such, so that the `logged` handler
 * can leave it out of the push - otherwise admin shows every one of those lines twice, once under the instance
 * and once under this host. It still goes into the host's log file, which is what the forwarding is for.
 *
 * @param deps What the forwarding needs
 * @param child The process of the Python adapter
 * @param id The id of the instance, like `system.adapter.hm-rpc.0`
 */
export function forwardPythonAdapterOutput(
    deps: PythonOutputDeps,
    child: cp.ChildProcess,
    id: ioBroker.ObjectIDs.Instance,
): void {
    const { logger, hostLogPrefix } = deps;

    forwardPythonOutput(child, id.substring(SYSTEM_ADAPTER_PREFIX.length), (level, line, alreadyPushed) => {
        const message = `${hostLogPrefix} ${id} ${line}`;

        if (alreadyPushed) {
            // travels with the record to the `logged` handler, which does the pushing
            logger[level](message, { alreadyPushed: true });
        } else {
            logger[level](message);
        }
    });
}
