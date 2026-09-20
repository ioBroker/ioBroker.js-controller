/**
 *      Host discovery
 *
 *      Announces this host on the local network via mDNS/DNS-SD and collects the announcements of
 *      the other ioBroker hosts. Used by the multihost pairing: a master lists the hosts that do not
 *      belong to any system yet and attaches one of them over the multihost UDP protocol.
 *
 *      mDNS is only the *finding* part. Everything that writes - `join`, `decline`, `identify` -
 *      goes over the multihost socket, which is why the announcement points at that port.
 *
 *      The mDNS library is an optional dependency and is loaded at runtime. It binds UDP 5353,
 *      which does not work on every system - notably not on some Windows setups. When it is missing
 *      or cannot be started, this class quietly does nothing: hosts are then only found over the
 *      multihost UDP protocol, which needs no extra package.
 *
 *      Copyright 2014-2026 bluefox <dogafox@gmail.com>,
 *      MIT License
 *
 */

import { isIPv4 } from 'node:net';
import type { InternalLogger } from '@iobroker/js-controller-common-db/tools';
import { MULTIHOST_PORT } from '@/lib/multihostServer.js';

/** DNS-SD service type, announced as `_iobroker._tcp` */
export const DISCOVERY_SERVICE_TYPE = 'iobroker';
/** Layout version of the TXT record. Raise it when the meaning of a field changes */
export const DISCOVERY_PROTOCOL_VERSION = '1';
/** Name of the optional package which provides the mDNS implementation */
const MDNS_MODULE = 'bonjour-service';
/** How often the browser re-queries the network, in ms */
const DEFAULT_REFRESH_INTERVAL = 60_000;
/** An entry is dropped when it was not seen for this long, in ms */
const ENTRY_TTL = 5 * 60_000;
/**
 * Upper bound for the discovered hosts.
 *
 * Anybody on the network can publish `_iobroker._tcp`, and the key of an entry is the instance name
 * the publisher chose, so without a cap a single device could fill the map - and with it the state
 * the Admin reads.
 */
const MAX_HOSTS = 200;
/** Longest string accepted from a TXT record. Everything here is a name, a uuid or a version */
const MAX_TXT_LENGTH = 128;
/** A uuid has to look like one before it is stored and shown */
const UUID_PATTERN = /^[0-9a-fA-F-]{16,64}$/;
/** Announcements are collected for this long before the change is reported, in ms */
const CHANGE_DEBOUNCE = 2_000;

/**
 * The part of the mDNS library this class uses.
 *
 * Declared here instead of imported from the package: the package is optional, and a type import
 * would make it required at build time.
 */
interface MdnsService {
    fqdn: string;
    name: string;
    port: number;
    txt?: Record<string, string>;
    addresses?: string[];
    stop: (...args: unknown[]) => void;
}

interface MdnsBrowser {
    on: (event: 'up' | 'down' | 'txt-update' | 'srv-update', listener: (service: MdnsService) => void) => void;
    update: () => void;
    stop: () => void;
}

interface MdnsResponder {
    publish: (config: {
        name: string;
        type: string;
        protocol: 'tcp' | 'udp';
        port: number;
        txt: Record<string, string>;
    }) => MdnsService;
    find: (options: { type: string; protocol: 'tcp' | 'udp' }) => MdnsBrowser;
    destroy: (callback?: () => void) => void;
}

type MdnsResponderConstructor = new (options?: unknown, errorCallback?: (err: Error) => void) => MdnsResponder;

/**
 * What this host publishes about itself.
 */
export interface AnnounceInfo {
    /** Installation id (`system.meta.uuid`). Identifies the host as long as it belongs to no system */
    uuid: string;
    /** The host is not attached to another host and can be taken over */
    unclaimed: boolean;
    /** The multihost service of this host is enabled, so other hosts can join it */
    master: boolean;
}

/**
 * A host that was found on the network.
 */
export interface DiscoveredHost {
    /** Installation id of the remote host, used as the key of the ignore list */
    uuid: string;
    /** Name the remote host reported */
    hostname: string;
    /** Address to send the multihost commands to */
    ip: string;
    /** Port of the multihost service of the remote host */
    port: number;
    /** The remote host belongs to no system yet and can be attached */
    unclaimed: boolean;
    /** The remote host runs a multihost master */
    master: boolean;
    /** Controller version of the remote host */
    version: string;
    /** Timestamp of the last announcement, ms */
    lastSeen: number;
}

/**
 * How the discovery is set up. Everything except the callbacks is required.
 */
