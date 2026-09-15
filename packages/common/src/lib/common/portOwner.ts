/**
 * Who holds a TCP/UDP port on this host? Used only in the error path of a failed bind
 * (`EADDRINUSE`) to turn "address already in use" into a sentence that names the holder:
 * another ioBroker instance, a process of the same user, or something outside ioBroker.
 *
 * Node.js has no API for this, so every platform has its own read-only lookup:
 * - Linux (native, LXC, Docker): `/proc/net/{tcp,tcp6,udp,udp6}` (inode + uid of the socket)
 *   and `/proc/<pid>/fd/*` → `socket:[inode]`. Works without any binary (the official Docker
 *   image ships neither `ss` nor `lsof`). The fd directory of a process is readable only for
 *   the same user, and not at all for a process whose privileges were raised at exec (Node.js
 *   with file capabilities, i.e. the js-controller started by systemd) — such a holder is
 *   reported as "not inspectable" together with the uid the socket table knows.
 * - macOS: `lsof`, then `ps` for the command line.
 * - Windows: `netstat -ano`, then `tasklist` for the image name.
 * - FreeBSD: `sockstat`.
 *
 * Everything here is best effort: nothing throws, every command is bounded by a timeout, and an
 * empty result means "unknown", never a claim. Every OS access is injectable for tests.
 */

import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';

export type PortProtocol = 'tcp' | 'udp';

/** What could not be bound */
export interface PortQuery {
    /** The port that could not be bound */
    port: number;
    /** The address that could not be bound, if known (`0.0.0.0` = all interfaces) */
    address?: string;
    /** Defaults to tcp — a failed `bind` syscall means udp */
    protocol?: PortProtocol;
}

/** A raw holder as the operating system reports it */
export interface PortHolder {
    /** Process id, or undefined when the socket is visible but its process is not */
    pid?: number;
    /** Numeric uid of the socket owner (Linux/FreeBSD/macOS), if known */
    uid?: number;
    /** Command line or image name of the process, if readable */
    command?: string;
    /** Local address the socket is bound to, as the OS shows it */
    localAddress?: string;
}

/** The port is held by the calling process itself */
export interface SelfPortOwner {
    /** Discriminator */
    kind: 'self';
    /** Our own pid */
    pid: number;
}

/** An ioBroker adapter instance in its own process */
export interface InstancePortOwner {
    /** Discriminator */
    kind: 'instance';
    /** Instance namespace, e.g. `mqtt.0` */
    instance: string;
    /** Pid of the instance process */
    pid: number;
}

/** The js-controller process — compact mode group 0 or the host's own services */
export interface ControllerPortOwner {
    /** Discriminator */
    kind: 'controller';
    /** Pid of the controller process */
    pid: number;
}

/** A compact mode group process — one of the instances in that group holds the port */
export interface CompactGroupPortOwner {
    /** Discriminator */
    kind: 'compact';
    /** The compact mode group number */
    group: number;
    /** Pid of the group process */
    pid: number;
}

/** Another process of the same user that is not an ioBroker instance */
export interface ProcessPortOwner {
    /** Discriminator */
    kind: 'process';
    /** Pid of the process */
    pid: number;
    /** Short name of the program, e.g. `mosquitto` */
    name: string;
    /** Full command line as far as the OS shows it */
    command: string;
}

/** A process this user may not inspect (another user, or a process that is not dumpable) */
export interface ForeignPortOwner {
    /** Discriminator */
    kind: 'foreign';
    /** Uid of the socket owner, if the OS tells it */
    uid?: number;
    /** Pid, if the OS tells it without letting us read the process */
    pid?: number;
}

export type PortOwner =
    | SelfPortOwner
    | InstancePortOwner
    | ControllerPortOwner
    | CompactGroupPortOwner
    | ProcessPortOwner
    | ForeignPortOwner;

/** What a command line tells about the process */
export type CommandClass =
    | Pick<InstancePortOwner, 'kind' | 'instance'>
    | Pick<ControllerPortOwner, 'kind'>
    | Pick<CompactGroupPortOwner, 'kind' | 'group'>
    | Pick<ProcessPortOwner, 'kind' | 'name'>;

