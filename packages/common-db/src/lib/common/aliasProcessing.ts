interface ApplyAliasTransformerOptions {
    /** State used for calculations */
    state: ioBroker.State;
    /** Properties from this StateCommon will be provided first to the conversion function */
    firstCommon: Partial<ioBroker.StateCommon>;
    /** Properties from this StateCommon will be provided second to the conversion function */
    secondCommon: Partial<ioBroker.StateCommon>;
    /** The actual transformer function as a string */
    transformer: string;
    /** If this is a read function, determines the naming of the passed variables */
    isRead: boolean;
}

interface ApplyAliasConvenienceConversionOptions {
    /** State used for calculations */
    state: ioBroker.State;
    /** The common attribute of the alias target */
    targetCommon?: Partial<ioBroker.StateCommon>;
}

interface ApplyAliasAutoScalingOptions extends ApplyAliasConvenienceConversionOptions {
    /** The common attribute of the alias source */
    sourceCommon?: Partial<ioBroker.StateCommon>;
}

/**
 * Applies a user-given transformer function and provides the type, min and max of the
 * passed StateCommon variables as well as the state's value
 *
 * @param options state, common information and transformer function
 */
export function applyAliasTransformer(options: ApplyAliasTransformerOptions): ioBroker.StateValue {
    const { state, firstCommon, secondCommon, transformer, isRead } = options;

    const prefix = isRead ? 's' : 't';

    const func = new Function(
        'val',
        'type',
        'min',
        'max',
        `${prefix}Type`,
        `${prefix}Min`,
        `${prefix}Max`,
        `return ${transformer}`,
    );

    return func(
        state.val,
        firstCommon.type,
        firstCommon.min,
        firstCommon.max,
        secondCommon.type,
        secondCommon.min,
        secondCommon.max,
    );
}

/**
 * Applies some convenience conversions of aliases, e.g. transforming string 'off' to a boolean false, if target is a boolean
 *
 * @param options state and target common information
 */
export function applyAliasConvenienceConversion(options: ApplyAliasConvenienceConversionOptions): ioBroker.StateValue {
    const { targetCommon, state } = options;

    if (targetCommon && typeof state.val !== targetCommon.type && state.val !== null) {
        if (targetCommon.type === 'boolean') {
            const lowerVal = typeof state.val === 'string' ? state.val.toLowerCase() : state.val;
            if (lowerVal === 'off' || lowerVal === 'aus' || state.val === '0') {
                return false;
            }
            // this also handles strings like "EIN" or such that will be true
            return !!state.val;
        } else if (targetCommon.type === 'number' && typeof state.val === 'string') {
            return parseFloat(state.val);
        } else if (targetCommon.type === 'string') {
            return state.val.toString();
        }
    }

    return state.val;
}

/**
 * Applies autoscaling between alias source and target if one has % unit and the other not
 *
 * @param options state, source and target common information
 */
export function applyAliasAutoScaling(options: ApplyAliasAutoScalingOptions): ioBroker.StateValue {
    const { state, sourceCommon, targetCommon } = options;

    // auto-scaling, only if val not null and unit for target (x)or source is %
    if (
        ((targetCommon?.alias && !targetCommon.alias.read) || (sourceCommon?.alias && !sourceCommon.alias.write)) &&
        state.val !== null
    ) {
        if (
            targetCommon &&
            targetCommon.type === 'number' &&
            targetCommon.unit === '%' &&
            sourceCommon &&
            sourceCommon.type === 'number' &&
            sourceCommon.unit !== '%' &&
            sourceCommon.min !== undefined &&
            sourceCommon.max !== undefined
        ) {
            // scale target between 0 and 100 % based on sources min/max
            return (((state.val as number) - sourceCommon.min) / (sourceCommon.max - sourceCommon.min)) * 100;
        } else if (
            sourceCommon &&
            sourceCommon.type === 'number' &&
            sourceCommon.unit === '%' &&
            targetCommon &&
            targetCommon.unit !== '%' &&
            targetCommon.type === 'number' &&
            targetCommon.min !== undefined &&
            targetCommon.max !== undefined
        ) {
            // scale target based on its min/max by its source (assuming source is meant to be 0 - 100 %)
            return ((targetCommon.max - targetCommon.min) * (state.val as number)) / 100 + targetCommon.min;
        }
    }

    return state.val;
}
