[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ReadDirResult

# Interface: ReadDirResult

Defined in: [types-dev/index.d.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L542)

Contains the return values of readDir

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:550](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L550)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L554)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L544)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L548)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:552](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L552)

Date of last modification

***

### stats

> **stats**: `Partial`\<`fs.Stats`\>

Defined in: [types-dev/index.d.ts:546](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/index.d.ts#L546)

File system stats
