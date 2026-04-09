[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessagingControllerOptions

# Interface: MessagingControllerOptions

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L17)

## Properties

### adapter

> **adapter**: [`AdapterClass`](../../classes/AdapterClass.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L19)

The adapter using this messaging controller

***

### subscribeCallback?

> `optional` **subscribeCallback?**: [`UserInterfaceClientSubscribeHandler`](../type-aliases/UserInterfaceClientSubscribeHandler.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L21)

Callback to call if successfully subscribed

***

### unsubscribeCallback?

> `optional` **unsubscribeCallback?**: [`UserInterfaceClientUnsubscribeHandler`](../type-aliases/UserInterfaceClientUnsubscribeHandler.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L23)

Callback to call if successfully unsubscribed
