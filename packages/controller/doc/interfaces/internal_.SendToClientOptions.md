[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / SendToClientOptions

# Interface: SendToClientOptions

[<internal>](../modules/internal_.md).SendToClientOptions

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

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/25f18577/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L29)

___

### data

• **data**: `unknown`

Data to send to the client

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/25f18577/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L31)

___

### states

• **states**: [`StateRedisClient`](../classes/internal_.StateRedisClient.md)

The states db

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/25f18577/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L33)
