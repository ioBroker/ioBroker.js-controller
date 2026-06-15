[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationContextData

# Interface: NotificationContextData

Defined in: [types-dev/index.d.ts:419](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/types-dev/index.d.ts#L419)

Additional context for the notification which can be used by notification processing adapters

## Indexable

> \[`adapterNameOrAdapterType`: `string`\]: `unknown`

Use a `key` specific to the adapter or if a feature is supported by all adapters of a type, the type (e.g. `messaging`) is also fine.
