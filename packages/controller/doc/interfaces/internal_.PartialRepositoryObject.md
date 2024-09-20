[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialRepositoryObject

# Interface: PartialRepositoryObject

[\<internal\>](../modules/internal_.md).PartialRepositoryObject

## Hierarchy

- `Partial`\<`Omit`\<[`RepositoryObject`](internal_.RepositoryObject.md), ``"common"``\>\>

  ↳ **`PartialRepositoryObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialRepositoryObject.md#_id)
- [acl](internal_.PartialRepositoryObject.md#acl)
- [common](internal_.PartialRepositoryObject.md#common)
- [enums](internal_.PartialRepositoryObject.md#enums)
- [from](internal_.PartialRepositoryObject.md#from)
- [native](internal_.PartialRepositoryObject.md#native)
- [nonEdit](internal_.PartialRepositoryObject.md#nonedit)
- [ts](internal_.PartialRepositoryObject.md#ts)
- [type](internal_.PartialRepositoryObject.md#type)
- [user](internal_.PartialRepositoryObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: ``"system.repositories"``

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:1025](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L1025)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:900](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L900)

___

### common

• `Optional` **common**: `Partial`\<[`RepositoryCommon`](internal_.RepositoryCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:983](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L983)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:899](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L899)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:901](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L901)

___

### native

• `Optional` **native**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `oldRepositories?` | \{ `[repoName: string]`: [`RepositoryInformation`](internal_.RepositoryInformation.md);  } |
| `repositories` | \{ `[repoName: string]`: [`RepositoryInformation`](internal_.RepositoryInformation.md);  } |

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:1027](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L1027)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:906](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L906)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:904](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L904)

___

### type

• `Optional` **type**: ``"config"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:1026](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L1026)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:903](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L903)
