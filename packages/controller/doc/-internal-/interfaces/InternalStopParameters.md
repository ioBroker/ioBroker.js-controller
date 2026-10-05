[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalStopParameters

# Interface: InternalStopParameters

Defined in: [adapter/src/lib/\_Types.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/adapter/src/lib/_Types.ts#L591)

## Extends

- [`StopParameters`](StopParameters.md)

## Properties

### exitCode?

> `optional` **exitCode?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:586](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/adapter/src/lib/_Types.ts#L586)

Specify an optional exit code

#### Inherited from

[`StopParameters`](StopParameters.md).[`exitCode`](StopParameters.md#exitcode)

***

### isPause?

> `optional` **isPause?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/adapter/src/lib/_Types.ts#L593)

If mode is schedule or once

***

### isScheduled?

> `optional` **isScheduled?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/adapter/src/lib/_Types.ts#L595)

If it has a restart schedule running

***

### reason?

> `optional` **reason?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:588](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/adapter/src/lib/_Types.ts#L588)

Specify an optional reason for stoppage

#### Inherited from

[`StopParameters`](StopParameters.md).[`reason`](StopParameters.md#reason)

***

### updateAliveState?

> `optional` **updateAliveState?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/6ced20881612eb358e0a36a3f73613051ebf9143/packages/adapter/src/lib/_Types.ts#L597)

If alive state should be updated, if undefined defaults to true
