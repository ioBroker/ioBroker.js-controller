[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ChannelObject

# Interface: ChannelObject

[\<internal\>](../modules/internal_.md).ChannelObject

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

[types-dev/objects.d.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L826)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L833)

___

### common

• **common**: [`ChannelCommon`](internal_.ChannelCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:855](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L855)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L834)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L839)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L837)

___

### type

• **type**: ``"channel"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:854](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L854)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L836)
