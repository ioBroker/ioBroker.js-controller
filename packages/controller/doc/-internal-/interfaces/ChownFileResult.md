[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChownFileResult

# Interface: ChownFileResult

Defined in: [types-dev/index.d.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L692)

Contains the return values of chownFile

## Properties

### acl

> **acl**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L704)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:708](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L708)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L696)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L702)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L706)

Date of last modification

***

### path

> **path**: `string`

Defined in: [types-dev/index.d.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L694)

The parent directory of the processed file or directory

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L698)

File system stats

#### size?

> `optional` **size?**: `number`
