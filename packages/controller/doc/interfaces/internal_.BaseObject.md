[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / BaseObject

# Interface: BaseObject

[<internal>](../modules/internal_.md).BaseObject

## Hierarchy

- **`BaseObject`**

  ↳ [`GroupObject`](internal_.GroupObject.md)

  ↳ [`InstanceObject`](internal_.InstanceObject.md)

  ↳ [`DeviceObject`](internal_.DeviceObject.md)

  ↳ [`ChannelObject`](internal_.ChannelObject.md)

  ↳ [`StateObject`](internal_.StateObject.md)

  ↳ [`FolderObject`](internal_.FolderObject.md)

  ↳ [`EnumObject`](internal_.EnumObject.md)

  ↳ [`MetaObject`](internal_.MetaObject.md)

  ↳ [`HostObject`](internal_.HostObject.md)

  ↳ [`AdapterObject`](internal_.AdapterObject.md)

  ↳ [`UserObject`](internal_.UserObject.md)

  ↳ [`ScriptObject`](internal_.ScriptObject.md)

  ↳ [`OtherObject`](internal_.OtherObject.md)

## Table of contents

### Properties

- [\_id](internal_.BaseObject.md#_id)
- [acl](internal_.BaseObject.md#acl)
- [common](internal_.BaseObject.md#common)
- [enums](internal_.BaseObject.md#enums)
- [from](internal_.BaseObject.md#from)
- [native](internal_.BaseObject.md#native)
- [ts](internal_.BaseObject.md#ts)
- [type](internal_.BaseObject.md#type)
- [user](internal_.BaseObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Defined in

[types/objects.d.ts:570](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/objects.d.ts#L570)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Defined in

[types/objects.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/objects.d.ts#L577)

___

### common

• **common**: `Record`<`string`, `any`\>

#### Defined in

[types/objects.d.ts:575](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/objects.d.ts#L575)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Defined in

[types/objects.d.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/objects.d.ts#L576)

___

### from

• `Optional` **from**: `string`

#### Defined in

[types/objects.d.ts:578](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/objects.d.ts#L578)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Defined in

[types/objects.d.ts:574](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/objects.d.ts#L574)

___

### ts

• `Optional` **ts**: `number`

#### Defined in

[types/objects.d.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/objects.d.ts#L581)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Defined in

[types/objects.d.ts:571](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/objects.d.ts#L571)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types/objects.d.ts:580](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/objects.d.ts#L580)
