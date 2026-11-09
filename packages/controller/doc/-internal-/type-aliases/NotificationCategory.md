[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationCategory

# Type Alias: NotificationCategory

> **NotificationCategory** = `object`

Defined in: [types-dev/objects.d.ts:1248](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1248)

## Properties

### category

> **category**: `"memIssues"` \| `"fsIoErrors"` \| `"noDiskSpace"` \| `"accessErrors"` \| `"nonExistingFileErrors"` \| `"remoteHostErrors"` \| `"restartLoop"` \| `"fileToJsonl"` \| `"automaticAdapterUpgradeFailed"` \| `"automaticAdapterUpgradeSuccessful"` \| `"blockedVersions"` \| `"databaseErrors"` \| `"securityIssues"` \| `"packageUpdates"` \| `"systemRebootRequired"` \| `"diskSpaceIssues"` \| `string` & `object`

Defined in: [types-dev/objects.d.ts:1250](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1250)

The unique category identifier

***

### description

> **description**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1271](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1271)

The human-readable category description

***

### limit

> **limit**: `number`

Defined in: [types-dev/objects.d.ts:1277](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1277)

Deletes older messages if more than the specified amount is present for this category

***

### name

> **name**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1269](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1269)

The human-readable category name

***

### regex

> **regex**: `string`[]

Defined in: [types-dev/objects.d.ts:1275](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1275)

If a regex is specified, the js-controller will check error messages on adapter crashes against this regex and will generate a notification of this category

***

### severity

> **severity**: `"info"` \| `"notify"` \| `"alert"`

Defined in: [types-dev/objects.d.ts:1273](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/types-dev/objects.d.ts#L1273)

Allows defining the severity of the notification with `info` being the lowest `notify` representing middle priority, `alert` representing high priority and often containing critical information
