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

[types-dev/objects.d.ts:1098](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L1098)

___

### description

• **description**: [`Translated`](../modules/internal_.md#translated)

The human-readable description of this scope

#### Defined in

[types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L1096)

___

### name

• **name**: [`Translated`](../modules/internal_.md#translated)

The human-readable name of this scope

#### Defined in

[types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L1094)

___

### scope

• **scope**: `string`

E.g., `system`. Each adapter can define its own "scopes" for own notifications with its own categories which then will be available in the system. Adapters should only register one scope which matches the name of the adapter.

#### Defined in

[types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L1092)
