import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { tools } from '@iobroker/js-controller-common';

/**
 * Base class for adapter managers that read from the shared {@link AdapterContext}.
 *
 * Holds the context in a private `#ctx` field so subclasses cannot bypass the connection-checked
 * getters and reach the raw (possibly null) DB clients directly. Access to `states`/`objects` goes
 * through the throwing getters, which raise `ERROR_DB_CLOSED` when the respective database is not
 * connected; the other getters pass ctx values through unchanged.
 *
 * Getters are `protected` because `#` privates are not visible to subclasses.
 */
export abstract class AdapterContextBase {
    readonly #ctx: AdapterContext;

    /**
     * @param ctx Shared adapter context providing live runtime state
     */
    constructor(ctx: AdapterContext) {
        this.#ctx = ctx;
    }

    /**
     * The connected states DB client.
     *
     * @throws {Error} `ERROR_DB_CLOSED` when the states database is not connected.
     */
    protected get states(): StatesInRedisClient {
        const states = this.#ctx.states;
        if (!states) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }
        return states;
    }

    /**
     * The connected objects DB client.
     *
     * @throws {Error} `ERROR_DB_CLOSED` when the objects database is not connected.
     */
    protected get objects(): ObjectsInRedisClient {
        const objects = this.#ctx.objects;
        if (!objects) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }
        return objects;
    }

    /** Current adapter common config */
    protected get common(): ioBroker.InstanceCommon | undefined {
        return this.#ctx.common;
    }

    /** Current host name (may be undefined before init) */
    protected get host(): string | undefined {
        return this.#ctx.host;
    }

    /** Current adapter namespace, e.g. `"adapter.0"` */
    protected get namespace(): `${string}.${number}` {
        return this.#ctx.namespace;
    }

    /** Current namespace string used in log messages */
    protected get namespaceLog(): string {
        return this.#ctx.namespaceLog;
    }

    /** Logger instance */
    protected get logger(): AdapterContext['logger'] {
        return this.#ctx.logger;
    }

    /** Controller for UI messaging */
    protected get uiMessagingController(): AdapterContext['uiMessagingController'] {
        return this.#ctx.uiMessagingController;
    }
}
