import type Winston from 'winston';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { UserInterfaceMessagingController } from '@/lib/adapter/userInterfaceMessagingController.js';

/**
 * Live view of the adapter's shared runtime state, passed to managers at construction time.
 *
 * The mutable fields are exposed as getter properties so late-bound values (DB clients,
 * namespace, host) stay live: the adapter builds one context whose getters read its own
 * fields, and every manager reads the same object.
 */
export interface AdapterContext {
    /** Current states DB client */
    readonly states: StatesInRedisClient | null | undefined;
    /** Current objects DB client */
    readonly objects: ObjectsInRedisClient | null | undefined;
    /** Current adapter common config */
    readonly common: ioBroker.InstanceCommon | undefined;
    /** Current adapter instance config (native) */
    readonly config: ioBroker.AdapterConfig;
    /** Current host name (may be undefined before init) */
    readonly host: string | undefined;
    /** Current adapter namespace, e.g. `"adapter.0"` */
    readonly namespace: `${string}.${number}`;
    /** Current namespace string used in log messages */
    readonly namespaceLog: string;
    /** Logger instance */
    readonly logger: Winston.Logger;
    /** Controller for UI messaging */
    readonly uiMessagingController: UserInterfaceMessagingController;
}
