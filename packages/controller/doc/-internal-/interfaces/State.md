[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / State

# Interface: State

## Properties

### ack

> **ack**: `boolean`

Direction flag: false for desired value and true for actual value. Default: false.

#### Defined in

[types-dev/index.d.ts:65](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L65)

***

### c?

> `optional` **c**: `string`

Optional comment

#### Defined in

[types-dev/index.d.ts:86](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L86)

***

### expire?

> `optional` **expire**: `number`

Optional time in seconds after which the state is reset to null

#### Defined in

[types-dev/index.d.ts:80](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L80)

***

### from

> **from**: `string`

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

#### Defined in

[types-dev/index.d.ts:74](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L74)

***

### lc

> **lc**: `number`

Unix timestamp of the last time the value changed

#### Defined in

[types-dev/index.d.ts:71](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L71)

***

### q?

> `optional` **q**: `0` \| `64` \| `32` \| `2` \| `1` \| `16` \| `128` \| `17` \| `65` \| `129` \| `18` \| `66` \| `130` \| `68` \| `132`

Optional quality of the state value

#### Defined in

[types-dev/index.d.ts:83](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L83)

***

### ts

> **ts**: `number`

Unix timestamp. Default: current time

#### Defined in

[types-dev/index.d.ts:68](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L68)

***

### user?

> `optional` **user**: `string`

The user who set this value

#### Defined in

[types-dev/index.d.ts:77](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L77)

***

### val

> **val**: [`StateValue`](../type-aliases/StateValue.md)

The value of the state.

#### Defined in

[types-dev/index.d.ts:62](https://github.com/ioBroker/ioBroker.js-controller/blob/167975fd275bcc20e3e85af4ea1a9729d6ba39fb/packages/types-dev/index.d.ts#L62)
