[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalStopParameters

# Interface: InternalStopParameters

Defined in: [adapter/src/lib/\_Types.ts:874](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/adapter/src/lib/_Types.ts#L874)

Internal parameters controlling how the adapter stops

## Extends

- [`StopParameters`](StopParameters.md)

## Properties

### exitCode?

> `optional` **exitCode?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/adapter/src/lib/_Types.ts#L868)

Specify an optional exit code

#### Inherited from

[`StopParameters`](StopParameters.md).[`exitCode`](StopParameters.md#exitcode)

***

### isPause?

> `optional` **isPause?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:876](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/adapter/src/lib/_Types.ts#L876)

If mode is schedule or once

***

### isScheduled?

> `optional` **isScheduled?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:878](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/adapter/src/lib/_Types.ts#L878)

If it has a restart schedule running

***

### reason?

> `optional` **reason?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:870](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/adapter/src/lib/_Types.ts#L870)

Specify an optional reason for stoppage

#### Inherited from

[`StopParameters`](StopParameters.md).[`reason`](StopParameters.md#reason)

***

### updateAliveState?

> `optional` **updateAliveState?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:880](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/adapter/src/lib/_Types.ts#L880)

If alive state should be updated, if undefined defaults to true
