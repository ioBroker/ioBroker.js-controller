[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSendToHostOptions

# Interface: InternalSendToHostOptions

Defined in: [adapter/src/lib/\_Types.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L700)

Options for sending a message to a host

## Properties

### callback?

> `optional` **callback?**: [`MessageCallback`](../type-aliases/MessageCallback.md) \| [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [adapter/src/lib/\_Types.ts:708](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L708)

Called with the response

***

### command

> **command**: `string`

Defined in: [adapter/src/lib/\_Types.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L704)

The command to send

***

### hostName

> **hostName**: `string` \| `null`

Defined in: [adapter/src/lib/\_Types.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L702)

if null, send it to all hosts

***

### message

> **message**: `any`

Defined in: [adapter/src/lib/\_Types.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L706)

The message payload
