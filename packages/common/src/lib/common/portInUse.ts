/**
 * Naming who holds a port that could not be opened
 *
 * `EADDRINUSE` on its own only says that the port is taken, not by whom. The host keeps the used resources of its
 * instances (`system.host.<name>.usedResources.*`), so when an ioBroker instance on the same host holds the port, it
 * can be named. When none does, the port is held by a program outside of this ioBroker installation.
 *
 * This is a hint and not an OS level lookup: the registry only knows the ports instances declare, so it cannot name
 * another program, and it does not see an instance of a second ioBroker installation on the same machine.
 */

/** The port a failed `listen` (TCP) or `bind` (UDP) wanted */
export interface PortInUse {
    /** The port number */
    port: number;
    /** TCP for `listen`, UDP for `bind` */
    protocol: 'tcp' | 'udp';
    /** The address the socket wanted to bind to, if the error says so */
    address?: string;
}

/** Addresses that stand for all interfaces, so they overlap with every other address */
const ANY_ADDRESS = new Set(['', '0.0.0.0', '::', '::0']);

/**
 * Read the port out of an `EADDRINUSE` error
 *
 * Node.js puts `port` and `address` on the errors of `server.listen()` and `socket.bind()`, and `syscall` says which
 * one failed.
 *
 * @param err the error to inspect, usually an uncaught exception
 * @returns the port, or undefined if the error is no `EADDRINUSE` or names no port (e.g. a Unix socket path)
 */
export function getPortInUse(err: unknown): PortInUse | undefined {
    if (!err || typeof err !== 'object') {
        return undefined;
    }
    const { code, syscall, port, address } = err as Record<string, unknown>;
    if (code !== 'EADDRINUSE' || typeof port !== 'number') {
        return undefined;
    }
    return {
        port,
        protocol: syscall === 'bind' ? 'udp' : 'tcp',
        address: typeof address === 'string' ? address : undefined,
    };
}

/**
 * Check whether two bind addresses can collide on the same port
 *
 * @param a the first address, undefined for all interfaces
 * @param b the second address, undefined for all interfaces
 */
function addressesOverlap(a: string | undefined, b: string | undefined): boolean {
    if (a === undefined || b === undefined || ANY_ADDRESS.has(a) || ANY_ADDRESS.has(b)) {
        return true;
    }
    return a === b;
}

/** Options for {@link describePortInUse} */
export interface DescribePortInUseOptions {
    /** The port that could not be opened, see {@link getPortInUse} */
    portInUse: PortInUse;
    /** The used resources of the host, e.g. from `adapter.getHostUsedResources('tcpPort')` */
    resources: ioBroker.RegisteredResource[];
    /** The instance that failed to open the port, e.g. "web.0" - its own entries never count as the holder */
    instance?: string;
}

/**
 * Describe who holds a port that could not be opened, for the log
 *
 * Only running instances count: a stopped instance keeps its entry with the port it would use, but holds nothing.
 *
 * @param options the port and the used resources of the host
 * @returns a sentence naming the instances that hold the port, or saying that another program does
 */
export function describePortInUse(options: DescribePortInUseOptions): string {
    const { portInUse, resources, instance } = options;
    const type = portInUse.protocol === 'udp' ? 'udpPort' : 'tcpPort';
    const label = `${portInUse.protocol.toUpperCase()} port ${portInUse.port}`;

    const holders = new Set<string>();
    for (const resource of resources) {
        if (
            resource.type === type &&
            resource.isBlocked &&
            resource.instance !== instance &&
            resource.data.port === portInUse.port &&
            addressesOverlap(resource.data.bind, portInUse.address)
        ) {
            holders.add(resource.instance);
        }
    }

    if (holders.size) {
        return `${label} is used by ${[...holders].join(', ')} on this host`;
    }
    return `${label} is not used by a running instance of this host, so another program holds it`;
}
