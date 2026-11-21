[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserObject

# Interface: UserObject

Defined in: [types-dev/objects.d.ts:1364](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1364)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1365](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1365)

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

### common

> **common**: [`UserCommon`](UserCommon.md)

Defined in: [types-dev/objects.d.ts:1367](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1367)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

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

> **type**: `"user"`

Defined in: [types-dev/objects.d.ts:1366](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1366)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1093)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
