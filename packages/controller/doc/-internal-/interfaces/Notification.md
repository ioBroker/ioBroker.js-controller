[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

All notification categories of this scope

#### Defined in

[types-dev/objects.d.ts:1111](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L1111)

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

The human-readable description of this scope

#### Defined in

[types-dev/objects.d.ts:1109](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L1109)

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

The human-readable name of this scope

#### Defined in

[types-dev/objects.d.ts:1107](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L1107)

***

### scope

> **scope**: `string`

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.

#### Defined in

[types-dev/objects.d.ts:1105](https://github.com/ioBroker/ioBroker.js-controller/blob/fe9fbf6b684b474bc0dfc453eb28790be874895e/packages/types-dev/objects.d.ts#L1105)
