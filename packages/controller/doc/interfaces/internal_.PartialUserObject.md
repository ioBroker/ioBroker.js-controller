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

[types-dev/objects.d.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L788)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:652](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L652)

___

### common

• `Optional` **common**: `Partial`<[`UserCommon`](internal_.UserCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:793](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L793)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L651)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:653](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L653)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L649)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L658)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L656)

___

### type

• `Optional` **type**: ``"user"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:789](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L789)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:655](https://github.com/ioBroker/ioBroker.js-controller/blob/ef3265a4/packages/types-dev/objects.d.ts#L655)
