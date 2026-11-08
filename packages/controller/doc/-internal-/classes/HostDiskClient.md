[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / HostDiskClient

# Class: HostDiskClient

Defined in: [adapter/src/lib/adapter/managers/HostDiskClient.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/HostDiskClient.ts#L28)

The requester side of the host commands that read the disk of another host - shared by `fetchAdapterDir`
([AdapterFileManager](AdapterFileManager.md)) and the `iobdisk://` URLs ([DiskFileManager](DiskFileManager.md)), as both ask the js-controller of the
other host in the same way:

- first `checkFeatureSupported` with a short timeout, once per host, as an older js-controller never answers an
  unknown command
- then the requests, each with a timeout, an answer `{ error }` turned into a rejection
- a file comes in pieces of the same form (`size`, `mtime`, `offset`, `data`, `compressed`); a piece is checked and
  unpacked here, and a different `size` or `mtime` than of the first piece means the file changed meanwhile

## Constructors

### Constructor

> **new HostDiskClient**(`getMessaging`): `HostDiskClient`

Defined in: [adapter/src/lib/adapter/managers/HostDiskClient.ts:36](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/HostDiskClient.ts#L36)

#### Parameters

##### getMessaging

() => [`MessagingManager`](MessagingManager.md)

Returns the adapter's messaging manager, which matches the host's answers to the requests

#### Returns

`HostDiskClient`

## Methods

### assertFeature()

> **assertFeature**(`host`, `feature`, `purpose`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/HostDiskClient.ts:48](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/HostDiskClient.ts#L48)

Make sure the js-controller of the host knows the feature

#### Parameters

##### host

`string`

name of the host

##### feature

`string`

the feature flag, e.g. `CONTROLLER_DISK_FILES`

##### purpose

`string`

what the feature is for, for the error message, e.g. `hand out iobdisk:// files`

#### Returns

`Promise`\<`void`\>

#### Throws

if the host does not answer or its js-controller is too old

***

### decodeChunk()

> **decodeChunk**(`host`, `name`, `chunk`, `file`, `offset`, `length`, `exact`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [adapter/src/lib/adapter/managers/HostDiskClient.ts:116](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/HostDiskClient.ts#L116)

Check a received piece of a file and unpack it

#### Parameters

##### host

`string`

name of the host

##### name

`string`

the file, for the error messages

##### chunk

`Record`\<`string`, `any`\>

the received piece

##### file

[`ChunkedFile`](../interfaces/ChunkedFile.md)

what is known about the file; the first piece fills it

##### offset

`number`

where the piece has to start

##### length

`number`

how many bytes the piece has to hold (`exact`), or may hold at most

##### exact

`boolean`

whether the piece must hold exactly `length` bytes - not so the beginning of a file that came with
       other files in one answer, which the host may cut off

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

#### Throws

if the piece does not fit or the file changed since the first piece

***

### request()

> **request**(`host`, `command`, `message`, `name`): `Promise`\<`Record`\<`string`, `any`\>\>

Defined in: [adapter/src/lib/adapter/managers/HostDiskClient.ts:81](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/HostDiskClient.ts#L81)

Send a request to a host and wait for the answer

#### Parameters

##### host

`string`

name of the host

##### command

`string`

the host command

##### message

`Record`\<`string`, `unknown`\>

the payload

##### name

`string`

what is asked for, for the error message, e.g. the path of the file

#### Returns

`Promise`\<`Record`\<`string`, `any`\>\>

#### Throws

if the host does not answer in time or answers with an error
