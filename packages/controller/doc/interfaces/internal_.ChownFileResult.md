[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ChownFileResult

# Interface: ChownFileResult

[<internal>](../modules/internal_.md).ChownFileResult

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

[types/index.d.ts:439](https://github.com/ioBroker/ioBroker.js-controller/blob/0a61af83/packages/types/index.d.ts#L439)

___

### createdAt

• **createdAt**: `number`

Date of creation

#### Defined in

[types/index.d.ts:443](https://github.com/ioBroker/ioBroker.js-controller/blob/0a61af83/packages/types/index.d.ts#L443)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types/index.d.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/0a61af83/packages/types/index.d.ts#L433)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types/index.d.ts:437](https://github.com/ioBroker/ioBroker.js-controller/blob/0a61af83/packages/types/index.d.ts#L437)

___

### modifiedAt

• **modifiedAt**: `number`

Date of last modification

#### Defined in

[types/index.d.ts:441](https://github.com/ioBroker/ioBroker.js-controller/blob/0a61af83/packages/types/index.d.ts#L441)

___

### path

• **path**: `string`

The parent directory of the processed file or directory

#### Defined in

[types/index.d.ts:431](https://github.com/ioBroker/ioBroker.js-controller/blob/0a61af83/packages/types/index.d.ts#L431)

___

### stats

• **stats**: `Stats`

File system stats

#### Defined in

[types/index.d.ts:435](https://github.com/ioBroker/ioBroker.js-controller/blob/0a61af83/packages/types/index.d.ts#L435)
