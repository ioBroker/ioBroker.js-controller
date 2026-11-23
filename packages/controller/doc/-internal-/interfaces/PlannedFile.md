[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PlannedFile

# Interface: PlannedFile

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:18](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L18)

A file of the listing, with the place it is written to

## Properties

### dest

> **dest**: `string`

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L22)

Absolute path of the copy

***

### path

> **path**: `string`

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:20](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L20)

Path relative to the fetched directory, separated by `/`

***

### size

> **size**: `number`

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:24](https://github.com/ioBroker/ioBroker.js-controller/blob/f0774d1b08db8894d2f278bf0cdb40854907903e/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L24)

Size according to the listing, `Infinity` if the listing gave none
