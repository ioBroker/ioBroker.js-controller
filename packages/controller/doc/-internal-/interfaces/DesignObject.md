[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DesignObject

# Interface: DesignObject

Defined in: [types-dev/objects.d.ts:1327](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1327)

## Extends

- `Omit`\<[`BaseObject`](BaseObject.md), `"common"`\>

## Properties

### \_id

> **\_id**: `` `_design/${string}` ``

Defined in: [types-dev/objects.d.ts:1330](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1330)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1006)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: [`OtherCommon`](OtherCommon.md)

Defined in: [types-dev/objects.d.ts:1332](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1332)

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

### language

> **language**: `"javascript"`

Defined in: [types-dev/objects.d.ts:1331](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1331)

***

### native

> **native**: `Record`\<`string`, `any`\>

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

### type

> **type**: `"design"`

Defined in: [types-dev/objects.d.ts:1329](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1329)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1009)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

***

### views

> **views**: `Record`\<`string`, \{ `map`: `string`; \}\>

Defined in: [types-dev/objects.d.ts:1333](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1333)
