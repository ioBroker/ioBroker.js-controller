[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChownFileResult

# Interface: ChownFileResult

Defined in: [types-dev/index.d.ts:563](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L563)

Contains the return values of chownFile

## Properties

### acl

> **acl**: [`FileACL`](FileACL.md)

Defined in: [types-dev/index.d.ts:573](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L573)

Access rights

***

### createdAt

> **createdAt**: `number`

Defined in: [types-dev/index.d.ts:577](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L577)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:567](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L567)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:571](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L571)

Whether this is a directory or a file

***

### modifiedAt

> **modifiedAt**: `number`

Defined in: [types-dev/index.d.ts:575](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L575)

Date of last modification

***

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L565)

The parent directory of the processed file or directory

***

### stats

> **stats**: `Stats`

Defined in: [types-dev/index.d.ts:569](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/types-dev/index.d.ts#L569)

File system stats
