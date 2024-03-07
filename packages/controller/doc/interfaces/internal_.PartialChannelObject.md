[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialChannelObject

# Interface: PartialChannelObject

[\<internal\>](../modules/internal_.md).PartialChannelObject

## Hierarchy

- `Partial`\<`Omit`\<[`ChannelObject`](internal_.ChannelObject.md), ``"common"``\>\>

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

[types-dev/objects.d.ts:756](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L756)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:763](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L763)

___

### common

• `Optional` **common**: `Partial`\<[`ChannelCommon`](internal_.ChannelCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:789](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L789)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:762](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L762)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:764](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L764)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:760](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L760)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L769)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L767)

___

### type

• `Optional` **type**: ``"channel"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:784](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L784)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L766)
