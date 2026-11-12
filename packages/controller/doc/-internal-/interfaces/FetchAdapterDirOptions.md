[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / FetchAdapterDirOptions

# Interface: FetchAdapterDirOptions

Defined in: [adapter/src/lib/\_Types.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/_Types.ts#L698)

Which directory of which adapter is fetched, and where to - see `AdapterClass.fetchAdapterDir`

## Properties

### adapter

> **adapter**: `string`

Defined in: [adapter/src/lib/\_Types.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/_Types.ts#L700)

Name of the adapter, without `iobroker.` and without instance number, e.g. `wattcycle`

***

### host?

> `optional` **host?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/_Types.ts#L709)

The host to fetch from. If not given, this host is taken if the adapter is installed here, else the first
running host with an instance of the adapter.

***

### path

> **path**: `string`

Defined in: [adapter/src/lib/\_Types.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/_Types.ts#L702)

The directory inside the package of the adapter, separated by `/`, e.g. `widgets`

***

### target

> **target**: `string`

Defined in: [adapter/src/lib/\_Types.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/03667c060d7cad736217ec7e1b837e0ace8bb659/packages/adapter/src/lib/_Types.ts#L704)

Local directory the files are written to; it is created if it does not exist
