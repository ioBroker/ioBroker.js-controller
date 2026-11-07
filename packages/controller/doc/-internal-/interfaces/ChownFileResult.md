[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChownFileResult

# Interface: ChownFileResult

Defined in: [types-dev/index.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/index.d.ts#L696)

Contains the return values of chownFile

## Properties

### acl

> **acl**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:708](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/index.d.ts#L708)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/index.d.ts#L712)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/index.d.ts#L700)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/index.d.ts#L706)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:710](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/index.d.ts#L710)

Date of last modification

***

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/index.d.ts#L698)

The parent directory of the processed file or directory

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/types-dev/index.d.ts#L702)

File system stats

#### size?

> `optional` **size?**: `number`
