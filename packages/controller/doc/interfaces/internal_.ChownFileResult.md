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

[types-dev/index.d.ts:465](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/index.d.ts#L465)

___

### createdAt

• **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:469](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/index.d.ts#L469)

___

### file

• **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:459](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/index.d.ts#L459)

___

### isDir

• **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:463](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/index.d.ts#L463)

___

### modifiedAt

• **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:467](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/index.d.ts#L467)

___

### path

• **path**: `string`

The parent directory of the processed file or directory

#### Defined in

[types-dev/index.d.ts:457](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/index.d.ts#L457)

___

### stats

• **stats**: `Stats`

File system stats

#### Defined in

[types-dev/index.d.ts:461](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/index.d.ts#L461)
