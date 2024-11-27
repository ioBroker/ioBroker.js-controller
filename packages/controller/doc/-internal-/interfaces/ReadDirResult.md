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

[types-dev/index.d.ts:457](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/index.d.ts#L457)

***

### createdAt?

> `optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:461](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/index.d.ts#L461)

***

### file

> **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:451](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/index.d.ts#L451)

***

### isDir

> **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:455](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/index.d.ts#L455)

***

### modifiedAt?

> `optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:459](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/index.d.ts#L459)

***

### stats

> **stats**: `Partial`\<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:453](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/types-dev/index.d.ts#L453)
