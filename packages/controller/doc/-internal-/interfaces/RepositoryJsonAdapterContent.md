[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RepositoryJsonAdapterContent

# Interface: RepositoryJsonAdapterContent

Defined in: [types-dev/objects.d.ts:1082](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1082)

## Indexable

> \[`other`: `string`\]: `unknown`

Other Adapter related properties, not important for this implementation

## Properties

### blockedVersions

> **blockedVersions**: `string`[]

Defined in: [types-dev/objects.d.ts:1088](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1088)

Array of blocked versions, each entry represents a semver range

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:1084](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1084)

Adapter name

***

### packetName?

> `optional` **packetName?**: `string`

Defined in: [types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1092)

If given, the packet name differs from the adapter name, e.g. because it is a scoped package

***

### unsafePerm?

> `optional` **unsafePerm?**: `boolean`

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1090)

If true, the unsafe perm flag is needed on installation

***

### version

> **version**: `string`

Defined in: [types-dev/objects.d.ts:1086](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L1086)

Newest available version
