[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / STATE\_QUALITY

# Enumeration: STATE\_QUALITY

[<internal>](../modules/internal_.md).STATE_QUALITY

Two-way mapping for state quality ("q" attribute of a state)

## Table of contents

### Enumeration Members

- [BAD](internal_.STATE_QUALITY-1.md#bad)
- [CONNECTION\_PROBLEM](internal_.STATE_QUALITY-1.md#connection_problem)
- [DEVICE\_ERROR\_REPORT](internal_.STATE_QUALITY-1.md#device_error_report)
- [DEVICE\_NOT\_CONNECTED](internal_.STATE_QUALITY-1.md#device_not_connected)
- [GENERAL\_DEVICE\_PROBLEM](internal_.STATE_QUALITY-1.md#general_device_problem)
- [GENERAL\_INSTANCE\_PROBLEM](internal_.STATE_QUALITY-1.md#general_instance_problem)
- [GENERAL\_SENSOR\_PROBLEM](internal_.STATE_QUALITY-1.md#general_sensor_problem)
- [GOOD](internal_.STATE_QUALITY-1.md#good)
- [INSTANCE\_NOT\_CONNECTED](internal_.STATE_QUALITY-1.md#instance_not_connected)
- [SENSOR\_ERROR\_REPORT](internal_.STATE_QUALITY-1.md#sensor_error_report)
- [SENSOR\_NOT\_CONNECTED](internal_.STATE_QUALITY-1.md#sensor_not_connected)
- [SUBSTITUTE\_DEVICE\_INSTANCE\_VALUE](internal_.STATE_QUALITY-1.md#substitute_device_instance_value)
- [SUBSTITUTE\_FROM\_CONTROLLER](internal_.STATE_QUALITY-1.md#substitute_from_controller)
- [SUBSTITUTE\_INITIAL\_VALUE](internal_.STATE_QUALITY-1.md#substitute_initial_value)
- [SUBSTITUTE\_SENSOR\_VALUE](internal_.STATE_QUALITY-1.md#substitute_sensor_value)

## Enumeration Members

### BAD

• **BAD** = ``1``

General problem

#### Defined in

[types-dev/index.d.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L21)

___

### CONNECTION\_PROBLEM

• **CONNECTION\_PROBLEM** = ``2``

The instance cannot establish a connection

#### Defined in

[types-dev/index.d.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L23)

___

### DEVICE\_ERROR\_REPORT

• **DEVICE\_ERROR\_REPORT** = ``68``

The device has reported an error

#### Defined in

[types-dev/index.d.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L45)

___

### DEVICE\_NOT\_CONNECTED

• **DEVICE\_NOT\_CONNECTED** = ``66``

The device is not connected

#### Defined in

[types-dev/index.d.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L41)

___

### GENERAL\_DEVICE\_PROBLEM

• **GENERAL\_DEVICE\_PROBLEM** = ``65``

General problem by device

#### Defined in

[types-dev/index.d.ts:35](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L35)

___

### GENERAL\_INSTANCE\_PROBLEM

• **GENERAL\_INSTANCE\_PROBLEM** = ``17``

General problem by instance

#### Defined in

[types-dev/index.d.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L33)

___

### GENERAL\_SENSOR\_PROBLEM

• **GENERAL\_SENSOR\_PROBLEM** = ``129``

General problem by sensor

#### Defined in

[types-dev/index.d.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L37)

___

### GOOD

• **GOOD** = ``0``

The default value for a state

#### Defined in

[types-dev/index.d.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L19)

___

### INSTANCE\_NOT\_CONNECTED

• **INSTANCE\_NOT\_CONNECTED** = ``18``

The instance is not connected

#### Defined in

[types-dev/index.d.ts:39](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L39)

___

### SENSOR\_ERROR\_REPORT

• **SENSOR\_ERROR\_REPORT** = ``132``

The sensor has reported an error

#### Defined in

[types-dev/index.d.ts:47](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L47)

___

### SENSOR\_NOT\_CONNECTED

• **SENSOR\_NOT\_CONNECTED** = ``130``

The sensor is not connected

#### Defined in

[types-dev/index.d.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L43)

___

### SUBSTITUTE\_DEVICE\_INSTANCE\_VALUE

• **SUBSTITUTE\_DEVICE\_INSTANCE\_VALUE** = ``64``

Substitute value from instance or device

#### Defined in

[types-dev/index.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L29)

___

### SUBSTITUTE\_FROM\_CONTROLLER

• **SUBSTITUTE\_FROM\_CONTROLLER** = ``16``

Substitute value from controller, do not set this in adapters

#### Defined in

[types-dev/index.d.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L25)

___

### SUBSTITUTE\_INITIAL\_VALUE

• **SUBSTITUTE\_INITIAL\_VALUE** = ``32``

Quality for default values

#### Defined in

[types-dev/index.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L27)

___

### SUBSTITUTE\_SENSOR\_VALUE

• **SUBSTITUTE\_SENSOR\_VALUE** = ``128``

Substitute value from a sensor

#### Defined in

[types-dev/index.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/fb48eb1c/packages/types-dev/index.d.ts#L31)
