export = createDefaults;
declare function createDefaults(_lang: any, _temperature: any, _currency: any): {
    'level.dimmer': {
        type: string;
        read: boolean;
        write: boolean;
        min: number;
        max: number;
        unit: string;
    };
    'indicator.working': {
        def: boolean;
        type: string;
        read: boolean;
        write: boolean;
        min: boolean;
        max: boolean;
    };
    'indicator.maintenance': {
        def: boolean;
        type: string;
        read: boolean;
        write: boolean;
        min: boolean;
        max: boolean;
    };
    'indicator.maintenance.lowbat': {
        def: boolean;
        type: string;
        read: boolean;
        write: boolean;
        min: boolean;
        max: boolean;
        desc: string;
    };
    'indicator.maintenance.unreach': {
        def: boolean;
        type: string;
        read: boolean;
        write: boolean;
        min: boolean;
        max: boolean;
        desc: string;
    };
    switch: {
        type: string;
        read: boolean;
        write: boolean;
    };
};
//# sourceMappingURL=defaultObjs.d.ts.map