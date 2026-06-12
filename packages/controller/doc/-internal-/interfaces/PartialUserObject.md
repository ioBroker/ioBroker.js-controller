[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialUserObject

# Interface: PartialUserObject

Defined in: [types-dev/objects.d.ts:1256](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L1256)

## Extends

- `Partial`\<`Omit`\<[`UserObject`](UserObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1251](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L1251)

The ID of this object

#### Inherited from

[`UserObject`](UserObject.md).[`_id`](UserObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L994)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`UserCommon`](UserCommon.md)\>

Defined in: [types-dev/objects.d.ts:1257](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L1257)

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

> `optional` **type?**: `"user"`

Defined in: [types-dev/objects.d.ts:1252](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L1252)

#### Inherited from

[`UserObject`](UserObject.md).[`type`](UserObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/objects.d.ts#L997)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
