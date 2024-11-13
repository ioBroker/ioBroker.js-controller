[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceMessagingController

# Class: UserInterfaceMessagingController

## Constructors

### new UserInterfaceMessagingController()

> **new UserInterfaceMessagingController**(`options`): [`UserInterfaceMessagingController`](UserInterfaceMessagingController.md)

#### Parameters

• **options**: [`MessagingControllerOptions`](../interfaces/MessagingControllerOptions.md)

#### Returns

[`UserInterfaceMessagingController`](UserInterfaceMessagingController.md)

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:69](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L69)

## Methods

### registerClientSubscribeByMessage()

> **registerClientSubscribeByMessage**(`msg`): `Promise`\<`undefined` \| [`UserInterfaceClientSubscribeReturnType`](../interfaces/UserInterfaceClientSubscribeReturnType.md)\>

Register subscription from new client

#### Parameters

• **msg**: [`Message`](../interfaces/Message.md)

The subscribe message

#### Returns

`Promise`\<`undefined` \| [`UserInterfaceClientSubscribeReturnType`](../interfaces/UserInterfaceClientSubscribeReturnType.md)\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:116](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L116)

***

### removeClientSubscribeByMessage()

> **removeClientSubscribeByMessage**(`msg`): `void`

Remove a client subscription, issued by message
It contains an array of types which should be unsubscribed

#### Parameters

• **msg**: [`UserInterfaceClientRemoveMessage`](../type-aliases/UserInterfaceClientRemoveMessage.md)

The unsubscribe message

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L159)

***

### sendToAllClients()

> **sendToAllClients**(`options`): `Promise`\<`void`\>

Send a message to all active clients

#### Parameters

• **options**: [`SendToAllClientOptions`](../type-aliases/SendToAllClientOptions.md)

Data and states options

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:103](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L103)

***

### sendToClient()

> **sendToClient**(`options`): `Promise`\<`void`\>

Send a message to the given clientId

#### Parameters

• **options**: [`SendToClientOptions`](../interfaces/SendToClientOptions.md)

Data, states and client information

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:82](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L82)
