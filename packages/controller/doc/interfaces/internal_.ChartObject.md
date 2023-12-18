[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ChartObject

# Interface: ChartObject

[\<internal\>](../modules/internal_.md).ChartObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`ChartObject`**

## Table of contents

### Properties

- [\_id](internal_.ChartObject.md#_id)
- [acl](internal_.ChartObject.md#acl)
- [common](internal_.ChartObject.md#common)
- [enums](internal_.ChartObject.md#enums)
- [from](internal_.ChartObject.md#from)
- [native](internal_.ChartObject.md#native)
- [nonEdit](internal_.ChartObject.md#nonedit)
- [ts](internal_.ChartObject.md#ts)
- [type](internal_.ChartObject.md#type)
- [user](internal_.ChartObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L673)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L680)

___

### common

• **common**: [`ChartCommon`](internal_.ChartCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L743)

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

• **type**: ``"chart"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:742](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L742)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/91a2303a/packages/types-dev/objects.d.ts#L683)
