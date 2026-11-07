[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChownFileResult

# Interface: ChownFileResult

Defined in: [types-dev/index.d.ts:713](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L713)

Contains the return values of chownFile

## Properties

### acl

> **acl**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:725](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L725)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:729](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L729)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:717](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L717)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:723](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L723)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:727](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L727)

Date of last modification

***

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:715](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L715)

The parent directory of the processed file or directory

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:719](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L719)

File system stats

#### size?

> `optional` **size?**: `number`