/** Injectable OS access and limits of the lookup */
export interface PortOwnerDeps {
    /** Defaults to `process.platform` */
    platform?: NodeJS.Platform;
    /** Our own pid — a holder with this pid is reported as `self` */
    ownPid?: number;
    /** Our own uid, to tell "another user" from "not inspectable" on Linux */
    ownUid?: number;
    /** Reads a text file (`/proc`) */
    readFile?: (path: string) => Promise<string>;
    /** Lists a directory (`/proc`, `/proc/<pid>/fd`) */
    readdir?: (path: string) => Promise<string[]>;
    /** Resolves a symlink (`/proc/<pid>/fd/<n>`) */
    readlink?: (path: string) => Promise<string>;
    /** Runs a command and resolves with its stdout; rejects on failure or timeout */
    exec?: (file: string, args: string[], timeoutMs: number) => Promise<string>;
    /** Upper bound for the whole lookup, default 2000 ms */
    timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 2_000;

/**
 * Run a command with a deadline and resolve with its stdout.
 *
 * @param file the program
 * @param args its arguments
 * @param timeoutMs the deadline
 */
function defaultExec(file: string, args: string[], timeoutMs: number): Promise<string> {
    return new Promise((resolve, reject) => {
        execFile(file, args, { timeout: timeoutMs, windowsHide: true, maxBuffer: 4 * 1024 * 1024 }, (err, stdout) => {
            if (err) {
                // execFile reports an ExecFileException (an Error) — the message names the command
                reject(new Error(err.message));
            } else {
                resolve(stdout.toString());
            }
        });
    });
}

/**
 * Fill the injectable dependencies with the real OS access.
 *
 * @param deps what the caller overrides
 */
function withDefaults(deps: PortOwnerDeps): Required<Omit<PortOwnerDeps, 'ownUid'>> & { ownUid?: number } {
    return {
        platform: deps.platform ?? process.platform,
        ownPid: deps.ownPid ?? process.pid,
        ownUid: deps.ownUid ?? (typeof process.getuid === 'function' ? process.getuid() : undefined),
        readFile: deps.readFile ?? (p => fs.readFile(p, 'utf8')),
        readdir: deps.readdir ?? (p => fs.readdir(p)),
        readlink: deps.readlink ?? (p => fs.readlink(p)),
        exec: deps.exec ?? defaultExec,
        timeoutMs: deps.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    };
}

/**
 * Race a promise against a deadline — the lookup must never delay the error path.
 *
 * @param promise the work
 * @param timeoutMs the deadline
 * @param fallback what to resolve with when the deadline passes
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
    let timer: NodeJS.Timeout | undefined;
    const deadline = new Promise<T>(resolve => {
        timer = setTimeout(() => resolve(fallback), timeoutMs);
    });
    return Promise.race([promise, deadline]).finally(() => clearTimeout(timer));
}

// ---------------------------------------------------------------------------------------------
// Linux: /proc
// ---------------------------------------------------------------------------------------------

/** A socket row of `/proc/net/tcp*` / `udp*` */
export interface ProcNetSocket {
    /** Decoded local address */
    localAddress: string;
    /** Decoded local port */
    port: number;
    /** Hex state, `0A` = LISTEN */
    state: string;
    /** Uid of the socket owner */
    uid: number;
    /** Socket inode, the link to `/proc/<pid>/fd` */
    inode: number;
}

/**
 * Decode the hex `local_address` column (`0100007F:1F90` = 127.0.0.1:8080; IPv6 as 32 hex digits).
 *
 * @param field the column value
 */
export function decodeProcNetAddress(field: string): { address: string; port: number } {
    const [hexAddr = '', hexPort = ''] = field.split(':');
    const port = parseInt(hexPort, 16);
    if (hexAddr.length === 8) {
        // IPv4, little-endian bytes
        const bytes = [6, 4, 2, 0].map(i => parseInt(hexAddr.slice(i, i + 2), 16));
        return { address: bytes.join('.'), port };
    }
    if (hexAddr.length === 32) {
        // IPv6: four 32-bit little-endian words
        const groups: string[] = [];
        for (let w = 0; w < 4; w++) {
            const word = hexAddr.slice(w * 8, w * 8 + 8);
            const bytes = [6, 4, 2, 0].map(i => word.slice(i, i + 2));
            groups.push(`${bytes[0]}${bytes[1]}`.toLowerCase(), `${bytes[2]}${bytes[3]}`.toLowerCase());
        }
        const address = groups.join(':').replace(/(^|:)0+(?=[0-9a-f])/g, '$1');
        return { address: address === '0:0:0:0:0:0:0:0' ? '::' : address, port };
    }
    return { address: hexAddr, port };
}

/**
 * Parse one `/proc/net/tcp`-style table.
 *
 * @param text the file content
 */
export function parseProcNetTable(text: string): ProcNetSocket[] {
    const rows: ProcNetSocket[] = [];
    for (const line of text.split('\n').slice(1)) {
        const cols = line.trim().split(/\s+/);
        // sl local_address rem_address st tx_queue:rx_queue tr:tm->when retrnsmt uid timeout inode
        const [, localField, , state, , , , uid, , inode] = cols;
        if (cols.length < 10 || !localField?.includes(':')) {
            continue;
        }
        const { address, port } = decodeProcNetAddress(localField);
        rows.push({
            localAddress: address,
            port,
            state: (state ?? '').toUpperCase(),
            uid: Number(uid),
            inode: Number(inode),
        });
    }
    return rows;
}

/**
 * Extract the process name and instance from a command line — the adapter sets its process
 * title to `io.<namespace>`, before that the command line is `…/iobroker.<name>/main.js --instance N`;
 * the controller calls itself `iobroker.js-controller[.compactgroupN]`.
 *
 * @param command the command line (arguments joined by spaces)
 */
export function classifyCommand(command: string): CommandClass {
    const title = command.match(/(?:^|\s)io\.([a-z0-9][a-z0-9_-]*\.\d+)(?:\s|$)/i);
    if (title?.[1]) {
        return { kind: 'instance', instance: title[1] };
    }
    const spawn = command.match(/iobroker\.([a-z0-9][a-z0-9_-]*)[\\/].*?--instance\s+(\d+)/i);
    if (spawn) {
        return { kind: 'instance', instance: `${spawn[1]}.${spawn[2]}` };
    }
    const group =
        command.match(/js-controller\.compactgroup(\d+)/i) ?? command.match(/compactgroupController\.js\s+(\d+)/i);
    if (group) {
        return { kind: 'compact', group: Number(group[1]) };
    }
    if (/iobroker\.js-controller|js-controller[\\/]controller\.js/i.test(command)) {
        return { kind: 'controller' };
    }
    const first = command.trim().split(/\s+/)[0] ?? command.trim();
    const name = first.split(/[\\/]/).pop() ?? first;
    return { kind: 'process', name };
}

/**
 * Linux: socket tables + fd links under /proc.
 *
 * @param query the port to look for
 * @param deps OS access
 */
async function findHoldersLinux(query: PortQuery, deps: ReturnType<typeof withDefaults>): Promise<PortHolder[]> {
    const protocol = query.protocol ?? 'tcp';
    const tables = protocol === 'tcp' ? ['/proc/net/tcp', '/proc/net/tcp6'] : ['/proc/net/udp', '/proc/net/udp6'];
    const sockets: ProcNetSocket[] = [];
    for (const table of tables) {
        try {
            for (const row of parseProcNetTable(await deps.readFile(table))) {
                if (row.port === query.port && (protocol === 'udp' || row.state === '0A')) {
                    sockets.push(row);
                }
            }
        } catch {
            // table not present (no IPv6, restricted /proc) — the other one may still answer
        }
    }
    if (!sockets.length) {
        return [];
    }

    const wanted = new Map<number, ProcNetSocket>(sockets.map(s => [s.inode, s]));
    const holders = new Map<number, PortHolder>();
    let pids: string[] = [];
    try {
        pids = (await deps.readdir('/proc')).filter(name => /^\d+$/.test(name));
    } catch {
        // /proc unreadable
    }
    for (const pidName of pids) {
        let fds: string[];
        try {
            fds = await deps.readdir(`/proc/${pidName}/fd`);
        } catch {
            continue; // another user's process, or not dumpable — see the uid fallback below
        }
        for (const fd of fds) {
            let target: string;
            try {
                target = await deps.readlink(`/proc/${pidName}/fd/${fd}`);
            } catch {
                continue;
            }
            const m = target.match(/^socket:\[(\d+)\]$/);
            if (!m) {
                continue;
            }
            const socket = wanted.get(Number(m[1]));
            if (!socket) {
                continue;
            }
            wanted.delete(socket.inode);
            const pid = Number(pidName);
            if (!holders.has(pid)) {
                let command: string | undefined;
                try {
                    command = (await deps.readFile(`/proc/${pidName}/cmdline`)).replace(/\0+$/, '').replace(/\0/g, ' ');
                } catch {
                    command = undefined;
                }
                holders.set(pid, { pid, uid: socket.uid, command, localAddress: socket.localAddress });
            }
        }
        if (!wanted.size) {
            break;
        }
    }
    // Sockets whose process we could not enter: report the uid the socket table knows
    for (const socket of wanted.values()) {
        holders.set(-socket.inode, { uid: socket.uid, localAddress: socket.localAddress });
    }
    return [...holders.values()];
}

// ---------------------------------------------------------------------------------------------
// macOS: lsof -F
// ---------------------------------------------------------------------------------------------

/**
 * Parse `lsof -F pcun` output — one field per line, `p` starts a process block.
 *
 * @param text the lsof output
 */
export function parseLsofFields(text: string): PortHolder[] {
    const holders: PortHolder[] = [];
    let current: PortHolder | undefined;
    for (const line of text.split('\n')) {
        const tag = line[0];
        const value = line.slice(1).trim();
        if (tag === 'p') {
            current = { pid: Number(value) };
            holders.push(current);
        } else if (current && tag === 'c') {
            current.command = value;
        } else if (current && tag === 'u') {
            current.uid = Number(value);
        } else if (current && tag === 'n' && !current.localAddress) {
            current.localAddress = value.replace(/->.*$/, '');
        }
    }
    return holders;
}

/**
 * macOS: lsof + ps.
 *
 * @param query the port to look for
 * @param deps OS access
 */
async function findHoldersDarwin(query: PortQuery, deps: ReturnType<typeof withDefaults>): Promise<PortHolder[]> {
    const protocol = query.protocol ?? 'tcp';
    const selector = protocol === 'tcp' ? [`-iTCP:${query.port}`, '-sTCP:LISTEN'] : [`-iUDP:${query.port}`];
    let out: string;
    try {
        out = await deps.exec('lsof', ['-nP', ...selector, '-Fpcun'], deps.timeoutMs);
    } catch {
        return [];
    }
    const holders = parseLsofFields(out);
    for (const holder of holders) {
        if (holder.pid) {
            try {
                const args = (await deps.exec('ps', ['-o', 'args=', '-p', String(holder.pid)], deps.timeoutMs)).trim();
                if (args) {
                    holder.command = args;
                }
            } catch {
                // keep lsof's short command name
            }
        }
    }
    return holders;
}

// ---------------------------------------------------------------------------------------------
// Windows: netstat -ano / tasklist
// ---------------------------------------------------------------------------------------------

/**
 * Parse `netstat -ano -p tcp|udp` output for the given port.
 *
 * @param text the netstat output
 * @param port the port to look for
 * @param protocol tcp needs LISTENING, udp has no state column
 */
export function parseNetstat(text: string, port: number, protocol: PortProtocol): PortHolder[] {
    const holders = new Map<number, PortHolder>();
    for (const line of text.split('\n')) {
        const cols = line.trim().split(/\s+/);
        const [proto, local = '', , state = ''] = cols;
        if (cols.length < 4 || proto?.toUpperCase() !== protocol.toUpperCase()) {
            continue;
        }
        const localPort = Number(local.slice(local.lastIndexOf(':') + 1));
        if (localPort !== port) {
            continue;
        }
        const pid = Number(cols[cols.length - 1]);
        if (protocol === 'tcp' && !/LISTEN/i.test(state)) {
            continue;
        }
        if (Number.isFinite(pid) && !holders.has(pid)) {
            holders.set(pid, { pid, localAddress: local.slice(0, local.lastIndexOf(':')) });
        }
    }
    return [...holders.values()];
}

/**
 * Parse `tasklist /FI "PID eq N" /FO CSV /NH` — the image name is the first CSV field.
 *
 * @param text the tasklist output
 */
export function parseTasklistImage(text: string): string | undefined {
    const m = text.match(/^"([^"]+)"/m);
    return m ? m[1] : undefined;
}

