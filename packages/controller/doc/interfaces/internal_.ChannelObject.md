[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ChannelObject

# Interface: ChannelObject

[<internal>](../modules/internal_.md).ChannelObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`ChannelObject`**

## Table of contents

### Properties

- [\_id](internal_.ChannelObject.md#_id)
- [acl](internal_.ChannelObject.md#acl)
- [common](internal_.ChannelObject.md#common)
- [enums](internal_.ChannelObject.md#enums)
- [from](internal_.ChannelObject.md#from)
- [native](internal_.ChannelObject.md#native)
- [nonEdit](internal_.ChannelObject.md#nonedit)
- [ts](internal_.ChannelObject.md#ts)
- [type](internal_.ChannelObject.md#type)
- [user](internal_.ChannelObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:643](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L643)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:650](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L650)

___

### common

• **common**: [`ChannelCommon`](internal_.ChannelCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L671)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L649)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L651)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L647)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L656)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L654)

___

### type

• **type**: ``"channel"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:670](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L670)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:653](https://github.com/ioBroker/ioBroker.js-controller/blob/b9cc8f0d/packages/types-dev/objects.d.ts#L653)
