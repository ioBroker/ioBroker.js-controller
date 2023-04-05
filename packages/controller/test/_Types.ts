import type { AdapterClass } from '@iobroker/js-controller-adapter';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';

export interface TestContext extends Mocha.Context {
    adapter: AdapterClass;
    states: StatesInRedisClient;
    objects: ObjectsInRedisClient;
    onAdapterStateChanged: ioBroker.StateChangeHandler;
    onAdapterFileChanged: ioBroker.FileChangeHandler;
    /** Allow to unregister handler by setting null */
    onAdapterMessage: ioBroker.MessageHandler | null;
}
