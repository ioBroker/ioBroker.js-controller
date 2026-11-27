[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceObject

# Interface: InstanceObject

Defined in: [types-dev/objects.d.ts:1281](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1281)

## Extends

- `Omit`\<[`AdapterObject`](AdapterObject.md), `"type"`\>
- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.adapter.${string}.${number}` ``

Defined in: [types-dev/objects.d.ts:1282](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1282)

The ID of this object

#### Overrides

[`AdapterObject`](AdapterObject.md).[`_id`](AdapterObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1093)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`InstanceCommon`](InstanceCommon.md)

Defined in: [types-dev/objects.d.ts:1284](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1284)

#### Overrides

[`AdapterObject`](AdapterObject.md).[`common`](AdapterObject.md#common)

***

### encryptedNative?

> `optional` **encryptedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1342](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1342)

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`encryptedNative`](AdapterObject.md#encryptednative)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1092)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### instanceObjects?

> `optional` **instanceObjects?**: ([`ChannelObject`](ChannelObject.md) \| [`MetaObject`](MetaObject.md) \| [`FolderObject`](FolderObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`StateObject`](StateObject.md))[]

Defined in: [types-dev/objects.d.ts:1346](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1346)

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`instanceObjects`](AdapterObject.md#instanceobjects)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1090)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1099)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### notifications?

> `optional` **notifications?**: [`Notification`](Notification.md)[]

Defined in: [types-dev/objects.d.ts:1344](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1344)

Register notifications for the built-in notification system

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`notifications`](AdapterObject.md#notifications)

***

### objects?

> `optional` **objects?**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Defined in: [types-dev/objects.d.ts:1348](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1348)

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`objects`](AdapterObject.md#objects)

***

### protectedNative?

> `optional` **protectedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1340](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1340)

An array of `native` properties that cannot be accessed from outside the defining adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`protectedNative`](AdapterObject.md#protectednative)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1097](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1097)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"instance"`

Defined in: [types-dev/objects.d.ts:1283](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1283)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/objects.d.ts#L1096)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
