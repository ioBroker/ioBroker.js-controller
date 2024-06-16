[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / InstanceObject

# Interface: InstanceObject

[\<internal\>](../modules/internal_.md).InstanceObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`InstanceObject`**

## Table of contents

### Properties

- [\_id](internal_.InstanceObject.md#_id)
- [acl](internal_.InstanceObject.md#acl)
- [common](internal_.InstanceObject.md#common)
- [encryptedNative](internal_.InstanceObject.md#encryptednative)
- [enums](internal_.InstanceObject.md#enums)
- [from](internal_.InstanceObject.md#from)
- [instanceObjects](internal_.InstanceObject.md#instanceobjects)
- [native](internal_.InstanceObject.md#native)
- [nonEdit](internal_.InstanceObject.md#nonedit)
- [notifications](internal_.InstanceObject.md#notifications)
- [objects](internal_.InstanceObject.md#objects)
- [protectedNative](internal_.InstanceObject.md#protectednative)
- [ts](internal_.InstanceObject.md#ts)
- [type](internal_.InstanceObject.md#type)
- [user](internal_.InstanceObject.md#user)

## Properties

### \_id

• **\_id**: \`system.adapter.$\{string}.$\{number}\`

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L970)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L833)

___

### common

• **common**: [`InstanceCommon`](internal_.InstanceCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L972)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

These properties will be automatically encrypted and decrypted when used with adapter.config

#### Defined in

[types-dev/objects.d.ts:976](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L976)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L834)

___

### instanceObjects

• **instanceObjects**: ([`StateObject`](internal_.StateObject.md) \| [`DeviceObject`](internal_.DeviceObject.md) \| [`ChannelObject`](internal_.ChannelObject.md) \| [`FolderObject`](internal_.FolderObject.md) \| [`MetaObject`](internal_.MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Defined in

[types-dev/objects.d.ts:980](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L980)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L839)

___

### notifications

• `Optional` **notifications**: [`Notification`](internal_.Notification.md)[]

Register notifications for the built-in notification system

#### Defined in

[types-dev/objects.d.ts:978](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L978)

___

### objects

• **objects**: [`AnyObject`](../modules/internal_.md#anyobject)[]

Objects created for the adapter, anywhere in the global namespace

#### Defined in

[types-dev/objects.d.ts:982](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L982)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

These properties will be removed when foreign adapters access it

#### Defined in

[types-dev/objects.d.ts:974](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L974)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L837)

___

### type

• **type**: ``"instance"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:971](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L971)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/657d9c7505359b32d207145611da3cc6fd7950da/packages/types-dev/objects.d.ts#L836)
