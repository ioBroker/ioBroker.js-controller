[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / RepositoryObject

# Interface: RepositoryObject

[\<internal\>](../modules/internal_.md).RepositoryObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`RepositoryObject`**

## Table of contents

### Properties

- [\_id](internal_.RepositoryObject.md#_id)
- [acl](internal_.RepositoryObject.md#acl)
- [common](internal_.RepositoryObject.md#common)
- [enums](internal_.RepositoryObject.md#enums)
- [from](internal_.RepositoryObject.md#from)
- [native](internal_.RepositoryObject.md#native)
- [nonEdit](internal_.RepositoryObject.md#nonedit)
- [ts](internal_.RepositoryObject.md#ts)
- [type](internal_.RepositoryObject.md#type)
- [user](internal_.RepositoryObject.md#user)

## Properties

### \_id

• **\_id**: ``"system.repositories"``

The ID of this object

#### Overrides

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:887](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L887)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L768)

___

### common

• **common**: [`RepositoryCommon`](internal_.RepositoryCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:897](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L897)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L767)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L769)

___

### native

• **native**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `oldRepositories?` | \{ `[repoName: string]`: [`RepositoryInformation`](internal_.RepositoryInformation.md);  } |
| `repositories` | \{ `[repoName: string]`: [`RepositoryInformation`](internal_.RepositoryInformation.md);  } |

#### Overrides

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:889](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L889)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:774](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L774)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L772)

___

### type

• **type**: ``"config"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:888](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L888)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:771](https://github.com/ioBroker/ioBroker.js-controller/blob/49d93c99/packages/types-dev/objects.d.ts#L771)
