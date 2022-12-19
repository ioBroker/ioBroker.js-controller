[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / DeviceObject

# Interface: DeviceObject

[<internal>](../modules/internal_.md).DeviceObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`DeviceObject`**

## Table of contents

### Properties

- [\_id](internal_.DeviceObject.md#_id)
- [acl](internal_.DeviceObject.md#acl)
- [common](internal_.DeviceObject.md#common)
- [enums](internal_.DeviceObject.md#enums)
- [from](internal_.DeviceObject.md#from)
- [native](internal_.DeviceObject.md#native)
- [ts](internal_.DeviceObject.md#ts)
- [type](internal_.DeviceObject.md#type)
- [user](internal_.DeviceObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types/objects.d.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L554)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types/objects.d.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L561)

___

### common

• **common**: [`DeviceCommon`](internal_.DeviceCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types/objects.d.ts:588](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L588)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types/objects.d.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L560)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types/objects.d.ts:562](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L562)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types/objects.d.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L558)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types/objects.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L565)

___

### type

• **type**: ``"device"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types/objects.d.ts:587](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L587)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types/objects.d.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/9bd0ce3f/packages/types/objects.d.ts#L564)
