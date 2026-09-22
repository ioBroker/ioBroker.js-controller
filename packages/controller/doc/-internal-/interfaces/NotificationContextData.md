[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NotificationContextData

# Interface: NotificationContextData

Defined in: [types-dev/index.d.ts:425](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/types-dev/index.d.ts#L425)

Additional context for the notification which can be used by notification processing adapters

## Indexable

> \[`adapterNameOrAdapterType`: `string`\]: `unknown`

Use a `key` specific to the adapter or if a feature is supported by all adapters of a type, the type (e.g. `messaging`) is also fine.
