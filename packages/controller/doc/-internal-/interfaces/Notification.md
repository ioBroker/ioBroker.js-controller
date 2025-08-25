[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

All notification categories of this scope

#### Defined in

[types-dev/objects.d.ts:1129](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1129)

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

The human-readable description of this scope

#### Defined in

[types-dev/objects.d.ts:1127](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1127)

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

The human-readable name of this scope

#### Defined in

[types-dev/objects.d.ts:1125](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1125)

***

### scope

> **scope**: `string`

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.

#### Defined in

[types-dev/objects.d.ts:1123](https://github.com/ioBroker/ioBroker.js-controller/blob/77e3ad19ba544ef59ab9929a52ba17e35b9cc80a/packages/types-dev/objects.d.ts#L1123)
