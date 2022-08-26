[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / IterableIterator

# Interface: IterableIterator<T\>

[<internal>](../modules/internal_.md).IterableIterator

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`Iterator`](internal_.Iterator.md)<`T`\>

  ↳ **`IterableIterator`**

## Table of contents

### Methods

- [[iterator]](internal_.IterableIterator.md#[iterator])
- [next](internal_.IterableIterator.md#next)
- [return](internal_.IterableIterator.md#return)
- [throw](internal_.IterableIterator.md#throw)

## Methods

### [iterator]

▸ **[iterator]**(): [`IterableIterator`](internal_.IterableIterator.md)<`T`\>

#### Returns

[`IterableIterator`](internal_.IterableIterator.md)<`T`\>

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:55

___

### next

▸ **next**(...`args`): [`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] \| [`undefined`] |

#### Returns

[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>

#### Inherited from

[Iterator](internal_.Iterator.md).[next](internal_.Iterator.md#next)

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:45

___

### return

▸ `Optional` **return**(`value?`): [`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `any` |

#### Returns

[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>

#### Inherited from

[Iterator](internal_.Iterator.md).[return](internal_.Iterator.md#return)

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:46

___

### throw

▸ `Optional` **throw**(`e?`): [`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e?` | `any` |

#### Returns

[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `any`\>

#### Inherited from

[Iterator](internal_.Iterator.md).[throw](internal_.Iterator.md#throw)

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:47
