[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

All notification categories of this scope

#### Defined in

[types-dev/objects.d.ts:1116](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/types-dev/objects.d.ts#L1116)

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

The human-readable description of this scope

#### Defined in

[types-dev/objects.d.ts:1114](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/types-dev/objects.d.ts#L1114)

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

The human-readable name of this scope

#### Defined in

[types-dev/objects.d.ts:1112](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/types-dev/objects.d.ts#L1112)

***

### scope

> **scope**: `string`

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.

#### Defined in

[types-dev/objects.d.ts:1110](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/types-dev/objects.d.ts#L1110)
