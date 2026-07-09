[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalStopParameters

# Interface: InternalStopParameters

Defined in: [adapter/src/lib/\_Types.ts:853](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L853)

Internal parameters controlling how the adapter stops

## Extends

- [`StopParameters`](StopParameters.md)

## Properties

### exitCode?

> `optional` **exitCode?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:847](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L847)

Specify an optional exit code

#### Inherited from

[`StopParameters`](StopParameters.md).[`exitCode`](StopParameters.md#exitcode)

***

### isPause?

> `optional` **isPause?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:855](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L855)

If mode is schedule or once

***

### isScheduled?

> `optional` **isScheduled?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:857](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L857)

If it has a restart schedule running

***

### reason?

> `optional` **reason?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:849](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L849)

Specify an optional reason for stoppage

#### Inherited from

[`StopParameters`](StopParameters.md).[`reason`](StopParameters.md#reason)

***

### updateAliveState?

> `optional` **updateAliveState?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:859](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L859)

If alive state should be updated, if undefined defaults to true
