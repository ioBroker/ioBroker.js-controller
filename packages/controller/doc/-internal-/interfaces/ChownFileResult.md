[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChownFileResult

# Interface: ChownFileResult

Defined in: [types-dev/index.d.ts:521](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L521)

Contains the return values of chownFile

## Properties

### acl

> **acl**: [`FileACL`](FileACL.md)

Defined in: [types-dev/index.d.ts:531](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L531)

Access rights

***

### createdAt

> **createdAt**: `number`

Defined in: [types-dev/index.d.ts:535](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L535)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:525](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L525)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:529](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L529)

Whether this is a directory or a file

***

### modifiedAt

> **modifiedAt**: `number`

Defined in: [types-dev/index.d.ts:533](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L533)

Date of last modification

***

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L523)

The parent directory of the processed file or directory

***

### stats

> **stats**: `Stats`

Defined in: [types-dev/index.d.ts:527](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L527)

File system stats
