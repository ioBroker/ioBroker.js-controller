[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / UserObject

# Interface: UserObject

[<internal>](../modules/internal_.md).UserObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`UserObject`**

## Table of contents

### Properties

- [\_id](internal_.UserObject.md#_id)
- [acl](internal_.UserObject.md#acl)
- [common](internal_.UserObject.md#common)
- [enums](internal_.UserObject.md#enums)
- [from](internal_.UserObject.md#from)
- [native](internal_.UserObject.md#native)
- [ts](internal_.UserObject.md#ts)
- [type](internal_.UserObject.md#type)
- [user](internal_.UserObject.md#user)

## Properties

### \_id

• **\_id**: \`system.user.${string}\`

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L669)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L577)

___

### common

• **common**: [`UserCommon`](internal_.UserCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L671)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types/objects.d.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L576)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types/objects.d.ts:578](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L578)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types/objects.d.ts:574](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L574)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types/objects.d.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L581)

___

### type

• **type**: ``"user"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types/objects.d.ts:670](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L670)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L580)
