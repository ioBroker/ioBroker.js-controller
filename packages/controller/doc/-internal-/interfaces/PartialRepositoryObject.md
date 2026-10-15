[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialRepositoryObject

# Interface: PartialRepositoryObject

Defined in: [types-dev/objects.d.ts:1112](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1112)

## Extends

- `Partial`\<`Omit`\<[`RepositoryObject`](RepositoryObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id?**: `"system.repositories"`

Defined in: [types-dev/objects.d.ts:1180](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1180)

The ID of this object

#### Inherited from

[`RepositoryObject`](RepositoryObject.md).[`_id`](RepositoryObject.md#_id)

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1030](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1030)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

***

### common?

> `optional` **common?**: `Partial`\<[`RepositoryCommon`](RepositoryCommon.md)\>

Defined in: [types-dev/objects.d.ts:1113](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1113)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1029](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1029)

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1031](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1031)

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

***

### native?

> `optional` **native?**: `object`

Defined in: [types-dev/objects.d.ts:1182](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1182)

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

Defined in: [types-dev/objects.d.ts:1036](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1036)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1034](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1034)

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

***

### type?

> `optional` **type?**: `"config"`

Defined in: [types-dev/objects.d.ts:1181](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1181)

#### Inherited from

[`RepositoryObject`](RepositoryObject.md).[`type`](RepositoryObject.md#type)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1033](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/types-dev/objects.d.ts#L1033)

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)
