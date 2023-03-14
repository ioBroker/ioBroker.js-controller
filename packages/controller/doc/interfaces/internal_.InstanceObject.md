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
- [enums](internal_.InstanceObject.md#enums)
- [from](internal_.InstanceObject.md#from)
- [native](internal_.InstanceObject.md#native)
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

[types-dev/objects.d.ts:667](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L667)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L592)

___

### common

• **common**: [`InstanceCommon`](internal_.InstanceCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L669)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L591)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L593)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L589)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L596)

___

### type

• **type**: ``"instance"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:668](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L668)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/5a12d69c/packages/types-dev/objects.d.ts#L595)
