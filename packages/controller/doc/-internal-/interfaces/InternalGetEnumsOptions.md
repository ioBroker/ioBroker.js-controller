[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetEnumsOptions

# Interface: InternalGetEnumsOptions

Defined in: [adapter/src/lib/\_Types.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L580)

Options for reading multiple enums

## Properties

### \_enumList?

> `optional` **\_enumList?**: [`EnumList`](../type-aliases/EnumList.md)

Defined in: [adapter/src/lib/\_Types.ts:582](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L582)

The list of enums to read

***

### callback?

> `optional` **callback?**: [`GetEnumsCallback`](../type-aliases/GetEnumsCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:586](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L586)

Called with the enums

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:584](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L584)

Optional settings including the user context
