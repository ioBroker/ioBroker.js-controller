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
- [ts](internal_.PartialGroupObject.md#ts)
- [type](internal_.PartialGroupObject.md#type)
- [user](internal_.PartialGroupObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.group.${string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L712)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L595)

___

### common

• `Optional` **common**: `Partial`<[`GroupCommon`](internal_.GroupCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:717](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L717)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L594)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L596)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L592)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L599)

___

### type

• `Optional` **type**: ``"group"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:713](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L713)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L598)
