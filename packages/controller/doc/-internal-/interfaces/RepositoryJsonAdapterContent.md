[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RepositoryJsonAdapterContent

# Interface: RepositoryJsonAdapterContent

Defined in: [types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1092)

## Indexable

> \[`other`: `string`\]: `unknown`

Other Adapter related properties, not important for this implementation

## Properties

### blockedVersions

> **blockedVersions**: `string`[]

Defined in: [types-dev/objects.d.ts:1098](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1098)

Array of blocked versions, each entry represents a semver range

***

### dependencies

> **dependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:1119](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1119)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

***

### globalDependencies

> **globalDependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:1121](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1121)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:1113](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1113)

Adapter icon

***

### licenses?

> `optional` **licenses?**: `object`[]

Defined in: [types-dev/objects.d.ts:1106](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1106)

List of licenses

#### type

> **type**: `string`

#### url

> **url**: `string`

***

### meta

> **meta**: `string`

Defined in: [types-dev/objects.d.ts:1104](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1104)

Link to package

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1094)

Adapter name

***

### news

> **news**: `object`

Defined in: [types-dev/objects.d.ts:1117](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1117)

History

#### Index Signature

\[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

***

### packetName?

> `optional` **packetName?**: `string`

Defined in: [types-dev/objects.d.ts:1102](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1102)

If given, the packet name differs from the adapter name, e.g. because it is a scoped package

***

### processed?

> `optional` **processed?**: `boolean`

Defined in: [types-dev/objects.d.ts:1115](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1115)

Internally used flag

***

### published?

> `optional` **published?**: `string`

Defined in: [types-dev/objects.d.ts:1108](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1108)

Normally by admin is a ISO string with published date

***

### unsafePerm?

> `optional` **unsafePerm?**: `boolean`

Defined in: [types-dev/objects.d.ts:1100](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1100)

If true, the unsafe perm flag is needed on installation

***

### url?

> `optional` **url?**: `string`

Defined in: [types-dev/objects.d.ts:1111](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1111)

Link to adapter repo

***

### version

> **version**: `string`

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1096)

Newest available version
