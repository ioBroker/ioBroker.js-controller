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

[types-dev/objects.d.ts:817](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L817)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L680)

___

### common

• **common**: [`UserCommon`](internal_.UserCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:819](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L819)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L679)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L681)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L677)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L686)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L684)

___

### type

• **type**: ``"user"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:818](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L818)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L683)
