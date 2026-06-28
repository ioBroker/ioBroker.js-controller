[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceUnsubscribeInfo

# Type Alias: UserInterfaceUnsubscribeInfo

> **UserInterfaceUnsubscribeInfo** = [`UserInterfaceUnsubscribeInfoBaseObject`](UserInterfaceUnsubscribeInfoBaseObject.md) & \{ `message?`: `undefined`; `reason`: `Exclude`\<[`UserInterfaceClientUnsubscribeReason`](UserInterfaceClientUnsubscribeReason.md), [`ClientUnsubscribeReason`](ClientUnsubscribeReason.md)\>; \} \| \{ `message`: [`Message`](../interfaces/Message.md); `reason`: [`ClientUnsubscribeReason`](ClientUnsubscribeReason.md); \}

Defined in: [adapter/src/lib/\_Types.ts:179](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L179)
