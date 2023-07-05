[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialAdapterObject

# Interface: PartialAdapterObject

[<internal>](../modules/internal_.md).PartialAdapterObject

## Hierarchy

- `Partial`<`Omit`<[`AdapterObject`](internal_.AdapterObject.md), ``"common"``\>\>

  ↳ **`PartialAdapterObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialAdapterObject.md#_id)
- [acl](internal_.PartialAdapterObject.md#acl)
- [common](internal_.PartialAdapterObject.md#common)
- [encryptedNative](internal_.PartialAdapterObject.md#encryptednative)
- [enums](internal_.PartialAdapterObject.md#enums)
- [from](internal_.PartialAdapterObject.md#from)
- [native](internal_.PartialAdapterObject.md#native)
- [nonEdit](internal_.PartialAdapterObject.md#nonedit)
- [protectedNative](internal_.PartialAdapterObject.md#protectednative)
- [ts](internal_.PartialAdapterObject.md#ts)
- [type](internal_.PartialAdapterObject.md#type)
- [user](internal_.PartialAdapterObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.adapter.${string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:720](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L720)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L630)

___

### common

• `Optional` **common**: `Partial`<[`AdapterCommon`](internal_.AdapterCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:729](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L729)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

Partial.encryptedNative

#### Defined in

[types-dev/objects.d.ts:726](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L726)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L629)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L631)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L627)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L636)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

Partial.protectedNative

#### Defined in

[types-dev/objects.d.ts:724](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L724)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L634)

___

### type

• `Optional` **type**: ``"adapter"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:721](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L721)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/7c5470f2/packages/types-dev/objects.d.ts#L633)
