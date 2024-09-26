[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / SendToClientOptions

# Interface: SendToClientOptions

[\<internal\>](../modules/internal_.md).SendToClientOptions

## Table of contents

### Properties

- [clientId](internal_.SendToClientOptions.md#clientid)
- [data](internal_.SendToClientOptions.md#data)
- [states](internal_.SendToClientOptions.md#states)

## Properties

### clientId

• **clientId**: `string`

ID of the client to send the message to, will send to all if omitted

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L28)

___

### data

• **data**: `unknown`

Data to send to the client

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L30)

___

### states

• **states**: [`StateRedisClient`](../classes/internal_.StateRedisClient.md)

The states db

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:32](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L32)
