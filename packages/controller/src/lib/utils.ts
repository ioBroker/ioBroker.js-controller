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

interface GetCronExpressionOptions {
    /** The cron expression in the schedule */
    cronExpression: string;
    /** The connection type of the instance */
    connectionType?: ioBroker.ConnectionType;
}

/** Max time in seconds to delay an instance start if no seconds specified, has to be below 60 */
const MAX_SCHEDULE_DELAY = 59;

/**
 * Delay the instance start if the expression has no seconds, and it is a cloud connection
 *
 * @param options information about the cron expression and connection type
 */
export function getCronExpression(options: GetCronExpressionOptions): string {
    const { cronExpression, connectionType } = options;
    const cronHasSeconds = cronExpression.split(' ').length > 5;

    if (cronHasSeconds || connectionType !== 'cloud') {
        return cronExpression;
    }

    const randomSeconds = Math.round(Math.random() * MAX_SCHEDULE_DELAY);
    return `${randomSeconds} ${cronExpression}`;
}
