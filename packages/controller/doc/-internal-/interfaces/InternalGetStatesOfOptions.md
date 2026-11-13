[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStatesOfOptions

# Interface: InternalGetStatesOfOptions

Defined in: [adapter/src/lib/\_Types.ts:835](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L835)

Options for reading the states of a device or channel

## Properties

### callback

> **callback**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`StateObject`](StateObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:843](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L843)

Called with the states

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:841](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L841)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L839)

The parent channel name

***

### parentDevice

> **parentDevice**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L837)

The parent device name
