[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationContextData

# Interface: NotificationContextData

Defined in: [types-dev/index.d.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/6d3d6fa9759e51b8e40ec707d37394a161b93e65/packages/types-dev/index.d.ts#L589)

Additional context for the notification which can be used by notification processing adapters

## Indexable

> \[`adapterNameOrAdapterType`: `string`\]: `unknown`

Use a `key` specific to the adapter or if a feature is supported by all adapters of a type, the type (e.g. `messaging`) is also fine.
