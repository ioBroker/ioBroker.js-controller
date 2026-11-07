[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RepositoryJsonAdapterContent

# Interface: RepositoryJsonAdapterContent

Defined in: [types-dev/objects.d.ts:1133](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1133)

## Indexable

> \[`other`: `string`\]: `unknown`

Other Adapter related properties, not important for this implementation

## Properties

### blockedVersions

> **blockedVersions**: `string`[]

Defined in: [types-dev/objects.d.ts:1139](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1139)

Array of blocked versions, each entry represents a semver range

***

### dependencies

> **dependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:1160](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1160)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

***

### globalDependencies

> **globalDependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:1162](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1162)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:1154](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1154)

Adapter icon

***

### licenses?

> `optional` **licenses?**: `object`[]

Defined in: [types-dev/objects.d.ts:1147](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1147)

List of licenses

#### type

> **type**: `string`

#### url

> **url**: `string`

***

### meta

> **meta**: `string`

Defined in: [types-dev/objects.d.ts:1145](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1145)

Link to package

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:1135](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1135)

Adapter name

***

### news

> **news**: `object`

Defined in: [types-dev/objects.d.ts:1158](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1158)

History

#### Index Signature

\[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

***

### packetName?

> `optional` **packetName?**: `string`

Defined in: [types-dev/objects.d.ts:1143](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1143)

If given, the packet name differs from the adapter name, e.g. because it is a scoped package

***

### processed?

> `optional` **processed?**: `boolean`

Defined in: [types-dev/objects.d.ts:1156](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1156)

Internally used flag

***

### published?

> `optional` **published?**: `string`

Defined in: [types-dev/objects.d.ts:1149](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1149)

Normally by admin is a ISO string with published date

***

### unsafePerm?

> `optional` **unsafePerm?**: `boolean`

Defined in: [types-dev/objects.d.ts:1141](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1141)

If true, the unsafe perm flag is needed on installation

***

### url?

> `optional` **url?**: `string`

Defined in: [types-dev/objects.d.ts:1152](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1152)

Link to adapter repo

***

### version

> **version**: `string`

Defined in: [types-dev/objects.d.ts:1137](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/objects.d.ts#L1137)

Newest available version
