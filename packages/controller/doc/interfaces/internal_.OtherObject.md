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

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L832)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L839)

___

### common

• **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1077](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L1077)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:838](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L838)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:840](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L840)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L836)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:845](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L845)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:843](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L843)

___

### type

• **type**: ``"config"`` \| ``"chart"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1076](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L1076)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:842](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L842)
