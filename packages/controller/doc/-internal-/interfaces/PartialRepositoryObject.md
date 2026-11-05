[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialRepositoryObject

# Interface: PartialRepositoryObject

Defined in: [types-dev/objects.d.ts:1129](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1129)

## Extends

- `Partial`\<`Omit`\<[`RepositoryObject`](RepositoryObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `"system.repositories"`

Defined in: [types-dev/objects.d.ts:1197](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1197)

The ID of this object

#### Inherited from

[`RepositoryObject`](RepositoryObject.md).[`_id`](RepositoryObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1047](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1047)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`RepositoryCommon`](RepositoryCommon.md)\>

Defined in: [types-dev/objects.d.ts:1130](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1130)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1046](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1046)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1048](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1048)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `object`

Defined in: [types-dev/objects.d.ts:1199](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1199)

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

Defined in: [types-dev/objects.d.ts:1053](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1053)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1051](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1051)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"config"`

Defined in: [types-dev/objects.d.ts:1198](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1198)

#### Inherited from

[`RepositoryObject`](RepositoryObject.md).[`type`](RepositoryObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1050](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/types-dev/objects.d.ts#L1050)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
