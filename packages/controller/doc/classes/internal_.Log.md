[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Log

# Class: Log

[<internal>](../modules/internal_.md).Log

Log class for adapter.js

It prefixes every message with the given namespace

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

• **new Log**(`namespaceLog`, `level`, `logger`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespaceLog` | `string` | Logging namespace to prefix |
| `level` | `string` | The log level |
| `logger` | `Logger` | logger instance |

#### Defined in

[adapter/src/lib/adapter/log.ts:18](https://github.com/ioBroker/ioBroker.js-controller/blob/7a194a15/packages/adapter/src/lib/adapter/log.ts#L18)

## Properties

### level

• `Readonly` **level**: `string`

#### Defined in

[adapter/src/lib/adapter/log.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/7a194a15/packages/adapter/src/lib/adapter/log.ts#L10)

## Methods

### debug

▸ **debug**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/log.ts:38](https://github.com/ioBroker/ioBroker.js-controller/blob/7a194a15/packages/adapter/src/lib/adapter/log.ts#L38)

___

### error

▸ **error**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/log.ts:46](https://github.com/ioBroker/ioBroker.js-controller/blob/7a194a15/packages/adapter/src/lib/adapter/log.ts#L46)

___

### info

▸ **info**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/log.ts:42](https://github.com/ioBroker/ioBroker.js-controller/blob/7a194a15/packages/adapter/src/lib/adapter/log.ts#L42)

___

### silly

▸ **silly**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/log.ts:34](https://github.com/ioBroker/ioBroker.js-controller/blob/7a194a15/packages/adapter/src/lib/adapter/log.ts#L34)

___

### warn

▸ **warn**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/log.ts:50](https://github.com/ioBroker/ioBroker.js-controller/blob/7a194a15/packages/adapter/src/lib/adapter/log.ts#L50)
