[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialHostObject

# Interface: PartialHostObject

[\<internal\>](../modules/internal_.md).PartialHostObject

## Hierarchy

- `Partial`\<`Omit`\<[`HostObject`](internal_.HostObject.md), ``"common"`` \| ``"native"``\>\>

  ↳ **`PartialHostObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialHostObject.md#_id)
- [acl](internal_.PartialHostObject.md#acl)
- [common](internal_.PartialHostObject.md#common)
- [enums](internal_.PartialHostObject.md#enums)
- [from](internal_.PartialHostObject.md#from)
- [native](internal_.PartialHostObject.md#native)
- [nonEdit](internal_.PartialHostObject.md#nonedit)
- [ts](internal_.PartialHostObject.md#ts)
- [type](internal_.PartialHostObject.md#type)
- [user](internal_.PartialHostObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.host.$\{string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L994)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:807](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L807)

___

### common

• `Optional` **common**: `Partial`\<[`HostCommon`](internal_.HostCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1001](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L1001)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:806](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L806)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:808](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L808)

___

### native

• `Optional` **native**: `Partial`\<[`HostNative`](internal_.HostNative.md)\>

#### Defined in

[types-dev/objects.d.ts:1002](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L1002)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:813](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L813)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L811)

___

### type

• `Optional` **type**: ``"host"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L995)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:810](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L810)
