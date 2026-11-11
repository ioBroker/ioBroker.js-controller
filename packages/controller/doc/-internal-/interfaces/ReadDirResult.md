[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ReadDirResult

# Interface: ReadDirResult

Defined in: [types-dev/index.d.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L688)

Contains the return values of readDir

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L698)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L702)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L690)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L696)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L700)

Date of last modification

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L692)

File system stats

#### size?

> `optional` **size?**: `number`
