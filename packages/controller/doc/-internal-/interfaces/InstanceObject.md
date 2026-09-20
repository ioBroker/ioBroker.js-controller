[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceObject

# Interface: InstanceObject

Defined in: [types-dev/objects.d.ts:1205](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1205)

## Extends

- `Omit`\<[`AdapterObject`](AdapterObject.md), `"type"`\>.[`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.adapter.${string}.${number}` ``

Defined in: [types-dev/objects.d.ts:1206](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1206)

The ID of this object

#### Overrides

[`AdapterObject`](AdapterObject.md).[`_id`](AdapterObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1017](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1017)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`InstanceCommon`](InstanceCommon.md)

Defined in: [types-dev/objects.d.ts:1208](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1208)

#### Overrides

[`AdapterObject`](AdapterObject.md).[`common`](AdapterObject.md#common)

***

### encryptedNative?

> `optional` **encryptedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1266](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1266)

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`encryptedNative`](AdapterObject.md#encryptednative)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1016](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1016)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1018](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1018)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### instanceObjects

> **instanceObjects**: ([`ChannelObject`](ChannelObject.md) \| [`MetaObject`](MetaObject.md) \| [`FolderObject`](FolderObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`StateObject`](StateObject.md))[]

Defined in: [types-dev/objects.d.ts:1270](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1270)

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`instanceObjects`](AdapterObject.md#instanceobjects)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1014](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1014)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1023](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1023)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### notifications?

> `optional` **notifications?**: [`Notification`](Notification.md)[]

Defined in: [types-dev/objects.d.ts:1268](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1268)

Register notifications for the built-in notification system

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`notifications`](AdapterObject.md#notifications)

***

### objects

> **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Defined in: [types-dev/objects.d.ts:1272](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1272)

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`objects`](AdapterObject.md#objects)

***

### protectedNative?

> `optional` **protectedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1264](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1264)

An array of `native` properties that cannot be accessed from outside the defining adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`protectedNative`](AdapterObject.md#protectednative)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1021](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1021)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"instance"`

Defined in: [types-dev/objects.d.ts:1207](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1207)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1020](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1020)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
