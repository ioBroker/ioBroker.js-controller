'use strict';

function createDefaults(_lang, _temperature, _currency) {
    const defaults = {
        'level.dimmer': {
            'type':  'number',
            'read':  true,
            'write': true,
            'min':   0,
            'max':   100,
            'unit':  '%'
        },
        'indicator.working': {
            'def':   false,
            'type':  'boolean',
            'read':  true,
            'write': false,
            'min':   false,
            'max':   true
        },
        'indicator.maintenance': {
            'def':   false,
            'type':  'boolean',
            'read':  true,
            'write': false,
            'min':   false,
            'max':   true
        },
        'indicator.maintenance.lowbat': {
            'def':   false,
            'type':  'boolean',
            'read':  true,
            'write': false,
            'min':   false,
            'max':   true,
            'desc':  'Low battery'
        },
        'indicator.maintenance.unreach': {
            'def':   false,
            'type':  'boolean',
            'read':  true,
            'write': false,
            'min':   false,
            'max':   true,
            'desc':  'Device unreachable'
        },
        'switch':  {
            'type':  'boolean',
            'read':  true,
            'write': true
        }
    };

    return defaults;
}

module.exports = createDefaults;
