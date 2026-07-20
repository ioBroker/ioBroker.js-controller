[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetAdapterObjectsOptions

# Interface: InternalGetAdapterObjectsOptions

Defined in: [adapter/src/lib/\_Types.ts:550](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L550)

Options for reading all objects of the adapter

## Properties

### callback?

> `optional` **callback?**: (`objects`) => `void`

Defined in: [adapter/src/lib/\_Types.ts:552](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L552)

Called with the adapter's objects

#### Parameters

##### objects

`Record`\<`string`, [`AdapterScopedObject`](../type-aliases/AdapterScopedObject.md)\>

#### Returns

`void`
