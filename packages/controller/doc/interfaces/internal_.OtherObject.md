[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / OtherObject

# Interface: OtherObject

[\<internal\>](../modules/internal_.md).OtherObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`OtherObject`**

## Table of contents

### Properties

- [\_id](internal_.OtherObject.md#_id)
- [acl](internal_.OtherObject.md#acl)
- [common](internal_.OtherObject.md#common)
- [enums](internal_.OtherObject.md#enums)
- [from](internal_.OtherObject.md#from)
- [native](internal_.OtherObject.md#native)
- [nonEdit](internal_.OtherObject.md#nonedit)
- [ts](internal_.OtherObject.md#ts)
- [type](internal_.OtherObject.md#type)
- [user](internal_.OtherObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:860](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L860)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:867](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L867)

___

### common

• **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1105](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L1105)

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

• **type**: ``"config"`` \| ``"chart"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1104](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L1104)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:870](https://github.com/ioBroker/ioBroker.js-controller/blob/34e3febb44c91492104ab37fef1775198d5dc796/packages/types-dev/objects.d.ts#L870)
