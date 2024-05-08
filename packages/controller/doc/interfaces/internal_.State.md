[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / State

# Interface: State

[\<internal\>](../modules/internal_.md).State

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

[types-dev/index.d.ts:57](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/index.d.ts#L57)

___

### c

• `Optional` **c**: `string`

Optional comment

#### Defined in

[types-dev/index.d.ts:78](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/index.d.ts#L78)

___

### expire

• `Optional` **expire**: `number`

Optional time in seconds after which the state is reset to null

#### Defined in

[types-dev/index.d.ts:72](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/index.d.ts#L72)

___

### from

• **from**: `string`

Name of the adapter instance which set the value, e.g. "system.adapter.web.0"

#### Defined in

[types-dev/index.d.ts:66](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/index.d.ts#L66)

___

### lc

• **lc**: `number`

Unix timestamp of the last time the value changed

#### Defined in

[types-dev/index.d.ts:63](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/index.d.ts#L63)

___

### q

• `Optional` **q**: ``0`` \| ``64`` \| ``32`` \| ``2`` \| ``1`` \| ``16`` \| ``128`` \| ``17`` \| ``65`` \| ``129`` \| ``18`` \| ``66`` \| ``130`` \| ``68`` \| ``132``

Optional quality of the state value

#### Defined in

[types-dev/index.d.ts:75](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/index.d.ts#L75)

___

### ts

• **ts**: `number`

Unix timestamp. Default: current time

#### Defined in

[types-dev/index.d.ts:60](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/index.d.ts#L60)

___

### user

• `Optional` **user**: `string`

The user who set this value

#### Defined in

[types-dev/index.d.ts:69](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/index.d.ts#L69)

___

### val

• **val**: [`StateValue`](../modules/internal_.md#statevalue)

The value of the state.

#### Defined in

[types-dev/index.d.ts:54](https://github.com/ioBroker/ioBroker.js-controller/blob/d36cddc8d/packages/types-dev/index.d.ts#L54)
