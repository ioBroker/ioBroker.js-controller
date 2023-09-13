[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / MessagingControllerOptions

# Interface: MessagingControllerOptions

[<internal>](../modules/internal_.md).MessagingControllerOptions

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

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:20](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L20)

___

### subscribeCallback

• `Optional` **subscribeCallback**: [`UserInterfaceClientSubscribeHandler`](../modules/internal_.md#userinterfaceclientsubscribehandler)

Callback to call if successfully subscribed

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L22)

___

### unsubscribeCallback

• `Optional` **unsubscribeCallback**: [`UserInterfaceClientUnsubscribeHandler`](../modules/internal_.md#userinterfaceclientunsubscribehandler)

Callback to call if successfully unsubscribed

#### Defined in

[adapter/src/lib/adapter/userInterfaceMessagingController.ts:24](https://github.com/ioBroker/ioBroker.js-controller/blob/58a732de/packages/adapter/src/lib/adapter/userInterfaceMessagingController.ts#L24)
