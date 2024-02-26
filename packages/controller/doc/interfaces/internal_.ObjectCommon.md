[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ObjectCommon

# Interface: ObjectCommon

[\<internal\>](../modules/internal_.md).ObjectCommon

## Hierarchy

- **`ObjectCommon`**

  ↳ [`DeviceCommon`](internal_.DeviceCommon.md)

  ↳ [`StateCommon`](internal_.StateCommon.md)

  ↳ [`ChannelCommon`](internal_.ChannelCommon.md)

  ↳ [`ChartCommon`](internal_.ChartCommon.md)

  ↳ [`OtherCommon`](internal_.OtherCommon.md)

  ↳ [`EnumCommon`](internal_.EnumCommon.md)

  ↳ [`MetaCommon`](internal_.MetaCommon.md)

  ↳ [`HostCommon`](internal_.HostCommon.md)

  ↳ [`AdapterCommon`](internal_.AdapterCommon.md)

  ↳ [`UserCommon`](internal_.UserCommon.md)

  ↳ [`GroupCommon`](internal_.GroupCommon.md)

  ↳ [`ScriptCommon`](internal_.ScriptCommon.md)

  ↳ [`ScheduleCommon`](internal_.ScheduleCommon.md)

  ↳ [`RepositoryCommon`](internal_.RepositoryCommon.md)

  ↳ [`SystemConfigCommon`](internal_.SystemConfigCommon.md)

## Table of contents

### Properties

- [desc](internal_.ObjectCommon.md#desc)
- [dontDelete](internal_.ObjectCommon.md#dontdelete)
- [expert](internal_.ObjectCommon.md#expert)
- [icon](internal_.ObjectCommon.md#icon)
- [name](internal_.ObjectCommon.md#name)
- [role](internal_.ObjectCommon.md#role)

## Properties

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Defined in

[types-dev/objects.d.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L170)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Defined in

[types-dev/objects.d.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L173)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Defined in

[types-dev/objects.d.ts:176](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L176)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Defined in

[types-dev/objects.d.ts:181](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L181)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Defined in

[types-dev/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L167)

___

### role

• `Optional` **role**: `string`

role of the object

#### Defined in

[types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L183)
