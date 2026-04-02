[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SupportedMessages

# Interface: SupportedMessages

Defined in: [types-dev/objects.d.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L507)

Object which defines if the adapter supports receiving messages via sendTo.
Additionally, it defines if specific messages are supported.
If one property is enabled, the object `system.adapter.<adapterName>.<adapterInstance>.messagebox will be created to send messages to the adapter (used for email, pushover, etc...)

## Properties

### custom?

> `optional` **custom?**: `boolean`

Defined in: [types-dev/objects.d.ts:509](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L509)

If custom messages are supported (same as legacy messagebox)

***

### deviceManager?

> `optional` **deviceManager?**: `boolean`

Defined in: [types-dev/objects.d.ts:515](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L515)

If adapter supports the device manager and thus responds to the corresponding messages

***

### getHistory?

> `optional` **getHistory?**: `boolean`

Defined in: [types-dev/objects.d.ts:517](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L517)

If adapter supports getHistory message.

***

### notifications?

> `optional` **notifications?**: `boolean`

Defined in: [types-dev/objects.d.ts:511](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L511)

If notification handling is supported, for information, see https://github.com/foxriver76/ioBroker.notification-manager#requirements-for-messaging-adapters

***

### stopInstance?

> `optional` **stopInstance?**: `number` \| `boolean`

Defined in: [types-dev/objects.d.ts:513](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/objects.d.ts#L513)

If adapter supports signal stopInstance. Use number if you need more than 1000 ms for stop routine. The signal will be sent before stop to the adapter. (used if problems occurred with SIGTERM).
