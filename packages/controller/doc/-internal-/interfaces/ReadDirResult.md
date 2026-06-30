[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ReadDirResult

# Interface: ReadDirResult

Defined in: [types-dev/index.d.ts:532](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/index.d.ts#L532)

Contains the return values of readDir

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/index.d.ts#L542)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:546](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/index.d.ts#L546)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/index.d.ts#L534)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/index.d.ts#L540)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/index.d.ts#L544)

Date of last modification

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/index.d.ts#L536)

File system stats

#### size?

> `optional` **size?**: `number`
