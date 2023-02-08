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

[types/index.d.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/index.d.ts#L45)

___

### c

• `Optional` **c**: `string`

Optional comment

#### Defined in

[types/index.d.ts:66](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/index.d.ts#L66)

___

### expire

• `Optional` **expire**: `number`

Optional time in seconds after which the state is reset to null

#### Defined in

[types/index.d.ts:60](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/index.d.ts#L60)

___

### from

• **from**: `string`

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

#### Defined in

[types/index.d.ts:54](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/index.d.ts#L54)

___

### lc

• **lc**: `number`

Unix timestamp of the last time the value changed

#### Defined in

[types/index.d.ts:51](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/index.d.ts#L51)

___

### q

• `Optional` **q**: [`StateQuality`](../enums/internal_.StateQuality.md)

Optional quality of the state value

#### Defined in

[types/index.d.ts:63](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/index.d.ts#L63)

___

### ts

• **ts**: `number`

Unix timestamp. Default: current time

#### Defined in

[types/index.d.ts:48](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/index.d.ts#L48)

___

### user

• `Optional` **user**: `string`

The user who set this value

#### Defined in

[types/index.d.ts:57](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/index.d.ts#L57)

___

### val

• **val**: [`StateValue`](../modules/internal_.md#statevalue)

The value of the state.

#### Defined in

[types/index.d.ts:42](https://github.com/ioBroker/ioBroker.js-controller/blob/33bf0c0e/packages/types/index.d.ts#L42)
