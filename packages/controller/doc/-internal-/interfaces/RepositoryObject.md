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

[types-dev/objects.d.ts:1098](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1098)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

[`BaseObject`](BaseObject.md).[`acl`](BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L966)

***

### common

> **common**: [`RepositoryCommon`](RepositoryCommon.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`common`](BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:1108](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1108)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

[`BaseObject`](BaseObject.md).[`enums`](BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L965)

***

### from?

> `optional` **from**: `string`

#### Inherited from

[`BaseObject`](BaseObject.md).[`from`](BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L967)

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

[types-dev/objects.d.ts:1100](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1100)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[`BaseObject`](BaseObject.md).[`nonEdit`](BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L972)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

[`BaseObject`](BaseObject.md).[`ts`](BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L970)

***

### type

> **type**: `"config"`

#### Overrides

[`BaseObject`](BaseObject.md).[`type`](BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1099)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[`BaseObject`](BaseObject.md).[`user`](BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L969)
