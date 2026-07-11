[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSubscribeOptions

# Interface: InternalSubscribeOptions

Defined in: [adapter/src/lib/\_Types.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L642)

Options for subscribing to states or objects

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:648](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L648)

Called once the subscription is registered

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L646)

Optional settings including the user context

***

### pattern

> **pattern**: [`Pattern`](../type-aliases/Pattern.md)

Defined in: [adapter/src/lib/\_Types.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L644)

The pattern to subscribe to
