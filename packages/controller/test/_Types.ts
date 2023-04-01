import type { AdapterClass } from '@iobroker/js-controller-adapter';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';

export interface TestContext extends Mocha.Context {
    adapter: AdapterClass;
    states: StatesInRedisClient;
    objects: ObjectsInRedisClient;
}
