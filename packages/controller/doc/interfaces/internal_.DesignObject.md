[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / DesignObject

# Interface: DesignObject

[<internal>](../modules/internal_.md).DesignObject

## Hierarchy

- `Omit`<[`BaseObject`](internal_.BaseObject.md), ``"common"``\>

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

• **\_id**: \`\_design/${string}\`

#### Overrides

Omit.\_id

#### Defined in

[types-dev/objects.d.ts:825](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L825)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Omit.acl

#### Defined in

[types-dev/objects.d.ts:652](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L652)

___

### common

• `Optional` **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Defined in

[types-dev/objects.d.ts:827](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L827)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Omit.enums

#### Defined in

[types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L651)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Omit.from

#### Defined in

[types-dev/objects.d.ts:653](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L653)

___

### language

• **language**: ``"javascript"``

#### Defined in

[types-dev/objects.d.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L826)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

Omit.native

#### Defined in

[types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L649)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Omit.nonEdit

#### Defined in

[types-dev/objects.d.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L658)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Omit.ts

#### Defined in

[types-dev/objects.d.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L656)

___

### type

• **type**: ``"design"``

#### Overrides

Omit.type

#### Defined in

[types-dev/objects.d.ts:824](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L824)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Omit.user

#### Defined in

[types-dev/objects.d.ts:655](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L655)

___

### views

• **views**: `Record`<`string`, { `map`: `string`  }\>

#### Defined in

[types-dev/objects.d.ts:828](https://github.com/ioBroker/ioBroker.js-controller/blob/297e6576/packages/types-dev/objects.d.ts#L828)
