[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialHostObject

# Interface: PartialHostObject

[<internal>](../modules/internal_.md).PartialHostObject

## Hierarchy

- `Partial`<`Omit`<[`HostObject`](internal_.HostObject.md), ``"common"`` \| ``"native"``\>\>

  ↳ **`PartialHostObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialHostObject.md#_id)
- [acl](internal_.PartialHostObject.md#acl)
- [common](internal_.PartialHostObject.md#common)
- [enums](internal_.PartialHostObject.md#enums)
- [from](internal_.PartialHostObject.md#from)
- [native](internal_.PartialHostObject.md#native)
- [ts](internal_.PartialHostObject.md#ts)
- [type](internal_.PartialHostObject.md#type)
- [user](internal_.PartialHostObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.host.${string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/62b38aa7/packages/types-dev/objects.d.ts#L692)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/62b38aa7/packages/types-dev/objects.d.ts#L595)

___

### common

• `Optional` **common**: `Partial`<[`HostCommon`](internal_.HostCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/62b38aa7/packages/types-dev/objects.d.ts#L698)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/62b38aa7/packages/types-dev/objects.d.ts#L594)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/62b38aa7/packages/types-dev/objects.d.ts#L596)

___

### native

• `Optional` **native**: `Partial`<[`HostNative`](internal_.HostNative.md)\>

#### Defined in

[types-dev/objects.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/62b38aa7/packages/types-dev/objects.d.ts#L699)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/62b38aa7/packages/types-dev/objects.d.ts#L599)

___

### type

• `Optional` **type**: ``"host"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:693](https://github.com/ioBroker/ioBroker.js-controller/blob/62b38aa7/packages/types-dev/objects.d.ts#L693)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:598](https://github.com/ioBroker/ioBroker.js-controller/blob/62b38aa7/packages/types-dev/objects.d.ts#L598)
