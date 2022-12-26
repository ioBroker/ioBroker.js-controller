[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ReadDirResult

# Interface: ReadDirResult

[<internal>](../modules/internal_.md).ReadDirResult

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

[types/index.d.ts:416](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/index.d.ts#L416)

___

### createdAt

• `Optional` **createdAt**: `number`

Date of creation

#### Defined in

[types/index.d.ts:420](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/index.d.ts#L420)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types/index.d.ts:410](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/index.d.ts#L410)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types/index.d.ts:414](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/index.d.ts#L414)

___

### modifiedAt

• `Optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types/index.d.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/index.d.ts#L418)

___

### stats

• **stats**: `Partial`<`Stats`\>

File system stats

#### Defined in

[types/index.d.ts:412](https://github.com/ioBroker/ioBroker.js-controller/blob/87eb3b2c/packages/types/index.d.ts#L412)
