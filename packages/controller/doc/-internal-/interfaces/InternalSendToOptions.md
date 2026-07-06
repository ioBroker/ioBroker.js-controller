[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSendToOptions

# Interface: InternalSendToOptions

Defined in: [adapter/src/lib/\_Types.ts:676](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L676)

Options for sending a message to another instance

## Properties

### callback?

> `optional` **callback?**: [`MessageCallback`](../type-aliases/MessageCallback.md) \| [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [adapter/src/lib/\_Types.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L684)

Called with the response

***

### command

> **command**: `string`

Defined in: [adapter/src/lib/\_Types.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L680)

The command to send

***

### instanceName

> **instanceName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L678)

The instance to send the message to

***

### message

> **message**: `any`

Defined in: [adapter/src/lib/\_Types.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L682)

The message payload

***

### options?

> `optional` **options?**: [`SendToOptions`](SendToOptions.md)

Defined in: [adapter/src/lib/\_Types.ts:686](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/adapter/src/lib/_Types.ts#L686)

Additional send options
