[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessagingManager

# Class: MessagingManager

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:22](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L22)

Owns the adapter's outbound messaging and the pending-reply registry.

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new MessagingManager**(`ctx`): `MessagingManager`

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L30)

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

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:272](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L272)

Rejects all pending reply promises and clears their timers (used on stop).

#### Returns

`void`

***

### registerNotification()

> **registerNotification**(`scope`, `category`, `message`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L317)

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

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:243](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L243)

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

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L43)

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

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:194](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L194)

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

Defined in: [adapter/src/lib/adapter/managers/MessagingManager.ts:290](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/adapter/managers/MessagingManager.ts#L290)

Sends a message to a single UI client, or broadcasts to all connected UI clients when `clientId` is omitted.

#### Parameters

##### options

[`SendToUserInterfaceClientOptions`](../interfaces/SendToUserInterfaceClientOptions.md)

clientId and data options

#### Returns

`Promise`\<`void`\>
