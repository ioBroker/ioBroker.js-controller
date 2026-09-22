[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / State

# Interface: State

Defined in: [types-dev/index.d.ts:212](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L212)

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:217](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L217)

Direction flag: false for desired value and true for actual value. Default: false.

***

### c?

> `optional` **c?**: `string`

Defined in: [types-dev/index.d.ts:238](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L238)

Optional comment

***

### expire?

> `optional` **expire?**: `number`

Defined in: [types-dev/index.d.ts:232](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L232)

Optional time in seconds after which the state is reset to null

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:226](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L226)

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

***

### lc

> **lc**: `number`

Defined in: [types-dev/index.d.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L223)

Unix timestamp of the last time the value changed

***

### q?

> `optional` **q?**: `0` \| `1` \| `2` \| `64` \| `32` \| `16` \| `128` \| `17` \| `65` \| `129` \| `18` \| `66` \| `130` \| `68` \| `132`

Defined in: [types-dev/index.d.ts:235](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L235)

Optional quality of the state value

***

### ts

> **ts**: `number`

Defined in: [types-dev/index.d.ts:220](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L220)

Unix timestamp. Default: current time

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/index.d.ts:229](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L229)

The user who set this value

***

### val

> **val**: [`StateValue`](../type-aliases/StateValue.md)

Defined in: [types-dev/index.d.ts:214](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L214)

The value of the state.
