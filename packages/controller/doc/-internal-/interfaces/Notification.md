[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

Defined in: [types-dev/objects.d.ts:1308](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1308)

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

Defined in: [types-dev/objects.d.ts:1316](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1316)

All notification categories of this scope

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1314](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1314)

The human-readable description of this scope

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1312](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1312)

The human-readable name of this scope

***

### scope

> **scope**: `string`

Defined in: [types-dev/objects.d.ts:1310](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/objects.d.ts#L1310)

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories, which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.
