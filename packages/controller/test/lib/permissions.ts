/**
 * Translations from linux file permissions to ioBroker
 * Linux is like "owner,user in group,user outside group", 6 = rw; 4 = w; 2 = r
 */
export const PERMISSIONS = {
    // Only owner can read/write
    '0600': 1536,
    // Everyone can read/write
    '0666': 1638,
    // User outside group can only write
    '0664': 1636,
} as const;
