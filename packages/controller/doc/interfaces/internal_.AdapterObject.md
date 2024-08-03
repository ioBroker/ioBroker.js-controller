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

[types-dev/objects.d.ts:1034](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L1034)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:867](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L867)

___

### common

• **common**: [`AdapterCommon`](internal_.AdapterCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1036](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L1036)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Defined in

[types-dev/objects.d.ts:1040](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L1040)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L866)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L868)

___

### instanceObjects

• **instanceObjects**: ([`StateObject`](internal_.StateObject.md) \| [`DeviceObject`](internal_.DeviceObject.md) \| [`ChannelObject`](internal_.ChannelObject.md) \| [`FolderObject`](internal_.FolderObject.md) \| [`MetaObject`](internal_.MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Defined in

[types-dev/objects.d.ts:1044](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L1044)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L864)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:873](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L873)

___

### notifications

• `Optional` **notifications**: [`Notification`](internal_.Notification.md)[]

Register notifications for the built-in notification system

#### Defined in

[types-dev/objects.d.ts:1042](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L1042)

___

### objects

• **objects**: [`AnyObject`](../modules/internal_.md#anyobject)[]

Objects created for the adapter, anywhere in the global namespace

#### Defined in

[types-dev/objects.d.ts:1046](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L1046)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Defined in

[types-dev/objects.d.ts:1038](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L1038)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:871](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L871)

___

### type

• **type**: ``"adapter"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1035](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L1035)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:870](https://github.com/ioBroker/ioBroker.js-controller/blob/d90cc88495da0c4a98b36c616636219f6ee5b9a0/packages/types-dev/objects.d.ts#L870)