/**
 * Windows: netstat + tasklist.
 *
 * @param query the port to look for
 * @param deps OS access
 */
async function findHoldersWindows(query: PortQuery, deps: ReturnType<typeof withDefaults>): Promise<PortHolder[]> {
    const protocol = query.protocol ?? 'tcp';
    let out: string;
    try {
        out = await deps.exec('netstat', ['-ano', '-p', protocol], deps.timeoutMs);
    } catch {
        return [];
    }
    const holders = parseNetstat(out, query.port, protocol);
    for (const holder of holders) {
        try {
            const list = await deps.exec(
                'tasklist',
                ['/FI', `PID eq ${holder.pid}`, '/FO', 'CSV', '/NH'],
                deps.timeoutMs,
            );
            holder.command = parseTasklistImage(list);
        } catch {
            // image name stays unknown
        }
    }
    return holders;
}

// ---------------------------------------------------------------------------------------------
// FreeBSD: sockstat
// ---------------------------------------------------------------------------------------------

/**
 * Parse `sockstat -l -P tcp|udp -p PORT` output (USER COMMAND PID FD PROTO LOCAL FOREIGN).
 *
 * @param text the sockstat output
 * @param port the port to look for
 */
export function parseSockstat(text: string, port: number): PortHolder[] {
    const holders = new Map<number, PortHolder>();
    for (const line of text.split('\n').slice(1)) {
        const cols = line.trim().split(/\s+/);
        const [, command, pidField, , , local = ''] = cols;
        if (cols.length < 6) {
            continue;
        }
        if (Number(local.slice(local.lastIndexOf(':') + 1)) !== port) {
            continue;
        }
        const pid = Number(pidField);
        if (Number.isFinite(pid) && !holders.has(pid)) {
            holders.set(pid, { pid, command, localAddress: local.slice(0, local.lastIndexOf(':')) });
        }
    }
    return [...holders.values()];
}

