[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ReadDirResult

# Interface: ReadDirResult

Defined in: [types-dev/index.d.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/index.d.ts#L658)

Contains the return values of readDir

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:668](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/index.d.ts#L668)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:672](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/index.d.ts#L672)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:660](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/index.d.ts#L660)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:666](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/index.d.ts#L666)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:670](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/index.d.ts#L670)

Date of last modification

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:662](https://github.com/ioBroker/ioBroker.js-controller/blob/99da17fcc8e508685aa76215228d1f13d7f9efb4/packages/types-dev/index.d.ts#L662)

File system stats

#### size?

> `optional` **size?**: `number`
