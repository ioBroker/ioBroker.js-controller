[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / HostObject

# Interface: HostObject

[<internal>](../modules/internal_.md).HostObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`HostObject`**

## Table of contents

### Properties

- [\_id](internal_.HostObject.md#_id)
- [acl](internal_.HostObject.md#acl)
- [common](internal_.HostObject.md#common)
- [enums](internal_.HostObject.md#enums)
- [from](internal_.HostObject.md#from)
- [native](internal_.HostObject.md#native)
- [nonEdit](internal_.HostObject.md#nonedit)
- [ts](internal_.HostObject.md#ts)
- [type](internal_.HostObject.md#type)
- [user](internal_.HostObject.md#user)

## Properties

### \_id

• **\_id**: \`system.host.${string}\`

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:718](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L718)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:615](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L615)

___

### common

• **common**: [`HostCommon`](internal_.HostCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:720](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L720)

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

• **native**: [`HostNative`](internal_.HostNative.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:721](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L721)

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

• **type**: ``"host"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:719](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L719)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/97da7a9c/packages/types-dev/objects.d.ts#L618)
