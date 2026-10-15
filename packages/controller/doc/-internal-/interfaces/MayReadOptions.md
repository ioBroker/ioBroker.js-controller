[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MayReadOptions

# Interface: MayReadOptions

Defined in: [adapter/src/lib/\_Types.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L686)

What is to be read, and by whom - see `AdapterClass.mayRead`

## Properties

### fileName?

> `optional` **fileName?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L694)

The file inside `id`, for `type: 'file'`, e.g. `main/vis-views.json`

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L692)

The object, the state, or the adapter a file belongs to, e.g. `vis.0`

***

### type

> **type**: `"object"` \| `"state"` \| `"file"`

Defined in: [adapter/src/lib/\_Types.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L690)

What kind of thing it is: the object itself, the value of a state, or a file of an adapter

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: [adapter/src/lib/\_Types.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L688)

The user the question is about, e.g. `system.user.someone`
