[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessagingManager

# Class: MessagingManager

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L22)

Owns the adapter's outbound messaging and the pending-reply registry.

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new MessagingManager**(`ctx`): `MessagingManager`

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L30)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

#### Returns

`MessagingManager`

#### Overrides

[`AdapterContextBase`](AdapterContextBase.md).[`constructor`](AdapterContextBase.md#constructor)

## Methods

### clearPendingCallbacks()

> **clearPendingCallbacks**(): `void`

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L288)

Rejects all pending reply promises and clears their timers (used on stop).

#### Returns

`void`

***

### registerNotification()

> **registerNotification**(`scope`, `category`, `message`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:333](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L333)

Sends an addNotification command to the host of this adapter instance.

#### Parameters

##### scope

`string`

notification scope

##### category

`string` \| `null`

notification category, or `null` to match by scope regex

##### message

`string`

notification message

##### options?

[`NotificationOptions`](../interfaces/NotificationOptions.md)

additional notification options

#### Returns

`Promise`\<`void`\>

***

### resolveCallback()

> **resolveCallback**(`obj`): `boolean`

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:259](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L259)

Resolves a pending reply promise for an acked messagebox message.
Returns true if a pending entry was found and consumed.

#### Parameters

##### obj

[`Message`](../interfaces/Message.md)

incoming message object from the messagebox

#### Returns

`boolean`

***

### sendTo()

> **sendTo**(`opts`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L43)

Sends a message to another adapter instance.

When `opts.expectReply` is true and the target is a specific instance (not broadcast),
the returned promise resolves with the reply message when it arrives, or rejects with
`Error('Timeout exceeded')` if `opts.options.timeout` elapses.

#### Parameters

##### opts

[`InternalSendToOptions`](../interfaces/InternalSendToOptions.md)

Normalized send options

#### Returns

`Promise`\<`any`\>

***

### sendToHost()

> **sendToHost**(`opts`): `Promise`\<`any`\>

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:209](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L209)

Sends a message to a host, or broadcasts to all hosts when `hostName` is `null`.

When `opts.expectReply` is true and a specific host is targeted, the returned promise
resolves with the reply message when it arrives, or rejects with `Error('Timeout exceeded')`
if `opts.options.timeout` elapses. Broadcasts (hostName === null) resolve void.

#### Parameters

##### opts

[`InternalSendToHostOptions`](../interfaces/InternalSendToHostOptions.md)

Normalized send options

#### Returns

`Promise`\<`any`\>

***

### sendToUI()

> **sendToUI**(`options`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:306](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L306)

Sends a message to a single UI client, or broadcasts to all connected UI clients when `clientId` is omitted.

#### Parameters

##### options

[`SendToUserInterfaceClientOptions`](../interfaces/SendToUserInterfaceClientOptions.md)

clientId and data options

#### Returns

`Promise`\<`void`\>
