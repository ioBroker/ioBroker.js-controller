[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackObject

# Interface: MessageCallbackObject

Defined in: [adapter/src/lib/\_Types.ts:487](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/_Types.ts#L487)

Message Callback used internally

## Properties

### cb

> **cb**: [`MessageCallback`](../type-aliases/MessageCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/_Types.ts#L489)

the callback itself

***

### time

> **time**: `number`

Defined in: [adapter/src/lib/\_Types.ts:491](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/_Types.ts#L491)

The timestamp of the initial message

***

### timer?

> `optional` **timer?**: `Timeout`

Defined in: [adapter/src/lib/\_Types.ts:493](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/_Types.ts#L493)

An optional timer, if a timeout has been specified
