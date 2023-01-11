[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialDeviceObject

# Interface: PartialDeviceObject

[<internal>](../modules/internal_.md).PartialDeviceObject

## Hierarchy

- `Partial`<`Omit`<[`DeviceObject`](internal_.DeviceObject.md), ``"common"``\>\>

  ↳ **`PartialDeviceObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialDeviceObject.md#_id)
- [acl](internal_.PartialDeviceObject.md#acl)
- [common](internal_.PartialDeviceObject.md#common)
- [enums](internal_.PartialDeviceObject.md#enums)
- [from](internal_.PartialDeviceObject.md#from)
- [native](internal_.PartialDeviceObject.md#native)
- [ts](internal_.PartialDeviceObject.md#ts)
- [type](internal_.PartialDeviceObject.md#type)
- [user](internal_.PartialDeviceObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types/objects.d.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L554)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types/objects.d.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L561)

___

### common

• `Optional` **common**: `Partial`<[`DeviceCommon`](internal_.DeviceCommon.md)\>

#### Defined in

[types/objects.d.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L591)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

[types/objects.d.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L560)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types/objects.d.ts:562](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L562)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types/objects.d.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L558)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types/objects.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L565)

___

### type

• `Optional` **type**: ``"device"``

#### Inherited from

Partial.type

#### Defined in

[types/objects.d.ts:587](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L587)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types/objects.d.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/9c08dda8/packages/types/objects.d.ts#L564)
