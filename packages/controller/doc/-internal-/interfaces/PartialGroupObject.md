[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialGroupObject

# Interface: PartialGroupObject

Defined in: [types-dev/objects.d.ts:1389](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1389)

## Extends

- `Partial`\<`Omit`\<[`GroupObject`](GroupObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `system.group.${string}` ``

Defined in: [types-dev/objects.d.ts:1384](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1384)

The ID of this object

#### Inherited from

[`GroupObject`](GroupObject.md).[`_id`](GroupObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1099)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`GroupCommon`](GroupCommon.md)\>

Defined in: [types-dev/objects.d.ts:1390](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1390)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1098](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1098)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1100](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1100)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1096)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1105](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1105)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1103](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1103)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"group"`

Defined in: [types-dev/objects.d.ts:1385](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1385)

#### Inherited from

[`GroupObject`](GroupObject.md).[`type`](GroupObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1102](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1102)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
