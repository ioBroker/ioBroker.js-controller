[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceUnsubscribeInfo

# Type Alias: UserInterfaceUnsubscribeInfo

> **UserInterfaceUnsubscribeInfo** = [`UserInterfaceUnsubscribeInfoBaseObject`](UserInterfaceUnsubscribeInfoBaseObject.md) & \{ `message?`: `undefined`; `reason`: `Exclude`\<[`UserInterfaceClientUnsubscribeReason`](UserInterfaceClientUnsubscribeReason.md), [`ClientUnsubscribeReason`](ClientUnsubscribeReason.md)\>; \} \| \{ `message`: [`Message`](../interfaces/Message.md); `reason`: [`ClientUnsubscribeReason`](ClientUnsubscribeReason.md); \}

Defined in: [adapter/src/lib/\_Types.ts:175](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L175)
