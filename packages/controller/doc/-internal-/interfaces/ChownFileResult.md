[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChownFileResult

# Interface: ChownFileResult

Defined in: [types-dev/index.d.ts:685](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L685)

Contains the return values of chownFile

## Properties

### acl

> **acl**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L697)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:701](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L701)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:689](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L689)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:695](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L695)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L699)

Date of last modification

***

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:687](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L687)

The parent directory of the processed file or directory

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L691)

File system stats

#### size?

> `optional` **size?**: `number`
