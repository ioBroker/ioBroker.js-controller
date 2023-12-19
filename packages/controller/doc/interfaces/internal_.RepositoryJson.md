[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / RepositoryJson

# Interface: RepositoryJson

[\<internal\>](../modules/internal_.md).RepositoryJson

## Indexable

▪ [adapter: `string`]: [`RepositoryJsonAdapterContent`](internal_.RepositoryJsonAdapterContent.md) \| `Record`\<`string`, `any`\>

Information about each adapter - Record needed for _repoInfo

## Table of contents

### Properties

- [\_repoInfo](internal_.RepositoryJson.md#_repoinfo)

## Properties

### \_repoInfo

• **\_repoInfo**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `Required`\<[`Translated`](../modules/internal_.md#translated)\> | i18n name of the repository |
| `repoTime` | `string` | Time of repository update |
| `stable?` | `boolean` | If it is the official stable repository |

#### Defined in

[types-dev/objects.d.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/3fe17c22/packages/types-dev/objects.d.ts#L826)
