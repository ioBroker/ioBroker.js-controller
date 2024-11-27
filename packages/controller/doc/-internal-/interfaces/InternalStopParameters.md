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

[adapter/src/lib/\_Types.ts:581](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/adapter/src/lib/_Types.ts#L581)

***

### isPause?

> `optional` **isPause**: `boolean`

If mode is schedule or once

#### Defined in

[adapter/src/lib/\_Types.ts:588](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/adapter/src/lib/_Types.ts#L588)

***

### isScheduled?

> `optional` **isScheduled**: `boolean`

If it has a restart schedule running

#### Defined in

[adapter/src/lib/\_Types.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/adapter/src/lib/_Types.ts#L590)

***

### reason?

> `optional` **reason**: `string`

Specify an optional reason for stoppage

#### Inherited from

[`StopParameters`](StopParameters.md).[`reason`](StopParameters.md#reason)

#### Defined in

[adapter/src/lib/\_Types.ts:583](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/adapter/src/lib/_Types.ts#L583)

***

### updateAliveState?

> `optional` **updateAliveState**: `boolean`

If alive state should be updated, if undefined defaults to true

#### Defined in

[adapter/src/lib/\_Types.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/1e3f92f91943b544535e021f5e14acf9ed5c82e5/packages/adapter/src/lib/_Types.ts#L592)
