[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetAdapterObjectsOptions

# Interface: InternalGetAdapterObjectsOptions

Defined in: [adapter/src/lib/\_Types.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L540)

Options for reading all objects of the adapter

## Properties

### callback?

> `optional` **callback?**: (`objects`) => `void`

Defined in: [adapter/src/lib/\_Types.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L542)

Called with the adapter's objects

#### Parameters

##### objects

`Record`\<`string`, [`AdapterScopedObject`](../type-aliases/AdapterScopedObject.md)\>

#### Returns

`void`
