[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / State

# Interface: State

[<internal>](../modules/internal_.md).State

## Table of contents

### Properties

- [ack](internal_.State.md#ack)
- [c](internal_.State.md#c)
- [expire](internal_.State.md#expire)
- [from](internal_.State.md#from)
- [lc](internal_.State.md#lc)
- [q](internal_.State.md#q)
- [ts](internal_.State.md#ts)
- [user](internal_.State.md#user)
- [val](internal_.State.md#val)

## Properties

### ack

• **ack**: `boolean`

Direction flag: false for desired value and true for actual value. Default: false.

#### Defined in

[types-dev/index.d.ts:35](https://github.com/ioBroker/ioBroker.js-controller/blob/e0b409fe/packages/types-dev/index.d.ts#L35)

___

### c

• `Optional` **c**: `string`

Optional comment

#### Defined in

[types-dev/index.d.ts:56](https://github.com/ioBroker/ioBroker.js-controller/blob/e0b409fe/packages/types-dev/index.d.ts#L56)

___

### expire

• `Optional` **expire**: `number`

Optional time in seconds after which the state is reset to null

#### Defined in

[types-dev/index.d.ts:50](https://github.com/ioBroker/ioBroker.js-controller/blob/e0b409fe/packages/types-dev/index.d.ts#L50)

___

### from

• **from**: `string`

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

#### Defined in

[types-dev/index.d.ts:44](https://github.com/ioBroker/ioBroker.js-controller/blob/e0b409fe/packages/types-dev/index.d.ts#L44)

___

### lc

• **lc**: `number`

Unix timestamp of the last time the value changed

#### Defined in

[types-dev/index.d.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/e0b409fe/packages/types-dev/index.d.ts#L41)

___

### q

• `Optional` **q**: [`StateQuality`](../enums/internal_.StateQuality.md)

Optional quality of the state value

#### Defined in

[types-dev/index.d.ts:53](https://github.com/ioBroker/ioBroker.js-controller/blob/e0b409fe/packages/types-dev/index.d.ts#L53)

___

### ts

• **ts**: `number`

Unix timestamp. Default: current time

#### Defined in

[types-dev/index.d.ts:38](https://github.com/ioBroker/ioBroker.js-controller/blob/e0b409fe/packages/types-dev/index.d.ts#L38)

___

### user

• `Optional` **user**: `string`

The user who set this value

#### Defined in

[types-dev/index.d.ts:47](https://github.com/ioBroker/ioBroker.js-controller/blob/e0b409fe/packages/types-dev/index.d.ts#L47)

___

### val

• **val**: [`StateValue`](../modules/internal_.md#statevalue)

The value of the state.

#### Defined in

[types-dev/index.d.ts:32](https://github.com/ioBroker/ioBroker.js-controller/blob/e0b409fe/packages/types-dev/index.d.ts#L32)
