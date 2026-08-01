import os from 'node:os';
import { isDeepStrictEqual } from 'node:util';
import { tools } from '@iobroker/js-controller-common';
import { SYSTEM_HOST_PREFIX } from '@iobroker/js-controller-common-db/constants';
import type { Controller } from '@/lib/controller/controller.js';

/** Interval to detect the IPs at the start of the controller, because of DHCP */
const INITIAL_IP_CHECK_INTERVAL = 30_000;
/** Interval to detect the IPs during normal operation */
const IP_CHECK_INTERVAL = 3_600_000;
/** After this time the initial IP check interval is replaced by the normal one */
const INITIAL_IP_CHECK_DURATION = 5 * 60_000;
/** How often we try to detect an IPv4 address before giving up */
const MAX_IP_DETECTION_TRIES = 10;

/**
 * Keeps the IP addresses of the host object up to date
 */
export class IpManager {
    /** How often we have tried to detect an IPv4 address */
    private detectIpsCount = 0;
    /** Timer for the cyclic update of the IPs */
    private updateIPsTimer: NodeJS.Timeout | null = null;

    /**
     * @param controller The controller this IP manager belongs to
     */
    constructor(private readonly controller: Controller) {}

    /**
     * Starts cyclic update of IP interfaces.
     * At start every 30 seconds and after 5 minutes, every hour.
     * Because DHCP could change the IPs.
     */
    private startUpdateIPs(): void {
        if (this.updateIPsTimer) {
            return;
        }

        this.updateIPsTimer = setInterval(() => {
            if (Date.now() - this.controller.uptimeStart > INITIAL_IP_CHECK_DURATION) {
                // 5 minutes at start check every 30 seconds because of DHCP
                clearInterval(this.updateIPsTimer!);

                // update IPs every hour
                this.updateIPsTimer = setInterval(() => this.updateIPs(), IP_CHECK_INTERVAL);
            }
            this.updateIPs();
        }, INITIAL_IP_CHECK_INTERVAL);
    }

    /**
     * Determine and store the current IPs, log a potential error
     */
    private updateIPs(): void {
        const { logger, hostLogPrefix } = this.controller;

        this.setIPs().catch(e => logger.error(`${hostLogPrefix} Cannot update IP addresses: ${e.message}`));
    }

    /**
     * Store the host IP addresses in the objects database
     *
     * Checks if some IPv4 address is found. If not, it tries again in 30 seconds (max 10 times)
     *
     * @param ipList The list of IP addresses to store; if omitted, the current addresses are determined
     */
    async setIPs(ipList?: string[]): Promise<void> {
        const { objects, logger, hostLogPrefix, hostObjectPrefix, hostname } = this.controller;

        if (this.controller.isStopping) {
            return;
        }

        const _ipList = ipList || tools.findIPs();

        // check if IPs detected (because of DHCP delay)
        let found = false;
        for (const entry of _ipList) {
            if (entry === '127.0.0.1' || entry === '::1/128') {
                continue;
            }
            found = true;
            break;
        }

        // IPv4 address still not found, try again in 30 seconds
        if (!found && this.detectIpsCount < MAX_IP_DETECTION_TRIES) {
            this.detectIpsCount++;
            setTimeout(() => this.updateIPs(), INITIAL_IP_CHECK_INTERVAL);
            return;
        }

        if (!found) {
            logger.info(`${hostLogPrefix} No IPv4 address found after 5 minutes.`);
            return;
        }

        // IPv4 found => write to object
        let oldObj: ioBroker.HostObject | null | undefined;
        try {
            oldObj = await objects!.getObject(`${SYSTEM_HOST_PREFIX}${hostname}`);
        } catch (e) {
            logger.error(`${hostLogPrefix} Cannot read host object: ${e.message}`);
        }

        const networkInterfaces = os.networkInterfaces();

        if (
            oldObj?.common &&
            oldObj.native?.hardware &&
            (!isDeepStrictEqual(oldObj.native.hardware.networkInterfaces, networkInterfaces) ||
                !isDeepStrictEqual(oldObj.common.address, _ipList))
        ) {
            oldObj.common.address = _ipList;
            oldObj.native.hardware.networkInterfaces = networkInterfaces;
            oldObj.from = hostObjectPrefix;
            oldObj.ts = Date.now();

            try {
                await objects!.setObject(oldObj._id, oldObj);
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot write host object: ${e.message}`);
            }
        }

        // update IP list periodically
        this.startUpdateIPs();
    }

    /**
     * Stop the cyclic update of the IPs
     */
    close(): void {
        if (this.updateIPsTimer) {
            clearInterval(this.updateIPsTimer);
            this.updateIPsTimer = null;
        }
    }
}
