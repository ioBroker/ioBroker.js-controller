[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DesignObject

# Interface: DesignObject

Defined in: [types-dev/objects.d.ts:1411](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1411)

## Extends

- `Omit`\<[`BaseObject`](BaseObject.md), `"common"`\>

## Properties

### \_id

> **\_id**: `` `_design/${string}` ``

Defined in: [types-dev/objects.d.ts:1414](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1414)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1090)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: [`OtherCommon`](OtherCommon.md)

Defined in: [types-dev/objects.d.ts:1416](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1416)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1089](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1089)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1091](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1091)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### language

> **language**: `"javascript"`

Defined in: [types-dev/objects.d.ts:1415](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1415)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1087](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1087)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1096)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"design"`

Defined in: [types-dev/objects.d.ts:1413](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1413)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1093)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

***

### views

> **views**: `Record`\<`string`, \{ `map`: `string`; \}\>

Defined in: [types-dev/objects.d.ts:1417](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1417)
