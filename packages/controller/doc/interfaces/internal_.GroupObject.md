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

[types-dev/objects.d.ts:1076](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L1076)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:867](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L867)

___

### common

• **common**: [`GroupCommon`](internal_.GroupCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1078](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L1078)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L866)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L868)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L864)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:873](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L873)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:871](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L871)

___

### type

• **type**: ``"group"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1077](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L1077)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:870](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L870)
