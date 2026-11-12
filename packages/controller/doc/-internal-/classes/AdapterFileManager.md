[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AdapterFileManager

# Class: AdapterFileManager

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:36](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L36)

Fetches a directory of an installed adapter - e.g. its `widgets` folder - into a local directory.

An adapter only exists on the hosts it is installed on. If it is installed on this host, the directory is copied
from its package; otherwise the js-controller of a host it is installed on hands the files out with
`sendToHost(host, 'listAdapterDir', ...)`, `sendToHost(host, 'readAdapterFiles', ...)` for the small files, several
in one answer, and `sendToHost(host, 'readAdapterFile', ...)` for the big ones, piece by piece - all compressed
with gzip where it helps. The requests go the same way as for the `iobdisk://` URLs, see [HostDiskClient](HostDiskClient.md).

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new AdapterFileManager**(`ctx`, `getMessaging`): `AdapterFileManager`

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L43)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

##### getMessaging

() => [`MessagingManager`](MessagingManager.md)

Returns the adapter's messaging manager, which matches the host's answers to the requests

#### Returns

`AdapterFileManager`

#### Overrides

[`AdapterContextBase`](AdapterContextBase.md).[`constructor`](AdapterContextBase.md#constructor)

## Methods

### fetchAdapterDir()

> **fetchAdapterDir**(`options`): `Promise`\<[`FetchAdapterDirResult`](../interfaces/FetchAdapterDirResult.md)\>

Defined in: [adapter/src/lib/adapter/managers/AdapterFileManager.ts:54](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/adapter/managers/AdapterFileManager.ts#L54)

Copy a directory of an installed adapter into a local directory, from this or another host

#### Parameters

##### options

[`FetchAdapterDirOptions`](../interfaces/FetchAdapterDirOptions.md)

which directory of which adapter, where to, and optionally from which host

#### Returns

`Promise`\<[`FetchAdapterDirResult`](../interfaces/FetchAdapterDirResult.md)\>

the host the files came from and the written files
