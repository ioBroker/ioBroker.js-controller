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

node_modules/@types/iobroker/index.d.ts:1845

___

### createdAt

• **createdAt**: `number`

Date of creation

#### Defined in

node_modules/@types/iobroker/index.d.ts:1849

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

node_modules/@types/iobroker/index.d.ts:1839

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

node_modules/@types/iobroker/index.d.ts:1843

___

### modifiedAt

• **modifiedAt**: `number`

Date of last modification

#### Defined in

node_modules/@types/iobroker/index.d.ts:1847

___

### path

• **path**: `string`

The parent directory of the processed file or directory

#### Defined in

node_modules/@types/iobroker/index.d.ts:1837

___

### stats

• **stats**: [`Stats`](../classes/internal_.Stats.md)

File system stats

#### Defined in

node_modules/@types/iobroker/index.d.ts:1841
