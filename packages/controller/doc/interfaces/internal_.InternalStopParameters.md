[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / InternalStopParameters

# Interface: InternalStopParameters

[\<internal\>](../modules/internal_.md).InternalStopParameters

## Hierarchy

- [`StopParameters`](internal_.StopParameters.md)

  ↳ **`InternalStopParameters`**

## Table of contents

### Properties

- [exitCode](internal_.InternalStopParameters.md#exitcode)
- [isPause](internal_.InternalStopParameters.md#ispause)
- [isScheduled](internal_.InternalStopParameters.md#isscheduled)
- [reason](internal_.InternalStopParameters.md#reason)
- [updateAliveState](internal_.InternalStopParameters.md#updatealivestate)

## Properties

### exitCode

• `Optional` **exitCode**: `number`

Specify an optional exit code

#### Inherited from

[StopParameters](internal_.StopParameters.md).[exitCode](internal_.StopParameters.md#exitcode)

#### Defined in

[adapter/src/lib/_Types.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/_Types.ts#L581)

___

### isPause

• `Optional` **isPause**: `boolean`

If mode is schedule or once

#### Defined in

[adapter/src/lib/_Types.ts:588](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/_Types.ts#L588)

___

### isScheduled

• `Optional` **isScheduled**: `boolean`

If it has a restart schedule running

#### Defined in

[adapter/src/lib/_Types.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/_Types.ts#L590)

___

### reason

• `Optional` **reason**: `string`

Specify an optional reason for stoppage

#### Inherited from

[StopParameters](internal_.StopParameters.md).[reason](internal_.StopParameters.md#reason)

#### Defined in

[adapter/src/lib/_Types.ts:583](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/_Types.ts#L583)

___

### updateAliveState

• `Optional` **updateAliveState**: `boolean`

If alive state should be updated, if undefined defaults to true

#### Defined in

[adapter/src/lib/_Types.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/_Types.ts#L592)
