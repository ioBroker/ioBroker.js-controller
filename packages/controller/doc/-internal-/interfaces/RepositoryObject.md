[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RepositoryObject

# Interface: RepositoryObject

## Extends

- [`BaseObject`](BaseObject.md)

## Properties

### \_id

> **\_id**: `"system.repositories"`

The ID of this object

#### Overrides

[`BaseObject`](BaseObject.md).[`_id`](BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:1089](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L1089)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:957](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L957)

***

### common

> **common**: [`RepositoryCommon`](RepositoryCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L1099)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L956)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:958](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L958)

***

### native

> **native**: `object`

#### oldRepositories?

> `optional` **oldRepositories**: `object`

##### Index Signature

 \[`repoName`: `string`\]: [`RepositoryInformation`](RepositoryInformation.md)

#### repositories

> **repositories**: `object`

##### Index Signature

 \[`repoName`: `string`\]: [`RepositoryInformation`](RepositoryInformation.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`native`](BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:1091](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L1091)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L963)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L961)

***

### type

> **type**: `"config"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L1090)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/b499d83cda369ad8a77cd1584bbda2b5b44bf993/packages/types-dev/objects.d.ts#L960)
