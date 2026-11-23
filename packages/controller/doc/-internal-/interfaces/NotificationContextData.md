[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationContextData

# Interface: NotificationContextData

Defined in: [types-dev/index.d.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/540f5fc218263e0c3357f35ef86f7dfd02cbc31c/packages/types-dev/index.d.ts#L581)

Additional context for the notification which can be used by notification processing adapters

## Indexable

> \[`adapterNameOrAdapterType`: `string`\]: `unknown`

Use a `key` specific to the adapter or if a feature is supported by all adapters of a type, the type (e.g. `messaging`) is also fine.
