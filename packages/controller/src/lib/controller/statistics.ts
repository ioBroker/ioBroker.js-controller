/**
 * Counts the state changes this host has received and the state writes it has performed
 *
 * The values are reported into `<host>.inputCount` and `<host>.outputCount` and reset afterwards.
 */
export class Statistics {
    /** Number of state changes since the last report */
    #inputCount = 0;
    /** Number of state writes since the last report */
    #outputCount = 0;

    /** Number of state changes since the last report */
    get inputCount(): number {
        return this.#inputCount;
    }

    /** Number of state writes since the last report */
    get outputCount(): number {
        return this.#outputCount;
    }

    /**
     * Count state changes which this host has received
     *
     * @param inc Number of state changes to add, defaults to one
     */
    countInput(inc = 1): void {
        this.#inputCount += inc;
    }

    /**
     * Count state writes which this host has performed
     *
     * @param inc Number of state writes to add, defaults to one
     */
    countOutput(inc = 1): void {
        this.#outputCount += inc;
    }

    /**
     * Start counting from zero again, called after the counters have been reported
     */
    reset(): void {
        this.#inputCount = 0;
        this.#outputCount = 0;
    }
}
