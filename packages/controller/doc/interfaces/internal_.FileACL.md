[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / FileACL

# Interface: FileACL

[\<internal\>](../modules/internal_.md).FileACL

Defines access rights for a single file

## Hierarchy

- **`FileACL`**

  ↳ [`EvaluatedFileACL`](internal_.EvaluatedFileACL.md)

## Table of contents

### Properties

- [owner](internal_.FileACL.md#owner)
- [ownerGroup](internal_.FileACL.md#ownergroup)
- [permissions](internal_.FileACL.md#permissions)

## Properties

### owner

• **owner**: `string`

Full name of the user who owns this file, e.g. "system.user.admin"

#### Defined in

[types-dev/objects.d.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/9b71d3242/packages/types-dev/objects.d.ts#L8)

___

### ownerGroup

• **ownerGroup**: `string`

Full name of the group who owns this file, e.g. "system.group.administrator"

#### Defined in

[types-dev/objects.d.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/9b71d3242/packages/types-dev/objects.d.ts#L10)

___

### permissions

• **permissions**: `number`

Linux-type permissions defining access to this file

#### Defined in

[types-dev/objects.d.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/9b71d3242/packages/types-dev/objects.d.ts#L12)
