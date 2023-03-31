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

[types-dev/objects.d.ts:588](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L588)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L595)

___

### common

• `Optional` **common**: `Partial`<[`ScriptCommon`](internal_.ScriptCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:725](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L725)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L594)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L596)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L592)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L599)

___

### type

• `Optional` **type**: ``"script"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:721](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L721)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L598)
