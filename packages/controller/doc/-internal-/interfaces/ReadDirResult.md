[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ReadDirResult

# Interface: ReadDirResult

Defined in: [types-dev/index.d.ts:500](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L500)

Contains the return values of readDir

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L508)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:512](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L512)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L502)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L506)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:510](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L510)

Date of last modification

***

### stats

> **stats**: `Partial`\<`fs.Stats`\>

Defined in: [types-dev/index.d.ts:504](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L504)

File system stats
