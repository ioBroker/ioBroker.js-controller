[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessagingControllerOptions

# Interface: MessagingControllerOptions

## Properties

### adapter

> **adapter**: [`AdapterClass`](../../classes/AdapterClass.md)

The adapter using this messaging controller

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L19)

***

### subscribeCallback?

> `optional` **subscribeCallback**: [`UserInterfaceClientSubscribeHandler`](../type-aliases/UserInterfaceClientSubscribeHandler.md)

Callback to call if successfully subscribed

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L21)

***

### unsubscribeCallback?

> `optional` **unsubscribeCallback**: [`UserInterfaceClientUnsubscribeHandler`](../type-aliases/UserInterfaceClientUnsubscribeHandler.md)

Callback to call if successfully unsubscribed

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/d7f4b912895e80ffd4c1cbb49decb1de7c0e8ca3/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L23)