/**
 * FreeBSD: sockstat.
 *
 * @param query the port to look for
 * @param deps OS access
 */
async function findHoldersFreeBsd(query: PortQuery, deps: ReturnType<typeof withDefaults>): Promise<PortHolder[]> {
    try {
        const out = await deps.exec(
            'sockstat',
            ['-l', '-P', query.protocol ?? 'tcp', '-p', String(query.port)],
            deps.timeoutMs,
        );
        return parseSockstat(out, query.port);
    } catch {
        return [];
    }
}

// ---------------------------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------------------------

/**
 * Find the processes holding a port on this host, as the OS reports them (raw).
 *
 * @param query port, address and protocol of the failed bind
 * @param deps injectable OS access (tests) and limits
 */
export async function findPortHolders(query: PortQuery, deps: PortOwnerDeps = {}): Promise<PortHolder[]> {
    const d = withDefaults(deps);
    let work: Promise<PortHolder[]>;
    switch (d.platform) {
        case 'linux':
            work = findHoldersLinux(query, d);
            break;
        case 'darwin':
            work = findHoldersDarwin(query, d);
            break;
        case 'win32':
            work = findHoldersWindows(query, d);
            break;
        case 'freebsd':
            work = findHoldersFreeBsd(query, d);
            break;
        default:
            return [];
    }
    try {
        return await withTimeout(work, d.timeoutMs, []);
    } catch {
        return [];
    }
}

