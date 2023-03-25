[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / MetaObject

# Interface: MetaObject

[<internal>](../modules/internal_.md).MetaObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`MetaObject`**

## Table of contents

### Properties

- [\_id](internal_.MetaObject.md#_id)
- [acl](internal_.MetaObject.md#acl)
- [common](internal_.MetaObject.md#common)
- [enums](internal_.MetaObject.md#enums)
- [from](internal_.MetaObject.md#from)
- [native](internal_.MetaObject.md#native)
- [ts](internal_.MetaObject.md#ts)
- [type](internal_.MetaObject.md#type)
- [user](internal_.MetaObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:586](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L586)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L593)

___

### common

• **common**: [`MetaCommon`](internal_.MetaCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:645](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L645)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L592)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L594)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L590)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L597)

___

### type

• **type**: ``"meta"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L644)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/objects.d.ts#L596)
