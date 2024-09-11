[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / MessagingControllerOptions

# Interface: MessagingControllerOptions

[\<internal\>](../modules/internal_.md).MessagingControllerOptions

## Table of contents

### Properties

- [adapter](internal_.MessagingControllerOptions.md#adapter)
- [subscribeCallback](internal_.MessagingControllerOptions.md#subscribecallback)
- [unsubscribeCallback](internal_.MessagingControllerOptions.md#unsubscribecallback)

## Properties

### adapter

• **adapter**: [`AdapterClass`](../classes/AdapterClass.md)

The adapter using this messaging controller

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/b159ac233f7a87a414127911fe2ae71c3b8f699b/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L19)

___

### subscribeCallback

• `Optional` **subscribeCallback**: [`UserInterfaceClientSubscribeHandler`](../modules/internal_.md#userinterfaceclientsubscribehandler)

Callback to call if successfully subscribed

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/b159ac233f7a87a414127911fe2ae71c3b8f699b/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L21)

___

### unsubscribeCallback

• `Optional` **unsubscribeCallback**: [`UserInterfaceClientUnsubscribeHandler`](../modules/internal_.md#userinterfaceclientunsubscribehandler)

Callback to call if successfully unsubscribed

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/b159ac233f7a87a414127911fe2ae71c3b8f699b/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L23)
