[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / State

# Interface: State

Defined in: [types-dev/index.d.ts:213](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L213)

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:218](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L218)

Direction flag: false for desired value and true for actual value. Default: false.

***

### c?

> `optional` **c?**: `string`

Defined in: [types-dev/index.d.ts:239](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L239)

Optional comment

***

### expire?

> `optional` **expire?**: `number`

Defined in: [types-dev/index.d.ts:233](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L233)

Optional time in seconds after which the state is reset to null

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L227)

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

***

### lc

> **lc**: `number`

Defined in: [types-dev/index.d.ts:224](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L224)

Unix timestamp of the last time the value changed

***

### q?

> `optional` **q?**: `0` \| `1` \| `2` \| `64` \| `32` \| `16` \| `128` \| `17` \| `65` \| `129` \| `18` \| `66` \| `130` \| `68` \| `132`

Defined in: [types-dev/index.d.ts:236](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L236)

Optional quality of the state value

***

### ts

> **ts**: `number`

Defined in: [types-dev/index.d.ts:221](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L221)

Unix timestamp. Default: current time

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/index.d.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L230)

The user who set this value

***

### val

> **val**: [`StateValue`](../type-aliases/StateValue.md)

Defined in: [types-dev/index.d.ts:215](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L215)

The value of the state.
