[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialInstanceObject

# Interface: PartialInstanceObject

## Extends

- `Partial`\<`Omit`\<[`InstanceObject`](InstanceObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: \`system.adapter.$\{string\}.$\{number\}\`

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:1052](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1052)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:908](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L908)

***

### common?

> `optional` **common**: `Partial`\<[`InstanceCommon`](InstanceCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1058](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1058)

***

### encryptedNative?

> `optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

`Partial.encryptedNative`

#### Defined in

[types-dev/objects.d.ts:1112](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1112)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:907](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L907)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:909](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L909)

***

### instanceObjects?

> `optional` **instanceObjects**: ([`StateObject`](StateObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`ChannelObject`](ChannelObject.md) \| [`FolderObject`](FolderObject.md) \| [`MetaObject`](MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

`Partial.instanceObjects`

#### Defined in

[types-dev/objects.d.ts:1116](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1116)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L905)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L914)

***

### notifications?

> `optional` **notifications**: [`Notification`](Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

`Partial.notifications`

#### Defined in

[types-dev/objects.d.ts:1114](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1114)

***

### objects?

> `optional` **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

`Partial.objects`

#### Defined in

[types-dev/objects.d.ts:1118](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1118)

***

### protectedNative?

> `optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

`Partial.protectedNative`

#### Defined in

[types-dev/objects.d.ts:1110](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1110)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:912](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L912)

***

### type?

> `optional` **type**: `"instance"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1053](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L1053)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/objects.d.ts#L911)
