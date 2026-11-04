/// <reference types="@iobroker/types-dev" />
export { execute } from '@/lib/setup.js';
export { dbConnectAsync } from '@/lib/setup/dbConnection.js';
export { Vendor } from '@/lib/setup/setupVendor.js';
export { Upload } from '@/lib/setup/setupUpload.js';
export { Upgrade } from '@/lib/setup/setupUpgrade.js';
export { Install } from '@/lib/setup/setupInstall.js';
export { BackupRestore } from '@/lib/setup/setupBackup.js';
export { PacketManager, type UpgradePacket } from '@/lib/setup/setupPacketManager.js';
export {
    checkAdapterCompatibility,
    type AdapterCompatibilityInput,
    type AdapterCompatibilityProblem,
} from '@/lib/setup/adapterCompatibility.js';
export type * from '@/lib/_Types.js';
