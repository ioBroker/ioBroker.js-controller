[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterObject

# Interface: AdapterObject

Defined in: [types-dev/objects.d.ts:1335](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1335)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: [`Adapter`](../type-aliases/Adapter.md)

Defined in: [types-dev/objects.d.ts:1336](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1336)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1093)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`AdapterCommon`](AdapterCommon.md)

Defined in: [types-dev/objects.d.ts:1338](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1338)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### encryptedNative?

> `optional` **encryptedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1342](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1342)

Like protectedNative, but the properties are also encrypted and decrypted automatically

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1092)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### instanceObjects?

> `optional` **instanceObjects?**: ([`ChannelObject`](ChannelObject.md) \| [`MetaObject`](MetaObject.md) \| [`FolderObject`](FolderObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`StateObject`](StateObject.md))[]

Defined in: [types-dev/objects.d.ts:1346](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1346)

Objects created for each instance, inside the namespace of this adapter

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1090)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1099)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### notifications?

> `optional` **notifications?**: [`Notification`](Notification.md)[]

Defined in: [types-dev/objects.d.ts:1344](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1344)

Register notifications for the built-in notification system

***

### objects?

> `optional` **objects?**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Defined in: [types-dev/objects.d.ts:1348](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1348)

Objects created for the adapter, anywhere in the global namespace

***

### protectedNative?

> `optional` **protectedNative?**: `string`[]

Defined in: [types-dev/objects.d.ts:1340](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1340)

An array of `native` properties that cannot be accessed from outside the defining adapter

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1097](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1097)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"adapter"`

Defined in: [types-dev/objects.d.ts:1337](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1337)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/6d87adfc026dc8a5e30ad364e1a02b04e776f99a/packages/types-dev/objects.d.ts#L1096)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
