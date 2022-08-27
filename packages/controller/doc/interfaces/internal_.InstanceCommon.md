[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / InstanceCommon

# Interface: InstanceCommon

[<internal>](../modules/internal_.md).InstanceCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`InstanceCommon`**

## Table of contents

### Properties

- [custom](internal_.InstanceCommon.md#custom)
- [dontDelete](internal_.InstanceCommon.md#dontdelete)
- [enabled](internal_.InstanceCommon.md#enabled)
- [expert](internal_.InstanceCommon.md#expert)
- [host](internal_.InstanceCommon.md#host)
- [icon](internal_.InstanceCommon.md#icon)
- [mode](internal_.InstanceCommon.md#mode)
- [name](internal_.InstanceCommon.md#name)
- [role](internal_.InstanceCommon.md#role)
- [tier](internal_.InstanceCommon.md#tier)

## Properties

### custom

• `Optional` **custom**: `undefined`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:285

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:148

___

### enabled

• **enabled**: `boolean`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:273

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:151

___

### host

• **host**: `string`

The name of the host where this instance is running

#### Defined in

node_modules/@types/iobroker/objects.d.ts:272

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:156

___

### mode

• **mode**: [`InstanceMode`](../modules/internal_.md#instancemode)

How and when this instance should be started

#### Defined in

node_modules/@types/iobroker/objects.d.ts:275

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:145

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:158

___

### tier

• `Optional` **tier**: ``1`` \| ``2`` \| ``3``

The starting priority of this adapter:
- **1:** Logic adapters
- **2:** Data providers
- **3:** All other adapters

#### Defined in

node_modules/@types/iobroker/objects.d.ts:282
