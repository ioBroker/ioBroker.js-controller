[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialInstanceObject

# Interface: PartialInstanceObject

[<internal>](../modules/internal_.md).PartialInstanceObject

## Hierarchy

- `Partial`<`Omit`<[`InstanceObject`](internal_.InstanceObject.md), ``"common"``\>\>

  ↳ **`PartialInstanceObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialInstanceObject.md#_id)
- [acl](internal_.PartialInstanceObject.md#acl)
- [common](internal_.PartialInstanceObject.md#common)
- [encryptedNative](internal_.PartialInstanceObject.md#encryptednative)
- [enums](internal_.PartialInstanceObject.md#enums)
- [from](internal_.PartialInstanceObject.md#from)
- [native](internal_.PartialInstanceObject.md#native)
- [nonEdit](internal_.PartialInstanceObject.md#nonedit)
- [protectedNative](internal_.PartialInstanceObject.md#protectednative)
- [ts](internal_.PartialInstanceObject.md#ts)
- [type](internal_.PartialInstanceObject.md#type)
- [user](internal_.PartialInstanceObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.adapter.${string}.${number}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L707)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L630)

___

### common

• `Optional` **common**: `Partial`<[`InstanceCommon`](internal_.InstanceCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:716](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L716)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

These properties will be automatically encrypted and decrypted when used with adapter.config

#### Inherited from

Partial.encryptedNative

#### Defined in

[types-dev/objects.d.ts:713](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L713)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L629)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L631)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L627)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L636)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

These properties will be removed when foreign adapters access it

#### Inherited from

Partial.protectedNative

#### Defined in

[types-dev/objects.d.ts:711](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L711)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L634)

___

### type

• `Optional` **type**: ``"instance"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:708](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L708)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/9c021089/packages/types-dev/objects.d.ts#L633)
