[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PlannedFile

# Interface: PlannedFile

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L21)

A file of the listing, with the place it is written to

## Properties

### dest

> **dest**: `string`

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L25)

Absolute path of the copy

***

### path

> **path**: `string`

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L23)

Path relative to the fetched directory, separated by `/`

***

### size

> **size**: `number`

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L27)

Size according to the listing, `Infinity` if the listing gave none
