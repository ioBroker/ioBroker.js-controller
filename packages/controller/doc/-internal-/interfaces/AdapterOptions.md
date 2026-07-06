[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterOptions

# Interface: AdapterOptions

Defined in: [adapter/src/lib/\_Types.ts:2](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L2)

Options passed to the adapter constructor

## Properties

### compact?

> `optional` **compact?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:32](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L32)

If true, runs in compact mode

***

### compactInstance?

> `optional` **compactInstance?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:20](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L20)

compact group instance if running in compact mode

***

### config?

> `optional` **config?**: [`AdapterOptionsConfig`](AdapterOptionsConfig.md)

Defined in: [adapter/src/lib/\_Types.ts:34](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L34)

configuration of the connection to controller

***

### dirname?

> `optional` **dirname?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L28)

adapter directory name

***

### error?

> `optional` **error?**: [`ErrorHandler`](../type-aliases/ErrorHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:60](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L60)

Handler to handle uncaught exceptions, return true if no further handling required

***

### fileChange?

> `optional` **fileChange?**: [`FileChangeHandler`](../type-aliases/FileChangeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:44](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L44)

callback function (id, file) that will be called if the file changed

***

### install?

> `optional` **install?**: [`ReadyHandler`](../type-aliases/ReadyHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:56](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L56)

called when adapter is installed

***

### instance?

> `optional` **instance?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:26](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L26)

instance number of adapter

***

### logTransporter?

> `optional` **logTransporter?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:14](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L14)

If the adapter collects logs from all adapters (experts only). Default: false

***

### message?

> `optional` **message?**: [`MessageHandler`](../type-aliases/MessageHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:50](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L50)

callback to inform about a new message the adapter

***

### name

> **name**: `string`

Defined in: [adapter/src/lib/\_Types.ts:36](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L36)

name of the adapter. Must be exactly the same as the directory name.

***

### objectChange?

> `optional` **objectChange?**: [`ObjectChangeHandler`](../type-aliases/ObjectChangeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:40](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L40)

callback function (id, obj) that will be called if an object changed

***

### objects?

> `optional` **objects?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:24](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L24)

if desired to have oObjects. This is a list with all states, channels and devices of this adapter, and it will be updated automatically.

***

### ready?

> `optional` **ready?**: [`ReadyHandler`](../type-aliases/ReadyHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:54](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L54)

called when adapter is ready

***

### reconnect?

> `optional` **reconnect?**: () => [`MaybePromise`](../type-aliases/MaybePromise.md)

Defined in: [adapter/src/lib/\_Types.ts:58](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L58)

called on reconnection to DB

#### Returns

[`MaybePromise`](../type-aliases/MaybePromise.md)

***

### stateChange?

> `optional` **stateChange?**: [`StateChangeHandler`](../type-aliases/StateChangeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:42](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L42)

callback function (id, obj) that will be called if the state changed

***

### states?

> `optional` **states?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L22)

if desired to have oStates. This is a list with all state values, and it will be updated automatically.

***

### strictObjectChecks?

> `optional` **strictObjectChecks?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L30)

flag which defaults to true - if true, adapter warns if states are set without a corresponding existing object

***

### subscribable?

> `optional` **subscribable?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:18](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L18)

if it is possible for other instances to retrieve states of this adapter automatically

***

### subscribesChange?

> `optional` **subscribesChange?**: (`subs`) => `void`

Defined in: [adapter/src/lib/\_Types.ts:4](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L4)

Called with the current subscriptions whenever they change

#### Parameters

##### subs

`Record`\<`string`, \{ `regex`: `string`; \}\>

#### Returns

`void`

***

### systemConfig?

> `optional` **systemConfig?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:38](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L38)

If true, the systemConfig (iobroker.json) will be available in this.systemConfig

***

### uiClientSubscribe?

> `optional` **uiClientSubscribe?**: [`UserInterfaceClientSubscribeHandler`](../type-aliases/UserInterfaceClientSubscribeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:46](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L46)

callback function that will be called when a new UI client subscribes

***

### uiClientUnsubscribe?

> `optional` **uiClientUnsubscribe?**: [`UserInterfaceClientUnsubscribeHandler`](../type-aliases/UserInterfaceClientUnsubscribeHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:48](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L48)

callback function that will be called when a new UI client unsubscribes

***

### unload?

> `optional` **unload?**: [`UnloadHandler`](../type-aliases/UnloadHandler.md)

Defined in: [adapter/src/lib/\_Types.ts:52](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L52)

callback to stop the adapter

***

### useFormatDate?

> `optional` **useFormatDate?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:16](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L16)

if true, the date format from system.config
