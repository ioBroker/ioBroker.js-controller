[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChownFileResult

# Interface: ChownFileResult

Defined in: [types-dev/index.d.ts:714](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L714)

Contains the return values of chownFile

## Properties

### acl

> **acl**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:726](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L726)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:730](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L730)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:718](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L718)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:724](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L724)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:728](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L728)

Date of last modification

***

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:716](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L716)

The parent directory of the processed file or directory

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:720](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L720)

File system stats

#### size?

> `optional` **size?**: `number`
