[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / MetaCommon

# Interface: MetaCommon

[<internal>](../modules/internal_.md).MetaCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`MetaCommon`**

## Table of contents

### Properties

- [custom](internal_.MetaCommon.md#custom)
- [dontDelete](internal_.MetaCommon.md#dontdelete)
- [expert](internal_.MetaCommon.md#expert)
- [icon](internal_.MetaCommon.md#icon)
- [name](internal_.MetaCommon.md#name)
- [role](internal_.MetaCommon.md#role)
- [type](internal_.MetaCommon.md#type)

## Properties

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types/objects.d.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/a0c54039/packages/types/objects.d.ts#L288)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types/objects.d.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/a0c54039/packages/types/objects.d.ts#L157)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types/objects.d.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/a0c54039/packages/types/objects.d.ts#L160)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types/objects.d.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/a0c54039/packages/types/objects.d.ts#L165)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types/objects.d.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/a0c54039/packages/types/objects.d.ts#L154)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/a0c54039/packages/types/objects.d.ts#L167)

___

### type

• **type**: [`CommonType`](../modules/internal_.md#commontype) \| ``"meta.user"`` \| ``"meta.folder"``

#### Defined in

[types/objects.d.ts:285](https://github.com/ioBroker/ioBroker.js-controller/blob/a0c54039/packages/types/objects.d.ts#L285)
