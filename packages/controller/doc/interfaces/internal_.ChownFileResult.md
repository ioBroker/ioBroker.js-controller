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

[types-dev/index.d.ts:451](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/index.d.ts#L451)

___

### createdAt

• **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:455](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/index.d.ts#L455)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:445](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/index.d.ts#L445)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:449](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/index.d.ts#L449)

___

### modifiedAt

• **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:453](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/index.d.ts#L453)

___

### path

• **path**: `string`

The parent directory of the processed file or directory

#### Defined in

[types-dev/index.d.ts:443](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/index.d.ts#L443)

___

### stats

• **stats**: `Stats`

File system stats

#### Defined in

[types-dev/index.d.ts:447](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/index.d.ts#L447)
