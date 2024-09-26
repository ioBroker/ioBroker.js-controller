[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / UserInterfaceMessagingController

# Class: UserInterfaceMessagingController

[\<internal\>](../modules/internal_.md).UserInterfaceMessagingController

## Table of contents

### Constructors

- [constructor](internal_.UserInterfaceMessagingController.md#constructor)

### Methods

- [registerClientSubscribeByMessage](internal_.UserInterfaceMessagingController.md#registerclientsubscribebymessage)
- [removeClientSubscribeByMessage](internal_.UserInterfaceMessagingController.md#removeclientsubscribebymessage)
- [sendToAllClients](internal_.UserInterfaceMessagingController.md#sendtoallclients)
- [sendToClient](internal_.UserInterfaceMessagingController.md#sendtoclient)

## Constructors

### constructor

• **new UserInterfaceMessagingController**(`options`): [`UserInterfaceMessagingController`](internal_.UserInterfaceMessagingController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MessagingControllerOptions`](../interfaces/internal_.MessagingControllerOptions.md) |

#### Returns

[`UserInterfaceMessagingController`](internal_.UserInterfaceMessagingController.md)

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:69](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L69)

## Methods

### registerClientSubscribeByMessage

▸ **registerClientSubscribeByMessage**(`msg`): `Promise`\<`undefined` \| [`UserInterfaceClientSubscribeReturnType`](../interfaces/internal_.UserInterfaceClientSubscribeReturnType.md)\>

Register subscription from new client

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | [`Message`](../interfaces/internal_.Message.md) | The subscribe message |

#### Returns

`Promise`\<`undefined` \| [`UserInterfaceClientSubscribeReturnType`](../interfaces/internal_.UserInterfaceClientSubscribeReturnType.md)\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:116](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L116)

___

### removeClientSubscribeByMessage

▸ **removeClientSubscribeByMessage**(`msg`): `void`

Remove a client subscription, issued by message
It contains an array of types which should be unsubscribed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | [`UserInterfaceClientRemoveMessage`](../modules/internal_.md#userinterfaceclientremovemessage) | The unsubscribe message |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:159](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L159)

___

### sendToAllClients

▸ **sendToAllClients**(`options`): `Promise`\<`void`\>

Send a message to all active clients

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SendToAllClientOptions`](../modules/internal_.md#sendtoallclientoptions) | Data and states options |

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:103](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L103)

___

### sendToClient

▸ **sendToClient**(`options`): `Promise`\<`void`\>

Send a message to the given clientId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SendToClientOptions`](../interfaces/internal_.SendToClientOptions.md) | Data, states and client information |

#### Returns

`Promise`\<`void`\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:82](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L82)