/**
 * Turn raw holders into owners: which are ioBroker instances, which are ours, which are opaque.
 *
 * @param holders the raw holders
 * @param ownPid our own pid
 */
export function classifyPortHolders(holders: PortHolder[], ownPid: number): PortOwner[] {
    const owners: PortOwner[] = [];
    for (const holder of holders) {
        if (holder.pid === undefined) {
            owners.push({ kind: 'foreign', uid: holder.uid });
            continue;
        }
        if (holder.pid === ownPid) {
            owners.push({ kind: 'self', pid: holder.pid });
            continue;
        }
        if (!holder.command) {
            owners.push({ kind: 'foreign', uid: holder.uid, pid: holder.pid });
            continue;
        }
        const cls = classifyCommand(holder.command);
        switch (cls.kind) {
            case 'instance':
                owners.push({ kind: 'instance', instance: cls.instance, pid: holder.pid });
                break;
            case 'controller':
                owners.push({ kind: 'controller', pid: holder.pid });
                break;
            case 'compact':
                owners.push({ kind: 'compact', group: cls.group, pid: holder.pid });
                break;
            default:
                owners.push({ kind: 'process', pid: holder.pid, name: cls.name, command: holder.command });
        }
    }
    return owners;
}

/**
 * Find and classify the holders of a port — the one call the error paths use.
 *
 * @param query port, address and protocol of the failed bind
 * @param deps injectable OS access (tests) and limits
 */
