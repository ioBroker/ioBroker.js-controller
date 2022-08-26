[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / AsyncIterableIterator

# Interface: AsyncIterableIterator<T\>

[<internal>](../modules/internal_.md).AsyncIterableIterator

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`AsyncIterator`](internal_.AsyncIterator.md)<`T`\>

  ↳ **`AsyncIterableIterator`**

## Table of contents

### Methods

- [[asyncIterator]](internal_.AsyncIterableIterator.md#[asynciterator])
- [next](internal_.AsyncIterableIterator.md#next)
- [return](internal_.AsyncIterableIterator.md#return)
- [throw](internal_.AsyncIterableIterator.md#throw)

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): [`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`T`\>

#### Returns

[`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`T`\>

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:44

___

### next

▸ **next**(...`args`): `Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] \| [`undefined`] |

#### Returns

`Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>\>

#### Inherited from

[AsyncIterator](internal_.AsyncIterator.md).[next](internal_.AsyncIterator.md#next)

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:34

___

### return

▸ `Optional` **return**(`value?`): `Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `any` |

#### Returns

`Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>\>

#### Inherited from

[AsyncIterator](internal_.AsyncIterator.md).[return](internal_.AsyncIterator.md#return)

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:35

___

### throw

▸ `Optional` **throw**(`e?`): `Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e?` | `any` |

#### Returns

`Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>\>

#### Inherited from

[AsyncIterator](internal_.AsyncIterator.md).[throw](internal_.AsyncIterator.md#throw)

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:36
