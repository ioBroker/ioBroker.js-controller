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

[types-dev/objects.d.ts:933](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L933)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:810](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L810)

___

### common

• `Optional` **common**: `Partial`\<[`RepositoryCommon`](internal_.RepositoryCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:893](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L893)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:809](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L809)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L811)

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

[types-dev/objects.d.ts:935](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L935)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:816](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L816)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:814](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L814)

___

### type

• `Optional` **type**: ``"config"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:934](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L934)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:813](https://github.com/ioBroker/ioBroker.js-controller/blob/f267270b9/packages/types-dev/objects.d.ts#L813)
