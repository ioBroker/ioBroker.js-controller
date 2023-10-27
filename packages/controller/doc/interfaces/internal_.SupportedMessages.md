[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / SupportedMessages

# Interface: SupportedMessages

[<internal>](../modules/internal_.md).SupportedMessages

Object which defines, if the adapter supports receiving messages via sendTo.
Additionally, it defines if specific messages are supported.
If one property is enabled, the object `system.adapter.<adaptername>.<adapterinstance>.messagebox will be created to send messages to the adapter (used for email, pushover, etc...)

## Table of contents

### Properties

- [custom](internal_.SupportedMessages.md#custom)
- [notifications](internal_.SupportedMessages.md#notifications)
- [stopInstance](internal_.SupportedMessages.md#stopinstance)

## Properties

### custom

• **custom**: `boolean`

If custom messages are supported (same as legacy messagebox)

#### Defined in

[types-dev/objects.d.ts:466](https://github.com/ioBroker/ioBroker.js-controller/blob/9ced50d9/packages/types-dev/objects.d.ts#L466)

___

### notifications

• **notifications**: `boolean`

If notification handling is supported, for information, see https://github.com/foxriver76/ioBroker.notification-manager#requirements-for-messaging-adapters

#### Defined in

[types-dev/objects.d.ts:468](https://github.com/ioBroker/ioBroker.js-controller/blob/9ced50d9/packages/types-dev/objects.d.ts#L468)

___

### stopInstance

• **stopInstance**: `number` \| `boolean`

If adapter supports signal stopInstance. Use number if you need more than 1000 ms for stop routine. The signal will be sent before stop to the adapter. (used if problems occurred with SIGTERM).

#### Defined in

[types-dev/objects.d.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/9ced50d9/packages/types-dev/objects.d.ts#L470)
