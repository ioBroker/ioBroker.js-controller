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

[types-dev/index.d.ts:499](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/index.d.ts#L499)

***

### createdAt?

> `optional` **createdAt**: `number`

Date of creation

#### Defined in

[types-dev/index.d.ts:503](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/index.d.ts#L503)

***

### file

> **file**: `string`

Name of the file or directory

#### Defined in

[types-dev/index.d.ts:493](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/index.d.ts#L493)

***

### isDir

> **isDir**: `boolean`

Whether this is a directory or a file

#### Defined in

[types-dev/index.d.ts:497](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/index.d.ts#L497)

***

### modifiedAt?

> `optional` **modifiedAt**: `number`

Date of last modification

#### Defined in

[types-dev/index.d.ts:501](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/index.d.ts#L501)

***

### stats

> **stats**: `Partial`\<`Stats`\>

File system stats

#### Defined in

[types-dev/index.d.ts:495](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/index.d.ts#L495)
