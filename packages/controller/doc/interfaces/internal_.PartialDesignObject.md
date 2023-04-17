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

[types-dev/objects.d.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L766)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:615](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L615)

___

### common

• `Optional` **common**: `Partial`<[`OtherCommon`](internal_.OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:773](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L773)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:614](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L614)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L616)

___

### language

• `Optional` **language**: ``"javascript"``

#### Inherited from

Partial.language

#### Defined in

[types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L767)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L612)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:621](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L621)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L619)

___

### type

• `Optional` **type**: ``"design"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:765](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L765)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L618)

___

### views

• `Optional` **views**: `Record`<`string`, { `map`: `string`  }\>

#### Inherited from

Partial.views

#### Defined in

[types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L769)
