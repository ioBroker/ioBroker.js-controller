[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / FileACL

# Interface: FileACL

Defines access rights for a single file

## Extended by

- [`EvaluatedFileACL`](EvaluatedFileACL.md)

## Properties

### owner

> **owner**: `string`

Full name of the user who owns this file, e.g. "system.user.admin"

#### Defined in

[types-dev/objects.d.ts:9](https://github.com/ioBroker/ioBroker.js-controller/blob/93db56665248b4cd78a78e2bab0647c80d6ccf9f/packages/types-dev/objects.d.ts#L9)

***

### ownerGroup

> **ownerGroup**: `string`

Full name of the group who owns this file, e.g. "system.group.administrator"

#### Defined in

[types-dev/objects.d.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/93db56665248b4cd78a78e2bab0647c80d6ccf9f/packages/types-dev/objects.d.ts#L11)

***

### permissions

> **permissions**: `number`

Linux-type permissions defining access to this file

#### Defined in

[types-dev/objects.d.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/93db56665248b4cd78a78e2bab0647c80d6ccf9f/packages/types-dev/objects.d.ts#L13)
