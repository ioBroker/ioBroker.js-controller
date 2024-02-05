[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / DeviceObject

# Interface: DeviceObject

[\<internal\>](../modules/internal_.md).DeviceObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`DeviceObject`**

## Table of contents

### Properties

- [\_id](internal_.DeviceObject.md#_id)
- [acl](internal_.DeviceObject.md#acl)
- [common](internal_.DeviceObject.md#common)
- [enums](internal_.DeviceObject.md#enums)
- [from](internal_.DeviceObject.md#from)
- [native](internal_.DeviceObject.md#native)
- [nonEdit](internal_.DeviceObject.md#nonedit)
- [ts](internal_.DeviceObject.md#ts)
- [type](internal_.DeviceObject.md#type)
- [user](internal_.DeviceObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:761](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L761)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L768)

___

### common

• **common**: [`DeviceCommon`](internal_.DeviceCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:799](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L799)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L767)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L769)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:765](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L765)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:774](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L774)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L772)

___

### type

• **type**: ``"device"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:798](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L798)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:771](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L771)
