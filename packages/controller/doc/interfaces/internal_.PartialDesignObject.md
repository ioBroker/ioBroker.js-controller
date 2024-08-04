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

[types-dev/objects.d.ts:1115](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L1115)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:867](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L867)

___

### common

• `Optional` **common**: `Partial`\<[`OtherCommon`](internal_.OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1122](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L1122)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L866)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L868)

___

### language

• `Optional` **language**: ``"javascript"``

#### Inherited from

Partial.language

#### Defined in

[types-dev/objects.d.ts:1116](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L1116)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L864)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:873](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L873)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:871](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L871)

___

### type

• `Optional` **type**: ``"design"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:1114](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L1114)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:870](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L870)

___

### views

• `Optional` **views**: `Record`\<`string`, \{ `map`: `string`  }\>

#### Inherited from

Partial.views

#### Defined in

[types-dev/objects.d.ts:1118](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L1118)
