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

[types-dev/index.d.ts:435](https://github.com/ioBroker/ioBroker.js-controller/blob/7978d8c33d6336ccf959994fdaed1cae33167c51/packages/types-dev/index.d.ts#L435)

___

### createdAt

• `Optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:439](https://github.com/ioBroker/ioBroker.js-controller/blob/7978d8c33d6336ccf959994fdaed1cae33167c51/packages/types-dev/index.d.ts#L439)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:429](https://github.com/ioBroker/ioBroker.js-controller/blob/7978d8c33d6336ccf959994fdaed1cae33167c51/packages/types-dev/index.d.ts#L429)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/7978d8c33d6336ccf959994fdaed1cae33167c51/packages/types-dev/index.d.ts#L433)

___

### modifiedAt

• `Optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:437](https://github.com/ioBroker/ioBroker.js-controller/blob/7978d8c33d6336ccf959994fdaed1cae33167c51/packages/types-dev/index.d.ts#L437)

___

### stats

• **stats**: `Partial`\<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:431](https://github.com/ioBroker/ioBroker.js-controller/blob/7978d8c33d6336ccf959994fdaed1cae33167c51/packages/types-dev/index.d.ts#L431)
