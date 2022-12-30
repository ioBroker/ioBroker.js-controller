[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ObjectCommon

# Interface: ObjectCommon

[<internal>](../modules/internal_.md).ObjectCommon

## Hierarchy

- **`ObjectCommon`**

  ↳ [`StateCommon`](internal_.StateCommon.md)

  ↳ [`DeviceCommon`](internal_.DeviceCommon.md)

  ↳ [`ChannelCommon`](internal_.ChannelCommon.md)

  ↳ [`GroupCommon`](internal_.GroupCommon.md)

  ↳ [`InstanceCommon`](internal_.InstanceCommon.md)

  ↳ [`OtherCommon`](internal_.OtherCommon.md)

  ↳ [`EnumCommon`](internal_.EnumCommon.md)

  ↳ [`MetaCommon`](internal_.MetaCommon.md)

  ↳ [`HostCommon`](internal_.HostCommon.md)

  ↳ [`AdapterCommon`](internal_.AdapterCommon.md)

  ↳ [`UserCommon`](internal_.UserCommon.md)

  ↳ [`ScriptCommon`](internal_.ScriptCommon.md)

## Table of contents

### Properties

- [dontDelete](internal_.ObjectCommon.md#dontdelete)
- [expert](internal_.ObjectCommon.md#expert)
- [icon](internal_.ObjectCommon.md#icon)
- [name](internal_.ObjectCommon.md#name)
- [role](internal_.ObjectCommon.md#role)

## Properties

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Defined in

[types/objects.d.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L157)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Defined in

[types/objects.d.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L160)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Defined in

[types/objects.d.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L165)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Defined in

[types/objects.d.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L154)

___

### role

• `Optional` **role**: `string`

role of the object

#### Defined in

[types/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L167)
