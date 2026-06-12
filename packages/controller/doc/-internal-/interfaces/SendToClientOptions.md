[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendToClientOptions

# Interface: SendToClientOptions

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:26](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L26)

## Properties

### clientId

> **clientId**: `string`

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L28)

ID of the client to send the message to, will send to all if omitted

***

### data

> **data**: `unknown`

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L30)

Data to send to the client

***

### states

> **states**: [`StateRedisClient`](../classes/StateRedisClient.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:32](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L32)

The states db
