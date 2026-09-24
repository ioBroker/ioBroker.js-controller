/** Adapters which are able to hold vis projects */
export const VIS_ADAPTERS = ['vis', 'vis-2'] as const;

/** Suffix which is added to the host id of a compact group controller */
export const COMPACT_GROUP_OBJECT_PREFIX = '.compactgroup';

/** How long the primary host lock is valid, it is renewed after half of the time */
export const PRIMARY_HOST_LOCK_TIME = 60_000;

/** File which is created by the vendor bootstrap process */
export const VENDOR_BOOTSTRAP_FILE = '/opt/iobroker/iob-vendor-secret.json';

/** File which contains the vendor information */
export const VENDOR_FILE = '/etc/iob-vendor.json';
