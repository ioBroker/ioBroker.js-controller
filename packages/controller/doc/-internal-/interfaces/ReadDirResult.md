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

[types-dev/index.d.ts:493](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/index.d.ts#L493)

***

### createdAt?

> `optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:497](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/index.d.ts#L497)

***

### file

> **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:487](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/index.d.ts#L487)

***

### isDir

> **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:491](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/index.d.ts#L491)

***

### modifiedAt?

> `optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:495](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/index.d.ts#L495)

***

### stats

> **stats**: `Partial`\<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/8896efebaa940f64d52c1c649e1e7f7a5500873b/packages/types-dev/index.d.ts#L489)
