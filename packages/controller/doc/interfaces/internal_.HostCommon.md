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

[types/objects.d.ts:319](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L319)

___

### cmd

• **cmd**: `string`

The command line of the executable

#### Defined in

[types/objects.d.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L316)

___

### custom

• `Optional` **custom**: `undefined`

#### Defined in

[types/objects.d.ts:325](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L325)

___

### dontDelete

• `Optional` **dontDelete**: ``true``

When set to true, this object may not be deleted

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[dontDelete](internal_.ObjectCommon.md#dontdelete)

#### Defined in

[types/objects.d.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L157)

___

### expert

• `Optional` **expert**: ``true``

When set to true, this object is only visible when expert mode is turned on in admin

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[expert](internal_.ObjectCommon.md#expert)

#### Defined in

[types/objects.d.ts:160](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L160)

___

### hostname

• **hostname**: `string`

#### Defined in

[types/objects.d.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L317)

___

### icon

• `Optional` **icon**: `string`

Icon for this object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[icon](internal_.ObjectCommon.md#icon)

#### Defined in

[types/objects.d.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L165)

___

### installedVersion

• **installedVersion**: `string`

#### Defined in

[types/objects.d.ts:314](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L314)

___

### name

• **name**: `string`

The display name of this host

#### Overrides

[ObjectCommon](internal_.ObjectCommon.md).[name](internal_.ObjectCommon.md#name)

#### Defined in

[types/objects.d.ts:312](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L312)

___

### platform

• **platform**: ``"Javascript/Node.js"``

#### Defined in

[types/objects.d.ts:322](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L322)

___

### role

• `Optional` **role**: `string`

role of the object

#### Inherited from

[ObjectCommon](internal_.ObjectCommon.md).[role](internal_.ObjectCommon.md#role)

#### Defined in

[types/objects.d.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L167)

___

### title

• **title**: `string`

#### Defined in

[types/objects.d.ts:313](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L313)

___

### type

• **type**: ``"js-controller"``

#### Defined in

[types/objects.d.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/c7ef56a8/packages/types/objects.d.ts#L321)
