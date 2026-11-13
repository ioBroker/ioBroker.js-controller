[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSendToHostOptions

# Interface: InternalSendToHostOptions

Defined in: [adapter/src/lib/\_Types.ts:740](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L740)

Options for sending a message to a host

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [adapter/src/lib/\_Types.ts:750](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L750)

Legacy callback-info header to attach to the outbound message (relayed reply descriptor)

***

### command

> **command**: `string`

Defined in: [adapter/src/lib/\_Types.ts:744](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L744)

The command to send

***

### expectReply?

> `optional` **expectReply?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:748](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L748)

When true and a specific host is targeted, the manager registers a reply resolver and resolves with the reply

***

### hostName

> **hostName**: `string` \| `null`

Defined in: [adapter/src/lib/\_Types.ts:742](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L742)

if null, send it to all hosts

***

### message

> **message**: `any`

Defined in: [adapter/src/lib/\_Types.ts:746](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L746)

The message payload

***

### options?

> `optional` **options?**: [`SendToOptions`](SendToOptions.md)

Defined in: [adapter/src/lib/\_Types.ts:752](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/adapter/src/lib/_Types.ts#L752)

Additional send options
