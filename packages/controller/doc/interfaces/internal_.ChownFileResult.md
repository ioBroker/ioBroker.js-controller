[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ChownFileResult

# Interface: ChownFileResult

[\<internal\>](../modules/internal_.md).ChownFileResult

Contains the return values of chownFile

## Table of contents

### Properties

- [acl](internal_.ChownFileResult.md#acl)
- [createdAt](internal_.ChownFileResult.md#createdat)
- [file](internal_.ChownFileResult.md#file)
- [isDir](internal_.ChownFileResult.md#isdir)
- [modifiedAt](internal_.ChownFileResult.md#modifiedat)
- [path](internal_.ChownFileResult.md#path)
- [stats](internal_.ChownFileResult.md#stats)

## Properties

### acl

• **acl**: [`FileACL`](internal_.FileACL.md)

Access rights

#### Defined in

[types-dev/index.d.ts:458](https://github.com/ioBroker/ioBroker.js-controller/blob/f4f04aafd2ad7897f4540de31e39dc68a4db1044/packages/types-dev/index.d.ts#L458)

___

### createdAt

• **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:462](https://github.com/ioBroker/ioBroker.js-controller/blob/f4f04aafd2ad7897f4540de31e39dc68a4db1044/packages/types-dev/index.d.ts#L462)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:452](https://github.com/ioBroker/ioBroker.js-controller/blob/f4f04aafd2ad7897f4540de31e39dc68a4db1044/packages/types-dev/index.d.ts#L452)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:456](https://github.com/ioBroker/ioBroker.js-controller/blob/f4f04aafd2ad7897f4540de31e39dc68a4db1044/packages/types-dev/index.d.ts#L456)

___

### modifiedAt

• **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:460](https://github.com/ioBroker/ioBroker.js-controller/blob/f4f04aafd2ad7897f4540de31e39dc68a4db1044/packages/types-dev/index.d.ts#L460)

___

### path

• **path**: `string`

The parent directory of the processed file or directory

#### Defined in

[types-dev/index.d.ts:450](https://github.com/ioBroker/ioBroker.js-controller/blob/f4f04aafd2ad7897f4540de31e39dc68a4db1044/packages/types-dev/index.d.ts#L450)

___

### stats

• **stats**: `Stats`

File system stats

#### Defined in

[types-dev/index.d.ts:454](https://github.com/ioBroker/ioBroker.js-controller/blob/f4f04aafd2ad7897f4540de31e39dc68a4db1044/packages/types-dev/index.d.ts#L454)
