[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendToClientOptions

# Interface: SendToClientOptions

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L29)

Options for sending a message to a single UI client

## Properties

### clientId

> **clientId**: `string`

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L31)

ID of the client to send the message to, will send to all if omitted

***

### data

> **data**: `unknown`

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L33)

Data to send to the client

***

### states

> **states**: [`StateRedisClient`](../classes/StateRedisClient.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:35](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L35)

The states db
