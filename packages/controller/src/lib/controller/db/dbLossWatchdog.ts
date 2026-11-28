/** Smallest `system.dbLossTimeout`: a probe is only answered after the first interval, so a timeout near it fires on a healthy DB */
export const MIN_DB_LOSS_TIMEOUT_MS = 5_000;

/** Everything the watchdog needs to do its work */
export interface DbLossWatchdogOptions {
    /** Time in ms a database may stay without answer before `onLoss` is called */
    timeoutMs: number;
    /** One cheap read per database, resolves if the database answered */
    probes: (() => Promise<unknown>)[];
    /** Called once if a database did not answer for `timeoutMs` */
    onLoss: (silentMs: number) => void;
    /** Interval in ms between two probes of a database */
    intervalMs?: number;
}

/**
 * Detects a database which stopped answering although its connection looks alive, e.g. a network partition in which
 * no packet arrives and the socket never closes
 */
export class DbLossWatchdog {
    readonly #timeoutMs: number;
    readonly #probes: (() => Promise<unknown>)[];
    readonly #onLoss: (silentMs: number) => void;
    readonly #intervalMs: number;

    #timer: NodeJS.Timeout | null = null;
    /** Per probe: time of the last answer */
    #lastAnswer: number[] = [];
    /** Per probe: if a probe is waiting for its answer */
    #inFlight: boolean[] = [];
    #lastTick = 0;

    /**
     * @param options Everything the watchdog needs to do its work
     */
    constructor(options: DbLossWatchdogOptions) {
        this.#timeoutMs = options.timeoutMs;
        this.#probes = options.probes;
        this.#onLoss = options.onLoss;
        this.#intervalMs = options.intervalMs ?? 1_000;
    }

    /**
     * Start probing, counting from now
     */
    start(): void {
        this.stop();
        this.#lastTick = performance.now();
        this.#lastAnswer = this.#probes.map(() => this.#lastTick);
        this.#inFlight = this.#probes.map(() => false);
        this.#timer = setInterval(() => this.#tick(), this.#intervalMs);
    }

    /**
     * Stop probing
     */
    stop(): void {
        if (this.#timer) {
            clearInterval(this.#timer);
            this.#timer = null;
        }
    }

    /**
     * Send the probes which are not waiting for an answer, and report a database without answer for too long
     */
    #tick(): void {
        const now = performance.now();
        if (now - this.#lastTick > this.#intervalMs * 2) {
            // this process was not running (e.g. a frozen VM), the databases cannot have answered meanwhile
            this.#lastAnswer = this.#lastAnswer.map(() => now);
        }
        this.#lastTick = now;

        const silentMs = now - Math.min(...this.#lastAnswer);
        if (silentMs >= this.#timeoutMs) {
            this.stop();
            this.#onLoss(silentMs);
            return;
        }

        this.#probes.forEach((probe, i) => {
            if (this.#inFlight[i]) {
                return;
            }
            this.#inFlight[i] = true;
            probe()
                .then(
                    () => (this.#lastAnswer[i] = performance.now()),
                    () => {
                        // an error is no answer from a usable database
                    },
                )
                .finally(() => (this.#inFlight[i] = false));
        });
    }
}
