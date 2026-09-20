[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialChannelObject

# Interface: PartialChannelObject

Defined in: [types-dev/objects.d.ts:1042](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1042)

## Extends

- `Partial`\<`Omit`\<[`ChannelObject`](ChannelObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1010)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1017](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1017)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`ChannelCommon`](ChannelCommon.md)\>

Defined in: [types-dev/objects.d.ts:1043](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1043)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1016](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1016)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1018](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1018)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1014](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1014)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1023](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1023)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1021](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1021)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"channel"`

Defined in: [types-dev/objects.d.ts:1038](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1038)

#### Inherited from

[`ChannelObject`](ChannelObject.md).[`type`](ChannelObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1020](https://github.com/ioBroker/ioBroker.js-controller/blob/e3925cc64e80556f948f3edd043e48c803e45ddd/packages/types-dev/objects.d.ts#L1020)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
