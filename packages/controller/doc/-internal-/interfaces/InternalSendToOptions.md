[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSendToOptions

# Interface: InternalSendToOptions

Defined in: [adapter/src/lib/\_Types.ts:676](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L676)

Options for sending a message to another instance

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [adapter/src/lib/\_Types.ts:687](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L687)

Legacy callback-info object to pass through as the message's callback header.
Function callbacks are not accepted here — use `expectReply` for the reply-wait path.

***

### command

> **command**: `string`

Defined in: [adapter/src/lib/\_Types.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L680)

The command to send

***

### expectReply?

> `optional` **expectReply?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:689](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L689)

When true, the manager registers a promise resolver and resolves with the reply

***

### instanceName

> **instanceName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L678)

The instance to send the message to

***

### message

> **message**: `any`

Defined in: [adapter/src/lib/\_Types.ts:682](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L682)

The message payload

***

### options?

> `optional` **options?**: [`SendToOptions`](SendToOptions.md)

Defined in: [adapter/src/lib/\_Types.ts:691](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L691)

Additional send options
