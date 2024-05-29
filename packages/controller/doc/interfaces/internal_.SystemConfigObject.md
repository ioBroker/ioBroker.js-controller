[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / SystemConfigObject

# Interface: SystemConfigObject

[\<internal\>](../modules/internal_.md).SystemConfigObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`SystemConfigObject`**

## Table of contents

### Properties

- [\_id](internal_.SystemConfigObject.md#_id)
- [acl](internal_.SystemConfigObject.md#acl)
- [common](internal_.SystemConfigObject.md#common)
- [enums](internal_.SystemConfigObject.md#enums)
- [from](internal_.SystemConfigObject.md#from)
- [native](internal_.SystemConfigObject.md#native)
- [nonEdit](internal_.SystemConfigObject.md#nonedit)
- [ts](internal_.SystemConfigObject.md#ts)
- [type](internal_.SystemConfigObject.md#type)
- [user](internal_.SystemConfigObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:803](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L803)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:810](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L810)

___

### common

• **common**: [`SystemConfigCommon`](internal_.SystemConfigCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1039](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L1039)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:809](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L809)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L811)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:807](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L807)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:816](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L816)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:814](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L814)

___

### type

• **type**: ``"config"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1038](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L1038)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:813](https://github.com/ioBroker/ioBroker.js-controller/blob/9dbeeb628fed8bbdac147ce03ecc5b399e6f5ed0/packages/types-dev/objects.d.ts#L813)
