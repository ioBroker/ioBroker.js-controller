[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DesignObject

# Interface: DesignObject

Defined in: [types-dev/objects.d.ts:1340](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1340)

## Extends

- `Omit`\<[`BaseObject`](BaseObject.md), `"common"`\>

## Properties

### \_id

> **\_id**: `` `_design/${string}` ``

Defined in: [types-dev/objects.d.ts:1343](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1343)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1019](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1019)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: [`OtherCommon`](OtherCommon.md)

Defined in: [types-dev/objects.d.ts:1345](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1345)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1018](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1018)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1020](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1020)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### language

> **language**: `"javascript"`

Defined in: [types-dev/objects.d.ts:1344](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1344)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1016](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1016)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1025](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1025)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1023](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1023)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"design"`

Defined in: [types-dev/objects.d.ts:1342](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1342)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1022](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1022)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

***

### views

> **views**: `Record`\<`string`, \{ `map`: `string`; \}\>

Defined in: [types-dev/objects.d.ts:1346](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1346)
