[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCheckPasswordOptions

# Interface: InternalCheckPasswordOptions

Defined in: [adapter/src/lib/\_Types.ts:355](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L355)

Options for checking a user's password

## Properties

### callback

> **callback**: [`CheckPasswordCallback`](../type-aliases/CheckPasswordCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:363](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L363)

Called with the result of the check

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:361](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L361)

Optional settings including the user context

***

### pw

> **pw**: `string`

Defined in: [adapter/src/lib/\_Types.ts:359](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L359)

The password to verify

***

### user

> **user**: `string`

Defined in: [adapter/src/lib/\_Types.ts:357](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L357)

The user to check
