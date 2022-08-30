[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Log

# Class: Log

[<internal>](../modules/internal_.md).Log

Log class for adapter.js

It prefixes every message with the given namespace

## Table of contents

### Constructors

- [constructor](internal_.Log.md#constructor)

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

[packages/adapter/src/lib/adapter/log.ts:16](https://github.com/ioBroker/ioBroker.js-controller/blob/4278a7c8/packages/adapter/src/lib/adapter/log.ts#L16)

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

[packages/adapter/src/lib/adapter/log.ts:36](https://github.com/ioBroker/ioBroker.js-controller/blob/4278a7c8/packages/adapter/src/lib/adapter/log.ts#L36)

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

[packages/adapter/src/lib/adapter/log.ts:44](https://github.com/ioBroker/ioBroker.js-controller/blob/4278a7c8/packages/adapter/src/lib/adapter/log.ts#L44)

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

[packages/adapter/src/lib/adapter/log.ts:40](https://github.com/ioBroker/ioBroker.js-controller/blob/4278a7c8/packages/adapter/src/lib/adapter/log.ts#L40)

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

[packages/adapter/src/lib/adapter/log.ts:32](https://github.com/ioBroker/ioBroker.js-controller/blob/4278a7c8/packages/adapter/src/lib/adapter/log.ts#L32)

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

[packages/adapter/src/lib/adapter/log.ts:48](https://github.com/ioBroker/ioBroker.js-controller/blob/4278a7c8/packages/adapter/src/lib/adapter/log.ts#L48)
