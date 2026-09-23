[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialStateObject

# Interface: PartialStateObject

Defined in: [types-dev/objects.d.ts:1034](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1034)

## Extends

- `Partial`\<`Omit`\<[`StateObject`](StateObject.md), `"common"` \| `"acl"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:1012](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1012)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: `Partial`\<[`StateACL`](StateACL.md)\>

Defined in: [types-dev/objects.d.ts:1036](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1036)

***

### common?

> `optional` **common?**: `Partial`\<[`StateCommon`](StateCommon.md)\>

Defined in: [types-dev/objects.d.ts:1035](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1035)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1018](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1018)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1020](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1020)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1016](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1016)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1025](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1025)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1023](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1023)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"state"`

Defined in: [types-dev/objects.d.ts:1029](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1029)

#### Inherited from

[`StateObject`](StateObject.md).[`type`](StateObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1022](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/objects.d.ts#L1022)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
