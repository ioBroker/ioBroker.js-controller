[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationCategory

# Type Alias: NotificationCategory

> **NotificationCategory** = `object`

Defined in: [types-dev/objects.d.ts:1298](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1298)

## Properties

### category

> **category**: `"memIssues"` \| `"fsIoErrors"` \| `"noDiskSpace"` \| `"accessErrors"` \| `"nonExistingFileErrors"` \| `"remoteHostErrors"` \| `"restartLoop"` \| `"fileToJsonl"` \| `"automaticAdapterUpgradeFailed"` \| `"automaticAdapterUpgradeSuccessful"` \| `"blockedVersions"` \| `"databaseErrors"` \| `"securityIssues"` \| `"packageUpdates"` \| `"systemRebootRequired"` \| `"diskSpaceIssues"` \| `string` & `object`

Defined in: [types-dev/objects.d.ts:1300](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1300)

The unique category identifier

***

### description

> **description**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1321](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1321)

The human-readable category description

***

### limit

> **limit**: `number`

Defined in: [types-dev/objects.d.ts:1327](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1327)

Deletes older messages if more than the specified amount is present for this category

***

### name

> **name**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1319](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1319)

The human-readable category name

***

### regex

> **regex**: `string`[]

Defined in: [types-dev/objects.d.ts:1325](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1325)

If a regex is specified, the js-controller will check error messages on adapter crashes against this regex and will generate a notification of this category

***

### severity

> **severity**: `"info"` \| `"notify"` \| `"alert"`

Defined in: [types-dev/objects.d.ts:1323](https://github.com/ioBroker/ioBroker.js-controller/blob/bc55fa2b001d03ea9d1c99c36ace9b080d4e7f89/packages/types-dev/objects.d.ts#L1323)

Allows defining the severity of the notification with `info` being the lowest `notify` representing middle priority, `alert` representing high priority and often containing critical information
