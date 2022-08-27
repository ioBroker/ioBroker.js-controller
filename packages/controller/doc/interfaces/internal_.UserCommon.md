[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / UserCommon

# Interface: UserCommon

[<internal>](../modules/internal_.md).UserCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`UserCommon`**

## Table of contents

### Properties

- [custom](internal_.UserCommon.md#custom)
- [dontDelete](internal_.UserCommon.md#dontdelete)
- [enabled](internal_.UserCommon.md#enabled)
- [expert](internal_.UserCommon.md#expert)
- [icon](internal_.UserCommon.md#icon)
- [name](internal_.UserCommon.md#name)
- [password](internal_.UserCommon.md#password)
- [role](internal_.UserCommon.md#role)

## Properties

### custom

• `Optional` **custom**: `undefined`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:337

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

Whether this user is enabled

#### Defined in

node_modules/@types/iobroker/objects.d.ts:334

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:151

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:156

___

### name

• **name**: `string`

The username

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:330

___

### password

• **password**: `string`

The hashed password

#### Defined in

node_modules/@types/iobroker/objects.d.ts:332

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:158
