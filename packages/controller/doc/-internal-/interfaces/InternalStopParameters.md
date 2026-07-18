[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalStopParameters

# Interface: InternalStopParameters

Defined in: [adapter/src/lib/\_Types.ts:862](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L862)

Internal parameters controlling how the adapter stops

## Extends

- [`StopParameters`](StopParameters.md)

## Properties

### exitCode?

> `optional` **exitCode?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:856](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L856)

Specify an optional exit code

#### Inherited from

[`StopParameters`](StopParameters.md).[`exitCode`](StopParameters.md#exitcode)

***

### isPause?

> `optional` **isPause?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L864)

If mode is schedule or once

***

### isScheduled?

> `optional` **isScheduled?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L866)

If it has a restart schedule running

***

### reason?

> `optional` **reason?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:858](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L858)

Specify an optional reason for stoppage

#### Inherited from

[`StopParameters`](StopParameters.md).[`reason`](StopParameters.md#reason)

***

### updateAliveState?

> `optional` **updateAliveState?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L868)

If alive state should be updated, if undefined defaults to true
