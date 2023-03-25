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

[types-dev/objects.d.ts:586](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L586)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L593)

___

### common

• `Optional` **common**: `Partial`<[`ScheduleCommon`](internal_.ScheduleCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:664](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L664)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L592)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L594)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L590)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L597)

___

### type

• `Optional` **type**: ``"schedule"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:659](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L659)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L596)
