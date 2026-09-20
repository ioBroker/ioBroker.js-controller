[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SystemConfigObject

# Interface: SystemConfigObject

Defined in: [types-dev/objects.d.ts:1309](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1309)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `string`

Defined in: [types-dev/objects.d.ts:999](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L999)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1006)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`SystemConfigCommon`](SystemConfigCommon.md)

Defined in: [types-dev/objects.d.ts:1311](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1311)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1005)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1007)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1003](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1003)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1012](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1012)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1010)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"config"`

Defined in: [types-dev/objects.d.ts:1310](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1310)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1009)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
