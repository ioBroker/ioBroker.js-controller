[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialGroupObject

# Interface: PartialGroupObject

[<internal>](../modules/internal_.md).PartialGroupObject

## Hierarchy

- `Partial`<`Omit`<[`GroupObject`](internal_.GroupObject.md), ``"common"``\>\>

  ↳ **`PartialGroupObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialGroupObject.md#_id)
- [acl](internal_.PartialGroupObject.md#acl)
- [common](internal_.PartialGroupObject.md#common)
- [enums](internal_.PartialGroupObject.md#enums)
- [from](internal_.PartialGroupObject.md#from)
- [native](internal_.PartialGroupObject.md#native)
- [nonEdit](internal_.PartialGroupObject.md#nonedit)
- [ts](internal_.PartialGroupObject.md#ts)
- [type](internal_.PartialGroupObject.md#type)
- [user](internal_.PartialGroupObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.group.${string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:738](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L738)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:615](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L615)

___

### common

• `Optional` **common**: `Partial`<[`GroupCommon`](internal_.GroupCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L743)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:614](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L614)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L616)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L612)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:621](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L621)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L619)

___

### type

• `Optional` **type**: ``"group"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L739)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/efa3e809/packages/types-dev/objects.d.ts#L618)
