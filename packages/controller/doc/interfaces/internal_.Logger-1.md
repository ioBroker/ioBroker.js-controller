[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Logger

# Interface: Logger

[<internal>](../modules/internal_.md).Logger

## Table of contents

### Properties

- [level](internal_.Logger-1.md#level)

### Methods

- [debug](internal_.Logger-1.md#debug)
- [error](internal_.Logger-1.md#error)
- [info](internal_.Logger-1.md#info)
- [silly](internal_.Logger-1.md#silly)
- [warn](internal_.Logger-1.md#warn)

## Properties

### level

• **level**: [`LogLevel`](../modules/internal_.md#loglevel)

Verbosity of the log output

#### Defined in

node_modules/@types/iobroker/index.d.ts:194

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

node_modules/@types/iobroker/index.d.ts:185

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

node_modules/@types/iobroker/index.d.ts:191

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

node_modules/@types/iobroker/index.d.ts:187

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

node_modules/@types/iobroker/index.d.ts:183

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

node_modules/@types/iobroker/index.d.ts:189
