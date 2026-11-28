[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RepositoryJsonAdapterContent

# Interface: RepositoryJsonAdapterContent

Defined in: [types-dev/objects.d.ts:1185](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1185)

## Indexable

> \[`other`: `string`\]: `unknown`

Other Adapter related properties, not important for this implementation

## Properties

### blockedVersions

> **blockedVersions**: `string`[]

Defined in: [types-dev/objects.d.ts:1191](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1191)

Array of blocked versions, each entry represents a semver range

***

### dependencies

> **dependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:1212](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1212)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host.

***

### globalDependencies

> **globalDependencies**: [`Dependencies`](../type-aliases/Dependencies.md)

Defined in: [types-dev/objects.d.ts:1214](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1214)

A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system.

***

### icon?

> `optional` **icon?**: `string`

Defined in: [types-dev/objects.d.ts:1206](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1206)

Adapter icon

***

### licenses?

> `optional` **licenses?**: `object`[]

Defined in: [types-dev/objects.d.ts:1199](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1199)

List of licenses

#### type

> **type**: `string`

#### url

> **url**: `string`

***

### meta

> **meta**: `string`

Defined in: [types-dev/objects.d.ts:1197](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1197)

Link to package

***

### name

> **name**: `string`

Defined in: [types-dev/objects.d.ts:1187](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1187)

Adapter name

***

### news

> **news**: `object`

Defined in: [types-dev/objects.d.ts:1210](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1210)

History

#### Index Signature

\[`version`: `string`\]: [`Translated`](../type-aliases/Translated.md)

***

### packetName?

> `optional` **packetName?**: `string`

Defined in: [types-dev/objects.d.ts:1195](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1195)

If given, the packet name differs from the adapter name, e.g. because it is a scoped package

***

### processed?

> `optional` **processed?**: `boolean`

Defined in: [types-dev/objects.d.ts:1208](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1208)

Internally used flag

***

### published?

> `optional` **published?**: `string`

Defined in: [types-dev/objects.d.ts:1201](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1201)

Normally by admin is a ISO string with published date

***

### unsafePerm?

> `optional` **unsafePerm?**: `boolean`

Defined in: [types-dev/objects.d.ts:1193](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1193)

If true, the unsafe perm flag is needed on installation

***

### url?

> `optional` **url?**: `string`

Defined in: [types-dev/objects.d.ts:1204](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1204)

Link to adapter repo

***

### version

> **version**: `string`

Defined in: [types-dev/objects.d.ts:1189](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1189)

Newest available version