export async function resolvePortOwners(query: PortQuery, deps: PortOwnerDeps = {}): Promise<PortOwner[]> {
    const d = withDefaults(deps);
    return classifyPortHolders(await findPortHolders(query, deps), d.ownPid);
}

/** An instance whose configuration names the port (objects db) */
export interface ConfiguredInstance {
    /** Instance namespace */
    instance: string;
    /** `common.enabled` */
    enabled: boolean;
    /** The instance's `alive` state */
    alive: boolean;
    /**
     * The listen address of its settings (`native.bind`), when it has one. An instance without one
     * may use the port as a client (the port of its peer), so the sentence marks it instead of
     * claiming it listens.
     */
    bind?: string;
}

/** The instances running inside one compact mode process */
export interface CompactGroupInstances {
    /** Compact group number, 0 = inside the controller */
    group: number;
    /** Instance namespaces */
    instances: string[];
}

/** Everything the sentence can be built from */
export interface PortConflictContext {
    /** The port that could not be bound */
    port: number;
    /** The address that could not be bound, if known */
    address?: string;
    /** Defaults to tcp */
    protocol?: PortProtocol;
    /** The holders as found by `resolvePortOwners` */
    owners: PortOwner[];
    /** Instances on this host whose configuration names this port, if looked up */
    configuredBy?: ConfiguredInstance[];
    /** Instances of this host running inside the compact mode process that holds the port, if looked up */
    compactInstances?: CompactGroupInstances;
    /** Whether the host runs compact mode at all (`system.compact`), if known — without it the controller holds a port itself */
    compactModeEnabled?: boolean;
    /** The user the adapter runs as, for the "not inspectable" wording */
    userName?: string;
}

/** The slice of the objects and states db the sentence is enriched from — fetched by the caller, judged here */
export interface DbEnrichmentInput {
    /** The instance objects of this host (see `instancesOnHost`) */
    instances: ioBroker.InstanceObject[];
    /** The states named by `enrichmentStateIds`, by id */
    states: Record<string, ioBroker.State | null | undefined>;
    /** `system.compact` of the host configuration — without it no instance runs inside the controller, whatever its own flags say */
    compactModeEnabled: boolean;
}

/**
 * The instance objects the objects db holds for one host.
 *
 * @param objects any objects, e.g. the rows of the `system/instance` view
 * @param host the host name the instances belong to (`common.host`)
 */
