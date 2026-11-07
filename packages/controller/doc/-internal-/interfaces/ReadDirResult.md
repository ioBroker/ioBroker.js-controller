[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ReadDirResult

# Interface: ReadDirResult

Defined in: [types-dev/index.d.ts:687](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L687)

Contains the return values of readDir

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L697)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:701](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L701)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:689](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L689)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:695](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L695)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L699)

Date of last modification

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L691)

File system stats

#### size?

> `optional` **size?**: `number`
