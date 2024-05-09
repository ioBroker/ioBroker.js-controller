[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / HostCommon

# Interface: HostCommon

[\<internal\>](../modules/internal_.md).HostCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`HostCommon`**

## Table of contents

### Properties

- [address](internal_.HostCommon.md#address)
- [cmd](internal_.HostCommon.md#cmd)
- [color](internal_.HostCommon.md#color)
- [custom](internal_.HostCommon.md#custom)
- [desc](internal_.HostCommon.md#desc)
- [dontDelete](internal_.HostCommon.md#dontdelete)
- [expert](internal_.HostCommon.md#expert)
- [hostname](internal_.HostCommon.md#hostname)
- [icon](internal_.HostCommon.md#icon)
- [installedVersion](internal_.HostCommon.md#installedversion)
- [name](internal_.HostCommon.md#name)
- [platform](internal_.HostCommon.md#platform)
- [role](internal_.HostCommon.md#role)
- [title](internal_.HostCommon.md#title)
- [type](internal_.HostCommon.md#type)

## Properties

### address

• **address**: `string`[]

An array of IP addresses this host exposes

#### Defined in

[types-dev/objects.d.ts:390](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L390)

___

### cmd

• **cmd**: `string`

The command line of the executable

#### Defined in

[types-dev/objects.d.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L387)

___

### color

• `Optional` **color**: `string`

Color attribute used in UI

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[color](internal_.ObjectCommon.md#color)

#### Defined in

[types-dev/objects.d.ts:178](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L178)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:396](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L396)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:170](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L170)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:173](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L173)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:176](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L176)

___

### hostname

• **hostname**: `string`

#### Defined in

[types-dev/objects.d.ts:388](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L388)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:183](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L183)

___

### installedVersion

• **installedVersion**: `string`

#### Defined in

[types-dev/objects.d.ts:385](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L385)

___

### name

• **name**: `string`

The display name of this host

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:383](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L383)

___

### platform

• **platform**: ``"Javascript/Node.js"``

#### Defined in

[types-dev/objects.d.ts:393](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L393)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:185](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L185)

___

### title

• **title**: `string`

#### Defined in

[types-dev/objects.d.ts:384](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L384)

___

### type

• **type**: ``"js-controller"``

#### Defined in

[types-dev/objects.d.ts:392](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/objects.d.ts#L392)
