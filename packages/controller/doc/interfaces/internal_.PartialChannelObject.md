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

[types/objects.d.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L569)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types/objects.d.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L576)

___

### common

• `Optional` **common**: `Partial`<[`ChannelCommon`](internal_.ChannelCommon.md)\>

#### Defined in

[types/objects.d.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L598)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types/objects.d.ts:575](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L575)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L577)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types/objects.d.ts:573](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L573)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L580)

___

### type

• `Optional` **type**: ``"channel"``

#### Inherited from

Partial.type

#### Defined in

[types/objects.d.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L594)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types/objects.d.ts:579](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/objects.d.ts#L579)
