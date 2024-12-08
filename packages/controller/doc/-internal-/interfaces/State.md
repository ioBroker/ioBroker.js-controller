[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / State

# Interface: State

## Properties

### ack

> **ack**: `boolean`

Direction flag: false for desired value and true for actual value. Default: false.

#### Defined in

[types-dev/index.d.ts:61](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L61)

***

### c?

> `optional` **c**: `string`

Optional comment

#### Defined in

[types-dev/index.d.ts:82](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L82)

***

### expire?

> `optional` **expire**: `number`

Optional time in seconds after which the state is reset to null

#### Defined in

[types-dev/index.d.ts:76](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L76)

***

### from

> **from**: `string`

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

#### Defined in

[types-dev/index.d.ts:70](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L70)

***

### lc

> **lc**: `number`

Unix timestamp of the last time the value changed

#### Defined in

[types-dev/index.d.ts:67](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L67)

***

### q?

> `optional` **q**: `0` \| `64` \| `32` \| `2` \| `1` \| `16` \| `128` \| `17` \| `65` \| `129` \| `18` \| `66` \| `130` \| `68` \| `132`

Optional quality of the state value

#### Defined in

[types-dev/index.d.ts:79](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L79)

***

### ts

> **ts**: `number`

Unix timestamp. Default: current time

#### Defined in

[types-dev/index.d.ts:64](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L64)

***

### user?

> `optional` **user**: `string`

The user who set this value

#### Defined in

[types-dev/index.d.ts:73](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L73)

***

### val

> **val**: [`StateValue`](../type-aliases/StateValue.md)

The value of the state.

#### Defined in

[types-dev/index.d.ts:58](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L58)
