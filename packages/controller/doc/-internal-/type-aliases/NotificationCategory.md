[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationCategory

# Type Alias: NotificationCategory

> **NotificationCategory** = `object`

Defined in: [types-dev/objects.d.ts:1193](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1193)

## Properties

### category

> **category**: `"memIssues"` \| `"fsIoErrors"` \| `"noDiskSpace"` \| `"accessErrors"` \| `"nonExistingFileErrors"` \| `"remoteHostErrors"` \| `"restartLoop"` \| `"fileToJsonl"` \| `"automaticAdapterUpgradeFailed"` \| `"automaticAdapterUpgradeSuccessful"` \| `"blockedVersions"` \| `"databaseErrors"` \| `"securityIssues"` \| `"packageUpdates"` \| `"systemRebootRequired"` \| `"diskSpaceIssues"` \| `string` & `object`

Defined in: [types-dev/objects.d.ts:1195](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1195)

The unique category identifier

***

### description

> **description**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1216](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1216)

The human-readable category description

***

### limit

> **limit**: `number`

Defined in: [types-dev/objects.d.ts:1222](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1222)

Deletes older messages if more than the specified amount is present for this category

***

### name

> **name**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1214](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1214)

The human-readable category name

***

### regex

> **regex**: `string`[]

Defined in: [types-dev/objects.d.ts:1220](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1220)

If a regex is specified, the js-controller will check error messages on adapter crashes against this regex and will generate a notification of this category

***

### severity

> **severity**: `"info"` \| `"notify"` \| `"alert"`

Defined in: [types-dev/objects.d.ts:1218](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/objects.d.ts#L1218)

Allows defining the severity of the notification with `info` being the lowest `notify` representing middle priority, `alert` representing high priority and often containing critical information
