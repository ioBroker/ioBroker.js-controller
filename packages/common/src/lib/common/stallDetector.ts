import { performance } from 'node:perf_hooks';

/** Gap between two ticks after which the process counts as stalled */
export const STALL_THRESHOLD_MS = 10_000;

/** Interval of the ticks */
const TICK_INTERVAL_MS = 1_000;

/**
 * Notices that the process was frozen (VM stun, `docker pause`, SIGSTOP) by a gap between timer ticks.
 * A frozen process keeps its database sockets, so it sees no reconnect.
 */
export class StallDetector {
    #timer: NodeJS.Timeout | null = null;
    #lastMonotonic = 0;
    #lastWall = 0;

    /**
     * @param onStall called with the gap in ms after a stall
     * @param thresholdMs gap which counts as stall
     */
    constructor(
        private readonly onStall: (gapMs: number) => void,
        private readonly thresholdMs = STALL_THRESHOLD_MS,
    ) {}

    /**
     * Start watching
     */
    start(): void {
        if (this.#timer) {
            return;
        }
        this.#lastMonotonic = performance.now();
        this.#lastWall = Date.now();
        this.#timer = setInterval(() => this.tick(), TICK_INTERVAL_MS);
        this.#timer.unref();
    }

    /**
     * Stop watching
     */
    stop(): void {
        if (this.#timer) {
            clearInterval(this.#timer);
            this.#timer = null;
        }
    }

    /**
     * Compare with the previous tick, public for tests
     *
     * @param monotonic current monotonic time in ms
     * @param wall current wall clock time in ms
     */
    tick(monotonic = performance.now(), wall = Date.now()): void {
        // both clocks, as not every freeze advances the monotonic one
        const gap = Math.max(monotonic - this.#lastMonotonic, wall - this.#lastWall);
        this.#lastMonotonic = monotonic;
        this.#lastWall = wall;

        if (gap >= this.thresholdMs) {
            this.onStall(Math.round(gap));
        }
    }
}
