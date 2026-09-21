[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialStateObject

# Interface: PartialStateObject

Defined in: [types-dev/objects.d.ts:1021](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1021)

## Extends

- `Partial`\<`Omit`\<[`StateObject`](StateObject.md), `"common"` \| `"acl"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:999](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L999)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: `Partial`\<[`StateACL`](StateACL.md)\>

Defined in: [types-dev/objects.d.ts:1023](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1023)

***

### common?

> `optional` **common?**: `Partial`\<[`StateCommon`](StateCommon.md)\>

Defined in: [types-dev/objects.d.ts:1022](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1022)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1005)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1007)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1003](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1003)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1012](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1012)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1010)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"state"`

Defined in: [types-dev/objects.d.ts:1016](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1016)

#### Inherited from

[`StateObject`](StateObject.md).[`type`](StateObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1009)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
