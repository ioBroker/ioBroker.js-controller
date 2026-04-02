[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / State

# Interface: State

Defined in: [types-dev/index.d.ts:60](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L60)

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:65](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L65)

Direction flag: false for desired value and true for actual value. Default: false.

***

### c?

> `optional` **c?**: `string`

Defined in: [types-dev/index.d.ts:86](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L86)

Optional comment

***

### expire?

> `optional` **expire?**: `number`

Defined in: [types-dev/index.d.ts:80](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L80)

Optional time in seconds after which the state is reset to null

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:74](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L74)

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

***

### lc

> **lc**: `number`

Defined in: [types-dev/index.d.ts:71](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L71)

Unix timestamp of the last time the value changed

***

### q?

> `optional` **q?**: `0` \| `64` \| `32` \| `2` \| `1` \| `16` \| `128` \| `17` \| `65` \| `129` \| `18` \| `66` \| `130` \| `68` \| `132`

Defined in: [types-dev/index.d.ts:83](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L83)

Optional quality of the state value

***

### ts

> **ts**: `number`

Defined in: [types-dev/index.d.ts:68](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L68)

Unix timestamp. Default: current time

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/index.d.ts:77](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L77)

The user who set this value

***

### val

> **val**: [`StateValue`](../type-aliases/StateValue.md)

Defined in: [types-dev/index.d.ts:62](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/index.d.ts#L62)

The value of the state.
