[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSendToOptions

# Interface: InternalSendToOptions

Defined in: [adapter/src/lib/\_Types.ts:698](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L698)

Options for sending a message to another instance

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [adapter/src/lib/\_Types.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L709)

Legacy callback-info object to pass through as the message's callback header.
Function callbacks are not accepted here — use `expectReply` for the reply-wait path.

***

### command

> **command**: `string`

Defined in: [adapter/src/lib/\_Types.ts:702](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L702)

The command to send

***

### expectReply?

> `optional` **expectReply?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:711](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L711)

When true, the manager registers a promise resolver and resolves with the reply

***

### instanceName

> **instanceName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:700](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L700)

The instance to send the message to

***

### message

> **message**: `any`

Defined in: [adapter/src/lib/\_Types.ts:704](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L704)

The message payload

***

### options?

> `optional` **options?**: [`SendToOptions`](SendToOptions.md)

Defined in: [adapter/src/lib/\_Types.ts:713](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L713)

Additional send options
