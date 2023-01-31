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

[types/index.d.ts:442](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/index.d.ts#L442)

___

### createdAt

• **createdAt**: `number`

Date of creation

#### Defined in

[types/index.d.ts:446](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/index.d.ts#L446)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types/index.d.ts:436](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/index.d.ts#L436)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types/index.d.ts:440](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/index.d.ts#L440)

___

### modifiedAt

• **modifiedAt**: `number`

Date of last modification

#### Defined in

[types/index.d.ts:444](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/index.d.ts#L444)

___

### path

• **path**: `string`

The parent directory of the processed file or directory

#### Defined in

[types/index.d.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/index.d.ts#L434)

___

### stats

• **stats**: `Stats`

File system stats

#### Defined in

[types/index.d.ts:438](https://github.com/ioBroker/ioBroker.js-controller/blob/7dd079e8/packages/types/index.d.ts#L438)
