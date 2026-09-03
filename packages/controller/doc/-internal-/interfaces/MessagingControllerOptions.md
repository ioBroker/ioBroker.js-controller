[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessagingControllerOptions

# Interface: MessagingControllerOptions

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L19)

Options for the UI messaging controller

## Properties

### adapter

> **adapter**: [`AdapterClass`](../../classes/AdapterClass.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L21)

The adapter using this messaging controller

***

### subscribeCallback?

> `optional` **subscribeCallback?**: [`UserInterfaceClientSubscribeHandler`](../type-aliases/UserInterfaceClientSubscribeHandler.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L23)

Callback to call if successfully subscribed

***

### unsubscribeCallback?

> `optional` **unsubscribeCallback?**: [`UserInterfaceClientUnsubscribeHandler`](../type-aliases/UserInterfaceClientUnsubscribeHandler.md)

Defined in: [adapter/src/lib/adapter/userInterfaceMessagingController.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L25)

Callback to call if successfully unsubscribed
