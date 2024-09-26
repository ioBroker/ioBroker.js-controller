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

[types-dev/index.d.ts:466](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L466)

___

### createdAt

• **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L470)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:460](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L460)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:464](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L464)

___

### modifiedAt

• **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:468](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L468)

___

### path

• **path**: `string`

The parent directory of the processed file or directory

#### Defined in

[types-dev/index.d.ts:458](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L458)

___

### stats

• **stats**: `Stats`

File system stats

#### Defined in

[types-dev/index.d.ts:462](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L462)
