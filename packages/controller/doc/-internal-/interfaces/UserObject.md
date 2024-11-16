[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserObject

# Interface: UserObject

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: \`system.user.$\{string\}\`

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:1138](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L1138)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:908](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L908)

***

### common

> **common**: [`UserCommon`](UserCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1140](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L1140)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:907](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L907)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:909](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L909)

***

### native

> **native**: `Record`\<`string`, `any`\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L905)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L914)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:912](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L912)

***

### type

> **type**: `"user"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1139](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L1139)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/db3148f4f009815e1f45f53311ac77bd26045ce1/packages/types-dev/objects.d.ts#L911)
