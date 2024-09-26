[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / Log

# Class: Log

[\<internal\>](../modules/internal_.md).Log

Log class for adapter.js

It prefixes every message with the given namespace

## Implements

- [`Logger`](../interfaces/internal_.Logger.md)

## Table of contents

### Constructors

- [constructor](internal_.Log.md#constructor)

### Properties

- [level](internal_.Log.md#level)

### Methods

- [debug](internal_.Log.md#debug)
- [error](internal_.Log.md#error)
- [info](internal_.Log.md#info)
- [silly](internal_.Log.md#silly)
- [warn](internal_.Log.md#warn)

## Constructors

### constructor

• **new Log**(`namespaceLog`, `level`, `logger`): [`Log`](internal_.Log.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespaceLog` | `string` | Logging namespace to prefix |
| `level` | [`LogLevel`](../modules/internal_.md#loglevel) | The log level |
| `logger` | `any` | logger instance |

#### Returns

[`Log`](internal_.Log.md)

#### Defined in

[adapter/src/lib/adapter/log.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/log.ts#L17)

## Properties

### level

• `Readonly` **level**: [`LogLevel`](../modules/internal_.md#loglevel)

Verbosity of the log output

#### Implementation of

[Logger](../interfaces/internal_.Logger.md).[level](../interfaces/internal_.Logger.md#level)

#### Defined in

[adapter/src/lib/adapter/log.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/log.ts#L8)

## Methods

### debug

▸ **debug**(`msg`): `void`

log a message with debug level

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/internal_.Logger.md).[debug](../interfaces/internal_.Logger.md#debug)

#### Defined in

[adapter/src/lib/adapter/log.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/log.ts#L37)

___

### error

▸ **error**(`msg`): `void`

log a message with error severity

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/internal_.Logger.md).[error](../interfaces/internal_.Logger.md#error)

#### Defined in

[adapter/src/lib/adapter/log.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/log.ts#L45)

___

### info

▸ **info**(`msg`): `void`

log a message with info level (default output level for all adapters)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/internal_.Logger.md).[info](../interfaces/internal_.Logger.md#info)

#### Defined in

[adapter/src/lib/adapter/log.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/log.ts#L41)

___

### silly

▸ **silly**(`msg`): `void`

log a message with silly level

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/internal_.Logger.md).[silly](../interfaces/internal_.Logger.md#silly)

#### Defined in

[adapter/src/lib/adapter/log.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/log.ts#L33)

___

### warn

▸ **warn**(`msg`): `void`

log a message with warning severity

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/internal_.Logger.md).[warn](../interfaces/internal_.Logger.md#warn)

#### Defined in

[adapter/src/lib/adapter/log.ts:49](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/log.ts#L49)