export interface HostDiscoveryOptions {
    /** Name of this host */
    hostname: string;
    /** The controller logger */
    logger: InternalLogger;
    /** Prefix used for all log messages, e.g. `host.myhost` */
    logPrefix: string;
    /** Controller version, published in the TXT record */
    version: string;
    /** How often the network is re-queried, in ms. Defaults to 60 seconds */
    refreshInterval?: number;
    /** Called whenever the list of the discovered hosts changed */
    onChange?: (hosts: DiscoveredHost[]) => void;
    /**
     * Called on every refresh tick. Gives the controller the chance to re-evaluate what it announces
     * about itself - a host stops being unclaimed the moment another host joins it.
     */
    onRefresh?: () => void;
}

/**
 * Announces this host and keeps a list of the other ioBroker hosts on the network.
 *
 * Announcing and discovering are independent: every host announces itself, but only a host that can
 * actually attach others has to listen.
 *
 * Every method is a no-op when the optional mDNS package is not installed or failed to start.
 */
export class HostDiscovery {
    private readonly hostname: string;
    private readonly logger: InternalLogger;
    private readonly logPrefix: string;
    private readonly version: string;
    private readonly refreshInterval: number;
    private readonly onChange?: (hosts: DiscoveredHost[]) => void;
    private readonly onRefresh?: () => void;

    private responder: MdnsResponder | null = null;
    /** The one and only attempt to load and start the optional package */
    private responderPromise: Promise<MdnsResponder | null> | null = null;
    private service: MdnsService | null = null;
    private browser: MdnsBrowser | null = null;
    private refreshTimer: NodeJS.Timeout | null = null;

    /** Set once mDNS turned out to be unusable. Everything is skipped from then on */
    private unavailable = false;

    /** What is currently announced, to avoid re-publishing an unchanged service */
    private announced: AnnounceInfo | null = null;
    /** Full name of our own announcement, so that it can be filtered out of the results */
    private ownFqdn = '';

    private readonly hosts = new Map<string, DiscoveredHost>();

    /** Pending change notification, so that a busy network cannot drive the state writes */
    private changeTimer: NodeJS.Timeout | null = null;

    /**
     * @param options Names, logger and the callbacks for the discovered hosts
     */
    constructor(options: HostDiscoveryOptions) {
        this.hostname = options.hostname;
        this.logger = options.logger;
        this.logPrefix = options.logPrefix;
        this.version = options.version;
        this.refreshInterval = options.refreshInterval || DEFAULT_REFRESH_INTERVAL;
        this.onChange = options.onChange;
        this.onRefresh = options.onRefresh;
    }

    /**
     * Whether mDNS is usable at all. `false` means this host is only findable over the multihost
     * UDP protocol.
     */
    isAvailable(): boolean {
        return !this.unavailable;
    }

    /**
     * Load the optional mDNS package and create the shared responder.
     *
     * Announcing and browsing use the same socket, so the responder is created on first use and
     * released in {@link close}. A missing package is not an error - it is a system on which this
     * feature is simply not available.
     *
     * Announcing and discovering usually start at the same time, so the attempt is cached as a
     * promise. Otherwise both would import the package and both would report a missing one.
     *
     * @returns the responder, or `null` when mDNS cannot be used here
     */
    private getResponder(): Promise<MdnsResponder | null> {
        this.responderPromise ||= this.createResponder();

        return this.responderPromise;
    }

    /**
     * Do the actual loading. Called once, through {@link getResponder}.
     */
    private async createResponder(): Promise<MdnsResponder | null> {
        let Responder: MdnsResponderConstructor;

        try {
            const imported = (await import(MDNS_MODULE)) as { default?: unknown };
            // the package is CommonJS, so the class arrives as the default export under ESM
            Responder = (imported.default ?? imported) as MdnsResponderConstructor;
        } catch (e) {
            this.unavailable = true;
            this.logger.info(
                `${this.logPrefix} Host discovery: optional package "${MDNS_MODULE}" is not available (${e.message}). Other hosts can still find this one over the multihost protocol.`,
            );
            return null;
        }

        try {
            this.responder = new Responder(undefined, (err: Error) =>
                this.logger.warn(`${this.logPrefix} Host discovery: ${err.message}`),
            );
        } catch (e) {
            this.unavailable = true;
            this.logger.warn(
                `${this.logPrefix} Host discovery: cannot start mDNS (${e.message}). Other hosts can still find this one over the multihost protocol.`,
            );
            return null;
        }

        return this.responder;
    }

    /**
     * Start the periodic tick, once.
     *
     * It expires stale entries, re-queries the network and asks the controller whether the own
     * announcement is still accurate.
     */
    private ensureRefreshTimer(): void {
        this.refreshTimer ||= setInterval(() => {
            this.expire();

            try {
                this.browser?.update();
            } catch (e) {
                this.logger.debug(`${this.logPrefix} Host discovery: cannot refresh: ${e.message}`);
            }

            this.onRefresh?.();
        }, this.refreshInterval);
    }

