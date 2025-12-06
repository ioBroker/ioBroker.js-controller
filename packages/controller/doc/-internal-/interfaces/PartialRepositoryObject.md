[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PartialRepositoryObject

# Interface: PartialRepositoryObject

## Extends

- `Partial`\<`Omit`\<[`RepositoryObject`](RepositoryObject.md), `"common"`\>\>

## Properties

### \_id?

> `optional` **\_id**: `"system.repositories"`

The ID of this object

#### Inherited from

`Partial._id`

#### Defined in

[types-dev/objects.d.ts:1098](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1098)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L966)

***

### common?

> `optional` **common**: `Partial`\<[`RepositoryCommon`](RepositoryCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1049](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1049)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L965)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L967)

***

### native?

> `optional` **native**: `object`

#### oldRepositories?

> `optional` **oldRepositories**: `object`

##### Index Signature

 \[`repoName`: `string`\]: [`RepositoryInformation`](RepositoryInformation.md)

#### repositories

> **repositories**: `object`

##### Index Signature

 \[`repoName`: `string`\]: [`RepositoryInformation`](RepositoryInformation.md)

#### Inherited from

`Partial.native`

#### Defined in

[types-dev/objects.d.ts:1100](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1100)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L972)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L970)

***

### type?

> `optional` **type**: `"config"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L1099)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/27e04fd51c9e4b882c44cee1bcedf2c328d1f403/packages/types-dev/objects.d.ts#L969)
