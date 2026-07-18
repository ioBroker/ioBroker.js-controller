[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialRepositoryObject

# Interface: PartialRepositoryObject

Defined in: [types-dev/objects.d.ts:1086](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1086)

## Extends

- `Partial`\<`Omit`\<[`RepositoryObject`](RepositoryObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `"system.repositories"`

Defined in: [types-dev/objects.d.ts:1154](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1154)

The ID of this object

#### Inherited from

[`RepositoryObject`](RepositoryObject.md).[`_id`](RepositoryObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1004](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1004)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`RepositoryCommon`](RepositoryCommon.md)\>

Defined in: [types-dev/objects.d.ts:1087](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1087)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1003](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1003)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1005)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `object`

Defined in: [types-dev/objects.d.ts:1156](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1156)

#### oldRepositories?

> `optional` **oldRepositories?**: `object`

##### Index Signature

\[`repoName`: `string`\]: [`RepositoryInformation`](RepositoryInformation.md)

#### repositories

> **repositories**: `object`

##### Index Signature

\[`repoName`: `string`\]: [`RepositoryInformation`](RepositoryInformation.md)

#### Inherited from

[`RepositoryObject`](RepositoryObject.md).[`native`](RepositoryObject.md#native)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1010)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1008](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1008)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"config"`

Defined in: [types-dev/objects.d.ts:1155](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1155)

#### Inherited from

[`RepositoryObject`](RepositoryObject.md).[`type`](RepositoryObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/objects.d.ts#L1007)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
