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

[types-dev/objects.d.ts:1047](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1047)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:917](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L917)

***

### common

> **common**: [`RepositoryCommon`](RepositoryCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1057](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1057)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:916](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L916)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:918](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L918)

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

[types-dev/objects.d.ts:1049](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1049)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:923](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L923)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:921](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L921)

***

### type

> **type**: `"config"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1048](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L1048)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:920](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/objects.d.ts#L920)
