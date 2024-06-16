[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialAdapterObject

# Interface: PartialAdapterObject

[\<internal\>](../modules/internal_.md).PartialAdapterObject

## Hierarchy

- `Partial`\<`Omit`\<[`AdapterObject`](internal_.AdapterObject.md), ``"common"``\>\>

  ↳ **`PartialAdapterObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialAdapterObject.md#_id)
- [acl](internal_.PartialAdapterObject.md#acl)
- [common](internal_.PartialAdapterObject.md#common)
- [encryptedNative](internal_.PartialAdapterObject.md#encryptednative)
- [enums](internal_.PartialAdapterObject.md#enums)
- [from](internal_.PartialAdapterObject.md#from)
- [instanceObjects](internal_.PartialAdapterObject.md#instanceobjects)
- [native](internal_.PartialAdapterObject.md#native)
- [nonEdit](internal_.PartialAdapterObject.md#nonedit)
- [notifications](internal_.PartialAdapterObject.md#notifications)
- [objects](internal_.PartialAdapterObject.md#objects)
- [protectedNative](internal_.PartialAdapterObject.md#protectednative)
- [ts](internal_.PartialAdapterObject.md#ts)
- [type](internal_.PartialAdapterObject.md#type)
- [user](internal_.PartialAdapterObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: [`Adapter`](../modules/internal_.md#adapter)

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L1000)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L833)

___

### common

• `Optional` **common**: `Partial`\<[`AdapterCommon`](internal_.AdapterCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1016](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L1016)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

Partial.encryptedNative

#### Defined in

[types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L1006)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L834)

___

### instanceObjects

• `Optional` **instanceObjects**: ([`StateObject`](internal_.StateObject.md) \| [`DeviceObject`](internal_.DeviceObject.md) \| [`ChannelObject`](internal_.ChannelObject.md) \| [`FolderObject`](internal_.FolderObject.md) \| [`MetaObject`](internal_.MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

Partial.instanceObjects

#### Defined in

[types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L1010)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L839)

___

### notifications

• `Optional` **notifications**: [`Notification`](internal_.Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

Partial.notifications

#### Defined in

[types-dev/objects.d.ts:1008](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L1008)

___

### objects

• `Optional` **objects**: [`AnyObject`](../modules/internal_.md#anyobject)[]

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

Partial.objects

#### Defined in

[types-dev/objects.d.ts:1012](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L1012)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

Partial.protectedNative

#### Defined in

[types-dev/objects.d.ts:1004](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L1004)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L837)

___

### type

• `Optional` **type**: ``"adapter"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:1001](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L1001)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L836)