    /**
     * Publish this host on the network, or update the announcement when the information changed.
     *
     * The service is only re-published when something actually changed. mDNS clients treat a
     * re-publish as "gone and back again", so doing it on a timer would make this host flap in the
     * list of every master.
     *
     * @param info What to announce about this host
     */
    async announce(info: AnnounceInfo): Promise<void> {
        if (
            this.announced &&
            this.announced.uuid === info.uuid &&
            this.announced.unclaimed === info.unclaimed &&
            this.announced.master === info.master
        ) {
            return;
        }

        const responder = await this.getResponder();

        if (!responder) {
            return;
        }

        this.unpublish();
        this.announced = { ...info };

        try {
            this.service = responder.publish({
                name: `ioBroker ${this.hostname}`,
                type: DISCOVERY_SERVICE_TYPE,
                protocol: 'tcp',
                port: MULTIHOST_PORT,
                txt: {
                    uuid: info.uuid,
                    host: this.hostname,
                    unclaimed: info.unclaimed ? '1' : '0',
                    master: info.master ? '1' : '0',
                    v: this.version,
                    proto: DISCOVERY_PROTOCOL_VERSION,
                },
            });
            this.ownFqdn = this.service.fqdn;
            // Browsing and announcing start independently, so our own announcement may have been
            // picked up before this name was known. Drop it now, otherwise the entry sits in the
            // list until the TTL expires it - and addHost() skips it from here on, so nothing else
            // would ever correct it.
            if (this.hosts.delete(this.ownFqdn)) {
                this.logger.debug(`${this.logPrefix} Host discovery: removed our own announcement from the list`);
                this.notifyChange();
            }
            this.ensureRefreshTimer();

            this.logger.debug(
                `${this.logPrefix} Host discovery: announced as "${this.service.name}" (unclaimed: ${info.unclaimed})`,
            );
        } catch (e) {
            this.announced = null;
            this.logger.warn(`${this.logPrefix} Host discovery: cannot announce this host: ${e.message}`);
        }
    }

    /**
     * Start listening for the announcements of the other hosts.
     *
     * The browser re-queries every {@link HostDiscoveryOptions.refreshInterval}, so a host that was
     * started while nobody was listening still shows up.
     */
    async startDiscovery(): Promise<void> {
        if (this.browser) {
            return;
        }

        const responder = await this.getResponder();

        if (!responder) {
            return;
        }

        try {
            this.browser = responder.find({ type: DISCOVERY_SERVICE_TYPE, protocol: 'tcp' });

            this.browser.on('up', service => this.addHost(service));
            this.browser.on('txt-update', service => this.addHost(service));
            this.browser.on('srv-update', service => this.addHost(service));
            this.browser.on('down', service => this.removeHost(service));

            this.ensureRefreshTimer();

            this.logger.debug(`${this.logPrefix} Host discovery: listening for other hosts`);
        } catch (e) {
            this.logger.warn(`${this.logPrefix} Host discovery: cannot start discovery: ${e.message}`);
            this.browser = null;
        }
    }

    /**
     * All hosts that are currently known, newest announcement first.
     */
    getHosts(): DiscoveredHost[] {
        return [...this.hosts.values()].sort((a, b) => b.lastSeen - a.lastSeen);
    }

    /**
     * Report the current list to the controller, at most once per {@link CHANGE_DEBOUNCE}.
     *
     * The consumer writes a state on every call, which fans out to every subscribed Admin. Without
     * this, the write rate would be whatever anybody on the network chooses to announce.
     */
    private notifyChange(): void {
        if (!this.onChange || this.changeTimer) {
            return;
        }

        this.changeTimer = setTimeout(() => {
            this.changeTimer = null;
            this.onChange?.(this.getHosts());
        }, CHANGE_DEBOUNCE);
    }

