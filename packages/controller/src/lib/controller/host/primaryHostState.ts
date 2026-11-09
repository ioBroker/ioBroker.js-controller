import type { Client as StatesClient } from '@iobroker/db-states-redis';

/**
 * Publishes whether this host holds the primary host lock as `system.host.<name>.isPrimary`
 */
export class PrimaryHostState {
    readonly #hostObjectPrefix: ioBroker.ObjectIDs.Host;
    readonly #expireSeconds: number;
    #published: boolean | null = null;

    /**
     * @param hostObjectPrefix the id of the host object, e.g. `system.host.iob-a`
     * @param lockTimeMs how long the primary host lock lives without renewal
     */
    constructor(hostObjectPrefix: ioBroker.ObjectIDs.Host, lockTimeMs: number) {
        this.#hostObjectPrefix = hostObjectPrefix;
        this.#expireSeconds = Math.ceil(lockTimeMs / 1_000);
    }

    /**
     * Write the current role. `true` expires like the lock, so a host that dies or freezes does not stay primary.
     *
     * @param states the connected states database client
     * @param isPrimary if this host currently holds the primary host lock
     */
    async publish(states: StatesClient, isPrimary: boolean): Promise<void> {
        if (!isPrimary && this.#published === false) {
            return;
        }

        await states.setState(`${this.#hostObjectPrefix}.isPrimary`, {
            val: isPrimary,
            ack: true,
            from: this.#hostObjectPrefix,
            ...(isPrimary ? { expire: this.#expireSeconds } : {}),
        });
        this.#published = isPrimary;
    }
}
