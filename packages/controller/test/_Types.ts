/// <reference types="@iobroker/types-dev" />
import type { AdapterClass } from '@iobroker/js-controller-adapter';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';

export interface TestContext extends Mocha.Context {
    /** The adapter instance */
    adapter: AdapterClass;
    /** The states DB */
    states: StatesInRedisClient;
    /** The objects db */
    objects: ObjectsInRedisClient;
    /** Allow to unregister handler by setting null */
    onAdapterStateChanged: ioBroker.StateChangeHandler | null;
    /** Allow to unregister handler by setting null */
    onAdapterFileChanged: ioBroker.FileChangeHandler | null;
    /** Allow to unregister handler by setting null */
    onAdapterMessage: ioBroker.MessageHandler | null;
    /** Allow to unregister handler by setting null */
    onAdapterObjectChanged: ioBroker.ObjectChangeHandler | null;
}
