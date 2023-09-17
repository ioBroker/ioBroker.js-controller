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
- [nonEdit](internal_.PartialChannelObject.md#nonedit)
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

[types-dev/objects.d.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L643)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:650](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L650)

___

### common

• `Optional` **common**: `Partial`<[`ChannelCommon`](internal_.ChannelCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L674)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L649)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L651)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L647)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L656)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L654)

___

### type

• `Optional` **type**: ``"channel"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:670](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L670)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:653](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/types-dev/objects.d.ts#L653)
