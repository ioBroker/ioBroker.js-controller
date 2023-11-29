[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / StateObject

# Interface: StateObject

[<internal>](../modules/internal_.md).StateObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`StateObject`**

## Table of contents

### Properties

- [\_id](internal_.StateObject.md#_id)
- [acl](internal_.StateObject.md#acl)
- [common](internal_.StateObject.md#common)
- [enums](internal_.StateObject.md#enums)
- [from](internal_.StateObject.md#from)
- [native](internal_.StateObject.md#native)
- [nonEdit](internal_.StateObject.md#nonedit)
- [ts](internal_.StateObject.md#ts)
- [type](internal_.StateObject.md#type)
- [user](internal_.StateObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L673)

___

### acl

• `Optional` **acl**: [`StateACL`](internal_.StateACL.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L692)

___

### common

• **common**: [`StateCommon`](internal_.StateCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L691)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L679)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L681)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L677)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L686)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L684)

___

### type

• **type**: ``"state"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L690)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:683](https://github.com/ioBroker/ioBroker.js-controller/blob/2682873d/packages/types-dev/objects.d.ts#L683)
