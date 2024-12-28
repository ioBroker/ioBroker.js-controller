[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialAdapterObject

# Interface: PartialAdapterObject

## Extends

- `Partial`\<`Omit`\<[`AdapterObject`](AdapterObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: [`Adapter`](../type-aliases/Adapter.md)

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:1115](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1115)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:917](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L917)

***

### common?

> `optional` **common**: `Partial`\<[`AdapterCommon`](AdapterCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1131](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1131)

***

### encryptedNative?

> `optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

`Partial.encryptedNative`

#### Defined in

[types-dev/objects.d.ts:1121](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1121)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L916)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L918)

***

### instanceObjects?

> `optional` **instanceObjects**: ([`StateObject`](StateObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`ChannelObject`](ChannelObject.md) \| [`FolderObject`](FolderObject.md) \| [`MetaObject`](MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

`Partial.instanceObjects`

#### Defined in

[types-dev/objects.d.ts:1125](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1125)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L914)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L923)

***

### notifications?

> `optional` **notifications**: [`Notification`](Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

`Partial.notifications`

#### Defined in

[types-dev/objects.d.ts:1123](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1123)

***

### objects?

> `optional` **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

`Partial.objects`

#### Defined in

[types-dev/objects.d.ts:1127](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1127)

***

### protectedNative?

> `optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

`Partial.protectedNative`

#### Defined in

[types-dev/objects.d.ts:1119](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1119)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L921)

***

### type?

> `optional` **type**: `"adapter"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1116](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1116)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:920](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L920)
