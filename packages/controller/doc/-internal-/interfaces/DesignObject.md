[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DesignObject

# Interface: DesignObject

Defined in: [types-dev/objects.d.ts:1414](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1414)

## Extends

- `Omit`\<[`BaseObject`](BaseObject.md), `"common"`\>

## Properties

### \_id

> **\_id**: `` `_design/${string}` ``

Defined in: [types-dev/objects.d.ts:1417](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1417)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1093)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: [`OtherCommon`](OtherCommon.md)

Defined in: [types-dev/objects.d.ts:1419](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1419)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1092)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### language

> **language**: `"javascript"`

Defined in: [types-dev/objects.d.ts:1418](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1418)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1090)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1099)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1097](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1097)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"design"`

Defined in: [types-dev/objects.d.ts:1416](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1416)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1096)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

***

### views

> **views**: `Record`\<`string`, \{ `map`: `string`; \}\>

Defined in: [types-dev/objects.d.ts:1420](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1420)
