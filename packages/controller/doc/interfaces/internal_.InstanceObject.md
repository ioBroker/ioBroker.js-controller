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

[types-dev/objects.d.ts:670](https://github.com/ioBroker/ioBroker.js-controller/blob/fd495c2e/packages/types-dev/objects.d.ts#L670)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/fd495c2e/packages/types-dev/objects.d.ts#L595)

___

### common

• **common**: [`InstanceCommon`](internal_.InstanceCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/fd495c2e/packages/types-dev/objects.d.ts#L672)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/fd495c2e/packages/types-dev/objects.d.ts#L594)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/fd495c2e/packages/types-dev/objects.d.ts#L596)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/fd495c2e/packages/types-dev/objects.d.ts#L592)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/fd495c2e/packages/types-dev/objects.d.ts#L599)

___

### type

• **type**: ``"instance"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/fd495c2e/packages/types-dev/objects.d.ts#L671)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/fd495c2e/packages/types-dev/objects.d.ts#L598)
