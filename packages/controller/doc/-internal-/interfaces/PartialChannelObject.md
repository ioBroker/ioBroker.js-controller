[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialChannelObject

# Interface: PartialChannelObject

Defined in: [types-dev/objects.d.ts:1115](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1115)

## Extends

- `Partial`\<`Omit`\<[`ChannelObject`](ChannelObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:1083](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1083)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1090)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`ChannelCommon`](ChannelCommon.md)\>

Defined in: [types-dev/objects.d.ts:1116](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1116)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1089](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1089)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1091](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1091)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1087](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1087)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1096)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"channel"`

Defined in: [types-dev/objects.d.ts:1111](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1111)

#### Inherited from

[`ChannelObject`](ChannelObject.md).[`type`](ChannelObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/objects.d.ts#L1093)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
