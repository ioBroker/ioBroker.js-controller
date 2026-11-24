[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ChunkedFile

# Interface: ChunkedFile

Defined in: [adapter/src/lib/adapter/managers/HostDiskClient.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/adapter/src/lib/adapter/managers/HostDiskClient.ts#L10)

What is known about a file while its pieces arrive

## Properties

### mtime

> **mtime**: `number`

Defined in: [adapter/src/lib/adapter/managers/HostDiskClient.ts:14](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/adapter/src/lib/adapter/managers/HostDiskClient.ts#L14)

Time of the last modification, as the first piece said

***

### size

> **size**: `number`

Defined in: [adapter/src/lib/adapter/managers/HostDiskClient.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/adapter/src/lib/adapter/managers/HostDiskClient.ts#L12)

Size of the whole file, `-1` until the first piece arrived
