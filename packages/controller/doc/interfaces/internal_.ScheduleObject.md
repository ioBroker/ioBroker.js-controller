[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ScheduleObject

# Interface: ScheduleObject

[<internal>](../modules/internal_.md).ScheduleObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`ScheduleObject`**

## Table of contents

### Properties

- [\_id](internal_.ScheduleObject.md#_id)
- [acl](internal_.ScheduleObject.md#acl)
- [common](internal_.ScheduleObject.md#common)
- [enums](internal_.ScheduleObject.md#enums)
- [from](internal_.ScheduleObject.md#from)
- [native](internal_.ScheduleObject.md#native)
- [nonEdit](internal_.ScheduleObject.md#nonedit)
- [ts](internal_.ScheduleObject.md#ts)
- [type](internal_.ScheduleObject.md#type)
- [user](internal_.ScheduleObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L631)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:638](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L638)

___

### common

• **common**: [`ScheduleCommon`](internal_.ScheduleCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L707)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L637)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L639)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L635)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L644)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L642)

___

### type

• **type**: ``"schedule"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L706)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/0b3c6e0e/packages/types-dev/objects.d.ts#L641)
