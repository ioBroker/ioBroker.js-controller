[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StateObject

# Interface: StateObject

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `string`

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:959](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L959)

***

### acl?

> `optional` **acl**: [`StateACL`](StateACL.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:978](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L978)

***

### common

> **common**: [`StateCommon`](StateCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:977](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L977)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L965)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L967)

***

### native

> **native**: `Record`\<`string`, `any`\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L963)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L972)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L970)

***

### type

> **type**: `"state"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:976](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L976)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/objects.d.ts#L969)