export function instancesOnHost(
    objects: Iterable<ioBroker.AnyObject | null | undefined>,
    host: string,
): ioBroker.InstanceObject[] {
    const result: ioBroker.InstanceObject[] = [];
    for (const obj of objects) {
        if (obj?.type === 'instance' && obj.common?.host === host) {
            result.push(obj);
        }
    }
    return result;
}

/**
 * The state ids the enrichment reads for these instances — one `getStates` call for all of them:
 * `<instance>.sigKill` carries the pid the host spawned (acknowledged), `<instance>.alive` whether
 * the instance runs.
 *
 * @param instances the instance objects of this host
 */
export function enrichmentStateIds(instances: ioBroker.InstanceObject[]): string[] {
    return instances.flatMap(obj => [`${obj._id}.sigKill`, `${obj._id}.alive`]);
}

/**
 * What the objects and states db add to the OS lookup, applied to the context in place:
 * - the instance behind a pid the OS could not name (Windows shows only `node.exe`, a process
 *   with raised privileges only its pid): the host stores the pid of every instance it spawned in
 *   `<instance>.sigKill` — instances in compact mode carry -1 there and are found via the group below;
 * - every instance of this host configured for the port (`native.port`), with its listen address
 *   (`native.bind`) when it has one — an instance without one may use the port as a client, so it
 *   is marked, not dropped (the admin's own port-conflict check sees only the `bind` carriers);
 * - the instances running inside the compact mode process that holds the port — only while the
 *   host runs compact mode at all (`system.compact`), because the instance flags alone say nothing.
 *
 * @param ctx the sentence context, extended in place
 * @param input what the caller fetched from the db
 */
export function enrichPortOwnersFromDb(ctx: PortConflictContext, input: DbEnrichmentInput): void {
    const { instances, states, compactModeEnabled } = input;
    const namespaceOf = (obj: ioBroker.InstanceObject): string => obj._id.slice('system.adapter.'.length);
    const isAlive = (obj: ioBroker.InstanceObject): boolean => !!states[`${obj._id}.alive`]?.val;

    ctx.owners = ctx.owners.map((owner): PortOwner => {
        const pid =
            owner.kind === 'foreign' || (owner.kind === 'process' && /^node(\.exe)?$/i.test(owner.name))
                ? owner.pid
                : undefined;
        const spawned = pid
            ? instances.find(obj => {
                  const sigKill = states[`${obj._id}.sigKill`];
                  return !!sigKill?.ack && sigKill.val === pid;
              })
            : undefined;
        return spawned && pid ? { kind: 'instance', instance: namespaceOf(spawned), pid } : owner;
    });

    const configured: ConfiguredInstance[] = instances
        .filter(obj => Number(obj.native?.port) === ctx.port)
        .map(obj => ({
            instance: namespaceOf(obj),
            enabled: !!obj.common.enabled,
            alive: isAlive(obj),
            bind: typeof obj.native?.bind === 'string' && obj.native.bind ? obj.native.bind : undefined,
        }));
    // the listen-address carriers first — they are the servers
    configured.sort((a, b) => Number(!a.bind) - Number(!b.bind));
    if (configured.length) {
        ctx.configuredBy = configured;
    }

    ctx.compactModeEnabled = compactModeEnabled;
    const holder = ctx.owners.find(o => o.kind === 'controller' || o.kind === 'compact');
    if (holder && compactModeEnabled) {
        const group = holder.kind === 'compact' ? holder.group : 0;
        // the host's default group is 1 (main.ts, instanceRelevantForThisController); 0 runs inside the controller
        const members = instances.filter(
            obj =>
                obj.common.compact &&
                obj.common.runAsCompactMode &&
                (obj.common.compactGroup ?? 1) === group &&
                isAlive(obj),
        );
        ctx.compactInstances = { group, instances: members.map(namespaceOf) };
    }
}

/**
 * The sentence the user reads next to "address already in use" — naming the holder, or saying
 * honestly that it sits outside ioBroker. Empty when nothing is known and nothing is configured.
 *
 * @param ctx what the lookups found
 */
