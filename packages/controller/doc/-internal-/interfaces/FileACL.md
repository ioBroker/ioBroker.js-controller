[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / FileACL

# Interface: FileACL

Defined in: [types-dev/objects.d.ts:7](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L7)

Defines access rights for a single file

## Extended by

- [`EvaluatedFileACL`](EvaluatedFileACL.md)

## Properties

### owner

> **owner**: `string`

Defined in: [types-dev/objects.d.ts:9](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L9)

Full name of the user who owns this file, e.g. "system.user.admin"

***

### ownerGroup

> **ownerGroup**: `string`

Defined in: [types-dev/objects.d.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L11)

Full name of the group who owns this file, e.g. "system.group.administrator"

***

### permissions

> **permissions**: `number`

Defined in: [types-dev/objects.d.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L13)

Linux-type permissions defining access to this file
