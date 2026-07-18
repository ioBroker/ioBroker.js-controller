[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterContext

# Interface: AdapterContext

Defined in: [adapter/src/lib/adapter/context.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L13)

Live view of the adapter's shared runtime state, passed to managers at construction time.

The mutable fields are exposed as getter properties so late-bound values (DB clients,
namespace, host) stay live: the adapter builds one context whose getters read its own
fields, and every manager reads the same object.

## Properties

### common

> `readonly` **common**: [`InstanceCommon`](InstanceCommon.md) \| `undefined`

Defined in: [adapter/src/lib/adapter/context.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L19)

Current adapter common config

***

### config

> `readonly` **config**: [`AdapterConfig`](AdapterConfig.md)

Defined in: [adapter/src/lib/adapter/context.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L21)

Current adapter instance config (native)

***

### host

> `readonly` **host**: `string` \| `undefined`

Defined in: [adapter/src/lib/adapter/context.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L23)

Current host name (may be undefined before init)

***

### logger

> `readonly` **logger**: `Logger`

Defined in: [adapter/src/lib/adapter/context.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L29)

Logger instance

***

### namespace

> `readonly` **namespace**: `` `${string}.${number}` ``

Defined in: [adapter/src/lib/adapter/context.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L25)

Current adapter namespace, e.g. `"adapter.0"`

***

### namespaceLog

> `readonly` **namespaceLog**: `string`

Defined in: [adapter/src/lib/adapter/context.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L27)

Current namespace string used in log messages

***

### objects

> `readonly` **objects**: [`ObjectsInRedisClient`](../classes/ObjectsInRedisClient.md) \| `null` \| `undefined`

Defined in: [adapter/src/lib/adapter/context.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L17)

Current objects DB client

***

### states

> `readonly` **states**: [`StateRedisClient`](../classes/StateRedisClient.md) \| `null` \| `undefined`

Defined in: [adapter/src/lib/adapter/context.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L15)

Current states DB client

***

### uiMessagingController

> `readonly` **uiMessagingController**: [`UserInterfaceMessagingController`](../classes/UserInterfaceMessagingController.md)

Defined in: [adapter/src/lib/adapter/context.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/adapter/context.ts#L31)

Controller for UI messaging
