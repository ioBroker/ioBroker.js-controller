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

[types-dev/objects.d.ts:1155](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1155)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:957](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L957)

***

### common?

> `optional` **common**: `Partial`\<[`AdapterCommon`](AdapterCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1171](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1171)

***

### encryptedNative?

> `optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

`Partial.encryptedNative`

#### Defined in

[types-dev/objects.d.ts:1161](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1161)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L956)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:958](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L958)

***

### instanceObjects?

> `optional` **instanceObjects**: ([`StateObject`](StateObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`ChannelObject`](ChannelObject.md) \| [`FolderObject`](FolderObject.md) \| [`MetaObject`](MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

`Partial.instanceObjects`

#### Defined in

[types-dev/objects.d.ts:1165](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1165)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:954](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L954)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L963)

***

### notifications?

> `optional` **notifications**: [`Notification`](Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

`Partial.notifications`

#### Defined in

[types-dev/objects.d.ts:1163](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1163)

***

### objects?

> `optional` **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

`Partial.objects`

#### Defined in

[types-dev/objects.d.ts:1167](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1167)

***

### protectedNative?

> `optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

`Partial.protectedNative`

#### Defined in

[types-dev/objects.d.ts:1159](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1159)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L961)

***

### type?

> `optional` **type**: `"adapter"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1156](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1156)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L960)
