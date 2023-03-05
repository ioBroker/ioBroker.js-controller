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

[types/objects.d.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L658)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L577)

___

### common

• `Optional` **common**: `Partial`<[`HostCommon`](internal_.HostCommon.md)\>

#### Defined in

[types/objects.d.ts:664](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L664)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types/objects.d.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L576)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types/objects.d.ts:578](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L578)

___

### native

• `Optional` **native**: `Partial`<[`HostNative`](internal_.HostNative.md)\>

#### Defined in

[types/objects.d.ts:665](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L665)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types/objects.d.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L581)

___

### type

• `Optional` **type**: ``"host"``

#### Inherited from

Partial.type

#### Defined in

[types/objects.d.ts:659](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L659)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/objects.d.ts#L580)
