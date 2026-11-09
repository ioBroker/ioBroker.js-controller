[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DiskFileManager

# Class: DiskFileManager

Defined in: [adapter/src/lib/adapter/managers/DiskFileManager.ts:26](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/adapter/managers/DiskFileManager.ts#L26)

Creates, reads and deletes `iobdisk://` URLs: files below the data directory of an instance on the disk of one host.

A file on this host is read from the disk; a file on another host is fetched piece by piece from the js-controller
of that host with `sendToHost(host, 'readDiskFile', ...)`, so that also big files (videos) can be passed between
instances on different hosts. Deleting goes the same way (`sendToHost(host, 'deleteDiskFile', ...)`). The pieces
are the same as of the files of adapters and are requested compressed - the host leaves videos and images as they
are, see [HostDiskClient](HostDiskClient.md).

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new DiskFileManager**(`ctx`, `getMessaging`): `DiskFileManager`

Defined in: [adapter/src/lib/adapter/managers/DiskFileManager.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/adapter/managers/DiskFileManager.ts#L33)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

##### getMessaging

() => [`MessagingManager`](MessagingManager.md)

Returns the adapter's messaging manager, which matches the host's answers to the requests

#### Returns

`DiskFileManager`

#### Overrides

[`AdapterContextBase`](AdapterContextBase.md).[`constructor`](AdapterContextBase.md#constructor)

## Methods

### createDiskFileReadStream()

> **createDiskFileReadStream**(`url`): `Readable`

Defined in: [adapter/src/lib/adapter/managers/DiskFileManager.ts:75](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/adapter/managers/DiskFileManager.ts#L75)

Read the file an `iobdisk://` URL points to as a stream, without holding it in memory as a whole

Errors (unknown host, missing file, file changed while reading) are emitted on the stream.

#### Parameters

##### url

`string`

e.g. `iobdisk://pi4/telegram.0/video/1.mp4`

#### Returns

`Readable`

***

### deleteDiskFile()

> **deleteDiskFile**(`url`): `Promise`\<`boolean`\>

Defined in: [adapter/src/lib/adapter/managers/DiskFileManager.ts:91](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/adapter/managers/DiskFileManager.ts#L91)

Delete the file an `iobdisk://` URL points to, on this or another host

Only a regular file inside the data directory of the instance is deleted, never a directory.

#### Parameters

##### url

`string`

e.g. `iobdisk://pi4/telegram.0/video/1.mp4`

#### Returns

`Promise`\<`boolean`\>

`true` if the file was deleted, `false` if it did not exist

***

### getDiskFileUrl()

> **getDiskFileUrl**(`filePath`): `string`

Defined in: [adapter/src/lib/adapter/managers/DiskFileManager.ts:44](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/adapter/managers/DiskFileManager.ts#L44)

Build the `iobdisk://` URL of a file of this instance

#### Parameters

##### filePath

`string`

absolute path below `iobroker-data/<namespace>` (or `iobroker-data/<adapter>_<instance>`), or a
       path relative to `iobroker-data/<namespace>`

#### Returns

`string`

***

### readDiskFile()

> **readDiskFile**(`url`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [adapter/src/lib/adapter/managers/DiskFileManager.ts:56](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/adapter/managers/DiskFileManager.ts#L56)

Read the whole file an `iobdisk://` URL points to

#### Parameters

##### url

`string`

e.g. `iobdisk://pi4/telegram.0/video/1.mp4`

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>
