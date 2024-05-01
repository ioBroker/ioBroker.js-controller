[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / GroupObject

# Interface: GroupObject

[\<internal\>](../modules/internal_.md).GroupObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`GroupObject`**

## Table of contents

### Properties

- [\_id](internal_.GroupObject.md#_id)
- [acl](internal_.GroupObject.md#acl)
- [common](internal_.GroupObject.md#common)
- [enums](internal_.GroupObject.md#enums)
- [from](internal_.GroupObject.md#from)
- [native](internal_.GroupObject.md#native)
- [nonEdit](internal_.GroupObject.md#nonedit)
- [ts](internal_.GroupObject.md#ts)
- [type](internal_.GroupObject.md#type)
- [user](internal_.GroupObject.md#user)

## Properties

### \_id

• **\_id**: \`system.group.$\{string}\`

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:1016](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L1016)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:807](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L807)

___

### common

• **common**: [`GroupCommon`](internal_.GroupCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1018](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L1018)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:806](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L806)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:808](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L808)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:804](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L804)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:813](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L813)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L811)

___

### type

• **type**: ``"group"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1017](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L1017)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:810](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/objects.d.ts#L810)
