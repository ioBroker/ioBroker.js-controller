[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / STATE\_QUALITY

# Enumeration: STATE\_QUALITY

[\<internal\>](../modules/internal_.md).STATE_QUALITY

Two-way mapping for state quality ("q" attribute of a state)

## Table of contents

### Enumeration Members

- [BAD](internal_.STATE_QUALITY.md#bad)
- [CONNECTION\_PROBLEM](internal_.STATE_QUALITY.md#connection_problem)
- [DEVICE\_ERROR\_REPORT](internal_.STATE_QUALITY.md#device_error_report)
- [DEVICE\_NOT\_CONNECTED](internal_.STATE_QUALITY.md#device_not_connected)
- [GENERAL\_DEVICE\_PROBLEM](internal_.STATE_QUALITY.md#general_device_problem)
- [GENERAL\_INSTANCE\_PROBLEM](internal_.STATE_QUALITY.md#general_instance_problem)
- [GENERAL\_SENSOR\_PROBLEM](internal_.STATE_QUALITY.md#general_sensor_problem)
- [GOOD](internal_.STATE_QUALITY.md#good)
- [INSTANCE\_NOT\_CONNECTED](internal_.STATE_QUALITY.md#instance_not_connected)
- [SENSOR\_ERROR\_REPORT](internal_.STATE_QUALITY.md#sensor_error_report)
- [SENSOR\_NOT\_CONNECTED](internal_.STATE_QUALITY.md#sensor_not_connected)
- [SUBSTITUTE\_DEVICE\_INSTANCE\_VALUE](internal_.STATE_QUALITY.md#substitute_device_instance_value)
- [SUBSTITUTE\_FROM\_CONTROLLER](internal_.STATE_QUALITY.md#substitute_from_controller)
- [SUBSTITUTE\_INITIAL\_VALUE](internal_.STATE_QUALITY.md#substitute_initial_value)
- [SUBSTITUTE\_SENSOR\_VALUE](internal_.STATE_QUALITY.md#substitute_sensor_value)

## Enumeration Members

### BAD

• **BAD** = ``1``

General problem

#### Defined in

[adapter/src/lib/adapter/constants.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L22)

___

### CONNECTION\_PROBLEM

• **CONNECTION\_PROBLEM** = ``2``

The instance cannot establish a connection

#### Defined in

[adapter/src/lib/adapter/constants.ts:24](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L24)

___

### DEVICE\_ERROR\_REPORT

• **DEVICE\_ERROR\_REPORT** = ``68``

The device has reported an error

#### Defined in

[adapter/src/lib/adapter/constants.ts:46](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L46)

___

### DEVICE\_NOT\_CONNECTED

• **DEVICE\_NOT\_CONNECTED** = ``66``

The device is not connected

#### Defined in

[adapter/src/lib/adapter/constants.ts:42](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L42)

___

### GENERAL\_DEVICE\_PROBLEM

• **GENERAL\_DEVICE\_PROBLEM** = ``65``

General problem by device

#### Defined in

[adapter/src/lib/adapter/constants.ts:36](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L36)

___

### GENERAL\_INSTANCE\_PROBLEM

• **GENERAL\_INSTANCE\_PROBLEM** = ``17``

General problem by instance

#### Defined in

[adapter/src/lib/adapter/constants.ts:34](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L34)

___

### GENERAL\_SENSOR\_PROBLEM

• **GENERAL\_SENSOR\_PROBLEM** = ``129``

General problem by sensor

#### Defined in

[adapter/src/lib/adapter/constants.ts:38](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L38)

___

### GOOD

• **GOOD** = ``0``

The default value for a state

#### Defined in

[adapter/src/lib/adapter/constants.ts:20](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L20)

___

### INSTANCE\_NOT\_CONNECTED

• **INSTANCE\_NOT\_CONNECTED** = ``18``

The instance is not connected

#### Defined in

[adapter/src/lib/adapter/constants.ts:40](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L40)

___

### SENSOR\_ERROR\_REPORT

• **SENSOR\_ERROR\_REPORT** = ``132``

The sensor has reported an error

#### Defined in

[adapter/src/lib/adapter/constants.ts:48](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L48)

___

### SENSOR\_NOT\_CONNECTED

• **SENSOR\_NOT\_CONNECTED** = ``130``

The sensor is not connected

#### Defined in

[adapter/src/lib/adapter/constants.ts:44](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L44)

___

### SUBSTITUTE\_DEVICE\_INSTANCE\_VALUE

• **SUBSTITUTE\_DEVICE\_INSTANCE\_VALUE** = ``64``

Substitute value from instance or device

#### Defined in

[adapter/src/lib/adapter/constants.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L30)

___

### SUBSTITUTE\_FROM\_CONTROLLER

• **SUBSTITUTE\_FROM\_CONTROLLER** = ``16``

Substitute value from controller. Do not set this in adapters

#### Defined in

[adapter/src/lib/adapter/constants.ts:26](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L26)

___

### SUBSTITUTE\_INITIAL\_VALUE

• **SUBSTITUTE\_INITIAL\_VALUE** = ``32``

Quality for default values

#### Defined in

[adapter/src/lib/adapter/constants.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L28)

___

### SUBSTITUTE\_SENSOR\_VALUE

• **SUBSTITUTE\_SENSOR\_VALUE** = ``128``

Substitute value from a sensor

#### Defined in

[adapter/src/lib/adapter/constants.ts:32](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/constants.ts#L32)
