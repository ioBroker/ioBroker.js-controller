[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / EvaluatedFileACL

# Interface: EvaluatedFileACL

Defines access rights for a single file, applied to a user or group

## Extends

- [`FileACL`](FileACL.md)

## Properties

### owner

> **owner**: `string`

Full name of the user who owns this file, e.g. "system.user.admin"

#### Inherited from

[`FileACL`](FileACL.md).[`owner`](FileACL.md#owner)

#### Defined in

[types-dev/objects.d.ts:9](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L9)

***

### ownerGroup

> **ownerGroup**: `string`

Full name of the group who owns this file, e.g. "system.group.administrator"

#### Inherited from

[`FileACL`](FileACL.md).[`ownerGroup`](FileACL.md#ownergroup)

#### Defined in

[types-dev/objects.d.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L11)

***

### permissions

> **permissions**: `number`

Linux-type permissions defining access to this file

#### Inherited from

[`FileACL`](FileACL.md).[`permissions`](FileACL.md#permissions)

#### Defined in

[types-dev/objects.d.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L13)

***

### read

> **read**: `boolean`

Whether the user may read the file

#### Defined in

[types-dev/objects.d.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L19)

***

### write

> **write**: `boolean`

Whether the user may write the file

#### Defined in

[types-dev/objects.d.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/6e6387bb66b8177b201746ee5d7461396c3654ed/packages/types-dev/objects.d.ts#L21)
