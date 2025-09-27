[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SupportedMessages

# Interface: SupportedMessages

Object which defines if the adapter supports receiving messages via sendTo.
Additionally, it defines if specific messages are supported.
If one property is enabled, the object `system.adapter.<adapterName>.<adapterInstance>.messagebox will be created to send messages to the adapter (used for email, pushover, etc...)

## Properties

### custom?

> `optional` **custom**: `boolean`

If custom messages are supported (same as legacy messagebox)

#### Defined in

[types-dev/objects.d.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L502)

***

### deviceManager?

> `optional` **deviceManager**: `boolean`

If adapter supports the device manager and thus responds to the corresponding messages

#### Defined in

[types-dev/objects.d.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L508)

***

### getHistory?

> `optional` **getHistory**: `boolean`

If adapter supports getHistory message.

#### Defined in

[types-dev/objects.d.ts:510](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L510)

***

### notifications?

> `optional` **notifications**: `boolean`

If notification handling is supported, for information, see https://github.com/foxriver76/ioBroker.notification-manager#requirements-for-messaging-adapters

#### Defined in

[types-dev/objects.d.ts:504](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L504)

***

### stopInstance?

> `optional` **stopInstance**: `number` \| `boolean`

If adapter supports signal stopInstance. Use number if you need more than 1000 ms for stop routine. The signal will be sent before stop to the adapter. (used if problems occurred with SIGTERM).

#### Defined in

[types-dev/objects.d.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/51faba7cbec9601fb6a2f5142cb3a117e78ab588/packages/types-dev/objects.d.ts#L506)
