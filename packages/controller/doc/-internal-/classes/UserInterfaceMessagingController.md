[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceMessagingController

# Class: UserInterfaceMessagingController

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:65](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L65)

Controller for messaging with UI clients (subscribe, heartbeat and sending data)

## Constructors

### Constructor

> **new UserInterfaceMessagingController**(`options`): `UserInterfaceMessagingController`

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:79](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L79)

#### Parameters

##### options

[`MessagingControllerOptions`](../interfaces/MessagingControllerOptions.md)

The adapter and the subscribe/unsubscribe callbacks

#### Returns

`UserInterfaceMessagingController`

## Methods

### registerClientSubscribeByMessage()

> **registerClientSubscribeByMessage**(`msg`): `Promise`\<[`UserInterfaceClientSubscribeReturnType`](../interfaces/UserInterfaceClientSubscribeReturnType.md) \| `undefined`\>

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:126](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L126)

Register subscription from new client

#### Parameters

##### msg

[`Message`](../interfaces/Message.md)

The subscribe message

#### Returns

`Promise`\<[`UserInterfaceClientSubscribeReturnType`](../interfaces/UserInterfaceClientSubscribeReturnType.md) \| `undefined`\>

***

### removeClientSubscribeByMessage()

> **removeClientSubscribeByMessage**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:169](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L169)

Remove a client subscription, issued by message
It contains an array of types which should be unsubscribed

#### Parameters

##### msg

[`UserInterfaceClientRemoveMessage`](../type-aliases/UserInterfaceClientRemoveMessage.md)

The unsubscribe message

#### Returns

`void`

***

### sendToAllClients()

> **sendToAllClients**(`options`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:113](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L113)

Send a message to all active clients

#### Parameters

##### options

[`SendToAllClientOptions`](../type-aliases/SendToAllClientOptions.md)

Data and states options

#### Returns

`Promise`\<`void`\>

***

### sendToClient()

> **sendToClient**(`options`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:92](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L92)

Send a message to the given clientId

#### Parameters

##### options

[`SendToClientOptions`](../interfaces/SendToClientOptions.md)

Data, states and client information

#### Returns

`Promise`\<`void`\>
