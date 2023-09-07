[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialUserObject

# Interface: PartialUserObject

[<internal>](../modules/internal_.md).PartialUserObject

## Hierarchy

- `Partial`<`Omit`<[`UserObject`](internal_.UserObject.md), ``"common"``\>\>

  ↳ **`PartialUserObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialUserObject.md#_id)
- [acl](internal_.PartialUserObject.md#acl)
- [common](internal_.PartialUserObject.md#common)
- [enums](internal_.PartialUserObject.md#enums)
- [from](internal_.PartialUserObject.md#from)
- [native](internal_.PartialUserObject.md#native)
- [nonEdit](internal_.PartialUserObject.md#nonedit)
- [ts](internal_.PartialUserObject.md#ts)
- [type](internal_.PartialUserObject.md#type)
- [user](internal_.PartialUserObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.user.${string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L766)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:638](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L638)

___

### common

• `Optional` **common**: `Partial`<[`UserCommon`](internal_.UserCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:771](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L771)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L637)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:639](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L639)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L635)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L644)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L642)

___

### type

• `Optional` **type**: ``"user"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L767)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/ce27fae4/packages/types-dev/objects.d.ts#L641)
