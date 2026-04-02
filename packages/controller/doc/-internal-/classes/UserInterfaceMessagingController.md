[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceMessagingController

# Class: UserInterfaceMessagingController

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:58](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L58)

## Constructors

### Constructor

> **new UserInterfaceMessagingController**(`options`): `UserInterfaceMessagingController`

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:69](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L69)

#### Parameters

##### options

[`MessagingControllerOptions`](../interfaces/MessagingControllerOptions.md)

#### Returns

`UserInterfaceMessagingController`

## Methods

### registerClientSubscribeByMessage()

> **registerClientSubscribeByMessage**(`msg`): `Promise`\<[`UserInterfaceClientSubscribeReturnType`](../interfaces/UserInterfaceClientSubscribeReturnType.md) \| `undefined`\>

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:116](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L116)

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

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L159)

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

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:103](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L103)

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

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:82](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L82)

Send a message to the given clientId

#### Parameters

##### options

[`SendToClientOptions`](../interfaces/SendToClientOptions.md)

Data, states and client information

#### Returns

`Promise`\<`void`\>
