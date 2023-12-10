[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialInstanceObject

# Interface: PartialInstanceObject

[<internal>](../modules/internal_.md).PartialInstanceObject

## Hierarchy

- `Partial`<`Omit`<[`InstanceObject`](internal_.InstanceObject.md), ``"common"``\>\>

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

• `Optional` **\_id**: \`system.adapter.${string}.${number}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:758](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L758)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L680)

___

### common

• `Optional` **common**: `Partial`<[`InstanceCommon`](internal_.InstanceCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:773](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L773)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

These properties will be automatically encrypted and decrypted when used with adapter.config

#### Inherited from

Partial.encryptedNative

#### Defined in

[types-dev/objects.d.ts:764](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L764)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L679)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L681)

___

### instanceObjects

• `Optional` **instanceObjects**: ([`StateObject`](internal_.StateObject.md) \| [`DeviceObject`](internal_.DeviceObject.md) \| [`ChannelObject`](internal_.ChannelObject.md) \| [`FolderObject`](internal_.FolderObject.md) \| [`MetaObject`](internal_.MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

Partial.instanceObjects

#### Defined in

[types-dev/objects.d.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L768)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L677)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L686)

___

### notifications

• `Optional` **notifications**: [`Notification`](internal_.Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

Partial.notifications

#### Defined in

[types-dev/objects.d.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L766)

___

### objects

• `Optional` **objects**: [`AnyObject`](../modules/internal_.md#anyobject)[]

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

Partial.objects

#### Defined in

[types-dev/objects.d.ts:770](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L770)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

These properties will be removed when foreign adapters access it

#### Inherited from

Partial.protectedNative

#### Defined in

[types-dev/objects.d.ts:762](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L762)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L684)

___

### type

• `Optional` **type**: ``"instance"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:759](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L759)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/5b321f38/packages/types-dev/objects.d.ts#L683)
