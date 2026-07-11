[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSendToHostOptions

# Interface: InternalSendToHostOptions

Defined in: [adapter/src/lib/\_Types.ts:695](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L695)

Options for sending a message to a host

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [adapter/src/lib/\_Types.ts:705](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L705)

Legacy callback-info header to attach to the outbound message (relayed reply descriptor)

***

### command

> **command**: `string`

Defined in: [adapter/src/lib/\_Types.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L699)

The command to send

***

### expectReply?

> `optional` **expectReply?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:703](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L703)

When true and a specific host is targeted, the manager registers a reply resolver and resolves with the reply

***

### hostName

> **hostName**: `string` \| `null`

Defined in: [adapter/src/lib/\_Types.ts:697](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L697)

if null, send it to all hosts

***

### message

> **message**: `any`

Defined in: [adapter/src/lib/\_Types.ts:701](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L701)

The message payload

***

### options?

> `optional` **options?**: [`SendToOptions`](SendToOptions.md)

Defined in: [adapter/src/lib/\_Types.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L707)

Additional send options
