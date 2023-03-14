[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialChannelObject

# Interface: PartialChannelObject

[<internal>](../modules/internal_.md).PartialChannelObject

## Hierarchy

- `Partial`<`Omit`<[`ChannelObject`](internal_.ChannelObject.md), ``"common"``\>\>

  ↳ **`PartialChannelObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialChannelObject.md#_id)
- [acl](internal_.PartialChannelObject.md#acl)
- [common](internal_.PartialChannelObject.md#common)
- [enums](internal_.PartialChannelObject.md#enums)
- [from](internal_.PartialChannelObject.md#from)
- [native](internal_.PartialChannelObject.md#native)
- [ts](internal_.PartialChannelObject.md#ts)
- [type](internal_.PartialChannelObject.md#type)
- [user](internal_.PartialChannelObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:585](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L585)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L592)

___

### common

• `Optional` **common**: `Partial`<[`ChannelCommon`](internal_.ChannelCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:614](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L614)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L591)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L593)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L589)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L596)

___

### type

• `Optional` **type**: ``"channel"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:610](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L610)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L595)
