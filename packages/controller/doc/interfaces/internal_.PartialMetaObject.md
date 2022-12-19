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

[types/objects.d.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L554)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types/objects.d.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L561)

___

### common

• `Optional` **common**: `Partial`<[`MetaCommon`](internal_.MetaCommon.md)\>

#### Defined in

[types/objects.d.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L616)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types/objects.d.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L560)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types/objects.d.ts:562](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L562)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types/objects.d.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L558)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types/objects.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L565)

___

### type

• `Optional` **type**: ``"meta"``

#### Inherited from

Partial.type

#### Defined in

[types/objects.d.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L612)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types/objects.d.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L564)
