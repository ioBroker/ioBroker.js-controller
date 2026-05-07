[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialMetaObject

# Interface: PartialMetaObject

Defined in: [types-dev/objects.d.ts:1056](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L1056)

## Extends

- `Partial`\<`Omit`\<[`MetaObject`](MetaObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `string`

Defined in: [types-dev/objects.d.ts:987](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L987)

The ID of this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L994)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`MetaCommon`](MetaCommon.md)\>

Defined in: [types-dev/objects.d.ts:1057](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L1057)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:991](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L991)

#### Inherited from

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L1000)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L998)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"meta"`

Defined in: [types-dev/objects.d.ts:1052](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L1052)

#### Inherited from

[`MetaObject`](MetaObject.md).[`type`](MetaObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/02dddaf5516d05753a8e9aab3348cecbe1788c1d/packages/types-dev/objects.d.ts#L997)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
