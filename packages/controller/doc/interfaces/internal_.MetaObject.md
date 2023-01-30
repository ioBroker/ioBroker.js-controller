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

[types/objects.d.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L554)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types/objects.d.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L561)

___

### common

• **common**: [`MetaCommon`](internal_.MetaCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types/objects.d.ts:613](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L613)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types/objects.d.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L560)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types/objects.d.ts:562](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L562)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types/objects.d.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L558)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types/objects.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L565)

___

### type

• **type**: ``"meta"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types/objects.d.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L612)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types/objects.d.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L564)
