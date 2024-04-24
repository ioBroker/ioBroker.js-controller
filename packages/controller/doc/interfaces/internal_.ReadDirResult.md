[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ReadDirResult

# Interface: ReadDirResult

[\<internal\>](../modules/internal_.md).ReadDirResult

Contains the return values of readDir

## Table of contents

### Properties

- [acl](internal_.ReadDirResult.md#acl)
- [createdAt](internal_.ReadDirResult.md#createdat)
- [file](internal_.ReadDirResult.md#file)
- [isDir](internal_.ReadDirResult.md#isdir)
- [modifiedAt](internal_.ReadDirResult.md#modifiedat)
- [stats](internal_.ReadDirResult.md#stats)

## Properties

### acl

• `Optional` **acl**: [`EvaluatedFileACL`](internal_.EvaluatedFileACL.md)

Access rights

#### Defined in

[types-dev/index.d.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/index.d.ts#L428)

___

### createdAt

• `Optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:432](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/index.d.ts#L432)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:422](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/index.d.ts#L422)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:426](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/index.d.ts#L426)

___

### modifiedAt

• `Optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:430](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/index.d.ts#L430)

___

### stats

• **stats**: `Partial`\<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/index.d.ts#L424)
