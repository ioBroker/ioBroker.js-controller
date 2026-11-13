[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceObject

# Interface: InstanceObject

Defined in: [types-dev/objects.d.ts:1265](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1265)

## Extends

- `Omit`\<[`AdapterObject`](AdapterObject.md), `"type"`\>
- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.adapter.${string}.${number}` ``

Defined in: [types-dev/objects.d.ts:1266](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1266)

The ID of this object

#### Overrides

[`AdapterObject`](AdapterObject.md).[`_id`](AdapterObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1077](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1077)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`InstanceCommon`](InstanceCommon.md)

Defined in: [types-dev/objects.d.ts:1268](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1268)

#### Overrides

[`AdapterObject`](AdapterObject.md).[`common`](AdapterObject.md#common)

***

### encryptedNative?

> `optional` **encryptedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1326](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1326)

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`encryptedNative`](AdapterObject.md#encryptednative)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1076](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1076)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1078](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1078)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### instanceObjects?

> `optional` **instanceObjects?**: ([`ChannelObject`](ChannelObject.md) \| [`MetaObject`](MetaObject.md) \| [`FolderObject`](FolderObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`StateObject`](StateObject.md))[]

Defined in: [types-dev/objects.d.ts:1330](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1330)

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`instanceObjects`](AdapterObject.md#instanceobjects)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1074](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1074)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1083](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1083)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### notifications?

> `optional` **notifications?**: [`Notification`](Notification.md)[]

Defined in: [types-dev/objects.d.ts:1328](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1328)

Register notifications for the built-in notification system

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`notifications`](AdapterObject.md#notifications)

***

### objects?

> `optional` **objects?**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Defined in: [types-dev/objects.d.ts:1332](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1332)

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`objects`](AdapterObject.md#objects)

***

### protectedNative?

> `optional` **protectedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1324](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1324)

An array of `native` properties that cannot be accessed from outside the defining adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`protectedNative`](AdapterObject.md#protectednative)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1081](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1081)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"instance"`

Defined in: [types-dev/objects.d.ts:1267](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1267)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1080](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1080)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
