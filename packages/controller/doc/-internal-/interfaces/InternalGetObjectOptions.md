[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectOptions

# Interface: InternalGetObjectOptions\<T\>

Defined in: [adapter/src/lib/\_Types.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/adapter/src/lib/_Types.ts#L506)

Options for reading an object

## Type Parameters

### T

`T` *extends* `string` = `string`

## Properties

### callback?

> `optional` **callback?**: [`GetObjectCallback`](../type-aliases/GetObjectCallback.md)\<`T`\>

Defined in: [adapter/src/lib/\_Types.ts:512](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/adapter/src/lib/_Types.ts#L512)

Called with the object

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/adapter/src/lib/_Types.ts#L508)

The id of the object

***

### options

> **options**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:510](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/adapter/src/lib/_Types.ts#L510)

Optional settings including the user context
