[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PluginHandlerSettings

# Interface: PluginHandlerSettings

[<internal>](../modules/internal_.md).PluginHandlerSettings

## Table of contents

### Properties

- [controllerVersion](internal_.PluginHandlerSettings.md#controllerversion)
- [iobrokerConfig](internal_.PluginHandlerSettings.md#iobrokerconfig)
- [log](internal_.PluginHandlerSettings.md#log)
- [logNamespace](internal_.PluginHandlerSettings.md#lognamespace)
- [namespace](internal_.PluginHandlerSettings.md#namespace)
- [parentPackage](internal_.PluginHandlerSettings.md#parentpackage)
- [scope](internal_.PluginHandlerSettings.md#scope)

## Properties

### controllerVersion

• **controllerVersion**: `string`

The version of the installed JS-Controller

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:17

___

### iobrokerConfig

• **iobrokerConfig**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

The complete ioBroker configuration object

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:13

___

### log

• **log**: [`Logger`](internal_.Logger-1.md)

The logger object to use for logging

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:11

___

### logNamespace

• **logNamespace**: `string`

The namespace which will be used for logging

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:9

___

### namespace

• **namespace**: `string`

The object namespace for the plugin, e.g. `system.adapter.<adaptername>.0.plugins.name`, or `system.host.<hostname>.plugins.name`

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:7

___

### parentPackage

• **parentPackage**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

The package.json contents from the "parent" (adapter/controller) which uses this plugin

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:15

___

### scope

• **scope**: ``"adapter"`` \| ``"controller"``

The scope in which the plugin will be executed

#### Defined in

node_modules/@iobroker/plugin-base/lib/types.d.ts:5
