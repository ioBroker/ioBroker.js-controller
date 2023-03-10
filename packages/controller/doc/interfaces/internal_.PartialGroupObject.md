[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialGroupObject

# Interface: PartialGroupObject

[<internal>](../modules/internal_.md).PartialGroupObject

## Hierarchy

- `Partial`<`Omit`<[`GroupObject`](internal_.GroupObject.md), ``"common"``\>\>

  ↳ **`PartialGroupObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialGroupObject.md#_id)
- [acl](internal_.PartialGroupObject.md#acl)
- [common](internal_.PartialGroupObject.md#common)
- [enums](internal_.PartialGroupObject.md#enums)
- [from](internal_.PartialGroupObject.md#from)
- [native](internal_.PartialGroupObject.md#native)
- [ts](internal_.PartialGroupObject.md#ts)
- [type](internal_.PartialGroupObject.md#type)
- [user](internal_.PartialGroupObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.group.${string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/objects.d.ts#L678)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/objects.d.ts#L577)

___

### common

• `Optional` **common**: `Partial`<[`GroupCommon`](internal_.GroupCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/objects.d.ts#L683)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/objects.d.ts#L576)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:578](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/objects.d.ts#L578)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:574](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/objects.d.ts#L574)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/objects.d.ts#L581)

___

### type

• `Optional` **type**: ``"group"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/objects.d.ts#L679)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/objects.d.ts#L580)
