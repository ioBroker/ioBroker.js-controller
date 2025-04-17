[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterObject

# Interface: AdapterObject

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: [`Adapter`](../type-aliases/Adapter.md)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:1120](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L1120)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:922](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L922)

***

### common

> **common**: [`AdapterCommon`](AdapterCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1122](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L1122)

***

### encryptedNative?

> `optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Defined in

[types-dev/objects.d.ts:1126](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L1126)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L921)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L923)

***

### instanceObjects

> **instanceObjects**: ([`StateObject`](StateObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`ChannelObject`](ChannelObject.md) \| [`FolderObject`](FolderObject.md) \| [`MetaObject`](MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Defined in

[types-dev/objects.d.ts:1130](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L1130)

***

### native

> **native**: `Record`\<`string`, `any`\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:919](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L919)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:928](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L928)

***

### notifications?

> `optional` **notifications**: [`Notification`](Notification.md)[]

Register notifications for the built-in notification system

#### Defined in

[types-dev/objects.d.ts:1128](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L1128)

***

### objects

> **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Objects created for the adapter, anywhere in the global namespace

#### Defined in

[types-dev/objects.d.ts:1132](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L1132)

***

### protectedNative?

> `optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Defined in

[types-dev/objects.d.ts:1124](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L1124)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:926](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L926)

***

### type

> **type**: `"adapter"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1121](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L1121)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:925](https://github.com/ioBroker/ioBroker.js-controller/blob/ebf87a343c9c866aa4a5e7b77c2c13760c514a2e/packages/types-dev/objects.d.ts#L925)
