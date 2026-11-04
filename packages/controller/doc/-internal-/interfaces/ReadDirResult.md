[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ReadDirResult

# Interface: ReadDirResult

Defined in: [types-dev/index.d.ts:667](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L667)

Contains the return values of readDir

## Properties

### acl?

> `optional` **acl?**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Defined in: [types-dev/index.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L677)

Access rights

***

### createdAt?

> `optional` **createdAt?**: `number`

Defined in: [types-dev/index.d.ts:681](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L681)

Date of creation

***

### file

> **file**: `string`

Defined in: [types-dev/index.d.ts:669](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L669)

Name of the file or directory

***

### isDir

> **isDir**: `boolean`

Defined in: [types-dev/index.d.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L675)

Whether this is a directory or a file

***

### modifiedAt?

> `optional` **modifiedAt?**: `number`

Defined in: [types-dev/index.d.ts:679](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L679)

Date of last modification

***

### stats?

> `optional` **stats?**: `object`

Defined in: [types-dev/index.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/58da667b3a7ef168beb3343c4c64ac4e031a2ffd/packages/types-dev/index.d.ts#L671)

File system stats

#### size?

> `optional` **size?**: `number`
