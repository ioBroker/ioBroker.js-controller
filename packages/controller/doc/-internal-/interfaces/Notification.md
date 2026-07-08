[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

Defined in: [types-dev/objects.d.ts:1235](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/objects.d.ts#L1235)

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

Defined in: [types-dev/objects.d.ts:1243](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/objects.d.ts#L1243)

All notification categories of this scope

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1241](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/objects.d.ts#L1241)

The human-readable description of this scope

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1239](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/objects.d.ts#L1239)

The human-readable name of this scope

***

### scope

> **scope**: `string`

Defined in: [types-dev/objects.d.ts:1237](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/types-dev/objects.d.ts#L1237)

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories, which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.
