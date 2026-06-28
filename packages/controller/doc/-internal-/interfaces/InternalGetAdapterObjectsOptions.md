[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetAdapterObjectsOptions

# Interface: InternalGetAdapterObjectsOptions

Defined in: [adapter/src/lib/\_Types.ts:539](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L539)

Options for reading all objects of the adapter

## Properties

### callback?

> `optional` **callback?**: (`objects`) => `void`

Defined in: [adapter/src/lib/\_Types.ts:541](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L541)

Called with the adapter's objects

#### Parameters

##### objects

`Record`\<`string`, [`AdapterScopedObject`](../type-aliases/AdapterScopedObject.md)\>

#### Returns

`void`
