[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / RejectionHandler

# Interface: RejectionHandler

[<internal>](../modules/internal_.md).RejectionHandler

## Table of contents

### Constructors

- [constructor](internal_.RejectionHandler.md#constructor)

### Properties

- [catcher](internal_.RejectionHandler.md#catcher)
- [handlers](internal_.RejectionHandler.md#handlers)
- [logger](internal_.RejectionHandler.md#logger)

### Methods

- [getAllInfo](internal_.RejectionHandler.md#getallinfo)
- [getOsInfo](internal_.RejectionHandler.md#getosinfo)
- [getProcessInfo](internal_.RejectionHandler.md#getprocessinfo)
- [getTrace](internal_.RejectionHandler.md#gettrace)
- [handle](internal_.RejectionHandler.md#handle)
- [unhandle](internal_.RejectionHandler.md#unhandle)

## Constructors

### constructor

• **new RejectionHandler**(`logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](internal_.Logger.md) |

#### Defined in

node_modules/winston/index.d.ts:49

## Properties

### catcher

• **catcher**: `boolean` \| `Function`

#### Defined in

node_modules/winston/index.d.ts:40

___

### handlers

• **handlers**: `Map`<`any`, `any`\>

#### Defined in

node_modules/winston/index.d.ts:39

___

### logger

• **logger**: [`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:38

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

node_modules/winston/index.d.ts:44

___

### getOsInfo

▸ **getOsInfo**(): `object`

#### Returns

`object`

#### Defined in

node_modules/winston/index.d.ts:46

___

### getProcessInfo

▸ **getProcessInfo**(): `object`

#### Returns

`object`

#### Defined in

node_modules/winston/index.d.ts:45

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

node_modules/winston/index.d.ts:47

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

node_modules/winston/index.d.ts:42

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

node_modules/winston/index.d.ts:43
