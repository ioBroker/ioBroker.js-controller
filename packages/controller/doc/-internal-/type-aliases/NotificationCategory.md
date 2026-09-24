[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationCategory

# Type Alias: NotificationCategory

> **NotificationCategory** = `object`

Defined in: [types-dev/objects.d.ts:1223](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1223)

## Properties

### category

> **category**: `"memIssues"` \| `"fsIoErrors"` \| `"noDiskSpace"` \| `"accessErrors"` \| `"nonExistingFileErrors"` \| `"remoteHostErrors"` \| `"restartLoop"` \| `"fileToJsonl"` \| `"automaticAdapterUpgradeFailed"` \| `"automaticAdapterUpgradeSuccessful"` \| `"blockedVersions"` \| `"databaseErrors"` \| `"securityIssues"` \| `"packageUpdates"` \| `"systemRebootRequired"` \| `"diskSpaceIssues"` \| `string` & `object`

Defined in: [types-dev/objects.d.ts:1225](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1225)

The unique category identifier

***

### description

> **description**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1246](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1246)

The human-readable category description

***

### limit

> **limit**: `number`

Defined in: [types-dev/objects.d.ts:1252](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1252)

Deletes older messages if more than the specified amount is present for this category

***

### name

> **name**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1244](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1244)

The human-readable category name

***

### regex

> **regex**: `string`[]

Defined in: [types-dev/objects.d.ts:1250](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1250)

If a regex is specified, the js-controller will check error messages on adapter crashes against this regex and will generate a notification of this category

***

### severity

> **severity**: `"info"` \| `"notify"` \| `"alert"`

Defined in: [types-dev/objects.d.ts:1248](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/objects.d.ts#L1248)

Allows defining the severity of the notification with `info` being the lowest `notify` representing middle priority, `alert` representing high priority and often containing critical information
