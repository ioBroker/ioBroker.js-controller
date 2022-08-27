[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Timeout

# Interface: Timeout

[<internal>](../modules/internal_.md).Timeout

## Hierarchy

- [`Timer`](internal_.Timer.md)

  ↳ **`Timeout`**

## Table of contents

### Methods

- [[toPrimitive]](internal_.Timeout.md#[toprimitive])
- [hasRef](internal_.Timeout.md#hasref)
- [ref](internal_.Timeout.md#ref)
- [refresh](internal_.Timeout.md#refresh)
- [unref](internal_.Timeout.md#unref)

## Methods

### [toPrimitive]

▸ **[toPrimitive]**(): `number`

#### Returns

`number`

#### Overrides

[Timer](internal_.Timer.md).[[toPrimitive]](internal_.Timer.md#[toprimitive])

#### Defined in

node_modules/@types/node/timers.d.ts:62

___

### hasRef

▸ **hasRef**(): `boolean`

If true, the `Timeout` object will keep the Node.js event loop active.

**`Since`**

v11.0.0

#### Returns

`boolean`

#### Overrides

[Timer](internal_.Timer.md).[hasRef](internal_.Timer.md#hasref)

#### Defined in

node_modules/@types/node/timers.d.ts:49

___

### ref

▸ **ref**(): [`Timeout`](internal_.Timeout.md)

#### Returns

[`Timeout`](internal_.Timeout.md)

#### Inherited from

[Timer](internal_.Timer.md).[ref](internal_.Timer.md#ref)

#### Defined in

node_modules/@types/node/globals.d.ts:216

___

### refresh

▸ **refresh**(): [`Timeout`](internal_.Timeout.md)

Sets the timer's start time to the current time, and reschedules the timer to
call its callback at the previously specified duration adjusted to the current
time. This is useful for refreshing a timer without allocating a new
JavaScript object.

Using this on a timer that has already called its callback will reactivate the
timer.

**`Since`**

v10.2.0

#### Returns

[`Timeout`](internal_.Timeout.md)

a reference to `timeout`

#### Overrides

[Timer](internal_.Timer.md).[refresh](internal_.Timer.md#refresh)

#### Defined in

node_modules/@types/node/timers.d.ts:61

___

### unref

▸ **unref**(): [`Timeout`](internal_.Timeout.md)

#### Returns

[`Timeout`](internal_.Timeout.md)

#### Inherited from

[Timer](internal_.Timer.md).[unref](internal_.Timer.md#unref)

#### Defined in

node_modules/@types/node/globals.d.ts:217
