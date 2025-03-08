[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalStopParameters

# Interface: InternalStopParameters

## Extends

- [`StopParameters`](StopParameters.md)

## Properties

### exitCode?

> `optional` **exitCode**: `number`

Specify an optional exit code

#### Inherited from

[`StopParameters`](StopParameters.md).[`exitCode`](StopParameters.md#exitcode)

#### Defined in

[adapter/src/lib/\_Types.ts:583](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/adapter/src/lib/_Types.ts#L583)

***

### isPause?

> `optional` **isPause**: `boolean`

If mode is schedule or once

#### Defined in

[adapter/src/lib/\_Types.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/adapter/src/lib/_Types.ts#L590)

***

### isScheduled?

> `optional` **isScheduled**: `boolean`

If it has a restart schedule running

#### Defined in

[adapter/src/lib/\_Types.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/adapter/src/lib/_Types.ts#L592)

***

### reason?

> `optional` **reason**: `string`

Specify an optional reason for stoppage

#### Inherited from

[`StopParameters`](StopParameters.md).[`reason`](StopParameters.md#reason)

#### Defined in

[adapter/src/lib/\_Types.ts:585](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/adapter/src/lib/_Types.ts#L585)

***

### updateAliveState?

> `optional` **updateAliveState**: `boolean`

If alive state should be updated, if undefined defaults to true

#### Defined in

[adapter/src/lib/\_Types.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/a32b7b151b5fe0ae96a8a5f086299f18b48e287b/packages/adapter/src/lib/_Types.ts#L594)
