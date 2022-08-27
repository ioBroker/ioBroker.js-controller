[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PluginSettings

# Interface: PluginSettings

[<internal>](../modules/internal_.md).PluginSettings

## Table of contents

### Properties

- [controllerVersion](internal_.PluginSettings.md#controllerversion)
- [iobrokerConfig](internal_.PluginSettings.md#iobrokerconfig)
- [log](internal_.PluginSettings.md#log)
- [parentNamespace](internal_.PluginSettings.md#parentnamespace)
- [parentPackage](internal_.PluginSettings.md#parentpackage)
- [pluginLogNamespace](internal_.PluginSettings.md#pluginlognamespace)
- [pluginNamespace](internal_.PluginSettings.md#pluginnamespace)
- [pluginScope](internal_.PluginSettings.md#pluginscope)

## Properties

### controllerVersion

• **controllerVersion**: `string`

The version of the installed JS-Controller

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:36

___

### iobrokerConfig

• **iobrokerConfig**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

The complete ioBroker configuration object

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:32

___

### log

• **log**: [`Logger`](internal_.Logger-1.md)

The logger object to use for logging

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:30

___

### parentNamespace

• **parentNamespace**: `string`

The object namespace for the parent of the plugin, e.g. `system.adapter.<adaptername>.0`, or `system.host.<hostname>.`

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:24

___

### parentPackage

• **parentPackage**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

The package.json contents from the "parent" (adapter/controller) which uses this plugin

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:34

___

### pluginLogNamespace

• **pluginLogNamespace**: `string`

The namespace which will be used for logging

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:28

___

### pluginNamespace

• **pluginNamespace**: `string`

The object namespace for the plugin, e.g. `system.adapter.<adaptername>.0.plugins.name`, or `system.host.<hostname>.plugins.name`

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:26

___

### pluginScope

• **pluginScope**: ``"adapter"`` \| ``"controller"``

The scope in which the plugin will be executed

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:22
