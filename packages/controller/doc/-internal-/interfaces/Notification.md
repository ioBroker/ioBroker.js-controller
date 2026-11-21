[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

Defined in: [types-dev/objects.d.ts:1321](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1321)

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

Defined in: [types-dev/objects.d.ts:1329](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1329)

All notification categories of this scope

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1327](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1327)

The human-readable description of this scope

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1325](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1325)

The human-readable name of this scope

***

### scope

> **scope**: `string`

Defined in: [types-dev/objects.d.ts:1323](https://github.com/ioBroker/ioBroker.js-controller/blob/86a16c878a99c5f58e2cbec50d45b7c891fb9e62/packages/types-dev/objects.d.ts#L1323)

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories, which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.
