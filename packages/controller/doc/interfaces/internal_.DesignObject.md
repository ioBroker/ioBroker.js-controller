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

[types-dev/objects.d.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L735)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Omit.acl

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L592)

___

### common

• `Optional` **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Defined in

[types-dev/objects.d.ts:737](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L737)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Omit.enums

#### Defined in

[types-dev/objects.d.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L591)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Omit.from

#### Defined in

[types-dev/objects.d.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L593)

___

### language

• **language**: ``"javascript"``

#### Defined in

[types-dev/objects.d.ts:736](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L736)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

Omit.native

#### Defined in

[types-dev/objects.d.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L589)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Omit.ts

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L596)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Inherited from

Omit.type

#### Defined in

[types-dev/objects.d.ts:586](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L586)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Omit.user

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L595)

___

### views

• **views**: `Record`<`string`, { `map`: `string`  }\>

#### Defined in

[types-dev/objects.d.ts:738](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L738)
