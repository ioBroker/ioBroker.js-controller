[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceObject

# Interface: InstanceObject

Defined in: [types-dev/objects.d.ts:1237](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1237)

## Extends

- `Omit`\<[`AdapterObject`](AdapterObject.md), `"type"`\>
- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.adapter.${string}.${number}` ``

Defined in: [types-dev/objects.d.ts:1238](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1238)

The ID of this object

#### Overrides

[`AdapterObject`](AdapterObject.md).[`_id`](AdapterObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1049](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1049)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`InstanceCommon`](InstanceCommon.md)

Defined in: [types-dev/objects.d.ts:1240](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1240)

#### Overrides

[`AdapterObject`](AdapterObject.md).[`common`](AdapterObject.md#common)

***

### encryptedNative?

> `optional` **encryptedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1298](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1298)

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`encryptedNative`](AdapterObject.md#encryptednative)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1048](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1048)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1050](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1050)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### instanceObjects?

> `optional` **instanceObjects?**: ([`ChannelObject`](ChannelObject.md) \| [`MetaObject`](MetaObject.md) \| [`FolderObject`](FolderObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`StateObject`](StateObject.md))[]

Defined in: [types-dev/objects.d.ts:1302](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1302)

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`instanceObjects`](AdapterObject.md#instanceobjects)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1046](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1046)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1055](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1055)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### notifications?

> `optional` **notifications?**: [`Notification`](Notification.md)[]

Defined in: [types-dev/objects.d.ts:1300](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1300)

Register notifications for the built-in notification system

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`notifications`](AdapterObject.md#notifications)

***

### objects?

> `optional` **objects?**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Defined in: [types-dev/objects.d.ts:1304](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1304)

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`objects`](AdapterObject.md#objects)

***

### protectedNative?

> `optional` **protectedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1296](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1296)

An array of `native` properties that cannot be accessed from outside the defining adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`protectedNative`](AdapterObject.md#protectednative)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1053](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1053)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"instance"`

Defined in: [types-dev/objects.d.ts:1239](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1239)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1052](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1052)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
