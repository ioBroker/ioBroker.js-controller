[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PromiseLike

# Interface: PromiseLike<T\>

[<internal>](../modules/internal_.md).PromiseLike

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [then](internal_.PromiseLike.md#then)

## Methods

### then

▸ **then**<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): [`PromiseLike`](internal_.PromiseLike.md)<`TResult1` \| `TResult2`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult1` | `T` |
| `TResult2` | `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onfulfilled?` | ``null`` \| (`value`: `T`) => `TResult1` \| [`PromiseLike`](internal_.PromiseLike.md)<`TResult1`\> |  |
| `onrejected?` | ``null`` \| (`reason`: `any`) => `TResult2` \| [`PromiseLike`](internal_.PromiseLike.md)<`TResult2`\> |  |

#### Returns

[`PromiseLike`](internal_.PromiseLike.md)<`TResult1` \| `TResult2`\>

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1495
