[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PendingReply

# Interface: PendingReply

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:14](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L14)

Entry in the pending-reply registry for sendTo calls with expectReply=true

## Properties

### reject

> **reject**: (`e`) => `void`

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:16](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L16)

#### Parameters

##### e

`Error`

#### Returns

`void`

***

### resolve

> **resolve**: (`msg`) => `void`

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L15)

#### Parameters

##### msg

`any`

#### Returns

`void`

***

### time

> **time**: `number`

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:18](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L18)

***

### timer?

> `optional` **timer?**: `Timeout`

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L17)
