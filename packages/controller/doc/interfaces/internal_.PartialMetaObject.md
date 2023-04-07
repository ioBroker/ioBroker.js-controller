[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialMetaObject

# Interface: PartialMetaObject

[<internal>](../modules/internal_.md).PartialMetaObject

## Hierarchy

- `Partial`<`Omit`<[`MetaObject`](internal_.MetaObject.md), ``"common"``\>\>

  ↳ **`PartialMetaObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialMetaObject.md#_id)
- [acl](internal_.PartialMetaObject.md#acl)
- [common](internal_.PartialMetaObject.md#common)
- [enums](internal_.PartialMetaObject.md#enums)
- [from](internal_.PartialMetaObject.md#from)
- [native](internal_.PartialMetaObject.md#native)
- [ts](internal_.PartialMetaObject.md#ts)
- [type](internal_.PartialMetaObject.md#type)
- [user](internal_.PartialMetaObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:588](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L588)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L595)

___

### common

• `Optional` **common**: `Partial`<[`MetaCommon`](internal_.MetaCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:650](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L650)

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

• `Optional` **type**: ``"meta"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L646)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/7c09eb1e/packages/types-dev/objects.d.ts#L598)
