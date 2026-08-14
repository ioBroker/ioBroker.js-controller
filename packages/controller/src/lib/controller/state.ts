/**
 * The mutable lifecycle state of the controller
 *
 * The managers need to react on it - e.g. to stop writing states during a shutdown - but they must
 * not change it, so only the controller gets the mutating methods handed out via its own reference.
 */
export class ControllerState {
    /** Timestamp of the stop request, null if the controller is not stopping */
    #isStopping: null | number = null;
    /** If both databases are connected, null as long as there was no connection at all */
    #connected: null | boolean = null;
    /** If the instances of this host have been started */
    #started = false;

    /** Timestamp of the stop request, null if the controller is not stopping */
    get isStopping(): null | number {
        return this.#isStopping;
    }

    /** If both databases are connected, null as long as there was no connection at all */
    get connected(): null | boolean {
        return this.#connected;
    }

    /** If the instances of this host have been started */
    get started(): boolean {
        return this.#started;
    }

    /**
     * Remember that the shutdown has started, if it has not been marked before
     *
     * The timestamp of the first call is kept, because a process can receive `SIGTERM` more than once.
     */
    markStopping(): void {
        this.#isStopping = this.#isStopping ?? Date.now();
    }

    /**
     * Record the current connection state of the databases
     *
     * @param connected If both databases are connected
     */
    setConnected(connected: null | boolean): void {
        this.#connected = connected;
    }

    /**
     * Record whether the instances of this host have been started
     *
     * @param started If the instances have been started
     */
    setStarted(started: boolean): void {
        this.#started = started;
    }
}
