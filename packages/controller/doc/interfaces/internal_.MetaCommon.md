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

[types-dev/objects.d.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/4361085b/packages/types-dev/objects.d.ts#L306)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/4361085b/packages/types-dev/objects.d.ts#L161)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:164](https://github.com/ioBroker/ioBroker.js-controller/blob/4361085b/packages/types-dev/objects.d.ts#L164)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/4361085b/packages/types-dev/objects.d.ts#L169)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:158](https://github.com/ioBroker/ioBroker.js-controller/blob/4361085b/packages/types-dev/objects.d.ts#L158)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/4361085b/packages/types-dev/objects.d.ts#L171)

___

### type

• **type**: ``"meta.user"`` \| ``"meta.folder"``

#### Defined in

[types-dev/objects.d.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/4361085b/packages/types-dev/objects.d.ts#L303)
