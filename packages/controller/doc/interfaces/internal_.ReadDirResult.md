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

[types-dev/index.d.ts:443](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L443)

___

### createdAt

• `Optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:447](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L447)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:437](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L437)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:441](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L441)

___

### modifiedAt

• `Optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:445](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L445)

___

### stats

• **stats**: `Partial`\<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:439](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L439)
