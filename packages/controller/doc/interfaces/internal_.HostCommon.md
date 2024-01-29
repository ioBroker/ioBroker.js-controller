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

[types-dev/objects.d.ts:383](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L383)

___

### cmd

• **cmd**: `string`

The command line of the executable

#### Defined in

[types-dev/objects.d.ts:380](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L380)

___

### color

• `Optional` **color**: `string`

#### Defined in

[types-dev/objects.d.ts:388](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L388)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types-dev/objects.d.ts:391](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L391)

___

### desc

• `Optional` **desc**: [`StringOrTranslated`](../modules/internal_.md#stringortranslated)

Description of this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[desc](internal_.ObjectCommon.md#desc)

#### Defined in

[types-dev/objects.d.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L169)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types-dev/objects.d.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L172)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types-dev/objects.d.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L175)

___

### hostname

• **hostname**: `string`

#### Defined in

[types-dev/objects.d.ts:381](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L381)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types-dev/objects.d.ts:180](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L180)

___

### installedVersion

• **installedVersion**: `string`

#### Defined in

[types-dev/objects.d.ts:378](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L378)

___

### name

• **name**: `string`

The display name of this host

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types-dev/objects.d.ts:376](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L376)

___

### platform

• **platform**: ``"Javascript/Node.js"``

#### Defined in

[types-dev/objects.d.ts:386](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L386)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types-dev/objects.d.ts:182](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L182)

___

### title

• **title**: `string`

#### Defined in

[types-dev/objects.d.ts:377](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L377)

___

### type

• **type**: ``"js-controller"``

#### Defined in

[types-dev/objects.d.ts:385](https://github.com/ioBroker/ioBroker.js-controller/blob/1906f86c/packages/types-dev/objects.d.ts#L385)
