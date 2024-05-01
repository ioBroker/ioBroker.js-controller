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

/** Max time in seconds to delay an instance start if no seconds specified, has to be below 60 */
const MAX_SCHEDULE_DELAY = 59;

/**
 * Delay the instance start if the expression has no seconds
 *
 * @param cronExpression the cron expression in the schedule
 */
export function getCronExpression(cronExpression: string): string {
    const cronHasSeconds = cronExpression.split(' ').length > 5;

    if (cronHasSeconds) {
        return cronExpression;
    }

    const randomSeconds = Math.round(Math.random() * MAX_SCHEDULE_DELAY);
    return `${randomSeconds} ${cronExpression}`;
}
