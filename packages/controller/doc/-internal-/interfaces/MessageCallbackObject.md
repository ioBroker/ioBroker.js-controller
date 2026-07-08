[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackObject

# Interface: MessageCallbackObject

Defined in: [adapter/src/lib/\_Types.ts:690](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L690)

Message Callback used internally

## Properties

### cb

> **cb**: [`MessageCallback`](../type-aliases/MessageCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:692](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L692)

the callback itself

***

### time

> **time**: `number`

Defined in: [adapter/src/lib/\_Types.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L694)

The timestamp of the initial message

***

### timer?

> `optional` **timer?**: `Timeout`

Defined in: [adapter/src/lib/\_Types.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L696)

An optional timer, if a timeout has been specified
