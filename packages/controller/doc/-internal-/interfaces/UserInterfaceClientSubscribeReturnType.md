[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceClientSubscribeReturnType

# Interface: UserInterfaceClientSubscribeReturnType

Defined in: [adapter/src/lib/\_Types.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L165)

Result returned by the adapter when a UI client subscribes

## Properties

### accepted

> **accepted**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L167)

If the adapter has accepted the client subscription

***

### error?

> `optional` **error?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:171](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L171)

Optional error if not accepted

***

### heartbeat?

> `optional` **heartbeat?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L169)

Optional heartbeat, if set, the client needs to re-subscribe every heartbeat interval
