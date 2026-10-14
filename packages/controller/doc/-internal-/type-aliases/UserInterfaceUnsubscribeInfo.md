[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceUnsubscribeInfo

# Type Alias: UserInterfaceUnsubscribeInfo

> **UserInterfaceUnsubscribeInfo** = [`UserInterfaceUnsubscribeInfoBaseObject`](UserInterfaceUnsubscribeInfoBaseObject.md) & \{ `message?`: `undefined`; `reason`: `Exclude`\<[`UserInterfaceClientUnsubscribeReason`](UserInterfaceClientUnsubscribeReason.md), [`ClientUnsubscribeReason`](ClientUnsubscribeReason.md)\>; \} \| \{ `message`: [`Message`](../interfaces/Message.md); `reason`: [`ClientUnsubscribeReason`](ClientUnsubscribeReason.md); \}

Defined in: [adapter/src/lib/\_Types.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/adapter/src/lib/_Types.ts#L175)
