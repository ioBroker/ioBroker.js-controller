[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialInstanceObject

# Interface: PartialInstanceObject

[\<internal\>](../modules/internal_.md).PartialInstanceObject

## Hierarchy

- `Partial`\<`Omit`\<[`InstanceObject`](internal_.InstanceObject.md), ``"common"``\>\>

  ↳ **`PartialInstanceObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialInstanceObject.md#_id)
- [acl](internal_.PartialInstanceObject.md#acl)
- [common](internal_.PartialInstanceObject.md#common)
- [encryptedNative](internal_.PartialInstanceObject.md#encryptednative)
- [enums](internal_.PartialInstanceObject.md#enums)
- [from](internal_.PartialInstanceObject.md#from)
- [instanceObjects](internal_.PartialInstanceObject.md#instanceobjects)
- [native](internal_.PartialInstanceObject.md#native)
- [nonEdit](internal_.PartialInstanceObject.md#nonedit)
- [notifications](internal_.PartialInstanceObject.md#notifications)
- [objects](internal_.PartialInstanceObject.md#objects)
- [protectedNative](internal_.PartialInstanceObject.md#protectednative)
- [ts](internal_.PartialInstanceObject.md#ts)
- [type](internal_.PartialInstanceObject.md#type)
- [user](internal_.PartialInstanceObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.adapter.$\{string}.$\{number}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:901](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L901)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L768)

___

### common

• `Optional` **common**: `Partial`\<[`InstanceCommon`](internal_.InstanceCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:917](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L917)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

These properties will be automatically encrypted and decrypted when used with adapter.config

#### Inherited from

Partial.encryptedNative

#### Defined in

[types-dev/objects.d.ts:907](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L907)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L767)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L769)

___

### instanceObjects

• `Optional` **instanceObjects**: ([`StateObject`](internal_.StateObject.md) \| [`DeviceObject`](internal_.DeviceObject.md) \| [`ChannelObject`](internal_.ChannelObject.md) \| [`FolderObject`](internal_.FolderObject.md) \| [`MetaObject`](internal_.MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

Partial.instanceObjects

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L911)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:765](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L765)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:774](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L774)

___

### notifications

• `Optional` **notifications**: [`Notification`](internal_.Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

Partial.notifications

#### Defined in

[types-dev/objects.d.ts:909](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L909)

___

### objects

• `Optional` **objects**: [`AnyObject`](../modules/internal_.md#anyobject)[]

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

Partial.objects

#### Defined in

[types-dev/objects.d.ts:913](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L913)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

These properties will be removed when foreign adapters access it

#### Inherited from

Partial.protectedNative

#### Defined in

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L905)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L772)

___

### type

• `Optional` **type**: ``"instance"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:902](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L902)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:771](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L771)
