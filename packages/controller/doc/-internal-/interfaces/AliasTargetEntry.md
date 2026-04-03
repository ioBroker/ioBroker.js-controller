[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AliasTargetEntry

# Interface: AliasTargetEntry

Defined in: [adapter/src/lib/\_Types.ts:222](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/adapter/src/lib/_Types.ts#L222)

## Properties

### alias

> **alias**: \{ `id`: `string` \| \{ `read`: `string`; `write`: `string`; \}; `read?`: `string`; `write?`: `string`; \} \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/adapter/src/lib/_Types.ts#L223)

#### Union Members

##### Type Literal

\{ `id`: `string` \| \{ `read`: `string`; `write`: `string`; \}; `read?`: `string`; `write?`: `string`; \}

##### id

> **id**: `string` \| \{ `read`: `string`; `write`: `string`; \}

The target state id

##### read?

> `optional` **read?**: `string`

An optional conversion function when reading, e.g. `"(val − 32) * 5/9"`

##### write?

> `optional` **write?**: `string`

An optional conversion function when reading, e.g. `"(val * 9/5) + 32"`

***

`undefined`

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:224](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/adapter/src/lib/_Types.ts#L224)

***

### max?

> `optional` **max?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/adapter/src/lib/_Types.ts#L227)

***

### min?

> `optional` **min?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:228](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/adapter/src/lib/_Types.ts#L228)

***

### pattern

> **pattern**: `string`

Defined in: [adapter/src/lib/\_Types.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/adapter/src/lib/_Types.ts#L225)

***

### type?

> `optional` **type?**: [`CommonType`](../type-aliases/CommonType.md)

Defined in: [adapter/src/lib/\_Types.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/adapter/src/lib/_Types.ts#L226)

***

### unit?

> `optional` **unit?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/adapter/src/lib/_Types.ts#L229)
