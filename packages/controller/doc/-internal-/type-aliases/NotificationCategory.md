[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationCategory

# Type Alias: NotificationCategory

> **NotificationCategory** = `object`

Defined in: [types-dev/objects.d.ts:1241](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L1241)

## Properties

### category

> **category**: `"memIssues"` \| `"fsIoErrors"` \| `"noDiskSpace"` \| `"accessErrors"` \| `"nonExistingFileErrors"` \| `"remoteHostErrors"` \| `"restartLoop"` \| `"fileToJsonl"` \| `"automaticAdapterUpgradeFailed"` \| `"automaticAdapterUpgradeSuccessful"` \| `"blockedVersions"` \| `"databaseErrors"` \| `"securityIssues"` \| `"packageUpdates"` \| `"systemRebootRequired"` \| `"diskSpaceIssues"` \| `string` & `object`

Defined in: [types-dev/objects.d.ts:1243](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L1243)

The unique category identifier

***

### description

> **description**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1264](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L1264)

The human-readable category description

***

### limit

> **limit**: `number`

Defined in: [types-dev/objects.d.ts:1270](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L1270)

Deletes older messages if more than the specified amount is present for this category

***

### name

> **name**: [`Translated`](Translated.md)

Defined in: [types-dev/objects.d.ts:1262](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L1262)

The human-readable category name

***

### regex

> **regex**: `string`[]

Defined in: [types-dev/objects.d.ts:1268](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L1268)

If a regex is specified, the js-controller will check error messages on adapter crashes against this regex and will generate a notification of this category

***

### severity

> **severity**: `"info"` \| `"notify"` \| `"alert"`

Defined in: [types-dev/objects.d.ts:1266](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/types-dev/objects.d.ts#L1266)

Allows defining the severity of the notification with `info` being the lowest `notify` representing middle priority, `alert` representing high priority and often containing critical information
