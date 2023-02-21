[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / AdapterOptions

# Interface: AdapterOptions

[<internal>](../modules/internal_.md).AdapterOptions

## Table of contents

### Properties

- [compact](internal_.AdapterOptions.md#compact)
- [compactInstance](internal_.AdapterOptions.md#compactinstance)
- [config](internal_.AdapterOptions.md#config)
- [dirname](internal_.AdapterOptions.md#dirname)
- [error](internal_.AdapterOptions.md#error)
- [fileChange](internal_.AdapterOptions.md#filechange)
- [install](internal_.AdapterOptions.md#install)
- [instance](internal_.AdapterOptions.md#instance)
- [logTransporter](internal_.AdapterOptions.md#logtransporter)
- [message](internal_.AdapterOptions.md#message)
- [name](internal_.AdapterOptions.md#name)
- [objectChange](internal_.AdapterOptions.md#objectchange)
- [objects](internal_.AdapterOptions.md#objects)
- [ready](internal_.AdapterOptions.md#ready)
- [reconnect](internal_.AdapterOptions.md#reconnect)
- [stateChange](internal_.AdapterOptions.md#statechange)
- [states](internal_.AdapterOptions.md#states)
- [strictObjectChecks](internal_.AdapterOptions.md#strictobjectchecks)
- [subscribable](internal_.AdapterOptions.md#subscribable)
- [subscribesChange](internal_.AdapterOptions.md#subscribeschange)
- [systemConfig](internal_.AdapterOptions.md#systemconfig)
- [unload](internal_.AdapterOptions.md#unload)
- [useFormatDate](internal_.AdapterOptions.md#useformatdate)

## Properties

### compact

• `Optional` **compact**: `boolean`

If true runs in compact mode

#### Defined in

[adapter/src/lib/_Types.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L25)

___

### compactInstance

• `Optional` **compactInstance**: `number`

compact group instance if running in compact mode

#### Defined in

[adapter/src/lib/_Types.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L13)

___

### config

• `Optional` **config**: [`AdapterOptionsConfig`](internal_.AdapterOptionsConfig.md)

configuration of the connection to controller

#### Defined in

[adapter/src/lib/_Types.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L27)

___

### dirname

• `Optional` **dirname**: `string`

adapter directory name

#### Defined in

[adapter/src/lib/_Types.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L21)

___

### error

• `Optional` **error**: [`ErrorHandler`](../modules/internal_.md#errorhandler)

Handler to handle uncaught exceptions, return true if no further handling required

#### Defined in

[adapter/src/lib/_Types.ts:49](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L49)

___

### fileChange

• `Optional` **fileChange**: [`ChangeFileFunction`](../modules/internal_.md#changefilefunction)

callback function (id, file) that will be called if file changed

#### Defined in

[adapter/src/lib/_Types.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L37)

___

### install

• `Optional` **install**: [`ReadyHandler`](../modules/internal_.md#readyhandler)

called when adapter is installed

#### Defined in

[adapter/src/lib/_Types.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L45)

___

### instance

• `Optional` **instance**: `number`

instance number of adapter

#### Defined in

[adapter/src/lib/_Types.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L19)

___

### logTransporter

• `Optional` **logTransporter**: `boolean`

If the adapter collects logs from all adapters (experts only). Default: false

#### Defined in

[adapter/src/lib/_Types.ts:7](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L7)

___

### message

• `Optional` **message**: [`MessageHandler`](../modules/internal_.md#messagehandler)

callback to inform about new message the adapter

#### Defined in

[adapter/src/lib/_Types.ts:39](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L39)

___

### name

• **name**: `string`

name of the adapter. Must be exactly the same as directory name.

#### Defined in

[adapter/src/lib/_Types.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L29)

___

### objectChange

• `Optional` **objectChange**: [`ObjectChangeHandler`](../modules/internal_.md#objectchangehandler)

callback function (id, obj) that will be called if object changed

#### Defined in

[adapter/src/lib/_Types.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L33)

___

### objects

• `Optional` **objects**: `boolean`

if desired to have oObjects. This is a list with all states, channels and devices of this adapter, and it will be updated automatically.

#### Defined in

[adapter/src/lib/_Types.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L17)

___

### ready

• `Optional` **ready**: [`ReadyHandler`](../modules/internal_.md#readyhandler)

called when adapter is ready

#### Defined in

[adapter/src/lib/_Types.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L43)

___

### reconnect

• `Optional` **reconnect**: () => [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Type declaration

▸ (): [`MaybePromise`](../modules/internal_.md#maybepromise)

called on reconnection to DB

##### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[adapter/src/lib/_Types.ts:47](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L47)

___

### stateChange

• `Optional` **stateChange**: [`StateChangeHandler`](../modules/internal_.md#statechangehandler)

callback function (id, obj) that will be called if state changed

#### Defined in

[adapter/src/lib/_Types.ts:35](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L35)

___

### states

• `Optional` **states**: `boolean`

if desired to have oStates. This is a list with all states values, and it will be updated automatically.

#### Defined in

[adapter/src/lib/_Types.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L15)

___

### strictObjectChecks

• `Optional` **strictObjectChecks**: `boolean`

flag which defaults to true - if true, adapter warns if states are set without a corresponding existing object

#### Defined in

[adapter/src/lib/_Types.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L23)

___

### subscribable

• `Optional` **subscribable**: `boolean`

if it is possible for other instances to retrive states of this adapter automatically

#### Defined in

[adapter/src/lib/_Types.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L11)

___

### subscribesChange

• `Optional` **subscribesChange**: (`subs`: `Record`<`string`, { `regex`: `RegExp`  }\>) => `void`

#### Type declaration

▸ (`subs`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `subs` | `Record`<`string`, { `regex`: `RegExp`  }\> |

##### Returns

`void`

#### Defined in

[adapter/src/lib/_Types.ts:5](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L5)

___

### systemConfig

• `Optional` **systemConfig**: `boolean`

If true, the systemConfig (iobroker.json) will be available in this.systemConfig

#### Defined in

[adapter/src/lib/_Types.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L31)

___

### unload

• `Optional` **unload**: [`UnloadHandler`](../modules/internal_.md#unloadhandler)

callback to stop the adapter

#### Defined in

[adapter/src/lib/_Types.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L41)

___

### useFormatDate

• `Optional` **useFormatDate**: `boolean`

if true, the date format from system.config

#### Defined in

[adapter/src/lib/_Types.ts:9](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/adapter/src/lib/_Types.ts#L9)
