[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RepositoryJsonAdapterContent

# Interface: RepositoryJsonAdapterContent

Defined in: [types-dev/objects.d.ts:1110](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1110)

## Indexable

> \[`other`: `string`\]: `unknown`

Other Adapter related properties, not important for this implementation

## Properties

### blockedVersions

> **blockedVersions**: `string`[]

Defined in: [types-dev/objects.d.ts:1116](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1116)

Array of blocked versions, each entry represents a semver range

***

### dependencies

> **dependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:1137](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1137)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

***

### globalDependencies

> **globalDependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:1139](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1139)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:1131](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1131)

Adapter icon

***

### licenses?

> `optional` **licenses?**: `object`[]

Defined in: [types-dev/objects.d.ts:1124](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1124)

List of licenses

#### type

> **type**: `string`

#### url

> **url**: `string`

***

### meta

> **meta**: `string`

Defined in: [types-dev/objects.d.ts:1122](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1122)

Link to package

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:1112](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1112)

Adapter name

***

### news

> **news**: `object`

Defined in: [types-dev/objects.d.ts:1135](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1135)

History

#### Index Signature

\[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

***

### packetName?

> `optional` **packetName?**: `string`

Defined in: [types-dev/objects.d.ts:1120](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1120)

If given, the packet name differs from the adapter name, e.g. because it is a scoped package

***

### processed?

> `optional` **processed?**: `boolean`

Defined in: [types-dev/objects.d.ts:1133](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1133)

Internally used flag

***

### published?

> `optional` **published?**: `string`

Defined in: [types-dev/objects.d.ts:1126](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1126)

Normally by admin is a ISO string with published date

***

### unsafePerm?

> `optional` **unsafePerm?**: `boolean`

Defined in: [types-dev/objects.d.ts:1118](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1118)

If true, the unsafe perm flag is needed on installation

***

### url?

> `optional` **url?**: `string`

Defined in: [types-dev/objects.d.ts:1129](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1129)

Link to adapter repo

***

### version

> **version**: `string`

Defined in: [types-dev/objects.d.ts:1114](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1114)

Newest available version
