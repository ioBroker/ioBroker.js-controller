[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / GroupObject

# Interface: GroupObject

[<internal>](../modules/internal_.md).GroupObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`GroupObject`**

## Table of contents

### Properties

- [\_id](internal_.GroupObject.md#_id)
- [acl](internal_.GroupObject.md#acl)
- [common](internal_.GroupObject.md#common)
- [enums](internal_.GroupObject.md#enums)
- [from](internal_.GroupObject.md#from)
- [native](internal_.GroupObject.md#native)
- [ts](internal_.GroupObject.md#ts)
- [type](internal_.GroupObject.md#type)
- [user](internal_.GroupObject.md#user)

## Properties

### \_id

• **\_id**: \`system.group.${string}\`

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L678)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L577)

___

### common

• **common**: [`GroupCommon`](internal_.GroupCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L680)

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

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L581)

___

### type

• **type**: ``"group"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L679)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/9c01619f/packages/types-dev/objects.d.ts#L580)
