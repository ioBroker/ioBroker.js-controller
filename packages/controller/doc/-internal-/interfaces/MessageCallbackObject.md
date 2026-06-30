[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackObject

# Interface: MessageCallbackObject

Defined in: [adapter/src/lib/\_Types.ts:688](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L688)

Message Callback used internally

## Properties

### cb

> **cb**: [`MessageCallback`](../type-aliases/MessageCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L690)

the callback itself

***

### time

> **time**: `number`

Defined in: [adapter/src/lib/\_Types.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L692)

The timestamp of the initial message

***

### timer?

> `optional` **timer?**: `Timeout`

Defined in: [adapter/src/lib/\_Types.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L694)

An optional timer, if a timeout has been specified
