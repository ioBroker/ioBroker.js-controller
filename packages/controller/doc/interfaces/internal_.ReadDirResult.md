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

[types-dev/index.d.ts:438](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/index.d.ts#L438)

___

### createdAt

• `Optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:442](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/index.d.ts#L442)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:432](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/index.d.ts#L432)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:436](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/index.d.ts#L436)

___

### modifiedAt

• `Optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:440](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/index.d.ts#L440)

___

### stats

• **stats**: `Partial`\<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/index.d.ts#L434)
