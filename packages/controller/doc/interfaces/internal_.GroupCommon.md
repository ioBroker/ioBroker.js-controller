[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / GroupCommon

# Interface: GroupCommon

[<internal>](../modules/internal_.md).GroupCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`GroupCommon`**

## Table of contents

### Properties

- [acl](internal_.GroupCommon.md#acl)
- [custom](internal_.GroupCommon.md#custom)
- [dontDelete](internal_.GroupCommon.md#dontdelete)
- [enabled](internal_.GroupCommon.md#enabled)
- [expert](internal_.GroupCommon.md#expert)
- [icon](internal_.GroupCommon.md#icon)
- [members](internal_.GroupCommon.md#members)
- [name](internal_.GroupCommon.md#name)
- [role](internal_.GroupCommon.md#role)

## Properties

### acl

• **acl**: `Omit`<[`PermissionSet`](internal_.PermissionSet.md), ``"user"`` \| ``"groups"``\>

The default permissions of this group

#### Defined in

[types-dev/objects.d.ts:383](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L383)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L387)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L157)

___

### enabled

• `Optional` **enabled**: `boolean`

A group can be disabled, if missing, group is active

#### Defined in

[types-dev/objects.d.ts:385](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L385)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L160)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L165)

___

### members

• **members**: `string`[]

The users of this group

#### Defined in

[types-dev/objects.d.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L381)

___

### name

• **name**: `string`

The name of this group

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:379](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L379)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L167)
