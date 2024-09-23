export function createDefaults(): Record<string, Partial<ioBroker.StateCommon>> {
    return {
        'level.dimmer': {
            type: 'number',
            read: true,
            write: true,
            min: 0,
            max: 100,
            unit: '%',
        },
        'indicator.working': {
            def: false,
            type: 'boolean',
            read: true,
            write: false,
        },
        'indicator.maintenance': {
            def: false,
            type: 'boolean',
            read: true,
            write: false,
        },
        'indicator.maintenance.lowbat': {
            def: false,
            type: 'boolean',
            read: true,
            write: false,
            desc: 'Low battery',
        },
        'indicator.maintenance.unreach': {
            def: false,
            type: 'boolean',
            read: true,
            write: false,
            desc: 'Device unreachable',
        },
        switch: {
            type: 'boolean',
            read: true,
            write: true,
        },
    } as const;
}
