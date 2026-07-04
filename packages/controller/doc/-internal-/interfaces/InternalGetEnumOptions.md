[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetEnumOptions

# Interface: InternalGetEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L560)

Options for reading a single enum

## Properties

### \_enum

> **\_enum**: `string`

Defined in: [adapter/src/lib/\_Types.ts:562](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L562)

The name of the enum to read

***

### callback?

> `optional` **callback?**: [`GetEnumCallback`](../type-aliases/GetEnumCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:566](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L566)

Called with the enum

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L564)

Optional settings including the user context
