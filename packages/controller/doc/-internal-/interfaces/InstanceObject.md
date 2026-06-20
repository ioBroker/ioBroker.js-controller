[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceObject

# Interface: InstanceObject

Defined in: [types-dev/objects.d.ts:1164](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1164)

## Extends

- `Omit`\<[`AdapterObject`](AdapterObject.md), `"type"`\>.[`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `` `system.adapter.${string}.${number}` ``

Defined in: [types-dev/objects.d.ts:1165](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1165)

The ID of this object

#### Overrides

[`AdapterObject`](AdapterObject.md).[`_id`](AdapterObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L994)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`InstanceCommon`](InstanceCommon.md)

Defined in: [types-dev/objects.d.ts:1167](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1167)

#### Overrides

[`AdapterObject`](AdapterObject.md).[`common`](AdapterObject.md#common)

***

### encryptedNative?

> `optional` **encryptedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1225](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1225)

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`encryptedNative`](AdapterObject.md#encryptednative)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### instanceObjects

> **instanceObjects**: ([`StateObject`](StateObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`ChannelObject`](ChannelObject.md) \| [`FolderObject`](FolderObject.md) \| [`MetaObject`](MetaObject.md))[]

Defined in: [types-dev/objects.d.ts:1229](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1229)

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`instanceObjects`](AdapterObject.md#instanceobjects)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:991](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L991)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1000)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### notifications?

> `optional` **notifications?**: [`Notification`](Notification.md)[]

Defined in: [types-dev/objects.d.ts:1227](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1227)

Register notifications for the built-in notification system

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`notifications`](AdapterObject.md#notifications)

***

### objects

> **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Defined in: [types-dev/objects.d.ts:1231](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1231)

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`objects`](AdapterObject.md#objects)

***

### protectedNative?

> `optional` **protectedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1223](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1223)

An array of `native` properties that cannot be accessed from outside the defining adapter

#### Inherited from

[`AdapterObject`](AdapterObject.md).[`protectedNative`](AdapterObject.md#protectednative)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L998)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"instance"`

Defined in: [types-dev/objects.d.ts:1166](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L1166)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/objects.d.ts#L997)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
