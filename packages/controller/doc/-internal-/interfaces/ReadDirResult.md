[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ReadDirResult

# Interface: ReadDirResult

Defined in: [types-dev/index.d.ts:526](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L526)

Contains the return values of readDir

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L534)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:538](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L538)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:528](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L528)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:532](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L532)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L536)

Date of last modification

***

### stats

> **stats**: `Partial`\<`fs.Stats`\>

Defined in: [types-dev/index.d.ts:530](https://github.com/ioBroker/ioBroker.js-controller/blob/66b4b74ab141b1cd367bd9818812430ed9c72430/packages/types-dev/index.d.ts#L530)

File system stats
