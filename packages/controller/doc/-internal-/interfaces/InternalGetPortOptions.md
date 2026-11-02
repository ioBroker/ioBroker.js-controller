[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetPortOptions

# Interface: InternalGetPortOptions

Defined in: [adapter/src/lib/\_Types.ts:343](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L343)

Options for finding a free port

## Properties

### callback?

> `optional` **callback?**: (`port`) => `void`

Defined in: [adapter/src/lib/\_Types.ts:349](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L349)

Called with the free port that was found

#### Parameters

##### port

`number`

#### Returns

`void`

***

### host?

> `optional` **host?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:347](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L347)

The host to bind to

***

### port

> **port**: `number`

Defined in: [adapter/src/lib/\_Types.ts:345](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L345)

The preferred port to start searching from
