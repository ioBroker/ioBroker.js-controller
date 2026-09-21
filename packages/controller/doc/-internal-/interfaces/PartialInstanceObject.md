[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialInstanceObject

# Interface: PartialInstanceObject

Defined in: [types-dev/objects.d.ts:1200](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1200)

## Extends

- `Partial`\<`Omit`\<[`InstanceObject`](InstanceObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `system.adapter.${string}.${number}` ``

Defined in: [types-dev/objects.d.ts:1195](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1195)

#### Inherited from

[`InstanceObject`](InstanceObject.md).[`_id`](InstanceObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1006)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`InstanceCommon`](InstanceCommon.md)\>

Defined in: [types-dev/objects.d.ts:1201](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1201)

***

### encryptedNative?

> `optional` **encryptedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1255](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1255)

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`encryptedNative`](AdapterObject.md#encryptednative)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1005)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1007)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### instanceObjects?

> `optional` **instanceObjects?**: ([`ChannelObject`](ChannelObject.md) \| [`MetaObject`](MetaObject.md) \| [`FolderObject`](FolderObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`StateObject`](StateObject.md))[]

Defined in: [types-dev/objects.d.ts:1259](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1259)

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`instanceObjects`](AdapterObject.md#instanceobjects)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1003](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1003)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1012](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1012)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### notifications?

> `optional` **notifications?**: [`Notification`](Notification.md)[]

Defined in: [types-dev/objects.d.ts:1257](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1257)

Register notifications for the built-in notification system

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`notifications`](AdapterObject.md#notifications)

***

### objects?

> `optional` **objects?**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Defined in: [types-dev/objects.d.ts:1261](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1261)

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`objects`](AdapterObject.md#objects)

***

### protectedNative?

> `optional` **protectedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1253](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1253)

An array of `native` properties that cannot be accessed from outside the defining adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`protectedNative`](AdapterObject.md#protectednative)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1010)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"instance"`

Defined in: [types-dev/objects.d.ts:1196](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1196)

#### Inherited from

[`InstanceObject`](InstanceObject.md).[`type`](InstanceObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/e5941ca8a411ecc9840ca4f717aee229e4267c6b/packages/types-dev/objects.d.ts#L1009)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
