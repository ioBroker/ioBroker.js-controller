[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AliasTargetEntry

# Interface: AliasTargetEntry

Defined in: [adapter/src/lib/\_Types.ts:261](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L261)

A single target of an alias

## Properties

### alias

> **alias**: \{ `id`: `string` \| \{ `read`: `string`; `write`: `string`; \}; `read?`: `string`; `write?`: `string`; \} \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:263](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L263)

Alias definition of the target's common section

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

Defined in: [adapter/src/lib/\_Types.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L265)

The id of the target state

***

### max?

> `optional` **max?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:271](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L271)

Maximum value of the target

***

### min?

> `optional` **min?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L273)

Minimum value of the target

***

### pattern

> **pattern**: `string`

Defined in: [adapter/src/lib/\_Types.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L267)

The subscription pattern of the target

***

### type?

> `optional` **type?**: [`CommonType`](../type-aliases/CommonType.md)

Defined in: [adapter/src/lib/\_Types.ts:269](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L269)

Common type of the target

***

### unit?

> `optional` **unit?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:275](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L275)

Unit of the target value
