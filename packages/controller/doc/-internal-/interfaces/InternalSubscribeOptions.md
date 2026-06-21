[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSubscribeOptions

# Interface: InternalSubscribeOptions

Defined in: [adapter/src/lib/\_Types.ts:638](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L638)

Options for subscribing to states or objects

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L644)

Called once the subscription is registered

***

### options?

> `optional` **options?**: `Record`\<`string`, `any`\> \| `null`

Defined in: [adapter/src/lib/\_Types.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L642)

Optional settings including the user context

***

### pattern

> **pattern**: [`Pattern`](../type-aliases/Pattern.md)

Defined in: [adapter/src/lib/\_Types.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L640)

The pattern to subscribe to
