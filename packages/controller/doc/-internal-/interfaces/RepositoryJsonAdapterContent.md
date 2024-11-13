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

[types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L1000)

***

### name

> **name**: `string`

Adapter name

#### Defined in

[types-dev/objects.d.ts:996](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L996)

***

### packetName?

> `optional` **packetName**: `string`

If given, the packet name differs from the adapter name, e.g. because it is a scoped package

#### Defined in

[types-dev/objects.d.ts:1004](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L1004)

***

### unsafePerm?

> `optional` **unsafePerm**: `boolean`

If true the unsafe perm flag is needed on install

#### Defined in

[types-dev/objects.d.ts:1002](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L1002)

***

### version

> **version**: `string`

Newest available version

#### Defined in

[types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/objects.d.ts#L998)
