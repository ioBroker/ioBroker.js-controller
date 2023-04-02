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
- [logTransporter](internal_.InstanceCommon.md#logtransporter)
- [mode](internal_.InstanceCommon.md#mode)
- [name](internal_.InstanceCommon.md#name)
- [nodeProcessParams](internal_.InstanceCommon.md#nodeprocessparams)
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

[types-dev/objects.d.ts:323](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L323)

___

### compactGroup

• `Optional` **compactGroup**: `number`

Active compact group, instances in this group will be started in one process

#### Defined in

[types-dev/objects.d.ts:327](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L327)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:338](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L338)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L159)

___

### enabled

• **enabled**: `boolean`

#### Defined in

[types-dev/objects.d.ts:310](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L310)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:162](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L162)

___

### host

• **host**: `string`

The name of the host where this instance is running

#### Defined in

[types-dev/objects.d.ts:309](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L309)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L167)

___

### installedFrom

• `Optional` **installedFrom**: `string`

#### Defined in

[types-dev/objects.d.ts:331](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L331)

___

### installedVersion

• `Optional` **installedVersion**: `string`

#### Defined in

[types-dev/objects.d.ts:330](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L330)

___

### logTransporter

• `Optional` **logTransporter**: `boolean`

If adapter can consume log messages, like admin, javascript or logparser

#### Defined in

[types-dev/objects.d.ts:335](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L335)

___

### mode

• **mode**: [`InstanceMode`](../modules/internal_.md#instancemode)

How and when this instance should be started

#### Defined in

[types-dev/objects.d.ts:312](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L312)

___

### name

• **name**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

The name of this object as a simple string or an object with translations

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:156](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L156)

___

### nodeProcessParams

• `Optional` **nodeProcessParams**: `string`[]

Arguments passed to the adapter process, this disables compact mode

#### Defined in

[types-dev/objects.d.ts:333](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L333)

___

### preserveSettings

• `Optional` **preserveSettings**: `string` \| `string`[]

String (or array) with names of attributes in common of instance, which will not be deleted.

#### Defined in

[types-dev/objects.d.ts:329](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L329)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L169)

___

### runAsCompactMode

• `Optional` **runAsCompactMode**: `boolean`

If compact mode is active

#### Defined in

[types-dev/objects.d.ts:325](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L325)

___

### subscribable

• `Optional` **subscribable**: `boolean`

Variables of this adapter must be subscribed with sendTo to enable updates

#### Defined in

[types-dev/objects.d.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L321)

___

### tier

• `Optional` **tier**: ``1`` \| ``2`` \| ``3``

The starting priority of this adapter:
- **1:** Logic adapters
- **2:** Data providers
- **3:** All other adapters

#### Defined in

[types-dev/objects.d.ts:319](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L319)

___

### version

• **version**: `string`

#### Defined in

[types-dev/objects.d.ts:307](https://github.com/ioBroker/ioBroker.js-controller/blob/d3b924cd/packages/types-dev/objects.d.ts#L307)
