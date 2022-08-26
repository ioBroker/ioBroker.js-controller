[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PluginBase

# Class: PluginBase

[<internal>](../modules/internal_.md).PluginBase

## Table of contents

### Constructors

- [constructor](internal_.PluginBase.md#constructor)

### Properties

- [SCOPES](internal_.PluginBase.md#scopes)
- [iobrokerConfig](internal_.PluginBase.md#iobrokerconfig)
- [isActive](internal_.PluginBase.md#isactive)
- [log](internal_.PluginBase.md#log)
- [objectsDb](internal_.PluginBase.md#objectsdb)
- [parentIoPackage](internal_.PluginBase.md#parentiopackage)
- [parentNamespace](internal_.PluginBase.md#parentnamespace)
- [parentPackage](internal_.PluginBase.md#parentpackage)
- [pluginNamespace](internal_.PluginBase.md#pluginnamespace)
- [pluginScope](internal_.PluginBase.md#pluginscope)
- [settings](internal_.PluginBase.md#settings)
- [statesDb](internal_.PluginBase.md#statesdb)

### Methods

- [\_initialize](internal_.PluginBase.md#_initialize)
- [destroy](internal_.PluginBase.md#destroy)
- [extendObject](internal_.PluginBase.md#extendobject)
- [extendObjectAsync](internal_.PluginBase.md#extendobjectasync)
- [getObject](internal_.PluginBase.md#getobject)
- [getObjectAsync](internal_.PluginBase.md#getobjectasync)
- [getState](internal_.PluginBase.md#getstate)
- [getStateAsync](internal_.PluginBase.md#getstateasync)
- [init](internal_.PluginBase.md#init)
- [initPlugin](internal_.PluginBase.md#initplugin)
- [setActive](internal_.PluginBase.md#setactive)
- [setDatabase](internal_.PluginBase.md#setdatabase)
- [setObject](internal_.PluginBase.md#setobject)
- [setObjectAsync](internal_.PluginBase.md#setobjectasync)
- [setState](internal_.PluginBase.md#setstate)
- [setStateAsync](internal_.PluginBase.md#setstateasync)

## Constructors

### constructor

• **new PluginBase**(`settings`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `settings` | [`PluginSettings`](../interfaces/internal_.PluginSettings.md) |  |

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:13

## Properties

### SCOPES

• **SCOPES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ADAPTER` | `string` |
| `CONTROLLER` | `string` |

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:24

___

### iobrokerConfig

• **iobrokerConfig**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:18

___

### isActive

• **isActive**: `boolean`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:23

___

### log

• **log**: [`NamespaceLogger`](internal_.NamespaceLogger.md)

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:17

___

### objectsDb

• **objectsDb**: `any`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:21

___

### parentIoPackage

• **parentIoPackage**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:145

___

### parentNamespace

• **parentNamespace**: `string`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:15

___

### parentPackage

• **parentPackage**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:19

___

### pluginNamespace

• **pluginNamespace**: `string`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:16

___

### pluginScope

• **pluginScope**: ``"adapter"`` \| ``"controller"``

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:14

___

### settings

• **settings**: [`PluginSettings`](../interfaces/internal_.PluginSettings.md)

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:20

___

### statesDb

• **statesDb**: `any`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:22

## Methods

### \_initialize

▸ **_initialize**(`pluginConfig`, `activate`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pluginConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |
| `activate` | `string` \| `boolean` |  |
| `callback` | [`InitCallback`](../modules/internal_.md#initcallback) |  |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:152

___

### destroy

▸ **destroy**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:40

___

### extendObject

▸ **extendObject**(`id`, `obj`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | [`Object`](../modules/internal_.md#object) |  |
| `callback?` | [`ExtendObjectCallback`](../modules/internal_.md#extendobjectcallback) | - |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:108

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `obj`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | `object` |  |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:116

___

### getObject

▸ **getObject**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`string`\> |  |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:77

___

### getObjectAsync

▸ **getObjectAsync**(`id`): `Promise`<`undefined` \| ``null`` \| [`Object`](../modules/internal_.md#object)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |

#### Returns

`Promise`<`undefined` \| ``null`` \| [`Object`](../modules/internal_.md#object)\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:84

___

### getState

▸ **getState**(`id`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) |  |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:47

___

### getStateAsync

▸ **getStateAsync**(`id`): [`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |

#### Returns

[`GetStatePromise`](../modules/internal_.md#getstatepromise)

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:54

___

### init

▸ **init**(`pluginConfig`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pluginConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |
| `callback` | [`InitCallback`](../modules/internal_.md#initcallback) |  |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:34

___

### initPlugin

▸ **initPlugin**(`pluginConfig`, `parentConfig`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pluginConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |
| `parentConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |
| `callback` | [`InitCallback`](../modules/internal_.md#initcallback) |  |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:144

___

### setActive

▸ **setActive**(`active`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `active` | `boolean` |  |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:126

___

### setDatabase

▸ **setDatabase**(`objectsDb`, `statesDb`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objectsDb` | `any` |  |
| `statesDb` | `any` |  |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:135

___

### setObject

▸ **setObject**(`id`, `obj`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | [`Object`](../modules/internal_.md#object) |  |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | - |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:92

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `obj` | [`Object`](../modules/internal_.md#object) |  |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:100

___

### setState

▸ **setState**(`id`, `state`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`Partial`](../modules/internal_.md#partial)<[`State`](../interfaces/internal_.State.md)\> |  |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | - |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:62

___

### setStateAsync

▸ **setStateAsync**(`id`, `state`): `Promise`<`undefined` \| ``null`` \| [`State`](../interfaces/internal_.State.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` |  |
| `state` | [`Partial`](../modules/internal_.md#partial)<[`State`](../interfaces/internal_.State.md)\> |  |

#### Returns

`Promise`<`undefined` \| ``null`` \| [`State`](../interfaces/internal_.State.md)\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:70
