/**
 * Get disk warning level from state
 *
 * @param state disk warning state, normally with value of type number in %
 * @returns The new disk warning level in %
 */
export function getDiskWarningLevel(state: ioBroker.State): number {
    let warningLevel = 0;
    if (typeof state.val === 'number' && state.val <= 100 && state.val >= 0) {
        warningLevel = state.val;
    }

    return warningLevel;
}

/** Default value for disk warning level */
export const DEFAULT_DISK_WARNING_LEVEL = 5;
