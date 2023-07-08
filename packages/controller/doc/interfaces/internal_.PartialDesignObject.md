[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialDesignObject

# Interface: PartialDesignObject

[<internal>](../modules/internal_.md).PartialDesignObject

## Hierarchy

- `Partial`<`Omit`<[`DesignObject`](internal_.DesignObject.md), ``"common"``\>\>

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

• `Optional` **\_id**: \`\_design/${string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:781](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L781)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L630)

___

### common

• `Optional` **common**: `Partial`<[`OtherCommon`](internal_.OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L788)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L629)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L631)

___

### language

• `Optional` **language**: ``"javascript"``

#### Inherited from

Partial.language

#### Defined in

[types-dev/objects.d.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L782)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L627)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L636)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L634)

___

### type

• `Optional` **type**: ``"design"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:780](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L780)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L633)

___

### views

• `Optional` **views**: `Record`<`string`, { `map`: `string`  }\>

#### Inherited from

Partial.views

#### Defined in

[types-dev/objects.d.ts:784](https://github.com/ioBroker/ioBroker.js-controller/blob/3160f6ba/packages/types-dev/objects.d.ts#L784)
