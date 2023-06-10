[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / InstanceObject

# Interface: InstanceObject

[<internal>](../modules/internal_.md).InstanceObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`InstanceObject`**

## Table of contents

### Properties

- [\_id](internal_.InstanceObject.md#_id)
- [acl](internal_.InstanceObject.md#acl)
- [common](internal_.InstanceObject.md#common)
- [encryptedNative](internal_.InstanceObject.md#encryptednative)
- [enums](internal_.InstanceObject.md#enums)
- [from](internal_.InstanceObject.md#from)
- [native](internal_.InstanceObject.md#native)
- [nonEdit](internal_.InstanceObject.md#nonedit)
- [protectedNative](internal_.InstanceObject.md#protectednative)
- [ts](internal_.InstanceObject.md#ts)
- [type](internal_.InstanceObject.md#type)
- [user](internal_.InstanceObject.md#user)

## Properties

### \_id

• **\_id**: \`system.adapter.${string}.${number}\`

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L707)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L630)

___

### common

• **common**: [`InstanceCommon`](internal_.InstanceCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L709)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

These properties will be automatically encrypted and decrypted when used with adapter.config

#### Defined in

[types-dev/objects.d.ts:713](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L713)

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

### protectedNative

• `Optional` **protectedNative**: `string`[]

These properties will be removed when foreign adapters access it

#### Defined in

[types-dev/objects.d.ts:711](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L711)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L634)

___

### type

• **type**: ``"instance"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:708](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L708)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/e9518edb/packages/types-dev/objects.d.ts#L633)
