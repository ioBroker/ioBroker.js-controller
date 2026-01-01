[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ReadDirResult

# Interface: ReadDirResult

Contains the return values of readDir

## Properties

### acl?

> `optional` **acl**: [`EvaluatedFileACL`](EvaluatedFileACL.md)

Access rights

#### Defined in

[types-dev/index.d.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L508)

***

### createdAt?

> `optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:512](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L512)

***

### file

> **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L502)

***

### isDir

> **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L506)

***

### modifiedAt?

> `optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:510](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L510)

***

### stats

> **stats**: `Partial`\<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:504](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L504)
