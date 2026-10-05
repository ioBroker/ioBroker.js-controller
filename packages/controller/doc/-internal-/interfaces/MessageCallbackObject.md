[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackObject

# Interface: MessageCallbackObject

Defined in: [adapter/src/lib/\_Types.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/adapter/src/lib/_Types.ts#L489)

Message Callback used internally

## Properties

### cb

> **cb**: [`MessageCallback`](../type-aliases/MessageCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:491](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/adapter/src/lib/_Types.ts#L491)

the callback itself

***

### time

> **time**: `number`

Defined in: [adapter/src/lib/\_Types.ts:493](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/adapter/src/lib/_Types.ts#L493)

The timestamp of the initial message

***

### timer?

> `optional` **timer?**: `Timeout`

Defined in: [adapter/src/lib/\_Types.ts:495](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/adapter/src/lib/_Types.ts#L495)

An optional timer, if a timeout has been specified
