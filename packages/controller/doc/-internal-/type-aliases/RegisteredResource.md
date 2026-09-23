[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RegisteredResource

# Type Alias: RegisteredResource\<T\>

> **RegisteredResource**\<`T`\> = `{ [K in T]: { data: UsedResourceDataMap[K]; instance: string; isBlocked: boolean; ts: number; type: K } }`\[`T`\]

Defined in: [types-dev/index.d.ts:190](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/index.d.ts#L190)

A registered resource as stored on the host: the discriminating `type`, the type-specific payload
in `data` and the ownership/bookkeeping fields (`instance`, `ts`, `isBlocked`).

The payload is nested on purpose. If it were merged into this object, a payload key could shadow a
bookkeeping field - an entry could then claim a foreign `instance` or a `type` that does not match
the bucket it is stored in, and would be unreachable for all by-instance operations. Nesting makes
that impossible for every current and future payload type.

## Type Parameters

### T

`T` *extends* [`UsedResourceType`](UsedResourceType.md) = [`UsedResourceType`](UsedResourceType.md)
