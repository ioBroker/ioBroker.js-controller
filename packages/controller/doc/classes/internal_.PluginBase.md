[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PluginBase

# Class: PluginBase

[<internal>](../modules/internal_.md).PluginBase

Base class for ioBroker Plugins

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

Constructor for Plugin class
This method is called by js-controller/adapter process internally when initializing the plugin.

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`PluginSettings`](../interfaces/internal_.PluginSettings.md) |

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

| Name | Type |
| :------ | :------ |
| `pluginConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |
| `activate` | `string` \| `boolean` |
| `callback` | [`InitCallback`](../modules/internal_.md#initcallback) |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:152

___

### destroy

▸ **destroy**(): `boolean`

Method which is called on a clean end of the process to pot. clean up used resources

#### Returns

`boolean`

The return value indicates if the exit was successful. If no action needs to be taken, you should return true.

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:40

___

### extendObject

▸ **extendObject**(`id`, `obj`, `callback?`): `void`

Set/Extend an Object in Objects DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the object to set/extend |
| `obj` | [`Object`](../modules/internal_.md#object) | object to set |
| `callback?` | [`ExtendObjectCallback`](../modules/internal_.md#extendobjectcallback) | Will be called with the result |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:108

___

### extendObjectAsync

▸ **extendObjectAsync**(`id`, `obj`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Set/Extend an Object in Objects DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the object to set/extend |
| `obj` | `object` | object to set |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Promise with result or error

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:116

___

### getObject

▸ **getObject**(`id`, `callback`): `void`

Get an Object from Objects DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the object to retrieve |
| `callback` | [`GetObjectCallback`](../modules/internal_.md#getobjectcallback)<`string`\> | Will be called with the result |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:77

___

### getObjectAsync

▸ **getObjectAsync**(`id`): `Promise`<`undefined` \| ``null`` \| [`Object`](../modules/internal_.md#object)\>

Get an Object from Objects DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the object to retrieve |

#### Returns

`Promise`<`undefined` \| ``null`` \| [`Object`](../modules/internal_.md#object)\>

Promise with result or error

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:84

___

### getState

▸ **getState**(`id`, `callback`): `void`

Get a State from State DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the state to retrieve |
| `callback` | [`GetStateCallback`](../modules/internal_.md#getstatecallback) | Will be called with the result |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:47

___

### getStateAsync

▸ **getStateAsync**(`id`): [`GetStatePromise`](../modules/internal_.md#getstatepromise)

Get a State from State DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the state to retrieve |

#### Returns

[`GetStatePromise`](../modules/internal_.md#getstatepromise)

Promise with error or result

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:54

___

### init

▸ **init**(`pluginConfig`, `callback`): `void`

Method for Plugin developer to initialize his Plugin

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pluginConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | plugin configuration from config files |
| `callback` | [`InitCallback`](../modules/internal_.md#initcallback) | Will be called when done. On err or `initSuccessful === false` the plugin instance will be discarded. |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:34

___

### initPlugin

▸ **initPlugin**(`pluginConfig`, `parentConfig`, `callback`): `Promise`<`void`\>

Initialize plugin, internal method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pluginConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | plugin configuration from config files |
| `parentConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | io-package from parent module where plugin is used in |
| `callback` | [`InitCallback`](../modules/internal_.md#initcallback) | Will be called when done. On err or `initSuccessful === false` the plugin instance will be discarded. |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:144

___

### setActive

▸ **setActive**(`active`): `Promise`<`void`\>

Set the Active flag for the plugin

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `active` | `boolean` | true/false if active |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:126

___

### setDatabase

▸ **setDatabase**(`objectsDb`, `statesDb`): `void`

Set the objects and states database to be used internally
This method is called by js-controller/adapter process internally when initializing the plugin.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objectsDb` | `any` | objects DB instance |
| `statesDb` | `any` | states DB instance |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:135

___

### setObject

▸ **setObject**(`id`, `obj`, `callback?`): `void`

Set an Object in Objects DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the object to set |
| `obj` | [`Object`](../modules/internal_.md#object) | object to set |
| `callback?` | [`SetObjectCallback`](../modules/internal_.md#setobjectcallback) | Will be called with the result |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:92

___

### setObjectAsync

▸ **setObjectAsync**(`id`, `obj`): [`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Set an Object in Objects DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the object to set |
| `obj` | [`Object`](../modules/internal_.md#object) | object to set |

#### Returns

[`SetObjectPromise`](../modules/internal_.md#setobjectpromise)

Promise with error or result

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:100

___

### setState

▸ **setState**(`id`, `state`, `callback?`): `void`

Set a State in State DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the state to set |
| `state` | [`Partial`](../modules/internal_.md#partial)<[`State`](../interfaces/internal_.State.md)\> | state value to set |
| `callback?` | [`SetStateCallback`](../modules/internal_.md#setstatecallback) | Will be called with the result |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:62

___

### setStateAsync

▸ **setStateAsync**(`id`, `state`): `Promise`<`undefined` \| ``null`` \| [`State`](../interfaces/internal_.State.md)\>

Set a State in State DB

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the state to set |
| `state` | [`Partial`](../modules/internal_.md#partial)<[`State`](../interfaces/internal_.State.md)\> | state value to set |

#### Returns

`Promise`<`undefined` \| ``null`` \| [`State`](../interfaces/internal_.State.md)\>

Promise with error or result

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginBase.d.ts:70
