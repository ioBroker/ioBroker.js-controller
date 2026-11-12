[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStateOptions

# Interface: InternalGetStateOptions

Defined in: [adapter/src/lib/\_Types.ts:756](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/_Types.ts#L756)

Options for reading a state

## Properties

### callback?

> `optional` **callback?**: [`GetStateCallback`](../type-aliases/GetStateCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:762](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/_Types.ts#L762)

Called with the state

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:758](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/_Types.ts#L758)

The id of the state

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:760](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/_Types.ts#L760)

Optional settings including the user context
