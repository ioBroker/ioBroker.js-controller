[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / EvaluatedFileACL

# Interface: EvaluatedFileACL

Defined in: [types-dev/objects.d.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L17)

Defines access rights for a single file, applied to a user or group

## Extends

- [`FileACL`](FileACL.md)

## Properties

### owner

> **owner**: `string`

Defined in: [types-dev/objects.d.ts:9](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L9)

Full name of the user who owns this file, e.g. "system.user.admin"

#### Inherited from

[`FileACL`](FileACL.md).[`owner`](FileACL.md#owner)

***

### ownerGroup

> **ownerGroup**: `string`

Defined in: [types-dev/objects.d.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L11)

Full name of the group who owns this file, e.g. "system.group.administrator"

#### Inherited from

[`FileACL`](FileACL.md).[`ownerGroup`](FileACL.md#ownergroup)

***

### permissions

> **permissions**: `number`

Defined in: [types-dev/objects.d.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L13)

Linux-type permissions defining access to this file

#### Inherited from

[`FileACL`](FileACL.md).[`permissions`](FileACL.md#permissions)

***

### read

> **read**: `boolean`

Defined in: [types-dev/objects.d.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L19)

Whether the user may read the file

***

### write

> **write**: `boolean`

Defined in: [types-dev/objects.d.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L21)

Whether the user may write the file