export function describePortConflict(ctx: PortConflictContext): string {
    const where = `${ctx.protocol === 'udp' ? 'UDP port' : 'Port'} ${ctx.port}${ctx.address && ctx.address !== '0.0.0.0' && ctx.address !== '::' ? ` on ${ctx.address}` : ''}`;
    const parts: string[] = [];
    const user = ctx.userName ? ` "${ctx.userName}"` : '';

    for (const owner of ctx.owners) {
        switch (owner.kind) {
            case 'self':
                parts.push(
                    `${where} is already in use by this process itself (pid ${owner.pid}) – either another instance in the same compact mode process holds it, or a listener of this instance was not closed before the restart`,
                );
                break;
            case 'instance':
                parts.push(
                    `${where} is already in use by ioBroker instance ${owner.instance} (pid ${owner.pid}) on this host – stop or reconfigure one of the two instances`,
                );
                break;
            case 'compact': {
                const list =
                    ctx.compactInstances?.group === owner.group && ctx.compactInstances.instances.length
                        ? `: ${ctx.compactInstances.instances.join(', ')}`
                        : '';
                parts.push(
                    `${where} is already in use by the js-controller process of compact mode group ${owner.group} (pid ${owner.pid}) – one of the instances running in that group holds it${list}`,
                );
                break;
            }
            case 'controller': {
                const inside =
                    ctx.compactInstances?.group === 0 && ctx.compactInstances.instances.length
                        ? ctx.compactInstances.instances
                        : undefined;
                const who = inside
                    ? `an instance running in compact mode inside the controller holds it: ${inside.join(', ')}`
                    : ctx.compactModeEnabled === false
                      ? 'the controller itself holds it (compact mode is off, so no instance runs inside it)'
                      : 'an instance running in compact mode inside the controller, or the controller itself, holds it';
                parts.push(`${where} is already in use by the js-controller process (pid ${owner.pid}) – ${who}`);
                break;
            }
            case 'process':
                parts.push(
                    `${where} is already in use by process "${owner.name}" (pid ${owner.pid}), which is not an ioBroker instance – stop that service or choose another port`,
                );
                break;
            case 'foreign':
                parts.push(
                    owner.pid
                        ? `${where} is already in use by process ${owner.pid}, which cannot be inspected by user${user}${owner.uid !== undefined ? ` (owner uid ${owner.uid})` : ''}`
                        : `${where} is already in use by a process outside ioBroker (owner not visible to user${user}${owner.uid !== undefined ? `, uid ${owner.uid}` : ''})`,
                );
                break;
        }
    }

    if (ctx.configuredBy?.length) {
        const named = new Set(ctx.owners.map(o => (o.kind === 'instance' ? o.instance : '')));
        const others = ctx.configuredBy.filter(c => !named.has(c.instance));
        if (others.length) {
            const words = others.map(c => {
                const state = c.alive ? 'running' : c.enabled ? 'enabled, not running' : 'disabled';
                return c.bind
                    ? `${c.instance} (bind ${c.bind}, ${state})`
                    : `${c.instance} (${state}, no bind address – possibly a client port)`;
            });
            parts.push(
                parts.length
                    ? `also configured for ${where}: ${words.join(', ')}`
                    : `${where} could not be bound – configured for the same port on this host: ${words.join(', ')}`,
            );
        }
    }
    return parts.join('; ');
}

/**
 * The hint for a bind refused by the operating system (`EACCES`): on Linux/macOS ports below 1024
 * need elevated rights, which `iobroker fix` grants to the Node.js binary.
 *
 * @param port the port
 * @param platform defaults to the current platform
 */
export function describeBindPermissionError(port: number, platform: NodeJS.Platform = process.platform): string {
    if (port < 1024 && platform !== 'win32') {
        return `no permission to bind port ${port} – ports below 1024 need elevated rights; run "iobroker fix" to grant them to Node.js, or choose a port above 1023`;
    }
    return `no permission to bind port ${port} – check the rights of the user ioBroker runs as`;
}
