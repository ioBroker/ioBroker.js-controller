[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialStateObject

# Interface: PartialStateObject

Defined in: [types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1009)

## Extends

- `Partial`\<`Omit`\<[`StateObject`](StateObject.md), `"common"` \| `"acl"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:987](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L987)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: `Partial`\<[`StateACL`](StateACL.md)\>

Defined in: [types-dev/objects.d.ts:1011](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1011)

***

### common?

> `optional` **common?**: `Partial`\<[`StateCommon`](StateCommon.md)\>

Defined in: [types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1010)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:991](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L991)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1000)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L998)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"state"`

Defined in: [types-dev/objects.d.ts:1004](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1004)

#### Inherited from

[`StateObject`](StateObject.md).[`type`](StateObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L997)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
