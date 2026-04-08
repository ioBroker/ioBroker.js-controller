[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SystemConfigObject

# Interface: SystemConfigObject

Defined in: [types-dev/objects.d.ts:1271](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L1271)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `string`

Defined in: [types-dev/objects.d.ts:979](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L979)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:986](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L986)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`SystemConfigCommon`](SystemConfigCommon.md)

Defined in: [types-dev/objects.d.ts:1273](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L1273)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:985](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L985)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:987](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L987)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:983](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L983)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:992](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L992)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:990](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L990)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"config"`

Defined in: [types-dev/objects.d.ts:1272](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L1272)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:989](https://github.com/ioBroker/ioBroker.js-controller/blob/45df59755ea2d8846a4d0c4546ada5a076ba64a1/packages/types-dev/objects.d.ts#L989)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
