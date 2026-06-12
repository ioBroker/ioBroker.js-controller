[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterObject

# Interface: AdapterObject

Defined in: [types-dev/objects.d.ts:1218](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1218)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: [`Adapter`](../type-aliases/Adapter.md)

Defined in: [types-dev/objects.d.ts:1219](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1219)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L994)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`AdapterCommon`](AdapterCommon.md)

Defined in: [types-dev/objects.d.ts:1221](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1221)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### encryptedNative?

> `optional` **encryptedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1225](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1225)

Like protectedNative, but the properties are also encrypted and decrypted automatically

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### instanceObjects

> **instanceObjects**: ([`StateObject`](StateObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`ChannelObject`](ChannelObject.md) \| [`FolderObject`](FolderObject.md) \| [`MetaObject`](MetaObject.md))[]

Defined in: [types-dev/objects.d.ts:1229](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1229)

Objects created for each instance, inside the namespace of this adapter

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:991](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L991)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1000)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### notifications?

> `optional` **notifications?**: [`Notification`](Notification.md)[]

Defined in: [types-dev/objects.d.ts:1227](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1227)

Register notifications for the built-in notification system

***

### objects

> **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Defined in: [types-dev/objects.d.ts:1231](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1231)

Objects created for the adapter, anywhere in the global namespace

***

### protectedNative?

> `optional` **protectedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1223](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1223)

An array of `native` properties that cannot be accessed from outside the defining adapter

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L998)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"adapter"`

Defined in: [types-dev/objects.d.ts:1220](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1220)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L997)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
