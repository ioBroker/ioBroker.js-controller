[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialAdapterObject

# Interface: PartialAdapterObject

[<internal>](../modules/internal_.md).PartialAdapterObject

## Hierarchy

- `Partial`<`Omit`<[`AdapterObject`](internal_.AdapterObject.md), ``"common"``\>\>

  ↳ **`PartialAdapterObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialAdapterObject.md#_id)
- [acl](internal_.PartialAdapterObject.md#acl)
- [common](internal_.PartialAdapterObject.md#common)
- [encryptedNative](internal_.PartialAdapterObject.md#encryptednative)
- [enums](internal_.PartialAdapterObject.md#enums)
- [from](internal_.PartialAdapterObject.md#from)
- [native](internal_.PartialAdapterObject.md#native)
- [nonEdit](internal_.PartialAdapterObject.md#nonedit)
- [notifications](internal_.PartialAdapterObject.md#notifications)
- [protectedNative](internal_.PartialAdapterObject.md#protectednative)
- [ts](internal_.PartialAdapterObject.md#ts)
- [type](internal_.PartialAdapterObject.md#type)
- [user](internal_.PartialAdapterObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.adapter.${string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:740](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L740)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:638](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L638)

___

### common

• `Optional` **common**: `Partial`<[`AdapterCommon`](internal_.AdapterCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:751](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L751)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

Partial.encryptedNative

#### Defined in

[types-dev/objects.d.ts:746](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L746)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L637)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L639)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L635)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L644)

___

### notifications

• `Optional` **notifications**: [`Notification`](internal_.Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

Partial.notifications

#### Defined in

[types-dev/objects.d.ts:748](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L748)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

Partial.protectedNative

#### Defined in

[types-dev/objects.d.ts:744](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L744)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L642)

___

### type

• `Optional` **type**: ``"adapter"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L741)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L641)
