[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationCategory

# Type Alias: NotificationCategory

> **NotificationCategory**: `object`

## Type declaration

### category

> **category**: `"memIssues"` \| `"fsIoErrors"` \| `"noDiskSpace"` \| `"accessErrors"` \| `"nonExistingFileErrors"` \| `"remoteHostErrors"` \| `"restartLoop"` \| `"fileToJsonl"` \| `"automaticAdapterUpgradeFailed"` \| `"automaticAdapterUpgradeSuccessful"` \| `"blockedVersions"` \| `"databaseErrors"` \| `"securityIssues"` \| `"packageUpdates"` \| `"systemRebootRequired"` \| `"diskSpaceIssues"` \| `string` & `object`

The unique category identifier

### description

> **description**: [`Translated`](Translated.md)

The human-readable category description

### limit

> **limit**: `number`

Deletes older messages if more than the specified amount is present for this category

### name

> **name**: [`Translated`](Translated.md)

The human-readable category name

### regex

> **regex**: `string`[]

If a regex is specified, the js-controller will check error messages on adapter crashes against this regex and will generate a notification of this category

### severity

> **severity**: `"info"` \| `"notify"` \| `"alert"`

Allows to define the severity of the notification with `info` being the lowest `notify` representing middle priority, `alert` representing high priority and often containing critical information

## Defined in

[types-dev/objects.d.ts:1078](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L1078)
