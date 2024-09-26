[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ObjectCommon

# Interface: ObjectCommon

[\<internal\>](../modules/internal_.md).ObjectCommon

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

  ↳ [`RepositoryCommon`](internal_.RepositoryCommon.md)

  ↳ [`SystemConfigCommon`](internal_.SystemConfigCommon.md)

## Table of contents

### Properties

- [color](internal_.ObjectCommon.md#color)
- [desc](internal_.ObjectCommon.md#desc)
- [dontDelete](internal_.ObjectCommon.md#dontdelete)
- [expert](internal_.ObjectCommon.md#expert)
- [icon](internal_.ObjectCommon.md#icon)
- [name](internal_.ObjectCommon.md#name)
- [role](internal_.ObjectCommon.md#role)

## Properties

### color

• `Optional` **color**: `string`

Color attribute used in UI

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L179)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L171)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L174)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L177)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Defined in

[types-dev/objects.d.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L184)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Defined in

[types-dev/objects.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L168)

___

### role

• `Optional` **role**: `string`

role of the object

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L186)
