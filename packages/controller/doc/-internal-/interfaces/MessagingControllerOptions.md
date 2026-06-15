[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessagingControllerOptions

# Interface: MessagingControllerOptions

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L17)

## Properties

### adapter

> **adapter**: [`AdapterClass`](../../classes/AdapterClass.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L19)

The adapter using this messaging controller

***

### subscribeCallback?

> `optional` **subscribeCallback?**: [`UserInterfaceClientSubscribeHandler`](../type-aliases/UserInterfaceClientSubscribeHandler.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L21)

Callback to call if successfully subscribed

***

### unsubscribeCallback?

> `optional` **unsubscribeCallback?**: [`UserInterfaceClientUnsubscribeHandler`](../type-aliases/UserInterfaceClientUnsubscribeHandler.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L23)

Callback to call if successfully unsubscribed
