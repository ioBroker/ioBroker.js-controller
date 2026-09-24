[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RegisteredResource

# Type Alias: RegisteredResource\<T\>

> **RegisteredResource**\<`T`\> = `{ [K in T]: { data: UsedResourceDataMap[K]; instance: string; isBlocked: boolean; ts: number; type: K } }`\[`T`\]

Defined in: [types-dev/index.d.ts:191](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L191)

A registered resource as stored on the host: the discriminating `type`, the type-specific payload
in `data` and the ownership/bookkeeping fields (`instance`, `ts`, `isBlocked`).

The payload is nested on purpose. If it were merged into this object, a payload key could shadow a
bookkeeping field - an entry could then claim a foreign `instance` or a `type` that does not match
the bucket it is stored in, and would be unreachable for all by-instance operations. Nesting makes
that impossible for every current and future payload type.

## Type Parameters

### T

`T` *extends* [`UsedResourceType`](UsedResourceType.md) = [`UsedResourceType`](UsedResourceType.md)
