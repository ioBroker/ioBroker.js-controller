[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSendToHostOptions

# Interface: InternalSendToHostOptions

Defined in: [adapter/src/lib/\_Types.ts:694](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L694)

Options for sending a message to a host

## Properties

### callback?

> `optional` **callback?**: [`MessageCallback`](../type-aliases/MessageCallback.md) \| [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [adapter/src/lib/\_Types.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L702)

Called with the response

***

### command

> **command**: `string`

Defined in: [adapter/src/lib/\_Types.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L698)

The command to send

***

### hostName

> **hostName**: `string` \| `null`

Defined in: [adapter/src/lib/\_Types.ts:696](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L696)

if null, send to all hosts

***

### message

> **message**: `any`

Defined in: [adapter/src/lib/\_Types.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L700)

The message payload
