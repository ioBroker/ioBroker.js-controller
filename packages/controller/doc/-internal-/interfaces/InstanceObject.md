[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InstanceObject

# Interface: InstanceObject

## Extends

- `Omit`\<[`AdapterObject`](AdapterObject.md), `"type"`\>.[`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: \`system.adapter.$\{string\}.$\{number\}\`

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:1063](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L1063)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:919](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L919)

***

### common

> **common**: [`InstanceCommon`](InstanceCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1065](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L1065)

***

### encryptedNative?

> `optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

`Omit.encryptedNative`

#### Defined in

[types-dev/objects.d.ts:1123](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L1123)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L918)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:920](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L920)

***

### instanceObjects

> **instanceObjects**: ([`StateObject`](StateObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`ChannelObject`](ChannelObject.md) \| [`FolderObject`](FolderObject.md) \| [`MetaObject`](MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

`Omit.instanceObjects`

#### Defined in

[types-dev/objects.d.ts:1127](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L1127)

***

### native

> **native**: `Record`\<`string`, `any`\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L916)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:925](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L925)

***

### notifications?

> `optional` **notifications**: [`Notification`](Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

`Omit.notifications`

#### Defined in

[types-dev/objects.d.ts:1125](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L1125)

***

### objects

> **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

`Omit.objects`

#### Defined in

[types-dev/objects.d.ts:1129](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L1129)

***

### protectedNative?

> `optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

`Omit.protectedNative`

#### Defined in

[types-dev/objects.d.ts:1121](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L1121)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L923)

***

### type

> **type**: `"instance"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1064](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L1064)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:922](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/objects.d.ts#L922)