    /**
     * Turn an mDNS answer into a host entry.
     *
     * Answers without a usable IPv4 address or without our TXT layout are dropped - they belong to
     * something else that happens to use the same service type.
     *
     * @param service The service as reported by the browser
     */
    private addHost(service: MdnsService): void {
        if (service.fqdn && service.fqdn === this.ownFqdn) {
            // our own announcement
            return;
        }

        const txt = service.txt || {};

        // Anything on the network may publish this service type, so an answer has to look like ours
        // before it is stored: without these checks a foreign device lands in the list, and from
        // there in a state the Admin shows.
        if (txt.proto !== DISCOVERY_PROTOCOL_VERSION) {
            return;
        }
        if (!txt.uuid || !UUID_PATTERN.test(txt.uuid)) {
            return;
        }

        const hostname = txt.host || service.name;

        if (!hostname || hostname.length > MAX_TXT_LENGTH || (txt.v || '').length > MAX_TXT_LENGTH) {
            return;
        }

        if (txt.uuid && this.announced?.uuid === txt.uuid && hostname === this.hostname) {
            // our own announcement, seen on a second interface
            return;
        }

        const ip = (service.addresses || []).find(address => isIPv4(address));

        if (!ip) {
            this.logger.debug(`${this.logPrefix} Host discovery: "${hostname}" announced no IPv4 address, ignored`);
            return;
        }

        const host: DiscoveredHost = {
            uuid: txt.uuid || '',
            hostname,
            ip,
            port: service.port || MULTIHOST_PORT,
            unclaimed: txt.unclaimed === '1',
            master: txt.master === '1',
            version: txt.v || '',
            lastSeen: Date.now(),
        };

        const key = this.getKey(service, host);
        const known = this.hosts.get(key);

        if (!known && this.hosts.size >= MAX_HOSTS) {
            // Drop whatever was not heard from for the longest time. A real host answers the
            // re-query every 60 s and therefore stays, while entries somebody announced once age out.
            let oldestKey: string | undefined;
            let oldestSeen = Number.POSITIVE_INFINITY;
            for (const [candidate, entry] of this.hosts) {
                if (entry.lastSeen < oldestSeen) {
                    oldestSeen = entry.lastSeen;
                    oldestKey = candidate;
                }
            }
            if (oldestKey !== undefined) {
                this.hosts.delete(oldestKey);
                this.logger.debug(
                    `${this.logPrefix} Host discovery: more than ${MAX_HOSTS} hosts announced, dropped the oldest entry`,
                );
            }
        }

        this.hosts.set(key, host);

        if (
            !known ||
            known.ip !== host.ip ||
            known.unclaimed !== host.unclaimed ||
            known.master !== host.master ||
            known.uuid !== host.uuid
        ) {
            this.logger.debug(
                `${this.logPrefix} Host discovery: found "${host.hostname}" (${host.ip}), unclaimed: ${host.unclaimed}`,
            );
            this.notifyChange();
        }
    }

    /**
     * Remove a host which sent a goodbye.
     *
     * @param service The service as reported by the browser
     */
    private removeHost(service: MdnsService): void {
        const txt = service.txt || {};
        const key = this.getKey(service, { uuid: txt.uuid || '', hostname: txt.host || service.name });

        if (this.hosts.delete(key)) {
            this.notifyChange();
        }
    }

    /**
     * Key of a host in the internal map.
     *
     * The mDNS instance name is unique on the network - it is what the responders resolve conflicts
     * on - so it is the better key than the UUID, which two freshly installed hosts can share when
     * they were cloned from the same image.
     *
     * @param service The service as reported by the browser
     * @param host Identity taken from the TXT record
     * @param host.uuid Installation id of the remote host
     * @param host.hostname Name of the remote host
     */
    private getKey(service: MdnsService, host: { uuid: string; hostname: string }): string {
        return service.fqdn || `${host.hostname}:${host.uuid}`;
    }

    /**
     * Drop the hosts which did not answer for a while.
     *
     * A host that is switched off does not always manage to send a goodbye.
     */
    private expire(): void {
        const deadline = Date.now() - ENTRY_TTL;
        let changed = false;

        for (const [key, host] of this.hosts) {
            if (host.lastSeen < deadline) {
                this.hosts.delete(key);
                changed = true;
            }
        }

        if (changed) {
            this.notifyChange();
        }
    }

    /**
     * Withdraw the current announcement, if there is one.
     */
    private unpublish(): void {
        if (this.service) {
            try {
                this.service.stop();
            } catch {
                // the responder is going away anyway
            }
            this.service = null;
            this.ownFqdn = '';
        }
    }

    /**
     * Stop announcing and listening and release the socket.
     */
    async close(): Promise<void> {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }

        if (this.changeTimer) {
            clearTimeout(this.changeTimer);
            this.changeTimer = null;
        }

        if (this.browser) {
            try {
                this.browser.stop();
            } catch {
                // ignore
            }
            this.browser = null;
        }

        this.unpublish();
        this.announced = null;
        this.hosts.clear();

        const responder = this.responder;
        this.responder = null;
        this.responderPromise = null;

        if (responder) {
            await new Promise<void>(resolve => {
                try {
                    responder.destroy(() => resolve());
                } catch {
                    resolve();
                }
            });
        }
    }
}
