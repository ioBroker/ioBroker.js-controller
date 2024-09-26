[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / EvaluatedFileACL

# Interface: EvaluatedFileACL

[\<internal\>](../modules/internal_.md).EvaluatedFileACL

Defines access rights for a single file, applied to a user or group

## Hierarchy

- [`FileACL`](internal_.FileACL.md)

  ↳ **`EvaluatedFileACL`**

## Table of contents

### Properties

- [owner](internal_.EvaluatedFileACL.md#owner)
- [ownerGroup](internal_.EvaluatedFileACL.md#ownergroup)
- [permissions](internal_.EvaluatedFileACL.md#permissions)
- [read](internal_.EvaluatedFileACL.md#read)
- [write](internal_.EvaluatedFileACL.md#write)

## Properties

### owner

• **owner**: `string`

Full name of the user who owns this file, e.g. "system.user.admin"

#### Inherited from

[FileACL](internal_.FileACL.md).[owner](internal_.FileACL.md#owner)

#### Defined in

[types-dev/objects.d.ts:9](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L9)

___

### ownerGroup

• **ownerGroup**: `string`

Full name of the group who owns this file, e.g. "system.group.administrator"

#### Inherited from

[FileACL](internal_.FileACL.md).[ownerGroup](internal_.FileACL.md#ownergroup)

#### Defined in

[types-dev/objects.d.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L11)

___

### permissions

• **permissions**: `number`

Linux-type permissions defining access to this file

#### Inherited from

[FileACL](internal_.FileACL.md).[permissions](internal_.FileACL.md#permissions)

#### Defined in

[types-dev/objects.d.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L13)

___

### read

• **read**: `boolean`

Whether the user may read the file

#### Defined in

[types-dev/objects.d.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L19)

___

### write

• **write**: `boolean`

Whether the user may write the file

#### Defined in

[types-dev/objects.d.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L21)
