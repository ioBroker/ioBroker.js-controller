[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceUnsubscribeInfo

# Type Alias: UserInterfaceUnsubscribeInfo

> **UserInterfaceUnsubscribeInfo** = [`UserInterfaceUnsubscribeInfoBaseObject`](UserInterfaceUnsubscribeInfoBaseObject.md) & \{ `message?`: `undefined`; `reason`: `Exclude`\<[`UserInterfaceClientUnsubscribeReason`](UserInterfaceClientUnsubscribeReason.md), [`ClientUnsubscribeReason`](ClientUnsubscribeReason.md)\>; \} \| \{ `message`: [`Message`](../interfaces/Message.md); `reason`: [`ClientUnsubscribeReason`](ClientUnsubscribeReason.md); \}

Defined in: [adapter/src/lib/\_Types.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/adapter/src/lib/_Types.ts#L161)
