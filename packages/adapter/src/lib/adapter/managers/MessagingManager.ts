import type Winston from 'winston';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { UserInterfaceMessagingController } from '../userInterfaceMessagingController.js';
import type { MessageCallbackObject } from '../../_Types.js';

export type Validated<T> = { ok: true; value: T } | { ok: false; error: Error };

/** Dependencies injected into MessagingManager at construction time. */
export interface MessagingManagerDeps {
    readonly namespace: `${string}.${number}`;
    readonly namespaceLog: string;
    readonly logger: Winston.Logger;
    readonly uiMessagingController: UserInterfaceMessagingController;
    getStates: () => StatesInRedisClient | null | undefined;
    getObjects: () => ObjectsInRedisClient | null | undefined;
    getCommon: () => ioBroker.InstanceCommon | undefined;
}

/** Owns the adapter's outbound messaging and the pending message-callback registry. */
export class MessagingManager {
    readonly #callbacks = new Map<number, MessageCallbackObject>();
    #callbackId = 1;
    #mboxSubscribed = false;

    constructor(private readonly deps: MessagingManagerDeps) {}
}
