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

[types-dev/objects.d.ts:1133](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1133)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:935](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L935)

***

### common?

> `optional` **common**: `Partial`\<[`AdapterCommon`](AdapterCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1149](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1149)

***

### encryptedNative?

> `optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

`Partial.encryptedNative`

#### Defined in

[types-dev/objects.d.ts:1139](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1139)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:934](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L934)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:936](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L936)

***

### instanceObjects?

> `optional` **instanceObjects**: ([`StateObject`](StateObject.md) \| [`DeviceObject`](DeviceObject.md) \| [`ChannelObject`](ChannelObject.md) \| [`FolderObject`](FolderObject.md) \| [`MetaObject`](MetaObject.md))[]

Objects created for each instance, inside the namespace of this adapter

#### Inherited from

`Partial.instanceObjects`

#### Defined in

[types-dev/objects.d.ts:1143](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1143)

***

### native?

> `optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:932](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L932)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:941](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L941)

***

### notifications?

> `optional` **notifications**: [`Notification`](Notification.md)[]

Register notifications for the built-in notification system

#### Inherited from

`Partial.notifications`

#### Defined in

[types-dev/objects.d.ts:1141](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1141)

***

### objects?

> `optional` **objects**: [`AnyObject`](../type-aliases/AnyObject.md)[]

Objects created for the adapter, anywhere in the global namespace

#### Inherited from

`Partial.objects`

#### Defined in

[types-dev/objects.d.ts:1145](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1145)

***

### protectedNative?

> `optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

`Partial.protectedNative`

#### Defined in

[types-dev/objects.d.ts:1137](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1137)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:939](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L939)

***

### type?

> `optional` **type**: `"adapter"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1134](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1134)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:938](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L938)
