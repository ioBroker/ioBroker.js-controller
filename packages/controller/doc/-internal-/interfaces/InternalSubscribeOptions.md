[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSubscribeOptions

# Interface: InternalSubscribeOptions

Defined in: [adapter/src/lib/\_Types.ts:652](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L652)

Options for subscribing to states or objects

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L658)

Called once the subscription is registered

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L656)

Optional settings including the user context

***

### pattern

> **pattern**: [`Pattern`](../type-aliases/Pattern.md)

Defined in: [adapter/src/lib/\_Types.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L654)

The pattern to subscribe to
