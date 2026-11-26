[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialRepositoryObject

# Interface: PartialRepositoryObject

Defined in: [types-dev/objects.d.ts:1175](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1175)

## Extends

- `Partial`\<`Omit`\<[`RepositoryObject`](RepositoryObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `"system.repositories"`

Defined in: [types-dev/objects.d.ts:1243](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1243)

The ID of this object

#### Inherited from

[`RepositoryObject`](RepositoryObject.md).[`_id`](RepositoryObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1093)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`RepositoryCommon`](RepositoryCommon.md)\>

Defined in: [types-dev/objects.d.ts:1176](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1176)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1092)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1094)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `object`

Defined in: [types-dev/objects.d.ts:1245](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1245)

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

Defined in: [types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1099)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1097](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1097)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"config"`

Defined in: [types-dev/objects.d.ts:1244](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1244)

#### Inherited from

[`RepositoryObject`](RepositoryObject.md).[`type`](RepositoryObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/26d6e1bcd2371f3e66be3e55bc1c082edee901c6/packages/types-dev/objects.d.ts#L1096)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
