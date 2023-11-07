[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialScheduleObject

# Interface: PartialScheduleObject

[<internal>](../modules/internal_.md).PartialScheduleObject

## Hierarchy

- `Partial`<`Omit`<[`ScheduleObject`](internal_.ScheduleObject.md), ``"common"``\>\>

  ↳ **`PartialScheduleObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialScheduleObject.md#_id)
- [acl](internal_.PartialScheduleObject.md#acl)
- [common](internal_.PartialScheduleObject.md#common)
- [enums](internal_.PartialScheduleObject.md#enums)
- [from](internal_.PartialScheduleObject.md#from)
- [native](internal_.PartialScheduleObject.md#native)
- [nonEdit](internal_.PartialScheduleObject.md#nonedit)
- [ts](internal_.PartialScheduleObject.md#ts)
- [type](internal_.PartialScheduleObject.md#type)
- [user](internal_.PartialScheduleObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:665](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L665)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L672)

___

### common

• `Optional` **common**: `Partial`<[`ScheduleCommon`](internal_.ScheduleCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:746](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L746)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L671)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L673)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L669)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L678)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:676](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L676)

___

### type

• `Optional` **type**: ``"schedule"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L741)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/46b1734c/packages/types-dev/objects.d.ts#L675)
