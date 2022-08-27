[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / HostCommon

# Interface: HostCommon

[<internal>](../modules/internal_.md).HostCommon

## Hierarchy

- [`ObjectCommon`](internal_.ObjectCommon.md)

  ↳ **`HostCommon`**

## Table of contents

### Properties

- [address](internal_.HostCommon.md#address)
- [cmd](internal_.HostCommon.md#cmd)
- [custom](internal_.HostCommon.md#custom)
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

node_modules/@types/iobroker/objects.d.ts:297

___

### cmd

• **cmd**: `string`

The command line of the executable

#### Defined in

node_modules/@types/iobroker/objects.d.ts:294

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:303

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:148

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:151

___

### hostname

• **hostname**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:295

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:156

___

### installedVersion

• **installedVersion**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:292

___

### name

• **name**: `string`

The display name of this host

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:290

___

### platform

• **platform**: ``"Javascript/Node.js"``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:300

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:158

___

### title

• **title**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:291

___

### type

• **type**: ``"js-controller"``

#### Defined in

node_modules/@types/iobroker/objects.d.ts:299
