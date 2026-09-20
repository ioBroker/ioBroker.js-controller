[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

Defined in: [types-dev/objects.d.ts:1250](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1250)

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

Defined in: [types-dev/objects.d.ts:1258](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1258)

All notification categories of this scope

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1256](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1256)

The human-readable description of this scope

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1254](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1254)

The human-readable name of this scope

***

### scope

> **scope**: `string`

Defined in: [types-dev/objects.d.ts:1252](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/objects.d.ts#L1252)

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories, which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.
