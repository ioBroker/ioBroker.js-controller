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

[types-dev/objects.d.ts:1137](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L1137)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L966)

***

### common?

> `optional` **common**: `Partial`\<[`InstanceCommon`](InstanceCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1143](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L1143)

***

### encryptedNative?

> `optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

`Partial.encryptedNative`

#### Defined in

[types-dev/objects.d.ts:1197](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L1197)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L965)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L967)

***

### instanceObjects?

> `optional` **instanceObjects**: ([`StateObject`](StateObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`ChannelObject`](ChannelObject.md) \| [`FolderObject`](FolderObject.md) \| [`MetaObject`](MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

`Partial.instanceObjects`

#### Defined in

[types-dev/objects.d.ts:1201](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L1201)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L963)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L972)

***

### notifications?

> `optional` **notifications**: [`Notification`](Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

`Partial.notifications`

#### Defined in

[types-dev/objects.d.ts:1199](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L1199)

***

### objects?

> `optional` **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

`Partial.objects`

#### Defined in

[types-dev/objects.d.ts:1203](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L1203)

***

### protectedNative?

> `optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

`Partial.protectedNative`

#### Defined in

[types-dev/objects.d.ts:1195](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L1195)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L970)

***

### type?

> `optional` **type**: `"instance"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1138](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L1138)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L969)
