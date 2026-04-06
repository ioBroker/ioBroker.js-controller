[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterOptions

# Interface: AdapterOptions

Defined in: [adapter/src/lib/\_Types.ts:1](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L1)

## Properties

### compact?

> `optional` **compact?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L29)

If true runs in compact mode

***

### compactInstance?

> `optional` **compactInstance?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L17)

compact group instance if running in compact mode

***

### config?

> `optional` **config?**: [`AdapterOptionsConfig`](AdapterOptionsConfig.md)

Defined in: [adapter/src/lib/\_Types.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L31)

configuration of the connection to controller

***

### dirname?

> `optional` **dirname?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L25)

adapter directory name

***

### error?

> `optional` **error?**: [`ErrorHandler`](../type-aliases/ErrorHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:57](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L57)

Handler to handle uncaught exceptions, return true if no further handling required

***

### fileChange?

> `optional` **fileChange?**: [`FileChangeHandler`](../type-aliases/FileChangeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L41)

callback function (id, file) that will be called if file changed

***

### install?

> `optional` **install?**: [`ReadyHandler`](../type-aliases/ReadyHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:53](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L53)

called when adapter is installed

***

### instance?

> `optional` **instance?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L23)

instance number of adapter

***

### logTransporter?

> `optional` **logTransporter?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L11)

If the adapter collects logs from all adapters (experts only). Default: false

***

### message?

> `optional` **message?**: [`MessageHandler`](../type-aliases/MessageHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:47](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L47)

callback to inform about a new message the adapter

***

### name

> **name**: `string`

Defined in: [adapter/src/lib/\_Types.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L33)

name of the adapter. Must be exactly the same as directory name.

***

### objectChange?

> `optional` **objectChange?**: [`ObjectChangeHandler`](../type-aliases/ObjectChangeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L37)

callback function (id, obj) that will be called if an object changed

***

### objects?

> `optional` **objects?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L21)

if desired to have oObjects. This is a list with all states, channels and devices of this adapter, and it will be updated automatically.

***

### ready?

> `optional` **ready?**: [`ReadyHandler`](../type-aliases/ReadyHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:51](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L51)

called when adapter is ready

***

### reconnect?

> `optional` **reconnect?**: () => [`MaybePromise`](../type-aliases/MaybePromise.md)

Defined in: [adapter/src/lib/\_Types.ts:55](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L55)

called on reconnection to DB

#### Returns

[`MaybePromise`](../type-aliases/MaybePromise.md)

***

### stateChange?

> `optional` **stateChange?**: [`StateChangeHandler`](../type-aliases/StateChangeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:39](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L39)

callback function (id, obj) that will be called if state changed

***

### states?

> `optional` **states?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L19)

if desired to have oStates. This is a list with all states values, and it will be updated automatically.

***

### strictObjectChecks?

> `optional` **strictObjectChecks?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L27)

flag which defaults to true - if true, adapter warns if states are set without a corresponding existing object

***

### subscribable?

> `optional` **subscribable?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L15)

if it is possible for other instances to retrieve states of this adapter automatically

***

### subscribesChange?

> `optional` **subscribesChange?**: (`subs`) => `void`

Defined in: [adapter/src/lib/\_Types.ts:2](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L2)

#### Parameters

##### subs

`Record`\<`string`, \{ `regex`: `RegExp`; \}\>

#### Returns

`void`

***

### systemConfig?

> `optional` **systemConfig?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:35](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L35)

If true, the systemConfig (iobroker.json) will be available in this.systemConfig

***

### uiClientSubscribe?

> `optional` **uiClientSubscribe?**: [`UserInterfaceClientSubscribeHandler`](../type-aliases/UserInterfaceClientSubscribeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L43)

callback function that will be called when a new UI client subscribes

***

### uiClientUnsubscribe?

> `optional` **uiClientUnsubscribe?**: [`UserInterfaceClientUnsubscribeHandler`](../type-aliases/UserInterfaceClientUnsubscribeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L45)

callback function that will be called when a new UI client unsubscribes

***

### unload?

> `optional` **unload?**: [`UnloadHandler`](../type-aliases/UnloadHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:49](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L49)

callback to stop the adapter

***

### useFormatDate?

> `optional` **useFormatDate?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/adapter/src/lib/_Types.ts#L13)

if true, the date format from system.config
