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

[types-dev/objects.d.ts:1049](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1049)

***

### name

> **name**: `string`

Adapter name

#### Defined in

[types-dev/objects.d.ts:1045](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1045)

***

### packetName?

> `optional` **packetName**: `string`

If given, the packet name differs from the adapter name, e.g. because it is a scoped package

#### Defined in

[types-dev/objects.d.ts:1053](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1053)

***

### unsafePerm?

> `optional` **unsafePerm**: `boolean`

If true the unsafe perm flag is needed on install

#### Defined in

[types-dev/objects.d.ts:1051](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1051)

***

### version

> **version**: `string`

Newest available version

#### Defined in

[types-dev/objects.d.ts:1047](https://github.com/ioBroker/ioBroker.js-controller/blob/8ad7f66ced81c171aa99d76496fa607acde05189/packages/types-dev/objects.d.ts#L1047)
