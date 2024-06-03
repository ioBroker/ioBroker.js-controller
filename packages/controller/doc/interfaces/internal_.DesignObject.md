[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / DesignObject

# Interface: DesignObject

[\<internal\>](../modules/internal_.md).DesignObject

## Hierarchy

- `Omit`\<[`BaseObject`](internal_.BaseObject.md), ``"common"``\>

  ↳ **`DesignObject`**

## Table of contents

### Properties

- [\_id](internal_.DesignObject.md#_id)
- [acl](internal_.DesignObject.md#acl)
- [common](internal_.DesignObject.md#common)
- [enums](internal_.DesignObject.md#enums)
- [from](internal_.DesignObject.md#from)
- [language](internal_.DesignObject.md#language)
- [native](internal_.DesignObject.md#native)
- [nonEdit](internal_.DesignObject.md#nonedit)
- [ts](internal_.DesignObject.md#ts)
- [type](internal_.DesignObject.md#type)
- [user](internal_.DesignObject.md#user)
- [views](internal_.DesignObject.md#views)

## Properties

### \_id

• **\_id**: \`\_design/$\{string}\`

#### Overrides

Omit.\_id

#### Defined in

[types-dev/objects.d.ts:1081](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L1081)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Omit.acl

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L833)

___

### common

• `Optional` **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Defined in

[types-dev/objects.d.ts:1083](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L1083)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Omit.enums

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Omit.from

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L834)

___

### language

• **language**: ``"javascript"``

#### Defined in

[types-dev/objects.d.ts:1082](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L1082)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

Omit.native

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Omit.nonEdit

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L839)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Omit.ts

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L837)

___

### type

• **type**: ``"design"``

#### Overrides

Omit.type

#### Defined in

[types-dev/objects.d.ts:1080](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L1080)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Omit.user

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L836)

___

### views

• **views**: `Record`\<`string`, \{ `map`: `string`  }\>

#### Defined in

[types-dev/objects.d.ts:1084](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L1084)
