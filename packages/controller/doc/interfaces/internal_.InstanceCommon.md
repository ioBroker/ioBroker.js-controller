[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / InstanceCommon

# Interface: InstanceCommon

[<internal>](../modules/internal_.md).InstanceCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`InstanceCommon`**

## Table of contents

### Properties

- [compact](internal_.InstanceCommon.md#compact)
- [compactGroup](internal_.InstanceCommon.md#compactgroup)
- [custom](internal_.InstanceCommon.md#custom)
- [dontDelete](internal_.InstanceCommon.md#dontdelete)
- [enabled](internal_.InstanceCommon.md#enabled)
- [expert](internal_.InstanceCommon.md#expert)
- [host](internal_.InstanceCommon.md#host)
- [icon](internal_.InstanceCommon.md#icon)
- [installedFrom](internal_.InstanceCommon.md#installedfrom)
- [installedVersion](internal_.InstanceCommon.md#installedversion)
- [mode](internal_.InstanceCommon.md#mode)
- [name](internal_.InstanceCommon.md#name)
- [preserveSettings](internal_.InstanceCommon.md#preservesettings)
- [role](internal_.InstanceCommon.md#role)
- [runAsCompactMode](internal_.InstanceCommon.md#runascompactmode)
- [subscribable](internal_.InstanceCommon.md#subscribable)
- [tier](internal_.InstanceCommon.md#tier)
- [version](internal_.InstanceCommon.md#version)

## Properties

### compact

• `Optional` **compact**: `boolean`

If compact mode is supported

#### Defined in

[types-dev/objects.d.ts:309](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L309)

___

### compactGroup

• `Optional` **compactGroup**: `number`

Active compact group, instances in this group will be started in one process

#### Defined in

[types-dev/objects.d.ts:313](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L313)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:320](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L320)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L157)

___

### enabled

• **enabled**: `boolean`

#### Defined in

[types-dev/objects.d.ts:296](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L296)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L160)

___

### host

• **host**: `string`

The name of the host where this instance is running

#### Defined in

[types-dev/objects.d.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L295)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L165)

___

### installedFrom

• `Optional` **installedFrom**: `string`

#### Defined in

[types-dev/objects.d.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L317)

___

### installedVersion

• `Optional` **installedVersion**: `string`

#### Defined in

[types-dev/objects.d.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L316)

___

### mode

• **mode**: [`InstanceMode`](../modules/internal_.md#instancemode)

How and when this instance should be started

#### Defined in

[types-dev/objects.d.ts:298](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L298)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:154](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L154)

___

### preserveSettings

• `Optional` **preserveSettings**: `string` \| `string`[]

String (or array) with names of attributes in common of instance, which will not be deleted.

#### Defined in

[types-dev/objects.d.ts:315](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L315)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L167)

___

### runAsCompactMode

• `Optional` **runAsCompactMode**: `boolean`

If compact mode is active

#### Defined in

[types-dev/objects.d.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L311)

___

### subscribable

• `Optional` **subscribable**: `boolean`

Variables of this adapter must be subscribed with sendTo to enable updates

#### Defined in

[types-dev/objects.d.ts:307](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L307)

___

### tier

• `Optional` **tier**: ``1`` \| ``2`` \| ``3``

The starting priority of this adapter:
- **1:** Logic adapters
- **2:** Data providers
- **3:** All other adapters

#### Defined in

[types-dev/objects.d.ts:305](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L305)

___

### version

• **version**: `string`

#### Defined in

[types-dev/objects.d.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/0655bceb/packages/types-dev/objects.d.ts#L293)
