[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

All notification categories of this scope

#### Defined in

[types-dev/objects.d.ts:1187](https://github.com/ioBroker/ioBroker.js-controller/blob/e7760e24fa0ffd426a76c1a5e27d319df3c1841a/packages/types-dev/objects.d.ts#L1187)

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

The human-readable description of this scope

#### Defined in

[types-dev/objects.d.ts:1185](https://github.com/ioBroker/ioBroker.js-controller/blob/e7760e24fa0ffd426a76c1a5e27d319df3c1841a/packages/types-dev/objects.d.ts#L1185)

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

The human-readable name of this scope

#### Defined in

[types-dev/objects.d.ts:1183](https://github.com/ioBroker/ioBroker.js-controller/blob/e7760e24fa0ffd426a76c1a5e27d319df3c1841a/packages/types-dev/objects.d.ts#L1183)

***

### scope

> **scope**: `string`

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.

#### Defined in

[types-dev/objects.d.ts:1181](https://github.com/ioBroker/ioBroker.js-controller/blob/e7760e24fa0ffd426a76c1a5e27d319df3c1841a/packages/types-dev/objects.d.ts#L1181)
