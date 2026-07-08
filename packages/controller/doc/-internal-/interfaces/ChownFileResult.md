[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChownFileResult

# Interface: ChownFileResult

Defined in: [types-dev/index.d.ts:559](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/index.d.ts#L559)

Contains the return values of chownFile

## Properties

### acl

> **acl**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:571](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/index.d.ts#L571)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:575](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/index.d.ts#L575)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:563](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/index.d.ts#L563)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/index.d.ts#L569)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:573](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/index.d.ts#L573)

Date of last modification

***

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/index.d.ts#L561)

The parent directory of the processed file or directory

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/index.d.ts#L565)

File system stats

#### size?

> `optional` **size?**: `number`
