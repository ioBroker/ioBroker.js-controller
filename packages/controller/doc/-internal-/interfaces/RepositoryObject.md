[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RepositoryObject

# Interface: RepositoryObject

Defined in: [types-dev/objects.d.ts:1125](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1125)

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `"system.repositories"`

Defined in: [types-dev/objects.d.ts:1126](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1126)

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L994)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common

> **common**: [`RepositoryCommon`](RepositoryCommon.md)

Defined in: [types-dev/objects.d.ts:1136](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1136)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L993)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L995)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native

> **native**: `object`

Defined in: [types-dev/objects.d.ts:1128](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1128)

#### oldRepositories?

> `optional` **oldRepositories?**: `object`

##### Index Signature

\[`repoName`: `string`\]: [`RepositoryInformation`](RepositoryInformation.md)

#### repositories

> **repositories**: `object`

##### Index Signature

\[`repoName`: `string`\]: [`RepositoryInformation`](RepositoryInformation.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1000)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L998)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type

> **type**: `"config"`

Defined in: [types-dev/objects.d.ts:1127](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L1127)

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/objects.d.ts#L997)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
