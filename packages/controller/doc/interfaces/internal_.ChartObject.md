[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ChartObject

# Interface: ChartObject

[<internal>](../modules/internal_.md).ChartObject

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

[types-dev/objects.d.ts:623](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L623)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L630)

___

### common

• **common**: [`ChartCommon`](internal_.ChartCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L692)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L629)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L631)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L627)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L636)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L634)

___

### type

• **type**: ``"chart"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L691)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L633)
