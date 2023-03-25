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

[types-dev/index.d.ts:413](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/index.d.ts#L413)

___

### createdAt

• `Optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:417](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/index.d.ts#L417)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:407](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/index.d.ts#L407)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:411](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/index.d.ts#L411)

___

### modifiedAt

• `Optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:415](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/index.d.ts#L415)

___

### stats

• **stats**: `Partial`<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:409](https://github.com/ioBroker/ioBroker.js-controller/blob/ca2ecbe8/packages/types-dev/index.d.ts#L409)
