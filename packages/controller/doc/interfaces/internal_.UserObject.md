[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / UserObject

# Interface: UserObject

[\<internal\>](../modules/internal_.md).UserObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`UserObject`**

## Table of contents

### Properties

- [\_id](internal_.UserObject.md#_id)
- [acl](internal_.UserObject.md#acl)
- [common](internal_.UserObject.md#common)
- [enums](internal_.UserObject.md#enums)
- [from](internal_.UserObject.md#from)
- [native](internal_.UserObject.md#native)
- [nonEdit](internal_.UserObject.md#nonedit)
- [ts](internal_.UserObject.md#ts)
- [type](internal_.UserObject.md#type)
- [user](internal_.UserObject.md#user)

## Properties

### \_id

• **\_id**: \`system.user.$\{string}\`

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:983](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L983)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L788)

___

### common

• **common**: [`UserCommon`](internal_.UserCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:985](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L985)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:787](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L787)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:789](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L789)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:785](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L785)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:794](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L794)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:792](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L792)

___

### type

• **type**: ``"user"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:984](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L984)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:791](https://github.com/ioBroker/ioBroker.js-controller/blob/2e8a4aa0/packages/types-dev/objects.d.ts#L791)
