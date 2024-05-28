export {
    getStatesConstructor,
    statesDbHasServer,
    isLocalStatesDbServer,
    performStatesInterview
} from '@/lib/common/states.js';
export {
    getObjectsConstructor,
    objectsDbHasServer,
    isLocalObjectsDbServer,
    performObjectsInterview
} from '@/lib/common/objects.js';
export { NotificationHandler } from '@/lib/common/notificationHandler.js';
export * from '@iobroker/js-controller-common-db';

/** Shim until all adapters are using adapter-core 3.1.4 or higher */
export const letsencrypt = true;
