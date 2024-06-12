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

[types-dev/objects.d.ts:1042](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L1042)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L833)

___

### common

• **common**: [`GroupCommon`](internal_.GroupCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1044](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L1044)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L834)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L839)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L837)

___

### type

• **type**: ``"group"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1043](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L1043)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/05d1f586b1b0d592fb570591a46df4b65d77839f/packages/types-dev/objects.d.ts#L836)
