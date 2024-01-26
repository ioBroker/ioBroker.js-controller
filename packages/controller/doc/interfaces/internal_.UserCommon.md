[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / UserCommon

# Interface: UserCommon

[\<internal\>](../modules/internal_.md).UserCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`UserCommon`**

## Table of contents

### Properties

- [color](internal_.UserCommon.md#color)
- [custom](internal_.UserCommon.md#custom)
- [desc](internal_.UserCommon.md#desc)
- [dontDelete](internal_.UserCommon.md#dontdelete)
- [enabled](internal_.UserCommon.md#enabled)
- [expert](internal_.UserCommon.md#expert)
- [icon](internal_.UserCommon.md#icon)
- [name](internal_.UserCommon.md#name)
- [password](internal_.UserCommon.md#password)
- [role](internal_.UserCommon.md#role)

## Properties

### color

• `Optional` **color**: `string`

User color for Admin adapter

#### Defined in

[types-dev/objects.d.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L424)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:427](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L427)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L169)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L172)

___

### enabled

• **enabled**: `boolean`

Whether this user is enabled

#### Defined in

[types-dev/objects.d.ts:422](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L422)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L175)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L180)

___

### name

• **name**: `string`

The username

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L418)

___

### password

• **password**: `string`

The hashed password

#### Defined in

[types-dev/objects.d.ts:420](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L420)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:182](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L182)
