[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / Logger

# Interface: Logger

[\<internal\>](../modules/internal_.md).Logger

## Implemented by

- [`Log`](../classes/internal_.Log.md)

## Table of contents

### Properties

- [level](internal_.Logger.md#level)

### Methods

- [debug](internal_.Logger.md#debug)
- [error](internal_.Logger.md#error)
- [info](internal_.Logger.md#info)
- [silly](internal_.Logger.md#silly)
- [warn](internal_.Logger.md#warn)

## Properties

### level

• **level**: [`LogLevel`](../modules/internal_.md#loglevel)

Verbosity of the log output

#### Defined in

[types-dev/index.d.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L219)

## Methods

### debug

▸ **debug**(`message`): `void`

log a message with debug level

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:210](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L210)

___

### error

▸ **error**(`message`): `void`

log a message with error severity

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:216](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L216)

___

### info

▸ **info**(`message`): `void`

log a message with info level (default output level for all adapters)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:212](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L212)

___

### silly

▸ **silly**(`message`): `void`

log a message with silly level

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:208](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L208)

___

### warn

▸ **warn**(`message`): `void`

log a message with warning severity

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:214](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L214)
