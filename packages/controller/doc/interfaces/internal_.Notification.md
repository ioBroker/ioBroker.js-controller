[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / Notification

# Interface: Notification

[\<internal\>](../modules/internal_.md).Notification

## Table of contents

### Properties

- [categories](internal_.Notification.md#categories)
- [description](internal_.Notification.md#description)
- [name](internal_.Notification.md#name)
- [scope](internal_.Notification.md#scope)

## Properties

### categories

• **categories**: [`NotificationCategory`](../modules/internal_.md#notificationcategory)[]

All notification categories of this scope

#### Defined in

[types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L1099)

___

### description

• **description**: [`Translated`](../modules/internal_.md#translated)

The human-readable description of this scope

#### Defined in

[types-dev/objects.d.ts:1097](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L1097)

___

### name

• **name**: [`Translated`](../modules/internal_.md#translated)

The human-readable name of this scope

#### Defined in

[types-dev/objects.d.ts:1095](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L1095)

___

### scope

• **scope**: `string`

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.

#### Defined in

[types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/4149909bc476d149ab982187a6b3b61b340b9ab1/packages/types-dev/objects.d.ts#L1093)
