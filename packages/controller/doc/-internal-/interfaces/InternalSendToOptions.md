[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSendToOptions

# Interface: InternalSendToOptions

Defined in: [adapter/src/lib/\_Types.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L674)

Options for sending a message to another instance

## Properties

### callback?

> `optional` **callback?**: [`MessageCallback`](../type-aliases/MessageCallback.md) \| [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [adapter/src/lib/\_Types.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L682)

Called with the response

***

### command

> **command**: `string`

Defined in: [adapter/src/lib/\_Types.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L678)

The command to send

***

### instanceName

> **instanceName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:676](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L676)

The instance to send the message to

***

### message

> **message**: `any`

Defined in: [adapter/src/lib/\_Types.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L680)

The message payload

***

### options?

> `optional` **options?**: [`SendToOptions`](SendToOptions.md)

Defined in: [adapter/src/lib/\_Types.ts:684](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L684)

Additional send options
