[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Notification

# Interface: Notification

Defined in: [types-dev/objects.d.ts:1273](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/types-dev/objects.d.ts#L1273)

## Properties

### categories

> **categories**: [`NotificationCategory`](../type-aliases/NotificationCategory.md)[]

Defined in: [types-dev/objects.d.ts:1281](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/types-dev/objects.d.ts#L1281)

All notification categories of this scope

***

### description

> **description**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1279](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/types-dev/objects.d.ts#L1279)

The human-readable description of this scope

***

### name

> **name**: [`Translated`](../type-aliases/Translated.md)

Defined in: [types-dev/objects.d.ts:1277](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/types-dev/objects.d.ts#L1277)

The human-readable name of this scope

***

### scope

> **scope**: `string`

Defined in: [types-dev/objects.d.ts:1275](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/types-dev/objects.d.ts#L1275)

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories, which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.
