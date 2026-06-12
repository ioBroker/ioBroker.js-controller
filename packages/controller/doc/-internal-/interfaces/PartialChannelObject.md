[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialChannelObject

# Interface: PartialChannelObject

Defined in: [types-dev/objects.d.ts:1019](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L1019)

## Extends

- `Partial`\<`Omit`\<[`ChannelObject`](ChannelObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:987](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L987)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L994)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`ChannelCommon`](ChannelCommon.md)\>

Defined in: [types-dev/objects.d.ts:1020](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L1020)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:991](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L991)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L1000)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L998)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"channel"`

Defined in: [types-dev/objects.d.ts:1015](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L1015)

#### Inherited from

[`ChannelObject`](ChannelObject.md).[`type`](ChannelObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L997)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
