[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ExceptionHandler

# Interface: ExceptionHandler

[<internal>](../modules/internal_.md).ExceptionHandler

## Table of contents

### Constructors

- [constructor](internal_.ExceptionHandler.md#constructor)

### Properties

- [catcher](internal_.ExceptionHandler.md#catcher)
- [handlers](internal_.ExceptionHandler.md#handlers)
- [logger](internal_.ExceptionHandler.md#logger)

### Methods

- [getAllInfo](internal_.ExceptionHandler.md#getallinfo)
- [getOsInfo](internal_.ExceptionHandler.md#getosinfo)
- [getProcessInfo](internal_.ExceptionHandler.md#getprocessinfo)
- [getTrace](internal_.ExceptionHandler.md#gettrace)
- [handle](internal_.ExceptionHandler.md#handle)
- [unhandle](internal_.ExceptionHandler.md#unhandle)

## Constructors

### constructor

• **new ExceptionHandler**(`logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](internal_.Logger.md) |

#### Defined in

node_modules/winston/index.d.ts:34

## Properties

### catcher

• **catcher**: `boolean` \| `Function`

#### Defined in

node_modules/winston/index.d.ts:25

___

### handlers

• **handlers**: `Map`<`any`, `any`\>

#### Defined in

node_modules/winston/index.d.ts:24

___

### logger

• **logger**: [`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:23

## Methods

### getAllInfo

▸ **getAllInfo**(`err`): `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `string` \| [`Error`](../modules/internal_.md#error) |

#### Returns

`object`

#### Defined in

node_modules/winston/index.d.ts:29

___

### getOsInfo

▸ **getOsInfo**(): `object`

#### Returns

`object`

#### Defined in

node_modules/winston/index.d.ts:31

___

### getProcessInfo

▸ **getProcessInfo**(): `object`

#### Returns

`object`

#### Defined in

node_modules/winston/index.d.ts:30

___

### getTrace

▸ **getTrace**(`err`): `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | [`Error`](../modules/internal_.md#error) |

#### Returns

`object`

#### Defined in

node_modules/winston/index.d.ts:32

___

### handle

▸ **handle**(...`transports`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...transports` | `TransportStream`[] |

#### Returns

`void`

#### Defined in

node_modules/winston/index.d.ts:27

___

### unhandle

▸ **unhandle**(...`transports`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...transports` | `TransportStream`[] |

#### Returns

`void`

#### Defined in

node_modules/winston/index.d.ts:28
