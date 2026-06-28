[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceObject

# Interface: InstanceObject

Defined in: [types-dev/objects.d.ts:1182](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1182)

## Extends

- `Omit`\<[`AdapterObject`](AdapterObject.md), `"type"`\>.[`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.adapter.${string}.${number}` ``

Defined in: [types-dev/objects.d.ts:1183](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1183)

The ID of this object

#### Overrides

[`AdapterObject`](AdapterObject.md).[`_id`](AdapterObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L994)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`InstanceCommon`](InstanceCommon.md)

Defined in: [types-dev/objects.d.ts:1185](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1185)

#### Overrides

[`AdapterObject`](AdapterObject.md).[`common`](AdapterObject.md#common)

***

### encryptedNative?

> `optional` **encryptedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1243](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1243)

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`encryptedNative`](AdapterObject.md#encryptednative)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### instanceObjects

> **instanceObjects**: ([`ChannelObject`](ChannelObject.md) \| [`MetaObject`](MetaObject.md) \| [`FolderObject`](FolderObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`StateObject`](StateObject.md))[]

Defined in: [types-dev/objects.d.ts:1247](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1247)

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`instanceObjects`](AdapterObject.md#instanceobjects)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:991](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L991)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1000)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### notifications?

> `optional` **notifications?**: [`Notification`](Notification.md)[]

Defined in: [types-dev/objects.d.ts:1245](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1245)

Register notifications for the built-in notification system

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`notifications`](AdapterObject.md#notifications)

***

### objects

> **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Defined in: [types-dev/objects.d.ts:1249](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1249)

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`objects`](AdapterObject.md#objects)

***

### protectedNative?

> `optional` **protectedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1241](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1241)

An array of `native` properties that cannot be accessed from outside the defining adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`protectedNative`](AdapterObject.md#protectednative)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L998)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"instance"`

Defined in: [types-dev/objects.d.ts:1184](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L1184)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/types-dev/objects.d.ts#L997)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
