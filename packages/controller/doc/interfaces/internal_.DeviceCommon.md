[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / DeviceCommon

# Interface: DeviceCommon

[\<internal\>](../modules/internal_.md).DeviceCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`DeviceCommon`**

## Table of contents

### Properties

- [color](internal_.DeviceCommon.md#color)
- [custom](internal_.DeviceCommon.md#custom)
- [desc](internal_.DeviceCommon.md#desc)
- [dontDelete](internal_.DeviceCommon.md#dontdelete)
- [expert](internal_.DeviceCommon.md#expert)
- [icon](internal_.DeviceCommon.md#icon)
- [name](internal_.DeviceCommon.md#name)
- [role](internal_.DeviceCommon.md#role)
- [statusStates](internal_.DeviceCommon.md#statusstates)

## Properties

### color

• `Optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[color](internal_.ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L179)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:298](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L298)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L171)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:174](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L174)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:177](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L177)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:184](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L184)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:168](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L168)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:186](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L186)

___

### statusStates

• `Optional` **statusStates**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorId?` | `string` | State, which is truthy if a device is in error state |
| `offlineId?` | `string` | State, which is truthy if a device is offline |
| `onlineId?` | `string` | State, which is truthy if a device is online |

#### Defined in

[types-dev/objects.d.ts:289](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L289)
