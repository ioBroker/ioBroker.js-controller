[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PluginHandler

# Class: PluginHandler

[<internal>](../modules/internal_.md).PluginHandler

Base handler for ioBroker Plugins

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

Constructor for PluginHandler

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | [`PluginHandlerSettings`](../interfaces/internal_.PluginHandlerSettings.md) |

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

Add plugins to the handler, resolve and require the plugin code and create instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configs` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | object with keys for plugin names and their configuration |
| `resolveDirs` | `string` \| `string`[] | Resolve directories for plugins |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:26

___

### destroy

▸ **destroy**(`name`, `force?`): `boolean`

Destroy one plugin instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin to destroy |
| `force?` | `boolean` | true to consider plugin as destroyed also if false is returned from plugin |

#### Returns

`boolean`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:71

___

### destroyAll

▸ **destroyAll**(): `void`

Destroy all plugin instances

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:75

___

### getPluginConfig

▸ **getPluginConfig**(`name`): ``null`` \| [`Record`](../modules/internal_.md#record)<`string`, `any`\>

Return plugin configuration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin to return |

#### Returns

``null`` \| [`Record`](../modules/internal_.md#record)<`string`, `any`\>

plugin configuration or null if not existent or not isActive

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:89

___

### getPluginInstance

▸ **getPluginInstance**(`name`): ``null`` \| [`PluginBase`](internal_.PluginBase.md)

Return plugin instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin to return |

#### Returns

``null`` \| [`PluginBase`](internal_.PluginBase.md)

plugin instance or null if not existent or not isActive

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:82

___

### initPlugin

▸ **initPlugin**(`name`, `parentConfig`, `callback?`): `void`

Initialize one Plugins

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin |
| `parentConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | io-package of the parent module that uses the plugins (adapter/controller) |
| `callback?` | (`error?`: `string`) => `void` | callback function which is called after initialization is done for all plugins |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:57

___

### initPlugins

▸ **initPlugins**(`parentConfig`, `callback`): `void`

Initialize all Plugins that are registered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentConfig` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | io-package of the parent module that uses the plugins (adapter/controller) |
| `callback` | (`error?`: `string`) => `void` | callback function which is called after initialization is done for all plugins |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:64

___

### instanciatePlugin

▸ **instanciatePlugin**(`name`, `config`, `resolveDirs`): `void`

Resole, Require and Instanciate Plugins

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin |
| `config` | [`Record`](../modules/internal_.md#record)<`string`, `any`\> | plugin configuration |
| `resolveDirs` | `string` \| `string`[] | Resolve directories |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:34

___

### isPluginActive

▸ **isPluginActive**(`name`): `boolean`

Return if plugin is active

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin to check |

#### Returns

`boolean`

true/false if plugin is successfully isActive

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:110

___

### isPluginInstanciated

▸ **isPluginInstanciated**(`name`): `boolean`

Return if plugin is isActive

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin to check |

#### Returns

`boolean`

true/false if plugin is successfully isActive

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:103

___

### pluginExists

▸ **pluginExists**(`name`): `boolean`

Return if plugin exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin to check |

#### Returns

`boolean`

true/false if plugin was configured somewhere

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:96

___

### setDatabaseForPlugin

▸ **setDatabaseForPlugin**(`name`, `objectsDb`, `statesDb`): `void`

Set Objects and States databases for all isActive plugins

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of the plugin |
| `objectsDb` | `any` | objects DB instance |
| `statesDb` | `any` | states DB instance |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:42

___

### setDatabaseForPlugins

▸ **setDatabaseForPlugins**(`objectsDb`, `statesDb`): `void`

Set Objects and States databases for all isActive plugins

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objectsDb` | `any` | objects DB instance |
| `statesDb` | `any` | states DB instance |

#### Returns

`void`

#### Defined in

node_modules/@iobroker/plugin-base/lib/PluginHandler.d.ts:49
