[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialDesignObject

# Interface: PartialDesignObject

[\<internal\>](../modules/internal_.md).PartialDesignObject

## Hierarchy

- `Partial`\<`Omit`\<[`DesignObject`](internal_.DesignObject.md), ``"common"``\>\>

  ↳ **`PartialDesignObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialDesignObject.md#_id)
- [acl](internal_.PartialDesignObject.md#acl)
- [common](internal_.PartialDesignObject.md#common)
- [enums](internal_.PartialDesignObject.md#enums)
- [from](internal_.PartialDesignObject.md#from)
- [language](internal_.PartialDesignObject.md#language)
- [native](internal_.PartialDesignObject.md#native)
- [nonEdit](internal_.PartialDesignObject.md#nonedit)
- [ts](internal_.PartialDesignObject.md#ts)
- [type](internal_.PartialDesignObject.md#type)
- [user](internal_.PartialDesignObject.md#user)
- [views](internal_.PartialDesignObject.md#views)

## Properties

### \_id

• `Optional` **\_id**: \`\_design/$\{string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:1046](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L1046)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:802](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L802)

___

### common

• `Optional` **common**: `Partial`\<[`OtherCommon`](internal_.OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1053](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L1053)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:801](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L801)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:803](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L803)

___

### language

• `Optional` **language**: ``"javascript"``

#### Inherited from

Partial.language

#### Defined in

[types-dev/objects.d.ts:1047](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L1047)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:799](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L799)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:808](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L808)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:806](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L806)

___

### type

• `Optional` **type**: ``"design"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:1045](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L1045)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:805](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L805)

___

### views

• `Optional` **views**: `Record`\<`string`, \{ `map`: `string`  }\>

#### Inherited from

Partial.views

#### Defined in

[types-dev/objects.d.ts:1049](https://github.com/ioBroker/ioBroker.js-controller/blob/4020943e/packages/types-dev/objects.d.ts#L1049)
