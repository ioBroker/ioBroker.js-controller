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

[types-dev/objects.d.ts:608](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L608)

___

### acl

• `Optional` **acl**: [`StateACL`](internal_.StateACL.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L627)

___

### common

• **common**: [`StateCommon`](internal_.StateCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:626](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L626)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:614](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L614)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L616)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L612)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:621](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L621)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L619)

___

### type

• **type**: ``"state"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L625)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L618)
