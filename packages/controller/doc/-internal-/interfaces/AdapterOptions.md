[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterOptions

# Interface: AdapterOptions

## Properties

### compact?

> `optional` **compact**: `boolean`

If true runs in compact mode

#### Defined in

[adapter/src/lib/\_Types.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L29)

***

### compactInstance?

> `optional` **compactInstance**: `number`

compact group instance if running in compact mode

#### Defined in

[adapter/src/lib/\_Types.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L17)

***

### config?

> `optional` **config**: [`AdapterOptionsConfig`](AdapterOptionsConfig.md)

configuration of the connection to controller

#### Defined in

[adapter/src/lib/\_Types.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L31)

***

### dirname?

> `optional` **dirname**: `string`

adapter directory name

#### Defined in

[adapter/src/lib/\_Types.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L25)

***

### error?

> `optional` **error**: [`ErrorHandler`](../type-aliases/ErrorHandler.md)

Handler to handle uncaught exceptions, return true if no further handling required

#### Defined in

[adapter/src/lib/\_Types.ts:57](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L57)

***

### fileChange?

> `optional` **fileChange**: [`FileChangeHandler`](../type-aliases/FileChangeHandler.md)

callback function (id, file) that will be called if file changed

#### Defined in

[adapter/src/lib/\_Types.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L41)

***

### install?

> `optional` **install**: [`ReadyHandler`](../type-aliases/ReadyHandler.md)

called when adapter is installed

#### Defined in

[adapter/src/lib/\_Types.ts:53](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L53)

***

### instance?

> `optional` **instance**: `number`

instance number of adapter

#### Defined in

[adapter/src/lib/\_Types.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L23)

***

### logTransporter?

> `optional` **logTransporter**: `boolean`

If the adapter collects logs from all adapters (experts only). Default: false

#### Defined in

[adapter/src/lib/\_Types.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L11)

***

### message?

> `optional` **message**: [`MessageHandler`](../type-aliases/MessageHandler.md)

callback to inform about a new message the adapter

#### Defined in

[adapter/src/lib/\_Types.ts:47](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L47)

***

### name

> **name**: `string`

name of the adapter. Must be exactly the same as directory name.

#### Defined in

[adapter/src/lib/\_Types.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L33)

***

### objectChange?

> `optional` **objectChange**: [`ObjectChangeHandler`](../type-aliases/ObjectChangeHandler.md)

callback function (id, obj) that will be called if an object changed

#### Defined in

[adapter/src/lib/\_Types.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L37)

***

### objects?

> `optional` **objects**: `boolean`

if desired to have oObjects. This is a list with all states, channels and devices of this adapter, and it will be updated automatically.

#### Defined in

[adapter/src/lib/\_Types.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L21)

***

### ready?

> `optional` **ready**: [`ReadyHandler`](../type-aliases/ReadyHandler.md)

called when adapter is ready

#### Defined in

[adapter/src/lib/\_Types.ts:51](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L51)

***

### reconnect()?

> `optional` **reconnect**: () => [`MaybePromise`](../type-aliases/MaybePromise.md)

called on reconnection to DB

#### Returns

[`MaybePromise`](../type-aliases/MaybePromise.md)

#### Defined in

[adapter/src/lib/\_Types.ts:55](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L55)

***

### stateChange?

> `optional` **stateChange**: [`StateChangeHandler`](../type-aliases/StateChangeHandler.md)

callback function (id, obj) that will be called if state changed

#### Defined in

[adapter/src/lib/\_Types.ts:39](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L39)

***

### states?

> `optional` **states**: `boolean`

if desired to have oStates. This is a list with all states values, and it will be updated automatically.

#### Defined in

[adapter/src/lib/\_Types.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L19)

***

### strictObjectChecks?

> `optional` **strictObjectChecks**: `boolean`

flag which defaults to true - if true, adapter warns if states are set without a corresponding existing object

#### Defined in

[adapter/src/lib/\_Types.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L27)

***

### subscribable?

> `optional` **subscribable**: `boolean`

if it is possible for other instances to retrieve states of this adapter automatically

#### Defined in

[adapter/src/lib/\_Types.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L15)

***

### subscribesChange()?

> `optional` **subscribesChange**: (`subs`) => `void`

#### Parameters

• **subs**: `Record`\<`string`, `object`\>

#### Returns

`void`

#### Defined in

[adapter/src/lib/\_Types.ts:2](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L2)

***

### systemConfig?

> `optional` **systemConfig**: `boolean`

If true, the systemConfig (iobroker.json) will be available in this.systemConfig

#### Defined in

[adapter/src/lib/\_Types.ts:35](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L35)

***

### uiClientSubscribe?

> `optional` **uiClientSubscribe**: [`UserInterfaceClientSubscribeHandler`](../type-aliases/UserInterfaceClientSubscribeHandler.md)

callback function that will be called when a new UI client subscribes

#### Defined in

[adapter/src/lib/\_Types.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L43)

***

### uiClientUnsubscribe?

> `optional` **uiClientUnsubscribe**: [`UserInterfaceClientUnsubscribeHandler`](../type-aliases/UserInterfaceClientUnsubscribeHandler.md)

callback function that will be called when a new UI client unsubscribes

#### Defined in

[adapter/src/lib/\_Types.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L45)

***

### unload?

> `optional` **unload**: [`UnloadHandler`](../type-aliases/UnloadHandler.md)

callback to stop the adapter

#### Defined in

[adapter/src/lib/\_Types.ts:49](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L49)

***

### useFormatDate?

> `optional` **useFormatDate**: `boolean`

if true, the date format from system.config

#### Defined in

[adapter/src/lib/\_Types.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/adapter/src/lib/_Types.ts#L13)
