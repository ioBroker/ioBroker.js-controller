[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / AdapterOptions

# Interface: AdapterOptions

[\<internal\>](../modules/internal_.md).AdapterOptions

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
- [uiClientSubscribe](internal_.AdapterOptions.md#uiclientsubscribe)
- [uiClientUnsubscribe](internal_.AdapterOptions.md#uiclientunsubscribe)
- [unload](internal_.AdapterOptions.md#unload)
- [useFormatDate](internal_.AdapterOptions.md#useformatdate)

## Properties

### compact

• `Optional` **compact**: `boolean`

If true runs in compact mode

#### Defined in

[adapter/src/lib/_Types.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L22)

___

### compactInstance

• `Optional` **compactInstance**: `number`

compact group instance if running in compact mode

#### Defined in

[adapter/src/lib/_Types.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L10)

___

### config

• `Optional` **config**: [`AdapterOptionsConfig`](internal_.AdapterOptionsConfig.md)

configuration of the connection to controller

#### Defined in

[adapter/src/lib/_Types.ts:24](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L24)

___

### dirname

• `Optional` **dirname**: `string`

adapter directory name

#### Defined in

[adapter/src/lib/_Types.ts:18](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L18)

___

### error

• `Optional` **error**: [`ErrorHandler`](../modules/internal_.md#errorhandler)

Handler to handle uncaught exceptions, return true if no further handling required

#### Defined in

[adapter/src/lib/_Types.ts:50](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L50)

___

### fileChange

• `Optional` **fileChange**: [`FileChangeHandler`](../modules/internal_.md#filechangehandler)

callback function (id, file) that will be called if file changed

#### Defined in

[adapter/src/lib/_Types.ts:34](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L34)

___

### install

• `Optional` **install**: [`ReadyHandler`](../modules/internal_.md#readyhandler)

called when adapter is installed

#### Defined in

[adapter/src/lib/_Types.ts:46](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L46)

___

### instance

• `Optional` **instance**: `number`

instance number of adapter

#### Defined in

[adapter/src/lib/_Types.ts:16](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L16)

___

### logTransporter

• `Optional` **logTransporter**: `boolean`

If the adapter collects logs from all adapters (experts only). Default: false

#### Defined in

[adapter/src/lib/_Types.ts:4](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L4)

___

### message

• `Optional` **message**: [`MessageHandler`](../modules/internal_.md#messagehandler)

callback to inform about a new message the adapter

#### Defined in

[adapter/src/lib/_Types.ts:40](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L40)

___

### name

• **name**: `string`

name of the adapter. Must be exactly the same as directory name.

#### Defined in

[adapter/src/lib/_Types.ts:26](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L26)

___

### objectChange

• `Optional` **objectChange**: [`ObjectChangeHandler`](../modules/internal_.md#objectchangehandler)

callback function (id, obj) that will be called if an object changed

#### Defined in

[adapter/src/lib/_Types.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L30)

___

### objects

• `Optional` **objects**: `boolean`

if desired to have oObjects. This is a list with all states, channels and devices of this adapter, and it will be updated automatically.

#### Defined in

[adapter/src/lib/_Types.ts:14](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L14)

___

### ready

• `Optional` **ready**: [`ReadyHandler`](../modules/internal_.md#readyhandler)

called when adapter is ready

#### Defined in

[adapter/src/lib/_Types.ts:44](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L44)

___

### reconnect

• `Optional` **reconnect**: () => [`MaybePromise`](../modules/internal_.md#maybepromise)

called on reconnection to DB

#### Type declaration

▸ (): [`MaybePromise`](../modules/internal_.md#maybepromise)

##### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[adapter/src/lib/_Types.ts:48](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L48)

___

### stateChange

• `Optional` **stateChange**: [`StateChangeHandler`](../modules/internal_.md#statechangehandler)

callback function (id, obj) that will be called if state changed

#### Defined in

[adapter/src/lib/_Types.ts:32](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L32)

___

### states

• `Optional` **states**: `boolean`

if desired to have oStates. This is a list with all states values, and it will be updated automatically.

#### Defined in

[adapter/src/lib/_Types.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L12)

___

### strictObjectChecks

• `Optional` **strictObjectChecks**: `boolean`

flag which defaults to true - if true, adapter warns if states are set without a corresponding existing object

#### Defined in

[adapter/src/lib/_Types.ts:20](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L20)

___

### subscribable

• `Optional` **subscribable**: `boolean`

if it is possible for other instances to retrieve states of this adapter automatically

#### Defined in

[adapter/src/lib/_Types.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L8)

___

### subscribesChange

• `Optional` **subscribesChange**: (`subs`: `Record`\<`string`, \{ `regex`: `RegExp`  }\>) => `void`

#### Type declaration

▸ (`subs`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `subs` | `Record`\<`string`, \{ `regex`: `RegExp`  }\> |

##### Returns

`void`

#### Defined in

[adapter/src/lib/_Types.ts:2](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L2)

___

### systemConfig

• `Optional` **systemConfig**: `boolean`

If true, the systemConfig (iobroker.json) will be available in this.systemConfig

#### Defined in

[adapter/src/lib/_Types.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L28)

___

### uiClientSubscribe

• `Optional` **uiClientSubscribe**: [`UserInterfaceClientSubscribeHandler`](../modules/internal_.md#userinterfaceclientsubscribehandler)

callback function that will be called when a new UI client subscribes

#### Defined in

[adapter/src/lib/_Types.ts:36](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L36)

___

### uiClientUnsubscribe

• `Optional` **uiClientUnsubscribe**: [`UserInterfaceClientUnsubscribeHandler`](../modules/internal_.md#userinterfaceclientunsubscribehandler)

callback function that will be called when a new UI client unsubscribes

#### Defined in

[adapter/src/lib/_Types.ts:38](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L38)

___

### unload

• `Optional` **unload**: [`UnloadHandler`](../modules/internal_.md#unloadhandler)

callback to stop the adapter

#### Defined in

[adapter/src/lib/_Types.ts:42](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L42)

___

### useFormatDate

• `Optional` **useFormatDate**: `boolean`

if true, the date format from system.config

#### Defined in

[adapter/src/lib/_Types.ts:6](https://github.com/ioBroker/ioBroker.js-controller/blob/14a872375/packages/adapter/src/lib/_Types.ts#L6)
