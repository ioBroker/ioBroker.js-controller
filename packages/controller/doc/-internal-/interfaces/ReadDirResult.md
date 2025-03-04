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

[types-dev/index.d.ts:497](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/index.d.ts#L497)

***

### createdAt?

> `optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:501](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/index.d.ts#L501)

***

### file

> **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:491](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/index.d.ts#L491)

***

### isDir

> **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:495](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/index.d.ts#L495)

***

### modifiedAt?

> `optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:499](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/index.d.ts#L499)

***

### stats

> **stats**: `Partial`\<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:493](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/index.d.ts#L493)
