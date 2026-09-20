[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialDesignObject

# Interface: PartialDesignObject

Defined in: [types-dev/objects.d.ts:1336](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1336)

## Extends

- `Partial`\<`Omit`\<[`DesignObject`](DesignObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `_design/${string}` ``

Defined in: [types-dev/objects.d.ts:1330](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1330)

The ID of this object

#### Inherited from

[`DesignObject`](DesignObject.md).[`_id`](DesignObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1006)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`OtherCommon`](OtherCommon.md)\>

Defined in: [types-dev/objects.d.ts:1337](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1337)

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

### language?

> `optional` **language?**: `"javascript"`

Defined in: [types-dev/objects.d.ts:1331](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1331)

#### Inherited from

[`DesignObject`](DesignObject.md).[`language`](DesignObject.md#language)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

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

### type?

> `optional` **type?**: `"design"`

Defined in: [types-dev/objects.d.ts:1329](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1329)

#### Inherited from

[`DesignObject`](DesignObject.md).[`type`](DesignObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1009)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

***

### views?

> `optional` **views?**: `Record`\<`string`, \{ `map`: `string`; \}\>

Defined in: [types-dev/objects.d.ts:1333](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1333)

#### Inherited from

`Partial.views`
