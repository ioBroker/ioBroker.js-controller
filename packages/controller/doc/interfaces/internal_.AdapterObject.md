[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / AdapterObject

# Interface: AdapterObject

[<internal>](../modules/internal_.md).AdapterObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`AdapterObject`**

## Table of contents

### Properties

- [\_id](internal_.AdapterObject.md#_id)
- [acl](internal_.AdapterObject.md#acl)
- [common](internal_.AdapterObject.md#common)
- [encryptedNative](internal_.AdapterObject.md#encryptednative)
- [enums](internal_.AdapterObject.md#enums)
- [from](internal_.AdapterObject.md#from)
- [native](internal_.AdapterObject.md#native)
- [protectedNative](internal_.AdapterObject.md#protectednative)
- [ts](internal_.AdapterObject.md#ts)
- [type](internal_.AdapterObject.md#type)
- [user](internal_.AdapterObject.md#user)

## Properties

### \_id

• **\_id**: \`system.adapter.${string}\`

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L645)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L577)

___

### common

• **common**: [`AdapterCommon`](internal_.AdapterCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:647](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L647)

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Defined in

[types-dev/objects.d.ts:651](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L651)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L576)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:578](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L578)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:574](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L574)

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Defined in

[types-dev/objects.d.ts:649](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L649)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L581)

___

### type

• **type**: ``"adapter"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L646)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L580)
