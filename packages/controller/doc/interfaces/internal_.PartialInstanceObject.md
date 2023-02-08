[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialInstanceObject

# Interface: PartialInstanceObject

[<internal>](../modules/internal_.md).PartialInstanceObject

## Hierarchy

- `Partial`<`Omit`<[`InstanceObject`](internal_.InstanceObject.md), ``"common"``\>\>

  ↳ **`PartialInstanceObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialInstanceObject.md#_id)
- [acl](internal_.PartialInstanceObject.md#acl)
- [common](internal_.PartialInstanceObject.md#common)
- [enums](internal_.PartialInstanceObject.md#enums)
- [from](internal_.PartialInstanceObject.md#from)
- [native](internal_.PartialInstanceObject.md#native)
- [ts](internal_.PartialInstanceObject.md#ts)
- [type](internal_.PartialInstanceObject.md#type)
- [user](internal_.PartialInstanceObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.adapter.${string}.${number}\`

#### Inherited from

Partial.\_id

#### Defined in

[types/objects.d.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/objects.d.ts#L636)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/objects.d.ts#L577)

___

### common

• `Optional` **common**: `Partial`<[`InstanceCommon`](internal_.InstanceCommon.md)\>

#### Defined in

[types/objects.d.ts:641](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/objects.d.ts#L641)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types/objects.d.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/objects.d.ts#L576)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types/objects.d.ts:578](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/objects.d.ts#L578)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types/objects.d.ts:574](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/objects.d.ts#L574)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types/objects.d.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/objects.d.ts#L581)

___

### type

• `Optional` **type**: ``"instance"``

#### Inherited from

Partial.type

#### Defined in

[types/objects.d.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/objects.d.ts#L637)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/objects.d.ts#L580)
