[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ScriptObject

# Interface: ScriptObject

[\<internal\>](../modules/internal_.md).ScriptObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`ScriptObject`**

## Table of contents

### Properties

- [\_id](internal_.ScriptObject.md#_id)
- [acl](internal_.ScriptObject.md#acl)
- [common](internal_.ScriptObject.md#common)
- [enums](internal_.ScriptObject.md#enums)
- [from](internal_.ScriptObject.md#from)
- [native](internal_.ScriptObject.md#native)
- [nonEdit](internal_.ScriptObject.md#nonedit)
- [ts](internal_.ScriptObject.md#ts)
- [type](internal_.ScriptObject.md#type)
- [user](internal_.ScriptObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:893](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L893)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:900](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L900)

___

### common

• **common**: [`ScriptCommon`](internal_.ScriptCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1156](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L1156)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:899](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L899)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:901](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L901)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:897](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L897)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:906](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L906)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:904](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L904)

___

### type

• **type**: ``"script"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1155](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L1155)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:903](https://github.com/ioBroker/ioBroker.js-controller/blob/9a3639aedf4d283ec031e1ded125b70fb2f2e3cd/packages/types-dev/objects.d.ts#L903)
