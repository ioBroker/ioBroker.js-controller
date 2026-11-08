[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / State

# Interface: State

Defined in: [types-dev/index.d.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L219)

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:224](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L224)

Direction flag: false for desired value and true for actual value. Default: false.

***

### c?

> `optional` **c?**: `string`

Defined in: [types-dev/index.d.ts:245](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L245)

Optional comment

***

### expire?

> `optional` **expire?**: `number`

Defined in: [types-dev/index.d.ts:239](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L239)

Optional time in seconds after which the state is reset to null

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:233](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L233)

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

***

### lc

> **lc**: `number`

Defined in: [types-dev/index.d.ts:230](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L230)

Unix timestamp of the last time the value changed

***

### q?

> `optional` **q?**: `0` \| `1` \| `2` \| `64` \| `32` \| `16` \| `128` \| `17` \| `65` \| `129` \| `18` \| `66` \| `130` \| `68` \| `132`

Defined in: [types-dev/index.d.ts:242](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L242)

Optional quality of the state value

***

### ts

> **ts**: `number`

Defined in: [types-dev/index.d.ts:227](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L227)

Unix timestamp. Default: current time

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/index.d.ts:236](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L236)

The user who set this value

***

### val

> **val**: [`StateValue`](../type-aliases/StateValue.md)

Defined in: [types-dev/index.d.ts:221](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L221)

The value of the state.
