[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / State

# Interface: State

Defined in: [types-dev/index.d.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L220)

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L225)

Direction flag: false for desired value and true for actual value. Default: false.

***

### c?

> `optional` **c?**: `string`

Defined in: [types-dev/index.d.ts:246](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L246)

Optional comment

***

### expire?

> `optional` **expire?**: `number`

Defined in: [types-dev/index.d.ts:240](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L240)

Optional time in seconds after which the state is reset to null

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:234](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L234)

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

***

### lc

> **lc**: `number`

Defined in: [types-dev/index.d.ts:231](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L231)

Unix timestamp of the last time the value changed

***

### q?

> `optional` **q?**: `0` \| `1` \| `2` \| `64` \| `32` \| `16` \| `128` \| `17` \| `65` \| `129` \| `18` \| `66` \| `130` \| `68` \| `132`

Defined in: [types-dev/index.d.ts:243](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L243)

Optional quality of the state value

***

### ts

> **ts**: `number`

Defined in: [types-dev/index.d.ts:228](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L228)

Unix timestamp. Default: current time

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/index.d.ts:237](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L237)

The user who set this value

***

### val

> **val**: [`StateValue`](../type-aliases/StateValue.md)

Defined in: [types-dev/index.d.ts:222](https://github.com/ioBroker/ioBroker.js-controller/blob/548ee3ae9978eec52d0d08eb53e4b7e6eb35d9d1/packages/types-dev/index.d.ts#L222)

The value of the state.
