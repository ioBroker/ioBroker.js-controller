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

[types-dev/objects.d.ts:756](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L756)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:763](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L763)

___

### common

• **common**: [`ScriptCommon`](internal_.ScriptCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:979](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L979)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:762](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L762)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:764](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L764)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:760](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L760)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L769)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L767)

___

### type

• **type**: ``"script"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:978](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L978)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/f0c31e77/packages/types-dev/objects.d.ts#L766)
