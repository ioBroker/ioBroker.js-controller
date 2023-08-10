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

[types-dev/objects.d.ts:744](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L744)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L630)

___

### common

• `Optional` **common**: `Partial`<[`UserCommon`](internal_.UserCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:749](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L749)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L629)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L631)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L627)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L636)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L634)

___

### type

• `Optional` **type**: ``"user"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:745](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L745)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/9100afbd/packages/types-dev/objects.d.ts#L633)
