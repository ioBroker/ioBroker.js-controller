[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ObjectCommon

# Interface: ObjectCommon

[<internal>](../modules/internal_.md).ObjectCommon

## Hierarchy

- **`ObjectCommon`**

  ↳ [`DeviceCommon`](internal_.DeviceCommon.md)

  ↳ [`ChannelCommon`](internal_.ChannelCommon.md)

  ↳ [`StateCommon`](internal_.StateCommon.md)

  ↳ [`OtherCommon`](internal_.OtherCommon.md)

  ↳ [`MetaCommon`](internal_.MetaCommon.md)

  ↳ [`EnumCommon`](internal_.EnumCommon.md)

  ↳ [`HostCommon`](internal_.HostCommon.md)

  ↳ [`AdapterCommon`](internal_.AdapterCommon.md)

  ↳ [`UserCommon`](internal_.UserCommon.md)

  ↳ [`GroupCommon`](internal_.GroupCommon.md)

  ↳ [`ScriptCommon`](internal_.ScriptCommon.md)

  ↳ [`ChartCommon`](internal_.ChartCommon.md)

  ↳ [`ScheduleCommon`](internal_.ScheduleCommon.md)

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

[types-dev/objects.d.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L161)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Defined in

[types-dev/objects.d.ts:164](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L164)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Defined in

[types-dev/objects.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L169)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Defined in

[types-dev/objects.d.ts:158](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L158)

___

### role

• `Optional` **role**: `string`

role of the object

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L171)
