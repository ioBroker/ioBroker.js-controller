[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / UserInterfaceMessagingController

# Class: UserInterfaceMessagingController

[<internal>](../modules/internal_.md).UserInterfaceMessagingController

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

• **new UserInterfaceMessagingController**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MessagingControllerOptions`](../interfaces/internal_.MessagingControllerOptions.md) |

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:70](https://github.com/ioBroker/ioBroker.js-controller/blob/c590b2a5/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L70)

## Methods

### registerClientSubscribeByMessage

▸ **registerClientSubscribeByMessage**(`msg`): `Promise`<`void`\>

Register subscription from new client

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | [`Message`](../interfaces/internal_.Message.md) | The subscribe message |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:117](https://github.com/ioBroker/ioBroker.js-controller/blob/c590b2a5/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L117)

___

### removeClientSubscribeByMessage

▸ **removeClientSubscribeByMessage**(`msg`): `void`

Remove a client subscription, issued by message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | [`UserInterfaceClientRemoveMessage`](../modules/internal_.md#userinterfaceclientremovemessage) | The unsubscribe message |

#### Returns

`void`

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:156](https://github.com/ioBroker/ioBroker.js-controller/blob/c590b2a5/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L156)

___

### sendToAllClients

▸ **sendToAllClients**(`options`): `Promise`<`void`\>

Send a message to all active clients

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SendToAllClientOptions`](../modules/internal_.md#sendtoallclientoptions) | Data and states options |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:104](https://github.com/ioBroker/ioBroker.js-controller/blob/c590b2a5/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L104)

___

### sendToClient

▸ **sendToClient**(`options`): `Promise`<`void`\>

Send a message to the given clientId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SendToClientOptions`](../interfaces/internal_.SendToClientOptions.md) | Data, states and client information |

#### Returns

`Promise`<`void`\>

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:83](https://github.com/ioBroker/ioBroker.js-controller/blob/c590b2a5/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L83)
