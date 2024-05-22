/// <reference types="@iobroker/types-dev" />
export * as tools from '@/lib/common/tools.js';
export { EXIT_CODES } from '@/lib/common/exitCodes.js';
export { password } from '@/lib/common/password.js';
export { logger } from '@/lib/common/logger.js';
export { defaultRedisInterview } from '@/lib/common/interview.js';
export * as constants from '@/lib/common/constants.js';
export { createAdapterStore as session } from '@/lib/common/session.js';

/** This is a backward compatibility shim, if all adapters are on adapter-core 2.6.11 or 3.1.4 remove this */
export const letsencrypt = null;
