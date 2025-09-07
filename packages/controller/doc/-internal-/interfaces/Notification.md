[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

All notification categories of this scope

#### Defined in

[types-dev/objects.d.ts:1151](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1151)

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

The human-readable description of this scope

#### Defined in

[types-dev/objects.d.ts:1149](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1149)

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

The human-readable name of this scope

#### Defined in

[types-dev/objects.d.ts:1147](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1147)

***

### scope

> **scope**: `string`

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.

#### Defined in

[types-dev/objects.d.ts:1145](https://github.com/ioBroker/ioBroker.js-controller/blob/3daa8532c48e6c817fc472607ccec26424ca987e/packages/types-dev/objects.d.ts#L1145)
