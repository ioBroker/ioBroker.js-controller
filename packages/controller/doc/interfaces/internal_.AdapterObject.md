[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / AdapterObject

# Interface: AdapterObject

[\<internal\>](../modules/internal_.md).AdapterObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`AdapterObject`**

## Table of contents

### Properties

- [\_id](internal_.AdapterObject.md#_id)
- [acl](internal_.AdapterObject.md#acl)
- [common](internal_.AdapterObject.md#common)
- [encryptedNative](internal_.AdapterObject.md#encryptednative)
- [enums](internal_.AdapterObject.md#enums)
- [from](internal_.AdapterObject.md#from)
- [instanceObjects](internal_.AdapterObject.md#instanceobjects)
- [native](internal_.AdapterObject.md#native)
- [nonEdit](internal_.AdapterObject.md#nonedit)
- [notifications](internal_.AdapterObject.md#notifications)
- [objects](internal_.AdapterObject.md#objects)
- [protectedNative](internal_.AdapterObject.md#protectednative)
- [ts](internal_.AdapterObject.md#ts)
- [type](internal_.AdapterObject.md#type)
- [user](internal_.AdapterObject.md#user)

## Properties

### \_id

• **\_id**: [`Adapter`](../modules/internal_.md#adapter)

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L1000)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L833)

___

### common

• **common**: [`AdapterCommon`](internal_.AdapterCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1002](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L1002)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Defined in

[types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L1006)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L834)

___

### instanceObjects

• **instanceObjects**: ([`StateObject`](internal_.StateObject.md) \| [`DeviceObject`](internal_.DeviceObject.md) \| [`ChannelObject`](internal_.ChannelObject.md) \| [`FolderObject`](internal_.FolderObject.md) \| [`MetaObject`](internal_.MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Defined in

[types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L1010)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L839)

___

### notifications

• `Optional` **notifications**: [`Notification`](internal_.Notification.md)[]

Register notifications for the built-in notification system

#### Defined in

[types-dev/objects.d.ts:1008](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L1008)

___

### objects

• **objects**: [`AnyObject`](../modules/internal_.md#anyobject)[]

Objects created for the adapter, anywhere in the global namespace

#### Defined in

[types-dev/objects.d.ts:1012](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L1012)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Defined in

[types-dev/objects.d.ts:1004](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L1004)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L837)

___

### type

• **type**: ``"adapter"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1001](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L1001)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/eca350d20acdb4de5e0bbb91634a82f6a2da87f1/packages/types-dev/objects.d.ts#L836)
