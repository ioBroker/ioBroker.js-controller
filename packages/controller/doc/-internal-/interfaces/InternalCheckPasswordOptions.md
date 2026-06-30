[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCheckPasswordOptions

# Interface: InternalCheckPasswordOptions

Defined in: [adapter/src/lib/\_Types.ts:354](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L354)

Options for checking a user's password

## Properties

### callback

> **callback**: [`CheckPasswordCallback`](../type-aliases/CheckPasswordCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:362](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L362)

Called with the result of the check

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:360](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L360)

Optional settings including the user context

***

### pw

> **pw**: `string`

Defined in: [adapter/src/lib/\_Types.ts:358](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L358)

The password to verify

***

### user

> **user**: `string`

Defined in: [adapter/src/lib/\_Types.ts:356](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L356)

The user to check
