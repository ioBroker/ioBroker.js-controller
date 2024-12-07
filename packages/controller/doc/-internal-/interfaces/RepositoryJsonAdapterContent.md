[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RepositoryJsonAdapterContent

# Interface: RepositoryJsonAdapterContent

## Indexable

 \[`other`: `string`\]: `unknown`

## Properties

### blockedVersions

> **blockedVersions**: `string`[]

Array of blocked versions, each entry represents a semver range

#### Defined in

[types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/objects.d.ts#L1009)

***

### name

> **name**: `string`

Adapter name

#### Defined in

[types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/objects.d.ts#L1005)

***

### packetName?

> `optional` **packetName**: `string`

If given, the packet name differs from the adapter name, e.g. because it is a scoped package

#### Defined in

[types-dev/objects.d.ts:1013](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/objects.d.ts#L1013)

***

### unsafePerm?

> `optional` **unsafePerm**: `boolean`

If true the unsafe perm flag is needed on install

#### Defined in

[types-dev/objects.d.ts:1011](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/objects.d.ts#L1011)

***

### version

> **version**: `string`

Newest available version

#### Defined in

[types-dev/objects.d.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/objects.d.ts#L1007)
