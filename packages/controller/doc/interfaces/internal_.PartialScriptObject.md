[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialScriptObject

# Interface: PartialScriptObject

[<internal>](../modules/internal_.md).PartialScriptObject

## Hierarchy

- `Partial`<`Omit`<[`ScriptObject`](internal_.ScriptObject.md), ``"common"``\>\>

  ↳ **`PartialScriptObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialScriptObject.md#_id)
- [acl](internal_.PartialScriptObject.md#acl)
- [common](internal_.PartialScriptObject.md#common)
- [enums](internal_.PartialScriptObject.md#enums)
- [from](internal_.PartialScriptObject.md#from)
- [native](internal_.PartialScriptObject.md#native)
- [nonEdit](internal_.PartialScriptObject.md#nonedit)
- [ts](internal_.PartialScriptObject.md#ts)
- [type](internal_.PartialScriptObject.md#type)
- [user](internal_.PartialScriptObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L645)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:652](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L652)

___

### common

• `Optional` **common**: `Partial`<[`ScriptCommon`](internal_.ScriptCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L811)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L651)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:653](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L653)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L649)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L658)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L656)

___

### type

• `Optional` **type**: ``"script"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:807](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L807)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:655](https://github.com/ioBroker/ioBroker.js-controller/blob/c401ed11/packages/types-dev/objects.d.ts#L655)
