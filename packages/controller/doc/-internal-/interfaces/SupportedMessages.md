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

[types-dev/objects.d.ts:505](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L505)

***

### deviceManager?

> `optional` **deviceManager**: `boolean`

If adapter supports the device manager and thus responds to the corresponding messages

#### Defined in

[types-dev/objects.d.ts:511](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L511)

***

### getHistory?

> `optional` **getHistory**: `boolean`

If adapter supports getHistory message.

#### Defined in

[types-dev/objects.d.ts:513](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L513)

***

### notifications?

> `optional` **notifications**: `boolean`

If notification handling is supported, for information, see https://github.com/foxriver76/ioBroker.notification-manager#requirements-for-messaging-adapters

#### Defined in

[types-dev/objects.d.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L507)

***

### stopInstance?

> `optional` **stopInstance**: `number` \| `boolean`

If adapter supports signal stopInstance. Use number if you need more than 1000 ms for stop routine. The signal will be sent before stop to the adapter. (used if problems occurred with SIGTERM).

#### Defined in

[types-dev/objects.d.ts:509](https://github.com/ioBroker/ioBroker.js-controller/blob/40cb80c182f7d6dd76c85ace42cdd78fa9b7a8dc/packages/types-dev/objects.d.ts#L509)
