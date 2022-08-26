[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PluginHandler

# Class: PluginHandler

[<internal>](../modules/internal_.md).PluginHandler

## Table of contents

### Constructors

- [constructor](internal_.PluginHandler.md#constructor)

### Properties

- [log](internal_.PluginHandler.md#log)
- [plugins](internal_.PluginHandler.md#plugins)
- [settings](internal_.PluginHandler.md#settings)

### Methods

- [addPlugins](internal_.PluginHandler.md#addplugins)
- [destroy](internal_.PluginHandler.md#destroy)
- [destroyAll](internal_.PluginHandler.md#destroyall)
- [getPluginConfig](internal_.PluginHandler.md#getpluginconfig)
- [getPluginInstance](internal_.PluginHandler.md#getplugininstance)
- [initPlugin](internal_.PluginHandler.md#initplugin)
- [initPlugins](internal_.PluginHandler.md#initplugins)
- [instanciatePlugin](internal_.PluginHandler.md#instanciateplugin)
- [isPluginActive](internal_.PluginHandler.md#ispluginactive)
- [isPluginInstanciated](internal_.PluginHandler.md#isplugininstanciated)
- [pluginExists](internal_.PluginHandler.md#pluginexists)
- [setDatabaseForPlugin](internal_.PluginHandler.md#setdatabaseforplugin)
- [setDatabaseForPlugins](internal_.PluginHandler.md#setdatabaseforplugins)

## Constructors

### constructor

• **new PluginHandler**(`settings`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `settings` | [`PluginHandlerSettings`](../interfaces/internal_.PluginHandlerSettings.md) |  |

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:12

## Properties

### log

• **log**: [`NamespaceLogger`](internal_.NamespaceLogger.md)

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:14

___

### plugins

• **plugins**: [`Record`](../modules/internal_.md#record)<`string`, { `config`: [`Record`](../modules/internal_.md#record)<`string`, `any`\> ; `instance?`: ``null`` \| [`PluginBase`](internal_.PluginBase.md)  }\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:16

___

### settings

• **settings**: [`PluginHandlerSettings`](../interfaces/internal_.PluginHandlerSettings.md)

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:13

## Methods

### addPlugins

▸ **addPlugins**(`configs`, `resolveDirs`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configs` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |
| `resolveDirs` | `string` \| `string`[] |  |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:26

___

### destroy

▸ **destroy**(`name`, `force?`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |
| `force?` | `boolean` | - |

#### Returns

`boolean`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:71

___

### destroyAll

▸ **destroyAll**(): `void`

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:75

___

### getPluginConfig

▸ **getPluginConfig**(`name`): ``null`` \| [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |

#### Returns

``null`` \| [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:89

___

### getPluginInstance

▸ **getPluginInstance**(`name`): ``null`` \| [`PluginBase`](internal_.PluginBase.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |

#### Returns

``null`` \| [`PluginBase`](internal_.PluginBase.md)

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:82

___

### initPlugin

▸ **initPlugin**(`name`, `parentConfig`, `callback?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |
| `parentConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |
| `callback?` | (`error?`: `string`) => `void` | - |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:57

___

### initPlugins

▸ **initPlugins**(`parentConfig`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |
| `callback` | (`error?`: `string`) => `void` |  |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:64

___

### instanciatePlugin

▸ **instanciatePlugin**(`name`, `config`, `resolveDirs`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |
| `config` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> |  |
| `resolveDirs` | `string` \| `string`[] |  |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:34

___

### isPluginActive

▸ **isPluginActive**(`name`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |

#### Returns

`boolean`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:110

___

### isPluginInstanciated

▸ **isPluginInstanciated**(`name`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |

#### Returns

`boolean`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:103

___

### pluginExists

▸ **pluginExists**(`name`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |

#### Returns

`boolean`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:96

___

### setDatabaseForPlugin

▸ **setDatabaseForPlugin**(`name`, `objectsDb`, `statesDb`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` |  |
| `objectsDb` | `any` |  |
| `statesDb` | `any` |  |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:42

___

### setDatabaseForPlugins

▸ **setDatabaseForPlugins**(`objectsDb`, `statesDb`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objectsDb` | `any` |  |
| `statesDb` | `any` |  |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:49
