/**
 * Holds the commands and subscription replays of a database client from a lost connection until the fence
 * confirms that this instance is still the one assigned to its host. If the fence fails, nothing held is sent.
 */
export class FenceGate {
    #held: Promise<void> | null = null;
    #release: (() => void) | null = null;
    #round: Promise<boolean> | null = null;

    /**
     * @param fence resolves true if commands may continue
     */
    constructor(private readonly fence: () => Promise<boolean>) {}

    /**
     * Hold commands from now on
     */
    close(): void {
        if (!this.#held) {
            this.#held = new Promise(resolve => (this.#release = resolve));
        }
    }

    /**
     * Resolves once commands may be sent, never if the fence failed
     */
    async passed(): Promise<void> {
        if (this.#held) {
            await this.#held;
        }
    }

    /**
     * Run the fence, one round for all sockets which reconnect at the same time
     *
     * @returns true if commands and subscriptions may continue
     */
    check(): Promise<boolean> {
        if (!this.#round) {
            this.close();
            this.#round = this.#run().finally(() => (this.#round = null));
        }
        return this.#round;
    }

    /**
     * Run the fence once and open the gate if it passes
     */
    async #run(): Promise<boolean> {
        let passed = false;
        try {
            passed = await this.fence();
        } catch {
            // a fence that cannot decide keeps the gate closed
        }

        if (passed) {
            this.#release?.();
            this.#held = null;
            this.#release = null;
        }
        return passed;
    }
}
