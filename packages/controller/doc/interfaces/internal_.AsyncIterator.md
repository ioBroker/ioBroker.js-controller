[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / AsyncIterator

# Interface: AsyncIterator<T, TReturn, TNext\>

[<internal>](../modules/internal_.md).AsyncIterator

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TReturn` | `any` |
| `TNext` | `undefined` |

## Hierarchy

- **`AsyncIterator`**

  ↳ [`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)

  ↳ [`AsyncGenerator`](internal_.AsyncGenerator.md)

## Table of contents

### Methods

- [next](internal_.AsyncIterator.md#next)
- [return](internal_.AsyncIterator.md#return)
- [throw](internal_.AsyncIterator.md#throw)

## Methods

### next

▸ **next**(...`args`): `Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `TReturn`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] \| [`TNext`] |

#### Returns

`Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `TReturn`\>\>

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:34

___

### return

▸ `Optional` **return**(`value?`): `Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `TReturn`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `TReturn` \| [`PromiseLike`](internal_.PromiseLike.md)<`TReturn`\> |

#### Returns

`Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `TReturn`\>\>

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:35

___

### throw

▸ `Optional` **throw**(`e?`): `Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `TReturn`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e?` | `any` |

#### Returns

`Promise`<[`IteratorResult`](../modules/internal_.md#iteratorresult)<`T`, `TReturn`\>\>

#### Defined in

node_modules/typescript/lib/lib.es2018.asynciterable.d.ts:36
