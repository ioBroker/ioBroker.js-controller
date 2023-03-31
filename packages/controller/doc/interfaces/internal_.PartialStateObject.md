[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialStateObject

# Interface: PartialStateObject

[<internal>](../modules/internal_.md).PartialStateObject

## Hierarchy

- `Partial`<`Omit`<[`StateObject`](internal_.StateObject.md), ``"common"`` \| ``"acl"``\>\>

  ↳ **`PartialStateObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialStateObject.md#_id)
- [acl](internal_.PartialStateObject.md#acl)
- [common](internal_.PartialStateObject.md#common)
- [enums](internal_.PartialStateObject.md#enums)
- [from](internal_.PartialStateObject.md#from)
- [native](internal_.PartialStateObject.md#native)
- [ts](internal_.PartialStateObject.md#ts)
- [type](internal_.PartialStateObject.md#type)
- [user](internal_.PartialStateObject.md#user)

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

• `Optional` **acl**: `Partial`<[`StateACL`](internal_.StateACL.md)\>

#### Defined in

[types-dev/objects.d.ts:609](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L609)

___

### common

• `Optional` **common**: `Partial`<[`StateCommon`](internal_.StateCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:608](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L608)

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

• `Optional` **type**: ``"state"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:603](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L603)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/ba031176/packages/types-dev/objects.d.ts#L598)
