[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChownFileResult

# Interface: ChownFileResult

Defined in: [types-dev/index.d.ts:547](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/index.d.ts#L547)

Contains the return values of chownFile

## Properties

### acl

> **acl**: [`FileACL`](FileACL.md)

Defined in: [types-dev/index.d.ts:557](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/index.d.ts#L557)

Access rights

***

### createdAt

> **createdAt**: `number`

Defined in: [types-dev/index.d.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/index.d.ts#L561)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:551](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/index.d.ts#L551)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:555](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/index.d.ts#L555)

Whether this is a directory or a file

***

### modifiedAt

> **modifiedAt**: `number`

Defined in: [types-dev/index.d.ts:559](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/index.d.ts#L559)

Date of last modification

***

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:549](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/index.d.ts#L549)

The parent directory of the processed file or directory

***

### stats

> **stats**: `Stats`

Defined in: [types-dev/index.d.ts:553](https://github.com/ioBroker/ioBroker.js-controller/blob/ea8c7aa0a350c7db84ff9e202c3596e307c71f0e/packages/types-dev/index.d.ts#L553)

File system stats
