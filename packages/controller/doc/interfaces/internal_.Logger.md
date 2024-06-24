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

[types-dev/index.d.ts:222](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L222)

## Methods

### debug

▸ **debug**(`message`): `void`

log message with debug level

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L213)

___

### error

▸ **error**(`message`): `void`

log message with error severity

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L219)

___

### info

▸ **info**(`message`): `void`

log message with info level (default output level for all adapters)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:215](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L215)

___

### silly

▸ **silly**(`message`): `void`

log message with silly level

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:211](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L211)

___

### warn

▸ **warn**(`message`): `void`

log message with warning severity

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[types-dev/index.d.ts:217](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L217)
