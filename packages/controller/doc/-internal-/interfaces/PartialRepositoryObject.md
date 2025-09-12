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

[types-dev/objects.d.ts:1087](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1087)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Inherited from

`Partial.acl`

#### Defined in

[types-dev/objects.d.ts:957](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L957)

***

### common?

> `optional` **common**: `Partial`\<[`RepositoryCommon`](RepositoryCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1040](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1040)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Inherited from

`Partial.enums`

#### Defined in

[types-dev/objects.d.ts:956](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L956)

***

### from?

> `optional` **from**: `string`

#### Inherited from

`Partial.from`

#### Defined in

[types-dev/objects.d.ts:958](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L958)

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

[types-dev/objects.d.ts:1089](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1089)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

`Partial.nonEdit`

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L963)

***

### ts?

> `optional` **ts**: `number`

#### Inherited from

`Partial.ts`

#### Defined in

[types-dev/objects.d.ts:961](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L961)

***

### type?

> `optional` **type**: `"config"`

#### Inherited from

`Partial.type`

#### Defined in

[types-dev/objects.d.ts:1088](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1088)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Inherited from

`Partial.user`

#### Defined in

[types-dev/objects.d.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L960)
