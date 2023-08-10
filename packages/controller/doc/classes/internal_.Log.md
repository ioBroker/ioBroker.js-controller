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
| `logger` | `any` | logger instance |

#### Defined in

[adapter/src/lib/adapter/log.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/adapter/src/lib/adapter/log.ts#L17)

## Properties

### level

• `Readonly` **level**: `string`

#### Defined in

[adapter/src/lib/adapter/log.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/adapter/src/lib/adapter/log.ts#L8)

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

[adapter/src/lib/adapter/log.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/adapter/src/lib/adapter/log.ts#L37)

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

[adapter/src/lib/adapter/log.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/adapter/src/lib/adapter/log.ts#L45)

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

[adapter/src/lib/adapter/log.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/adapter/src/lib/adapter/log.ts#L41)

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

[adapter/src/lib/adapter/log.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/adapter/src/lib/adapter/log.ts#L33)

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

[adapter/src/lib/adapter/log.ts:49](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/adapter/src/lib/adapter/log.ts#L49)
